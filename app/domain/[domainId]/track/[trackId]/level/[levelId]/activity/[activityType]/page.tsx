"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createActivity } from "@/packages/activities";
import { ActivityRenderer } from "@/packages/ui/ActivityRenderer";

const buildParams = (searchParams: URLSearchParams) => {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export default function ActivityPage() {
  const routeParams = useParams();
  const searchParams = useSearchParams();

  const domainId = routeParams.domainId as string | undefined;
  const trackId = routeParams.trackId as string | undefined;
  const levelId = routeParams.levelId as string | undefined;
  const activityType = routeParams.activityType as string | undefined;

  const params = useMemo(() => {
    const base = buildParams(searchParams);
    if (levelId) {
      base.level = levelId;
    }
    return base;
  }, [levelId, searchParams]);

  const activity = useMemo(() => {
    if (!trackId || !activityType) {
      return null;
    }
    return createActivity(`${trackId}:${activityType}`, params);
  }, [activityType, params, trackId]);

  if (!domainId || !trackId || !levelId || !activityType) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Parametres invalides.
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Activite introuvable.
      </div>
    );
  }

  return <ActivityRenderer activity={activity} />;
}