/**
 * Domain Calculator - Calculer le score d'un domaine
 * 
 * Formule : Score_domaine = Moyenne(scores_compétences_du_domaine)
 */

/**
 * Calculer le score d'un domaine
 * 
 * @param {Object} domainConfig - Configuration du domaine
 * @param {Object} competencyScores - Scores des compétences
 * @returns {number|null} - Score du domaine (0-100) ou null si pas de données
 */
export function calculateDomainScore(domainConfig, competencyScores) {
  let total = 0;
  let count = 0;

  for (const competencyId of domainConfig.competencies) {
    if (competencyScores[competencyId] && competencyScores[competencyId].score > 0) {
      total += competencyScores[competencyId].score;
      count++;
    }
  }

  if (count === 0) {
    return null; // Aucune donnée pour ce domaine
  }

  const score = total / count;
  return Math.round(score * 100) / 100; // 2 décimales
}

/**
 * Calculer les scores de tous les domaines
 * 
 * @param {Object} competencyScores - Scores des compétences
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Scores par domaine
 */
export function calculateAllDomainScores(competencyScores, config) {
  const domainScores = {};

  for (const [domainId, domainConfig] of Object.entries(config.domains)) {
    const score = calculateDomainScore(domainConfig, competencyScores);
    
    if (score !== null) {
      domainScores[domainId] = score;
    }
  }

  return domainScores;
}

/**
 * Valider qu'un domaine atteint le seuil minimum (pour Domaine 5)
 * 
 * @param {string} domainId - ID du domaine
 * @param {number} score - Score du domaine
 * @param {Object} config - Configuration CEREDIS
 * @returns {boolean} - true si le seuil est atteint
 */
export function validateDomainThreshold(domainId, score, config) {
  const domainConfig = config.domains[domainId];
  
  if (!domainConfig.minScore) {
    return true; // Pas de seuil minimum
  }

  return score >= domainConfig.minScore;
}

/**
 * Vérifier si le Domaine 5 a une diversité de preuves suffisante
 * 
 * @param {Object} competencyScores - Scores des compétences D5
 * @param {Object} config - Configuration CEREDIS
 * @returns {boolean} - true si diversité suffisante
 */
export function validateDomain5Diversity(competencyScores, config) {
  const d5Competencies = config.domains.D5.competencies;
  const d5Scores = d5Competencies
    .map(cid => competencyScores[cid])
    .filter(Boolean);

  // Vérifier présence de P4 (métacognition)
  const hasP4 = d5Scores.some(score => 
    score.evidenceTypes && score.evidenceTypes.includes('P4')
  );

  // Si règle stricte activée, P4 obligatoire
  if (config.validation?.requireDiverseEvidenceForD5) {
    return hasP4;
  }

  return true;
}
