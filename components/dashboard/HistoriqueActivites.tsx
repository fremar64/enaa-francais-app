'use client';

/**
 * Composant HistoriqueActivites
 * Liste des dernières activités avec scores, dates et compétences travaillées
 */

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Clock,
  Music,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActiviteHistorique } from '@/types/dashboard';

interface HistoriqueActivitesProps {
  activites: ActiviteHistorique[];
  maxItems?: number;
  showHeader?: boolean;
}

// Mapping des types d'activités vers des icônes et labels
const TYPE_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  'qcm': { icon: CheckCircle2, label: 'QCM', color: 'text-blue-500' },
  'qcm_avec_justification': { icon: CheckCircle2, label: 'QCM Justifié', color: 'text-indigo-500' },
  'texte_trous': { icon: BookOpen, label: 'Texte à trous', color: 'text-green-500' },
  'texte_libre': { icon: BookOpen, label: 'Production', color: 'text-amber-500' },
  'journal_reflexif': { icon: BookOpen, label: 'Journal', color: 'text-purple-500' },
  'ordre_elements': { icon: BookOpen, label: 'Ordre', color: 'text-cyan-500' },
  'ecoute_decouverte': { icon: Music, label: 'Écoute', color: 'text-pink-500' },
  'ecoute_guidee': { icon: Music, label: 'Écoute guidée', color: 'text-rose-500' }
};

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] || { icon: BookOpen, label: type, color: 'text-gray-500' };
}

function getFeedbackConfig(feedback?: 'succes' | 'partiel' | 'echec') {
  switch (feedback) {
    case 'succes':
      return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    case 'partiel':
      return { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
    case 'echec':
      return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    default:
      return { icon: CheckCircle2, color: 'text-gray-400', bg: 'bg-gray-50', border: 'border-gray-200' };
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes > 0 ? `${remainingMinutes}` : ''}`;
}

export function HistoriqueActivites({ 
  activites, 
  maxItems = 10,
  showHeader = true 
}: HistoriqueActivitesProps) {
  const displayedActivites = activites.slice(0, maxItems);

  if (activites.length === 0) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Historique des activités
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Aucune activité pour le moment</p>
            <p className="text-sm mt-1">Commencez une séance pour voir votre historique</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Historique des activités
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {activites.length} activité{activites.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
      )}
      
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {displayedActivites.map((activite) => {
              const typeConfig = getTypeConfig(activite.type);
              const feedbackConfig = getFeedbackConfig(activite.feedback);
              const TypeIcon = typeConfig.icon;
              const FeedbackIcon = feedbackConfig.icon;
              
              return (
                <div 
                  key={activite.id}
                  className={cn(
                    "p-4 hover:bg-muted/50 transition-colors",
                    feedbackConfig.bg
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icône de feedback */}
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                      feedbackConfig.border,
                      "border-2 bg-white"
                    )}>
                      <FeedbackIcon className={cn("h-5 w-5", feedbackConfig.color)} />
                    </div>
                    
                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                      {/* Titre et score */}
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium text-sm truncate">
                          {activite.nom}
                        </h4>
                        <Badge 
                          variant={activite.score >= 80 ? "default" : activite.score >= 50 ? "secondary" : "destructive"}
                          className="flex-shrink-0"
                        >
                          {activite.score}%
                        </Badge>
                      </div>
                      
                      {/* Chanson et séance */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Music className="h-3 w-3" />
                        <span className="truncate">{activite.chanson}</span>
                        <span>•</span>
                        <span className="truncate">{activite.seance}</span>
                      </div>
                      
                      {/* Métadonnées */}
                      <div className="flex items-center gap-3 mt-2">
                        {/* Type d'activité */}
                        <div className="flex items-center gap-1 text-xs">
                          <TypeIcon className={cn("h-3 w-3", typeConfig.color)} />
                          <span className="text-muted-foreground">{typeConfig.label}</span>
                        </div>
                        
                        {/* Durée */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDuration(activite.duree)}</span>
                        </div>
                        
                        {/* Date relative */}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDistanceToNow(new Date(activite.date), { 
                            addSuffix: true, 
                            locale: fr 
                          })}
                        </span>
                      </div>
                      
                      {/* Compétences travaillées */}
                      {activite.competences.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {activite.competences.map((comp) => (
                            <Badge 
                              key={comp} 
                              variant="outline" 
                              className="text-[10px] px-1.5 py-0"
                            >
                              {comp}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default HistoriqueActivites;
