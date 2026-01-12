'use client';

import { Clock, Music, Play, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { ChansonDisplay } from "@/hooks/useChansons";
import Link from "next/link";

interface SongCardProps {
  song: ChansonDisplay;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/chanson/${song.id}`}>
      <Card className="group overflow-hidden border-0 bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={song.pochette}
            alt={`${song.titre} - ${song.artiste}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="lg"
              className="rounded-full h-14 w-14 gradient-accent shadow-glow"
            >
              <Play className="h-6 w-6 ml-1" fill="currentColor" />
            </Button>
          </div>

          {/* Level Badge */}
          <div className="absolute top-3 left-3">
            <LevelBadge level={song.niveauCECRL} size="sm" />
          </div>

          {/* Duration */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/80 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            {formatDuration(song.duree)}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title & Artist */}
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {song.titre}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{song.artiste}</p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {song.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs font-normal">
                {g}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{song.nombreSeances} séances</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Music className="h-3.5 w-3.5" />
              <span>{song.annee}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
