/**
 * Séance 4 : Débat - Déterminisme social vs Libre arbitre
 * 
 * Objectifs:
 * - Comprendre le déterminisme social
 * - Analyser le message de Goldman
 * - Développer son argumentation
 * - Débattre sur l'émancipation sociale
 * 
 * Durée estimée: 55 minutes
 * Niveau: B1-B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance4: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Débat : Peut-on vraiment changer de vie ?",
  description: "Analyse critique et débat sur le déterminisme social et le libre arbitre dans 'C'est ta chance'",
  ordre: 4,
  duree_estimee: 55,
  
  objectifs: [
    "Comprendre le déterminisme social",
    "Analyser la position de Goldman",
    "Développer une argumentation nuancée",
    "Débattre sur l'émancipation sociale"
  ],
  
  niveau: "B2",
  prerequis: { seances_completees: ["seance-1", "seance-2", "seance-3"] },
  actif: true,
  
  competences_ciblees: [
    { code: "PENSEE_CRITIQUE", poids: 40 },
    { code: "ARGUMENTATION", poids: 30 },
    { code: "CULTURE_SOCIOLOGIE", poids: 20 },
    { code: "PRODUCTION_ORALE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction au débat
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Une question philosophique : Peut-on changer ?",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Peut-on vraiment changer de vie ?

## 🎯 Cette séance

"C'est ta chance" pose une **question fondamentale** :

**Sommes-nous déterminés par notre origine sociale, ou pouvons-nous vraiment changer de vie ?**

Cette question oppose deux visions :
- 🔒 Le **déterminisme social** (Bourdieu) : Notre origine détermine notre destin
- 🔓 Le **libre arbitre** (Sartre) : Nous sommes libres de choisir notre vie

## 🎵 La position de Goldman

"C'est ta chance" défend l'idée que :
- ✅ Ton origine ne définit PAS ton futur
- ✅ Tu peux saisir des opportunités
- ✅ Ta volonté compte

**MAIS** : Est-ce vraiment si simple ?

## 📚 Programme

1. Le déterminisme social
2. Le libre arbitre
3. Analyse de la chanson
4. Les limites du message de Goldman
5. Débat nuancé

**Il n'y a pas de "bonne réponse"** - ce qui compte est la **qualité de votre argumentation**.

Prêt(e) à penser en profondeur ? Allons-y ! 🧠`,
        
        consignes: "Lisez cette introduction au débat.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Le déterminisme social
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Comprendre le déterminisme social",
      ordre: 2,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Le déterminisme social

## 📚 Définition

Le **déterminisme social** est l'idée que notre origine sociale (classe, famille, quartier) **détermine** en grande partie notre destin.

## 🧠 Pierre Bourdieu (1930-2002)

### La reproduction sociale

Bourdieu a montré que la société **reproduit** les inégalités :
- Les enfants d'ouvriers deviennent souvent ouvriers
- Les enfants de cadres deviennent souvent cadres
- L'école, au lieu de réduire les inégalités, les **renforce**

### L'habitus

**L'habitus** = Ensemble de dispositions acquises par notre milieu social :
- Manière de parler
- Goûts culturels
- Façon de se comporter
- Aspirations

**Exemple** : Un enfant de milieu modeste n'osera pas postuler à Sciences Po parce qu'il ne s'y sent pas "à sa place" (habitus).

### Le capital culturel

Les classes supérieures transmettent à leurs enfants :
- 📚 Des connaissances culturelles
- 🗣️ Un langage élaboré
- 🎨 Des pratiques culturelles valorisées

→ Ces enfants réussissent mieux à l'école **non par mérite**, mais par **héritage**.

## 📊 Statistiques françaises

**Mobilité sociale en France** (chiffres récents) :
- Seulement **15%** d'enfants d'ouvriers accèdent aux professions supérieures
- **65%** d'enfants de cadres deviennent cadres
- L'**ascenseur social** est en panne

## 🎵 Ce que dit le déterminisme

Les voix que combat Goldman ("Ils vont te dire...") ne sont **pas irrationnelles** :
- "C'est trop dur pour toi" → Statistiquement, c'est vrai
- "Reste à ta place" → La société pousse à la reproduction
- "Tu n'y arriveras pas" → Les chances objectives sont faibles

## ⚖️ Est-ce une fatalité ?

### Vision pessimiste
"Peu importe tes efforts, la société est plus forte que toi"

### Vision réaliste
"Il faut être conscient des obstacles structurels pour mieux les combattre"`,
        
        consignes: "Lisez attentivement ce texte sur le déterminisme social.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Quiz de compréhension
    {
      id: "ecran-3",
      type: "quiz",
      titre: "Vérifier sa compréhension",
      ordre: 3,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Quiz : Le déterminisme social`,
        consignes: "Répondez aux questions suivantes.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension :",
          questions: [
            {
              id: "q1",
              texte: "Que signifie 'déterminisme social' ?",
              options: [
                "Tout le monde peut réussir facilement",
                "Notre origine sociale détermine en grande partie notre destin",
                "La société est juste et équitable",
                "Seul le mérite compte"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! Le déterminisme social dit que notre origine influence fortement notre destin.",
                incorrect: "Le déterminisme social signifie que notre origine sociale détermine en grande partie notre destin."
              }
            },
            {
              id: "q2",
              texte: "Qu'est-ce que l'habitus selon Bourdieu ?",
              options: [
                "Une mauvaise habitude",
                "Un ensemble de dispositions acquises par notre milieu social",
                "Un diplôme universitaire",
                "Une maladie sociale"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! L'habitus est l'ensemble des dispositions sociales acquises.",
                incorrect: "L'habitus est l'ensemble de dispositions (manières de parler, goûts, comportements) acquises par notre milieu social."
              }
            },
            {
              id: "q3",
              texte: "Selon les statistiques françaises, environ quel pourcentage d'enfants d'ouvriers deviennent cadres ?",
              options: [
                "50%",
                "65%",
                "15%",
                "85%"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Exact ! Seulement environ 15% - la mobilité sociale est faible.",
                incorrect: "Seulement environ 15% d'enfants d'ouvriers accèdent aux professions supérieures."
              }
            }
          ],
          score_max: 15,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 15,
        seuil_reussite: 10,
      },
    },
    
    // ÉCRAN 4 : Le libre arbitre et Goldman
    {
      id: "ecran-4",
      type: "analyse",
      titre: "Le libre arbitre : La position de Goldman",
      ordre: 4,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Le libre arbitre et la position de Goldman

## 🔓 Le libre arbitre

### Définition
Le **libre arbitre** = Capacité de choisir librement, indépendamment des déterminismes

### Jean-Paul Sartre (1905-1980)
> "L'existence précède l'essence"

**Signification** :
- Nous ne sommes pas **définis** par notre origine
- Nous nous créons par nos **choix**
- Nous sommes **libres** et **responsables**

## 🎵 La vision de Goldman

### Ce qu'il dit :
1. **Ton origine ne te définit pas**
   - "Peu importe d'où tu viens"
   - "Peu importe ton passé"

2. **Tu as un pouvoir d'action**
   - "Prends ta chance"
   - "Vas-y, fonce"
   - "Tu as cette force en toi"

3. **Le moment présent compte**
   - "C'est maintenant"
   - "Ne la laisse pas passer"

### Le message optimiste

Goldman propose une vision **volontariste** :
- La **volonté individuelle** peut vaincre les obstacles
- Les **opportunités existent** - il faut les saisir
- Chacun a du **potentiel** en soi

## ⚖️ Optimisme vs Réalisme ?

### Critiques possibles du message de Goldman

**Critique 1** : Individualisme naïf
- Met toute la responsabilité sur l'individu
- Ignore les structures sociales
- "Si tu échoues, c'est ta faute"

**Critique 2** : Méconnaissance des obstacles
- Facile à dire pour Goldman (artiste célèbre)
- Les opportunités ne sont pas les mêmes pour tous
- Certains obstacles sont réels

**Critique 3** : Risque de culpabilisation
- "Si tu ne réussis pas, c'est que tu n'as pas assez essayé"
- Ignore les inégalités systémiques

## 💭 Position nuancée possible

**ET SI** les deux avaient raison ?

- ✅ Le déterminisme social **existe** (Bourdieu a raison)
- ✅ MAIS des marges de manœuvre **existent** aussi (Goldman a raison)
- ✅ Il faut **reconnaître** les obstacles
- ✅ TOUT EN **agissant** malgré eux

**La chanson** = Un **outil d'encouragement** utile, pas une **analyse sociologique** complète.`,
        
        consignes: "Lisez cette analyse, puis répondez aux questions.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Question de réflexion :",
          questions: [
            {
              id: "q1",
              texte: "Quelle critique pourrait-on faire au message de Goldman ?",
              options: [
                "Il est trop pessimiste",
                "Il ignore les structures sociales et met toute la responsabilité sur l'individu",
                "Il dit que personne ne peut réussir",
                "Il encourage à abandonner"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! On peut critiquer Goldman pour son individualisme qui ignore les obstacles structurels.",
                incorrect: "La critique principale est que Goldman met toute la responsabilité sur l'individu et ignore les structures sociales."
              }
            }
          ],
          score_max: 10,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 10,
        seuil_reussite: 5,
      },
    },
    
    // ÉCRAN 5 : Analyse critique
    {
      id: "ecran-5",
      type: "analyse_critique",
      titre: "Votre position : Pour ou contre Goldman ?",
      ordre: 5,
      duree_estimee: 12,
      
      contenu: {
        texte: `# Analyse critique : Votre position

## 🎯 Question centrale

**Le message de Goldman dans "C'est ta chance" est-il réaliste ou naïf ?**

## 📊 Deux positions possibles

### POSITION A : Goldman a raison (Optimiste)
**Arguments** :
1. Les exemples de réussite existent (self-made men/women)
2. Sans encouragement, personne n'essaie
3. Le déterminisme n'est pas absolu
4. La volonté individuelle compte

**Exemple** : Des personnes de milieux modestes ont réussi (sportifs, artistes, entrepreneurs)

### POSITION B : Goldman est naïf (Critique)
**Arguments** :
1. Les statistiques montrent le poids du déterminisme
2. Tout le monde n'a pas les mêmes opportunités
3. Mettre la pression sur l'individu est injuste
4. Les structures sociales sont très puissantes

**Exemple** : Pour 1 personne de milieu modeste qui réussit, 99 restent dans la même classe sociale

## ✍️ Votre analyse

Quelle est VOTRE position ? (Choisissez ou proposez une position nuancée)`,
        
        consignes: "Choisissez votre position et argumentez (80-150 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "choix_argumente",
          consigne: "Quelle est votre position sur le message de Goldman ? :",
          options: [
            "Position A : Goldman a raison - l'optimisme et la volonté comptent",
            "Position B : Goldman est naïf - il ignore le déterminisme social",
            "Position nuancée : Les deux ont raison dans une certaine mesure"
          ],
          justification_requise: true,
          nombre_mots_min: 80,
          nombre_mots_max: 150,
          criteres_evaluation: [
            "Position claire",
            "Au moins 2-3 arguments développés",
            "Exemples concrets",
            "Nuance dans le raisonnement",
            "Prise en compte des deux perspectives"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Votre analyse sera évaluée sur la clarté de votre position et la qualité de votre argumentation."
      },
    },
    
    // ÉCRAN 6 : Débat - Solutions
    {
      id: "ecran-6",
      type: "debat",
      titre: "Débat : Comment favoriser l'émancipation ?",
      ordre: 6,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Débat : Comment favoriser l'émancipation sociale ?

## 🤔 La vraie question

**SI** on admet que :
- Le déterminisme social existe MAIS
- L'émancipation est quand même possible

**ALORS** : Comment favoriser cette émancipation ?

## 💡 Différentes approches

### Approche 1 : INDIVIDUELLE (comme Goldman)
**Solutions** :
- Encourager les individus
- Leur donner confiance
- Les pousser à saisir les opportunités

**Limites** :
- Ne change pas les structures
- Culpabilise ceux qui échouent

### Approche 2 : STRUCTURELLE (comme Bourdieu)
**Solutions** :
- Réformer l'école
- Créer plus d'égalité des chances
- Politiques publiques (bourses, quotas, etc.)

**Limites** :
- Processus lent
- Changements difficiles

### Approche 3 : COMBINÉE
**Solutions** :
- Encourager les individus (discours de Goldman) ET
- Changer les structures (politiques égalitaires)

**Avantages** :
- Plus complète
- Attaque le problème sur deux fronts

## ✍️ Votre proposition

Selon vous, quelle est la **meilleure approche** pour favoriser l'émancipation sociale ?

Proposez **3 mesures concrètes**.`,
        
        consignes: "Choisissez votre approche et proposez 3 mesures concrètes.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "argumentation",
          consigne: "Quelle approche privilégiez-vous et quelles mesures concrètes proposez-vous ? :",
          options: [
            "Approche 1 : Individuelle (encourager, motiver)",
            "Approche 2 : Structurelle (réformes, politiques publiques)",
            "Approche 3 : Combinée (individuelle + structurelle)"
          ],
          nombre_arguments_min: 3,
          nombre_mots_min: 100,
          nombre_mots_max: 180,
          criteres_evaluation: [
            "Choix d'approche justifié",
            "3 mesures concrètes et réalistes",
            "Arguments développés",
            "Cohérence de l'ensemble",
            "Prise en compte des limites"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Votre proposition sera évaluée sur la pertinence des mesures et la cohérence de l'argumentation."
      },
    },
    
    // ÉCRAN 7 : Synthèse
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Bilan : Penser de manière nuancée",
      ordre: 7,
      duree_estimee: 6,
      
      contenu: {
        texte: `# Bilan de la séance 4

## ✅ Ce que vous avez développé

### Concepts compris
- **Déterminisme social** (Bourdieu) : Notre origine influence notre destin
- **Libre arbitre** (Sartre) : Nous sommes libres de choisir
- **Reproduction sociale** : La société reproduit les inégalités
- **Habitus** : Dispositions acquises par notre milieu

### Compétences critiques
- ✅ Analyser un message social
- ✅ Identifier les limites d'un discours
- ✅ Argumenter une position nuancée
- ✅ Proposer des solutions concrètes

### Position nuancée
**La bonne réponse** n'est ni tout noir, ni tout blanc :
- ✅ Le déterminisme existe (reconnaître les obstacles)
- ✅ MAIS des marges de manœuvre existent (agir quand même)
- ✅ Encourager (Goldman) + Réformer (Bourdieu) = Approche complète

## 📊 Votre score : {{score_total}} / 100 points

## 🎯 Prochaine séance - LA FINALE !

**Séance 5 : Production finale - Lettre d'encouragement**

Vous allez créer votre propre lettre d'encouragement :
- ✍️ Écrire une lettre personnelle
- 💪 Utiliser tout ce que vous avez appris
- 🎨 Exprimer votre propre vision

C'est la séance **créative et personnelle** !

---

## 💭 Citation finale

> "L'homme est condamné à être libre."  
> — Jean-Paul Sartre

**ET**

> "Les goûts sont liés aux places."  
> — Pierre Bourdieu

Les deux ont raison : nous sommes libres **dans** les contraintes sociales.

---

**Bravo pour cette réflexion profonde ! 🧠**`,
        
        consignes: "Lisez ce bilan, puis terminez la séance.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
  ],
};

export default seance4;
