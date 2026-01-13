'use client';

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à apprendre le français
            <br />
            <span className="text-accent">en musique ?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Rejoignez notre plateforme et commencez votre parcours d'apprentissage 
            avec les plus grandes chansons de la francophonie.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto gradient-accent text-accent-foreground font-semibold shadow-glow hover:shadow-xl transition-shadow"
              >
                Créer mon compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                J'ai déjà un compte
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Gratuit pour commencer
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Aucune carte bancaire requise
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Accès immédiat aux parcours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
