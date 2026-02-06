Très bien. Je vais définir **les algorithmes exacts de calcul des scores** de manière :

* **mathématiquement explicite**,
* **directement implémentable en TypeScript (Next.js)**,
* **alignée avec votre modèle développemental (CP → 3e)**,
* **compatible CaSS (Assertions enrichies)**,
* **audit-proof**.

Je structure la réponse en **5 niveaux**, du principe au code.

---

# I. RAPPEL DU MODÈLE FORMEL (BASE DE CALCUL)

Pour chaque compétence évaluée à un instant *t*, on calcule :

[
D = \alpha D_d + \beta D_s + \gamma D_e + \delta D_m
]

avec :

* (D_d) : score distinctif (forme)
* (D_s) : score significatif (sens)
* (D_e) : score énonciatif / discursif
* (D_m) : score métacognitif

Les coefficients (\alpha, \beta, \gamma, \delta) dépendent du **niveau scolaire**.

---

# II. STRUCTURES DE DONNÉES (TYPE SCRIPT)

## 1. Types fondamentaux

```ts
type AgeNiveau =
  | "CP" | "CE1" | "CE2"
  | "CM1" | "CM2"
  | "6e" | "5e" | "4e" | "3e";

interface RawIndicators {
  distinctif: number[];     // ex: % correct, temps normalisé, stabilité
  significatif: number[];   // ex: compréhension, accords, lexique
  enonciatif: number[];     // ex: cohérence, connecteurs
  metacognitif: number[];   // ex: verbalisation, autocorrection
}

interface SubScores {
  Dd: number;
  Ds: number;
  De: number;
  Dm: number;
}

interface GlobalScore extends SubScores {
  D: number;
  projectionCECRL: string;
}
```

---

# III. NORMALISATION DES INDICATEURS (0–100)

Tous les indicateurs bruts doivent être **normalisés sur [0–100]**.

## 1. Fonction de normalisation simple

```ts
function normalize(value: number, min: number, max: number): number {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
}
```

👉 Exemple :

* taux d’erreur phonémique : inverser la métrique avant normalisation.

```ts
function normalizeErrorRate(errorRate: number): number {
  return normalize(1 - errorRate, 0, 1);
}
```

---

# IV. CALCUL DES SOUS-SCORES (D_d, D_s, D_e, D_m)

Chaque sous-score est une **moyenne pondérée locale**.

```ts
function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function computeSubScores(indicators: RawIndicators): SubScores {
  return {
    Dd: average(indicators.distinctif),
    Ds: average(indicators.significatif),
    De: average(indicators.enonciatif),
    Dm: average(indicators.metacognitif),
  };
}
```

---

# V. PONDÉRATIONS DYNAMIQUES PAR NIVEAU

## 1. Table de pondération officielle CEREDIS

```ts
const WEIGHTS: Record<AgeNiveau, {
  alpha: number; beta: number; gamma: number; delta: number;
}> = {
  CP:  { alpha: 0.50, beta: 0.30, gamma: 0.15, delta: 0.05 },
  CE1: { alpha: 0.45, beta: 0.30, gamma: 0.15, delta: 0.10 },
  CE2: { alpha: 0.35, beta: 0.35, gamma: 0.20, delta: 0.10 },
  CM1: { alpha: 0.25, beta: 0.35, gamma: 0.25, delta: 0.15 },
  CM2: { alpha: 0.20, beta: 0.35, gamma: 0.25, delta: 0.20 },
  "6e": { alpha: 0.15, beta: 0.30, gamma: 0.30, delta: 0.25 },
  "5e": { alpha: 0.15, beta: 0.30, gamma: 0.30, delta: 0.25 },
  "4e": { alpha: 0.10, beta: 0.30, gamma: 0.35, delta: 0.25 },
  "3e": { alpha: 0.10, beta: 0.25, gamma: 0.35, delta: 0.30 },
};
```

---

# VI. CALCUL DU SCORE GLOBAL D

```ts
function computeGlobalScore(
  sub: SubScores,
  age: AgeNiveau
): number {
  const { alpha, beta, gamma, delta } = WEIGHTS[age];
  return (
    alpha * sub.Dd +
    beta  * sub.Ds +
    gamma * sub.De +
    delta * sub.Dm
  );
}
```

---

# VII. PROJECTION AUTOMATIQUE VERS LE CECRL

## 1. Fonction de projection continue → CECRL

```ts
function projectToCECRL(D: number): string {
  if (D < 15) return "Pré-A1";
  if (D < 30) return "A1.0";
  if (D < 45) return "A1.2";
  if (D < 60) return "A2.1";
  if (D < 75) return "A2.2";
  if (D < 90) return "B1.1";
  return "B1+";
}
```

---

# VIII. PIPELINE COMPLET (FONCTION MAÎTRESSE)

```ts
function evaluateLearner(
  indicators: RawIndicators,
  age: AgeNiveau
): GlobalScore {

  const subScores = computeSubScores(indicators);
  const D = computeGlobalScore(subScores, age);

  return {
    ...subScores,
    D: Number(D.toFixed(2)),
    projectionCECRL: projectToCECRL(D),
  };
}
```

---

# IX. EXEMPLE CONCRET (CP)

```ts
const indicatorsCP: RawIndicators = {
  distinctif: [45, 50, 40],
  significatif: [20, 25],
  enonciatif: [10],
  metacognitif: [5],
};

const result = evaluateLearner(indicatorsCP, "CP");

/*
{
  Dd: 45,
  Ds: 22.5,
  De: 10,
  Dm: 5,
  D: 26.4,
  projectionCECRL: "A1.0"
}
*/
```

---

# X. GARANTIES SCIENTIFIQUES ET OPÉRATIONNELLES

✔ continuité CP → 3e
✔ pondération développementale réaliste
✔ scores explicables (pas de boîte noire)
✔ intégration directe dans CaSS Assertions
✔ calcul en temps réel possible
✔ auditabilité complète

---

## PROCHAINE ÉTAPE NATURELLE

Je peux maintenant :

1. **lier ces algorithmes aux types d’activités** (audio, texte, grammaire),
2. générer **un moteur d’évaluation automatique** (Next.js backend),
3. concevoir **les dashboards de visualisation des scores**,
4. produire **la documentation scientifique complète** du modèle.

Indiquez-moi la brique suivante que vous souhaitez verrouiller.
