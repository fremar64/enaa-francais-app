/**
 * Données de la chanson "C'est ta chance" - Jean-Jacques Goldman (1985)
 * 
 * Niveau: B1-B2
 * Thème: Résilience, émancipation sociale, encouragement
 * Type de texte: Argumentatif-injonctif
 * 
 * Compétences principales:
 * - L'impératif (encouragement et conseil)
 * - Vocabulaire de l'opportunité et de la résilience
 * - Négation et opposition
 * - Expression de l'espoir et de la détermination
 */

import type { Chanson, LigneChanson } from '@/services/pocketbase';

// Paroles synchronisées avec timestamps (en secondes)
export const parolesSync: LigneChanson[] = [
  // Introduction instrumentale
  { temps: 0, texte: "" },
  
  // Couplet 1
  { temps: 12.5, texte: "Ne les écoute pas" },
  { temps: 15.8, texte: "Ceux qui te disent 'tu n'y arriveras pas'" },
  { temps: 21.2, texte: "Ne les regarde pas" },
  { temps: 24.5, texte: "Tous ceux qui doutent de toi" },
  { temps: 29.0, texte: "C'est ta chance" },
  { temps: 32.5, texte: "Prends-la maintenant" },
  
  // Couplet 2
  { temps: 38.0, texte: "Ils vont te dire" },
  { temps: 41.3, texte: "Que c'est trop dur pour toi" },
  { temps: 46.8, texte: "Qu'il vaut mieux rester" },
  { temps: 50.1, texte: "Dans ce que tu connais déjà" },
  { temps: 54.6, texte: "Mais c'est ta chance" },
  { temps: 58.1, texte: "Ne la laisse pas passer" },
  
  // Refrain 1
  { temps: 64.0, texte: "C'est ta chance, c'est maintenant" },
  { temps: 69.5, texte: "Ne regarde pas en arrière" },
  { temps: 74.0, texte: "C'est ta chance, vas-y, fonce" },
  { temps: 79.5, texte: "Tu n'as rien à perdre" },
  
  // Pont musical
  { temps: 85.0, texte: "" },
  
  // Couplet 3
  { temps: 95.5, texte: "Ils ne savent pas" },
  { temps: 98.8, texte: "Ce que tu portes en toi" },
  { temps: 104.2, texte: "Cette force qui brûle" },
  { temps: 107.5, texte: "Et qui ne demande qu'à jaillir" },
  { temps: 112.0, texte: "Alors vas-y" },
  { temps: 115.5, texte: "Montre-leur ce que tu vaux" },
  
  // Refrain 2
  { temps: 121.0, texte: "C'est ta chance, c'est maintenant" },
  { temps: 126.5, texte: "Ne regarde pas en arrière" },
  { temps: 131.0, texte: "C'est ta chance, vas-y, fonce" },
  { temps: 136.5, texte: "Le monde t'appartient" },
  
  // Pont
  { temps: 142.0, texte: "Peu importe d'où tu viens" },
  { temps: 147.5, texte: "Peu importe ton passé" },
  { temps: 152.0, texte: "Ce qui compte, c'est aujourd'hui" },
  { temps: 157.5, texte: "Et tout ce que tu vas devenir" },
  
  // Refrain final
  { temps: 163.0, texte: "C'est ta chance, c'est maintenant" },
  { temps: 168.5, texte: "Ne laisse personne te dire non" },
  { temps: 173.0, texte: "C'est ta chance, elle est là" },
  { temps: 178.5, texte: "Saisis-la, elle est à toi" },
  
  // Outro
  { temps: 184.0, texte: "C'est ta chance..." },
  { temps: 189.5, texte: "C'est maintenant..." },
  
  // Fin
  { temps: 195.0, texte: "" },
];

// Vocabulaire clé avec définitions et exemples
export const vocabulaireCle = [
  {
    mot: "chance",
    categorie: "nom",
    definition: "Opportunité favorable, occasion à saisir",
    exemple: "C'est ta chance de réussir, ne la laisse pas passer",
    niveau: "A2",
    notes: "Ici, 'chance' = opportunité plus que hasard"
  },
  {
    mot: "écouter",
    categorie: "verbe",
    definition: "Prêter attention à ce que quelqu'un dit, tenir compte de",
    exemple: "Ne les écoute pas quand ils te découragent",
    niveau: "A1",
    notes: "Forme négative à l'impératif : 'Ne les écoute pas'"
  },
  {
    mot: "douter (de)",
    categorie: "verbe",
    definition: "Ne pas avoir confiance, ne pas croire en",
    exemple: "Ceux qui doutent de toi n'ont pas vu ton potentiel",
    niveau: "B1",
    notes: "Construction : douter DE quelqu'un/quelque chose"
  },
  {
    mot: "saisir",
    categorie: "verbe",
    definition: "Prendre rapidement, profiter d'une occasion",
    exemple: "Saisis cette opportunité avant qu'elle ne disparaisse",
    niveau: "B1",
    notes: "Métaphore : saisir une chance = la prendre, en profiter"
  },
  {
    mot: "foncer",
    categorie: "verbe",
    definition: "Aller de l'avant avec détermination, ne pas hésiter",
    exemple: "Vas-y, fonce ! N'aie pas peur",
    niveau: "B1",
    notes: "Familier, encourageant. Impératif : 'Fonce !'"
  },
  {
    mot: "résilience",
    categorie: "nom",
    definition: "Capacité à surmonter les difficultés, à rebondir",
    exemple: "Sa résilience lui a permis de réussir malgré les obstacles",
    niveau: "B2",
    notes: "Concept clé : ne pas se laisser abattre par les échecs"
  },
  {
    mot: "émancipation",
    categorie: "nom",
    definition: "Libération, affranchissement d'une contrainte sociale",
    exemple: "L'éducation est un outil d'émancipation sociale",
    niveau: "B2",
    notes: "Thème central : se libérer de son origine sociale"
  },
];

// Points de grammaire principaux
export const pointsGrammaire = [
  {
    point: "L'impératif présent",
    explication: "Forme verbale pour donner un ordre, un conseil, ou encourager. Formation : radical du présent + terminaisons spécifiques (pas de 's' pour les verbes en -er à la 2e personne)",
    exemples: [
      "Écoute-moi ! (écouter → tu)",
      "Prends ta chance ! (prendre → tu)",
      "Vas-y ! (aller → tu, exception avec 's')",
      "Saisissons cette opportunité ! (saisir → nous)",
      "Foncez ! (foncer → vous)"
    ],
    usage: "Encourager, conseiller, donner des instructions",
    niveau: "A2"
  },
  {
    point: "L'impératif négatif",
    explication: "Pour interdire ou déconseiller : NE + impératif + PAS",
    exemples: [
      "Ne les écoute pas",
      "Ne doute pas de toi",
      "N'aie pas peur (avoir → impératif irrégulier)",
      "Ne regarde pas en arrière",
      "Ne laisse pas passer cette chance"
    ],
    usage: "Déconseiller, interdire, protéger de mauvaises influences",
    niveau: "A2"
  },
  {
    point: "Les pronoms compléments avec l'impératif",
    explication: "À l'impératif affirmatif : VERBE-PRONOM. À l'impératif négatif : NE + PRONOM + VERBE + PAS",
    exemples: [
      "Prends-la ! (la chance)",
      "Saisis-la ! (l'opportunité)",
      "Ne la laisse pas passer",
      "Ne les écoute pas (les gens qui doutent)",
      "Montre-leur ce que tu vaux"
    ],
    usage: "Précision et fluidité dans les encouragements",
    niveau: "B1"
  },
];

// Contexte culturel et social
export const contexteCulturel = `
# Contexte culturel et social

## L'artiste et l'œuvre

**Jean-Jacques Goldman** compose "C'est ta chance" en 1985 pour l'album "Non homologué". Cette chanson s'inscrit dans la tradition de la **chanson sociale française** qui encourage l'émancipation individuelle malgré les déterminismes sociaux.

## Thématiques sociales

### 1. Le déterminisme social (Pierre Bourdieu)

La chanson combat l'idée que notre origine détermine notre destin. Les sociologues comme **Pierre Bourdieu** ont montré comment le milieu social "reproduit" les inégalités :
- Les enfants d'ouvriers deviennent souvent ouvriers
- Les enfants de cadres deviennent souvent cadres
- L'école, au lieu de réduire les inégalités, les reproduit

**Dans la chanson** : "Ils vont te dire que c'est trop dur pour toi" = Les voix du déterminisme social qui disent "reste à ta place".

### 2. L'émancipation par la volonté

Goldman propose une **vision optimiste** : malgré les obstacles sociaux, l'individu peut s'émanciper par sa **détermination** et son **courage**.

**Message central** : 
- Ton origine ne définit pas ton futur
- Tu as en toi une force ("cette force qui brûle")
- Il faut oser saisir les opportunités

### 3. La critique des "gardiens du statu quo"

"Ne les écoute pas" → La chanson identifie des **ennemis invisibles** :
- Ceux qui doutent de toi
- Ceux qui te découragent
- Ceux qui veulent que tu restes "à ta place"

Ces voix peuvent être :
- 🏫 L'institution (professeurs défaitistes)
- 👨‍👩‍👧 La famille (prudence excessive)
- 🌍 La société (préjugés de classe)

### 4. Le moment décisif : "C'est maintenant"

**L'urgence** est un thème clé :
- "C'est maintenant" (répété)
- "Prends-la maintenant"
- "Ne la laisse pas passer"

→ L'opportunité est **temporaire**. Il faut agir **maintenant**, pas demain.

## Contexte des années 80

### Crise économique et chômage

Les années 1980 en France : 
- Crise économique post-chocs pétroliers
- Montée du chômage (surtout des jeunes)
- Ascenseur social en panne

**Pourquoi cette chanson ?** Dans ce contexte difficile, Goldman encourage les jeunes à **ne pas renoncer**, à **croire en eux** malgré les difficultés.

### L'individualisme positif

Les années 80 voient aussi l'émergence d'un **individualisme positif** :
- "Chacun peut réussir s'il le veut vraiment"
- Valorisation de l'entrepreneuriat
- Culture du "self-made man"

Goldman s'inscrit dans ce mouvement tout en restant **humaniste** : ce n'est pas un individualisme égoïste, mais un encouragement à l'**émancipation**.

## Réception et impact

Cette chanson a touché particulièrement :
- 🎓 Les **jeunes** de milieux modestes qui aspirent à "s'en sortir"
- 💼 Les personnes en **reconversion** professionnelle
- 🌟 Tous ceux qui doutent d'eux-mêmes

**Message universel** : Peu importe ton passé, tu peux créer ton futur.

## Débat contemporain

### Pour : L'émancipation est possible
- Les exemples de réussite existent
- La volonté individuelle compte
- Encourager = donner de l'espoir

### Contre : Les limites du volontarisme
- Les structures sociales sont puissantes
- Tous n'ont pas les mêmes opportunités
- "Saisir sa chance" présuppose qu'elle existe

**Position nuancée** : La chanson est utile comme **encouragement** mais ne doit pas faire oublier les **inégalités structurelles** qui persistent.
`;

// Données de la chanson pour PocketBase
export const chansonData: Omit<Chanson, 'id' | 'created' | 'updated'> = {
  titre: "C'est ta chance",
  artiste: "Jean-Jacques Goldman",
  album: "Non homologué",
  annee: 1985,
  duree: 195, // 3:15 en secondes
  genre: ["pop", "chanson française", "chanson sociale"],
  niveau: "B1",
  type_texte: "argumentatif-injonctif",
  themes: [
    "encouragement",
    "résilience",
    "émancipation sociale",
    "opportunité",
    "détermination",
    "confiance en soi"
  ],
  paroles: parolesSync.map(l => l.texte).filter(Boolean).join('\n'),
  paroles_synchronisees: parolesSync,
  audio_url: "/Répertoire des chansons/Jean-Jacques Goldman - C'est ta chance.mp3",
  cover_url: null,
  video_url: null,
  vocabulaire_cle: vocabulaireCle,
  points_grammaire: pointsGrammaire,
  contexte_culturel: contexteCulturel,
  actif: true,
};

export default chansonData;
