Excellent.
Nous allons ajouter un **clustering multi-apprenants (k-means dans l’espace 3D CEREDIS)** afin d’identifier des **profils cognitifs structuraux** dans l’espace produit projeté :

[
(x,y,z) = (Stabilité, Efficience, Régulation)
]

Ce module permettra :

* typologie empirique des profils,
* analyse cohortes,
* détection groupes à risque,
* publication statistique solide.

---

# 1️⃣ Objectif scientifique

Nous cherchons à regrouper les apprenants selon :

[
P_i = (x_i, y_i, z_i)
]

où :

* ( x_i = C_d(t) ) stabilisé
* ( y_i = efficience normalisée )
* ( z_i = régulation normalisée )

---

# 2️⃣ Interprétation des clusters

Exemples attendus :

| Cluster | Profil                             |
| ------- | ---------------------------------- |
| C1      | Haute stabilité + haute efficience |
| C2      | Stable mais coûteux                |
| C3      | Instable mais stratégique          |
| C4      | Fragile et non régulé              |

---

# 3️⃣ Implémentation k-means (analytics-core)

## 📦 `analytics-core/kmeans.ts`

```ts
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

function distance(a: Point3D, b: Point3D) {
  return Math.sqrt(
    (a.x - b.x)**2 +
    (a.y - b.y)**2 +
    (a.z - b.z)**2
  );
}

function computeCentroid(points: Point3D[]): Point3D {
  const n = points.length;

  return {
    x: points.reduce((s,p)=>s+p.x,0)/n,
    y: points.reduce((s,p)=>s+p.y,0)/n,
    z: points.reduce((s,p)=>s+p.z,0)/n
  };
}

export function kMeans(
  data: Point3D[],
  k: number,
  maxIter = 100
) {

  // initialisation aléatoire
  let centroids = data.slice(0, k);

  let clusters: Point3D[][] = [];

  for (let iter = 0; iter < maxIter; iter++) {

    clusters = Array.from({length: k}, () => []);

    // assignation
    for (const point of data) {
      const distances = centroids.map(c =>
        distance(point, c)
      );

      const minIndex =
        distances.indexOf(Math.min(...distances));

      clusters[minIndex].push(point);
    }

    // recalcul centroids
    const newCentroids =
      clusters.map(c => computeCentroid(c));

    // convergence
    if (
      JSON.stringify(newCentroids) ===
      JSON.stringify(centroids)
    ) break;

    centroids = newCentroids;
  }

  return { clusters, centroids };
}
```

---

# 4️⃣ Intégration dans dashboard

Dans `CEREDIS3DSpace` :

```ts
const { clusters, centroids } =
  kMeans(data, 3);
```

---

# 5️⃣ Coloration par cluster

```tsx
const clusterColors = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626"
];

{clusters.map((cluster, i) =>
  cluster.map((p, j) => (
    <ScorePoint
      key={`${i}-${j}`}
      point={{
        ...p,
        color: clusterColors[i]
      }}
    />
  ))
)}
```

---

# 6️⃣ Affichage des centroïdes

```tsx
function Centroid({ point }) {
  return (
    <mesh position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.12, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

{centroids.map((c, i) =>
  <Centroid key={i} point={c} />
)}
```

---

# 7️⃣ Sélection dynamique de k

Ajouter slider :

```
k = 2 → 6
```

Recalcul en temps réel.

---

# 8️⃣ Métrique qualité cluster

## Inertie intra-cluster

[
W = \sum_{clusters} \sum_{points} ||x - \mu||^2
]

Ajouter :

```ts
export function computeInertia(
  clusters: Point3D[][],
  centroids: Point3D[]
) {
  return clusters.reduce((sum, cluster, i) =>
    sum + cluster.reduce((s,p)=>
      s + distance(p, centroids[i])**2
    ,0)
  ,0);
}
```

---

# 9️⃣ Lecture scientifique

Clustering permet :

* segmentation profils cognitifs
* détection profils fragiles
* validation hypothèses
* comparaison cohortes
* corrélation λ estimé vs cluster

---

# 🔟 Extension avancée

On peut ajouter :

* clustering temporel (trajectoires complètes)
* DBSCAN (détection anomalies)
* clustering par niveau CECRL
* clustering multi-cohortes

---

# 11️⃣ Interprétation géométrique

Chaque cluster représente une **région structurelle** de l’espace produit.

Visualisation possible :

* enveloppe convexe cluster
* vecteur moyen progression
* distance au coin optimal (1,1,1)

---

# 12️⃣ Impact scientifique

Tu obtiens :

✔ Typologie empirique profils CEREDIS
✔ Classification multidimensionnelle
✔ Base pour publication quantitative
✔ Validation expérimentale
✔ Outil d’analyse cohortes

---

# 🚀 Prochaine étape stratégique

Nous pouvons maintenant :

1. 🔹 Ajouter clustering dynamique temporel (trajectoires complètes)
2. 🔹 Générer export SVG publication-ready haute résolution
3. 🔹 Formaliser section “Analyse géométrique et clustering” pour article scientifique

Laquelle engages-tu ?
