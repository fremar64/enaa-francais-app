Nous allons définir **la version complète, propre et canonique de `packages/activities`**, strictement conforme au contrat universel d’activité et à l’architecture CEREDIS.

Objectif :

* couche 100 % déclarative,
* aucune logique pédagogique décisionnelle,
* aucune dépendance scoring / CECRL / analytics,
* registry globale,
* extensibilité propre.

---

# 🎯 1️⃣ Architecture cible canonique

```
packages/
  activities/
    package.json
    index.ts
    registry.ts
    types.ts

    lecture/
      index.ts
      activity-factory.ts
      content/
        phonemes.ts

    conjugaison/
      index.ts
      activity-factory.ts
      content/
        verbs.ts
```

---

# 🧱 2️⃣ package.json (propre)

```json
{
  "name": "@ceredis/activities",
  "private": true,
  "main": "index.ts",
  "dependencies": {
    "@ceredis/activity-contract": "*"
  }
}
```

❌ Pas de dépendance UI
❌ Pas de dépendance scoring
❌ Pas de tailwind

---

# 📦 3️⃣ types.ts

```ts
import { ActivityMetadata } from "@ceredis/activity-contract";

export interface ActivityDefinition {
  metadata: ActivityMetadata;
  generateContent(): unknown;
}

export type ActivityFactory =
  (params: any) => ActivityDefinition;
```

---

# 🧠 4️⃣ registry.ts

```ts
import { createLecturePhonemeActivity }
  from "./lecture";
import { createConjugaisonVerbActivity }
  from "./conjugaison";

import { ActivityFactory }
  from "./types";

const registry: Record<string, ActivityFactory> = {
  "lecture:phoneme":
    createLecturePhonemeActivity,

  "conjugaison:verb":
    createConjugaisonVerbActivity
};

export function createActivity(
  type: string,
  params: any
) {

  const factory = registry[type];

  if (!factory) {
    throw new Error(
      `Unknown activity type: ${type}`
    );
  }

  return factory(params);
}
```

---

# 📦 5️⃣ index.ts (entrée unique)

```ts
export * from "./types";
export * from "./registry";

export * from "./lecture";
export * from "./conjugaison";
```

---

# 📘 6️⃣ Module Lecture

## lecture/content/phonemes.ts

```ts
export const phonemeList = [
  "a",
  "e",
  "i",
  "o",
  "u"
];

export function generatePhonemeExercise(
  phoneme: string
) {
  return {
    target: phoneme,
    distractors:
      phonemeList.filter(p => p !== phoneme)
  };
}
```

---

## lecture/activity-factory.ts

```ts
import { ActivityDefinition }
  from "../types";

import {
  generatePhonemeExercise
} from "./content/phonemes";

export function createLecturePhonemeActivity(
  { phoneme, level }: {
    phoneme: string;
    level: string;
  }
): ActivityDefinition {

  return {

    metadata: {
      activityId:
        `lecture-phoneme-${phoneme}`,
      domainId: "francais",
      trackId: "lecture",
      cycleId: "cycle-2",
      levelId: level,
      activityType: "recognition",
      modality: "visual-audio",
      competencies: []
    },

    generateContent() {
      return generatePhonemeExercise(phoneme);
    }

  };
}
```

---

## lecture/index.ts

```ts
export * from "./activity-factory";
```

---

# 📗 7️⃣ Module Conjugaison

## conjugaison/content/verbs.ts

```ts
export const verbs = [
  "être",
  "avoir",
  "aller"
];

export function generateVerbExercise(
  verb: string
) {
  return {
    infinitive: verb,
    tense: "present"
  };
}
```

---

## conjugaison/activity-factory.ts

```ts
import { ActivityDefinition }
  from "../types";

import {
  generateVerbExercise
} from "./content/verbs";

export function createConjugaisonVerbActivity(
  { verb, level }: {
    verb: string;
    level: string;
  }
): ActivityDefinition {

  return {

    metadata: {
      activityId:
        `conjugaison-${verb}`,
      domainId: "francais",
      trackId: "conjugaison",
      cycleId: "cycle-3",
      levelId: level,
      activityType: "production",
      modality: "text",
      competencies: []
    },

    generateContent() {
      return generateVerbExercise(verb);
    }

  };
}
```

---

## conjugaison/index.ts

```ts
export * from "./activity-factory";
```

---

# 🔒 8️⃣ Vérification conformité canonique

Checklist :

| Critère                     | Statut |
| --------------------------- | ------ |
| Zéro dépendance scoring     | ✔      |
| Zéro dépendance CECRL       | ✔      |
| Zéro dépendance analytics   | ✔      |
| Registry globale            | ✔      |
| Content séparé              | ✔      |
| Factory déclarative         | ✔      |
| Aucun seuil interne         | ✔      |
| Aucune décision pédagogique | ✔      |

---

# 🧭 9️⃣ Couplage correct avec l’UI

Dans l’UI :

```ts
import { createActivity }
  from "@ceredis/activities";

const activity =
  createActivity("lecture:phoneme", {
    phoneme: "a",
    level: "cp"
  });
```

L’UI ne connaît rien d’autre.

---

# 🧠 10️⃣ Résultat architectural

`activities` devient :

* pure couche déclarative,
* extensible par simple ajout de module,
* compatible ActivityRenderer universel,
* totalement découplée du scoring CEREDIS.

---

# 🚀 Étape suivante optimale

Maintenant que `activities` est canonique, la prochaine brique structurante est :

👉 Concevoir l’ActivityRenderer universel.

