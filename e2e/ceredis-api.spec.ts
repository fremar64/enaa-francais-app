import { test, expect } from '@playwright/test';

const evidences = [
  { competencyId: 'C1', type: 'P1', score: 80 },
  { competencyId: 'C1', type: 'P2', score: 90 },
  { competencyId: 'C2', type: 'P1', score: 70 },
  { competencyId: 'C2', type: 'P3', score: 85 },
  { competencyId: 'C3', type: 'P4', score: 60 },
];

test('POST /api/ceredis/calculate retourne un score CEREDIS et un niveau CECRL', async ({ request }) => {
  const response = await request.post('/api/ceredis/calculate', {
    data: { evidences },
  });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(typeof data.ceredisScore).toBe('number');
  expect(data.cecrlLevel).toBeDefined();
  expect(data.domainScores).toBeDefined();
  expect(data.compScores).toBeDefined();
  expect(['A1','A2','B1','B2','C1','C2',null]).toContain(data.cecrlLevel);
});
