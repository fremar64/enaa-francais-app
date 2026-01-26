# 🔐 RÉSOLUTION PROBLÈME D'AUTHENTIFICATION - Next.js + PocketBase

**Date**: 26 janvier 2026  
**Durée de débogage**: ~6 heures  
**Statut**: ✅ RÉSOLU

---

## 🎯 RÉSUMÉ EXÉCUTIF

### Problème initial
L'utilisateur admin ne pouvait pas accéder au dashboard après connexion réussie. La page `/dashboard` redirigeait systématiquement vers `/login` en boucle infinie, malgré une authentification PocketBase valide.

### Cause racine
**Le fichier `proxy.ts`** contenait une vérification d'authentification basée sur NextAuth (`getToken()`) qui bloquait l'accès au dashboard. Ce proxy s'exécutait **côté serveur** AVANT que React ne puisse monter les composants, empêchant ainsi le `ProtectedRoute` de faire son travail côté client.

### Solution
1. Désactivation du proxy NextAuth dans `proxy.ts`
2. Délégation de la protection des routes au composant `ProtectedRoute` côté client
3. Correction du `ProtectedRoute` pour gérer correctement le SSR/CSR de Next.js

---

## 🔍 ANALYSE DÉTAILLÉE

### Timeline du problème

#### Phase 1: Problèmes de schéma PocketBase
**Symptômes**: Erreurs "Failed to create record" lors de l'inscription

**Causes identifiées**:
- Champs manquants dans le schéma : `username`, `isValidated`
- Valeurs `role` incorrectes (tentative de créer "admin" alors que seuls ["student", "teacher"] étaient acceptés)
- Utilisateur admin existant sans `username`

**Solutions appliquées**:
```bash
# Script 1: pb-add-missing-fields.ts
- Ajout du champ username (text, required, unique)
- Ajout du champ isValidated (bool, optional)
- Mise à jour des valeurs role (admin, teacher, student)

# Script 2: pb-fix-admin-user.ts
- Configuration admin user (yr1x9y7vxnfhn61)
- username: "admin_ceredis"
- isValidated: true
- role: "admin"
```

#### Phase 2: Page login non fonctionnelle
**Symptômes**: Bouton de connexion apparemment non fonctionnel

**Cause**: Le fichier `app/login/page.tsx` contenait du code placeholder qui n'appelait jamais les vraies fonctions d'authentification

**Solution**:
```typescript
// Avant (placeholder)
const handleSubmit = async (e) => {
  // Placeholder code
};

// Après (intégration réelle)
const handleSubmit = async (e) => {
  await login(email, password); // Hook useAuth()
  window.location.href = '/dashboard';
};
```

#### Phase 3: Boucle de redirection infinie
**Symptômes**: 
- Authentification réussie (`pb.authStore.isValid: true`)
- Mais redirection immédiate vers `/login`
- Logs `[AuthProvider]` présents
- Logs `[ProtectedRoute]` **ABSENTS** ← indicateur clé

**Fausses pistes explorées**:
1. ❌ Problème de timing React Context
2. ❌ Problème SSR/hydration Next.js
3. ❌ Token PocketBase expiré
4. ❌ Problème avec `router.push()`

**Véritable cause**: 
Le fichier `proxy.ts` contenait cette logique :

```typescript
// proxy.ts (VERSION PROBLÉMATIQUE)
const protectedStudentRoutes = ['/dashboard'];

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (protectedStudentRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== 'student') {  // ← Admin a role='admin' !
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}
```

**Pourquoi c'était invisible**:
1. Le proxy s'exécute **côté serveur** dans le pipeline Next.js
2. Il redirige **AVANT** que React ne monte les composants
3. Donc `ProtectedRoute` ne s'exécute jamais
4. Donc aucun log `[ProtectedRoute]` n'apparaît
5. Le dashboard affichait toujours le loader puis redirigeait

**Solution finale**:
```typescript
// proxy.ts (VERSION CORRIGÉE)
export async function proxy(request: NextRequest) {
  // Protection désactivée au niveau du proxy
  // La protection est gérée par ProtectedRoute côté client
  return NextResponse.next();
}
```

---

## ✅ SOLUTIONS IMPLÉMENTÉES

### 1. Correction du schéma PocketBase

**Fichiers créés**:
- `scripts/pb-add-missing-fields.ts`
- `scripts/pb-fix-admin-user.ts`
- `scripts/pb-test-login.ts`

**Résultat**:
```json
{
  "username": "admin_ceredis",
  "email": "admin@ceredis.net",
  "role": "admin",
  "isValidated": true
}
```

### 2. Intégration login fonctionnel

**Fichier**: `app/login/page.tsx`

**Changements clés**:
- Import du hook `useAuth()`
- Appel de `login(email, password)`
- Redirection via `window.location.href` (force full reload)
- Gestion d'erreurs avec affichage

### 3. ProtectedRoute optimisé pour Next.js

**Fichier**: `components/auth/ProtectedRoute.tsx`

**Approche 2 étapes**:
```typescript
export function ProtectedRoute({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ÉTAPE 1: Attendre le montage côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ÉTAPE 2: Vérifier auth uniquement côté client
  useEffect(() => {
    if (!isClient) return;
    
    if (!pb.authStore.isValid) {
      router.push(`/login?redirect=${pathname}`);
    } else {
      setIsAuthorized(true);
    }
  }, [isClient]);

  // Pendant SSR ou avant autorisation : afficher loader
  if (!isClient || !isAuthorized) {
    return <Loader />;
  }

  return <>{children}</>;
}
```

**Pourquoi cette approche fonctionne**:
1. **SSR (Server-Side Rendering)**: Affiche un loader (pas d'accès à `localStorage`)
2. **Hydration**: React monte le composant côté client, `isClient` devient `true`
3. **Vérification auth**: `pb.authStore` lit le token depuis `localStorage`
4. **Décision**: Redirection ou affichage du contenu

---

## 🎓 LEÇONS APPRISES

### 1. Importance de l'architecture d'authentification

**Problème**: Mélange de deux systèmes d'authentification (NextAuth dans proxy.ts, PocketBase dans l'app)

**Leçon**: Toujours vérifier la cohérence entre :
- Les middlewares/proxies
- Les composants de protection de routes
- Le système d'authentification backend

### 2. Debugging méthodique

**Approche gagnante**:
1. ✅ Vérifier les logs dans l'ordre chronologique
2. ✅ Identifier les logs **manquants** (aussi important que les logs présents)
3. ✅ Tester chaque couche séparément (backend, middleware, frontend)
4. ✅ Créer des versions simplifiées pour isoler le problème

### 3. Next.js SSR/CSR

**Leçon critique**: Dans Next.js 13+ avec App Router :
- Le code s'exécute **d'abord côté serveur**
- `localStorage` n'est pas disponible côté serveur
- Les middlewares s'exécutent **AVANT** React
- Toujours utiliser `'use client'` pour les composants qui accèdent à `localStorage`

---

## 🚀 RECOMMANDATIONS POUR L'AVENIR

### Checklist pour futurs problèmes d'auth

- [ ] Vérifier les middlewares Next.js (`middleware.ts`, `proxy.ts`)
- [ ] Vérifier la cohérence du système d'auth (NextAuth vs PocketBase vs autre)
- [ ] Tester le backend isolément (cURL, Postman)
- [ ] Vérifier les logs dans l'ordre : Backend → Middleware → Frontend
- [ ] Identifier les composants qui **ne** se montent **pas** (logs manquants)
- [ ] Vérifier SSR vs CSR (`'use client'`, `useState`, `useEffect`)
- [ ] Tester avec version simplifiée (retirer ProtectedRoute temporairement)

---

## 📁 FICHIERS MODIFIÉS

### Scripts créés
- `scripts/pb-add-missing-fields.ts`
- `scripts/pb-fix-admin-user.ts`
- `scripts/pb-test-login.ts`

### Fichiers modifiés
- `app/login/page.tsx`
- `components/auth/ProtectedRoute.tsx`
- `contexts/AuthContext.tsx`
- `proxy.ts`
- `app/dashboard/page.tsx`

---

**Document créé le**: 26 janvier 2026  
**Version**: 1.0  
**Statut**: ✅ Problème résolu
