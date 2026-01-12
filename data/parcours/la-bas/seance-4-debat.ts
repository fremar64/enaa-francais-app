/**
 * Séance 4 : Débat philosophique - Aliénation et authenticité
 * 
 * Objectifs:
 * - Analyser le message social de la chanson
 * - Comprendre les concepts d'aliénation et d'authenticité
 * - Développer la pensée critique
 * - Débattre et argumenter sa position
 * 
 * Durée estimée: 55 minutes
 * Niveau: B2-C1
 */

import type { Seance } from '@/services/pocketbase';

export const seance4: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Débat : Aliénation et quête d'authenticité",
  description: "Analyse philosophique et débat critique sur les thèmes de l'aliénation sociale et de la quête d'authenticité dans 'Là-bas'",
  ordre: 4,
  duree_estimee: 55,
  
  objectifs: [
    "Comprendre le concept d'aliénation sociale",
    "Analyser la critique sociale dans la chanson",
    "Développer son argumentation critique",
    "Débattre sur l'authenticité dans la société moderne"
  ],
  
  niveau: "C1",
  prerequis: { seances_completees: ["seance-1", "seance-2", "seance-3"] },
  actif: true,
  
  competences_ciblees: [
    { code: "PENSEE_CRITIQUE", poids: 40 },
    { code: "ARGUMENTATION", poids: 30 },
    { code: "CULTURE_PHILOSOPHIE", poids: 20 },
    { code: "PRODUCTION_ORALE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction au débat
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Penser avec Goldman : Au-delà de la chanson",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Débat philosophique : Penser avec "Là-bas"

## 🧠 Cette séance

"Là-bas" n'est pas qu'une chanson, c'est une **critique sociale** et une **quête philosophique**.

Dans cette séance, vous allez :
- 📚 Découvrir des **concepts philosophiques** (aliénation, authenticité)
- 🤔 **Analyser** le message social de Goldman
- 💬 **Débattre** sur ces questions avec arguments
- ✍️ **Construire** votre propre position critique

## 🎯 Les grandes questions

- Les gens sont-ils vraiment "endormis" aujourd'hui ?
- L'aliénation sociale existe-t-elle ?
- Le "là-bas" est-il une illusion ou une nécessité ?
- Comment retrouver l'authenticité ?

## 💡 Compétence visée

**Pensée critique** : Analyser, questionner, argumenter avec nuance et profondeur.

**Durée** : environ 55 minutes

## ⚠️ Important

Il n'y a **pas de "bonne réponse"** dans un débat philosophique.  
Ce qui compte :
- ✅ La **qualité** de votre argumentation
- ✅ La **profondeur** de votre réflexion
- ✅ La **nuance** de votre pensée

Prêt(e) à penser en profondeur ? Allons-y ! 🚀`,
        
        consignes: "Lisez cette introduction au débat philosophique.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Concept 1 - L'aliénation
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Comprendre l'aliénation sociale",
      ordre: 2,
      duree_estimee: 10,
      
      contenu: {
        texte: `# L'aliénation sociale : Quand on perd soi-même

## 📚 Définition philosophique

**L'aliénation** (du latin *alienus* = "étranger") désigne le processus par lequel un individu devient **étranger à lui-même**, perd son **authenticité** et sa **liberté**.

## 🧠 Les penseurs de l'aliénation

### Karl Marx (1818-1883)
**Aliénation du travail** : Le travailleur ne se reconnaît plus dans ce qu'il produit. Il devient une "marchandise", un simple rouage du système capitaliste.

**Dans "Là-bas"** : "Les gens n'ont plus d'envies" → Ils ont perdu le désir, moteur de l'humanité.

### Pierre Bourdieu (1930-2002)
**Reproduction sociale** : Les structures sociales nous conditionnent tellement qu'on reproduit inconsciemment les schémas dominants. On croit être libre, mais on ne fait que reproduire.

**Dans "Là-bas"** : "Ils sont tous pareils" → Uniformisation, perte d'individualité.

### Heidegger (1889-1976)
**L'être inauthentique** : Vivre dans le "on" (das Man) = vivre selon ce que "on" fait, "on" dit, "on" pense. Perdre son être propre.

**Dans "Là-bas"** : "Endormis" → Vivre de manière automatique, sans conscience.

## 🎵 Dans la chanson

Goldman décrit une société aliénée :

> "Les gens ici n'ont plus de haine  
> Ils sont tous pareils  
> Ils sont comme endormis"

### Signes de l'aliénation

1. **Perte de passion** : "n'ont plus de haine" = plus d'intensité émotionnelle
2. **Uniformisation** : "tous pareils" = perte d'individualité
3. **Apathie** : "endormis" = absence de conscience critique
4. **Perte de désir** : "n'ont plus d'envies" = résignation

## 💭 Questions de réflexion

- Est-ce que cette description s'applique à notre société actuelle ?
- Sommes-nous "endormis" ou sommes-nous éveillés ?
- L'aliénation est-elle inévitable dans une société moderne ?

## 🌍 Exemples modernes d'aliénation

- **Travail** : Jobs répétitifs, burn-out, perte de sens
- **Consommation** : Acheter pour exister, conformisme des goûts
- **Réseaux sociaux** : Vivre pour les likes, comparaison constante
- **Actualité** : Saturation d'informations, indifférence généralisée`,
        
        consignes: "Lisez attentivement ce texte sur l'aliénation.",
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
      titre: "Vérifier sa compréhension : L'aliénation",
      ordre: 3,
      duree_estimée: 8,
      
      contenu: {
        texte: `# Quiz : Avez-vous compris l'aliénation ?`,
        consignes: "Répondez aux questions suivantes pour vérifier votre compréhension.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension :",
          questions: [
            {
              id: "q1",
              texte: "Que signifie 'aliénation' en philosophie ?",
              options: [
                "Devenir riche et puissant",
                "Devenir étranger à soi-même, perdre son authenticité",
                "Partir vivre à l'étranger",
                "Être heureux et satisfait"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! L'aliénation, c'est devenir étranger à soi-même.",
                incorrect: "L'aliénation désigne le fait de devenir étranger à soi-même, de perdre son authenticité."
              }
            },
            {
              id: "q2",
              texte: "Selon Heidegger, vivre dans le 'on', c'est :",
              options: [
                "Vivre de manière authentique",
                "Vivre selon ce que 'on' fait, sans conscience propre",
                "Vivre seul",
                "Vivre heureux"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! Le 'on' représente la vie inauthentique, conformiste.",
                incorrect: "Le 'on' (das Man) représente la vie inauthentique, où on fait ce que tout le monde fait."
              }
            },
            {
              id: "q3",
              texte: "Quand Goldman dit 'les gens n'ont plus de haine', c'est présenté comme :",
              options: [
                "Positif - ils sont en paix",
                "Négatif - ils ont perdu toute passion",
                "Neutre - c'est juste une observation",
                "Joyeux - ils sont heureux"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! C'est négatif : sans haine, ils n'ont plus de passion, d'intensité.",
                incorrect: "C'est présenté négativement : sans haine, ils ont perdu toute passion et intensité émotionnelle."
              }
            },
            {
              id: "q4",
              texte: "Quel exemple MODERNE illustre le mieux l'aliénation ?",
              options: [
                "Lire un livre passionnant",
                "Scroller machinalement sur les réseaux sociaux pendant des heures",
                "Avoir une conversation profonde avec un ami",
                "Faire du sport"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Très bien ! Le scroll machinal illustre l'aliénation moderne : action répétitive sans conscience.",
                incorrect: "Le scroll machinal sur les réseaux sociaux illustre bien l'aliénation : action automatique, sans conscience."
              }
            }
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
    
    // ÉCRAN 4 : Concept 2 - L'authenticité
    {
      id: "ecran-4",
      type: "apprentissage",
      titre: "L'authenticité : Le 'là-bas' comme idéal",
      ordre: 4,
      duree_estimee: 8,
      
      contenu: {
        texte: `# L'authenticité : Être vraiment soi-même

## 🌟 Définition

**L'authenticité** = Être véritablement soi-même, vivre selon ses valeurs propres, pas selon le conformisme social.

## 🧠 Les penseurs de l'authenticité

### Jean-Paul Sartre (1905-1980)
**"L'existence précède l'essence"** : Nous ne sommes pas définis par une nature fixe. Nous nous créons par nos choix libres.

**Être authentique** = Assumer sa liberté, choisir pour soi, pas pour "on".

**Dans "Là-bas"** : "Partir" = Choisir sa vie au lieu de la subir.

### Nietzsche (1844-1900)
**"Deviens ce que tu es"** : L'authenticité consiste à réaliser son potentiel unique, au lieu de suivre le troupeau.

**Dans "Là-bas"** : "Sentir mon cœur" = Retrouver sa vitalité propre.

## 🎵 Le "là-bas" comme quête d'authenticité

Le "là-bas" de Goldman représente :
- ✨ Un **espace d'authenticité**
- 💪 La possibilité d'**être soi-même**
- ❤️ La **vie intense et vraie**
- 🔓 La **liberté intérieure**

## ⚖️ Aliénation vs Authenticité

| Aliénation (ICI) | Authenticité (LÀ-BAS) |
|------------------|------------------------|
| Endormis | Éveillés |
| Tous pareils | Uniques |
| Sans envies | Désir intense |
| Conformisme | Liberté |
| Automatique | Conscient |

## 💭 Le paradoxe du "là-bas"

**Question cruciale** : Le "là-bas" existe-t-il vraiment ?

### Position 1 : C'est une ILLUSION
- Le "là-bas" parfait n'existe pas
- Fuir "ici" ne résout rien
- L'authenticité se construit ICI et MAINTENANT

### Position 2 : C'est un IDÉAL NÉCESSAIRE
- Le "là-bas" est un **horizon**, pas une destination
- Avoir un idéal nous pousse à changer
- L'important, c'est le **mouvement** (partir), pas l'arrivée

### Position 3 : C'est une TRANSFORMATION INTÉRIEURE
- "Là-bas" n'est pas un lieu mais un **état d'esprit**
- Partir = Se transformer soi-même
- L'authenticité est une **pratique**, pas un lieu

## 🤔 Votre position ?

Quelle position vous semble la plus juste ? Ou avez-vous une quatrième position ?`,
        
        consignes: "Lisez ce texte sur l'authenticité et réfléchissez à votre position.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 5 : Analyse critique guidée
    {
      id: "ecran-5",
      type: "analyse_critique",
      titre: "Analyser : La société d'aujourd'hui est-elle 'endormie' ?",
      ordre: 5,
      duree_estimee: 12,
      
      contenu: {
        texte: `# Analyse critique : Notre société est-elle "endormie" ?

## 🎯 Question centrale

Goldman chante en 1987 : "Les gens ici sont comme endormis"

**En 2026, cette critique est-elle toujours valable ?**

## 📊 Arguments POUR (Oui, elle est endormie)

### Argument 1 : Consumérisme et conformisme
- Les gens achètent les mêmes choses
- Suivent les mêmes modes
- Ont les mêmes aspirations (maison, voiture, voyage Instagram)

### Argument 2 : Addiction aux écrans
- Temps moyen sur smartphone : 3-4h/jour
- Scrolling machinal, sans conscience
- Vie virtuelle > Vie réelle

### Argument 3 : Désengagement politique
- Abstention électorale croissante
- Cynisme généralisé
- "De toute façon, rien ne change"

### Argument 4 : Burn-out généralisé
- Travail sans sens
- Fatigue chronique
- Perte de joie de vivre

## 📊 Arguments CONTRE (Non, elle est éveillée)

### Argument 1 : Mouvements sociaux actifs
- Manifestations pour le climat
- #MeToo, Black Lives Matter
- Engagement associatif

### Argument 2 : Quête de sens
- Reconversions professionnelles
- Retour à la nature, décroissance
- Méditation, spiritualité

### Argument 3 : Conscience écologique
- Plus de végétariens/végans
- Consommation responsable
- Awareness sur l'environnement

### Argument 4 : Diversité et expression
- Réseaux sociaux = Expression libre
- Diversité des modes de vie acceptée
- Créativité artistique florissante

## 💭 Nuancer le débat

**Position nuancée** : Notre société est à la fois éveillée ET endormie, selon les domaines et les individus.

- 🟢 **Éveillée** sur certains sujets (écologie, droits, diversité)
- 🔴 **Endormie** sur d'autres (consumérisme, conformisme professionnel)

## ✍️ À vous de réfléchir

Quelle est VOTRE analyse ? Répondez aux questions suivantes.`,
        
        consignes: "Réfléchissez et répondez aux questions d'analyse.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "choix_argumente",
          consigne: "Quelle est votre position sur la question : 'La société actuelle est-elle endormie ?' :",
          options: [
            "Oui, elle est largement endormie (aliénée)",
            "Non, elle est globalement éveillée (consciente)",
            "Position nuancée : éveillée sur certains points, endormie sur d'autres",
            "Je ne sais pas / Autre position"
          ],
          justification_requise: true,
          nombre_mots_min: 60,
          nombre_mots_max: 150,
          criteres_evaluation: [
            "Position claire",
            "Au moins 2 arguments développés",
            "Exemples concrets",
            "Nuance dans le raisonnement"
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
    
    // ÉCRAN 6 : Débat - Le "là-bas" est-il une illusion ?
    {
      id: "ecran-6",
      type: "debat",
      titre: "Débattre : Le 'là-bas' est-il une illusion ou une nécessité ?",
      ordre: 6,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Débat : Le "là-bas" - Illusion ou nécessité ?

## 🎭 Thèse vs Antithèse

### THÈSE : Le "là-bas" est une ILLUSION dangereuse

**Arguments** :
1. **Fuite de la réalité** : Au lieu de changer ICI, on rêve d'AILLEURS
2. **Insatisfaction perpétuelle** : On ne sera jamais heureux si on cherche toujours ailleurs
3. **Le "là-bas" n'existe pas** : Partout, il y a des problèmes
4. **Déresponsabilisation** : "Ce n'est pas ma faute, c'est la société"

**Exemple** : Les expatriés qui fuient leur pays mais retrouvent les mêmes problèmes ailleurs.

---

### ANTITHÈSE : Le "là-bas" est une NÉCESSITÉ

**Arguments** :
1. **Moteur de changement** : Sans idéal, pas de progrès
2. **Utopie créatrice** : Les utopies inspirent les révolutions
3. **Respiration mentale** : Rêver d'ailleurs nous aide à supporter ICI
4. **Horizon de sens** : Donne une direction à notre vie

**Exemple** : Les migrants qui partent pour une vie meilleure - parfois ça marche !

---

### SYNTHÈSE : Une position nuancée

**Le "là-bas" comme pratique dialectique** :
- Ni pure illusion, ni pure vérité
- Un **outil de transformation**
- L'important = le **mouvement** (partir), pas la destination
- Le "là-bas" nous transforme, et ce "là-bas" devient un nouveau "ici"

## ✍️ Votre position

Choisissez une position et défendez-la avec **au moins 3 arguments**.`,
        
        consignes: "Choisissez votre position et argumentez.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "argumentation",
          consigne: "Défendez votre position sur le 'là-bas' :",
          options: [
            "THÈSE : Le là-bas est une illusion dangereuse",
            "ANTITHÈSE : Le là-bas est une nécessité",
            "SYNTHÈSE : Position nuancée / dialectique"
          ],
          nombre_arguments_min: 3,
          nombre_mots_min: 100,
          nombre_mots_max: 200,
          criteres_evaluation: [
            "Position clairement définie",
            "Minimum 3 arguments distincts",
            "Arguments développés et exemples",
            "Logique et cohérence",
            "Capacité de nuance"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Votre argumentation sera évaluée sur la clarté, la logique et la profondeur de vos arguments."
      },
    },
    
    // ÉCRAN 7 : Synthèse philosophique
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Bilan : Votre pensée critique s'est développée",
      ordre: 7,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Bilan de la séance 4 : Pensée critique

## ✅ Ce que vous avez développé

### Concepts philosophiques maîtrisés
- **Aliénation** : Devenir étranger à soi-même
- **Authenticité** : Être vraiment soi-même
- **Utopie** : Un "non-lieu" qui inspire le changement

### Compétences critiques
- ✅ **Analyser** une critique sociale
- ✅ **Argumenter** une position nuancée
- ✅ **Débattre** avec profondeur
- ✅ **Nuancer** sa pensée (ni tout noir, ni tout blanc)

### Thèses explorées
1. La société moderne est-elle aliénée ?
2. Le "là-bas" est-il illusion ou nécessité ?
3. Comment retrouver l'authenticité ?

## 🎓 Philosophes rencontrés

- **Marx** : Aliénation du travail
- **Bourdieu** : Reproduction sociale
- **Heidegger** : Être authentique vs inauthentique
- **Sartre** : Liberté et responsabilité
- **Nietzsche** : "Deviens ce que tu es"

## 📊 Votre score : {{score_total}} / 100 points

## 🎯 Prochaine séance - LA FINALE !

**Séance 5 : Production finale - Créer votre propre "Là-bas"**

Vous allez :
- 🎨 **Créer** votre propre texte inspiré de "Là-bas"
- 🎤 **Enregistrer** (optionnel) une lecture expressive
- ✍️ **Réécrire** la chanson selon votre vision
- 🌟 **Synthétiser** tout ce que vous avez appris

C'est la séance **créative et personnelle** où vous allez vraiment vous exprimer !

---

## 💭 Citation finale

> "L'homme est condamné à être libre."  
> — Jean-Paul Sartre

Comme le narrateur de "Là-bas", vous êtes libre de choisir : rester "ici" ou partir "là-bas".

**La vraie question** : Qu'allez-vous faire de cette liberté ?

---

**Bravo pour cette réflexion philosophique profonde ! 🎓**`,
        
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
