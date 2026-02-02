# Guide de déploiement Vercel — Chansons Françaises

## ⚠️ Problème actuel

**Erreur de build** : 
```
@supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```

**Cause** : Les variables d'environnement ne sont pas configurées sur Vercel.

---

## ✅ Solution : Configurer les variables d'environnement

### 1. Accéder aux paramètres Vercel

1. Aller sur https://vercel.com/fremar64/chansons-francaises-app
2. Cliquer sur **Settings** (⚙️)
3. Aller dans **Environment Variables** (dans le menu de gauche)

### 2. Méthode RAPIDE : Import automatique (RECOMMANDÉ)

**Option A : Upload du fichier .env.local**
1. Cliquer sur **"Import .env"** (bouton en haut)
2. Sélectionner ton fichier `.env.local` depuis ton ordinateur
3. Vercel parse automatiquement toutes les 12 variables ✅
4. Ajuster les environnements (voir section suivante)
5. Cliquer sur **"Import"**

**Option B : Copier-coller le contenu**
1. Ouvrir `.env.local` sur ton ordinateur
2. Copier TOUT le contenu (Ctrl+A, Ctrl+C)
3. Sur Vercel, coller dans le champ "or paste .env contents in Key input"
4. Vercel parse automatiquement toutes les variables ✅
5. Ajuster les environnements
6. Cliquer sur **"Import"**

⚠️ **APRÈS l'import, ajuster les environnements** :

| Type de variable | Environnements |
|------------------|----------------|
| Variables **sensibles** (Service Role Keys, Passwords) | ✅ Production uniquement |
| Variables **publiques** (NEXT_PUBLIC_*, URLs publiques) | ✅ Production + Preview + Development |

**Variables sensibles (Production UNIQUEMENT)** :
- `SUPABASE_SERVICE_ROLE_KEY`
- `CASS_USERNAME`, `CASS_PASSWORD`
- `XAPI_LRS_USERNAME`, `XAPI_LRS_PASSWORD`

**Variables publiques (TOUS les environnements)** :
- Toutes les `NEXT_PUBLIC_*`
- `CASS_URL`, `NEXTAUTH_SECRET`

---

### 3. Méthode MANUELLE : Ajouter une par une (si import échoue)

Si l'import automatique ne fonctionne pas, voici la liste complète des 12 variables :

#### Variables Supabase (OBLIGATOIRES)

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://enaa-supabase.ceredis.net` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2ODQxNzQ0MCwiZXhwIjo0OTI0MDkxMDQwLCJyb2xlIjoiYW5vbiJ9.VOHQxObgXJqphcq78kuOTOrrydVzOgioO4Imvg-6bN4` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2ODQxNzQ0MCwiZXhwIjo0OTI0MDkxMDQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.bgtN9VWamxjqmbjkcxo3phReUQAprldrx5gbFzcU9mA` | Production uniquement |

⚠️ **Important** : 
- L'URL et l'Anon Key sont **publiques** et DOIVENT être exposées au navigateur (c'est sécurisé grâce aux RLS policies)
- La `SUPABASE_SERVICE_ROLE_KEY` doit rester **Production uniquement** (accès admin)

#### Variables CaSS (pour le système de compétences)

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `CASS_URL` | `https://cass.ceredis.net` | Production, Preview, Development |
| `CASS_USERNAME` | `ceredis` | Production uniquement |
| `CASS_PASSWORD` | `G(Ato?6kCE&@iRAL` | Production uniquement |
| `NEXT_PUBLIC_CASS_FRAMEWORK_ID` | `dd5b3a81-c455-471d-9df5-d2f6313ad96e` | Production, Preview, Development |

#### Variables xAPI (Learning Record Store)

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `XAPI_LRS_URL` | `https://lrs.ceredis.net/xAPI` | Production uniquement |
| `XAPI_LRS_USERNAME` | `admin` | Production uniquement |
| `XAPI_LRS_PASSWORD` | `GdSmchz92bNy915cUXmUvxFKa55BpV` | Production uniquement |

#### NextAuth Secret

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `NEXTAUTH_SECRET` | `G0ouHFLUmi04EwEYhXzc2UkA7lWOiCDJHw7Tcih+2io=` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://enaa-chansons.ceredis.net` | Production uniquement |
| `NEXTAUTH_URL` | `https://[preview-url]` | Preview uniquement |

**Total : 12 variables** (mais l'import automatique est plus rapide !)

---

## 📋 Checklist de déploiement

### Étape 1 : Configurer les variables
- [x] Variables Supabase (3 variables)
- [x] Variables CaSS (4 variables)
- [x] Variables xAPI (3 variables)
- [x] NextAuth (2 variables)

### Étape 2 : Redéployer
1. Dans Vercel, aller dans **Deployments**
2. Cliquer sur le dernier déploiement échoué
3. Cliquer sur **Redeploy** (bouton en haut à droite)
4. Cocher "Use existing Build Cache" si disponible
5. Cliquer sur **Redeploy**

### Étape 3 : Vérifier
- [x] Le build passe sans erreur
- [x] L'URL https://enaa-chansons.ceredis.net est accessible
- [x] La connexion avec admin@ceredis.net fonctionne
- [x] Le dashboard s'affiche correctement

✅ **Toutes les étapes sont complétées avec succès !**

---

## 🔍 Diagnostic des erreurs

### Erreur : "Failed to authenticate" (400)

**Symptôme** : L'authentification fonctionne en local mais pas en production.

**Causes possibles** :
1. ❌ Variables d'environnement manquantes → Solution ci-dessus
2. ❌ URL Supabase incorrecte → Vérifier `NEXT_PUBLIC_SUPABASE_URL`
3. ❌ CORS non configuré sur Supabase → Vérifier dans Supabase Dashboard

**Vérification CORS sur Supabase (Coolify)** :
```bash
# Se connecter au conteneur Supabase Kong (API Gateway)
docker exec -it <kong-container> sh

# Vérifier la config Kong (CORS)
curl http://localhost:8000/_status
```

Si CORS est le problème, ajouter dans la config Kong :
```yaml
cors:
  origins:
    - https://enaa-chansons.ceredis.net
    - http://localhost:3000
```

### Erreur : Build échoue sur Vercel

**Symptôme** : `@supabase/ssr: Your project's URL and API key are required`

**Solution** : Configurer les variables d'environnement (voir section 2 ci-dessus)

### Erreur : "Invalid token" ou 401

**Cause** : La clé `NEXT_PUBLIC_SUPABASE_ANON_KEY` est incorrecte ou expirée.

**Solution** : Régénérer la clé dans Supabase Dashboard ou vérifier qu'elle correspond à celle dans `.env.local`.

---

## 🎯 Commandes utiles

### Tester en local avec les variables de production
```bash
# Créer un fichier .env.production.local
cp .env.local .env.production.local

# Build en mode production
npm run build

# Démarrer en mode production
npm start
```

### Vérifier les variables d'environnement sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Lister les variables
vercel env ls

# Ajouter une variable
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

---

## 📞 Support

Si le problème persiste après configuration :

1. **Vérifier les logs Vercel** : https://vercel.com/fremar64/chansons-francaises-app/deployments
2. **Vérifier les logs Supabase** : Dashboard Coolify → Supabase → Logs
3. **Tester l'API Supabase** :
   ```bash
   curl https://enaa-supabase.ceredis.net/rest/v1/ \
     -H "apikey: eyJ0eXAiOiJKV1Qi..."
   ```

---

## ✅ Status

- [x] Guide créé
- [x] Variables configurées sur Vercel (12 variables)
- [x] Redéploiement réussi
- [x] Authentification fonctionnelle en production
- [x] **Application en production** : https://enaa-chansons.ceredis.net

**Date** : 2 février 2026  
**Dernière mise à jour** : Déploiement production réussi  
**Status** : ✅ **DÉPLOYÉ ET OPÉRATIONNEL**
