/**
 * CECRL Decider - Déterminer le niveau CECRL
 * TypeScript version
 */
import { CeredisConfig } from './competencyCalculator';

export function decideCECRL(
  ceredisScore: number,
  config: CeredisConfig
): string | null {
  const thresholds = config.cecrlThresholds as Record<string, [number, number]>;
  for (const [level, [min, max]] of Object.entries(thresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level;
    }
  }
  if (ceredisScore < 200) return 'A1';
  if (ceredisScore >= 600) return 'C2';
  return null;
}

export function decideCECRLStrict(
  ceredisScore: number,
  domainScores: Record<string, number>,
  evidenceTypesPresent: string[],
  config: CeredisConfig
): string {
  const orderedLevels = ['C1', 'B2', 'B1', 'A2'];
  for (const level of orderedLevels) {
    const [min, max] = (config.cecrlThresholds as Record<string, [number, number]>)[level] || [0, 0];
    if (ceredisScore >= min && ceredisScore <= max) {
      if (validateLevelRequirements(level, ceredisScore, domainScores, evidenceTypesPresent, config)) {
        return level;
      }
    }
  }
  return decideCECRL(ceredisScore, config) ?? 'A1';
}

export function validateLevelRequirements(
  level: string,
  ceredisScore: number,
  domainScores: Record<string, number>,
  evidenceTypesPresent: string[],
  config: CeredisConfig
): boolean {
  // Implémentation à compléter selon les règles institutionnelles
  // Placeholder : toujours vrai
  return true;
}
