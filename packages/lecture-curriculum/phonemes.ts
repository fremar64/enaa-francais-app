export type PhonemeType = 'vowel' | 'consonant' | 'complex';

export interface Phoneme {
  id: number;
  symbol: string;
  graphemes: string[];
  phonetic: string;
  phase: number;
  orderInPhase: number;
  level: 'GS' | 'CP' | 'CE1';
  type: PhonemeType;
  description: string;
  exampleWords: string[];
  imageUrl?: string;
}

export const phonemes: Phoneme[] = [
  // Phase 1 : Voyelles simples (GS)
  {
    id: 1,
    symbol: 'a',
    graphemes: ['a', 'à', 'â'],
    phonetic: '[a]',
    phase: 1,
    orderInPhase: 1,
    level: 'GS',
    type: 'vowel',
    description: 'Le son A comme dans "ami"',
    exampleWords: ['ami', 'papa', 'chat', 'ananas', 'arbre'],
  },
  {
    id: 2,
    symbol: 'i',
    graphemes: ['i', 'î', 'y'],
    phonetic: '[i]',
    phase: 1,
    orderInPhase: 2,
    level: 'GS',
    type: 'vowel',
    description: 'Le son I comme dans "île"',
    exampleWords: ['île', 'ami', 'tapis', 'souris', 'livre'],
  },
  {
    id: 3,
    symbol: 'o',
    graphemes: ['o', 'ô'],
    phonetic: '[o]',
    phase: 1,
    orderInPhase: 3,
    level: 'GS',
    type: 'vowel',
    description: 'Le son O comme dans "océan"',
    exampleWords: ['océan', 'vélo', 'robot', 'domino', 'moto'],
  },
  {
    id: 4,
    symbol: 'u',
    graphemes: ['u', 'û'],
    phonetic: '[y]',
    phase: 1,
    orderInPhase: 4,
    level: 'GS',
    type: 'vowel',
    description: 'Le son U comme dans "lune"',
    exampleWords: ['lune', 'rue', 'tortue', 'plume', 'jupe'],
  },
  {
    id: 5,
    symbol: 'e',
    graphemes: ['e'],
    phonetic: '[ə]',
    phase: 1,
    orderInPhase: 5,
    level: 'GS',
    type: 'vowel',
    description: 'Le son E comme dans "petit"',
    exampleWords: ['petit', 'chemin', 'renard', 'cerise', 'melon'],
  },
  {
    id: 6,
    symbol: 'é',
    graphemes: ['é', 'er', 'ez'],
    phonetic: '[e]',
    phase: 1,
    orderInPhase: 6,
    level: 'GS',
    type: 'vowel',
    description: 'Le son É comme dans "école"',
    exampleWords: ['école', 'été', 'bébé', 'café', 'clé'],
  },

  // Phase 2 : Consonnes continues (GS/CP)
  {
    id: 7,
    symbol: 'l',
    graphemes: ['l', 'll'],
    phonetic: '[l]',
    phase: 2,
    orderInPhase: 1,
    level: 'GS',
    type: 'consonant',
    description: 'Le son L comme dans "lune"',
    exampleWords: ['lune', 'éléphant', 'ballon', 'soleil', 'lapin'],
  },
  {
    id: 8,
    symbol: 's',
    graphemes: ['s', 'ss', 'c', 'ç'],
    phonetic: '[s]',
    phase: 2,
    orderInPhase: 2,
    level: 'GS',
    type: 'consonant',
    description: 'Le son S comme dans "soleil"',
    exampleWords: ['soleil', 'souris', 'salade', 'poisson', 'serpent'],
  },
  {
    id: 9,
    symbol: 'r',
    graphemes: ['r', 'rr'],
    phonetic: '[ʁ]',
    phase: 2,
    orderInPhase: 3,
    level: 'CP',
    type: 'consonant',
    description: 'Le son R comme dans "renard"',
    exampleWords: ['renard', 'roi', 'carotte', 'arbre', 'rivière'],
  },
  {
    id: 10,
    symbol: 'm',
    graphemes: ['m', 'mm'],
    phonetic: '[m]',
    phase: 2,
    orderInPhase: 4,
    level: 'CP',
    type: 'consonant',
    description: 'Le son M comme dans "maman"',
    exampleWords: ['maman', 'maison', 'mouton', 'pomme', 'montagne'],
  },
  {
    id: 11,
    symbol: 'n',
    graphemes: ['n', 'nn'],
    phonetic: '[n]',
    phase: 2,
    orderInPhase: 5,
    level: 'CP',
    type: 'consonant',
    description: 'Le son N comme dans "nuage"',
    exampleWords: ['nuage', 'nez', 'banane', 'animal', 'nature'],
  },
  {
    id: 12,
    symbol: 'f',
    graphemes: ['f', 'ff', 'ph'],
    phonetic: '[f]',
    phase: 2,
    orderInPhase: 6,
    level: 'CP',
    type: 'consonant',
    description: 'Le son F comme dans "fleur"',
    exampleWords: ['fleur', 'forêt', 'éléphant', 'café', 'feuille'],
  },

  // Phase 3 : Consonnes occlusives (CP)
  {
    id: 13,
    symbol: 't',
    graphemes: ['t', 'tt'],
    phonetic: '[t]',
    phase: 3,
    orderInPhase: 1,
    level: 'CP',
    type: 'consonant',
    description: 'Le son T comme dans "table"',
    exampleWords: ['table', 'tapis', 'tomate', 'tortue', 'étoile'],
  },
  {
    id: 14,
    symbol: 'p',
    graphemes: ['p', 'pp'],
    phonetic: '[p]',
    phase: 3,
    orderInPhase: 2,
    level: 'CP',
    type: 'consonant',
    description: 'Le son P comme dans "papa"',
    exampleWords: ['papa', 'pomme', 'papillon', 'porte', 'parapluie'],
  },
  {
    id: 15,
    symbol: 'd',
    graphemes: ['d', 'dd'],
    phonetic: '[d]',
    phase: 3,
    orderInPhase: 3,
    level: 'CP',
    type: 'consonant',
    description: 'Le son D comme dans "dent"',
    exampleWords: ['dent', 'dodo', 'dragon', 'dimanche', 'danser'],
  },
  {
    id: 16,
    symbol: 'b',
    graphemes: ['b', 'bb'],
    phonetic: '[b]',
    phase: 3,
    orderInPhase: 4,
    level: 'CP',
    type: 'consonant',
    description: 'Le son B comme dans "ballon"',
    exampleWords: ['ballon', 'bébé', 'bateau', 'banane', 'bouche'],
  },

  // Phase 4 : Graphèmes complexes (CP)
  {
    id: 17,
    symbol: 'ch',
    graphemes: ['ch'],
    phonetic: '[ʃ]',
    phase: 4,
    orderInPhase: 1,
    level: 'CP',
    type: 'complex',
    description: 'Le son CH comme dans "chat"',
    exampleWords: ['chat', 'cheval', 'chocolat', 'chambre', 'chapeau'],
  },
  {
    id: 18,
    symbol: 'ou',
    graphemes: ['ou', 'où', 'oû'],
    phonetic: '[u]',
    phase: 4,
    orderInPhase: 2,
    level: 'CP',
    type: 'complex',
    description: 'Le son OU comme dans "loup"',
    exampleWords: ['loup', 'poule', 'mouton', 'coucou', 'hibou'],
  },
  {
    id: 19,
    symbol: 'on',
    graphemes: ['on', 'om'],
    phonetic: '[ɔ̃]',
    phase: 4,
    orderInPhase: 3,
    level: 'CP',
    type: 'complex',
    description: 'Le son ON comme dans "maison"',
    exampleWords: ['maison', 'mouton', 'bonbon', 'lion', 'pont'],
  },
  {
    id: 20,
    symbol: 'an',
    graphemes: ['an', 'am', 'en', 'em'],
    phonetic: '[ɑ̃]',
    phase: 4,
    orderInPhase: 4,
    level: 'CP',
    type: 'complex',
    description: 'Le son AN comme dans "maman"',
    exampleWords: ['maman', 'banane', 'enfant', 'chambre', 'dent'],
  },

  // Phase 5 : Graphèmes complexes avancés (CE1)
  {
    id: 21,
    symbol: 'in',
    graphemes: ['in', 'im', 'ain', 'ein', 'un'],
    phonetic: '[ɛ̃]',
    phase: 5,
    orderInPhase: 1,
    level: 'CE1',
    type: 'complex',
    description: 'Le son IN comme dans "lapin"',
    exampleWords: ['lapin', 'jardin', 'main', 'peinture', 'brun'],
  },
  {
    id: 22,
    symbol: 'oi',
    graphemes: ['oi', 'oy'],
    phonetic: '[wa]',
    phase: 5,
    orderInPhase: 2,
    level: 'CE1',
    type: 'complex',
    description: 'Le son OI comme dans "roi"',
    exampleWords: ['roi', 'trois', 'poisson', 'voiture', 'étoile'],
  },
  {
    id: 23,
    symbol: 'au',
    graphemes: ['au', 'eau'],
    phonetic: '[o]',
    phase: 5,
    orderInPhase: 3,
    level: 'CE1',
    type: 'complex',
    description: 'Le son AU comme dans "bateau"',
    exampleWords: ['bateau', 'chapeau', 'oiseau', 'jaune', 'chaud'],
  },
];

export const getPhonemesByLevel = (level: 'GS' | 'CP' | 'CE1'): Phoneme[] => {
  const levelOrder = { GS: 1, CP: 2, CE1: 3 };
  return phonemes.filter((p) => levelOrder[p.level] <= levelOrder[level]);
};

export const getPhonemesByPhase = (phase: number): Phoneme[] => {
  return phonemes.filter((p) => p.phase === phase);
};

export const getPhonemeById = (id: number): Phoneme | undefined => {
  return phonemes.find((p) => p.id === id);
};
