/**
 * Competency Calculator - Calculer le score d'une compétence
 * 
 * Formule : Score = Σ(score_preuve × poids_type) / nb_preuves
 */

/**
 * Calculer le score d'une compétence
 * 
 * @param {Evidence[]} evidences - Liste des preuves pour cette compétence
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - { score, evidenceTypes, count }
 */
export function calculateCompetencyScore(evidences, config) {
  if (!evidences || evidences.length === 0) {
    return {
      score: 0,
      evidenceTypes: [],
      count: 0
    };
  }

  const weights = config.evidenceWeights;
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const evidenceTypes = new Set();

  for (const evidence of evidences) {
    const weight = weights[evidence.type] || 0;
    const score = evidence.score; // 0-100
    
    totalWeightedScore += score * weight;
    totalWeight += weight;
    evidenceTypes.add(evidence.type);
  }

  // Score moyen pondéré
  const finalScore = totalWeight > 0 
    ? totalWeightedScore / totalWeight 
    : 0;

  return {
    score: Math.round(finalScore * 100) / 100, // 2 décimales
    evidenceTypes: Array.from(evidenceTypes),
    count: evidences.length
  };
}

/**
 * Calculer les scores de toutes les compétences
 * 
 * @param {Object} groupedEvidence - Preuves groupées par compétence
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Scores par compétence
 */
export function calculateAllCompetencyScores(groupedEvidence, config) {
  const scores = {};

  for (const [competencyId, evidences] of Object.entries(groupedEvidence)) {
    scores[competencyId] = calculateCompetencyScore(evidences, config);
  }

  return scores;
}

/**
 * Valider qu'une compétence a suffisamment de preuves
 * 
 * @param {Object} competencyScore - Score de la compétence
 * @param {Object} config - Configuration CEREDIS
 * @returns {boolean} - true si valide
 */
export function validateCompetencyScore(competencyScore, config) {
  const minEvidence = config.validation?.minEvidencePerCompetency || 1;
  return competencyScore.count >= minEvidence;
}
