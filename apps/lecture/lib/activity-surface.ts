import type { ActivityEvaluationSurface } from "@packages/activity-contract";

export type ActivitySurfaceEnvelope = {
  activityId: string;
  levelId: string;
  exercise: string;
  timestamp: number;
  surface: ActivityEvaluationSurface;
};

type GlobalSurfaceStore = {
  __lectureActivitySurfaces?: ActivitySurfaceEnvelope[];
};

export const emitActivitySurface = (payload: ActivitySurfaceEnvelope) => {
  if (typeof window === "undefined") {
    return;
  }

  const store = window as GlobalSurfaceStore;
  if (!store.__lectureActivitySurfaces) {
    store.__lectureActivitySurfaces = [];
  }

  store.__lectureActivitySurfaces.push(payload);
  console.info("[LectureActivitySurface]", payload);

  void fetch("/api/lecture/activity-surfaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch((error) => {
    console.warn("[LectureActivitySurface] send failed", error);
  });
};
