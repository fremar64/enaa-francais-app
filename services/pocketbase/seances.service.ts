// Service pour gérer les séances pédagogiques
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';
import type { Ecran } from '@/types/seance';

// Interface pour une séance
export interface Seance extends BaseModel {
  chanson: string; // ID de la chanson (relation)
  titre: string;
  description: string;
  ordre: number;
  duree_estimee: number; // en minutes
  objectifs: string[];
  ecrans: Ecran[];
  competences_ciblees: string[]; // Codes de compétences
  niveau: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  prerequis?: string[]; // IDs de séances
  actif: boolean;
}

// Interface étendue avec les relations expandues
export interface SeanceExpanded extends Seance {
  expand?: {
    chanson?: any; // Type Chanson si importé
  };
}

class SeancesService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('seances');
  }

  /**
   * Récupérer toutes les séances d'une chanson
   */
  async getByChanson(chansonId: string): Promise<Seance[]> {
    try {
      const records = await this.collection.getFullList<Seance>({
        filter: `chanson = "${chansonId}" && actif = true`,
        sort: 'ordre',
      });
      return records;
    } catch (error) {
      console.error(`Erreur lors de la récupération des séances pour chanson ${chansonId}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer une séance spécifique
   */
  async getOne(id: string, expand?: boolean): Promise<SeanceExpanded> {
    try {
      const record = await this.collection.getOne<SeanceExpanded>(id, {
        expand: expand ? 'chanson' : undefined,
      });
      return record;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la séance ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer une séance par chanson et numéro d'ordre
   */
  async getByOrder(chansonId: string, ordre: number): Promise<Seance | null> {
    try {
      const records = await this.collection.getFullList<Seance>({
        filter: `chanson = "${chansonId}" && ordre = ${ordre} && actif = true`,
      });
      return records[0] || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la séance ordre ${ordre}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer la première séance d'une chanson
   */
  async getFirst(chansonId: string): Promise<Seance | null> {
    return this.getByOrder(chansonId, 1);
  }

  /**
   * Récupérer la séance suivante
   */
  async getNext(chansonId: string, currentOrder: number): Promise<Seance | null> {
    return this.getByOrder(chansonId, currentOrder + 1);
  }

  /**
   * Récupérer la séance précédente
   */
  async getPrevious(chansonId: string, currentOrder: number): Promise<Seance | null> {
    if (currentOrder <= 1) return null;
    return this.getByOrder(chansonId, currentOrder - 1);
  }

  /**
   * Vérifier si une séance a des prérequis non remplis
   */
  async checkPrerequisites(seanceId: string, userId: string): Promise<boolean> {
    try {
      const seance = await this.getOne(seanceId);
      
      if (!seance.prerequis || seance.prerequis.length === 0) {
        return true; // Pas de prérequis
      }

      // Vérifier chaque prérequis
      for (const prerequisId of seance.prerequis) {
        const progression = await pb.collection('progression').getFullList({
          filter: `user = "${userId}" && seance = "${prerequisId}" && statut = "termine"`,
        });

        if (progression.length === 0) {
          return false; // Prérequis non rempli
        }
      }

      return true; // Tous les prérequis sont remplis
    } catch (error) {
      console.error(`Erreur lors de la vérification des prérequis:`, error);
      return false;
    }
  }

  /**
   * Compter le nombre d'écrans dans une séance
   */
  countEcrans(seance: Seance): number {
    return seance.ecrans.length;
  }

  /**
   * Récupérer un écran spécifique
   */
  getEcran(seance: Seance, ecranNumero: number): Ecran | undefined {
    return seance.ecrans.find(e => e.numero === ecranNumero);
  }

  /**
   * Calculer le score maximum d'une séance
   */
  calculateMaxScore(seance: Seance): number {
    let totalScore = 0;
    
    for (const ecran of seance.ecrans) {
      // Additionner les points de chaque activité
      if (ecran.activite.type === 'quiz_qcm' && 'questions' in ecran.activite) {
        totalScore += ecran.activite.questions.length;
      } else if (ecran.activite.type === 'production_ecrite' && 'exercice' in ecran.activite) {
        totalScore += 10; // Score standard pour production écrite
      }
      // Ajouter d'autres types d'activités selon vos besoins
    }
    
    return totalScore;
  }

  /**
   * Créer une nouvelle séance (admin uniquement)
   */
  async create(data: Omit<Seance, keyof BaseModel>): Promise<Seance> {
    try {
      const record = await this.collection.create<Seance>(data);
      return record;
    } catch (error) {
      console.error('Erreur lors de la création de la séance:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour une séance (admin uniquement)
   */
  async update(id: string, data: Partial<Omit<Seance, keyof BaseModel>>): Promise<Seance> {
    try {
      const record = await this.collection.update<Seance>(id, data);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la séance ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer une séance (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la séance ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer le nombre total de séances pour une chanson
   */
  async countByChanson(chansonId: string): Promise<number> {
    try {
      const records = await this.getByChanson(chansonId);
      return records.length;
    } catch (error) {
      console.error(`Erreur lors du comptage des séances:`, error);
      return 0;
    }
  }
}

// Export singleton
export const seancesService = new SeancesService();
export default seancesService;
