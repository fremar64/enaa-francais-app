Voici une **formalisation rigoureuse du contrat universel d’activité**, pensée **à la fois comme artefact d’ingénierie logicielle et comme objet théorique** aligné avec CEREDIS / CECRL.
L’objectif n’est pas encore d’exécuter, mais de **figer ce qui est invariant**, afin que tout le reste (UI, scoring, CaSS, analytics) ne soit que des spécialisations.

---

# 1. Définition : ce qu’est *une activité* (niveau conceptuel)

Une **activité pédagogique numérique** est définie ici comme :

> une **transformation contrôlée** d’un état cognitif observable, médiée par une tâche, produisant des **traces interprétables** selon un référentiel normatif (curriculum + modèle évaluatif).

Elle possède donc **quatre dimensions irréductibles** :

1. **Identité pédagogique** (ce qu’elle est dans le curriculum)
2. **Contrat d’exécution** (ce qu’elle attend et produit)
3. **Invariants évaluatifs** (ce qui ne dépend pas du type d’activité)
4. **Surface d’instrumentation** (ce qui est traçable)

---

# 2. Contrat universel – vue d’ensemble

On peut formaliser toute activité comme le triplet :

```
Activity = ⟨ Metadata, Runtime Contract, Evaluation Surface ⟩
```

Ces trois couches **doivent exister pour toute activité**, qu’elle soit :

* phonème,
* chanson,
* grammaire,
* compréhension écrite,
* production libre.

---

# 3. Couche 1 — Métadonnées normatives (curriculum-level)

👉 **Aucune activité n’existe sans ces métadonnées.**
Elles sont *déclaratives*, jamais calculées dans l’UI.

```ts
interface ActivityMetadata {
  /** Identité stable */
  activityId: string;
  domainId: string;      // ex: "francais"
  trackId: string;       // ex: "lecture-ecriture"
  cycleId: string;       // ex: "cycle-2"
  levelId: string;       // ex: "cp"
  
  /** Typologie */
  activityType: ActivityType;
  modality: ActivityModality;

  /** Alignement pédagogique */
  competencies: CompetencyRef[];
  prerequisites?: ActivityRef[];

  /** Contraintes de progression */
  unlockRule?: UnlockRule;
  validationRule?: ValidationRule;
}
```

### Invariants associés

* Une activité **appartient toujours** à un niveau précis du curriculum.
* Elle est **adressable sans ambiguïté** (`activityId`).
* Elle référence des **compétences**, jamais l’inverse.
* L’UI ne décide jamais de l’accessibilité.

---

# 4. Couche 2 — Contrat d’exécution (Activity Runtime Contract)

Cette couche définit **comment une activité s’exécute**, indépendamment de son rendu.

```ts
interface ActivityRuntime<Input, Output> {
  /** Données initiales */
  input: Input;

  /** État interne contrôlé */
  state: ActivityState;

  /** Actions utilisateur possibles */
  actions: ActivityAction[];

  /** Conditions de terminaison */
  completionCriteria: CompletionCriteria;

  /** Résultat brut (non évalué) */
  output: Output;
}
```

### Points clés

* `Output ≠ Score`
* Une activité peut **échouer**, **être abandonnée**, ou **rester incomplète**.
* Le runtime **ne connaît pas CaSS**, ni le CECRL.

### Invariants

* Toute activité a un **début**, une **évolution**, une **fin détectable**.
* Le runtime est **purement local et déterministe**.

---

# 5. Couche 3 — Surface d’évaluation (Evaluation Surface)

C’est ici que s’opère la **jonction avec CEREDIS**, sans encore calculer les scores.

```ts
interface ActivityEvaluationSurface {
  /** Observables primaires */
  attempts: number;
  errors: number;
  success: boolean;
  durationMs: number;

  /** Événements pédagogiques */
  events: PedagogicalEvent[];

  /** Indices interprétables */
  indicators: IndicatorMap;
}
```

### Exemple d’événements normalisés

```ts
type PedagogicalEvent =
  | { type: "attempt"; timestamp: number }
  | { type: "success"; timestamp: number }
  | { type: "error"; code: string; timestamp: number }
  | { type: "hint-used"; level: number; timestamp: number }
  | { type: "abandon"; timestamp: number };
```

### Invariants

* Les événements sont **chronologiques et append-only**.
* Aucun calcul de score ici.
* Cette surface est **exportable** (xAPI / CaSS / logs).

---

# 6. Invariants globaux (non négociables)

Ces invariants sont **structurels** ; toute activité qui les viole est invalide.

### I1 — Séparation stricte

* UI ≠ activité
* activité ≠ scoring
* scoring ≠ certification

### I2 — Réversibilité

* Une activité peut être **rejouée**, **simulée**, **rejouée hors UI**.

### I3 — Traçabilité totale

* Toute décision évaluative future doit pouvoir être **reconstruite à partir des traces**.

### I4 — Indépendance technologique

* Le contrat est valide **sans React, sans Next, sans CaSS**.

---

# 7. Conséquence directe sur l’architecture

Ce contrat implique immédiatement :

* 📦 `packages/activity-contract` (types + invariants, aucun runtime)
* 📦 `packages/activity-engine` (implémentation générique plus tard)
* 📦 `packages/scoring-engine` (consomme *EvaluationSurface*, jamais l’UI)
* 📦 `packages/cass-client` (consomme des assertions dérivées, jamais brutes)

👉 **Lecture devra être la première implémentation conforme à 100 %**.

---
