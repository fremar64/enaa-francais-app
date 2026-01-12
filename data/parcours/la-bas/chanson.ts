/**
 * Données de la chanson "Là-bas" - Jean-Jacques Goldman & Sirima (1987)
 * 
 * Niveau: B2-C1
 * Thème: Quête philosophique, transformation existentielle, aspiration au changement
 * Type de texte: Narratif-argumentatif
 * 
 * Compétences principales:
 * - Conditionnel présent (hypothèse réalisable)
 * - Impératif et injonctions
 * - Vocabulaire spatial et métaphores géographiques
 * - Pensée critique sur l'aliénation sociale
 */

import type { Chanson, LigneChanson } from '@/services/pocketbase';

// Paroles synchronisées avec timestamps (en secondes)
export const parolesSync: LigneChanson[] = [
  // Introduction instrumentale
  { temps: 0, texte: "" },
  
  // Couplet 1
  { temps: 15.2, texte: "Partir, là-bas, partir" },
  { temps: 19.5, texte: "Sentir, ailleurs, mon cœur" },
  { temps: 23.8, texte: "Partir, là-bas, partir" },
  { temps: 28.1, texte: "Sentir, ailleurs, mon cœur" },
  
  // Pont 1
  { temps: 32.5, texte: "Les gens ici n'ont plus de haine" },
  { temps: 36.8, texte: "Ils sont tous pareils" },
  { temps: 39.2, texte: "Ils sont comme endormis" },
  { temps: 41.5, texte: "Ils sont tous pareils" },
  { temps: 43.8, texte: "Ils sont comme endormis" },
  
  // Refrain 1
  { temps: 48.2, texte: "Partir, là-bas, partir" },
  { temps: 52.5, texte: "Sentir, ailleurs, mon cœur" },
  { temps: 56.8, texte: "Partir, là-bas, partir" },
  { temps: 61.1, texte: "Sentir, ailleurs, mon cœur" },
  
  // Couplet 2
  { temps: 65.5, texte: "Les gens ici n'ont plus d'envies" },
  { temps: 69.8, texte: "Ils ont peur de tout" },
  { temps: 72.1, texte: "Ils ne savent plus rire" },
  { temps: 74.5, texte: "Ils ont peur de tout" },
  { temps: 76.8, texte: "Ils ne savent plus rire" },
  
  // Refrain 2
  { temps: 81.2, texte: "Partir, là-bas, partir" },
  { temps: 85.5, texte: "Sentir, ailleurs, mon cœur" },
  { temps: 89.8, texte: "Partir, là-bas, partir" },
  { temps: 94.1, texte: "Sentir, ailleurs, mon cœur" },
  
  // Pont musical
  { temps: 98.5, texte: "" },
  
  // Couplet 3
  { temps: 115.2, texte: "Je veux croire aux rêves d'enfants" },
  { temps: 119.5, texte: "Je veux croire encore" },
  { temps: 121.8, texte: "Je veux croire vraiment" },
  { temps: 124.2, texte: "Je veux croire encore" },
  { temps: 126.5, texte: "Je veux croire vraiment" },
  
  // Refrain final (avec variations)
  { temps: 130.8, texte: "Partir, là-bas, partir" },
  { temps: 135.1, texte: "Sentir, ailleurs, mon cœur" },
  { temps: 139.5, texte: "Partir, là-bas, partir" },
  { temps: 143.8, texte: "Sentir, ailleurs, mon cœur" },
  
  // Outro (répétitions)
  { temps: 148.2, texte: "Là-bas, là-bas" },
  { temps: 152.5, texte: "Ailleurs, ailleurs" },
  { temps: 156.8, texte: "Partir..." },
  
  // Fin
  { temps: 165.0, texte: "" },
];

// Vocabulaire clé avec définitions et exemples
export const vocabulaireCle = [
  {
    mot: "là-bas",
    categorie: "adverbe",
    definition: "Dans un lieu éloigné, ailleurs, dans un ailleurs indéfini",
    exemple: "Je voudrais aller là-bas, loin de cette ville grise",
    niveau: "B1",
    notes: "Adverbe spatial utilisé métaphoriquement pour exprimer l'aspiration au changement"
  },
  {
    mot: "ailleurs",
    categorie: "adverbe",
    definition: "Dans un autre lieu, dans un endroit différent",
    exemple: "Mon cœur est ailleurs, pas dans cette routine quotidienne",
    niveau: "B1",
    notes: "Dimension philosophique : l'ailleurs comme espace de liberté et d'authenticité"
  },
  {
    mot: "sentir",
    categorie: "verbe",
    definition: "Éprouver une sensation, ressentir quelque chose profondément",
    exemple: "Je veux sentir mon cœur battre vraiment",
    niveau: "A2",
    notes: "Verbe de perception interne, opposition au conformisme social"
  },
  {
    mot: "endormi(e)",
    categorie: "adjectif",
    definition: "Au sens figuré : apathique, sans énergie vitale, conformiste",
    exemple: "Les gens sont comme endormis, ils ne réagissent plus",
    niveau: "B2",
    notes: "Métaphore de l'aliénation sociale (Bourdieu)"
  },
  {
    mot: "haine",
    categorie: "nom",
    definition: "Sentiment violent d'aversion, ici utilisé paradoxalement",
    exemple: "Ils n'ont plus de haine = ils n'ont plus de passion, d'intensité",
    niveau: "B2",
    notes: "Paradoxe : l'absence de haine signifie l'absence de vie émotionnelle"
  },
  {
    mot: "envie",
    categorie: "nom",
    definition: "Désir, aspiration, volonté de quelque chose",
    exemple: "Les gens n'ont plus d'envies, ils sont résignés",
    niveau: "A2",
    notes: "Critique du conformisme et de la perte du désir"
  },
];

// Points de grammaire principaux
export const pointsGrammaire = [
  {
    point: "Conditionnel présent",
    explication: "Formation : infinitif + terminaisons de l'imparfait (-ais, -ais, -ait, -ions, -iez, -aient)",
    exemples: [
      "Je partirais demain si je pouvais",
      "Tu sentirais ton cœur battre là-bas",
      "Nous vivrions différemment ailleurs"
    ],
    usage: "Exprimer une hypothèse réalisable, un souhait, une suggestion polie",
    niveau: "B1"
  },
  {
    point: "Impératif",
    explication: "Forme verbale pour donner un ordre, un conseil, ou exprimer un souhait",
    exemples: [
      "Pars là-bas ! (2e personne singulier)",
      "Partons ensemble ! (1re personne pluriel)",
      "Partez maintenant ! (2e personne pluriel)"
    ],
    usage: "Injonction, conseil, encouragement",
    niveau: "A2"
  },
  {
    point: "Infinitif substantivé",
    explication: "L'infinitif utilisé comme nom (sujet ou complément)",
    exemples: [
      "Partir est nécessaire",
      "Sentir ailleurs mon cœur",
      "Rire est devenu impossible"
    ],
    usage: "Généralisation de l'action, dimension philosophique",
    niveau: "B2"
  },
];

// Contexte culturel et philosophique
export const contexteCulturel = `
# Contexte culturel et philosophique

## L'artiste et l'œuvre

**Jean-Jacques Goldman** (né en 1951) est l'un des auteurs-compositeurs-interprètes les plus importants de la chanson française contemporaine. "Là-bas" (1987), enregistrée en duo avec **Sirima**, est une chanson emblématique qui exprime une quête existentielle universelle.

## Thématiques philosophiques

### 1. L'aliénation sociale (Pierre Bourdieu)
La chanson décrit une société où les individus sont "endormis", "sans envies", "sans haine" - une critique de la **reproduction sociale** et du conformisme. Les gens ont perdu leur capacité d'agir et de désirer, aliénés par les structures sociales.

### 2. L'être-vers-la-mort et l'authenticité (Heidegger)
Le désir de partir "là-bas" représente la recherche de l'**authenticité** (Eigentlichkeit) contre l'existence inauthentique du "on" (das Man). Le narrateur refuse la vie quotidienne anonyme et conformiste.

### 3. L'exil comme condition humaine (Sartre)
"Partir, là-bas, partir" évoque la condition existentielle de l'homme : nous sommes **condamnés à être libres**, toujours en projet, jamais vraiment "chez nous". L'ailleurs n'est pas géographique mais existentiel.

### 4. La métaphore spatiale
"Là-bas" et "ailleurs" ne désignent pas de lieux précis mais représentent un **espace de possibilités**, une dimension utopique de l'existence. C'est la négation dialectique du "ici" aliénant.

## Dimension poétique

La répétition obsessionnelle ("partir, là-bas, partir") crée un effet hypnotique qui mime le désir lancinant d'échapper à la condition présente. La structure minimaliste renforce l'universalité du message.

## Réception et impact

Cette chanson a touché des millions de personnes car elle exprime un sentiment universel : le désir d'échapper à une existence qui ne nous convient pas, la quête d'un "ailleurs" plus authentique.
`;

// Données de la chanson pour PocketBase
export const chansonData: Omit<Chanson, 'id' | 'created' | 'updated'> = {
  titre: "Là-bas",
  artiste: "Jean-Jacques Goldman, Sirima",
  album: "Entre gris clair et gris foncé",
  annee: 1987,
  duree: 165, // 2:45 en secondes
  genre: ["pop", "chanson française"],
  niveau: "B2",
  type_texte: "narratif-argumentatif",
  themes: [
    "quête existentielle",
    "aliénation sociale",
    "aspiration au changement",
    "authenticité",
    "liberté"
  ],
  paroles: parolesSync.map(l => l.texte).filter(Boolean).join('\n'),
  paroles_synchronisees: parolesSync,
  audio_url: "/Répertoire des chansons/Jean-Jacques Goldman, Sirima - Là-bas.mp3",
  cover_url: null,
  video_url: null,
  vocabulaire_cle: vocabulaireCle,
  points_grammaire: pointsGrammaire,
  contexte_culturel: contexteCulturel,
  actif: true,
};

export default chansonData;
