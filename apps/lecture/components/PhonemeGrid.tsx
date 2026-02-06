import { useState } from 'react';
import { PhonemeCard } from './PhonemeCard';
import { getPhonemesByLevel, type Phoneme } from '@packages/lecture-curriculum';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface PhonemeGridProps {
  level: 'GS' | 'CP' | 'CE1';
  onSelectPhoneme: (phoneme: Phoneme) => void;
  onBack: () => void;
}

export const PhonemeGrid = ({ level, onSelectPhoneme, onBack }: PhonemeGridProps) => {
  const phonemes = getPhonemesByLevel(level);
  
  // Simulation de progression - dans une vraie app, viendrait de la base de données
  const [progress] = useState<Record<number, number>>(() => {
    const prog: Record<number, number> = {};
    phonemes.forEach((p, i) => {
      if (i < 3) prog[p.id] = 100;
      else if (i < 5) prog[p.id] = Math.floor(Math.random() * 70) + 10;
      else prog[p.id] = 0;
    });
    return prog;
  });

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    // Un phonème est débloqué si le précédent a au moins 50% de progression
    return progress[phonemes[index - 1]?.id] >= 50;
  };

  const phases = [...new Set(phonemes.map((p) => p.phase))];

  const getLevelLabel = () => {
    switch (level) {
      case 'GS':
        return 'Grande Section';
      case 'CP':
        return 'Cours Préparatoire';
      case 'CE1':
        return 'CE1';
    }
  };

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
            {getLevelLabel()}
          </h1>
          <p className="text-muted-foreground">
            Choisis un son à apprendre !
          </p>
        </div>
      </div>

      {/* Grille par phase */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const phasePhonemes = phonemes.filter((p) => p.phase === phase);
          const globalStartIndex = phonemes.findIndex((p) => p.phase === phase);

          return (
            <div key={phase}>
              <h2 className="text-lg font-fredoka font-semibold mb-4 text-foreground/80">
                {getPhaseLabel(phase)}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {phasePhonemes.map((phoneme, localIndex) => {
                  const globalIndex = globalStartIndex + localIndex;
                  return (
                    <PhonemeCard
                      key={phoneme.id}
                      phoneme={phoneme}
                      isUnlocked={isUnlocked(globalIndex)}
                      isCompleted={progress[phoneme.id] === 100}
                      progress={progress[phoneme.id] || 0}
                      onClick={() => isUnlocked(globalIndex) && onSelectPhoneme(phoneme)}
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
