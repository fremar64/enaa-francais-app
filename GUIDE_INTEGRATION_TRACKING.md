# 🔧 GUIDE D'INTÉGRATION - TRACKING CEREDIS AVEC JWT

## 📊 DIAGNOSTIC DES PROBLÈMES

### Problèmes identifiés

1. ❌ **CaSS** : Tentative d'utiliser une "API KEY" qui n'existe pas
   - CaSS utilise JWT (pas de clé statique)
   - Architecture : Spring Boot + Angular + JWT

2. ❌ **CORS PocketBase** : `Access-Control-Allow-Origin: *` incompatible avec credentials
   - Limitation de sécurité normale
   - PocketBase ne peut pas autoriser `*` avec authentification

3. ❌ **xAPI** : Credentials manquants
   - Besoin de username/password pour LRS Ralph

---

## ✅ SOLUTIONS IMPLÉMENTÉES

### Solution 1 : Client CaSS avec JWT auto-refresh

**Fichier créé** : `lib/cass-client.ts`

**Fonctionnalités** :
- ✅ Authentification automatique
- ✅ Refresh JWT automatique
- ✅ Retry 401
- ✅ Cache du token en mémoire
- ✅ Pas de token exposé dans .env

**Architecture** :
```
Frontend → Next.js API Route → CaSS Client (JWT) → CaSS
```

Le JWT n'est jamais envoyé au client, seulement côté serveur.

### Solution 2 : API Routes Next.js

**Fichier créé** : `app/api/ceredis/track/route.ts`

**Rôle** : Middleware sécurisé entre le frontend et CaSS/xAPI

**Avantages** :
- ✅ Credentials jamais exposés au client
- ✅ Gestion centralisée du tracking
- ✅ Pas de problèmes CORS

### Solution 3 : Configuration .env correcte

**Fichier créé** : `.env.local.example`

**Variables** :
- `CASS_URL`, `CASS_USERNAME`, `CASS_PASSWORD` (serveur seulement)
- `NEXT_PUBLIC_LRS_*` (client + serveur)
- `NEXT_PUBLIC_POCKETBASE_URL` (client + serveur)

---

## 🚀 PROCÉDURE D'INSTALLATION

### ÉTAPE 1 : Installer la dépendance JWT

```bash
cd ~/chansons-francaises-app
npm install jose
```

**Pourquoi jose ?**
- Bibliothèque JWT moderne et sécurisée
- Support natif des Web APIs
- Validation et décodage JWT

---

### ÉTAPE 2 : Configurer les variables d'environnement

#### 2.1 Créer .env.local

```bash
cp .env.local.example .env.local
```

#### 2.2 Remplir les credentials

Éditez `.env.local` avec vos vraies valeurs :

```env
# CaSS (JWT)
CASS_URL=https://cass.ceredis.net
CASS_USERNAME=votre_email@ceredis.net
CASS_PASSWORD=votre_mot_de_passe_cass

# Framework CEREDIS
NEXT_PUBLIC_CASS_FRAMEWORK_ID=votre_framework_id

# xAPI (LRS Ralph)
NEXT_PUBLIC_LRS_ENDPOINT=https://lrs.ceredis.net/xapi
NEXT_PUBLIC_LRS_USERNAME=votre_lrs_username
NEXT_PUBLIC_LRS_PASSWORD=votre_lrs_password

# PocketBase
NEXT_PUBLIC_POCKETBASE_URL=https://pocketbase-songs.ceredis.net

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ SÉCURITÉ** :
- `.env.local` est dans `.gitignore`
- Ne jamais commit les credentials
- Utiliser des variables `NEXT_PUBLIC_*` seulement si nécessaire côté client

---

### ÉTAPE 3 : Modifier le service d'intégration

Le service `integration-unified.ts` doit maintenant appeler l'API Route au lieu d'appeler CaSS directement.

#### 3.1 Créer un client API

Créez `lib/ceredis-api-client.ts` :

```typescript
/**
 * Client pour appeler les API Routes CEREDIS
 */

import type { ActivityCompletionData } from '@/services/integration-unified/integration.unified';

export class CeredisApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/ceredis') {
    this.baseUrl = baseUrl;
  }

  async trackActivity(data: ActivityCompletionData) {
    const res = await fetch(`${this.baseUrl}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Tracking failed: ${res.status}`);
    }

    return res.json();
  }
}

export const ceredisApi = new CeredisApiClient();
```

#### 3.2 Modifier integration.service.ts

Dans `services/integration/integration.service.ts`, remplacez les appels directs à CaSS par des appels à l'API :

```typescript
// AVANT (appel direct)
const assertion = await this.cass.createAssertion({ ... });

// APRÈS (via API Route)
const result = await ceredisApi.trackActivity(data);
```

---

### ÉTAPE 4 : Compiler et tester

```bash
npm run build
```

**Si erreurs** : Vérifier les imports et les types.

```bash
npm run dev
```

**Tester** :
1. Naviguer vers une séance
2. Compléter une activité
3. Vérifier la console navigateur :
   ```
   [Tracking] Success: { xapiStatements: 2, cassAssertions: 1 }
   ```
4. Vérifier la console serveur :
   ```
   [API] Track activity: userId=..., activityId=...
   [CaSS] Assertion created: {...}
   ```

---

## 🔧 SOLUTION AU PROBLÈME CORS POCKETBASE

### Contexte

PocketBase retourne :
```
Access-Control-Allow-Origin: * ne peut pas être utilisé avec credentials
```

### Solution 1 : Appeler PocketBase depuis l'API Route (RECOMMANDÉ)

Au lieu d'appeler PocketBase depuis le client, appelez-le depuis l'API Route :

```typescript
// AVANT (client → PocketBase)
const pb = new PocketBase('https://pocketbase-songs.ceredis.net');
await pb.collection('evidences').create(data);

// APRÈS (client → API Route → PocketBase)
await fetch('/api/ceredis/evidence', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

### Solution 2 : Configurer CORS sur PocketBase

Si vous avez accès au serveur PocketBase, configurez :

```javascript
// Dans les settings PocketBase
CORS_ORIGINS=http://localhost:3000,https://enaa-chansons.ceredis.net
CORS_CREDENTIALS=true
```

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Authentification CaSS

Créez un script de test :

```typescript
// scripts/test-cass.ts
import { getCassClient } from './lib/cass-client';

async function test() {
  const cass = getCassClient();
  const frameworks = await cass.frameworks();
  console.log('Frameworks:', frameworks);
}

test();
```

Exécutez :
```bash
npx ts-node scripts/test-cass.ts
```

**Résultat attendu** : Liste des frameworks CaSS

### Test 2 : Tracking via API Route

Dans le navigateur, testez :

```javascript
const data = {
  userId: 'test-user',
  userName: 'Test User',
  activityId: 'test-activity',
  activityName: 'Test QCM',
  activityType: 'qcm',
  chansonId: 'ne-en-17',
  seanceId: 's1',
  niveau: 'B1',
  score: 8,
  maxScore: 10,
  duration: 120,
};

fetch('/api/ceredis/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(r => r.json()).then(console.log);
```

**Résultat attendu** :
```json
{
  "success": true,
  "xapiStatements": [...],
  "cassAssertions": [...],
  "errors": []
}
```

### Test 3 : JWT Refresh

1. Lancer le serveur dev
2. Attendre 5 minutes (pour que le token expire si skew=60s)
3. Faire une nouvelle requête
4. Vérifier que le refresh automatique fonctionne

**Console serveur attendue** :
```
[CaSS Client] Token expired, refreshing...
[CaSS Client] Login successful
[CaSS Client] Token refreshed
```

---

## 🚦 INTÉGRATION CI/CD, TESTS ET DÉPLOIEMENT AUTOMATIQUE

### Pipeline CI/CD (Github Actions)

- **Fichier** : `.github/workflows/ci.yml`
- **Étapes automatisées** :
  - Lint du code (`npm run lint`)
  - Build (`npm run build`)
  - Tests unitaires et d'intégration (`npm test`)
  - Script de tracking automatisé (`node scripts/test-ceredis-tracking.js`)
  - Alertes Slack en cas d'échec critique (voir `services/monitoring/alert.service.ts`)
  - Déploiement automatique sur Vercel après validation des tests
- **Secrets à configurer dans Github** :
  - `SLACK_WEBHOOK_URL` (alertes)
  - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (déploiement)
  - Autres credentials nécessaires (CaSS, LRS, etc.)

### Procédure de supervision

1. À chaque push/PR, le pipeline CI/CD s'exécute automatiquement.
2. En cas d'échec critique (test, tracking, build), une alerte est envoyée sur Slack.
3. Si tous les tests passent, le déploiement est déclenché sur Vercel.
4. Le rapport de test de tracking est généré dans `scripts/test-ceredis-tracking-report.json`.

### Pour aller plus loin
- Ajouter des tests E2E (Playwright) dans le pipeline.
- Ajouter un badge de statut CI dans le README.md.
- Consulter le DEVLOG.md pour l'historique des automatisations.

---

## 📊 ARCHITECTURE FINALE

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  (React Components + useActivityTracking)                │
└────────────────────┬────────────────────────────────────┘
                     │ fetch('/api/ceredis/track')
                     ↓
┌─────────────────────────────────────────────────────────┐
│                 NEXT.JS API ROUTE                        │
│         (app/api/ceredis/track/route.ts)                │
│                                                          │
│  • Validation des données                                │
│  • Orchestration des services                            │
│  • Gestion des erreurs                                   │
└──────┬─────────────────────────────┬────────────────────┘
       │                             │
       │ getCassClient()             │ xAPI client
       ↓                             ↓
┌──────────────────┐        ┌──────────────────┐
│   CaSS CLIENT    │        │   xAPI SERVICE   │
│  (JWT managed)   │        │  (Basic Auth)    │
└────────┬─────────┘        └────────┬─────────┘
         │                           │
         │ HTTPS + Bearer            │ HTTPS + Basic
         ↓                           ↓
┌──────────────────┐        ┌──────────────────┐
│  CaSS Server     │        │  LRS Ralph       │
│  (cass.ceredis)  │        │  (lrs.ceredis)   │
└──────────────────┘        └──────────────────┘
```

**Avantages** :
1. ✅ Credentials jamais exposés au client
2. ✅ Pas de problèmes CORS
3. ✅ JWT géré automatiquement
4. ✅ Point d'entrée unique pour tracking
5. ✅ Facile à monitorer et déboguer

---

## 🔐 SÉCURITÉ

### Variables d'environnement

| Variable | Exposition | Usage |
|----------|-----------|-------|
| `CASS_USERNAME` | ⚠️ Serveur SEULEMENT | Authentification CaSS |
| `CASS_PASSWORD` | ⚠️ Serveur SEULEMENT | Authentification CaSS |
| `NEXT_PUBLIC_*` | ⚠️ Client + Serveur | Variables publiques |

### Principes

1. **Never trust the client**
   - Toutes les validations côté serveur
   - Pas de logique métier critique côté client

2. **Credentials en mémoire uniquement**
   - JWT stocké dans l'instance du client
   - Pas de localStorage
   - Pas de cookies (sauf session utilisateur)

3. **HTTPS obligatoire en production**
   - Tout le trafic chiffré
   - Pas de credentials en clair

---

## 🐛 DÉBOGAGE

### Problème : "CaSS login failed"

**Cause** : Mauvais credentials ou URL CaSS incorrecte

**Solution** :
1. Vérifier `CASS_URL` dans .env.local
2. Vérifier `CASS_USERNAME` et `CASS_PASSWORD`
3. Tester manuellement :
   ```bash
   curl -X POST https://cass.ceredis.net/api/login \
     -H "Content-Type: application/json" \
     -d '{"username":"...","password":"..."}'
   ```

### Problème : "Cannot find module 'jose'"

**Cause** : Dépendance non installée

**Solution** :
```bash
npm install jose
```

### Problème : "CaSS désactivé (clé API manquante)"

**Cause** : Variables d'environnement non chargées

**Solution** :
1. Vérifier que `.env.local` existe
2. Redémarrer le serveur dev
3. Vérifier les noms des variables (CASS_URL, CASS_USERNAME, CASS_PASSWORD)

### Problème : "CORS error" avec PocketBase

**Cause** : Appel direct depuis le client

**Solution** : Passer par une API Route Next.js

---

## 📚 RESSOURCES

### Documentation

- **CaSS** : Architecture Spring Boot + JWT
- **Next.js API Routes** : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **jose** : https://github.com/panva/jose

### Support

Si problèmes persistants :
1. Vérifier les logs serveur (`npm run dev`)
2. Vérifier les logs navigateur (DevTools Console)
3. Tester l'authentification CaSS manuellement
4. Vérifier que tous les services (CaSS, LRS, PocketBase) sont accessibles

---

## ✅ CHECKLIST FINALE

Avant de considérer l'intégration terminée :

- [ ] Dépendance `jose` installée
- [ ] `.env.local` configuré avec vraies valeurs
- [ ] Client CaSS créé (`lib/cass-client.ts`)
- [ ] API Route créée (`app/api/ceredis/track/route.ts`)
- [ ] Service d'intégration modifié pour utiliser l'API
- [ ] Compilation réussie (`npm run build`)
- [ ] Tests manuels OK
- [ ] JWT refresh automatique fonctionne
- [ ] Pas d'erreurs CORS
- [ ] Tracking visible dans les logs
- [ ] Git commit fait

---

## 🎯 PROCHAINES ÉTAPES

Une fois cette intégration terminée :

1. **Implémenter xAPI** dans l'API Route
2. **Ajouter le dashboard enseignant** avec données réelles
3. **Configurer les webhooks** PocketBase → CaSS
4. **Monitoring** : Ajouter logs structurés
5. **Tests E2E** : Tester tout le flux de tracking

---

**BON COURAGE !** 🚀

Cette architecture est **industrielle**, **sécurisée** et **évolutive**. Elle respecte les bonnes pratiques et sera facilement maintenable.
