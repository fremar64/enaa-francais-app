"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { LectureActivityContent } from "@packages/activities/lecture";
import { ActivityRunner } from "@packages/activity-engine";
import { emitActivitySurface } from "../../../../../../../lib/activity-surface";
import { AudioExercise } from "../../../../../../../components/exercises/AudioExercise";
import { PositionExercise } from "../../../../../../../components/exercises/PositionExercise";
import { DictationExercise } from "../../../../../../../components/exercises/DictationExercise";

interface ExerciseClientProps {
  levelSlug: string;
  phoneme: LectureActivityContent;
  exercise: "audio" | "position" | "dictation";
}

export function ExerciseClient({ levelSlug, phoneme, exercise }: ExerciseClientProps) {
  const router = useRouter();
  const runnerRef = useRef<ActivityRunner | null>(null);

  if (!runnerRef.current) {
    runnerRef.current = new ActivityRunner();
  }

  useEffect(() => {
    runnerRef.current?.start();
  }, []);

  const handleComplete = () => {
    const surface = runnerRef.current?.getSurface();
    if (surface) {
      emitActivitySurface({
        activityId: `phoneme-${phoneme.phonemeId}`,
        levelId: levelSlug,
        exercise,
        timestamp: Date.now(),
        surface
      });
    }
    router.push(`/levels/${levelSlug}/phonemes/${phoneme.phonemeId}`);
  };

  const handleBack = () => {
    runnerRef.current?.recordAbandon();
    const surface = runnerRef.current?.getSurface();
    if (surface) {
      emitActivitySurface({
        activityId: `phoneme-${phoneme.phonemeId}`,
        levelId: levelSlug,
        exercise,
        timestamp: Date.now(),
        surface
      });
    }
    router.push(`/levels/${levelSlug}/phonemes/${phoneme.phonemeId}`);
  };

  const handleAttempt = () => runnerRef.current?.recordAttempt();
  const handleError = (code: string) => runnerRef.current?.recordError(code);
  const handleSuccess = () => runnerRef.current?.recordSuccess();

  if (exercise === "audio") {
    return (
      <AudioExercise
        phoneme={phoneme}
        onComplete={handleComplete}
        onBack={handleBack}
        onAttempt={handleAttempt}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    );
  }

  if (exercise === "dictation") {
    return (
      <DictationExercise
        phoneme={phoneme}
        onComplete={handleComplete}
        onBack={handleBack}
        onAttempt={handleAttempt}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <PositionExercise
      phoneme={phoneme}
      onComplete={handleComplete}
      onBack={handleBack}
      onAttempt={handleAttempt}
      onError={handleError}
      onSuccess={handleSuccess}
    />
  );
}
