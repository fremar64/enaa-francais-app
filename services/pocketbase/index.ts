// Export centralisé de tous les services PocketBase

// Client principal
export { pb, testConnection, getAuthToken, isAuthenticated, getCurrentUser, logout } from './client';
export type { BaseModel } from './client';

// Service Chansons
export { chansonsService } from './chansons.service';
export type { Chanson, LigneChanson } from './chansons.service';

// Service Séances
export { seancesService } from './seances.service';
export type { Seance, SeanceExpanded } from './seances.service';

// Service Progression
export { progressionService } from './progression.service';
export type { Progression, ProgressionExpanded } from './progression.service';

// Service Réponses
export { reponsesService } from './reponses.service';
export type {
  Reponse,
  ReponseQCM,
  ReponseTexteATrous,
  ReponseProductionEcrite,
} from './reponses.service';

// Service Compétences
export { competencesService } from './competences.service';
export type { Competence } from './competences.service';

// Service Évaluations Compétences
export { evaluationsCompetencesService } from './evaluations.service';
export type {
  EvaluationCompetence,
  EvaluationHistorique,
  EvaluationCompetenceExpanded,
} from './evaluations.service';

// Exporter tous les services dans un objet pour usage facile
export const pocketbaseServices = {
  chansons: chansonsService,
  seances: seancesService,
  progression: progressionService,
  reponses: reponsesService,
  competences: competencesService,
  evaluations: evaluationsCompetencesService,
};

// Export par défaut
export default pocketbaseServices;
