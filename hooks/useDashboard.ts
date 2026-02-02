import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { calculateUserScore } from '@/lib/ceredis/client';
import type { CompetencyScore } from '@/lib/ceredis/types';

export interface DashboardStats {
  seancesTerminees: number;
  seancesEnCours: number;
  scoreMoyen: number;
  tempsTotal: number;
  scoreCeredis: number | null;
  niveauCecrl: string | null;
  domainesScores: Record<string, number>;
  competencyScores: Record<string, CompetencyScore>;
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
  
  // Nouveaux champs du moteur CEREDIS
  validation?: {
    valid: boolean;
    level: string;
    errors: string[];
    warnings: string[];
  } | null;
  engineVersion?: string;
  computedAt?: string;
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
    competencyScores: {},
    dernieresActivites: [],
    tendance: 'stable',
    isLoading: true,
    error: null,
    validation: null,
    engineVersion: 'local',
    computedAt: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setStats(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // 1. Charger les activités (migration Supabase)
        const supabase = createClient();
        let progressions: any[] = [];
        try {
          const { data: activities, error } = await supabase
            .from('activities')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false });

          if (error) throw error;
          
          // Mapper les activités Supabase vers le format progression
          progressions = (activities || []).map((a: any) => ({
            id: a.id,
            user: a.user_id,
            seance_id: a.seance_id,
            statut: a.completed_at ? 'termine' : 'en_cours',
            score_total: a.score_total || 0,
            score_max: a.score_max || 0,
            temps_passe: a.time_spent || 0,
            updated: a.updated_at,
            created: a.created_at,
          }));
        } catch (progressionError: any) {
          // Pas de données disponibles, continuer avec tableau vide
          console.warn('Activities query failed:', progressionError);
        }

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
        let evidences: any[] = [];
        try {
          const { data, error } = await supabase
            .from('evidences')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          evidences = data || [];
        } catch (evidenceError: any) {
          // Pas de données disponibles, continuer avec tableau vide
          console.warn('Evidences query failed:', evidenceError);
        }

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

        // 4.5. Calculer les scores par compétence (19 compétences)
        const competencyScores: Record<string, CompetencyScore> = {};
        const competencyGroups: Record<string, { scores: number[], types: Set<string> }> = {};

        evidences.forEach(evidence => {
          const competenceId = evidence.competency_id;
          if (!competenceId) return;

          if (!competencyGroups[competenceId]) {
            competencyGroups[competenceId] = { scores: [], types: new Set() };
          }

          if (evidence.score !== undefined) {
            competencyGroups[competenceId].scores.push(evidence.score);
          }
          if (evidence.evidence_type) {
            competencyGroups[competenceId].types.add(evidence.evidence_type);
          }
        });

        // Calculer le score moyen pour chaque compétence
        Object.entries(competencyGroups).forEach(([competencyId, data]) => {
          if (data.scores.length > 0) {
            const avgScore = data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length;
            competencyScores[competencyId] = {
              score: Math.round(avgScore),
              evidenceCount: data.scores.length,
              evidenceTypes: Array.from(data.types)
            };
          }
        });

        // 5. Tenter de récupérer le score CEREDIS via le moteur (API)
        let scoreCeredis: number | null = null;
        let niveauCecrl: string | null = null;
        let validation: any = null;
        let engineVersion: string = 'local';
        let computedAt: string = new Date().toISOString();

        try {
          const ceredisResult = await calculateUserScore(user.id);
          scoreCeredis = ceredisResult.ceredisScore;
          niveauCecrl = ceredisResult.cecrlLevel;
          validation = ceredisResult.validation;
          engineVersion = ceredisResult.engineVersion || '1.0';
          computedAt = ceredisResult.computedAt || new Date().toISOString();

          // Remplacer les scores de domaines si fournis par le moteur
          if (ceredisResult.domainScores) {
            Object.keys(domainesScores).forEach(domain => {
              const v = (ceredisResult.domainScores as Record<string, number>)[domain];
              if (v !== undefined && v !== null) {
                domainesScores[domain] = Math.round(v);
              }
            });
          }

          // Remplacer les scores de compétences si fournis par le moteur
          if (ceredisResult.competencyScores) {
            Object.assign(competencyScores, ceredisResult.competencyScores);
          }
        } catch (error) {
          // Fallback : utiliser l'estimation approximative locale
          console.warn('CEREDIS API failed, falling back to local estimation', error);

          try {
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
          } catch (err) {
            console.error('Erreur lors du calcul du score CEREDIS (fallback):', err);
          }
        }

        // 6. Construire l'historique des activités
        const dernieresActivites = progressions.slice(0, 10).map(p => {
          const seance = (p as any).expand?.seance;
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
          competencyScores,
          dernieresActivites,
          tendance,
          isLoading: false,
          error: null,
          validation,
          engineVersion,
          computedAt,
        });

      } catch (error: any) {
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
