export interface LigneChanson {
  id: string;
  numero: number;
  texte: string;
  timestamp: number;
}

export interface Chanson {
  id: string;
  titre: string;
  artiste: string;
  album?: string;
  annee: number;
  genre: string[];
  pochette: string;
  audioUrl?: string; // URL du fichier audio
  niveauCECRL: 'A2' | 'B1' | 'B2' | 'C1';
  typeTexte: 'narratif' | 'descriptif' | 'argumentatif' | 'poétique';
  thematiques: string[];
  duree: number;
  paroles: LigneChanson[];
  competencesCibles: string[];
  nombreSeances: number;
}

export const mockChansons: Chanson[] = [
  {
    id: "1",
    titre: "La Vie en Rose",
    artiste: "Édith Piaf",
    album: "La Vie en Rose",
    annee: 1947,
    genre: ["Chanson française", "Jazz"],
    pochette: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    niveauCECRL: "B1",
    typeTexte: "poétique",
    thematiques: ["Amour", "Romance", "Bonheur"],
    duree: 198,
    nombreSeances: 3,
    competencesCibles: ["CO_GLOBALE", "VOC_THEMATIQUE", "CE_LITTERALE"],
    paroles: [
      { id: "1-1", numero: 1, texte: "Des yeux qui font baisser les miens", timestamp: 0 },
      { id: "1-2", numero: 2, texte: "Un rire qui se perd sur sa bouche", timestamp: 5 },
      { id: "1-3", numero: 3, texte: "Voilà le portrait sans retouche", timestamp: 10 },
      { id: "1-4", numero: 4, texte: "De l'homme auquel j'appartiens", timestamp: 15 },
      { id: "1-5", numero: 5, texte: "Quand il me prend dans ses bras", timestamp: 22 },
      { id: "1-6", numero: 6, texte: "Il me parle tout bas", timestamp: 27 },
      { id: "1-7", numero: 7, texte: "Je vois la vie en rose", timestamp: 32 },
    ],
  },
  {
    id: "2",
    titre: "Ne me quitte pas",
    artiste: "Jacques Brel",
    album: "Ne me quitte pas",
    annee: 1959,
    genre: ["Chanson française", "Classique"],
    pochette: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    niveauCECRL: "B2",
    typeTexte: "poétique",
    thematiques: ["Amour", "Désespoir", "Supplication"],
    duree: 270,
    nombreSeances: 4,
    competencesCibles: ["CO_DETAILLEE", "VOC_FIGURES", "CE_INFERENTIELLE", "CONJ_CONDITIONNEL"],
    paroles: [
      { id: "2-1", numero: 1, texte: "Ne me quitte pas", timestamp: 0 },
      { id: "2-2", numero: 2, texte: "Il faut oublier", timestamp: 4 },
      { id: "2-3", numero: 3, texte: "Tout peut s'oublier", timestamp: 8 },
      { id: "2-4", numero: 4, texte: "Qui s'enfuit déjà", timestamp: 12 },
      { id: "2-5", numero: 5, texte: "Oublier le temps", timestamp: 16 },
      { id: "2-6", numero: 6, texte: "Des malentendus", timestamp: 20 },
      { id: "2-7", numero: 7, texte: "Et le temps perdu", timestamp: 24 },
    ],
  },
  {
    id: "3",
    titre: "Formidable",
    artiste: "Stromae",
    album: "Racine carrée",
    annee: 2013,
    genre: ["Pop", "Électro", "Hip-hop"],
    pochette: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    niveauCECRL: "B1",
    typeTexte: "narratif",
    thematiques: ["Rupture", "Alcool", "Société moderne"],
    duree: 215,
    nombreSeances: 3,
    competencesCibles: ["CO_GLOBALE", "VOC_STYLISTIQUE", "SYNT_PHRASE_SIMPLE"],
    paroles: [
      { id: "3-1", numero: 1, texte: "Tu étais formidable, j'étais fort minable", timestamp: 0 },
      { id: "3-2", numero: 2, texte: "Nous étions formidables", timestamp: 5 },
      { id: "3-3", numero: 3, texte: "Eh, tu es où là ?", timestamp: 10 },
      { id: "3-4", numero: 4, texte: "Tu m'as laissé seul là", timestamp: 13 },
      { id: "3-5", numero: 5, texte: "J'suis perdu, j'ai trop bu", timestamp: 17 },
    ],
  },
  {
    id: "4",
    titre: "Les Champs-Élysées",
    artiste: "Joe Dassin",
    album: "Les Champs-Élysées",
    annee: 1969,
    genre: ["Chanson française", "Pop"],
    pochette: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=400&fit=crop",
    niveauCECRL: "A2",
    typeTexte: "descriptif",
    thematiques: ["Paris", "Joie de vivre", "Rencontre"],
    duree: 180,
    nombreSeances: 2,
    competencesCibles: ["CO_GLOBALE", "VOC_THEMATIQUE", "CONJ_PRESENT"],
    paroles: [
      { id: "4-1", numero: 1, texte: "Je m'baladais sur l'avenue", timestamp: 0 },
      { id: "4-2", numero: 2, texte: "Le cœur ouvert à l'inconnu", timestamp: 4 },
      { id: "4-3", numero: 3, texte: "J'avais envie de dire bonjour", timestamp: 8 },
      { id: "4-4", numero: 4, texte: "À n'importe qui", timestamp: 12 },
      { id: "4-5", numero: 5, texte: "N'importe qui et ce fut toi", timestamp: 15 },
      { id: "4-6", numero: 6, texte: "Je t'ai dit n'importe quoi", timestamp: 19 },
    ],
  },
  {
    id: "5",
    titre: "Papaoutai",
    artiste: "Stromae",
    album: "Racine carrée",
    annee: 2013,
    genre: ["Électro", "Pop", "World"],
    pochette: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    niveauCECRL: "B2",
    typeTexte: "argumentatif",
    thematiques: ["Famille", "Père absent", "Identité"],
    duree: 236,
    nombreSeances: 4,
    competencesCibles: ["CO_IMPLICITE", "CE_CRITIQUE", "VOC_CONTEXTUEL", "SYNT_SUBORDINATION"],
    paroles: [
      { id: "5-1", numero: 1, texte: "Dites-moi d'où il vient", timestamp: 0 },
      { id: "5-2", numero: 2, texte: "Enfin je saurai où je vais", timestamp: 4 },
      { id: "5-3", numero: 3, texte: "Maman dit que lorsqu'on cherche bien", timestamp: 8 },
      { id: "5-4", numero: 4, texte: "On finit toujours par trouver", timestamp: 12 },
      { id: "5-5", numero: 5, texte: "Elle dit qu'il n'est jamais très loin", timestamp: 16 },
      { id: "5-6", numero: 6, texte: "Qu'il part très souvent travailler", timestamp: 20 },
    ],
  },
  {
    id: "6",
    titre: "Je veux",
    artiste: "Zaz",
    album: "Zaz",
    annee: 2010,
    genre: ["Jazz", "Chanson française", "Pop"],
    pochette: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    niveauCECRL: "A2",
    typeTexte: "argumentatif",
    thematiques: ["Liberté", "Anti-matérialisme", "Bonheur simple"],
    duree: 195,
    nombreSeances: 2,
    competencesCibles: ["CO_GLOBALE", "VOC_THEMATIQUE", "CONJ_PRESENT", "PE_ARGUMENTATIVE"],
    paroles: [
      { id: "6-1", numero: 1, texte: "Donnez-moi une suite au Ritz", timestamp: 0 },
      { id: "6-2", numero: 2, texte: "Je n'en veux pas", timestamp: 3 },
      { id: "6-3", numero: 3, texte: "Des bijoux de chez Chanel", timestamp: 6 },
      { id: "6-4", numero: 4, texte: "Je n'en veux pas", timestamp: 9 },
      { id: "6-5", numero: 5, texte: "Donnez-moi une limousine", timestamp: 12 },
      { id: "6-6", numero: 6, texte: "J'en ferais quoi ?", timestamp: 15 },
    ],
  },
  {
    id: "7",
    titre: "Sous le ciel de Paris",
    artiste: "Yves Montand",
    album: "Yves Montand chante Paris",
    annee: 1951,
    genre: ["Chanson française", "Musette"],
    pochette: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop",
    niveauCECRL: "B1",
    typeTexte: "descriptif",
    thematiques: ["Paris", "Romantisme", "Nostalgie"],
    duree: 210,
    nombreSeances: 3,
    competencesCibles: ["CO_DETAILLEE", "VOC_THEMATIQUE", "CE_LITTERALE", "VOC_FIGURES"],
    paroles: [
      { id: "7-1", numero: 1, texte: "Sous le ciel de Paris", timestamp: 0 },
      { id: "7-2", numero: 2, texte: "S'envole une chanson", timestamp: 4 },
      { id: "7-3", numero: 3, texte: "Elle est née d'aujourd'hui", timestamp: 8 },
      { id: "7-4", numero: 4, texte: "Dans le cœur d'un garçon", timestamp: 12 },
    ],
  },
  {
    id: "8",
    titre: "L'hymne à l'amour",
    artiste: "Édith Piaf",
    album: "L'hymne à l'amour",
    annee: 1950,
    genre: ["Chanson française", "Classique"],
    pochette: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop",
    niveauCECRL: "C1",
    typeTexte: "poétique",
    thematiques: ["Amour absolu", "Sacrifice", "Passion"],
    duree: 245,
    nombreSeances: 5,
    competencesCibles: ["CO_IMPLICITE", "CE_CRITIQUE", "VOC_FIGURES", "CONJ_CONDITIONNEL", "CONJ_SUBJONCTIF"],
    paroles: [
      { id: "8-1", numero: 1, texte: "Le ciel bleu sur nous peut s'effondrer", timestamp: 0 },
      { id: "8-2", numero: 2, texte: "Et la terre peut bien s'écrouler", timestamp: 5 },
      { id: "8-3", numero: 3, texte: "Peu m'importe si tu m'aimes", timestamp: 10 },
      { id: "8-4", numero: 4, texte: "Je me fous du monde entier", timestamp: 15 },
    ],
  },
];

export const genres = ["Chanson française", "Pop", "Jazz", "Électro", "Hip-hop", "Classique", "World", "Musette"];

export const thematiques = [
  "Amour", "Romance", "Bonheur", "Désespoir", "Rupture", 
  "Paris", "Liberté", "Famille", "Identité", "Société moderne",
  "Nostalgie", "Passion", "Joie de vivre"
];

export const competences = {
  "CO_GLOBALE": "Compréhension orale globale",
  "CO_DETAILLEE": "Compréhension orale détaillée",
  "CO_IMPLICITE": "Compréhension de l'implicite",
  "CE_LITTERALE": "Compréhension écrite littérale",
  "CE_INFERENTIELLE": "Compréhension inférentielle",
  "CE_CRITIQUE": "Analyse critique",
  "VOC_THEMATIQUE": "Vocabulaire thématique",
  "VOC_STYLISTIQUE": "Registres de langue",
  "VOC_FIGURES": "Figures de style",
  "VOC_CONTEXTUEL": "Sens en contexte",
  "CONJ_PRESENT": "Conjugaison présent",
  "CONJ_CONDITIONNEL": "Conditionnel",
  "CONJ_SUBJONCTIF": "Subjonctif",
  "SYNT_PHRASE_SIMPLE": "Phrase simple",
  "SYNT_SUBORDINATION": "Subordination",
  "PE_ARGUMENTATIVE": "Production écrite argumentative",
};
