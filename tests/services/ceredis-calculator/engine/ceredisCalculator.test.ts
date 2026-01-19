import { describe, it, expect } from 'vitest';
import * as ceredisEngine from '../../../../services/ceredis-calculator/engine';
import ceredisConfig from '../../../../services/ceredis-calculator/config/config';

const evidences = [
  { competencyId: 'C1', type: 'P1', score: 80 },
  { competencyId: 'C1', type: 'P2', score: 90 },
  { competencyId: 'C2', type: 'P1', score: 70 },
  { competencyId: 'C2', type: 'P3', score: 85 },
  { competencyId: 'C3', type: 'P4', score: 60 },
];

describe('CEREDIS Engine', () => {
  it('calcule un score CEREDIS cohérent', () => {
    const grouped = ceredisEngine.aggregateEvidence(evidences);
    const compScores = ceredisEngine.calculateAllCompetencyScores(grouped, ceredisConfig);
    const domainScores = ceredisEngine.calculateAllDomainScores(compScores, ceredisConfig);
    const ceredisScore = ceredisEngine.calculateCeredisScore(domainScores, ceredisConfig);
    expect(typeof ceredisScore).toBe('number');
    expect(ceredisScore).toBeGreaterThanOrEqual(0);
    expect(ceredisScore).toBeLessThanOrEqual(600);
  });

  it('décide un niveau CECRL', () => {
    const grouped = ceredisEngine.aggregateEvidence(evidences);
    const compScores = ceredisEngine.calculateAllCompetencyScores(grouped, ceredisConfig);
    const domainScores = ceredisEngine.calculateAllDomainScores(compScores, ceredisConfig);
    const ceredisScore = ceredisEngine.calculateCeredisScore(domainScores, ceredisConfig);
    const cecrlLevel = ceredisEngine.decideCECRL(ceredisScore, ceredisConfig);
    expect(['A1','A2','B1','B2','C1','C2',null]).toContain(cecrlLevel);
  });
});
