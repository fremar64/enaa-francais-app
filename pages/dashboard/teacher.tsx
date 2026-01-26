import { useEffect, useState } from 'react';

// Types simplifiés pour la V1
interface StudentStat {
  userId: string;
  userName: string;
  totalActivities: number;
  avgScore: number;
  cecrlLevel: string;
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState<StudentStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    fetch('/api/analytics/teacher')
      .then(res => res.json())
      .then(data => {
        setStats(data.students || []);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard Enseignant - Learning Analytics</h1>
        <a
          href="/api/analytics/teacher/export?format=csv"
          className="px-4 py-2 bg-accent text-white rounded shadow hover:bg-accent/80 transition"
          download
        >
          Exporter CSV
        </a>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">Erreur : {error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Élève</th>
              <th className="px-4 py-2">Activités</th>
              <th className="px-4 py-2">Score moyen</th>
              <th className="px-4 py-2">Niveau CECRL</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(s => (
              <tr key={s.userId}>
                <td className="border px-4 py-2">{s.userName}</td>
                <td className="border px-4 py-2 text-center">{s.totalActivities}</td>
                <td className="border px-4 py-2 text-center">{s.avgScore}</td>
                <td className="border px-4 py-2 text-center">{s.cecrlLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
