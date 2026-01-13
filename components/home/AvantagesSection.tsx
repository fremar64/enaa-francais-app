'use client';

import { Brain, Heart, Zap, Users, Award, Globe } from "lucide-react";

const AVANTAGES = [
  {
    icon: Heart,
    title: "Motivation intrinsèque",
    description: "La musique crée un engagement émotionnel qui facilite la mémorisation"
  },
  {
    icon: Brain,
    title: "Apprentissage multimodal",
    description: "Combiner écoute, lecture et production pour ancrer les savoirs"
  },
  {
    icon: Zap,
    title: "Progression mesurable",
    description: "Suivi des compétences CEREDIS avec feedback immédiat"
  },
  {
    icon: Globe,
    title: "Culture francophone",
    description: "Découvrir la richesse culturelle à travers les artistes emblématiques"
  },
  {
    icon: Users,
    title: "Adapté à tous",
    description: "Parcours différenciés du niveau A2 au niveau C1"
  },
  {
    icon: Award,
    title: "Certifié CECRL",
    description: "Aligné sur le Cadre Européen Commun de Référence pour les Langues"
  }
];

export function AvantagesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi apprendre avec la chanson ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche pédagogique éprouvée pour un apprentissage efficace et plaisant
          </p>
        </div>

        {/* Avantages Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AVANTAGES.map((avantage) => (
            <div 
              key={avantage.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border hover:border-accent/50 hover:shadow-md transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <avantage.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {avantage.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {avantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
