# Plan de tests manuels - Parcours applicatifs

**Projet** : Mon Premier Cahier
**Contexte** : Institutionnel/Academique
**Date** : 2026-02-06
**Version** : 1.0

---

## 1. Objectif
Valider les parcours utilisateurs principaux de l'application lecture, avec des criteres d'acceptation clairs et reproductibles.

## 2. Portee
- Parcours accueil -> niveau -> phoneme -> exercice
- Exercice 8 (dictee) : feedback, scoring, limites, accesibilite
- Verifications UI de non-regression

## 3. Hors portee
- Integrations Supabase (progression, authentification)
- xAPI vers LRS Ralph
- Tableaux de bord Grafana/Superset

## 4. Preconditions
- Application disponible en local (Next.js App Router)
- Donnees phonemes chargees (packages/lecture-curriculum)
- Navigateur a jour (Chrome/Firefox) avec console ouverte

## 5. Environnement de test
- OS : Linux
- Navigateur : Chrome ou Firefox
- Resolution : 1366x768 (desktop) + 390x844 (mobile)

## 6. Donnees de test
- Niveau : GS, CP, CE1
- Phoneme : premier phoneme de la liste
- Exercice : dictation

## 7. Criteres de succes
- 100% des tests critiques (priorite haute) reussis
- Aucun blocage clavier ou visuel sur l'exercice dictee
- Navigation stable sans erreurs console

---

## 8. Cas de test par parcours

### Parcours A - Accueil -> Choix niveau

**A-01 | Ouverture de l'accueil**
- Etapes : Ouvrir l'URL racine de l'app.
- Resultat attendu : Page chargee, liens GS/CP/CE1 visibles.
- Priorite : Haute

**A-02 | Navigation vers GS**
- Etapes : Cliquer sur le bouton GS.
- Resultat attendu : Route niveau GS chargee.
- Priorite : Haute

**A-03 | Navigation vers CP**
- Etapes : Cliquer sur le bouton CP.
- Resultat attendu : Route niveau CP chargee.
- Priorite : Haute

**A-04 | Navigation vers CE1**
- Etapes : Cliquer sur le bouton CE1.
- Resultat attendu : Route niveau CE1 chargee.
- Priorite : Haute

### Parcours B - Niveau -> Grille phonemes

**B-01 | Affichage de la grille**
- Etapes : Depuis GS/CP/CE1, observer la liste des phonemes.
- Resultat attendu : Grille visible, elements cliquables.
- Priorite : Haute

**B-02 | Ouverture d'un phoneme**
- Etapes : Cliquer sur un phoneme.
- Resultat attendu : Page phoneme chargee.
- Priorite : Haute

**B-03 | Retour niveau**
- Etapes : Utiliser le lien/controle retour.
- Resultat attendu : Page niveau chargee.
- Priorite : Moyenne

### Parcours C - Phoneme -> Choix exercice

**C-01 | Affichage des exercices**
- Etapes : Depuis la page phoneme, verifier la liste des exercices.
- Resultat attendu : Exercices visibles, dont dictation.
- Priorite : Haute

**C-02 | Ouverture de dictation**
- Etapes : Cliquer sur l'exercice dictation.
- Resultat attendu : Page exercice 8 chargee.
- Priorite : Haute

### Parcours D - Exercice 8 (dictee)

**D-01 | Phrase cible selon niveau**
- Etapes : Comparer la phrase affichee pour GS/CP/CE1.
- Resultat attendu : Phrase adaptee au niveau.
- Priorite : Haute

**D-02 | Saisie libre**
- Etapes : Taper du texte dans le champ.
- Resultat attendu : Saisie fluide, aucun blocage clavier.
- Priorite : Haute

**D-03 | Auto-resize**
- Etapes : Continuer a taper sur plusieurs lignes.
- Resultat attendu : Le champ s'agrandit jusqu'au max autorise.
- Priorite : Haute

**D-04 | Limite de lignes par niveau**
- Etapes : Depasser les limites GS 3 / CP 6 / CE1 10.
- Resultat attendu : Limite respectee, hauteur plafonnee.
- Priorite : Haute

**D-05 | Indicateur overflow**
- Etapes : Atteindre la limite de lignes.
- Resultat attendu : Ombre/indicateur visible en bas du champ.
- Priorite : Moyenne

**D-06 | Bounce de limite**
- Etapes : Tenter de depasser la limite.
- Resultat attendu : Micro-animation declenchee une seule fois.
- Priorite : Moyenne

**D-07 | Feedback overlay aligne**
- Etapes : Comparer overlay et texte saisi lors du scroll.
- Resultat attendu : Alignement stable, pas de decalage.
- Priorite : Haute

**D-08 | Scoring punctuation/accents**
- Etapes : Tester accents, apostrophes, ponctuation.
- Resultat attendu : Score ajuste, feedback coherent.
- Priorite : Haute

### Parcours E - Non-regression UI

**E-01 | Composants UI generaux**
- Etapes : Ouvrir pages accueil, niveau, phoneme, exercice.
- Resultat attendu : Aucun crash, layout stable.
- Priorite : Haute

**E-02 | Composants specifiques**
- Etapes : Verifier calendar/chart si rendu.
- Resultat attendu : Pas d'erreur console.
- Priorite : Moyenne

**E-03 | Responsive mobile**
- Etapes : Simuler 390x844.
- Resultat attendu : Elements lisibles, navigation fonctionnelle.
- Priorite : Haute

---

## 9. Resultats
A renseigner apres execution (date, environment, taux de reussite, anomalies).
