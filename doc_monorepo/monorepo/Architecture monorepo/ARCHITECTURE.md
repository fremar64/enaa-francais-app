

# 🧠 PROMPT MAÎTRE — GitHub Copilot

## Projet CEREDIS — Monorepo pédagogique Next.js

> **Contexte général**
> Tu interviens sur un **monorepo pédagogique** destiné à l’enseignement du français (langue seconde) du **cycle primaire au lycée**, dans le cadre du projet CEREDIS.
> Le projet s’appuie sur une **approche par compétences**, fondée sur le **CECRL**, enrichie par une **échelle numérique continue de développement cognitif** et intégrée au système **CaSS (Competency and Skills System)**.

---

## 🎯 OBJECTIF GLOBAL

Poursuivre, corriger ou refondre l’implémentation du monorepo afin qu’il respecte **strictement** l’architecture cible décrite ci-dessous.

👉 **La priorité absolue est la cohérence architecturale et la maintenabilité à long terme**, pas la rapidité ni les optimisations prématurées.

---

## 🧱 PRINCIPES ARCHITECTURAUX NON NÉGOCIABLES

### 1. Architecture monorepo

Le projet est organisé selon une **séparation stricte des responsabilités** :

```
ceredis-monorepo/
├─ apps/                  # Applications (Next.js)
│  └─ web/                # Application principale
│
├─ packages/              # Logique métier partagée
│  ├─ curriculum/         # Structure pédagogique (SOURCE DE VÉRITÉ)
│  ├─ types/              # Types TypeScript globaux
│  ├─ scoring-engine/     # Calculs des scores cognitifs
│  ├─ cass-client/        # Intégration CaSS
│  └─ ui/                 # Composants UI partagés
│
└─ docs/                  # Documentation scientifique et technique
```

❌ Aucune logique pédagogique ne doit être codée dans `apps/web`.
✔ Toute la pédagogie est **data-driven** et réside dans `packages/`.

---

### 2. Curriculum = source de vérité

Le **curriculum figé** (`packages/curriculum/curriculum.ts`) est la **référence unique** pour :

* domaines d’apprentissage,
* modules / disciplines,
* cycles scolaires,
* niveaux d’études,
* correspondance CECRL ↔ score numérique continu,
* références CaSS (URI).

👉 **Copilot ne doit jamais coder de logique pédagogique “en dur” dans l’UI.**

---

### 3. Organisation pédagogique à respecter

#### Domaines d’apprentissage

* **DOMAINE 1 — Communication orale et écrite**
  (situations authentiques de communication)

  * Chansons
  * Contes et nouvelles
  * Textes argumentatifs
  * Textes fonctionnels
  * Correspondance interscolaire

* **DOMAINE 2 — Connaissance de la langue**
  (apprentissages décontextualisés)

  * Grammaire
  * Conjugaison
  * Orthographe
  * Vocabulaire
  * Initiation lecture–écriture (CP–CE1)

#### Cycles et niveaux

* **Primaire** : CP, CE1, CE2, CM1, CM2
* **Collège** : 6e, 5e, 4e, 3e
* **Lycée** : 2nde, 1re, Terminale

Chaque niveau est associé :

* à une **plage de score continu [0–100]**,
* à une **projection CECRL** indicative,
* à une **URI CaSS**.

---

## 🧭 NAVIGATION ET UI

### 4. Navigation progressive obligatoire

L’interface d’accueil doit implémenter une **navigation progressive par état**, dans cet ordre :

```
Domaine
→ Module / Discipline
→ Cycle
→ Niveau
→ Activités
```

* La navigation est **pilotée par les données du curriculum**.
* Chaque sélection enrichit l’état de navigation.
* Aucun niveau ne doit être accessible sans les précédents.

👉 L’UI doit être **entièrement déclarative** et pilotée par le curriculum.

---

## ⚙️ RÈGLES D’IMPLÉMENTATION POUR COPILOT

### Tu dois :

1. **Réutiliser ou refondre le code existant** si nécessaire pour respecter cette architecture.
2. Centraliser toute logique métier dans `packages/`.
3. Créer des composants UI simples, stateless, purement présentatifs.
4. Favoriser :

   * lisibilité,
   * typage strict,
   * découplage fort.
5. Préparer le terrain pour :

   * l’intégration du scoring cognitif,
   * la génération d’assertions CaSS,
   * l’adaptive learning.

### Tu ne dois pas :

* coder de règles pédagogiques dans l’UI,
* dupliquer des structures déjà définies dans le curriculum,
* mélanger navigation, scoring et affichage,
* introduire de dépendances lourdes non justifiées.

---

## 🧠 PHILOSOPHIE GÉNÉRALE DU CODE

* Le code doit **refléter la structure cognitive et pédagogique du dispositif**.
* Toute décision technique doit pouvoir être **justifiée scientifiquement**.
* Le système doit rester **évolutif sur 10 ans** sans refonte majeure.

---

## ✅ CRITÈRE DE RÉUSSITE

Une personne extérieure doit pouvoir :

* comprendre la progression pédagogique **en lisant les données**,
* ajouter un nouveau module **sans toucher à l’UI**,
* relier une activité à CaSS **sans refactorisation lourde**.

---

> **Instruction finale**
> Si une partie du code existant contredit ces principes, **corrige-la**, même si cela implique une refonte partielle.

---

## 🔒 Fin du prompt maître

---
