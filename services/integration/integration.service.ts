/**
 * Service d'orchestration : gère automatiquement CaSS + xAPI
 * Ce service simplifie l'utilisation en combinant les deux systèmes
 */

import { cassService, CassService } from './cass.service';
import { xapiService, XApiService } from './xapi.service';
import type { NiveauCECRL, CassAssertion, XApiStatement } from './types';
import { COMPETENCES_CEREDIS, CeredisDomaineId } from './types';

/**
 * RÈGLE DE COHÉRENCE DOMAINE 5 (MAPPING OPÉRATIONNEL FINAL §4.1)
 * 
 * Une compétence du Domaine 5 (métalinguistique) ne peut être validée
 * sans au moins une preuve linguistique ET une preuve réflexive.
 * 
 * Types d'activités considérés comme "preuves réflexives" :
 */
const ACTIVITES_REFLEXIVES = [
  'journal_reflexif',
  'auto_evaluation',
  'bilan',
  'texte_libre',
  'production_ecrite',
  'commentaire_compose',
  'dissertation'
];

/**
 * Types d'activités considérés comme "preuves linguistiques" :
 */
const ACTIVITES_LINGUISTIQUES = [
  'analyse_guidee',
  'qcm_avec_justification',
  'texte_trous',
  'ordre_elements',
  'reperage_formes'
];

/**
 * Activités qui fournissent AUTOMATIQUEMENT une preuve réflexive
 * (car elles collectent une justification textuelle)
 */
const ACTIVITES_AUTO_REFLEXIVES = [
  'texte_libre',
  'journal_reflexif',
  'production_ecrite',
  'commentaire_compose',
  'dissertation',
  'qcm_avec_justification'
];

export interface ActivityCompletionData {
  // Identifiants
  userId: string;
  userName: string;
  activityId: string;
  activityName: string;
  activityType: string; // 'qcm', 'texte_libre', etc.
  
  // Contexte
  chansonId: string;
  seanceId: string;
  niveau: NiveauCECRL;
  
  // Résultats
  score: number;
  maxScore: number;
  duration: number; // en secondes
  response?: string; // Réponse de l'apprenant
  startTime?: number; // Timestamp de début
}

export interface IntegrationResult {
  success: boolean;
  xapiStatements: XApiStatement[];
  cassAssertions: CassAssertion[];
  errors: string[];
}

export class IntegrationService {
  private cass: CassService;
  private xapi: XApiService;
  private enabled: {
    cass: boolean;
    xapi: boolean;
  };

  constructor(
    cass: CassService = cassService,
    xapi: XApiService = xapiService
  ) {
    this.cass = cass;
    this.xapi = xapi;
    
    // Désactiver si les clés ne sont pas configurées
    this.enabled = {
      cass: !!process.env.NEXT_PUBLIC_CASS_API_KEY,
      xapi: !!(process.env.NEXT_PUBLIC_LRS_USERNAME && process.env.NEXT_PUBLIC_LRS_PASSWORD)
    };

    if (!this.enabled.cass) {
      console.warn('[Integration] CaSS désactivé (clé API manquante)');
    }
    if (!this.enabled.xapi) {
      console.warn('[Integration] xAPI désactivé (credentials LRS manquants)');
    }
  }

  /**
   * Enregistrer le début d'une activité
   */
  async trackActivityStart(data: Omit<ActivityCompletionData, 'score' | 'maxScore' | 'duration'>): Promise<void> {
    if (!this.enabled.xapi) return;

    try {
      const statement = this.xapi.createAttemptedStatement(
        data.userId,
        data.userName,
        data.activityId,
        data.activityName,
        data.activityType,
        {
          chansonId: data.chansonId,
          seanceId: data.seanceId
        }
      );

      await this.xapi.sendStatement(statement);
    } catch (error) {
      console.error('[Integration] Erreur track start:', error);
    }
  }

  /**
   * Enregistrer la complétion d'une activité + créer assertions CaSS
   * C'est la fonction principale à utiliser !
   * 
   * RÈGLES DU MAPPING OPÉRATIONNEL FINAL :
   * - §4.1 : Compétence 5.x nécessite preuve linguistique ET réflexive
   * - §4.3 : Aucune compétence métalinguistique validée uniquement sur QCM
   */
  async trackActivityCompletion(data: ActivityCompletionData): Promise<IntegrationResult> {
    const result: IntegrationResult = {
      success: true,
      xapiStatements: [],
      cassAssertions: [],
      errors: []
    };

    const scoreRatio = data.score / data.maxScore;
    const isSuccess = scoreRatio >= 0.6; // 60% minimum

    // ==============================
    // 0. RÈGLE DE COHÉRENCE DOMAINE 5
    // ==============================
    // Vérifier si l'activité peut valider des compétences 5.x
    const canValidateDomain5 = this.canValidateDomain5Competencies(data.activityType, data.response);
    
    if (!canValidateDomain5) {
      console.log(`[Integration] ℹ️ Activité "${data.activityType}" ne peut pas valider directement les compétences Domaine 5 (preuve réflexive requise)`);
    }

    // ==============================
    // 1. xAPI : Statement "completed"
    // ==============================
    if (this.enabled.xapi) {
      try {
        const completedStatement = this.xapi.createCompletedStatement(
          data.userId,
          data.userName,
          data.activityId,
          data.activityName,
          data.score,
          data.maxScore,
          data.duration,
          data.activityType,
          {
            chansonId: data.chansonId,
            seanceId: data.seanceId
          }
        );

        await this.xapi.sendStatement(completedStatement);
        result.xapiStatements.push(completedStatement);
      } catch (error: any) {
        result.errors.push(`xAPI completed: ${error.message}`);
      }
    }

    // ==============================
    // 2. CaSS : Créer assertions si réussite
    // Applique la RÈGLE DE COHÉRENCE DOMAINE 5
    // ==============================
    if (this.enabled.cass && isSuccess) {
      try {
        // URL de la preuve (réponse de l'apprenant)
        const evidenceUrl = `https://enaa-chansons.ceredis.net/response/${data.activityId}`;
        
        // Créer les assertions pour toutes les compétences mappées
        // AVEC FILTRE DOMAINE 5 selon la règle de cohérence
        const assertions = await this.cass.createMultipleAssertions(
          data.userId,
          data.activityId,
          data.activityType,
          data.niveau,
          data.score,
          data.maxScore,
          evidenceUrl,
          canValidateDomain5 // Nouveau paramètre : autoriser ou non les compétences 5.x
        );

        result.cassAssertions.push(...assertions);

        // ==============================
        // 3. xAPI : Statements "mastered" pour chaque compétence
        // ==============================
        if (this.enabled.xapi && assertions.length > 0) {
          for (const assertion of assertions) {
            try {
              const compId = assertion.competency;
              const comp = COMPETENCES_CEREDIS[compId];
              
              if (comp) {
                const masteredStatement = this.xapi.createMasteredStatement(
                  data.userId,
                  data.userName,
                  compId,
                  comp.name,
                  comp.level,
                  assertion['@id'] // ID de l'assertion CaSS
                );

                await this.xapi.sendStatement(masteredStatement);
                result.xapiStatements.push(masteredStatement);
              }
            } catch (error: any) {
              result.errors.push(`xAPI mastered ${assertion.competency}: ${error.message}`);
            }
          }
        }
      } catch (error: any) {
        result.errors.push(`CaSS assertions: ${error.message}`);
      }
    }

    result.success = result.errors.length === 0;

    // Log résumé
    console.log('[Integration] ✅ Résultat:', {
      xapiStatements: result.xapiStatements.length,
      cassAssertions: result.cassAssertions.length,
      errors: result.errors.length
    });

    return result;
  }

  /**
   * Obtenir un dashboard complet d'un apprenant
   */
  async getUserDashboard(userId: string): Promise<{
    xapi: {
      totalAttempts: number;
      totalCompleted: number;
      averageScore: number;
      totalDuration: number;
    };
    cass: {
      totalCompetencies: number;
      mastered: number;
      inProgress: number;
      byDomain: Record<string, number>;
    };
  }> {
    const [xapiStats, cassStats] = await Promise.all([
      this.enabled.xapi ? this.xapi.getUserStatistics(userId) : null,
      this.enabled.cass ? this.cass.getUserCompetencySummary(userId) : null
    ]);

    return {
      xapi: xapiStats || {
        totalAttempts: 0,
        totalCompleted: 0,
        averageScore: 0,
        totalDuration: 0
      },
      cass: cassStats || {
        totalCompetencies: 0,
        mastered: 0,
        inProgress: 0,
        byDomain: {}
      }
    };
  }

  /**
   * Tester la connexion aux deux systèmes
   */
  async testConnections(): Promise<{
    cass: boolean;
    xapi: boolean;
  }> {
    const [cassOk, xapiOk] = await Promise.all([
      this.enabled.cass ? this.cass.testConnection() : Promise.resolve(false),
      this.enabled.xapi ? this.xapi.testConnection() : Promise.resolve(false)
    ]);

    return { cass: cassOk, xapi: xapiOk };
  }

  /**
   * Obtenir le statut de l'intégration
   */
  getStatus() {
    return {
      cass: {
        enabled: this.enabled.cass,
        configured: !!process.env.NEXT_PUBLIC_CASS_API_KEY
      },
      xapi: {
        enabled: this.enabled.xapi,
        configured: !!(process.env.NEXT_PUBLIC_LRS_USERNAME && process.env.NEXT_PUBLIC_LRS_PASSWORD)
      }
    };
  }

  /**
   * RÈGLE DE COHÉRENCE DOMAINE 5 (MAPPING OPÉRATIONNEL FINAL §4.1)
   * 
   * Vérifie si une activité peut valider des compétences du Domaine 5 (métalinguistique).
   * 
   * Conditions pour valider une compétence 5.x :
   * 1. L'activité est de type "auto-réflexif" (produit automatiquement une preuve), OU
   * 2. L'activité fournit une réponse textuelle (justification de l'apprenant)
   * 
   * @param activityType Type de l'activité
   * @param response Réponse textuelle de l'apprenant (optionnel)
   * @returns true si les compétences 5.x peuvent être validées
   */
  private canValidateDomain5Competencies(activityType: string, response?: string): boolean {
    // Les activités auto-réflexives peuvent toujours valider le Domaine 5
    if (ACTIVITES_AUTO_REFLEXIVES.includes(activityType)) {
      return true;
    }

    // Les activités linguistiques AVEC justification textuelle peuvent valider le Domaine 5
    if (ACTIVITES_LINGUISTIQUES.includes(activityType) && response && response.trim().length >= 20) {
      return true;
    }

    // Les QCM simples, texte à trous simples, etc. ne peuvent PAS valider le Domaine 5
    // car ils ne fournissent pas de preuve réflexive
    return false;
  }

  /**
   * Vérifie si une activité est considérée comme "réflexive" (Famille A4)
   */
  isReflexiveActivity(activityType: string): boolean {
    return ACTIVITES_REFLEXIVES.includes(activityType);
  }

  /**
   * Vérifie si une activité est considérée comme "linguistique" (Famille A2)
   */
  isLinguisticActivity(activityType: string): boolean {
    return ACTIVITES_LINGUISTIQUES.includes(activityType);
  }
}

// Instance singleton
export const integrationService = new IntegrationService();
