Voici une evaluation concise du niveau d’avancement, puis un plan d’action pragmatique pour continuer.

1. Niveau d’avancement (synthese rapide)

- Architecture monorepo: structure workspaces OK et packages cles presents (curriculum, types, ui, lecture-curriculum).
- Curriculum data-driven: jeu de donnees + helpers de navigation en place dans curriculum.ts et navigation.ts.
- UI progressive (home): navigation Domaine -> Module -> Cycle -> Niveau -> Activites implantee dans page.tsx.
- Module Lecture (phonemes): parcours GS/CP/CE1 + contenu phonemes disponible via phonemes.ts et routes dans apps/lecture/app/levels/[level]/page.tsx.
- Gaps majeurs: scoring-engine, cass-client, activities engine et analytics restent a construire; la navigation de l’app Lecture est encore partiellement hardcodee et ne respecte pas totalement le flux progressif (voir page.tsx).

2. Observations cles (ecarts a corriger)

- Navigation non uniforme: l’app principale suit le curriculum, mais l’app Lecture a des routes directes GS/CP/CE1 et des mappings manuels de niveaux; cela casse la regle “data-driven partout”.
- Routing partiellement specifique: getActivityRoute contient des cas particuliers (ex: chansons/lycee), ce qui risque d’introduire du hardcoding au lieu de data-driven pur.
- Packages coeur manquants: scoring-engine et cass-client existent dans la doc mais pas dans le code productif.
- Couche activites: pas de “Activity Runner” generique, ni de standard d’integration pour les modules (chansons, grammaire, etc.).

3. Plan d’action propose (4 phases)

3.1. Phase 1 — Alignement architectural (court terme, 1–2 semaines)

- Unifier la navigation “progressive” pour toutes les apps (y compris Lecture) sur le curriculum unique.
- Deplacer les mappings “GS/CP/CE1” dans un package data (ex: lecture-curriculum), pas dans l’UI.
- Remplacer les routes hardcodees par des routes derivees du curriculum (refactor getActivityRoute).
- Verifier que toute logique pedagogique reste hors UI.
Livrables: navigation 100% data-driven, suppression du hardcoding, flux uniforme.

3.2. Phase 2 — Couche Activites generique (2–4 semaines)

- Creer un “Activity Runner” dans packages (API claire: input data + hooks resultats).
- Standardiser les metadonnees d’activites (niveau, track, prerequis, type, scoring).
- Creer 1 parcours pilote complet (ex: Chansons Lycee) avec UX finale.
Livrables: moteur d’activites minimal mais extensible + 1 module pilote.

3.3. Phase 3 — Scoring + CaSS (4–6 semaines)

- Implementer packages/scoring-engine (calculs D, Dd, Ds, De, Dm).
- Implementer packages/cass-client (assertions, URI, sync).
- Brancher l’activite pilote aux assertions CaSS.
Livrables: premiere boucle evaluation -> score -> assertion.

3.4. Phase 4 — Qualite & Analytics (continu)

- Tests unitaires curriculum/navigation.
- Tests E2E pour parcours complet.
- Start instrumentation analytics (PocketBase logs puis LRS si besoin).
Livrables: tests de base + observabilite.

Si tu veux, je peux maintenant:

i) proposer un refactor précis de l’app Lecture pour la rendre data-driven
ii) definir le schema d’Activity Runner et le poser dans packages
iii) proposer un plan de package scoring-engine + cass-client avec API types

Dis-moi le point de depart prefere (1, 2, ou 3).

..................................................................................

4. REFACTOR PRECIS DE L'APP LECTURE POUR LA RENDRE data-driven

Voici un refactor precis et actionnable pour rendre l’app Lecture 100% data-driven, sans logique pedagogique en dur, et alignee au curriculum.

Objectif

Unifier la navigation et l’acces aux activites Lecture sur le curriculum, sans routes directes ni mappings locaux.

1) Deplacer la logique Lecture dans les packages (pas dans l’UI)

- Creer un “track config” Lecture dans lecture-curriculum pour decrire:
* trackId: initiation-lecture-ecriture
* cycles autorises
* correspondances niveau -> progression phonemes

- Supprimer les mappings locaux (ex: phonemeLevelMap) dans l’UI, et fournir une API data-driven dans le package.

Changements cibles

- apps/lecture/app/levels/[level]/page.tsx
- apps/lecture/app/levels/[level]/phonemes/[phonemeId]/page.tsx

2) Introduire un “navigator” commun pour Lecture

Ajouter des helpers dans le package Lecture, par ex:

- getLectureTrack()
- getLectureCycles()
- getLectureLevels()
- getLectureLevelById()
- getPhonemesForLevel(levelId)

Où

- index.ts
- nouveau fichier possible: packages/lecture-curriculum/navigation.ts

3) Remplacer les routes directes GS/CP/CE1 par le flux progressif

Dans l’app Lecture, la page d’accueil doit reprendre la meme machine a etats:
Domaine -> Track -> Cycle -> Niveau -> Activites

Actions

- Remplacer le contenu de page.tsx par la navigation progressive basee sur les helpers curriculum.
- Supprimer les boutons d’acces directs (GS/CP/CE1).

4) Normaliser la resolution des activites

L’URL d’une activite Lecture doit provenir d’un helper data-driven (pas de logique ad hoc).

- Centraliser dans un helper unique (ex: getActivityRoute) et etendre pour Lecture.

Fichier source

- navigation.ts:1

5) Standardiser la structure des activites Lecture

Pour chaque niveau:

- Une liste d’activites generee depuis les donnees (phonemes).
- Un “Activity Runner” generique reutilisable plus tard.

Cibles

- exercises
- nouveau package potentiel: packages/activity-engine

6) Etapes concretes (ordre recommande)

- Etape A: ajouter navigation.ts et sortir les mappings.
- Etape B: refactor page.tsx en navigation progressive.
- Etape C: refactor apps/lecture/app/levels/[level]/page.tsx pour qu’il consomme les helpers du package.
- Etape D: refactor apps/lecture/app/levels/[level]/phonemes/[phonemeId]/page.tsx.
- Etape E: nettoyer les routes “legacy” et supprimer la logique en dur.

Si tu veux, je peux:

1. proposer le contenu exact des helpers data-driven lecture
2. fournir le refactor code par code des 3 pages principales
3. proposer le schema d’activites Lecture (Activity Runner) avant integration CaSS

Donne-moi le numero de l’option que tu veux.