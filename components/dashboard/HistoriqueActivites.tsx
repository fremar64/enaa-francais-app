'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, Circle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activite {
  id: string;
  titre: string;
  parcours: string;
  score: number;
  date: string;
  type: string;
  statut: 'termine' | 'en_cours';
}

interface HistoriqueActivitesProps {
  activites: Activite[];
}

const TYPE_LABELS: Record<string, string> = {
  'comprehension': 'Compréhension',
  'production': 'Production',
  'interaction': 'Interaction',
  'grammaire': 'Grammaire',
  'vocabulaire': 'Vocabulaire',
  'inconnu': 'Activité',
};

export function HistoriqueActivites({ activites }: HistoriqueActivitesProps) {
  // Calculer la tendance
  const getTendance = (index: number) => {
    if (index === activites.length - 1 || activites.length < 2) return 'stable';
    
    const current = activites[index];
    const previous = activites[index + 1];
    
    if (current.statut !== 'termine' || previous.statut !== 'termine') return 'stable';
    
    const diff = current.score - previous.score;
    if (diff > 5) return 'up';
    if (diff < -5) return 'down';
    return 'stable';
  };

  // Si aucune activité
  if (activites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des Activités</CardTitle>
          <CardDescription>Vos dernières activités apparaîtront ici</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Aucune activité pour le moment
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Commencez un parcours pour voir votre progression
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Activités</CardTitle>
        <CardDescription>
          Vos {activites.length} dernières activités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activites.map((activite, index) => {
            const tendance = getTendance(index);
            
            return (
              <div
                key={activite.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                {/* Icône de statut */}
                <div className="mt-1">
                  {activite.statut === 'termine' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-orange-500" />
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {activite.titre}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {activite.parcours}
                      </p>
                    </div>
                    
                    {/* Score et tendance */}
                    {activite.statut === 'termine' && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={activite.score >= 80 ? 'default' : activite.score >= 60 ? 'secondary' : 'outline'}>
                          {activite.score}%
                        </Badge>
                        {tendance === 'up' && (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        )}
                        {tendance === 'down' && (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {tendance === 'stable' && index < activites.length - 1 && (
                          <Minus className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Métadonnées */}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {TYPE_LABELS[activite.type] || activite.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activite.date), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Afficher un message si plus d'activités disponibles */}
        {activites.length >= 10 && (
          <div className="text-center mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Affichage des 10 dernières activités
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
