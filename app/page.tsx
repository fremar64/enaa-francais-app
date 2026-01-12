'use client';

import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { SongGrid } from "@/components/songs/SongGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="container px-4 py-12">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Catalogue de chansons
          </h2>
          <p className="text-muted-foreground">
            Explorez notre collection de chansons françaises pour tous les niveaux
          </p>
        </div>

        {/* Song Grid with Filters */}
        <SongGrid />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-primary font-bold text-sm">FC</span>
              </div>
              <span className="font-display font-semibold text-foreground">
                FrançaisChanson
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 FrançaisChanson. Plateforme d&apos;apprentissage du FLE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
