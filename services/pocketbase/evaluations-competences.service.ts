// Service pour gérer les évaluations de compétences des utilisateurs
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour une évaluation de compétence
export interface EvaluationCompetence extends BaseModel {
  user: string; // ID utilisateur
  competence: string; // ID compétence
  niveau_atteint: number; // 0-100
  derniere_evaluation: string; // Date ISO
  historique?: EvaluationHistorique[];
}

export interface EvaluationHistorique {
  date: string; // Date ISO
  score: number; // 0-100
  seance?: string; // ID de la séance (optionnel)
}

// Interface étendue avec relations
export interface EvaluationCompetenceExpanded extends EvaluationCompetence {
  expand?: {
    user?: any;
    competence?: any;
  };
}

class EvaluationsCompetencesService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('evaluations_competences');
  }

  /**
   * Récupérer ou créer une évaluation pour un utilisateur et une compétence
   */
  async getOrCreate(userId: string, competenceId: string): Promise<EvaluationCompetence> {
    try {
      // Chercher si une évaluation existe
      const existing = await this.collection.getFullList<EvaluationCompetence>({
        filter: `user = "${userId}" && competence = "${competenceId}"`,
      });

      if (existing.length > 0) {
        return existing[0];
      }

      // Créer une nouvelle évaluation
      const newEvaluation = await this.collection.create<EvaluationCompetence>({
        user: userId,
        competence: competenceId,
        niveau_atteint: 0,
        derniere_evaluation: new Date().toISOString(),
        historique: [],
      });

      return newEvaluation;
    } catch (error) {
      console.error('Erreur lors de la récupération/création de l\'évaluation:', error);
      throw error;
    }
  }

  /**
   * Récupérer toutes les évaluations d'un utilisateur
   */
  async getAllByUser(userId: string, expand?: boolean): Promise<EvaluationCompetenceExpanded[]> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}"`,
        sort: '-niveau_atteint',
        expand: expand ? 'competence' : undefined,
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des évaluations:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour le niveau d'une compétence
   */
  async updateNiveau(
    userId: string,
    competenceId: string,
    nouveauScore: number,
    seanceId?: string
  ): Promise<EvaluationCompetence> {
    try {
      const evaluation = await this.getOrCreate(userId, competenceId);

      // Ajouter à l'historique
      const historique = evaluation.historique || [];
      historique.push({
        date: new Date().toISOString(),
        score: nouveauScore,
        seance: seanceId,
      });

      // Calculer le nouveau niveau (moyenne pondérée)
      const nouveauNiveau = this.calculateWeightedAverage(historique);

      // Mettre à jour
      const updated = await this.collection.update<EvaluationCompetence>(evaluation.id, {
        niveau_atteint: nouveauNiveau,
        derniere_evaluation: new Date().toISOString(),
        historique,
      });

      return updated;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau:', error);
      throw error;
    }
  }

  /**
   * Calculer la moyenne pondérée (les évaluations récentes pèsent plus)
   */
  private calculateWeightedAverage(historique: EvaluationHistorique[]): number {
    if (historique.length === 0) return 0;

    // Les 3 dernières évaluations ont plus de poids
    const recent = historique.slice(-3);
    const older = historique.slice(0, -3);

    const recentWeight = 0.7;
    const olderWeight = 0.3;

    const recentAvg = recent.reduce((sum, h) => sum + h.score, 0) / recent.length;
    const olderAvg = older.length > 0 
      ? older.reduce((sum, h) => sum + h.score, 0) / older.length 
      : recentAvg;

    const weighted = recentAvg * recentWeight + olderAvg * olderWeight;
    return Math.round(weighted);
  }

  /**
   * Récupérer les compétences maîtrisées (niveau >= 70%)
   */
  async getMasteredCompetences(userId: string): Promise<EvaluationCompetenceExpanded[]> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}" && niveau_atteint >= 70`,
        sort: '-niveau_atteint',
        expand: 'competence',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences maîtrisées:', error);
      throw error;
    }
  }

  /**
   * Récupérer les compétences à améliorer (niveau < 50%)
   */
  async getCompetencesToImprove(userId: string): Promise<EvaluationCompetenceExpanded[]> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}" && niveau_atteint < 50`,
        sort: 'niveau_atteint',
        expand: 'competence',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences à améliorer:', error);
      throw error;
    }
  }

  /**
   * Obtenir le niveau moyen global d'un utilisateur
   */
  async getAverageLevel(userId: string): Promise<number> {
    try {
      const evaluations = await this.getAllByUser(userId);

      if (evaluations.length === 0) return 0;

      const total = evaluations.reduce((sum, e) => sum + e.niveau_atteint, 0);
      return Math.round(total / evaluations.length);
    } catch (error) {
      console.error('Erreur lors du calcul du niveau moyen:', error);
      return 0;
    }
  }

  /**
   * Obtenir les statistiques par catégorie
   */
  async getStatsByCategorie(userId: string): Promise<Record<string, number>> {
    try {
      const evaluations = await this.getAllByUser(userId, true);

      const stats: Record<string, { total: number; sum: number }> = {};

      for (const evaluation of evaluations) {
        if (evaluation.expand?.competence) {
          const categorie = evaluation.expand.competence.categorie;
          if (!stats[categorie]) {
            stats[categorie] = { total: 0, sum: 0 };
          }
          stats[categorie].total++;
          stats[categorie].sum += evaluation.niveau_atteint;
        }
      }

      // Calculer les moyennes
      const result: Record<string, number> = {};
      for (const [categorie, data] of Object.entries(stats)) {
        result[categorie] = Math.round(data.sum / data.total);
      }

      return result;
    } catch (error) {
      console.error('Erreur lors du calcul des stats par catégorie:', error);
      throw error;
    }
  }

  /**
   * Obtenir la progression d'une compétence dans le temps
   */
  async getProgression(userId: string, competenceId: string): Promise<EvaluationHistorique[]> {
    try {
      const evaluation = await this.getOrCreate(userId, competenceId);
      return evaluation.historique || [];
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression:', error);
      return [];
    }
  }

  /**
   * Déterminer le niveau CECRL estimé d'un utilisateur
   */
  async estimateCECRLLevel(userId: string): Promise<'A2' | 'B1' | 'B2' | 'C1' | 'C2'> {
    try {
      const averageLevel = await this.getAverageLevel(userId);

      if (averageLevel < 30) return 'A2';
      if (averageLevel < 50) return 'B1';
      if (averageLevel < 70) return 'B2';
      if (averageLevel < 85) return 'C1';
      return 'C2';
    } catch (error) {
      console.error('Erreur lors de l\'estimation du niveau CECRL:', error);
      return 'A2';
    }
  }

  /**
   * Supprimer une évaluation (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'évaluation ${id}:`, error);
      throw error;
    }
  }

  /**
   * Réinitialiser toutes les évaluations d'un utilisateur (admin uniquement)
   */
  async resetUser(userId: string): Promise<boolean> {
    try {
      const evaluations = await this.getAllByUser(userId);
      for (const evaluation of evaluations) {
        await this.delete(evaluation.id);
      }
      return true;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des évaluations:', error);
      throw error;
    }
  }
}

// Export singleton
export const evaluationsCompetencesService = new EvaluationsCompetencesService();
export default evaluationsCompetencesService;
