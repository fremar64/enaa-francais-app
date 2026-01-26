'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarCompetencesProps {
  domainesScores: Record<string, number>;
}

const DOMAINES_LABELS: Record<string, string> = {
  'D1': 'Compréhension orale',
  'D2': 'Compréhension écrite',
  'D3': 'Production écrite',
  'D4': 'Interaction',
  'D5': 'Métalinguistique',
};

export function RadarCompetences({ domainesScores }: RadarCompetencesProps) {
  // Préparer les données pour le graphique
  const data = Object.entries(domainesScores).map(([domain, score]) => ({
    domain: DOMAINES_LABELS[domain] || domain,
    score: score,
    fullMark: 100,
  }));

  // Calculer le score moyen
  const scores = Object.values(domainesScores);
  const moyenneGlobale = scores.length > 0
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;

  // Identifier le domaine le plus fort et le plus faible
  const maxDomain = Object.entries(domainesScores).reduce((max, [domain, score]) => 
    score > max.score ? { domain, score } : max
  , { domain: '', score: 0 });

  const minDomain = Object.entries(domainesScores).reduce((min, [domain, score]) => 
    (min.score === 0 || score < min.score) && score > 0 ? { domain, score } : min
  , { domain: '', score: 100 });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Radar des Compétences</CardTitle>
        <CardDescription>
          Vue d'ensemble de vos performances par domaine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Graphique Radar */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="domain" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Moyenne</p>
              <p className="text-2xl font-bold text-purple-600">{moyenneGlobale}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Point fort</p>
              <p className="text-sm font-semibold">
                {maxDomain.domain ? DOMAINES_LABELS[maxDomain.domain] : '-'}
              </p>
              <p className="text-lg font-bold text-green-600">{maxDomain.score}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">À améliorer</p>
              <p className="text-sm font-semibold">
                {minDomain.domain && minDomain.score < 100 ? DOMAINES_LABELS[minDomain.domain] : '-'}
              </p>
              {minDomain.score < 100 && (
                <p className="text-lg font-bold text-orange-600">{minDomain.score}%</p>
              )}
            </div>
          </div>

          {/* Légende des domaines */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Détail par domaine</p>
            <div className="space-y-1">
              {Object.entries(domainesScores).map(([domain, score]) => (
                <div key={domain} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {DOMAINES_LABELS[domain]}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="font-medium w-12 text-right">{score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
