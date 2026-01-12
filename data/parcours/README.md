# 📚 PARCOURS PÉDAGOGIQUES - JEAN-JACQUES GOLDMAN

**Statut** : ✅ 3 parcours complets (15 séances, 106 écrans, 1,575 points)  
**Durée totale** : 13h40 de contenu d'apprentissage  
**Niveaux** : B1 → C1

---

## 🎵 LES 3 PARCOURS

### 1. "Là-bas" (Goldman & Sirima, 1990)

```
📂 la-bas/
   Niveau    : B2-C1
   Thème     : Quête existentielle, aliénation sociale
   Durée     : 4h15 (255 min)
   Points    : 530
   Écrans    : 35
   Philosophie : Heidegger, Sartre, Bourdieu
```

**Séances** :
1. Découverte - Partir ailleurs (45 min, 100 pts)
2. Vocabulaire spatial et émotionnel (45 min, 100 pts)
3. Le conditionnel présent (50 min, 100 pts)
4. Débat - L'aliénation sociale (55 min, 100 pts)
5. Production - Réécriture créative (60 min, 130 pts)

---

### 2. "C'est ta chance" (Goldman, 1985)

```
📂 cest-ta-chance/
   Niveau    : B1-B2 ⭐ Le plus accessible
   Thème     : Résilience, émancipation sociale
   Durée     : 4h15 (255 min)
   Points    : 500 + 25 bonus
   Écrans    : 35
   Philosophie : Bourdieu, Sartre
```

**Séances** :
1. Découverte - Message d'espoir (40 min, 100 pts)
2. Vocabulaire de l'encouragement (45 min, 100 pts)
3. L'impératif (50 min, 100 pts)
4. Débat - Déterminisme vs Libre arbitre (55 min, 100 pts)
5. Production - Lettre d'encouragement (60 min, 100+25 pts)

---

### 3. "Né en 17 à Leidenstadt" (Goldman, 1987)

```
📂 ne-en-17/
   Niveau    : B2-C1 ⭐ Le plus exigeant
   Thème     : Humilité morale, responsabilité historique, Shoah
   Durée     : 5h10 (310 min)
   Points    : 545
   Écrans    : 36
   Philosophie : Arendt, Jaspers, Levinas
```

**Séances** :
1. Découverte - La question morale (50 min, 100 pts)
2. Vocabulaire responsabilité historique (45 min, 100 pts)
3. Le conditionnel passé (50 min, 100 pts)
4. Débat - Culpabilité collective (60 min, 100 pts)
5. Production - Réflexion personnelle (70 min, 145 pts)

**⚠️ Note** : Traitement sensible de la Shoah, niveau C1 recommandé

---

## 📊 STATISTIQUES GLOBALES

| Métrique | Valeur |
|----------|--------|
| **Parcours** | 3 |
| **Séances** | 15 |
| **Écrans** | 106 |
| **Points** | 1,575 |
| **Durée** | 13h40 |
| **Lignes de code** | ~11,050 |
| **Philosophes** | 6 (Arendt, Jaspers, Levinas, Sartre, Bourdieu, Heidegger) |

---

## 🎯 STRUCTURE D'UN PARCOURS

Chaque parcours suit cette structure :

```
📂 parcours-name/
├── chanson.ts                  # Métadonnées + paroles synchronisées
├── seance-1-decouverte.ts      # Découverte (40-50 min, 100 pts)
├── seance-2-vocabulaire.ts     # Vocabulaire (45 min, 100 pts)
├── seance-3-grammaire.ts       # Grammaire (50 min, 100 pts)
├── seance-4-debat.ts           # Débat philosophique (55-60 min, 100 pts)
└── seance-5-production.ts      # Production finale (60-70 min, 100-145 pts)
```

### Contenu de chanson.ts

- ✅ Métadonnées (titre, artiste, album, année, durée)
- ✅ Classification (niveau, genre, type de texte)
- ✅ Paroles complètes (HTML)
- ✅ Paroles synchronisées (timestamps)
- ✅ Vocabulaire clé (définitions)
- ✅ Points de grammaire
- ✅ Contexte culturel détaillé

### Contenu de seance-X.ts

- ✅ Métadonnées (titre, description, durée, objectifs)
- ✅ Compétences ciblées (codes + poids)
- ✅ Prérequis (séances précédentes)
- ✅ 6-8 écrans pédagogiques avec :
  - Introduction
  - Apprentissage
  - Exercices (QCM, texte à trous, etc.)
  - Analyses
  - Débats
  - Productions écrites/orales
  - Synthèse

---

## 🛠️ UTILISATION

### Import dans PocketBase

```bash
# Importer les 3 parcours automatiquement
npm run import:parcours
```

Ce script :
1. ✅ Crée ou met à jour les chansons
2. ✅ Crée ou met à jour les 15 séances
3. ✅ Lie les séances aux chansons
4. ✅ Affiche un rapport détaillé

### Structure TypeScript

```typescript
// Importer un parcours
import chansonData from './la-bas/chanson';
import seance1 from './la-bas/seance-1-decouverte';

// Types PocketBase compatibles
const chanson: Omit<Chanson, 'id' | 'created' | 'updated'> = chansonData;
const seance: Omit<Seance, 'id' | 'created' | 'updated' | 'chanson'> = seance1;
```

---

## 📋 TYPES D'ACTIVITÉS

Chaque parcours contient une variété d'activités :

### Compréhension
- ✅ Écoute globale
- ✅ Écoute détaillée
- ✅ QCM de compréhension
- ✅ Questions ouvertes

### Vocabulaire
- ✅ Définitions
- ✅ Exercices de contexte
- ✅ Choix multiples
- ✅ Production guidée

### Grammaire
- ✅ Explications claires
- ✅ Tableaux de conjugaison
- ✅ Exercices à trous
- ✅ Productions avec structures

### Analyse culturelle
- ✅ Contexte historique
- ✅ Références philosophiques
- ✅ Débats sociologiques
- ✅ Réflexions critiques

### Production
- ✅ Production écrite guidée (80-350 mots)
- ✅ Production orale (optionnelle)
- ✅ Révision et amélioration
- ✅ Auto-évaluation

---

## 🎓 COMPÉTENCES DÉVELOPPÉES

### Linguistiques
- Compréhension orale (CO) globale et détaillée
- Vocabulaire spécialisé (spatial, émotionnel, abstrait, moral)
- Grammaire avancée (conditionnel, impératif, subjonctif)
- Production écrite structurée
- Expression orale argumentée

### Culturelles
- Histoire de la chanson française
- Contexte social des années 80-90
- Philosophie existentialiste
- Sociologie (Bourdieu)
- Histoire contemporaine (Shoah)

### Transversales
- Pensée critique
- Argumentation nuancée
- Analyse de textes complexes
- Débat respectueux
- Réflexion personnelle

---

## 📖 PHILOSOPHES INTÉGRÉS

1. **Martin Heidegger** (Là-bas)
   - Être-au-monde
   - Authenticité vs inauthenticité

2. **Jean-Paul Sartre** (Là-bas, C'est ta chance)
   - Existentialisme
   - Liberté et responsabilité

3. **Pierre Bourdieu** (Là-bas, C'est ta chance)
   - Reproduction sociale
   - Habitus et capital culturel

4. **Hannah Arendt** (Né en 17)
   - Banalité du mal
   - Totalitarisme

5. **Karl Jaspers** (Né en 17)
   - 4 types de culpabilité
   - Responsabilité collective

6. **Emmanuel Levinas** (Né en 17)
   - Responsabilité pour autrui
   - Éthique de l'Autre

---

## ⚙️ CONFIGURATION

### Niveaux CECRL

- **B1** : Utilisateur indépendant (seuil)
- **B2** : Utilisateur indépendant (avancé)
- **C1** : Utilisateur expérimenté (autonome)

### Distribution des points

- **Activités automatiques** : 60-70% (QCM, texte à trous)
- **Productions évaluées** : 30-40% (écrits, oraux)
- **Bonus optionnels** : 0-25 points

### Durée des séances

- **Séance 1** : 40-50 min (découverte)
- **Séances 2-4** : 45-60 min (apprentissage)
- **Séance 5** : 60-70 min (production finale)

---

## 🚀 PROCHAINS PARCOURS (EN ATTENTE)

Fichiers audio disponibles :

- 📦 "Envole-moi" (Goldman)
- 📦 "Comme toi" (Goldman)
- 📦 "Le coureur" (Goldman)
- 📦 "La corrida" (Francis Cabrel)
- 📦 "Rouge" (Fredericks Goldman Jones)
- 📦 "Des vôtres" (Fredericks Goldman Jones)
- 📦 "Né quelque part" (Maxime Le Forestier)

---

## 📚 DOCUMENTATION ASSOCIÉE

- **SYNTHESE_COMPLETE_PHASE2.md** : Synthèse finale détaillée
- **SCRIPTS_README.md** : Guide des scripts d'import
- **TABLEAU_DE_BORD.md** : Vue d'ensemble du projet
- **PROGRESSION_PHASE2.md** : Suivi détaillé

---

## 🏆 QUALITÉ

✅ **Code** : TypeScript typé, interfaces PocketBase respectées  
✅ **Pédagogie** : Progression cohérente, activités variées  
✅ **Philosophie** : Concepts authentiques, pas de simplification  
✅ **Langue** : Vocabulaire riche, grammaire précise  
✅ **Culture** : Contexte historique et social détaillé  

---

**Créé le** : 6 janvier 2026  
**Statut** : ✅ 100% COMPLET  
**Prêt pour** : Import dans PocketBase et utilisation frontend

🎵 **"Né en 17, à Leidenstadt, ça ressemblait à n'importe quelle autre ville..."** 🕊️
