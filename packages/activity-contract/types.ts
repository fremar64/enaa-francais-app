export type ActivityType =
  | "recognition"
  | "production"
  | "comprehension"
  | "practice"
  | "analysis"
  | "dictation";

export type ActivityModality =
  | "visual"
  | "audio"
  | "text"
  | "audio-visual"
  | "mixed";

export type CompetencyRef = string;
export type ActivityRef = string;

export interface RuleRef {
  id: string;
  params?: Record<string, unknown>;
}

export interface ActivityMetadata {
  activityId: string;
  domainId: string;
  trackId: string;
  cycleId: string;
  levelId: string;
  activityType: ActivityType;
  modality: ActivityModality;
  competencies: CompetencyRef[];
  prerequisites?: ActivityRef[];
  unlockRule?: RuleRef;
  validationRule?: RuleRef;
  remediationRule?: RuleRef;
}

export type PedagogicalEvent =
  | { type: "attempt"; timestamp: number }
  | { type: "success"; timestamp: number }
  | { type: "error"; code: string; timestamp: number }
  | { type: "hint-used"; level: number; timestamp: number }
  | { type: "abandon"; timestamp: number };

export interface ActivityEvaluationSurface {
  attempts: number;
  errors: number;
  success: boolean;
  durationMs: number;
  events: PedagogicalEvent[];
  indicators?: Record<string, number | string | boolean>;
}

export type ActivityState = Record<string, unknown>;

export interface ActivityAction {
  type: string;
  payload?: Record<string, unknown>;
}

export interface CompletionCriteria {
  type: "success" | "attempts" | "custom";
  value?: number | string | boolean;
}

export interface ActivityRuntime<Input = unknown, Output = unknown> {
  input: Input;
  state: ActivityState;
  actions: ActivityAction[];
  completionCriteria: CompletionCriteria;
  output?: Output;
}

export interface ActivityDefinition<Content = unknown> {
  metadata: ActivityMetadata;
  createContent: () => Content;
}
