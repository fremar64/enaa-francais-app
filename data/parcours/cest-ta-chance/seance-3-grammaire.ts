/**
 * Séance 3 : L'impératif - Donner des conseils et encourager
 * 
 * Objectifs:
 * - Maîtriser la formation de l'impératif
 * - Utiliser l'impératif affirmatif et négatif
 * - Comprendre les pronoms avec l'impératif
 * - Donner des conseils efficaces
 * 
 * Durée estimée: 50 minutes
 * Niveau: B1-B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance3: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "L'impératif : La grammaire de l'encouragement",
  description: "Maîtriser l'impératif pour encourager, conseiller et donner des instructions comme dans 'C'est ta chance'",
  ordre: 3,
  duree_estimee: 50,
  
  objectifs: [
    "Former correctement l'impératif présent",
    "Utiliser l'impératif affirmatif et négatif",
    "Placer les pronoms avec l'impératif",
    "Donner des conseils et encouragements"
  ],
  
  niveau: "B1",
  prerequis: { seances_completees: ["seance-1", "seance-2"] },
  actif: true,
  
  competences_ciblees: [
    { code: "GRAM_IMPERATIF", poids: 50 },
    { code: "PRODUCTION_ECRITE", poids: 25 },
    { code: "COMPREHENSION_GRAMMAIRE", poids: 15 },
    { code: "PRODUCTION_ORALE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "L'impératif : Parler avec force",
      ordre: 1,
      duree_estimee: 4,
      
      contenu: {
        texte: `# L'impératif : La grammaire de l'action

## 🎯 Cette séance

L'**impératif** est le mode verbal de :
- 💪 L'**action** : "Vas-y !"
- 🗣️ Le **conseil** : "Prends ton temps"
- 🚫 L'**interdiction** : "Ne t'arrête pas"
- ✨ L'**encouragement** : "Crois en toi !"

## 🎵 Dans "C'est ta chance"

Goldman utilise massivement l'impératif :
- "**Ne les écoute pas**"
- "**Prends-la** maintenant"
- "**Vas-y, fonce**"
- "**Saisis**-la"

## 📚 Programme

1. Formation de l'impératif
2. Impératif affirmatif vs négatif
3. Les pronoms avec l'impératif
4. Exercices pratiques
5. Production : Donner des conseils

**Durée** : environ 50 minutes

Prêt(e) à maîtriser l'impératif ? **Commençons !** 🚀`,
        
        consignes: "Lisez cette introduction.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Formation de l'impératif
    {
      id: "ecran-2",
      type: "apprentissage",
      titre: "Formation de l'impératif présent",
      ordre: 2,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Formation de l'impératif présent

## 🔧 La règle générale

L'impératif a **3 personnes** seulement :
- **Tu** (2e personne singulier)
- **Nous** (1re personne pluriel)
- **Vous** (2e personne pluriel)

## 📖 Formation

**Base** : Même forme que le **présent de l'indicatif**

### Verbes en -ER (et ALLER)

**Attention** : Pas de "s" à la 2e personne !

| Infinitif | Présent (tu) | Impératif (tu) |
|-----------|--------------|----------------|
| Écouter | tu écoutes | **Écoute** ! |
| Regarder | tu regardes | **Regarde** ! |
| Aller | tu vas | **Va** ! |

**Exception** : Devant "y" ou "en", on garde le "s" :
- "Vas-y !" (et pas "Va-y")
- "Manges-en !" (et pas "Mange-en")

### Verbes en -IR, -RE, -OIR

Même forme qu'au présent :

| Infinitif | Présent (tu) | Impératif (tu) |
|-----------|--------------|----------------|
| Finir | tu finis | **Finis** ! |
| Prendre | tu prends | **Prends** ! |
| Saisir | tu saisis | **Saisis** ! |

## ⚠️ Verbes irréguliers (IMPORTANT !)

| Infinitif | Impératif (tu) | Impératif (nous) | Impératif (vous) |
|-----------|----------------|------------------|------------------|
| **Être** | **Sois** ! | **Soyons** ! | **Soyez** ! |
| **Avoir** | **Aie** ! | **Ayons** ! | **Ayez** ! |
| **Savoir** | **Sache** ! | **Sachons** ! | **Sachez** ! |

## 🎵 Dans "C'est ta chance"

- "**Écoute**" → écouter (verbe en -er, pas de s)
- "**Prends**-la" → prendre (verbe en -re, avec s)
- "**Vas**-y" → aller (exception, on garde le s devant y)
- "**Fonce**" → foncer (verbe en -er, pas de s)

## 💡 Astuce

Pour les verbes en -ER : pensez à enlever le "s" final !
- ❌ "Écoutes !" → ✅ "Écoute !"
- ❌ "Foncess !" → ✅ "Fonce !"`,
        
        consignes: "Étudiez cette leçon, puis passez à l'exercice.",
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
      titre: "Pratiquer : Former l'impératif",
      ordre: 3,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Exercice : Conjuguer à l'impératif

Transformez les verbes à l'impératif (2e personne singulier = tu).`,
        
        consignes: "Conjuguez chaque verbe à l'impératif.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "texte_a_trous",
          consigne: "Conjuguez les verbes à l'impératif (tu) :",
          phrases: [
            {
              id: "p1",
              texte: "_____ (écouter) ton cœur !",
              reponse: "Écoute",
              feedback: {
                correct: "Parfait ! Verbe en -er → pas de 's' à l'impératif",
                incorrect: "'Écouter' → 'Écoute' (sans 's' car verbe en -er)"
              }
            },
            {
              id: "p2",
              texte: "_____ (saisir) cette opportunité !",
              reponse: "Saisis",
              feedback: {
                correct: "Exact ! Verbe en -ir → on garde le 's'",
                incorrect: "'Saisir' → 'Saisis' (avec 's' car verbe en -ir)"
              }
            },
            {
              id: "p3",
              texte: "_____ (aller)-y sans hésiter !",
              reponse: "Vas",
              feedback: {
                correct: "Bravo ! Exception : 'Va' devient 'Vas' devant 'y'",
                incorrect: "Exception : 'Aller' → 'Vas' devant 'y' (on garde le 's')"
              }
            },
            {
              id: "p4",
              texte: "_____ (prendre) ta chance maintenant !",
              reponse: "Prends",
              feedback: {
                correct: "Très bien ! Verbe en -re → on garde le 's'",
                incorrect: "'Prendre' → 'Prends' (avec 's')"
              }
            },
            {
              id: "p5",
              texte: "_____ (être) courageux !",
              reponse: "Sois",
              feedback: {
                correct: "Excellent ! Verbe irrégulier : être → sois",
                incorrect: "Verbe irrégulier : 'être' → 'sois'"
              }
            },
            {
              id: "p6",
              texte: "_____ (avoir) confiance en toi !",
              reponse: "Aie",
              feedback: {
                correct: "Parfait ! Verbe irrégulier : avoir → aie",
                incorrect: "Verbe irrégulier : 'avoir' → 'aie'"
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
    
    // ÉCRAN 4 : Impératif négatif
    {
      id: "ecran-4",
      type: "apprentissage",
      titre: "L'impératif négatif : Interdire et déconseiller",
      ordre: 4,
      duree_estimee: 8,
      
      contenu: {
        texte: `# L'impératif négatif

## 🚫 Pour interdire ou déconseiller

### Structure

**NE + impératif + PAS** (comme pour les autres temps)

## 📖 Exemples

| Affirmatif | Négatif |
|------------|---------|
| Écoute-les ! | **Ne les écoute pas** ! |
| Regarde en arrière ! | **Ne regarde pas en arrière** ! |
| Doute de toi ! | **Ne doute pas de toi** ! |
| Laisse passer ! | **Ne laisse pas passer** ! |
| Aie peur ! | **N'aie pas peur** ! |

## 🎵 Dans "C'est ta chance"

Goldman utilise beaucoup l'impératif négatif :

- "**Ne les écoute pas**" → N'écoute pas les gens qui découragent
- "**Ne doute pas**" → Aie confiance
- "**Ne regarde pas en arrière**" → Va de l'avant
- "**Ne laisse pas passer**" → Saisis l'opportunité

## 💡 Pourquoi le négatif ?

L'impératif négatif est utilisé pour :
- ✅ **Protéger** : "Ne fais pas cette erreur"
- ✅ **Libérer** : "Ne t'inquiète pas"
- ✅ **Encourager** : "N'aie pas peur"
- ✅ **Combattre** : "Ne les écoute pas"

## 🔄 Transformation

**Exercice mental** : Transformer du positif au négatif

- Écoute ! → **Ne** _____ **pas** !
- Doute ! → **Ne** _____ **pas** !
- Regarde ! → **Ne** _____ **pas** !

Réponses : écoute / doute / regarde`,
        
        consignes: "Lisez attentivement, puis passez au quiz.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 5 : Les pronoms avec l'impératif
    {
      id: "ecran-5",
      type: "apprentissage",
      titre: "Les pronoms compléments avec l'impératif",
      ordre: 5,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Les pronoms avec l'impératif

## 🎯 Deux cas différents

### Impératif AFFIRMATIF : VERBE-PRONOM

**Ordre** : Le pronom vient **après** le verbe avec un **trait d'union**

| Sans pronom | Avec pronom |
|-------------|-------------|
| Prends ta chance ! | **Prends-la** ! |
| Saisis l'opportunité ! | **Saisis-la** ! |
| Écoute-moi ! | **Écoute-moi** ! |
| Donne ton avis ! | **Donne-le** ! |

**Attention** : ME et TE deviennent **MOI** et **TOI** après le verbe
- ❌ Écoute-me ! → ✅ **Écoute-moi** !
- ❌ Regarde-te ! → ✅ **Regarde-toi** !

### Impératif NÉGATIF : NE + PRONOM + VERBE + PAS

**Ordre** : Le pronom vient **avant** le verbe (comme d'habitude)

| Affirmatif | Négatif |
|------------|---------|
| Prends-la ! | **Ne la prends pas** ! |
| Écoute-les ! | **Ne les écoute pas** ! |
| Regarde-moi ! | **Ne me regarde pas** ! |

## 🎵 Dans "C'est ta chance"

Goldman utilise plusieurs pronoms :

**Affirmatif** :
- "**Prends-la**" (la chance)
- "**Saisis-la**" (l'opportunité)

**Négatif** :
- "**Ne les écoute pas**" (les gens qui doutent)
- "**Ne la laisse pas** passer" (la chance)

## 💡 Astuce

**Question** : Où mettre le pronom ?
- Impératif positif → **APRÈS** le verbe
- Impératif négatif → **AVANT** le verbe (standard)`,
        
        consignes: "Étudiez ces règles, puis faites l'exercice.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 6 : Production - Donner des conseils
    {
      id: "ecran-6",
      type: "production_ecrite",
      titre: "Donner des conseils à l'impératif",
      ordre: 6,
      duree_estimee: 12,
      
      contenu: {
        texte: `# Production : Donner des conseils

## 🎯 Situation

Un(e) ami(e) vous dit :

> "Je veux changer de vie, mais j'ai peur. Mes parents me disent de rester où je suis, que c'est trop risqué. Je ne sais pas quoi faire."

## ✍️ Votre mission

Donnez **6 conseils** à votre ami(e) en utilisant l'impératif.

### Consignes

**Utilisez** :
- ✅ Au moins **3 impératifs affirmatifs** (Fonce ! Prends ! etc.)
- ✅ Au moins **2 impératifs négatifs** (Ne doute pas ! etc.)
- ✅ Au moins **1 pronom** avec l'impératif (Prends-la ! Ne les écoute pas !)

### Structure suggérée

1-2. **Impératifs négatifs** (ce qu'il/elle NE doit PAS faire)
3-6. **Impératifs affirmatifs** (ce qu'il/elle DOIT faire)

## 💡 Exemple

✅ "D'abord, **ne les écoute pas** si ils te découragent. **N'aie pas peur** du changement, c'est normal. Maintenant, **écoute ton cœur** : qu'est-ce qu'il te dit ? **Prends ta chance**, elle ne reviendra peut-être pas ! **Fonce**, tu as les capacités ! Et surtout, **crois en toi** : tu es plus fort(e) que tu ne crois."

(Ce exemple utilise : 2 négatifs, 4 affirmatifs, 1 pronom)`,
        
        consignes: "Écrivez vos 6 conseils à l'impératif (60-100 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Vos 6 conseils à l'impératif :",
          nombre_mots_min: 60,
          nombre_mots_max: 100,
          criteres_evaluation: [
            "6 conseils distincts à l'impératif",
            "Au moins 3 impératifs affirmatifs",
            "Au moins 2 impératifs négatifs",
            "Au moins 1 pronom correctement placé",
            "Correction grammaticale de l'impératif",
            "Cohérence et utilité des conseils"
          ],
          score_max: 35,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 35,
        seuil_reussite: 25,
        feedback_auto: "Vos conseils seront évalués sur la correction grammaticale de l'impératif et la pertinence."
      },
    },
    
    // ÉCRAN 7 : Synthèse
    {
      id: "ecran-7",
      type: "synthese",
      titre: "Bilan : Maîtriser l'impératif",
      ordre: 7,
      duree_estimee: 8,
      
      contenu: {
        texte: `# Bilan de la séance 3

## ✅ Ce que vous avez appris

### Formation de l'impératif
- **Verbes en -ER** : Pas de "s" à la 2e personne (Écoute !)
- **Exception** : "s" devant y ou en (Vas-y !)
- **Verbes en -IR/-RE** : On garde le "s" (Prends !)
- **Irréguliers** : être → sois, avoir → aie

### Impératif affirmatif vs négatif
- **Affirmatif** : Écoute ! Prends ! Fonce !
- **Négatif** : Ne les écoute pas ! N'aie pas peur !

### Pronoms avec l'impératif
- **Affirmatif** : VERBE-PRONOM (Prends-la !)
- **Négatif** : NE + PRONOM + VERBE + PAS (Ne la prends pas !)

## 📊 Votre score total : {{score_total}} / 100 points

## 🎯 Prochaine séance

**Séance 4 : Débat - Déterminisme vs Libre arbitre**

Vous allez débattre sur une question philosophique :
- 🧠 Sommes-nous déterminés par notre origine ?
- 💪 Peut-on vraiment changer de vie ?
- ⚖️ Quel est le rôle de la société ?

C'est une séance de **pensée critique** où vous développerez votre argumentation.

---

**Excellent travail sur l'impératif ! Maintenant vous pouvez encourager avec force ! 💪**`,
        
        consignes: "Lisez ce bilan, puis terminez la séance.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
  ],
};

export default seance3;
