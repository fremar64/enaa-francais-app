'use client';

import { Header } from "@/components/layout/Header";
import { 
  RadarCompetences, 
  HistoriqueActivites, 
  ProgressionGlobale 
} from "@/components/dashboard";
import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, AlertCircle, LayoutDashboard } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[280px] w-full rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
}

function DashboardContent() {
  const { 
    loading, 
    error, 
    progression, 
    historique, 
    radar, 
    refresh 
  } = useDashboard();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-accent flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Mon tableau de bord
                </h1>
                <p className="text-muted-foreground text-sm">
                  Suivez votre progression et vos compétences
                </p>
              </div>
            </div>
            
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

        {loading && <DashboardSkeleton />}

        {!loading && !error && progression && (
          <div className="space-y-6">
            <ProgressionGlobale progression={progression} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RadarCompetences 
                data={radar} 
                showLegend 
                title="Compétences par domaine"
              />
              
              <HistoriqueActivites 
                activites={historique} 
                maxItems={8}
              />
            </div>
          </div>
        )}
      </main>

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
              © 2025 FrançaisChanson. Plateforme d&apos;apprentissage du FLE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
