# 📅 PLAN D'ACTION VISUEL - Timeline de développement

**Date de début** : 2026-01-18  
**Durée totale** : 7.5 jours ouvrés  
**Date de fin estimée** : 2026-01-29

---

## 📊 TIMELINE GLOBALE

```
Semaine 1 (18-19 Jan)    : CRITIQUE - Fonctionnalités essentielles
Semaine 2 (20-24 Jan)    : CONSOLIDATION - Complétion
Semaine 3 (27-28 Jan)    : FINALISATION - Polish & Tests
Buffer (29 Jan)          : Imprévus
```

---

## 🗓️ PLANNING DÉTAILLÉ

### SEMAINE 1 : CRITIQUE ⚠️ (2 jours)

#### Jour 1 - Lundi 18 Janvier 2026
```
🔴 PRIORITÉ ABSOLUE : Moteur CEREDIS

Matin (4h)
├─ 08:00-09:00 │ Extraire archive ceredis-engine-v1.0.tar.gz
├─ 09:00-10:00 │ Créer structure /services/ceredis-calculator/
├─ 10:00-11:00 │ Porter types.ts et config.ts
└─ 11:00-12:00 │ Porter evidenceAggregator.ts

Après-midi (4h)
├─ 13:00-14:00 │ Porter competencyCalculator.ts
├─ 14:00-15:00 │ Porter domainCalculator.ts
├─ 15:00-16:00 │ Porter ceredisCalculator.ts
├─ 16:00-17:00 │ Porter cecrlDecider.ts et levelValidator.ts
└─ 17:00-18:00 │ Créer index.ts et point d'entrée

Livrable : Moteur TypeScript prêt
```

#### Jour 2 - Mardi 19 Janvier 2026
```
🔴 PRIORITÉ ABSOLUE : Dashboard Scores

Matin (4h)
├─ 08:00-09:00 │ Créer API Route /api/ceredis/calculate
├─ 09:00-10:00 │ Tests API avec données mock
├─ 10:00-11:00 │ Créer /lib/ceredis/client.ts
└─ 11:00-12:00 │ Créer hook useCeredisScore()

Après-midi (4h)
├─ 13:00-14:30 │ Créer page /dashboard/student
├─ 14:30-15:30 │ Composant ScoreCard + LevelBadge
├─ 15:30-16:30 │ Composant DomainRadar (graphique)
└─ 16:30-18:00 │ Intégrer dans navigation + tests

Livrable : Dashboard fonctionnel avec scores
```

**Checkpoint Semaine 1** : 
✅ Moteur CEREDIS intégré  
✅ Scores calculables via API  
✅ Dashboard étudiant basique  
✅ Pipeline E2E complet

---

### SEMAINE 2 : CONSOLIDATION 🔧 (3 jours)

#### Jour 3 - Mercredi 20 Janvier 2026
```
🟡 Finaliser composants + Dashboard enseignant

Matin (1h)
├─ 08:00-08:15 │ Mettre à jour TexteATrous.tsx
├─ 08:15-08:30 │ Mettre à jour OrdreElements.tsx
├─ 08:30-08:45 │ Mettre à jour JournalReflexif.tsx
└─ 08:45-09:00 │ Tests des 3 composants

Matin suite (3h)
├─ 09:00-10:00 │ Créer page /dashboard/teacher
├─ 10:00-11:00 │ Composant StudentList
└─ 11:00-12:00 │ Composant ClassStats

Après-midi (4h)
├─ 13:00-14:00 │ Composant CompetencyHeatmap
├─ 14:00-15:00 │ Composant ClassProgressChart
├─ 15:00-16:30 │ Filtres et tri
└─ 16:30-18:00 │ Tests dashboard enseignant

Livrable : Tous composants finalisés + Dashboard enseignant
```

#### Jour 4 - Jeudi 21 Janvier 2026
```
🟡 Données parcours "Né en 17" + "Là-bas"

Matin (4h)
├─ 08:00-09:00 │ Compléter séance 2 "Né en 17"
├─ 09:00-10:00 │ Compléter séance 3 "Né en 17"
├─ 10:00-11:00 │ Compléter séance 4 "Né en 17"
└─ 11:00-12:00 │ Compléter séance 5 "Né en 17"

Après-midi (4h)
├─ 13:00-13:50 │ Créer séance 1 "Là-bas"
├─ 13:50-14:40 │ Créer séance 2 "Là-bas"
├─ 14:40-15:30 │ Créer séance 3 "Là-bas"
├─ 15:30-16:20 │ Créer séance 4 "Là-bas"
└─ 16:20-17:00 │ Créer séance 5 "Là-bas"

Livrable : 2 parcours complets (10 séances)
```

#### Jour 5 - Vendredi 22 Janvier 2026
```
🟡 Données parcours "C'est ta chance" + "Le coureur"

Matin (4h)
├─ 08:00-08:50 │ Créer séance 1 "C'est ta chance"
├─ 08:50-09:40 │ Créer séance 2 "C'est ta chance"
├─ 09:40-10:30 │ Créer séance 3 "C'est ta chance"
├─ 10:30-11:20 │ Créer séance 4 "C'est ta chance"
└─ 11:20-12:00 │ Créer séance 5 "C'est ta chance"

Après-midi (4h)
├─ 13:00-13:50 │ Créer séance 1 "Le coureur"
├─ 13:50-14:40 │ Créer séance 2 "Le coureur"
├─ 14:40-15:30 │ Créer séance 3 "Le coureur"
├─ 15:30-16:20 │ Créer séance 4 "Le coureur"
└─ 16:20-17:00 │ Créer séance 5 "Le coureur"

Livrable : 4 parcours complets (20 séances, 126 écrans)
```

**Checkpoint Semaine 2** :
✅ Tous les composants finalisés (6/6)  
✅ Dashboard enseignant complet  
✅ 4 parcours avec metadata CEREDIS  
✅ Application fonctionnelle complète

---

### SEMAINE 3 : FINALISATION 🎯 (2 jours)

#### Jour 6 - Lundi 27 Janvier 2026
```
🟢 PostgreSQL, Cache & Analytics avancés

Matin (4h)
├─ 08:00-09:00 │ Créer schéma PostgreSQL
├─ 09:00-10:00 │ Implémenter persistence results
├─ 10:00-11:00 │ Implémenter cache Redis
└─ 11:00-12:00 │ Tests persistence

Après-midi (4h)
├─ 13:00-14:00 │ Graphique progression temporelle
├─ 14:00-15:00 │ Comparaison avec classe
├─ 15:00-16:00 │ Recommandations personnalisées
└─ 16:00-18:00 │ Export CSV/PDF

Livrable : Analytics complets + Persistence
```

#### Jour 7 - Mardi 28 Janvier 2026
```
🟢 Tests E2E & Documentation

Matin (4h)
├─ 08:00-09:00 │ Scénario E2E apprenant complet
├─ 09:00-10:00 │ Vérification pipeline E2E
├─ 10:00-11:00 │ Tests de charge
└─ 11:00-12:00 │ Correction bugs identifiés

Après-midi (4h)
├─ 13:00-14:00 │ Documentation utilisateur
├─ 14:00-15:00 │ Documentation enseignant
├─ 15:00-16:00 │ Documentation technique
└─ 16:00-18:00 │ README déploiement + Review finale

Livrable : Application testée et documentée
```

**Checkpoint Semaine 3** :
✅ Tests E2E passent  
✅ Performance validée  
✅ Documentation complète  
✅ Prêt pour production

---

## 📊 GRAPHIQUE GANTT

```
Tâches                      | Sem 1 | Sem 2          | Sem 3     |
                           | Lu Ma | Me Je Ve       | Lu Ma     |
─────────────────────────────────────────────────────────────────
🔴 Moteur CEREDIS          |██     |                |           |
🔴 Dashboard Scores        |  ██   |                |           |
🟡 Composants restants     |       |█               |           |
🟡 Dashboard Enseignant    |       |█               |           |
🟡 Parcours Né en 17       |       | ██             |           |
🟡 Parcours Là-bas         |       | ██             |           |
🟡 Parcours C'est ta chance|       |   ██           |           |
🟡 Parcours Le coureur     |       |   ██           |           |
🟢 PostgreSQL & Cache      |       |                |██         |
🟢 Analytics avancés       |       |                |██         |
🟢 Tests E2E               |       |                |  ██       |
🟢 Documentation           |       |                |  ██       |
─────────────────────────────────────────────────────────────────
```

**Légende** :
- 🔴 CRITIQUE : Bloque tout le reste
- 🟡 HAUTE : Important mais peut attendre 2-3 jours
- 🟢 MOYENNE : Nice to have
- █ = 4h de travail

---

## 🎯 JALONS (MILESTONES)

### Jalon 1 : Fin Semaine 1 (19 Jan)
```
✅ Moteur CEREDIS intégré
✅ API /api/ceredis/calculate fonctionnelle
✅ Dashboard étudiant basique
✅ Pipeline E2E complet

Critère de succès :
- Un apprenant peut voir son score CEREDIS
- Le niveau CECRL est affiché
- Les 5 domaines sont visualisés
```

### Jalon 2 : Fin Semaine 2 (22 Jan)
```
✅ 6/6 composants finalisés
✅ Dashboard enseignant fonctionnel
✅ 4 parcours complets
✅ Application complète fonctionnelle

Critère de succès :
- Un enseignant peut voir les scores de sa classe
- Les 4 parcours sont jouables en entier
- Tous les types d'activités fonctionnent
```

### Jalon 3 : Fin Semaine 3 (28 Jan)
```
✅ Analytics avancés
✅ Tests E2E passent
✅ Documentation complète
✅ Prêt pour production

Critère de succès :
- Export de données fonctionne
- Tests de charge validés (10+ utilisateurs simultanés)
- Documentation accessible
- Aucun bug critique
```

---

## 🚦 INDICATEURS DE PROGRESSION

### Avancement par jour

| Jour | Tâches | Complétude Projet | Delta |
|------|--------|------------------|-------|
| **Début** | - | 52% | - |
| **Jour 1** | Moteur | 60% | +8% |
| **Jour 2** | Dashboard | 67% | +7% |
| **Jour 3** | Composants + Teacher | 73% | +6% |
| **Jour 4** | Parcours 1-2 | 80% | +7% |
| **Jour 5** | Parcours 3-4 | 87% | +7% |
| **Jour 6** | PostgreSQL + Analytics | 92% | +5% |
| **Jour 7** | Tests + Doc | 95% | +3% |

### Complétude par phase

```
Phase A : Moteur CEREDIS       [██████████] 100% (standalone)
Phase B : Mapping compétences  [██████████] 100%
Phase C : Frontend Tracking    [██████████] 100%
Phase D1: Services & Types     [██████████] 100%
Phase D2: Composants           [█████░░░░░]  50% → 100% (Jour 3)
Phase D3: Parcours             [█░░░░░░░░░]   8% → 100% (Jour 5)
Phase D4: Tests E2E            [░░░░░░░░░░]   0% → 100% (Jour 7)
Phase E : Analytics            [░░░░░░░░░░]   0% → 100% (Jour 6)

Intégration Moteur             [░░░░░░░░░░]   0% → 100% (Jour 1)
Dashboard Scores               [░░░░░░░░░░]   0% → 100% (Jour 2)
Dashboard Enseignant           [░░░░░░░░░░]   0% → 100% (Jour 3)
PostgreSQL                     [░░░░░░░░░░]   0% → 100% (Jour 6)
```

---

## ⚡ DÉPENDANCES CRITIQUES

### Diagramme de dépendances

```
Moteur CEREDIS (Jour 1)
    ↓
    ├─→ Dashboard Scores (Jour 2) ────┐
    │                                  │
    └─→ Dashboard Enseignant (Jour 3) ├─→ Analytics (Jour 6)
                                       │
Composants (Jour 3)                   │
    ↓                                  │
Parcours (Jours 4-5) ─────────────────┘
    ↓
Tests E2E (Jour 7)
```

**Points de blocage** :
- ⚠️ Rien ne peut avancer sans le Moteur CEREDIS
- ⚠️ Dashboard dépend du Moteur
- ⚠️ Analytics dépend du Moteur + Dashboard
- ✅ Parcours peut se faire en parallèle des Dashboards
- ✅ Composants indépendants du Moteur

---

## 👥 ALLOCATION RESSOURCES

### Option 1 : 1 développeur (7.5 jours)

```
Dev 1 │ Moteur → Dashboard → Composants → Parcours → Analytics → Tests
      │   J1   →    J2    →     J3     →  J4-J5   →    J6    →  J7
```

**Avantages** :
- Cohérence du code
- Pas de merge conflicts
- Meilleure compréhension globale

**Inconvénients** :
- Plus long (7.5 jours)
- Un seul point de défaillance

### Option 2 : 2 développeurs (4 jours)

```
Dev 1 │ Moteur → Dashboard Scores → Dashboard Enseign. → Analytics → Tests
      │   J1   →       J2        →        J3          →     J4     →  -

Dev 2 │ (attente) → Composants → Parcours Né/Là-bas → Parcours C/Le → Tests
      │            →     J2     →         J3        →      J4        →  -
```

**Avantages** :
- 2x plus rapide
- Parcours et composants en parallèle
- Backup si un dev indisponible

**Inconvénients** :
- Coordination nécessaire
- Risque de merge conflicts
- Dev 2 attend 1 jour

**Note** : Dev 2 peut commencer les 3 composants restants le jour 1 après-midi pendant que Dev 1 finit le moteur.

---

## 📋 CHECKLIST QUOTIDIENNE

### Jour 1 - Lundi 18 Jan
- [ ] Extraire archive ceredis-engine
- [ ] Créer `/services/ceredis-calculator/`
- [ ] Porter 6 modules en TypeScript
- [ ] Créer config.ts et types.ts
- [ ] Créer index.ts
- [ ] Tests unitaires basiques
- [ ] ✅ Livrable : `computeCeredisScore()` fonctionnel

### Jour 2 - Mardi 19 Jan
- [ ] Créer API Route `/api/ceredis/calculate`
- [ ] Tester API avec Postman/curl
- [ ] Créer `/lib/ceredis/client.ts`
- [ ] Créer hook `useCeredisScore()`
- [ ] Créer page `/dashboard/student`
- [ ] Composants ScoreCard, LevelBadge, DomainRadar
- [ ] Intégrer dans navigation
- [ ] ✅ Livrable : Dashboard affiche scores

### Jour 3 - Mercredi 20 Jan
- [ ] TexteATrous.tsx avec metadata CEREDIS
- [ ] OrdreElements.tsx avec metadata CEREDIS
- [ ] JournalReflexif.tsx avec metadata CEREDIS
- [ ] Tests composants
- [ ] Créer page `/dashboard/teacher`
- [ ] Composants StudentList, ClassStats
- [ ] Composants CompetencyHeatmap, ClassProgressChart
- [ ] Tests dashboard enseignant
- [ ] ✅ Livrable : Composants + Dashboard enseignant

### Jour 4 - Jeudi 21 Jan
- [ ] Séance 2 "Né en 17"
- [ ] Séance 3 "Né en 17"
- [ ] Séance 4 "Né en 17"
- [ ] Séance 5 "Né en 17"
- [ ] Séances 1-5 "Là-bas"
- [ ] Tests parcours
- [ ] ✅ Livrable : 2 parcours complets

### Jour 5 - Vendredi 22 Jan
- [ ] Séances 1-5 "C'est ta chance"
- [ ] Séances 1-5 "Le coureur"
- [ ] Tests parcours
- [ ] ✅ Livrable : 4 parcours complets

### Jour 6 - Lundi 27 Jan
- [ ] Schéma PostgreSQL
- [ ] Persistence résultats CEREDIS
- [ ] Cache Redis
- [ ] Graphique progression temporelle
- [ ] Comparaison avec classe
- [ ] Export CSV/PDF
- [ ] ✅ Livrable : Analytics + Persistence

### Jour 7 - Mardi 28 Jan
- [ ] Tests E2E complets
- [ ] Tests de charge
- [ ] Documentation utilisateur
- [ ] Documentation enseignant
- [ ] Documentation technique
- [ ] README déploiement
- [ ] ✅ Livrable : Application prête

---

## 🎉 RÉSUMÉ

**Durée totale** : 7.5 jours  
**Points critiques** : Jours 1-2 (Moteur + Dashboard)  
**Parallélisation possible** : Oui (4 jours avec 2 devs)  
**Risques** : Faibles (plan détaillé, guides fournis)  
**Impact** : +43% de complétude (52% → 95%)

**Prochaine action** : 🚀 DÉMARRER JOUR 1 IMMÉDIATEMENT

---

**Créé le** : 2026-01-18  
**Mis à jour** : 2026-01-18  
**Version** : 1.0
