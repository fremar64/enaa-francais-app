/**
 * CECRL Decider - Déterminer le niveau CECRL
 * 
 * Basé sur le score CEREDIS (0-600) :
 * - A2 : 200-299
 * - B1 : 300-399
 * - B2 : 400-499
 * - C1 : 500-599
 */

/**
 * Décider le niveau CECRL basé uniquement sur le score
 * (sans validation des règles strictes)
 * 
 * @param {number} ceredisScore - Score CEREDIS (0-600)
 * @param {Object} config - Configuration CEREDIS
 * @returns {string|null} - Niveau CECRL ('A2', 'B1', 'B2', 'C1') ou null
 */
export function decideCECRL(ceredisScore, config) {
  const thresholds = config.cecrlThresholds;

  for (const [level, [min, max]] of Object.entries(thresholds)) {
    if (ceredisScore >= min && ceredisScore <= max) {
      return level;
    }
  }

  // Score hors limites
  if (ceredisScore < 200) return 'A1'; // En dessous de A2
  if (ceredisScore >= 600) return 'C2'; // Au-dessus de C1

  return null; // Ne devrait pas arriver
}

/**
 * Décider le niveau CECRL avec validation stricte des règles B2/C1
 * 
 * @param {number} ceredisScore - Score CEREDIS
 * @param {Object} domainScores - Scores par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {string} - Niveau CECRL validé
 */
export function decideCECRLStrict(ceredisScore, domainScores, evidenceTypesPresent, config) {
  // Ordre de test : du plus exigeant au moins exigeant
  const orderedLevels = ['C1', 'B2', 'B1', 'A2'];

  for (const level of orderedLevels) {
    const [min, max] = config.cecrlThresholds[level] || [0, 0];
    
    // Vérifier si le score est dans la plage
    if (ceredisScore >= min && ceredisScore <= max) {
      // Valider les règles strictes pour ce niveau
      if (validateLevelRequirements(level, ceredisScore, domainScores, evidenceTypesPresent, config)) {
        return level;
      }
    }
  }

  // Par défaut, retourner le niveau basé uniquement sur le score
  return decideCECRL(ceredisScore, config);
}

/**
 * Valider les exigences d'un niveau (B2, C1)
 * 
 * @param {string} level - Niveau à valider
 * @param {number} ceredisScore - Score CEREDIS
 * @param {Object} domainScores - Scores par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {boolean} - true si toutes les exigences sont remplies
 */
export function validateLevelRequirements(level, ceredisScore, domainScores, evidenceTypesPresent, config) {
  const levelConfig = config.levels?.[level];
  
  if (!levelConfig) {
    return true; // Pas de règles spéciales pour ce niveau
  }

  // 1. Vérifier le score minimum
  if (ceredisScore < levelConfig.minScore) {
    return false;
  }

  // 2. Vérifier les types de preuves requis
  if (levelConfig.requiredEvidenceTypes) {
    for (const requiredType of levelConfig.requiredEvidenceTypes) {
      if (!evidenceTypesPresent.includes(requiredType)) {
        return false;
      }
    }
  }

  // 3. Vérifier les domaines critiques (ex: Domaine 5)
  if (levelConfig.requiredDomains) {
    for (const [domainId, domainRequirement] of Object.entries(levelConfig.requiredDomains)) {
      const domainScore = domainScores[domainId];
      
      if (!domainScore || domainScore < domainRequirement.minScore) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Obtenir une explication de la décision CECRL
 * 
 * @param {string} level - Niveau décidé
 * @param {number} ceredisScore - Score CEREDIS
 * @param {Object} domainScores - Scores par domaine
 * @param {string[]} evidenceTypesPresent - Types de preuves présents
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Explication détaillée
 */
export function explainCECRLDecision(level, ceredisScore, domainScores, evidenceTypesPresent, config) {
  const explanation = {
    level: level,
    score: ceredisScore,
    scoreRange: config.cecrlThresholds[level],
    domainScores: domainScores,
    evidenceTypes: evidenceTypesPresent,
    validations: {}
  };

  const levelConfig = config.levels?.[level];
  
  if (levelConfig) {
    // Vérifier chaque exigence
    explanation.validations.scoreRequirement = ceredisScore >= levelConfig.minScore;
    
    if (levelConfig.requiredEvidenceTypes) {
      explanation.validations.evidenceTypesRequirement = 
        levelConfig.requiredEvidenceTypes.every(type => evidenceTypesPresent.includes(type));
    }
    
    if (levelConfig.requiredDomains) {
      explanation.validations.domainRequirements = {};
      for (const [domainId, req] of Object.entries(levelConfig.requiredDomains)) {
        explanation.validations.domainRequirements[domainId] = {
          score: domainScores[domainId],
          required: req.minScore,
          met: domainScores[domainId] >= req.minScore
        };
      }
    }
  }

  return explanation;
}
