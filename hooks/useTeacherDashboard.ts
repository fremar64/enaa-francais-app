/**
 * Hook useTeacherDashboard
 * Récupère et agrège les données pour le Dashboard Enseignant
 * 
 * Conforme au document "TABLEAU DE BORD ANALYTIQUE CEREDIS"
 * Accès scoped aux données de la classe de l'enseignant
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { pb } from '@/lib/pocketbase';
import { COMPETENCES_CEREDIS } from '@/services/integration/types';
import type {
  SyntheseEleve,
  StatistiquesClasse,
  ProfilDomaineEleve,
  CompetenceCritique,
  PreuveDetail,
  ClasseInfo,
  ExportConfig,
  ExportResult,
  PointProgression
} from '@/types/teacher-dashboard';
import type { NiveauCECRL } from '@/services/integration/types';

// Données de domaines
const DOMAINES = [
  { id: '1', name: 'Compréhension orale', abbrev: 'CO' as const, couleur: '#3B82F6', competencesIds: ['1.1', '1.2', '1.3'] },
  { id: '2', name: 'Compréhension écrite', abbrev: 'CE' as const, couleur: '#10B981', competencesIds: ['2.1', '2.2', '2.3'] },
  { id: '3', name: 'Production écrite', abbrev: 'PE' as const, couleur: '#F59E0B', competencesIds: ['3.1', '3.2', '3.3'] },
  { id: '4', name: 'Interaction', abbrev: 'INT' as const, couleur: '#EF4444', competencesIds: ['4.1', '4.2', '4.3'] },
  { id: '5', name: 'Métacognition', abbrev: 'META' as const, couleur: '#8B5CF6', competencesIds: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'] }
];

// ============================================================================
// DONNÉES MOCK POUR DÉVELOPPEMENT
// ============================================================================

function generateMockHistorique(): PointProgression[] {
  const points: PointProgression[] = [];
  let score = 350 + Math.random() * 100;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    score += (Math.random() - 0.4) * 15; // Tendance légèrement positive
    score = Math.max(200, Math.min(550, score));
    points.push({
      date: date.toISOString(),
      score: Math.round(score)
    });
  }
  return points;
}

function generateMockEleves(): SyntheseEleve[] {
  const prenoms = ['Antoine', 'Marie', 'Lucas', 'Emma', 'Hugo', 'Léa', 'Nathan', 'Chloé', 'Théo', 'Manon'];
  const noms = ['Dupont', 'Martin', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Michel'];
  
  return prenoms.map((prenom, i) => {
    const scoreCEREDIS = 250 + Math.floor(Math.random() * 300);
    const niveau = getNiveauFromScoreMock(scoreCEREDIS);
    const historiqueScores = generateMockHistorique();
    const tendanceValue = historiqueScores[historiqueScores.length - 1].score - historiqueScores[0].score;
    
    return {
      id: `eleve-${i + 1}`,
      nom: noms[i],
      prenom: prenom,
      niveauCECRL: niveau,
      scoreCEREDIS,
      zoneProgression: getZoneProgressionMock(scoreCEREDIS, niveau),
      tendance: tendanceValue > 10 ? 'hausse' : tendanceValue < -10 ? 'baisse' : 'stable',
      historiqueScores,
      derniereActivite: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      activitesCompletees: 10 + Math.floor(Math.random() * 30),
      tempsTotal: 3600 + Math.floor(Math.random() * 18000)
    };
  });
}

function getNiveauFromScoreMock(score: number): NiveauCECRL {
  if (score >= 600) return 'C2';
  if (score >= 500) return 'C1';
  if (score >= 400) return 'B2';
  if (score >= 300) return 'B1';
  if (score >= 200) return 'A2';
  return 'A1';
}

function getZoneProgressionMock(scoreCEREDIS: number, niveauCECRL: NiveauCECRL): string {
  const seuilsBas: Record<NiveauCECRL, number> = {
    'A1': 0, 'A2': 200, 'B1': 300, 'B2': 400, 'C1': 500, 'C2': 600
  };
  const seuilsHaut: Record<NiveauCECRL, number> = {
    'A1': 199, 'A2': 299, 'B1': 399, 'B2': 499, 'C1': 599, 'C2': 600
  };
  
  const bas = seuilsBas[niveauCECRL];
  const haut = seuilsHaut[niveauCECRL];
  const range = haut - bas;
  const position = scoreCEREDIS - bas;
  const ratio = position / range;
  
  if (ratio < 0.33) return `${niveauCECRL}-`;
  if (ratio > 0.66) return `${niveauCECRL}+`;
  return niveauCECRL;
}

function generateMockProfilDomaines(): ProfilDomaineEleve[] {
  return DOMAINES.map(domaine => ({
    domaineId: domaine.id,
    domaineName: domaine.name,
    abbrev: domaine.abbrev,
    score: 40 + Math.floor(Math.random() * 50),
    scoreMax: 100,
    couleur: domaine.couleur,
    niveauAtteint: ['A2', 'B1', 'B2'][Math.floor(Math.random() * 3)] as NiveauCECRL,
    competencesMaitrisees: Math.floor(Math.random() * domaine.competencesIds.length),
    competencesTotal: domaine.competencesIds.length
  }));
}

function generateMockCompetencesCritiques(): CompetenceCritique[] {
  const competences: CompetenceCritique[] = [];
  
  Object.entries(COMPETENCES_CEREDIS).forEach(([id, comp]) => {
    const score = Math.floor(Math.random() * 100);
    const seuilRequis = 60;
    
    competences.push({
      id,
      nom: comp.name,
      score,
      seuilRequis,
      statut: score >= seuilRequis ? 'atteint' : score >= seuilRequis - 15 ? 'en_cours' : 'non_atteint',
      ecart: score - seuilRequis,
      domaineId: comp.domain,
      niveau: comp.level,
      estVerrou: score < seuilRequis && ['5.3', '3.2', '2.1'].includes(id)
    });
  });
  
  return competences.sort((a, b) => a.ecart - b.ecart); // Trier par écart (les plus faibles en premier)
}

function generateMockPreuves(eleveId: string): PreuveDetail[] {
  const types: Array<'P1' | 'P2' | 'P3' | 'P4'> = ['P1', 'P2', 'P3', 'P4'];
  const typeLabels = {
    'P1': 'Réponse guidée',
    'P2': 'Analyse linguistique',
    'P3': 'Production autonome',
    'P4': 'Métacognition'
  };
  
  const preuves: PreuveDetail[] = [];
  
  for (let i = 0; i < 12; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    preuves.push({
      id: `preuve-${eleveId}-${i}`,
      type,
      typeLabel: typeLabels[type],
      score: 50 + Math.floor(Math.random() * 50),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      competenceId: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 3) + 1}`,
      chanson: ['Là-bas', 'Né en 17 à Leidenstadt', 'La Bohème'][Math.floor(Math.random() * 3)],
      seance: `Séance ${Math.floor(Math.random() * 4) + 1}`,
      statut: Math.random() > 0.2 ? 'valide' : 'en_attente'
    });
  }
  
  return preuves.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function calculateMockStatistiques(eleves: SyntheseEleve[]): StatistiquesClasse {
  const scores = eleves.map(e => e.scoreCEREDIS);
  const scoreMoyen = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  // Écart-type
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - scoreMoyen, 2), 0) / scores.length;
  const ecartType = Math.round(Math.sqrt(variance));
  
  // Médiane
  const sorted = [...scores].sort((a, b) => a - b);
  const mediane = sorted.length % 2 === 0
    ? Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2)
    : sorted[Math.floor(sorted.length / 2)];
  
  // Répartition par niveau
  const repartitionNiveaux: Record<NiveauCECRL, number> = { 'A1': 0, 'A2': 0, 'B1': 0, 'B2': 0, 'C1': 0, 'C2': 0 };
  eleves.forEach(e => { repartitionNiveaux[e.niveauCECRL]++; });
  
  return {
    nombreEleves: eleves.length,
    scoreMoyen,
    ecartType,
    mediane,
    repartitionNiveaux,
    scoresMoyensDomaines: DOMAINES.map(d => ({
      domaineId: d.id,
      domaineName: d.name,
      abbrev: d.abbrev,
      scoreMoyen: 40 + Math.floor(Math.random() * 40)
    })),
    tauxCompetencesValidees: 45 + Math.floor(Math.random() * 30),
    verrousCommuns: generateMockCompetencesCritiques().filter(c => c.estVerrou).slice(0, 3),
    progressionMoyenne: Math.round((Math.random() - 0.3) * 30)
  };
}

// ============================================================================
// FONCTIONS D'EXPORT
// ============================================================================

function exportToCSV(eleves: SyntheseEleve[], statistiques: StatistiquesClasse | null): string {
  const headers = ['Nom', 'Prénom', 'Niveau CECRL', 'Score CEREDIS', 'Zone', 'Tendance', 'Activités', 'Temps (min)', 'Dernière activité'];
  const rows = eleves.map(e => [
    e.nom,
    e.prenom,
    e.niveauCECRL,
    e.scoreCEREDIS.toString(),
    e.zoneProgression,
    e.tendance,
    e.activitesCompletees.toString(),
    Math.round(e.tempsTotal / 60).toString(),
    e.derniereActivite ? new Date(e.derniereActivite).toLocaleDateString('fr-FR') : 'N/A'
  ]);
  
  let csv = headers.join(';') + '\n';
  csv += rows.map(r => r.join(';')).join('\n');
  
  if (statistiques) {
    csv += '\n\n--- STATISTIQUES CLASSE ---\n';
    csv += `Score moyen;${statistiques.scoreMoyen}\n`;
    csv += `Écart-type;${statistiques.ecartType}\n`;
    csv += `Médiane;${statistiques.mediane}\n`;
    csv += `Taux compétences validées;${statistiques.tauxCompetencesValidees}%\n`;
  }
  
  return csv;
}

function exportToJSON(
  eleves: SyntheseEleve[], 
  statistiques: StatistiquesClasse | null,
  includeDetails: boolean
): string {
  const data = {
    exportDate: new Date().toISOString(),
    classe: {
      statistiques: statistiques
    },
    eleves: includeDetails 
      ? eleves 
      : eleves.map(e => ({
          id: e.id,
          nom: e.nom,
          prenom: e.prenom,
          niveauCECRL: e.niveauCECRL,
          scoreCEREDIS: e.scoreCEREDIS,
          zoneProgression: e.zoneProgression,
          tendance: e.tendance
        }))
  };
  
  return JSON.stringify(data, null, 2);
}

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

export function useTeacherDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [classe, setClasse] = useState<ClasseInfo | null>(null);
  const [eleves, setEleves] = useState<SyntheseEleve[]>([]);
  const [eleveSelectionne, setEleveSelectionne] = useState<SyntheseEleve | null>(null);
  const [statistiques, setStatistiques] = useState<StatistiquesClasse | null>(null);
  const [profilDomaines, setProfilDomaines] = useState<ProfilDomaineEleve[]>([]);
  const [competencesCritiques, setCompetencesCritiques] = useState<CompetenceCritique[]>([]);
  const [preuves, setPreuves] = useState<PreuveDetail[]>([]);

  // Sélectionner un élève et charger ses données détaillées
  const selectEleve = useCallback((eleve: SyntheseEleve) => {
    setEleveSelectionne(eleve);
    setProfilDomaines(generateMockProfilDomaines());
    setCompetencesCritiques(generateMockCompetencesCritiques());
    setPreuves(generateMockPreuves(eleve.id));
  }, []);

  // Charger les données de la classe
  const fetchClasseData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Pour le moment, utiliser les données mock
      // TODO: Remplacer par appels réels à PocketBase/CaSS
      
      const mockEleves = generateMockEleves();
      const mockStats = calculateMockStatistiques(mockEleves);
      
      setClasse({
        id: 'classe-1',
        nom: 'Classe FLE B1-B2',
        niveau: 'B1-B2',
        nombreEleves: mockEleves.length
      });
      
      setEleves(mockEleves);
      setStatistiques(mockStats);
      
      // Sélectionner le premier élève par défaut
      if (mockEleves.length > 0) {
        selectEleve(mockEleves[0]);
      }
      
    } catch (err) {
      console.error('[TeacherDashboard] Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [user, selectEleve]);

  // Exporter les données
  const exportData = useCallback((config: ExportConfig): ExportResult => {
    const dataEleves = config.scope === 'eleve' && config.eleveId
      ? eleves.filter(e => e.id === config.eleveId)
      : eleves;
    
    let data: string;
    let mimeType: string;
    let extension: string;
    
    if (config.format === 'csv') {
      data = exportToCSV(dataEleves, statistiques);
      mimeType = 'text/csv;charset=utf-8';
      extension = 'csv';
    } else {
      data = exportToJSON(dataEleves, statistiques, config.includeDetails);
      mimeType = 'application/json';
      extension = 'json';
    }
    
    const filename = `export_${config.scope}_${new Date().toISOString().split('T')[0]}.${extension}`;
    
    return {
      filename,
      data,
      mimeType,
      size: new Blob([data]).size
    };
  }, [eleves, statistiques]);

  // Télécharger l'export
  const downloadExport = useCallback((config: ExportConfig) => {
    const result = exportData(config);
    
    const blob = new Blob([result.data], { type: result.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return result;
  }, [exportData]);

  // Filtrer les compétences critiques
  const getCompetencesVerrous = useCallback(() => {
    return competencesCritiques.filter(c => c.estVerrou);
  }, [competencesCritiques]);

  // Filtrer les preuves par compétence
  const getPreuvesByCompetence = useCallback((competenceId: string) => {
    return preuves.filter(p => p.competenceId === competenceId);
  }, [preuves]);

  useEffect(() => {
    fetchClasseData();
  }, [fetchClasseData]);

  return {
    // État
    loading,
    error,
    classe,
    eleves,
    eleveSelectionne,
    statistiques,
    profilDomaines,
    competencesCritiques,
    preuves,
    
    // Actions
    refresh: fetchClasseData,
    selectEleve,
    exportData,
    downloadExport,
    
    // Helpers
    getCompetencesVerrous,
    getPreuvesByCompetence
  };
}

export default useTeacherDashboard;
