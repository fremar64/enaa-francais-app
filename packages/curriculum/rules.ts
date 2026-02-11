import type { RuleId, RuleRef } from "../types/curriculum";

export const RULE_UNLOCK_SEQUENTIAL_LEVELS = "unlock-sequential-levels";
export const RULE_UNLOCK_PHONEME_SEQUENCE = "unlock-phoneme-sequence";
export const RULE_UNLOCK_LEVEL_PROMOTION = "unlock-level-promotion";

export const RULE_VALIDATE_MASTERY_THRESHOLD = "validation-mastery-threshold";
export const RULE_VALIDATE_PHONEME_FOUNDATION = "validation-phoneme-foundation";
export const RULE_VALIDATE_PROGRESSIVE_MASTERY = "validation-progressive-mastery";
export const RULE_VALIDATE_COMPETENCY_PORTFOLIO = "validation-competency-portfolio";

export const RULE_REMEDIATE_PHONEME_REINFORCEMENT = "remediation-phoneme-reinforcement";
export const RULE_REMEDIATE_PHONEME_FOCUS = "remediation-phoneme-focus";
export const RULE_REMEDIATE_TARGETED_PRACTICE = "remediation-targeted-practice";
export const RULE_REMEDIATE_CONSOLIDATION_LOOP = "remediation-consolidation-loop";

export const RULE_REGISTRY = {
  [RULE_UNLOCK_SEQUENTIAL_LEVELS]: {
    id: RULE_UNLOCK_SEQUENTIAL_LEVELS,
    description: "Unlock levels in strict sequential order."
  },
  [RULE_UNLOCK_PHONEME_SEQUENCE]: {
    id: RULE_UNLOCK_PHONEME_SEQUENCE,
    description: "Unlock phonemes based on a fixed sequence."
  },
  [RULE_UNLOCK_LEVEL_PROMOTION]: {
    id: RULE_UNLOCK_LEVEL_PROMOTION,
    description: "Unlock next level based on promotion criteria."
  },
  [RULE_VALIDATE_MASTERY_THRESHOLD]: {
    id: RULE_VALIDATE_MASTERY_THRESHOLD,
    description: "Validate using a mastery threshold."
  },
  [RULE_VALIDATE_PHONEME_FOUNDATION]: {
    id: RULE_VALIDATE_PHONEME_FOUNDATION,
    description: "Validate foundational phoneme mastery."
  },
  [RULE_VALIDATE_PROGRESSIVE_MASTERY]: {
    id: RULE_VALIDATE_PROGRESSIVE_MASTERY,
    description: "Validate progressive mastery over time."
  },
  [RULE_VALIDATE_COMPETENCY_PORTFOLIO]: {
    id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
    description: "Validate via competency portfolio evidence."
  },
  [RULE_REMEDIATE_PHONEME_REINFORCEMENT]: {
    id: RULE_REMEDIATE_PHONEME_REINFORCEMENT,
    description: "Target phoneme reinforcement remediation."
  },
  [RULE_REMEDIATE_PHONEME_FOCUS]: {
    id: RULE_REMEDIATE_PHONEME_FOCUS,
    description: "Focused phoneme remediation loop."
  },
  [RULE_REMEDIATE_TARGETED_PRACTICE]: {
    id: RULE_REMEDIATE_TARGETED_PRACTICE,
    description: "Targeted practice remediation."
  },
  [RULE_REMEDIATE_CONSOLIDATION_LOOP]: {
    id: RULE_REMEDIATE_CONSOLIDATION_LOOP,
    description: "Consolidation remediation loop."
  }
} as const satisfies Record<RuleId, { id: RuleId; description: string }>;

export const RULE_IDS = Object.keys(RULE_REGISTRY) as RuleId[];

export const isRuleId = (value: string): value is RuleId =>
  Object.prototype.hasOwnProperty.call(RULE_REGISTRY, value);

export const assertRuleRef = (rule?: RuleRef) => {
  if (!rule) {
    return;
  }

  if (!isRuleId(rule.id)) {
    throw new Error(`Unknown rule id: ${rule.id}`);
  }
};

export const LEVEL_RULES = {
  gs: {
    unlockRule: { id: RULE_UNLOCK_PHONEME_SEQUENCE },
    validationRule: {
      id: RULE_VALIDATE_PHONEME_FOUNDATION,
      params: { threshold: 0.7 }
    },
    remediationRule: { id: RULE_REMEDIATE_PHONEME_FOCUS }
  },
  cp: {
    unlockRule: { id: RULE_UNLOCK_PHONEME_SEQUENCE },
    validationRule: {
      id: RULE_VALIDATE_PHONEME_FOUNDATION,
      params: { threshold: 0.75 }
    },
    remediationRule: { id: RULE_REMEDIATE_PHONEME_FOCUS }
  },
  ce1: {
    unlockRule: { id: RULE_UNLOCK_PHONEME_SEQUENCE },
    validationRule: {
      id: RULE_VALIDATE_PHONEME_FOUNDATION,
      params: { threshold: 0.8 }
    },
    remediationRule: { id: RULE_REMEDIATE_PHONEME_REINFORCEMENT }
  },
  ce2: {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_PROGRESSIVE_MASTERY,
      params: { threshold: 0.8 }
    },
    remediationRule: { id: RULE_REMEDIATE_TARGETED_PRACTICE }
  },
  cm1: {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_PROGRESSIVE_MASTERY,
      params: { threshold: 0.82 }
    },
    remediationRule: { id: RULE_REMEDIATE_TARGETED_PRACTICE }
  },
  cm2: {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_PROGRESSIVE_MASTERY,
      params: { threshold: 0.85 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "6e": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.85 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "5e": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.87 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "4e": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.9 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "3e": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.92 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "2nde": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.93 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  "1re": {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.95 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  },
  terminale: {
    unlockRule: { id: RULE_UNLOCK_LEVEL_PROMOTION },
    validationRule: {
      id: RULE_VALIDATE_COMPETENCY_PORTFOLIO,
      params: { threshold: 0.96 }
    },
    remediationRule: { id: RULE_REMEDIATE_CONSOLIDATION_LOOP }
  }
} as const;
