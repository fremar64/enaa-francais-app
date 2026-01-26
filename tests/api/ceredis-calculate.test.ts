import { describe, it, expect } from 'vitest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import handler from '../app/api/ceredis/calculate/route';

const evidences = [
  { competencyId: 'C1', type: 'P1', score: 80 },
  { competencyId: 'C1', type: 'P2', score: 90 },
  { competencyId: 'C2', type: 'P1', score: 70 },
  { competencyId: 'C2', type: 'P3', score: 85 },
  { competencyId: 'C3', type: 'P4', score: 60 },
];

describe('API /api/ceredis/calculate', () => {
  it('retourne un score CEREDIS et un niveau CECRL', async () => {
    // Simule une requête Next.js API Route
    const req = {
      json: async () => ({ evidences })
    } as unknown as NextRequest;
    const res = await handler.POST(req);
    const data = await res.json();
    expect(data.ceredisScore).toBeDefined();
    expect(data.cecrlLevel).toBeDefined();
    expect(data.domainScores).toBeDefined();
    expect(data.compScores).toBeDefined();
    expect(['A1','A2','B1','B2','C1','C2',null]).toContain(data.cecrlLevel);
  });
});
