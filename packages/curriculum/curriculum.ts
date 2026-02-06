import type { Cycle, Domain, Level, Track } from "../types/curriculum";

const createLevel = (
  id: Level["id"],
  label: string,
  min: number,
  max: number,
  cecrl: string
): Level => ({
  id,
  label,
  scoreRange: [min, max],
  cecrlProjection: cecrl,
  cassLevelUri: `https://cass.ceredis.net/levels/${id}`
});

export const DOMAINS: Domain[] = [
  {
    id: "communication",
    label: "Communication orale et écrite",
    description: "Parler, écouter, lire et écrire dans des situations authentiques.",
    tracksLabel: "Modules disponibles",
    tracksDescription: "Choisissez un module de communication contextualisée."
  },
  {
    id: "langue",
    label: "Connaissance de la langue",
    description: "Maîtrise grammaticale, lexicale et orthographique du français.",
    tracksLabel: "Disciplines",
    tracksDescription: "Choisissez une discipline de maîtrise de la langue."
  }
];

export const CYCLES: Cycle[] = [
  {
    id: "primaire",
    label: "Primaire",
    levels: [
      createLevel("gs", "Grande Section", 0, 10, "Pré-A1"),
      createLevel("cp", "CP", 0, 20, "Pré-A1"),
      createLevel("ce1", "CE1", 15, 30, "A1.0"),
      createLevel("ce2", "CE2", 25, 40, "A1.1"),
      createLevel("cm1", "CM1", 35, 50, "A1.2"),
      createLevel("cm2", "CM2", 45, 60, "A2.1")
    ]
  },
  {
    id: "college",
    label: "Collège",
    levels: [
      createLevel("6e", "6ème", 50, 65, "A2.1"),
      createLevel("5e", "5ème", 60, 75, "A2.2"),
      createLevel("4e", "4ème", 70, 85, "B1.0"),
      createLevel("3e", "3ème", 80, 95, "B1.1")
    ]
  },
  {
    id: "lycee",
    label: "Lycée",
    levels: [
      createLevel("2nde", "2nde", 85, 95, "B1.1"),
      createLevel("1re", "1re", 90, 98, "B1.2"),
      createLevel("terminale", "Terminale", 95, 100, "B2.0")
    ]
  }
];

export const TRACKS: Track[] = [
  {
    id: "chansons",
    label: "Chansons",
    description: "Apprendre le français par l’écoute et l’interprétation de chansons.",
    domainId: "communication",
    cycles: ["primaire", "college", "lycee"],
    available: true
  },
  {
    id: "contes-nouvelles",
    label: "Contes et nouvelles",
    description: "Récits courts, narration et compréhension narrative.",
    domainId: "communication",
    cycles: ["primaire", "college"],
    available: false
  },
  {
    id: "fables-poesie",
    label: "Fables et poésie",
    description: "Fables, poèmes et textes versifiés pour enrichir la sensibilité littéraire.",
    domainId: "communication",
    cycles: ["primaire", "college", "lycee"],
    available: false
  },
  {
    id: "textes-argumentatifs",
    label: "Textes argumentatifs",
    description: "Débattre, convaincre, justifier.",
    domainId: "communication",
    cycles: ["college", "lycee"],
    available: false
  },
  {
    id: "textes-fonctionnels",
    label: "Textes fonctionnels",
    description: "Comprendre et produire des écrits usuels.",
    domainId: "communication",
    cycles: ["primaire", "college", "lycee"],
    available: false
  },
  {
    id: "correspondance",
    label: "Correspondance interscolaire",
    description: "Écrire des lettres et courriels dans un cadre collaboratif.",
    domainId: "communication",
    cycles: ["college", "lycee"],
    available: false
  },
  {
    id: "grammaire",
    label: "Grammaire",
    description: "Structuration de la langue et raisonnement grammatical.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"],
    available: true
  },
  {
    id: "conjugaison",
    label: "Conjugaison",
    description: "Maîtrise des temps, modes et valeurs verbales.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"],
    available: true
  },
  {
    id: "orthographe",
    label: "Orthographe",
    description: "Précision et rigueur dans l’écriture.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"],
    available: true
  },
  {
    id: "vocabulaire",
    label: "Vocabulaire",
    description: "Enrichissement lexical et nuances de sens.",
    domainId: "langue",
    cycles: ["primaire", "college", "lycee"],
    available: true
  },
  {
    id: "initiation-lecture-ecriture",
    label: "Initiation lecture–écriture",
    description: "CP–CE1 : bases du décodage et de l’encodage.",
    domainId: "langue",
    cycles: ["primaire"],
    available: true,
    levelsByCycle: {
      primaire: ["gs", "cp", "ce1"]
    }
  }
];
