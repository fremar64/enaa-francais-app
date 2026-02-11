Nous allons concevoir une **architecture technique complète des packages** pour le monorepo CEREDIS, en garantissant :

* séparation stricte des responsabilités,
* indépendance des couches (activité, scoring, xAPI, CaSS),
* testabilité scientifique,
* évolutivité vers analytics et recherche expérimentale,
* compatibilité Next.js / Supabase / LRS / CaSS.

Je propose une architecture en **7 packages cœur + apps**, organisée par couches fonctionnelles.

---

# 1. Vue d’ensemble (architecture en couches)

```
apps/
  web/
  lecture/
  admin/

packages/
  curriculum/
  activity-contract/
  activity-engine/
  scoring-engine/
  decision-engine/
  xapi-encoder/
  cass-client/
  analytics-core/
  shared-types/
```

---

# 2. Couche 1 — Modèle normatif (statique)

## 📦 `packages/curriculum`

Responsabilité :

* définition du poset développemental
* seuils
* mapping activité → niveaux
* profils normatifs de coût
* patterns de régulation
* projections CECRL

Contenu :

```
/poset.ts
/seuils.ts
/cost-profiles.ts
/regulation-patterns.ts
/competency-map.ts
```

⚠️ Aucune logique d’exécution.

---

## 📦 `packages/shared-types`

Responsabilité :

* types communs
* enums ordonnés
* identifiants stables
* URI helpers

Aucune dépendance externe.

---

# 3. Couche 2 — Contrat d’activité

## 📦 `packages/activity-contract`

Responsabilité :

* types universels d’activité
* EvaluationSurface
* PedagogicalEvent
* ActivityMetadata

Ne dépend que de `shared-types`.

---

# 4. Couche 3 — Exécution d’activité

## 📦 `packages/activity-engine`

Responsabilité :

* machine d’état générique
* gestion événements
* production EvaluationSurface
* instrumentation

Structure :

```
/runner.ts
/state-machine.ts
/event-log.ts
/context-manager.ts
```

Ne dépend PAS du scoring-engine.

---

# 5. Couche 4 — Scoring CEREDIS

## 📦 `packages/scoring-engine`

Responsabilité :

* implémentation du foncteur CEREDIS
* computeD
* computeDd
* computeDs
* computeDe
* computeDm

Structure :

```
/index.ts
/compute-realisation.ts
/compute-amplitude.ts
/compute-stability.ts
/compute-efficiency.ts
/compute-regulation.ts
/types.ts
```

Dépendances :

* activity-contract
* curriculum
* shared-types

Aucune dépendance UI.

---

# 6. Couche 5 — Décision pédagogique

## 📦 `packages/decision-engine`

Responsabilité :

* règles formelles
* projections
* priorisation
* moteur de décision

Structure :

```
/rules/
  certification.ts
  progression.ts
  remediation.ts
  adaptation.ts
/engine.ts
```

Entrée : CEREDISScore
Sortie : PedagogicalAction[]

---

# 7. Couche 6 — Encodage et interopérabilité

## 📦 `packages/xapi-encoder`

Responsabilité :

* transformation CEREDISScore → xAPI
* normalisation URI
* versioning extensions

Structure :

```
/statement-builder.ts
/extensions.ts
/verbs.ts
```

---

## 📦 `packages/cass-client`

Responsabilité :

* génération assertions
* signature
* publication
* gestion identités

Structure :

```
/assertion-builder.ts
/identity-manager.ts
/publisher.ts
```

Dépendance externe : CaSS SDK.

---

# 8. Couche 7 — Analytics & Recherche

## 📦 `packages/analytics-core`

Responsabilité :

* relecture des statements
* reconstruction de trajectoires
* calcul dérivées temporelles
* export pour R / Python

Structure :

```
/trajectory.ts
/metrics.ts
/export.ts
```

Ne dépend pas des apps.

---

# 9. Applications (UI)

## `apps/web`

* navigation progressive
* multi-domaines

## `apps/lecture`

* module pilote canonique

## `apps/admin`

* visualisation score
* monitoring

Les apps consomment :

* activity-engine
* scoring-engine
* decision-engine

Jamais directement curriculum pour logique.

---

# 10. Graphe de dépendances (simplifié)

```
shared-types
   ↑
activity-contract
   ↑
activity-engine
   ↑
scoring-engine
   ↑
decision-engine
   ↑
xapi-encoder
   ↑
cass-client
```

`curriculum` est consulté par :

* scoring-engine
* decision-engine

---

# 11. Propriétés architecturales garanties

### P1 — Non circularité

Aucune dépendance circulaire.

### P2 — Pureté du scoring

Le scoring-engine ne dépend d’aucune infra.

### P3 — Séparabilité scientifique

On peut :

* simuler activity-engine
* injecter surfaces
* tester scoring isolément

### P4 — Scalabilité

On peut ajouter :

* nouveaux domaines
* nouveaux types d’activité
* nouvelles règles

sans refactor global.

---

# 12. Exemple pipeline réel

```
ActivityRunner
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
DecisionEngine
   ↓
xAPIEncoder
   ↓
LRS
   ↓
CaSSClient (si seuil atteint)
```

---

# 13. Environnement monorepo recommandé

* pnpm workspaces
* TypeScript project references
* build isolé par package
* tests unitaires par couche

---

# 14. Packages critiques à implémenter en premier

Ordre optimal :

1. shared-types
2. activity-contract
3. curriculum
4. scoring-engine
5. decision-engine
6. xapi-encoder
7. cass-client

Lecture devient le premier module validant l’ensemble.

---

# 15. Résultat

Tu disposes maintenant d’une **architecture technique complète, cohérente avec la formalisation mathématique et le modèle pédagogique CEREDIS**.

Elle est :

* modulaire,
* testable,
* scientifiquement exploitable,
* compatible LRS + CaSS,
* extensible à l’échelle nationale.

---

