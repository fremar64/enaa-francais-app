Très bien.
Nous allons formaliser un **algorithme optimal de planification de réactivation (Spaced Repetition CEREDIS)**, dérivé directement :

* du modèle exponentiel d’oubli,
* de la dérivée temporelle de stabilité,
* de la structure ordinale de Ds,
* de la non-compensation.

L’objectif n’est pas un SM-2 classique (type Anki), mais un **algorithme cohérent avec l’espace produit CEREDIS**.

---

# 1️⃣ Rappel mathématique

Pour un niveau ( d ) :

[
C_d(t) = \sum e^{-\lambda (t - t_i)}
]

avec classification :

[
Ds(d,t) = f(C_d(t))
]

et dérivée :

[
\frac{d}{dt} C_d(t) = -\lambda C_d(t)
]

---

# 2️⃣ Objectif optimal

Nous cherchons à déterminer le **temps de réactivation optimal** ( t^* ) tel que :

* la stabilité ne chute pas sous le seuil inférieur,
* la répétition ne soit pas prématurée,
* la consolidation soit maximale pour coût minimal.

Formellement :

[
t^* = \arg\min_{t} \Big(
\text{coût}(t) + \text{risque}(t)
\Big)
]

---

# 3️⃣ Condition optimale simplifiée

L’instant optimal correspond au moment où :

[
C_d(t^*) = \theta_{inférieur} + \epsilon
]

c’est-à-dire juste avant franchissement du seuil ordinal.

---

# 4️⃣ Calcul analytique

Nous savons :

[
C_d(t) = C_d(t_0) e^{-\lambda (t - t_0)}
]

On cherche ( t^* ) tel que :

[
C_d(t^*) = \theta
]

Donc :

[
C_d(t_0) e^{-\lambda (t^* - t_0)} = \theta
]

On isole :

[
t^* = t_0 + \frac{1}{\lambda} \ln \frac{C_d(t_0)}{\theta}
]

---

# 5️⃣ Interprétation pédagogique

* Si ( C_d ) élevé → délai long.
* Si proche du seuil → délai court.
* Si λ élevé (oubli rapide) → délai court.
* Si λ faible → délai long.

---

# 6️⃣ Définition algorithmique CEREDIS

Pour chaque niveau ( d ) :

1. Calculer ( C_d(t_0) )
2. Identifier seuil ordinal inférieur ( \theta )
3. Calculer :

[
\Delta t = \frac{1}{\lambda} \ln \frac{C_d}{\theta}
]

4. Planifier réactivation à :

[
t^* = t_0 + \Delta t
]

---

# 7️⃣ Contraintes pratiques

On impose :

[
\Delta t \ge \Delta t_{min}
]

[
\Delta t \le \Delta t_{max}
]

Pour éviter :

* répétitions trop rapprochées,
* espacement irréaliste.

---

# 8️⃣ Implémentation TypeScript

```ts
export function computeOptimalReviewTime(
  currentValue: number,
  threshold: number,
  lambda: number,
  now: number = Date.now()
) {

  if (currentValue <= threshold) {
    return now; // urgence
  }

  const deltaT =
    (1 / lambda) *
    Math.log(currentValue / threshold);

  const deltaMs =
    deltaT * 24 * 60 * 60 * 1000;

  return now + deltaMs;
}
```

---

# 9️⃣ Intégration multi-niveaux

Pour un apprenant :

```
for each level d:
   compute t*_d
select minimum t*_d
```

On réactive le niveau le plus à risque.

---

# 🔟 Interaction avec De et Dm

Optimisation complète :

* Si De = surcharge → retarder légère réactivation.
* Si Dm = stratégique → allonger intervalle.
* Si Dm = non_regulated → réduire intervalle.

On peut ajuster λ dynamiquement :

[
\lambda_{eff} =
\lambda \cdot f(D_m)
]

---

# 11️⃣ Propriété théorique

Cet algorithme :

✔ respecte la structure exponentielle
✔ est analytique (pas heuristique empirique)
✔ est compatible avec poset
✔ conserve non-compensation

---

# 12️⃣ Différence avec SM-2

| SM-2               | CEREDIS                     |
| ------------------ | --------------------------- |
| basé sur note 0–5  | basé sur stabilité pondérée |
| empirique          | analytique                  |
| mono-dimensionnel  | multi-dimensionnel          |
| indépendant modèle | dérivé du modèle CEREDIS    |

---

# 13️⃣ Extension avancée

On peut formaliser un problème d’optimisation global :

Minimiser :

[
\sum_d \text{risque}(d,t)
]

sous contrainte de charge pédagogique quotidienne.

Cela devient un problème de planification sous contraintes.

---

# 14️⃣ Résultat

Nous disposons maintenant :

* d’un modèle d’oubli,
* d’une stabilité pondérée,
* d’une dérivée temporelle,
* d’un algorithme analytique optimal de réactivation.

CEREDIS possède désormais un système complet de **répétition espacée théoriquement fondé**.

---

