'use client';

import { Headphones, BookText, MessageSquare, Lightbulb, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DOMAINES = [
  {
    id: '1',
    abbrev: 'CO',
    name: 'Compréhension orale',
    description: 'Comprendre des documents sonores authentiques',
    icon: Headphones,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    competences: [
      'Compréhension globale',
      'Compréhension détaillée', 
      'Interprétation'
    ]
  },
  {
    id: '2',
    abbrev: 'CE',
    name: 'Compréhension écrite',
    description: 'Analyser les textes et les paroles',
    icon: BookText,
    color: 'bg-green-500',
    lightColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    competences: [
      'Lecture littérale',
      'Inférence',
      'Analyse stylistique'
    ]
  },
  {
    id: '3',
    abbrev: 'PE',
    name: 'Production écrite',
    description: 'Rédiger des textes structurés',
    icon: PenTool,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-500/10',
    textColor: 'text-amber-500',
    competences: [
      'Cohérence',
      'Richesse lexicale',
      'Correction grammaticale'
    ]
  },
  {
    id: '4',
    abbrev: 'INT',
    name: 'Interaction',
    description: 'Débattre et argumenter',
    icon: MessageSquare,
    color: 'bg-rose-500',
    lightColor: 'bg-rose-500/10',
    textColor: 'text-rose-500',
    competences: [
      'Argumentation',
      'Réfutation',
      'Nuance'
    ]
  },
  {
    id: '5',
    abbrev: 'META',
    name: 'Métacognition',
    description: 'Réfléchir sur son apprentissage',
    icon: Lightbulb,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
    competences: [
      'Auto-évaluation',
      'Stratégies',
      'Réflexivité'
    ]
  }
];

export function CompetencesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Référentiel CEREDIS
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            5 domaines de compétences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un suivi précis de votre progression basé sur le Cadre Européen de Référence
          </p>
        </div>

        {/* Competences Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {DOMAINES.map((domaine) => (
            <div 
              key={domaine.id}
              className="group relative bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`h-12 w-12 rounded-xl ${domaine.lightColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <domaine.icon className={`h-6 w-6 ${domaine.textColor}`} />
              </div>

              {/* Abbreviation Badge */}
              <Badge className={`${domaine.color} text-white mb-2`}>
                {domaine.abbrev}
              </Badge>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {domaine.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {domaine.description}
              </p>

              {/* Competences List */}
              <ul className="space-y-1">
                {domaine.competences.map((comp) => (
                  <li key={comp} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${domaine.color}`} />
                    {comp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
