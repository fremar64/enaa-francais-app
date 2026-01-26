import PocketBase, { RecordService } from 'pocketbase';

// Types basés sur le schéma PocketBase
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  niveau_actuel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  langue_maternelle: string;
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    volume?: number;
    vitesse_lecture?: number;
    afficher_traduction?: boolean;
  };
  created: string;
  updated: string;
  role?: 'student' | 'teacher' | 'admin';
  isValidated?: boolean;
}

export interface Chanson {
  id: string;
  titre: string;
  artiste: string;
  album?: string;
  annee?: number;
  duree: number;
  genre: string[];
  niveau: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  themes: string[];
  paroles: string;
  paroles_synchronisees?: Array<{
    debut: number;
    fin: number;
    texte: string;
  }>;
  audio_url: string;
  cover_url?: string;
  video_url?: string;
  vocabulaire_cle?: Array<{
    mot: string;
    definition: string;
    exemple?: string;
  }> | Record<string, string>;
  points_grammaire?: Array<{
    point: string;
    explication: string;
    exemples: string[];
    usage: string;
    niveau: string;
  }> | string[];
  contexte_culturel?: string;
  created: string;
  updated: string;
}

export interface Seance {
  id: string;
  chanson: string;
  titre: string;
  description: string;
  objectifs: string[];
  niveau: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  duree_estimee: number;
  ordre: number;
  ecrans: Array<{
    id: string;
    type: 'introduction' | 'ecoute' | 'comprehension' | 'vocabulaire' | 'grammaire' | 'production' | 'synthese';
    titre: string;
    contenu: string;
    activites: Array<{
      id: string;
      type: 'qcm' | 'texte_a_trous' | 'ordre' | 'association' | 'ecriture' | 'karaoke';
      donnees: Record<string, unknown>;
      points: number;
    }>;
    audio_segment?: { debut: number; fin: number };
  }>;
  competences_ciblees: string[];
  prerequis?: string[];
  actif: boolean;
  created: string;
  updated: string;
}

export interface Progression {
  id: string;
  user: string;
  seance: string;
  statut: 'non_commence' | 'en_cours' | 'termine';
  ecran_actuel: number;
  score_total: number;
  score_max: number;
  temps_passe: number;
  date_debut?: string;
  date_fin?: string;
  tentatives: number;
  created: string;
  updated: string;
}

export interface Reponse {
  id: string;
  user: string;
  seance: string;
  ecran_id: string;
  activite_id: string;
  reponse_donnee: unknown;
  reponse_correcte: unknown;
  est_correct: boolean;
  score: number;
  temps_reponse: number;
  tentative: number;
  created: string;
  updated: string;
}

export interface Competence {
  id: string;
  code: string;
  nom: string;
  description: string;
  categorie: 'comprehension_orale' | 'comprehension_ecrite' | 'production_orale' | 'production_ecrite' | 'grammaire' | 'vocabulaire' | 'culture';
  niveau: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  indicateurs: string[];
  created: string;
  updated: string;
}

export interface EvaluationCompetence {
  id: string;
  user: string;
  competence: string;
  niveau_atteint: number;
  derniere_evaluation: string;
  historique: Array<{
    date: string;
    score: number;
    source: string;
  }>;
  created: string;
  updated: string;
}

// Interface pour les collections typées
export interface TypedPocketBase extends PocketBase {
  collection(idOrName: 'users'): RecordService<User>;
  collection(idOrName: 'chansons'): RecordService<Chanson>;
  collection(idOrName: 'seances'): RecordService<Seance>;
  collection(idOrName: 'progression'): RecordService<Progression>;
  collection(idOrName: 'reponses'): RecordService<Reponse>;
  collection(idOrName: 'competences'): RecordService<Competence>;
  collection(idOrName: 'evaluations_competences'): RecordService<EvaluationCompetence>;
  collection(idOrName: string): RecordService;
}

// URL du serveur PocketBase
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-songs.ceredis.net';

// Instance singleton du client PocketBase
export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;

// Désactiver l'auto-cancellation pour éviter les problèmes avec React StrictMode
pb.autoCancellation(false);

// Helper pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = (): boolean => {
  return pb.authStore.isValid;
};

// Helper pour obtenir l'utilisateur actuel
export const getCurrentUser = (): User | null => {
  if (!pb.authStore.isValid) return null;
  return pb.authStore.model as unknown as User;
};

// Helper pour la déconnexion
export const logout = (): void => {
  pb.authStore.clear();
};

// Helper pour l'inscription
export const register = async (
  email: string,
  password: string,
  passwordConfirm: string,
  username: string,
  name: string,
  niveau: User['niveau_actuel'] = 'A2',
  langueMaternelle: string = 'en',
  role: 'student' | 'teacher' | 'admin' = 'student'
): Promise<User> => {
  // Si on tente de créer un admin, vérifier qu'il n'en existe pas déjà
  if (role === 'admin') {
    const existingAdmins = await pb.collection('users').getList<User>(1, 1, {
      filter: 'role = "admin"',
    });
    if (existingAdmins.items.length > 0) {
      throw new Error("Un compte administrateur existe déjà. Impossible d'en créer un second.");
    }
  }
  // Préparer les données selon le rôle
  const userData: any = {
    email,
    password,
    passwordConfirm,
    username,
    name,
    role,
    preferences: {
      theme: 'system',
      volume: 80,
      vitesse_lecture: 1,
      afficher_traduction: true,
    },
  };
  if (role === 'student') {
    userData.niveau_actuel = niveau;
    userData.langue_maternelle = langueMaternelle;
  }
  console.log('Données envoyées à PocketBase pour création user:', userData);
  const user = await pb.collection('users').create<User>(userData);
  // Connexion automatique après inscription
  const authData = await pb.collection('users').authWithPassword<User>(email, password);
  // Récupérer l'utilisateur complet (avec champs personnalisés)
  try {
    const full = await pb.collection('users').getOne<User>(authData.record.id);
    return full;
  } catch {
    return authData.record;
  }
};

// Helper pour la connexion
export const login = async (email: string, password: string): Promise<User> => {
  // PocketBase accepte une identité (email ou username) en première position
  const authData = await pb.collection('users').authWithPassword<User>(email, password);
  // Récupérer l'utilisateur complet pour s'assurer d'avoir les champs custom (role, isValidated...)
  try {
    const full = await pb.collection('users').getOne<User>(authData.record.id);
    return full;
  } catch {
    return authData.record;
  }
};

// Helper pour la connexion OAuth2
export const loginWithOAuth2 = async (provider: 'google' | 'github' | 'discord'): Promise<User> => {
  const authData = await pb.collection('users').authWithOAuth2<User>({ provider });
  return authData.record;
};

// Helper pour rafraîchir l'authentification
export const refreshAuth = async (): Promise<User | null> => {
  if (!pb.authStore.isValid) return null;
  
  try {
    const authData = await pb.collection('users').authRefresh<User>();
    // Récupérer le profil complet après refresh
    try {
      const full = await pb.collection('users').getOne<User>(authData.record.id);
      return full;
    } catch {
      return authData.record;
    }
  } catch {
    pb.authStore.clear();
    return null;
  }
};

// Helper pour mettre à jour le profil utilisateur
export const updateProfile = async (
  userId: string,
  data: Partial<Pick<User, 'name' | 'niveau_actuel' | 'langue_maternelle' | 'preferences'>>
): Promise<User> => {
  return await pb.collection('users').update<User>(userId, data);
};

// Helper pour mettre à jour l'avatar
export const updateAvatar = async (userId: string, file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);
  return await pb.collection('users').update<User>(userId, formData);
};

// Fonctions pour les chansons
export const getChansons = async (options?: {
  niveau?: string;
  genre?: string;
  theme?: string;
  search?: string;
  page?: number;
  perPage?: number;
}) => {
  const filters: string[] = [];
  
  if (options?.niveau) {
    filters.push(`niveau = "${options.niveau}"`);
  }
  if (options?.genre) {
    filters.push(`genre ~ "${options.genre}"`);
  }
  if (options?.theme) {
    filters.push(`themes ~ "${options.theme}"`);
  }
  if (options?.search) {
    filters.push(`(titre ~ "${options.search}" || artiste ~ "${options.search}")`);
  }
  
  const queryOptions: Record<string, string> = {};
  
  if (filters.length > 0) {
    queryOptions.filter = filters.join(' && ');
  }
  
  return await pb.collection('chansons').getList<Chanson>(
    options?.page || 1,
    options?.perPage || 20,
    queryOptions
  );
};

export const getChanson = async (id: string): Promise<Chanson> => {
  return await pb.collection('chansons').getOne<Chanson>(id);
};

// Fonction utilitaire pour créer un slug à partir d'un titre
export const createSlug = (titre: string): string => {
  return titre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Évite les tirets multiples
    .trim();
};

// Fonction pour rechercher une chanson par son slug (titre normalisé)
export const getChansonBySlug = async (slug: string): Promise<Chanson | null> => {
  try {
    // Mapper les slugs connus vers les titres exacts
    const slugToTitleMap: Record<string, string> = {
      'cest-ta-chance': "C'est ta chance",
      'la-bas': 'Là-bas',
      'le-coureur': 'Le coureur',
      'ne-en-17': 'Né en 17 à Leidenstadt',
      'ne-en-17-a-leidenstadt': 'Né en 17 à Leidenstadt',
    };
    
    const titre = slugToTitleMap[slug];
    
    if (titre) {
      // Recherche par titre exact
      const result = await pb.collection('chansons').getFirstListItem<Chanson>(
        `titre = "${titre}"`
      );
      return result;
    }
    
    // Fallback : essayer de trouver par ID direct (pour compatibilité)
    try {
      return await pb.collection('chansons').getOne<Chanson>(slug);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
};

// Fonctions pour les séances
export const getSeancesByChanson = async (chansonId: string): Promise<Seance[]> => {
  const result = await pb.collection('seances').getList<Seance>(1, 50, {
    filter: `chanson = "${chansonId}" && actif = true`,
    sort: 'ordre',
  });
  return result.items;
};

export const getSeance = async (id: string): Promise<Seance> => {
  return await pb.collection('seances').getOne<Seance>(id, {
    expand: 'chanson',
  });
};

// Fonctions pour la progression
export const getProgression = async (userId: string, seanceId: string): Promise<Progression | null> => {
  try {
    const result = await pb.collection('progression').getFirstListItem<Progression>(
      `user = "${userId}" && seance = "${seanceId}"`
    );
    return result;
  } catch {
    return null;
  }
};

export const getUserProgressions = async (userId: string): Promise<Progression[]> => {
  const result = await pb.collection('progression').getList<Progression>(1, 100, {
    filter: `user = "${userId}"`,
    sort: '-updated',
    expand: 'seance',
  });
  return result.items;
};

export const createOrUpdateProgression = async (
  userId: string,
  seanceId: string,
  data: Partial<Omit<Progression, 'id' | 'user' | 'seance' | 'created' | 'updated'>>
): Promise<Progression> => {
  const existing = await getProgression(userId, seanceId);
  
  if (existing) {
    return await pb.collection('progression').update<Progression>(existing.id, {
      ...data,
      tentatives: (existing.tentatives || 0) + (data.statut === 'termine' && existing.statut !== 'termine' ? 1 : 0),
    });
  }
  
  return await pb.collection('progression').create<Progression>({
    user: userId,
    seance: seanceId,
    statut: 'non_commence',
    ecran_actuel: 0,
    score_total: 0,
    score_max: 0,
    temps_passe: 0,
    tentatives: 1,
    ...data,
  });
};


// Fonctions pour les compétences
export const getCompetences = async (): Promise<Competence[]> => {
  const result = await pb.collection('competences').getList<Competence>(1, 100, {
    sort: 'categorie,niveau,code',
  });
  return result.items;
};

export const getUserCompetences = async (userId: string): Promise<EvaluationCompetence[]> => {
  const result = await pb.collection('evaluations_competences').getList<EvaluationCompetence>(1, 100, {
    filter: `user = "${userId}"`,
    expand: 'competence',
    sort: '-derniere_evaluation',
  });
  return result.items;
};

export const updateCompetenceEvaluation = async (
  userId: string,
  competenceId: string,
  score: number,
  source: string
): Promise<EvaluationCompetence> => {
  try {
    const existing = await pb.collection('evaluations_competences').getFirstListItem<EvaluationCompetence>(
      `user = "${userId}" && competence = "${competenceId}"`
    );
    
    const historique = existing.historique || [];
    historique.push({
      date: new Date().toISOString(),
      score,
      source,
    });
    
    const recentScores = historique.slice(-5);
    const moyenneScore = recentScores.reduce((sum, h) => sum + h.score, 0) / recentScores.length;
    
    return await pb.collection('evaluations_competences').update<EvaluationCompetence>(existing.id, {
      niveau_atteint: moyenneScore,
      derniere_evaluation: new Date().toISOString(),
      historique,
    });
  } catch {
    return await pb.collection('evaluations_competences').create<EvaluationCompetence>({
      user: userId,
      competence: competenceId,
      niveau_atteint: score,
      derniere_evaluation: new Date().toISOString(),
      historique: [{
        date: new Date().toISOString(),
        score,
        source,
      }],
    });
  }
};

export default pb;
