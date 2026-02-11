Je vais **formaliser mathématiquement Dd (dimension développementale)** de manière **axiomatique**, en cohérence stricte avec CEREDIS, le CECRL et ton usage du terme *amplitude développementale*.
On va volontairement **éviter toute métrique naïve** pour poser une structure robuste (ordres partiels, seuils, foncteurs d’élévation).

---

# 1. Intuition fondatrice (rappel épistémologique)

> **Dd ne mesure pas une performance, mais une *position structurale* dans un espace de développement.**

Autrement dit :

* Dd n’est **ni continu**, ni cardinal,
* Dd est une **classe d’équivalence développementale**,
* l’évolution de Dd est **monotone**, mais pas nécessairement linéaire.

---

# 2. Espace mathématique de Dd

## 2.1. Ensemble des niveaux développementaux

On définit un ensemble fini (ou dénombrable) :

[
\mathcal{D}_d = { d_0, d_1, d_2, \dots, d_n }
]

où :

* ( d_0 ) = niveau nul (non structuré / émergent),
* ( d_n ) = niveau maximal du référentiel considéré (ex. fin CECRL ciblé).

⚠️ Important :
Les éléments de ( \mathcal{D}_d ) **ne sont pas des nombres**, même s’ils peuvent être indexés.

---

## 2.2. Relation d’ordre partiel

On munit ( \mathcal{D}_d ) d’une relation :

[
\preceq \subseteq \mathcal{D}_d \times \mathcal{D}_d
]

telle que :

* **Réflexivité** : ( d \preceq d )
* **Antisymétrie** : ( d_i \preceq d_j \land d_j \preceq d_i \Rightarrow d_i = d_j )
* **Transitivité** : ( d_i \preceq d_j \land d_j \preceq d_k \Rightarrow d_i \preceq d_k )

👉 **Conclusion** :
[
(\mathcal{D}_d, \preceq) \text{ est un poset (partially ordered set)}
]

---

## 3. Pourquoi un ordre *partiel* (et non total)

Deux niveaux peuvent être :

* **incomparables**
  (ex. maîtrise phonologique vs maîtrise syntaxique),
* **non substituables** pédagogiquement.

Formellement :

[
\exists d_i, d_j \in \mathcal{D}_d \quad \text{tels que} \quad
\neg(d_i \preceq d_j) \land \neg(d_j \preceq d_i)
]

👉 C’est **fondamental** pour éviter :

* les moyennes absurdes,
* les progressions artificiellement linéaires.

---

# 4. Amplitude développementale

## 4.1. Définition

Soit un apprenant ( a ), et un ensemble d’activités réalisées ( A_a ).

On définit la **borne supérieure atteinte** :

[
Dd(a) = \sup { d \in \mathcal{D}_d \mid d \text{ est validé par au moins une activité de } A_a }
]

⚠️ Cette borne :

* peut ne pas être unique si l’ordre est partiel,
* peut être un **ensemble maximal** plutôt qu’un unique élément.

👉 **Dd(a) est donc un *ensemble de niveaux maximaux compatibles***.

---

## 4.2. Cas pratique (représentation)

```ts
type DdValue = {
  maximalLevels: DevelopmentLevelId[];
};
```

Pas de scalaire. Pas de moyenne.
Uniquement des **positions atteintes**.

---

# 5. Seuils développementaux

## 5.1. Définition formelle

Un **seuil** est un sous-ensemble minimal ( S \subset \mathcal{D}_d ) tel que :

[
\forall d \in S, \quad d \preceq Dd(a)
]

Autrement dit :

> un seuil est franchi si **tous** ses niveaux constitutifs sont atteints.

---

## 5.2. Seuils comme objets normatifs

On définit un ensemble de seuils :

[
\Sigma = { \sigma_1, \sigma_2, \dots }
\quad \text{avec} \quad
\sigma_i \subset \mathcal{D}_d
]

Exemples :

* seuil « lecture syllabique stabilisée »,
* seuil « compréhension littérale autonome ».

👉 Les seuils **ne sont pas calculés**, ils sont **déclarés**.

---

## 6. Validation développementale

### Fonction de validation

On définit une fonction :

[
\text{valide}_\sigma(a) =
\begin{cases}
\text{true} & \text{si } \forall d \in \sigma, d \preceq Dd(a) \
\text{false} & \text{sinon}
\end{cases}
]

👉 Cette fonction peut :

* déclencher un déverrouillage,
* autoriser un passage de cycle,
* produire une assertion CaSS.

---

# 7. Propriétés théoriques majeures de Dd

### T1 — Monotonie

[
A_a \subseteq A'_a \Rightarrow Dd(a) \preceq Dd'(a)
]

On ne “régresse” pas en Dd (au sens strict).

---

### T2 — Non-compensation

Aucun niveau ne compense l’absence d’un autre si requis par un seuil.

---

### T3 — Indépendance temporelle

Dd dépend de **ce qui est atteint**, pas de **la vitesse**.

---

### T4 — Compatibilité CECRL

Le CECRL correspond à une **projection** :

[
\pi_{CECRL} : \mathcal{D}_d \rightarrow {A1, A2, B1, \dots}
]

plusieurs ( d \in \mathcal{D}_d ) pouvant se projeter sur le même niveau CECRL.

---

# 8. Intégration directe dans le scoring-engine

### Fonction Dd

```ts
function computeDd(
  surface: ActivityEvaluationSurface,
  context: DevelopmentContext
): DdValue;
```

Où `DevelopmentContext` contient :

* le poset ( (\mathcal{D}_d, \preceq) ),
* la table activité → niveaux validables,
* la définition des seuils.

---

# 9. Ce que cette formalisation interdit (volontairement)

❌ Moyennes pondérées
❌ Scores continus déguisés
❌ Régression artificielle
❌ Comparaisons inter-domaines abusives

---

## Conclusion

Tu disposes maintenant d’un **Dd formellement défini comme amplitude développementale** :

* ordonné partiellement,
* fondé sur des bornes,
* structuré par des seuils,
* alignable CECRL sans réduction abusive.

---

