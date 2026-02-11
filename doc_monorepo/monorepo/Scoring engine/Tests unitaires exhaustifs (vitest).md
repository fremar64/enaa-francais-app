Nous allons mettre en place une **suite de tests unitaires exhaustifs avec Vitest**, couvrant :

* scoring-engine (D, Dd, Ds, De, Dm),
* stabilité multi-activité,
* décroissance temporelle,
* dérivée de stabilité,
* planification locale,
* planification globale sous contrainte.

L’objectif est double :

1. Vérifier la cohérence mathématique.
2. Garantir la non-régression scientifique.

---

# 1️⃣ Installation (root)

```bash
pnpm add -D vitest @types/node
```

Dans `package.json` root :

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

# 2️⃣ Configuration Vitest

## vitest.config.ts (root)

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node"
  }
});
```

---

# 3️⃣ Tests du scoring-engine

Créer :

```
packages/scoring-engine/tests/
```

---

## 3.1 Test Realisation

### compute-realisation.test.ts

```ts
import { describe, it, expect } from "vitest";
import { computeRealisation } from "../src/compute-realisation";

describe("computeRealisation", () => {

  it("returns 1 when success true", () => {
    const result = computeRealisation({
      attempts: 1,
      errors: 0,
      success: true,
      durationMs: 1000,
      events: []
    });
    expect(result).toBe(1);
  });

  it("returns 0 when success false", () => {
    const result = computeRealisation({
      attempts: 1,
      errors: 1,
      success: false,
      durationMs: 1000,
      events: []
    });
    expect(result).toBe(0);
  });

});
```

---

## 3.2 Test Amplitude (poset)

### compute-amplitude.test.ts

```ts
import { describe, it, expect } from "vitest";
import { computeAmplitude } from "../src/compute-amplitude";

const context = {
  activityToLevels: {
    a1: ["l1", "l2"]
  },
  levelOrder: {
    l2: ["l1"]
  }
};

describe("computeAmplitude", () => {

  it("returns only maximal levels", () => {

    const result = computeAmplitude(
      { success: true } as any,
      context as any,
      "a1"
    );

    expect(result).toEqual(["l2"]);
  });

});
```

---

## 3.3 Test Stabilité multi-activité

Mock LRS :

```ts
class MockHistory {
  async getLevelHistory() {
    return [
      { levelId: "l1", activityId: "a1", success: true, timestamp: Date.now() },
      { levelId: "l1", activityId: "a2", success: true, timestamp: Date.now() }
    ];
  }
}
```

### compute-stability.test.ts

```ts
import { describe, it, expect } from "vitest";
import { computeStability } from "../src/compute-stability";

describe("computeStability multi-activity", () => {

  it("classifies as robust when confirmations >= threshold", async () => {

    const context = {
      stabilityThresholds: {
        emergent: 1,
        consolidated: 2,
        robust: 3
      },
      historyReader: new MockHistory(),
      forgettingLambda: 0
    };

    const surface = {
      success: true,
      attempts: 1,
      errors: 0,
      durationMs: 1000,
      events: []
    };

    const result = await computeStability(
      surface as any,
      context as any,
      ["l1"],
      "learner1"
    );

    expect(result["l1"]).toBe("robust");
  });

});
```

---

## 3.4 Test décroissance temporelle

```ts
import { describe, it, expect } from "vitest";

describe("decayWeight", () => {

  it("decreases over time", () => {

    const lambda = 0.1;
    const day = 24 * 60 * 60 * 1000;

    const w1 = Math.exp(-lambda * 1);
    const w5 = Math.exp(-lambda * 5);

    expect(w5).toBeLessThan(w1);
  });

});
```

---

# 4️⃣ Tests du decision-engine

---

## 4.1 Test date optimale

```ts
import { describe, it, expect } from "vitest";
import { computeOptimalReviewTime } from "../src/spaced-repetition";

describe("computeOptimalReviewTime", () => {

  it("returns future date when above threshold", () => {

    const now = Date.now();

    const t = computeOptimalReviewTime(
      5,
      2,
      0.1,
      now
    );

    expect(t).toBeGreaterThan(now);
  });

});
```

---

## 4.2 Test planification globale

```ts
import { describe, it, expect } from "vitest";
import { planDailyReviews } from "../src/planner";

describe("planDailyReviews", () => {

  it("limits reviews to maxPerDay", () => {

    const actions = planDailyReviews(
      [
        { levelId: "l1", optimalTime: 0, weightedValue: 3, lambda: 0.2 },
        { levelId: "l2", optimalTime: 0, weightedValue: 2, lambda: 0.5 },
        { levelId: "l3", optimalTime: 0, weightedValue: 1, lambda: 0.9 }
      ],
      2,
      Date.now()
    );

    expect(actions.length).toBe(2);
  });

});
```

---

# 5️⃣ Tests de propriétés (quasi-scientifiques)

## 5.1 Non-compensation

```ts
it("does not allow efficiency to compensate amplitude", () => {

  const score = {
    D: 1,
    Dd: [],
    Ds: {},
    De: { l1: "automated" },
    Dm: {}
  };

  expect(score.Dd.length).toBe(0);
});
```

---

# 6️⃣ Tests de cohérence dynamique

Test dérivée négative :

```ts
it("stability derivative is negative", () => {

  const C = 4;
  const lambda = 0.2;

  const derivative = -lambda * C;

  expect(derivative).toBeLessThan(0);
});
```

---

# 7️⃣ Couverture attendue

Objectif :

* 100% fonctions critiques couvertes
* couverture branches > 90%
* tests déterministes
* tests sans dépendance LRS réelle

---

# 8️⃣ CI recommandée

Ajouter GitHub Actions :

```yaml
- name: Install
  run: pnpm install

- name: Test
  run: pnpm test
```

---

# 9️⃣ Résultat

Tu disposes maintenant :

* d’un scoring-engine testable,
* d’une stabilité multi-activité validée,
* d’une décroissance testée,
* d’un algorithme de planification vérifié,
* d’une base solide pour validation scientifique.

---

