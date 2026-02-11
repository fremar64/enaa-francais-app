"use client";

import { useRouter } from "next/navigation";
import type { LectureActivityContent } from "@packages/activities/lecture";
import { ExerciseSelector } from "../../../../../components/exercises/ExerciseSelector";

interface PhonemeClientProps {
  levelSlug: string;
  phoneme: LectureActivityContent;
}

export function PhonemeClient({ levelSlug, phoneme }: PhonemeClientProps) {
  const router = useRouter();

  return (
    <ExerciseSelector
      phoneme={phoneme}
      onSelectExercise={(exercise) =>
        router.push(`/levels/${levelSlug}/phonemes/${phoneme.phonemeId}/exercises/${exercise}`)
      }
      onBack={() => router.push(`/levels/${levelSlug}`)}
    />
  );
}
