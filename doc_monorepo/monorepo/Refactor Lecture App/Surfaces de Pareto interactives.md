Nous allons ajouter des **surfaces de Pareto interactives** dans l’espace 3D CEREDIS afin de visualiser explicitement :

* la **dominance partielle**,
* la **frontière de Pareto**,
* les points dominés / non dominés,
* la progression vers la région optimale.

Nous restons cohérents avec :

[
S = D_d \times D_s \times D_e \times D_m
]

et la projection 3D :

[
(x, y, z) = (Stabilité, Efficience, Régulation)
]

---

# 1️⃣ Rappel : dominance de Pareto

Un point A domine B si :

[
x_A \ge x_B
\land
y_A \ge y_B
\land
z_A \ge z_B
]

et au moins une inégalité stricte.

La **frontière de Pareto** est l’ensemble des points non dominés.

---

# 2️⃣ Étape 1 — Détection des points dominés

## 📦 analytics-core/pareto.ts

```ts
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function isDominated(
  point: Point3D,
  others: Point3D[]
): boolean {

  return others.some(o =>
    o.x >= point.x &&
    o.y >= point.y &&
    o.z >= point.z &&
    (
      o.x > point.x ||
      o.y > point.y ||
      o.z > point.z
    )
  );
}

export function computeParetoFront(
  points: Point3D[]
): Point3D[] {

  return points.filter(p =>
    !isDominated(p, points)
  );
}
```

---

# 3️⃣ Étape 2 — Surfaces de dominance 3D

Dans le cube [0,1]^3 :

Pour un point P(x,y,z), la région dominée est :

[
[0,x] \times [0,y] \times [0,z]
]

Nous allons afficher cette région sous forme de cube semi-transparent.

---

# 4️⃣ Implémentation Three.js — ParetoSurface.tsx

```tsx
import { MeshProps } from "@react-three/fiber";

interface ParetoRegionProps {
  x: number;
  y: number;
  z: number;
}

export function ParetoRegion({
  x,
  y,
  z
}: ParetoRegionProps) {

  return (
    <mesh position={[x/2, y/2, z/2]}>
      <boxGeometry args={[x, y, z]} />
      <meshStandardMaterial
        color="red"
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}
```

---

# 5️⃣ Intégration dans CEREDIS3DSpace

```tsx
const paretoFront = computeParetoFront(data);

{paretoFront.map((p, i) => (
  <ParetoRegion
    key={i}
    x={p.x}
    y={p.y}
    z={p.z}
  />
))}
```

---

# 6️⃣ Mise en évidence visuelle

### Points dominés → gris

### Points Pareto → couleur amplitude

### Région dominée → rouge translucide

---

# 7️⃣ Interaction utilisateur

Ajouter toggles :

* [ ] Afficher régions dominées
* [ ] Afficher uniquement frontière
* [ ] Afficher trajectoire temporelle
* [ ] Afficher direction optimale

---

# 8️⃣ Direction optimale

Vecteur vers coin idéal (1,1,1) :

```ts
function computeOptimalVector(p: Point3D) {
  return {
    dx: 1 - p.x,
    dy: 1 - p.y,
    dz: 1 - p.z
  };
}
```

Visualiser avec flèche 3D.

---

# 9️⃣ Surface globale de Pareto

On peut aussi approximer une surface enveloppe :

* calculer hull convexe des points Pareto
* dessiner mesh triangulé

(Utiliser d3-delaunay ou quickhull 3D)

---

# 🔟 Lecture scientifique

Dans le cube :

* Zone basse = fragilité
* Zone intermédiaire = consolidation
* Coin supérieur = compétence robuste, efficiente, stratégique

La frontière de Pareto représente :

> l’ensemble des états non améliorables simultanément.

---

# 1️⃣1️⃣ Analyse dynamique

Si trajectoire :

* converge vers frontière → progression saine
* stagne sous frontière → inefficience structurelle
* oscille → instabilité métacognitive

---

# 1️⃣2️⃣ Extension avancée

On peut calculer :

[
Distance_to_Pareto
]

pour chaque point dominé.

---

# 1️⃣3️⃣ Impact scientifique

Tu obtiens :

✔ Visualisation géométrique formelle
✔ Illustration dominance partielle
✔ Outil publication-ready
✔ Argument théorique fort

---

