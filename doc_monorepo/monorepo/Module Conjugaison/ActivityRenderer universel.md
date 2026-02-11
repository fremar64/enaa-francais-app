Parfait.
Nous allons concevoir **l’ActivityRenderer universel**, pièce structurante qui verrouille définitivement l’architecture canonique.

Objectif :

* L’UI ne connaît plus aucun module spécifique.
* Elle reçoit un `ActivityDefinition`.
* Elle délègue l’exécution à `ActivityRunner`.
* Elle ne contient aucune logique pédagogique.

---

# 🎯 1️⃣ Rôle exact de l’ActivityRenderer

Il doit :

1. Recevoir une `ActivityDefinition`
2. Instancier le `ActivityRunner`
3. Afficher le contenu généré
4. Collecter les interactions utilisateur
5. Produire une `ActivityEvaluationSurface`
6. Transmettre au scoring-engine
7. Afficher le résultat (sans décider)

Il ne doit PAS :

* calculer de score
* connaître CECRL
* connaître les seuils
* connaître la certification

---

# 🧱 2️⃣ Architecture cible

```
UI Route
   ↓
createActivity(type, params)
   ↓
<ActivityRenderer />
   ↓
ActivityRunner
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
DecisionEngine
   ↓
UI Feedback
```

---

# 📦 3️⃣ Localisation

```
packages/ui/
  ActivityRenderer.tsx
```

ou

```
apps/shared/components/ActivityRenderer.tsx
```

(Je recommande package partagé `ui`)

---

# 💻 4️⃣ Implémentation canonique

## ActivityRenderer.tsx

```tsx
"use client";

import { useState } from "react";
import { ActivityDefinition }
  from "@ceredis/activities";
import { ActivityRunner }
  from "@ceredis/activity-engine";
import { computeScore }
  from "@ceredis/scoring-engine";

interface Props {
  activity: ActivityDefinition;
  learnerId: string;
  developmentContext: any;
}

export function ActivityRenderer({
  activity,
  learnerId,
  developmentContext
}: Props) {

  const [runner] = useState(
    () => new ActivityRunner()
  );

  const [content] = useState(
    activity.generateContent()
  );

  const [score, setScore] =
    useState<any>(null);

  async function handleSubmit() {

    const surface =
      runner.getSurface();

    const result =
      await computeScore(
        surface,
        developmentContext,
        activity.metadata.activityId,
        learnerId
      );

    setScore(result);
  }

  return (
    <div>

      <ActivityView
        content={content}
        runner={runner}
      />

      <button onClick={handleSubmit}>
        Valider
      </button>

      {score && (
        <ScoreFeedback score={score} />
      )}

    </div>
  );
}
```

---

# 🧩 5️⃣ ActivityView générique

L’ActivityRenderer ne doit pas connaître le type d’activité.

Donc ActivityView doit être polymorphe.

## ActivityView.tsx

```tsx
export function ActivityView({
  content,
  runner
}: {
  content: any;
  runner: any;
}) {

  if ("target" in content) {
    return (
      <PhonemeExercise
        content={content}
        runner={runner}
      />
    );
  }

  if ("infinitive" in content) {
    return (
      <VerbExercise
        content={content}
        runner={runner}
      />
    );
  }

  return <div>Type inconnu</div>;
}
```

⚠️ Ce dispatch doit rester minimal.

---

# 🧠 6️⃣ Séparation critique

L’ActivityRenderer :

* orchestre
* n’interprète pas le score
* ne décide pas de la suite

Le DecisionEngine peut renvoyer :

```ts
{
  nextAction: "remediation" | "advance"
}
```

L’UI se contente d’afficher.

---

# 📘 7️⃣ Utilisation dans une route

Dans `apps/lecture/app/page.tsx` :

```tsx
import { createActivity }
  from "@ceredis/activities";
import { ActivityRenderer }
  from "@ceredis/ui";

export default function Page() {

  const activity =
    createActivity("lecture:phoneme", {
      phoneme: "a",
      level: "cp"
    });

  return (
    <ActivityRenderer
      activity={activity}
      learnerId="learner123"
      developmentContext={{}}
    />
  );
}
```

Route totalement générique.

---

# 🔒 8️⃣ Vérification architecturale

Checklist :

| Critère                           | OK |
| --------------------------------- | -- |
| UI ne connaît pas scoring interne | ✔  |
| UI ne connaît pas CECRL           | ✔  |
| UI ne contient aucun seuil        | ✔  |
| UI reçoit ActivityDefinition      | ✔  |
| ActivityRunner produit surface    | ✔  |

---

# 🧠 9️⃣ Extension future

On pourra ajouter :

* instrumentation analytics intégrée
* animation 3D intégrée
* suivi temps réel stabilité
* preview CECRL projection

Sans toucher aux modules métier.

---

# 🎓 10️⃣ Impact architectural

Avec ActivityRenderer universel :

* Lecture devient véritablement canonique.
* Conjugaison devient interchangeable.
* Nouveau module = uniquement nouvelle factory.
* L’architecture est fermée pour modification, ouverte pour extension.

---

# 🚀 Étape stratégique suivante

Nous pouvons maintenant :

1. 🔹 Supprimer toutes routes spécifiques métier (refactor navigation 100% générique)
2. 🔹 Connecter automatiquement ActivityRenderer au DecisionEngine complet
3. 🔹 Ajouter instrumentation analytics automatique dans Renderer

Laquelle engages-tu ?
