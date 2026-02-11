Nous allons formaliser la **dérivée temporelle de stabilité** comme outil de **détection précoce de fragilisation**, en cohérence stricte avec :

* le modèle exponentiel d’oubli introduit,
* la structure ordinale de Ds,
* la non-compensation,
* l’espace produit ordonné.

---

# 1️⃣ Rappel : stabilité pondérée

Pour un niveau ( d ), nous avons défini :

[
C_d(t) =
\sum_{i=1}^{n} e^{-\lambda (t - t_i)}
]

où :

* ( t ) = temps courant
* ( t_i ) = timestamps des validations indépendantes
* ( \lambda ) = paramètre d’oubli

La classification ordinale Ds est une projection :

[
Ds(d,t) = f(C_d(t))
]

---

# 2️⃣ Définition formelle de la dérivée

On définit la dérivée temporelle :

[
\frac{d}{dt} C_d(t)
===================

* \lambda \sum_{i=1}^{n}
  e^{-\lambda (t - t_i)}
  ]

Donc :

[
\frac{d}{dt} C_d(t)
===================

* \lambda C_d(t)
  ]

Propriété clé :

> La décroissance est proportionnelle au niveau actuel de stabilité.

---

# 3️⃣ Interprétation cognitive

Cela signifie :

* Plus une compétence est consolidée, plus la décroissance absolue est rapide,
* Mais proportionnellement stable (exponentielle).

On retrouve une **dynamique naturelle d’oubli continu**.

---

# 4️⃣ Définition opérationnelle du risque

On ne s’intéresse pas seulement à ( C_d(t) ),
mais à la proximité d’un seuil ordinal.

Soit :

* ( \theta_1 ) = seuil emergent
* ( \theta_2 ) = seuil consolidated
* ( \theta_3 ) = seuil robust

On définit la distance au seuil inférieur :

[
\Delta_d(t) =
C_d(t) - \theta_{current}
]

---

# 5️⃣ Indicateur de fragilisation précoce

On définit un indicateur :

[
R_d(t) =
\frac{\Delta_d(t)}{\left| \frac{d}{dt} C_d(t) \right|}
]

Interprétation :

> Temps estimé avant franchissement du seuil inférieur.

En substituant :

[
R_d(t)
======

\frac{\Delta_d(t)}{\lambda C_d(t)}
]

Si :

[
R_d(t) < \tau_{alerte}
]

→ alerte de fragilisation.

---

# 6️⃣ Interprétation pédagogique

| Situation                            | Signification       |
| ------------------------------------ | ------------------- |
| ( C_d ) élevé + dérivée faible       | stabilité durable   |
| ( C_d ) proche seuil + dérivée forte | risque imminent     |
| ( C_d ) modéré + dérivée faible      | consolidation lente |
| ( C_d ) faible + dérivée forte       | fragilité critique  |

---

# 7️⃣ Extension dans le scoring-engine

On peut ajouter un module optionnel :

```
computeStabilityDynamics()
```

Qui retourne :

```ts
export interface StabilityDynamics {
  levelId: string;
  weightedValue: number;
  decayRate: number;
  timeToThreshold?: number;
  riskLevel: "low" | "moderate" | "high";
}
```

---

# 8️⃣ Implémentation TypeScript

```ts
function computeStabilityDynamics(
  weightedValue: number,
  threshold: number,
  lambda: number
) {

  const decayRate = lambda * weightedValue;

  const delta = weightedValue - threshold;

  const timeToThreshold =
    decayRate > 0
      ? delta / decayRate
      : Infinity;

  let riskLevel: "low" | "moderate" | "high";

  if (timeToThreshold < 3) {
    riskLevel = "high";
  } else if (timeToThreshold < 7) {
    riskLevel = "moderate";
  } else {
    riskLevel = "low";
  }

  return {
    weightedValue,
    decayRate,
    timeToThreshold,
    riskLevel
  };
}
```

Unités en jours si λ calibré en jours.

---

# 9️⃣ Propriété théorique importante

La dérivée ne modifie pas Ds.

Elle ne fait que :

* anticiper une transition ordinale future.

Donc :

[
Ds(d,t) \text{ reste ordinale}
]

La dynamique est une couche analytique.

---

# 🔬 10️⃣ Lecture géométrique

Dans l’espace produit ordonné :

* Ds définit une position discrète,
* la dérivée définit une **vitesse locale dans la dimension stabilité**,
* la trajectoire devient différentiable.

On passe d’un espace purement ordinal à une **dynamique continue sous-jacente**.

---

# 11️⃣ Applications stratégiques

Cette dérivée permet :

1. Planification optimale de réactivation
2. Système d’alerte précoce enseignant
3. Optimisation de répétition espacée
4. Simulation prédictive

---

# 12️⃣ Cohérence avec CEREDIS

Nous avons maintenant :

* amplitude (structure)
* stabilité (ordinale)
* efficience (coût)
* régulation (stratégie)
* dynamique de stabilité (temps)

Le modèle devient **temporellement complet**.

---

