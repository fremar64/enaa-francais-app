import type { ActivityDefinition, ActivityMetadata } from "../../activity-contract";
import { getCurriculumActivityById } from "../../curriculum";
import type { ActivityParams } from "../types";
import { getConjugaisonExercise } from "./content/verbs";

export type ConjugaisonFillPrompt = {
  subject: string;
  answer: string;
};

export type ConjugaisonChoicePrompt = {
  subject: string;
  choices: string[];
  correct: string;
};

export type ConjugaisonActivityContent = {
  verb: string;
  tense: string;
  prompts: Array<ConjugaisonFillPrompt | ConjugaisonChoicePrompt>;
};

export type ConjugaisonActivityDefinition = ActivityDefinition<ConjugaisonActivityContent>;

export const createConjugaisonActivity = (
  metadata: ActivityMetadata
): ConjugaisonActivityDefinition => ({
  metadata,
  createContent: () => getConjugaisonExercise(metadata.activityId)
});

const getParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const createConjugaisonActivityFromParams = (
  params: ActivityParams
): ConjugaisonActivityDefinition => {
  const activityId = getParam(params.activityId) ?? getParam(params.id);
  if (!activityId) {
    throw new Error("Missing activityId for conjugaison activity");
  }

  const metadata = getCurriculumActivityById(activityId);
  if (!metadata || metadata.trackId !== "conjugaison") {
    throw new Error(`Unknown conjugaison activity: ${activityId}`);
  }

  return createConjugaisonActivity(metadata);
};
