1. Je voudrais que tu m'aides à réorganiser complètement et profondément l'architecture générale de l'application en fonction de deux principes de base :

i) L'application doit désormais proposer un ensemble complet d'activités d'apprentissage relatives à l'enseignement du français suivant une progression allant du cycle primaire au collège, puis au lycée.

Ces activités sont réparties en deux grands domaines d'apprentissage : 

- Un domaine d'activités d'apprentissage du français à travers des situations réelles de communication orale et écrite. Ce domaine se compose de différents modules d'apprentissage qui seront implémentés progressivement. L'un de ces modules est le module d'apprentissage du français à travers l'étude des chansons françaises. Ce module Chansons, comme tous les autres qui seront implémentés ultérieurement, propose des activités structurées suivant une progression allant du cycle primaire au lycée. Les parcours que nous avons déjà implémentés relèvent donc de ce module Chansons et du Niveau Lycée.

- Un domaine d'activités d'appentissage décontextualisées : grammaire, conjugaison, vocabulaire, orthographe, initiation aux mécanismes élémentaires de la lecture et de l'écriture au CP et CE1 notamment. Ces activités visent à développer chez les élèves le niveau de compétence en matière de maîtrise et de contrôle métalinguistique de la communication.

ii) Les activités relevant de ces deux grands domaines sont proposées suivant une progression structurée en niveaux d'études correspondant à des niveaux de compétence graduels qui sont définis dans notre instance CaSS (https://cass.ceredis.net) à partir d'une version du CECRL repensé et assorti d'une échelle numérique continue associant des scores métriques aux niveaux de compétence.

2. Il s'agit au final d'une architecture de type monorepo.

3. L'interface d'accueil actuelle va devenir l'écran d'accueil du module Chansons pour le Niveau Lycée.

4. Il faut créer une nouvelle interface d'accueil du monorepo. Cette interface doit permettre aux élèves de sélectionner : 
i) Le domaine d'apprentissage parmi les deux principaux domaines
ii) Le niveau parmi 3 options de base :
- Primaire
- Collège
- Lycée ii) 
iii) Le sous-niveau :
Pour le Primaire : CP - CE1 - CE2 - CM1 - CM2
Pour le Collège : 6ème - 5ème - 4ème - 3ème
Pour le Lycée : 2nd - 1re - Terminale 

5. L'interface d'accueil est construite autour d'une navigation dynamique. Elle est initialement composé de deux cartes des domaines d'apprentissage, comparables aux cartes des niveaux de la capture d'écran :
- Domaine d'apprentissage de la communication orale et écrite (parler, écouter, lire, écrire)
- Domaine d'apprentissage de la connaissance de la langue

Les cartes sont cliquables. Quand on clique sur une carte de domaine, de nouvelles cartes ou boutons cliquables apparaissent en dessous suivant la même logique illustrée par les écrans successifs de la capture d'écran que j'ai jointe.

6. La carte du Domaine des apprentissages de la communication ouvre en dessous, quand on clique, sur les cartes des modules disponibles. On prévoit à ce stade les modules suivants : 
- Chansons, 
- Contes et nouvelles, 
- Textes argumentatifs, 
- Textes fonctionnels

7. La carte du Domaine d'apprentissage de la connaissance de la langue, quand on clique, ouvre les cartes des disciplines : 
- Grammaire,  
- Conjugaison, 
- Vocabulaire
- Orthographe
- Initiation à la lecture et à l'écriture (réservé aux classe de CP et CE1)

Et chaque carte disciplinaire ouvre sur les boutons des cycles : 
- Primaire
- Collège
- Lycée

Et chacune des cartes des cycles ouvre sur les boutons des niveaux scolaires : CP, CE1, CE2, etc.

8. Le Domaine de la connaissance de la langue, une fois choisie la discipline (grammaire, conjugaison, vocabulaire, orthographe) et le niveau (CM1, CM2, etc.), conduit à l'écran des leçons qui affiche un menu des leçons disponibles.

9. La page d'une leçon est organisée à l'image des écrans 5 et 6 de la capture d'écran, avec un menu de navigation comprenant les éléments suivant : Accueil - Découverte - Leçon - Quiz - Exercices - Résultats

10. L'interface d'accueil du monorepo doit être semblable à l'interface de l'application dont je t'ai mis une capture d'écran.

Un Hero comportant en arrière-plan une image représentant eds élèves avec deux logos ('ceredis' et 'renouveau pédagogique') en haut (top) à gauche et à droite ainsi qu'un le titre au milieu : Environnement numérique d'apprentissage adaptatif du français.


Le footer comporte cet élément : © 2025 CEREDIS - Renouveau Pédagogique et un arrière-plan gris.

Les images sont dans le dossier /public/images :
- les logos : ceredis.png et renouveau.png
- favicon : icon.png
- background-image du hero : eleves.jpg


