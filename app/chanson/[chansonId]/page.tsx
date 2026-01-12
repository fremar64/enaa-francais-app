'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Music2, Clock, Star, BookOpen, Play, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { SeancesList } from '@/components/songs/SeancesList';
import { useChansons } from '@/hooks/useChansons';

// Couleurs par niveau CECRL
const levelColors: Record<string, string> = {
  'A1': 'bg-green-500',
  'A2': 'bg-green-600',
  'B1': 'bg-blue-500',
  'B2': 'bg-blue-600',
  'C1': 'bg-purple-500',
  'C2': 'bg-purple-600',
};

export default function ChansonDetailPage() {
  const params = useParams<{ chansonId: string }>();
  const chansonId = params?.chansonId;
  
  const { chansons, isLoading, error } = useChansons();
  const chanson = chansons.find(c => c.id === chansonId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="ml-3 text-muted-foreground">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error || !chanson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Chanson non trouvée</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête de la chanson */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Pochette */}
              <div className="relative w-full md:w-64 aspect-square rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <img
                  src={chanson.pochette || '/placeholder-cover.jpg'}
                  alt={chanson.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge 
                  className={`absolute top-3 left-3 ${levelColors[chanson.niveau] || 'bg-gray-500'}`}
                >
                  {chanson.niveau}
                </Badge>
              </div>

              {/* Infos */}
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {chanson.titre}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{chanson.artiste}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {chanson.themes?.map((theme: string) => (
                    <Badge key={theme} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  {chanson.duree && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {chanson.duree}
                    </span>
                  )}
                  {chanson.annee && (
                    <span>{chanson.annee}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button className="gradient-accent">
                    <Play className="mr-2 h-4 w-4" />
                    Écouter
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Voir les paroles
                  </Button>
                </div>
              </div>
            </div>

            {/* Lecteur audio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music2 className="h-5 w-5" />
                  Lecteur audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer 
                  src={chanson.audioUrl}
                  showLyrics
                />
                {!chanson.audioUrl && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    🎵 Audio de démonstration non disponible
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Séances pédagogiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Séances pédagogiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SeancesList chansonId={chansonId || ''} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compétences visées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Compétences visées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {chanson.competences?.map((comp: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                      <span className="text-sm">{comp}</span>
                    </li>
                  )) || (
                    <li className="text-sm text-muted-foreground">
                      Compétences non définies
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Description */}
            {chanson.description && (
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {chanson.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
