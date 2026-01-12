// Service pour gérer les chansons dans PocketBase
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour les données d'une chanson
export interface Chanson extends BaseModel {
  titre: string;
  artiste: string;
  album?: string;
  annee: number;
  duree: number; // en secondes
  genre: string[]; // ['pop', 'rock', etc.]
  niveau: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  type_texte: 'narratif' | 'descriptif' | 'argumentatif' | 'poetique' | 'reflexif_interrogatif' | 'argumentatif_injonctif';
  themes: string[];
  paroles: string; // HTML Editor content
  paroles_synchronisees?: LigneChanson[];
  audio_url: string;
  cover_url?: string;
  video_url?: string;
  vocabulaire_cle?: Record<string, string>;
  points_grammaire?: string[];
  contexte_culturel?: string;
  actif: boolean;
}

export interface LigneChanson {
  id: string;
  numero: number;
  texte: string;
  timestamp: number; // en secondes
}

// Service de gestion des chansons
class ChansonsService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('chansons');
  }

  /**
   * Récupérer toutes les chansons actives
   */
  async getAll(options?: {
    filter?: string;
    sort?: string;
    expand?: string;
  }): Promise<Chanson[]> {
    try {
      const records = await this.collection.getFullList<Chanson>({
        filter: options?.filter || 'actif = true',
        sort: options?.sort || '-updated',
        expand: options?.expand,
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des chansons:', error);
      throw error;
    }
  }

  /**
   * Récupérer une chanson par son ID
   */
  async getOne(id: string, expand?: string): Promise<Chanson> {
    try {
      const record = await this.collection.getOne<Chanson>(id, {
        expand,
      });
      return record;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la chanson ${id}:`, error);
      throw error;
    }
  }

  /**
   * Rechercher des chansons
   */
  async search(query: string): Promise<Chanson[]> {
    try {
      const filter = `titre ~ "${query}" || artiste ~ "${query}"`;
      const records = await this.collection.getFullList<Chanson>({
        filter: `${filter} && actif = true`,
        sort: '-updated',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  /**
   * Filtrer par niveau CECRL
   */
  async getByNiveau(niveau: Chanson['niveau']): Promise<Chanson[]> {
    try {
      const records = await this.collection.getFullList<Chanson>({
        filter: `niveau = "${niveau}" && actif = true`,
        sort: '-updated',
      });
      return records;
    } catch (error) {
      console.error(`Erreur lors du filtrage par niveau ${niveau}:`, error);
      throw error;
    }
  }

  /**
   * Filtrer par thématique
   */
  async getByTheme(theme: string): Promise<Chanson[]> {
    try {
      const records = await this.collection.getFullList<Chanson>({
        filter: `themes ~ "${theme}" && actif = true`,
        sort: '-updated',
      });
      return records;
    } catch (error) {
      console.error(`Erreur lors du filtrage par thème ${theme}:`, error);
      throw error;
    }
  }

  /**
   * Créer une nouvelle chanson (admin uniquement)
   */
  async create(data: Omit<Chanson, keyof BaseModel>): Promise<Chanson> {
    try {
      const record = await this.collection.create<Chanson>(data);
      return record;
    } catch (error) {
      console.error('Erreur lors de la création de la chanson:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour une chanson (admin uniquement)
   */
  async update(id: string, data: Partial<Omit<Chanson, keyof BaseModel>>): Promise<Chanson> {
    try {
      const record = await this.collection.update<Chanson>(id, data);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la chanson ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer une chanson (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la chanson ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer les paroles synchronisées d'une chanson
   */
  async getLyrics(id: string): Promise<LigneChanson[]> {
    try {
      const chanson = await this.getOne(id);
      return chanson.paroles_synchronisees || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des paroles de ${id}:`, error);
      throw error;
    }
  }

  /**
   * Pagination des chansons
   */
  async getPaginated(page: number = 1, perPage: number = 20) {
    try {
      const result = await this.collection.getList<Chanson>(page, perPage, {
        filter: 'actif = true',
        sort: '-updated',
      });
      return {
        items: result.items,
        page: result.page,
        perPage: result.perPage,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      };
    } catch (error) {
      console.error('Erreur lors de la pagination:', error);
      throw error;
    }
  }
}

// Export singleton
export const chansonsService = new ChansonsService();
export default chansonsService;
