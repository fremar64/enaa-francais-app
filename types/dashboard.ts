/**
 * Types pour le Dashboard Apprenant
 * Visualisation de la progression et des compétences acquises
 */

import type { NiveauCECRL } from '@/services/integration/types';

// ============================================================================
// PROGRESSION GLOBALE
// ============================================================================

export interface ProgressionGlobale {
  /** Nombre total d'activités complétées */
  activitesCompletees: number;
  /** Nombre total de séances terminées */
  seancesTerminees: number;
  /** Nombre total de chansons étudiées */
  chansonsEtudiees: number;
  /** Temps total d'apprentissage en secondes */
  tempsTotal: number;
  /** Score moyen sur toutes les activités (0-100) */
  scoreMoyen: number;
  /** Score global de progression (0-100) */
  scoreGlobal: number;
  /** Série actuelle de jours consécutifs d'apprentissage */
  serieJours: number;
  /** Date de la dernière activité */
  derniereActivite: string | null;
  /** Niveau CECRL actuel de l'apprenant */
  niveauActuel: NiveauCECRL;
  /** Nombre de compétences maîtrisées */
  competencesMaitrisees: number;
  /** Nombre total de compétences */
  competencesTotales: number;
}

// ============================================================================
// COMPÉTENCES PAR DOMAINE
// ============================================================================

export interface CompetenceDomaine {
  /** ID du domaine (1-5) */
  domaineId: string;
  /** Nom du domaine */
  domaineName: string;
  /** Nombre de compétences maîtrisées dans ce domaine */
  competencesMaitrisees: number;
  /** Nombre total de compétences dans ce domaine */
  competencesTotal: number;
  /** Score moyen du domaine (0-100) */
  scoreMoyen: number;
  /** Niveau CECRL atteint */
  niveauAtteint: NiveauCECRL | null;
}

export interface CompetenceDetail {
  /** ID de la compétence (ex: "5.1") */
  id: string;
  /** Code technique (ex: "comp-5-1") */
  code: string;
  /** Nom de la compétence */
  name: string;
  /** Description complète */
  description: string;
  /** Domaine (1-5) */
  domaineId: string;
  /** Niveau CECRL requis */
  niveau: NiveauCECRL;
  /** Statut de maîtrise */
  statut: 'non_commence' | 'en_cours' | 'maitrise';
  /** Score actuel (0-100) */
  score: number;
  /** Nombre de preuves validées */
  preuves: number;
  /** Confiance CaSS (0-1) */
  confidence: number;
  /** Date de dernière évaluation */
  derniereEvaluation: string | null;
}

export interface ProfilCompetences {
  /** Données par domaine pour le radar */
  parDomaine: CompetenceDomaine[];
  /** Détail de toutes les compétences */
  details: CompetenceDetail[];
  /** Compétences récemment acquises */
  recemmentAcquises: CompetenceDetail[];
  /** Compétences en cours de travail */
  enProgression: CompetenceDetail[];
}

// ============================================================================
// HISTORIQUE DES ACTIVITÉS
// ============================================================================

export interface ActiviteHistorique {
  /** ID unique de l'activité */
  id: string;
  /** Nom de l'activité */
  nom: string;
  /** Type d'activité */
  type: string;
  /** Nom de la chanson */
  chanson: string;
  /** Nom de la séance */
  seance: string;
  /** Score obtenu (0-100) */
  score: number;
  /** Durée en secondes */
  duree: number;
  /** Date de complétion */
  date: string;
  /** Compétences travaillées */
  competences: string[];
  /** Feedback reçu */
  feedback?: 'succes' | 'partiel' | 'echec';
}

// ============================================================================
// DONNÉES RADAR
// ============================================================================

export interface DonneesRadar {
  /** Label du domaine */
  domaine: string;
  /** Abréviation pour le graphique */
  abbrev: string;
  /** Score actuel (0-100) */
  score: number;
  /** Score maximum possible */
  scoreMax: number;
  /** Couleur du domaine */
  couleur: string;
}

// ============================================================================
// DASHBOARD COMPLET
// ============================================================================

export interface DashboardData {
  /** Chargement en cours */
  loading: boolean;
  /** Erreur éventuelle */
  error: string | null;
  /** Progression globale */
  progression: ProgressionGlobale;
  /** Profil de compétences */
  competences: ProfilCompetences;
  /** Historique des activités (dernières 20) */
  historique: ActiviteHistorique[];
  /** Données formatées pour le radar */
  radar: DonneesRadar[];
}

// ============================================================================
// CONSTANTES POUR LE RADAR
// ============================================================================

export const DOMAINES_CEREDIS = [
  {
    id: '1',
    name: 'Compréhension orale',
    abbrev: 'CO',
    couleur: '#3B82F6', // blue-500
    competencesIds: ['1.1', '1.2', '1.3']
  },
  {
    id: '2',
    name: 'Compréhension écrite',
    abbrev: 'CE',
    couleur: '#10B981', // emerald-500
    competencesIds: ['2.1', '2.2', '2.3']
  },
  {
    id: '3',
    name: 'Production écrite',
    abbrev: 'PE',
    couleur: '#F59E0B', // amber-500
    competencesIds: ['3.1', '3.2', '3.3']
  },
  {
    id: '4',
    name: 'Interaction',
    abbrev: 'INT',
    couleur: '#EF4444', // red-500
    competencesIds: ['4.1', '4.2', '4.3']
  },
  {
    id: '5',
    name: 'Métalinguistique',
    abbrev: 'META',
    couleur: '#8B5CF6', // violet-500
    competencesIds: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
];
