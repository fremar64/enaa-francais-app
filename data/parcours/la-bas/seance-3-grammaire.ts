/**
 * Séance 3 : Le conditionnel présent - Exprimer l'hypothèse et le souhait
 * 
 * Objectifs:
 * - Maîtriser la formation du conditionnel présent
 * - Comprendre ses usages (souhait, hypothèse, politesse)
 * - Identifier le conditionnel dans "Là-bas"
 * - Produire des phrases au conditionnel
 * 
 * Durée estimée: 50 minutes
 * Niveau: B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance3: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Le conditionnel : Rêver d'un ailleurs",
  description: "Maîtriser le conditionnel présent pour exprimer souhaits, hypothèses et rêves comme dans 'Là-bas'",
  ordre: 3,
  duree_estimee: 50,
  
  objectifs: [
    "Former correctement le conditionnel présent",
    "Distinguer les usages du conditionnel (souhait, hypothèse, politesse)",
    "Identifier le conditionnel dans la chanson",
    "Exprimer ses propres souhaits au conditionnel"
  ],
  
  niveau: "B2",
  prerequis: { seances_completees: ["seance-1", "seance-2"] },
  actif: true,
  
  competences_ciblees: [
    { code: "GRAM_CONDITIONNEL", poids: 50 },
    { code: "PRODUCTION_ECRITE", poids: 25 },
    { code: "COMPREHENSION_GRAMMAIRE", poids: 15 },
    { code: "PENSEE_CRITIQUE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Le temps de l'hypothèse et du rêve",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Le conditionnel : Le temps du rêve et de l'hypothèse

## 🎯 Cette séance

Vous allez découvrir et maîtriser le **conditionnel présent**, un temps verbal essentiel en français pour :
- 💭 Exprimer des **souhaits** et des **rêves**
- 🤔 Formuler des **hypothèses**
- 🙏 Faire des demandes **polies**
- 🌈 Imaginer des **possibilités**

## 🎵 Dans "Là-bas"

Bien que la chanson utilise principalement l'**infinitif** ("Partir, là-bas, partir"), le message exprime implicitement un **souhait** qui pourrait se formuler au conditionnel :

- "Je **partirais** là-bas" (Je voudrais partir)
- "Je **sentirais** ailleurs mon cœur" (Je voudrais sentir)
- "Là-bas, je **vivrais** autrement" (hypothèse)

## 📚 Programme

1. Formation du conditionnel
2. Les usages du conditionnel
3. Exercices pratiques
4. Analyse de la chanson
5. Production personnelle

**Durée** : environ 50 minutes

Prêt(e) à maîtriser le conditionnel ? C'est parti ! 🚀`,
        
        consignes: "Lisez cette introduction, puis cliquez sur 'Suivant'.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Formation du conditionnel
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Formation du conditionnel présent",
      ordre: 2,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Formation du conditionnel présent

## 🔧 La règle générale

**Conditionnel = Infinitif + terminaisons de l'imparfait**

### Les terminaisons

Pour **tous les verbes** :
- je → **-ais**
- tu → **-ais**
- il/elle/on → **-ait**
- nous → **-ions**
- vous → **-iez**
- ils/elles → **-aient**

## 📖 Exemples réguliers

### Verbe PARTIR
| Personne | Conditionnel |
|----------|--------------|
| Je | partir**ais** |
| Tu | partir**ais** |
| Il/Elle | partir**ait** |
| Nous | partir**ions** |
| Vous | partir**iez** |
| Ils/Elles | partir**aient** |

### Verbe SENTIR
- Je **sentir**ais
- Tu **sentir**ais
- Il/Elle **sentir**ait
- Nous **sentir**ions
- Vous **sentir**iez
- Ils/Elles **sentir**aient

## ⚠️ Verbes irréguliers (IMPORTANT !)

Certains verbes ont un **radical irrégulier** mais gardent les **mêmes terminaisons** :

| Infinitif | Radical | Exemple |
|-----------|---------|---------|
| **être** | ser- | je **serais** |
| **avoir** | aur- | j'**aurais** |
| **aller** | ir- | j'**irais** |
| **faire** | fer- | je **ferais** |
| **pouvoir** | pourr- | je **pourrais** |
| **vouloir** | voudr- | je **voudrais** |
| **savoir** | saur- | je **saurais** |
| **voir** | verr- | je **verrais** |
| **venir** | viendr- | je **viendrais** |
| **devoir** | devr- | je **devrais** |

## 💡 Astuce mnémotechnique

Pour les verbes en **-er** et **-ir**, c'est simple :
- **Infinitif complet** + terminaisons de l'imparfait

Pour les verbes irréguliers :
- Apprenez les **radicaux** par cœur !
- La bonne nouvelle : il y en a moins de 20 à connaître

## 🎵 Dans "Là-bas"

Si on transformait les infinitifs en conditionnel :

**Infinitif** → **Conditionnel**
- "Partir" → "Je **partirais**"
- "Sentir" → "Je **sentirais**"
- "Être" → "Je **serais**" (irrégulier !)`,
        
        consignes: "Étudiez cette leçon de grammaire, puis passez à l'exercice.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Exercice de formation
    {
      id: "ecran-3",
      type: "exercice",
      titre: "Pratiquer : Former le conditionnel",
      ordre: 3,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Exercice : Conjuguer au conditionnel

Conjuguez les verbes entre parenthèses au **conditionnel présent**.`,
        
        consignes: "Complétez chaque phrase avec le verbe au conditionnel présent.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "texte_a_trous",
          consigne: "Conjuguez les verbes au conditionnel présent :",
          phrases: [
            {
              id: "p1",
              texte: "Je _____ (partir) demain si je pouvais.",
              reponse: "partirais",
              feedback: {
                correct: "Exact ! 'Partir' au conditionnel → je partirais",
                incorrect: "Verbe régulier : infinitif 'partir' + terminaison '-ais' = 'partirais'"
              }
            },
            {
              id: "p2",
              texte: "Nous _____ (sentir) notre cœur battre là-bas.",
              reponse: "sentirions",
              feedback: {
                correct: "Parfait ! 'Sentir' + '-ions' = sentirions",
                incorrect: "Infinitif 'sentir' + terminaison '-ions' = 'sentirions'"
              }
            },
            {
              id: "p3",
              texte: "Tu _____ (être) plus heureux ailleurs.",
              reponse: "serais",
              feedback: {
                correct: "Bravo ! Verbe irrégulier : radical 'ser-' + '-ais' = serais",
                incorrect: "Attention : 'être' est irrégulier ! Radical 'ser-' + '-ais' = 'serais'"
              }
            },
            {
              id: "p4",
              texte: "Vous _____ (avoir) plus de liberté là-bas.",
              reponse: "auriez",
              feedback: {
                correct: "Excellent ! 'Avoir' irrégulier : radical 'aur-' + '-iez' = auriez",
                incorrect: "'Avoir' est irrégulier ! Radical 'aur-' + '-iez' = 'auriez'"
              }
            },
            {
              id: "p5",
              texte: "Ils _____ (pouvoir) recommencer leur vie.",
              reponse: "pourraient",
              feedback: {
                correct: "Très bien ! 'Pouvoir' irrégulier : radical 'pourr-' + '-aient' = pourraient",
                incorrect: "'Pouvoir' est irrégulier ! Radical 'pourr-' + '-aient' = 'pourraient'"
              }
            },
            {
              id: "p6",
              texte: "Je _____ (vouloir) vivre autrement.",
              reponse: "voudrais",
              feedback: {
                correct: "Parfait ! 'Vouloir' irrégulier : radical 'voudr-' + '-ais' = voudrais",
                incorrect: "'Vouloir' est irrégulier ! Radical 'voudr-' + '-ais' = 'voudrais'"
              }
            }
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 30,
        seuil_reussite: 24,
      },
    },
    
    // ÉCRAN 4 : Les usages du conditionnel
    {
      id: "ecran-4",
      type: "apprentissage",
      titre: "Les trois usages du conditionnel",
      ordre: 4,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Les trois usages principaux du conditionnel

## 1️⃣ Exprimer un SOUHAIT / un RÊVE

**Usage** : Dire ce qu'on aimerait faire, ce qu'on voudrait

**Exemples** :
- "J'**aimerais** partir là-bas"
- "Je **voudrais** vivre autrement"
- "Nous **souhaiterions** plus de liberté"

💡 Souvent utilisé avec : aimer, vouloir, souhaiter, rêver, préférer

## 2️⃣ Exprimer une HYPOTHÈSE / une CONDITION

**Usage** : Dire ce qui se passerait SI une condition était remplie

**Structure** : SI + imparfait, ... conditionnel

**Exemples** :
- "**Si j'avais** de l'argent, je **partirais** demain" (mais je n'en ai pas)
- "**Si nous étions** libres, nous **irions** là-bas" (mais nous ne le sommes pas)
- "**Si les gens n'étaient pas** endormis, ils **réagiraient**" (mais ils le sont)

💡 L'hypothèse porte sur quelque chose d'**irréel au présent**

## 3️⃣ Exprimer la POLITESSE

**Usage** : Adoucir une demande, être poli

**Exemples** :
- "Je **voudrais** un café, s'il vous plaît" (au lieu de "Je veux")
- "**Pourriez**-vous m'aider ?" (au lieu de "Pouvez-vous")
- "**Auriez**-vous l'heure ?" (au lieu de "Avez-vous")

💡 Rend la demande moins directe, plus courtoise

## 🎵 Dans "Là-bas"

Le message de la chanson relève du **souhait** :

**Sous-entendu** :
- "J'**aimerais** partir là-bas"
- "Je **voudrais** sentir ailleurs mon cœur"
- "**Si j'avais** le courage, je **partirais**"

Goldman utilise l'**infinitif** pour rendre le message **universel** et **intemporel**, mais le conditionnel est implicite.

## 📊 Tableau récapitulatif

| Usage | Structure | Exemple |
|-------|-----------|---------|
| Souhait | Conditionnel seul | "J'aimerais partir" |
| Hypothèse | SI + imparfait, conditionnel | "Si je pouvais, je partirais" |
| Politesse | Conditionnel de politesse | "Pourriez-vous m'aider ?" |`,
        
        consignes: "Lisez attentivement, puis répondez au quiz.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 5 : Quiz sur les usages
    {
      id: "ecran-5",
      type: "quiz",
      titre: "Identifier les usages du conditionnel",
      ordre: 5,
      duree_estimee: 7,
      
      contenu: {
        texte: `# Quiz : Quel usage du conditionnel ?

Pour chaque phrase, identifiez l'usage du conditionnel.`,
        
        consignes: "Sélectionnez l'usage correct pour chaque phrase.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "qcm",
          consigne: "Identifiez l'usage du conditionnel dans chaque phrase :",
          questions: [
            {
              id: "q1",
              texte: "'J'aimerais vivre ailleurs' exprime :",
              options: [
                "Un souhait / un rêve",
                "Une hypothèse avec condition",
                "Une demande polie",
                "Un ordre"
              ],
              reponse_correcte: 0,
              feedback: {
                correct: "Exact ! 'J'aimerais' exprime un souhait, un désir.",
                incorrect: "'Aimerais' exprime ici un souhait, pas une condition ni une demande polie."
              }
            },
            {
              id: "q2",
              texte: "'Si j'avais le temps, je partirais' exprime :",
              options: [
                "Un souhait simple",
                "Une hypothèse avec condition (SI + imparfait)",
                "Une demande polie",
                "Un regret du passé"
              ],
              reponse_correcte: 1,
              feedback: {
                correct: "Parfait ! SI + imparfait → conditionnel = hypothèse avec condition.",
                incorrect: "C'est une hypothèse : SI + imparfait, conditionnel."
              }
            },
            {
              id: "q3",
              texte: "'Pourriez-vous m'aider ?' exprime :",
              options: [
                "Un souhait",
                "Une hypothèse",
                "Une demande polie",
                "Une certitude"
              ],
              reponse_correcte: 2,
              feedback: {
                correct: "Bravo ! Le conditionnel de 'pouvoir' rend la demande plus polie.",
                incorrect: "C'est le conditionnel de politesse pour adoucir la demande."
              }
            },
            {
              id: "q4",
              texte: "'Nous voudrions plus de liberté' exprime :",
              options: [
                "Un souhait / un désir",
                "Une certitude",
                "Une obligation",
                "Un ordre"
              ],
              reponse_correcte: 0,
              feedback: {
                correct: "Exact ! 'Voudrions' exprime ce qu'on désire, ce qu'on souhaite.",
                incorrect: "'Voudrions' exprime un souhait, un désir."
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
    
    // ÉCRAN 6 : Production personnelle - Souhaits
    {
      id: "ecran-6",
      type: "production_ecrite",
      titre: "Vos souhaits au conditionnel",
      ordre: 6,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Exprimez vos souhaits au conditionnel

## ✍️ Production personnelle

Comme le narrateur de "Là-bas", vous avez sûrement des **souhaits**, des **rêves**, des choses que vous **aimeriez** faire ou être.

### 📝 Consigne

Écrivez **5 phrases** au conditionnel pour exprimer :
- Ce que vous **aimeriez** faire
- Où vous **voudriez** aller
- Comment vous **souhaiteriez** vivre
- Ce que vous **changeriez** dans votre vie
- Ce que vous **feriez** si vous étiez libre

## 💡 Verbes utiles au conditionnel

- J'**aimerais**...
- Je **voudrais**...
- Je **souhaiterais**...
- Je **partirais**...
- Je **vivrais**...
- Je **changerais**...
- Je **serais**...
- J'**irais**...

## 📖 Exemples

✅ "J'**aimerais** apprendre à jouer du piano"  
✅ "Je **voudrais** voyager en Asie"  
✅ "Je **vivrais** au bord de la mer si je pouvais"  
✅ "Je **changerais** de métier pour faire quelque chose de plus créatif"  
✅ "Je **serais** plus heureux avec moins de stress"`,
        
        consignes: "Écrivez vos 5 phrases au conditionnel (minimum 8 mots par phrase).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Écrivez vos 5 souhaits au conditionnel :",
          nombre_mots_min: 50,
          nombre_mots_max: 120,
          criteres_evaluation: [
            "5 phrases distinctes",
            "Utilisation correcte du conditionnel",
            "Variété des verbes (pas toujours les mêmes)",
            "Correction grammaticale",
            "Expression personnelle authentique"
          ],
          score_max: 30,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 30,
        seuil_reussite: 20,
        feedback_auto: "Vos phrases seront évaluées sur l'utilisation correcte du conditionnel et l'expression personnelle."
      },
    },
    
    // ÉCRAN 7 : Synthèse et transformation
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Transformer 'Là-bas' au conditionnel",
      ordre: 7,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Transformation : "Là-bas" au conditionnel

## 🎵 Exercice créatif final

Vous allez **transformer** des extraits de "Là-bas" en utilisant le **conditionnel**.

### Version originale (infinitif)
> "Partir, là-bas, partir  
> Sentir, ailleurs, mon cœur"

### Transformations possibles

**Version 1 - Souhait simple** :
> "J'**aimerais** partir, là-bas, partir  
> Je **voudrais** sentir, ailleurs, mon cœur"

**Version 2 - Hypothèse avec SI** :
> "**Si je pouvais**, je **partirais** là-bas  
> **Si j'étais** libre, je **sentirais** mon cœur ailleurs"

**Version 3 - Rêve collectif** :
> "Nous **partirions** là-bas  
> Nous **sentirions** nos cœurs battre ailleurs"

## ✍️ À vous !

Choisissez **2 extraits** de la chanson et transformez-les au conditionnel.

### Extraits proposés

1. "Partir, là-bas, partir"
2. "Sentir, ailleurs, mon cœur"
3. "Les gens ici n'ont plus de haine"
4. "Je veux croire aux rêves d'enfants"

**Écrivez 2 transformations** en variant les approches (souhait simple, hypothèse avec SI, etc.)

## 📊 Bilan de la séance

### Ce que vous avez appris

✅ **Formation** : Infinitif + terminaisons de l'imparfait  
✅ **Usages** : Souhait, hypothèse, politesse  
✅ **Verbes irréguliers** : être → serais, avoir → aurais, etc.  
✅ **Application** : Transformation créative de "Là-bas"

### Votre score : {{score_total}} / 100 points

## 🎯 Prochaine séance

**Séance 4 : Débat philosophique - L'aliénation et l'authenticité**

Vous allez :
- Analyser le message social de la chanson
- Débattre sur l'aliénation moderne
- Développer votre pensée critique
- Argumenter votre position

---

**Excellent travail sur le conditionnel ! 🎉**`,
        
        consignes: "Transformez 2 extraits au conditionnel, puis terminez.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Transformez 2 extraits de la chanson au conditionnel :",
          nombre_mots_min: 30,
          nombre_mots_max: 80,
          criteres_evaluation: [
            "2 transformations distinctes",
            "Utilisation correcte du conditionnel",
            "Créativité dans la transformation",
            "Correction grammaticale"
          ],
          score_max: 20,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 20,
        seuil_reussite: 12,
        feedback_auto: "Vos transformations seront évaluées sur la correction grammaticale et la créativité."
      },
    },
  ],
};

export default seance3;
