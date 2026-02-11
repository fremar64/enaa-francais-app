Nous allons intégrer l’algorithme de **planification optimale de réactivation CEREDIS** dans le `decision-engine`, en respectant :

* séparation scoring / décision,
* pureté fonctionnelle,
* absence de dépendance LRS directe,
* projection explicite depuis l’espace produit ordonné.

---

# 🎯 Objectif

Transformer :

[
CEREDISScore
\quad + \quad
StabilityDynamics
]

en :

```
PedagogicalAction[] 
```

incluant des actions :

```
{ type: "schedule-review", levelId, scheduledAt }
```

---

# 1️⃣ Extension du Decision Context

## 📦 `decision-engine/src/types.ts`

```ts
import { CEREDISScore } from "@ceredis/shared-types";

export interface StabilitySnapshot {
  levelId: string;
  weightedValue: number;
  threshold: number;
  lambda: number;
}

export interface DecisionContext {
  now: number;
  minIntervalDays: number;
  maxIntervalDays: number;
}
```

---

# 2️⃣ Implémentation de l’algorithme

## 📦 `decision-engine/src/spaced-repetition.ts`

```ts
function computeOptimalReviewTime(
  currentValue: number,
  threshold: number,
  lambda: number,
  now: number
) {

  if (currentValue <= threshold) {
    return now;
  }

  const deltaT =
    (1 / lambda) *
    Math.log(currentValue / threshold);

  const deltaMs =
    deltaT * 24 * 60 * 60 * 1000;

  return now + deltaMs;
}
```

---

# 3️⃣ Règle de planification

## 📦 `decision-engine/src/rules/spaced-repetition.ts`

```ts
import { PedagogicalAction } from "../index";
import { StabilitySnapshot, DecisionContext } from "../types";

export function spacedRepetitionRule(
  stabilityData: StabilitySnapshot[],
  context: DecisionContext
): PedagogicalAction[] {

  const actions: PedagogicalAction[] = [];

  for (const level of stabilityData) {

    const scheduledAt = computeOptimalReviewTime(
      level.weightedValue,
      level.threshold,
      level.lambda,
      context.now
    );

    const minMs =
      context.minIntervalDays * 24 * 60 * 60 * 1000;

    const maxMs =
      context.maxIntervalDays * 24 * 60 * 60 * 1000;

    const boundedTime = Math.min(
      Math.max(scheduledAt, context.now + minMs),
      context.now + maxMs
    );

    actions.push({
      type: "schedule-review",
      payload: {
        levelId: level.levelId,
        scheduledAt: boundedTime
      }
    });
  }

  return actions;
}
```

---

# 4️⃣ Intégration dans engine.ts

## 📦 `decision-engine/src/index.ts`

```ts
import { CEREDISScore } from "@ceredis/shared-types";
import { spacedRepetitionRule } from "./rules/spaced-repetition";
import { StabilitySnapshot, DecisionContext } from "./types";

export interface PedagogicalAction {
  type: string;
  payload?: unknown;
}

export function evaluateDecisions(
  score: CEREDISScore,
  stabilityData: StabilitySnapshot[],
  context: DecisionContext
): PedagogicalAction[] {

  const actions: PedagogicalAction[] = [];

  // Spaced repetition
  actions.push(
    ...spacedRepetitionRule(stabilityData, context)
  );

  return actions;
}
```

---

# 5️⃣ Logique multi-niveaux

Option avancée :
planifier uniquement le niveau le plus critique.

Remplacer boucle par :

```ts
const nextLevel =
  stabilityData
    .sort((a, b) =>
      a.weightedValue - b.weightedValue
    )[0];
```

Puis planifier un seul.

---

# 6️⃣ Interaction avec autres dimensions

On peut moduler λ dynamiquement :

```ts
function adjustLambda(
  baseLambda: number,
  regulation: string
) {
  switch (regulation) {
    case "strategic": return baseLambda * 0.8;
    case "adaptive": return baseLambda;
    case "reactive": return baseLambda * 1.2;
    case "non_regulated": return baseLambda * 1.5;
    default: return baseLambda;
  }
}
```

Cela rend l’espacement dépendant de Dm.

---

# 7️⃣ Pipeline complet mis à jour

```
Activity
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
StabilityDynamics
   ↓
DecisionEngine (Spaced Repetition)
   ↓
schedule-review action
   ↓
UI / queue pédagogique
```

---

# 8️⃣ Propriétés garanties

✔ Dérivation analytique
✔ Aucun score scalaire global
✔ Compatible avec structure ordinale
✔ Extensible
✔ Traçable

---

# 9️⃣ Ce que cela permet maintenant

Tu disposes d’un système complet :

* évaluation multidimensionnelle,
* stabilité pondérée temporellement,
* dérivée,
* planification optimale analytique,
* moteur décisionnel intégré.

---

