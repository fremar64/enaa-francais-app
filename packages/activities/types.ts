import type { ActivityDefinition } from "../activity-contract";

export type ActivityParams = Record<string, string | string[] | undefined>;

export type ActivityFactory = (params: ActivityParams) => ActivityDefinition;
