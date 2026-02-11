Nous allons implémenter le **ActivityRenderer universel**, pièce centrale qui permet :

* de rendre **n’importe quelle activité** déclarée dans le curriculum,
* sans logique pédagogique dans l’UI,
* sans condition spécifique “if module === conjugaison”,
* en respectant strictement l’architecture figée.

Ce composant devient la **UI canonique du monorepo**.

---

# 🎯 OBJECTIF

Construire un renderer :

```
ActivityDefinition
    ↓
createActivity()
    ↓
ActivityRunner
    ↓
ActivityEvaluationSurface
    ↓
ScoringEngine
    ↓
DecisionEngine
    ↓
UI Feedback
```

Tout cela via une UI **100% générique**.

---

# 🧱 1️⃣ Architecture côté apps/web

Créer :

```
apps/web/
  components/
    activity/
      ActivityRenderer.tsx
      ActivityLayout.tsx
      Renderers/
         PracticeRenderer.tsx
         ComprehensionRenderer.tsx
```

⚠️ Aucun code pédagogique spécifique.

---

# 🧠 2️⃣ Principe clé : rendu basé sur `activityType`

Le curriculum contient :

```ts
activityType:
  | "practice"
  | "comprehension"
  | "production"
```

L’UI choisit le renderer uniquement sur ce type.

---

# 💻 3️⃣ ActivityRenderer.tsx (noyau)

```tsx
"use client";

import { useState } from "react";
import { createActivity } from "@ceredis/activities";
import { ActivityRunner } from "@ceredis/activity-engine";
import { computeScore } from "@ceredis/scoring-engine";
import { evaluateDecision } from "@ceredis/decision-engine";

import { PracticeRenderer } from "./Renderers/PracticeRenderer";
import { ComprehensionRenderer } from "./Renderers/ComprehensionRenderer";

export function ActivityRenderer({ definition }) {

  const [surface, setSurface] = useState(null);
  const [score, setScore] = useState(null);
  const [decision, setDecision] = useState(null);

  const activity = createActivity(definition);
  const content = activity.createContent();

  const runner = new ActivityRunner();

  async function handleSubmit(events) {

    const evaluationSurface =
      runner.buildSurface(events);

    setSurface(evaluationSurface);

    const computedScore =
      await computeScore(
        evaluationSurface,
        definition
      );

    setScore(computedScore);

    const decisionResult =
      evaluateDecision(computedScore);

    setDecision(decisionResult);
  }

  switch (definition.activityType) {

    case "practice":
      return (
        <PracticeRenderer
          content={content}
          onSubmit={handleSubmit}
          score={score}
          decision={decision}
        />
      );

    case "comprehension":
      return (
        <ComprehensionRenderer
          content={content}
          onSubmit={handleSubmit}
          score={score}
          decision={decision}
        />
      );

    default:
      return <div>Unsupported activity type</div>;
  }
}
```

---

# 🧩 4️⃣ PracticeRenderer.tsx (générique)

```tsx
export function PracticeRenderer({
  content,
  onSubmit,
  score,
  decision
}) {

  const [answers, setAnswers] = useState({});

  function handleValidate() {

    const events = content.prompts.map(p => ({
      expected: p.answer,
      given: answers[p.subject],
      correct: p.answer === answers[p.subject]
    }));

    onSubmit(events);
  }

  return (
    <div>
      {content.prompts.map(p => (
        <div key={p.subject}>
          {p.subject}
          <input
            onChange={e =>
              setAnswers({
                ...answers,
                [p.subject]: e.target.value
              })
            }
          />
        </div>
      ))}

      <button onClick={handleValidate}>
        Valider
      </button>

      {score && <div>Score D = {score.D}</div>}
      {decision && <div>{decision.message}</div>}
    </div>
  );
}
```

---

# 📐 5️⃣ Ce que garantit ce design

✔ Aucun import curriculum dans UI
✔ Aucun import CECRL
✔ Aucun seuil dans UI
✔ Aucun if(module === conjugaison)
✔ Extensible à tout module

---

# 🔄 6️⃣ Ajouter un nouveau module ?

Il suffit :

1. D’ajouter metadata dans curriculum
2. D’ajouter dossier dans `packages/activities`
3. De définir `activityType`

UI fonctionne automatiquement.

---

# 🧠 7️⃣ Séparation parfaite des couches

| Couche         | Responsabilité |
| -------------- | -------------- |
| Curriculum     | Déclare        |
| Activities     | Génère contenu |
| ActivityEngine | Exécute        |
| Scoring        | Évalue         |
| Decision       | Interprète     |
| UI             | Affiche        |

Aucune contamination croisée.

---

# 📊 8️⃣ Intégration scoring & décision

L’UI affiche uniquement :

```tsx
{score && <ScoreSummary score={score} />}
{decision && <DecisionFeedback decision={decision} />}
```

Aucune règle dedans.

---

# 🔒 9️⃣ Architecture verrouillée

Le ActivityRenderer devient :

> la seule porte d’entrée d’exécution d’activité.

Il garantit la cohérence du système.

---

# 🚀 Prochaine étape stratégique

Maintenant que l’UI universelle est en place, nous pouvons :

1. 🔹 Connecter Lecture et Conjugaison proprement à cette UI
2. 🔹 Ajouter instrumentation analytics automatique
3. 🔹 Ajouter adaptive learning inter-modules

Laquelle engages-tu ?
