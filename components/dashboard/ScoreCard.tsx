import React from 'react';

type Props = {
  score: number;
  cecrlLevel: string;
};

export function ScoreCard({ score, cecrlLevel }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      <div className="text-4xl font-bold text-blue-700">{score}</div>
      <div className="text-lg mt-2">Score CEREDIS</div>
      <LevelBadge level={cecrlLevel} />
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    A2: 'bg-green-400',
    B1: 'bg-yellow-400',
    B2: 'bg-orange-400',
    C1: 'bg-red-400',
    C2: 'bg-purple-400',
    A1: 'bg-gray-400',
  };
  return (
    <span className={`mt-2 px-3 py-1 rounded text-white font-semibold ${colorMap[level] || 'bg-gray-400'}`}>
      {level}
    </span>
  );
}
