'use client';

import { Music2, BookOpen, PenTool, Brain, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: Music2,
    title: "Découvrez",
    description: "Écoutez la chanson et explorez son contexte culturel et historique",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    number: 2,
    icon: BookOpen,
    title: "Analysez",
    description: "Étudiez le vocabulaire, la grammaire et les figures de style",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    number: 3,
    icon: PenTool,
    title: "Pratiquez",
    description: "Réalisez des exercices interactifs : QCM, textes à trous, débats",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    number: 4,
    icon: Brain,
    title: "Réfléchissez",
    description: "Tenez un journal réflexif sur votre apprentissage",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    number: 5,
    icon: CheckCircle2,
    title: "Progressez",
    description: "Suivez vos compétences CEREDIS et atteignez vos objectifs",
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un parcours structuré en 5 étapes pour un apprentissage efficace et motivant
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 via-amber-500 via-purple-500 to-accent transform -translate-y-1/2 z-0" />
          
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {STEPS.map((step, index) => (
              <div 
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Circle */}
                <div className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full ${step.bgColor} border-4 border-background shadow-lg mb-4`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                  
                  {/* Number Badge */}
                  <div className={`absolute -top-1 -right-1 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
