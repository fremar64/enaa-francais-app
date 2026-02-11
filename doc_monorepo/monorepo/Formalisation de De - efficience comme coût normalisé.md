Nous allons formaliser **De (dimension d’efficience)** comme une **fonction de coût normalisé**, indépendante de Dd (amplitude) et de Ds (stabilité), mais compatible avec les deux.

---

# 1. Intuition fondatrice

Si :

* **Dd** = position atteinte dans le poset développemental,
* **Ds** = robustesse de cette position,

alors :

> **De mesure le coût cognitif observable pour atteindre ou maintenir cette position.**

De n’est donc :

* ni la vitesse brute,
* ni la réussite,
* ni la stabilité.

De est une **fonction d’économie relative**.

---

# 2. Cadre mathématique

## 2.1. Données observables

À partir de `ActivityEvaluationSurface`, on dispose notamment de :

* ( t ) = durée (durationMs)
* ( n_a ) = nombre d’essais (attempts)
* ( n_e ) = nombre d’erreurs
* ( n_h ) = nombre d’aides utilisées
* ( E ) = ensemble des événements

On définit le vecteur de coût brut :

[
\mathbf{C}_{brut} = (t, n_a, n_e, n_h)
]

---

## 2.2. Coût brut ≠ efficience

Un coût brut n’a aucune signification sans normalisation.

Exemple :

* 30 secondes peuvent être rapides ou lentes selon la tâche.
* 3 erreurs peuvent être négligeables ou majeures selon la difficulté.

👉 Il faut donc définir un **coût attendu normatif**.

---

# 3. Définition du coût normatif

Pour chaque activité ( A ), on définit un profil normatif :

[
\mathbf{C}_{ref}(A, d)
]

où :

* ( A ) = type d’activité
* ( d ) = niveau développemental visé

Ce profil contient :

* durée attendue médiane,
* nombre d’essais typique,
* tolérance d’erreurs,
* recours attendu aux aides.

Ces valeurs ne sont **pas statistiques initialement** ; elles sont normatives (déclarées).

---

# 4. Définition formelle de De

## 4.1. Fonction de divergence normalisée

On définit une fonction :

[
\Delta : \mathbf{C}*{brut} \times \mathbf{C}*{ref} \rightarrow \mathbb{R}_{\ge 0}
]

qui mesure la divergence relative.

Exemple générique :

[
\Delta =
\sum_i w_i \cdot \frac{|C_i - C_{ref,i}|}{C_{ref,i}}
]

où ( w_i ) sont des poids normatifs.

⚠️ Ce n’est qu’une forme possible ; le modèle n’impose pas une formule spécifique.

---

## 4.2. Efficience comme ordre ordinal

On ne conserve pas la valeur continue de ( \Delta ).

On définit un ensemble ordonné :

[
\mathcal{D}_e =
{ surcharge, coûteux, optimal, automatisé }
]

avec :

[
surcharge \prec coûteux \prec optimal \prec automatisé
]

---

## 4.3. Fonction d’efficience

[
De(a, d^*) =
f(\Delta(\mathbf{C}*{brut}, \mathbf{C}*{ref}))
]

où ( f ) est une fonction de classification ordinale.

---

# 5. Propriétés théoriques majeures

## E1 — Indépendance de Dd

Un niveau élevé peut être atteint avec surcharge :

[
Dd = d_3, \quad De = surcharge
]

Ce cas signale :

> compétence atteinte mais non automatisée.

---

## E2 — Indépendance de Ds

Une compétence peut être stable mais coûteuse :

[
Ds = robuste, \quad De = coûteux
]

Cela indique :

> consolidation sans automatisation.

---

## E3 — Relativité contextuelle

De dépend :

* du type d’activité,
* du niveau visé,
* du contexte.

Il n’existe pas de De absolu.

---

## E4 — Non-compensation

Un De optimal ne compense jamais un Dd insuffisant.

---

# 6. Extension dynamique (option avancée)

On peut définir une dérivée temporelle :

[
\frac{d}{dt} De(a)
]

Si De décroît au fil du temps :

> processus d’automatisation.

Si De augmente :

> surcharge croissante ou difficulté nouvelle.

---

# 7. Définition finale

On peut formaliser :

[
De(a) =
{
(d, e) \mid d \in Dd(a), e \in \mathcal{D}_e
}
]

Donc :

[
De(a) \subseteq \mathcal{D}_d \times \mathcal{D}_e
]

---

# 8. Traduction logicielle

```ts
type EfficiencyLevel =
  | "overload"
  | "costly"
  | "optimal"
  | "automated";

type DeValue = {
  perLevel: {
    levelId: DevelopmentLevelId;
    efficiency: EfficiencyLevel;
  }[];
};
```

---

# 9. Interprétation pédagogique

| De         | Interprétation                       |
| ---------- | ------------------------------------ |
| surcharge  | charge cognitive excessive           |
| coûteux    | compétence mobilisée avec effort     |
| optimal    | adéquation coût/performance          |
| automatisé | coût minimal pour performance stable |

---

# 10. Position dans la factorisation globale

On a désormais :

* **Dd** = position
* **Ds** = stabilité
* **De** = coût relatif

Il reste :

* **Dm** = régulation métacognitive

---

