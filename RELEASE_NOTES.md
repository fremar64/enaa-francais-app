# Release v0.2.0 — Fix PocketBase auth & Dashboard features

Date: 2026-01-26

Résumé
-------
Cette release corrige le flux d'authentification (PocketBase), remplace la
protection de routes côté serveur par une protection client-side, ajoute des
scripts d'administration PocketBase, et enrichit le dashboard avec plusieurs
composants et hooks analytiques.

Changements clés
-----------------
- Auth
  - `contexts/AuthContext.tsx` : meilleure initialisation, vérification du
    token, et récupération du profil complet après `register` / `login` /
    `authRefresh`.
  - `lib/pocketbase.ts` : `register`, `login` et `authRefresh` renvoient
    désormais le profil complet pour garantir la présence des champs custom
    (`role`, `isValidated`, etc.).
  - `proxy.ts` : la vérification NextAuth a été désactivée (incompatible avec
    PocketBase). La protection des routes est désormais déléguée au client.

- Protection des routes
  - `components/auth/ProtectedRoute.tsx` : protection côté client en deux
    étapes (attente du montage client puis vérification `pb.authStore`).

- PocketBase ops
  - Scripts ajoutés dans `scripts/`:
    - `pb-update-users-schema.ts` : mettre à jour le schéma `users` (ajout
      `username`, `isValidated`, accepter `admin` dans `role`).
    - `pb-fix-admin-user.ts` : corriger l'utilisateur admin existant.
    - `pb-test-login.ts` : tester la connexion programmatique.

- Dashboard & UI
  - Nouveaux composants : `RadarCompetences`, `HistoriqueActivites`,
    `ProgressionGlobale`, `ScoreCard`, `DomainRadar`.
  - Hook `hooks/useDashboard.ts` : collecte des progressions et calculs des
    statistiques (scores CEREDIS, tendances, niveau CECRL estimé).

- CI / Tests
  - Workflow CI ajouté: `.github/workflows/ci.yml` (lint, build, tests).
  - Tests unitaires & e2e ajoutés pour les composants et le moteur CEREDIS.

Instructions de déploiement & migration
-------------------------------------
1. Vérifier les variables d'environnement (dans `.env.local` ou secrets):
   - `NEXT_PUBLIC_POCKETBASE_URL`
   - `PB_ADMIN_EMAIL`, `PB_ADMIN_PASSWORD`
   - `CASS_URL`, `CASS_USERNAME`, `CASS_PASSWORD`
   - `XAPI_LRS_URL`, `XAPI_LRS_USERNAME`, `XAPI_LRS_PASSWORD`

2. (Optionnel mais recommandé) Appliquer les scripts PocketBase depuis une
   machine ayant accès réseau à l'instance PocketBase :

```bash
cd /path/to/chansons-francaises-app
npx tsx scripts/pb-update-users-schema.ts
npx tsx scripts/pb-fix-admin-user.ts
```

3. Redémarrer l'application / déployer via CI.

Tests manuels rapides
---------------------
- Ouvrir `/login` et se connecter avec l'admin : `admin@ceredis.net` + mot de
  passe défini.
- Vérifier `pb.authStore.isValid` dans la console du navigateur et la
  redirection vers `/dashboard`.
- Tester l'inscription depuis `/register` (élève / enseignant).

Notes de sécurité
-----------------
- Ne jamais committer `.env.local` en production. Les secrets CaSS/xAPI
  ne doivent pas être exposés au client.
- Restreindre les accès à l'API PocketBase (firewall / Cloudflare / réseau
  privé) si nécessaire.

Fichiers saillants
------------------
- `contexts/AuthContext.tsx`
- `lib/pocketbase.ts`
- `proxy.ts`
- `components/auth/ProtectedRoute.tsx`
- `app/login/page.tsx`, `app/register/page.tsx`
- `scripts/pb-update-users-schema.ts`, `scripts/pb-fix-admin-user.ts`
- `CHANGELOG_SUMMARY.md`, `RESOLUTION_AUTHENTIFICATION.md`,
  `SOLUTION_AUTHENTIFICATION.md`

Contact & suivi
---------------
Pour toute anomalie liée à l'authentification ou PocketBase, contacter
`devops@ceredis.net` et vérifier les logs Coolify / PocketBase.

-- équipe dev
