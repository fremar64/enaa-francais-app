/**
 * Hook pour le tracking des activités pédagogiques
 * Gère automatiquement les traces CaSS (compétences) et xAPI (LRS)
 * 
 * Usage dans un composant d'activité :
 * 
 * const { trackStart, trackComplete, isTracking } = useActivityTracking({
 *   activityId: 'qcm-123',
 *   activityName: 'QCM Compréhension',
 *   activityType: 'qcm',
 *   chansonId: 'la-bas',
 *   seanceId: 'seance-1',
 *   niveau: 'B2'
 * });
 * 
 * // Au démarrage de l'activité
 * await trackStart();
 * 
 * // À la fin de l'activité
 * const result = await trackComplete({ score: 80, maxScore: 100, duration: 120 });
 */

import { useState, useCallback, useRef } from 'react';
import { integrationService, IntegrationResult } from '@/services/integration';
import { useAuth } from '@/contexts/AuthContext';
import type { NiveauCECRL } from '@/services/integration/types';

export interface ActivityTrackingConfig {
  /** Identifiant unique de l'activité */
  activityId: string;
  /** Nom affiché de l'activité */
  activityName: string;
  /** Type d'activité (doit correspondre au mapping dans types.ts) */
  activityType: string;
  /** ID de la chanson */
  chansonId: string;
  /** ID de la séance */
  seanceId: string;
  /** Niveau CECRL de l'activité */
  niveau: NiveauCECRL;
}

export interface TrackCompleteParams {
  /** Score obtenu */
  score: number;
  /** Score maximum possible */
  maxScore: number;
  /** Durée en secondes (calculé automatiquement si non fourni) */
  duration?: number;
  /** Réponse brute de l'apprenant (optionnel, pour preuve CaSS) */
  response?: string;
}

export interface UseActivityTrackingReturn {
  /** Démarrer le tracking de l'activité */
  trackStart: () => Promise<void>;
  /** Terminer le tracking avec les résultats */
  trackComplete: (params: TrackCompleteParams) => Promise<IntegrationResult | null>;
  /** Indique si une opération de tracking est en cours */
  isTracking: boolean;
  /** Timestamp de démarrage (pour calcul durée) */
  startTime: number | null;
  /** Dernière erreur de tracking */
  error: string | null;
  /** Résultat du dernier tracking */
  lastResult: IntegrationResult | null;
}

/**
 * Hook pour le tracking des activités pédagogiques
 */
export function useActivityTracking(config: ActivityTrackingConfig): UseActivityTrackingReturn {
  const { user } = useAuth();
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<IntegrationResult | null>(null);
  const startTimeRef = useRef<number | null>(null);

  /**
   * Enregistrer le début de l'activité
   */
  const trackStart = useCallback(async () => {
    if (!user) {
      console.warn('[Tracking] Utilisateur non connecté, tracking ignoré');
      return;
    }

    setIsTracking(true);
    setError(null);
    startTimeRef.current = Date.now();

    try {
      await integrationService.trackActivityStart({
        userId: user.id,
        userName: user.email || user.username || 'Anonyme',
        activityId: config.activityId,
        activityName: config.activityName,
        activityType: config.activityType,
        chansonId: config.chansonId,
        seanceId: config.seanceId,
        niveau: config.niveau
      });

      console.log('[Tracking] ✅ Activité démarrée:', config.activityId);
    } catch (err: unknown) {
      console.error('[Tracking] Erreur au démarrage:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsTracking(false);
    }
  }, [user, config]);

  /**
   * Enregistrer la complétion de l'activité
   */
  const trackComplete = useCallback(async (params: TrackCompleteParams): Promise<IntegrationResult | null> => {
    if (!user) {
      console.warn('[Tracking] Utilisateur non connecté, tracking ignoré');
      return null;
    }

    setIsTracking(true);
    setError(null);

    // Calculer la durée si non fournie
    const duration = params.duration ?? 
      (startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0);

    try {
      const result = await integrationService.trackActivityCompletion({
        userId: user.id,
        userName: user.email || user.username || 'Anonyme',
        activityId: config.activityId,
        activityName: config.activityName,
        activityType: config.activityType,
        chansonId: config.chansonId,
        seanceId: config.seanceId,
        niveau: config.niveau,
        score: params.score,
        maxScore: params.maxScore,
        duration,
        response: params.response,
        startTime: startTimeRef.current ?? undefined
      });

      setLastResult(result);

      if (result.success) {
        console.log('[Tracking] ✅ Activité complétée:', {
          activityId: config.activityId,
          score: `${params.score}/${params.maxScore}`,
          assertions: result.cassAssertions.length,
          statements: result.xapiStatements.length
        });
      } else {
        console.warn('[Tracking] ⚠️ Activité complétée avec erreurs:', result.errors);
      }

      return result;
    } catch (err: unknown) {
      console.error('[Tracking] Erreur \u00e0 la compl\u00e9tion:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setIsTracking(false);
      startTimeRef.current = null;
    }
  }, [user, config]);

  return {
    trackStart,
    trackComplete,
    isTracking,
    startTime: startTimeRef.current,
    error,
    lastResult
  };
}

/**
 * Utilitaires pour déterminer le type d'activité à partir du type d'écran
 */
export const ECRAN_TYPE_TO_ACTIVITY_TYPE: Record<string, string> = {
  // Types d'écrans → Types d'activités pour le mapping
  'introduction': 'lecture_paroles',
  'ecoute_decouverte': 'ecoute_decouverte',
  'ecoute_guidee': 'ecoute_guidee',
  'quiz_qcm': 'qcm',
  'quiz_qcm_justifie': 'qcm_avec_justification', // MAPPING OPÉRATIONNEL : valide 5.1, 5.2
  'texte_a_trous': 'texte_trous',
  'ordre_elements': 'ordre_elements',
  'texte_libre': 'texte_libre',
  'production_ecrite': 'production_ecrite',
  'journal_reflexif': 'journal_reflexif',
  'debat': 'debat',
  'bilan': 'bilan'
};

/**
 * Obtenir le type d'activité pour le tracking à partir du type d'écran
 */
export function getActivityTypeFromEcranType(ecranType: string): string {
  return ECRAN_TYPE_TO_ACTIVITY_TYPE[ecranType] || ecranType;
}
