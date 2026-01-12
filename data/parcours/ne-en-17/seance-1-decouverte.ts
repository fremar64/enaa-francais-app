/**
 * Séance 1 : Découverte - La question morale fondamentale
 * 
 * Objectifs:
 * - Découvrir la chanson et son contexte historique
 * - Comprendre la question morale centrale
 * - Introduire le concept de contingence
 * - Réfléchir à la responsabilité historique
 * 
 * Durée estimée: 50 minutes
 * Niveau: B2-C1
 */

import type { Seance } from '@/services/pocketbase';

export const seance1: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Découverte : La question morale",
  description: "Première rencontre avec 'Né en 17 à Leidenstadt' - Comprendre la question morale et historique au cœur de la chanson",
  ordre: 1,
  duree_estimee: 50,
  
  objectifs: [
    "Découvrir le contexte historique (Shoah)",
    "Comprendre la question morale centrale",
    "Identifier le personnage et son dilemme",
    "Réfléchir à la contingence (hasard de la naissance)"
  ],
  
  niveau: "B2",
  prerequis: {},
  actif: true,
  
  competences_ciblees: [
    { code: "CO_GLOBALE", poids: 30 },
    { code: "CULTURE_HISTOIRE", poids: 25 },
    { code: "PENSEE_CRITIQUE", poids: 25 },
    { code: "CO_DETAIL", poids: 20 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Une chanson qui pose une question difficile",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# "Né en 17 à Leidenstadt"

## ⚠️ Un avertissement nécessaire

Cette chanson aborde un sujet **grave et sensible** :
- La **Shoah** (Holocauste)
- La responsabilité morale
- La culpabilité collective

**Ce n'est PAS une chanson "facile"** - elle demande :
- De la **maturité** intellectuelle
- De la **réflexion** profonde
- Du **respect** pour l'histoire

## 🎯 La question centrale

Goldman pose une question **fondamentale** :

> **"Si j'étais né en 1917 en Allemagne, qu'aurais-je fait ?"**

C'est une question d'**humilité morale** :
- Nous jugeons souvent le passé
- Mais **aurions-nous fait mieux** dans les mêmes circonstances ?
- Le hasard de la naissance détermine-t-il notre moralité ?

## 📚 Ce que vous allez découvrir

1. **Le contexte** : L'Allemagne après-guerre
2. **Le personnage** : Un Allemand né en 1947
3. **Son dilemme** : Assumer une culpabilité qu'il n'a pas commise
4. **La question** : Sommes-nous responsables du passé ?

---

**Prêt(e) pour une réflexion profonde ? Allons-y avec respect.** 🕊️`,
        
        consignes: "Lisez attentivement cette introduction.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Contexte historique
    {
      id: "ecran-2",
      type: "culture",
      titre: "Contexte : L'Allemagne et la Shoah",
      ordre: 2,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Contexte historique : Comprendre pour respecter

## 🏛️ La Shoah (Holocauste)

### Les faits
- **1933-1945** : Régime nazi en Allemagne
- **1941-1945** : Extermination systématique
- **6 millions** de Juifs assassinés
- **Camps de concentration** et d'extermination
- **Participation** de millions d'Allemands ordinaires

### Comment c'est arrivé ?

**Ce n'étaient pas des "monstres"** :
- Des gens ordinaires (fonctionnaires, policiers, voisins)
- Qui ont obéi aux ordres
- Qui ont fermé les yeux
- Qui ont collaboré activement ou passivement

## 🤔 La question d'après-guerre

### 1945 : L'Allemagne défaite

**Questions qui se posent** :
- Qui est responsable ?
- Seulement Hitler et les nazis ?
- Ou tout le peuple allemand ?
- Que faire de cette culpabilité ?

### Les enfants nés après-guerre

**Le dilemme** :
- Ils n'ont **rien fait**
- Ils n'étaient **pas là**
- Mais c'est **leur pays**, **leurs parents**, **leur histoire**

**Question** : Sont-ils responsables ?

## 🎵 Goldman et cette histoire

Goldman (né en 1951) est **Juif d'origine polonaise** :
- Famille touchée par la Shoah
- Mais refuse la haine collective
- Comprend la complexité morale
- Crée un personnage allemand pour poser la question

## 💭 "Leidenstadt" : Ville symbolique

**"Leidenstadt"** n'existe pas :
- **"Leiden"** (allemand) = souffrance
- **"Stadt"** = ville
- Toute ville allemande ordinaire
- Où des atrocités ont eu lieu

**Message** : Ce n'était pas une exception, c'était **partout**.`,
        
        consignes: "Lisez ce contexte historique. Il est essentiel pour comprendre la chanson.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension historique :",
          questions: [
            {
              id: "q1",
              texte: "Que signifie 'Leidenstadt' ?",
              options: [
                "Une vraie ville allemande",
                "Ville de la souffrance (symbolique)",
                "Une ville française",
                "Le nom d'un camp"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! C'est une ville fictive symbolique créée par Goldman.",
                incorrect: "'Leiden' = souffrance, 'Stadt' = ville. C'est une création symbolique."
              }
            },
            {
              id: "q2",
              texte: "Le personnage de la chanson est né en :",
              options: [
                "1917 (avant la guerre)",
                "1930 (pendant l'enfance d'Hitler)",
                "1947 (après la guerre)",
                "1960 (génération suivante)"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Parfait ! Né en 1947, il n'a pas vécu les atrocités mais ressent la culpabilité.",
                incorrect: "'Né en 17' = né en 1947, après la guerre. Il n'était pas là."
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
    
    // ÉCRAN 3 : Première écoute
    {
      id: "ecran-3",
      type: "ecoute",
      titre: "Première écoute : L'atmosphère",
      ordre: 3,
      duree_estimee: 6,
      
      contenu: {
        texte: `# Première écoute : Ressentir avant de comprendre

## 🎵 Consignes d'écoute

Écoutez la chanson **sans lire les paroles**.

**Concentrez-vous sur** :
- 😔 Le **ton** de Goldman : triste ? résigné ? grave ?
- 🎹 La **musique** : douce, inquiétante, sobre ?
- 💭 L'**atmosphère** générale : lourde, pesante, respectueuse ?

## 🤔 Questions à vous poser

Pendant l'écoute :
- Comment vous sentez-vous ?
- Quelle **émotion** domine ?
- Est-ce une chanson optimiste ou pessimiste ?

---

**Écoutez maintenant, sans jugement, avec respect.** 🎧`,
        
        consignes: "Écoutez la chanson une première fois, sans les paroles.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Après votre écoute, quel ton domine ?",
          questions: [
            {
              id: "q1",
              texte: "Quelle est l'atmosphère générale de la chanson ?",
              options: [
                "Joyeuse et optimiste",
                "Grave et réflexive",
                "Colérique et violente",
                "Légère et humoristique"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! Goldman adopte un ton grave, sobre et profondément réflexif.",
                incorrect: "La chanson est grave et réflexive, traitant d'un sujet historique douloureux."
              }
            }
          ],
          score_max: 5,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 5,
        seuil_reussite: 0,
      },
    },
    
    // ÉCRAN 4 : Compréhension des paroles
    {
      id: "ecran-4",
      type: "comprehension",
      titre: "Comprendre les paroles",
      ordre: 4,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Comprendre les paroles

## 📝 Vocabulaire clé

Avant de réécouter, voici les mots difficiles :

| Mot | Sens |
|-----|------|
| **Le soc** | Partie de la charrue (outil agricole) |
| **Jouxte** | Est très proche de (langage soutenu) |
| **Rattraper** | Rejoindre quelqu'un (ici : le passé revient) |
| **Absoudre** | Pardonner, déclarer innocent |
| **Innocent** | Non coupable |
| **Léguer** | Transmettre par héritage |

## 🎵 Deuxième écoute avec paroles

**Maintenant** :
1. Relisez les paroles
2. Écoutez à nouveau
3. Essayez de comprendre l'histoire`,
        
        consignes: "Lisez les paroles, puis réécoutez la chanson.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "texte_a_trous",
          consigne: "Complétez ces vers importants de la chanson :",
          phrases: [
            {
              id: "p1",
              texte: "Je crois que nul n'est _____ / De ce qu'il s'est passé là-bas",
              reponse: "innocent",
              feedback: {
                correct: "Parfait ! C'est la phrase centrale : personne n'est innocent.",
                incorrect: "Le mot est 'innocent' - personne n'est innocent du passé."
              }
            },
            {
              id: "p2",
              texte: "Cette culpabilité que les hommes m'ont _____ / Je la prends, je la garde, elle est mienne",
              reponse: "léguée",
              feedback: {
                correct: "Exact ! 'Léguer' = transmettre par héritage.",
                incorrect: "'Léguée' - la culpabilité transmise comme un héritage."
              }
            },
            {
              id: "p3",
              texte: "Mais aujourd'hui quelque chose me _____ / Une honte mêlée de peur",
              reponse: "rattrape",
              feedback: {
                correct: "Bravo ! Le passé 'rattrape' le narrateur.",
                incorrect: "'Rattrape' - le passé revient, rejoint le présent."
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
    
    // ÉCRAN 5 : Analyse du personnage
    {
      id: "ecran-5",
      type: "analyse",
      titre: "Qui parle ? Comprendre le narrateur",
      ordre: 5,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Qui est le narrateur ?

## 👤 Le personnage

**Identité** :
- Né en **1947** à Leidenstadt (Allemagne)
- Environ **30 ans** au moment de la chanson
- **N'a pas vécu** la Seconde Guerre mondiale
- Mène une vie **ordinaire** (travail, enfants)

## 💭 Son parcours émotionnel

### 1. L'oubli initial
> "J'ai travaillé, j'ai eu des enfants, **j'ai tout oublié**"

- Vie normale
- Pas de questionnement
- Ignorance volontaire ?

### 2. La prise de conscience
> "Un jour, **j'ai su** qu'il y avait eu ça"

- Découverte des atrocités
- Réalisation que ça s'est passé **près de chez lui**
- Peut-être même **là où il a grandi**

### 3. L'émotion complexe
> "Une honte mêlée de peur, de colère **ou je ne sais quoi**"

- **Honte** : de son pays, de ses compatriotes
- **Peur** : de cette réalité
- **Colère** : contre quoi ? Les bourreaux ? Lui-même ?
- **Confusion** : émotions mélangées, indéfinissables

### 4. Le choix moral
> "Je la prends, je la garde, **elle est mienne**"

- **Refus** des excuses
- **Acceptation** de la culpabilité
- **Responsabilité** assumée

## 🤔 Pourquoi ce choix ?

### Les excuses qu'il rejette :
- "C'était une guerre"
- "Les temps étaient durs"
- "Ils obéissaient"
- "Il fallait se taire ou mourir"

### Sa position :
**Mieux vaut assumer la culpabilité** que de l'effacer avec des excuses

**Pourquoi ?**
- Respecter les victimes
- Ne pas minimiser l'horreur
- Humilité morale : "Je ne suis peut-être pas meilleur"`,
        
        consignes: "Lisez cette analyse du personnage.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions sur le narrateur :",
          questions: [
            {
              id: "q1",
              texte: "Quelle est l'attitude initiale du narrateur face au passé ?",
              options: [
                "Il y pense constamment",
                "Il a tout oublié (vie normale)",
                "Il cherche activement la vérité",
                "Il nie que ça s'est passé"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! Au début, il vit normalement et a 'tout oublié'.",
                incorrect: "Il dit clairement : 'j'ai eu des enfants, j'ai tout oublié'."
              }
            },
            {
              id: "q2",
              texte: "Pourquoi refuse-t-il les excuses ('c'était la guerre', etc.) ?",
              options: [
                "Il pense qu'elles minimisent l'horreur",
                "Il ne les comprend pas",
                "Il est en colère contre tout",
                "Il veut punir les Allemands"
              ],
              reponse_correcte: 0,
              feedback: {
                correct: "Parfait ! Accepter ces excuses reviendrait à minimiser les atrocités.",
                incorrect: "Il refuse car ces excuses minimisent l'horreur de ce qui s'est passé."
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
    
    // ÉCRAN 6 : La contingence
    {
      id: "ecran-6",
      type: "philosophie",
      titre: "La contingence : Et si c'était moi ?",
      ordre: 6,
      duree_estimee: 8,
      
      contenu: {
        texte: `# La contingence : Le hasard de la naissance

## 🎲 Qu'est-ce que la contingence ?

**Contingence** = Le fait que les choses auraient pu être autrement

**Exemple** :
- Vous êtes né(e) en [votre pays] en [votre année]
- Vous auriez pu naître ailleurs, à une autre époque
- C'est le **hasard**, vous n'avez pas choisi

## 🤔 La question morale centrale

> **"Si j'étais né en 1917 à Leidenstadt, qu'aurais-je fait ?"**

### Ce que cette question implique :

1. **Nous jugeons le passé facilement**
   - "Je n'aurais jamais fait ça"
   - "J'aurais résisté"
   - "J'aurais caché des gens"

2. **Mais est-ce vrai ?**
   - Dans le même contexte ?
   - Avec la même éducation ?
   - Avec la même pression sociale ?
   - Avec la même peur ?

3. **L'humilité morale**
   - Reconnaître qu'on ne **sait pas**
   - Ne pas se croire **meilleur** par défaut
   - Comprendre que **nous aurions pu être les bourreaux**

## 💡 Exemples de contingence

### Génocide au Rwanda (1994)
- Des voisins tuant leurs voisins
- Des gens "normaux" devenant bourreaux
- **Et nous ?** Dans ce contexte, qu'aurions-nous fait ?

### Expérience de Milgram (1961)
- **65%** des gens obéissent aux ordres
- Même quand ils pensent faire du mal
- **Nous ne sommes pas "naturellement" meilleurs**

## 🎵 Dans la chanson

> "Je crois que **nul n'est innocent** / De ce qu'il s'est passé là-bas"

**Signification** :
- Ce n'est pas "tous les Allemands sont coupables"
- C'est "tous les **humains** pourraient être coupables"
- **Nous sommes tous concernés** par cette histoire

## 🌍 Message universel

Cette chanson n'est **pas** seulement sur l'Allemagne :
- C'est sur **l'humanité**
- Sur notre capacité au mal
- Sur l'importance de l'humilité morale

---

**Question pour vous** : Et vous, qu'auriez-vous fait ?`,
        
        consignes: "Lisez ce concept philosophique essentiel.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 7 : Production - Réflexion personnelle
    {
      id: "ecran-7",
      type: "production_ecrite",
      titre: "Réflexion : Votre première réaction",
      ordre: 7,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Votre réflexion personnelle

## 💭 Question

Après cette première séance, quelle est votre **première réaction** à la question de Goldman ?

> "Si j'étais né en 1917 à Leidenstadt, qu'aurais-je fait ?"

## ✍️ Consignes

Écrivez un texte de **80-120 mots** qui exprime :

1. **Votre réaction immédiate** à cette question
2. **Comment** vous y répondez (ou pourquoi vous ne pouvez pas répondre)
3. **Ce que vous ressentez** face à cette interrogation

### Points importants

- ✅ Soyez **honnête** avec vous-même
- ✅ Il n'y a **pas de mauvaise réponse**
- ✅ La nuance est valorisée
- ✅ L'humilité intellectuelle aussi

### Exemples d'approches (toutes valables)

**Approche 1 - Confiance** :
"Je pense que j'aurais résisté parce que..."

**Approche 2 - Doute** :
"Je ne peux pas savoir, et cette incertitude me..."

**Approche 3 - Humilité** :
"Honnêtement, je ne suis pas sûr(e) d'être meilleur(e) que..."

**Approche 4 - Nuancée** :
"Ça dépendrait de tellement de facteurs..."

---

**Prenez le temps de réfléchir vraiment.** 🤔`,
        
        consignes: "Écrivez votre réflexion personnelle (80-120 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Votre réflexion sur la question de Goldman :",
          nombre_mots_min: 80,
          nombre_mots_max: 120,
          criteres_evaluation: [
            "Honnêteté de la réflexion",
            "Engagement avec la question",
            "Nuance et profondeur",
            "Expression claire des idées",
            "Correction de la langue"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Votre réflexion sera évaluée sur l'honnêteté intellectuelle et la profondeur."
      },
    },
    
    // ÉCRAN 8 : Synthèse
    {
      id: "ecran-8",
      type: "synthese",
      titre: "Bilan : Une question qui dérange",
      ordre: 8,
      duree_estimee: 3,
      
      contenu: {
        texte: `# Bilan de la séance 1

## ✅ Ce que vous avez découvert

### Contexte historique
- La Shoah et ses conséquences
- L'Allemagne après-guerre
- La question de la culpabilité collective

### Le personnage
- Un Allemand né en 1947
- Sa prise de conscience douloureuse
- Son choix d'assumer la culpabilité

### Concepts clés
- **Contingence** : Le hasard de la naissance
- **Humilité morale** : Ne pas se croire meilleur
- **Responsabilité** : Assumer le passé collectif

## 📊 Votre score : {{score_total}} / 100 points

## 🎯 Prochaine séance

**Séance 2 : Vocabulaire de la responsabilité historique**

Vous allez apprendre :
- Le vocabulaire de la mémoire et de l'oubli
- Les mots de la responsabilité morale
- Les expressions de la culpabilité

---

**Cette chanson demande du temps pour être digérée. Prenez ce temps.** 🕊️`,
        
        consignes: "Lisez ce bilan.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
  ],
};

export default seance1;
