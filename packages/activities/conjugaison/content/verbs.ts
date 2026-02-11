import type { ConjugaisonActivityContent } from "../activity-factory";

const conjugaisonExercises: Record<string, ConjugaisonActivityContent> = {
  "conj-present-etre-cp": {
    verb: "etre",
    tense: "present",
    prompts: [
      { subject: "je", answer: "suis" },
      { subject: "tu", answer: "es" }
    ]
  },
  "conj-present-avoir-ce1": {
    verb: "avoir",
    tense: "present",
    prompts: [
      {
        subject: "nous",
        choices: ["avons", "avez", "ont"],
        correct: "avons"
      }
    ]
  }
};

export const getConjugaisonExercise = (activityId: string): ConjugaisonActivityContent => {
  const exercise = conjugaisonExercises[activityId];
  if (!exercise) {
    throw new Error(`Unknown activity: ${activityId}`);
  }

  return exercise;
};
