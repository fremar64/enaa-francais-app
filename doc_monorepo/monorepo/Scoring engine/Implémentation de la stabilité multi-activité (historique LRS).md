Excellente étape.
Nous allons faire évoluer **Ds** d’une stabilité intra-activité (V1) vers une **stabilité inter-activités basée sur historique LRS**, conformément à la définition formelle :

> stabilité = confirmation d’un niveau dans des contextes indépendants.

Nous restons :

* déterministes,
* non compensatoires,
* traçables,
* découplés de l’infrastructure LRS réelle (injection via interface).

---

# 🎯 Objectif

Remplacer :

```
Ds = f(surface courante)
```

par :

```
Ds = f(surface courante + historique LRS filtré par niveau)
```

---

# 1️⃣ Nouvelle abstraction : LearningRecordStoreReader

Le scoring-engine ne doit pas dépendre du LRS concret.
On introduit une interface.

## 📦 `scoring-engine/src/history.ts`

```ts
import { StabilityLevel } from "@ceredis/shared-types";

export interface HistoricalLevelEvidence {
  levelId: string;
  activityId: string;
  success: boolean;
  timestamp: number;
}

export interface LRSHistoryReader {
  getLevelHistory(
    learnerId: string,
    levelId: string
  ): Promise<HistoricalLevelEvidence[]>;
}
```

---

# 2️⃣ Extension du DevelopmentContext

Dans `types.ts` :

```ts
import { LRSHistoryReader } from "./history";

export interface DevelopmentContext {
  activityToLevels: Record<string, string[]>;
  levelOrder: Record<string, string[]>;
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
  historyReader?: LRSHistoryReader; // ← nouveau
}
```

---

# 3️⃣ Nouvelle signature computeScore

Dans `index.ts` :

```ts
export async function computeScore(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  activityId: string,
  learnerId: string
): Promise<CEREDISScore> {
```

---

# 4️⃣ Nouvelle version de compute-stability

## 📦 `compute-stability.ts`

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { DevelopmentContext } from "./types";
import { StabilityLevel } from "@ceredis/shared-types";

export async function computeStability(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  levels: string[],
  learnerId: string
): Promise<Record<string, StabilityLevel>> {

  const result: Record<string, StabilityLevel> = {};

  for (const level of levels) {

    let confirmations = 0;

    // 1️⃣ activité courante
    if (surface.success) confirmations++;

    // 2️⃣ historique LRS
    if (context.historyReader) {
      const history = await context.historyReader.getLevelHistory(
        learnerId,
        level
      );

      const independentActivities = new Set(
        history
          .filter(h => h.success)
          .map(h => h.activityId)
      );

      confirmations += independentActivities.size;
    }

    // 3️⃣ classification
    if (confirmations >= context.stabilityThresholds.robust) {
      result[level] = "robust";
    } else if (confirmations >= context.stabilityThresholds.consolidated) {
      result[level] = "consolidated";
    } else if (confirmations >= context.stabilityThresholds.emergent) {
      result[level] = "emergent";
    } else {
      result[level] = "fragile";
    }
  }

  return result;
}
```

---

# 5️⃣ Mise à jour de index.ts

```ts
const Ds = await computeStability(
  surface,
  context,
  Dd,
  learnerId
);
```

---

# 6️⃣ Propriété fondamentale désormais respectée

La stabilité est maintenant :

[
Ds(d) =
\text{fonction du nombre de contextes indépendants validés}
]

Contexte indépendant = activité différente.

✔ Pas de répétition artificielle
✔ Pas de compensation par tentatives multiples
✔ Pas de dépendance UI

---

# 7️⃣ Implémentation côté LRS (exemple Supabase)

Dans `apps/web` ou `infrastructure` :

```ts
export class SupabaseHistoryReader implements LRSHistoryReader {

  async getLevelHistory(learnerId: string, levelId: string) {

    const { data } = await supabase
      .from("xapi_statements")
      .select("*")
      .eq("learner_id", learnerId)
      .contains("dd_levels", [levelId]);

    return data.map(d => ({
      levelId,
      activityId: d.activity_id,
      success: d.success,
      timestamp: d.timestamp
    }));
  }
}
```

---

# 8️⃣ Nouveau comportement observé

Exemple :

| Activité | Niveau       | Succès |
| -------- | ------------ | ------ |
| A1       | lecture-cp-1 | ✔      |
| A2       | lecture-cp-1 | ✔      |
| A3       | lecture-cp-1 | ✔      |

Avec seuils :

```
emergent = 1
consolidated = 2
robust = 3
```

→ Ds = robust

---

# 9️⃣ Complexité

Si :

* n = activités historiques du niveau

Complexité :

```
O(n) par niveau
```

Optimisable via agrégations LRS.

---

# 🔬 Ce que cela change scientifiquement

On passe de :

> stabilité locale

à

> stabilité longitudinale multi-contextuelle

Ce qui est conforme à la définition théorique CEREDIS.

---

