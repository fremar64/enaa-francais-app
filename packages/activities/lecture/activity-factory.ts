import type { ActivityDefinition, ActivityMetadata } from "../../activity-contract";
import type { LevelId } from "../../types/curriculum";
import type { ActivityParams } from "../types";
import type { Phoneme } from "./content/phonemes";
import { phonemes } from "./content/phonemes";

type LectureLevel = "GS" | "CP" | "CE1";

export type LectureActivityContent = {
  phonemeId: number;
  symbol: string;
  graphemes: string[];
  phonetic: string;
  exampleWords: string[];
  description: string;
  type: Phoneme["type"];
  phase: number;
  orderInPhase: number;
  level: LectureLevel;
  imageUrl?: string;
};

export type LectureActivityDefinition = ActivityDefinition<LectureActivityContent>;

const levelMap: Record<LectureLevel, { levelId: LevelId; cycleId: string }> = {
  GS: { levelId: "gs", cycleId: "primaire" },
  CP: { levelId: "cp", cycleId: "primaire" },
  CE1: { levelId: "ce1", cycleId: "primaire" }
};

const createPhonemeMetadata = (phoneme: Phoneme): ActivityMetadata => {
  const mapped = levelMap[phoneme.level];

  return {
    activityId: `phoneme-${phoneme.id}`,
    domainId: "langue",
    trackId: "initiation-lecture-ecriture",
    cycleId: mapped.cycleId,
    levelId: mapped.levelId,
    activityType: "recognition",
    modality: "audio-visual",
    competencies: []
  };
};

export const createPhonemeActivity = (phoneme: Phoneme): LectureActivityDefinition => ({
  metadata: createPhonemeMetadata(phoneme),
  createContent: () => ({
    phonemeId: phoneme.id,
    symbol: phoneme.symbol,
    graphemes: phoneme.graphemes,
    phonetic: phoneme.phonetic,
    exampleWords: phoneme.exampleWords,
    description: phoneme.description,
    type: phoneme.type,
    phase: phoneme.phase,
    orderInPhase: phoneme.orderInPhase,
    level: phoneme.level,
    imageUrl: phoneme.imageUrl
  })
});

export const createLectureActivityFromMetadata = (
  metadata: ActivityMetadata
): LectureActivityDefinition => {
  const [, idPart] = metadata.activityId.split("phoneme-");
  const phonemeId = Number(idPart);

  if (!Number.isFinite(phonemeId)) {
    throw new Error(`Unknown lecture activity: ${metadata.activityId}`);
  }

  const phoneme = phonemes.find((item) => item.id === phonemeId);
  if (!phoneme) {
    throw new Error(`Unknown lecture activity: ${metadata.activityId}`);
  }

  return createPhonemeActivity(phoneme);
};

const getParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const createLectureActivityFromParams = (
  params: ActivityParams
): LectureActivityDefinition => {
  const phonemeIdValue = getParam(params.phonemeId) ?? getParam(params.phoneme);
  if (!phonemeIdValue) {
    throw new Error("Missing phonemeId for lecture activity");
  }

  const phonemeId = Number(phonemeIdValue);
  if (!Number.isFinite(phonemeId)) {
    const phonemeBySymbol = phonemes.find((item) => item.symbol === phonemeIdValue);
    if (!phonemeBySymbol) {
      throw new Error(`Unknown lecture phoneme: ${phonemeIdValue}`);
    }
    return createPhonemeActivity(phonemeBySymbol);
  }

  const phoneme = phonemes.find((item) => item.id === phonemeId);
  if (!phoneme) {
    throw new Error(`Unknown lecture phoneme: ${phonemeId}`);
  }

  const activity = createPhonemeActivity(phoneme);
  const expectedLevel = getParam(params.level);
  if (expectedLevel && expectedLevel !== activity.metadata.levelId) {
    throw new Error("Level does not match requested phoneme");
  }

  return activity;
};

export const getPhonemeActivitiesByLevel = (level: LectureLevel): LectureActivityDefinition[] =>
  phonemes.filter((phoneme) => phoneme.level === level).map(createPhonemeActivity);

const lectureLevelById: Partial<Record<LevelId, LectureLevel>> = {
  gs: "GS",
  cp: "CP",
  ce1: "CE1"
};

export const getPhonemeActivitiesByLevelId = (levelId: LevelId): LectureActivityDefinition[] => {
  const lectureLevel = lectureLevelById[levelId];

  if (!lectureLevel) {
    return [];
  }

  return getPhonemeActivitiesByLevel(lectureLevel);
};

export const getPhonemeActivityById = (phonemeId: number): LectureActivityDefinition | undefined => {
  const phoneme = phonemes.find((item) => item.id === phonemeId);

  if (!phoneme) {
    return undefined;
  }

  return createPhonemeActivity(phoneme);
};

export const getPhonemeById = (phonemeId: number): Phoneme | undefined =>
  phonemes.find((item) => item.id === phonemeId);

export const getPhonemesByLevel = (level: LectureLevel): Phoneme[] =>
  phonemes.filter((phoneme) => phoneme.level === level);

export const getPhonemesByPhase = (phase: number): Phoneme[] =>
  phonemes.filter((phoneme) => phoneme.phase === phase);
