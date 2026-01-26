'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, User, Book, LogOut } from "lucide-react";
import { RadarCompetences } from "@/components/dashboard/RadarCompetences";
import { HistoriqueActivites } from "@/components/dashboard/HistoriqueActivites";
import { ProgressionGlobale } from "@/components/dashboard/ProgressionGlobale";

function DashboardContent() {
  const { user, logout } = useAuth();
  const stats = useDashboard();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mon Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Bienvenue {user?.name || user?.username || user?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        {stats.isLoading ? (
          <DashboardSkeleton />
        ) : stats.error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{stats.error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Section Profil et Parcours */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Carte Profil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profil
                  </CardTitle>
                  <CardDescription>Vos informations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Email:</span>{' '}
                      <span className="text-muted-foreground">{user?.email}</span>
                    </div>
                    <div>
                      <span className="font-medium">Nom:</span>{' '}
                      <span className="text-muted-foreground">
                        {user?.name || 'Non renseigné'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Username:</span>{' '}
                      <span className="text-muted-foreground">
                        {user?.username || 'Non renseigné'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Rôle:</span>{' '}
                      <span className="text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                    <div>
                      <span className="font-medium">Niveau:</span>{' '}
                      <span className="text-muted-foreground">
                        {stats.niveauCecrl || user?.niveau_actuel || 'Non défini'}
                      </span>
                    </div>
                    {stats.scoreCeredis !== null && (
                      <div className="pt-2 mt-2 border-t">
                        <span className="font-medium">Score CEREDIS:</span>{' '}
                        <span className="text-purple-600 font-bold">
                          {stats.scoreCeredis}/600
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Carte Parcours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Parcours
                  </CardTitle>
                  <CardDescription>Vos chansons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Commencez votre apprentissage en explorant les parcours disponibles.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => window.location.href = '/'}>
                      Voir les parcours
                    </Button>
                    {stats.seancesEnCours > 0 && (
                      <Button variant="outline" className="w-full">
                        Reprendre mes activités ({stats.seancesEnCours})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Progression Globale - version mini pour le grid */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Vue rapide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Séances</span>
                      <span className="text-2xl font-bold">{stats.seancesTerminees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Score moyen</span>
                      <span className="text-2xl font-bold">{stats.scoreMoyen}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Temps total</span>
                      <span className="text-2xl font-bold">
                        {stats.tempsTotal < 60 
                          ? `${stats.tempsTotal}m` 
                          : `${Math.floor(stats.tempsTotal / 60)}h`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section Progression Globale - version complète */}
            <ProgressionGlobale
              seancesTerminees={stats.seancesTerminees}
              seancesEnCours={stats.seancesEnCours}
              scoreMoyen={stats.scoreMoyen}
              tempsTotal={stats.tempsTotal}
              scoreCeredis={stats.scoreCeredis}
              niveauCecrl={stats.niveauCecrl}
              tendance={stats.tendance}
            />

            {/* Section Analyses */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Radar des Compétences */}
              <RadarCompetences domainesScores={stats.domainesScores} />

              {/* Historique des Activités */}
              <HistoriqueActivites activites={stats.dernieresActivites} />
            </div>

            {/* Section Informations Système (pour admin/debug) */}
            {user?.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations système</CardTitle>
                  <CardDescription>Détails de votre session (Admin)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">ID utilisateur:</span>{' '}
                      <span className="text-muted-foreground font-mono text-xs">
                        {user?.id}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Collection:</span>{' '}
                      <span className="text-muted-foreground">{user?.collectionName}</span>
                    </div>
                    <div>
                      <span className="font-medium">Compte créé:</span>{' '}
                      <span className="text-muted-foreground">
                        {user?.created
                          ? new Date(user.created).toLocaleDateString('fr-FR')
                          : 'Inconnu'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Validé:</span>{' '}
                      <span className="text-muted-foreground">
                        {user?.isValidated ? '✅ Oui' : '❌ Non'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-[300px] w-full" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
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
