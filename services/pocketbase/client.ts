// Client PocketBase singleton
import PocketBase from 'pocketbase';

// URL de l'instance PocketBase (depuis .env)
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';

// Créer une instance unique de PocketBase
export const pb = new PocketBase(PB_URL);

// Activer le stockage automatique des tokens d'authentification
pb.autoCancellation(false);

// Types de base pour toutes les collections
export interface BaseModel {
  id: string;
  created: string;
  updated: string;
}

// Vérifier la connexion
export async function testConnection(): Promise<boolean> {
  try {
    await pb.health.check();
    console.log('✅ Connexion à PocketBase réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à PocketBase:', error);
    return false;
  }
}

// Obtenir le token actuel (pour debugging)
export function getAuthToken(): string | null {
  return pb.authStore.token;
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  return pb.authStore.isValid;
}

// Récupérer l'utilisateur actuel
export function getCurrentUser() {
  return pb.authStore.model;
}

// Déconnexion
export function logout() {
  pb.authStore.clear();
}

export default pb;
