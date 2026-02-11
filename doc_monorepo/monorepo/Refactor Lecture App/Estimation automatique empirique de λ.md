Excellente étape.
Nous allons ajouter une **estimation empirique automatique du paramètre d’oubli λ**, directement à partir des données longitudinales issues de l’instrumentation CEREDIS.

L’objectif est double :

* 🔬 Estimer λ individuel (par apprenant et par niveau)
* 📊 Valider expérimentalement la cohérence du modèle exponentiel

Nous procédons rigoureusement.

---

# 1️⃣ Rappel du modèle théorique

Nous avons posé :

[
C_d(t) = \sum_i e^{-\lambda (t - t_i)}
]

Entre deux réactivations, si aucune nouvelle validation :

[
C(t) = C(t_0) e^{-\lambda (t - t_0)}
]

Donc :

[
\ln C(t) = \ln C(t_0) - \lambda (t - t_0)
]

👉 Relation linéaire.

---

# 2️⃣ Méthode d’estimation

## Transformation linéaire

Posons :

[
y = \ln C(t)
]
[
x = t
]

Alors :

[
y = a - \lambda x
]

Donc :

> λ = − pente de la régression linéaire.

---

# 3️⃣ Conditions expérimentales nécessaires

Pour estimer λ :

* disposer de plusieurs mesures de ( C(t) ) sans nouvelle validation,
* isoler des segments “entre réactivations”,
* ignorer les points où C augmente (nouvelle validation).

---

# 4️⃣ Implémentation analytics-core

## 📦 stability-estimator.ts

```ts
interface StabilityPoint {
  t: number;      // timestamp (days)
  value: number;  // weighted stability C(t)
}

export function estimateLambda(
  data: StabilityPoint[]
): number | null {

  if (data.length < 2) return null;

  const filtered = data.filter(p => p.value > 0);

  const x = filtered.map(p => p.t);
  const y = filtered.map(p => Math.log(p.value));

  const n = x.length;

  const sumX = x.reduce((a,b)=>a+b,0);
  const sumY = y.reduce((a,b)=>a+b,0);
  const sumXY = x.reduce((a,b,i)=>a + b*y[i],0);
  const sumX2 = x.reduce((a,b)=>a + b*b,0);

  const slope =
    (n*sumXY - sumX*sumY) /
    (n*sumX2 - sumX*sumX);

  const lambda = -slope;

  return lambda > 0 ? lambda : null;
}
```

---

# 5️⃣ Détection automatique des segments exploitables

Ajouter :

```ts
export function extractDecaySegments(
  trajectory: StabilityPoint[]
): StabilityPoint[][] {

  const segments: StabilityPoint[][] = [];
  let current: StabilityPoint[] = [];

  for (let i = 1; i < trajectory.length; i++) {

    if (trajectory[i].value <= trajectory[i-1].value) {
      current.push(trajectory[i-1]);
    } else {
      if (current.length > 1)
        segments.push([...current]);
      current = [];
    }
  }

  if (current.length > 1)
    segments.push(current);

  return segments;
}
```

---

# 6️⃣ Estimation robuste multi-segments

```ts
export function estimateLambdaFromTrajectory(
  trajectory: StabilityPoint[]
): number | null {

  const segments = extractDecaySegments(trajectory);

  const lambdas = segments
    .map(seg => estimateLambda(seg))
    .filter(l => l !== null) as number[];

  if (lambdas.length === 0) return null;

  return lambdas.reduce((a,b)=>a+b,0) / lambdas.length;
}
```

---

# 7️⃣ Visualisation dans dashboard

Ajouter dans `StabilityCurve` :

* afficher λ théorique
* afficher λ empirique
* afficher R² (qualité de fit)

---

# 8️⃣ Calcul R² (qualité d’ajustement)

```ts
export function computeR2(
  data: StabilityPoint[],
  lambda: number
): number {

  const y = data.map(p => Math.log(p.value));
  const x = data.map(p => p.t);

  const meanY =
    y.reduce((a,b)=>a+b,0) / y.length;

  const ssTot =
    y.reduce((a,b)=>a + Math.pow(b-meanY,2),0);

  const ssRes =
    y.reduce((a,b,i)=> {
      const predicted =
        Math.log(data[0].value)
        - lambda*(x[i]-x[0]);
      return a + Math.pow(b - predicted,2);
    },0);

  return 1 - (ssRes/ssTot);
}
```

---

# 9️⃣ Résultats analytiques possibles

Avec cette estimation tu peux :

* Estimer λ par apprenant
* Estimer λ par niveau CECRL
* Comparer λ moyen cohorte
* Tester H0 : λ constant vs variable
* Adapter λ dynamiquement par individu

---

# 🔟 Extension avancée

On peut définir :

[
\lambda_{eff} =
f(D_m, D_e, \text{fatigue}, \text{intervalle})
]

Et estimer un modèle mixte (effets fixes + aléatoires).

---

# 11️⃣ Intégration dans planification adaptative

Remplacer λ statique par :

```ts
const lambda = estimateLambdaFromTrajectory(history)
             ?? defaultLambda;
```

Planification devient :

[
t^* = \frac{1}{\hat{\lambda}} \ln \frac{C}{\theta}
]

Donc :

> Spaced repetition personnalisée empiriquement.

---

# 🔬 Impact scientifique majeur

Tu passes de :

* modèle théorique fixé

à :

* modèle adaptatif estimé empiriquement

Ce qui ouvre :

* validation expérimentale
* comparaison inter-individuelle
* publication en psychologie cognitive computationnelle

---

# 🚀 Prochaine étape stratégique

Deux directions puissantes :

1. 🔹 Ajouter estimation bayésienne robuste de λ
2. 🔹 Construire étude comparative CEREDIS λ empirique vs SM-2

Laquelle engages-tu ?
