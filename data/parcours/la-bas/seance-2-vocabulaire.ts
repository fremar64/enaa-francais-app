/**
 * Séance 2 : Vocabulaire spatial et métaphores géographiques
 * 
 * Objectifs:
 * - Maîtriser le vocabulaire spatial de la chanson
 * - Comprendre les métaphores géographiques
 * - Différencier espace réel et espace symbolique
 * - Utiliser les adverbes de lieu
 * 
 * Durée estimée: 45 minutes
 * Niveau: B2-C1
 */

import type { Seance } from '@/services/pocketbase';

export const seance2: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Le vocabulaire de l'espace et de l'ailleurs",
  description: "Exploration approfondie des métaphores spatiales et du vocabulaire géographique dans 'Là-bas'",
  ordre: 2,
  duree_estimee: 45,
  
  objectifs: [
    "Maîtriser les adverbes de lieu (ici, là-bas, ailleurs)",
    "Comprendre l'usage métaphorique de l'espace",
    "Différencier espace géographique et espace symbolique",
    "Enrichir son vocabulaire spatial en français"
  ],
  
  niveau: "B2",
  prerequis: { seances_completees: ["seance-1"] },
  actif: true,
  
  competences_ciblees: [
    { code: "VOCAB_SPATIAL", poids: 40 },
    { code: "VOCAB_EMOTIONNEL", poids: 20 },
    { code: "COMPREHENSION_METAPHORE", poids: 25 },
    { code: "PENSEE_CRITIQUE", poids: 15 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction au vocabulaire spatial
    {
      id: "ecran-1",
      type: "introduction",
      titre: "L'espace dans 'Là-bas'",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Le vocabulaire de l'espace : Plus qu'une géographie

## 🗺️ Cette séance

Vous allez explorer comment Jean-Jacques Goldman utilise le **vocabulaire spatial** pour exprimer des idées philosophiques profondes.

## Les mots-clés de l'espace

Dans "Là-bas", les mots comme **"ici"**, **"là-bas"** et **"ailleurs"** ne désignent pas vraiment des lieux géographiques.

Ce sont des **métaphores** pour parler de :
- 🔒 L'**enfermement** vs 🌈 la **liberté**
- 😴 L'**aliénation** vs ✨ l'**authenticité**  
- 🔄 La **routine** vs 🚀 le **changement**

## 🎯 Objectifs

À la fin de cette séance, vous saurez :
- ✅ Utiliser correctement les adverbes de lieu
- ✅ Comprendre les métaphores spatiales
- ✅ Distinguer espace réel et espace symbolique
- ✅ Enrichir votre vocabulaire spatial`,
        
        consignes: "Lisez cette introduction, puis cliquez sur 'Suivant'.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Les adverbes de lieu
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Les adverbes de lieu en français",
      ordre: 2,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Les adverbes de lieu

## 📍 Définition

Les **adverbes de lieu** indiquent où se passe une action.

## 🗺️ Les principaux adverbes

| Adverbe | Sens | Exemple |
|---------|------|---------|
| **ici** | à cet endroit (proche) | "Ici, tout est gris" |
| **là** | à cet endroit (moins précis) | "C'est là que je suis né" |
| **là-bas** | à cet endroit (éloigné) | "Là-bas, tout serait différent" |
| **ailleurs** | dans un autre lieu | "Je voudrais être ailleurs" |
| **partout** | en tous lieux | "C'est pareil partout" |
| **nulle part** | en aucun lieu | "Je ne vais nulle part" |

## 🎵 Dans "Là-bas"

La chanson utilise principalement :
- **ICI** : le lieu actuel (négatif)
- **LÀ-BAS** : le lieu désiré (positif)
- **AILLEURS** : l'alternative (espoir)

## ⚖️ Opposition binaire

La chanson crée une **opposition** :

**ICI** ⚔️ **LÀ-BAS**

- Ici = aliénation
- Là-bas = liberté

C'est une structure très claire qui renforce le message.

## 💡 Usage métaphorique

**IMPORTANT** : Dans la chanson, ces adverbes ne sont pas littéraux !

- "Ici" ≠ la France
- "Là-bas" ≠ un pays précis
- "Ailleurs" ≠ une destination

Ce sont des **états d'être**, pas des lieux géographiques.`,
        
        consignes: "Étudiez ce tableau, puis passez à l'exercice.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Exercice sur les adverbes
    {
      id: "ecran-3",
      type: "exercice",
      titre: "Pratiquer les adverbes de lieu",
      ordre: 3,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Exercice : Complétez avec le bon adverbe

Choisissez l'adverbe de lieu approprié pour chaque phrase.`,
        
        consignes: "Complétez chaque phrase avec l'adverbe qui convient.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "choix_multiple",
          consigne: "Sélectionnez le bon adverbe pour chaque phrase :",
          questions: [
            {
              id: "q1",
              texte: "_____, les gens sont comme endormis. (dans ce lieu actuel)",
              options: ["Ici", "Là-bas", "Ailleurs", "Partout"],
              reponse_correcte: 0,
              feedback: {
                correct: "Exact ! 'Ici' désigne le lieu actuel, proche du locuteur.",
                incorrect: "'Ici' est correct car il désigne le lieu actuel où le narrateur se trouve."
              }
            },
            {
              id: "q2",
              texte: "Je veux partir _____, loin de cette routine. (lieu éloigné)",
              options: ["ici", "là-bas", "nulle part", "partout"],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! 'Là-bas' indique un lieu éloigné, différent.",
                incorrect: "'Là-bas' est le bon choix pour indiquer un lieu éloigné et désiré."
              }
            },
            {
              id: "q3",
              texte: "Mon cœur est _____, pas dans cette ville grise. (autre lieu)",
              options: ["ici", "là", "ailleurs", "nulle part"],
              reponse_correcte: 2,
              feedback: {
                correct: "Bravo ! 'Ailleurs' signifie 'dans un autre lieu'.",
                incorrect: "'Ailleurs' est correct pour exprimer un autre lieu, une alternative."
              }
            },
            {
              id: "q4",
              texte: "C'est pareil _____, les gens ont perdu leurs rêves. (en tous lieux)",
              options: ["ici", "là-bas", "partout", "ailleurs"],
              reponse_correcte: 2,
              feedback: {
                correct: "Exact ! 'Partout' signifie 'en tous lieux'.",
                incorrect: "'Partout' est le bon choix pour indiquer 'en tous lieux'."
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
    
    // ÉCRAN 4 : Métaphores spatiales
    {
      id: "ecran-4",
      type: "analyse",
      titre: "Les métaphores spatiales : Au-delà de la géographie",
      ordre: 4,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Les métaphores spatiales

## 🧠 Qu'est-ce qu'une métaphore spatiale ?

Une **métaphore spatiale** utilise le vocabulaire de l'espace pour parler d'autre chose.

### Exemple classique
"Être au sommet" ne signifie pas être physiquement en haut d'une montagne, mais réussir, exceller.

## 🎵 Dans "Là-bas"

### "Ici" = L'aliénation sociale

Quand Goldman chante "Ici, les gens sont endormis", il ne parle pas d'un lieu géographique précis.

**"Ici" représente** :
- 🔒 La société conformiste
- 😴 L'apathie collective
- 🔄 La routine aliénante
- 🎭 La perte d'authenticité

### "Là-bas" = L'authenticité désirée

"Là-bas" n'est pas un pays, une ville ou une région.

**"Là-bas" symbolise** :
- ✨ Un état d'authenticité
- 🌈 La liberté d'être soi
- ❤️ La vie intense et vraie
- 💫 Les possibilités infinies

### "Partir" = La transformation

Le verbe "partir" ne signifie pas voyager.

**"Partir" exprime** :
- 🦋 Se transformer
- 💪 Rompre avec le conformisme
- 🚀 S'ouvrir aux possibilités
- 🔓 Se libérer

## 🌍 Comparaison

| Sens littéral | Sens métaphorique |
|---------------|-------------------|
| Ici = ce lieu géographique | Ici = l'aliénation |
| Là-bas = un autre pays | Là-bas = l'authenticité |
| Partir = voyager | Partir = se transformer |
| Ailleurs = autre endroit | Ailleurs = autre mode de vie |

## 💭 Philosophie

Cette métaphore spatiale s'inspire de concepts philosophiques :
- **Heidegger** : l'être-dans-le-monde authentique vs inauthentique
- **Sartre** : la liberté comme projet, l'exil existentiel
- **Bourdieu** : l'habitus, la reproduction sociale

Le "là-bas" est un **non-lieu**, une **utopie** (étymologiquement : "qui n'existe nulle part").`,
        
        consignes: "Lisez attentivement ce texte, puis répondez aux questions.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Questions de compréhension :",
          questions: [
            {
              id: "q1",
              texte: "Dans la chanson, que représente métaphoriquement 'ici' ?",
              options: [
                "La France géographique",
                "La société conformiste et aliénante",
                "La ville de Paris",
                "L'enfance du narrateur"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! 'Ici' représente la société conformiste et aliénante.",
                incorrect: "'Ici' n'est pas un lieu géographique mais représente l'aliénation sociale."
              }
            },
            {
              id: "q2",
              texte: "'Là-bas' existe-t-il vraiment comme lieu géographique ?",
              options: [
                "Oui, c'est un pays tropical",
                "Oui, c'est l'Amérique",
                "Non, c'est un espace symbolique, une utopie",
                "Oui, c'est l'Afrique"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Exact ! 'Là-bas' est une utopie, un espace symbolique qui n'existe pas géographiquement.",
                incorrect: "'Là-bas' n'est pas un lieu réel mais un espace symbolique, une utopie."
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
    
    // ÉCRAN 5 : Écoute ciblée - Repérage spatial
    {
      id: "ecran-5",
      type: "ecoute_ciblee",
      titre: "Écoute ciblée : Repérer le vocabulaire spatial",
      ordre: 5,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Écoute ciblée : Le vocabulaire spatial

## 🎧 Mission d'écoute

Écoutez attentivement et **comptez** :
- 🔴 Combien de fois entendez-vous "**ici**" ?
- 🔵 Combien de fois entendez-vous "**là-bas**" ?
- 🟢 Combien de fois entendez-vous "**ailleurs**" ?
- 🟡 Combien de fois entendez-vous "**partir**" ?

## 📝 Conseil

- Notez sur papier à chaque occurrence
- Concentrez-vous uniquement sur ces 4 mots
- Réécoutez si nécessaire !

**Cliquez sur Play pour commencer** ▶️`,
        
        audio: {
          url: "/Répertoire des chansons/Jean-Jacques Goldman, Sirima - Là-bas.mp3",
        },
        
        consignes: "Écoutez et comptez les occurrences de chaque mot spatial.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "saisie_libre",
          consigne: "Combien de fois avez-vous entendu chaque mot ?",
          questions: [
            {
              id: "q1",
              texte: "Nombre de fois 'ici' :",
              type: "nombre",
              reponse_correcte: "2",
              tolerance: 1,
              feedback: {
                correct: "Bien compté ! 'Ici' apparaît 2 fois.",
                incorrect: "Réécoutez : 'ici' apparaît environ 2 fois dans la chanson."
              }
            },
            {
              id: "q2",
              texte: "Nombre de fois 'là-bas' :",
              type: "nombre",
              reponse_correcte: "8",
              tolerance: 1,
              feedback: {
                correct: "Excellent ! 'Là-bas' est le mot le plus répété (environ 8 fois).",
                incorrect: "'Là-bas' est très répété : environ 8 occurrences. Réécoutez le refrain !"
              }
            },
            {
              id: "q3",
              texte: "Nombre de fois 'ailleurs' :",
              type: "nombre",
              reponse_correcte: "4",
              tolerance: 1,
              feedback: {
                correct: "Parfait ! 'Ailleurs' apparaît environ 4 fois.",
                incorrect: "'Ailleurs' apparaît environ 4 fois. Réécoutez attentivement !"
              }
            },
            {
              id: "q4",
              texte: "Nombre de fois 'partir' :",
              type: "nombre",
              reponse_correcte: "8",
              tolerance: 1,
              feedback: {
                correct: "Bravo ! 'Partir' revient environ 8 fois, comme 'là-bas'.",
                incorrect: "'Partir' est très répété, comme 'là-bas' : environ 8 fois."
              }
            }
          ],
          score_max: 20,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 20,
        seuil_reussite: 12,
      },
    },
    
    // ÉCRAN 6 : Production guidée
    {
      id: "ecran-6",
      type: "production_guidee",
      titre: "Créer vos propres métaphores spatiales",
      ordre: 6,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Créer vos propres métaphores spatiales

## ✍️ À vous de jouer !

Créez **3 phrases** en utilisant le vocabulaire spatial de manière métaphorique.

### Modèle à suivre

**Phrase type** : "[Ici/Là-bas/Ailleurs], [description d'un état d'être ou d'une situation]"

### Exemples

✅ "Ici, dans cette entreprise, les employés ont perdu leur créativité"  
✅ "Là-bas, dans mes rêves, je suis libre"  
✅ "Ailleurs, la vie serait peut-être plus simple"

## 💡 Idées de thèmes

- Votre vie professionnelle
- Vos relations personnelles
- Votre ville ou pays
- Vos rêves et aspirations
- La société actuelle

## 📝 Consignes

Écrivez **3 phrases** :
1. Une avec "**ici**" (situation actuelle négative)
2. Une avec "**là-bas**" (situation désirée positive)
3. Une avec "**ailleurs**" (alternative, possibilité)`,
        
        consignes: "Créez vos 3 phrases métaphoriques.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Phrase 1 (avec 'ici') :",
          nombre_mots_min: 8,
          nombre_mots_max: 25,
          criteres_evaluation: [
            "Utilisation correcte de 'ici'",
            "Sens métaphorique (non géographique)",
            "Correction grammaticale"
          ],
          score_max: 10,
        },
        {
          id: "activite-2",
          type: "production_ecrite",
          consigne: "Phrase 2 (avec 'là-bas') :",
          nombre_mots_min: 8,
          nombre_mots_max: 25,
          criteres_evaluation: [
            "Utilisation correcte de 'là-bas'",
            "Sens métaphorique (non géographique)",
            "Correction grammaticale"
          ],
          score_max: 10,
        },
        {
          id: "activite-3",
          type: "production_ecrite",
          consigne: "Phrase 3 (avec 'ailleurs') :",
          nombre_mots_min: 8,
          nombre_mots_max: 25,
          criteres_evaluation: [
            "Utilisation correcte de 'ailleurs'",
            "Sens métaphorique (non géographique)",
            "Correction grammaticale"
          ],
          score_max: 10,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Vos phrases seront évaluées selon leur utilisation métaphorique du vocabulaire spatial et leur correction grammaticale."
      },
    },
    
    // ÉCRAN 7 : Synthèse et bilan
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Bilan : Maîtriser l'espace métaphorique",
      ordre: 7,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Bilan de la séance 2

## ✅ Ce que vous avez appris

### Vocabulaire
- Les adverbes de lieu : ici, là-bas, ailleurs, partout, nulle part
- Leur usage littéral vs métaphorique

### Compréhension
- Les métaphores spatiales expriment des états d'être
- "Ici" = aliénation, "Là-bas" = liberté
- L'espace comme dimension philosophique

### Production
- Créer des métaphores spatiales
- Utiliser le vocabulaire spatial de manière poétique

## 📊 Votre score total : {{score_total}} / 100 points

## 🎯 Prochaine séance

**Séance 3 : Le conditionnel - Exprimer l'hypothèse et le souhait**

Vous allez découvrir comment Goldman utilise le **conditionnel présent** pour exprimer :
- 🌈 Ses souhaits et rêves
- 🤔 Ses hypothèses sur un autre monde
- 💭 Sa vision d'une vie différente

**Temps recommandé avant la séance 3** : 1 jour (pour laisser décanter les apprentissages)

---

**Bravo pour votre travail ! 🎉**`,
        
        consignes: "Lisez ce bilan. Cliquez sur 'Terminer' pour valider la séance.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
  ],
};

export default seance2;
