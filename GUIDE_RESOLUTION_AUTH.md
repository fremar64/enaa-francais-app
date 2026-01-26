# 🔧 GUIDE DE RÉSOLUTION - Problèmes d'authentification

**Date**: 2026-01-23  
**Problèmes identifiés**: Impossible de créer un compte ou de se connecter

---

## 🔍 PROBLÈMES IDENTIFIÉS

### 1. **Schéma PocketBase incomplet**
- Le champ `role` n'acceptait que `["student", "teacher"]`
- Le code essaie de créer des utilisateurs avec `role: "admin"`
- Champs manquants: `username`, `isValidated`, `preferences`

### 2. **Erreur de syntaxe dans register/page.tsx**
- Code JSX mal placé (ligne 152)
- **✅ CORRIGÉ**

### 3. **Validation trop stricte dans AuthContext**
- Empêche les admins de se connecter sans `isValidated`
- **✅ CORRIGÉ**

---

## ✅ SOLUTIONS APPLIQUÉES

### Fichiers corrigés automatiquement:

1. **`app/register/page.tsx`** ✅
   - Erreur JSX corrigée
   - Code `rawError` déplacé au bon endroit

2. **`contexts/AuthContext.tsx`** ✅
   - Admins peuvent se connecter sans validation
   - Seuls les students/teachers nécessitent validation

3. **`scripts/pb-update-users-schema.ts`** ✅ CRÉÉ
   - Nouveau script pour mettre à jour le schéma PocketBase
   - Ajoute tous les champs nécessaires

4. **`scripts/pb-fix-admin-user.ts`** ✅ CRÉÉ
   - Script pour corriger l'utilisateur admin existant
   - Ajoute les champs manquants

---

## 🚀 ÉTAPES À SUIVRE

### **Étape 1 : Mettre à jour le schéma PocketBase**

Exécutez le script pour mettre à jour le schéma:

```bash
cd /home/ceredis/chansons-francaises-app
npx tsx scripts/pb-update-users-schema.ts
```

**Ce que fait le script:**
- ✅ Ajoute le champ `username` (text, required, unique)
- ✅ Met à jour le champ `role` pour accepter `["student", "teacher", "admin"]`
- ✅ Ajoute le champ `isValidated` (bool, optional)
- ✅ Ajoute le champ `niveau_actuel` (select A1-C2)
- ✅ Ajoute le champ `langue_maternelle` (text)
- ✅ Ajoute le champ `preferences` (json)
- ✅ Conserve les champs existants (`name`, `avatar`)

### **Étape 2 : Corriger l'utilisateur admin existant**

Exécutez le script pour corriger l'admin existant:

```bash
npx tsx scripts/pb-fix-admin-user.ts
```

**Ce que fait le script:**
- ✅ Trouve l'utilisateur `admin@ceredis.net`
- ✅ Ajoute `username: "admin_ceredis"`
- ✅ Définit `role: "admin"`
- ✅ Définit `isValidated: true`
- ✅ Ajoute `preferences` par défaut

### **Étape 3 : Redémarrer l'application Next.js**

```bash
# Si l'app est en cours d'exécution, arrêtez-la (Ctrl+C)
npm run dev
```

### **Étape 4 : Tester la connexion**

1. **Ouvrir** http://localhost:3000/login
2. **Se connecter avec:**
   - Email: `admin@ceredis.net`
   - Mot de passe: (celui que vous avez créé)

3. **✅ Vous devriez pouvoir vous connecter !**

### **Étape 5 : Créer de nouveaux comptes**

Maintenant vous pouvez:

#### **Créer un compte élève:**
1. Aller sur http://localhost:3000/register
2. Choisir rôle: **Élève**
3. Remplir le formulaire
4. **✅ Devrait fonctionner !**

#### **Créer un compte enseignant:**
1. Aller sur http://localhost:3000/register
2. Choisir rôle: **Enseignant**
3. Remplir le formulaire
4. **✅ Devrait fonctionner !**

#### **Créer un autre admin (optionnel):**
Le système empêche la création d'un second admin par l'interface. Si vous avez besoin d'un second admin, vous devez:
- Modifier la fonction `register` dans `lib/pocketbase.ts` pour enlever cette limitation
- Ou créer l'admin directement dans l'interface PocketBase

---

## 🔍 VÉRIFICATIONS

### Vérifier que le schéma a été mis à jour:

```bash
npx tsx scripts/pb-show-users-schema.ts
```

**Vous devriez voir:**
```json
{
  "schema": [
    { "name": "username", "type": "text", "required": true, "unique": true },
    { "name": "name", "type": "text", "required": true },
    { "name": "avatar", "type": "file", "required": false },
    { "name": "role", "type": "select", "options": { "values": ["student", "teacher", "admin"] } },
    { "name": "isValidated", "type": "bool", "required": false },
    { "name": "niveau_actuel", "type": "select", "options": { "values": ["A1", "A2", "B1", "B2", "C1", "C2"] } },
    { "name": "langue_maternelle", "type": "text", "required": false },
    { "name": "preferences", "type": "json", "required": false }
  ]
}
```

### Vérifier l'utilisateur admin dans PocketBase:

1. Aller sur https://pocketbase-songs.ceredis.net/
2. Se connecter avec les credentials admin
3. Aller dans Collections → users
4. Vérifier que l'utilisateur admin a:
   - ✅ `username: admin_ceredis`
   - ✅ `role: admin`
   - ✅ `isValidated: true`

---

## ⚠️ NOTES IMPORTANTES

### Validation des comptes

- **Admins** : Peuvent se connecter immédiatement (pas de validation requise)
- **Enseignants** : Doivent être validés par un admin avant de pouvoir se connecter
- **Élèves** : Doivent être validés par un admin avant de pouvoir se connecter

Pour valider un utilisateur:
1. Se connecter en tant qu'admin
2. Aller dans l'interface PocketBase
3. Modifier l'utilisateur et cocher `isValidated: true`

### Protection admin

Le code empêche la création d'un second compte admin via l'interface de registration. C'est une sécurité pour éviter que n'importe qui puisse créer un admin.

Si vous avez besoin de plusieurs admins, vous pouvez:
1. Les créer directement dans PocketBase
2. Modifier la fonction `register()` dans `lib/pocketbase.ts` pour autoriser plusieurs admins

---

## 🐛 DÉPANNAGE

### Si la connexion échoue toujours:

1. **Vérifier les logs du navigateur** (F12 → Console)
2. **Vérifier que le schéma a bien été mis à jour:**
   ```bash
   npx tsx scripts/pb-show-users-schema.ts
   ```

3. **Vérifier l'utilisateur dans PocketBase:**
   - Aller sur https://pocketbase-songs.ceredis.net/
   - Vérifier que tous les champs sont présents

4. **Réinitialiser l'application:**
   ```bash
   # Supprimer le cache Next.js
   rm -rf .next
   
   # Redémarrer
   npm run dev
   ```

### Si l'inscription échoue toujours:

1. **Vérifier dans la console les erreurs détaillées**
2. **L'affichage `rawError` devrait maintenant montrer les détails de l'erreur**
3. **Contacter le support avec les logs d'erreur complets**

---

## 📝 RÉSUMÉ DES MODIFICATIONS

### Fichiers modifiés:
1. ✅ `app/register/page.tsx` - Corrigé erreur syntaxe JSX
2. ✅ `contexts/AuthContext.tsx` - Admins peuvent se connecter sans validation

### Fichiers créés:
1. ✅ `scripts/pb-update-users-schema.ts` - Met à jour le schéma PocketBase
2. ✅ `scripts/pb-fix-admin-user.ts` - Corrige l'admin existant
3. ✅ `GUIDE_RESOLUTION_AUTH.md` - Ce guide

---

## ✅ APRÈS LA RÉSOLUTION

Une fois que tout fonctionne:

1. **Tester la création de comptes:**
   - Élève ✅
   - Enseignant ✅
   - Admin (bloqué intentionnellement) ✅

2. **Tester la connexion:**
   - Admin ✅
   - Élève (après validation) ✅
   - Enseignant (après validation) ✅

3. **Valider le workflow complet:**
   - Inscription → Validation → Connexion → Dashboard

---

**Date de création**: 2026-01-23  
**Version**: 1.0  
**Statut**: Prêt pour déploiement ✅
