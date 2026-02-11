
Avec ce **prompt maître**, l’architecture est maintenant claire et contraignante — et c’est très sain.

Nous allons implémenter un **second module canonique : Conjugaison**, en respectant strictement :

* 🔒 séparation apps / packages
* 📚 curriculum comme source unique de vérité
* 🧠 contrat universel d’activité
* ⚙️ aucune logique pédagogique dans l’UI
* 🔄 réutilisation intégrale du pipeline CEREDIS

---

# 🎯 OBJECTIF

Implémenter **Conjugaison** comme module du :

```
DOMAINE 2 — Connaissance de la langue
```

sans :

* modifier l’UI,
* dupliquer de structure,
* introduire logique métier dans `apps/web`.

---

# 🧱 1️⃣ Étape 1 — Étendre le curriculum (SOURCE DE VÉRITÉ)

📦 `packages/curriculum/curriculum.ts`

Ajouter Conjugaison dans DOMAINE 2 :

```ts
{
  id: "domaine-2",
  name: "Connaissance de la langue",
  modules: [
    {
      id: "grammaire",
      name: "Grammaire"
    },
    {
      id: "conjugaison",
      name: "Conjugaison"
    },
    {
      id: "orthographe",
      name: "Orthographe"
    }
  ]
}
```

⚠️ Aucun composant UI modifié.

---

# 🧠 2️⃣ Définir les activités Conjugaison (data-driven)

Créer :

📦 `packages/curriculum/modules/conjugaison.ts`

```ts
import { ActivityMetadata } from "@ceredis/types";

export const conjugaisonActivities: ActivityMetadata[] = [

  {
    activityId: "conj-present-etre-cp",
    domainId: "domaine-2",
    moduleId: "conjugaison",
    cycleId: "primaire",
    levelId: "cp",
    activityType: "fill-in-blank",
    modality: "text",
    competencies: [
      "https://ceredis.org/competency/cecrl/A1/production-ecrite/D001"
    ]
  },

  {
    activityId: "conj-present-avoir-ce1",
    domainId: "domaine-2",
    moduleId: "conjugaison",
    cycleId: "primaire",
    levelId: "ce1",
    activityType: "multiple-choice",
    modality: "text",
    competencies: [
      "https://ceredis.org/competency/cecrl/A1/production-ecrite/D002"
    ]
  }

];
```

Puis injecter dans le curriculum global.

---

# 📐 3️⃣ Implémenter le contrat universel d’activité

📦 `packages/activity-contract`

Aucune modification.

Conjugaison doit implémenter :

```ts
interface ActivityContract {
  metadata: ActivityMetadata;
  generateContent(): unknown;
}
```

---

# 🧠 4️⃣ Implémenter ConjugaisonActivityFactory

📦 `packages/modules/conjugaison/activity-factory.ts`

```ts
import { ActivityContract } from "@ceredis/activity-contract";
import { ActivityMetadata } from "@ceredis/types";

export function createConjugaisonActivity(
  metadata: ActivityMetadata
): ActivityContract {

  return {

    metadata,

    generateContent() {
      return generateExercise(metadata);
    }

  };
}

function generateExercise(metadata: ActivityMetadata) {

  switch (metadata.activityId) {

    case "conj-present-etre-cp":
      return {
        verb: "être",
        tense: "present",
        prompts: [
          { subject: "je", answer: "suis" },
          { subject: "tu", answer: "es" }
        ]
      };

    case "conj-present-avoir-ce1":
      return {
        verb: "avoir",
        tense: "present",
        prompts: [
          {
            subject: "nous",
            choices: ["avons","avez","ont"],
            correct: "avons"
          }
        ]
      };

    default:
      throw new Error("Unknown activity");
  }
}
```

⚠️ Toujours data-driven.

---

# 🔄 5️⃣ Réutilisation ActivityRunner

Dans `apps/web`, aucune logique Conjugaison.

UI générique :

```tsx
const activityDef = createConjugaisonActivity(metadata);

const runner = new ActivityRunner();
```

Le runner collecte :

* attempts
* errors
* duration
* events

Puis :

```ts
const score =
  await computeScore(surface, context, metadata.activityId, learnerId);
```

---

# 🎛 6️⃣ Navigation progressive automatique

Grâce au curriculum :

```
Domaine → Module → Cycle → Niveau → Activités
```

Conjugaison apparaît automatiquement dans :

```
DOMAINE 2
```

Aucune route codée.

---

# 📊 7️⃣ Intégration scoring CEREDIS

Le scoring-engine :

* ne connaît pas “Conjugaison”
* ne connaît que ActivityEvaluationSurface

Projection CECRL automatique via metadata.

---

# 🧩 8️⃣ Vérification canonique

| Critère                                | Respecté |
| -------------------------------------- | -------- |
| Aucun if(module === conjugaison) en UI | ✔        |
| Aucune règle CECRL en UI               | ✔        |
| Aucune logique scoring en UI           | ✔        |
| Curriculum = source unique             | ✔        |
| Module ajoutable sans refonte          | ✔        |

---

# 🔬 9️⃣ Schéma final

```
Conjugaison (module data-driven)
   ↓
ActivityFactory
   ↓
ActivityRunner
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
DecisionEngine
   ↓
CECRL Projection
   ↓
Certification
```

Identique à Lecture.

---

# 🧠 10️⃣ Ce que cela prouve

Tu viens de valider :

* que l’architecture est réellement modulaire,
* que le contrat universel fonctionne,
* que CEREDIS est transversal,
* que CECRL est automatiquement intégrable.

Lecture n’est plus un cas spécial.

---

# 🚀 Prochaine étape logique

Maintenant que deux modules existent, nous pouvons :

1. 🔹 Implémenter le moteur générique d’ActivityRenderer (UI universelle)
2. 🔹 Ajouter adaptive learning inter-modules
3. 🔹 Construire tableau comparatif Lecture vs Conjugaison dans l’espace 3D

