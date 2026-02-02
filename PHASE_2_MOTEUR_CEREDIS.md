# 🔧 PHASE 2 - MOTEUR CEREDIS (1h30)

**Date** : 2 février 2026, 13h00 (Brazzaville)  
**Durée estimée** : 1h30 (13h00 - 14h30)  
**Objectif** : Intégrer le moteur CEREDIS complet et remplacer le calcul approximatif

---

## 🎯 OBJECTIFS PHASE 2

1. ✅ Auditer le moteur existant (`services/ceredis-calculator/`)
2. ✅ Créer/améliorer l'API Route `/api/ceredis/calculate`
3. ✅ Mettre à jour le client et le hook
4. ✅ Connecter le Dashboard au moteur réel
5. ✅ Tester avec de vraies données

**Résultat attendu** : Dashboard affiche les scores calculés par le vrai moteur CEREDIS (pas d'approximation)

---

## 📋 ÉTAPE 1 : AUDIT DU MOTEUR EXISTANT (15min)

### Instructions pour Copilot

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Auditer le moteur CEREDIS existant pour comprendre sa structure.
 * 
 * ACTIONS :
 * 
 * 1. LISTER les fichiers du moteur :
 */

// Dans le terminal :
ls -la services/ceredis-calculator/
ls -la services/ceredis-calculator/engine/

/**
 * 2. VÉRIFIER l'existence des fichiers clés :
 * 
 * Fichiers attendus dans services/ceredis-calculator/ :
 * - index.ts (point d'entrée principal)
 * - config.ts (configuration CEREDIS)
 * - types.ts (types TypeScript)
 * - README.md (documentation)
 * 
 * Fichiers attendus dans services/ceredis-calculator/engine/ :
 * - evidenceAggregator.ts (agrégation des preuves)
 * - competencyCalculator.ts (calcul par compétence)
 * - domainCalculator.ts (calcul par domaine)
 * - ceredisCalculator.ts (score global 0-600)
 * - cecrlDecider.ts (niveau CECRL)
 * - levelValidator.ts (validation règles B2/C1)
 * 
 * 
 * 3. LIRE le fichier principal :
 */

// Ouvrir et lire services/ceredis-calculator/index.ts

/**
 * Ce fichier devrait exporter la fonction principale :
 * 
 * export async function computeCeredisScore(
 *   userId: string,
 *   evidences: Evidence[]
 * ): Promise<CeredisResult>
 * 
 * 
 * 4. LIRE la configuration :
 */

// Ouvrir et lire services/ceredis-calculator/config.ts

/**
 * Ce fichier devrait contenir :
 * - CEREDIS_CONFIG : configuration complète
 * - Poids des evidences (P1: 0.15, P2: 0.30, P3: 0.35, P4: 0.20)
 * - 5 domaines (D1-D5) avec compétences
 * - Seuils CECRL (A2: 200-299, B1: 300-399, B2: 400-499, C1: 500-599)
 * - Règles strictes B2/C1 (P3, P4, D5 minimum)
 * 
 * 
 * 5. DIAGNOSTIC :
 * 
 * Si TOUS les fichiers existent et sont complets :
 *   ✅ Moteur complet → Passer à l'étape 2 (API Route)
 * 
 * Si des fichiers MANQUENT :
 *   ⚠️ Moteur incomplet → Signaler les fichiers manquants
 *   → Consulter PLAN_INTEGRATION_MOTEUR_CEREDIS.md pour compléter
 * 
 * Si les fichiers existent mais sont VIDES ou INCOMPLETS :
 *   ⚠️ Moteur à finaliser → Compléter selon PLAN_INTEGRATION_MOTEUR_CEREDIS.md
 */
```

### Checklist diagnostic

Après l'audit, remplir cette checklist :

- [ ] `services/ceredis-calculator/index.ts` existe et contient `computeCeredisScore`
- [ ] `services/ceredis-calculator/config.ts` existe et contient `CEREDIS_CONFIG`
- [ ] `services/ceredis-calculator/types.ts` existe et contient les types
- [ ] `services/ceredis-calculator/engine/` contient 6 modules
- [ ] Tous les modules exportent leurs fonctions
- [ ] Pas d'erreurs TypeScript dans le moteur

**Si checklist complète ✅** : Passer à l'étape 2  
**Si checklist incomplète ⚠️** : Signaler et consulter PLAN_INTEGRATION_MOTEUR_CEREDIS.md

---

## 🔌 ÉTAPE 2 : API ROUTE (30min)

### Instructions pour Copilot

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Créer l'API Route qui utilise le moteur CEREDIS complet.
 * 
 * FICHIER : app/api/ceredis/calculate/route.ts
 * 
 * Si le fichier n'existe pas, le créer.
 * Si le fichier existe, le remplacer complètement.
 * 
 * CODE COMPLET :
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { computeCeredisScore } from '@/services/ceredis-calculator';

// Types
interface Evidence {
  id: string;
  user_id: string;
  competency_id: string;
  evidence_type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  created_at: string;
  activity_id?: string;
  session_id?: string;
}

/**
 * POST /api/ceredis/calculate
 * 
 * Calcule le score CEREDIS pour un utilisateur en utilisant le moteur complet.
 * 
 * Body: { userId: string }
 * 
 * Returns: {
 *   userId: string,
 *   ceredisScore: number,
 *   cecrlLevel: 'A2' | 'B1' | 'B2' | 'C1',
 *   domainScores: Record<string, number>,
 *   competencyScores: Record<string, CompetencyScore>,
 *   validation: ValidationResult,
 *   computedAt: string,
 *   engineVersion: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer le userId depuis le body
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // 2. Créer le client Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Récupérer toutes les evidences de l'utilisateur depuis Supabase
    const { data: evidences, error: fetchError } = await supabase
      .from('evidences')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching evidences:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch evidences', details: fetchError.message },
        { status: 500 }
      );
    }

    // 4. Si pas d'evidences, retourner un score vide
    if (!evidences || evidences.length === 0) {
      return NextResponse.json({
        userId,
        ceredisScore: 0,
        cecrlLevel: 'A2',
        domainScores: {
          'D1': 0,
          'D2': 0,
          'D3': 0,
          'D4': 0,
          'D5': 0
        },
        competencyScores: {},
        validation: {
          valid: true,
          level: 'A2',
          errors: [],
          warnings: ['No evidences found for this user']
        },
        computedAt: new Date().toISOString(),
        engineVersion: '1.0'
      });
    }

    // 5. Transformer les evidences au format attendu par le moteur
    const transformedEvidences = evidences.map((ev: any) => ({
      id: ev.id,
      userId: ev.user_id,
      competencyId: ev.competency_id,
      type: ev.evidence_type,
      score: ev.score,
      timestamp: ev.created_at,
      metadata: {
        activityId: ev.activity_id,
        sessionId: ev.session_id
      }
    }));

    // 6. Appeler le moteur CEREDIS
    const result = await computeCeredisScore(userId, transformedEvidences);

    // 7. Optionnel : Sauvegarder le résultat dans Supabase
    // Pour l'instant on ne sauvegarde pas, on retourne juste le résultat
    // Si besoin de sauvegarder, décommenter ci-dessous :
    /*
    const { error: saveError } = await supabase
      .from('ceredis_results')
      .insert({
        user_id: userId,
        ceredis_score: result.ceredisScore,
        cecrl_level: result.cecrlLevel,
        domain_scores: result.domainScores,
        competency_scores: result.competencyScores,
        validation: result.validation,
        computed_at: result.computedAt,
        engine_version: result.engineVersion
      });

    if (saveError) {
      console.error('Error saving result:', saveError);
      // On continue quand même, l'important est de retourner le résultat
    }
    */

    // 8. Retourner le résultat
    return NextResponse.json(result);

  } catch (error) {
    console.error('CEREDIS calculation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Calculation failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * NOTES IMPORTANTES :
 * 
 * 1. Cette API utilise le moteur CEREDIS complet (services/ceredis-calculator)
 * 2. Elle récupère les evidences depuis Supabase (table 'evidences')
 * 3. Elle transforme les données au format attendu par le moteur
 * 4. Elle retourne le résultat calculé par le moteur
 * 5. Elle ne sauvegarde PAS le résultat (pour l'instant)
 * 
 * 6. Variables d'environnement requises :
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 
 * 7. Table Supabase requise : 'evidences'
 *    Colonnes : id, user_id, competency_id, evidence_type, score, created_at
 * 
 * 8. Si le moteur n'est pas complet, cette API échouera
 *    → Vérifier l'audit de l'étape 1
 */
```

### Test de l'API

Après avoir créé l'API, la tester :

```bash
# Dans le terminal

# 1. Vérifier que le serveur tourne
# Si pas déjà lancé : npm run dev

# 2. Tester l'API avec curl
curl -X POST http://localhost:3000/api/ceredis/calculate \
  -H "Content-Type: application/json" \
  -d '{"userId":"07658230-3d93-4cca-b91f-73bee33e24d8"}'

# Résultat attendu : JSON avec score, niveau, domaines, etc.

# 3. Vérifier le résultat
# - ceredisScore : devrait être entre 0-600
# - cecrlLevel : devrait être A2, B1, B2 ou C1
# - domainScores : devrait avoir 5 domaines (D1-D5)
# - competencyScores : devrait avoir les compétences avec scores
# - validation : devrait avoir valid: true/false
```

---

## 🔗 ÉTAPE 3 : CLIENT & HOOK (20min)

### A) Mettre à jour le client

**Fichier** : `lib/ceredis/client.ts`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Mettre à jour le client pour appeler la nouvelle API.
 * 
 * Si le fichier n'existe pas, le créer.
 * Si le fichier existe, le modifier.
 * 
 * CODE COMPLET :
 */

import type { CeredisScore } from './types';

/**
 * Calcule le score CEREDIS pour un utilisateur
 * via l'API qui utilise le moteur complet
 * 
 * @param userId - ID de l'utilisateur
 * @returns Score CEREDIS complet
 * @throws Error si le calcul échoue
 */
export async function calculateCeredisScore(userId: string): Promise<CeredisScore> {
  try {
    const response = await fetch('/api/ceredis/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to calculate score');
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error calculating CEREDIS score:', error);
    throw error;
  }
}

/**
 * USAGE :
 * 
 * import { calculateCeredisScore } from '@/lib/ceredis/client';
 * 
 * const score = await calculateCeredisScore(userId);
 * console.log(score.ceredisScore); // 0-600
 * console.log(score.cecrlLevel);   // A2, B1, B2, C1
 */
```

### B) Mettre à jour le hook

**Fichier** : `hooks/useDashboard.ts`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Modifier le hook useDashboard pour utiliser la nouvelle API CEREDIS.
 * 
 * MODIFICATIONS À FAIRE :
 * 
 * 1. AJOUTER l'import du client :
 */

import { calculateCeredisScore } from '@/lib/ceredis/client';

/**
 * 2. DANS LA FONCTION fetchDashboardData, MODIFIER la partie calcul CEREDIS :
 * 
 * ANCIEN CODE (approximatif) :
 */

// Calcul approximatif (à remplacer)
const avgScore = evidences.reduce((sum, ev) => sum + ev.score, 0) / evidences.length;
const stats = {
  scoreCeredis: Math.round(avgScore * 6), // Approximation
  // ...
};

/**
 * NOUVEAU CODE (moteur complet) :
 */

// Calcul avec le vrai moteur CEREDIS
let ceredisData;
try {
  ceredisData = await calculateCeredisScore(userId);
} catch (error) {
  console.error('Error calling CEREDIS API:', error);
  // Fallback : garder le calcul local comme avant
  ceredisData = null;
}

const stats = {
  // Si API réussie, utiliser les vraies données
  scoreCeredis: ceredisData?.ceredisScore ?? Math.round(avgScore * 6),
  niveauCecrl: ceredisData?.cecrlLevel ?? (
    avgScore * 6 >= 500 ? 'C1' :
    avgScore * 6 >= 400 ? 'B2' :
    avgScore * 6 >= 300 ? 'B1' : 'A2'
  ),
  domainesScores: ceredisData?.domainScores ?? domainesScores,
  competencyScores: ceredisData?.competencyScores ?? competencyScores,
  
  // Ajouter les données de validation (nouveau)
  validation: ceredisData?.validation ?? null,
  engineVersion: ceredisData?.engineVersion ?? 'local',
  computedAt: ceredisData?.computedAt ?? new Date().toISOString(),
  
  // ... reste identique
};

/**
 * 3. AJOUTER au type DashboardStats :
 */

export interface DashboardStats {
  // ... champs existants
  
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

/**
 * RÉSULTAT :
 * 
 * - Le hook essaie d'abord d'utiliser l'API CEREDIS (moteur complet)
 * - Si l'API échoue, il utilise le calcul local (fallback)
 * - Cela garantit que le dashboard fonctionne toujours
 * - Mais utilise le vrai moteur quand possible
 * 
 * AVANTAGES :
 * 
 * - Scores précis (règles B2/C1, poids evidences, etc.)
 * - Niveau CECRL validé selon les règles strictes
 * - Validation incluse (erreurs, warnings)
 * - Graceful degradation si API indisponible
 */
```

---

## 🎨 ÉTAPE 4 : AFFICHAGE DANS LE DASHBOARD (15min)

### Instructions pour Copilot

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Améliorer l'affichage dans le dashboard pour montrer que le vrai moteur est utilisé.
 * 
 * FICHIER : app/dashboard/page.tsx
 * 
 * MODIFICATIONS OPTIONNELLES (pour feedback utilisateur) :
 * 
 * 1. Ajouter un indicateur dans CeredisScoreCard :
 */

{stats.engineVersion && (
  <Badge variant="outline" className="text-xs">
    {stats.engineVersion === 'local' ? 'Calcul local' : 'Moteur CEREDIS'}
  </Badge>
)}

/**
 * 2. Afficher les warnings de validation :
 */

{stats.validation?.warnings && stats.validation.warnings.length > 0 && (
  <Alert variant="warning" className="mt-4">
    <AlertTitle>Avertissements</AlertTitle>
    <AlertDescription>
      <ul className="list-disc pl-4">
        {stats.validation.warnings.map((warning, i) => (
          <li key={i}>{warning}</li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
)}

/**
 * 3. Afficher les erreurs de validation :
 */

{stats.validation?.errors && stats.validation.errors.length > 0 && (
  <Alert variant="destructive" className="mt-4">
    <AlertTitle>Erreurs de validation</AlertTitle>
    <AlertDescription>
      <ul className="list-disc pl-4">
        {stats.validation.errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
)}

/**
 * NOTES :
 * 
 * - Ces modifications sont OPTIONNELLES
 * - Elles permettent de montrer à l'utilisateur quel moteur est utilisé
 * - Utiles pour le debug et la transparence
 * - Peuvent être ajoutées plus tard si pas de temps maintenant
 */
```

---

## ✅ ÉTAPE 5 : TESTS COMPLETS (10min)

### Checklist de validation

```bash
# 1. Build TypeScript
npm run type-check
# ✅ Attendu : 0 erreurs

# 2. Build production
npm run build
# ✅ Attendu : Build successful

# 3. Lancer le serveur
npm run dev
```

### Tests fonctionnels

**Test 1 : API directe**
```bash
curl -X POST http://localhost:3000/api/ceredis/calculate \
  -H "Content-Type: application/json" \
  -d '{"userId":"07658230-3d93-4cca-b91f-73bee33e24d8"}'

# ✅ Attendu : JSON avec ceredisScore, cecrlLevel, domainScores, etc.
```

**Test 2 : Dashboard**
```
1. Ouvrir http://localhost:3000/dashboard
2. ✅ Vérifier : CeredisScoreCard affiche le score
3. ✅ Vérifier : Niveau CECRL correct
4. ✅ Vérifier : Radar 5 domaines avec bonnes valeurs
5. ✅ Vérifier : CompetencyGrid avec scores détaillés
6. ✅ Vérifier : Pas d'erreurs console (F12)
```

**Test 3 : Validation moteur**

Dans la console navigateur (F12) :
```javascript
// Vérifier les données
console.log('Stats:', stats);

// Doit afficher :
// - scoreCeredis : nombre entre 0-600
// - cecrlLevel : 'A2', 'B1', 'B2' ou 'C1'
// - domainScores : { D1: X, D2: X, D3: X, D4: X, D5: X }
// - competencyScores : { '1.1': {...}, '1.2': {...}, ... }
// - validation : { valid: true/false, ... }
// - engineVersion : '1.0' ou 'local'
```

---

## 🚨 TROUBLESHOOTING

### Erreur : "computeCeredisScore is not a function"

**Cause** : Le moteur n'est pas correctement exporté

**Solution** :
```bash
# Vérifier l'export dans services/ceredis-calculator/index.ts
cat services/ceredis-calculator/index.ts | grep export

# Devrait voir : export async function computeCeredisScore
```

### Erreur : "Cannot read property 'evidences' of null"

**Cause** : Table Supabase 'evidences' n'existe pas ou pas de données

**Solution** :
```bash
# Vérifier dans Supabase Dashboard :
# 1. Table 'evidences' existe ?
# 2. Table a des données ?
# 3. user_id correspond à un utilisateur existant ?
```

### Erreur : "Supabase configuration missing"

**Cause** : Variables d'environnement manquantes

**Solution** :
```bash
# Vérifier .env.local
cat .env.local | grep SUPABASE

# Devrait voir :
# NEXT_PUBLIC_SUPABASE_URL=https://...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Score toujours à 0

**Cause** : Pas d'evidences en base de données

**Solution** : C'est NORMAL si aucune activité n'a été faite
```
Le moteur retourne 0 si pas d'evidences.
Pour tester avec des données :
1. Faire une activité dans l'app
2. Vérifier que des evidences sont créées dans Supabase
3. Recalculer le score
```

---

## 📊 RÉSULTAT ATTENDU À 14h30

### Avant (calcul approximatif)
```typescript
// Hook useDashboard calculait localement
const avgScore = evidences.reduce((sum, ev) => sum + ev.score, 0) / evidences.length;
const score = Math.round(avgScore * 6); // Approximation simple

// Problèmes :
// - Pas de règles B2/C1 (P3, P4, D5)
// - Pas de poids evidences (P1=0.15, P2=0.30, etc.)
// - Pas de validation stricte
// - Score imprécis
```

### Après (moteur complet)
```typescript
// API appelle le vrai moteur CEREDIS
const result = await computeCeredisScore(userId, evidences);

// Avantages :
// ✅ Règles B2/C1 appliquées (P3, P4, D5 minimum)
// ✅ Poids evidences corrects (P1=0.15, P2=0.30, P3=0.35, P4=0.20)
// ✅ Validation stricte selon config
// ✅ Score précis (0-600)
// ✅ Niveau CECRL validé
// ✅ Tracabilité (engineVersion, computedAt, validation)
```

### Fonctionnalités opérationnelles

- ✅ API `/api/ceredis/calculate` fonctionnelle
- ✅ Moteur CEREDIS intégré
- ✅ Dashboard affiche vrais scores
- ✅ Fallback local si API indisponible
- ✅ Validation et warnings affichés
- ✅ Tests passent (TypeScript, Build, Fonctionnels)

---

## 🎉 COMMIT FINAL

```bash
git add .
git commit -m "feat: Intégration moteur CEREDIS complet

- API /api/ceredis/calculate avec moteur complet
- Client calculateCeredisScore pour appels API
- Hook useDashboard utilise API CEREDIS en priorité
- Fallback calcul local si API indisponible
- Types DashboardStats étendus (validation, engineVersion)
- Tests API et dashboard validés

Moteur CEREDIS opérationnel ✅
Scores précis avec règles B2/C1 ✅
Validation stricte ✅"

git push
```

---

## 📅 PROCHAINE ÉTAPE

**Pause café** : 14h30 - 15h00

**Après pause** : Phase 3 (15h00 - 17h00)
- Tests E2E approfondis
- Polish UI/UX
- Documentation
- Validation production

---

## 💡 NOTES IMPORTANTES

### Différence moteur vs approximation

**Calcul approximatif** (ancien) :
```
Score = moyenne(evidences) × 6
Niveau = seuil simple (300, 400, 500)
```

**Moteur CEREDIS** (nouveau) :
```
1. Agrégation par compétence
2. Calcul par compétence avec poids evidences
3. Calcul par domaine
4. Score global (0-600)
5. Niveau CECRL avec règles strictes :
   - B2 : score ≥400 + P3 présent + D5≥60
   - C1 : score ≥500 + P3+P4 présents + D5≥70
6. Validation et warnings
```

### Performance

L'API calcule à la demande (pas de cache pour l'instant).

Pour optimiser plus tard :
- Ajouter cache Redis
- Sauvegarder résultats dans Supabase
- Recalculer seulement si nouvelles evidences
- Batch calculation pour classes

---

**Document créé** : 2 février 2026, 12h00 (Brazzaville)  
**Durée estimée** : 1h30 (13h00 - 14h30)  
**Prêt pour démarrage** : 13h00 ✅
