import { useMemo, useState } from 'react';
import { PhonemeCard } from './PhonemeCard';
import type { LectureActivityDefinition } from '@packages/lecture-curriculum';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface PhonemeGridProps {
  levelLabel: string;
  activities: LectureActivityDefinition[];
  onSelectPhoneme: (activity: LectureActivityDefinition) => void;
  onBack: () => void;
}

export const PhonemeGrid = ({ levelLabel, activities, onSelectPhoneme, onBack }: PhonemeGridProps) => {
  const items = useMemo(
    () => activities.map((definition) => ({ definition, content: definition.createContent() })),
    [activities]
  );
  const phonemes = useMemo(() => items.map((item) => item.content), [items]);
  
  // Simulation de progression - dans une vraie app, viendrait de la base de données
  const [progress] = useState<Record<number, number>>(() => {
    const prog: Record<number, number> = {};
    phonemes.forEach((p, i) => {
      if (i < 3) prog[p.phonemeId] = 100;
      else if (i < 5) prog[p.phonemeId] = Math.floor(Math.random() * 70) + 10;
      else prog[p.phonemeId] = 0;
    });
    return prog;
  });

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    // Un phonème est débloqué si le précédent a au moins 50% de progression
    return progress[phonemes[index - 1]?.phonemeId] >= 50;
  };

  const phases = [...new Set(phonemes.map((p) => p.phase))];

  const getPhaseLabel = (phase: number) => {
    switch (phase) {
      case 1:
        return '🌟 Voyelles simples';
      case 2:
        return '🔤 Consonnes continues';
      case 3:
        return '💪 Consonnes occlusives';
      case 4:
        return '✨ Graphèmes complexes';
      case 5:
        return '🚀 Graphèmes avancés';
      default:
        return `Phase ${phase}`;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-fredoka font-bold text-foreground">
            {levelLabel}
          </h1>
          <p className="text-muted-foreground">
            Choisis un son à apprendre !
          </p>
        </div>
      </div>

      {/* Grille par phase */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const phaseItems = items.filter((item) => item.content.phase === phase);
          const globalStartIndex = phonemes.findIndex((p) => p.phase === phase);

          return (
            <div key={phase}>
              <h2 className="text-lg font-fredoka font-semibold mb-4 text-foreground/80">
                {getPhaseLabel(phase)}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {phaseItems.map((item, localIndex) => {
                  const globalIndex = globalStartIndex + localIndex;
                  return (
                    <PhonemeCard
                      key={item.content.phonemeId}
                      phoneme={item.content}
                      isUnlocked={isUnlocked(globalIndex)}
                      isCompleted={progress[item.content.phonemeId] === 100}
                      progress={progress[item.content.phonemeId] || 0}
                      onClick={() => isUnlocked(globalIndex) && onSelectPhoneme(item.definition)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
