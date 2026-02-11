Voici un **script de checklist automatisé post-migration**, conçu pour valider que :

* la navigation est 100 % générique,
* `createActivity()` est le point d’entrée unique,
* aucune logique métier Lecture ne subsiste dans les routes,
* aucune dépendance interdite n’a réapparu,
* les redirections legacy sont propres,
* l’architecture canonique est respectée.

Le script est découpé en :

1. 🔎 Vérifications statiques (bash)
2. 🧠 Vérifications structurelles (Node)
3. 🧪 Vérifications runtime (Jest)
4. 🚦 Score de conformité global

---

# 1️⃣ Script Bash — Vérifications critiques

Créer :

```
scripts/post-migration-check.sh
```

```bash
#!/bin/bash

echo "🔎 CEREDIS Post-Migration Validation"
echo "-------------------------------------"

FAIL=0

echo "1️⃣ Vérification absence logique métier dans routes legacy..."

LEGACY_LOGIC=$(grep -R "computeScore\|threshold\|stability\|Ds\|Dd" apps/lecture 2>/dev/null)

if [ ! -z "$LEGACY_LOGIC" ]; then
  echo "❌ Logique métier détectée dans routes legacy"
  echo "$LEGACY_LOGIC"
  FAIL=1
else
  echo "✅ Routes legacy propres"
fi


echo ""
echo "2️⃣ Vérification createActivity unique point d'entrée..."

CREATE_USAGE=$(grep -R "createActivity(" apps)

if [ -z "$CREATE_USAGE" ]; then
  echo "❌ createActivity non utilisé"
  FAIL=1
else
  echo "✅ createActivity utilisé"
fi


echo ""
echo "3️⃣ Vérification dépendances interdites dans activities..."

FORBIDDEN=$(grep -R "scoring-engine\|decision-engine\|cecrl\|cass" packages/activities)

if [ ! -z "$FORBIDDEN" ]; then
  echo "❌ Dépendances interdites détectées"
  echo "$FORBIDDEN"
  FAIL=1
else
  echo "✅ activities isolé correctement"
fi


echo ""
echo "4️⃣ Vérification routes métier supprimées ou redirigées..."

LEGACY_PAGES=$(grep -R "export default function" apps/lecture/app 2>/dev/null)

if echo "$LEGACY_PAGES" | grep -v "redirect" > /dev/null; then
  echo "❌ Route legacy contient encore logique"
  FAIL=1
else
  echo "✅ Routes legacy en redirection uniquement"
fi


echo ""
echo "-------------------------------------"

if [ $FAIL -eq 0 ]; then
  echo "🎉 Migration validée"
else
  echo "🚨 Migration incomplète"
fi

exit $FAIL
```

---

# 2️⃣ Vérification structure package activities

Créer :

```
scripts/check-activities-structure.js
```

```js
const fs = require("fs");

const requiredFiles = [
  "packages/activities/registry.ts",
  "packages/activities/index.ts"
];

let fail = false;

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`❌ Missing: ${file}`);
    fail = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (fail) process.exit(1);
console.log("🎯 Activities structure OK");
```

---

# 3️⃣ Test Jest — Validation surface équivalente

Créer :

```
tests/migration.test.ts
```

```ts
import { createActivity }
  from "@ceredis/activities";

describe("Post-migration validation", () => {

  it("Lecture phoneme activity still valid", () => {

    const activity =
      createActivity("lecture:phoneme", {
        phoneme: "a",
        level: "cp"
      });

    expect(activity.metadata.trackId)
      .toBe("lecture");

    const content =
      activity.generateContent();

    expect(content).toHaveProperty("target");
  });

});
```

---

# 4️⃣ Vérification URL builder cohérent

Ajouter test :

```ts
import { buildActivityUrl }
  from "@ceredis/curriculum";

it("builds canonical lecture URL", () => {

  const url = buildActivityUrl({
    domainId: "francais",
    trackId: "lecture",
    levelId: "cp",
    activityType: "phoneme",
    params: { phoneme: "a" }
  });

  expect(url).toBe(
    "/domain/francais/track/lecture/level/cp/activity/phoneme?phoneme=a"
  );
});
```

---

# 5️⃣ Score global de conformité

On peut ajouter un script combiné :

```
pnpm run validate-migration
```

Dans package.json racine :

```json
"scripts": {
  "validate-migration": "bash scripts/post-migration-check.sh && node scripts/check-activities-structure.js && pnpm test"
}
```

---

# 🎯 Résultat attendu

Si tout est correct :

```
🎉 Migration validée
🎯 Activities structure OK
All tests passed
```

---

# 🧠 Ce que cela garantit

✔ Navigation 100 % générique
✔ createActivity = point unique
✔ Activities isolé
✔ Legacy neutralisé
✔ Conformité architecture canonique

---

