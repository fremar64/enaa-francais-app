import Link from "next/link";
import { BookOpen, ChevronRight, ListChecks } from "lucide-react";
import { getLevelByIdGlobal, getTrackById } from "@/packages/curriculum";

const LESSONS = [
  {
    id: "lecon-1",
    title: "Leçon 1",
    description: "Notions essentielles du niveau"
  },
  {
    id: "lecon-2",
    title: "Leçon 2",
    description: "Consolidation et entraînement"
  },
  {
    id: "lecon-3",
    title: "Leçon 3",
    description: "Mise en pratique guidée"
  }
];

type PageProps = {
  params: Promise<{
    discipline: string;
    niveau: string;
  }>;
};

export default async function LangueDisciplinePage({ params }: PageProps) {
  const { discipline, niveau } = await params;
  const track = getTrackById(discipline);
  const level = getLevelByIdGlobal(niveau);
  const disciplineLabel = track?.label ?? "Discipline";
  const niveauParam = niveau ?? "";
  const niveauLabel = level?.label ?? (niveauParam ? niveauParam.toUpperCase() : "Niveau");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container px-4 py-6">
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <BookOpen className="h-4 w-4" />
            Domaine connaissance de la langue
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            {disciplineLabel} — {niveauLabel}
          </h1>
          <p className="text-muted-foreground mt-2">
            Choisissez une leçon pour commencer la progression.
          </p>
        </div>
      </header>

      <main className="container px-4 py-10 space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ListChecks className="h-4 w-4" />
          Menu des leçons disponibles
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/langue/${discipline}/${niveau}/lecons/${lesson.id}`}
              className="group rounded-xl border p-5 transition hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{lesson.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lesson.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
