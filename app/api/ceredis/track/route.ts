/**
 * API Route : Track Activity Completion
 * 
 * Cette route sert de middleware sécurisé entre le frontend et les services d'intégration.
 * Elle évite d'exposer les credentials CaSS/xAPI au client.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCassClient } from '@/lib/cass-client';
import type { ActivityCompletionData } from '@/services/integration-unified/integration.unified';
import { MAPPING_ACTIVITES_COMPETENCES } from '@/services/integration/types';
import type { NiveauCECRL } from '@/services/integration/types';
import { sendSlackAlert } from '@/services/monitoring/alert.service';

/**
 * Vérifier si une activité peut valider des compétences du Domaine 5 (métalinguistique)
 */
function canValidateDomain5(activityType: string, response?: string): boolean {
  const autoReflexives = [
    'texte_libre',
    'journal_reflexif',
    'production_ecrite',
    'commentaire_compose',
    'dissertation',
    'qcm_avec_justification'
  ];

  if (autoReflexives.includes(activityType)) {
    return true;
  }

  const linguistiques = [
    'analyse_guidee',
    'qcm_avec_justification',
    'texte_trous',
    'ordre_elements',
    'reperage_formes'
  ];

  if (linguistiques.includes(activityType) && response && response.trim().length >= 20) {
    return true;
  }

  return false;
}

/**
 * POST /api/ceredis/track - Track activity completion
 */
export async function POST(request: NextRequest) {
  try {
    const data: ActivityCompletionData = await request.json();

    // Valider les données
    if (!data.userId || !data.activityId || !data.chansonId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, activityId, chansonId' },
        { status: 400 }
      );
    }

    const result = {
      success: true,
      xapiStatements: [] as any[],
      cassAssertions: [] as any[],
      errors: [] as string[],
    };

    const scoreRatio = data.score / data.maxScore;
    const isSuccess = scoreRatio >= 0.6; // 60% minimum

    // ========================================
    // 1. xAPI : Créer statement "completed"
    // ========================================
    if (process.env.XAPI_LRS_URL) {
      try {
        const statement = {
          actor: {
            objectType: 'Agent',
            name: data.userName,
            account: {
              homePage: process.env.NEXT_PUBLIC_APP_URL || 'https://enaa-chansons.ceredis.net',
              name: data.userId,
            },
          },
          verb: {
            id: 'http://adlnet.gov/expapi/verbs/completed',
            display: { 'en-US': 'completed' },
          },
          object: {
            objectType: 'Activity',
            id: `${process.env.NEXT_PUBLIC_APP_URL}/activity/${data.activityId}`,
            definition: {
              name: { 'fr-FR': data.activityName },
              type: 'http://adlnet.gov/expapi/activities/assessment',
            },
          },
          result: {
            score: {
              min: 0,
              max: data.maxScore,
              raw: data.score,
              scaled: scoreRatio,
            },
            success: isSuccess,
            duration: `PT${data.duration}S`,
            completion: true,
          },
          context: {
            contextActivities: {
              parent: [
                {
                  objectType: 'Activity',
                  id: `${process.env.NEXT_PUBLIC_APP_URL}/chanson/${data.chansonId}`,
                },
                {
                  objectType: 'Activity',
                  id: `${process.env.NEXT_PUBLIC_APP_URL}/seance/${data.seanceId}`,
                },
              ],
            },
            extensions: {
              'https://ceredis.net/xapi/extensions/activityType': data.activityType,
              'https://ceredis.net/xapi/extensions/niveau': data.niveau,
            },
          },
        };

        // Envoyer à LRS Ralph
        const lrsUsername = process.env.XAPI_LRS_USERNAME;
        const lrsPassword = process.env.XAPI_LRS_PASSWORD;
        const lrsEndpoint = process.env.XAPI_LRS_URL;

        if (lrsUsername && lrsPassword && lrsEndpoint) {
          const auth = Buffer.from(`${lrsUsername}:${lrsPassword}`).toString('base64');
          
          const lrsRes = await fetch(`${lrsEndpoint}/statements`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${auth}`,
              'X-Experience-API-Version': '1.0.3',
            },
            body: JSON.stringify(statement),
          });

          if (!lrsRes.ok) {
            throw new Error(`LRS error: ${lrsRes.status}`);
          }

          result.xapiStatements.push(statement);
        }
      } catch (error: any) {
        result.errors.push(`xAPI: ${error.message}`);
        console.error('[API] xAPI error:', error);
        await sendSlackAlert(
          `[TRACKING ERROR][xAPI] ${error.message}\nUser: ${data?.userId || 'unknown'} | Activity: ${data?.activityType}\n${error.stack || ''}`
        );
      }
    }

    // ========================================
    // 2. CaSS : Créer assertions si réussite
    // ========================================
    if (isSuccess && process.env.CASS_URL) {
      try {
        const cassClient = getCassClient();
        
        // Obtenir les compétences mappées pour ce type d'activité
        let competencyIds = MAPPING_ACTIVITES_COMPETENCES[data.activityType] || [];
        
        // Filtrer par niveau CECRL
        const levels: NiveauCECRL[] = ['A1', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C1+', 'C2'];
        const activityLevelIndex = levels.indexOf(data.niveau);
        
        competencyIds = competencyIds.filter(id => {
          // Format: "X.Y" où X est le domaine
          const parts = id.split('.');
          // Pour simplifier, on accepte toutes les compétences
          // Dans une version plus avancée, on pourrait filtrer par niveau
          return true;
        });

        // Appliquer la règle de cohérence Domaine 5
        const canValidate5 = canValidateDomain5(data.activityType, data.response);
        if (!canValidate5) {
          const filtered = competencyIds.filter(id => !id.startsWith('5.'));
          if (filtered.length < competencyIds.length) {
            console.log('[API] Compétences Domaine 5 filtrées (preuve réflexive requise)');
          }
          competencyIds = filtered;
        }

        // Créer une assertion pour chaque compétence
        for (const compId of competencyIds) {
          const assertion = {
            '@context': 'http://purl.org/ctdl/terms/',
            '@type': 'ceasn:Assertion',
            competency: compId,
            subject: data.userId,
            evidence: `${process.env.NEXT_PUBLIC_APP_URL}/response/${data.activityId}`,
            level: data.niveau,
            confidence: Math.min(scoreRatio, 1.0),
            assertedDate: new Date().toISOString(),
          };

          try {
            const created = await cassClient.createAssertion(assertion);
            result.cassAssertions.push(created);
            
            // Créer un statement xAPI "mastered" pour cette compétence
            if (process.env.XAPI_LRS_URL) {
              const masteredStatement = {
                actor: {
                  objectType: 'Agent',
                  name: data.userName,
                  account: {
                    homePage: process.env.NEXT_PUBLIC_APP_URL || 'https://enaa-chansons.ceredis.net',
                    name: data.userId,
                  },
                },
                verb: {
                  id: 'http://adlnet.gov/expapi/verbs/mastered',
                  display: { 'en-US': 'mastered' },
                },
                object: {
                  objectType: 'Activity',
                  id: `https://ceredis.net/competency/${compId}`,
                  definition: {
                    name: { 'fr-FR': `Compétence ${compId}` },
                    type: 'http://adlnet.gov/expapi/activities/objective',
                  },
                },
                context: {
                  contextActivities: {
                    parent: [
                      {
                        objectType: 'Activity',
                        id: `${process.env.NEXT_PUBLIC_APP_URL}/activity/${data.activityId}`,
                      },
                    ],
                  },
                },
              };

              const lrsUsername = process.env.XAPI_LRS_USERNAME;
              const lrsPassword = process.env.XAPI_LRS_PASSWORD;
              const lrsEndpoint = process.env.XAPI_LRS_URL;

              if (lrsUsername && lrsPassword && lrsEndpoint) {
                const auth = Buffer.from(`${lrsUsername}:${lrsPassword}`).toString('base64');
                
                await fetch(`${lrsEndpoint}/statements`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`,
                    'X-Experience-API-Version': '1.0.3',
                  },
                  body: JSON.stringify(masteredStatement),
                });

                result.xapiStatements.push(masteredStatement);
              }
            }
          } catch (error: any) {
            result.errors.push(`CaSS assertion ${compId}: ${error.message}`);
            console.error(`[API] CaSS assertion error for ${compId}:`, error);
            await sendSlackAlert(
              `[TRACKING ERROR][CaSS assertion] ${error.message}\nComp: ${compId} | User: ${data?.userId || 'unknown'} | Activity: ${data?.activityType}\n${error.stack || ''}`
            );
          }
        }

        console.log(`[API] ✅ ${result.cassAssertions.length}/${competencyIds.length} assertions créées`);
      } catch (error: any) {
        result.errors.push(`CaSS: ${error.message}`);
        console.error('[API] CaSS error:', error);
        await sendSlackAlert(
          `[TRACKING ERROR][CaSS] ${error.message}\nUser: ${data?.userId || 'unknown'} | Activity: ${data?.activityType}\n${error.stack || ''}`
        );
      }
    }

    result.success = result.errors.length === 0;

    console.log('[API] Track result:', {
      userId: data.userId,
      activityId: data.activityId,
      xapiStatements: result.xapiStatements.length,
      cassAssertions: result.cassAssertions.length,
      errors: result.errors.length,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API] Track activity error:', error);
    return NextResponse.json(
      { 
        success: false,
        xapiStatements: [],
        cassAssertions: [],
        errors: [error.message] 
      },
      { status: 500 }
    );
  }
}
