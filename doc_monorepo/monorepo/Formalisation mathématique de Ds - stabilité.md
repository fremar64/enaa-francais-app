Nous allons formaliser **Ds (dimension de stabilité)** en cohérence stricte avec :

* le poset développemental ((\mathcal{D}_d, \preceq)),
* la définition précédente de (Dd),
* le principe CEREDIS de non-compensation,
* la traçabilité complète.

---

# 1. Intuition structurante

Si **Dd = amplitude atteinte**,
alors :

> **Ds = robustesse structurale de cette amplitude sous répétition et perturbation.**

Autrement dit :

* Dd dit *où* l’apprenant est situé.
* Ds dit *à quel point cette position est consolidée*.

Ds n’est **pas** :

* une moyenne,
* une fréquence brute,
* un taux de réussite.

Ds est une **propriété de stabilité d’un élément du poset**.

---

# 2. Cadre formel

## 2.1. Rappel

On a :

[
Dd(a) = \text{ensemble des niveaux maximaux atteints}
]

Soit ( d^* \in Dd(a) ).

Nous voulons définir une fonction :

[
Ds(a, d^*)
]

qui mesure la stabilité de ( d^* ).

---

# 3. Définition mathématique de la stabilité

## 3.1. Ensemble des observations compatibles avec un niveau

Soit :

[
\mathcal{A}_{d^*}(a)
]

l’ensemble des activités réalisées par ( a ) qui valident le niveau ( d^* ).

---

## 3.2. Stabilité comme persistance sous répétition

On définit une fonction :

[
\phi : \mathcal{A}_{d^*}(a) \to {0,1}
]

où :

* 1 = activité confirmant la validité de ( d^* )
* 0 = activité infirmant ou fragilisant ( d^* )

---

## 3.3. Définition minimale de stabilité

On définit :

[
Ds(a, d^*) = \frac{\sum \phi}{|\mathcal{A}_{d^*}(a)|}
]

Mais ⚠️ ceci n’est qu’un support technique.
La vraie définition est structurelle.

---

# 4. Définition structurelle forte de Ds

Nous définissons une relation :

[
\mathcal{R}_{stable} \subseteq \mathcal{D}_d
]

telle que :

[
d^* \text{ est stable pour } a
]

si et seulement si :

[
\exists k \geq k_{min}
]

tel que ( d^* ) est confirmé dans au moins ( k ) contextes indépendants.

---

# 5. Indépendance contextuelle

La stabilité n’est valide que si :

* les validations ne proviennent pas du même item,
* ni de la même micro-variation,
* ni du même support répétitif.

On introduit donc une partition :

[
\mathcal{C} = {C_1, C_2, \dots, C_m}
]

où chaque ( C_i ) est un **contexte indépendant**.

Condition de stabilité forte :

[
|{C_i \mid d^* \text{ validé dans } C_i}| \geq \theta
]

---

# 6. Ds comme application sur le poset

On définit :

[
Ds : \mathcal{D}_d \to \mathcal{S}_s
]

où :

[
\mathcal{S}_s = {fragile, émergent, consolidé, robuste}
]

Structure ordonnée :

[
fragile \prec émergent \prec consolidé \prec robuste
]

---

# 7. Propriété fondamentale : orthogonalité à Dd

Même si :

[
d_1 \prec d_2
]

il est possible que :

[
Ds(a, d_2) = fragile
\quad \text{et} \quad
Ds(a, d_1) = robuste
]

👉 Ce cas est pédagogique majeur :
il signale une **ascension prématurée**.

---

# 8. Définition complète

On peut donc formaliser Ds comme :

[
Ds(a) =
{
(d, s) \mid d \in Dd(a), s = stabilité(d)
}
]

Donc :

[
Ds(a) \subseteq \mathcal{D}_d \times \mathcal{S}_s
]

---

# 9. Propriétés théoriques

### S1 — Non-régression automatique

La fragilité d’un niveau supérieur ne rétrograde pas Dd.

---

### S2 — Monotonie conditionnelle

Si ( d ) est stable et ( d \preceq d' ),
alors ( d' ) ne peut être robuste sans que ( d ) le soit.

---

### S3 — Sensibilité aux perturbations

Une erreur isolée ne détruit pas la stabilité.

---

### S4 — Compatibilité CECRL

CECRL classe des niveaux,
Ds qualifie la consolidation interne du niveau.

---

# 10. Traduction logicielle

```ts
type StabilityLevel =
  | "fragile"
  | "emergent"
  | "consolidated"
  | "robust";

type DsValue = {
  perLevel: {
    levelId: DevelopmentLevelId;
    stability: StabilityLevel;
  }[];
};
```

---

# 11. Différence essentielle avec un taux de réussite

| Taux de réussite         | Ds CEREDIS                       |
| ------------------------ | -------------------------------- |
| Fréquence brute          | Consolidation contextuelle       |
| Dépend du nombre d’items | Dépend de contextes indépendants |
| Métrique                 | Structure ordinale               |

---

# 12. Interprétation pédagogique

Ds permet :

* détection des acquisitions instables,
* déclenchement de remédiations ciblées,
* modulation adaptative,
* prévention des faux positifs développementaux.

---

# 13. Position dans le foncteur global

On a désormais :

[
\mathcal{F}_{CEREDIS}(e) =
(D, Dd, Ds, De, Dm)
]

avec :

* Dd = position dans le poset
* Ds = propriété de stabilité de cette position

---

