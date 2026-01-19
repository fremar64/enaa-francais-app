import { useCeredisScore } from '@/hooks/useCeredisScore';
import { ScoreCard } from '@/components/dashboard/ScoreCard';
import { DomainRadar } from '@/components/dashboard/DomainRadar';
import { useState } from 'react';

export default function StudentDashboard() {
  const { loading, result, error, fetchScore } = useCeredisScore();
  const [evidences, setEvidences] = useState<any[]>([]);

  // Exemple d'appel (à remplacer par les vraies données)
  function handleCalculate() {
    fetchScore(evidences);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Élève - Score CEREDIS</h1>
      <button onClick={handleCalculate} className="px-4 py-2 bg-blue-600 text-white rounded mb-4">Calculer Score</button>
      {loading && <p>Calcul en cours...</p>}
      {error && <p className="text-red-600">Erreur : {error}</p>}
      {result && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScoreCard score={result.ceredisScore} cecrlLevel={result.cecrlLevelStrict} />
          <DomainRadar domainScores={result.domainScores} />
          <div className="col-span-2">
            <h2 className="text-xl font-semibold">Détails</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
