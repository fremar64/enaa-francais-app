'use client';

/**
 * Composant CompetencesCritiques
 * Tableau des compétences avec score, seuil requis et statut
 * 
 * Conforme au §3.4 du TABLEAU DE BORD ANALYTIQUE CEREDIS
 * "Cette vue est essentielle pour comprendre pourquoi un élève n'accède pas au niveau supérieur"
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Lock,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CompetenceCritique } from '@/types/teacher-dashboard';

interface CompetencesCritiquesProps {
  competences: CompetenceCritique[];
  onSelectCompetence?: (competence: CompetenceCritique) => void;
  showVerrousOnly?: boolean;
}

const DOMAINE_LABELS: Record<string, { name: string; abbrev: string; color: string }> = {
  '1': { name: 'Compréhension orale', abbrev: 'CO', color: 'bg-blue-500' },
  '2': { name: 'Compréhension écrite', abbrev: 'CE', color: 'bg-green-500' },
  '3': { name: 'Production écrite', abbrev: 'PE', color: 'bg-amber-500' },
  '4': { name: 'Interaction', abbrev: 'INT', color: 'bg-red-500' },
  '5': { name: 'Métacognition', abbrev: 'META', color: 'bg-purple-500' }
};

function getStatutConfig(statut: 'atteint' | 'non_atteint' | 'en_cours') {
  switch (statut) {
    case 'atteint':
      return { 
        icon: CheckCircle2, 
        color: 'text-emerald-500', 
        bgColor: 'bg-emerald-50',
        label: 'ATTEINT' 
      };
    case 'en_cours':
      return { 
        icon: AlertTriangle, 
        color: 'text-amber-500', 
        bgColor: 'bg-amber-50',
        label: 'EN COURS' 
      };
    case 'non_atteint':
      return { 
        icon: XCircle, 
        color: 'text-red-500', 
        bgColor: 'bg-red-50',
        label: 'NON ATTEINT' 
      };
  }
}

export function CompetencesCritiques({ 
  competences, 
  onSelectCompetence,
  showVerrousOnly = false 
}: CompetencesCritiquesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomaine, setFilterDomaine] = useState<string>('all');
  const [filterStatut, setFilterStatut] = useState<string>('all');

  // Filtrer les compétences
  let filteredCompetences = competences;
  
  if (showVerrousOnly) {
    filteredCompetences = filteredCompetences.filter(c => c.estVerrou);
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredCompetences = filteredCompetences.filter(c => 
      c.id.toLowerCase().includes(term) || 
      c.nom.toLowerCase().includes(term)
    );
  }
  
  if (filterDomaine !== 'all') {
    filteredCompetences = filteredCompetences.filter(c => c.domaineId === filterDomaine);
  }
  
  if (filterStatut !== 'all') {
    filteredCompetences = filteredCompetences.filter(c => c.statut === filterStatut);
  }

  // Statistiques rapides
  const stats = {
    atteint: competences.filter(c => c.statut === 'atteint').length,
    enCours: competences.filter(c => c.statut === 'en_cours').length,
    nonAtteint: competences.filter(c => c.statut === 'non_atteint').length,
    verrous: competences.filter(c => c.estVerrou).length
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Compétences Critiques
          </CardTitle>
          
          {/* Statistiques rapides */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-emerald-500 border-emerald-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {stats.atteint} atteintes
            </Badge>
            <Badge variant="outline" className="text-amber-500 border-amber-200">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {stats.enCours} en cours
            </Badge>
            <Badge variant="outline" className="text-red-500 border-red-200">
              <XCircle className="h-3 w-3 mr-1" />
              {stats.nonAtteint} non atteintes
            </Badge>
            {stats.verrous > 0 && (
              <Badge variant="destructive">
                <Lock className="h-3 w-3 mr-1" />
                {stats.verrous} verrou{stats.verrous > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={filterDomaine} onValueChange={setFilterDomaine}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Domaine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les domaines</SelectItem>
              {Object.entries(DOMAINE_LABELS).map(([id, { name, abbrev }]) => (
                <SelectItem key={id} value={id}>{abbrev} - {name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="atteint">Atteint</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="non_atteint">Non atteint</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Compétence</TableHead>
                <TableHead className="w-[100px] text-center">Domaine</TableHead>
                <TableHead className="w-[80px] text-center">Score</TableHead>
                <TableHead className="w-[100px] text-center">Seuil requis</TableHead>
                <TableHead className="w-[120px] text-center">Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompetences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucune compétence ne correspond aux critères
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompetences.map((competence) => {
                  const statutConfig = getStatutConfig(competence.statut);
                  const StatutIcon = statutConfig.icon;
                  const domaineInfo = DOMAINE_LABELS[competence.domaineId];
                  
                  return (
                    <TableRow 
                      key={competence.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                        competence.estVerrou && "bg-red-50/50"
                      )}
                      onClick={() => onSelectCompetence?.(competence)}
                    >
                      <TableCell className="font-mono font-medium">
                        <div className="flex items-center gap-1">
                          {competence.estVerrou && (
                            <Lock className="h-3 w-3 text-red-500" />
                          )}
                          {competence.id}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{competence.nom}</p>
                          <p className="text-xs text-muted-foreground">Niveau {competence.niveau}</p>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={cn("text-white text-xs", domaineInfo?.color)}
                        >
                          {domaineInfo?.abbrev}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          <span className={cn(
                            "font-bold",
                            competence.score >= competence.seuilRequis ? "text-emerald-600" : "text-red-600"
                          )}>
                            {competence.score}%
                          </span>
                          <Progress 
                            value={competence.score} 
                            className="h-1.5 w-16"
                          />
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center text-muted-foreground">
                        {competence.seuilRequis}%
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            statutConfig.color,
                            statutConfig.bgColor
                          )}
                        >
                          <StatutIcon className="h-3 w-3 mr-1" />
                          {statutConfig.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default CompetencesCritiques;
