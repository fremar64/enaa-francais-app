import { notFound, redirect } from "next/navigation";
import { getPhonemeActivityById } from "@packages/activities/lecture";
import { getCycleById, getLevelsByTrackAndCycle, getTrackById, buildActivityUrl } from "@packages/curriculum/navigation";

export default async function PhonemePage({
  params,
}: {
  params: Promise<{ level: string; phonemeId: string }>;
}) {
  const { level, phonemeId: phonemeIdParam } = await params;
  const levelSlug = (level ?? "").toLowerCase();
  const track = getTrackById("initiation-lecture-ecriture");
  const cycle = getCycleById("primaire");
  if (!levelSlug || !track || !cycle) {
    notFound();
  }
  const levels = getLevelsByTrackAndCycle(track, cycle);
  const selectedLevel = levels.find((item) => item.id === levelSlug);

  if (!selectedLevel) {
    notFound();
  }

  const phonemeId = Number(phonemeIdParam);
  if (!Number.isFinite(phonemeId)) {
    notFound();
  }

  const activity = getPhonemeActivityById(phonemeId);
  if (!activity || activity.metadata.levelId !== selectedLevel.id) {
    notFound();
  }

  redirect(
    buildActivityUrl({
      domainId: "langue",
      trackId: "initiation-lecture-ecriture",
      levelId: selectedLevel.id,
      activityType: "phoneme",
      params: { phonemeId: String(phonemeId) }
    })
  );
}
