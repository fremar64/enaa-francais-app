// Séance 1 : Découverte et Contexte - "Là-bas" 
import type { Seance } from '@/services/pocketbase';

export const seance1Labas: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  // Métadonnées
  titre: 'Découverte et Contexte de "Là-bas"',
  description: 'Première immersion dans la chanson avec compréhension globale, analyse du contexte culturel et exploration des premières impressions émotionnelles.',
  ordre: 1,
  duree_estimee: 55, // minutes
  niveau: 'B2',
  
  // Objectifs pédagogiques
  objectifs: [
    'Comprendre le thème central de la quête de liberté',
    'Identifier les métaphores spatiales ("là-bas", "ailleurs", "au-delà")',
    'Analyser le contexte historique et culturel de la chanson',
    'Exprimer ses premières impressions émotionnelles',
    'Repérer les structures grammaticales du désir et du projet',
  ],
  
  // Compétences CECRL ciblées
  competences_ciblees: [
    'CO_GLOBALE',
    'CE_LITTERALE',
    'CE_IMPLICITE',
    'VOC_METAPHORES',
    'CULTURE_HISTOIRE',
  ],
  
  // Pas de prérequis (première séance)
  prerequis: [],
  
  // Écrans de la séance
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: 'lb-s1-e1',
      numero: 1,
      titre: 'Bienvenue dans le parcours "Là-bas"',
      type: 'introduction',
      consigne: 'Découvrez cette chanson emblématique de Jean-Jacques Goldman qui explore la quête de liberté et d\'authenticité.',
      dureeEstimee: 3,
      activite: {
        type: 'introduction',
        contenu: `
# Là-bas - Un voyage intérieur

Bienvenue dans ce parcours d'apprentissage autour de la chanson **"Là-bas"** de Jean-Jacques Goldman et Sirima (1987).

## Ce que vous allez découvrir

Cette chanson iconique de la culture française parle d'une **quête universelle** : celle de la liberté, de l'authenticité et de la transformation de soi.

### 🎯 Objectifs de cette séance

- Comprendre le message profond de la chanson
- Analyser les métaphores spatiales
- Explorer le contexte culturel français des années 1980
- Développer votre vocabulaire du voyage et de la quête

### ⏱️ Durée estimée

**55 minutes** au total (8 écrans)

### 🎓 Niveau

**B2** - Utilisateur indépendant avancé

---

**Prêt à partir "là-bas" ?** Cliquez sur "Suivant" pour commencer ! 🚀
        `,
      },
    },
    
    // ÉCRAN 2 : Contextualisation
    {
      id: 'lb-s1-e2',
      numero: 2,
      titre: 'Contexte : Goldman et les années 1980',
      type: 'introduction',
      consigne: 'Prenez connaissance du contexte historique et artistique de la chanson.',
      dureeEstimee: 5,
      activite: {
        type: 'introduction',
        contenu: `
# Jean-Jacques Goldman et "Là-bas" (1987)

## 🎤 L'artiste

**Jean-Jacques Goldman** est l'un des auteurs-compositeurs-interprètes français les plus populaires. Né en 1951, il incarne une génération d'artistes engagés dans les questions sociales et existentielles.

### Son style

- Textes poétiques et profonds
- Mélodies accessibles
- Thèmes universels (liberté, amour, injustice, identité)
- Authenticité et sincérité

## 🎵 La chanson "Là-bas"

### Informations clés

- **Année** : 1987
- **Album** : *Entre gris clair et gris foncé*
- **Duo avec** : Sirima
- **Genre** : Chanson française, pop

### Contexte des années 1980

Les années 1980 en France sont marquées par :
- Questionnements sur les valeurs de la société de consommation
- Recherche d'authenticité face au conformisme
- Mouvement vers la liberté individuelle
- Intérêt pour la philosophie existentialiste

### Le thème central

**"Là-bas"** n'est pas un lieu géographique. C'est une **métaphore** pour :
- L'ailleurs intérieur (transformation de soi)
- La quête d'authenticité (être vrai)
- La liberté face aux contraintes sociales
- Le dépassement de ses limites

---

💡 **Note culturelle** : Cette chanson dialogue avec la philosophie existentialiste française (Sartre, Camus) qui valorise la liberté et le projet de soi.
        `,
      },
    },
    
    // ÉCRAN 3 : Première écoute sans paroles
    {
      id: 'lb-s1-e3',
      numero: 3,
      titre: 'Première écoute - Découverte émotionnelle',
      type: 'ecoute_decouverte',
      consigne: 'Écoutez la chanson SANS lire les paroles. Concentrez-vous sur la musique, les voix et vos émotions.',
      dureeEstimee: 6,
      audioDebut: 0,
      audioFin: 304,
      activite: {
        type: 'ecoute_decouverte',
        contenu: `
# 🎧 Première écoute libre

Fermez les yeux si vous le souhaitez. Laissez-vous porter par la musique.

## Pendant l'écoute, demandez-vous :

### Sur la musique
- Quelle est l'ambiance générale ? (joyeuse, mélancolique, énergique...)
- Comment sont les voix ? (douces, puissantes, intimes...)
- Y a-t-il des moments forts dans la chanson ?

### Sur vos émotions
- Qu'est-ce que cette chanson vous fait ressentir ?
- À quoi vous fait-elle penser ?
- Quelles images mentales vous viennent ?

### Sur le sens
- Même sans comprendre tous les mots, quelle impression générale avez-vous ?
- Le ton est-il plutôt optimiste ou nostalgique ?

---

**🎵 Cliquez sur PLAY pour écouter**

*Durée : 5 minutes 04 secondes*

---

Après l'écoute, cliquez sur "Suivant" pour partager vos impressions.
        `,
      },
    },
    
    // ÉCRAN 4 : QCM Premières impressions
    {
      id: 'lb-s1-e4',
      numero: 4,
      titre: 'Vos premières impressions',
      type: 'quiz_qcm',
      consigne: 'Répondez à ces questions sur votre première écoute (sans avoir lu les paroles).',
      dureeEstimee: 4,
      difficulte: 'facile',
      competencesCibles: ['CO_GLOBALE'],
      activite: {
        type: 'quiz_qcm',
        questions: [
          {
            id: 'lb-s1-q1',
            question: 'Quelle est l\'ambiance générale de la chanson ?',
            options: [
              'Joyeuse et festive',
              'Mélancolique et contemplative',
              'Agressive et révoltée',
              'Romantique et passionnée',
            ],
            reponseCorrecte: 1,
            explication: 'La chanson a une ambiance mélancolique et contemplative. La mélodie douce et les voix introspectives créent une atmosphère de réflexion intérieure.',
          },
          {
            id: 'lb-s1-q2',
            question: 'Quel mot revient le plus souvent dans le refrain ?',
            options: [
              'Partir',
              'Là-bas',
              'Chercher',
              'Ailleurs',
            ],
            reponseCorrecte: 1,
            explication: '"Là-bas" est le mot central du refrain et de toute la chanson. Il est répété plusieurs fois pour créer une obsession, une quête.',
          },
          {
            id: 'lb-s1-q3',
            question: 'Le ton général de la chanson exprime plutôt :',
            options: [
              'La satisfaction du présent',
              'La nostalgie du passé',
              'Le désir d\'ailleurs et de changement',
              'La peur de l\'avenir',
            ],
            reponseCorrecte: 2,
            explication: 'Toute la chanson exprime un désir d\'ailleurs, de changement, de partir vers quelque chose de différent. C\'est une quête active, pas une nostalgie passive.',
          },
          {
            id: 'lb-s1-q4',
            question: 'La structure de la chanson comporte :',
            options: [
              'Uniquement des couplets',
              'Des couplets et un refrain répété',
              'Un long monologue sans structure',
              'Une narration chronologique',
            ],
            reponseCorrecte: 1,
            explication: 'La chanson alterne entre des couplets (qui développent différentes raisons de partir) et un refrain obsédant qui martèle le désir de "là-bas".',
          },
        ],
      },
    },
    
    // ÉCRAN 5 : Deuxième écoute avec paroles
    {
      id: 'lb-s1-e5',
      numero: 5,
      titre: 'Deuxième écoute - Avec les paroles',
      type: 'ecoute_guidee',
      consigne: 'Réécoutez la chanson, cette fois en suivant les paroles synchronisées. Observez le vocabulaire et les expressions.',
      dureeEstimee: 7,
      audioDebut: 0,
      audioFin: 304,
      activite: {
        type: 'ecoute_guidee',
        contenu: `
# 🎧 Deuxième écoute - Avec paroles synchronisées

Cette fois, suivez les paroles qui défilent en même temps que la musique.

## Consignes d'écoute active

Pendant cette deuxième écoute, repérez :

### 📍 Vocabulaire spatial
- Les mots qui désignent des lieux ou des mouvements
- Exemple : "partir", "là-bas", "ailleurs"...

### 💭 Expressions du désir
- Comment le désir de partir est exprimé
- Les verbes et tournures utilisés

### 🎭 Répétitions
- Quels mots ou phrases sont répétés ?
- Pourquoi selon vous ?

### 🤔 Questions qui émergent
- Y a-t-il des mots ou expressions que vous ne comprenez pas ?
- Notez-les mentalement, nous les verrons dans les prochaines activités

---

**🎵 Cliquez sur PLAY et suivez les paroles**

*Les paroles défileront automatiquement au rythme de la musique*

---

**Astuce** : Ne cherchez pas à tout comprendre parfaitement dès maintenant. L'objectif est de vous familiariser avec le texte.
        `,
      },
    },
    
    // ÉCRAN 6 : Compréhension globale du texte
    {
      id: 'lb-s1-e6',
      numero: 6,
      titre: 'Compréhension globale',
      type: 'quiz_qcm',
      consigne: 'Maintenant que vous avez lu les paroles, testez votre compréhension générale.',
      dureeEstimee: 8,
      difficulte: 'moyen',
      competencesCibles: ['CE_LITTERALE', 'CE_IMPLICITE'],
      activite: {
        type: 'quiz_qcm',
        questions: [
          {
            id: 'lb-s1-q5',
            question: 'Que signifie "faire table rase" dans la chanson ?',
            options: [
              'Nettoyer une table',
              'Repartir de zéro, effacer le passé',
              'Manger à table',
              'Créer quelque chose de nouveau',
            ],
            reponseCorrecte: 1,
            explication: '"Faire table rase" est une expression qui signifie effacer complètement le passé pour recommencer à zéro. Goldman veut tout oublier de son ancienne vie.',
          },
          {
            id: 'lb-s1-q6',
            question: 'De quoi la personne veut-elle partir ?',
            options: [
              'D\'un pays spécifique',
              'De ses amis et famille',
              'Des certitudes, habitudes et contraintes sociales',
              'De son travail uniquement',
            ],
            reponseCorrecte: 2,
            explication: 'La chanson parle de partir des "habitudes", "certitudes", "morales", "discours", "règles" et "lois". C\'est un départ existentiel, pas géographique.',
          },
          {
            id: 'lb-s1-q7',
            question: 'Que cherche la personne "là-bas" ?',
            options: [
              'Un travail et de l\'argent',
              'Son étoile, l\'oubli, l\'ailleurs, l\'au-delà',
              'Des amis et une famille',
              'La gloire et la reconnaissance',
            ],
            reponseCorrecte: 1,
            explication: 'Le refrain est clair : "Chercher mon étoile, ailleurs que là / Chercher l\'oubli, l\'ailleurs, l\'au-delà". Ce sont des quêtes spirituelles et existentielles.',
          },
          {
            id: 'lb-s1-q8',
            question: 'Comment la personne considère-t-elle la possibilité d\'échouer ?',
            options: [
              'Elle a peur et préfère ne pas partir',
              'Elle l\'accepte : "Tant pis, j\'aurai vécu mes doutes"',
              'Elle est certaine de réussir',
              'Elle n\'y pense pas du tout',
            ],
            reponseCorrecte: 1,
            explication: 'Le pont de la chanson montre une acceptation courageuse du risque : "Et si jamais je fais fausse route / Tant pis, j\'aurai vécu mes doutes / Au moins j\'aurai essayé".',
          },
          {
            id: 'lb-s1-q9',
            question: 'Le "là-bas" de la chanson est :',
            options: [
              'Un pays précis mentionné dans le texte',
              'Une ville lointaine',
              'Un espace métaphorique (intérieur, existentiel)',
              'Le paradis après la mort',
            ],
            reponseCorrecte: 2,
            explication: '"Là-bas" n\'est jamais défini géographiquement. C\'est une métaphore pour un ailleurs intérieur, une transformation de soi, un état d\'authenticité.',
          },
          {
            id: 'lb-s1-q10',
            question: 'L\'attitude générale de la personne est :',
            options: [
              'Résignée et triste',
              'En colère et révoltée',
              'Déterminée mais incertaine (courage dans le doute)',
              'Heureuse et insouciante',
            ],
            reponseCorrecte: 2,
            explication: 'La chanson exprime une détermination ("partir vraiment") mêlée d\'incertitude ("même si je ne sais pas où"). C\'est le courage d\'accepter le doute.',
          },
        ],
      },
    },
    
    // ÉCRAN 7 : Analyse des métaphores spatiales
    {
      id: 'lb-s1-e7',
      numero: 7,
      titre: 'Les métaphores spatiales',
      type: 'analyse_textuelle',
      consigne: 'Explorez comment Goldman utilise l\'espace comme métaphore de la transformation intérieure.',
      dureeEstimee: 12,
      difficulte: 'difficile',
      competencesCibles: ['CE_CRITIQUE', 'VOC_METAPHORES'],
      activite: {
        type: 'analyse_textuelle',
        exercice: {
          id: 'lb-s1-analyse-1',
          extrait: `
**Extrait 1** : "Là-bas" (refrain)
**Extrait 2** : "Chercher l'ailleurs, l'au-delà"
**Extrait 3** : "Loin des habitudes, loin des certitudes"
          `,
          questions: [
            {
              question: 'Que représente "là-bas" dans la chanson ? (2-3 phrases)',
              type: 'ouvert',
              reponseAttendue: '"Là-bas" représente un espace mental et existentiel de liberté et d\'authenticité. Ce n\'est pas un lieu géographique mais un état d\'être où on peut vivre selon ses propres valeurs, loin des contraintes sociales.',
            },
            {
              question: 'Analysez l\'opposition "ici" vs "là-bas". Que symbolise chaque espace ?',
              type: 'ouvert',
              reponseAttendue: '"Ici" symbolise le conformisme (habitudes, certitudes, morales, règles) et l\'inauthenticité ("mentir et faire semblant"). "Là-bas" symbolise la liberté, l\'authenticité et la possibilité de se redéfinir ("raconter d\'autres histoires").',
            },
            {
              question: 'Que signifie "l\'au-delà" dans le contexte de la chanson ?',
              type: 'choix',
              options: [
                'La vie après la mort',
                'Un pays étranger',
                'Le dépassement de soi, aller au-delà de ses limites actuelles',
                'Le futur lointain',
              ],
              reponseAttendue: 'Le dépassement de soi, aller au-delà de ses limites actuelles',
            },
          ],
        },
      },
    },
    
    // ÉCRAN 8 : Bilan de la séance
    {
      id: 'lb-s1-e8',
      numero: 8,
      titre: 'Bilan de la séance',
      type: 'bilan',
      consigne: 'Récapitulons ce que vous avez découvert dans cette première séance.',
      dureeEstimee: 5,
      activite: {
        type: 'bilan',
        contenu: `
# ✅ Bilan de la Séance 1

## Ce que vous avez découvert aujourd'hui

### 🎵 La chanson
- **"Là-bas"** de Jean-Jacques Goldman & Sirima (1987)
- Une quête de liberté et d'authenticité
- Un message universel et intemporel

### 📊 Compétences travaillées
✅ **Compréhension orale globale** - Écoute active et émotionnelle  
✅ **Compréhension écrite** - Lecture des paroles et du contexte  
✅ **Vocabulaire métaphorique** - "Là-bas", "ailleurs", "au-delà"  
✅ **Culture française** - Années 1980 et philosophie existentialiste

### 🎯 Messages clés de la chanson

1. **Partir** n'est pas seulement géographique mais existentiel
2. **"Là-bas"** est une métaphore de transformation intérieure
3. **Accepter le doute** fait partie du courage
4. **L'authenticité** vaut mieux que le conformisme

### 📚 Ce qui vous attend

**Séance 2** : Vocabulaire et champs lexicaux  
→ Analyse approfondie du vocabulaire du voyage, de la liberté et de la quête

**Séance 3** : Grammaire du conditionnel  
→ Comment Goldman exprime le désir et la possibilité

**Séance 4** : Interprétation philosophique  
→ Dialogue avec Heidegger et l'existentialisme

**Séance 5** : Production finale  
→ Votre propre texte inspiré de "Là-bas"

---

## 🎓 Votre score : **[score]/18 points**

**Excellent travail !** 👏

Cliquez sur "Terminer la séance" pour sauvegarder votre progression.
        `,
      },
    },
  ],
  
  // Actif
  actif: true,
};

export default seance1Labas;
