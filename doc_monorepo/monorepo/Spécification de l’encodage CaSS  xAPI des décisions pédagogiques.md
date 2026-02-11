Nous allons spécifier **l’encodage CaSS / xAPI du score CEREDIS et des décisions pédagogiques**, de manière :

* conforme au théorème de factorisation,
* compatible LRS,
* compatible CaSS (compétences signées),
* non réductrice (pas de score scalaire).

Nous distinguons clairement :

1. Encodage des **observations (xAPI)**
2. Encodage des **dimensions CEREDIS (xAPI enrichi)**
3. Encodage des **assertions normatives (CaSS)**
4. Encodage des **décisions pédagogiques dérivées**

---

# 1. Principe d’architecture

Pipeline :

```
Activity
   ↓
EvaluationSurface
   ↓
ScoringEngine
   ↓
CEREDISScore
   ↓
Encodage xAPI (traces + dimensions)
   ↓
Encodage CaSS (assertions normatives signées)
```

Important :

* xAPI = couche factuelle
* CaSS = couche normative / certificative

---

# 2. Encodage xAPI des dimensions CEREDIS

## 2.1. Rappel structure xAPI

Une déclaration xAPI est :

```
Actor – Verb – Object
[Result]
[Context]
```

---

# 3. Encodage de D (réalisation)

### Verbe proposé

`completed` ou `attempted`

### Exemple

```json
{
  "actor": { "mbox": "mailto:eleve@ecole.fr" },
  "verb": { "id": "http://adlnet.gov/expapi/verbs/completed" },
  "object": { "id": "https://ceredis.org/activity/phoneme-cp-01" },
  "result": {
    "completion": true,
    "success": true
  }
}
```

---

# 4. Encodage de Dd (amplitude)

Dd n’est pas un score numérique.
On encode chaque niveau validé comme une propriété.

### Extension xAPI

```json
"result": {
  "extensions": {
    "https://ceredis.org/extensions/dd": [
      "niveau-lecture-cp-1"
    ]
  }
}
```

Chaque niveau est un URI stable.

---

# 5. Encodage de Ds (stabilité)

On encode la stabilité par niveau :

```json
"result": {
  "extensions": {
    "https://ceredis.org/extensions/ds": {
      "niveau-lecture-cp-1": "consolidated"
    }
  }
}
```

---

# 6. Encodage de De (efficience)

Même principe :

```json
"result": {
  "extensions": {
    "https://ceredis.org/extensions/de": {
      "niveau-lecture-cp-1": "optimal"
    }
  }
}
```

---

# 7. Encodage de Dm (régulation)

```json
"result": {
  "extensions": {
    "https://ceredis.org/extensions/dm": {
      "niveau-lecture-cp-1": "adaptive"
    }
  }
}
```

---

# 8. Structure xAPI complète CEREDIS

On obtient :

```json
{
  "actor": {...},
  "verb": {...},
  "object": {...},
  "result": {
    "completion": true,
    "success": true,
    "extensions": {
      "https://ceredis.org/extensions/dd": [...],
      "https://ceredis.org/extensions/ds": {...},
      "https://ceredis.org/extensions/de": {...},
      "https://ceredis.org/extensions/dm": {...}
    }
  }
}
```

Aucune agrégation scalaire.

---

# 9. Encodage CaSS (assertions normatives)

CaSS encode des assertions de compétence.

On distingue :

* xAPI = observation
* CaSS = reconnaissance signée

---

## 9.1. Assertion Dd + Ds

On ne génère une assertion CaSS que si :

[
Ds(d) \succeq consolidé
]

---

### Exemple CaSS (conceptuel)

```json
{
  "@context": "https://schema.cassproject.org/0.4",
  "@type": "Assertion",
  "competency": "https://ceredis.org/competency/lecture-cp-1",
  "agent": "did:ceredis:eleve123",
  "confidence": 0.85,
  "evidence": [
    "https://lrs.ceredis.org/statements/uuid-123"
  ],
  "assertionDate": "2026-02-11T12:00:00Z",
  "issuer": "did:ceredis:system"
}
```

---

# 10. Mapping CEREDIS → CaSS

| Dimension | Encodage                             |
| --------- | ------------------------------------ |
| D         | xAPI completion                      |
| Dd        | extension xAPI                       |
| Ds        | extension xAPI + condition assertion |
| De        | extension xAPI (jamais certificatif) |
| Dm        | extension xAPI (jamais certificatif) |

Seuls Dd + Ds peuvent produire une assertion CaSS.

---

# 11. Encodage des décisions pédagogiques

Les décisions sont aussi encodables en xAPI :

### Exemple remédiation

```json
{
  "actor": {...},
  "verb": {
    "id": "https://ceredis.org/verbs/remediation-assigned"
  },
  "object": {
    "id": "https://ceredis.org/activity/remediation-phoneme-cp-1"
  },
  "context": {
    "extensions": {
      "https://ceredis.org/context/trigger-score": {
        "ds": "fragile",
        "de": "overload"
      }
    }
  }
}
```

---

# 12. Propriété fondamentale

Le LRS conserve :

* toutes les traces,
* toutes les dimensions,
* toutes les décisions.

CaSS ne conserve que :

* les compétences validées avec stabilité suffisante.

---

# 13. Avantages de cette architecture

✔ Pas de perte d’information
✔ Pas de score unique
✔ Certification proprement dissociée
✔ Compatibilité CECRL possible
✔ Adaptation dynamique traçable

---

# 14. Architecture technique recommandée

```
packages/
  scoring-engine/
  xapi-encoder/
  cass-client/
```

* scoring-engine → produit CEREDISScore
* xapi-encoder → transforme en statement
* cass-client → génère assertion si condition remplie

---

# 15. Point critique

Il est essentiel que :

* les URI soient stables,
* les extensions xAPI soient versionnées,
* les assertions CaSS soient signées par identité racine CEREDIS.

---

Nous avons maintenant :

* modèle mathématique,
* espace produit,
* algorithme,
* règles décisionnelles,
* encodage xAPI,
* encodage CaSS.

---

