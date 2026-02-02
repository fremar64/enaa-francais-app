# 🚀 GUIDE RAPIDE MVP - Dashboard CEREDIS

**Pour** : Ceredis (Brazzaville)  
**Date** : Lundi 2 février 2026, 8h30  
**Option choisie** : A (MVP Simple)  
**Durée estimée** : 3h40  
**Objectif** : Dashboard MVP + Navigation corrigée

---

## 🎯 OBJECTIF AUJOURD'HUI

Créer un **Dashboard MVP fonctionnel** avec **navigation globale**.

### Ce qu'on fait aujourd'hui ✅
- ✅ Navigation globale (Accueil → Parcours → Dashboard → Profil)
- ✅ Dashboard complet avec meilleurs composants
- ✅ API CEREDIS simple
- ✅ Application navigable de bout en bout

### Ce qu'on reporte à Mercredi ⏸️
- ⏸️ Vues différenciées par rôle (élève/enseignant/chercheur)
- ⏸️ Analytics avancés (cohorte, statistiques)
- ⏸️ Dashboard enseignant spécialisé
- ⏸️ Dashboard chercheur avec analyses scientifiques

---

## 📋 PLAN DE TRAVAIL

### 🔴 PRIORITÉ 1 : Navigation (30min)

**TÂCHE 0** - Créer la navigation globale

```bash
# 1. Créer les composants de layout
mkdir -p components/layout
code components/layout/Navbar.tsx
code components/layout/AuthenticatedLayout.tsx

# 2. Ouvrir Copilot Chat (Ctrl+I)
# 3. Copier-coller les instructions TÂCHE 0 depuis :
#    DASHBOARD_MVP_INSTRUCTIONS_COPILOT_V2.md
```

**Résultat attendu** :
- Navbar en haut de page
- Liens : Accueil | Parcours | Dashboard | Profil | Déconnexion
- Lien actif mis en évidence

---

### 🟡 PRIORITÉ 2 : Dashboard (2h)

**TÂCHES 1-7** - Exactement comme dans le premier document

```bash
# Ordre d'exécution :
# TÂCHE 5 (Types) → 15min
# TÂCHE 1 (API) → 45min
# TÂCHE 2 (Client) → 15min
# TÂCHE 3 (Hook) → 30min
# TÂCHE 4 (Dashboard) → 30min (VERSION SIMPLIFIÉE)
# TÂCHE 7 (Index) → 5min
```

**Différence avec document original** :
- TÂCHE 4 est **simplifiée** : pas de vues multi-rôles
- TÂCHE 6 est **supprimée** : on garde les deux composants radar
- Focus sur **une seule vue** pour tous les utilisateurs

---

### 🟢 PRIORITÉ 3 : Tests (30min)

```bash
# 1. Build
npm run build

# 2. Lancer
npm run dev

# 3. Tester navigation
# - Cliquer sur tous les liens
# - Vérifier qu'on peut naviguer partout
# - Tester déconnexion

# 4. Tester dashboard
# - Vérifier affichage score CEREDIS
# - Vérifier radar 5 domaines
# - Vérifier grille 19 compétences
# - Pas d'erreurs console
```

---

## ⏰ PLANNING DÉTAILLÉ

| Heure | Tâche | Action |
|-------|-------|--------|
| **8h30 - 9h00** | TÂCHE 0 | Navigation |
| **9h00 - 9h10** | Test | Navigation fonctionne |
| **9h10 - 9h25** | TÂCHE 5 | Types |
| **9h25 - 10h10** | TÂCHE 1 | API Route |
| **10h10 - 10h20** | Test | API via curl |
| **10h20 - 10h30** | ☕ PAUSE | Café |
| **10h30 - 10h45** | TÂCHE 2 | Client |
| **10h45 - 11h15** | TÂCHE 3 | Hook |
| **11h15 - 11h45** | TÂCHE 4 | Dashboard |
| **11h45 - 11h50** | TÂCHE 7 | Index |
| **11h50 - 12h10** | Tests | Validation finale |
| **12h10** | ✅ FIN | Dashboard MVP prêt ! |

---

## 📝 DIFFÉRENCES AVEC PLAN ORIGINAL

### Ce qui RESTE identique
- TÂCHE 1 : API Route complète ✅
- TÂCHE 2 : Client complet ✅
- TÂCHE 3 : Hook complet ✅
- TÂCHE 5 : Types complets ✅
- TÂCHE 7 : Index complet ✅

### Ce qui EST MODIFIÉ

**TÂCHE 0 (NOUVELLE)** : Navigation globale
- **Ajoutée** car problème critique identifié
- **Priorité absolue** avant tout le reste

**TÂCHE 4** : Dashboard page.tsx
- **Simplifiée** : une seule vue pour tous
- **Pas de** `if (user.role === 'teacher')`
- **Pas de** vues différenciées
- Tout le monde voit : Score + Domaines + Compétences

**TÂCHE 6** : Nettoyage
- **Supprimée** : pas critique
- On garde les deux composants radar pour l'instant
- Optimisation future

---

## 🧪 CHECKLIST DE TEST

### ⚠️ Navigation (CRITIQUE)
- [ ] Je peux aller de Dashboard → Accueil
- [ ] Je peux aller de Accueil → Parcours
- [ ] Je peux aller de Parcours → Dashboard
- [ ] Je peux aller au Profil
- [ ] Déconnexion fonctionne
- [ ] Lien actif est mis en évidence

### Dashboard
- [ ] CeredisScoreCard visible (si score existe)
- [ ] Radar 5 domaines visible
- [ ] Grille 19 compétences visible
- [ ] Progression globale visible
- [ ] Historique activités visible
- [ ] Pas d'erreurs console

### API
- [ ] `/api/ceredis/calculate` répond
- [ ] Retourne JSON avec scores
- [ ] Gère les erreurs

---

## 📸 RÉSULTAT ATTENDU

### Navigation globale

```
┌────────────────────────────────────────────────────────┐
│ [Logo] ENAA  [Accueil] [Parcours] [Dashboard] [Profil] [Déconnexion] │
└────────────────────────────────────────────────────────┘
```

### Dashboard complet

```
┌─────────────────────────────────────────────────┐
│ [Score CEREDIS] [Profil] [Parcours]            │
│  452/600  B2                                    │
├─────────────────────────────────────────────────┤
│ Progression Globale                             │
│ [Stats: séances, score, temps]                  │
├─────────────────────────────────────────────────┤
│ [Radar 5 domaines] | [Historique activités]    │
├─────────────────────────────────────────────────┤
│ Grille 19 compétences                           │
│ D1: 1.1, 1.2, 1.3                               │
│ D2: 2.1, 2.2, 2.3                               │
│ ...                                             │
└─────────────────────────────────────────────────┘
```

---

## 🚨 EN CAS DE PROBLÈME

### Navigation ne s'affiche pas

```bash
# Vérifier les imports
grep -r "Navbar" app/dashboard/
grep -r "AuthenticatedLayout" app/dashboard/

# Vérifier compilation TypeScript
npm run type-check
```

### Dashboard ne charge pas les données

```bash
# Console navigateur (F12)
# Chercher erreurs réseau ou JavaScript

# Tester l'API directement
curl -X POST http://localhost:3000/api/ceredis/calculate \
  -H "Content-Type: application/json" \
  -d '{"userId":"07658230-3d93-4cca-b91f-73bee33e24d8"}'
```

### Build échoue

```bash
# Nettoyer
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run build
```

---

## 💡 CONSEILS PRATIQUES

### Travailler avec Copilot

1. **Lire les instructions COMPLÈTES** avant de demander à Copilot
2. **Copier-coller tout le bloc** d'instructions (pas de résumé)
3. **Tester immédiatement** après chaque tâche
4. **Commit après chaque tâche réussie**

### Organisation

```bash
# Garder 3 terminaux ouverts :
# Terminal 1 : npm run dev (serveur)
# Terminal 2 : commandes git
# Terminal 3 : tests (curl, etc.)
```

### Vérifications rapides

```typescript
// Dans console navigateur, vérifier les données :
console.log(stats); // doit contenir scoreCeredis, domainesScores, etc.
```

---

## 🎉 APRÈS FINALISATION

### Actions immédiates

```bash
# 1. Commit final
git add .
git commit -m "feat: Dashboard MVP avec navigation - TERMINÉ"
git push

# 2. Attendre déploiement Vercel (~2 min)

# 3. Tester en production
# https://enaa-chansons.ceredis.net
```

### Documenter

```bash
# Mettre à jour le DEVLOG
echo "## 2026-02-02 - Dashboard MVP ✅

- Navigation globale créée
- Dashboard complet fonctionnel
- API CEREDIS opérationnelle
- Application navigable bout en bout

**Durée réelle** : Xh (prévu 3h40)
**Résultat** : MVP production-ready ✅

**Prochaine étape** : Mardi 3 fév - Moteur CEREDIS Phase A
" >> DEVLOG.md
```

---

## 📅 SUITE DU PROJET

### Mardi 3 février (demain)
**Moteur CEREDIS Phase A** (comme prévu)
- Intégrer le vrai moteur de calcul
- Remplacer calcul simplifié par moteur complet
- Durée : 3-4h

### Mercredi 4 février
**Vues différenciées par rôle**
- Dashboard élève (simplifié, motivant)
- Dashboard enseignant (détaillé, pédagogique)
- Dashboard chercheur (analytique, scientifique)
- Durée : 4-5h

### Jeudi 5 février
**Analytics avancés**
- Vue cohorte
- Analyse pré/post
- Impact Domaine 5
- Statistiques pour recherche
- Durée : 3-4h

---

## 📊 SUIVI DE PROGRESSION

| Tâche | Durée | Statut | Heure fin |
|-------|-------|--------|-----------|
| TÂCHE 0 Navigation | 30min | ⏳ | 9h00 |
| Test navigation | 10min | ⏳ | 9h10 |
| TÂCHE 5 Types | 15min | ⏳ | 9h25 |
| TÂCHE 1 API | 45min | ⏳ | 10h10 |
| Test API | 10min | ⏳ | 10h20 |
| PAUSE | 10min | ⏳ | 10h30 |
| TÂCHE 2 Client | 15min | ⏳ | 10h45 |
| TÂCHE 3 Hook | 30min | ⏳ | 11h15 |
| TÂCHE 4 Dashboard | 30min | ⏳ | 11h45 |
| TÂCHE 7 Index | 5min | ⏳ | 11h50 |
| Tests finaux | 20min | ⏳ | 12h10 |
| **TOTAL** | **3h40** | **0%** | **12h10** |

**Cochez** ✅ après chaque tâche terminée !

---

## 🎯 OBJECTIF FIN DE JOURNÉE

### Livrable 1 : Navigation ✅
```
Accueil ←→ Parcours ←→ Dashboard ←→ Profil
```

### Livrable 2 : Dashboard MVP ✅
```
Score CEREDIS + Niveau CECRL
Radar 5 domaines
Grille 19 compétences
Progression globale
Historique activités
```

### Livrable 3 : API fonctionnelle ✅
```
POST /api/ceredis/calculate
→ { score, niveau, domaines, compétences }
```

---

**BON COURAGE !** 💪

Vous avez 3h40 pour créer un Dashboard MVP professionnel et navigable !

La navigation d'abord, le reste suivra naturellement. 🚀

---

**Document créé** : 2 février 2026, 8h30 (Brazzaville)  
**Version** : MVP (Option A)  
**Durée prévue** : 3h40 (8h30 → 12h10)  
**Fin prévue** : 12h10 - Juste à temps pour le déjeuner ! 🍽️
