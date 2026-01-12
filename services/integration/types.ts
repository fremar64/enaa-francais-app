/**
 * Types pour l'intégration CaSS et xAPI
 * Basé sur le référentiel CEREDIS
 */

// ============================================================================
// TYPES CaSS (Competency and Skills System)
// ============================================================================

/**
 * Domaines du référentiel CEREDIS
 */
export enum CeredisDomaineId {
  COMPREHENSION_ORAL = '1',
  COMPREHENSION_ECRIT = '2',
  PRODUCTION_ECRITE = '3',
  INTERACTION = '4',
  METALINGUISTIQUE = '5'
}

/**
 * Niveaux CECRL
 */
export type NiveauCECRL = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/**
 * Compétence du référentiel CEREDIS
 */
export interface CeredisCompetence {
  id: string; // ex: "5.1", "5.2"
  code: string; // ex: "comp-5-1"
  name: string;
  description: string;
  domain: CeredisDomaineId;
  level: NiveauCECRL;
  framework: 'CEREDIS-CECRL-Enrichi';
  cassId?: string; // ID CaSS si déjà créé
}

/**
 * RÉFÉRENTIEL COMPLET CEREDIS - Toutes les compétences (5 domaines, 19 compétences)
 * Aligné sur le CECRL et enrichi par la dimension métalinguistique/métacognitive
 */
export const COMPETENCES_CEREDIS: Record<string, CeredisCompetence> = {
  // ============================================================================
  // DOMAINE 1 — Compréhension de l'oral (chansons)
  // ============================================================================
  '1.1': {
    id: '1.1',
    code: 'comp-1-1',
    name: 'Comprendre le sens global d\'une chanson',
    description: 'Identifier le thème général et l\'émotion dominante à partir de l\'écoute.',
    domain: CeredisDomaineId.COMPREHENSION_ORAL,
    level: 'A2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '1.2': {
    id: '1.2',
    code: 'comp-1-2',
    name: 'Identifier des éléments implicites à l\'oral',
    description: 'Repérer une intention, une tension ou un non-dit dans une chanson.',
    domain: CeredisDomaineId.COMPREHENSION_ORAL,
    level: 'B1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '1.3': {
    id: '1.3',
    code: 'comp-1-3',
    name: 'Interpréter une intention implicite complexe',
    description: 'Interpréter une position, un conflit ou un dilemme exprimé implicitement.',
    domain: CeredisDomaineId.COMPREHENSION_ORAL,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },

  // ============================================================================
  // DOMAINE 2 — Compréhension de l'écrit (paroles)
  // ============================================================================
  '2.1': {
    id: '2.1',
    code: 'comp-2-1',
    name: 'Comprendre un texte chanté narratif',
    description: 'Comprendre le contenu explicite d\'un texte chanté.',
    domain: CeredisDomaineId.COMPREHENSION_ECRIT,
    level: 'B1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '2.2': {
    id: '2.2',
    code: 'comp-2-2',
    name: 'Identifier un point de vue dans les paroles',
    description: 'Identifier la position énonciative du locuteur.',
    domain: CeredisDomaineId.COMPREHENSION_ECRIT,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '2.3': {
    id: '2.3',
    code: 'comp-2-3',
    name: 'Analyser un texte symbolique complexe',
    description: 'Comprendre un texte reposant sur symboles et métaphores.',
    domain: CeredisDomaineId.COMPREHENSION_ECRIT,
    level: 'C1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },

  // ============================================================================
  // DOMAINE 3 — Production écrite
  // ============================================================================
  '3.1': {
    id: '3.1',
    code: 'comp-3-1',
    name: 'Exprimer une opinion personnelle argumentée',
    description: 'Donner un avis personnel en lien avec une chanson.',
    domain: CeredisDomaineId.PRODUCTION_ECRITE,
    level: 'B1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '3.2': {
    id: '3.2',
    code: 'comp-3-2',
    name: 'Rédiger un commentaire structuré',
    description: 'Produire un commentaire organisé et cohérent.',
    domain: CeredisDomaineId.PRODUCTION_ECRITE,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '3.3': {
    id: '3.3',
    code: 'comp-3-3',
    name: 'Produire une dissertation interprétative',
    description: 'Défendre une interprétation complexe et structurée.',
    domain: CeredisDomaineId.PRODUCTION_ECRITE,
    level: 'C1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },

  // ============================================================================
  // DOMAINE 4 — Interaction et confrontation des interprétations
  // ============================================================================
  '4.1': {
    id: '4.1',
    code: 'comp-4-1',
    name: 'Réagir à l\'interprétation d\'un pair',
    description: 'Comprendre et commenter une interprétation différente.',
    domain: CeredisDomaineId.INTERACTION,
    level: 'B1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '4.2': {
    id: '4.2',
    code: 'comp-4-2',
    name: 'Comparer plusieurs interprétations',
    description: 'Mettre en contraste deux lectures d\'un même texte.',
    domain: CeredisDomaineId.INTERACTION,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '4.3': {
    id: '4.3',
    code: 'comp-4-3',
    name: 'Conduire un débat interprétatif structuré',
    description: 'Argumenter, répondre à une objection, reformuler.',
    domain: CeredisDomaineId.INTERACTION,
    level: 'C1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },

  // ============================================================================
  // DOMAINE 5 — Compétences métalinguistiques & métacognitives (Innovation CEREDIS)
  // ============================================================================
  '5.1': {
    id: '5.1',
    code: 'comp-5-1',
    name: 'Identifier des formes grammaticales dans un texte',
    description: 'Repérer dans un texte écrit ou oral des formes grammaticales simples (temps verbaux, modes, connecteurs, subordonnants).',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'A2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.2': {
    id: '5.2',
    code: 'comp-5-2',
    name: 'Relier une forme grammaticale à un effet de sens',
    description: 'Expliquer simplement comment une forme linguistique contribue au sens global d\'un énoncé.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'B1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.3': {
    id: '5.3',
    code: 'comp-5-3',
    name: 'Analyser la valeur sémantique d\'un mode ou temps verbal',
    description: 'Expliquer la valeur sémantique d\'un mode ou temps verbal (indicatif, conditionnel, subjonctif) dans un contexte donné.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.4': {
    id: '5.4',
    code: 'comp-5-4',
    name: 'Analyser une phrase complexe comme structure du raisonnement',
    description: 'Montrer comment la structure syntaxique d\'une phrase complexe (subordination, condition) organise la pensée exprimée.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.5': {
    id: '5.5',
    code: 'comp-5-5',
    name: 'Mobiliser l\'analyse linguistique pour interpréter un texte',
    description: 'Utiliser consciemment l\'analyse grammaticale, lexicale et stylistique pour construire une interprétation argumentée d\'un texte.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'C1',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.6': {
    id: '5.6',
    code: 'comp-5-6',
    name: 'Verbaliser ses stratégies de compréhension',
    description: 'Expliquer comment on s\'y est pris pour comprendre un texte ou résoudre une difficulté linguistique.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'B2',
    framework: 'CEREDIS-CECRL-Enrichi'
  },
  '5.7': {
    id: '5.7',
    code: 'comp-5-7',
    name: 'Réguler consciemment sa production écrite',
    description: 'Ajuster volontairement son écriture en mobilisant des connaissances grammaticales et stylistiques.',
    domain: CeredisDomaineId.METALINGUISTIQUE,
    level: 'C1',
    framework: 'CEREDIS-CECRL-Enrichi'
  }
};

/**
 * Alias pour compatibilité arrière
 */
export const COMPETENCES_METALINGUISTIQUES = COMPETENCES_CEREDIS;

/**
 * Mapping types d'activités → compétences CEREDIS
 * Basé sur la MATRICE OPÉRATIONNELLE et le MAPPING OPÉRATIONNEL FINAL
 * 
 * Règle CaSS : Une compétence n'est validée que si une preuve explicite, 
 * traçable et interprétable cognitivement est produite.
 */
export const MAPPING_ACTIVITES_COMPETENCES: Record<string, string[]> = {
  // ============================================================================
  // Activités de réception / compréhension (Famille A1)
  // MAPPING A1 : Écoute → 5.2 (Relier forme/sens) selon MAPPING OPÉRATIONNEL
  // ============================================================================
  'ecoute_decouverte': ['1.1', '5.2'],             // Compréhension globale + forme/sens (A1)
  'ecoute_guidee': ['1.1', '1.2', '5.2'],          // Compréhension + implicite + forme/sens
  'lecture_paroles': ['2.1'],                       // Compréhension écrit narratif
  
  // ============================================================================
  // Activités d'analyse linguistique (Famille A2)
  // RÈGLE DE NON-AUTOMATISME : QCM seul ne valide pas 5.x
  // ============================================================================
  'qcm': ['1.1', '2.1'],                           // Compréhension uniquement (pas de 5.x sans justification)
  'qcm_avec_justification': ['1.1', '2.1', '5.1', '5.2'], // QCM + justification écrite → 5.x validable
  'qcm_comprehension': ['1.1', '1.2', '2.1'],      // Compréhension orale/écrite
  'qcm_grammaire': ['5.1'],                        // Identification formes seulement (pas 5.2/5.3 sans preuve)
  'texte_trous': ['5.1', '5.3'],                   // Identification + analyse sémantique
  'ordre_elements': ['2.1', '5.4'],                 // Compréhension structure + phrase complexe
  'analyse_guidee': ['5.3', '5.4'],                 // Analyse modes/temps + phrase complexe
  'reperage_formes': ['5.1'],                       // Identification formes grammaticales
  
  // ============================================================================
  // Activités de production écrite (Famille A3)
  // ============================================================================
  'texte_libre': ['3.1', '5.5', '5.6', '5.7'],     // Production + métalinguistique
  'production_ecrite': ['3.1', '3.2', '5.5', '5.7'], // Production structurée
  'commentaire_compose': ['3.2', '3.3', '5.5'],    // Commentaire + mobilisation analyse
  'dissertation': ['3.3', '5.5'],                   // Dissertation interprétative
  
  // ============================================================================
  // Activités métacognitives (Famille A4)
  // ============================================================================
  'journal_reflexif': ['5.6'],                      // Verbalisation stratégies
  'auto_evaluation': ['5.6', '5.7'],               // Métacognition
  'bilan': ['5.6'],                                 // Retour réflexif
  
  // ============================================================================
  // Activités d'interaction (Domaine 4)
  // ============================================================================
  'debat': ['4.1', '4.2', '4.3'],                  // Débat interprétatif
  'reponse_pair': ['4.1'],                          // Réaction à un pair
  'comparaison_interpretations': ['4.2', '2.2']    // Comparaison + point de vue
};

/**
 * Assertion CaSS
 */
export interface CassAssertion {
  '@context': string;
  '@type': 'ceasn:Assertion';
  competency: string;
  subject: string;
  evidence: string;
  level: NiveauCECRL;
  confidence: number;
  assertedDate: string;
}

/**
 * Statement xAPI
 */
export interface XApiStatement {
  actor: {
    mbox: string;
    name: string;
    objectType: 'Agent';
  };
  verb: {
    id: string;
    display: Record<string, string>;
  };
  object: {
    id: string;
    objectType: 'Activity';
    definition: {
      name: Record<string, string>;
      type: string;
      extensions?: Record<string, any>;
    };
  };
  result?: {
    score?: {
      scaled: number;
      raw: number;
      min: number;
      max: number;
    };
    success?: boolean;
    completion?: boolean;
    duration?: string;
  };
  context?: any;
  timestamp?: string;
}

export const XAPI_VERBS = {
  ATTEMPTED: {
    id: 'http://adlnet.gov/expapi/verbs/attempted',
    display: { 'fr-FR': 'a démarré' }
  },
  COMPLETED: {
    id: 'http://adlnet.gov/expapi/verbs/completed',
    display: { 'fr-FR': 'a complété' }
  },
  MASTERED: {
    id: 'http://adlnet.gov/expapi/verbs/mastered',
    display: { 'fr-FR': 'a maîtrisé' }
  }
} as const;
