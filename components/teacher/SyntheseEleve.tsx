'use client';

/**
 * Composant SyntheseEleve
 * Affiche la synthèse d'un élève avec jauge CECRL, score CEREDIS et sparkline
 * 
 * Conforme au §3.2 du TABLEAU DE BORD ANALYTIQUE CEREDIS
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock, 
  Activity,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { SyntheseEleve as SyntheseEleveType, PointProgression } from '@/types/teacher-dashboard';
import type { NiveauCECRL } from '@/services/integration/types';

interface SyntheseEleveProps {
  eleve: SyntheseEleveType;
  compact?: boolean;
}

// Configuration des couleurs par niveau CECRL
const NIVEAU_CONFIG: Record<NiveauCECRL, { color: string; bgColor: string; borderColor: string }> = {
  'A1': { color: 'text-emerald-700', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-300' },
  'A2': { color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-300' },
  'B1': { color: 'text-blue-700', bgColor: 'bg-blue-100', borderColor: 'border-blue-300' },
  'B2': { color: 'text-indigo-700', bgColor: 'bg-indigo-100', borderColor: 'border-indigo-300' },
  'C1': { color: 'text-purple-700', bgColor: 'bg-purple-100', borderColor: 'border-purple-300' },
  'C2': { color: 'text-violet-700', bgColor: 'bg-violet-100', borderColor: 'border-violet-300' }
};

// Composant Jauge CECRL
function JaugeCECRL({ niveau, score }: { niveau: NiveauCECRL; score: number }) {
  const config = NIVEAU_CONFIG[niveau];
  
  // Calcul du pourcentage vers le niveau suivant
  const seuilsBas: Record<NiveauCECRL, number> = {
    'A1': 0, 'A2': 200, 'B1': 300, 'B2': 400, 'C1': 500, 'C2': 600
  };
  const seuilsHaut: Record<NiveauCECRL, number> = {
    'A1': 199, 'A2': 299, 'B1': 399, 'B2': 499, 'C1': 599, 'C2': 600
  };
  
  const bas = seuilsBas[niveau];
  const haut = seuilsHaut[niveau];
  const progressNiveau = Math.round(((score - bas) / (haut - bas)) * 100);

  return (
    <div className="flex flex-col items-center">
      {/* Cercle avec niveau */}
      <div className={cn(
        "relative w-24 h-24 rounded-full border-4 flex items-center justify-center",
        config.bgColor,
        config.borderColor
      )}>
        <span className={cn("text-3xl font-bold", config.color)}>
          {niveau}
        </span>
      </div>
      
      {/* Score CEREDIS */}
      <div className="mt-3 text-center">
        <p className="text-sm text-muted-foreground">Score CEREDIS</p>
        <p className="text-2xl font-bold">{score} <span className="text-sm font-normal text-muted-foreground">/ 600</span></p>
      </div>
      
      {/* Progression vers le niveau suivant */}
      {niveau !== 'C2' && (
        <div className="w-full mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{niveau}</span>
            <span>{progressNiveau}%</span>
            <span>{niveau === 'C1' ? 'C2' : niveau === 'B2' ? 'C1' : niveau === 'B1' ? 'B2' : niveau === 'A2' ? 'B1' : 'A2'}</span>
          </div>
          <Progress value={progressNiveau} className="h-2" />
        </div>
      )}
    </div>
  );
}

// Composant Sparkline SVG
function Sparkline({ data, width = 120, height = 40 }: { data: PointProgression[]; width?: number; height?: number }) {
  if (data.length < 2) return null;
  
  const scores = data.map(p => p.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore || 1;
  
  // Normaliser les points
  const points = data.map((p, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((p.score - minScore) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  
  // Couleur basée sur la tendance
  const tendance = scores[scores.length - 1] - scores[0];
  const color = tendance > 10 ? '#10B981' : tendance < -10 ? '#EF4444' : '#6B7280';

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Ligne de progression */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Point final */}
      <circle
        cx={(data.length - 1) / (data.length - 1) * width}
        cy={height - ((scores[scores.length - 1] - minScore) / range) * (height - 4) - 2}
        r="3"
        fill={color}
      />
    </svg>
  );
}

// Composant Tendance
function TendanceIndicateur({ tendance }: { tendance: 'hausse' | 'stable' | 'baisse' }) {
  const config = {
    hausse: { icon: TrendingUp, color: 'text-emerald-500', label: 'En progression' },
    stable: { icon: Minus, color: 'text-gray-500', label: 'Stable' },
    baisse: { icon: TrendingDown, color: 'text-red-500', label: 'En baisse' }
  };
  
  const { icon: Icon, color, label } = config[tendance];
  
  return (
    <div className="flex items-center gap-1">
      <Icon className={cn("h-4 w-4", color)} />
      <span className={cn("text-sm", color)}>{label}</span>
    </div>
  );
}

function formatDuree(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}min`;
  return `${minutes}min`;
}

export function SyntheseEleve({ eleve, compact = false }: SyntheseEleveProps) {
  const niveauConfig = NIVEAU_CONFIG[eleve.niveauCECRL];

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
            niveauConfig.bgColor,
            niveauConfig.color
          )}>
            {eleve.niveauCECRL}
          </div>
          <div>
            <p className="font-medium">{eleve.prenom} {eleve.nom}</p>
            <p className="text-xs text-muted-foreground">
              {eleve.scoreCEREDIS}/600 • {eleve.zoneProgression}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sparkline data={eleve.historiqueScores} width={80} height={30} />
          <TendanceIndicateur tendance={eleve.tendance} />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Synthèse de l'élève | {eleve.prenom} {eleve.nom}
          </CardTitle>
          <Badge variant="outline" className={cn(niveauConfig.color)}>
            Zone: {eleve.zoneProgression}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Jauge CECRL */}
          <JaugeCECRL niveau={eleve.niveauCECRL} score={eleve.scoreCEREDIS} />
          
          {/* Évolution du score CEREDIS */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Évolution du score CEREDIS</h4>
            <div className="h-[100px] flex items-center justify-center bg-muted/30 rounded-lg p-4">
              <Sparkline data={eleve.historiqueScores} width={200} height={80} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">30 derniers jours</span>
              <TendanceIndicateur tendance={eleve.tendance} />
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Activités complétées</p>
                <p className="text-lg font-bold">{eleve.activitesCompletees}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Temps d'apprentissage</p>
                <p className="text-lg font-bold">{formatDuree(eleve.tempsTotal)}</p>
              </div>
            </div>
            
            {eleve.derniereActivite && (
              <p className="text-xs text-muted-foreground text-center">
                Dernière activité : {formatDistanceToNow(new Date(eleve.derniereActivite), { addSuffix: true, locale: fr })}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SyntheseEleve;
