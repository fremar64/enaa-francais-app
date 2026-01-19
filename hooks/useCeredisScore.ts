import { useState } from 'react';
import { calculateCeredis } from '@/lib/ceredis/client';

export function useCeredisScore() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchScore(evidences: any[]) {
    setLoading(true);
    setError(null);
    try {
      const data = await calculateCeredis(evidences);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, result, error, fetchScore };
}
