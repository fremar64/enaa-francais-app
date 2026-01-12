'use client';

import Link from 'next/link';
import { Play, Clock, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Seance } from '@/types/seance';
import { cn } from '@/lib/utils';

interface SeancesListProps {
  seances: Seance[];
  chansonId: string;
}

export function SeancesList({ seances, chansonId }: SeancesListProps) {
  // Pour l'instant, toutes les séances sont accessibles
  // TODO: Gérer les prérequis et la progression de l'utilisateur
  const getSeanceStatus = (seance: Seance, index: number): 'accessible' | 'en_cours' | 'terminee' | 'verrouillee' => {
    // Simulation : la première séance est toujours accessible
    if (index === 0) return 'accessible';
    // Les autres sont accessibles aussi pour le moment (démo)
    return 'accessible';
  };

  if (seances.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Aucune séance n'est encore disponible pour cette chanson.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display flex items-center justify-between">
          <span>Séances disponibles</span>
          <Badge variant="secondary">{seances.length} séance{seances.length > 1 ? 's' : ''}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {seances.map((seance, index) => {
            const status = getSeanceStatus(seance, index);
            const isAccessible = status !== 'verrouillee';
            const isTerminee = status === 'terminee';

            return (
              <div
                key={seance.id}
                className={cn(
                  "p-4 transition-colors",
                  isAccessible && "hover:bg-muted/50",
                  !isAccessible && "opacity-60",
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Numéro de séance */}
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold",
                    isTerminee && "bg-green-500 text-white",
                    status === 'en_cours' && "bg-accent text-accent-foreground",
                    status === 'accessible' && "bg-primary text-primary-foreground",
                    status === 'verrouillee' && "bg-muted text-muted-foreground",
                  )}>
                    {isTerminee ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : status === 'verrouillee' ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      seance.numero
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground truncate">
                        {seance.titre}
                      </h3>
                      {status === 'en_cours' && (
                        <Badge variant="outline" className="shrink-0 text-xs">
                          En cours
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {seance.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {seance.dureeEstimee} min
                      </span>
                      <span>
                        {seance.ecrans.length} activités
                      </span>
                    </div>

                    {/* Barre de progression (si en cours) */}
                    {status === 'en_cours' && (
                      <div className="mt-3">
                        <Progress value={33} className="h-1" />
                        <p className="text-xs text-muted-foreground mt-1">
                          2/6 activités complétées
                        </p>
                      </div>
                    )}

                    {/* Objectifs (affichés sur hover ou toujours ?) */}
                    {seance.objectifs.length > 0 && (
                      <div className="mt-3 hidden group-hover:block">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Objectifs :</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          {seance.objectifs.slice(0, 2).map((obj, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-accent">•</span>
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {isAccessible ? (
                      <Link href={`/chanson/${chansonId}/seance/${seance.id}`}>
                        <Button
                          size="sm"
                          className={cn(
                            isTerminee && "bg-green-500 hover:bg-green-600",
                            status === 'en_cours' && "gradient-accent",
                            status === 'accessible' && !isTerminee && "gradient-accent",
                          )}
                        >
                          {isTerminee ? (
                            'Revoir'
                          ) : status === 'en_cours' ? (
                            'Continuer'
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" fill="currentColor" />
                              Commencer
                            </>
                          )}
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Lock className="h-4 w-4 mr-1" />
                        Verrouillée
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
