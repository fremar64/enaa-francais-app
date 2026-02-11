Nous allons construire la **représentation géométrique du score CEREDIS** comme **espace produit ordonné**, en cohérence stricte avec le théorème de factorisation cognitive.

L’objectif est double :

1. Donner une structure mathématique précise au score.
2. Garantir l’absence d’agrégation abusive ou de hiérarchisation artificielle.

---

# 1. Rappel : structure factorisée

Le score CEREDIS est :

[
\mathcal{F}_{CEREDIS}(e)
========================

(D, D_d, D_s, D_e, D_m)
]

avec :

* ( D \in {0,1} )
* ( D_d \in \mathcal{P}(\mathcal{D}_d) ) (ensemble maximal dans un poset)
* ( D_s \subseteq \mathcal{D}_d \times \mathcal{S}_s )
* ( D_e \subseteq \mathcal{D}_d \times \mathcal{D}_e )
* ( D_m \subseteq \mathcal{D}_d \times \mathcal{S}_m )

---

# 2. Construction de l’espace produit

## 2.1. Définition

On définit l’espace score :

[
\mathcal{S}
===========

{0,1}
\times
\mathcal{P}(\mathcal{D}_d)
\times
(\mathcal{D}_d \times \mathcal{S}_s)
\times
(\mathcal{D}_d \times \mathcal{D}_e)
\times
(\mathcal{D}_d \times \mathcal{S}_m)
]

C’est un **produit cartésien de structures ordonnées**.

---

# 3. Ordres partiels internes

Chaque composante possède son propre ordre :

### 3.1. Réalisation

[
0 \prec 1
]

---

### 3.2. Amplitude

[
(\mathcal{D}_d, \preceq)
]
(poset)

---

### 3.3. Stabilité

[
fragile \prec émergent \prec consolidé \prec robuste
]

---

### 3.4. Efficience

[
surcharge \prec coûteux \prec optimal \prec automatisé
]

---

### 3.5. Régulation

[
non\text{-}régulé \prec réactif \prec adaptatif \prec stratégique
]

---

# 4. Ordre produit (ordre de Pareto)

On définit l’ordre global :

[
\preceq_{\mathcal{S}}
]

tel que :

[
s \preceq_{\mathcal{S}} s'
]

si et seulement si :

1. ( D \le D' )
2. ( D_d \preceq D_d' )
3. ( D_s \preceq D_s' )
4. ( D_e \preceq D_e' )
5. ( D_m \preceq D_m' )

C’est un **ordre de Pareto strict**.

---

# 5. Propriété majeure : incomparabilité structurelle

Il existe ( s, s' \in \mathcal{S} ) tels que :

[
\neg(s \preceq s') \land \neg(s' \preceq s)
]

Exemple :

* élève A : amplitude élevée mais régulation faible
* élève B : amplitude moyenne mais régulation stratégique

Le modèle interdit une comparaison totale.

---

# 6. Structure géométrique

L’espace score est :

* un **produit de posets**,
* donc un **poset de dimension 5**,
* non métrique,
* non linéaire.

Il peut être représenté comme :

[
\mathcal{S}
===========

\mathcal{D}
\times
\mathcal{A}
\times
\mathcal{S}_s
\times
\mathcal{D}_e
\times
\mathcal{S}_m
]

où chaque axe est indépendant.

---

# 7. Interprétation géométrique

Chaque apprenant est un point dans cet espace.

Les trajectoires pédagogiques sont des **chemins dans un produit ordonné** :

[
\gamma : t \mapsto \mathcal{S}
]

Ces trajectoires peuvent :

* monter en amplitude,
* stabiliser,
* réduire le coût,
* améliorer la régulation.

Les dimensions ne progressent pas nécessairement simultanément.

---

# 8. Propriétés topologiques

## 8.1. Non connexité totale

L’espace n’est pas totalement ordonné.

---

## 8.2. Pas de distance naturelle

Il n’existe aucune métrique canonique :

[
d : \mathcal{S} \times \mathcal{S} \to \mathbb{R}
]

Toute distance serait arbitraire.

---

## 8.3. Sous-espaces décisionnels

On peut définir des projections :

[
\pi_{certification} : \mathcal{S} \to \mathcal{D}_d
]

[
\pi_{adaptation} : \mathcal{S} \to (\mathcal{D}_e, \mathcal{S}_m)
]

Chaque politique pédagogique correspond à une projection.

---

# 9. Visualisation conceptuelle

On peut représenter le score comme :

* un hyper-rectangle ordonné,
* ou un diagramme radar multidimensionnel,
* ou une structure en treillis partiel.

Mais aucune visualisation ne doit induire une somme implicite.

---

# 10. Conséquence algorithmique

Le scoring-engine doit :

1. calculer chaque axe séparément,
2. interdire toute agrégation implicite,
3. stocker la structure complète,
4. comparer via dominance partielle.

---

# 11. Résumé formel

Le score CEREDIS est un élément du produit ordonné :

[
(\mathcal{S}, \preceq_{\mathcal{S}})
]

où l’ordre global est défini par dominance composante par composante.

Il s’agit d’un **espace produit non compensatoire**,
fondement mathématique de la pédagogie adaptative CEREDIS.

---

