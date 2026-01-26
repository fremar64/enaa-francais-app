import React from 'react';

type Props = {
  domainScores: Record<string, number>;
};

// Simple radar graphique (SVG)
export function DomainRadar({ domainScores }: Props) {
  const domains = Object.keys(domainScores);
  const scores = Object.values(domainScores);
  const maxScore = 100;
  const radius = 80;
  const center = 100;
  const angleStep = (2 * Math.PI) / domains.length;

  // Calcul des points
  const points = scores.map((score, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (score / maxScore) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="font-semibold mb-2">Radar des Domaines</div>
      <svg width={200} height={200}>
        {/* Axes */}
        {domains.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <line key={d} x1={center} y1={center} x2={x} y2={y} stroke="#ccc" />;
        })}
        {/* Polygone des scores */}
        <polygon points={points} fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth={2} />
        {/* Labels */}
        {domains.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 20) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          return <text key={d} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" fontSize={12}>{d}</text>;
        })}
      </svg>
    </div>
  );
}
