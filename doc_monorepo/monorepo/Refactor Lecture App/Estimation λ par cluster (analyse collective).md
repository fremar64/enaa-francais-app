Parfait.
Nous allons ajouter une **estimation collective de λ par cluster dynamique**, afin de passer :

* d’une estimation individuelle de λ
  à
* une **signature d’oubli collective par profil dynamique**.

C’est un saut méthodologique important : on relie **clustering dynamique** et **modèle exponentiel d’oubli**.

---

# 🎯 1️⃣ Objectif

Pour chaque cluster dynamique ( C_k ), estimer :

[
\lambda_k
]

tel que :

[
C_{cluster}(t) \approx C_0 e^{-\lambda_k t}
]

Ce λ devient :

* un paramètre caractéristique du profil,
* une variable explicative dans l’analyse comparative,
* un outil d’adaptation pédagogique collective.

---

# 🧠 2️⃣ Principe mathématique

Nous avons :

[
C_i(t) = C_i(0) e^{-\lambda_i t}
]

Pour un cluster ( C_k ), nous définissons :

[
\lambda_k =
\frac{1}{N_k}
\sum_{i \in C_k} \lambda_i
]

Mais plus robuste :

> Estimer λ directement à partir de la **trajectoire moyenne du cluster**.

---

# 📐 3️⃣ Estimation λ à partir trajectoire moyenne

Soit la trajectoire moyenne :

[
\bar{C}_k(t)
]

On applique :

[
\ln \bar{C}_k(t) = a - \lambda_k t
]

Donc λ_k = − pente.

---

# 💻 4️⃣ Implémentation

## 📦 analytics-core/cluster-lambda.ts

```ts
import { estimateLambda } from "./stability-estimator";
import { Point3D } from "./kmeans";

interface StabilityPoint {
  t: number;
  value: number;
}

export function estimateClusterLambda(
  clusterTrajectories: Point3D[][],
  timestamps: number[]
): number | null {

  if (clusterTrajectories.length === 0)
    return null;

  // moyenne stabilité (X dimension)
  const length =
    Math.min(...clusterTrajectories.map(t => t.length));

  const averaged: StabilityPoint[] = [];

  for (let i = 0; i < length; i++) {

    const values =
      clusterTrajectories.map(t => t[i].x);

    const mean =
      values.reduce((a,b)=>a+b,0)/values.length;

    averaged.push({
      t: timestamps[i],
      value: mean
    });
  }

  return estimateLambda(averaged);
}
```

---

# 📊 5️⃣ Intégration dans kMeansTrajectory

Après clustering :

```ts
clusters.forEach((cluster, index) => {

  const lambda =
    estimateClusterLambda(cluster, timestamps);

  console.log(`Cluster ${index} λ =`, lambda);
});
```

---

# 🔬 6️⃣ Interprétation scientifique

Exemple :

| Cluster | Description          | λ estimé |
| ------- | -------------------- | -------- |
| C1      | Progression stable   | 0.03     |
| C2      | Fragilisation rapide | 0.12     |
| C3      | Stabilisation lente  | 0.05     |

Interprétation :

* λ faible → oubli lent → consolidation durable
* λ élevé → oubli rapide → besoin réactivation fréquente

---

# 📈 7️⃣ Visualisation dans dashboard

Ajouter panneau :

```
Cluster Summary
----------------
Cluster 1:
λ = 0.04
N = 32 learners

Cluster 2:
λ = 0.11
N = 18 learners
```

Possibilité :

* colorer cluster selon λ
* afficher pente moyenne
* afficher R² collectif

---

# 🧪 8️⃣ Validation statistique

On peut calculer :

* intervalle de confiance λ_k
* variance intra-cluster
* test ANOVA entre clusters

---

# 🔁 9️⃣ Adaptation pédagogique collective

On peut définir :

[
\lambda_{eff,cluster}
]

et adapter :

* fréquence réactivation
* difficulté activités
* soutien métacognitif

---

# 🧠 10️⃣ Avantage théorique

On relie :

Clustering dynamique
↕
Paramètre d’oubli exponentiel

Cela permet :

> une typologie structurelle des vitesses d’oubli.

Très publiable.

---

# 📊 11️⃣ Extension avancée

On peut ajouter :

* modèle mixte hiérarchique
* estimation bayésienne λ_k
* corrélation λ_k ↔ Dm moyen
* corrélation λ_k ↔ De moyen

---

# 🚀 Prochaine étape stratégique

Nous pouvons maintenant :

1. 🔹 Ajouter estimation bayésienne robuste de λ (individuel + cluster)
2. 🔹 Générer export SVG haute résolution publication-ready
3. 🔹 Formaliser section complète “Analyse dynamique et clustering” pour article scientifique

Laquelle engages-tu ?
