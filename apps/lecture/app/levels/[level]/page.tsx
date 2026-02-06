import { notFound } from "next/navigation";
import { getCycleById, getLevelsByTrackAndCycle, getTrackById } from "@packages/curriculum/navigation";
import type { LevelId } from "@packages/types/curriculum";
import { LevelClient } from "./LevelClient";

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

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
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

  return (
    <LevelClient
      level={phonemeLevelMap[selectedLevel.id]}
      levelSlug={selectedLevel.id}
    />
  );
}
