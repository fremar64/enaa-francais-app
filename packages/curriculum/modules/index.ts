import { conjugaisonActivities } from "./conjugaison";
import type { ActivityMetadata } from "../../activity-contract";

export type CurriculumActivitySelection = {
	domainId?: string;
	trackId?: string;
	cycleId?: string;
	levelId?: string;
};

export { conjugaisonActivities } from "./conjugaison";

export const curriculumActivities = [...conjugaisonActivities];

export const getCurriculumActivitiesBySelection = (
	selection: CurriculumActivitySelection
): ActivityMetadata[] =>
	curriculumActivities.filter((activity) => {
		if (selection.domainId && activity.domainId !== selection.domainId) {
			return false;
		}
		if (selection.trackId && activity.trackId !== selection.trackId) {
			return false;
		}
		if (selection.cycleId && activity.cycleId !== selection.cycleId) {
			return false;
		}
		if (selection.levelId && activity.levelId !== selection.levelId) {
			return false;
		}
		return true;
	});

export const getCurriculumActivityById = (
	activityId: string
): ActivityMetadata | undefined =>
	curriculumActivities.find((activity) => activity.activityId === activityId);
