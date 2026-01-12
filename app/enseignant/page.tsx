'use client';

/**
 * Page Dashboard Enseignant
 * Vue classe, suivi individuel et export des données
 * 
 * Conforme au TABLEAU DE BORD ANALYTIQUE CEREDIS
 * et au Schéma de rôles utilisateurs (accès scoped à la classe)
 */

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { 
  SyntheseEleve, 
  CompetencesCritiques, 
  AnalysePreuves, 
  VueClasse,
  ExportData 
} from "@/components/teacher";
import { RadarCompetences } from "@/components/dashboard";
import { useTeacherDashboard } from "@/hooks/useTeacherDashboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  AlertCircle, 
  GraduationCap,
  User,
  Target,
  FileText,
  Radar
} from "lucide-react";
import type { CompetenceCritique, PreuveDetail } from "@/types/teacher-dashboard";

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Skeleton className="h-[600px] w-full rounded-xl" />
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function DashboardEnseignantPage() {
  const {
    loading,
    error,
    classe,
    eleves,
    eleveSelectionne,
    statistiques,
    profilDomaines,
    competencesCritiques,
    preuves,
    refresh,
    selectEleve,
    downloadExport,
  } = useTeacherDashboard();

  const [competenceSelectionnee, setCompetenceSelectionnee] = useState<CompetenceCritique | null>(null);
  const [activeTab, setActiveTab] = useState('synthese');

  // Transformer profilDomaines pour le radar
  const radarData = profilDomaines.map(d => ({
    domaine: d.domaineName,
    abbrev: d.abbrev,
    score: d.score,
    scoreMax: d.scoreMax,
    couleur: d.couleur
  }));

  // Gérer la sélection d'une compétence
  const handleSelectCompetence = (competence: CompetenceCritique) => {
    setCompetenceSelectionnee(competence);
    setActiveTab('preuves');
  };

  // Gérer la vue d'une preuve
  const handleViewPreuve = (preuve: PreuveDetail) => {
    // TODO: Ouvrir un modal avec le détail de la preuve
    console.log('Voir preuve:', preuve);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-accent flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Tableau de bord Enseignant
                </h1>
                <p className="text-muted-foreground text-sm">
                  Suivi pédagogique et progression des élèves
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {classe && statistiques && eleves.length > 0 && (
                <ExportData
                  eleves={eleves}
                  eleveSelectionne={eleveSelectionne}
                  onExport={downloadExport}
                />
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refresh}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {error}
              <Button 
                variant="link" 
                className="p-0 h-auto ml-2" 
                onClick={refresh}
              >
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {loading && <DashboardSkeleton />}

        {/* Content */}
        {!loading && !error && classe && statistiques && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche: Vue classe */}
            <div>
              <VueClasse
                classe={classe}
                eleves={eleves}
                statistiques={statistiques}
                eleveSelectionne={eleveSelectionne}
                onSelectEleve={selectEleve}
              />
            </div>
            
            {/* Colonne droite: Détails élève */}
            <div className="lg:col-span-2 space-y-6">
              {eleveSelectionne ? (
                <>
                  {/* Synthèse élève */}
                  <SyntheseEleve eleve={eleveSelectionne} />
                  
                  {/* Onglets de détail */}
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="synthese" className="flex items-center gap-1">
                        <Radar className="h-4 w-4" />
                        <span className="hidden sm:inline">Profil</span>
                      </TabsTrigger>
                      <TabsTrigger value="competences" className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span className="hidden sm:inline">Compétences</span>
                      </TabsTrigger>
                      <TabsTrigger value="preuves" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Preuves</span>
                        {competenceSelectionnee && (
                          <Badge variant="secondary" className="ml-1 text-xs px-1">
                            {competenceSelectionnee.id}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="verrous" className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Verrous</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="synthese" className="mt-4">
                      <RadarCompetences 
                        data={radarData}
                        title="Profil par domaines"
                        showLegend
                      />
                    </TabsContent>
                    
                    <TabsContent value="competences" className="mt-4">
                      <CompetencesCritiques
                        competences={competencesCritiques}
                        onSelectCompetence={handleSelectCompetence}
                      />
                    </TabsContent>
                    
                    <TabsContent value="preuves" className="mt-4">
                      <AnalysePreuves
                        preuves={preuves}
                        competenceSelectionnee={competenceSelectionnee}
                        onViewPreuve={handleViewPreuve}
                      />
                      {competenceSelectionnee && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => setCompetenceSelectionnee(null)}
                        >
                          Voir toutes les preuves
                        </Button>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="verrous" className="mt-4">
                      <CompetencesCritiques
                        competences={competencesCritiques}
                        onSelectCompetence={handleSelectCompetence}
                        showVerrousOnly
                      />
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-xl border border-dashed">
                  <div className="text-center text-muted-foreground">
                    <User className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-2">Sélectionnez un élève</h3>
                    <p className="text-sm">
                      Cliquez sur un élève dans la liste pour voir ses détails
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-primary font-bold text-sm">FC</span>
              </div>
              <span className="font-display font-semibold text-foreground">
                FrançaisChanson
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FrançaisChanson. Tableau de bord enseignant — Données conformes CEREDIS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
