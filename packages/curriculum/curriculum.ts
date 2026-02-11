import type { Cycle, Domain, Level, Track } from "../types/curriculum";
import {
  assertRuleRef,
  LEVEL_RULES,
  RULE_REMEDIATE_PHONEME_REINFORCEMENT,
  RULE_UNLOCK_SEQUENTIAL_LEVELS,
  RULE_VALIDATE_MASTERY_THRESHOLD
} from "./rules";

const isDev = process.env.NODE_ENV !== "production";
const forceRuleValidation = process.env.CEREDIS_VALIDATE_RULES === "true";

const validateRuleSet = (rules?: Pick<Level, "unlockRule" | "validationRule" | "remediationRule">) => {
  if (!isDev && !forceRuleValidation) {
    return;
  }

  if (!rules) {
    return;
  }

  assertRuleRef(rules.unlockRule);
  assertRuleRef(rules.validationRule);
  assertRuleRef(rules.remediationRule);
};

const createLevel = (
  id: Level["id"],
  label: string,
  min: number,
  max: number,
  cecrl: string,
  rules?: Pick<Level, "unlockRule" | "validationRule" | "remediationRule">
): Level => {
  validateRuleSet(rules);

  return {
    id,
    label,
    scoreRange: [min, max],
    cecrlProjection: cecrl,
    cassLevelUri: `https://cass.ceredis.net/levels/${id}`,
    ...rules
  };
};

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
      createLevel("gs", "Grande Section", 0, 10, "Pré-A1", LEVEL_RULES.gs),
      createLevel("cp", "CP", 0, 20, "Pré-A1", LEVEL_RULES.cp),
      createLevel("ce1", "CE1", 15, 30, "A1.0", LEVEL_RULES.ce1),
      createLevel("ce2", "CE2", 25, 40, "A1.1", LEVEL_RULES.ce2),
      createLevel("cm1", "CM1", 35, 50, "A1.2", LEVEL_RULES.cm1),
      createLevel("cm2", "CM2", 45, 60, "A2.1", LEVEL_RULES.cm2)
    ]
  },
  {
    id: "college",
    label: "Collège",
    levels: [
      createLevel("6e", "6ème", 50, 65, "A2.1", LEVEL_RULES["6e"]),
      createLevel("5e", "5ème", 60, 75, "A2.2", LEVEL_RULES["5e"]),
      createLevel("4e", "4ème", 70, 85, "B1.0", LEVEL_RULES["4e"]),
      createLevel("3e", "3ème", 80, 95, "B1.1", LEVEL_RULES["3e"])
    ]
  },
  {
    id: "lycee",
    label: "Lycée",
    levels: [
      createLevel("2nde", "2nde", 85, 95, "B1.1", LEVEL_RULES["2nde"]),
      createLevel("1re", "1re", 90, 98, "B1.2", LEVEL_RULES["1re"]),
      createLevel("terminale", "Terminale", 95, 100, "B2.0", LEVEL_RULES.terminale)
    ]
  }
];

CYCLES.forEach((cycle) => {
  cycle.levels.forEach((level) => {
    validateRuleSet({
      unlockRule: level.unlockRule,
      validationRule: level.validationRule,
      remediationRule: level.remediationRule
    });
  });
});

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
    },
    unlockRule: {
      id: RULE_UNLOCK_SEQUENTIAL_LEVELS
    },
    validationRule: {
      id: RULE_VALIDATE_MASTERY_THRESHOLD,
      params: {
        threshold: 0.8
      }
    },
    remediationRule: {
      id: RULE_REMEDIATE_PHONEME_REINFORCEMENT
    }
  }
];

TRACKS.forEach((track) => {
  validateRuleSet({
    unlockRule: track.unlockRule,
    validationRule: track.validationRule,
    remediationRule: track.remediationRule
  });
});
