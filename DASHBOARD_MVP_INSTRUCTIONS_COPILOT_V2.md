# 🎯 DASHBOARD CEREDIS MVP - Instructions Copilot (MISE À JOUR)

**Date** : 2 février 2026, 8h30 (Brazzaville)  
**Objectif** : Dashboard MVP fonctionnel avec navigation corrigée  
**Option choisie** : A (MVP simple)  
**Durée estimée** : 2-3 heures  
**Priorité** : ⚠️ NAVIGATION URGENTE

---

## 🚨 PRIORITÉ ABSOLUE : CORRIGER LA NAVIGATION

### Problème critique identifié

**ACTUELLEMENT** : Une fois connecté, l'utilisateur est "piégé" sur `/dashboard`
- ❌ Pas de lien vers l'accueil
- ❌ Pas de lien vers les parcours
- ❌ Seulement un bouton "Déconnexion"
- ❌ Navigation impossible sans se déconnecter

**IMPACT** : Application inutilisable en l'état ⚠️

---

## 📋 PLAN D'ACTION SIMPLIFIÉ

### PHASE 1 : Navigation (URGENT - 30min)

**TÂCHE 0** : Créer une navigation globale
- Créer `components/layout/Navbar.tsx`
- Ajouter au dashboard et à toutes les pages authentifiées
- Liens : Accueil → Parcours → Dashboard → Profil → Déconnexion

### PHASE 2 : Dashboard de base (1h30)

**TÂCHES 1-7** : Exactement comme dans le document original
- Mais **simplifié** : pas de vue multi-rôles aujourd'hui
- Dashboard unique pour tous les utilisateurs
- Focus sur l'essentiel : score, domaines, compétences

### PHASE 3 : Tests (30min)

- Navigation fonctionne
- Dashboard affiche les données
- Pas d'erreurs console

---

## 🔧 TÂCHE 0 : CRÉER LA NAVIGATION (NOUVEAU - URGENT)

### Fichier : `components/layout/Navbar.tsx`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Créer un composant de navigation global pour l'application.
 * 
 * STRUCTURE :
 * 
 * 1. IMPORTS :
 * ```typescript
 * 'use client';
 * import Link from 'next/link';
 * import { usePathname } from 'next/navigation';
 * import { useAuth } from '@/contexts/AuthContext';
 * import { Button } from '@/components/ui/button';
 * import { Home, BookOpen, LayoutDashboard, User, LogOut } from 'lucide-react';
 * ```
 * 
 * 2. STRUCTURE DE LA NAVBAR :
 * ```tsx
 * <nav className="bg-white border-b">
 *   <div className="container mx-auto px-4">
 *     <div className="flex items-center justify-between h-16">
 *       
 *       {/* Logo + Titre */}
 *       <Link href="/" className="flex items-center gap-2">
 *         <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
 *         <span className="font-bold text-xl">ENAA Chansons</span>
 *       </Link>
 *       
 *       {/* Navigation Links */}
 *       <div className="flex items-center gap-2">
 *         <NavLink href="/" icon={<Home />} label="Accueil" />
 *         <NavLink href="/parcours" icon={<BookOpen />} label="Parcours" />
 *         <NavLink href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
 *         <NavLink href="/profile" icon={<User />} label="Profil" />
 *         
 *         {/* Bouton Déconnexion */}
 *         <Button variant="outline" onClick={handleLogout}>
 *           <LogOut className="h-4 w-4 mr-2" />
 *           Déconnexion
 *         </Button>
 *       </div>
 *       
 *     </div>
 *   </div>
 * </nav>
 * ```
 * 
 * 3. COMPOSANT NavLink (sous-composant interne) :
 * ```tsx
 * function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
 *   const pathname = usePathname();
 *   const isActive = pathname === href;
 *   
 *   return (
 *     <Link
 *       href={href}
 *       className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
 *         isActive 
 *           ? 'bg-purple-100 text-purple-700 font-medium' 
 *           : 'text-gray-600 hover:bg-gray-100'
 *       }`}
 *     >
 *       <span className="h-5 w-5">{icon}</span>
 *       <span className="hidden md:inline">{label}</span>
 *     </Link>
 *   );
 * }
 * ```
 * 
 * 4. LOGIQUE DE DÉCONNEXION :
 * ```tsx
 * const { logout } = useAuth();
 * 
 * const handleLogout = () => {
 *   logout();
 *   window.location.href = '/login';
 * };
 * ```
 * 
 * 5. RESPONSIVE :
 * - Sur mobile : masquer les labels, garder seulement les icônes
 * - Sur desktop : afficher icônes + labels
 * 
 * RÉSULTAT ATTENDU :
 * - Navigation horizontale en haut de page
 * - Lien actif mis en évidence (fond purple)
 * - Fonctionne sur mobile et desktop
 * - Déconnexion fonctionnelle
 */
```

---

### Fichier : `components/layout/AuthenticatedLayout.tsx`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Créer un layout pour les pages authentifiées qui inclut la Navbar.
 * 
 * STRUCTURE :
 * ```tsx
 * import { Navbar } from './Navbar';
 * 
 * interface AuthenticatedLayoutProps {
 *   children: React.ReactNode;
 * }
 * 
 * export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
 *   return (
 *     <div className="min-h-screen bg-gray-50">
 *       <Navbar />
 *       <main className="container mx-auto px-4 py-8">
 *         {children}
 *       </main>
 *     </div>
 *   );
 * }
 * ```
 * 
 * USAGE :
 * Ce composant sera utilisé dans app/dashboard/page.tsx et autres pages authentifiées.
 */
```

---

### Mise à jour : `app/dashboard/page.tsx`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Modifier la page dashboard pour utiliser le nouveau layout avec navigation.
 * 
 * MODIFICATIONS :
 * 
 * 1. REMPLACER le header actuel par :
 * ```tsx
 * import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
 * 
 * export default function DashboardPage() {
 *   return (
 *     <ProtectedRoute>
 *       <AuthenticatedLayout>
 *         <DashboardContent />
 *       </AuthenticatedLayout>
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 * 
 * 2. DANS DashboardContent, SUPPRIMER :
 * - Le header existant avec logo + titre + bouton déconnexion
 * - Car maintenant géré par Navbar
 * 
 * 3. GARDER :
 * - Tout le contenu du dashboard (cartes, graphiques, etc.)
 * - Structure des sections
 * 
 * RÉSULTAT :
 * - Dashboard avec navigation globale en haut
 * - Plus de duplication du bouton déconnexion
 * - Navigation vers accueil/parcours possible
 */
```

---

## 📝 TÂCHES 1-7 : DASHBOARD DE BASE (SIMPLIFIÉES)

### Changements par rapport au document original

**CE QUI RESTE IDENTIQUE** :
- TÂCHE 1 : API Route `/api/ceredis/calculate` ✅
- TÂCHE 2 : Client `lib/ceredis/client.ts` ✅
- TÂCHE 3 : Hook `useDashboard.ts` ✅
- TÂCHE 5 : Types `lib/ceredis/types.ts` ✅
- TÂCHE 7 : Index `components/dashboard/index.ts` ✅

**CE QUI EST SIMPLIFIÉ** :
- TÂCHE 4 : Dashboard page.tsx
  - **Pas de différenciation par rôle** (tous voient la même chose)
  - **Vue unique** : élève/enseignant/admin voient le même dashboard
  - **Reporté** : vues spécialisées enseignant/chercheur → Mercredi 4 février

**CE QUI EST SUPPRIMÉ** :
- TÂCHE 6 : Nettoyage `RadarCompetences.tsx`
  - **Reporté** : on garde les deux composants pour l'instant
  - **Raison** : pas critique, optimisation future

---

### TÂCHE 4 SIMPLIFIÉE : Refactoriser la page Dashboard

**Fichier** : `app/dashboard/page.tsx`

```typescript
/**
 * INSTRUCTIONS POUR COPILOT :
 * 
 * Refactoriser le dashboard pour utiliser les meilleurs composants.
 * Version MVP : une seule vue pour tous les utilisateurs.
 * 
 * STRUCTURE CIBLE :
 * 
 * <AuthenticatedLayout>
 *   <div className="space-y-8">
 *     
 *     {/* SECTION 1 : Vue d'ensemble */}
 *     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 *       
 *       {/* Carte Score CEREDIS - SEULEMENT si score disponible */}
 *       {stats.scoreCeredis !== null && (
 *         <CeredisScoreCard 
 *           score={{
 *             userId: user.id,
 *             ceredisScore: stats.scoreCeredis,
 *             cecrlLevel: stats.niveauCecrl || 'A2',
 *             domainScores: stats.domainesScores,
 *             competencyScores: stats.competencyScores || {},
 *             validation: { 
 *               valid: true, 
 *               level: stats.niveauCecrl || 'A2', 
 *               errors: [], 
 *               warnings: [] 
 *             },
 *             computedAt: new Date().toISOString(),
 *             engineVersion: '1.0'
 *           }}
 *         />
 *       )}
 *       
 *       {/* Carte Profil - existante, garder */}
 *       <Card>
 *         <CardHeader>
 *           <CardTitle>Profil</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           {/* Code existant */}
 *         </CardContent>
 *       </Card>
 *       
 *       {/* Carte Parcours - existante, garder */}
 *       <Card>
 *         <CardHeader>
 *           <CardTitle>Parcours</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           {/* Code existant */}
 *         </CardContent>
 *       </Card>
 *       
 *     </div>
 *     
 *     {/* SECTION 2 : Progression globale */}
 *     <ProgressionGlobale {...stats} />
 *     
 *     {/* SECTION 3 : Analyses détaillées */}
 *     <div className="grid gap-6 lg:grid-cols-2">
 *       <DomainRadarChart domainScores={stats.domainesScores} />
 *       <HistoriqueActivites activites={stats.dernieresActivites} />
 *     </div>
 *     
 *     {/* SECTION 4 : Détail compétences - SEULEMENT si données disponibles */}
 *     {stats.competencyScores && Object.keys(stats.competencyScores).length > 0 && (
 *       <CompetencyGrid competencyScores={stats.competencyScores} />
 *     )}
 *     
 *     {/* SECTION 5 : Admin debug - SEULEMENT pour admin */}
 *     {user?.role === 'admin' && (
 *       <Card>
 *         <CardHeader>
 *           <CardTitle>Informations système</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           {/* Code existant */}
 *         </CardContent>
 *       </Card>
 *     )}
 *     
 *   </div>
 * </AuthenticatedLayout>
 * 
 * IMPORTS NÉCESSAIRES :
 * - AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
 * - CeredisScoreCard from '@/components/dashboard/CeredisScoreCard'
 * - DomainRadarChart from '@/components/dashboard/DomainRadarChart'
 * - CompetencyGrid from '@/components/dashboard/CompetencyGrid'
 * - ProgressionGlobale from '@/components/dashboard/ProgressionGlobale'
 * - HistoriqueActivites from '@/components/dashboard/HistoriqueActivites'
 * 
 * NOTES IMPORTANTES :
 * - Affichage conditionnel : ne pas afficher CeredisScoreCard si score = null
 * - Affichage conditionnel : ne pas afficher CompetencyGrid si pas de données
 * - Pour l'instant, TOUS les utilisateurs voient la même vue
 * - Différenciation par rôle sera ajoutée Mercredi 4 février
 */
```

---

## ⏱️ PLANNING RÉVISÉ

| Tâche | Durée | Horaire (Brazzaville) |
|-------|-------|----------------------|
| **TÂCHE 0** Navigation | 30min | 8h30 - 9h00 |
| Test navigation | 10min | 9h00 - 9h10 |
| **TÂCHE 5** Types | 15min | 9h10 - 9h25 |
| **TÂCHE 1** API Route | 45min | 9h25 - 10h10 |
| Test API | 10min | 10h10 - 10h20 |
| **PAUSE** | 10min | 10h20 - 10h30 |
| **TÂCHE 2** Client | 15min | 10h30 - 10h45 |
| **TÂCHE 3** Hook | 30min | 10h45 - 11h15 |
| **TÂCHE 4** Dashboard | 30min | 11h15 - 11h45 |
| **TÂCHE 7** Index | 5min | 11h45 - 11h50 |
| **Tests finaux** | 20min | 11h50 - 12h10 |
| **TOTAL** | **3h40** | **8h30 - 12h10** |

---

## ✅ CHECKLIST DE VALIDATION MVP

### Navigation ⚠️ CRITIQUE
- [ ] Navbar créée et fonctionnelle
- [ ] Lien vers Accueil fonctionne
- [ ] Lien vers Parcours fonctionne
- [ ] Lien vers Dashboard fonctionne
- [ ] Lien vers Profil fonctionne
- [ ] Bouton Déconnexion fonctionne
- [ ] Lien actif mis en évidence
- [ ] Responsive (mobile + desktop)

### Dashboard de base
- [ ] CeredisScoreCard s'affiche (si score existe)
- [ ] DomainRadarChart remplace RadarCompetences
- [ ] CompetencyGrid s'affiche (si données existent)
- [ ] ProgressionGlobale fonctionne
- [ ] HistoriqueActivites fonctionne
- [ ] Pas d'erreurs console

### API et données
- [ ] API `/api/ceredis/calculate` répond
- [ ] Scores calculés correctement
- [ ] Hook useDashboard charge les données
- [ ] Gestion d'erreurs fonctionne

### Tests production
- [ ] Build réussit : `npm run build`
- [ ] Application démarre : `npm run dev`
- [ ] Navigation complète fonctionne
- [ ] Dashboard affiche toutes les sections

---

## 🚫 CE QUI EST REPORTÉ (Mercredi 4 février)

### Vues différenciées par rôle
- [ ] Dashboard élève (simplifié, motivant)
- [ ] Dashboard enseignant (pédagogique, détaillé)
- [ ] Dashboard chercheur (analytique, statistiques)
- [ ] Dashboard admin (gestion système)

### Analytics avancés
- [ ] Vue cohorte
- [ ] Analyse pré/post
- [ ] Impact Domaine 5
- [ ] Analyse par type de preuve

### Optimisations
- [ ] Suppression RadarCompetences
- [ ] Cache avancé
- [ ] Pagination historique
- [ ] Export PDF

---

## 💡 PHILOSOPHIE MVP

**Aujourd'hui** :
> "Une application simple qui fonctionne complètement"

**Mercredi** :
> "Des vues spécialisées pour chaque type d'utilisateur"

**Principe** :
> Mieux vaut 80% des fonctionnalités qui marchent à 100%
> que 100% des fonctionnalités qui marchent à 80%

---

## 🎯 RÉSULTAT ATTENDU EN FIN DE JOURNÉE

### Application navigable ✅
```
Accueil → Parcours → Dashboard → Profil → Déconnexion
   ↑                                          ↓
   ←←←←←←←← Navigation fluide →→→→→→→→→→→→→→→→
```

### Dashboard complet ✅
```
┌────────────────────────────────────────┐
│ Navbar (Accueil | Parcours | ...)     │
├────────────────────────────────────────┤
│ CeredisScoreCard | Profil | Parcours  │
├────────────────────────────────────────┤
│ Progression Globale                    │
├────────────────────────────────────────┤
│ DomainRadar | Historique              │
├────────────────────────────────────────┤
│ CompetencyGrid (19 compétences)        │
└────────────────────────────────────────┘
```

### Données réelles ✅
- Score CEREDIS calculé via API
- Domaines précis (D1-D5)
- Compétences détaillées (19)
- Historique activités

---

## 📝 NOTES POUR COPILOT

### Simplifications par rapport au plan original

**API Route** :
- Calcul simplifié inline (pas besoin du moteur complet Phase A)
- Validation basique des règles B2/C1
- Moteur complet sera intégré Mardi

**Dashboard** :
- Vue unique pour tous les utilisateurs
- Pas de logique de différenciation par rôle
- Affichage conditionnel des sections selon données disponibles

**Types** :
- Juste ce qui est nécessaire pour aujourd'hui
- Complétion progressive

---

## 🎉 COMMIT FINAL

Après tous les tests validés :

```bash
git add .
git commit -m "feat: Dashboard MVP avec navigation globale

- Navbar créée avec liens Accueil/Parcours/Dashboard/Profil
- CeredisScoreCard intégrée (score + niveau CECRL)
- DomainRadarChart pour les 5 domaines
- CompetencyGrid pour les 19 compétences
- API /api/ceredis/calculate fonctionnelle
- Hook useDashboard amélioré
- Layout AuthenticatedLayout créé
- Navigation fluide dans toute l'application
- Tests validés en local et production

Dashboard MVP complet et fonctionnel ✅
Application navigable ✅
Prêt pour intégration moteur CEREDIS (Mardi)"

git push
```

---

**Document créé** : 2 février 2026, 8h30 (Brazzaville)  
**Version** : MVP (Option A)  
**Priorité** : Navigation d'abord, puis Dashboard  
**Timeline** : 3h40 (fin prévue 12h10)  
**Prochaine étape** : Mardi - Moteur CEREDIS Phase A
