/**
 * Types pour le Dashboard Enseignant
 * Vue classe, suivi individuel et export des données
 * 
 * Conforme au document "TABLEAU DE BORD ANALYTIQUE CEREDIS"
 * et au "Schéma de rôles utilisateurs"
 */

import type { NiveauCECRL } from '@/services/integration/types';

// ============================================================================
// SYNTHÈSE ÉLÈVE
// ============================================================================

export interface SyntheseEleve {
  /** ID de l'élève */
  id: string;
  /** Nom complet */
  nom: string;
  /** Prénom */
  prenom: string;
  /** Niveau CECRL actuel (A1-C2) */
  niveauCECRL: NiveauCECRL;
  /** Score CEREDIS (0-600) */
  scoreCEREDIS: number;
  /** Zone de progression (ex: "B2-", "B2", "B2+") */
  zoneProgression: string;
  /** Tendance sur 30 jours: 'hausse' | 'stable' | 'baisse' */
  tendance: 'hausse' | 'stable' | 'baisse';
  /** Historique des scores pour sparkline (derniers 30 jours) */
  historiqueScores: PointProgression[];
  /** Date de dernière activité */
  derniereActivite: string | null;
  /** Nombre d'activités complétées */
  activitesCompletees: number;
  /** Temps total d'apprentissage (secondes) */
  tempsTotal: number;
}

export interface PointProgression {
  date: string;
  score: number;
}

// ============================================================================
// PROFIL PAR DOMAINES
// ============================================================================

export interface ProfilDomaineEleve {
  domaineId: string;
  domaineName: string;
  abbrev: 'CO' | 'CE' | 'PE' | 'INT' | 'META';
  score: number;
  scoreMax: number;
  couleur: string;
  niveauAtteint: NiveauCECRL | null;
  competencesMaitrisees: number;
  competencesTotal: number;
}

// ============================================================================
// COMPÉTENCES CRITIQUES (§3.4 du TABLEAU DE BORD ANALYTIQUE)
// ============================================================================

export interface CompetenceCritique {
  /** ID de la compétence (ex: "5.3") */
  id: string;
  /** Nom de la compétence */
  nom: string;
  /** Score actuel (0-100) */
  score: number;
  /** Seuil requis pour validation (généralement 60%) */
  seuilRequis: number;
  /** Statut de validation */
  statut: 'atteint' | 'non_atteint' | 'en_cours';
  /** Écart par rapport au seuil */
  ecart: number;
  /** Domaine parent */
  domaineId: string;
  /** Niveau CECRL de la compétence */
  niveau: NiveauCECRL;
  /** Est-ce un verrou bloquant pour le niveau suivant? */
  estVerrou: boolean;
}

// ============================================================================
// ANALYSE DES PREUVES (§3.5 du TABLEAU DE BORD ANALYTIQUE)
// ============================================================================

export type TypePreuve = 'P1' | 'P2' | 'P3' | 'P4';

export interface PreuveDetail {
  /** ID unique de la preuve */
  id: string;
  /** Type de preuve P1-P4 */
  type: TypePreuve;
  /** Label du type */
  typeLabel: string;
  /** Score obtenu (0-100) */
  score: number;
  /** Date de la preuve */
  date: string;
  /** Compétence évaluée */
  competenceId: string;
  /** Chanson associée */
  chanson: string;
  /** Séance associée */
  seance: string;
  /** Statut de validation */
  statut: 'valide' | 'en_attente' | 'refuse';
  /** Contenu/commentaire (pour accès direct) */
  contenu?: string;
}

/** Labels des types de preuves selon le référentiel CEREDIS */
export const TYPE_PREUVE_LABELS: Record<TypePreuve, { label: string; description: string }> = {
  'P1': { label: 'Réponse guidée', description: 'Reconnaissance' },
  'P2': { label: 'Analyse linguistique', description: 'Structuration' },
  'P3': { label: 'Production autonome', description: 'Intégration' },
  'P4': { label: 'Métacognition', description: 'Régulation' }
};

// ============================================================================
// VUE CLASSE
// ============================================================================

export interface StatistiquesClasse {
  /** Nombre total d'élèves */
  nombreEleves: number;
  /** Score CEREDIS moyen */
  scoreMoyen: number;
  /** Écart-type des scores */
  ecartType: number;
  /** Médiane des scores */
  mediane: number;
  /** Répartition par niveau CECRL */
  repartitionNiveaux: Record<NiveauCECRL, number>;
  /** Score moyen par domaine */
  scoresMoyensDomaines: {
    domaineId: string;
    domaineName: string;
    abbrev: string;
    scoreMoyen: number;
  }[];
  /** Taux de compétences seuils validées */
  tauxCompetencesValidees: number;
  /** Compétences les plus faibles (verrous communs) */
  verrousCommuns: CompetenceCritique[];
  /** Progression moyenne sur 30 jours */
  progressionMoyenne: number;
}

export interface ClasseInfo {
  id: string;
  nom: string;
  niveau: string;
  nombreEleves: number;
}

// ============================================================================
// EXPORT DE DONNÉES
// ============================================================================

export interface ExportConfig {
  format: 'csv' | 'json';
  scope: 'classe' | 'eleve';
  eleveId?: string;
  includeDetails: boolean;
  includePreuves: boolean;
  dateDebut?: string;
  dateFin?: string;
}

export interface ExportResult {
  filename: string;
  data: string;
  mimeType: string;
  size: number;
}

// ============================================================================
// DONNÉES DASHBOARD ENSEIGNANT
// ============================================================================

export interface TeacherDashboardData {
  loading: boolean;
  error: string | null;
  /** Classe sélectionnée */
  classe: ClasseInfo | null;
  /** Liste des élèves */
  eleves: SyntheseEleve[];
  /** Élève sélectionné (pour vue détaillée) */
  eleveSelectionne: SyntheseEleve | null;
  /** Statistiques globales de la classe */
  statistiques: StatistiquesClasse | null;
  /** Profil par domaines de l'élève sélectionné */
  profilDomaines: ProfilDomaineEleve[];
  /** Compétences critiques de l'élève sélectionné */
  competencesCritiques: CompetenceCritique[];
  /** Preuves de l'élève sélectionné */
  preuves: PreuveDetail[];
}

// ============================================================================
// CONSTANTES
// ============================================================================

/** Seuil de validation par défaut (60%) */
export const SEUIL_VALIDATION_DEFAUT = 60;

/** Mapping CEREDIS → CECRL */
export const MAPPING_CEREDIS_CECRL: Record<string, NiveauCECRL> = {
  '0-199': 'A1',
  '200-299': 'A2',
  '300-399': 'B1',
  '400-499': 'B2',
  '500-599': 'C1',
  '600': 'C2'
};

/** Fonction pour déterminer la zone de progression */
export function getZoneProgression(scoreCEREDIS: number, niveauCECRL: NiveauCECRL): string {
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

/** Fonction pour déterminer le niveau CECRL depuis un score CEREDIS */
export function getNiveauFromScore(scoreCEREDIS: number): NiveauCECRL {
  if (scoreCEREDIS >= 600) return 'C2';
  if (scoreCEREDIS >= 500) return 'C1';
  if (scoreCEREDIS >= 400) return 'B2';
  if (scoreCEREDIS >= 300) return 'B1';
  if (scoreCEREDIS >= 200) return 'A2';
  return 'A1';
}
