import type { ActivityFactory, ActivityParams } from "./types";
import { createConjugaisonActivityFromParams } from "./conjugaison";
import { createLectureActivityFromParams } from "./lecture";

const registry: Record<string, ActivityFactory> = {
  "initiation-lecture-ecriture:phoneme": createLectureActivityFromParams,
  "conjugaison:verbe": createConjugaisonActivityFromParams
};

export const createActivity = (type: string, params: ActivityParams) => {
  const factory = registry[type];
  if (!factory) {
    throw new Error(`Unknown activity type: ${type}`);
  }

  return factory(params);
};

export { registry as activityRegistry };
