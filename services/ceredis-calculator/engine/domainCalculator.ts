/**
 * Domain Calculator - Calculer le score d'un domaine
 * TypeScript version
 */
import { CeredisConfig } from './competencyCalculator';

export interface DomainConfig {
  competencies: string[];
  weight?: number;
}

export function calculateDomainScore(
  domainConfig: DomainConfig,
  competencyScores: Record<string, { score: number }>
): number | null {
  let total = 0;
  let count = 0;
  for (const competencyId of domainConfig.competencies) {
    if (competencyScores[competencyId] && competencyScores[competencyId].score > 0) {
      total += competencyScores[competencyId].score;
      count++;
    }
  }
  if (count === 0) {
    return null;
  }
  const score = total / count;
  return Math.round(score * 100) / 100;
}

export function calculateAllDomainScores(
  competencyScores: Record<string, { score: number }>,
  config: CeredisConfig
): Record<string, number> {
  const domainScores: Record<string, number> = {};
  for (const [domainId, domainConfig] of Object.entries(config.domains as Record<string, DomainConfig>)) {
    const score = calculateDomainScore(domainConfig, competencyScores);
    if (score !== null) {
      domainScores[domainId] = score;
    }
  }
  return domainScores;
}
