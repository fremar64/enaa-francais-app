Nous allons activer une **instrumentation analytics automatique et systémique** dans `ActivityRenderer`, sans casser l’architecture verrouillée.

Objectifs :

* aucune logique analytique dans les renderers spécifiques,
* aucune dépendance UI → analytics-core directe non contrôlée,
* émission automatique après décision,
* compatibilité LRS / export recherche,
* extensible à 10+ ans.

---

# 🧠 1️⃣ Principe architectural

L’analytics doit être :

* déclenché **après scoring et décision**,
* encapsulé dans un service,
* totalement indépendant des composants spécifiques.

Donc :

```
ActivityRenderer
   ↓
Scoring
   ↓
Decision
   ↓
AnalyticsEmitter  ← NOUVEAU
```

---

# 🧱 2️⃣ Nouveau service analytics dans packages

📦 `packages/analytics-core/emitter.ts`

```ts
import { AnalyticsEvent } from "./event-schema";

export interface AnalyticsAdapter {
  send(event: AnalyticsEvent): Promise<void>;
}

let adapter: AnalyticsAdapter | null = null;

export function registerAnalyticsAdapter(a: AnalyticsAdapter) {
  adapter = a;
}

export async function emitAnalyticsEvent(
  event: AnalyticsEvent
) {
  if (!adapter) return;
  await adapter.send(event);
}
```

---

# 📊 3️⃣ Définition événement analytique enrichi

📦 `packages/analytics-core/event-schema.ts`

```ts
export interface AnalyticsEvent {

  learnerId: string;
  timestamp: number;

  activity: {
    activityId: string;
    domainId: string;
    moduleId: string;
    cycleId: string;
    levelId: string;
  };

  surface: {
    attempts: number;
    errors: number;
    durationMs: number;
  };

  score: {
    D: 0 | 1;
    Dd: string[];
    Ds: Record<string,string>;
    De: Record<string,string>;
    Dm: Record<string,string>;
  };

  decision?: {
    certified: boolean;
    recommendation?: string;
  };

  analyticsVersion: "1.0";
}
```

---

# 🧭 4️⃣ Adapter côté apps/web

Dans :

```
apps/web/lib/analytics-adapter.ts
```

```ts
import {
  registerAnalyticsAdapter
} from "@ceredis/analytics-core";

registerAnalyticsAdapter({

  async send(event) {

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });

  }

});
```

Ce fichier est importé une fois dans `_app.tsx` ou layout.

---

# 💻 5️⃣ Modification ActivityRenderer

⚠️ Une seule modification.

```tsx
import {
  emitAnalyticsEvent
} from "@ceredis/analytics-core";

async function handleSubmit(events) {

  const evaluationSurface =
    runner.buildSurface(events);

  const computedScore =
    await computeScore(
      evaluationSurface,
      definition
    );

  const decisionResult =
    evaluateDecision(computedScore);

  await emitAnalyticsEvent({

    learnerId: currentLearnerId,
    timestamp: Date.now(),

    activity: {
      activityId: definition.activityId,
      domainId: definition.domainId,
      moduleId: definition.moduleId,
      cycleId: definition.cycleId,
      levelId: definition.levelId
    },

    surface: {
      attempts: evaluationSurface.attempts,
      errors: evaluationSurface.errors,
      durationMs: evaluationSurface.durationMs
    },

    score: computedScore,
    decision: decisionResult,

    analyticsVersion: "1.0"
  });

  setScore(computedScore);
  setDecision(decisionResult);
}
```

---

# 🔒 6️⃣ Pourquoi c’est propre

✔ UI n’analyse rien
✔ analytics-core ne dépend pas UI
✔ Adapter injectable
✔ Testable en isolation
✔ Compatible LRS
✔ Compatible export R

---

# 🧪 7️⃣ API Next.js

Créer :

```
apps/web/app/api/analytics/route.ts
```

```ts
export async function POST(req: Request) {

  const event = await req.json();

  console.log("Analytics event:", event);

  // Ici :
  // - envoyer vers LRS
  // - stocker DB
  // - buffer
  // - pipeline Kafka futur

  return new Response(null, { status: 204 });
}
```

---

# 📈 8️⃣ Effet immédiat

Chaque activité (Lecture ou Conjugaison) émet automatiquement :

* trajectoire multidimensionnelle,
* stabilité,
* efficience,
* régulation,
* décision,
* contexte pédagogique.

Sans modification supplémentaire.

---

# 🧠 9️⃣ Architecture mise à jour

```plantuml
@startuml
[ActivityRenderer]
  --> [ActivityRunner]
  --> [ScoringEngine]
  --> [DecisionEngine]
  --> [AnalyticsEmitter]
  --> [AnalyticsAdapter]
  --> [API]
@enduml
```

---

# 🔬 10️⃣ Validation scientifique

Tu obtiens maintenant :

* trajectoires complètes
* données pour λ empirique
* clustering dynamique
* Pareto 3D
* étude comparative
* publication-ready dataset

---

# 🚀 Étape suivante stratégique

Maintenant que l’instrumentation est activée, nous pouvons :

1. 🔹 Activer adaptive learning inter-modules
2. 🔹 Implémenter règles ESLint anti-dépendances interdites
3. 🔹 Ajouter buffer offline + replay analytics

Laquelle engages-tu ?
