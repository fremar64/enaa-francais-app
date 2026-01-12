'use client';

/**
 * Composant ProgressionGlobale
 * Affiche les statistiques globales de progression de l'apprenant
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  BarChart3,
  Flame,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProgressionGlobale as ProgressionGlobaleType } from '@/types/dashboard';

interface ProgressionGlobaleProps {
  progression: ProgressionGlobaleType;
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  subValue,
  color = 'text-primary',
  highlight = false
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg border transition-colors",
      highlight ? "bg-primary/5 border-primary/20" : "bg-muted/30 hover:bg-muted/50"
    )}>
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
        highlight ? "bg-primary/10" : "bg-background"
      )}>
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
        )}
      </div>
    </div>
  );
}

function formatDuree(secondes: number): string {
  if (secondes < 60) return `${secondes}s`;
  const minutes = Math.floor(secondes / 60);
  if (minutes < 60) return `${minutes} min`;
  const heures = Math.floor(minutes / 60);
  const minutesRestantes = minutes % 60;
  if (heures < 24) {
    return minutesRestantes > 0 ? `${heures}h ${minutesRestantes}min` : `${heures}h`;
  }
  const jours = Math.floor(heures / 24);
  return `${jours}j ${heures % 24}h`;
}

function getNiveauLabel(niveau: string): { label: string; color: string } {
  const niveaux: Record<string, { label: string; color: string }> = {
    'A1': { label: 'Découverte', color: 'bg-emerald-500' },
    'A2': { label: 'Intermédiaire', color: 'bg-green-500' },
    'B1': { label: 'Seuil', color: 'bg-blue-500' },
    'B2': { label: 'Avancé', color: 'bg-indigo-500' },
    'C1': { label: 'Autonome', color: 'bg-purple-500' },
    'C2': { label: 'Maîtrise', color: 'bg-violet-500' }
  };
  return niveaux[niveau] || { label: niveau, color: 'bg-gray-500' };
}

export function ProgressionGlobale({ progression }: ProgressionGlobaleProps) {
  const niveauInfo = getNiveauLabel(progression.niveauActuel);
  const progressPercent = Math.min(100, progression.scoreGlobal);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Progression globale
          </CardTitle>
          <Badge className={cn(niveauInfo.color, "text-white")}>
            {progression.niveauActuel} — {niveauInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Barre de progression principale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Score global</span>
            <span className="font-bold text-lg">{progression.scoreGlobal}%</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <p className="text-xs text-muted-foreground text-right">
            {progression.competencesMaitrisees} compétences maîtrisées sur {progression.competencesTotales}
          </p>
        </div>

        {/* Grille de statistiques */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Award}
            label="Compétences maîtrisées"
            value={progression.competencesMaitrisees}
            subValue={`sur ${progression.competencesTotales} totales`}
            color="text-amber-500"
            highlight
          />
          
          <StatCard
            icon={Target}
            label="Activités complétées"
            value={progression.activitesCompletees}
            color="text-blue-500"
          />
          
          <StatCard
            icon={Clock}
            label="Temps d'apprentissage"
            value={formatDuree(progression.tempsTotal)}
            color="text-purple-500"
          />
          
          <StatCard
            icon={Star}
            label="Score moyen"
            value={`${progression.scoreGlobal}%`}
            color="text-emerald-500"
          />
        </div>

        {/* Indicateurs de tendance */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Série d'activités</p>
              <p className="text-xs text-muted-foreground">Continuez sur votre lancée !</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-emerald-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+5%</span>
            <span className="text-xs text-muted-foreground">cette semaine</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProgressionGlobale;
