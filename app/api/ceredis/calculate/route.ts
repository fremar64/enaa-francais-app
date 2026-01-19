import { NextRequest, NextResponse } from 'next/server';
import * as ceredisEngine from '@/services/ceredis-calculator/engine';
import ceredisConfig from '@/services/ceredis-calculator/config/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Données attendues : evidences: Evidence[]
    const evidences = body.evidences || [];
    // 1. Agréger les preuves
    const grouped = ceredisEngine.aggregateEvidence(evidences);
    // 2. Calculer scores compétences
    const compScores = ceredisEngine.calculateAllCompetencyScores(grouped, ceredisConfig);
    // 3. Calculer scores domaines
    const domainScores = ceredisEngine.calculateAllDomainScores(compScores, ceredisConfig);
    // 4. Calculer score global CEREDIS
    const ceredisScore = ceredisEngine.calculateCeredisScore(domainScores, ceredisConfig);
    // 5. Décider niveau CECRL
    const cecrlLevel = ceredisEngine.decideCECRL(ceredisScore, ceredisConfig);
    // 6. Validation stricte
    const evidenceTypes = ceredisEngine.getEvidenceTypes(evidences);
    const cecrlLevelStrict = ceredisEngine.decideCECRLStrict(ceredisScore, domainScores, evidenceTypes, ceredisConfig);
    const validation = ceredisEngine.validateLevel(cecrlLevelStrict, ceredisScore, domainScores, evidenceTypes, ceredisConfig);
    return NextResponse.json({
      compScores,
      domainScores,
      ceredisScore,
      cecrlLevel,
      cecrlLevelStrict,
      validation
    });
  } catch (error) {
    const msg = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    return NextResponse.json({ error: msg || 'Erreur calcul CEREDIS' }, { status: 400 });
  }
}
