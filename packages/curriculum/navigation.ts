import type { Cycle, Domain, Level, NavigationSelection, Track } from "../types/curriculum";
import { CYCLES, DOMAINS, TRACKS } from "./curriculum";

export const getDomainById = (id?: string): Domain | undefined =>
  DOMAINS.find((domain) => domain.id === id);

export const getTrackById = (id?: string): Track | undefined =>
  TRACKS.find((track) => track.id === id);

export const getCycleById = (id?: string): Cycle | undefined =>
  CYCLES.find((cycle) => cycle.id === id);

export const getLevelById = (cycle: Cycle | undefined, id?: string): Level | undefined =>
  cycle?.levels.find((level) => level.id === id);

export const getLevelByIdGlobal = (id?: string): Level | undefined => {
  if (!id) {
    return undefined;
  }

  return CYCLES.flatMap((cycle) => cycle.levels).find((level) => level.id === id);
};

export const getTracksByDomain = (domainId?: string): Track[] => {
  if (!domainId) {
    return [];
  }

  return TRACKS.filter((track) => track.domainId === domainId);
};

export const getCyclesByTrack = (track: Track | undefined): Cycle[] => {
  if (!track) {
    return [];
  }

  return CYCLES.filter((cycle) => track.cycles.includes(cycle.id));
};

export const getLevelsByCycle = (cycle: Cycle | undefined): Level[] => {
  if (!cycle) {
    return [];
  }

  return cycle.levels;
};

export const getLevelsByTrackAndCycle = (track: Track | undefined, cycle: Cycle | undefined): Level[] => {
  if (!track || !cycle) {
    return [];
  }

  const levelIds = track.levelsByCycle?.[cycle.id];

  if (!levelIds) {
    return cycle.levels;
  }

  return cycle.levels.filter((level) => levelIds.includes(level.id));
};

export const getActivityRoute = (selection: NavigationSelection): string | null => {
  if (!selection.domainId || !selection.trackId || !selection.cycleId || !selection.levelId) {
    return null;
  }

  if (selection.domainId === "communication") {
    if (selection.trackId === "chansons" && selection.cycleId === "lycee") {
      return "/modules/chansons/lycee";
    }

    return `/activities/${selection.trackId}/${selection.cycleId}/${selection.levelId}`;
  }

  return `/langue/${selection.trackId}/${selection.levelId}`;
};

export const getDefaultActivityType = (trackId?: string): string | null => {
  if (!trackId) {
    return null;
  }

  if (trackId === "initiation-lecture-ecriture") {
    return "phoneme";
  }

  if (trackId === "conjugaison") {
    return "verbe";
  }

  return null;
};

export type ActivityUrlConfig = {
  domainId: string;
  trackId: string;
  levelId: string;
  activityType: string;
  params?: Record<string, string>;
};

export const buildActivityUrl = ({
  domainId,
  trackId,
  levelId,
  activityType,
  params
}: ActivityUrlConfig) => {
  const query = params ? new URLSearchParams(params).toString() : "";
  const base = `/domain/${domainId}/track/${trackId}/level/${levelId}/activity/${activityType}`;
  return query ? `${base}?${query}` : base;
};
