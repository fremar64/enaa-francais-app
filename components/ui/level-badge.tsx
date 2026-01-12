'use client';

import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: 'A2' | 'B1' | 'B2' | 'C1';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const levelColors = {
  A2: "bg-level-a2 text-white",
  B1: "bg-level-b1 text-white",
  B2: "bg-level-b2 text-accent-foreground",
  C1: "bg-level-c1 text-white",
};

const levelDescriptions = {
  A2: "Élémentaire",
  B1: "Intermédiaire",
  B2: "Intermédiaire avancé",
  C1: "Avancé",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function LevelBadge({ level, size = "md", className }: LevelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        levelColors[level],
        sizeClasses[size],
        className
      )}
      title={levelDescriptions[level]}
    >
      {level}
    </span>
  );
}

export function LevelBadgeWithDescription({ level, size = "md", className }: LevelBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LevelBadge level={level} size={size} />
      <span className="text-sm text-muted-foreground">{levelDescriptions[level]}</span>
    </div>
  );
}
