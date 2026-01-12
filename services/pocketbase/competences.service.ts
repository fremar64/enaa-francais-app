// Service pour gérer le référentiel de compétences
import { pb, BaseModel } from './client';
import type { RecordService } from 'pocketbase';

// Interface pour une compétence
export interface Competence extends BaseModel {
  code: string; // Unique (ex: "CO_GLOBALE", "GRAM_CONDITIONNEL")
  nom: string;
  description: string;
  categorie: 
    | 'comprehension_orale'
    | 'comprehension_ecrite'
    | 'production_ecrite'
    | 'production_orale'
    | 'interaction'
    | 'vocabulaire'
    | 'grammaire'
    | 'culture'
    | 'pensee_critique';
  niveau: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  indicateurs?: string[]; // Liste d'indicateurs de maîtrise
}

class CompetencesService {
  private collection: RecordService;

  constructor() {
    this.collection = pb.collection('competences');
  }

  /**
   * Récupérer toutes les compétences
   */
  async getAll(): Promise<Competence[]> {
    try {
      const records = await this.collection.getFullList<Competence>({
        sort: 'code',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      throw error;
    }
  }

  /**
   * Récupérer une compétence par son code
   */
  async getByCode(code: string): Promise<Competence | null> {
    try {
      const records = await this.collection.getFullList<Competence>({
        filter: `code = "${code}"`,
      });
      return records[0] || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la compétence ${code}:`, error);
      return null;
    }
  }

  /**
   * Récupérer une compétence par son ID
   */
  async getOne(id: string): Promise<Competence> {
    try {
      const record = await this.collection.getOne<Competence>(id);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la compétence ${id}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer les compétences par catégorie
   */
  async getByCategorie(categorie: Competence['categorie']): Promise<Competence[]> {
    try {
      const records = await this.collection.getFullList<Competence>({
        filter: `categorie = "${categorie}"`,
        sort: 'code',
      });
      return records;
    } catch (error) {
      console.error(`Erreur lors de la récupération des compétences par catégorie ${categorie}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer les compétences par niveau
   */
  async getByNiveau(niveau: Competence['niveau']): Promise<Competence[]> {
    try {
      const records = await this.collection.getFullList<Competence>({
        filter: `niveau = "${niveau}"`,
        sort: 'code',
      });
      return records;
    } catch (error) {
      console.error(`Erreur lors de la récupération des compétences par niveau ${niveau}:`, error);
      throw error;
    }
  }

  /**
   * Récupérer plusieurs compétences par leurs codes
   */
  async getByCodes(codes: string[]): Promise<Competence[]> {
    try {
      if (codes.length === 0) return [];

      const filter = codes.map(code => `code = "${code}"`).join(' || ');
      const records = await this.collection.getFullList<Competence>({
        filter,
        sort: 'code',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences par codes:', error);
      throw error;
    }
  }

  /**
   * Rechercher des compétences
   */
  async search(query: string): Promise<Competence[]> {
    try {
      const filter = `nom ~ "${query}" || description ~ "${query}" || code ~ "${query}"`;
      const records = await this.collection.getFullList<Competence>({
        filter,
        sort: 'code',
      });
      return records;
    } catch (error) {
      console.error('Erreur lors de la recherche de compétences:', error);
      throw error;
    }
  }

  /**
   * Grouper les compétences par catégorie
   */
  async groupByCategorie(): Promise<Record<string, Competence[]>> {
    try {
      const competences = await this.getAll();
      
      const grouped: Record<string, Competence[]> = {};
      
      for (const competence of competences) {
        if (!grouped[competence.categorie]) {
          grouped[competence.categorie] = [];
        }
        grouped[competence.categorie].push(competence);
      }
      
      return grouped;
    } catch (error) {
      console.error('Erreur lors du groupement des compétences:', error);
      throw error;
    }
  }

  /**
   * Grouper les compétences par niveau
   */
  async groupByNiveau(): Promise<Record<string, Competence[]>> {
    try {
      const competences = await this.getAll();
      
      const grouped: Record<string, Competence[]> = {};
      
      for (const competence of competences) {
        if (!grouped[competence.niveau]) {
          grouped[competence.niveau] = [];
        }
        grouped[competence.niveau].push(competence);
      }
      
      return grouped;
    } catch (error) {
      console.error('Erreur lors du groupement des compétences par niveau:', error);
      throw error;
    }
  }

  /**
   * Créer une nouvelle compétence (admin uniquement)
   */
  async create(data: Omit<Competence, keyof BaseModel>): Promise<Competence> {
    try {
      const record = await this.collection.create<Competence>(data);
      return record;
    } catch (error) {
      console.error('Erreur lors de la création de la compétence:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour une compétence (admin uniquement)
   */
  async update(id: string, data: Partial<Omit<Competence, keyof BaseModel>>): Promise<Competence> {
    try {
      const record = await this.collection.update<Competence>(id, data);
      return record;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la compétence ${id}:`, error);
      throw error;
    }
  }

  /**
   * Supprimer une compétence (admin uniquement)
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.delete(id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la compétence ${id}:`, error);
      throw error;
    }
  }

  /**
   * Compter les compétences par catégorie
   */
  async countByCategorie(): Promise<Record<string, number>> {
    try {
      const competences = await this.getAll();
      
      const counts: Record<string, number> = {};
      
      for (const competence of competences) {
        counts[competence.categorie] = (counts[competence.categorie] || 0) + 1;
      }
      
      return counts;
    } catch (error) {
      console.error('Erreur lors du comptage des compétences:', error);
      throw error;
    }
  }
}

// Export singleton
export const competencesService = new CompetencesService();
export default competencesService;
