// Service pour gérer les réponses des utilisateurs aux activités
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour une réponse à une activité
export interface Reponse extends BaseModel {
  user: string; // ID utilisateur (relation)
  seance: string; // ID séance (relation)
  ecran_id: string;
  activite_id: string;
  reponse_donnee: any; // JSON - structure variable selon type d'activité
  reponse_correcte?: any; // JSON - pour référence
  est_correct: boolean;
  score: number; // 0-100
  temps_reponse: number; // en secondes
  tentative: number;
}

// Types de réponses selon l'activité
export interface ReponseQCM {
  question_id: string;
  reponse_index: number;
}

export interface ReponseTexteATrous {
  mot_id: string;
  reponse: string;
}

export interface ReponseProductionEcrite {
  texte: string;
  nombre_mots: number;
}

class ReponsesService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('reponses');
  }

  /**
   * Enregistrer une réponse
   */
  async save(data: Omit<Reponse, keyof BaseModel>): Promise<Reponse> {
    try {
      const record = await this.collection.create<Reponse>(data);
      return record;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la réponse:', error);
      throw error;
    }
  }

  /**
   * Récupérer toutes les réponses d'un utilisateur pour une séance
   */
  async getBySeance(userId: string, seanceId: string): Promise<Reponse[]> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}" && seance = "${seanceId}"`,
        sort: 'created',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses:', error);
      throw error;
    }
  }

  /**
   * Récupérer les réponses pour un écran spécifique
   */
  async getByEcran(userId: string, seanceId: string, ecranId: string): Promise<Reponse[]> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}" && seance = "${seanceId}" && ecran_id = "${ecranId}"`,
        sort: 'created',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses par écran:', error);
      throw error;
    }
  }

  /**
   * Récupérer la dernière réponse pour une activité
   */
  async getLastForActivite(userId: string, seanceId: string, activiteId: string): Promise<Reponse | null> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}" && seance = "${seanceId}" && activite_id = "${activiteId}"`,
        sort: '-created',
      });
      return records[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière réponse:', error);
      return null;
    }
  }

  /**
   * Calculer le score moyen pour une séance
   */
  async calculateAverageScore(userId: string, seanceId: string): Promise<number> {
    try {
      const reponses = await this.getBySeance(userId, seanceId);
      
      if (reponses.length === 0) return 0;
      
      const totalScore = reponses.reduce((sum, r) => sum + r.score, 0);
      return Math.round(totalScore / reponses.length);
    } catch (error) {
      console.error('Erreur lors du calcul du score moyen:', error);
      return 0;
    }
  }

  /**
   * Calculer le taux de réussite pour une séance
   */
  async calculateSuccessRate(userId: string, seanceId: string): Promise<number> {
    try {
      const reponses = await this.getBySeance(userId, seanceId);
      
      if (reponses.length === 0) return 0;
      
      const correctCount = reponses.filter(r => r.est_correct).length;
      return Math.round((correctCount / reponses.length) * 100);
    } catch (error) {
      console.error('Erreur lors du calcul du taux de réussite:', error);
      return 0;
    }
  }

  /**
   * Obtenir des statistiques détaillées pour une séance
   */
  async getStatistics(userId: string, seanceId: string) {
    try {
      const reponses = await this.getBySeance(userId, seanceId);
      
      if (reponses.length === 0) {
        return {
          totalReponses: 0,
          reponsesCorrectes: 0,
          reponsesIncorrectes: 0,
          scoreTotal: 0,
          scoreMoyen: 0,
          tauxReussite: 0,
          tempsTotal: 0,
          tempsMoyen: 0,
        };
      }

      const reponsesCorrectes = reponses.filter(r => r.est_correct).length;
      const scoreTotal = reponses.reduce((sum, r) => sum + r.score, 0);
      const tempsTotal = reponses.reduce((sum, r) => sum + r.temps_reponse, 0);

      return {
        totalReponses: reponses.length,
        reponsesCorrectes,
        reponsesIncorrectes: reponses.length - reponsesCorrectes,
        scoreTotal,
        scoreMoyen: Math.round(scoreTotal / reponses.length),
        tauxReussite: Math.round((reponsesCorrectes / reponses.length) * 100),
        tempsTotal,
        tempsMoyen: Math.round(tempsTotal / reponses.length),
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      throw error;
    }
  }

  /**
   * Récupérer toutes les réponses d'un utilisateur
   */
  async getAllByUser(userId: string, limit?: number): Promise<Reponse[]> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}"`,
        sort: '-created',
        ...(limit && { $autoCancel: false }),
      });
      
      if (limit) {
        return records.slice(0, limit);
      }
      
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses utilisateur:', error);
      throw error;
    }
  }

  /**
   * Compter le nombre de tentatives pour une activité
   */
  async countTentatives(userId: string, seanceId: string, activiteId: string): Promise<number> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}" && seance = "${seanceId}" && activite_id = "${activiteId}"`,
      });
      return records.length;
    } catch (error) {
      console.error('Erreur lors du comptage des tentatives:', error);
      return 0;
    }
  }

  /**
   * Vérifier si une activité a été complétée avec succès
   */
  async isActiviteCompleted(userId: string, seanceId: string, activiteId: string): Promise<boolean> {
    try {
      const records = await this.collection.getFullList<Reponse>({
        filter: `user = "${userId}" && seance = "${seanceId}" && activite_id = "${activiteId}" && est_correct = true`,
      });
      return records.length > 0;
    } catch (error) {
      console.error('Erreur lors de la vérification de complétion:', error);
      return false;
    }
  }

  /**
   * Supprimer une réponse (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la réponse ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer toutes les réponses d'un utilisateur pour une séance (admin/reset)
   */
  async deleteBySeance(userId: string, seanceId: string): Promise<boolean> {
    try {
      const reponses = await this.getBySeance(userId, seanceId);
      
      for (const reponse of reponses) {
        await this.delete(reponse.id);
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression des réponses:', error);
      throw error;
    }
  }
}

// Export singleton
export const reponsesService = new ReponsesService();
export default reponsesService;
