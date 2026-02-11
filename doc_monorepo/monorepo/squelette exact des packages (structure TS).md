Je te propose ci-dessous un **squelette exact, exploitable immédiatement en monorepo TypeScript (pnpm workspaces + project references)**, aligné strictement avec :

* la factorisation CEREDIS,
* la séparation des couches,
* l’absence de dépendances circulaires,
* la testabilité scientifique.

Je fournis :

1. Structure des dossiers
2. `package.json` minimal par package
3. `tsconfig.json` (project references)
4. Fichiers `index.ts` et types principaux
5. Signatures des API publiques

---

# 0. Structure globale du monorepo

```
ceredis/
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ packages/
│  ├─ shared-types/
│  ├─ activity-contract/
│  ├─ curriculum/
│  ├─ activity-engine/
│  ├─ scoring-engine/
│  ├─ decision-engine/
│  ├─ xapi-encoder/
│  ├─ cass-client/
│  └─ analytics-core/
└─ apps/
   ├─ web/
   ├─ lecture/
   └─ admin/
```

---

# 1. Root configuration

## pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

---

## tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "declaration": true,
    "composite": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@ceredis/*": ["packages/*/src"]
    }
  }
}
```

---

# 2. 📦 shared-types

## Structure

```
shared-types/
  src/
    index.ts
    ids.ts
    enums.ts
    score.ts
  package.json
  tsconfig.json
```

## src/enums.ts

```ts
export type StabilityLevel =
  | "fragile"
  | "emergent"
  | "consolidated"
  | "robust";

export type EfficiencyLevel =
  | "overload"
  | "costly"
  | "optimal"
  | "automated";

export type MetacognitiveLevel =
  | "non_regulated"
  | "reactive"
  | "adaptive"
  | "strategic";
```

## src/score.ts

```ts
export interface CEREDISScore {
  D: 0 | 1;
  Dd: string[]; // DevelopmentLevelId[]
  Ds: Record<string, StabilityLevel>;
  De: Record<string, EfficiencyLevel>;
  Dm: Record<string, MetacognitiveLevel>;
}
```

---

# 3. 📦 activity-contract

```
activity-contract/
  src/
    index.ts
    metadata.ts
    evaluation-surface.ts
    events.ts
  package.json
  tsconfig.json
```

## evaluation-surface.ts

```ts
export interface ActivityEvaluationSurface {
  attempts: number;
  errors: number;
  success: boolean;
  durationMs: number;
  events: PedagogicalEvent[];
}
```

## events.ts

```ts
export type PedagogicalEvent =
  | { type: "attempt"; timestamp: number }
  | { type: "success"; timestamp: number }
  | { type: "error"; code: string; timestamp: number }
  | { type: "hint-used"; level: number; timestamp: number }
  | { type: "abandon"; timestamp: number };
```

---

# 4. 📦 curriculum

```
curriculum/
  src/
    index.ts
    poset.ts
    thresholds.ts
    cost-profiles.ts
    regulation-patterns.ts
  package.json
  tsconfig.json
```

## poset.ts

```ts
export interface DevelopmentLevel {
  id: string;
  parents: string[]; // poset structure
}
```

## cost-profiles.ts

```ts
export interface CostProfile {
  levelId: string;
  expectedDuration: number;
  expectedAttempts: number;
  expectedErrors: number;
}
```

---

# 5. 📦 activity-engine

```
activity-engine/
  src/
    index.ts
    runner.ts
    state-machine.ts
  package.json
  tsconfig.json
```

## runner.ts

```ts
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";

export class ActivityRunner {
  private surface: ActivityEvaluationSurface;

  constructor() {
    this.surface = {
      attempts: 0,
      errors: 0,
      success: false,
      durationMs: 0,
      events: []
    };
  }

  getSurface(): ActivityEvaluationSurface {
    return this.surface;
  }
}
```

---

# 6. 📦 scoring-engine

```
scoring-engine/
  src/
    index.ts
    compute-realisation.ts
    compute-amplitude.ts
    compute-stability.ts
    compute-efficiency.ts
    compute-regulation.ts
  package.json
  tsconfig.json
```

## index.ts

```ts
import { CEREDISScore } from "@ceredis/shared-types";
import { ActivityEvaluationSurface } from "@ceredis/activity-contract";

export function computeScore(
  surface: ActivityEvaluationSurface
): CEREDISScore {
  const D = computeRealisation(surface);
  const Dd = computeAmplitude(surface);
  const Ds = computeStability(surface, Dd);
  const De = computeEfficiency(surface, Dd);
  const Dm = computeRegulation(surface, Dd);

  return { D, Dd, Ds, De, Dm };
}
```

Chaque fonction dans son fichier dédié.

---

# 7. 📦 decision-engine

```
decision-engine/
  src/
    index.ts
    rules/
      certification.ts
      progression.ts
      remediation.ts
      adaptation.ts
  package.json
  tsconfig.json
```

## index.ts

```ts
import { CEREDISScore } from "@ceredis/shared-types";

export interface PedagogicalAction {
  type: string;
  payload?: unknown;
}

export function evaluateDecisions(
  score: CEREDISScore
): PedagogicalAction[] {
  const actions: PedagogicalAction[] = [];

  // inject rule modules here

  return actions;
}
```

---

# 8. 📦 xapi-encoder

```
xapi-encoder/
  src/
    index.ts
    statement-builder.ts
    extensions.ts
  package.json
  tsconfig.json
```

## statement-builder.ts

```ts
import { CEREDISScore } from "@ceredis/shared-types";

export function buildStatement(
  score: CEREDISScore,
  activityId: string,
  actorEmail: string
) {
  return {
    actor: { mbox: `mailto:${actorEmail}` },
    verb: { id: "http://adlnet.gov/expapi/verbs/completed" },
    object: { id: activityId },
    result: {
      extensions: {
        dd: score.Dd,
        ds: score.Ds,
        de: score.De,
        dm: score.Dm
      }
    }
  };
}
```

---

# 9. 📦 cass-client

```
cass-client/
  src/
    index.ts
    assertion-builder.ts
    publisher.ts
  package.json
  tsconfig.json
```

## assertion-builder.ts

```ts
import { CEREDISScore } from "@ceredis/shared-types";

export function buildAssertion(score: CEREDISScore) {
  // only if stability >= consolidated
}
```

---

# 10. 📦 analytics-core

```
analytics-core/
  src/
    index.ts
    trajectory.ts
    metrics.ts
  package.json
  tsconfig.json
```

Permet reconstruction trajectoires.

---

# 11. tsconfig.json par package

Exemple (`scoring-engine/tsconfig.json`):

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "references": [
    { "path": "../shared-types" },
    { "path": "../activity-contract" },
    { "path": "../curriculum" }
  ]
}
```

---

# 12. Ordre de build

```
shared-types
activity-contract
curriculum
activity-engine
scoring-engine
decision-engine
xapi-encoder
cass-client
analytics-core
```

---

# Résultat

Tu as maintenant :

* structure exacte des dossiers,
* interfaces publiques,
* dépendances maîtrisées,
* base prête à coder,
* architecture alignée avec la formalisation mathématique.

---

