// Types pour le système de séances pédagogiques

export type TypeEcran =
  | 'introduction'
  | 'ecoute_decouverte'
  | 'ecoute_guidee'
  | 'comprehension'
  | 'quiz_qcm'
  | 'quiz_qcm_justifie'     // QCM avec justification pour Domaine 5
  | 'texte_a_trous'
  | 'ordre_elements'
  | 'analyse_textuelle'
  | 'grammaire'
  | 'vocabulaire'
  | 'production_ecrite'
  | 'production_orale'
  | 'texte_libre'           // Production écrite libre
  | 'journal_reflexif'      // Métacognition
  | 'debat'                 // Débat interprétatif
  | 'bilan';

export type DifficulteNiveau = 'facile' | 'moyen' | 'difficile';

// Types d'activités et leurs données
export interface QuestionQCM {
  id: string;
  question: string;
  options: string[];
  reponseCorrecte: number; // index de la bonne réponse
  explication?: string;
}

/**
 * Question QCM avec justification obligatoire
 * MAPPING OPÉRATIONNEL §4.3 : Permet de valider 5.1, 5.2
 */
export interface QuestionQCMJustifie extends QuestionQCM {
  promptJustification?: string;
  justificationMinLength?: number;
}

export interface TexteATrousData {
  id: string;
  texteAvecTrous: string; // Ex: "Je {{mange}} une {{pomme}}"
  motsCaches: string[]; // Les mots à trouver
  indicesOptionnels?: string[];
}

export interface OrdreElementsData {
  id: string;
  consigne: string;
  elements: { id: string; texte: string; ordre: number }[];
}

export interface AnalyseTexteData {
  id: string;
  extrait: string;
  questions: {
    question: string;
    type: 'ouvert' | 'selection' | 'choix';
    options?: string[];
    reponseAttendue?: string;
  }[];
}

export interface ProductionEcriteData {
  id: string;
  consigne: string;
  nombreMotsMin?: number;
  nombreMotsMax?: number;
  aideRedaction?: string[];
}

// Types pour les nouveaux composants d'activités
export interface TexteLibreData {
  id: string;
  consigne: string;
  contexte?: string;
  nombreMotsMin?: number;
  nombreMotsMax?: number;
  aideRedaction?: string[];
  criteres?: {
    label: string;
    description: string;
    points: number;
  }[];
}

export interface JournalReflexifData {
  id: string;
  titre: string;
  questionPrincipale: string;
  sousQuestions?: string[];
  echelleDifficulte?: boolean;
  promptsReflexion?: string[];
}

// Union type pour toutes les données d'activités
export type ActiviteData =
  | { type: 'quiz_qcm'; questions: QuestionQCM[] }
  | { type: 'quiz_qcm_justifie'; questions: QuestionQCMJustifie[] }
  | { type: 'texte_a_trous'; exercice: TexteATrousData }
  | { type: 'ordre_elements'; exercice: OrdreElementsData }
  | { type: 'analyse_textuelle'; exercice: AnalyseTexteData }
  | { type: 'production_ecrite'; exercice: ProductionEcriteData }
  | { type: 'texte_libre'; exercice: TexteLibreData }
  | { type: 'journal_reflexif'; exercice: JournalReflexifData }
  | { type: 'introduction' | 'ecoute_decouverte' | 'ecoute_guidee' | 'bilan'; contenu: string };

// Structure d'un écran de séance
export interface Ecran {
  id: string;
  numero: number;
  titre: string;
  type: TypeEcran;
  consigne: string;
  difficulte?: DifficulteNiveau;
  dureeEstimee?: number; // en minutes
  activite: ActiviteData;
  // Timestamps audio pour cet écran (optionnel)
  audioDebut?: number;
  audioFin?: number;
  // Compétences travaillées
  competencesCibles?: string[];
}

// Structure d'une séance complète
export interface Seance {
  id: string;
  chansonId: string;
  numero: number;
  titre: string;
  description: string;
  objectifs: string[];
  dureeEstimee: number; // en minutes
  ecrans: Ecran[];
  competences: string[];
  prerequis?: string[]; // IDs de séances à compléter avant
  suivantes?: string[]; // IDs de séances suggérées après
}

// État de progression d'un apprenant sur une séance
export interface ProgressionSeance {
  seanceId: string;
  userId: string;
  ecranActuel: number;
  ecransCompletes: string[]; // IDs des écrans complétés
  scoreTotal: number;
  tempsTotal: number; // en secondes
  dateDebut: string;
  dateDerniereActivite: string;
  statut: 'non_commence' | 'en_cours' | 'termine';
}

// Réponse à une activité
export interface ReponseActivite {
  ecranId: string;
  userId: string;
  reponse: unknown; // Dépend du type d'activité
  score: number; // 0 à 100
  tentatives: number;
  tempsReponse: number; // en secondes
  timestamp: string;
}

// Feedback après une activité
export interface FeedbackActivite {
  type: 'succes' | 'partiel' | 'echec';
  score: number;
  message: string;
  details?: string;
  conseil?: string;
}
