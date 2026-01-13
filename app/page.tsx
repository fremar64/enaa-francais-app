'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  HeroSection, 
  FeaturedParcours, 
  HowItWorks, 
  UserSpaces, 
  CompetencesSection, 
  AvantagesSection,
  CTASection 
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Parcours */}
      <FeaturedParcours />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* User Spaces (Élève / Enseignant) */}
      <UserSpaces />
      
      {/* Competences CEREDIS */}
      <CompetencesSection />
      
      {/* Avantages */}
      <AvantagesSection />
      
      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
