import { notFound } from "next/navigation";
import { getPhonemeById, getPhonemesByLevel } from "@packages/lecture-curriculum";
import { getCycleById, getLevelsByTrackAndCycle, getTrackById } from "@packages/curriculum/navigation";
import type { LevelId } from "@packages/types/curriculum";
import { ExerciseClient } from "./ExerciseClient";

const phonemeLevelMap: Record<LevelId, "GS" | "CP" | "CE1"> = {
  gs: "GS",
  cp: "CP",
  ce1: "CE1",
  ce2: "CE1",
  cm1: "CE1",
  cm2: "CE1",
  "6e": "CE1",
  "5e": "CE1",
  "4e": "CE1",
  "3e": "CE1",
  "2nde": "CE1",
  "1re": "CE1",
  terminale: "CE1",
};

const exerciseTypes = new Set(["audio", "position", "dictation"]);

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ level: string; phonemeId: string; exercise: string }>;
}) {
  const { level, phonemeId: phonemeIdParam, exercise } = await params;
  const levelSlug = (level ?? "").toLowerCase();
  const track = getTrackById("initiation-lecture-ecriture");
  const cycle = getCycleById("primaire");
  if (!levelSlug || !track || !cycle) {
    notFound();
  }
  const levels = getLevelsByTrackAndCycle(track, cycle);
  const selectedLevel = levels.find((item) => item.id === levelSlug);

  if (!selectedLevel || !phonemeLevelMap[selectedLevel.id]) {
    notFound();
  }

  const phonemeId = Number(phonemeIdParam);
  if (!Number.isFinite(phonemeId)) {
    notFound();
  }

  const phoneme = getPhonemeById(phonemeId);
  if (!phoneme) {
    notFound();
  }

  const allowedPhonemes = getPhonemesByLevel(phonemeLevelMap[selectedLevel.id]);
  const isAllowed = allowedPhonemes.some((item) => item.id === phonemeId);

  if (!isAllowed) {
    notFound();
  }

  if (!exerciseTypes.has(exercise)) {
    notFound();
  }

  return (
    <ExerciseClient
      levelSlug={levelSlug}
      phoneme={phoneme}
      exercise={exercise as "audio" | "position" | "dictation"}
    />
  );
}
