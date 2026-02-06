"use client";

import { useRouter } from "next/navigation";
import type { Phoneme } from "@packages/lecture-curriculum";
import { ExerciseSelector } from "../../../../../components/exercises/ExerciseSelector";

interface PhonemeClientProps {
  levelSlug: string;
  phoneme: Phoneme;
}

export function PhonemeClient({ levelSlug, phoneme }: PhonemeClientProps) {
  const router = useRouter();

  return (
    <ExerciseSelector
      phoneme={phoneme}
      onSelectExercise={(exercise) =>
        router.push(`/levels/${levelSlug}/phonemes/${phoneme.id}/exercises/${exercise}`)
      }
      onBack={() => router.push(`/levels/${levelSlug}`)}
    />
  );
}
