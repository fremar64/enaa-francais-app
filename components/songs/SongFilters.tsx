'use client';

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, thematiques } from "@/data/mockSongs";

interface SongFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  niveau: string | null;
  genre: string | null;
  thematique: string | null;
  typeTexte: string | null;
}

const niveaux = ['A2', 'B1', 'B2', 'C1'];
const typesTexte = ['narratif', 'descriptif', 'argumentatif', 'poétique'];

export function SongFilters({ onFilterChange }: SongFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    niveau: null,
    genre: null,
    thematique: null,
    typeTexte: null,
  });

  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | null) => {
    const newFilters = { ...filters, [key]: value === "all" ? null : value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { niveau: null, genre: null, thematique: null, typeTexte: null };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button (Mobile) */}
      <div className="flex items-center justify-between md:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtres
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center gradient-accent text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        )}
      </div>

      {/* Filter Selects */}
      <div className={`grid gap-3 md:grid-cols-4 ${showFilters ? 'grid' : 'hidden md:grid'}`}>
        {/* Niveau CECRL */}
        <Select
          value={filters.niveau || "all"}
          onValueChange={(value) => updateFilter("niveau", value)}
        >
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Niveau CECRL" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les niveaux</SelectItem>
            {niveaux.map((niveau) => (
              <SelectItem key={niveau} value={niveau}>
                {niveau}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Genre */}
        <Select
          value={filters.genre || "all"}
          onValueChange={(value) => updateFilter("genre", value)}
        >
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Genre musical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Thématique */}
        <Select
          value={filters.thematique || "all"}
          onValueChange={(value) => updateFilter("thematique", value)}
        >
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Thématique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les thématiques</SelectItem>
            {thematiques.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type de texte */}
        <Select
          value={filters.typeTexte || "all"}
          onValueChange={(value) => updateFilter("typeTexte", value)}
        >
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Type de texte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {typesTexte.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters (Desktop) */}
      {activeFiltersCount > 0 && (
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          {filters.niveau && (
            <Badge variant="secondary" className="gap-1">
              Niveau: {filters.niveau}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("niveau", null)}
              />
            </Badge>
          )}
          {filters.genre && (
            <Badge variant="secondary" className="gap-1">
              {filters.genre}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("genre", null)}
              />
            </Badge>
          )}
          {filters.thematique && (
            <Badge variant="secondary" className="gap-1">
              {filters.thematique}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("thematique", null)}
              />
            </Badge>
          )}
          {filters.typeTexte && (
            <Badge variant="secondary" className="gap-1 capitalize">
              {filters.typeTexte}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("typeTexte", null)}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground h-6 px-2"
          >
            Tout effacer
          </Button>
        </div>
      )}
    </div>
  );
}
