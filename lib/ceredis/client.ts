// Client pour appeler l'API CEREDIS depuis le frontend
export async function calculateCeredis(evidences: any[]) {
  const res = await fetch('/api/ceredis/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evidences })
  });
  if (!res.ok) throw new Error('Erreur API CEREDIS');
  return await res.json();
}
