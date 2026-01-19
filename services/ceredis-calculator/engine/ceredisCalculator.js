/**
 * CEREDIS Calculator - Calculer le score global CEREDIS
 * 
 * Formule : Score_CEREDIS = Σ(Score_domaine × Poids_domaine) × 6
 * 
 * Échelle : 0-600 (alignée CECRL)
 * - A2 : 200-299
 * - B1 : 300-399
 * - B2 : 400-499
 * - C1 : 500-599
 */

/**
 * Calculer le score CEREDIS global
 * 
 * @param {Object} domainScores - Scores des domaines (D1-D5)
 * @param {Object} config - Configuration CEREDIS
 * @returns {number} - Score CEREDIS (0-600)
 */
export function calculateCeredisScore(domainScores, config) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [domainId, score] of Object.entries(domainScores)) {
    const domainConfig = config.domains[domainId];
    
    if (!domainConfig) {
      console.warn(`Unknown domain: ${domainId}`);
      continue;
    }

    const weight = domainConfig.weight || 0;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return 0;
  }

  // Score moyen pondéré (0-100)
  const averageScore = weightedSum / totalWeight;

  // Conversion à l'échelle 0-600
  const ceredisScore = averageScore * 6;

  // Arrondir à 2 décimales
  return Math.round(ceredisScore * 100) / 100;
}

/**
 * Vérifier si le score CEREDIS est dans les limites valides
 * 
 * @param {number} score - Score CEREDIS
 * @param {Object} config - Configuration CEREDIS
 * @returns {boolean} - true si valide
 */
export function validateCeredisScore(score, config) {
  const min = config.scale?.min || 0;
  const max = config.scale?.max || 600;
  
  return score >= min && score <= max;
}

/**
 * Obtenir le détail du calcul CEREDIS
 * Utile pour l'audit et le débogage
 * 
 * @param {Object} domainScores - Scores des domaines
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Détail du calcul
 */
export function getCeredisCalculationDetails(domainScores, config) {
  const details = {
    domains: {},
    weightedSum: 0,
    totalWeight: 0
  };

  for (const [domainId, score] of Object.entries(domainScores)) {
    const domainConfig = config.domains[domainId];
    const weight = domainConfig?.weight || 0;
    const weighted = score * weight;

    details.domains[domainId] = {
      score: score,
      weight: weight,
      weightedScore: weighted
    };

    details.weightedSum += weighted;
    details.totalWeight += weight;
  }

  details.averageScore = details.totalWeight > 0 
    ? details.weightedSum / details.totalWeight 
    : 0;
  
  details.ceredisScore = details.averageScore * 6;

  return details;
}
