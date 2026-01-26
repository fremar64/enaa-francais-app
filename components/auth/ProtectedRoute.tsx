'use client';

import { useRouter, usePathname } from 'next/navigation';
import { pb } from '@/lib/pocketbase';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export function ProtectedRoute({ children, requiredLevel }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ÉTAPE 1: Attendre d'être côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ÉTAPE 2: Une fois côté client, vérifier l'auth
  useEffect(() => {
    if (!isClient) return;
    
    if (!pb.authStore.isValid) {
      const redirectPath = pathname ?? '/';
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [isClient, router, pathname]);

  // Pendant le SSR ou avant le montage client : afficher un loader
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Côté client mais pas encore autorisé
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Vérification...</p>
        </div>
      </div>
    );
  }

  // Autorisé : afficher le contenu
  return <>{children}</>;
}

// Composant pour les routes réservées aux non-connectés
interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = '/dashboard' }: GuestRouteProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (pb.authStore.isValid) {
      router.push(redirectTo);
      setCanRender(false);
    } else {
      setCanRender(true);
    }
  }, [isClient, router, redirectTo]);

  if (!isClient || !canRender) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
