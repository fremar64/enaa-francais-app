/**
 * Séance 5 : Production finale - Lettre d'encouragement
 * 
 * Objectifs:
 * - Synthétiser tous les apprentissages
 * - Produire une lettre d'encouragement authentique
 * - Mobiliser vocabulaire, grammaire et réflexion
 * - Évaluer sa progression globale
 * 
 * Durée estimée: 60 minutes
 * Niveau: B1-B2
 */

import type { Seance } from '@/services/pocketbase';

export const seance5: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Production finale : Votre lettre d'encouragement",
  description: "Séance créative de synthèse - Créez votre propre lettre d'encouragement en mobilisant tous vos apprentissages",
  ordre: 5,
  duree_estimee: 60,
  
  objectifs: [
    "Synthétiser tous les apprentissages du parcours",
    "Produire une lettre d'encouragement personnelle",
    "Utiliser le vocabulaire et l'impératif",
    "Exprimer sa vision de l'encouragement"
  ],
  
  niveau: "B2",
  prerequis: { seances_completees: ["seance-1", "seance-2", "seance-3", "seance-4"] },
  actif: true,
  
  competences_ciblees: [
    { code: "PRODUCTION_ECRITE", poids: 50 },
    { code: "CREATIVITE", poids: 20 },
    { code: "SYNTHESE", poids: 20 },
    { code: "EXPRESSION_PERSONNELLE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Votre tour : Encourager quelqu'un",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Production finale : Votre lettre d'encouragement

## 🎨 Séance créative et personnelle

Après 4 séances d'apprentissage, vous avez acquis :
- 💪 Le **vocabulaire** de l'encouragement
- 📚 La **grammaire** de l'impératif
- 🧠 Une **compréhension** du déterminisme social
- 💭 Une **position nuancée** sur l'émancipation

**Maintenant, c'est VOTRE tour** de créer !

## 🎯 Mission finale

Vous allez écrire une **lettre d'encouragement** à une personne de votre choix :
- Un(e) ami(e) qui doute
- Un membre de votre famille
- Vous-même (lettre à soi)
- Une personne imaginaire

### Étape 1 : Planification
Définir à qui vous écrivez et pourquoi

### Étape 2 : Rédaction
Écrire la lettre (150-250 mots)

### Étape 3 : Révision
Améliorer et corriger

### Étape 4 : Lecture (optionnel)
Enregistrer une lecture expressive

## 📊 Critères d'évaluation

- ✅ **Contenu** : Authenticité, pertinence (35%)
- ✅ **Langue** : Vocabulaire, grammaire, impératif (35%)
- ✅ **Structure** : Organisation, cohérence (20%)
- ✅ **Impact** : Force d'encouragement (10%)

## 💡 Conseil essentiel

**Soyez SINCÈRE !**

La meilleure lettre n'est pas la plus "littéraire" mais la plus **authentique**, celle qui pourrait vraiment aider quelqu'un.

---

**Prêt(e) à créer ? C'est votre chance ! 🚀**`,
        
        consignes: "Lisez cette introduction.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Rappel des outils
    {
      id: "ecran-2",
      type: "rappel",
      titre: "Rappel : Votre boîte à outils",
      ordre: 2,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Rappel : Votre boîte à outils

## 📦 Vocabulaire de l'encouragement (Séance 2)

### Verbes d'action
- Foncer, saisir, oser, tenter, croire, persévérer, réussir

### Noms
- Chance, opportunité, courage, détermination, résilience, force

### Adjectifs
- Capable, fort(e), courageux(se), déterminé(e), talentueux(se)

### Expressions françaises
- "Vas-y !", "Fonce !", "Tu peux le faire !"
- "Accroche-toi !", "C'est le moment ou jamais !"
- "Tu n'as rien à perdre !", "Je crois en toi !"

## 🎓 L'impératif (Séance 3)

### Formation
- **Verbes en -ER** : Pas de "s" (Écoute ! Fonce !)
- **Verbes en -IR/RE** : Avec "s" (Prends ! Saisis !)
- **Irréguliers** : Sois ! Aie ! Sache !

### Impératif négatif
- Ne les écoute pas ! N'aie pas peur ! Ne doute pas !

### Pronoms
- Affirmatif : Prends-la ! Saisis-la !
- Négatif : Ne les écoute pas ! Ne la laisse pas !

## 🧠 Réflexion nuancée (Séance 4)

### Reconnaître les obstacles
- Le déterminisme social existe
- Certains obstacles sont réels
- Tout le monde n'a pas les mêmes chances

### MAIS encourager quand même
- Des marges de manœuvre existent
- La volonté compte
- Les opportunités existent - il faut les saisir

---

Vous avez TOUS les outils ! À vous de créer ! ✍️`,
        
        consignes: "Relisez ce rappel.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Planification
    {
      id: "ecran-3",
      type: "planification",
      titre: "Étape 1 : Planifier votre lettre",
      ordre: 3,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Étape 1 : Planification

## 🎯 Définir le contexte

Avant d'écrire, répondez à ces questions :

### 1. À qui écrivez-vous ?
- Un(e) ami(e) précis(e) ?
- Un membre de votre famille ?
- Vous-même ?
- Une personne imaginaire ?

### 2. Quelle est sa situation ?
- Quel défi affronte-t-il/elle ?
- Quels sont ses doutes ?
- Quels obstacles rencontre-t-il/elle ?
- Pourquoi a-t-il/elle besoin d'encouragement ?

### 3. Quel est votre message principal ?
- Qu'est-ce que vous voulez lui dire ?
- Quelle "chance" doit-il/elle saisir ?
- Quels sont ses atouts/forces ?

## 💡 Exemples de situations

### Situation A : Changement de carrière
> "Mon ami(e) veut changer de métier mais a peur d'échouer. Sa famille le/la décourage."

### Situation B : Études difficiles
> "Mon frère/ma sœur veut faire des études supérieures mais pense qu'il/elle n'est pas assez bon(ne)."

### Situation C : Projet personnel
> "Je veux me lancer dans un projet créatif mais je doute de moi."

## ✍️ Notez vos réponses

Prenez quelques notes (ne seront pas évaluées) pour clarifier :
- Destinataire
- Situation
- Message principal`,
        
        consignes: "Réfléchissez et notez vos idées (optionnel mais recommandé).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "notes_preparation",
          consigne: "Notes de préparation (optionnel) :",
          nombre_mots_max: 100,
          optionnel: true,
          score_max: 0,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 4 : Rédaction de la lettre
    {
      id: "ecran-4",
      type: "production_libre",
      titre: "Étape 2 : Écrire votre lettre",
      ordre: 4,
      duree_estimee: 25,
      
      contenu: {
        texte: `# Étape 2 : Écrire votre lettre d'encouragement

## ✍️ Consignes de rédaction

### Format
**Lettre personnelle** (150-250 mots)

### Structure suggérée

**1. Introduction (20-30 mots)**
- Salutation chaleureuse
- Contexte : pourquoi tu écris

**2. Reconnaissance (30-50 mots)**
- Reconnaître la difficulté de sa situation
- Valider ses émotions (peur, doute)
- Montrer que tu comprends

**3. Encouragements (80-120 mots)**
- Utiliser l'impératif (affirmatif ET négatif)
- Rappeler ses forces/qualités
- Donner des arguments positifs
- Parler de l'opportunité à saisir

**4. Conclusion (20-30 mots)**
- Message de soutien personnel
- Phrase finale inspirante

## 📝 Éléments OBLIGATOIRES à intégrer

✅ Au moins **5 verbes à l'impératif** (mix affirmatif/négatif)  
✅ Au moins **4 mots** du vocabulaire de l'encouragement  
✅ Au moins **2 expressions** françaises d'encouragement  
✅ Reconnaissance d'au moins **1 obstacle** (nuance)

## 💡 Exemple d'amorce

> "Cher/Chère [nom],
>
> Je t'écris parce que je sais que tu hésites à [situation]. C'est vrai, c'est difficile et j'imagine que tu as peur. **Mais ne les écoute pas** quand ils te disent que tu ne peux pas réussir..."

---

## 🚀 Lancez-vous !

Écrivez votre lettre. Soyez **authentique** et **sincère**.`,
        
        consignes: "Écrivez votre lettre d'encouragement (150-250 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Votre lettre d'encouragement :",
          nombre_mots_min: 150,
          nombre_mots_max: 250,
          criteres_evaluation: [
            "Respect de la longueur (150-250 mots)",
            "Au moins 5 impératifs (mix affirmatif/négatif)",
            "Au moins 4 mots du vocabulaire de l'encouragement",
            "Au moins 2 expressions françaises",
            "Reconnaissance d'au moins 1 obstacle",
            "Structure claire (intro, corps, conclusion)",
            "Ton chaleureux et encourageant",
            "Authenticité et sincérité du message",
            "Correction grammaticale générale"
          ],
          score_max: 60,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 60,
        seuil_reussite: 42,
        feedback_auto: "Votre lettre sera évaluée sur le contenu, la langue, la structure et l'impact."
      },
    },
    
    // ÉCRAN 5 : Révision
    {
      id: "ecran-5",
      type: "revision",
      titre: "Étape 3 : Relire et améliorer",
      ordre: 5,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Étape 3 : Révision

## 🔍 Grille de relecture

### ✅ Contenu et message

- [ ] Mon message est-il clair ?
- [ ] Ai-je été sincère et authentique ?
- [ ] Mes encouragements sont-ils concrets ?
- [ ] Ai-je reconnu les obstacles (nuance) ?
- [ ] Ma lettre pourrait-elle vraiment aider ?

### ✅ Vocabulaire et grammaire

- [ ] Ai-je utilisé au moins 5 impératifs ?
- [ ] Ai-je utilisé impératifs affirmatifs ET négatifs ?
- [ ] Mes impératifs sont-ils bien formés ?
- [ ] Ai-je utilisé au moins 4 mots du vocabulaire ?
- [ ] Ai-je utilisé au moins 2 expressions françaises ?
- [ ] Mes phrases sont-elles grammaticalement correctes ?

### ✅ Structure

- [ ] Y a-t-il une introduction ?
- [ ] Le corps est-il bien organisé ?
- [ ] Y a-t-il une conclusion inspirante ?
- [ ] La longueur est-elle respectée (150-250 mots) ?

### ✅ Impact

- [ ] Le ton est-il chaleureux ?
- [ ] Les encouragements sont-ils convaincants ?
- [ ] Y a-t-il de l'émotion authentique ?

## 🔧 Points à vérifier particulièrement

**L'impératif** :
- Verbes en -ER : Pas de "s" (Fonce ! Pas "Fonces !")
- Exception : "Vas-y !" (on garde le s devant y)
- Irréguliers : Sois ! Aie ! (pas "Soyez" si tu tutoies)

**Les pronoms** :
- Affirmatif : VERBE-PRONOM (Prends-la !)
- Négatif : NE + PRONOM + VERBE (Ne les écoute pas !)

## ✍️ Réécriture (Optionnel)

Si vous le souhaitez, vous pouvez soumettre une **version améliorée** de votre lettre.`,
        
        consignes: "Relisez avec la grille, puis réécrivez une version améliorée si vous le souhaitez (optionnel).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Version améliorée de votre lettre (optionnel) :",
          nombre_mots_min: 0,
          nombre_mots_max: 250,
          optionnel: true,
          criteres_evaluation: [
            "Amélioration visible par rapport à la première version",
            "Correction des erreurs identifiées",
            "Enrichissement du contenu ou du style"
          ],
          score_max: 10,
          bonus: true,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 10,
        seuil_reussite: 0,
        feedback_auto: "Bonus si version améliorée soumise."
      },
    },
    
    // ÉCRAN 6 : Lecture expressive (optionnel)
    {
      id: "ecran-6",
      type: "production_orale",
      titre: "Étape 4 : Lecture expressive (Optionnel)",
      ordre: 6,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Production orale : Lisez votre lettre à voix haute

## 🎤 Activité optionnelle

Lire votre lettre **à voix haute** avec expression est très formateur :
- ✅ Vous entendez si ça "sonne" bien
- ✅ Vous détectez les maladresses
- ✅ Vous travaillez l'intonation de l'encouragement
- ✅ Vous **incarnez** votre message

## 📝 Comment faire ?

### Option 1 : Enregistrement
Enregistrez-vous en train de lire votre lettre.

**Critères d'évaluation** :
- Clarté de la prononciation
- Expressivité et chaleur
- Respect des pauses et de la ponctuation
- Ton encourageant (pas monotone)

### Option 2 : Sans enregistrement
Même sans enregistrer, **lisez à voix haute** plusieurs fois.

## 💡 Conseil de lecture

Lisez comme si vous parliez **vraiment** à la personne.

Imaginez-la en face de vous :
- 💪 Les impératifs avec **énergie** ("Fonce !")
- 🚫 Les impératifs négatifs avec **fermeté** ("Ne les écoute pas !")
- ❤️ Les encouragements avec **chaleur** ("Je crois en toi")

---

Cette activité est **optionnelle** mais **très recommandée** !`,
        
        consignes: "Si vous le souhaitez, enregistrez votre lecture.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "enregistrement_audio",
          consigne: "Enregistrez votre lecture (optionnel) :",
          duree_max_secondes: 180,
          optionnel: true,
          criteres_evaluation: [
            "Clarté de la prononciation",
            "Expressivité et chaleur du ton",
            "Énergie dans les encouragements",
            "Respect du rythme et des pauses"
          ],
          score_max: 15,
          bonus: true,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 15,
        seuil_reussite: 0,
        feedback_auto: "Bonus si enregistrement soumis et expressif."
      },
    },
    
    // ÉCRAN 7 : Bilan final
    {
      id: "ecran-7",
      type: "bilan_final",
      titre: "Bilan : Votre parcours avec 'C'est ta chance'",
      ordre: 7,
      duree_estimee: 10,
      
      contenu: {
        texte: `# 🎉 Bravo ! Vous avez terminé "C'est ta chance" !

## 📊 Votre parcours en chiffres

### Séances complétées : 5/5 ✅

1. **Séance 1** : Découverte - Un message d'espoir
2. **Séance 2** : Vocabulaire de l'encouragement
3. **Séance 3** : L'impératif - La grammaire de l'action
4. **Séance 4** : Débat - Déterminisme vs Libre arbitre
5. **Séance 5** : Production finale - Votre lettre

### Votre progression globale

- **Écrans complétés** : 35/35 🎯
- **Score total** : {{score_total_parcours}} / 500 points
- **Pourcentage** : {{pourcentage}}%
- **Niveau atteint** : {{niveau_atteint}}

## 🎓 Compétences développées

### Compréhension orale ✅
- Message d'encouragement
- Identification des émotions positives

### Vocabulaire ✅
- Verbes d'encouragement (foncer, saisir, oser)
- Expressions françaises motivantes
- Vocabulaire de l'opportunité

### Grammaire ✅
- L'impératif affirmatif et négatif
- Les pronoms avec l'impératif
- Formation correcte

### Culture et société ✅
- Le déterminisme social (Bourdieu)
- La chanson sociale française
- Débat nuancé sur l'émancipation

### Production ✅
- Lettre d'encouragement authentique
- Argumentation nuancée
- Expression personnelle

## 🌟 Ce que vous pouvez faire maintenant

✅ **Encourager** quelqu'un en français avec force  
✅ **Utiliser** l'impératif pour donner des conseils  
✅ **Comprendre** les enjeux du déterminisme social  
✅ **Argumenter** de manière nuancée  
✅ **Écrire** une lettre personnelle motivante

## 💭 Réflexion finale

### Qu'avez-vous appris sur vous-même ?

En travaillant sur "C'est ta chance", vous avez peut-être découvert :
- 💪 Votre propre capacité à encourager
- 🧠 Votre position sur déterminisme vs libre arbitre
- ✍️ Votre voix personnelle en français
- 🌟 Vos propres "chances" à saisir

### Le message essentiel

"C'est ta chance" nous rappelle que :
- ✨ Nous avons tous des **opportunités**
- 💪 La **volonté** compte (même si tout n'est pas volonté)
- 🚀 Il faut **oser** essayer
- ❤️ L'**encouragement** peut changer une vie

## 🎯 Et maintenant ?

### Parcours suivant disponible

**"Né en 17 à Leidenstadt"** (Goldman, B2-C1)  
Thème : Humilité morale et responsabilité historique

### Dans la vie réelle

- 💬 **Utilisez** le vocabulaire de l'encouragement
- 🗣️ **Encouragez** vraiment quelqu'un avec ces outils
- 📝 **Envoyez** votre lettre (si c'est pour quelqu'un de réel)
- 🎵 **Réécoutez** "C'est ta chance" avec un nouveau regard

## 💌 Message final

Vous avez travaillé dur et créé quelque chose d'authentique.

**Vous avez maintenant les mots pour encourager en français.**

Et rappelez-vous : **C'est VOTRE chance d'apprendre, de grandir, de vous exprimer.**

Ne la laissez pas passer ! 🚀

---

## 🏆 Certificat de réussite

**{{nom_utilisateur}}**

A complété avec succès le parcours pédagogique  
**"C'est ta chance" - Jean-Jacques Goldman**

Niveau : B1-B2  
Score : {{score_total_parcours}} / 500  
Date : {{date_completion}}

---

**Félicitations et continuez à saisir VOS chances ! 🎉**`,
        
        consignes: "Lisez votre bilan final.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "feedback_libre",
          consigne: "Partagez vos impressions sur ce parcours (optionnel) :",
          nombre_mots_min: 0,
          nombre_mots_max: 200,
          optionnel: true,
          questions_guidantes: [
            "Qu'avez-vous préféré dans ce parcours ?",
            "Qu'avez-vous trouvé le plus utile ?",
            "Allez-vous vraiment encourager quelqu'un avec ce que vous avez appris ?",
            "Recommanderiez-vous ce parcours ?"
          ],
          score_max: 0,
        }
      ],
      
      validation: {
        auto: true,
        score_max: 0,
        completion_parcours: true,
      },
    },
  ],
};

export default seance5;
