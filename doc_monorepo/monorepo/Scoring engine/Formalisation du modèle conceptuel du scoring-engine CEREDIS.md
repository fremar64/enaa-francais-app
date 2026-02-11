Je vais **formaliser le modèle conceptuel du scoring-engine CEREDIS** de manière **mathématiquement propre, pédagogiquement interprétable et techniquement implémentable**, en continuité directe avec le **contrat universel d’activité** que nous venons de poser.

Je procède en quatre niveaux :

1. positionnement théorique (ce qu’est *le* score CEREDIS),
2. définition formelle du foncteur,
3. sémantique précise de chaque composante *(D, Dd, Ds, De, Dm)*,
4. conséquences architecturales immédiates.

---

## 1. Principe fondateur : le score n’est pas une note

Dans CEREDIS, le scoring n’est **ni une mesure brute**, ni une agrégation heuristique.
Il est une **interprétation normée** de traces d’activité.

> **Principe 0 (fondamental)**
> Le scoring CEREDIS est une **fonction d’interprétation**, pas de jugement.

Autrement dit :

* l’activité **produit des faits** (EvaluationSurface),
* le scoring **produit des dimensions interprétables**,
* toute décision (validation, certification, remédiation) est *en aval*.

---

## 2. Définition formelle du foncteur CEREDIS

### 2.1. Espaces en présence

On définit :

* **𝓔** : l’espace des surfaces d’évaluation
  (instances de `ActivityEvaluationSurface`)
* **𝓢** : l’espace des scores CEREDIS

### 2.2. Le foncteur de scoring

Le scoring CEREDIS est un foncteur :

[
\mathcal{F}_{CEREDIS} : \mathcal{E} \longrightarrow \mathcal{S}
]

tel que :

[
\mathcal{F}_{CEREDIS}(e) = (D, D_d, D_s, D_e, D_m)
]

où chaque composante est **définie sur des sous-structures distinctes** de `EvaluationSurface`.

👉 **Point clé** :
aucune composante n’est calculée à partir d’une autre — elles sont **orthogonales par construction**.

---

## 3. Définition sémantique des dimensions CEREDIS

Je les formalise ici **conceptuellement**, sans encore fixer de formules numériques (volontairement).

---

### 3.1. D — Dimension de réalisation (effectivité)

**Question à laquelle D répond :**

> *L’activité a-t-elle été menée à son terme de manière conforme ?*

**D est une variable d’état**, pas une performance.

* dépend de :

  * `completionCriteria`
  * `success`
  * `abandon`
* indépendante :

  * du nombre d’erreurs,
  * du temps,
  * de la facilité.

**Invariant conceptuel**

* D ∈ {0, 1} ou {non-réalisé, réalisé}
* Une activité non réalisée **ne peut produire aucun autre score valide**

> D est un **pré-requis logique**, pas un indicateur pédagogique.

---

### 3.2. Dd — Dimension développementale (niveau atteint)

**Question :**

> *À quel niveau de structuration cognitive observable l’activité situe-t-elle l’apprenant ?*

Dd mesure **l’amplitude atteinte**, pas la qualité du chemin.

* dépend de :

  * type d’activité,
  * complexité des items validés,
  * profondeur des réussites successives.
* liée au curriculum (CECRL / CEREDIS).

**Invariant**

* Dd est **ordinal**, jamais métrique brute.
* Deux activités différentes peuvent produire le **même Dd**.

👉 Dd correspond directement à ton concept d’**amplitude développementale**.

---

### 3.3. Ds — Dimension de stabilité (robustesse)

**Question :**

> *La réussite observée est-elle stable ou fragile ?*

Ds mesure la **résistance à la perturbation**.

* dépend de :

  * répétitions,
  * variance des erreurs,
  * besoin d’aides,
  * régularité temporelle.
* indépendante :

  * du niveau atteint (Dd).

**Invariant**

* Une réussite unique **ne peut pas produire un Ds élevé**.
* Ds n’est défini que si D = 1.

👉 Ds formalise la **consolidation**.

---

### 3.4. De — Dimension d’efficience (coût cognitif)

**Question :**

> *Quel coût observable a été nécessaire pour atteindre le résultat ?*

De mesure l’**économie cognitive**, pas la vitesse brute.

* dépend de :

  * durée relative,
  * nombre d’essais,
  * recours aux aides.
* interprétation **normalisée** (jamais absolue).

**Invariant**

* De n’est jamais interprétable seul.
* Un De faible n’est **pas un échec**, mais un signal.

👉 De est essentiel pour détecter surcharge ou automatisation.

---

### 3.5. Dm — Dimension métacognitive (régulation)

**Question :**

> *L’apprenant régule-t-il son activité de manière consciente et adaptative ?*

Dm est la **dimension la plus haute**.

* dépend de :

  * usage volontaire d’aides,
  * corrections spontanées,
  * ajustements stratégiques.
* absente si l’activité ne permet pas l’observation.

**Invariant**

* Dm peut être **indéterminé**, sans invalider les autres scores.
* Dm n’est **jamais inféré**, uniquement observé.

👉 Dm fonde la **pédagogie adaptative**, pas la certification.

---

## 4. Propriétés globales du modèle CEREDIS

### P1 — Non-compensation

Aucune dimension ne compense une autre.
Un Ds élevé ne “rattrape” pas un Dd faible.

### P2 — Traçabilité complète

Chaque score doit être **reconstructible** à partir des événements.

### P3 — Indépendance des UI

Deux interfaces différentes doivent produire **le même score** à surface égale.

### P4 — Compatibilité CECRL

Dd est la seule dimension **alignable directement** sur CECRL.
Les autres sont transversales.

---

## 5. Traduction directe en architecture logicielle

Cela implique immédiatement :

### Interface du scoring-engine

```ts
interface CEREDISScoringEngine {
  compute(
    surface: ActivityEvaluationSurface,
    context: ScoringContext
  ): CEREDISScore;
}

interface CEREDISScore {
  D: DValue;
  Dd: DdValue;
  Ds: DsValue;
  De: DeValue;
  Dm?: DmValue;
}
```

### Invariant fort

> Le scoring-engine **ne dépend jamais** :

* du composant React,
* de l’activité concrète,
* du LRS / CaSS.

Il dépend uniquement :

* de la surface,
* du contexte normatif.

---
