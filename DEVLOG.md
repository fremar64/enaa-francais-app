# 2026-01-19 - Composants ScoreCard & DomainRadar

- Ajout du composant ScoreCard pour l'affichage du score CEREDIS et du niveau CECRL
- Ajout du composant DomainRadar pour la visualisation graphique des scores par domaine
- Intégration de ces composants dans la page /dashboard/student

# 2026-01-19 - Intégration API CEREDIS & Dashboard

- Création de l'API route /api/ceredis/calculate pour le calcul des scores CEREDIS
- Ajout d'un client TypeScript pour requêter l'API
- Création du hook useCeredisScore pour le frontend
- Création de la page /dashboard/student pour afficher les scores calculés

## 2026-01-19 - Migration moteur CEREDIS

- Extraction de l'archive ceredis-engine-v1.0.tar.gz
- Création de la structure services/ceredis-calculator/engine et config
- Conversion des fichiers JS du moteur en TypeScript : evidenceAggregator, competencyCalculator, domainCalculator, ceredisCalculator, cecrlDecider, levelValidator
- Création d'un index.ts pour exposer toutes les fonctions du moteur
- Ajout d'un config.ts pour charger la configuration CEREDIS

/* ...dernier log... */
# [2026-01-18] Migration Next.js 16 et sécurisation des routes

- Migration du projet vers Next.js 16.1.1 : suppression de l’ancien middleware.ts (obsolète), création de proxy.ts pour la protection des routes selon le rôle (élève/enseignant).
- Correction de tous les problèmes de build (hooks client, typage NextAuth, typage middleware, etc.).
- Build de production validé sans warning ni erreur.
- Commit et push sur Github de l’ensemble des modifications.

---

# [2026-01-14] Feuille de route détaillée - Intégration Tracking CEREDIS

## Objectif principal
Assurer un tracking pédagogique complet, sécurisé et robuste pour toutes les activités CEREDIS (xAPI, CaSS, PocketBase) dans l’application Next.js.

---

## 1. Validation et robustesse
- [ ] Écrire un script de test automatisé pour simuler la complétion de chaque type d’activité (QCM, texte libre, journal, etc.)
- [ ] Effectuer des tests manuels sur l’interface pour chaque activité et vérifier la création des statements xAPI et assertions CaSS
- [ ] Vérifier dans les logs serveur que le refresh JWT CaSS fonctionne (expiration, retry 401)
- [ ] Simuler des erreurs côté serveur (credentials invalides, CaSS down, LRS down) et vérifier la robustesse du système

## 2. Monitoring et logs
- [ ] Ajouter des logs détaillés (succès, erreurs, refresh JWT) dans les API Routes et le client CaSS
- [ ] Intégrer Sentry (ou équivalent) pour la capture automatique des erreurs serveur
- [ ] Configurer une alerte email ou Slack en cas d’erreur critique (échec CaSS/xAPI)

## 3. Optimisation des performances
- [ ] Utiliser un middleware ou un outil (ex: Next.js middleware, custom logger) pour mesurer le temps de réponse des API Routes
- [ ] Mettre en cache en mémoire les frameworks/compétences CaSS dans le client (durée configurable)
- [ ] Analyser les logs pour identifier les goulots d’étranglement

## 4. Sécurité renforcée
- [ ] Vérifier la présence de `.env.local` dans `.gitignore` et auditer l’historique git
- [ ] Limiter les permissions des comptes CaSS/xAPI utilisés (lecture/écriture strictement nécessaires)
- [ ] Mettre en place un rate limit sur les API Routes critiques (ex: /api/ceredis/track)
- [ ] Ajouter des tests d’intrusion basiques (ex: injection, brute force)

## 5. Expérience utilisateur
- [ ] Implémenter une gestion d’erreur utilisateur-friendly dans le frontend (toast, modale, etc.)
- [ ] Ajouter un indicateur de progression ou de succès après chaque soumission d’activité
- [ ] Proposer un feedback pédagogique (score, compétences validées, etc.)

## 6. Documentation et onboarding
- [ ] Mettre à jour le GUIDE_INTEGRATION_TRACKING.md avec les dernières pratiques et captures d’écran
- [ ] Ajouter une section "FAQ" et "Dépannage" dans la documentation
- [ ] Documenter la procédure pour ajouter un nouveau type d’activité ou une nouvelle compétence

## 7. Interopérabilité et export
- [ ] Développer une API Route ou un script pour exporter les données de tracking (CSV, JSON)
- [ ] Tester l’import/export avec d’autres outils pédagogiques (LRS, CaSS, PocketBase)
- [ ] Documenter le format d’export et les cas d’usage

## 8. Maintenance et évolutivité
- [ ] Écrire des tests automatisés (unitaires et d’intégration) pour les services critiques
- [ ] Mettre en place un workflow CI pour exécuter les tests à chaque PR
- [ ] Planifier une revue mensuelle des dépendances et des vulnérabilités (npm audit)

---

## Prochaines étapes immédiates
1. Valider le tracking complet sur plusieurs activités (tests manuels et scripts)
2. Mettre en place un monitoring des erreurs serveur
3. Optimiser la gestion des appels CaSS (cache, batch, etc.)
4. Renforcer la documentation pour l’équipe
5. Préparer l’export des données de tracking
# Journal de Développement - Chansons Françaises Next.js

## 2026-01-14 - Page séance connectée aux écrans CEREDIS ✅

### Réécriture complète de la page séance

**La page `/chanson/[chansonId]/seance/[seanceId]` utilise maintenant les vrais écrans CEREDIS**

1. **Nouvelle architecture de la page** (`app/chanson/[chansonId]/seance/[seanceId]/page.tsx`)
   - Chargement des séances via le hook `useSeance`
   - Recherche par ID (`lecoureur-s1`) ou numéro de séance
   - Parcours des écrans CEREDIS avec navigation précédent/suivant

2. **Composants d'activités simplifiés** (dans le même fichier)
   - `EcranIntroSimple` : Introduction avec contenu markdown
   - `QuizQCMSimple` : Questions à choix multiples interactives
   - `TexteATrousSimple` : Texte à compléter
   - `TexteLibreSimple` : Production écrite libre
   - `JournalReflexifSimple` : Journal de métacognition
   - `EcouteSimple` : Écran d'écoute (découverte ou ciblée)

3. **Fonction utilitaire type-safe**
   - `getActiviteContenu()` : Extrait le contenu texte de manière sécurisée
   - Évite les erreurs TypeScript avec le type union `ActiviteData`

4. **Hook `useSeance` amélioré** (`hooks/useSeances.ts`)
   - Accepte un ID string (ex: `lecoureur-s1`) ou un numéro
   - Recherche par ID exact puis extraction du numéro du pattern `s(\d+)`

### Fichiers modifiés
- `app/chanson/[chansonId]/seance/[seanceId]/page.tsx` - Réécriture complète
- `hooks/useSeances.ts` - Support ID string et numéro

### Tests validés
- ✅ TypeScript sans erreurs
- ✅ Page se charge sans erreurs (200)
- ✅ Compilation réussie

---

## 2026-01-14 - Connexion des séances aux pages chanson

### Système de chargement des séances ✅

**Les séances des parcours sont maintenant connectées aux pages chanson**

Création d'un système centralisé pour charger les séances pédagogiques :

1. **Index central des parcours** (`data/parcours/index.ts`)
   - `PARCOURS_MAP` : Map des parcours par slug
   - `getSeancesBySlug(slug)` : Récupère les séances d'une chanson
   - `hasParcoursForSlug(slug)` : Vérifie si un parcours existe
   - Conversion automatique `SeanceCeredis` → `Seance` standard

2. **Hook `useSeances`** (`hooks/useSeances.ts`)
   - Récupère les séances par chansonId/slug
   - Essaie plusieurs variantes du slug (lowercase, avec tirets)
   - Retourne `{ seances, seancesCeredis, hasSeances }`

3. **Intégration dans la page chanson** (`app/chanson/[chansonId]/page.tsx`)
   - Import du hook `useSeances`
   - Passage des vraies séances au composant `SeancesList`

### Parcours disponibles (3 sur 4 chansons)
- ✅ `le-coureur` : 5 séances, 43 écrans
- ✅ `cest-ta-chance` : 5 séances, 41 écrans  
- ✅ `la-bas` : 3 séances (en cours de développement)
- ❌ `ne-en-17-a-leidenstadt` : Parcours à créer

### Prochaines étapes
- [ ] Connecter la page séance aux vrais écrans CEREDIS
- [ ] Ajouter les fichiers audio pour le lecteur
- [ ] Créer le parcours pour "Né en 17 à Leidenstadt"

### Fichiers créés/modifiés
- `data/parcours/index.ts` (nouveau) - Index central des parcours
- `hooks/useSeances.ts` (nouveau) - Hook de chargement des séances
- `app/chanson/[chansonId]/page.tsx` - Intégration du hook

---

## 2026-01-14 - Import "Le coureur" + Configuration .env.local

### Ajout de la configuration ✅

**Création de `.env.local` pour stocker les credentials PocketBase**

- `NEXT_PUBLIC_POCKETBASE_URL` : URL de l'instance PocketBase
- `PB_ADMIN_EMAIL` : Email admin pour les scripts d'import
- `PB_ADMIN_PASSWORD` : Mot de passe admin (gitignore déjà en place)

### Import réussi ✅

**"Le coureur" ajouté à PocketBase** (ID: `nfui0t9sgv8jog3`)

- Script `scripts/import-le-coureur.ts` modifié pour lire `.env.local`
- Installation de `dotenv` en devDependency
- PocketBase contient maintenant **4 chansons** :
  1. Là-bas (pidmeza2iggecpc)
  2. C'est ta chance (78iolh3qjm52pj7)
  3. Né en 17 à Leidenstadt (y6yl3pyz1qacf5k)
  4. Le coureur (nfui0t9sgv8jog3)

### Fichiers ajoutés/modifiés
- `.env.local` (nouveau) - Credentials PocketBase (non versionné)
- `scripts/import-le-coureur.ts` - Lecture depuis .env.local, audio_url vide

---

## 2026-01-14 - Connexion PocketBase + système de slugs

### Problème résolu ✅

**Le bouton "Commencer le parcours" affichait toujours "Chanson non trouvée"**

### Cause racine
Les URLs utilisaient des slugs (`cest-ta-chance`, `la-bas`) mais PocketBase utilise des IDs auto-générés (`78iolh3qjm52pj7`, `pidmeza2iggecpc`).

### Solution
1. **Système de slugs** dans `lib/pocketbase.ts` :
   - Fonction `createSlug(titre)` pour normaliser les titres en slugs
   - Fonction `getChansonBySlug(slug)` avec mapping slug → titre
   - Mapping des slugs connus vers les titres exacts dans PocketBase

2. **Modification de `ChansonDisplay`** dans `hooks/useChansons.ts` :
   - Ajout d'un champ `slug` dans le type
   - Conversion PB → Display inclut maintenant le slug généré
   - Données locales incluent le slug

3. **Recherche par slug** dans `app/chanson/[chansonId]/page.tsx` :
   - `chansons.find(c => c.slug === chansonId || c.id === chansonId)`
   - Compatible avec les URLs par slug ET par ID PocketBase

### Instance PocketBase
- URL : `https://pocketbase-songs.ceredis.net`
- Déjà configurée dans `lib/pocketbase.ts`
- 3 chansons disponibles : "C'est ta chance", "Là-bas", "Né en 17 à Leidenstadt"

### Fichiers modifiés
- `lib/pocketbase.ts` - Ajout `createSlug()` et `getChansonBySlug()`
- `hooks/useChansons.ts` - Ajout champ `slug` + import `createSlug`
- `app/chanson/[chansonId]/page.tsx` - Recherche par slug ou ID

---

## 2026-01-14 - Correction "Chanson non trouvée" depuis l'accueil (v1)

### Fonctionnalité ajoutée ✅

**Activités d'écoute (`ecoute_decouverte` / `ecoute_ciblee`) fonctionnelles dans la page de séance**

### Modifications
- Ajout des types `ecoute_decouverte` et `ecoute_ciblee` dans le type `Activite`
- Import du composant `EcouteChanson` depuis `@/components/activities`
- Ajout des cas d'écoute dans le switch `renderActivity()` avec mapping des données
- Ajout d'une activité d'écoute de démonstration au début des activités mock

### Fichier modifié
- `app/chanson/[chansonId]/seance/[seanceId]/page.tsx`

### Fonctionnement
- Les activités d'écoute sont affichées avec le composant `EcouteChanson`
- L'audio se charge depuis `/audio/chansons/{artiste}/{chanson}.mp3`
- Objectifs et éléments de focus sont affichés à l'utilisateur
- La progression d'écoute est suivie avant de permettre la validation

---

## 2026-01-14 - Correction erreur d'hydratation SSR

### Problème résolu
Erreur "Hydration failed because the server rendered HTML didn't match the client"

### Cause
Les hooks `useDashboard.ts` et `useTeacherDashboard.ts` utilisaient `Math.random()` et `Date.now()` pour générer des données mock, produisant des valeurs différentes entre le serveur (SSR) et le client.

### Solution
1. Création d'un générateur pseudo-aléatoire déterministe `seededRandom(seed)`
2. Remplacement de tous les `Math.random()` par `seededRandom(index)` avec un seed basé sur l'index
3. Remplacement de tous les `Date.now()` par des dates fixes (`'2026-01-13T00:00:00.000Z'`)

### Fichiers modifiés
- `hooks/useDashboard.ts` - MOCK_HISTORIQUE avec dates fixes, createMockCompetenceDetails déterministe
- `hooks/useTeacherDashboard.ts` - generateMockHistorique, generateMockEleves, generateMockProfilDomaines, generateMockCompetencesCritiques, generateMockPreuves, calculateMockStatistiques

---

## 2026-01-14 - Parcours "Le coureur" complet

### Parcours créé ✅

**"Le coureur" de Jean-Jacques Goldman** - Parcours complet CEREDIS :
- **5 séances, 43 écrans** (~339 minutes, ~303 points max)
- Thème : La mondialisation est-elle émancipation ou aliénation ?

| Séance | Titre | Écrans | Focus |
|--------|-------|--------|-------|
| 1 | Découverte | 9 | 7 étapes chronologiques du déracinement, oppositions AVANT/APRÈS |
| 2 | Vocabulaire | 8 | 4 champs lexicaux (nature, modernité, déshumanisation, mondialisation) |
| 3 | Grammaire | 8 | Imparfait vs passé composé, voix passive |
| 4 | Débat | 9 | Mondialisation : thèse/antithèse/synthèse, dimension post-coloniale |
| 5 | Production | 9 | Récit de transformation ambivalente (450-500 mots) |

### Fichiers créés
- `data/parcours/le-coureur/Texte.txt` - Paroles complètes
- `data/parcours/le-coureur/chanson.ts` - Métadonnées, vocabulaire clé, 7 étapes
- `data/parcours/le-coureur/seance-1-decouverte.ts`
- `data/parcours/le-coureur/seance-2-vocabulaire.ts`
- `data/parcours/le-coureur/seance-3-grammaire.ts`
- `data/parcours/le-coureur/seance-4-debat.ts`
- `data/parcours/le-coureur/seance-5-production.ts`
- `data/parcours/le-coureur/index.ts`

### Métaphore centrale
- **AVANT** : "Je la caressais naguère" (harmonie avec la terre)
- **APRÈS** : "Des clous aux pieds pour écorcher la terre" (violence, aliénation)

### Structure narrative (7 étapes)
1. Vie d'origine (plage, alizés, ancêtres)
2. Découverte (recruteur, chronomètre)
3. Transaction (dollars, signature)
4. Transplantation (avion, froid des villes)
5. Déshumanisation (mesuré comme un cheval)
6. Transformation (numéro, compétition)
7. Bilan ambivalent (étranger partout, "C'est ainsi")

---

## 2026-01-13 - Parcours "C'est ta chance" complet + Corrections TypeScript majeures

### Parcours créé ✅

**"C'est ta chance" de Jean-Jacques Goldman** - Parcours complet CEREDIS :
- **5 séances, 41 écrans** (~344 minutes, ~304 points max)
- Thème : Les injustices de la vie et la transformation de la souffrance en force

| Séance | Titre | Écrans | Focus |
|--------|-------|--------|-------|
| 1 | Découverte | 9 | À qui s'adresse Goldman ? Le paradoxe "pas de chance" → "ta chance" |
| 2 | Vocabulaire | 9 | Transformation : blessure→force, souffrance→rêves, intelligence philosophique |
| 3 | Grammaire | 9 | "Il faudra que tu..." + subjonctif (futur de la nécessité) |
| 4 | Débat | 8 | "Prouver deux fois plus" - accepter ou refuser les injustices ? |
| 5 | Production | 8 | Lettre à soi-même / Manifeste personnel (300-400 mots) |

### Fichiers créés
- `data/parcours/cest-ta-chance/seance-2-vocabulaire-migre.ts`
- `data/parcours/cest-ta-chance/seance-3-grammaire-migre.ts`
- `data/parcours/cest-ta-chance/seance-4-debat-migre.ts`
- `data/parcours/cest-ta-chance/seance-5-production-migre.ts`
- `data/parcours/cest-ta-chance/index.ts`

### Corrections TypeScript majeures

**Types étendus** :
- `TypeEcran` : ajout de `ecoute_ciblee`
- `ActiviteData` : ajout de `ecoute_ciblee` dans l'union type
- `JournalReflexifData` : ajout de `contexte`, `nombreMotsMin`, `exemplesReponses`
- `LevelBadge` : support de tous les niveaux CECRL (A1-C2)
- `type_texte` : ajout de `narratif_argumentatif`

**Composants UI corrigés** :
- `calendar.tsx` : Migration vers nouvelle API react-day-picker (Chevron)
- `chart.tsx` : Correction des types payload, formatter, et value
- `resizable.tsx` : Migration vers nouvelle API react-resizable-panels (Group, Panel, Separator)
- `RadarCompetences.tsx` : Type assertion pour textAnchor
- `TexteATrous.tsx` : Nullish coalescing pour estCorrect

**Données parcours corrigées** :
- `cest-ta-chance/chanson.ts` : Type local LigneSynchronisee, conversion vocabulaire_cle
- `la-bas/chanson.ts` : Mêmes corrections
- Tous les fichiers `ordre_elements` : Format `{id, texte, ordre}` obligatoire

**Fichiers obsolètes supprimés** :
- `la-bas/seance-1-decouverte.ts`, `seance-1.ts`, `seance-3-grammaire.ts`, etc.
- `ne-en-17/seance-1-decouverte.ts`, `seance-2-vocabulaire.ts`, etc.
- `cest-ta-chance/seance-2-vocabulaire.ts`, etc. (anciens formats)

### Build réussi ✅

```
✓ Compiled successfully in 16.0s
✓ Finished TypeScript in 25.3s
✓ Generating static pages (8/8)
```

---

## 2025-01-XX - Migration vers Next.js complétée

### Pages créées et testées ✅

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ 200 | Page d'accueil avec catalogue de chansons |
| `/login` | ✅ 200 | Page de connexion PocketBase |
| `/register` | ✅ 200 | Page d'inscription multi-étapes |
| `/dashboard` | ✅ 200 | Tableau de bord apprenant |
| `/enseignant` | ✅ 200 | Dashboard enseignant avec suivi élèves |
| `/chanson/[chansonId]` | ✅ 200 | Détail chanson avec lecteur audio |
| `/chanson/[chansonId]/seance/[seanceId]` | ✅ 200 | Lecteur de séance pédagogique |

### Composants créés

- `components/layout/Footer.tsx` - Pied de page avec navigation et copyright

### Configuration Tailwind v4

- PostCSS configuré avec `@tailwindcss/postcss`
- globals.css utilise `@import "tailwindcss"` + `@config`

### Notes techniques

- Next.js 16.1.1 avec Turbopack
- Serveur de dev sur port 3000
- CaSS/xAPI services désactivés (credentials manquants - comportement attendu)
- Routes dynamiques cohérentes avec `chansonId` et `seanceId`

### Prochaines étapes

- [ ] Tests E2E avec Playwright
- [ ] Configuration PocketBase production
- [ ] Déploiement Vercel
