'use client';

/**
 * Composant RadarCompetences
 * Visualisation radar des 5 domaines de compétences CEREDIS
 * 
 * Utilise un graphique SVG personnalisé pour éviter les dépendances lourdes
 */

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';
import type { DonneesRadar } from '@/types/dashboard';

interface RadarCompetencesProps {
  data: DonneesRadar[];
  size?: number;
  showLegend?: boolean;
  title?: string;
}

export function RadarCompetences({ 
  data, 
  size = 300, 
  showLegend = true,
  title = 'Profil de compétences'
}: RadarCompetencesProps) {
  const center = size / 2;
  const radius = (size - 60) / 2; // Marge pour les labels

  // Calculer les points du polygone
  const radarPoints = useMemo(() => {
    const numPoints = data.length;
    const angleStep = (2 * Math.PI) / numPoints;
    
    return data.map((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep; // Commencer en haut
      const normalizedValue = item.score / item.scoreMax;
      const x = center + radius * normalizedValue * Math.cos(angle);
      const y = center + radius * normalizedValue * Math.sin(angle);
      return { x, y, ...item, angle };
    });
  }, [data, center, radius]);

  // Générer les cercles de grille
  const gridCircles = [0.25, 0.5, 0.75, 1].map(level => ({
    radius: radius * level,
    label: `${Math.round(level * 100)}%`
  }));

  // Générer les lignes de la grille vers chaque sommet
  const gridLines = useMemo(() => {
    const numPoints = data.length;
    const angleStep = (2 * Math.PI) / numPoints;
    
    return Array.from({ length: numPoints }, (_, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle)
      };
    });
  }, [data.length, center, radius]);

  // Points du polygone pour le path SVG
  const polygonPath = radarPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  // Positions des labels
  const labelPositions = useMemo(() => {
    const numPoints = data.length;
    const angleStep = (2 * Math.PI) / numPoints;
    const labelRadius = radius + 25;
    
    return data.map((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      return {
        x: center + labelRadius * Math.cos(angle),
        y: center + labelRadius * Math.sin(angle),
        anchor: Math.abs(Math.cos(angle)) < 0.1 
          ? 'middle' 
          : Math.cos(angle) > 0 ? 'start' : 'end',
        ...item
      };
    });
  }, [data, center, radius]);

  // Score moyen global
  const scoreMoyen = Math.round(
    data.reduce((sum, d) => sum + d.score, 0) / data.length
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Badge variant="outline" className="text-sm">
            Moyenne : {scoreMoyen}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center">
        {/* Graphique Radar SVG */}
        <svg 
          width={size} 
          height={size} 
          className="overflow-visible"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Grille circulaire */}
          {gridCircles.map((circle, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={circle.radius}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          ))}
          
          {/* Lignes de grille vers les sommets */}
          {gridLines.map((line, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={line.x}
              y2={line.y}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          ))}
          
          {/* Zone colorée du profil */}
          <path
            d={polygonPath}
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
          />
          
          {/* Points sur le graphique */}
          {radarPoints.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r={6}
                fill={point.couleur}
                stroke="white"
                strokeWidth={2}
              />
              {/* Tooltip au survol */}
              <title>{`${point.domaine}: ${point.score}%`}</title>
            </g>
          ))}
          
          {/* Labels des domaines */}
          {labelPositions.map((label, i) => (
            <text
              key={i}
              x={label.x}
              y={label.y}
              textAnchor={label.anchor}
              dominantBaseline="middle"
              className="text-xs font-medium fill-current"
            >
              <tspan className="font-semibold">{label.abbrev}</tspan>
              <tspan dx={5} className="text-muted-foreground text-[10px]">
                {label.score}%
              </tspan>
            </text>
          ))}
        </svg>

        {/* Légende */}
        {showLegend && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.couleur }}
                />
                <span className="text-muted-foreground truncate">
                  {item.domaine}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RadarCompetences;
