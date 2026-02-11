"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivitySurfaceEnvelope } from "../../../lib/activity-surface";

type ApiResponse = {
  count: number;
  data: ActivitySurfaceEnvelope[];
};

export default function ActivitySurfacesDebugPage() {
  const [surfaces, setSurfaces] = useState<ActivitySurfaceEnvelope[]>([]);
  const [activityId, setActivityId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [autoPoll, setAutoPoll] = useState(false);

  const endpoint = useMemo(() => {
    const query = activityId.trim();
    return query
      ? `/api/lecture/activity-surfaces?activityId=${encodeURIComponent(query)}`
      : "/api/lecture/activity-surfaces";
  }, [activityId]);

  const fetchSurfaces = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(endpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return (await response.json()) as ApiResponse;
      })
      .then((payload) => {
        if (!cancelled) {
          setSurfaces(payload.data ?? []);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  useEffect(() => fetchSurfaces(), [fetchSurfaces, refreshIndex]);

  useEffect(() => {
    if (!autoPoll) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRefreshIndex((value) => value + 1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [autoPoll]);

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Activity Surfaces Debug</h1>
          <p className="text-sm text-muted-foreground">
            Stored surfaces from ActivityRunner.
          </p>
        </header>

        <section className="rounded-2xl border bg-card p-4 shadow-sm">
          <label className="text-sm font-medium text-foreground" htmlFor="activityId">
            Filter by activityId
          </label>
          <input
            id="activityId"
            value={activityId}
            onChange={(event) => setActivityId(event.target.value)}
            placeholder="phoneme-1"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setRefreshIndex((value) => value + 1)}
              className="rounded-lg border border-border px-3 py-2 text-sm text-foreground"
            >
              Refresh
            </button>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={autoPoll}
                onChange={(event) => setAutoPoll(event.target.checked)}
              />
              Auto-poll every 5s
            </label>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Surfaces</h2>
            <span className="text-sm text-muted-foreground">{surfaces.length} total</span>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
          )}

          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}

          {!loading && !error && surfaces.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">No surfaces stored.</p>
          )}

          {surfaces.length > 0 && (
            <pre className="mt-4 max-h-[500px] overflow-auto rounded-xl bg-muted/30 p-4 text-xs text-foreground">
              {JSON.stringify(surfaces, null, 2)}
            </pre>
          )}
        </section>
      </div>
    </main>
  );
}
