import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { pb } from '@/lib/pocketbase';

export interface DashboardStats {
  seancesTerminees: number;
  seancesEnCours: number;
  scoreMoyen: number;
  tempsTotal: number;
  scoreCeredis: number | null;
  niveauCecrl: string | null;
  domainesScores: Record<string, number>;
  dernieresActivites: Array<{
    id: string;
    titre: string;
    parcours: string;
    score: number;
    date: string;
    type: string;
    statut: 'termine' | 'en_cours';
  }>;
  tendance: 'up' | 'down' | 'stable';
  isLoading: boolean;
  error: string | null;
}

export function useDashboard(): DashboardStats {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    seancesTerminees: 0,
    seancesEnCours: 0,
    scoreMoyen: 0,
    tempsTotal: 0,
    scoreCeredis: null,
    niveauCecrl: null,
    domainesScores: {
      'D1': 0,
      'D2': 0,
      'D3': 0,
      'D4': 0,
      'D5': 0,
    },
    dernieresActivites: [],
    tendance: 'stable',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setStats(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // 1. Charger les progressions
        const progressions = await pb.collection('progression').getFullList({
          filter: `user = "${user.id}"`,
          sort: '-updated',
          expand: 'seance',
        });

        // 2. Calculer les statistiques de base
        const seancesTerminees = progressions.filter(p => p.statut === 'termine').length;
        const seancesEnCours = progressions.filter(p => p.statut === 'en_cours').length;
        
        const progressionsTerminees = progressions.filter(p => p.statut === 'termine');
        const scoreMoyen = progressionsTerminees.length > 0
          ? Math.round(
              progressionsTerminees.reduce((sum, p) => sum + (p.score_total || 0), 0) / 
              progressionsTerminees.length
            )
          : 0;

        const tempsTotal = Math.round(
          progressions.reduce((sum, p) => sum + (p.temps_passe || 0), 0) / 60
        );

        // 3. Charger les evidences pour calcul des domaines
        const evidences = await pb.collection('evidences').getFullList({
          filter: `user = "${user.id}"`,
          sort: '-created',
        });

        // 4. Calculer les scores par domaine
        const domainesScores: Record<string, number> = {
          'D1': 0,
          'D2': 0,
          'D3': 0,
          'D4': 0,
          'D5': 0,
        };

        // Grouper par domaine et calculer la moyenne
        const domainGroups: Record<string, number[]> = {
          'D1': [],
          'D2': [],
          'D3': [],
          'D4': [],
          'D5': [],
        };

        evidences.forEach(evidence => {
          const competenceId = evidence.competency_id;
          if (!competenceId) return;

          // Extraire le domaine (ex: "1.1" → "D1")
          const domainNumber = competenceId.split('.')[0];
          const domainKey = `D${domainNumber}`;

          if (domainKey in domainGroups && evidence.score !== undefined) {
            domainGroups[domainKey].push(evidence.score);
          }
        });

        // Calculer la moyenne pour chaque domaine
        Object.keys(domainGroups).forEach(domain => {
          const scores = domainGroups[domain];
          if (scores.length > 0) {
            domainesScores[domain] = Math.round(
              scores.reduce((sum, score) => sum + score, 0) / scores.length
            );
          }
        });

        // 5. Tenter de récupérer le score CEREDIS depuis PostgreSQL ou cache
        // TODO: Implémenter l'appel à l'API /api/ceredis/calculate
        let scoreCeredis: number | null = null;
        let niveauCecrl: string | null = null;

        try {
          // Calculer un score CEREDIS approximatif basé sur les domaines
          const domaineScoresArray = Object.values(domainesScores);
          if (domaineScoresArray.some(score => score > 0)) {
            const moyenneDomaines = domaineScoresArray.reduce((sum, score) => sum + score, 0) / 5;
            scoreCeredis = Math.round(moyenneDomaines * 6); // Score sur 600

            // Déterminer le niveau CECRL approximatif
            if (scoreCeredis >= 500) niveauCecrl = 'C1';
            else if (scoreCeredis >= 400) niveauCecrl = 'B2';
            else if (scoreCeredis >= 300) niveauCecrl = 'B1';
            else if (scoreCeredis >= 200) niveauCecrl = 'A2';
            else niveauCecrl = 'A1';
          }
        } catch (error) {
          console.error('Erreur lors du calcul du score CEREDIS:', error);
        }

        // 6. Construire l'historique des activités
        const dernieresActivites = progressions.slice(0, 10).map(p => {
          const seance = p.expand?.seance;
          return {
            id: p.id,
            titre: seance?.titre || 'Activité sans titre',
            parcours: seance?.parcours || 'Parcours inconnu',
            score: p.score_total || 0,
            date: p.updated || p.created,
            type: seance?.type || 'inconnu',
            statut: p.statut as 'termine' | 'en_cours',
          };
        });

        // 7. Calculer la tendance (basée sur les 5 dernières vs 5 précédentes)
        let tendance: 'up' | 'down' | 'stable' = 'stable';
        if (progressionsTerminees.length >= 10) {
          const recent5 = progressionsTerminees.slice(0, 5);
          const previous5 = progressionsTerminees.slice(5, 10);
          
          const recentAvg = recent5.reduce((sum, p) => sum + (p.score_total || 0), 0) / 5;
          const previousAvg = previous5.reduce((sum, p) => sum + (p.score_total || 0), 0) / 5;
          
          if (recentAvg > previousAvg + 5) tendance = 'up';
          else if (recentAvg < previousAvg - 5) tendance = 'down';
        }

        // 8. Mettre à jour l'état
        setStats({
          seancesTerminees,
          seancesEnCours,
          scoreMoyen,
          tempsTotal,
          scoreCeredis,
          niveauCecrl,
          domainesScores,
          dernieresActivites,
          tendance,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        console.error('Erreur lors du chargement du dashboard:', error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: 'Impossible de charger les données du dashboard',
        }));
      }
    };

    fetchDashboardData();
  }, [user]);

  return stats;
}
