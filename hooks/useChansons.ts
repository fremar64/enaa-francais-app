import { useState, useEffect, useCallback } from 'react';
import { pb, Chanson as PBChanson, getChansons } from '@/lib/pocketbase';
import { Chanson as MockChanson } from '@/data/mockSongs';

// Type unifié pour l'affichage (compatible avec les cartes existantes)
export interface ChansonDisplay {
  id: string;
  titre: string;
  artiste: string;
  album?: string;
  annee: number;
  genre: string[];
  pochette: string;
  audioUrl?: string;
  niveauCECRL: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  typeTexte: 'narratif' | 'descriptif' | 'argumentatif' | 'poétique';
  thematiques: string[];
  duree: number;
  nombreSeances: number;
  competencesCibles: string[];
}

// Convertit une chanson PocketBase vers le format d'affichage
function convertPBToDisplay(chanson: PBChanson, seanceCount: number = 0): ChansonDisplay {
  return {
    id: chanson.id,
    titre: chanson.titre,
    artiste: chanson.artiste,
    album: chanson.album,
    annee: chanson.annee || new Date().getFullYear(),
    genre: chanson.genre || [],
    pochette: chanson.cover_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`,
    audioUrl: chanson.audio_url,
    niveauCECRL: chanson.niveau,
    typeTexte: 'poétique', // Par défaut pour les chansons
    thematiques: chanson.themes || [],
    duree: chanson.duree,
    nombreSeances: seanceCount,
    competencesCibles: chanson.points_grammaire || [],
  };
}

export interface UseChansonsOptions {
  niveau?: string | null;
  genre?: string | null;
  theme?: string | null;
  search?: string;
}

export interface UseChansonsResult {
  chansons: ChansonDisplay[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useChansons(options: UseChansonsOptions = {}): UseChansonsResult {
  const [chansons, setChansons] = useState<ChansonDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchChansons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getChansons({
        niveau: options.niveau || undefined,
        genre: options.genre || undefined,
        theme: options.theme || undefined,
        search: options.search,
      });

      // Récupérer le nombre de séances pour chaque chanson
      const chansonsWithSeances = await Promise.all(
        result.items.map(async (chanson) => {
          try {
            const seances = await pb.collection('seances').getList(1, 1, {
              filter: `chanson = "${chanson.id}" && actif = true`,
            });
            return convertPBToDisplay(chanson, seances.totalItems);
          } catch {
            return convertPBToDisplay(chanson, 0);
          }
        })
      );

      setChansons(chansonsWithSeances);
    } catch (err) {
      console.error('Erreur lors du chargement des chansons:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  }, [options.niveau, options.genre, options.theme, options.search]);

  useEffect(() => {
    fetchChansons();
  }, [fetchChansons]);

  return {
    chansons,
    loading,
    error,
    refetch: fetchChansons,
  };
}

// Hook pour récupérer une chanson spécifique avec ses séances
export function useChanson(id: string) {
  const [chanson, setChanson] = useState<PBChanson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        const result = await pb.collection('chansons').getOne<PBChanson>(id);
        setChanson(result);
      } catch (err) {
        console.error('Erreur lors du chargement de la chanson:', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetch();
    }
  }, [id]);

  return { chanson, loading, error };
}
