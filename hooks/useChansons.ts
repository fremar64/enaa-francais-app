import { useState, useEffect, useCallback } from 'react';
import { pb, Chanson as PBChanson, getChansons, createSlug } from '@/lib/pocketbase';
import { Chanson as MockChanson } from '@/data/mockSongs';

// Import des données de parcours locaux
import cestTaChanceParcours from '@/data/parcours/cest-ta-chance';
import leCoureurParcours from '@/data/parcours/le-coureur';
import laBasParcours from '@/data/parcours/la-bas';

// Type unifié pour l'affichage (compatible avec les cartes existantes)
export interface ChansonDisplay {
  id: string;
  slug: string; // Slug pour les URLs (ex: "cest-ta-chance")
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

// Données de fallback depuis les parcours locaux
const LOCAL_PARCOURS_DATA: ChansonDisplay[] = [
  {
    id: 'cest-ta-chance',
    slug: 'cest-ta-chance',
    titre: cestTaChanceParcours.meta.titre,
    artiste: cestTaChanceParcours.meta.artiste,
    album: cestTaChanceParcours.meta.album,
    annee: cestTaChanceParcours.meta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/cest-ta-chance.mp3',
    niveauCECRL: 'B1',
    typeTexte: 'argumentatif',
    thematiques: ['résilience', 'émancipation sociale', 'encouragement'],
    duree: 195,
    nombreSeances: cestTaChanceParcours.stats.nombreSeances,
    competencesCibles: ['compréhension orale', 'expression écrite', 'débat']
  },
  {
    id: 'le-coureur',
    slug: 'le-coureur',
    titre: leCoureurParcours.meta.titre,
    artiste: leCoureurParcours.meta.artiste,
    album: leCoureurParcours.meta.album || 'Non homologué',
    annee: leCoureurParcours.meta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/le-coureur.mp3',
    niveauCECRL: 'B2',
    typeTexte: 'narratif',
    thematiques: ['mondialisation', 'déracinement', 'identité'],
    duree: 280,
    nombreSeances: leCoureurParcours.stats.nombreSeances,
    competencesCibles: ['compréhension écrite', 'analyse', 'production écrite']
  },
  {
    id: 'la-bas',
    slug: 'la-bas',
    titre: laBasParcours.meta.titre,
    artiste: laBasParcours.meta.artiste,
    album: laBasParcours.meta.album || 'Entre gris clair et gris foncé',
    annee: laBasParcours.meta.annee,
    genre: ['pop', 'chanson française'],
    pochette: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
    audioUrl: '/audio/chansons/jean-jacques-goldman/la-bas.mp3',
    niveauCECRL: 'B2',
    typeTexte: 'poétique',
    thematiques: ['voyage', 'liberté', 'ailleurs'],
    duree: 300,
    nombreSeances: laBasParcours.stats.nombreSeances,
    competencesCibles: ['compréhension orale', 'vocabulaire', 'expression']
  }
];

// Convertit une chanson PocketBase vers le format d'affichage
function convertPBToDisplay(chanson: PBChanson, seanceCount: number = 0): ChansonDisplay {
  // Convertir points_grammaire en strings si ce sont des objets
  let competences: string[] = [];
  if (chanson.points_grammaire) {
    if (Array.isArray(chanson.points_grammaire)) {
      competences = chanson.points_grammaire.map(p => {
        if (typeof p === 'string') return p;
        if (typeof p === 'object' && p !== null && 'point' in p) {
          return p.point as string;
        }
        return '';
      }).filter(Boolean);
    }
  }

  return {
    id: chanson.id,
    slug: createSlug(chanson.titre),
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
    competencesCibles: competences,
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

      // Essayer d'abord de charger depuis PocketBase
      try {
        const result = await getChansons({
          niveau: options.niveau || undefined,
          genre: options.genre || undefined,
          theme: options.theme || undefined,
          search: options.search,
        });

        if (result.items.length > 0) {
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
          return;
        }
      } catch (pbError) {
        console.log('PocketBase non disponible, utilisation des données locales');
      }

      // Fallback : utiliser les données locales des parcours
      let localChansons = [...LOCAL_PARCOURS_DATA];

      // Appliquer les filtres si nécessaire
      if (options.niveau) {
        localChansons = localChansons.filter(c => c.niveauCECRL === options.niveau);
      }
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        localChansons = localChansons.filter(c => 
          c.titre.toLowerCase().includes(searchLower) ||
          c.artiste.toLowerCase().includes(searchLower) ||
          c.thematiques.some(t => t.toLowerCase().includes(searchLower))
        );
      }

      setChansons(localChansons);
    } catch (err) {
      console.error('Erreur lors du chargement des chansons:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      // En cas d'erreur, toujours fournir les données locales
      setChansons(LOCAL_PARCOURS_DATA);
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
