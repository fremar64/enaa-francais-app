'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DOMAINS,
  buildActivityUrl,
  getActivityRoute,
  getCycleById,
  getCyclesByTrack,
  getCurriculumActivitiesBySelection,
  getDefaultActivityType,
  getDomainById,
  getLevelsByTrackAndCycle,
  getTrackById,
  getTracksByDomain
} from "@/packages/curriculum";
import type { NavigationSelection } from "@/packages/types/curriculum";
import { DomainCards } from "@/packages/ui/DomainCards";
import { TrackCards } from "@/packages/ui/TrackCards";
import { CycleSelector } from "@/packages/ui/CycleSelector";
import { LevelSelector } from "@/packages/ui/LevelSelector";

export default function Home() {
  const [selection, setSelection] = useState<NavigationSelection>({});

  const domain = useMemo(() => getDomainById(selection.domainId), [selection.domainId]);
  const track = useMemo(() => getTrackById(selection.trackId), [selection.trackId]);
  const cycle = useMemo(() => getCycleById(selection.cycleId), [selection.cycleId]);

  const tracks = useMemo(() => getTracksByDomain(domain?.id), [domain]);
  const cycles = useMemo(() => getCyclesByTrack(track), [track]);
  const levels = useMemo(() => getLevelsByTrackAndCycle(track, cycle), [track, cycle]);
  const activityType = useMemo(() => getDefaultActivityType(selection.trackId), [selection.trackId]);
  const curriculumActivities = useMemo(
    () => getCurriculumActivitiesBySelection(selection),
    [selection]
  );
  const defaultActivityId = curriculumActivities[0]?.activityId;
  const genericRoute = useMemo(() => {
    if (!selection.domainId || !selection.trackId || !selection.levelId) {
      return null;
    }

    if (!activityType || !defaultActivityId) {
      return null;
    }

    return buildActivityUrl({
      domainId: selection.domainId,
      trackId: selection.trackId,
      levelId: selection.levelId,
      activityType,
      params: { activityId: defaultActivityId }
    });
  }, [activityType, defaultActivityId, selection.domainId, selection.levelId, selection.trackId]);
  const routeFinale = useMemo(
    () => genericRoute ?? getActivityRoute(selection),
    [genericRoute, selection]
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src="/images/eleves.png"
          alt="Élèves en apprentissage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/30" />

        <div className="relative z-10 px-6 pt-8">
          <div className="mx-auto flex max-w-6xl items-start justify-between">
            <Image src="/images/ceredis.png" alt="Logo CEREDIS" width={140} height={48} />
            <Image
              src="/images/renouveau.png"
              alt="Logo Renouveau Pédagogique"
              width={140}
              height={48}
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-16 pt-16 text-center text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            Plateforme CEREDIS - Monorepo pédagogique
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl">
            Environnement numérique d&apos;apprentissage adaptatif du français
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-white/80">
            Choisissez un domaine d&apos;apprentissage, un niveau et un parcours pour accéder à vos activités.
          </p>
        </div>
      </section>

      <main className="container px-4 py-12 space-y-10">
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Choisir un domaine d&apos;apprentissage</h2>
            <p className="text-muted-foreground mt-2">
              Deux grands domaines structurent la progression CEREDIS.
            </p>
          </div>

          <DomainCards
            domains={DOMAINS}
            selectedId={selection.domainId}
            onSelect={(selectedDomain) =>
              setSelection({
                domainId: selectedDomain.id
              })
            }
          />
        </section>

        {domain && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">{domain.tracksLabel}</h3>
            <p className="text-sm text-muted-foreground">{domain.tracksDescription}</p>
            <TrackCards
              tracks={tracks}
              selectedId={selection.trackId}
              onSelect={(selectedTrack) =>
                setSelection({
                  domainId: domain.id,
                  trackId: selectedTrack.id
                })
              }
            />
          </section>
        )}

        {track && (
          <section className="space-y-6">
            <h3 className="text-xl font-semibold">Choisir un cycle</h3>
            <CycleSelector
              cycles={cycles}
              selectedId={selection.cycleId}
              onSelect={(selectedCycle) =>
                setSelection((prev) => ({
                  domainId: prev.domainId,
                  trackId: prev.trackId,
                  cycleId: selectedCycle.id
                }))
              }
            />
          </section>
        )}

        {cycle && (
          <section className="space-y-6">
            <h3 className="text-xl font-semibold">Choisir un niveau</h3>
            <LevelSelector
              levels={levels}
              selectedId={selection.levelId}
              onSelect={(selectedLevel) =>
                setSelection((prev) => ({
                  ...prev,
                  levelId: selectedLevel.id
                }))
              }
            />
          </section>
        )}

        <section className="rounded-2xl border bg-muted/30 p-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {domain
              ? "Sélectionnez un parcours complet pour accéder aux activités."
              : "Sélectionnez un domaine pour démarrer votre parcours."}
          </p>
          {routeFinale ? (
            <Link href={routeFinale}>
              <Button size="lg">Accéder aux activités</Button>
            </Link>
          ) : (
            <Button size="lg" disabled>
              Continuer
            </Button>
          )}
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground">
        <div className="container px-4 py-6 text-sm text-center">
          © 2025 CEREDIS - Renouveau Pédagogique
        </div>
      </footer>
    </div>
  );
}
