"use client";

import { useRouter } from "next/navigation";
import { PhonemeGrid } from "../../../components/PhonemeGrid";
import type { LectureActivityDefinition } from "@packages/activities/lecture";

interface LevelClientProps {
  levelLabel: string;
  levelSlug: string;
  activities: LectureActivityDefinition[];
}

export function LevelClient({ levelLabel, levelSlug, activities }: LevelClientProps) {
  const router = useRouter();

  const handleSelectPhoneme = (activity: LectureActivityDefinition) => {
    const content = activity.createContent();
    router.push(`/levels/${levelSlug}/phonemes/${content.phonemeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background py-8">
      <PhonemeGrid
        levelLabel={levelLabel}
        activities={activities}
        onSelectPhoneme={handleSelectPhoneme}
        onBack={() => router.push("/")}
      />
    </div>
  );
}
