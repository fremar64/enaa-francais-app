Nous allons formaliser **Dm (dimension métacognitive de régulation observée)** comme une **propriété structurale des trajectoires d’activité**, et non comme une inférence psychologique.

---

# 1. Position conceptuelle de Dm

Nous avons désormais :

* **Dd** = position développementale (où ?)
* **Ds** = stabilité (à quel point ?)
* **De** = coût normalisé (à quel prix ?)

Il manque :

> **Dm = capacité observée de régulation stratégique face à la tâche**

Dm ne mesure pas la réussite,
mais **la qualité d’ajustement comportemental**.

---

# 2. Principe fondamental

Dm est défini uniquement à partir :

* des événements pédagogiques observables,
* de leur organisation temporelle,
* des transitions entre états.

⚠️ Aucune inférence psychologique latente.

---

# 3. Cadre mathématique

## 3.1. Trajectoire d’activité

Soit :

[
\tau = (e_1, e_2, ..., e_n)
]

la suite chronologique d’événements :

* attempt
* error
* success
* hint-used
* abandon
* retry
* correction spontanée
* etc.

---

## 3.2. Définition d’un schéma de régulation

On définit un ensemble de **patterns structuraux** :

[
\mathcal{P} = {P_1, P_2, ..., P_k}
]

où chaque ( P_i ) est une configuration reconnaissable dans ( \tau ).

Exemples :

* P₁ : erreur → correction autonome → succès
* P₂ : erreur répétée → demande d’aide → succès
* P₃ : tentative unique → abandon

---

# 4. Définition formelle de Dm

On définit une fonction :

[
\Psi : \tau \rightarrow \mathcal{S}_m
]

où :

[
\mathcal{S}_m =
{ non-régulé, réactif, adaptatif, stratégique }
]

avec ordre :

[
non\text{-}régulé \prec réactif \prec adaptatif \prec stratégique
]

---

# 5. Définition structurale des niveaux

## 5.1. Non-régulé

Aucune adaptation observable :

* répétition identique des erreurs,
* absence de correction,
* abandon sans tentative de compensation.

---

## 5.2. Réactif

Réaction minimale à l’erreur :

* correction après feedback externe,
* dépendance forte à l’aide.

---

## 5.3. Adaptatif

Ajustement autonome :

* modification de stratégie,
* réduction d’erreurs après auto-correction,
* usage ciblé d’aide.

---

## 5.4. Stratégique

Anticipation et planification :

* utilisation préventive d’indices,
* auto-vérification avant validation,
* réduction proactive du coût cognitif.

---

# 6. Formalisation comme propriété d’automate

On peut modéliser la trajectoire ( \tau ) comme une **machine à états finis** :

[
M = (S, \Sigma, \delta)
]

où :

* ( S ) = états internes (engagé, en difficulté, correction, validation…)
* ( \Sigma ) = événements
* ( \delta ) = transitions

Dm correspond alors à une **classe d’équivalence de graphes de transition**.

---

# 7. Indépendance théorique

## M1 — Indépendance de Dd

Un apprenant peut :

[
Dd = faible, \quad Dm = stratégique
]

→ faible niveau mais régulation mature.

---

## M2 — Indépendance de De

Un coût élevé peut coexister avec régulation stratégique.

---

## M3 — Non-compensation

Dm ne compense ni Dd ni Ds.

---

# 8. Définition complète

On définit :

[
Dm(a) =
{
(d, m) \mid d \in Dd(a), m \in \mathcal{S}_m
}
]

Donc :

[
Dm(a) \subseteq \mathcal{D}_d \times \mathcal{S}_m
]

---

# 9. Traduction logicielle

```ts
type MetacognitiveLevel =
  | "non_regulated"
  | "reactive"
  | "adaptive"
  | "strategic";

type DmValue = {
  perLevel: {
    levelId: DevelopmentLevelId;
    regulation: MetacognitiveLevel;
  }[];
};
```

---

# 10. Propriétés dynamiques

On peut définir :

[
\frac{d}{dt} Dm(a)
]

Une progression vers stratégique indique :

* internalisation,
* autonomie croissante,
* diminution future de De probable.

---

# 11. Place dans la factorisation CEREDIS

Nous avons maintenant :

[
\mathcal{F}_{CEREDIS}(e) =
(D, Dd, Ds, De, Dm)
]

avec :

* D = réalisation
* Dd = amplitude
* Ds = stabilité
* De = coût normalisé
* Dm = régulation observable

---

# 12. Structure globale du score

Le score CEREDIS est donc un **vecteur multi-dimensionnel ordonné**, non métrique, non compensatoire.

Il n’est pas une note.
Il est une **factorisation des propriétés cognitives observables**.

---
