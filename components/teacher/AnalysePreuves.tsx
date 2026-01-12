'use client';

/**
 * Composant AnalysePreuves
 * Liste des preuves P1-P4 pour une compétence donnée
 * 
 * Conforme au §3.5 du TABLEAU DE BORD ANALYTIQUE CEREDIS
 * "Permet à l'enseignant de comprendre un score, ajuster son évaluation,
 *  dialoguer pédagogiquement avec l'élève"
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Music,
  Calendar,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { PreuveDetail, TypePreuve, CompetenceCritique } from '@/types/teacher-dashboard';

interface AnalysePreuvesProps {
  preuves: PreuveDetail[];
  competenceSelectionnee?: CompetenceCritique | null;
  onViewPreuve?: (preuve: PreuveDetail) => void;
}

// Configuration des types de preuves selon le référentiel CEREDIS
const TYPE_PREUVE_CONFIG: Record<TypePreuve, { 
  label: string; 
  description: string; 
  color: string; 
  bgColor: string 
}> = {
  'P1': { 
    label: 'Réponse guidée', 
    description: 'Reconnaissance',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  'P2': { 
    label: 'Analyse linguistique', 
    description: 'Structuration',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  'P3': { 
    label: 'Production autonome', 
    description: 'Intégration',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  'P4': { 
    label: 'Métacognition', 
    description: 'Régulation',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
};

function getStatutConfig(statut: 'valide' | 'en_attente' | 'refuse') {
  switch (statut) {
    case 'valide':
      return { icon: CheckCircle, color: 'text-emerald-500', label: 'Validé' };
    case 'en_attente':
      return { icon: Clock, color: 'text-amber-500', label: 'En attente' };
    case 'refuse':
      return { icon: XCircle, color: 'text-red-500', label: 'Refusé' };
  }
}

// Statistiques des preuves par type
function PreuvesStats({ preuves }: { preuves: PreuveDetail[] }) {
  const stats = {
    P1: preuves.filter(p => p.type === 'P1').length,
    P2: preuves.filter(p => p.type === 'P2').length,
    P3: preuves.filter(p => p.type === 'P3').length,
    P4: preuves.filter(p => p.type === 'P4').length
  };
  
  const total = preuves.length;
  
  return (
    <div className="flex items-center gap-2">
      {(['P1', 'P2', 'P3', 'P4'] as TypePreuve[]).map(type => {
        const config = TYPE_PREUVE_CONFIG[type];
        const count = stats[type];
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        
        return (
          <div 
            key={type}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-xs",
              config.bgColor,
              config.color
            )}
            title={`${config.label}: ${count} preuve${count > 1 ? 's' : ''} (${percentage}%)`}
          >
            <span className="font-bold">{type}</span>
            <span>{count}</span>
          </div>
        );
      })}
    </div>
  );
}

export function AnalysePreuves({ 
  preuves, 
  competenceSelectionnee,
  onViewPreuve 
}: AnalysePreuvesProps) {
  // Filtrer par compétence si sélectionnée
  const preuvesFiltered = competenceSelectionnee
    ? preuves.filter(p => p.competenceId === competenceSelectionnee.id)
    : preuves;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Analyse des Preuves
              {competenceSelectionnee && (
                <Badge variant="secondary" className="ml-2">
                  Compétence {competenceSelectionnee.id}
                </Badge>
              )}
            </CardTitle>
            {competenceSelectionnee && (
              <p className="text-sm text-muted-foreground mt-1">
                {competenceSelectionnee.nom}
              </p>
            )}
          </div>
          
          <PreuvesStats preuves={preuvesFiltered} />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {preuvesFiltered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Aucune preuve disponible</p>
            {competenceSelectionnee && (
              <p className="text-sm mt-1">
                Sélectionnez une autre compétence ou retirez le filtre
              </p>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="divide-y">
              {preuvesFiltered.map((preuve) => {
                const typeConfig = TYPE_PREUVE_CONFIG[preuve.type];
                const statutConfig = getStatutConfig(preuve.statut);
                const StatutIcon = statutConfig.icon;
                
                return (
                  <div 
                    key={preuve.id}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Badge Type */}
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                        typeConfig.bgColor,
                        typeConfig.color
                      )}>
                        {preuve.type}
                      </div>
                      
                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className={cn("text-sm font-medium", typeConfig.color)}>
                              {typeConfig.label}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ({typeConfig.description})
                            </span>
                          </div>
                          
                          {/* Score */}
                          <Badge 
                            variant={preuve.score >= 60 ? "default" : "destructive"}
                            className="flex-shrink-0"
                          >
                            {preuve.score}%
                          </Badge>
                        </div>
                        
                        {/* Métadonnées */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Music className="h-3 w-3" />
                            <span>{preuve.chanson}</span>
                          </div>
                          <span>•</span>
                          <span>{preuve.seance}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(preuve.date), 'dd MMM yyyy', { locale: fr })}</span>
                          </div>
                        </div>
                        
                        {/* Compétence et Statut */}
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            Comp. {preuve.competenceId}
                          </Badge>
                          
                          <div className="flex items-center gap-2">
                            <div className={cn("flex items-center gap-1 text-xs", statutConfig.color)}>
                              <StatutIcon className="h-3 w-3" />
                              <span>{statutConfig.label}</span>
                            </div>
                            
                            {onViewPreuve && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => onViewPreuve(preuve)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Voir détail
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

export default AnalysePreuves;
