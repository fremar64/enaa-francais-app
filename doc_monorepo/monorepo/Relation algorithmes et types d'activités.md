Très bien. Nous allons **lier explicitement les algorithmes de calcul des scores** aux **types d’activités pédagogiques**, de façon :

* **systématique** (industrialisation),
* **développementale (CP → 3e)**,
* **directement implémentable en TypeScript / Next.js**,
* **compatible CaSS (Evidence → Assertion → Score)**,
* **théoriquement fondée** (oral ↔ écrit, distinctif ↔ significatif ↔ discursif ↔ métacognitif).

Je structure la réponse en **6 blocs**, du principe général au code.

---

# I. PRINCIPE D’ARCHITECTURE (CHAÎNE DE VALEUR)

Chaque activité pédagogique suit **exactement le même pipeline** :

```
ACTIVITÉ
  ↓
CAPTURE D’INDICATEURS BRUTS
  ↓
NORMALISATION (0–100)
  ↓
AGRÉGATION PAR COMPOSANTE (Dd, Ds, De, Dm)
  ↓
CALCUL SCORE GLOBAL D
  ↓
ASSERTION CaSS (+ projection CECRL)
```

👉 La **différence entre activités** ne porte **pas sur l’algorithme**,
mais sur **les indicateurs qu’elles alimentent**.

---

# II. TYPOLOGIE DES ACTIVITÉS (CANONIQUE CEREDIS)

Nous définissons **3 familles d’activités**, couvrant tout le curriculum :

| Famille       | Exemple                    | Rôle cognitif        |
| ------------- | -------------------------- | -------------------- |
| **Audio**     | écoute, lecture orale      | oral, décodage       |
| **Texte**     | lecture, production écrite | sens, discours       |
| **Grammaire** | flexion, syntaxe           | système de la langue |

Ces familles alimentent **différemment** les 4 composantes du score.

---

# III. MATRICE ACTIVITÉS → COMPOSANTES DU SCORE

### Table de vérité (clé du système)

| Activité           | D_d | D_s | D_e | D_m |
| ------------------ | --- | --- | --- | --- |
| Audio (CP–CE1)     | ⭐⭐⭐ | ⭐   | ⭐   | ⭐   |
| Audio (CM–Collège) | ⭐⭐  | ⭐⭐  | ⭐⭐  | ⭐   |
| Lecture texte      | ⭐   | ⭐⭐⭐ | ⭐⭐  | ⭐   |
| Production écrite  | ⭐   | ⭐⭐  | ⭐⭐⭐ | ⭐⭐  |
| Grammaire / morpho | ⭐⭐  | ⭐⭐  | ⭐   | ⭐   |
| Activité réflexive | –   | –   | –   | ⭐⭐⭐ |

👉 ⭐ = poids relatif dans les indicateurs bruts.

---

# IV. MODÉLISATION DES INDICATEURS PAR TYPE D’ACTIVITÉ

## 1️⃣ Activités AUDIO (écoute, lecture orale)

### Indicateurs bruts capturés

```ts
interface AudioIndicators {
  phonemeAccuracy: number;    // % phonèmes corrects
  readingSpeed: number;       // mots/minute
  prosodyScore: number;       // 0–1
  comprehensionScore: number; // % réponses correctes
  selfCorrectionRate: number; // % corrections spontanées
}
```

### Mapping vers les composantes

```ts
function mapAudioToRawIndicators(a: AudioIndicators): RawIndicators {
  return {
    distinctif: [
      normalize(a.phonemeAccuracy, 0, 100),
      normalize(a.readingSpeed, 20, 120)
    ],
    significatif: [
      normalize(a.comprehensionScore, 0, 100)
    ],
    enonciatif: [
      normalize(a.prosodyScore, 0, 1) * 100
    ],
    metacognitif: [
      normalize(a.selfCorrectionRate, 0, 1) * 100
    ]
  };
}
```

---

## 2️⃣ Activités TEXTE (lecture / production écrite)

### Indicateurs bruts

```ts
interface TextIndicators {
  lexicalCoverage: number;      // % mots compris
  inferenceScore: number;       // % implicite compris
  coherenceScore: number;       // 0–1
  syntacticAccuracy: number;    // %
  revisionActions: number;      // nb révisions
}
```

### Mapping

```ts
function mapTextToRawIndicators(t: TextIndicators): RawIndicators {
  return {
    distinctif: [
      normalize(t.syntacticAccuracy, 0, 100)
    ],
    significatif: [
      normalize(t.lexicalCoverage, 0, 100),
      normalize(t.inferenceScore, 0, 100)
    ],
    enonciatif: [
      normalize(t.coherenceScore, 0, 1) * 100
    ],
    metacognitif: [
      normalize(t.revisionActions, 0, 10)
    ]
  };
}
```

---

## 3️⃣ Activités GRAMMAIRE / MORPHOSYNTAXE

### Indicateurs bruts

```ts
interface GrammarIndicators {
  ruleAccuracy: number;        // %
  errorStability: number;      // % erreurs répétées
  transferScore: number;       // % réinvestissement
  explanationScore: number;    // 0–1
}
```

### Mapping

```ts
function mapGrammarToRawIndicators(g: GrammarIndicators): RawIndicators {
  return {
    distinctif: [
      normalize(g.ruleAccuracy, 0, 100)
    ],
    significatif: [
      normalize(1 - g.errorStability, 0, 1) * 100
    ],
    enonciatif: [
      normalize(g.transferScore, 0, 100)
    ],
    metacognitif: [
      normalize(g.explanationScore, 0, 1) * 100
    ]
  };
}
```

---

# V. PIPELINE UNIFIÉ (ACTIVITÉ → SCORE)

### Fonction générique

```ts
type ActivityType = "audio" | "text" | "grammar";

function evaluateActivity(
  type: ActivityType,
  data: any,
  age: AgeNiveau
): GlobalScore {

  let raw: RawIndicators;

  switch (type) {
    case "audio":
      raw = mapAudioToRawIndicators(data);
      break;
    case "text":
      raw = mapTextToRawIndicators(data);
      break;
    case "grammar":
      raw = mapGrammarToRawIndicators(data);
      break;
    default:
      throw new Error("Unknown activity type");
  }

  return evaluateLearner(raw, age);
}
```

---

# VI. LIEN DIRECT AVEC CaSS (ASSERTION AUTOMATIQUE)

Après calcul, vous générez **automatiquement** une Assertion CaSS :

```ts
function generateCassAssertion(
  learnerId: string,
  competencyUri: string,
  score: GlobalScore,
  age: AgeNiveau,
  evidenceUris: string[]
) {
  return {
    "@type": "Assertion",
    "agent": learnerId,
    "competency": competencyUri,
    "confidence": score.D / 100,
    "ceredis:ageNiveau": age,
    "ceredis:scoreDistinctif": score.Dd,
    "ceredis:scoreSignificatif": score.Ds,
    "ceredis:scoreEnonciatif": score.De,
    "ceredis:scoreMetacognitif": score.Dm,
    "ceredis:scoreGlobal": score.D,
    "ceredis:projectionCECRL": score.projectionCECRL,
    "evidence": evidenceUris
  };
}
```

---

# VII. CE QUE VOUS AVEZ DÉSORMAIS

✔ un **moteur d’évaluation unifié**
✔ une **liaison claire activité ↔ cognition**
✔ une **instrumentation complète oral / écrit / système**
✔ une intégration **native CaSS**
✔ une industrialisation possible à grande échelle
✔ une cohérence scientifique forte (développement du langage)

---

## PROCHAINE ÉTAPE NATURELLE

Je peux maintenant :

1. concevoir le **moteur backend Next.js** (API routes),
2. définir les **schémas de stockage (Supabase / Prisma)**,
3. créer les **dashboards apprenant / enseignant**,
4. rédiger le **document scientifique de référence** (méthodologie complète).

Indiquez-moi la prochaine brique à verrouiller.
