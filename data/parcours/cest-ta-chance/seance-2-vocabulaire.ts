/**
 * Séance 2 : Vocabulaire de l'encouragement et de l'opportunité
 * 
 * Objectifs:
 * - Maîtriser le vocabulaire de l'encouragement
 * - Comprendre les expressions d'opportunité
 * - Différencier encouragement et découragement
 * - Enrichir son expression positive
 * 
 * Durée estimée: 45 minutes
 * Niveau: B1-B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance2: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Vocabulaire de l'encouragement",
  description: "Exploration approfondie du vocabulaire de l'encouragement, de l'opportunité et de la résilience dans 'C'est ta chance'",
  ordre: 2,
  duree_estimee: 45,
  
  objectifs: [
    "Maîtriser le vocabulaire de l'encouragement",
    "Utiliser les expressions d'opportunité",
    "Différencier mots positifs et négatifs",
    "Encourager quelqu'un en français"
  ],
  
  niveau: "B1",
  prerequis: { seances_completees: ["seance-1"] },
  actif: true,
  
  competences_ciblees: [
    { code: "VOCAB_ENCOURAGEMENT", poids: 40 },
    { code: "VOCAB_OPPORTUNITE", poids: 25 },
    { code: "EXPRESSION_POSITIVE", poids: 20 },
    { code: "PRODUCTION_ORALE", poids: 15 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Les mots qui donnent de la force",
      ordre: 1,
      duree_estimee: 4,
      
      contenu: {
        texte: `# Les mots qui donnent de la force

## 🎯 Cette séance

Les **mots** ont un pouvoir incroyable :
- 💪 Les bons mots **encouragent**
- 😔 Les mauvais mots **découragent**

Dans cette séance, vous allez apprendre le **vocabulaire de l'encouragement** pour :
- ✅ Motiver quelqu'un en français
- ✅ Parler d'opportunités
- ✅ Exprimer la confiance et l'espoir
- ✅ Combattre le découragement

## 📚 Programme

1. Le vocabulaire de l'encouragement
2. Les expressions d'opportunité
3. Opposition : encouragement vs découragement
4. Exercices pratiques
5. Production : Encourager quelqu'un

**Durée** : environ 45 minutes

Prêt(e) à apprendre les mots qui changent tout ? C'est parti ! 🚀`,
        
        consignes: "Lisez cette introduction.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Vocabulaire de l'encouragement
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Le vocabulaire de l'encouragement",
      ordre: 2,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Le vocabulaire de l'encouragement

## 💪 Les verbes d'action positive

| Verbe | Sens | Exemple |
|-------|------|---------|
| **Foncer** | Aller de l'avant sans hésiter | "Vas-y, fonce !" |
| **Saisir** | Prendre une opportunité | "Saisis ta chance !" |
| **Oser** | Avoir le courage de | "Ose rêver grand !" |
| **Tenter** | Essayer, prendre un risque | "Il faut tenter !" |
| **Croire (en)** | Avoir confiance | "Crois en toi !" |
| **Réussir** | Atteindre son objectif | "Tu vas réussir !" |
| **Persévérer** | Continuer malgré les difficultés | "Persévère, ça va payer !" |

## 🌟 Les noms de l'opportunité

| Nom | Sens | Exemple |
|-----|------|---------|
| **La chance** | Opportunité favorable | "C'est ta chance !" |
| **L'opportunité** | Occasion à saisir | "Quelle opportunité !" |
| **Le courage** | Force morale pour agir | "Tu as du courage" |
| **La détermination** | Volonté ferme | "Ta détermination est admirable" |
| **La résilience** | Capacité à rebondir | "Tu as fait preuve de résilience" |
| **La force** | Capacité intérieure | "Tu as cette force en toi" |

## ✨ Les adjectifs positifs

| Adjectif | Sens | Exemple |
|----------|------|---------|
| **Capable** | Qui a les capacités | "Tu es capable !" |
| **Fort(e)** | Qui a de la force | "Tu es plus fort(e) que tu crois" |
| **Courageux(se)** | Qui a du courage | "Tu es courageux(se)" |
| **Déterminé(e)** | Qui a une volonté ferme | "Tu es déterminé(e)" |
| **Talentueux(se)** | Qui a du talent | "Tu es talentueux(se)" |

## 🎵 Dans la chanson

Goldman utilise :
- "**Vas-y, fonce**" → Action immédiate
- "**Prends-la**" (ta chance) → Saisir l'opportunité
- "**Ne doute pas**" → Avoir confiance
- "**Tu as cette force**" → Reconnaissance du potentiel`,
        
        consignes: "Étudiez ce vocabulaire attentivement.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Exercice vocabulaire
    {
      id: "ecran-3",
      type: "exercice",
      titre: "Pratiquer le vocabulaire positif",
      ordre: 3,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Exercice : Choisir le bon mot`,
        consignes: "Complétez chaque phrase avec le mot qui convient.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "choix_multiple",
          consigne: "Sélectionnez le bon mot pour chaque phrase d'encouragement :",
          questions: [
            {
              id: "q1",
              texte: "_____ ! Tu n'as rien à perdre et tout à gagner !",
              options: ["Abandonne", "Fonce", "Hésite", "Doute"],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! 'Fonce' encourage à aller de l'avant.",
                incorrect: "'Fonce' est le bon mot pour encourager quelqu'un à agir sans hésiter."
              }
            },
            {
              id: "q2",
              texte: "_____ cette opportunité avant qu'elle ne disparaisse !",
              options: ["Ignore", "Saisis", "Manque", "Refuse"],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! 'Saisis' signifie prendre, profiter de.",
                incorrect: "'Saisis' est le verbe pour encourager à prendre une opportunité."
              }
            },
            {
              id: "q3",
              texte: "Tu es _____ de réussir, j'en suis certain !",
              options: ["incapable", "capable", "faible", "impossible"],
              reponse_correcte: 1,
              feedback: {
                correct: "Bravo ! 'Capable' exprime la confiance en la capacité de quelqu'un.",
                incorrect: "'Capable' est l'adjectif positif qui exprime la confiance."
              }
            },
            {
              id: "q4",
              texte: "Ne _____ pas de toi, tu as tout ce qu'il faut !",
              options: ["crois", "doute", "fie", "réussis"],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! 'Ne doute pas' encourage la confiance en soi.",
                incorrect: "'Ne doute pas' est l'expression pour combattre le manque de confiance."
              }
            },
            {
              id: "q5",
              texte: "_____ grand, tu le mérites !",
              options: ["Abandonne", "Crains", "Ose", "Évite"],
              reponse_correcte: 2,
              feedback: {
                correct: "Excellent ! 'Ose' encourage à avoir du courage.",
                incorrect: "'Ose' est le verbe qui encourage à avoir le courage de."
              }
            }
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
    
    // ÉCRAN 4 : Opposition encouragement vs découragement
    {
      id: "ecran-4",
      type: "analyse",
      titre: "Encouragement vs Découragement",
      ordre: 4,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Opposition : Encouragement vs Découragement

## ⚖️ Les deux voix

Dans la vie (et dans la chanson), il y a **deux types de voix** :

### 😔 La voix du découragement

**Ce qu'elle dit** :
- ❌ "C'est trop dur pour toi"
- ❌ "Tu n'y arriveras jamais"
- ❌ "Reste à ta place"
- ❌ "C'est trop risqué"
- ❌ "Tu n'es pas assez bon(ne)"

**Vocabulaire négatif** :
- Abandonner, douter, hésiter, échouer, impossible, faible

### 💪 La voix de l'encouragement

**Ce qu'elle dit** :
- ✅ "Tu peux le faire"
- ✅ "Essaie, tu verras bien"
- ✅ "Tu as du potentiel"
- ✅ "Prends des risques"
- ✅ "Tu es capable"

**Vocabulaire positif** :
- Foncer, oser, croire, réussir, possible, fort(e)

## 🎵 Dans "C'est ta chance"

Goldman identifie clairement les deux voix :

**Découragement** :
> "Ils vont te dire que c'est trop dur pour toi"  
> "Ceux qui doutent de toi"

**Encouragement** :
> "Vas-y, fonce !"  
> "Tu as cette force en toi"  
> "Le monde t'appartient"

## 💡 Comment réagir ?

### Face au découragement :
1. **Reconnaître** : Identifier les voix négatives
2. **Questionner** : Sont-elles justifiées ou juste des peurs ?
3. **Choisir** : Décider quelle voix écouter

### Choisir l'encouragement :
- Ne pas laisser les autres définir tes limites
- S'entourer de personnes qui croient en toi
- Être sa propre voix d'encouragement`,
        
        consignes: "Lisez attentivement, puis répondez au quiz.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Identifiez le type de phrase :",
          questions: [
            {
              id: "q1",
              texte: "'C'est trop risqué, tu ne devrais pas essayer' est :",
              options: [
                "Un encouragement",
                "Un découragement",
                "Un compliment",
                "Une question"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Exact ! Cette phrase décourage et instille la peur.",
                incorrect: "Cette phrase décourage en parlant de risque de manière négative."
              }
            },
            {
              id: "q2",
              texte: "'Tu as du talent, lance-toi !' est :",
              options: [
                "Un découragement",
                "Une critique",
                "Un encouragement",
                "Une menace"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Parfait ! Cette phrase encourage et valorise.",
                incorrect: "Cette phrase encourage en reconnaissant le talent et en poussant à l'action."
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
    
    // ÉCRAN 5 : Expressions idiomatiques
    {
      id: "ecran-5",
      type: "culture",
      titre: "Expressions françaises d'encouragement",
      ordre: 5,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Expressions françaises d'encouragement

## 🇫🇷 Expressions courantes

### "Vas-y !"
**Sens** : Allez, fais-le !  
**Usage** : Encouragement direct à agir  
**Exemple** : "Tu hésites ? Vas-y !"

### "Fonce !"
**Sens** : Va de l'avant sans hésiter !  
**Usage** : Encouragement très énergique  
**Exemple** : "Cette opportunité est géniale, fonce !"

### "Tu peux le faire !"
**Sens** : Tu as la capacité de réussir  
**Usage** : Donner confiance  
**Exemple** : "C'est difficile, mais tu peux le faire !"

### "Accroche-toi !"
**Sens** : Continue, ne lâche pas  
**Usage** : Encourager la persévérance  
**Exemple** : "C'est dur, mais accroche-toi !"

### "C'est le moment ou jamais !"
**Sens** : Il faut agir maintenant  
**Usage** : Créer l'urgence positive  
**Exemple** : "Cette chance ne reviendra pas, c'est le moment ou jamais !"

### "Tu n'as rien à perdre !"
**Sens** : Le risque est minimal  
**Usage** : Dédramatiser l'échec potentiel  
**Exemple** : "Essaie ! Tu n'as rien à perdre !"

### "Je crois en toi !"
**Sens** : J'ai confiance en tes capacités  
**Usage** : Soutien émotionnel fort  
**Exemple** : "Même si tu doutes, moi je crois en toi !"

## 🎵 Dans la chanson

Goldman utilise plusieurs de ces expressions :
- "**Vas-y, fonce**" → Action immédiate
- "**Tu n'as rien à perdre**" → Dédramatisation
- "**C'est maintenant**" → Urgence positive

## 💬 À vous de les utiliser !

Dans la vie quotidienne, ces expressions sont **très utiles** pour :
- Encourager un(e) ami(e)
- Motiver un(e) collègue
- S'encourager soi-même !`,
        
        consignes: "Apprenez ces expressions, puis passez à l'exercice.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 6 : Production guidée
    {
      id: "ecran-6",
      type: "production_guidee",
      titre: "Encourager quelqu'un",
      ordre: 6,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Pratiquer : Encourager quelqu'un

## 🎯 Situation

Imaginez qu'un(e) ami(e) vous dit :

> "J'ai une opportunité de changer de travail, mais j'ai peur. C'est risqué, je ne sais pas si je suis assez bon(ne). Ma famille me dit de rester où je suis."

## ✍️ Votre mission

Écrivez **5 phrases** pour encourager votre ami(e).

### Consignes

**Utilisez** :
- ✅ Au moins **3 verbes** du vocabulaire de l'encouragement (foncer, oser, saisir, croire, etc.)
- ✅ Au moins **2 expressions** françaises d'encouragement
- ✅ Des **arguments positifs** concrets

### Structure suggérée

1. **Phrase 1** : Reconnaître que c'est normal d'avoir peur
2. **Phrase 2** : Encourager à oser
3. **Phrase 3** : Argument positif (potentiel, capacités)
4. **Phrase 4** : Urgence / Opportunité
5. **Phrase 5** : Soutien personnel

## 💡 Exemple

✅ "C'est normal d'avoir peur du changement. Mais je pense que tu devrais **oser** ! Tu as tellement de **talent**, tu es vraiment **capable** de réussir dans ce nouveau poste. Cette opportunité ne reviendra peut-être pas, c'est le **moment ou jamais** ! Et surtout, sache que **je crois en toi** !"`,
        
        consignes: "Écrivez vos 5 phrases d'encouragement.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Vos 5 phrases d'encouragement :",
          nombre_mots_min: 60,
          nombre_mots_max: 120,
          criteres_evaluation: [
            "5 phrases distinctes",
            "Utilisation d'au moins 3 verbes du vocabulaire",
            "Utilisation d'au moins 2 expressions françaises",
            "Arguments positifs et concrets",
            "Ton chaleureux et encourageant"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Votre texte sera évalué sur l'utilisation du vocabulaire et la qualité de l'encouragement."
      },
    },
    
    // ÉCRAN 7 : Synthèse
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Bilan : Maîtriser l'encouragement",
      ordre: 7,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Bilan de la séance 2

## ✅ Ce que vous avez appris

### Vocabulaire maîtrisé
- **Verbes** : foncer, saisir, oser, tenter, croire, persévérer
- **Noms** : chance, opportunité, courage, détermination, résilience
- **Adjectifs** : capable, fort(e), courageux(se), déterminé(e)

### Expressions françaises
- "Vas-y !", "Fonce !", "Tu peux le faire !"
- "Accroche-toi !", "C'est le moment ou jamais !"
- "Tu n'as rien à perdre !", "Je crois en toi !"

### Compétence développée
- ✅ Encourager quelqu'un en français
- ✅ Différencier encouragement et découragement
- ✅ Utiliser le vocabulaire positif

## 📊 Votre score total : {{score_total}} / 100 points

## 🎯 Prochaine séance

**Séance 3 : L'impératif - Donner des conseils**

Vous allez découvrir la **grammaire de l'encouragement** :
- 📚 Formation de l'impératif
- 💬 Impératif affirmatif vs négatif
- 🎵 L'impératif dans "C'est ta chance"

**Conseil** : Utilisez dès aujourd'hui ces expressions d'encouragement dans votre vie quotidienne !

---

**Bravo ! Vous avez maintenant les mots pour encourager ! 💪**`,
        
        consignes: "Lisez ce bilan, puis terminez la séance.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
  ],
};

export default seance2;
