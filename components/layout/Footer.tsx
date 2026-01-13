import Link from 'next/link';
import { Music2, Github, Mail, Heart } from 'lucide-react';

export function Footer() {
  // Année fixe pour éviter les problèmes d'hydratation SSR
  const currentYear = 2026;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Music2 className="h-6 w-6 text-accent" />
              <span className="font-display text-lg font-bold">
                Chansons Françaises
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Apprenez le français à travers la musique francophone. 
              Une approche pédagogique innovante basée sur le CECRL et 
              l&apos;échelle CEREDIS.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mon parcours
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:contact@ceredis.fr" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contact@ceredis.fr
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ceredis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CEREDIS. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="h-4 w-4 text-red-500" /> pour l&apos;apprentissage du français
          </p>
        </div>
      </div>
    </footer>
  );
}
