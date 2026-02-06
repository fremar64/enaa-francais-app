Voici une **section méthodologique expérimentale complète**, rédigée selon les standards attendus pour une **publication empirique** en sciences de l’éducation / didactique des langues / sciences cognitives.
Elle est conçue pour être **insérable telle quelle** dans l’article académique précédemment rédigé, avec un niveau de précision suffisant pour l’évaluation par des pairs.

---

## 9. Méthodologie expérimentale

### 9.1. Objectifs de l’étude

L’étude empirique vise à évaluer la **validité descriptive**, la **sensibilité développementale** et la **pertinence pédagogique** d’un modèle enrichi du **Cadre européen commun de référence pour les langues**, fondé sur une échelle numérique continue de progression des compétences langagières.

Plus précisément, l’étude poursuit quatre objectifs principaux :

1. examiner la capacité du modèle à **décrire finement le développement langagier** du CP à la Troisième ;
2. tester la **sensibilité de l’échelle continue** aux micro-progrès développementaux, notamment dans les phases d’apprentissage de l’écrit ;
3. analyser la **cohérence interne** des composantes cognitives (distinctive, significative, énonciative, métacognitive) ;
4. comparer la projection continue obtenue avec les **niveaux CECRL déclaratifs** habituellement utilisés.

---

### 9.2. Hypothèses de recherche

Les hypothèses testées sont les suivantes :

* **H1** : le score développemental continu (D) permet de détecter des progrès significatifs non observables à travers les seuls paliers CECRL.
* **H2** : les sous-scores (D_d), (D_s), (D_e) et (D_m) présentent des trajectoires différenciées selon l’âge et le niveau scolaire.
* **H3** : la pondération dynamique des composantes améliore la prédiction des performances futures en lecture et production écrite.
* **H4** : l’introduction d’indicateurs métacognitifs améliore la stabilité longitudinale des acquisitions.

---

### 9.3. Participants

#### 9.3.1. Échantillon

L’étude porte sur un échantillon de **N ≈ 240 apprenants**, répartis sur l’ensemble du continuum scolaire :

| Niveau | Effectif approximatif |
| ------ | --------------------- |
| CP     | 30                    |
| CE1    | 30                    |
| CE2    | 30                    |
| CM1    | 30                    |
| CM2    | 30                    |
| 6e     | 30                    |
| 5e     | 30                    |
| 4e     | 30                    |
| 3e     | 30                    |

Les apprenants sont scolarisés dans des établissements publics et privés, en contexte de français langue seconde. Les critères d’inclusion comprennent :

* une scolarisation régulière,
* l’absence de troubles cognitifs diagnostiqués non compensés,
* le consentement éclairé des responsables légaux.

---

### 9.4. Dispositif expérimental

#### 9.4.1. Environnement numérique

Les activités sont mises en œuvre dans un **environnement numérique d’apprentissage** développé avec Next.js, intégrant :

* des activités audio (écoute, lecture orale enregistrée),
* des activités de lecture et de production écrite,
* des activités grammaticales décontextualisées,
* des modules de verbalisation métacognitive.

L’environnement est adossé au système **CaSS (Competency and Skills System)** pour la gestion des compétences, des assertions et des données probantes.

---

#### 9.4.2. Corpus et activités

Le corpus est constitué de textes adaptés à l’âge des apprenants :

* chansons,
* contes et fables,
* poèmes,
* textes narratifs courts,
* articles de presse jeunesse.

Chaque texte est abordé selon une séquence standardisée :

1. écoute (oral),
2. lecture écrite,
3. activités de compréhension et de production,
4. formalisation linguistique,
5. réinvestissement communicatif.

---

### 9.5. Indicateurs et variables mesurées

#### 9.5.1. Variables indépendantes

* niveau scolaire,
* type d’activité (audio, texte, grammaire),
* temps d’exposition au dispositif.

#### 9.5.2. Variables dépendantes

Les variables dépendantes correspondent aux **scores cognitifs normalisés** :

* (D_d) : score distinctif (décodage, précision formelle),
* (D_s) : score significatif (construction du sens),
* (D_e) : score énonciatif (cohérence discursive),
* (D_m) : score métacognitif (verbalisation, auto-régulation),
* (D) : score global continu ([0–100]).

---

### 9.6. Procédure

L’étude adopte un **plan longitudinal** sur une durée de **6 à 9 mois**.

1. **Phase initiale (T0)**

   * passation d’un ensemble d’activités diagnostiques,
   * calcul des scores initiaux (D_d, D_s, D_e, D_m, D).

2. **Phase d’apprentissage (T1–Tn)**

   * utilisation régulière du dispositif (2 à 3 séances hebdomadaires),
   * collecte continue des données via les assertions CaSS.

3. **Phase finale (Tf)**

   * passation d’activités équivalentes à celles de T0,
   * comparaison des trajectoires individuelles et groupales.

---

### 9.7. Traitement et analyse des données

#### 9.7.1. Prétraitement

* normalisation des indicateurs sur une échelle ([0–100]),
* vérification de la complétude des données,
* exclusion des observations aberrantes.

#### 9.7.2. Analyses statistiques prévues

* analyses descriptives des trajectoires de scores,
* analyses de variance à mesures répétées (ANOVA / modèles mixtes),
* analyses de corrélation entre sous-scores,
* modélisation longitudinale (croissance individuelle),
* comparaison des projections CECRL avec les scores continus.

Les analyses sont réalisées avec des outils statistiques standards (R, Python).

---

### 9.8. Validité et fiabilité

#### 9.8.1. Validité de construit

La validité repose sur :

* l’ancrage théorique en linguistique cognitive (notamment la distinction unités distinctives / significatives issue de **Émile Benveniste**),
* la cohérence interne des composantes du score.

#### 9.8.2. Fidélité

* stabilité des mesures dans le temps,
* cohérence inter-activités,
* analyses de consistance interne (α de Cronbach lorsque pertinent).

---

### 9.9. Considérations éthiques

Le protocole respecte les principes éthiques en vigueur :

* anonymisation des données,
* consentement éclairé,
* usage exclusivement scientifique et pédagogique des résultats,
* conformité aux réglementations locales et internationales en matière de données éducatives.

---

### 9.10. Limites méthodologiques

Les principales limites identifiées concernent :

* la dépendance aux usages numériques effectifs,
* l’hétérogénéité des contextes scolaires,
* la nécessité de validations complémentaires dans d’autres contextes linguistiques.

---

### 9.11. Synthèse méthodologique

La méthodologie expérimentale proposée permet une **évaluation fine, continue et scientifiquement fondée** du développement des compétences langagières, en articulant normes internationales, linguistique cognitive et instrumentation numérique. Elle constitue une base robuste pour des recherches longitudinales à large échelle sur l’apprentissage du français langue seconde.

---

Si vous le souhaitez, je peux maintenant :

* rédiger la **section Résultats attendus et analyses exploratoires**,
* préparer la **Discussion** en lien avec les hypothèses,
* ou adapter cette méthodologie aux **exigences d’une revue précise** (AER, Revue française de pédagogie, System, etc.).
