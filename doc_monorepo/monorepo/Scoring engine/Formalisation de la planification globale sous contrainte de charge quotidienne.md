Nous allons formaliser la **planification globale des réactivations sous contrainte de charge quotidienne**, en cohérence stricte avec :

* la dynamique exponentielle de stabilité,
* l’algorithme analytique de date optimale ( t^* ),
* l’espace produit ordonné,
* la non-compensation,
* et la séparation score / décision.

Nous passons ici d’un **problème local (niveau par niveau)** à un **problème global d’optimisation sous contraintes**.

---

# 1️⃣ Formulation mathématique du problème

## 1.1. Données

Pour un apprenant donné, soit :

* ( \mathcal{L} = {d_1, d_2, ..., d_n} ) : niveaux atteints
* ( t_i^* ) : date optimale analytique de réactivation du niveau ( d_i )
* ( w_i(t) = C_{d_i}(t) ) : stabilité pondérée
* ( \lambda_i ) : paramètre d’oubli

On impose une contrainte :

[
\text{charge quotidienne} \leq K
]

où ( K ) = nombre maximal de réactivations/jour.

---

# 2️⃣ Fonction objectif

On cherche à minimiser le **risque global pondéré** :

[
R(t) =
\sum_{i=1}^{n}
\rho_i(t)
]

où :

[
\rho_i(t)
=========

\max(0, \theta_i - C_{d_i}(t))
]

= dépassement du seuil.

L’objectif est de planifier les réactivations de sorte que :

[
R(t) \text{ soit minimal}
]

sous contrainte de charge.

---

# 3️⃣ Reformulation discrète (pratique)

Chaque jour ( D ), on doit choisir un sous-ensemble :

[
S_D \subseteq \mathcal{L}
]

tel que :

[
|S_D| \le K
]

et que la somme des risques futurs soit minimale.

---

# 4️⃣ Priorité analytique

On définit pour chaque niveau :

[
U_i =
\frac{1}{t_i^* - t_0}
]

Plus ( t_i^* ) est proche, plus ( U_i ) est élevé.

On peut aussi intégrer la dérivée :

[
U_i =
\lambda_i C_{d_i}(t_0)
]

(= vitesse de décroissance actuelle)

---

# 5️⃣ Algorithme optimal glouton (justifié)

Sous hypothèse :

* indépendance des niveaux,
* coût de réactivation uniforme,

le problème se réduit à :

> sélectionner les ( K ) niveaux ayant la plus forte urgence ( U_i ).

---

# 6️⃣ Algorithme CEREDIS de planification quotidienne

Pour chaque jour :

1. Calculer ( t_i^* ) pour tous niveaux.
2. Calculer ( U_i ).
3. Trier décroissant par ( U_i ).
4. Sélectionner les ( K ) premiers.
5. Programmer ces réactivations aujourd’hui.
6. Reporter les autres à recalcul le lendemain.

---

# 7️⃣ Extension multi-dimensionnelle (intégration De et Dm)

On ajuste la priorité :

[
U_i =
\alpha \cdot \text{proximité seuil}
+
\beta \cdot \lambda_i C_{d_i}
+
\gamma \cdot f(D_m)
]

Exemple :

* Dm stratégique → réduire priorité.
* Dm non_regulated → augmenter priorité.
* De surcharge → limiter fréquence.

---

# 8️⃣ Implémentation TypeScript

## 📦 decision-engine/src/planner.ts

```ts
interface LevelPlanningData {
  levelId: string;
  optimalTime: number;
  weightedValue: number;
  lambda: number;
  regulation?: string;
}

export function planDailyReviews(
  levels: LevelPlanningData[],
  maxPerDay: number,
  now: number
) {

  const enriched = levels.map(l => {

    const urgency =
      l.lambda * l.weightedValue;

    return {
      ...l,
      urgency
    };
  });

  enriched.sort((a, b) =>
    b.urgency - a.urgency
  );

  return enriched
    .slice(0, maxPerDay)
    .map(l => ({
      type: "schedule-review",
      payload: {
        levelId: l.levelId,
        scheduledAt: now
      }
    }));
}
```

---

# 9️⃣ Propriétés théoriques

✔ Respect de l’optimalité locale
✔ Compatible avec dérivée exponentielle
✔ Linéaire en complexité O(n log n)
✔ Non compensatoire
✔ Adaptable à contraintes variables

---

# 🔟 Version avancée (programmation dynamique)

Si :

* les coûts de réactivation diffèrent,
* certaines réactivations prennent plus de temps,
* on a des créneaux pédagogiques variables,

le problème devient un :

> problème de sac à dos dynamique (knapsack temporel).

On peut alors optimiser :

[
\max \sum U_i
\quad
\text{sous contrainte}
\quad
\sum c_i \le C_{max}
]

---

# 11️⃣ Cohérence avec CEREDIS

La planification globale :

* ne modifie pas Ds,
* n’altère pas Dd,
* agit uniquement sur la dynamique temporelle.

On reste dans la séparation :

Score → Dynamique → Décision.

---

# 12️⃣ Résultat

Nous avons maintenant :

* stabilité pondérée,
* dérivée analytique,
* date optimale locale,
* planification globale sous contrainte,
* intégration dans decision-engine.

Le système CEREDIS est désormais complet du point de vue :

* évaluation,
* dynamique,
* planification adaptative,
* optimisation pédagogique.

---

