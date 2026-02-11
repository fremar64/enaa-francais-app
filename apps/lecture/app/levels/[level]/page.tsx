import { notFound, redirect } from "next/navigation";
import { getCycleById, getLevelsByTrackAndCycle, getTrackById, buildActivityUrl } from "@packages/curriculum/navigation";
import { getPhonemeActivitiesByLevelId } from "@packages/activities/lecture";

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

  if (!selectedLevel) {
    notFound();
  }

  const activities = getPhonemeActivitiesByLevelId(selectedLevel.id);
  const firstActivity = activities[0];

  if (!firstActivity) {
    notFound();
  }

  const content = firstActivity.createContent();
  redirect(
    buildActivityUrl({
      domainId: "langue",
      trackId: "initiation-lecture-ecriture",
      levelId: selectedLevel.id,
      activityType: "phoneme",
      params: { phonemeId: String(content.phonemeId) }
    })
  );
}
