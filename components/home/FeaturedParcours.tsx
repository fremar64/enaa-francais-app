'use client';

import { ArrowRight, Clock, Target, Music2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ParcoursPreview {
  id: string;
  titre: string;
  artiste: string;
  niveau: string;
  theme: string;
  nombreSeances: number;
  nombreEcrans: number;
  dureeEstimee: number; // en minutes
  image: string;
  tags: string[];
}

const PARCOURS_FEATURED: ParcoursPreview[] = [
  {
    id: 'cest-ta-chance',
    titre: "C'est ta chance",
    artiste: 'Jean-Jacques Goldman',
    niveau: 'B1',
    theme: 'Résilience et émancipation sociale',
    nombreSeances: 5,
    nombreEcrans: 41,
    dureeEstimee: 344,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tags: ['Impératif', 'Vocabulaire', 'Débat']
  },
  {
    id: 'le-coureur',
    titre: 'Le coureur',
    artiste: 'Jean-Jacques Goldman',
    niveau: 'B2',
    theme: 'Mondialisation et déracinement',
    nombreSeances: 5,
    nombreEcrans: 43,
    dureeEstimee: 339,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop',
    tags: ['Imparfait/Passé composé', 'Post-colonialisme', 'Récit']
  },
  {
    id: 'la-bas',
    titre: 'Là-bas',
    artiste: 'Jean-Jacques Goldman',
    niveau: 'B2',
    theme: 'Liberté et quête identitaire',
    nombreSeances: 5,
    nombreEcrans: 38,
    dureeEstimee: 320,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
    tags: ['Conditionnel', 'Ailleurs', 'Philosophie']
  }
];

function formatDuree(minutes: number): string {
  const heures = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return heures > 0 ? `${heures}h${mins > 0 ? mins : ''}` : `${mins}min`;
}

export function FeaturedParcours() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Parcours pédagogiques
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Parcours complets pour progresser
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque chanson est accompagnée d'un parcours structuré de 5 séances 
            pour développer toutes vos compétences linguistiques.
          </p>
        </div>

        {/* Parcours Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {PARCOURS_FEATURED.map((parcours) => (
            <Card 
              key={parcours.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={parcours.image} 
                  alt={parcours.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Level Badge */}
                <Badge 
                  className="absolute top-3 left-3 bg-accent text-accent-foreground"
                >
                  {parcours.niveau}
                </Badge>
                
                {/* Duration Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {formatDuree(parcours.dureeEstimee)}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {parcours.titre}
                  </h3>
                  <p className="text-white/80 text-sm">{parcours.artiste}</p>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Theme */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {parcours.theme}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Target className="h-4 w-4 text-accent" />
                    <span><strong>{parcours.nombreSeances}</strong> séances</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-accent" />
                    <span><strong>{parcours.nombreEcrans}</strong> activités</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {parcours.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Link href={`/chanson/${parcours.id}`}>
                  <Button className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    Commencer le parcours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/catalogue">
            <Button variant="outline" size="lg">
              Voir tous les parcours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
