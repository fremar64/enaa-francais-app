/**
 * Service d'intégration avec LRS Ralph (xAPI)
 * https://lrs.ceredis.net
 */

import axios, { AxiosInstance } from 'axios';
import type { XApiStatement, NiveauCECRL } from './types';
import { XAPI_VERBS } from './types';

export class XApiService {
  private client: AxiosInstance;
  private baseActivityUrl: string;

  constructor(
    lrsUrl: string = process.env.NEXT_PUBLIC_LRS_URL || 'https://lrs.ceredis.net/xAPI',
    username: string = process.env.NEXT_PUBLIC_LRS_USERNAME || '',
    password: string = process.env.NEXT_PUBLIC_LRS_PASSWORD || '',
    baseActivityUrl: string = 'https://enaa-chansons.ceredis.net'
  ) {
    this.baseActivityUrl = baseActivityUrl;

    // Créer l'authentification Basic (compatible navigateur)
    const auth = btoa(`${username}:${password}`);

    this.client = axios.create({
      baseURL: lrsUrl,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'X-Experience-API-Version': '1.0.3'
      },
      timeout: 10000
    });
  }

  /**
   * Envoyer un statement xAPI au LRS
   */
  async sendStatement(statement: XApiStatement): Promise<string[]> {
    try {
      // Ajouter timestamp si absent
      if (!statement.timestamp) {
        statement.timestamp = new Date().toISOString();
      }

      const response = await this.client.post('/statements', statement);
      
      console.log('[xAPI] ✅ Statement envoyé:', {
        actor: statement.actor.name,
        verb: Object.values(XAPI_VERBS).find(v => v.id === statement.verb.id)?.display['fr-FR'],
        object: statement.object.definition.name['fr-FR']
      });
      
      return response.data; // Array of statement IDs
    } catch (error: any) {
      console.error('[xAPI] Erreur envoi statement:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Envoyer plusieurs statements en batch
   */
  async sendStatements(statements: XApiStatement[]): Promise<string[]> {
    try {
      // Ajouter timestamps
      statements.forEach(stmt => {
        if (!stmt.timestamp) {
          stmt.timestamp = new Date().toISOString();
        }
      });

      const response = await this.client.post('/statements', statements);
      
      console.log(`[xAPI] ✅ ${statements.length} statements envoyés`);
      
      return response.data;
    } catch (error: any) {
      console.error('[xAPI] Erreur envoi batch:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Créer un statement "attempted" (activité démarrée)
   */
  createAttemptedStatement(
    userId: string,
    userName: string,
    activityId: string,
    activityName: string,
    activityType: string = 'assessment',
    context?: {
      chansonId?: string;
      seanceId?: string;
    }
  ): XApiStatement {
    return {
      actor: {
        mbox: `mailto:${userId}@ceredis.net`,
        name: userName,
        objectType: 'Agent'
      },
      verb: XAPI_VERBS.ATTEMPTED,
      object: {
        id: `${this.baseActivityUrl}/activity/${activityId}`,
        objectType: 'Activity',
        definition: {
          name: { 'fr-FR': activityName },
          type: `http://adlnet.gov/expapi/activities/${activityType}`,
          extensions: {
            'https://ceredis.net/xapi/extensions/activity-type': activityType,
            ...(context?.chansonId && {
              'https://ceredis.net/xapi/extensions/chanson-id': context.chansonId
            }),
            ...(context?.seanceId && {
              'https://ceredis.net/xapi/extensions/seance-id': context.seanceId
            })
          }
        }
      },
      context: context?.seanceId ? {
        contextActivities: {
          parent: [{
            id: `${this.baseActivityUrl}/seance/${context.seanceId}`,
            objectType: 'Activity',
            definition: {
              name: { 'fr-FR': `Séance ${context.seanceId}` },
              type: 'http://adlnet.gov/expapi/activities/module'
            }
          }]
        }
      } : undefined
    };
  }

  /**
   * Créer un statement "completed" (activité complétée)
   */
  createCompletedStatement(
    userId: string,
    userName: string,
    activityId: string,
    activityName: string,
    score: number,
    maxScore: number,
    duration: number, // en secondes
    activityType: string = 'assessment',
    context?: {
      chansonId?: string;
      seanceId?: string;
    }
  ): XApiStatement {
    const scoreRatio = score / maxScore;
    const success = scoreRatio >= 0.6; // 60% = réussite

    return {
      actor: {
        mbox: `mailto:${userId}@ceredis.net`,
        name: userName,
        objectType: 'Agent'
      },
      verb: success ? XAPI_VERBS.COMPLETED : XAPI_VERBS.ATTEMPTED,
      object: {
        id: `${this.baseActivityUrl}/activity/${activityId}`,
        objectType: 'Activity',
        definition: {
          name: { 'fr-FR': activityName },
          type: `http://adlnet.gov/expapi/activities/${activityType}`,
          extensions: {
            'https://ceredis.net/xapi/extensions/activity-type': activityType,
            ...(context?.chansonId && {
              'https://ceredis.net/xapi/extensions/chanson-id': context.chansonId
            }),
            ...(context?.seanceId && {
              'https://ceredis.net/xapi/extensions/seance-id': context.seanceId
            })
          }
        }
      },
      result: {
        score: {
          scaled: scoreRatio,
          raw: score,
          min: 0,
          max: maxScore
        },
        success,
        completion: true,
        duration: `PT${duration}S` // Format ISO 8601
      },
      context: context?.seanceId ? {
        contextActivities: {
          parent: [{
            id: `${this.baseActivityUrl}/seance/${context.seanceId}`,
            objectType: 'Activity',
            definition: {
              name: { 'fr-FR': `Séance ${context.seanceId}` },
              type: 'http://adlnet.gov/expapi/activities/module'
            }
          }]
        }
      } : undefined
    };
  }

  /**
   * Créer un statement "mastered" (compétence maîtrisée)
   */
  createMasteredStatement(
    userId: string,
    userName: string,
    competencyId: string,
    competencyName: string,
    level: NiveauCECRL,
    cassAssertionId?: string
  ): XApiStatement {
    return {
      actor: {
        mbox: `mailto:${userId}@ceredis.net`,
        name: userName,
        objectType: 'Agent'
      },
      verb: XAPI_VERBS.MASTERED,
      object: {
        id: `https://cass.ceredis.net/competency/${competencyId}`,
        objectType: 'Activity',
        definition: {
          name: { 'fr-FR': competencyName },
          type: 'http://adlnet.gov/expapi/activities/competency',
          extensions: {
            'https://ceredis.net/xapi/extensions/cecrl-level': level,
            'https://ceredis.net/xapi/extensions/competency-id': competencyId,
            ...(cassAssertionId && {
              'https://ceredis.net/xapi/extensions/cass-assertion': cassAssertionId
            })
          }
        }
      }
    };
  }

  /**
   * Récupérer les statements d'un apprenant
   */
  async getUserStatements(
    userId: string,
    options?: {
      verb?: string;
      since?: Date;
      until?: Date;
      limit?: number;
    }
  ): Promise<XApiStatement[]> {
    try {
      const params: any = {
        agent: JSON.stringify({
          mbox: `mailto:${userId}@ceredis.net`,
          objectType: 'Agent'
        })
      };

      if (options?.verb) {
        params.verb = options.verb;
      }
      if (options?.since) {
        params.since = options.since.toISOString();
      }
      if (options?.until) {
        params.until = options.until.toISOString();
      }
      if (options?.limit) {
        params.limit = options.limit;
      }

      const response = await this.client.get('/statements', { params });
      
      return response.data.statements || [];
    } catch (error) {
      console.error(`[xAPI] Erreur récupération statements de ${userId}:`, error);
      return [];
    }
  }

  /**
   * Obtenir des statistiques d'un apprenant
   */
  async getUserStatistics(userId: string): Promise<{
    totalAttempts: number;
    totalCompleted: number;
    totalMastered: number;
    averageScore: number;
    totalDuration: number; // en secondes
  }> {
    const statements = await this.getUserStatements(userId);

    let totalAttempts = 0;
    let totalCompleted = 0;
    let totalMastered = 0;
    let totalScore = 0;
    let scoreCount = 0;
    let totalDuration = 0;

    statements.forEach(stmt => {
      if (stmt.verb.id === XAPI_VERBS.ATTEMPTED.id) {
        totalAttempts++;
      } else if (stmt.verb.id === XAPI_VERBS.COMPLETED.id) {
        totalCompleted++;
      } else if (stmt.verb.id === XAPI_VERBS.MASTERED.id) {
        totalMastered++;
      }

      if (stmt.result?.score?.scaled !== undefined) {
        totalScore += stmt.result.score.scaled;
        scoreCount++;
      }

      if (stmt.result?.duration) {
        // Parser ISO 8601 duration (PT30S = 30 secondes)
        const match = stmt.result.duration.match(/PT(\d+)S/);
        if (match) {
          totalDuration += parseInt(match[1]);
        }
      }
    });

    return {
      totalAttempts,
      totalCompleted,
      totalMastered,
      averageScore: scoreCount > 0 ? totalScore / scoreCount : 0,
      totalDuration
    };
  }

  /**
   * Test de connexion
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/about');
      console.log('[xAPI] ✅ Connexion LRS réussie');
      return true;
    } catch (error) {
      console.error('[xAPI] ❌ Échec connexion LRS:', error);
      return false;
    }
  }
}

// Instance singleton
export const xapiService = new XApiService();
