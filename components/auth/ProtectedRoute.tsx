'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export function ProtectedRoute({ children, requiredLevel }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectPath = pathname ?? '/';
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers la page de connexion si non authentifié
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Redirection...</p>
        </div>
      </div>
    );
  }

  // Vérifier le niveau requis si spécifié
  if (requiredLevel && user) {
    const levelOrder: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'> = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const userLevelIndex = levelOrder.indexOf(user.niveau_actuel);
    const requiredLevelIndex = levelOrder.indexOf(requiredLevel);

    if (userLevelIndex < requiredLevelIndex) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold mb-2">Contenu verrouillé</h1>
            <p className="text-muted-foreground mb-4">
              Ce contenu nécessite un niveau <span className="font-semibold text-accent">{requiredLevel}</span> ou supérieur.
              Votre niveau actuel est <span className="font-semibold">{user.niveau_actuel}</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              Continuez à pratiquer pour débloquer ce contenu !
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Composant pour les routes qui ne doivent être accessibles qu'aux utilisateurs non connectés
interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = '/' }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Redirection...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
