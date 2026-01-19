/**
 * Competency Calculator - Calculer le score d'une compétence
 * TypeScript version
 */
import { Evidence } from './evidenceAggregator';

export interface CeredisConfig {
  evidenceWeights: Record<string, number>;
  [key: string]: any;
}

export function calculateCompetencyScore(
  evidences: Evidence[],
  config: CeredisConfig
): { score: number; evidenceTypes: string[]; count: number } {
  if (!evidences || evidences.length === 0) {
    return {
      score: 0,
      evidenceTypes: [],
      count: 0
    };
  }
  const weights = config.evidenceWeights;
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const evidenceTypes = new Set<string>();
  for (const evidence of evidences) {
    const weight = weights[evidence.type] || 0;
    const score = evidence.score;
    totalWeightedScore += score * weight;
    totalWeight += weight;
    evidenceTypes.add(evidence.type);
  }
  const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  return {
    score: Math.round(finalScore * 100) / 100,
    evidenceTypes: Array.from(evidenceTypes),
    count: evidences.length
  };
}

export function calculateAllCompetencyScores(
  groupedEvidence: Record<string, Evidence[]>,
  config: CeredisConfig
): Record<string, { score: number; evidenceTypes: string[]; count: number }> {
  const scores: Record<string, { score: number; evidenceTypes: string[]; count: number }> = {};
  for (const [competencyId, evidences] of Object.entries(groupedEvidence)) {
    scores[competencyId] = calculateCompetencyScore(evidences, config);
  }
  return scores;
}
