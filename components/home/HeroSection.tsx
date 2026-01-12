'use client';

import { ArrowRight, Music2, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: "url('/Gerda.jpg')" }}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8">
            <Music2 className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Plateforme d'apprentissage FLE</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Apprenez le français
            <br />
            <span className="text-accent">en chanson</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Découvrez la richesse de la langue française à travers un répertoire de chansons soigneusement sélectionnées. 
            Grammaire, vocabulaire, culture — tout s'apprend en musique.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="w-full sm:w-auto gradient-accent text-accent-foreground font-semibold shadow-glow hover:shadow-xl transition-shadow"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Découvrir le catalogue
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-foreground/10 mx-auto mb-2">
                <Music2 className="h-6 w-6 text-accent" />
              </div>
              <div className="font-display text-2xl font-bold">50+</div>
              <div className="text-sm text-primary-foreground/70">Chansons</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-foreground/10 mx-auto mb-2">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div className="font-display text-2xl font-bold">200+</div>
              <div className="text-sm text-primary-foreground/70">Activités</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-foreground/10 mx-auto mb-2">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div className="font-display text-2xl font-bold">A2-C1</div>
              <div className="text-sm text-primary-foreground/70">Niveaux</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
