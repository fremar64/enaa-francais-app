"use client";

import { useMemo, useState } from "react";
import type { ActivityDefinition } from "../activity-contract";
import { ActivityRunner } from "../activity-engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActivityRendererProps = {
  activity: ActivityDefinition;
};

export function ActivityRenderer({ activity }: ActivityRendererProps) {
  const [runner] = useState(() => new ActivityRunner());
  const [surface, setSurface] = useState<ReturnType<ActivityRunner["getSurface"]> | null>(null);

  const content = useMemo(() => activity.createContent(), [activity]);

  const handleValidate = () => {
    runner.recordSuccess();
    setSurface(runner.getSurface());
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activite</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Activity ID: {activity.metadata.activityId}</div>
            <div>Track: {activity.metadata.trackId}</div>
            <div>Niveau: {activity.metadata.levelId}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu genere</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-xs text-muted-foreground">
              {JSON.stringify(content, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Button onClick={handleValidate}>Valider</Button>
          {surface && (
            <Card>
              <CardHeader>
                <CardTitle>Surface d'evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-xs text-muted-foreground">
                  {JSON.stringify(surface, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}