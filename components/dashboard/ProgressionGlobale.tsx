'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Target, Clock, Award, Zap } from 'lucide-react';

interface ProgressionGlobaleProps {
  seancesTerminees: number;
  seancesEnCours: number;
  scoreMoyen: number;
  tempsTotal: number;
  scoreCeredis: number | null;
  niveauCecrl: string | null;
  tendance: 'up' | 'down' | 'stable';
}

export function ProgressionGlobale({
  seancesTerminees,
  seancesEnCours,
  scoreMoyen,
  tempsTotal,
  scoreCeredis,
  niveauCecrl,
  tendance,
}: ProgressionGlobaleProps) {
  // Calculer le progrès vers le niveau suivant
  const niveauxOrdre = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const niveauActuelIndex = niveauCecrl ? niveauxOrdre.indexOf(niveauCecrl) : 0;
  const niveauSuivant = niveauActuelIndex < niveauxOrdre.length - 1 
    ? niveauxOrdre[niveauActuelIndex + 1] 
    : null;

  // Calculer le progrès (simplifié)
  const progresVersNiveauSuivant = scoreCeredis 
    ? Math.min(100, ((scoreCeredis % 100) / 100) * 100)
    : 0;

  // Formater le temps
  const formatTemps = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const heures = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${heures}h${mins}m` : `${heures}h`;
  };

  // Icône de tendance
  const TendanceIcon = tendance === 'up' 
    ? TrendingUp 
    : tendance === 'down' 
    ? TrendingDown 
    : Minus;

  const tendanceColor = tendance === 'up'
    ? 'text-green-500'
    : tendance === 'down'
    ? 'text-red-500'
    : 'text-gray-400';

  const tendanceText = tendance === 'up'
    ? 'En progression'
    : tendance === 'down'
    ? 'En baisse'
    : 'Stable';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Progression Globale</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            <TendanceIcon className={`h-4 w-4 ${tendanceColor}`} />
            <span className={tendanceColor}>{tendanceText}</span>
          </div>
        </CardTitle>
        <CardDescription>
          Votre parcours d'apprentissage en un coup d'œil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Niveau CECRL et Score CEREDIS */}
          {niveauCecrl && scoreCeredis !== null && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Niveau CECRL</p>
                  <p className="text-3xl font-bold text-purple-600">{niveauCecrl}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Score CEREDIS</p>
                  <p className="text-2xl font-bold">{scoreCeredis}/600</p>
                </div>
              </div>
              
              {niveauSuivant && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Progrès vers {niveauSuivant}
                    </span>
                    <span className="font-medium">
                      {Math.round(progresVersNiveauSuivant)}%
                    </span>
                  </div>
                  <Progress value={progresVersNiveauSuivant} className="h-2" />
                </div>
              )}
            </div>
          )}

          {/* Statistiques en grille */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Séances terminées */}
            <div className="text-center p-4 rounded-lg border bg-card">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{seancesTerminees}</p>
              <p className="text-xs text-muted-foreground">
                Séances terminées
              </p>
            </div>

            {/* Séances en cours */}
            <div className="text-center p-4 rounded-lg border bg-card">
              <Zap className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{seancesEnCours}</p>
              <p className="text-xs text-muted-foreground">
                Séances en cours
              </p>
            </div>

            {/* Score moyen */}
            <div className="text-center p-4 rounded-lg border bg-card">
              <Award className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{scoreMoyen}%</p>
              <p className="text-xs text-muted-foreground">
                Score moyen
              </p>
            </div>

            {/* Temps total */}
            <div className="text-center p-4 rounded-lg border bg-card">
              <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{formatTemps(tempsTotal)}</p>
              <p className="text-xs text-muted-foreground">
                Temps d'étude
              </p>
            </div>
          </div>

          {/* Messages d'encouragement */}
          <div className="p-4 rounded-lg bg-accent/50 border">
            {seancesTerminees === 0 ? (
              <p className="text-sm text-center">
                🎯 Commencez votre premier parcours pour débloquer vos statistiques !
              </p>
            ) : scoreMoyen >= 80 ? (
              <p className="text-sm text-center">
                🌟 Excellent travail ! Vous maîtrisez bien les contenus.
              </p>
            ) : scoreMoyen >= 60 ? (
              <p className="text-sm text-center">
                💪 Bon travail ! Continuez à pratiquer pour progresser.
              </p>
            ) : (
              <p className="text-sm text-center">
                📚 Prenez votre temps et n'hésitez pas à réviser les notions.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
