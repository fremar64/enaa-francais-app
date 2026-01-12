'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  error: string | null;
  currentSrc: string | null;
}

interface AudioContextType extends AudioState {
  // Actions
  load: (src: string) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  // Utilitaires
  formatTime: (seconds: number) => string;
}

const initialState: AudioState = {
  isPlaying: false,
  isLoading: false,
  isLoaded: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  error: null,
  currentSrc: null,
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AudioState>(initialState);
  const howlRef = useRef<Howl | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mise à jour du temps courant pendant la lecture
  const updateCurrentTime = useCallback(() => {
    if (howlRef.current && state.isPlaying) {
      const currentTime = howlRef.current.seek() as number;
      setState(prev => ({ ...prev, currentTime }));
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state.isPlaying, updateCurrentTime]);

  const load = useCallback((src: string) => {
    // Si c'est la même source et déjà chargée, ne rien faire
    if (state.currentSrc === src && state.isLoaded) {
      return;
    }

    // Nettoyer l'ancien Howl
    if (howlRef.current) {
      howlRef.current.unload();
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      isLoaded: false,
      error: null,
      currentSrc: src,
      currentTime: 0,
      duration: 0,
    }));

    const howl = new Howl({
      src: [src],
      html5: true, // Streaming pour les gros fichiers
      volume: state.volume,
      onload: () => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isLoaded: true,
          duration: howl.duration(),
        }));
      },
      onloaderror: (_, error) => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: `Erreur de chargement: ${error}`,
        }));
      },
      onplayerror: (_, error) => {
        setState(prev => ({
          ...prev,
          isPlaying: false,
          error: `Erreur de lecture: ${error}`,
        }));
      },
      onplay: () => {
        setState(prev => ({ ...prev, isPlaying: true }));
      },
      onpause: () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      },
      onstop: () => {
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      },
      onend: () => {
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      },
    });

    howlRef.current = howl;
  }, [state.currentSrc, state.isLoaded, state.volume]);

  const play = useCallback(() => {
    if (howlRef.current && state.isLoaded) {
      howlRef.current.play();
    }
  }, [state.isLoaded]);

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const stop = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.stop();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (howlRef.current) {
      howlRef.current.seek(time);
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (howlRef.current) {
      howlRef.current.volume(clampedVolume);
    }
    setState(prev => ({ 
      ...prev, 
      volume: clampedVolume,
      isMuted: clampedVolume === 0,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    if (howlRef.current) {
      const newMuted = !state.isMuted;
      howlRef.current.mute(newMuted);
      setState(prev => ({ ...prev, isMuted: newMuted }));
    }
  }, [state.isMuted]);

  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const value: AudioContextType = {
    ...state,
    load,
    play,
    pause,
    toggle,
    stop,
    seek,
    setVolume,
    toggleMute,
    formatTime,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

// Hook pour synchroniser les paroles avec l'audio
export function useLyricSync(
  lyrics: Array<{ timestamp: number }>,
  currentTime: number
): number {
  let activeIndex = -1;
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].timestamp) {
      activeIndex = i;
      break;
    }
  }
  return activeIndex;
}
