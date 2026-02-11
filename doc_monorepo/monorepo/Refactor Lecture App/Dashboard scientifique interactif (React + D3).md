Parfait.
Nous allons concevoir un **dashboard scientifique interactif CEREDIS (React + D3)**, pensé non comme un simple tableau de bord pédagogique, mais comme un **outil d’analyse expérimentale et longitudinale**.

Objectifs :

* visualiser la trajectoire multidimensionnelle (Dd, Ds, De, Dm),
* afficher la dynamique temporelle (dérivée, oubli),
* détecter fragilisations,
* comparer CEREDIS vs classique,
* exporter données pour recherche.

---

# 🧭 1️⃣ Architecture du dashboard

```
apps/admin (Next.js / React)
   ├─ /dashboard
   │   ├─ TrajectoryView.tsx
   │   ├─ StabilityCurve.tsx
   │   ├─ RadarMultidimensional.tsx
   │   ├─ CertificationPanel.tsx
   │   ├─ RiskHeatmap.tsx
   │   └─ ComparisonView.tsx
   └─ services/
       ├─ analytics-api.ts
       └─ transform.ts
```

Dépendances :

```
react
d3
@ceredis/analytics-core
```

---

# 📊 2️⃣ Visualisations scientifiques clés

## A. Trajectoire longitudinale (Dd + Ds)

Graphique :

* Axe X = temps
* Axe Y = stabilité pondérée C(t)
* Seuils horizontaux = emergent / consolidated / robust
* Courbe exponentielle décroissante
* Points = réactivations

---

## B. Radar multidimensionnel

Axes :

* Amplitude (Dd cardinalité)
* Stabilité moyenne
* Efficience moyenne
* Régulation moyenne

Permet visualisation structurelle du profil.

---

## C. Heatmap niveaux CECRL

* Axe X = temps
* Axe Y = niveaux CECRL
* Couleur = stabilité

---

## D. Comparaison CEREDIS vs Classique

Deux courbes :

* Certification instantanée
* Certification stabilisée CEREDIS

---

# 💻 3️⃣ Implémentation — StabilityCurve.tsx

```tsx
"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface Point {
  t: number;
  value: number;
}

export function StabilityCurve({
  data,
  thresholds
}: {
  data: Point[];
  thresholds: {
    emergent: number;
    consolidated: number;
    robust: number;
  };
}) {

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.t) as [number, number])
      .range([40, width - 20]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([height - 30, 20]);

    const line = d3.line<Point>()
      .x(d => x(d.t))
      .y(d => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2);

    // seuils
    Object.values(thresholds).forEach(th => {
      svg.append("line")
        .attr("x1", 40)
        .attr("x2", width - 20)
        .attr("y1", y(th))
        .attr("y2", y(th))
        .attr("stroke-dasharray", "4 4")
        .attr("stroke", "red");
    });

  }, [data]);

  return <svg ref={ref} width={600} height={300} />;
}
```

---

# 🧠 4️⃣ RadarMultidimensional.tsx

```tsx
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export function RadarMultidimensional({
  profile
}: {
  profile: {
    amplitude: number;
    stability: number;
    efficiency: number;
    regulation: number;
  };
}) {

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = 100;

    const axes = Object.keys(profile);

    const angle = d3.scaleLinear()
      .domain([0, axes.length])
      .range([0, 2 * Math.PI]);

    const r = d3.scaleLinear()
      .domain([0, 1])
      .range([0, radius]);

    const values = axes.map(
      (axis, i) => {
        const value = profile[axis as keyof typeof profile];
        return [
          r(value) * Math.cos(angle(i)),
          r(value) * Math.sin(angle(i))
        ];
      }
    );

    svg.append("polygon")
      .attr("points", values.map(d => d.join(",")).join(" "))
      .attr("fill", "rgba(37,99,235,0.3)")
      .attr("stroke", "#2563eb");

  }, [profile]);

  return <svg ref={ref} width={300} height={300} />;
}
```

---

# 📈 5️⃣ ComparisonView.tsx

Affiche :

* Courbe performance brute
* Courbe stabilité CEREDIS
* Marqueurs certification

---

# 🔬 6️⃣ Intégration analytics-core

Dans `analytics-api.ts` :

```ts
import { buildTrajectory } from "@ceredis/analytics-core";

export async function fetchLearnerTrajectory(
  learnerId: string
) {

  const events = await fetch(`/api/analytics/${learnerId}`)
    .then(res => res.json());

  return buildTrajectory(events);
}
```

---

# 🎯 7️⃣ Layout Dashboard scientifique

```
------------------------------------------------
| Stability Curve (full width)               |
------------------------------------------------
| Radar | Heatmap | Certification Timeline   |
------------------------------------------------
| CEREDIS vs Classique Comparison            |
------------------------------------------------
```

---

# 🧩 8️⃣ Propriétés scientifiques

Ce dashboard permet :

✔ Visualisation trajectoire exponentielle
✔ Détection visuelle fragilisation
✔ Validation empirique λ
✔ Observation dérivée
✔ Comparaison inter-modèles
✔ Publication-ready figures

---

# 🔒 9️⃣ Séparation architecturale respectée

* Dashboard ne calcule rien.
* Il consomme `analytics-core`.
* Il n’influence pas scoring.
* Il ne modifie pas décision.

---

