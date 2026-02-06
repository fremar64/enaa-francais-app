import { cn } from '@/lib/utils';
import type { Phoneme } from '@packages/lecture-curriculum';
import { Check, Lock } from 'lucide-react';

interface PhonemeCardProps {
  phoneme: Phoneme;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  onClick: () => void;
}

export const PhonemeCard = ({
  phoneme,
  isUnlocked,
  isCompleted,
  progress,
  onClick,
}: PhonemeCardProps) => {
  const typeStyles = {
    vowel: 'bg-gradient-to-br from-vowel/30 to-vowel/10 border-vowel/40',
    consonant: 'bg-gradient-to-br from-consonant/30 to-consonant/10 border-consonant/40',
    complex: 'bg-gradient-to-br from-syllable/30 to-syllable/10 border-syllable/40',
  };

  const typeTextStyles = {
    vowel: 'text-vowel',
    consonant: 'text-consonant',
    complex: 'text-syllable',
  };

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={cn(
        'relative w-full aspect-square rounded-2xl border-2 p-4 transition-all duration-300',
        'flex flex-col items-center justify-center gap-2',
        isUnlocked ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : 'cursor-not-allowed opacity-60',
        typeStyles[phoneme.type]
      )}
    >
      {/* Indicateur de progression */}
      {isUnlocked && progress > 0 && (
        <div className="absolute inset-x-2 bottom-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Badge complété */}
      {isCompleted && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-success flex items-center justify-center">
          <Check className="w-4 h-4 text-success-foreground" />
        </div>
      )}

      {/* Cadenas si verrouillé */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      {/* Symbole du phonème */}
      <span className={cn('text-4xl md:text-5xl font-fredoka font-bold', typeTextStyles[phoneme.type])}>
        {phoneme.symbol}
      </span>

      {/* Transcription phonétique */}
      <span className="text-sm text-muted-foreground">{phoneme.phonetic}</span>

      {/* Exemple de mot */}
      <span className="text-xs text-muted-foreground truncate max-w-full">
        {phoneme.exampleWords[0]}
      </span>
    </button>
  );
};
