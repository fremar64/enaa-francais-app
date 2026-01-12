// Service pour gérer la progression des utilisateurs
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour la progression d'un utilisateur sur une séance
export interface Progression extends BaseModel {
  user: string; // ID utilisateur (relation)
  seance: string; // ID séance (relation)
  statut: 'non_commence' | 'en_cours' | 'termine';
  ecran_actuel: number;
  score_total: number;
  score_max: number;
  temps_passe: number; // en secondes
  date_debut: string;
  date_fin?: string;
  tentatives: number;
}

// Interface étendue avec relations
export interface ProgressionExpanded extends Progression {
  expand?: {
    user?: any;
    seance?: any;
  };
}

class ProgressionService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('progression');
  }

  /**
   * Récupérer ou créer la progression d'un utilisateur pour une séance
   */
  async getOrCreate(userId: string, seanceId: string): Promise<Progression> {
    try {
      // Chercher si une progression existe déjà
      const existing = await this.collection.getFullList<Progression>({
        filter: `user = "${userId}" && seance = "${seanceId}"`,
      });

      if (existing.length > 0) {
        return existing[0];
      }

      // Créer une nouvelle progression
      const newProgression = await this.collection.create<Progression>({
        user: userId,
        seance: seanceId,
        statut: 'non_commence',
        ecran_actuel: 0,
        score_total: 0,
        score_max: 0,
        temps_passe: 0,
        date_debut: new Date().toISOString(),
        tentatives: 1,
      });

      return newProgression;
    } catch (error) {
      console.error('Erreur lors de la récupération/création de la progression:', error);
      throw error;
    }
  }

  /**
   * Récupérer la progression d'un utilisateur pour une séance spécifique
   */
  async getOne(userId: string, seanceId: string): Promise<Progression | null> {
    try {
      const records = await this.collection.getFullList<Progression>({
        filter: `user = "${userId}" && seance = "${seanceId}"`,
      });

      return records[0] || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression:', error);
      return null;
    }
  }

  /**
   * Récupérer toutes les progressions d'un utilisateur
   */
  async getAllByUser(userId: string, expand?: boolean): Promise<ProgressionExpanded[]> {
    try {
      const records = await this.collection.getFullList<ProgressionExpanded>({
        filter: `user = "${userId}"`,
        sort: '-updated',
        expand: expand ? 'seance,seance.chanson' : undefined,
      });

      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des progressions:', error);
      throw error;
    }
  }

  /**
   * Récupérer les progressions d'un utilisateur pour une chanson
   */
  async getByChanson(userId: string, chansonId: string): Promise<Progression[]> {
    try {
      // On doit d'abord récupérer les IDs des séances de cette chanson
      const seances = await pb.collection('seances').getFullList({
        filter: `chanson = "${chansonId}"`,
        fields: 'id',
      });

      const seanceIds = seances.map(s => s.id);

      if (seanceIds.length === 0) {
        return [];
      }

      // Construire le filtre pour ces séances
      const seanceFilter = seanceIds.map(id => `seance = "${id}"`).join(' || ');

      const records = await this.collection.getFullList<Progression>({
        filter: `user = "${userId}" && (${seanceFilter})`,
        sort: 'created',
      });

      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des progressions par chanson:', error);
      throw error;
    }
  }

  /**
   * Commencer une séance
   */
  async start(userId: string, seanceId: string): Promise<Progression> {
    try {
      const progression = await this.getOrCreate(userId, seanceId);

      if (progression.statut === 'non_commence') {
        return await this.update(progression.id, {
          statut: 'en_cours',
          ecran_actuel: 1,
          date_debut: new Date().toISOString(),
        });
      }

      return progression;
    } catch (error) {
      console.error('Erreur lors du démarrage de la séance:', error);
      throw error;
    }
  }

  /**
   * Passer à l'écran suivant
   */
  async nextEcran(progressionId: string): Promise<Progression> {
    try {
      const progression = await this.collection.getOne<Progression>(progressionId);

      return await this.update(progressionId, {
        ecran_actuel: progression.ecran_actuel + 1,
        statut: 'en_cours',
      });
    } catch (error) {
      console.error('Erreur lors du passage à l\'écran suivant:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour le score
   */
  async updateScore(progressionId: string, scoreGagne: number, scoreMax: number): Promise<Progression> {
    try {
      const progression = await this.collection.getOne<Progression>(progressionId);

      return await this.update(progressionId, {
        score_total: progression.score_total + scoreGagne,
        score_max: progression.score_max + scoreMax,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error);
      throw error;
    }
  }

  /**
   * Ajouter du temps passé
   */
  async addTime(progressionId: string, secondes: number): Promise<Progression> {
    try {
      const progression = await this.collection.getOne<Progression>(progressionId);

      return await this.update(progressionId, {
        temps_passe: progression.temps_passe + secondes,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du temps:', error);
      throw error;
    }
  }

  /**
   * Terminer une séance
   */
  async complete(progressionId: string): Promise<Progression> {
    try {
      return await this.update(progressionId, {
        statut: 'termine',
        date_fin: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Erreur lors de la complétion de la séance:', error);
      throw error;
    }
  }

  /**
   * Recommencer une séance (nouvelle tentative)
   */
  async restart(progressionId: string): Promise<Progression> {
    try {
      const progression = await this.collection.getOne<Progression>(progressionId);

      return await this.update(progressionId, {
        statut: 'en_cours',
        ecran_actuel: 1,
        score_total: 0,
        score_max: 0,
        temps_passe: 0,
        date_debut: new Date().toISOString(),
        date_fin: undefined,
        tentatives: progression.tentatives + 1,
      });
    } catch (error) {
      console.error('Erreur lors du redémarrage de la séance:', error);
      throw error;
    }
  }

  /**
   * Calculer le pourcentage de progression
   */
  calculateProgress(progression: Progression, totalEcrans: number): number {
    if (totalEcrans === 0) return 0;
    return Math.round((progression.ecran_actuel / totalEcrans) * 100);
  }

  /**
   * Calculer le pourcentage de score
   */
  calculateScorePercentage(progression: Progression): number {
    if (progression.score_max === 0) return 0;
    return Math.round((progression.score_total / progression.score_max) * 100);
  }

  /**
   * Obtenir les statistiques globales d'un utilisateur
   */
  async getStatistics(userId: string) {
    try {
      const progressions = await this.getAllByUser(userId);

      const completed = progressions.filter(p => p.statut === 'termine').length;
      const inProgress = progressions.filter(p => p.statut === 'en_cours').length;
      const total = progressions.length;

      const totalTime = progressions.reduce((sum, p) => sum + p.temps_passe, 0);
      const totalScore = progressions.reduce((sum, p) => sum + p.score_total, 0);
      const totalScoreMax = progressions.reduce((sum, p) => sum + p.score_max, 0);

      const averageScore = totalScoreMax > 0 ? Math.round((totalScore / totalScoreMax) * 100) : 0;

      return {
        total,
        completed,
        inProgress,
        notStarted: total - completed - inProgress,
        totalTime, // en secondes
        averageScore, // en %
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour une progression (méthode interne)
   */
  private async update(id: string, data: Partial<Omit<Progression, keyof BaseModel>>): Promise<Progression> {
    try {
      const record = await this.collection.update<Progression>(id, data);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la progression ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer une progression (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la progression ${id}:`, error);
      throw error;
    }
  }
}

// Export singleton
export const progressionService = new ProgressionService();
export default progressionService;
