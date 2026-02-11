import type { ActivityMetadata } from "../../activity-contract";

export const conjugaisonActivities: ActivityMetadata[] = [
  {
    activityId: "conj-present-etre-cp",
    domainId: "langue",
    trackId: "conjugaison",
    cycleId: "primaire",
    levelId: "cp",
    activityType: "practice",
    modality: "text",
    competencies: [
      "https://ceredis.org/competency/cecrl/A1/production-ecrite/D001"
    ]
  },
  {
    activityId: "conj-present-avoir-ce1",
    domainId: "langue",
    trackId: "conjugaison",
    cycleId: "primaire",
    levelId: "ce1",
    activityType: "comprehension",
    modality: "text",
    competencies: [
      "https://ceredis.org/competency/cecrl/A1/production-ecrite/D002"
    ]
  }
];
