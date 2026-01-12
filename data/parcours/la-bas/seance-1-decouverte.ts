/**
 * Séance 1 : Découverte de "Là-bas"
 * 
 * Objectifs:
 * - Découvrir la chanson et son contexte
 * - Comprendre le thème global
 * - Identifier les émotions principales
 * - Première écoute guidée
 * 
 * Durée estimée: 45 minutes
 * Niveau: B2-C1
 */

import type { Seance } from '@/services/pocketbase';

export const seance1: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Découverte : Partir ailleurs",
  description: "Première approche de la chanson 'Là-bas' - exploration du désir d'ailleurs et de la quête existentielle",
  ordre: 1,
  duree_estimee: 45,
  
  objectifs: [
    "Découvrir la chanson et ses artistes",
    "Comprendre le thème global de la quête d'ailleurs",
    "Identifier les émotions véhiculées",
    "Repérer le vocabulaire spatial",
  ],
  
  niveau: "B2",
  prerequis: null,
  actif: true,
  
  competences_ciblees: [
    { code: "CO_GLOBALE", poids: 30 },
    { code: "CO_DETAIL", poids: 20 },
    { code: "VOCAB_SPATIAL", poids: 25 },
    { code: "CULTURE_GOLDMAN", poids: 15 },
    { code: "PENSEE_CRITIQUE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Bienvenue dans 'Là-bas'",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Partir... Là-bas

Vous allez découvrir **"Là-bas"**, une chanson emblématique de **Jean-Jacques Goldman** et **Sirima** (1987).

Cette chanson exprime un désir universel : **partir ailleurs**, quitter une réalité qui ne nous convient pas, chercher un "là-bas" plus authentique.

## 🎯 Objectifs de cette séance

- Découvrir la chanson et son contexte
- Comprendre le thème de la quête d'ailleurs
- Explorer le vocabulaire spatial et émotionnel
- Réfléchir à ce que signifie "partir"

## 📚 Ce que vous allez apprendre

- **Vocabulaire** : là-bas, ailleurs, partir, sentir
- **Culture** : Jean-Jacques Goldman, la chanson engagée française
- **Philosophie** : L'aliénation sociale, la quête d'authenticité

**Durée** : environ 45 minutes

Prêt(e) à partir ? C'est parti ! 🚀`,
        
        images: ["/covers/la-bas-cover.jpg"],
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
      titre: "Jean-Jacques Goldman : L'auteur de notre temps",
      ordre: 2,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Jean-Jacques Goldman : L'auteur de notre temps

## L'artiste

**Jean-Jacques Goldman** (né en 1951) est l'un des auteurs-compositeurs-interprètes français les plus importants. Ses chansons touchent des millions de personnes par leur **humanité** et leur **authenticité**.

## La chanson "Là-bas" (1987)

Enregistrée en duo avec **Sirima**, cette chanson exprime un sentiment universel : le désir d'**échapper** à une réalité qui nous aliène.

### Thèmes principaux

- 🌍 **L'ailleurs** : un espace de liberté et de possibilités
- 😴 **L'aliénation** : "les gens sont comme endormis"
- 💫 **La quête** : partir pour trouver l'authenticité
- ❤️ **Le cœur** : sentir vraiment, vivre intensément

### Contexte des années 80

Les années 1980 en France : société de consommation, conformisme, perte de sens. Goldman exprime le **malaise d'une génération** qui cherche quelque chose de plus authentique.

## 🤔 Question de réflexion

**Avez-vous déjà ressenti ce désir de "partir ailleurs" ?**`,
        
        consignes: "Lisez ce texte sur Jean-Jacques Goldman et la chanson. Répondez ensuite aux questions.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Jean-Jacques Goldman est connu pour :",
          questions: [
            {
              id: "q1",
              texte: "Quel type de chansons Jean-Jacques Goldman écrit-il principalement ?",
              options: [
                "Des chansons légères et superficielles",
                "Des chansons humaines et authentiques",
                "Des chansons uniquement politiques",
                "Des chansons pour enfants"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exactement ! Goldman est réputé pour l'humanité et l'authenticité de ses chansons.",
                incorrect: "Relisez le texte : Goldman est connu pour ses chansons humaines et authentiques."
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
    
    // ÉCRAN 3 : Première écoute - Compréhension globale
    {
      id: "ecran-3",
      type: "ecoute_decouverte",
      titre: "Première écoute : L'émotion avant les mots",
      ordre: 3,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Première écoute : L'émotion avant les mots

Vous allez maintenant écouter "Là-bas" **pour la première fois**.

## 🎧 Consignes d'écoute

**Ne cherchez pas à tout comprendre !** 

Concentrez-vous sur :
- 😊 **L'émotion** générale de la chanson
- 🎵 **L'ambiance** musicale
- 🔄 **Les répétitions** que vous entendez
- 🗣️ **Les voix** (Goldman et Sirima)

## 📝 Pendant l'écoute

Notez mentalement :
- Comment vous sentez-vous en écoutant ?
- Quelle émotion domine ?
- Quels mots reviennent souvent ?

**Cliquez sur "Play" pour commencer** ▶️`,
        
        audio: {
          url: "/Répertoire des chansons/Jean-Jacques Goldman, Sirima - Là-bas.mp3",
          debut: 0,
          fin: null, // Chanson complète
        },
        
        consignes: "Écoutez la chanson en entier. Concentrez-vous sur l'émotion globale.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Après cette première écoute, répondez aux questions suivantes :",
          questions: [
            {
              id: "q1",
              texte: "Quelle émotion générale ressentez-vous en écoutant cette chanson ?",
              options: [
                "De la joie et de l'enthousiasme",
                "De la nostalgie et un désir de changement",
                "De la colère et de la révolte",
                "De l'indifférence"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Très bien ! La chanson exprime une nostalgie et un désir profond de changement.",
                incorrect: "Réécoutez : la mélodie et les paroles expriment plutôt une nostalgie et un désir de changement."
              }
            },
            {
              id: "q2",
              texte: "Quel mot revient le plus souvent dans la chanson ?",
              options: [
                "Ici",
                "Partir",
                "Rester",
                "Demain"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! 'Partir' est le mot-clé, répété comme un mantra.",
                incorrect: "Réécoutez le refrain : 'Partir, là-bas, partir' est constamment répété."
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
    
    // ÉCRAN 4 : Vocabulaire spatial - Découverte
    {
      id: "ecran-4",
      type: "vocabulaire",
      titre: "Les mots de l'ailleurs",
      ordre: 4,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Les mots de l'ailleurs

La chanson utilise un **vocabulaire spatial** pour exprimer le désir de changement.

## 🗺️ Mots clés

### Là-bas
**Définition** : Dans un lieu éloigné, ailleurs, dans un ailleurs indéfini  
**Exemple** : "Je voudrais aller là-bas, loin de cette ville grise"  
**Note** : Utilisé métaphoriquement pour l'aspiration au changement

### Ailleurs  
**Définition** : Dans un autre lieu, dans un endroit différent  
**Exemple** : "Mon cœur est ailleurs, pas dans cette routine"  
**Note** : Dimension philosophique - l'ailleurs comme espace de liberté

### Partir
**Définition** : S'en aller, quitter un lieu  
**Exemple** : "Partir, c'est mourir un peu, mais c'est aussi renaître"  
**Note** : Verbe d'action qui exprime le mouvement vers l'ailleurs

### Ici
**Définition** : Dans ce lieu, à cet endroit (opposé à "là-bas")  
**Exemple** : "Ici, les gens sont endormis"  
**Note** : Représente le lieu de l'aliénation, du conformisme

## 💡 Réflexion

Ces mots ne désignent pas vraiment des **lieux géographiques** mais des **états d'être** :
- **Ici** = l'aliénation, la routine, le conformisme
- **Là-bas** = la liberté, l'authenticité, la vie vraie`,
        
        consignes: "Étudiez ce vocabulaire, puis complétez l'exercice.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "association",
          consigne: "Associez chaque mot à sa signification dans la chanson :",
          paires: [
            { gauche: "Là-bas", droite: "Un espace de liberté et d'authenticité" },
            { gauche: "Ici", droite: "Le lieu du conformisme et de l'aliénation" },
            { gauche: "Partir", droite: "Le mouvement vers le changement" },
            { gauche: "Ailleurs", droite: "Un état d'être différent" },
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
    
    // ÉCRAN 5 : Écoute détaillée avec paroles
    {
      id: "ecran-5",
      type: "ecoute_paroles",
      titre: "Deuxième écoute : Avec les paroles",
      ordre: 5,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Deuxième écoute : Avec les paroles

Maintenant que vous connaissez le vocabulaire, réécoutez la chanson **en suivant les paroles**.

## 🎧 Consignes

- Suivez les paroles qui défilent
- Repérez les **répétitions**
- Observez la **structure** (couplets, refrains)
- Notez les **émotions** dans chaque partie

**La chanson commence... Bonne écoute ! 🎵**`,
        
        audio: {
          url: "/Répertoire des chansons/Jean-Jacques Goldman, Sirima - Là-bas.mp3",
          paroles_synchronisees: true,
        },
        
        consignes: "Écoutez en suivant les paroles synchronisées.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "texte_a_trous",
          consigne: "Complétez ces extraits de la chanson :",
          texte: `Partir, _____, partir
Sentir, _____, mon cœur

Les gens ici n'ont plus de _____
Ils sont tous _____
Ils sont comme _____`,
          mots_manquants: [
            { id: "m1", position: 8, reponse: "là-bas" },
            { id: "m2", position: 26, reponse: "ailleurs" },
            { id: "m3", position: 60, reponse: "haine" },
            { id: "m4", position: 82, reponse: "pareils" },
            { id: "m5", position: 104, reponse: "endormis" },
          ],
          score_max: 25,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 25,
        seuil_reussite: 20,
      },
    },
    
    // ÉCRAN 6 : Compréhension fine
    {
      id: "ecran-6",
      type: "comprehension_fine",
      titre: "Comprendre le message",
      ordre: 6,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Comprendre le message profond

## 🤔 Questions de réflexion

La chanson ne parle pas vraiment de **voyage géographique** mais d'une **quête existentielle**.

### Que signifie "Les gens sont comme endormis" ?

Cette phrase critique une société où les gens :
- ✗ Ne réagissent plus
- ✗ Ont perdu leur passion
- ✗ Vivent de manière automatique
- ✗ Ont accepté le conformisme

### "Là-bas" existe-t-il vraiment ?

"Là-bas" est un **espace symbolique** :
- Pas un lieu géographique précis
- Une métaphore de la liberté
- Un état d'authenticité
- Une possibilité d'être soi-même

### Le paradoxe de la haine

"Les gens n'ont plus de haine" est présenté comme **négatif** !

Pourquoi ? Parce que sans haine, il n'y a plus :
- De passion
- D'intensité émotionnelle  
- De capacité à s'indigner
- De vie véritable`,
        
        consignes: "Réfléchissez à ces questions, puis répondez au quiz.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension approfondie :",
          questions: [
            {
              id: "q1",
              texte: "Que représente 'là-bas' dans la chanson ?",
              options: [
                "Un pays tropical spécifique",
                "La ville de Paris",
                "Un espace symbolique de liberté et d'authenticité",
                "Le passé de l'enfance"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Parfait ! 'Là-bas' est un espace symbolique, pas géographique.",
                incorrect: "'Là-bas' n'est pas un lieu précis, c'est une métaphore de la liberté et de l'authenticité."
              }
            },
            {
              id: "q2",
              texte: "Pourquoi dit-on que les gens 'n'ont plus de haine' de manière négative ?",
              options: [
                "Parce qu'ils sont trop gentils",
                "Parce qu'ils ont perdu toute passion et intensité émotionnelle",
                "Parce qu'ils aiment tout le monde",
                "Parce qu'ils sont heureux"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! L'absence de haine signifie l'absence de passion et de vie émotionnelle.",
                incorrect: "Relisez : sans haine, ils n'ont plus de passion ni d'intensité - c'est l'apathie."
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
    
    // ÉCRAN 7 : Synthèse et réflexion personnelle
    {
      id: "ecran-7",
      type: "production_ecrite",
      titre: "Et vous, où est votre 'là-bas' ?",
      ordre: 7,
      duree_estimee: 12,
      
      contenu: {
        texte: `# Réflexion personnelle : Votre "là-bas"

## 📝 Question de production écrite

**Avez-vous un "là-bas" dans votre vie ?**

Écrivez un court texte (80-120 mots) où vous expliquez :

1. **Votre "ici"** : Quelle est votre situation actuelle ?
2. **Votre "là-bas"** : Vers quoi aspirez-vous ?
3. **Votre "partir"** : Qu'est-ce qui vous empêche de partir ? Ou qu'est-ce qui vous pousse à partir ?

## 💡 Aide à l'écriture

**Expressions utiles** :
- "Mon 'ici', c'est..."
- "J'aspire à..."
- "Mon 'là-bas' représente..."
- "Ce qui m'empêche de partir, c'est..."
- "Je rêve de..."

**Utilisez** :
- Le conditionnel : "J'aimerais...", "Je voudrais...", "Je partirais..."
- Le vocabulaire spatial : là-bas, ailleurs, ici
- Vos émotions et désirs`,
        
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
            "Utilisation du conditionnel",
            "Cohérence et clarté du texte",
            "Expression personnelle sincère"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false, // Correction manuelle ou par IA
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Merci pour votre réflexion ! Un enseignant ou l'IA évaluera votre texte selon les critères suivants : respect du nombre de mots, utilisation du vocabulaire et du conditionnel, cohérence et expression personnelle."
      },
    },
  ],
};

export default seance1;
