/**
 * Evidence Aggregator - Regrouper les preuves par compétence
 * 
 * Fonction : Organiser les preuves brutes en structure exploitable
 */

/**
 * Agréger les preuves par compétence
 * 
 * @param {Evidence[]} evidences - Liste des preuves
 * @returns {Object} - Preuves groupées par competencyId
 */
export function aggregateEvidence(evidences) {
  const byCompetency = {};

  for (const evidence of evidences) {
    const competencyId = evidence.competencyId;
    
    if (!byCompetency[competencyId]) {
      byCompetency[competencyId] = [];
    }
    
    byCompetency[competencyId].push(evidence);
  }

  return byCompetency;
}

/**
 * Agréger les preuves par type (P1, P2, P3, P4)
 * Utile pour vérifier la diversité des preuves
 * 
 * @param {Evidence[]} evidences - Liste des preuves
 * @returns {Object} - Preuves groupées par type
 */
export function aggregateEvidenceByType(evidences) {
  const byType = {
    P1: [],
    P2: [],
    P3: [],
    P4: []
  };

  for (const evidence of evidences) {
    const type = evidence.type;
    if (byType[type]) {
      byType[type].push(evidence);
    }
  }

  return byType;
}

/**
 * Obtenir tous les types de preuves présents
 * 
 * @param {Evidence[]} evidences - Liste des preuves
 * @returns {string[]} - Liste unique des types présents
 */
export function getEvidenceTypes(evidences) {
  const types = new Set();
  
  for (const evidence of evidences) {
    types.add(evidence.type);
  }
  
  return Array.from(types);
}

/**
 * Agréger les preuves par domaine
 * 
 * @param {Object} groupedByCompetency - Preuves groupées par compétence
 * @param {Object} config - Configuration CEREDIS
 * @returns {Object} - Preuves groupées par domaine
 */
export function aggregateEvidenceByDomain(groupedByCompetency, config) {
  const byDomain = {};

  for (const [domainId, domainConfig] of Object.entries(config.domains)) {
    byDomain[domainId] = [];
    
    for (const competencyId of domainConfig.competencies) {
      if (groupedByCompetency[competencyId]) {
        byDomain[domainId].push(...groupedByCompetency[competencyId]);
      }
    }
  }

  return byDomain;
}
