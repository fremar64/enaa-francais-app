Très bien. Je vais procéder en **deux livrables complémentaires et directement exploitables** :

1. **Traduction des indicateurs CP → 3e en schémas de données CaSS**
2. **Génération d’un schéma CaSS JSON intégrant explicitement les scores (D_d, D_s, D_e, D_m, D)**

L’objectif est que vous puissiez :

* stocker des **preuves fines**,
* calculer des **scores développementaux continus**,
* projeter ces scores vers le **CECRL**,
* tout en restant **strictement conforme à CaSS v1.3**.

---

# I. PRINCIPE DE MODÉLISATION CaSS RETENU

Dans CaSS v1.3, il est **fortement recommandé** de ne pas détourner les objets natifs (`Competency`, `Assertion`, `Evidence`), mais de :

* garder les **scores cognitifs comme propriétés étendues** (`@context` custom),
* rattacher les indicateurs à des **Assertions** (et non aux Competencies),
* conserver le **CECRL comme alignment**.

👉 Nous utilisons donc :

* `Competency` → capacité visée,
* `Assertion` → état de maîtrise,
* `Evidence` → trace observable,
* **extensions JSON-LD** → scores cognitifs.

---

# II. VOCABULAIRE ÉTENDU (CONTEXT JSON-LD CEREDIS)

Ce contexte permet d’introduire vos scores sans casser CaSS.

```json
{
  "@context": {
    "cass": "https://schema.cassproject.org/1.3/",
    "ceredis": "https://ceredis.org/schema/",
    "scoreDistinctif": "ceredis:scoreDistinctif",
    "scoreSignificatif": "ceredis:scoreSignificatif",
    "scoreEnonciatif": "ceredis:scoreEnonciatif",
    "scoreMetacognitif": "ceredis:scoreMetacognitif",
    "scoreGlobal": "ceredis:scoreGlobal",
    "projectionCECRL": "ceredis:projectionCECRL",
    "ageNiveau": "ceredis:ageNiveau"
  }
}
```

---

# III. COMPETENCY — EXEMPLE CANONIQUE (CP → COLLÈGE)

Exemple : **décodage grapho-phonémique (CP–CE1)**

```json
{
  "@context": "https://schema.cassproject.org/1.3",
  "@type": "Competency",
  "@id": "https://ceredis.org/cass/competencies/phoneme-grapheme",
  "name": "Associer correctement phonèmes et graphèmes",
  "description": "Établir et automatiser les correspondances phonèmes–graphèmes dans la lecture et l’écriture.",
  "inLanguage": "fr",
  "alignment": [
    {
      "@type": "AlignmentObject",
      "targetName": "CECRL",
      "targetFramework": "CECRL",
      "targetCode": "Pré-A1 – A1"
    }
  ]
}
```

---

# IV. ASSERTION CaSS AVEC SCORES DÉVELOPPEMENTAUX (CŒUR DU MODÈLE)

C’est **ici** que vos indicateurs CP → 3e sont réellement intégrés.

```json
{
  "@context": {
    "cass": "https://schema.cassproject.org/1.3/",
    "ceredis": "https://ceredis.org/schema/"
  },
  "@type": "Assertion",
  "@id": "https://ceredis.org/cass/assertions/assertion-0001",
  "competency": "https://ceredis.org/cass/competencies/phoneme-grapheme",
  "agent": "https://ceredis.org/agents/learner-123",
  "confidence": 0.87,

  "ceredis:ageNiveau": "CP",

  "ceredis:scoreDistinctif": 42,
  "ceredis:scoreSignificatif": 18,
  "ceredis:scoreEnonciatif": 10,
  "ceredis:scoreMetacognitif": 5,

  "ceredis:scoreGlobal": 26.4,
  "ceredis:projectionCECRL": "A1.0",

  "evidence": [
    "https://ceredis.org/cass/evidence/audio-reading-001",
    "https://ceredis.org/cass/evidence/exercise-phoneme-graph-034"
  ]
}
```

👉 Cette assertion :

* correspond **exactement** à vos indicateurs CP,
* est **traçable**, **calculable**, **auditable**.

---

# V. EVIDENCE — TRACES OBSERVABLES (MULTIMODALES)

### Exemple 1 — Lecture orale enregistrée (CP / CE1)

```json
{
  "@context": "https://schema.cassproject.org/1.3",
  "@type": "Evidence",
  "@id": "https://ceredis.org/cass/evidence/audio-reading-001",
  "name": "Lecture orale de mots réguliers",
  "description": "Enregistrement audio d’une lecture à voix haute de mots syllabiques.",
  "evidenceType": "audio",
  "url": "https://ceredis.org/storage/audio/reading001.mp3"
}
```

### Exemple 2 — Activité morphosyntaxique (CM2 / 6e)

```json
{
  "@context": "https://schema.cassproject.org/1.3",
  "@type": "Evidence",
  "@id": "https://ceredis.org/cass/evidence/syntax-exercise-212",
  "name": "Accords sujet-verbe",
  "description": "Exercice écrit sur les accords sujet-verbe en contexte narratif.",
  "evidenceType": "writtenResponse"
}
```

---

# VI. SCHÉMA GLOBAL — ASSERTION DÉVELOPPEMENTALE (ABSTRAIT)

Voici le **pattern générique** que vous allez réutiliser pour **tous les niveaux CP → 3e**.

```json
{
  "@type": "Assertion",
  "competency": "<URI compétence>",
  "agent": "<URI apprenant>",
  "ceredis:ageNiveau": "CP | CE1 | CE2 | CM1 | CM2 | 6e | 5e | 4e | 3e",

  "ceredis:scoreDistinctif": "<0-100>",
  "ceredis:scoreSignificatif": "<0-100>",
  "ceredis:scoreEnonciatif": "<0-100>",
  "ceredis:scoreMetacognitif": "<0-100>",

  "ceredis:scoreGlobal": "<float>",
  "ceredis:projectionCECRL": "Pré-A1 | A1.1 | A2 | B1",

  "evidence": ["<URI evidence>"]
}
```

---

# VII. CE QUE CE SCHÉMA VOUS PERMET IMMÉDIATEMENT

✔ instrumenter **finement le développement CP → 3e**
✔ conserver une **compatibilité CaSS stricte**
✔ intégrer des **scores continus** sans casser le CECRL
✔ produire des **tableaux de bord développementaux**
✔ justifier scientifiquement vos évaluations
✔ auditer facilement le dispositif

---

## PROCHAINE BRIQUE (LOGIQUE)

Je peux maintenant :

1. définir **les algorithmes exacts de calcul des scores** (pseudo-code / TypeScript),
2. générer un **jeu de données de test CP → 3e**,
3. concevoir le **dashboard apprenant / enseignant**,
4. produire le **document de conformité scientifique et institutionnelle**.

Indiquez-moi la prochaine étape que vous souhaitez engager.
