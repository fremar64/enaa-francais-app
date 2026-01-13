'use client';

import { GraduationCap, Users, ArrowRight, BarChart3, Target, FileText, Headphones, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function UserSpaces() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Espaces dédiés
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des outils adaptés à chaque profil pour un apprentissage personnalisé
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Élève Card */}
          <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 transition-colors">
            {/* Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Espace Élève</CardTitle>
                  <CardDescription>Apprenez à votre rythme</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Features List */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Headphones className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Parcours interactifs</span>
                    <p className="text-sm text-muted-foreground">QCM, textes à trous, productions écrites</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Tableau de bord</span>
                    <p className="text-sm text-muted-foreground">Suivez votre progression et vos compétences</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <PenTool className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Journal réflexif</span>
                    <p className="text-sm text-muted-foreground">Développez votre métacognition</p>
                  </div>
                </li>
              </ul>

              {/* CTA */}
              <div className="pt-4">
                <Link href="/dashboard">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Accéder à mon espace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Enseignant Card */}
          <Card className="relative overflow-hidden border-2 border-purple-200 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-700 transition-colors">
            {/* Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Espace Enseignant</CardTitle>
                  <CardDescription>Pilotez votre classe</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Features List */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Vue classe</span>
                    <p className="text-sm text-muted-foreground">Synthèse des progressions de tous vos élèves</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Compétences critiques</span>
                    <p className="text-sm text-muted-foreground">Identifiez les points de blocage</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Export des données</span>
                    <p className="text-sm text-muted-foreground">Rapports CSV et JSON pour vos bilans</p>
                  </div>
                </li>
              </ul>

              {/* CTA */}
              <div className="pt-4">
                <Link href="/enseignant">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Accéder au tableau de bord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
