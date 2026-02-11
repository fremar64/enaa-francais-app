

On va stabiliser **définitivement** la couche `packages/` pour que :

* le monorepo soit cohérent sur 10 ans,
* l’ajout d’un module ne crée pas un nouveau “mini-système”,
* le curriculum reste la seule source de vérité,
* les activités soient clairement séparées de leur déclaration pédagogique.

Nous procédons méthodiquement.

---

# 🎯 OBJECTIF DU REFACTOR

Passer de :

```
packages/
  curriculum/
  lecture-curriculum/
  conjugaison-curriculum/
```

à :

```
packages/
  curriculum/              ← SOURCE DE VÉRITÉ (déclarations)
  activity-engine/
  scoring-engine/
  cass-client/
  analytics-core/
  activities/              ← Implémentations concrètes
     lecture/
     conjugaison/
```

---

# 🧱 1️⃣ Principe fondamental (à figer)

## 🔵 Curriculum

Contient uniquement :

* domaines
* modules
* cycles
* niveaux
* metadata activités

Aucune génération d’exercice.
Aucune logique pédagogique.

---

## 🟢 Activities

Contient :

* ActivityFactory
* générateurs de contenu
* helpers spécifiques
* logique pure métier

---

## 🔴 UI

Ne connaît que :

```
ActivityDefinition
→ ActivityRunner
→ EvaluationSurface
```

---

# 📦 2️⃣ Nouvelle structure cible exacte

Dans :

```
/home/ceredis/enaa-francais-app/packages/
```

Créer :

```
activities/
  package.json
  lecture/
     activity-factory.ts
     content/
  conjugaison/
     activity-factory.ts
     content/
  index.ts
```

---

# 🔧 3️⃣ Étapes concrètes de refactor

## Étape A — Supprimer

```
packages/conjugaison-curriculum/
packages/lecture-curriculum/  (si existant)
```

⚠️ Le curriculum reste intact.

---

## Étape B — Créer `packages/activities/package.json`

```json
{
  "name": "@ceredis/activities",
  "private": true,
  "main": "index.ts"
}
```

---

## Étape C — Déplacer la factory Conjugaison

Créer :

```
packages/activities/conjugaison/activity-factory.ts
```

Exemple :

```ts
import { ActivityDefinition } from "@ceredis/types";

export function createConjugaisonActivity(
  definition: ActivityDefinition
) {

  return {
    metadata: definition,

    createContent() {
      switch (definition.activityId) {

        case "conj-present-etre-cp":
          return {
            verb: "être",
            tense: "present",
            prompts: [
              { subject: "je", answer: "suis" },
              { subject: "tu", answer: "es" }
            ]
          };

        default:
          throw new Error("Unknown conjugaison activity");
      }
    }

  };
}
```

---

## Étape D — Créer registry globale des factories

📦 `packages/activities/index.ts`

```ts
import { createConjugaisonActivity } from "./conjugaison/activity-factory";
import { createLectureActivity } from "./lecture/activity-factory";

export function createActivity(definition) {

  switch (definition.moduleId) {

    case "conjugaison":
      return createConjugaisonActivity(definition);

    case "lecture":
      return createLectureActivity(definition);

    default:
      throw new Error("Unknown module");
  }
}
```

---

# 🧠 4️⃣ Pourquoi cette registry est cruciale

Elle permet :

* d’ajouter un module sans toucher à l’UI
* de garder un point d’entrée unique
* de maintenir une architecture propre
* d’éviter 50 imports dispersés

---

# 📚 5️⃣ Vérification logique finale

Pipeline devient :

```
curriculum → ActivityDefinition
             ↓
        createActivity()
             ↓
        ActivityRunner
             ↓
        ScoringEngine
             ↓
        DecisionEngine
```

Aucune dépendance circulaire.

---

# 🔬 6️⃣ Vérification de robustesse

Ajouter un nouveau module (ex: Orthographe) implique :

1. Ajouter metadata dans curriculum
2. Ajouter dossier :

```
activities/orthographe/
```

3. Ajouter case dans registry

Aucune modification UI.
Aucune modification scoring.

---

# 🧱 7️⃣ Ce que cela corrige structurellement

On élimine :

* fragmentation des packages
* risque de duplication curriculum
* explosion de dépendances
* dérive micro-services internes

On impose :

> Une seule couche déclarative.
> Une seule couche d’implémentation.
> Une seule couche d’exécution.

---

# 🚦 8️⃣ Après ce refactor

Nous pourrons :

* construire ActivityRenderer universel
* brancher Conjugaison proprement
* brancher Lecture proprement
* activer adaptive learning inter-modules

---

# 🧠 Question structurante suivante

Avant de passer à l’implémentation technique détaillée :

Veux-tu que nous figions formellement un **diagramme UML définitif de la couche packages** (architecture stabilisée), afin de verrouiller le design avant toute nouvelle écriture de code ?

C’est la dernière étape conceptuelle avant exécution technique.
