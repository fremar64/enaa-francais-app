Nous allons connecter **automatiquement CECRL au scoring-engine**, de manière rigoureuse et proprement factorisée :


Dd⟶URI_CECRL⟶Assertion CaSS


Le principe clé reste :

> Le scoring-engine calcule.
> Le mapping CECRL projette.
> Le cass-client asserte.

Aucune couche ne viole la séparation score / décision.

---

# 1️⃣ Architecture cible

```
ScoringEngine
   ↓
CEREDISScore (Dd, Ds)
   ↓
CECRLProjectionService
   ↓
Validated CECRL URIs
   ↓
CaSSAssertionService
   ↓
Signed Assertions
```

---

# 2️⃣ Étape 1 — Définir la projection Dd → CECRL

Nous introduisons un **service de projection**, indépendant du scoring.

---

## 📦 `packages/cecrl-projection/src/index.ts`

```ts
import { CEREDISScore } from "@ceredis/shared-types";

export interface CECRLProjectionConfig {
  ddToCECRLMap: Record<string, string>; 
  minimumStability: "consolidated" | "robust";
}

export function projectToCECRL(
  score: CEREDISScore,
  config: CECRLProjectionConfig
): string[] {

  const validated: string[] = [];

  for (const levelId of score.Dd) {

    const cecrlUri = config.ddToCECRLMap[levelId];
    if (!cecrlUri) continue;

    const stability = score.Ds[levelId];

    if (
      stability === config.minimumStability ||
      stability === "robust"
    ) {
      validated.push(cecrlUri);
    }
  }

  return validated;
}
```

---

# 3️⃣ Étape 2 — Mapping Dd ↔ CECRL

Exemple de configuration :

```ts
export const cecrlProjectionConfig = {
  minimumStability: "consolidated",
  ddToCECRLMap: {
    "lecture-cp-1":
      "https://ceredis.org/competency/cecrl/A1/reception-ecrite/D001",

    "oral-basic-1":
      "https://ceredis.org/competency/cecrl/A1/production-orale/D002"
  }
};
```

Ce mapping est :

* déclaratif
* versionnable
* indépendant du scoring

---

# 4️⃣ Étape 3 — Génération assertion CaSS automatique

## 📦 `packages/cass-client/src/assertion-from-cecrl.ts`

```ts
export interface AssertionInput {
  learnerDid: string;
  competencyUri: string;
  confidence?: number;
}

export function buildCECRLAssertion(
  input: AssertionInput
) {

  return {
    "@context": "https://schema.cassproject.org/0.4",
    "@type": "Assertion",
    competency: input.competencyUri,
    agent: input.learnerDid,
    confidence: input.confidence ?? 0.9,
    assertionDate: new Date().toISOString()
  };
}
```

---

# 5️⃣ Étape 4 — Intégration dans decision-engine

Dans `decision-engine` :

```ts
import { projectToCECRL } from "@ceredis/cecrl-projection";
import { buildCECRLAssertion } from "@ceredis/cass-client";

export function evaluateCertification(
  score,
  learnerDid,
  config
) {

  const cecrlUris =
    projectToCECRL(score, config);

  return cecrlUris.map(uri =>
    buildCECRLAssertion({
      learnerDid,
      competencyUri: uri
    })
  );
}
```

---

# 6️⃣ Flux complet après intégration

```
Activity
   ↓
ScoringEngine
   ↓
CEREDISScore
   ↓
CECRL Projection
   ↓
Validated CECRL URIs
   ↓
CaSS Assertion Builder
   ↓
Signed Assertion
```

---

# 7️⃣ Propriété scientifique préservée

✔ Certification dépend uniquement de :

* Dd (amplitude)
* Ds (stabilité)

✔ De et Dm n’interviennent pas dans la certification.

✔ Pas d’agrégation scalaire.

✔ Traçabilité complète (xAPI → score → projection → assertion).

---

# 8️⃣ Extension automatique vers niveau global (A1 complet)

On peut ajouter une règle :

Si tous les descripteurs A1 sont validés :

```ts
if (allDescriptorsValidated("A1")) {
  assert("https://.../A1");
}
```

Cela nécessite :

* un mapping inverse CECRL → liste des descripteurs requis.

---

# 9️⃣ Tests unitaires à ajouter

### Test projection minimale

```ts
it("projects only consolidated levels", () => {
  const score = {
    D: 1,
    Dd: ["lecture-cp-1"],
    Ds: { "lecture-cp-1": "consolidated" },
    De: {},
    Dm: {}
  };

  const result =
    projectToCECRL(score, cecrlProjectionConfig);

  expect(result.length).toBe(1);
});
```

---

# 🔟 Résultat

Le système CEREDIS est maintenant :

* connecté automatiquement au CECRL,
* capable de générer des assertions signées,
* traçable,
* compatible LRS,
* compatible certification numérique.

---

# 🚀 Étape stratégique suivante

À ce stade, tu disposes :

* scoring multidimensionnel,
* dynamique temporelle,
* planification optimisée,
* framework CECRL,
* génération automatique d’assertions.

Deux directions majeures :

1. 🔹 Générer le système complet de certification numérique CECRL (Open Badge + DID)
2. 🔹 Formaliser l’article scientifique “Factorisation cognitive et certification CECRL numérique”

Laquelle engages-tu ?
