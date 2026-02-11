
Modélisation complète du CECRL dans CaSS


Nous allons définir une **modélisation complète du CECRL dans CaSS**, cohérente avec :

* la structure officielle du CECRL (A1 → C2),
* la granularité opérationnelle (descripteurs “Can Do”),
* la factorisation CEREDIS (Dd, Ds, De, Dm),
* la logique d’assertion normative signée (CaSS),
* la compatibilité xAPI.

L’objectif est de produire :

> un référentiel CECRL structuré en graphe de compétences CaSS, interopérable et aligné avec CEREDIS.

---

# 1️⃣ Principes directeurs

## P1 — Le CECRL est un référentiel hiérarchique

Structure officielle :

```
A1 < A2 < B1 < B2 < C1 < C2
```

Mais il contient aussi :

* des **activités langagières** (réception, production, interaction, médiation),
* des **descripteurs opérationnels** (“peut comprendre…”, “peut interagir…”).

---

## P2 — CaSS est un graphe de compétences

Chaque compétence est :

* une URI stable,
* signable,
* versionnable,
* reliée à d’autres compétences par des relations typées.

---

## P3 — CEREDIS distingue :

* amplitude (Dd) → position CECRL,
* stabilité (Ds) → maturité,
* efficience (De) → coût,
* régulation (Dm) → autonomie.

Dans CaSS :

* seule Dd + Ds consolidé génèrent une assertion normative.

---

# 2️⃣ Structure globale du référentiel CECRL dans CaSS

Nous définissons 4 niveaux hiérarchiques.

---

## Niveau 1 — Cadre global

```
cecrl
```

URI :

```
https://ceredis.org/frameworks/cecrl
```

---

## Niveau 2 — Niveaux principaux

Compétences :

```
cecrl:A1
cecrl:A2
cecrl:B1
cecrl:B2
cecrl:C1
cecrl:C2
```

Relations :

```
A1 narrows cecrl
A2 narrows cecrl
...
A2 requires A1
B1 requires A2
...
```

---

## Niveau 3 — Activités langagières

Pour chaque niveau :

* réception orale
* réception écrite
* production orale
* production écrite
* interaction
* médiation

Exemple :

```
cecrl:A1:reception-orale
```

Relation :

```
A1:reception-orale narrows A1
```

---

## Niveau 4 — Descripteurs “Can Do”

Granularité opérationnelle.

Exemple :

```
cecrl:A1:reception-orale:identifier-mots-familiers
```

Relation :

```
narrows → cecrl:A1:reception-orale
```

Ce niveau est celui qui sera directement aligné avec Dd.

---

# 3️⃣ Modélisation CaSS concrète

Exemple JSON CaSS d’un descripteur :

```json
{
  "@context": "https://schema.cassproject.org/0.4",
  "@type": "Competency",
  "id": "https://ceredis.org/competency/cecrl/A1/reception-orale/identifier-mots-familiers",
  "name": "Identifier des mots familiers à l’oral",
  "description": "Peut reconnaître des mots et expressions très simples relatifs à lui-même.",
  "framework": "https://ceredis.org/frameworks/cecrl"
}
```

Relation hiérarchique :

```json
{
  "@type": "Relation",
  "source": ".../A1/reception-orale/identifier-mots-familiers",
  "target": ".../A1/reception-orale",
  "relationType": "narrows"
}
```

---

# 4️⃣ Alignement CEREDIS ↔ CECRL

## Dd → Compétence CECRL

Lorsque :

[
Dd(d) = cecrl:A1:reception-orale:identifier-mots-familiers
]

et

[
Ds(d) \succeq consolidated
]

→ on génère une assertion CaSS sur ce descripteur.

---

## Projection niveau global

Lorsque tous les descripteurs requis pour A1 sont validés :

→ assertion sur :

```
cecrl:A1
```

---

# 5️⃣ Stratégie d’assertion

## Règle 1 — Assertion fine

Assertion sur descripteur individuel.

## Règle 2 — Assertion composite

Si :

[
\forall d_i \in A1, Ds(d_i) \succeq consolidated
]

→ assertion sur A1.

---

# 6️⃣ Exemple Assertion CaSS

```json
{
  "@context": "https://schema.cassproject.org/0.4",
  "@type": "Assertion",
  "competency": "https://ceredis.org/competency/cecrl/A1",
  "agent": "did:ceredis:learner123",
  "confidence": 0.92,
  "assertionDate": "2026-02-11T14:00:00Z",
  "issuer": "did:ceredis:root"
}
```

---

# 7️⃣ Intégration technique

## Nouveau package :

```
packages/cecrl-framework/
```

Contient :

```
/levels.ts
/descriptors.ts
/relations.ts
/export-cass.ts
```

---

# 8️⃣ Versionnement

Chaque compétence CECRL doit inclure :

```
version: 1.0
locale: fr-FR
```

Permet :

* évolutions futures,
* compatibilité internationale.

---

# 9️⃣ Projection CECRL ↔ Espace produit CEREDIS

On définit une projection :

[
\pi_{CECRL} : Dd \to CompetencyURI
]

Cette projection est injective au niveau des descripteurs.

---

# 🔟 Architecture complète finale

```
CEREDISScore
   ↓
Dd (poset)
   ↓ projection
CECRL Descriptor
   ↓ condition Ds ≥ consolidated
CaSS Assertion
```

---

# 11️⃣ Propriété fondamentale

La certification CECRL devient :

✔ fondée sur stabilité réelle
✔ traçable jusqu’aux traces xAPI
✔ non compensatoire
✔ compatible avec modèle européen

---

# 12️⃣ Ce que cela permet

* Certification numérique CECRL vérifiable
* Alignement institutionnel
* Interopérabilité européenne
* Portabilité des compétences

---

