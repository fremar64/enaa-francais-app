import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/services/pocketbase/client';

function getCecrlLevel(avgScore: number): string {
  if (avgScore >= 90) return 'B2';
  if (avgScore >= 75) return 'B1';
  if (avgScore >= 60) return 'A2';
  return 'A1';
}

function toCSV(rows: any[]): string {
  if (rows.length === 0) return '';
  const header = Object.keys(rows[0]);
  const csv = [header.join(',')];
  for (const row of rows) {
    csv.push(header.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
  }
  return csv.join('\n');
}

export async function GET(req: NextRequest) {
  try {
    const format = req.nextUrl.searchParams.get('format') || 'csv';
    const progressions = await pb.collection('progression').getFullList(200, {
      expand: 'user',
      sort: '-updated',
    });
    if (!progressions || progressions.length === 0) {
      if (format === 'json') {
        return NextResponse.json({ students: [] });
      } else {
        return new NextResponse('', {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="analytics_teacher.csv"',
          },
        });
      }
    }
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
    if (format === 'json') {
      return NextResponse.json({ students });
    } else {
      const csv = toCSV(students);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="analytics_teacher.csv"',
        },
      });
    }
  } catch (e: any) {
    if (req.nextUrl.searchParams.get('format') === 'json') {
      return NextResponse.json({ students: [] });
    } else {
      return new NextResponse('', {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="analytics_teacher.csv"',
        },
      });
    }
  }
}
