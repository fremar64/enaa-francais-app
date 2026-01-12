/**
 * Séance 1 : Découverte de "C'est ta chance"
 * 
 * Objectifs:
 * - Découvrir la chanson et son message d'encouragement
 * - Comprendre le thème de la résilience
 * - Identifier les émotions positives
 * - Première écoute guidée
 * 
 * Durée estimée: 40 minutes
 * Niveau: B1-B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance1: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Découverte : Un message d'espoir",
  description: "Première approche de 'C'est ta chance' - exploration du message d'encouragement et de résilience",
  ordre: 1,
  duree_estimee: 40,
  
  objectifs: [
    "Découvrir la chanson et son message positif",
    "Comprendre le thème de l'encouragement",
    "Identifier les obstacles et les solutions",
    "Repérer le vocabulaire de l'opportunité",
  ],
  
  niveau: "B1",
  prerequis: null,
  actif: true,
  
  competences_ciblees: [
    { code: "CO_GLOBALE", poids: 35 },
    { code: "CO_DETAIL", poids: 25 },
    { code: "VOCAB_ENCOURAGEMENT", poids: 25 },
    { code: "CULTURE_GOLDMAN", poids: 10 },
    { code: "PENSEE_POSITIVE", poids: 5 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Bienvenue dans 'C'est ta chance'",
      ordre: 1,
      duree_estimee: 4,
      
      contenu: {
        texte: `# C'est ta chance !

Vous allez découvrir **"C'est ta chance"**, une chanson motivante de **Jean-Jacques Goldman** (1985).

Cette chanson est un **message d'encouragement** universel : elle nous dit que peu importe notre origine, nous pouvons **saisir nos opportunités** et **réussir**.

## 🎯 Objectifs de cette séance

- Découvrir le message positif de la chanson
- Comprendre comment Goldman encourage
- Explorer le vocabulaire de l'opportunité et de la résilience
- Réfléchir à VOS propres chances

## 💪 Ce que vous allez apprendre

- **Vocabulaire** : chance, saisir, foncer, douter
- **Culture** : La chanson sociale française des années 80
- **Inspiration** : Comment encourager quelqu'un en français

**Durée** : environ 40 minutes

Prêt(e) à saisir VOTRE chance d'apprendre ? C'est parti ! 🚀`,
        
        images: ["/covers/cest-ta-chance-cover.jpg"],
        consignes: "Lisez attentivement cette introduction. Cliquez sur 'Suivant' quand vous êtes prêt(e).",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Contexte culturel
    {
      id: "ecran-2",
      type: "lecture_comprehension",
      titre: "Goldman et la chanson sociale",
      ordre: 2,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Goldman et l'encouragement social

## Le contexte des années 80

En 1985, la France traverse une **crise économique** :
- Chômage élevé (surtout chez les jeunes)
- Ascenseur social en panne
- Découragement généralisé

Dans ce contexte difficile, Goldman écrit "C'est ta chance" pour **encourager** les jeunes à **ne pas abandonner** leurs rêves.

## Le message de la chanson

### 🎯 Message central
**Ton origine ne définit PAS ton futur !**

### 💪 Ce que dit Goldman
- ✅ Tu as le droit de réussir
- ✅ Ne laisse personne te décourager
- ✅ Saisis les opportunités qui se présentent
- ✅ Tu as une force en toi

### 🚫 Ce que Goldman combat
- ❌ Le déterminisme social ("Tu ne peux pas réussir")
- ❌ Les voix qui découragent ("C'est trop dur pour toi")
- ❌ La résignation ("Reste à ta place")

## La chanson sociale française

"C'est ta chance" s'inscrit dans une **tradition** de chansons qui :
- Encouragent l'émancipation
- Combattent les inégalités
- Donnent de l'espoir

**Autres exemples** : Renaud, Michel Berger, etc.

## 🤔 Question de réflexion

**Connaissez-vous des chansons d'encouragement dans votre langue ?**`,
        
        consignes: "Lisez ce texte sur le contexte de la chanson. Répondez ensuite à la question.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Question de compréhension :",
          questions: [
            {
              id: "q1",
              texte: "Quel est le message principal de 'C'est ta chance' ?",
              options: [
                "La vie est facile pour tout le monde",
                "Ton origine ne définit pas ton futur, tu peux réussir",
                "Il faut abandonner ses rêves si c'est trop dur",
                "Seuls les riches peuvent réussir"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exactement ! Goldman encourage à ne pas se laisser définir par son origine.",
                incorrect: "Relisez : Goldman dit que ton origine ne définit PAS ton futur et que tu PEUX réussir."
              }
            }
          ],
          score_max: 5,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 5,
        seuil_reussite: 5,
      },
    },
    
    // ÉCRAN 3 : Première écoute
    {
      id: "ecran-3",
      type: "ecoute_decouverte",
      titre: "Première écoute : L'énergie positive",
      ordre: 3,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Première écoute : Ressentez l'énergie

Vous allez maintenant écouter "C'est ta chance" **pour la première fois**.

## 🎧 Consignes d'écoute

**Ne cherchez pas à tout comprendre !**

Concentrez-vous sur :
- 😊 **L'émotion** : Est-ce triste ou encourageant ?
- 🎵 **L'énergie** : Dynamique ou lente ?
- 🗣️ **Le ton** : Comment Goldman parle-t-il ?
- 🔄 **Les répétitions** : Quels mots reviennent ?

## 📝 Pendant l'écoute

Notez mentalement :
- Comment vous sentez-vous en écoutant ?
- Quelle est l'émotion dominante ?
- Entendez-vous des encouragements ?

**Cliquez sur "Play" pour commencer** ▶️`,
        
        audio: {
          url: "/Répertoire des chansons/Jean-Jacques Goldman - C'est ta chance.mp3",
          debut: 0,
          fin: null,
        },
        
        consignes: "Écoutez la chanson en entier. Concentrez-vous sur l'émotion et l'énergie.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Après cette première écoute :",
          questions: [
            {
              id: "q1",
              texte: "Quelle émotion dominante ressentez-vous dans cette chanson ?",
              options: [
                "Tristesse et mélancolie",
                "Colère et révolte",
                "Encouragement et espoir",
                "Indifférence"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Parfait ! La chanson est pleine d'encouragement et d'espoir.",
                incorrect: "Réécoutez : le ton de Goldman est encourageant, positif, plein d'espoir."
              }
            },
            {
              id: "q2",
              texte: "Quelle phrase entendez-vous le plus souvent ?",
              options: [
                "C'est trop tard",
                "C'est ta chance",
                "C'est impossible",
                "C'est fini"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! 'C'est ta chance' est le refrain, répété plusieurs fois.",
                incorrect: "Réécoutez le refrain : 'C'est ta chance' est répété constamment."
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
    
    // ÉCRAN 4 : Vocabulaire de l'encouragement
    {
      id: "ecran-4",
      type: "vocabulaire",
      titre: "Les mots pour encourager",
      ordre: 4,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Le vocabulaire de l'encouragement

Goldman utilise des mots **puissants** pour encourager.

## 💪 Mots clés

### Chance
**Définition** : Opportunité favorable, occasion à saisir  
**Exemple** : "C'est ta chance de réussir !"  
**Note** : Ici, 'chance' = opportunité plus que hasard

### Saisir
**Définition** : Prendre rapidement, profiter d'une occasion  
**Exemple** : "Saisis cette opportunité !"  
**Note** : Métaphore : on "saisit" une chance comme on saisit un objet

### Foncer
**Définition** : Aller de l'avant avec détermination, ne pas hésiter  
**Exemple** : "Vas-y, fonce ! N'aie pas peur"  
**Note** : Familier, très encourageant

### Douter (de)
**Définition** : Ne pas avoir confiance, ne pas croire en  
**Exemple** : "Ne doute pas de toi"  
**Note** : Souvent à la forme négative pour encourager

## ⚖️ Opposition : Les obstacles vs Les encouragements

| Obstacles (négatif) | Encouragements (positif) |
|---------------------|--------------------------|
| Douter | Croire en soi |
| Hésiter | Foncer |
| Laisser passer | Saisir |
| Écouter les autres | S'écouter soi-même |

## 💡 Dans la chanson

- "**Ne les écoute pas**" → Ignore les voix négatives
- "**Prends-la maintenant**" → Saisis l'opportunité
- "**Vas-y, fonce**" → Va de l'avant sans hésiter
- "**Ne doute pas**" → Aie confiance en toi`,
        
        consignes: "Étudiez ce vocabulaire, puis complétez l'exercice.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "association",
          consigne: "Associez chaque mot à sa signification :",
          paires: [
            { gauche: "Saisir", droite: "Prendre, profiter d'une occasion" },
            { gauche: "Foncer", droite: "Aller de l'avant avec détermination" },
            { gauche: "Douter", droite: "Ne pas avoir confiance" },
            { gauche: "Chance", droite: "Opportunité favorable" },
          ],
          score_max: 20,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 20,
        seuil_reussite: 15,
      },
    },
    
    // ÉCRAN 5 : Écoute avec paroles
    {
      id: "ecran-5",
      type: "ecoute_paroles",
      titre: "Deuxième écoute : Suivez les paroles",
      ordre: 5,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Deuxième écoute : Avec les paroles

Maintenant que vous connaissez le vocabulaire, réécoutez en **suivant les paroles**.

## 🎧 Consignes

- Suivez les paroles qui défilent
- Repérez les **encouragements** ("Vas-y !", "Fonce !")
- Observez les **répétitions** ("C'est ta chance")
- Notez les **obstacles** mentionnés ("Ils vont te dire...")

**La chanson commence... Bonne écoute ! 🎵**`,
        
        audio: {
          url: "/Répertoire des chansons/Jean-Jacques Goldman - C'est ta chance.mp3",
          paroles_synchronisees: true,
        },
        
        consignes: "Écoutez en suivant les paroles synchronisées.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "texte_a_trous",
          consigne: "Complétez ces extraits de la chanson :",
          texte: `Ne les _____ pas
Ceux qui te disent 'tu n'y arriveras pas'

C'est ta _____
Prends-la maintenant

Vas-y, _____
Tu n'as rien à perdre

_____ cette opportunité`,
          mots_manquants: [
            { id: "m1", position: 8, reponse: "écoute" },
            { id: "m2", position: 70, reponse: "chance" },
            { id: "m3", position: 108, reponse: "fonce" },
            { id: "m4", position: 135, reponse: "Saisis" },
          ],
          score_max: 20,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 20,
        seuil_reussite: 15,
      },
    },
    
    // ÉCRAN 6 : Compréhension fine
    {
      id: "ecran-6",
      type: "comprehension_fine",
      titre: "Comprendre le message profond",
      ordre: 6,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Comprendre le message profond

## 🎯 Qui sont "ils" ?

Goldman dit : "Ne **les** écoute pas", "**Ils** vont te dire"

### "Ils" représentent :
- Les voix du **découragement**
- Les gens qui **doutent** de toi
- Ceux qui veulent que tu restes "**à ta place**"
- Le **déterminisme social** ("Tu ne peux pas réussir")

### Ces voix peuvent être :
- 🏫 Des professeurs défaitistes
- 👨‍👩‍👧 Une famille trop prudente
- 👥 La société et ses préjugés
- 🧠 Parfois... ta propre voix intérieure !

## 💡 "C'est ta chance, c'est maintenant"

### Pourquoi "maintenant" ?

L'urgence est importante :
- Les opportunités sont **temporaires**
- Si tu attends trop, tu les **manques**
- Le moment présent est le seul que tu contrôles
- **Agir** est plus important que d'attendre le moment "parfait"

## ⚖️ Le message équilibré

Goldman ne dit PAS :
- ❌ "C'est facile"
- ❌ "Tu vas forcément réussir"
- ❌ "Il n'y a pas d'obstacles"

Goldman dit :
- ✅ "Tu **peux** essayer"
- ✅ "Tu **as le droit** de tenter"
- ✅ "**Ne te laisse pas** décourager"
- ✅ "**Saisis** ta chance"`,
        
        consignes: "Lisez attentivement, puis répondez aux questions.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension approfondie :",
          questions: [
            {
              id: "q1",
              texte: "Qui sont 'ils' dans 'Ne les écoute pas' ?",
              options: [
                "Les amis qui t'encouragent",
                "Les voix qui découragent et doutent de toi",
                "Les professeurs qui t'aident",
                "Tes parents qui te soutiennent"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! 'Ils' sont les voix négatives qui te découragent.",
                incorrect: "'Ils' représentent les voix qui découragent et doutent de toi."
              }
            },
            {
              id: "q2",
              texte: "Pourquoi Goldman insiste-t-il sur 'maintenant' ?",
              options: [
                "Parce que demain n'existe pas",
                "Parce que les opportunités sont temporaires et il faut agir",
                "Parce qu'il est pressé",
                "Parce que c'est plus facile maintenant"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! Les opportunités passent vite, il faut les saisir quand elles se présentent.",
                incorrect: "Goldman insiste sur 'maintenant' car les opportunités sont temporaires et il faut agir."
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
    
    // ÉCRAN 7 : Production personnelle
    {
      id: "ecran-7",
      type: "production_ecrite",
      titre: "Et vous, quelle est VOTRE chance ?",
      ordre: 7,
      duree_estimee: 12,
      
      contenu: {
        texte: `# Réflexion personnelle : Votre chance

## 📝 Question de production écrite

**Quelle est VOTRE "chance" dans la vie en ce moment ?**

Écrivez un court texte (80-120 mots) où vous expliquez :

1. **Votre opportunité** : Quelle chance avez-vous actuellement ?
2. **Les obstacles** : Qu'est-ce qui pourrait vous empêcher de la saisir ?
3. **Votre décision** : Allez-vous la saisir ? Comment ?

## 💡 Aide à l'écriture

**Expressions utiles** :
- "Ma chance, c'est..."
- "J'ai l'opportunité de..."
- "Ce qui m'empêche, c'est..."
- "Certaines personnes me disent que..."
- "Mais je vais..."
- "Je dois foncer parce que..."

**Utilisez** :
- Le vocabulaire de la séance (chance, saisir, foncer, douter)
- Des exemples concrets de votre vie
- Vos émotions (peur, espoir, détermination)`,
        
        consignes: "Écrivez votre réflexion personnelle (80-120 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Écrivez votre texte ici :",
          nombre_mots_min: 80,
          nombre_mots_max: 120,
          criteres_evaluation: [
            "Respect du nombre de mots (80-120)",
            "Utilisation du vocabulaire de la séance",
            "Présence des 3 éléments (opportunité, obstacles, décision)",
            "Cohérence et clarté du texte",
            "Expression personnelle sincère"
          ],
          score_max: 35,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 35,
        seuil_reussite: 24,
        feedback_auto: "Votre texte sera évalué sur le contenu, la langue et l'authenticité de votre réflexion."
      },
    },
  ],
};

export default seance1;
