/**
 * Types TypeScript complets pour le Dashboard CEREDIS
 */

// ============================================================================
// TYPES POUR LES SCORES CEREDIS
// ============================================================================

export interface CeredisScore {
  userId: string;
  ceredisScore: number; // 0-600
  cecrlLevel: 'A2' | 'B1' | 'B2' | 'C1';
  domainScores: Record<string, number>; // D1-D5, scores 0-100
  competencyScores: Record<string, CompetencyScore>; // 19 compétences
  validation: ValidationResult;
  computedAt: string; // ISO timestamp
  engineVersion: string;
}

export interface CompetencyScore {
  score: number; // 0-100
  evidenceCount: number;
  evidenceTypes: string[]; // ['P1', 'P2', ...]
}

export interface ValidationResult {
  valid: boolean;
  level: 'A2' | 'B1' | 'B2' | 'C1';
  errors: string[];
  warnings: string[];
  degradationReason?: string;
}

export interface Evidence {
  id: string;
  userId: string;
  competencyId: string;
  type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// INFORMATIONS SUR LES DOMAINES
// ============================================================================

export interface DomainInfo {
  id: string;
  name: string;
  description: string;
  weight: number;
  color: string;
  competencies: string[];
}

export const DOMAIN_INFO: Record<string, DomainInfo> = {
  D1: {
    id: 'D1',
    name: 'Compréhension de l\'oral (chansons)',
    description: 'Capacité à comprendre les chansons françaises à l\'écoute',
    weight: 0.20,
    color: '#3B82F6', // blue-500
    competencies: ['1.1', '1.2', '1.3']
  },
  D2: {
    id: 'D2',
    name: 'Compréhension de l\'écrit (paroles)',
    description: 'Capacité à comprendre les paroles écrites des chansons',
    weight: 0.20,
    color: '#10B981', // green-500
    competencies: ['2.1', '2.2', '2.3']
  },
  D3: {
    id: 'D3',
    name: 'Production écrite',
    description: 'Capacité à produire des textes en français',
    weight: 0.20,
    color: '#F59E0B', // amber-500
    competencies: ['3.1', '3.2', '3.3']
  },
  D4: {
    id: 'D4',
    name: 'Interaction et interprétation',
    description: 'Capacité à interagir et interpréter les textes',
    weight: 0.20,
    color: '#8B5CF6', // purple-500
    competencies: ['4.1', '4.2', '4.3']
  },
  D5: {
    id: 'D5',
    name: 'Métalinguistique et métacognitif',
    description: 'Réflexion sur la langue et l\'apprentissage',
    weight: 0.20,
    color: '#EC4899', // pink-500
    competencies: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7']
  }
};

// ============================================================================
// INFORMATIONS SUR LES COMPÉTENCES
// ============================================================================

export interface CompetencyInfo {
  id: string;
  domain: string;
  name: string;
  description: string;
}

export const COMPETENCY_INFO: Record<string, CompetencyInfo> = {
  // Domaine 1 - Compréhension de l'oral
  '1.1': {
    id: '1.1',
    domain: 'D1',
    name: 'Repérer',
    description: 'Repérer et extraire des informations de la chanson'
  },
  '1.2': {
    id: '1.2',
    domain: 'D1',
    name: 'Comprendre',
    description: 'Comprendre le sens global de la chanson'
  },
  '1.3': {
    id: '1.3',
    domain: 'D1',
    name: 'Interpréter',
    description: 'Interpréter les intentions et émotions'
  },
  
  // Domaine 2 - Compréhension de l'écrit
  '2.1': {
    id: '2.1',
    domain: 'D2',
    name: 'Identifier',
    description: 'Identifier le type de texte et sa structure'
  },
  '2.2': {
    id: '2.2',
    domain: 'D2',
    name: 'Comprendre',
    description: 'Comprendre le sens explicite des paroles'
  },
  '2.3': {
    id: '2.3',
    domain: 'D2',
    name: 'Analyser',
    description: 'Analyser le sens implicite et les figures de style'
  },
  
  // Domaine 3 - Production écrite
  '3.1': {
    id: '3.1',
    domain: 'D3',
    name: 'Écrire des textes simples',
    description: 'Produire des textes courts et cohérents'
  },
  '3.2': {
    id: '3.2',
    domain: 'D3',
    name: 'Écrire des textes élaborés',
    description: 'Rédiger des textes structurés et argumentés'
  },
  '3.3': {
    id: '3.3',
    domain: 'D3',
    name: 'Réviser et améliorer',
    description: 'Corriger et améliorer ses productions'
  },
  
  // Domaine 4 - Interaction et interprétation
  '4.1': {
    id: '4.1',
    domain: 'D4',
    name: 'Échanger',
    description: 'Échanger avec d\'autres apprenants'
  },
  '4.2': {
    id: '4.2',
    domain: 'D4',
    name: 'Réagir',
    description: 'Réagir aux productions des autres'
  },
  '4.3': {
    id: '4.3',
    domain: 'D4',
    name: 'Interpréter collectivement',
    description: 'Construire une interprétation collective'
  },
  
  // Domaine 5 - Métalinguistique et métacognitif
  '5.1': {
    id: '5.1',
    domain: 'D5',
    name: 'Vocabulaire',
    description: 'Analyser et utiliser le vocabulaire'
  },
  '5.2': {
    id: '5.2',
    domain: 'D5',
    name: 'Grammaire',
    description: 'Comprendre et appliquer les règles grammaticales'
  },
  '5.3': {
    id: '5.3',
    domain: 'D5',
    name: 'Culture',
    description: 'Connaître le contexte culturel et historique'
  },
  '5.4': {
    id: '5.4',
    domain: 'D5',
    name: 'Logique argumentative',
    description: 'Construire et évaluer des arguments'
  },
  '5.5': {
    id: '5.5',
    domain: 'D5',
    name: 'Réflexion critique',
    description: 'Développer une pensée critique nuancée'
  },
  '5.6': {
    id: '5.6',
    domain: 'D5',
    name: 'Métacognition',
    description: 'Réfléchir sur son propre apprentissage'
  },
  '5.7': {
    id: '5.7',
    domain: 'D5',
    name: 'Autoévaluation',
    description: 'Évaluer ses progrès et identifier ses besoins'
  }
};

// ============================================================================
// SEUILS CECRL
// ============================================================================

export const CECRL_THRESHOLDS: Record<string, [number, number]> = {
  A2: [200, 299],
  B1: [300, 399],
  B2: [400, 499],
  C1: [500, 600]
};

export const CECRL_DESCRIPTIONS: Record<string, string> = {
  A2: 'Niveau élémentaire - Comprendre des chansons simples',
  B1: 'Niveau intermédiaire - Comprendre la plupart des chansons courantes',
  B2: 'Niveau avancé - Comprendre des chansons complexes et analyser en profondeur',
  C1: 'Niveau expert - Maîtrise approfondie, analyse philosophique et culturelle'
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Obtenir la couleur associée à un niveau CECRL
 */
export function getCecrlColor(level: 'A2' | 'B1' | 'B2' | 'C1'): string {
  const colors = {
    A2: 'from-blue-400 to-blue-600',
    B1: 'from-green-400 to-green-600',
    B2: 'from-amber-400 to-amber-600',
    C1: 'from-purple-400 to-purple-600'
  };
  return colors[level];
}

/**
 * Calculer le pourcentage de progression dans le niveau actuel
 */
export function getProgressInLevel(score: number, level: 'A2' | 'B1' | 'B2' | 'C1'): number {
  const [min, max] = CECRL_THRESHOLDS[level];
  return Math.round(((score - min) / (max - min)) * 100);
}

/**
 * Obtenir le niveau suivant
 */
export function getNextLevel(currentLevel: 'A2' | 'B1' | 'B2' | 'C1'): 'A2' | 'B1' | 'B2' | 'C1' | null {
  const levels: ('A2' | 'B1' | 'B2' | 'C1')[] = ['A2', 'B1', 'B2', 'C1'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
}

/**
 * Calculer les points nécessaires pour le niveau suivant
 */
export function getPointsToNextLevel(score: number, currentLevel: 'A2' | 'B1' | 'B2' | 'C1'): number | null {
  const nextLevel = getNextLevel(currentLevel);
  if (!nextLevel) return null;
  
  const [minNext] = CECRL_THRESHOLDS[nextLevel];
  return Math.max(0, minNext - score);
}

/**
 * Obtenir le mapping compétence → domaine
 */
export function getCompetencyDomain(competencyId: string): string {
  return COMPETENCY_INFO[competencyId]?.domain || 'Unknown';
}

/**
 * Obtenir toutes les compétences d'un domaine
 */
export function getDomainCompetencies(domainId: string): string[] {
  return DOMAIN_INFO[domainId]?.competencies || [];
}

// ============================================================================
// TYPES POUR LE DASHBOARD
// ============================================================================

/**
 * Activité récente de l'utilisateur
 */
export interface RecentActivity {
  id: string;
  type: 'seance' | 'evidence' | 'validation';
  title: string;
  description: string;
  date: string;               // ISO 8601
  score?: number;
  level?: 'A2' | 'B1' | 'B2' | 'C1';
}

/**
 * Domaine avec score pour le dashboard
 */
export interface DomainScore {
  domainId: string;
  domainName: string;
  score: number;              // Score 0-100
  level: 'A2' | 'B1' | 'B2' | 'C1';
  competencies: CompetencyScore[];
}

/**
 * Statistiques complètes du dashboard
 */
export interface DashboardStats {
  // Données CEREDIS
  scoreCeredis: number | null;
  niveauCecrl: 'A2' | 'B1' | 'B2' | 'C1' | null;
  domainesScores: DomainScore[];
  competencyScores: Record<string, CompetencyScore>;
  
  // Statistiques d'activité
  seancesTerminees: number;
  seancesEnCours: number;
  scoreMoyen: number;
  tempsTotal: number;         // En minutes
  
  // Progression
  tendance: 'up' | 'down' | 'stable';
  progressionSemaine: number; // Pourcentage
  
  // Historique
  dernieresActivites: RecentActivity[];
  
  // Métadonnées
  isLoading: boolean;
  error: string | null;
  lastUpdate: string | null;  // ISO 8601
}
