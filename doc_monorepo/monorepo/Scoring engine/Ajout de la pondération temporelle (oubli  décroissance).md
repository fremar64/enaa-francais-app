Très bonne évolution.
Nous allons introduire une **pondération temporelle formelle de la stabilité**, afin d’intégrer un modèle d’oubli / décroissance sans violer :

* la non-compensation,
* la structure ordinale de Ds,
* la traçabilité,
* la séparation score / décision.

Nous passons donc de :

[
Ds(d) = f(\text{nombre de confirmations})
]

à :

[
Ds(d) = f\Big(\sum w(t_i)\Big)
]

où ( w(t_i) ) est une fonction de pondération temporelle.

---

# 1️⃣ Principe mathématique

## 1.1. Historique

Soit un ensemble d’événements confirmant un niveau ( d ) :

[
H_d = { (a_i, t_i) }
]

avec :

* ( a_i ) = activité indépendante validée,
* ( t_i ) = timestamp.

---

## 1.2. Fonction de décroissance

On définit une fonction :

[
w(\Delta t) = e^{-\lambda \Delta t}
]

où :

* ( \Delta t = \text{temps écoulé depuis la validation} )
* ( \lambda > 0 ) = paramètre d’oubli

Propriétés :

* récente → poids ≈ 1
* ancienne → poids → 0
* jamais négatif

---

## 1.3. Score pondéré

On définit :

[
C_d = \sum_{i=1}^{n} w(\Delta t_i)
]

La stabilité devient fonction de ( C_d ), et non du simple nombre d’activités.

---

# 2️⃣ Extension du DevelopmentContext

Dans `types.ts` :

```ts
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
  historyReader?: LRSHistoryReader;

  forgettingLambda?: number; // ← nouveau
}
```

---

# 3️⃣ Nouvelle compute-stability.ts

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";
import { DevelopmentContext } from "./types";
import { StabilityLevel } from "@ceredis/shared-types";

function decayWeight(
  deltaMs: number,
  lambda: number
): number {
  const deltaDays = deltaMs / (1000 * 60 * 60 * 24);
  return Math.exp(-lambda * deltaDays);
}

export async function computeStability(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext,
  levels: string[],
  learnerId: string
): Promise<Record<string, StabilityLevel>> {

  const result: Record<string, StabilityLevel> = {};
  const now = Date.now();
  const lambda = context.forgettingLambda ?? 0;

  for (const level of levels) {

    let weightedConfirmations = 0;

    // 1️⃣ activité courante (poids maximal)
    if (surface.success) {
      weightedConfirmations += 1;
    }

    // 2️⃣ historique
    if (context.historyReader) {

      const history =
        await context.historyReader.getLevelHistory(
          learnerId,
          level
        );

      const seenActivities = new Set<string>();

      for (const h of history) {

        if (!h.success) continue;

        // garantir indépendance par activité
        if (seenActivities.has(h.activityId)) continue;
        seenActivities.add(h.activityId);

        const delta = now - h.timestamp;

        const weight =
          lambda > 0
            ? decayWeight(delta, lambda)
            : 1;

        weightedConfirmations += weight;
      }
    }

    // 3️⃣ classification ordinale
    if (weightedConfirmations >= context.stabilityThresholds.robust) {
      result[level] = "robust";
    } else if (weightedConfirmations >= context.stabilityThresholds.consolidated) {
      result[level] = "consolidated";
    } else if (weightedConfirmations >= context.stabilityThresholds.emergent) {
      result[level] = "emergent";
    } else {
      result[level] = "fragile";
    }
  }

  return result;
}
```

---

# 4️⃣ Interprétation scientifique

Nous avons maintenant :

[
C_d =
1
+
\sum_{i} e^{-\lambda \Delta t_i}
]

Ce qui implique :

* Une confirmation très ancienne ≈ quasi nulle.
* Une compétence non réactivée peut redevenir fragile.
* La stabilité devient **dynamique dans le temps**.

---

# 5️⃣ Propriétés respectées

✔ Non-compensation maintenue
✔ Ordre partiel conservé
✔ Traçabilité complète
✔ Paramètre expérimental contrôlable

---

# 6️⃣ Calibration de λ

Interprétation pratique :

| λ    | Effet        |
| ---- | ------------ |
| 0    | pas d’oubli  |
| 0.01 | oubli lent   |
| 0.05 | oubli modéré |
| 0.1  | oubli rapide |

On peut définir :

[
\lambda = \frac{\ln 2}{T_{1/2}}
]

où ( T_{1/2} ) = demi-vie pédagogique.

---

# 7️⃣ Conséquence pédagogique

Un niveau peut :

* être robuste aujourd’hui,
* redevenir consolidé après 3 mois sans activation,
* redevenir fragile après longue inactivité.

Ce modèle est cohérent avec :

* psychologie cognitive (courbe d’oubli),
* pédagogie spiralaire,
* apprentissage espacé.

---

# 8️⃣ Ce que cela ouvre

Nous pouvons maintenant formaliser :

1. 🔹 La dérivée temporelle de stabilité
2. 🔹 Un indicateur de risque de régression
3. 🔹 Un algorithme de planification optimale de réactivation

---

