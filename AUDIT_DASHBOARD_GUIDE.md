# 🔍 AUDIT IMMÉDIAT - Dashboard Enseignant

**Date** : 19 janvier 2026  
**Durée estimée** : 3-4 heures  
**Objectif** : Vérifier l'état complet du dashboard enseignant Next.js

---

## 📋 CHECKLIST D'AUDIT

### 1. Composants Teacher (components/teacher/)

**À vérifier** :
```bash
cd ~/chansons-francaises-app
ls -la components/teacher/
```

**Composants attendus** :
- [ ] `SyntheseEleve.tsx` - Synthèse individuelle élève
- [ ] `CompetencesCritiques.tsx` - Liste compétences critiques
- [ ] `AnalysePreuves.tsx` - Détail des preuves
- [ ] `VueClasse.tsx` - Liste élèves de la classe
- [ ] `ExportData.tsx` - Export CSV/JSON
- [ ] `index.ts` - Barrel export

**Si absents** : Copier depuis React/Vite et adapter

---

### 2. Hook useTeacherDashboard

**À vérifier** :
```bash
cat hooks/useTeacherDashboard.ts | head -100
```

**Fonctionnalités attendues** :
- [ ] Connexion PocketBase
- [ ] Récupération élèves
- [ ] Récupération preuves (evidences)
- [ ] Calcul statistiques
- [ ] État loading/error
- [ ] Fonction refresh
- [ ] Fonction export

**Si absent ou incomplet** : Adapter depuis React/Vite

---

### 3. Types TypeScript

**À vérifier** :
```bash
cat types/teacher-dashboard.ts 2>/dev/null || echo "Fichier manquant"
```

**Types attendus** :
```typescript
export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  classeId: string;
  scoreCeredis?: number;       // ⚠️ Nécessite moteur
  niveauCecrl?: string;        // ⚠️ Nécessite moteur
  profilDomaines?: DomaineScore[];
}

export interface CompetenceCritique {
  id: string;
  nom: string;
  domaine: string;
  score: number;
  seuil: number;
  estVerrou: boolean;
  preuves: PreuveDetail[];
}

export interface PreuveDetail {
  id: string;
  type: 'P1' | 'P2' | 'P3' | 'P4';
  activityId: string;
  activityName: string;
  score: number;
  maxScore: number;
  timestamp: string;
}
```

---

### 4. Services PocketBase

**À vérifier** :
```bash
cat services/pocketbase/teacher.service.ts 2>/dev/null || echo "Fichier manquant"
```

**Requêtes nécessaires** :
- [ ] `getClasse(classeId)` - Infos classe
- [ ] `getEleves(classeId)` - Liste élèves
- [ ] `getEvidences(userId)` - Preuves élève
- [ ] `getScores(userId)` - Scores (⚠️ nécessite moteur)

---

### 5. Composants Dashboard (components/dashboard/)

**À vérifier** :
```bash
ls -la components/dashboard/
```

**Composants attendus** :
- [ ] `RadarCompetences.tsx` - Graphique radar
- [ ] Autres composants visualisation

---

## 🔧 COMMANDES D'AUDIT RAPIDE

### Script d'audit automatique

```bash
#!/bin/bash
# audit-dashboard.sh

echo "==================================="
echo "AUDIT DASHBOARD ENSEIGNANT"
echo "==================================="

echo ""
echo "1. Composants Teacher:"
ls -la components/teacher/ 2>/dev/null || echo "❌ Dossier manquant"

echo ""
echo "2. Hook useTeacherDashboard:"
[ -f "hooks/useTeacherDashboard.ts" ] && echo "✅ Présent" || echo "❌ Manquant"

echo ""
echo "3. Types dashboard:"
[ -f "types/teacher-dashboard.ts" ] && echo "✅ Présent" || echo "❌ Manquant"

echo ""
echo "4. Service PocketBase teacher:"
[ -f "services/pocketbase/teacher.service.ts" ] && echo "✅ Présent" || echo "❌ Manquant"

echo ""
echo "5. Composants dashboard:"
ls -la components/dashboard/ 2>/dev/null || echo "❌ Dossier manquant"

echo ""
echo "==================================="
echo "RÉSULTAT"
echo "==================================="
```

**Exécution** :
```bash
cd ~/chansons-francaises-app
chmod +x audit-dashboard.sh
./audit-dashboard.sh
```

---

## 📊 RÉSULTATS ATTENDUS

### Scénario A : Tout présent ✅
**Action** : Passer directement à la Priorité 1 (Moteur CEREDIS)

### Scénario B : Partiellement présent ⚠️
**Action** : Compléter composants manquants (1-2 jours)

### Scénario C : Majoritairement absent ❌
**Action** : Migration complète depuis React/Vite (3-5 jours)

---

## 🚀 APRÈS L'AUDIT

### Si composants manquants

**Commandes de migration** :
```bash
# Copier composants depuis React/Vite
cp -r ../chansons-fran-aises-learner/src/components/teacher \
      ./components/

# Copier hook
cp ../chansons-fran-aises-learner/src/hooks/useTeacherDashboard.ts \
   ./hooks/

# Copier types
cp ../chansons-fran-aises-learner/src/types/teacher-dashboard.ts \
   ./types/
```

**Puis adapter** :
1. Imports (chemins @ Next.js)
2. Hooks React Router → useRouter Next.js
3. API calls (adaptation pour API Routes si nécessaire)

---

## 🎯 DÉCISION IMMÉDIATE

**Question** : Voulez-vous que je lance l'audit maintenant ?

**Si OUI** :
1. Je vérifie tous les fichiers
2. Je génère un rapport détaillé
3. Je propose un plan d'action précis

**Si NON** :
- Vous pouvez exécuter le script d'audit vous-même
- Me communiquer les résultats
- Je proposerai alors la suite

---

**Attendant vos instructions.** 🚀
