import type { CeredisResult } from '@/services/ceredis-calculator/types';

/**
 * Calcule le score CEREDIS pour un utilisateur
 *
 * @param userId ID de l'utilisateur
 * @returns Résultat CEREDIS
 */
export async function calculateUserScore(
  userId: string
): Promise<CeredisResult> {
  const response = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || 'Failed to calculate score');
  }

  return response.json();
}

/**
 * Récupère le score CEREDIS mis en cache
 *
 * @param userId ID de l'utilisateur
 * @returns Résultat CEREDIS ou null
 */
export async function getCachedUserScore(
  userId: string
): Promise<CeredisResult | null> {
  try {
    const response = await fetch(`/api/ceredis/calculate?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

/**
 * Alias pour calculateUserScore (compatibilité)
 */
export const calculateCeredisScore = calculateUserScore;
