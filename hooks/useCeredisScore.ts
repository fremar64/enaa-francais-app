'use client';

import { useState } from 'react';
import { calculateCeredisScore } from '@/lib/ceredis/client';
import type { CeredisResult } from '@/services/ceredis-calculator/types';

/**
 * Hook pour calculer le score CEREDIS d'un utilisateur
 * via l'API qui utilise le moteur complet
 * 
 * @returns Hook state avec loading, result, error et fetchScore
 * 
 * @example
 * ```tsx
 * const { loading, result, error, fetchScore } = useCeredisScore();
 * 
 * useEffect(() => {
 *   if (userId) {
 *     fetchScore(userId);
 *   }
 * }, [userId]);
 * ```
 */
export function useCeredisScore() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CeredisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calcule le score CEREDIS pour un utilisateur
   * 
   * @param userId - ID de l'utilisateur
   */
  async function fetchScore(userId: string): Promise<void> {
    setLoading(true);
    setError(null);
    
    try {
      const data = await calculateCeredisScore(userId);
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Error fetching CEREDIS score:', err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, result, error, fetchScore };
}
