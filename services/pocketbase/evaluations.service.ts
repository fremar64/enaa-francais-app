// Service pour gérer l'évaluation des compétences des utilisateurs
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour l'évaluation d'une compétence
export interface EvaluationCompetence extends BaseModel {
  user: string; // ID utilisateur (relation)
  competence: string; // ID compétence (relation)
  niveau_atteint: number; // 0-100
  derniere_evaluation: string; // Date ISO
  historique?: EvaluationHistorique[];
}

// Interface pour l'historique d'une évaluation
export interface EvaluationHistorique {
  date: string;
  score: number;
  source: string; // ID de la séance ou activité
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
   * Récupérer ou créer une évaluation pour une compétence
   */
  async getOrCreate(userId: string, competenceId: string): Promise<EvaluationCompetence> {
    try {
      // Chercher si une évaluation existe déjà
      const existing = await this.collection.getFullList<EvaluationCompetence>({
        filter: `user = "${userId}" && competence = "${competenceId}"`,
      });

      if (existing.length > 0) {
        return existing[0];
      }

      // Créer une nouvelle évaluation
      const newEval = await this.collection.create<EvaluationCompetence>({
        user: userId,
        competence: competenceId,
        niveau_atteint: 0,
        derniere_evaluation: new Date().toISOString(),
        historique: [],
      });

      return newEval;
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
   * Récupérer l'évaluation d'une compétence spécifique
   */
  async getOne(userId: string, competenceId: string): Promise<EvaluationCompetence | null> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetence>({
        filter: `user = "${userId}" && competence = "${competenceId}"`,
      });
      return records[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'évaluation:', error);
      return null;
    }
  }

  /**
   * Mettre à jour le niveau d'une compétence
   */
  async updateNiveau(
    userId: string,
    competenceId: string,
    nouveauScore: number,
    source: string
  ): Promise<EvaluationCompetence> {
    try {
      const evaluation = await this.getOrCreate(userId, competenceId);

      // Ajouter à l'historique
      const historique = evaluation.historique || [];
      historique.push({
        date: new Date().toISOString(),
        score: nouveauScore,
        source,
      });

      // Calculer le nouveau niveau (moyenne pondérée favorisant les scores récents)
      const nouveauNiveau = this.calculateWeightedAverage(historique);

      return await this.update(evaluation.id, {
        niveau_atteint: nouveauNiveau,
        derniere_evaluation: new Date().toISOString(),
        historique,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau:', error);
      throw error;
    }
  }

  /**
   * Calculer la moyenne pondérée (les évaluations récentes ont plus de poids)
   */
  private calculateWeightedAverage(historique: EvaluationHistorique[]): number {
    if (historique.length === 0) return 0;

    // Prendre les 10 dernières évaluations maximum
    const recent = historique.slice(-10);

    let totalScore = 0;
    let totalWeight = 0;

    recent.forEach((eval, index) => {
      // Le poids augmente avec la récence (1, 2, 3, ... 10)
      const weight = index + 1;
      totalScore += eval.score * weight;
      totalWeight += weight;
    });

    return Math.round(totalScore / totalWeight);
  }

  /**
   * Récupérer les compétences maîtrisées (niveau >= 70%)
   */
  async getMastered(userId: string): Promise<EvaluationCompetenceExpanded[]> {
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
   * Récupérer les compétences en cours d'acquisition (30-70%)
   */
  async getInProgress(userId: string): Promise<EvaluationCompetenceExpanded[]> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}" && niveau_atteint >= 30 && niveau_atteint < 70`,
        sort: '-niveau_atteint',
        expand: 'competence',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences en cours:', error);
      throw error;
    }
  }

  /**
   * Récupérer les compétences à travailler (niveau < 30%)
   */
  async getNeedsWork(userId: string): Promise<EvaluationCompetenceExpanded[]> {
    try {
      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}" && niveau_atteint < 30`,
        sort: 'niveau_atteint',
        expand: 'competence',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences à travailler:', error);
      throw error;
    }
  }

  /**
   * Calculer les statistiques globales d'un utilisateur
   */
  async getStatistics(userId: string) {
    try {
      const evaluations = await this.getAllByUser(userId);

      if (evaluations.length === 0) {
        return {
          total: 0,
          maitrisees: 0,
          enCours: 0,
          aTravailler: 0,
          niveauMoyen: 0,
        };
      }

      const maitrisees = evaluations.filter(e => e.niveau_atteint >= 70).length;
      const enCours = evaluations.filter(e => e.niveau_atteint >= 30 && e.niveau_atteint < 70).length;
      const aTravailler = evaluations.filter(e => e.niveau_atteint < 30).length;

      const niveauTotal = evaluations.reduce((sum, e) => sum + e.niveau_atteint, 0);
      const niveauMoyen = Math.round(niveauTotal / evaluations.length);

      return {
        total: evaluations.length,
        maitrisees,
        enCours,
        aTravailler,
        niveauMoyen,
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      throw error;
    }
  }

  /**
   * Obtenir l'évolution d'une compétence dans le temps
   */
  async getEvolution(userId: string, competenceId: string): Promise<EvaluationHistorique[]> {
    try {
      const evaluation = await this.getOne(userId, competenceId);
      return evaluation?.historique || [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'évolution:', error);
      return [];
    }
  }

  /**
   * Récupérer les compétences par catégorie
   */
  async getByCategorie(userId: string, categorie: string): Promise<EvaluationCompetenceExpanded[]> {
    try {
      // On doit d'abord récupérer les IDs des compétences de cette catégorie
      const competences = await pb.collection('competences').getFullList({
        filter: `categorie = "${categorie}"`,
        fields: 'id',
      });

      const competenceIds = competences.map(c => c.id);

      if (competenceIds.length === 0) {
        return [];
      }

      // Construire le filtre
      const competenceFilter = competenceIds.map(id => `competence = "${id}"`).join(' || ');

      const records = await this.collection.getFullList<EvaluationCompetenceExpanded>({
        filter: `user = "${userId}" && (${competenceFilter})`,
        sort: '-niveau_atteint',
        expand: 'competence',
      });

      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération par catégorie:', error);
      throw error;
    }
  }

  /**
   * Réinitialiser une évaluation (admin uniquement)
   */
  async reset(userId: string, competenceId: string): Promise<boolean> {
    try {
      const evaluation = await this.getOne(userId, competenceId);
      
      if (!evaluation) return false;

      await this.update(evaluation.id, {
        niveau_atteint: 0,
        derniere_evaluation: new Date().toISOString(),
        historique: [],
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour une évaluation (méthode interne)
   */
  private async update(
    id: string,
    data: Partial<Omit<EvaluationCompetence, keyof BaseModel>>
  ): Promise<EvaluationCompetence> {
    try {
      const record = await this.collection.update<EvaluationCompetence>(id, data);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l\'évaluation ${id}:`, error);
      throw error;
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
      console.error(`Erreur lors de la suppression de l\'évaluation ${id}:`, error);
      throw error;
    }
  }
}

// Export singleton
export const evaluationsCompetencesService = new EvaluationsCompetencesService();
export default evaluationsCompetencesService;
