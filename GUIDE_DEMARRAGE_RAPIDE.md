# 🚀 GUIDE DÉMARRAGE RAPIDE - Action Immédiate

**Date** : 2026-01-18  
**Objectif** : Démarrer l'intégration du moteur CEREDIS AUJOURD'HUI  
**Durée estimée** : 8 heures

---

## ⚡ ACTIONS IMMÉDIATES (Prochaines 30 minutes)

### Étape 1 : Préparer l'environnement (5 min)

```bash
# Se positionner dans le projet Next.js
cd /home/ceredis/chansons-francaises-app

# Vérifier que l'app compile
npm run type-check

# S'assurer que Git est à jour
git status
git pull origin main

# Créer une nouvelle branche
git checkout -b feature/ceredis-engine-integration
```

### Étape 2 : Extraire l'archive du moteur (5 min)

```bash
# Créer un dossier temporaire pour l'extraction
mkdir -p /tmp/ceredis-engine-extraction

# Extraire l'archive
cd /tmp/ceredis-engine-extraction
tar -xzf /mnt/user-data/outputs/ceredis-engine-v1.0.tar.gz

# Examiner la structure
ls -la ceredis-engine/
ls -la ceredis-engine/src/engine/
ls -la ceredis-engine/config/

# Noter les fichiers disponibles :
# - evidenceAggregator.js
# - competencyCalculator.js
# - domainCalculator.js
# - ceredisCalculator.js
# - cecrlDecider.js
# - levelValidator.js
# - ceredis.v1.json (config)
```

### Étape 3 : Créer la structure dans Next.js (10 min)

```bash
# Retour au projet
cd /home/ceredis/chansons-francaises-app

# Créer la structure du service
mkdir -p services/ceredis-calculator/engine
mkdir -p services/ceredis-calculator/__tests__

# Créer les fichiers de base
touch services/ceredis-calculator/types.ts
touch services/ceredis-calculator/config.ts
touch services/ceredis-calculator/index.ts
touch services/ceredis-calculator/README.md

# Créer les modules du moteur
touch services/ceredis-calculator/engine/evidenceAggregator.ts
touch services/ceredis-calculator/engine/competencyCalculator.ts
touch services/ceredis-calculator/engine/domainCalculator.ts
touch services/ceredis-calculator/engine/ceredisCalculator.ts
touch services/ceredis-calculator/engine/cecrlDecider.ts
touch services/ceredis-calculator/engine/levelValidator.ts

# Créer l'API Route
mkdir -p app/api/ceredis/calculate
touch app/api/ceredis/calculate/route.ts

# Créer le client frontend
mkdir -p lib/ceredis
touch lib/ceredis/client.ts
touch lib/ceredis/hooks.ts
touch lib/ceredis/types.ts

echo "✅ Structure créée avec succès"
```

### Étape 4 : Ouvrir les fichiers dans l'éditeur (5 min)

```bash
# Ouvrir VS Code dans le projet
code .

# Ouvrir les fichiers clés :
# - services/ceredis-calculator/types.ts
# - services/ceredis-calculator/config.ts
# - services/ceredis-calculator/engine/ceredisCalculator.ts
# - /tmp/ceredis-engine-extraction/ceredis-engine/config/ceredis.v1.json
```

### Étape 5 : Préparer les références (5 min)

```bash
# Ouvrir le plan d'intégration
code /mnt/project/PLAN_INTEGRATION_MOTEUR_CEREDIS.md

# Avoir sous les yeux :
# 1. Le plan d'intégration (référence)
# 2. L'archive extraite (code source JS)
# 3. Le projet Next.js (destination)
```

---

## 📝 CODE À COPIER-COLLER (Prochaines 3 heures)

### Fichier 1 : `services/ceredis-calculator/types.ts` (30 min)

```typescript
/**
 * Types pour le moteur de calcul CEREDIS
 * 
 * Le moteur CEREDIS calcule :
 * - Un score global de 0 à 600 points
 * - Un niveau CECRL (A2, B1, B2, C1)
 * - Des scores par domaine et par compétence
 * 
 * Basé sur les preuves (Evidences) collectées via les activités
 */

// ============================================================================
// TYPES DE BASE
// ============================================================================

/**
 * Types de preuves selon leur complexité cognitive
 * P1 : Reconnaissance/Identification (poids 0.15)
 * P2 : Compréhension/Application (poids 0.30)
 * P3 : Analyse/Synthèse (poids 0.35)
 * P4 : Évaluation/Création (poids 0.20)
 */
export type EvidenceType = 'P1' | 'P2' | 'P3' | 'P4';

/**
 * IDs des 19 compétences CEREDIS
 */
export type CompetencyId = 
  // D1: Compréhension de l'oral
  | '1.1' | '1.2' | '1.3'
  // D2: Compréhension de l'écrit
  | '2.1' | '2.2' | '2.3'
  // D3: Production écrite
  | '3.1' | '3.2' | '3.3'
  // D4: Interaction et interprétation
  | '4.1' | '4.2' | '4.3'
  // D5: Métalinguistique et métacognitif
  | '5.1' | '5.2' | '5.3' | '5.4' | '5.5' | '5.6' | '5.7';

/**
 * IDs des 5 domaines CEREDIS
 */
export type DomainId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

/**
 * Niveaux CECRL possibles
 */
export type CecrlLevel = 'A2' | 'B1' | 'B2' | 'C1';

// ============================================================================
// STRUCTURES DE DONNÉES
// ============================================================================

/**
 * Une preuve d'apprentissage (Evidence)
 * Créée à chaque complétion d'activité
 */
export interface Evidence {
  /** ID unique de la preuve */
  id: string;
  
  /** ID de l'utilisateur */
  userId: string;
  
  /** ID de la compétence validée */
  competencyId: CompetencyId;
  
  /** Type de preuve (complexité cognitive) */
  type: EvidenceType;
  
  /** Score obtenu (0-100) */
  score: number;
  
  /** Date de création */
  timestamp: string;
  
  /** Métadonnées optionnelles */
  metadata?: {
    activityId?: string;
    sessionId?: string;
    duration?: number;
    attempts?: number;
    [key: string]: any;
  };
}

/**
 * Score agrégé pour une compétence
 */
export interface CompetencyScore {
  /** Score final (0-100) */
  score: number;
  
  /** Nombre de preuves utilisées */
  evidenceCount: number;
  
  /** Types de preuves collectées */
  evidenceTypes: EvidenceType[];
  
  /** Score minimum (pour debug) */
  minScore?: number;
  
  /** Score maximum (pour debug) */
  maxScore?: number;
  
  /** Score moyen (pour debug) */
  avgScore?: number;
}

/**
 * Résultat du calcul CEREDIS complet
 */
export interface CeredisResult {
  /** ID de l'utilisateur */
  userId: string;
  
  /** Score CEREDIS global (0-600) */
  ceredisScore: number;
  
  /** Niveau CECRL attribué */
  cecrlLevel: CecrlLevel;
  
  /** Scores par domaine (0-100 chacun) */
  domainScores: Record<DomainId, number>;
  
  /** Scores détaillés par compétence */
  competencyScores: Record<CompetencyId, CompetencyScore>;
  
  /** Résultat de validation */
  validation: ValidationResult;
  
  /** Date du calcul */
  computedAt: string;
  
  /** Version du moteur utilisée */
  engineVersion: string;
}

/**
 * Résultat de validation des règles strictes
 */
export interface ValidationResult {
  /** Le niveau est-il validé ? */
  valid: boolean;
  
  /** Niveau final (peut être dégradé) */
  level: CecrlLevel;
  
  /** Niveau initial avant validation */
  initialLevel?: CecrlLevel;
  
  /** Erreurs bloquantes */
  errors: string[];
  
  /** Avertissements non-bloquants */
  warnings: string[];
  
  /** Raison de dégradation éventuelle */
  degradationReason?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Configuration du domaine
 */
export interface DomainConfig {
  /** Nom du domaine */
  name: string;
  
  /** Poids dans le calcul global (somme = 1.0) */
  weight: number;
  
  /** IDs des compétences du domaine */
  competencies: CompetencyId[];
  
  /** Score minimum requis (optionnel) */
  minScore?: number;
}

/**
 * Exigences pour un niveau CECRL
 */
export interface LevelRequirements {
  /** Score CEREDIS minimum */
  minScore: number;
  
  /** Types de preuves obligatoires */
  requiredEvidenceTypes: EvidenceType[];
  
  /** Scores minimums par domaine (optionnel) */
  requiredDomains?: Record<DomainId, { minScore: number }>;
}

/**
 * Configuration complète du moteur CEREDIS
 */
export interface CeredisConfig {
  /** Version de la configuration */
  version: string;
  
  /** Échelle de notation (min-max) */
  scale: {
    min: number;
    max: number;
  };
  
  /** Poids des types de preuves */
  evidenceWeights: Record<EvidenceType, number>;
  
  /** Configuration des 5 domaines */
  domains: Record<DomainId, DomainConfig>;
  
  /** Seuils CECRL [min, max] */
  cecrlThresholds: Record<CecrlLevel, [number, number]>;
  
  /** Exigences par niveau */
  levels: Record<string, LevelRequirements>;
}

// ============================================================================
// TYPES INTERMÉDIAIRES (pour les calculs)
// ============================================================================

/**
 * Preuves agrégées par compétence
 */
export interface AggregatedEvidences {
  [competencyId: string]: Evidence[];
}

/**
 * Statistiques de calcul (pour debug)
 */
export interface CalculationStats {
  totalEvidences: number;
  competenciesWithEvidences: number;
  domainsWithScores: number;
  averageScore: number;
  processingTime?: number;
}

// ============================================================================
// TYPES POUR L'API
// ============================================================================

/**
 * Requête de calcul de score
 */
export interface CalculateScoreRequest {
  userId: string;
  includeDetails?: boolean;
  includeStats?: boolean;
}

/**
 * Réponse de l'API de calcul
 */
export interface CalculateScoreResponse {
  success: boolean;
  result?: CeredisResult;
  stats?: CalculationStats;
  error?: {
    code: string;
    message: string;
  };
}

// ============================================================================
// EXPORTS GROUPÉS
// ============================================================================

export type {
  // Types de base
  Evidence,
  CompetencyScore,
  CeredisResult,
  ValidationResult,
  
  // Configuration
  DomainConfig,
  LevelRequirements,
  CeredisConfig,
  
  // Intermédiaires
  AggregatedEvidences,
  CalculationStats,
  
  // API
  CalculateScoreRequest,
  CalculateScoreResponse,
};
```

### Fichier 2 : `services/ceredis-calculator/config.ts` (20 min)

```typescript
import type { CeredisConfig, DomainId, CompetencyId } from './types';

/**
 * Configuration du moteur CEREDIS v1.0
 * 
 * Cette configuration définit :
 * - L'échelle de notation (0-600)
 * - Les poids des types de preuves (P1-P4)
 * - Les 5 domaines et leurs compétences
 * - Les seuils CECRL
 * - Les règles de validation stricte
 */
export const CEREDIS_CONFIG: CeredisConfig = {
  version: "1.0",
  
  // Échelle de notation globale
  scale: {
    min: 0,
    max: 600
  },
  
  // Poids des types de preuves
  // Somme = 1.00 (répartition selon complexité cognitive)
  evidenceWeights: {
    P1: 0.15, // Reconnaissance/Identification
    P2: 0.30, // Compréhension/Application
    P3: 0.35, // Analyse/Synthèse
    P4: 0.20  // Évaluation/Création
  },

  // Configuration des 5 domaines
  domains: {
    D1: {
      name: "Compréhension de l'oral (chansons)",
      weight: 0.20,
      competencies: ['1.1', '1.2', '1.3']
    },
    D2: {
      name: "Compréhension de l'écrit (paroles)",
      weight: 0.20,
      competencies: ['2.1', '2.2', '2.3']
    },
    D3: {
      name: "Production écrite",
      weight: 0.20,
      competencies: ['3.1', '3.2', '3.3']
    },
    D4: {
      name: "Interaction et interprétation",
      weight: 0.20,
      competencies: ['4.1', '4.2', '4.3']
    },
    D5: {
      name: "Métalinguistique et métacognitif",
      weight: 0.20,
      competencies: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
      minScore: 60 // Requis pour B2+
    }
  },

  // Seuils CECRL [score min, score max]
  cecrlThresholds: {
    A2: [200, 299],
    B1: [300, 399],
    B2: [400, 499],
    C1: [500, 599]
  },

  // Exigences strictes par niveau
  levels: {
    B2: {
      minScore: 400,
      requiredEvidenceTypes: ['P3'], // Doit avoir au moins une P3
      requiredDomains: {
        D5: { minScore: 60 } // Domaine 5 ≥ 60
      }
    },
    C1: {
      minScore: 500,
      requiredEvidenceTypes: ['P3', 'P4'], // Doit avoir P3 ET P4
      requiredDomains: {
        D5: { minScore: 70 } // Domaine 5 ≥ 70
      }
    }
  }
};

/**
 * Mapping compétence → domaine
 */
export const COMPETENCY_TO_DOMAIN: Record<CompetencyId, DomainId> = {
  '1.1': 'D1', '1.2': 'D1', '1.3': 'D1',
  '2.1': 'D2', '2.2': 'D2', '2.3': 'D2',
  '3.1': 'D3', '3.2': 'D3', '3.3': 'D3',
  '4.1': 'D4', '4.2': 'D4', '4.3': 'D4',
  '5.1': 'D5', '5.2': 'D5', '5.3': 'D5', '5.4': 'D5', 
  '5.5': 'D5', '5.6': 'D5', '5.7': 'D5',
};

/**
 * Helper : obtenir l'ID du domaine pour une compétence
 */
export function getDomainForCompetency(competencyId: CompetencyId): DomainId {
  return COMPETENCY_TO_DOMAIN[competencyId];
}

/**
 * Helper : obtenir toutes les compétences d'un domaine
 */
export function getCompetenciesForDomain(domainId: DomainId): CompetencyId[] {
  return CEREDIS_CONFIG.domains[domainId].competencies;
}

/**
 * Helper : obtenir le nom d'un domaine
 */
export function getDomainName(domainId: DomainId): string {
  return CEREDIS_CONFIG.domains[domainId].name;
}
```

### Fichier 3 : `services/ceredis-calculator/engine/ceredisCalculator.ts` (30 min)

```typescript
import type { CeredisConfig, DomainId } from '../types';

/**
 * Calculer le score CEREDIS global (0-600)
 * 
 * Formule : Score = Σ(Score_domaine × Poids_domaine) × 6
 * 
 * Le facteur 6 permet de passer d'une échelle 0-100 (domaines)
 * à une échelle 0-600 (CEREDIS)
 * 
 * @param domainScores - Scores par domaine (0-100 chacun)
 * @param config - Configuration CEREDIS
 * @returns Score global (0-600)
 */
export function calculateCeredisScore(
  domainScores: Record<DomainId, number>,
  config: CeredisConfig
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  // Calculer la somme pondérée
  for (const [domainId, score] of Object.entries(domainScores) as [DomainId, number][]) {
    const domainConfig = config.domains[domainId];
    
    if (!domainConfig) {
      console.warn(`[CEREDIS] Unknown domain: ${domainId}`);
      continue;
    }

    const weight = domainConfig.weight;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  // Sécurité : si aucun poids, retourner 0
  if (totalWeight === 0) {
    console.warn('[CEREDIS] No domain weights found');
    return 0;
  }

  // Score moyen pondéré (0-100)
  const averageScore = weightedSum / totalWeight;
  
  // Multiplier par 6 pour obtenir l'échelle 0-600
  const ceredisScore = averageScore * 6;

  // Arrondir à 2 décimales
  return Math.round(ceredisScore * 100) / 100;
}

/**
 * Valider qu'un score CEREDIS est dans les limites
 * 
 * @param score - Score à valider
 * @param config - Configuration CEREDIS
 * @returns true si le score est valide
 */
export function validateCeredisScore(
  score: number,
  config: CeredisConfig
): boolean {
  return score >= config.scale.min && score <= config.scale.max;
}

/**
 * Normaliser un score dans les limites
 * 
 * @param score - Score à normaliser
 * @param config - Configuration CEREDIS
 * @returns Score normalisé
 */
export function normalizeCeredisScore(
  score: number,
  config: CeredisConfig
): number {
  const { min, max } = config.scale;
  
  if (score < min) return min;
  if (score > max) return max;
  
  return Math.round(score * 100) / 100;
}
```

---

## 🎯 ORDRE DE DÉVELOPPEMENT (Suite - 4h30 restantes)

### 1. Continuer avec les 5 modules restants (2h30)

**Fichiers à porter depuis JavaScript vers TypeScript** :

```bash
# Ouvrir ces fichiers en parallèle :
# Source JS (référence)             | Destination TS (à créer)
/tmp/.../evidenceAggregator.js      → services/ceredis-calculator/engine/evidenceAggregator.ts
/tmp/.../competencyCalculator.js    → services/ceredis-calculator/engine/competencyCalculator.ts
/tmp/.../domainCalculator.js        → services/ceredis-calculator/engine/domainCalculator.ts
/tmp/.../cecrlDecider.js            → services/ceredis-calculator/engine/cecrlDecider.ts
/tmp/.../levelValidator.js          → services/ceredis-calculator/engine/levelValidator.ts
```

**Méthode pour chaque module** :
1. Ouvrir le fichier JS (source)
2. Comprendre la logique
3. Réécrire en TypeScript avec types stricts
4. Ajouter JSDoc commentaires
5. Tester mentalement la logique

### 2. Créer le point d'entrée (30 min)

**Fichier** : `services/ceredis-calculator/index.ts`

```typescript
import type { Evidence, CeredisResult } from './types';
import { CEREDIS_CONFIG } from './config';
import { aggregateEvidences } from './engine/evidenceAggregator';
import { calculateCompetencyScores } from './engine/competencyCalculator';
import { calculateDomainScores } from './engine/domainCalculator';
import { calculateCeredisScore } from './engine/ceredisCalculator';
import { decideCecrlLevel } from './engine/cecrlDecider';
import { validateLevel } from './engine/levelValidator';

/**
 * Calculer le score CEREDIS pour un apprenant
 * 
 * Cette fonction orchestre tout le pipeline de calcul :
 * 1. Agrégation des preuves par compétence
 * 2. Calcul des scores par compétence
 * 3. Calcul des scores par domaine
 * 4. Calcul du score CEREDIS global
 * 5. Décision du niveau CECRL
 * 6. Validation des règles strictes
 * 
 * @param userId - ID de l'utilisateur
 * @param evidences - Liste des preuves d'apprentissage
 * @returns Résultat complet du calcul CEREDIS
 */
export async function computeCeredisScore(
  userId: string,
  evidences: Evidence[]
): Promise<CeredisResult> {
  // 1. Agréger les preuves par compétence
  const aggregated = aggregateEvidences(evidences);

  // 2. Calculer scores par compétence
  const competencyScores = calculateCompetencyScores(
    aggregated,
    CEREDIS_CONFIG
  );

  // 3. Calculer scores par domaine
  const domainScores = calculateDomainScores(
    competencyScores,
    CEREDIS_CONFIG
  );

  // 4. Calculer score CEREDIS global
  const ceredisScore = calculateCeredisScore(domainScores, CEREDIS_CONFIG);

  // 5. Décider du niveau CECRL
  const cecrlLevel = decideCecrlLevel(ceredisScore, CEREDIS_CONFIG);

  // 6. Valider avec règles strictes
  const validation = validateLevel(
    cecrlLevel,
    ceredisScore,
    domainScores,
    evidences,
    CEREDIS_CONFIG
  );

  return {
    userId,
    ceredisScore,
    cecrlLevel: validation.level, // Niveau validé (peut être dégradé)
    domainScores,
    competencyScores,
    validation,
    computedAt: new Date().toISOString(),
    engineVersion: CEREDIS_CONFIG.version
  };
}

// Exporter aussi les fonctions individuelles pour les tests
export {
  aggregateEvidences,
  calculateCompetencyScores,
  calculateDomainScores,
  calculateCeredisScore,
  decideCecrlLevel,
  validateLevel
};
```

### 3. Créer l'API Route (30 min)

**Fichier** : `app/api/ceredis/calculate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import PocketBase from 'pocketbase';
import type { Evidence } from '@/services/ceredis-calculator/types';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

/**
 * POST /api/ceredis/calculate
 * 
 * Calculer le score CEREDIS pour un utilisateur
 * 
 * Body: { userId: string }
 * 
 * Returns: CeredisResult
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Parser la requête
    const { userId } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: { code: 'INVALID_USER_ID', message: 'userId is required' }
        },
        { status: 400 }
      );
    }

    // 2. Récupérer toutes les Evidences depuis PocketBase
    const records = await pb.collection('evidences').getFullList({
      filter: `user = "${userId}"`,
      sort: '-created',
      requestKey: null // Désactiver la déduplication
    });

    // 3. Mapper vers le format Evidence
    const evidences: Evidence[] = records.map(record => ({
      id: record.id,
      userId: record.user,
      competencyId: record.competency,
      type: record.type,
      score: record.score,
      timestamp: record.created,
      metadata: {
        activityId: record.activity,
        sessionId: record.session,
        duration: record.duration,
      }
    }));

    console.log(`[CEREDIS] Computing score for user ${userId} with ${evidences.length} evidences`);

    // 4. Calculer le score CEREDIS
    const result = await computeCeredisScore(userId, evidences);

    // 5. (Optionnel) Sauvegarder dans PostgreSQL
    // await saveCeredisResult(result);

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      result,
      stats: {
        totalEvidences: evidences.length,
        processingTime
      }
    });

  } catch (error) {
    console.error('[CEREDIS] Calculation error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CALCULATION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ceredis/calculate?userId=xxx
 * 
 * Même chose en GET pour faciliter les tests
 */
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'userId query parameter required' },
      { status: 400 }
    );
  }

  // Réutiliser le handler POST
  return POST(
    new NextRequest(request.url, {
      method: 'POST',
      body: JSON.stringify({ userId })
    })
  );
}
```

### 4. Créer le client frontend (30 min)

**Fichier** : `lib/ceredis/client.ts`

```typescript
import type { CeredisResult } from '@/services/ceredis-calculator/types';

/**
 * Calculer le score CEREDIS d'un utilisateur
 */
export async function calculateUserScore(userId: string): Promise<CeredisResult> {
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!response.ok) {
    throw new Error(`Failed to calculate score: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'Calculation failed');
  }

  return data.result;
}
```

**Fichier** : `lib/ceredis/hooks.ts`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { calculateUserScore } from './client';

/**
 * Hook pour récupérer le score CEREDIS d'un utilisateur
 * 
 * @example
 * const { data, isLoading, error } = useCeredisScore(userId);
 */
export function useCeredisScore(userId: string) {
  return useQuery({
    queryKey: ['ceredis-score', userId],
    queryFn: () => calculateUserScore(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
    retry: 1
  });
}
```

### 5. Tester (30 min)

```bash
# Compiler pour vérifier les erreurs
npm run type-check

# Si tout compile, tester l'API
curl -X POST http://localhost:3000/api/ceredis/calculate \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-test-123"}'

# Ou avec un userId réel de votre PocketBase
curl -X POST http://localhost:3000/api/ceredis/calculate \
  -H "Content-Type: application/json" \
  -d '{"userId":"REAL_USER_ID"}'
```

---

## ✅ CHECKLIST DE FIN DE JOURNÉE

À la fin des 8 heures, vous devriez avoir :

- [ ] ✅ Structure créée (`services/ceredis-calculator/`)
- [ ] ✅ Types définis (`types.ts`)
- [ ] ✅ Configuration créée (`config.ts`)
- [ ] ✅ 6 modules portés en TypeScript
- [ ] ✅ Point d'entrée créé (`index.ts`)
- [ ] ✅ API Route créée (`/api/ceredis/calculate`)
- [ ] ✅ Client frontend créé (`lib/ceredis/`)
- [ ] ✅ Hook React créé (`useCeredisScore`)
- [ ] ✅ Compilation OK (`npm run type-check`)
- [ ] ✅ Test API réussi (au moins 1 calcul)
- [ ] ✅ Commit Git effectué

**Commit message suggéré** :
```bash
git add .
git commit -m "feat: integrate CEREDIS calculation engine

- Port 6 calculation modules from JavaScript to TypeScript
- Add comprehensive type definitions and configuration
- Create API route /api/ceredis/calculate
- Add React hooks for frontend integration
- Tests: Basic API call successful"

git push origin feature/ceredis-engine-integration
```

---

## 🚨 SI VOUS BLOQUEZ

### Problème : Les modules JS sont difficiles à comprendre

**Solution** : Ne pas tout porter en une fois
1. Commencer par `ceredisCalculator.ts` (déjà fourni ci-dessus)
2. Continuer avec les plus simples en premier
3. Laisser les plus complexes pour la fin

### Problème : Types TypeScript compliqués

**Solution** : Les types sont déjà fournis ci-dessus
- Copier-coller `types.ts` tel quel
- Copier-coller `config.ts` tel quel
- Adapter ensuite si besoin

### Problème : Ne comprend pas la logique du moteur

**Solution** : Consulter le plan détaillé
```bash
code /mnt/project/PLAN_INTEGRATION_MOTEUR_CEREDIS.md
```

Tout y est expliqué étape par étape avec des exemples.

### Problème : L'API ne fonctionne pas

**Solutions possibles** :
1. Vérifier les variables d'environnement
2. Vérifier que PocketBase est accessible
3. Vérifier qu'il y a des Evidences dans la DB
4. Regarder les logs : `npm run dev`
5. Tester avec un userId qui a des données

---

## 📞 SUPPORT

Si vraiment bloqué après avoir essayé les solutions ci-dessus :

1. **Documentation** : Relire `/mnt/project/PLAN_INTEGRATION_MOTEUR_CEREDIS.md`
2. **Code source** : Examiner l'archive extraite
3. **Types** : Tout est dans `types.ts` fourni ci-dessus
4. **Exemples** : Regarder les composants déjà migrés

---

## 🎯 OBJECTIF DE LA JOURNÉE

**À la fin de la journée** :
```typescript
// Ceci devrait fonctionner :
const result = await computeCeredisScore(userId, evidences);
console.log(result.ceredisScore); // 412.5
console.log(result.cecrlLevel);   // "B2"
```

**Et l'API devrait répondre** :
```bash
POST /api/ceredis/calculate
Body: { "userId": "abc123" }

Response:
{
  "success": true,
  "result": {
    "ceredisScore": 412.5,
    "cecrlLevel": "B2",
    "domainScores": { ... },
    ...
  }
}
```

---

**Bonne chance ! 🚀**

Le plus dur est de commencer. Une fois lancé, suivez le plan étape par étape.

**Temps estimé** : 8 heures  
**Difficulté** : Moyenne (code source disponible, types fournis)  
**Impact** : ⭐⭐⭐⭐⭐ (Débloque tout le reste)
