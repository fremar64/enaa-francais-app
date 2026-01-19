/**
 * Level Validator - Validation stricte des niveaux CECRL
 * 
 * Applique les règles institutionnelles :
 * - B2 : Score 400-499 + P3 présent + Domaine 5 >= 60
 * - C1 : Score 500-599 + P3 ET P4 présents + Domaine 5 >= 70
 */

import { validateLevelRequirements } from './cecrlDecider.js';

/**
 * Valider un niveau CECRL attribué
 * 
 * @param {string} level - Niveau proposé
 * @param {number} ceredisScore - Score CEREDIS
 * @param {Object} domainScores - Scores par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - { valid, errors, warnings }
 */
export function validateLevel(level, ceredisScore, domainScores, evidenceTypesPresent, config) {
  const result = {
    valid: true,
    errors: [],
    warnings: []
  };

  const levelConfig = config.levels?.[level];
  
  if (!levelConfig) {
    // Pas de règles spécifiques pour ce niveau (A2, B1)
    return result;
  }

  // 1. Vérifier le score minimum
  if (ceredisScore < levelConfig.minScore) {
    result.valid = false;
    result.errors.push({
      type: 'SCORE_TOO_LOW',
      message: `Score ${ceredisScore} inférieur au minimum ${levelConfig.minScore} pour ${level}`,
      required: levelConfig.minScore,
      actual: ceredisScore
    });
  }

  // 2. Vérifier les types de preuves requis
  if (levelConfig.requiredEvidenceTypes) {
    const missingTypes = levelConfig.requiredEvidenceTypes.filter(
      type => !evidenceTypesPresent.includes(type)
    );
    
    if (missingTypes.length > 0) {
      result.valid = false;
      result.errors.push({
        type: 'MISSING_EVIDENCE_TYPES',
        message: `Types de preuves manquants pour ${level}: ${missingTypes.join(', ')}`,
        required: levelConfig.requiredEvidenceTypes,
        missing: missingTypes
      });
    }
  }

  // 3. Vérifier les domaines critiques
  if (levelConfig.requiredDomains) {
    for (const [domainId, domainRequirement] of Object.entries(levelConfig.requiredDomains)) {
      const domainScore = domainScores[domainId];
      
      if (!domainScore) {
        result.valid = false;
        result.errors.push({
          type: 'MISSING_DOMAIN',
          message: `Domaine ${domainId} non évalué (requis pour ${level})`,
          domain: domainId,
          required: domainRequirement.minScore
        });
      } else if (domainScore < domainRequirement.minScore) {
        result.valid = false;
        result.errors.push({
          type: 'DOMAIN_SCORE_TOO_LOW',
          message: `${domainId} = ${domainScore} < ${domainRequirement.minScore} (requis pour ${level})`,
          domain: domainId,
          required: domainRequirement.minScore,
          actual: domainScore
        });
      }
    }
  }

  return result;
}

/**
 * Dégrader un niveau si les exigences ne sont pas remplies
 * 
 * @param {string} proposedLevel - Niveau proposé par le score
 * @param {number} ceredisScore - Score CEREDIS
 * @param {Object} domainScores - Scores par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - { level, reason }
 */
export function degradeLevelIfNeeded(proposedLevel, ceredisScore, domainScores, evidenceTypesPresent, config) {
  // Ordre des niveaux (du plus haut au plus bas)
  const levelOrder = ['C1', 'B2', 'B1', 'A2', 'A1'];
  const proposedIndex = levelOrder.indexOf(proposedLevel);
  
  if (proposedIndex === -1) {
    return { level: proposedLevel, reason: 'UNKNOWN_LEVEL' };
  }

  // Vérifier si le niveau proposé est valide
  const validation = validateLevel(proposedLevel, ceredisScore, domainScores, evidenceTypesPresent, config);
  
  if (validation.valid) {
    return { level: proposedLevel, reason: 'VALID' };
  }

  // Dégrader au niveau inférieur et re-valider
  for (let i = proposedIndex + 1; i < levelOrder.length; i++) {
    const lowerLevel = levelOrder[i];
    const lowerValidation = validateLevel(lowerLevel, ceredisScore, domainScores, evidenceTypesPresent, config);
    
    if (lowerValidation.valid) {
      return {
        level: lowerLevel,
        reason: 'DEGRADED',
        originalLevel: proposedLevel,
        errors: validation.errors
      };
    }
  }

  // Dernier recours : A1
  return {
    level: 'A1',
    reason: 'INSUFFICIENT_DATA',
    originalLevel: proposedLevel,
    errors: validation.errors
  };
}

/**
 * Obtenir les prochaines étapes pour atteindre un niveau supérieur
 * 
 * @param {string} currentLevel - Niveau actuel
 * @param {number} ceredisScore - Score actuel
 * @param {Object} domainScores - Scores actuels par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Recommandations pour niveau suivant
 */
export function getNextLevelRequirements(currentLevel, ceredisScore, domainScores, evidenceTypesPresent, config) {
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIndex = levelOrder.indexOf(currentLevel);
  
  if (currentIndex === -1 || currentIndex >= levelOrder.length - 1) {
    return { message: 'Niveau maximum atteint' };
  }

  const nextLevel = levelOrder[currentIndex + 1];
  const nextLevelConfig = config.levels?.[nextLevel];
  
  if (!nextLevelConfig) {
    return {
      nextLevel: nextLevel,
      requirements: [
        `Atteindre un score de ${config.cecrlThresholds[nextLevel][0]} minimum`
      ]
    };
  }

  const requirements = [];

  // Score requis
  const scoreGap = nextLevelConfig.minScore - ceredisScore;
  if (scoreGap > 0) {
    requirements.push({
      type: 'SCORE',
      message: `Augmenter le score de ${Math.round(scoreGap)} points (${ceredisScore} → ${nextLevelConfig.minScore})`,
      current: ceredisScore,
      required: nextLevelConfig.minScore,
      gap: scoreGap
    });
  }

  // Types de preuves manquants
  if (nextLevelConfig.requiredEvidenceTypes) {
    const missingTypes = nextLevelConfig.requiredEvidenceTypes.filter(
      type => !evidenceTypesPresent.includes(type)
    );
    
    if (missingTypes.length > 0) {
      requirements.push({
        type: 'EVIDENCE_TYPES',
        message: `Compléter des activités de type: ${missingTypes.join(', ')}`,
        missing: missingTypes
      });
    }
  }

  // Domaines à améliorer
  if (nextLevelConfig.requiredDomains) {
    for (const [domainId, domainReq] of Object.entries(nextLevelConfig.requiredDomains)) {
      const currentScore = domainScores[domainId] || 0;
      const gap = domainReq.minScore - currentScore;
      
      if (gap > 0) {
        requirements.push({
          type: 'DOMAIN',
          message: `Améliorer ${domainId} de ${Math.round(gap)} points (${Math.round(currentScore)} → ${domainReq.minScore})`,
          domain: domainId,
          current: currentScore,
          required: domainReq.minScore,
          gap: gap
        });
      }
    }
  }

  return {
    nextLevel: nextLevel,
    requirements: requirements
  };
}
