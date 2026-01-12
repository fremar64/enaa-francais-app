/**
 * Service d'intégration avec CaSS (Competency and Skills System)
 * https://cass.ceredis.net
 */

import axios, { AxiosInstance } from 'axios';
import type {
  CassAssertion,
  CeredisCompetence,
  NiveauCECRL
} from './types';
import {
  COMPETENCES_CEREDIS,
  MAPPING_ACTIVITES_COMPETENCES
} from './types';

export class CassService {
  private client: AxiosInstance;
  private frameworkId: string;

  constructor(
    apiUrl: string = process.env.NEXT_PUBLIC_CASS_API_URL || 'https://cass.ceredis.net/api',
    apiKey: string = process.env.NEXT_PUBLIC_CASS_API_KEY || '',
    frameworkId: string = process.env.NEXT_PUBLIC_CASS_FRAMEWORK_ID || ''
  ) {
    this.frameworkId = frameworkId;
    
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  /**
   * Récupérer toutes les compétences du framework CEREDIS
   */
  async getFrameworkCompetencies(): Promise<any[]> {
    try {
      const response = await this.client.get(
        `/framework/${this.frameworkId}/competency`
      );
      return response.data;
    } catch (error) {
      console.error('[CaSS] Erreur récupération compétences:', error);
      throw new Error('Impossible de récupérer les compétences du framework');
    }
  }

  /**
   * Récupérer une compétence spécifique par son ID
   */
  async getCompetency(competencyId: string): Promise<any> {
    try {
      const response = await this.client.get(`/competency/${competencyId}`);
      return response.data;
    } catch (error) {
      console.error(`[CaSS] Erreur récupération compétence ${competencyId}:`, error);
      return null;
    }
  }

  /**
   * Mapper une activité pédagogique aux compétences CEREDIS
   * Basé sur la MATRICE OPÉRATIONNELLE
   */
  getCompetenciesForActivity(
    activityType: string,
    niveau?: NiveauCECRL
  ): string[] {
    const competencyIds = MAPPING_ACTIVITES_COMPETENCES[activityType] || [];
    
    // Filtrer par niveau si spécifié
    if (niveau) {
      return competencyIds.filter(id => {
        const comp = COMPETENCES_CEREDIS[id];
        return comp && this.isLevelCompatible(comp.level, niveau);
      });
    }
    
    return competencyIds;
  }

  /**
   * Vérifier si un niveau de compétence est compatible avec le niveau de l'activité
   */
  private isLevelCompatible(compLevel: NiveauCECRL, activityLevel: NiveauCECRL): boolean {
    const levels: NiveauCECRL[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const compIndex = levels.indexOf(compLevel);
    const actIndex = levels.indexOf(activityLevel);
    
    // La compétence est compatible si elle est au même niveau ou inférieure
    return compIndex <= actIndex;
  }

  /**
   * Créer une assertion (preuve de compétence)
   */
  async createAssertion(data: {
    competencyId: string;
    userId: string;
    evidence: string; // URL ou description de la preuve
    level: NiveauCECRL;
    confidence: number; // 0.0 - 1.0
    score?: number;
    maxScore?: number;
  }): Promise<CassAssertion | null> {
    try {
      // Calculer le confidence basé sur le score si disponible
      let confidence = data.confidence;
      if (data.score !== undefined && data.maxScore !== undefined) {
        const scoreRatio = data.score / data.maxScore;
        // Ajuster la confiance: 
        // - 100% = 1.0, 90% = 0.9, 80% = 0.8, etc.
        // - En dessous de 60% = pas d'assertion
        if (scoreRatio < 0.6) {
          console.log(`[CaSS] Score insuffisant (${scoreRatio * 100}%) pour créer une assertion`);
          return null;
        }
        confidence = Math.min(scoreRatio, 1.0);
      }

      const assertion: CassAssertion = {
        '@context': 'http://purl.org/ctdl/terms/',
        '@type': 'ceasn:Assertion',
        competency: data.competencyId,
        subject: data.userId,
        evidence: data.evidence,
        level: data.level,
        confidence: confidence,
        assertedDate: new Date().toISOString()
      };

      const response = await this.client.post('/assertion', assertion);
      
      console.log(`[CaSS] ✅ Assertion créée pour compétence ${data.competencyId}`, {
        userId: data.userId,
        confidence: confidence.toFixed(2)
      });
      
      return response.data;
    } catch (error: any) {
      console.error('[CaSS] Erreur création assertion:', error.response?.data || error.message);
      return null;
    }
  }

  /**
   * Créer plusieurs assertions en batch
   * 
   * RÈGLE DE COHÉRENCE DOMAINE 5 (MAPPING OPÉRATIONNEL §4.1) :
   * Si canValidateDomain5 est false, les compétences 5.x sont filtrées
   */
  async createMultipleAssertions(
    userId: string,
    activityId: string,
    activityType: string,
    niveau: NiveauCECRL,
    score: number,
    maxScore: number,
    evidence: string,
    canValidateDomain5: boolean = true // Nouveau paramètre
  ): Promise<CassAssertion[]> {
    let competencyIds = this.getCompetenciesForActivity(activityType, niveau);
    
    // RÈGLE DE COHÉRENCE : Filtrer les compétences 5.x si pas de preuve réflexive
    if (!canValidateDomain5) {
      const filtered = competencyIds.filter(id => !id.startsWith('5.'));
      if (filtered.length < competencyIds.length) {
        console.log(`[CaSS] ⚠️ Compétences Domaine 5 filtrées (preuve réflexive requise) : ${competencyIds.filter(id => id.startsWith('5.')).join(', ')}`);
      }
      competencyIds = filtered;
    }
    
    if (competencyIds.length === 0) {
      console.log(`[CaSS] Aucune compétence mappée pour ${activityType}`);
      return [];
    }

    const assertions: CassAssertion[] = [];
    
    for (const compId of competencyIds) {
      const assertion = await this.createAssertion({
        competencyId: compId,
        userId,
        evidence,
        level: niveau,
        confidence: 0.8, // Sera recalculé avec le score
        score,
        maxScore
      });
      
      if (assertion) {
        assertions.push(assertion);
      }
    }

    console.log(`[CaSS] ✅ ${assertions.length}/${competencyIds.length} assertions créées`);
    return assertions;
  }

  /**
   * Récupérer toutes les assertions d'un apprenant
   */
  async getUserAssertions(userId: string): Promise<CassAssertion[]> {
    try {
      const response = await this.client.get(
        `/assertion/search?subject=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(`[CaSS] Erreur récupération assertions de ${userId}:`, error);
      return [];
    }
  }

  /**
   * Récupérer les assertions par compétence
   */
  async getAssertionsByCompetency(
    userId: string,
    competencyId: string
  ): Promise<CassAssertion[]> {
    try {
      const response = await this.client.get(
        `/assertion/search?subject=${userId}&competency=${competencyId}`
      );
      return response.data;
    } catch (error) {
      console.error(`[CaSS] Erreur récupération assertions:`, error);
      return [];
    }
  }

  /**
   * Calculer le niveau de maîtrise d'une compétence
   * Basé sur les assertions existantes
   */
  async getCompetencyMastery(
    userId: string,
    competencyId: string
  ): Promise<{
    mastered: boolean;
    averageConfidence: number;
    assertionCount: number;
  }> {
    const assertions = await this.getAssertionsByCompetency(userId, competencyId);
    
    if (assertions.length === 0) {
      return { mastered: false, averageConfidence: 0, assertionCount: 0 };
    }

    const avgConfidence = assertions.reduce((sum, a) => sum + a.confidence, 0) / assertions.length;
    
    // Considéré comme maîtrisé si:
    // - Au moins 3 assertions
    // - Confiance moyenne >= 0.75
    const mastered = assertions.length >= 3 && avgConfidence >= 0.75;

    return {
      mastered,
      averageConfidence: avgConfidence,
      assertionCount: assertions.length
    };
  }

  /**
   * Obtenir un résumé des compétences d'un apprenant
   */
  async getUserCompetencySummary(userId: string): Promise<{
    total: number;
    mastered: number;
    inProgress: number;
    byDomain: Record<string, number>;
  }> {
    const assertions = await this.getUserAssertions(userId);
    
    // Grouper par compétence
    const competencyMap = new Map<string, CassAssertion[]>();
    assertions.forEach(assertion => {
      const compId = assertion.competency;
      if (!competencyMap.has(compId)) {
        competencyMap.set(compId, []);
      }
      competencyMap.get(compId)!.push(assertion);
    });

    let mastered = 0;
    let inProgress = 0;
    const byDomain: Record<string, number> = {};

    for (const [compId, compAssertions] of competencyMap.entries()) {
      const avgConf = compAssertions.reduce((s, a) => s + a.confidence, 0) / compAssertions.length;
      
      if (compAssertions.length >= 3 && avgConf >= 0.75) {
        mastered++;
      } else {
        inProgress++;
      }

      // Compter par domaine (ex: "5.1" → domaine "5")
      const domain = compId.split('.')[0];
      byDomain[domain] = (byDomain[domain] || 0) + 1;
    }

    return {
      total: competencyMap.size,
      mastered,
      inProgress,
      byDomain
    };
  }

  /**
   * Test de connexion
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/framework');
      console.log('[CaSS] ✅ Connexion réussie');
      return true;
    } catch (error) {
      console.error('[CaSS] ❌ Échec connexion:', error);
      return false;
    }
  }
}

// Instance singleton
export const cassService = new CassService();
