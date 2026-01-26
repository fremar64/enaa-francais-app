
import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/services/pocketbase/client';

// Utilitaires pour déterminer le niveau CECRL à partir du score moyen
function getCecrlLevel(avgScore: number): string {
  if (avgScore >= 90) return 'B2';
  if (avgScore >= 75) return 'B1';
  if (avgScore >= 60) return 'A2';
  return 'A1';
}

export async function GET(req: NextRequest) {
  try {
    // Récupérer toutes les progressions (expand user)
    const progressions = await pb.collection('progression').getFullList(200, {
      expand: 'user',
      sort: '-updated',
    });

    if (!progressions || progressions.length === 0) {
      return NextResponse.json({ students: [] });
    }

    // Agréger par élève
    const statsByUser: Record<string, {
      userId: string;
      userName: string;
      totalActivities: number;
      totalScore: number;
      totalScoreMax: number;
    }> = {};

    for (const p of progressions) {
      const userId = p.user;
      const userName = p.expand?.user?.name || p.expand?.user?.username || 'Élève';
      if (!statsByUser[userId]) {
        statsByUser[userId] = {
          userId,
          userName,
          totalActivities: 0,
          totalScore: 0,
          totalScoreMax: 0,
        };
      }
      statsByUser[userId].totalActivities += 1;
      statsByUser[userId].totalScore += p.score_total || 0;
      statsByUser[userId].totalScoreMax += p.score_max || 0;
    }

    // Formater la réponse
    const students = Object.values(statsByUser).map(s => {
      const avgScore = s.totalScoreMax > 0 ? Math.round((s.totalScore / s.totalScoreMax) * 100) : 0;
      return {
        userId: s.userId,
        userName: s.userName,
        totalActivities: s.totalActivities,
        avgScore,
        cecrlLevel: getCecrlLevel(avgScore),
      };
    });

    return NextResponse.json({ students });
  } catch (e: any) {
    return NextResponse.json({ students: [] });
  }
}
