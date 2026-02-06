"use client";

import { useRouter } from "next/navigation";
import { PhonemeGrid } from "../../../components/PhonemeGrid";
import type { Phoneme } from "@packages/lecture-curriculum";

interface LevelClientProps {
  level: "GS" | "CP" | "CE1";
  levelSlug: string;
}

export function LevelClient({ level, levelSlug }: LevelClientProps) {
  const router = useRouter();

  const handleSelectPhoneme = (phoneme: Phoneme) => {
    router.push(`/levels/${levelSlug}/phonemes/${phoneme.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background py-8">
      <PhonemeGrid
        level={level}
        onSelectPhoneme={handleSelectPhoneme}
        onBack={() => router.push("/")}
      />
    </div>
  );
}
