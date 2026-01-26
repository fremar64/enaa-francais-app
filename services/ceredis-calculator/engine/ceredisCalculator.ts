/**
 * CEREDIS Calculator - Calculer le score global CEREDIS
 * TypeScript version
 */
import { CeredisConfig } from './competencyCalculator';

export function calculateCeredisScore(
  domainScores: Record<string, number>,
  config: CeredisConfig
): number {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const [domainId, score] of Object.entries(domainScores)) {
    const domainConfig = (config.domains as Record<string, { weight?: number }>)[domainId];
    if (!domainConfig) {
      continue;
    }
    const weight = domainConfig.weight || 0;
    weightedSum += score * weight;
    totalWeight += weight;
  }
  if (totalWeight === 0) {
    return 0;
  }
  const averageScore = weightedSum / totalWeight;
  const ceredisScore = averageScore * 6;
  return Math.round(ceredisScore * 100) / 100;
}

export function validateCeredisScore(
  score: number,
  config: CeredisConfig
): boolean {
  const min = config.scale?.min || 0;
  const max = config.scale?.max || 600;
  return score >= min && score <= max;
}
