export type DomainId = "communication" | "langue";

export type CycleId = "primaire" | "college" | "lycee";

export type LevelId =
  | "gs"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "2nde"
  | "1re"
  | "terminale";

export type RuleId =
  | "unlock-sequential-levels"
  | "unlock-phoneme-sequence"
  | "unlock-level-promotion"
  | "validation-mastery-threshold"
  | "validation-phoneme-foundation"
  | "validation-progressive-mastery"
  | "validation-competency-portfolio"
  | "remediation-phoneme-reinforcement"
  | "remediation-phoneme-focus"
  | "remediation-targeted-practice"
  | "remediation-consolidation-loop";

export type RuleRef = {
  id: RuleId;
  params?: Record<string, unknown>;
};

export interface Level {
  id: LevelId;
  label: string;
  cassLevelUri: string;
  scoreRange: [number, number];
  cecrlProjection: string;
  unlockRule?: RuleRef;
  validationRule?: RuleRef;
  remediationRule?: RuleRef;
}

export interface Cycle {
  id: CycleId;
  label: string;
  levels: Level[];
}

export interface Track {
  id: string;
  label: string;
  description: string;
  domainId: DomainId;
  cycles: CycleId[];
  available: boolean;
  levelsByCycle?: Partial<Record<CycleId, LevelId[]>>;
  unlockRule?: RuleRef;
  validationRule?: RuleRef;
  remediationRule?: RuleRef;
}

export interface Domain {
  id: DomainId;
  label: string;
  description: string;
  tracksLabel: string;
  tracksDescription: string;
}

export type NavigationSelection = {
  domainId?: DomainId;
  trackId?: string;
  cycleId?: CycleId;
  levelId?: LevelId;
};
