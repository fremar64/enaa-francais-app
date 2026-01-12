'use client';

/**
 * Composant VueClasse
 * Liste des élèves avec statistiques globales de classe
 * 
 * Conforme au TABLEAU DE BORD ANALYTIQUE CEREDIS - Vue Enseignant
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  Search, 
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Target,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SyntheseEleve, StatistiquesClasse, ClasseInfo } from '@/types/teacher-dashboard';
import type { NiveauCECRL } from '@/services/integration/types';

interface VueClasseProps {
  classe: ClasseInfo;
  eleves: SyntheseEleve[];
  statistiques: StatistiquesClasse;
  eleveSelectionne: SyntheseEleve | null;
  onSelectEleve: (eleve: SyntheseEleve) => void;
}

// Configuration des couleurs par niveau
const NIVEAU_COLORS: Record<NiveauCECRL, string> = {
  'A1': 'bg-emerald-500',
  'A2': 'bg-green-500',
  'B1': 'bg-blue-500',
  'B2': 'bg-indigo-500',
  'C1': 'bg-purple-500',
  'C2': 'bg-violet-500'
};

// Statistiques rapides de la classe
function StatistiquesRapides({ stats }: { stats: StatistiquesClasse }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs">Score moyen</span>
        </div>
        <p className="text-xl font-bold">{stats.scoreMoyen}/600</p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Target className="h-4 w-4" />
          <span className="text-xs">Compétences validées</span>
        </div>
        <p className="text-xl font-bold">{stats.tauxCompetencesValidees}%</p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs">Progression (30j)</span>
        </div>
        <p className={cn(
          "text-xl font-bold",
          stats.progressionMoyenne > 0 ? "text-emerald-600" : stats.progressionMoyenne < 0 ? "text-red-600" : ""
        )}>
          {stats.progressionMoyenne > 0 ? '+' : ''}{stats.progressionMoyenne} pts
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs">Verrous communs</span>
        </div>
        <p className="text-xl font-bold text-red-600">{stats.verrousCommuns.length}</p>
      </div>
    </div>
  );
}

// Répartition par niveau CECRL
function RepartitionNiveaux({ repartition, total }: { repartition: Record<NiveauCECRL, number>; total: number }) {
  const niveaux: NiveauCECRL[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  return (
    <div className="mb-4">
      <p className="text-xs text-muted-foreground mb-2">Répartition par niveau CECRL</p>
      <div className="flex h-6 rounded-lg overflow-hidden">
        {niveaux.map(niveau => {
          const count = repartition[niveau];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          if (percentage === 0) return null;
          
          return (
            <div
              key={niveau}
              className={cn("flex items-center justify-center text-white text-xs font-medium", NIVEAU_COLORS[niveau])}
              style={{ width: `${percentage}%` }}
              title={`${niveau}: ${count} élève${count > 1 ? 's' : ''} (${Math.round(percentage)}%)`}
            >
              {percentage > 10 && niveau}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        {niveaux.map(niveau => (
          <div key={niveau} className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className={cn("w-2 h-2 rounded-full", NIVEAU_COLORS[niveau])} />
            <span>{niveau}: {repartition[niveau]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Carte élève compacte
function EleveCard({ 
  eleve, 
  isSelected, 
  onClick 
}: { 
  eleve: SyntheseEleve; 
  isSelected: boolean;
  onClick: () => void;
}) {
  const TendanceIcon = eleve.tendance === 'hausse' ? TrendingUp : eleve.tendance === 'baisse' ? TrendingDown : Minus;
  const tendanceColor = eleve.tendance === 'hausse' ? 'text-emerald-500' : eleve.tendance === 'baisse' ? 'text-red-500' : 'text-gray-500';
  
  return (
    <div 
      className={cn(
        "p-3 rounded-lg border cursor-pointer transition-all",
        isSelected 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Badge niveau */}
          <div className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold",
            NIVEAU_COLORS[eleve.niveauCECRL]
          )}>
            {eleve.niveauCECRL}
          </div>
          
          {/* Nom et score */}
          <div>
            <p className="font-medium text-sm">{eleve.prenom} {eleve.nom}</p>
            <p className="text-xs text-muted-foreground">
              {eleve.scoreCEREDIS}/600 • {eleve.zoneProgression}
            </p>
          </div>
        </div>
        
        {/* Tendance */}
        <div className="flex items-center gap-1">
          <TendanceIcon className={cn("h-4 w-4", tendanceColor)} />
        </div>
      </div>
      
      {/* Barre de progression */}
      <Progress 
        value={(eleve.scoreCEREDIS / 600) * 100} 
        className="h-1.5 mt-2" 
      />
    </div>
  );
}

export function VueClasse({ 
  classe, 
  eleves, 
  statistiques, 
  eleveSelectionne,
  onSelectEleve 
}: VueClasseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nom' | 'score' | 'tendance'>('nom');
  const [filterNiveau, setFilterNiveau] = useState<string>('all');

  // Filtrer et trier les élèves
  let filteredEleves = [...eleves];
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredEleves = filteredEleves.filter(e => 
      e.nom.toLowerCase().includes(term) || 
      e.prenom.toLowerCase().includes(term)
    );
  }
  
  if (filterNiveau !== 'all') {
    filteredEleves = filteredEleves.filter(e => e.niveauCECRL === filterNiveau);
  }
  
  // Tri
  const tendanceOrder = { hausse: 3, stable: 2, baisse: 1 };
  filteredEleves.sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.scoreCEREDIS - a.scoreCEREDIS;
      case 'tendance':
        return tendanceOrder[b.tendance] - tendanceOrder[a.tendance];
      default:
        return a.nom.localeCompare(b.nom);
    }
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {classe.nom}
          </CardTitle>
          <Badge variant="outline">
            {classe.nombreEleves} élève{classe.nombreEleves > 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Statistiques rapides */}
        <StatistiquesRapides stats={statistiques} />
        
        {/* Répartition par niveau */}
        <RepartitionNiveaux 
          repartition={statistiques.repartitionNiveaux} 
          total={classe.nombreEleves} 
        />
        
        {/* Filtres */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un élève..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          
          <Select value={filterNiveau} onValueChange={setFilterNiveau}>
            <SelectTrigger className="w-[100px] h-9">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
              <SelectItem value="C1">C1</SelectItem>
              <SelectItem value="C2">C2</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'nom' | 'score' | 'tendance')}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nom">Nom</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="tendance">Tendance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Liste des élèves */}
        <ScrollArea className="h-[350px]">
          <div className="space-y-2 pr-4">
            {filteredEleves.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Aucun élève ne correspond aux critères</p>
              </div>
            ) : (
              filteredEleves.map(eleve => (
                <EleveCard
                  key={eleve.id}
                  eleve={eleve}
                  isSelected={eleveSelectionne?.id === eleve.id}
                  onClick={() => onSelectEleve(eleve)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default VueClasse;
