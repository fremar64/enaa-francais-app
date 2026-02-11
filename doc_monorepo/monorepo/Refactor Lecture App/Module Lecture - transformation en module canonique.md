Transformer **Lecture** en **module pilote canonique** signifie :

* qu’il devient la **référence architecturale** pour tous les autres domaines,
* qu’il respecte strictement le **contrat universel d’activité**,
* qu’il alimente correctement le **scoring CEREDIS → décision → CECRL → certification**,
* qu’il ne contient **aucune logique pédagogique en dur dans l’UI**.

Nous allons procéder en 5 blocs :

1. 🎯 Objectif canonique
2. 🧱 Nouveau schéma global Lecture
3. 🧠 Refactor conceptuel (séparation stricte)
4. 💻 Refactor TypeScript concret
5. 🔄 Pipeline complet validé

---

# 1️⃣ Objectif : Lecture = module canonique

Lecture doit démontrer :

* ✔ Navigation data-driven (curriculum)
* ✔ Activités instanciées via ActivityRunner
* ✔ Production stricte d’`ActivityEvaluationSurface`
* ✔ Aucun scoring dans l’UI
* ✔ Aucun CECRL dans l’UI
* ✔ Aucune décision pédagogique dans l’UI

---

# 2️⃣ Schéma global Lecture (canonique)

```
Lecture UI
   ↓
Activity Factory (data-driven)
   ↓
ActivityRunner (generic)
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
CEREDISScore
   ↓
DecisionEngine
   ↓
Actions (UI rendering only)
```

Lecture ne fait que :

* afficher,
* transmettre événements,
* recevoir décisions.

---

# 3️⃣ Refactor conceptuel

## 🔴 À supprimer dans Lecture

* Mapping GS/CP/CE1 dans composants
* Calcul de score local
* Conditions pédagogiques codées en JSX
* Accès direct CECRL

---

## 🟢 À introduire

### A. Activity Factory

Un constructeur d’activités basé sur le curriculum.

### B. Activity Adapter

Chaque activité Lecture (phonème, syllabe, mot…) devient :

```
implements ActivityContract<Input, Output>
```

---

# 4️⃣ Refactor technique

---

## 📦 1. LectureActivity.ts (nouveau)

```ts
import { ActivityMetadata } from "@ceredis/activity-contract";

export interface LectureActivityDefinition {
  metadata: ActivityMetadata;
  generateContent(): unknown;
}
```

---

## 📦 2. phoneme-activity.ts

```ts
import { LectureActivityDefinition } from "./LectureActivity";

export const phonemeActivity = (
  phonemeId: string
): LectureActivityDefinition => ({

  metadata: {
    activityId: `phoneme-${phonemeId}`,
    domainId: "francais",
    trackId: "lecture",
    cycleId: "cycle-2",
    levelId: "cp",
    activityType: "recognition",
    modality: "visual-audio",
    competencies: [
      `https://ceredis.org/competency/cecrl/A1/reception-ecrite/D001`
    ]
  },

  generateContent() {
    return {
      phoneme: phonemeId
    };
  }

});
```

---

## 📦 3. ActivityRunner intégré

Dans `apps/lecture` :

```ts
import { ActivityRunner } from "@ceredis/activity-engine";
import { computeScore } from "@ceredis/scoring-engine";

async function runLectureActivity(definition) {

  const runner = new ActivityRunner();

  // UI envoie événements
  const surface = runner.getSurface();

  const score =
    await computeScore(
      surface,
      developmentContext,
      definition.metadata.activityId,
      learnerId
    );

  return score;
}
```

---

# 5️⃣ Refactor UI React

---

## ❌ Avant

```tsx
if (correctAnswers >= 3) {
  setLevel("validated");
}
```

---

## ✅ Après

```tsx
const score = await runLectureActivity(activityDef);

setCerediScore(score);
```

Puis :

```tsx
{cerediScore.D === 1 && <Success />}
{cerediScore.Ds[levelId] === "fragile" && <RemediationHint />}
```

L’UI interprète, mais ne décide pas.

---

# 6️⃣ Navigation 100% data-driven

Remplacer :

```tsx
<Link href="/lecture/cp">CP</Link>
```

Par :

```tsx
<Link href={`/lecture/${level.id}`}>
  {level.name}
</Link>
```

où `level` vient de `curriculum`.

---

# 7️⃣ Suppression des routes hardcodées

Supprimer :

```
/levels/gs
/levels/cp
/levels/ce1
```

Remplacer par :

```
/domain/[domainId]/track/[trackId]/level/[levelId]/activity/[activityId]
```

---

# 8️⃣ Vérification canonique

Lecture est conforme si :

| Condition                              | OK |
| -------------------------------------- | -- |
| Aucune logique CECRL en UI             | ✔  |
| Aucun seuil dans UI                    | ✔  |
| Aucun calcul score dans UI             | ✔  |
| Scoring purement dans scoring-engine   | ✔  |
| Décision purement dans decision-engine | ✔  |

---

# 9️⃣ Test d’intégrité du module pilote

Ajouter test :

```ts
it("lecture activity produces valid EvaluationSurface", () => {
  const surface = runner.getSurface();
  expect(surface).toHaveProperty("attempts");
  expect(surface).toHaveProperty("events");
});
```

---

# 🔟 Ce que cela change stratégiquement

Lecture devient :

* le premier module certifiable CECRL complet,
* la preuve de concept du modèle CEREDIS,
* le template de tous futurs modules (grammaire, chansons, etc.).

---

# 11️⃣ Schéma global final

```
Lecture Module (Pilot Canonical)
   ↓
ActivityContract
   ↓
ActivityRunner
   ↓
EvaluationSurface
   ↓
Scoring CEREDIS
   ↓
Decision Engine
   ↓
CECRL Projection
   ↓
Certification
```

---

