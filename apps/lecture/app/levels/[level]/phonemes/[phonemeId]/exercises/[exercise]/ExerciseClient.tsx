"use client";

import { useRouter } from "next/navigation";
import type { Phoneme } from "@packages/lecture-curriculum";
import { AudioExercise } from "../../../../../../../components/exercises/AudioExercise";
import { PositionExercise } from "../../../../../../../components/exercises/PositionExercise";
import { DictationExercise } from "../../../../../../../components/exercises/DictationExercise";

interface ExerciseClientProps {
  levelSlug: string;
  phoneme: Phoneme;
  exercise: "audio" | "position" | "dictation";
}

export function ExerciseClient({ levelSlug, phoneme, exercise }: ExerciseClientProps) {
  const router = useRouter();

  const handleComplete = () => {
    router.push(`/levels/${levelSlug}/phonemes/${phoneme.id}`);
  };

  const handleBack = () => {
    router.push(`/levels/${levelSlug}/phonemes/${phoneme.id}`);
  };

  if (exercise === "audio") {
    return (
      <AudioExercise
        phoneme={phoneme}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    );
  }

  if (exercise === "dictation") {
    return (
      <DictationExercise
        phoneme={phoneme}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    );
  }

  return (
    <PositionExercise
      phoneme={phoneme}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}
