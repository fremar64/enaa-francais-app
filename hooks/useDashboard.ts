/**
 * Hook useDashboard
 * Récupère et agrège les données pour le Dashboard Apprenant
 * Combine les données de CaSS (compétences) et xAPI (activités)
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { integrationService } from '@/services/integration';
import { COMPETENCES_CEREDIS } from '@/services/integration/types';
import type { 
  DashboardData, 
  ProgressionGlobale, 
  ProfilCompetences, 
  CompetenceDomaine,
  CompetenceDetail,
  ActiviteHistorique,
  DonneesRadar,
  DOMAINES_CEREDIS 
} from '@/types/dashboard';

// Données de domaines pour le mapping
const DOMAINES = [
  { id: '1', name: 'Compréhension orale', abbrev: 'CO', couleur: '#3B82F6', competencesIds: ['1.1', '1.2', '1.3'] },
  { id: '2', name: 'Compréhension écrite', abbrev: 'CE', couleur: '#10B981', competencesIds: ['2.1', '2.2', '2.3'] },
  { id: '3', name: 'Production écrite', abbrev: 'PE', couleur: '#F59E0B', competencesIds: ['3.1', '3.2', '3.3'] },
  { id: '4', name: 'Interaction', abbrev: 'INT', couleur: '#EF4444', competencesIds: ['4.1', '4.2', '4.3'] },
  { id: '5', name: 'Métalinguistique', abbrev: 'META', couleur: '#8B5CF6', competencesIds: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'] }
];

/**
 * Données de démonstration pour le développement
 */
const MOCK_HISTORIQUE: ActiviteHistorique[] = [
  {
    id: 'act-1',
    nom: 'QCM Compréhension - Là-bas',
    type: 'qcm',
    chanson: 'Là-bas',
    seance: 'Séance 1 - Découverte',
    score: 85,
    duree: 180,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    competences: ['1.1', '2.1'],
    feedback: 'succes'
  },
  {
    id: 'act-2',
    nom: 'Texte à trous - Conjugaison',
    type: 'texte_trous',
    chanson: 'Là-bas',
    seance: 'Séance 2 - Analyse',
    score: 70,
    duree: 240,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    competences: ['5.1', '5.3'],
    feedback: 'partiel'
  },
  {
    id: 'act-3',
    nom: 'Journal réflexif',
    type: 'journal_reflexif',
    chanson: 'Là-bas',
    seance: 'Séance 3 - Réflexion',
    score: 90,
    duree: 300,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    competences: ['5.6'],
    feedback: 'succes'
  },
  {
    id: 'act-4',
    nom: 'Production écrite libre',
    type: 'texte_libre',
    chanson: 'Né en 17 à Leidenstadt',
    seance: 'Séance 1 - Expression',
    score: 75,
    duree: 420,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    competences: ['3.1', '5.5', '5.7'],
    feedback: 'partiel'
  }
];

/**
 * Créer des données de compétences simulées
 */
function createMockCompetenceDetails(): CompetenceDetail[] {
  const details: CompetenceDetail[] = [];
  
  Object.entries(COMPETENCES_CEREDIS).forEach(([id, comp]) => {
    // Générer un statut et score aléatoire pour la démo
    const random = Math.random();
    let statut: 'non_commence' | 'en_cours' | 'maitrise';
    let score: number;
    let preuves: number;
    let confidence: number;
    
    if (random > 0.7) {
      statut = 'maitrise';
      score = 75 + Math.floor(Math.random() * 25);
      preuves = 2 + Math.floor(Math.random() * 3);
      confidence = 0.8 + Math.random() * 0.2;
    } else if (random > 0.3) {
      statut = 'en_cours';
      score = 40 + Math.floor(Math.random() * 35);
      preuves = 1 + Math.floor(Math.random() * 2);
      confidence = 0.4 + Math.random() * 0.4;
    } else {
      statut = 'non_commence';
      score = 0;
      preuves = 0;
      confidence = 0;
    }
    
    details.push({
      id,
      code: comp.code,
      name: comp.name,
      description: comp.description,
      domaineId: comp.domain,
      niveau: comp.level,
      statut,
      score,
      preuves,
      confidence,
      derniereEvaluation: statut !== 'non_commence' 
        ? new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toISOString()
        : null
    });
  });
  
  return details;
}

/**
 * Calculer les données par domaine depuis les détails
 */
function calculateDomaineData(details: CompetenceDetail[]): CompetenceDomaine[] {
  return DOMAINES.map(domaine => {
    const competencesDomaine = details.filter(c => c.domaineId === domaine.id);
    const maitrisees = competencesDomaine.filter(c => c.statut === 'maitrise').length;
    const scores = competencesDomaine.filter(c => c.score > 0).map(c => c.score);
    const scoreMoyen = scores.length > 0 
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    
    // Déterminer le niveau atteint
    const niveauxAtteints = competencesDomaine
      .filter(c => c.statut === 'maitrise')
      .map(c => c.niveau);
    
    const niveauAtteint = niveauxAtteints.length > 0
      ? niveauxAtteints.sort()[niveauxAtteints.length - 1]
      : null;
    
    return {
      domaineId: domaine.id,
      domaineName: domaine.name,
      competencesMaitrisees: maitrisees,
      competencesTotal: competencesDomaine.length,
      scoreMoyen,
      niveauAtteint
    };
  });
}

/**
 * Générer les données du radar
 */
function generateRadarData(parDomaine: CompetenceDomaine[]): DonneesRadar[] {
  return parDomaine.map((domaine, index) => ({
    domaine: domaine.domaineName,
    abbrev: DOMAINES[index].abbrev,
    score: domaine.scoreMoyen,
    scoreMax: 100,
    couleur: DOMAINES[index].couleur
  }));
}

/**
 * Hook principal pour le Dashboard
 */
export function useDashboard(): DashboardData & { refresh: () => void } {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Omit<DashboardData, 'loading' | 'error'>>({
    progression: {
      activitesCompletees: 0,
      seancesTerminees: 0,
      chansonsEtudiees: 0,
      tempsTotal: 0,
      scoreMoyen: 0,
      scoreGlobal: 0,
      serieJours: 0,
      derniereActivite: null,
      niveauActuel: 'A1',
      competencesMaitrisees: 0,
      competencesTotales: 19
    },
    competences: {
      parDomaine: [],
      details: [],
      recemmentAcquises: [],
      enProgression: []
    },
    historique: [],
    radar: []
  });

  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Essayer de récupérer les vraies données
      const status = integrationService.getStatus();
      
      let realData = null;
      if (status.cass.enabled || status.xapi.enabled) {
        try {
          realData = await integrationService.getUserDashboard(user.id);
        } catch (e) {
          console.warn('[Dashboard] Services non disponibles, utilisation données mock');
        }
      }

      // Générer les données de compétences
      const competenceDetails = createMockCompetenceDetails();
      const parDomaine = calculateDomaineData(competenceDetails);
      const radar = generateRadarData(parDomaine);
      
      // Filtrer les compétences récentes et en cours
      const recemmentAcquises = competenceDetails
        .filter(c => c.statut === 'maitrise')
        .sort((a, b) => {
          if (!a.derniereEvaluation || !b.derniereEvaluation) return 0;
          return new Date(b.derniereEvaluation).getTime() - new Date(a.derniereEvaluation).getTime();
        })
        .slice(0, 5);
      
      const enProgression = competenceDetails
        .filter(c => c.statut === 'en_cours')
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      // Calculer la progression globale
      const totalMaitrisees = competenceDetails.filter(c => c.statut === 'maitrise').length;
      const totalCompetences = competenceDetails.length;
      const allScores = competenceDetails.filter(c => c.score > 0).map(c => c.score);
      const scoreMoyen = allScores.length > 0
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0;
      
      // Calculer le score global (% de progression)
      const scoreGlobal = Math.round((totalMaitrisees / totalCompetences) * 100);
      
      // Déterminer le niveau actuel basé sur les compétences maîtrisées
      const niveauxMaitrises = competenceDetails
        .filter(c => c.statut === 'maitrise')
        .map(c => c.niveau);
      const niveauxPossibles: Array<'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1'> = ['C2', 'C1', 'B2', 'B1', 'A2', 'A1'];
      const niveauActuel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' = niveauxMaitrises.length > 0
        ? niveauxPossibles.find(n => niveauxMaitrises.includes(n)) || 'A1'
        : 'A1';

      setData({
        progression: {
          activitesCompletees: realData?.xapi.totalCompleted ?? MOCK_HISTORIQUE.length,
          seancesTerminees: 3,
          chansonsEtudiees: 2,
          tempsTotal: realData?.xapi.totalDuration ?? MOCK_HISTORIQUE.reduce((sum, a) => sum + a.duree, 0),
          scoreMoyen: realData?.xapi.averageScore ?? scoreMoyen,
          scoreGlobal,
          serieJours: 4,
          derniereActivite: MOCK_HISTORIQUE[0]?.date ?? null,
          niveauActuel,
          competencesMaitrisees: totalMaitrisees,
          competencesTotales: totalCompetences
        },
        competences: {
          parDomaine,
          details: competenceDetails,
          recemmentAcquises,
          enProgression
        },
        historique: MOCK_HISTORIQUE,
        radar
      });

    } catch (err) {
      console.error('[Dashboard] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    loading,
    error,
    ...data,
    refresh: fetchDashboardData
  };
}

export default useDashboard;
