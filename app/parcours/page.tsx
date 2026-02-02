'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { useChansons } from "@/hooks/useChansons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Music, Play } from "lucide-react";
import { useRouter } from "next/navigation";

function ParcoursContent() {
  const router = useRouter();
  const { chansons, loading: isLoading, error } = useChansons();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parcours de chansons</h1>
        <p className="text-muted-foreground mt-2">
          Explorez les chansons françaises et améliorez votre niveau
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && chansons.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Music className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Aucune chanson disponible pour le moment.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && chansons.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chansons.map((chanson) => (
            <Card key={chanson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  {chanson.titre}
                </CardTitle>
                <CardDescription>{chanson.artiste}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  Découvrez cette chanson française.
                </p>

                <Button 
                  onClick={() => router.push(`/chanson/${chanson.id}`)}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Commencer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ParcoursPage() {
  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <ParcoursContent />
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
}
