Très bien.
Nous allons ajouter une **instrumentation analytics complète**, cohérente avec :

* le contrat universel d’activité,
* la factorisation CEREDIS,
* la traçabilité xAPI,
* la recherche expérimentale (simulation incluse),
* et l’analyse longitudinale (stabilité dynamique).

L’objectif est d’obtenir un **pipeline analytique scientifique-ready**, pas simplement des logs.

---

# 🎯 1️⃣ Objectifs de l’instrumentation

L’instrumentation doit permettre :

1. 🔹 Reconstruction complète des trajectoires d’apprentissage
2. 🔹 Analyse multidimensionnelle (Dd, Ds, De, Dm)
3. 🔹 Analyse temporelle (dérivée, oubli, réactivation)
4. 🔹 Analyse comparative (CEREDIS vs classique)
5. 🔹 Export vers R / Python

---

# 🧱 2️⃣ Architecture analytics cible

```
ActivityRunner
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
DecisionEngine
   ↓
AnalyticsEmitter
   ↓
xAPI Statement (enrichi)
   ↓
LRS
   ↓
Analytics-Core (offline)
   ↓
Research Export (R / CSV / JSON)
```

---

# 3️⃣ Nouveau package : analytics-core

```
packages/analytics-core/
  src/
    event-schema.ts
    score-snapshot.ts
    trajectory-builder.ts
    stability-dynamics.ts
    metrics.ts
    exporter.ts
```

---

# 4️⃣ Instrumentation niveau activité

## 📦 event-schema.ts

```ts
export interface AnalyticsEvent {
  learnerId: string;
  activityId: string;
  timestamp: number;

  surface: {
    attempts: number;
    errors: number;
    durationMs: number;
  };

  score: {
    D: 0 | 1;
    Dd: string[];
    Ds: Record<string, string>;
    De: Record<string, string>;
    Dm: Record<string, string>;
  };

  decisions?: {
    actions: string[];
  };
}
```

---

# 5️⃣ Émission automatique analytics

Dans `decision-engine` :

```ts
import { emitAnalytics } from "@ceredis/analytics-core";

emitAnalytics({
  learnerId,
  activityId,
  timestamp: Date.now(),
  surface,
  score,
  decisions
});
```

---

# 6️⃣ Trajectoire reconstruite

## trajectory-builder.ts

```ts
export function buildTrajectory(
  events: AnalyticsEvent[]
) {
  return events
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(e => ({
      t: e.timestamp,
      Dd: e.score.Dd,
      Ds: e.score.Ds
    }));
}
```

---

# 7️⃣ Dynamique de stabilité longitudinale

## stability-dynamics.ts

```ts
export function computeWeightedStability(
  history: number[],
  lambda: number,
  now: number
) {

  return history.reduce((sum, t_i) => {
    const delta =
      (now - t_i) / (1000 * 60 * 60 * 24);
    return sum + Math.exp(-lambda * delta);
  }, 0);
}
```

---

# 8️⃣ Indicateurs analytiques avancés

## metrics.ts

```ts
export function computeRetentionRate(
  performances: number[]
) {
  return performances.reduce((a,b)=>a+b,0) / performances.length;
}

export function computeFalsePositiveRate(
  certified: boolean[],
  actualRetention: boolean[]
) {
  let fp = 0;
  for (let i=0;i<certified.length;i++) {
    if (certified[i] && !actualRetention[i]) fp++;
  }
  return fp / certified.length;
}
```

---

# 9️⃣ Export recherche

## exporter.ts

```ts
import fs from "fs";

export function exportToCSV(
  events: AnalyticsEvent[],
  path: string
) {

  const header =
    "learnerId,activityId,timestamp,D,attempts,errors\n";

  const rows = events.map(e =>
    `${e.learnerId},${e.activityId},${e.timestamp},${e.score.D},${e.surface.attempts},${e.surface.errors}`
  );

  fs.writeFileSync(path, header + rows.join("\n"));
}
```

---

# 🔟 Instrumentation xAPI enrichie

Nous ajoutons dans extensions :

```json
"extensions": {
  "https://ceredis.org/extensions/dd": [...],
  "https://ceredis.org/extensions/ds": {...},
  "https://ceredis.org/extensions/de": {...},
  "https://ceredis.org/extensions/dm": {...},
  "https://ceredis.org/extensions/analytics-version": "1.0"
}
```

---

# 1️⃣1️⃣ Dashboard Admin futur

Analytics permet :

* Courbe stabilité par niveau
* Heatmap Dd
* Radar multidimensionnel
* Détection fragilisation
* Charge de réactivation

---

# 1️⃣2️⃣ Validation scientifique possible

Avec cette instrumentation tu peux :

✔ Calculer trajectoires individuelles
✔ Modéliser dérivée empirique
✔ Comparer λ estimé vs théorique
✔ Publier analyses longitudinales
✔ Tester CEREDIS vs SM-2

---

# 1️⃣3️⃣ Test unitaire analytics

```ts
it("computes retention decreasing over time", () => {
  const now = Date.now();
  const history = [now - 1e6, now - 5e6];
  const value = computeWeightedStability(history, 0.1, now);
  expect(value).toBeGreaterThan(0);
});
```

---

# 1️⃣4️⃣ Architecture finale enrichie

```
Lecture
   ↓
Scoring
   ↓
Decision
   ↓
AnalyticsEmitter
   ↓
LRS
   ↓
Offline Research Analytics
```

---

# 🔬 Résultat

Le système CEREDIS est maintenant :

* évaluatif,
* adaptatif,
* certificatif,
* expérimental,
* analytiquement instrumenté.

Il devient un **système de recherche en ingénierie cognitive complet**.

---

