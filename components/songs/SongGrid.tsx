'use client';

import { useState, useMemo } from "react";
import { SongCard } from "./SongCard";
import { SongFilters, FilterState } from "./SongFilters";
import { useChansons } from "@/hooks/useChansons";
import { Loader2 } from "lucide-react";

export function SongGrid() {
  const [filters, setFilters] = useState<FilterState>({
    niveau: null,
    genre: null,
    thematique: null,
    typeTexte: null,
  });

  // Récupérer les chansons depuis PocketBase
  const { chansons, loading, error } = useChansons({
    niveau: filters.niveau,
    genre: filters.genre,
    theme: filters.thematique,
  });

  // Filtrer localement par typeTexte (pas dans PocketBase)
  const filteredSongs = useMemo(() => {
    if (!filters.typeTexte) return chansons;
    return chansons.filter((song) => song.typeTexte === filters.typeTexte);
  }, [chansons, filters.typeTexte]);

  // État de chargement
  if (loading) {
    return (
      <div className="space-y-6">
        <SongFilters onFilterChange={setFilters} />
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="ml-3 text-muted-foreground">Chargement des chansons...</span>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="space-y-6">
        <SongFilters onFilterChange={setFilters} />
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Erreur de chargement
          </h3>
          <p className="text-muted-foreground">
            Impossible de charger les chansons. Vérifiez votre connexion.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SongFilters onFilterChange={setFilters} />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredSongs.length}</span> chanson{filteredSongs.length !== 1 ? 's' : ''} disponible{filteredSongs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {filteredSongs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSongs.map((song, index) => (
            <div
              key={song.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SongCard song={song} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <span className="text-3xl">🎵</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Aucune chanson trouvée
          </h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos filtres pour découvrir plus de chansons.
          </p>
        </div>
      )}
    </div>
  );
}
