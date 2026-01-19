'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { pb, User, login as pbLogin, logout as pbLogout, register as pbRegister, refreshAuth, loginWithOAuth2 } from '@/lib/pocketbase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'github' | 'discord') => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  name: string;
  niveau?: User['niveau_actuel'];
  langueMaternelle?: string;
  role: 'student' | 'teacher' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialiser l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Vérifier si un token existe dans le localStorage
        if (pb.authStore.isValid) {
          const refreshedUser = await refreshAuth();
          setUser(refreshedUser);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        pb.authStore.clear();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Écouter les changements d'authentification
    const unsubscribe = pb.authStore.onChange((_, model) => {
      setUser(model as User | null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await pbLogin(email, password);
      if (!loggedInUser.isValidated) {
        throw new Error("Votre compte n'a pas encore été validé par un administrateur.");
      }
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithProvider = useCallback(async (provider: 'google' | 'github' | 'discord') => {
    setIsLoading(true);
    try {
      const loggedInUser = await loginWithOAuth2(provider);
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const newUser = await pbRegister(
        data.email,
        data.password,
        data.passwordConfirm,
        data.username,
        data.name,
        data.niveau,
        data.langueMaternelle,
        data.role
      );
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    pbLogout();
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithProvider,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}

// Hook pour vérifier si l'utilisateur a accès à un niveau spécifique
export function useCanAccessLevel(requiredLevel: User['niveau_actuel']) {
  const { user } = useAuth();
  
  const levelOrder: User['niveau_actuel'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  if (!user) return false;
  
  const userLevelIndex = levelOrder.indexOf(user.niveau_actuel);
  const requiredLevelIndex = levelOrder.indexOf(requiredLevel);
  
  // L'utilisateur peut accéder à son niveau et aux niveaux inférieurs
  return userLevelIndex >= requiredLevelIndex;
}

// Hook pour obtenir le progrès global de l'utilisateur
export function useUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    seancesTerminees: 0,
    seancesEnCours: 0,
    scoreTotal: 0,
    tempsTotalMinutes: 0,
    serieJours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const progressions = await pb.collection('progression').getList(1, 1000, {
          filter: `user = "${user.id}"`,
        });

        const seancesTerminees = progressions.items.filter(p => p.statut === 'termine').length;
        const seancesEnCours = progressions.items.filter(p => p.statut === 'en_cours').length;
        const scoreTotal = progressions.items.reduce((sum, p) => sum + (p.score_total || 0), 0);
        const tempsTotalMinutes = Math.round(
          progressions.items.reduce((sum, p) => sum + (p.temps_passe || 0), 0) / 60
        );

        // Calculer la série de jours (simplifié)
        // TODO: Implémenter le calcul réel basé sur les dates
        const serieJours = seancesTerminees > 0 ? 1 : 0;

        setStats({
          seancesTerminees,
          seancesEnCours,
          scoreTotal,
          tempsTotalMinutes,
          serieJours,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, isLoading };
}

export default AuthContext;
