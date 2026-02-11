Nous allons maintenant définir **les règles de décision pédagogique dérivables du score CEREDIS**, en respectant strictement :

* la factorisation non compensatoire,
* la structure en espace produit ordonné,
* l’absence de réduction scalaire,
* la séparation score → décision (projection normative).

---

# 1. Principe général

Le score CEREDIS :

[
S = (D, D_d, D_s, D_e, D_m)
]

n’est **pas** une décision.

Une décision pédagogique est une **fonction partielle** :

[
\Pi :
\mathcal{S}
\longrightarrow
\mathcal{A}
]

où ( \mathcal{A} ) est l’ensemble des actions pédagogiques possibles.

---

# 2. Typologie des décisions pédagogiques

On distingue quatre grandes familles :

1. 🔹 Validation / Certification
2. 🔹 Progression (déverrouillage)
3. 🔹 Remédiation ciblée
4. 🔹 Adaptation dynamique (court terme)

Chaque famille correspond à une projection différente de l’espace score.

---

# 3. Règles de validation (certification)

## 3.1. Principe

La certification repose exclusivement sur :

[
(D_d, D_s)
]

Jamais sur De ou Dm.

---

## 3.2. Règle formelle

Soit un seuil ( \sigma \subset \mathcal{D}_d ).

[
\text{Certifié}(a)
\iff
\forall d \in \sigma:
\begin{cases}
d \in D_d(a) \
Ds(a, d) \succeq consolidé
\end{cases}
]

---

## 3.3. Interdictions

❌ De optimal ne compense pas une stabilité faible
❌ Dm stratégique ne compense pas un niveau absent

---

# 4. Règles de progression (déverrouillage)

La progression repose sur :

[
(D_d, D_s)
]

mais avec un seuil plus faible.

---

## 4.1. Règle typique

[
\text{Déverrouiller}(d_{suivant})
\iff
\exists d \preceq d_{suivant}
\text{ tel que }
\begin{cases}
d \in D_d \
Ds(d) \succeq émergent
\end{cases}
]

---

# 5. Règles de remédiation

La remédiation repose sur :

[
(D_s, D_e, D_m)
]

---

## 5.1. Cas 1 — Fragilité

[
Ds(d) = fragile
\Rightarrow
\text{Remédiation de consolidation}
]

---

## 5.2. Cas 2 — Surcharge

[
De(d) = surcharge
\Rightarrow
\text{Simplification de tâche}
]

---

## 5.3. Cas 3 — Régulation faible

[
Dm(d) = non\text{-}régulé
\Rightarrow
\text{Activité guidée / métacognitive}
]

---

# 6. Règles d’adaptation dynamique

Ces règles opèrent en temps réel.

---

## 6.1. Réduction du coût

[
De(d) = surcharge
\land
Dm(d) \prec adaptatif
\Rightarrow
\text{ajout d’indice progressif}
]

---

## 6.2. Accélération

[
Ds(d) = robuste
\land
De(d) = optimal
\land
Dm(d) \succeq adaptatif
\Rightarrow
\text{augmentation de complexité}
]

---

# 7. Règles d’alerte pédagogique

Certaines configurations signalent un risque.

---

## 7.1. Ascension instable

[
Dd(d_2)
\land
Ds(d_2) = fragile
\land
Ds(d_1) = robuste
]

Signal : progression prématurée.

---

## 7.2. Illusion de compétence

[
Dd(d)
\land
Ds(d) = émergent
\land
De(d) = surcharge
]

Signal : compétence fragile masquée par effort.

---

# 8. Forme générale des règles

Chaque règle est une formule logique :

[
R_i :
\mathcal{S}
\to
{\text{true}, \text{false}}
]

Les règles ne sont pas hiérarchisées par défaut.
Un moteur de décision peut :

* appliquer une priorité explicite,
* ou retourner un ensemble d’actions candidates.

---

# 9. Structure modulaire recommandée

```ts
interface DecisionRule {
  id: string;
  applies(score: CEREDISScore): boolean;
  action: PedagogicalAction;
  priority: number;
}
```

---

# 10. Propriété fondamentale

Le score est descriptif.
La décision est normative.

Le scoring-engine ne décide jamais.

---

# 11. Conséquence mathématique

L’espace des décisions est une **projection partielle de l’espace produit** :

[
\Pi_{adaptation} :
\mathcal{S}
\to
\mathcal{A}_{adapt}
]

[
\Pi_{certification} :
\mathcal{S}
\to
\mathcal{A}_{cert}
]

Chaque projection oublie volontairement certaines dimensions.

---

# 12. Garantie de cohérence

Grâce au théorème de factorisation :

* aucune règle ne peut nécessiter une agrégation scalaire,
* aucune dimension n’est implicite,
* toute décision est traçable jusqu’à la surface d’évaluation.

---

# 13. Résultat

Nous avons maintenant :

* modèle mathématique,
* espace géométrique,
* algorithme global,
* règles décisionnelles formelles.

Le système CEREDIS est désormais complet au niveau théorique.

---

