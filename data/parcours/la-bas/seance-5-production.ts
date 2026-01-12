/**
 * Séance 5 : Production finale - Créer votre propre "Là-bas"
 * 
 * Objectifs:
 * - Synthétiser tous les apprentissages
 * - Produire un texte créatif personnel
 * - Exprimer sa propre quête existentielle
 * - Évaluer sa progression globale
 * 
 * Durée estimée: 60 minutes
 * Niveau: B2-C1
 */

import type { Seance } from '@/services/pocketbase';

export const seance5: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = {
  titre: "Production finale : Votre 'Là-bas'",
  description: "Séance créative de synthèse - Créez votre propre texte inspiré de 'Là-bas' en mobilisant tous vos apprentissages",
  ordre: 5,
  duree_estimee: 60,
  
  objectifs: [
    "Synthétiser tous les apprentissages du parcours",
    "Produire un texte créatif personnel de qualité",
    "Utiliser le vocabulaire spatial et le conditionnel",
    "Exprimer sa propre vision philosophique"
  ],
  
  niveau: "C1",
  prerequis: { seances_completees: ["seance-1", "seance-2", "seance-3", "seance-4"] },
  actif: true,
  
  competences_ciblees: [
    { code: "PRODUCTION_ECRITE", poids: 50 },
    { code: "CREATIVITE", poids: 25 },
    { code: "SYNTHESE", poids: 15 },
    { code: "EXPRESSION_PERSONNELLE", poids: 10 },
  ],
  
  ecrans: [
    // ÉCRAN 1 : Introduction à la production finale
    {
      id: "ecran-1",
      type: "introduction",
      titre: "Votre tour : Créer votre 'Là-bas'",
      ordre: 1,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Production finale : Créez VOTRE "Là-bas"

## 🎨 Séance créative et personnelle

Après 4 séances d'apprentissage, vous avez acquis :
- 📚 Le **vocabulaire spatial** (ici, là-bas, ailleurs)
- 🎓 La **grammaire** du conditionnel
- 🧠 Une **compréhension philosophique** profonde
- 💭 Une **capacité critique** aiguisée

**Maintenant, c'est VOTRE tour** de créer !

## 🎯 Mission finale

Vous allez créer **votre propre texte** inspiré de "Là-bas" en 3 étapes :

### Étape 1 : Réécriture (Adaptation)
Réécrire un passage de "Là-bas" avec VOS mots et VOTRE vision

### Étape 2 : Création originale (Texte libre)
Écrire VOTRE "là-bas" - où est-il ? Que représente-t-il pour vous ?

### Étape 3 : Production orale (Optionnel)
Enregistrer une lecture expressive de votre texte

## 📊 Critères d'évaluation

Votre production sera évaluée sur :
- ✅ **Contenu** : Profondeur, authenticité, créativité (40%)
- ✅ **Langue** : Vocabulaire, grammaire, syntaxe (30%)
- ✅ **Structure** : Cohérence, organisation (20%)
- ✅ **Originalité** : Voix personnelle, perspective unique (10%)

## 💡 Conseil essentiel

**Soyez AUTHENTIQUE !** 

Le meilleur texte n'est pas le plus "joli" mais le plus **sincère**, celui qui vient vraiment de vous.

Goldman a touché des millions de personnes parce qu'il était **authentique**. Faites de même !

---

**Prêt(e) à créer ? Allons-y ! 🚀**`,
        
        consignes: "Lisez cette introduction, puis commencez votre production.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 2 : Rappel des apprentissages
    {
      id: "ecran-2",
      type: "rappel",
      titre: "Rappel : Votre boîte à outils",
      ordre: 2,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Rappel : Votre boîte à outils linguistiques

Avant de créer, rappelons ce que vous avez appris et qui va vous servir.

## 📦 Vocabulaire spatial (Séance 2)

### Adverbes de lieu
- **Ici** : Le lieu actuel (souvent négatif dans "Là-bas")
- **Là-bas** : Le lieu désiré, l'ailleurs (positif, espoir)
- **Ailleurs** : L'alternative, la possibilité
- **Partout** : En tous lieux
- **Nulle part** : En aucun lieu

### Usage métaphorique
N'oubliez pas : ces mots ne désignent pas des **lieux géographiques** mais des **états d'être** !

## 🎓 Grammaire : Le conditionnel (Séance 3)

### Formation
**Infinitif + terminaisons de l'imparfait** (-ais, -ais, -ait, -ions, -iez, -aient)

### Usages
1. **Souhait** : "J'aimerais partir"
2. **Hypothèse** : "Si je pouvais, je partirais"
3. **Politesse** : "Pourriez-vous..."

### Verbes irréguliers à connaître
- être → je **serais**
- avoir → j'**aurais**
- aller → j'**irais**
- faire → je **ferais**
- pouvoir → je **pourrais**
- vouloir → je **voudrais**

## 🧠 Concepts philosophiques (Séance 4)

### L'aliénation
Devenir étranger à soi-même, perdre son authenticité.

**Signes** : Apathie, conformisme, perte de désir, automatisme

### L'authenticité
Être vraiment soi-même, vivre selon ses valeurs propres.

**Quête** : Le "là-bas" représente cette quête d'authenticité

## 🎵 Structure de "Là-bas"

### Le pattern de Goldman
- **Infinitifs** : Partir, sentir (→ universalité)
- **Répétitions** : Effet hypnotique (partir, là-bas, partir)
- **Contraste** : Ici (négatif) vs Là-bas (positif)
- **Simplicité** : Vocabulaire simple mais puissant

---

Vous avez maintenant TOUS les outils ! À vous de créer ! 🎨`,
        
        consignes: "Relisez ce rappel, puis passez à la production.",
      },
      
      validation: {
        auto: true,
        score_max: 0,
      },
    },
    
    // ÉCRAN 3 : Production guidée - Réécriture
    {
      id: "ecran-3",
      type: "production_guidee",
      titre: "Étape 1 : Réécrire 'Là-bas' à votre façon",
      ordre: 3,
      duree_estimee: 15,
      
      contenu: {
        texte: `# Étape 1 : Réécriture créative

## 🎯 Mission

Prenez ce passage de "Là-bas" et **réécrivez-le** à votre façon.

### Passage original

> "Partir, là-bas, partir  
> Sentir, ailleurs, mon cœur  
> Les gens ici n'ont plus de haine  
> Ils sont tous pareils  
> Ils sont comme endormis"

## ✍️ Consignes de réécriture

### Conservez :
- ✅ La **structure** générale (infinitifs + description)
- ✅ Le **thème** (quête d'ailleurs, critique de "ici")
- ✅ Le **contraste** ici/là-bas

### Changez :
- 🔄 Les **verbes** (pas obligé de garder "partir" et "sentir")
- 🔄 Les **mots** pour décrire "ici" (endormis → ?)
- 🔄 Le **ton** si vous voulez (plus dur ? plus doux ?)

## 💡 Exemples de réécritures possibles

### Version 1 : Plus dure
> "Fuir, loin d'ici, fuir  
> Respirer, ailleurs, enfin  
> Les gens ici ont perdu leur âme  
> Ils sont tous zombies  
> Ils sont morts vivants"

### Version 2 : Plus douce
> "Voyager, là-bas, voyager  
> Rêver, ailleurs, encore  
> Les gens ici ont oublié de vivre  
> Ils sont tous fatigués  
> Ils sont perdus"

### Version 3 : Moderne/Actuelle
> "S'évader, du virtuel, s'évader  
> Exister, vraiment, enfin  
> Les gens ici scrollent sans fin  
> Ils sont tous connectés  
> Ils sont pourtant seuls"

## 📝 À vous maintenant !

Écrivez VOTRE version (5-8 lignes minimum).

**Soyez créatif(ve) et authentique !**`,
        
        consignes: "Réécrivez le passage à votre manière (5-8 lignes).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Votre réécriture créative de 'Là-bas' :",
          nombre_mots_min: 30,
          nombre_mots_max: 80,
          criteres_evaluation: [
            "Structure similaire à l'original",
            "Créativité dans le choix des mots",
            "Cohérence du message",
            "Qualité de la langue (vocabulaire, grammaire)",
            "Authenticité de l'expression"
          ],
          score_max: 25,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 25,
        seuil_reussite: 17,
        feedback_auto: "Votre réécriture sera évaluée sur la créativité, la cohérence et la qualité linguistique."
      },
    },
    
    // ÉCRAN 4 : Production libre - Votre "là-bas"
    {
      id: "ecran-4",
      type: "production_libre",
      titre: "Étape 2 : Votre 'là-bas' personnel",
      ordre: 4,
      duree_estimee: 20,
      
      contenu: {
        texte: `# Étape 2 : Créez VOTRE "là-bas"

## 🎨 Production libre et personnelle

Maintenant, oubliez Goldman un instant. Écrivez **VOTRE** texte sur **VOTRE** "là-bas".

## 🤔 Questions pour vous guider

### Votre "ICI" (situation actuelle)
- Où êtes-vous dans la vie maintenant ?
- Qu'est-ce qui ne vous satisfait pas ?
- De quoi vous sentez-vous prisonnier(ère) ?
- Qu'est-ce qui vous "endort" ?

### Votre "LÀ-BAS" (aspiration)
- Où voudriez-vous être (métaphoriquement) ?
- Quel(le) version de vous aspirez-vous à devenir ?
- Qu'est-ce qui représenterait la vraie vie pour vous ?
- Qu'est-ce qui vous réveillerait vraiment ?

### Votre "PARTIR" (transformation)
- Qu'est-ce que "partir" signifie pour vous ?
- Quelles chaînes devriez-vous briser ?
- Quelle transformation cherchez-vous ?
- Qu'est-ce qui vous empêche de partir ?

## 📝 Consignes de rédaction

### Format libre
- **Prose** (paragraphe) OU **Poésie** (vers libres) OU **Chanson** (couplets)
- Longueur : 120-200 mots
- Style : Le VÔTRE !

### Éléments à intégrer

**OBLIGATOIRE** (pour mobiliser vos apprentissages) :
- ✅ Au moins **3 adverbes de lieu** (ici, là-bas, ailleurs...)
- ✅ Au moins **4 verbes au conditionnel**
- ✅ Une **métaphore spatiale** (l'espace comme état d'être)

**RECOMMANDÉ** :
- Une **question existentielle**
- Un **contraste** (ici vs là-bas)
- Votre **vision philosophique** personnelle

## 💡 Conseils d'écriture

### Soyez concret
❌ "Je voudrais être heureux"  
✅ "Je voudrais me réveiller sans cette boule au ventre"

### Utilisez des images
❌ "Ici, c'est difficile"  
✅ "Ici, les jours se ressemblent comme des photocopies grises"

### Soyez sincère
Le meilleur texte = le plus **authentique**, pas le plus "littéraire"

---

## 🎯 Lancez-vous !

Prenez le temps de réfléchir, puis écrivez.  
**Pas de censure, pas de jugement** : écrivez ce que vous ressentez vraiment.`,
        
        consignes: "Écrivez VOTRE texte personnel sur votre 'là-bas' (120-200 mots).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Votre texte personnel sur votre 'là-bas' :",
          nombre_mots_min: 120,
          nombre_mots_max: 200,
          criteres_evaluation: [
            "Respect des contraintes (adverbes de lieu, conditionnel)",
            "Profondeur de la réflexion personnelle",
            "Qualité de l'expression (images, métaphores)",
            "Correction linguistique (grammaire, vocabulaire)",
            "Originalité et authenticité de la voix",
            "Cohérence du propos"
          ],
          score_max: 50,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 50,
        seuil_reussite: 35,
        feedback_auto: "Votre texte sera évalué sur la profondeur, l'authenticité, la qualité linguistique et le respect des consignes."
      },
    },
    
    // ÉCRAN 5 : Révision et amélioration
    {
      id: "ecran-5",
      type: "revision",
      titre: "Relire et améliorer votre texte",
      ordre: 5,
      duree_estimee: 10,
      
      contenu: {
        texte: `# Révision : Améliorez votre texte

## 🔍 Grille de relecture

Relisez votre texte en vous posant ces questions :

### ✅ Contenu et fond

- [ ] Mon message est-il clair ?
- [ ] Ai-je été authentique et sincère ?
- [ ] Mon "ici" et mon "là-bas" sont-ils bien définis ?
- [ ] Y a-t-il une vraie profondeur dans ma réflexion ?

### ✅ Langue et forme

- [ ] Ai-je utilisé au moins 3 adverbes de lieu ?
- [ ] Ai-je utilisé au moins 4 verbes au conditionnel ?
- [ ] Mes conditionnels sont-ils bien formés ?
- [ ] Mon vocabulaire est-il varié et précis ?
- [ ] Mes phrases sont-elles grammaticalement correctes ?

### ✅ Style et originalité

- [ ] Ai-je utilisé des images, des métaphores ?
- [ ] Mon texte a-t-il une "voix" personnelle ?
- [ ] Évite-je les clichés et les banalités ?
- [ ] Mon texte pourrait-il toucher quelqu'un d'autre ?

## 🔧 Améliorer

### Points à vérifier particulièrement

**Le conditionnel** :
- Verbes réguliers : infinitif + -ais, -ais, -ait...
- Verbes irréguliers : vérifiez le radical !
  - être → serais (PAS "êtrais" !)
  - avoir → aurais
  - aller → irais

**Les métaphores spatiales** :
- Évitez le sens littéral ("Je voudrais aller en Espagne")
- Préférez le sens symbolique ("Je voudrais aller vers la lumière")

**La profondeur** :
- Allez au-delà du superficiel
- Questionnez-vous vraiment
- Soyez vulnérable si nécessaire

## ✍️ Réécriture (Optionnel)

Si vous le souhaitez, vous pouvez **modifier** votre texte précédent ou en écrire une **version améliorée** ici.

**Conseil** : Parfois, une deuxième version est meilleure que la première !`,
        
        consignes: "Relisez avec la grille, puis réécrivez une version améliorée si vous le souhaitez (optionnel).",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "production_ecrite",
          consigne: "Version améliorée de votre texte (optionnel) :",
          nombre_mots_min: 0,
          nombre_mots_max: 200,
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
    
    // ÉCRAN 6 : Production orale (optionnel)
    {
      id: "ecran-6",
      type: "production_orale",
      titre: "Étape 3 : Lecture expressive (Optionnel)",
      ordre: 6,
      duree_estimee: 5,
      
      contenu: {
        texte: `# Production orale : Lisez votre texte à voix haute

## 🎤 Activité optionnelle mais recommandée

Lire son texte **à voix haute** est extrêmement formateur :
- ✅ On entend les erreurs qu'on ne voit pas à l'écrit
- ✅ On travaille la **prosodie** (intonation, rythme)
- ✅ On **incarne** son texte
- ✅ On s'approprie vraiment ses mots

## 📝 Comment faire ?

### Option 1 : Enregistrement
Si la fonctionnalité est disponible, enregistrez-vous en train de lire votre texte.

**Critères d'évaluation** :
- Clarté de la prononciation
- Respect de la ponctuation et des pauses
- Expressivité (émotion, intensité)
- Rythme et intonation

### Option 2 : Sans enregistrement
Même sans enregistrer, **lisez à voix haute** plusieurs fois votre texte.

**Bénéfices** :
- Vous détectez les maladresses
- Vous sentez le "flow" de votre texte
- Vous vous appropriez vos mots

## 💡 Conseil de lecture

**Lisez comme si vous parliez à quelqu'un de proche**, pas comme si vous récitiez.

Goldman chante "Là-bas" avec **sincérité et émotion**, pas en "jouant un rôle".  
Faites pareil !

---

Cette activité est **optionnelle** mais fortement **recommandée** pour votre apprentissage.`,
        
        consignes: "Si vous le souhaitez, enregistrez-vous en train de lire votre texte.",
      },
      
      activites: [
        {
          id: "activite-1",
          type: "enregistrement_audio",
          consigne: "Enregistrez votre lecture expressive (optionnel) :",
          duree_max_secondes: 120,
          optionnel: true,
          criteres_evaluation: [
            "Clarté de la prononciation",
            "Expressivité et émotion",
            "Respect du rythme et des pauses",
            "Appropriation du texte"
          ],
          score_max: 15,
          bonus: true,
        }
      ],
      
      validation: {
        auto: false,
        score_max: 15,
        seuil_reussite: 0,
        feedback_auto: "Bonus si enregistrement soumis et de qualité."
      },
    },
    
    // ÉCRAN 7 : Bilan final du parcours complet
    {
      id: "ecran-7",
      type: "bilan_final",
      titre: "Bilan : Votre parcours avec 'Là-bas'",
      ordre: 7,
      duree_estimee: 10,
      
      contenu: {
        texte: `# 🎉 Bravo ! Vous avez terminé le parcours "Là-bas" !

## 📊 Votre parcours en chiffres

### Séances complétées : 5/5 ✅

1. **Séance 1** : Découverte - Partir ailleurs
2. **Séance 2** : Vocabulaire spatial et métaphores
3. **Séance 3** : Le conditionnel - Rêver d'un ailleurs
4. **Séance 4** : Débat philosophique - Aliénation et authenticité
5. **Séance 5** : Production finale - Votre "Là-bas"

### Votre progression globale

- **Écrans complétés** : 35/35 🎯
- **Score total** : {{score_total_parcours}} / 530 points
- **Pourcentage** : {{pourcentage}}%
- **Niveau atteint** : {{niveau_atteint}}

## 🎓 Compétences développées

### Compréhension orale ✅
- Écoute globale et détaillée
- Identification des émotions
- Repérage lexical

### Vocabulaire ✅
- Adverbes de lieu (ici, là-bas, ailleurs)
- Vocabulaire spatial et métaphorique
- Champ lexical de l'émotion

### Grammaire ✅
- Conditionnel présent (formation et usages)
- Infinitifs substantivés
- Impératif

### Culture ✅
- Jean-Jacques Goldman et la chanson française
- Contexte des années 80
- Philosophie (aliénation, authenticité)

### Pensée critique ✅
- Analyse d'une critique sociale
- Argumentation nuancée
- Débat philosophique

### Production ✅
- Écriture créative
- Réécriture adaptative
- Expression personnelle authentique

## 🌟 Ce que vous pouvez faire maintenant

Grâce à ce parcours, vous êtes capable de :

✅ **Comprendre** des chansons françaises complexes  
✅ **Analyser** des textes à dimension philosophique  
✅ **Utiliser** le conditionnel pour exprimer vos souhaits  
✅ **Débattre** sur des sujets profonds en français  
✅ **Créer** vos propres textes poétiques/philosophiques  
✅ **Penser** de manière critique en français

## 💭 Réflexion finale

### Qu'avez-vous appris sur vous-même ?

En travaillant sur "Là-bas", vous avez peut-être découvert :
- 🤔 Votre propre "ici" et "là-bas"
- 💭 Vos aspirations profondes
- 🧠 Votre capacité à penser philosophiquement
- ✍️ Votre voix créative en français

### La vraie question de Goldman

"Là-bas" pose finalement UNE question :

**Allez-vous rester "ici" ou allez-vous "partir" ?**

Cette question n'est pas seulement géographique.  
C'est une question **existentielle**, **quotidienne**, **essentielle**.

Chaque jour, nous choisissons :
- 😴 Rester endormi OU ✨ S'éveiller
- 🔒 Accepter l'aliénation OU 🔓 Chercher l'authenticité
- 🔄 Reproduire OU 🦋 Se transformer

## 🎯 Et maintenant ?

### Parcours suivants disponibles

1. **"C'est ta chance"** (Goldman, B1-B2)  
   Thème : Résilience et émancipation sociale

2. **"Né en 17 à Leidenstadt"** (Goldman, B2-C1)  
   Thème : Humilité morale et responsabilité historique

### Continuer à pratiquer

- 🎵 Écoutez d'autres chansons de Goldman
- 📚 Lisez sur les philosophes mentionnés
- ✍️ Continuez à écrire vos réflexions
- 💬 Débattez avec d'autres apprenants

## 💌 Message final

Vous avez travaillé dur, réfléchi profondément, et créé quelque chose d'authentique.

**Vous avez trouvé VOTRE voix en français.**

Comme le dit Goldman : continuez à **sentir** votre cœur, à **chercher** votre "là-bas", et surtout, à **ne jamais vous endormir**.

---

## 🏆 Certificat de réussite

**{{nom_utilisateur}}**

A complété avec succès le parcours pédagogique  
**"Là-bas" - Jean-Jacques Goldman & Sirima**

Niveau : B2-C1  
Score : {{score_total_parcours}} / 530  
Date : {{date_completion}}

---

**Félicitations et continuez à apprendre le français avec passion ! 🎉**`,
        
        consignes: "Lisez votre bilan final et partagez vos impressions si vous le souhaitez.",
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
            "Qu'avez-vous trouvé le plus difficile ?",
            "Qu'avez-vous appris sur vous-même ?",
            "Recommanderiez-vous ce parcours à d'autres ?"
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
