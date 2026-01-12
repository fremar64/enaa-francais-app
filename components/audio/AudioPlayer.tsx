'use client';

import { useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src?: string;
  showVolume?: boolean;
  showTime?: boolean;
  compact?: boolean;
  className?: string;
  onTimeUpdate?: (time: number) => void;
}

export function AudioPlayer({
  src,
  showVolume = true,
  showTime = true,
  compact = false,
  className,
  onTimeUpdate,
}: AudioPlayerProps) {
  const {
    isPlaying,
    isLoading,
    isLoaded,
    currentTime,
    duration,
    volume,
    isMuted,
    error,
    load,
    toggle,
    seek,
    setVolume,
    toggleMute,
    formatTime,
  } = useAudio();

  // Charger l'audio quand src change
  useEffect(() => {
    if (src) {
      load(src);
    }
  }, [src, load]);

  // Callback pour la mise à jour du temps
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  }, [currentTime, onTimeUpdate]);

  if (error) {
    return (
      <div className={cn("flex items-center gap-2 text-destructive p-4 bg-destructive/10 rounded-lg", className)}>
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Button
          size="sm"
          variant="outline"
          onClick={toggle}
          disabled={!isLoaded}
          className="h-9 w-9 rounded-full p-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          )}
        </Button>
        
        {showTime && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(currentTime)}
          </span>
        )}
        
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([value]) => seek(value)}
          disabled={!isLoaded}
          className="flex-1"
        />
        
        {showTime && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatTime(duration)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        {/* Bouton Play/Pause */}
        <Button
          size="lg"
          onClick={toggle}
          disabled={!isLoaded}
          className="h-14 w-14 rounded-full gradient-accent shadow-glow"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6" fill="currentColor" />
          ) : (
            <Play className="h-6 w-6 ml-1" fill="currentColor" />
          )}
        </Button>

        {/* Barre de progression */}
        <div className="flex-1">
          {showTime && (
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span className="tabular-nums">{formatTime(currentTime)}</span>
              <span className="tabular-nums">{formatTime(duration)}</span>
            </div>
          )}
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={([value]) => seek(value)}
            disabled={!isLoaded}
            className="cursor-pointer"
          />
        </div>

        {/* Contrôle du volume */}
        {showVolume && (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              className="text-muted-foreground"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              max={100}
              step={1}
              onValueChange={([value]) => setVolume(value / 100)}
              className="w-24"
            />
          </div>
        )}
      </div>

      {/* Indicateur de lecture */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="w-1 bg-accent rounded-full animate-pulse"
              style={{
                height: `${8 + Math.random() * 8}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Composant pour les paroles synchronisées
interface SyncedLyricsProps {
  lyrics: Array<{ id: string; texte: string; timestamp: number }>;
  currentTime: number;
  onLyricClick?: (timestamp: number) => void;
  className?: string;
}

export function SyncedLyrics({
  lyrics,
  currentTime,
  onLyricClick,
  className,
}: SyncedLyricsProps) {
  // Trouver la ligne active
  let activeIndex = -1;
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].timestamp) {
      activeIndex = i;
      break;
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {lyrics.map((line, index) => (
        <p
          key={line.id}
          onClick={() => onLyricClick?.(line.timestamp)}
          className={cn(
            "text-lg cursor-pointer py-2 px-4 rounded-lg transition-all duration-300",
            index === activeIndex
              ? "bg-accent/10 text-accent font-medium scale-[1.02]"
              : index < activeIndex
              ? "text-muted-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          {line.texte}
        </p>
      ))}
    </div>
  );
}

// Mini player fixe en bas de page
interface MiniPlayerProps {
  songTitle: string;
  artistName: string;
  coverUrl?: string;
  className?: string;
}

export function MiniPlayer({
  songTitle,
  artistName,
  coverUrl,
  className,
}: MiniPlayerProps) {
  const {
    isPlaying,
    isLoading,
    isLoaded,
    currentTime,
    duration,
    toggle,
    seek,
    formatTime,
  } = useAudio();

  if (!isLoaded) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50",
      className
    )}>
      <div className="container px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Pochette */}
          {coverUrl && (
            <img
              src={coverUrl}
              alt={songTitle}
              className="h-12 w-12 rounded-lg object-cover"
            />
          )}

          {/* Info chanson */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{songTitle}</p>
            <p className="text-sm text-muted-foreground truncate">{artistName}</p>
          </div>

          {/* Temps */}
          <span className="text-xs text-muted-foreground tabular-nums hidden sm:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Contrôles */}
          <Button
            size="icon"
            onClick={toggle}
            className="h-10 w-10 rounded-full gradient-accent"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
            )}
          </Button>
        </div>

        {/* Barre de progression */}
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([value]) => seek(value)}
          className="mt-2"
        />
      </div>
    </div>
  );
}
