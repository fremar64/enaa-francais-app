/**
 * Level Validator - Validation stricte des niveaux CECRL
 * TypeScript version
 */
import { CeredisConfig } from './competencyCalculator';
import { validateLevelRequirements } from './cecrlDecider';

interface LevelValidationError {
  type: string;
  message: string;
  [key: string]: any;
}

interface LevelValidationResult {
  valid: boolean;
  errors: LevelValidationError[];
  warnings: LevelValidationError[];
}

export function validateLevel(
  level: string,
  ceredisScore: number,
  domainScores: Record<string, number>,
  evidenceTypesPresent: string[],
  config: CeredisConfig
): LevelValidationResult {
  const result: LevelValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };
  const levelConfig = config.levels?.[level];
  if (!levelConfig) {
    return result;
  }
  if (ceredisScore < levelConfig.minScore) {
    result.valid = false;
    result.errors.push({
      type: 'SCORE_TOO_LOW',
      message: `Score ${ceredisScore} inférieur au minimum ${levelConfig.minScore} pour ${level}`,
      required: levelConfig.minScore,
      actual: ceredisScore
    });
  }
  if (levelConfig.requiredEvidenceTypes) {
    const missingTypes = levelConfig.requiredEvidenceTypes.filter(
      (type: string) => !evidenceTypesPresent.includes(type)
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
  // Ajout d'autres validations selon les règles institutionnelles si besoin
  return result;
}
