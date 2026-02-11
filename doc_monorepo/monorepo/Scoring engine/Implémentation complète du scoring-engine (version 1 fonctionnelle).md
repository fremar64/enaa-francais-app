Nous allons implémenter une **version 1 fonctionnelle, complète et testable du `scoring-engine`**, conforme au modèle CEREDIS, mais avec des règles opérationnelles simples (paramétrables ensuite).

Objectif V1 :

* déterministe
* pure
* sans dépendance UI
* testable par injection de surfaces
* extensible vers version scientifique avancée

---

# 📦 `packages/scoring-engine`

Structure finale :

```
scoring-engine/
  src/
    index.ts
    types.ts
    compute-realisation.ts
    compute-amplitude.ts
    compute-stability.ts
    compute-efficiency.ts
    compute-regulation.ts
    utils.ts
```

---

# 1️⃣ types.ts

```ts
import {
  StabilityLevel,
  EfficiencyLevel,
  MetacognitiveLevel
} from "@ceredis/shared-types";

export interface DevelopmentContext {
  activityToLevels: Record<string, string[]>; // activityId -> levelIds
  levelOrder: Record<string, string[]>; // levelId -> parents (poset)
  stabilityThresholds: {
    emergent: number;
    consolidated: number;
    robust: number;
  };
  efficiencyThresholds: {
    overload: number;
    costly: number;
    optimal: number;
  };
}

export interface CEREDISScore {
  D: 0 | 1;
  Dd: string[];
  Ds: Record<string, StabilityLevel>;
  De: Record<string, EfficiencyLevel>;
  Dm: Record<string, MetacognitiveLevel>;
}
```

---

# 2️⃣ index.ts

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { DevelopmentContext, CEREDISScore } from "./types";
import { computeRealisation } from "./compute-realisation";
import { computeAmplitude } from "./compute-amplitude";
import { computeStability } from "./compute-stability";
import { computeEfficiency } from "./compute-efficiency";
import { computeRegulation } from "./compute-regulation";

export function computeScore(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  activityId: string
): CEREDISScore {

  const D = computeRealisation(surface);

  if (D === 0) {
    return { D: 0, Dd: [], Ds: {}, De: {}, Dm: {} };
  }

  const Dd = computeAmplitude(surface, context, activityId);
  const Ds = computeStability(surface, context, Dd);
  const De = computeEfficiency(surface, context, Dd);
  const Dm = computeRegulation(surface, Dd);

  return { D, Dd, Ds, De, Dm };
}
```

---

# 3️⃣ compute-realisation.ts

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";

export function computeRealisation(
  surface: ActivityEvaluationSurface
): 0 | 1 {
  if (!surface.success) return 0;
  return 1;
}
```

---

# 4️⃣ compute-amplitude.ts

Version V1 :

* si activité réussie → tous niveaux mappés sont validés
* on retourne les niveaux maximaux (suppression des parents)

```ts
import { DevelopmentContext } from "./types";
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";

export function computeAmplitude(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  activityId: string
): string[] {

  const levels = context.activityToLevels[activityId] ?? [];

  // supprimer niveaux dominés (poset simple)
  return levels.filter(level =>
    !levels.some(other =>
      context.levelOrder[other]?.includes(level)
    )
  );
}
```

---

# 5️⃣ compute-stability.ts

V1 :

* stabilité basée sur nombre d’essais
* contextuellement simple (évoluera vers multi-activité)

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { DevelopmentContext } from "./types";
import { StabilityLevel } from "@ceredis/shared-types";

export function computeStability(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  levels: string[]
): Record<string, StabilityLevel> {

  const result: Record<string, StabilityLevel> = {};

  for (const level of levels) {

    const attempts = surface.attempts;

    if (attempts >= context.stabilityThresholds.robust) {
      result[level] = "robust";
    } else if (attempts >= context.stabilityThresholds.consolidated) {
      result[level] = "consolidated";
    } else if (attempts >= context.stabilityThresholds.emergent) {
      result[level] = "emergent";
    } else {
      result[level] = "fragile";
    }
  }

  return result;
}
```

---

# 6️⃣ compute-efficiency.ts

V1 :

* divergence simple = erreurs + aides + durée relative

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { DevelopmentContext } from "./types";
import { EfficiencyLevel } from "@ceredis/shared-types";

export function computeEfficiency(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  levels: string[]
): Record<string, EfficiencyLevel> {

  const result: Record<string, EfficiencyLevel> = {};

  const rawCost =
    surface.errors +
    surface.attempts +
    surface.durationMs / 1000;

  for (const level of levels) {

    if (rawCost >= context.efficiencyThresholds.overload) {
      result[level] = "overload";
    } else if (rawCost >= context.efficiencyThresholds.costly) {
      result[level] = "costly";
    } else if (rawCost >= context.efficiencyThresholds.optimal) {
      result[level] = "optimal";
    } else {
      result[level] = "automated";
    }
  }

  return result;
}
```

---

# 7️⃣ compute-regulation.ts

V1 : détection simple basée sur patterns d’événements

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { MetacognitiveLevel } from "@ceredis/shared-types";

export function computeRegulation(
  surface: ActivityEvaluationSurface,
  levels: string[]
): Record<string, MetacognitiveLevel> {

  const result: Record<string, MetacognitiveLevel> = {};

  const hasHints = surface.events.some(e => e.type === "hint-used");
  const hasError = surface.events.some(e => e.type === "error");

  let level: MetacognitiveLevel;

  if (!hasError && !hasHints) {
    level = "strategic";
  } else if (hasHints) {
    level = "adaptive";
  } else if (hasError) {
    level = "reactive";
  } else {
    level = "non_regulated";
  }

  for (const l of levels) {
    result[l] = level;
  }

  return result;
}
```

---

# 8️⃣ utils.ts (optionnel)

Fonctions auxiliaires si besoin ultérieur.

---

# 9️⃣ Exemple d’utilisation

```ts
const score = computeScore(surface, context, "phoneme-cp-01");

console.log(score);
```

Retour typique :

```ts
{
  D: 1,
  Dd: ["lecture-cp-1"],
  Ds: { "lecture-cp-1": "consolidated" },
  De: { "lecture-cp-1": "optimal" },
  Dm: { "lecture-cp-1": "adaptive" }
}
```

---

# 🔒 Garanties V1

✔ Déterministe
✔ Conforme à la factorisation
✔ Non compensatoire
✔ Testable isolément
✔ Extensible
✔ Compatible xAPI immédiatement

---

