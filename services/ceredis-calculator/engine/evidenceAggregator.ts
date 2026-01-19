/**
 * Evidence Aggregator - Regrouper les preuves par compétence
 * TypeScript version
 */

export interface Evidence {
  competencyId: string;
  type: 'P1' | 'P2' | 'P3' | 'P4';
  score: number;
  [key: string]: any;
}

export function aggregateEvidence(evidences: Evidence[]): Record<string, Evidence[]> {
  const byCompetency: Record<string, Evidence[]> = {};
  for (const evidence of evidences) {
    const competencyId = evidence.competencyId;
    if (!byCompetency[competencyId]) {
      byCompetency[competencyId] = [];
    }
    byCompetency[competencyId].push(evidence);
  }
  return byCompetency;
}

export function aggregateEvidenceByType(evidences: Evidence[]): Record<'P1'|'P2'|'P3'|'P4', Evidence[]> {
  const byType: Record<'P1'|'P2'|'P3'|'P4', Evidence[]> = {
    P1: [],
    P2: [],
    P3: [],
    P4: []
  };
  for (const evidence of evidences) {
    const type = evidence.type;
    if (byType[type]) {
      byType[type].push(evidence);
    }
  }
  return byType;
}

export function getEvidenceTypes(evidences: Evidence[]): string[] {
  const types = new Set<string>();
  for (const evidence of evidences) {
    types.add(evidence.type);
  }
  return Array.from(types);
}
