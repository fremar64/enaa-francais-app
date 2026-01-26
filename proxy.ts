import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy middleware pour Next.js
 * 
 * Note: La protection des routes est gérée côté client par le composant ProtectedRoute
 * Ce proxy laisse passer toutes les requêtes pour éviter les conflits avec l'authentification PocketBase
 */
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}
