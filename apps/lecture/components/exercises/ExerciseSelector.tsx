import { cn } from '../../lib/utils';
import type { LectureActivityContent } from '@packages/lecture-curriculum';
import { ArrowLeft, Volume2, MapPin, Eye, Puzzle, BookOpen, Pencil, BookOpenText, Lock, Mic2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Mascot } from '../Mascot';

type ExerciseType = 'audio' | 'position' | 'dictation';

interface ExerciseSelectorProps {
  phoneme: LectureActivityContent;
  onSelectExercise: (exerciseType: ExerciseType) => void;
  onBack: () => void;
}

interface Exercise {
  id: ExerciseType | string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isAvailable: boolean;
}

const exercises: Exercise[] = [
  {
    id: 'audio',
    number: 1,
    title: "J'entends le son",
    description: 'Identifier le son dans les mots',
    icon: <Volume2 className="w-8 h-8" />,
    color: 'from-blue-400 to-blue-500',
    isAvailable: true,
  },
  {
    id: 'position',
    number: 2,
    title: 'Je trouve la place',
    description: 'Localiser le son (début, milieu, fin)',
    icon: <MapPin className="w-8 h-8" />,
    color: 'from-green-400 to-green-500',
    isAvailable: true,
  },
  {
    id: 'visual',
    number: 3,
    title: 'Je reconnais la lettre',
    description: 'Identifier la lettre parmi d\'autres',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-purple-400 to-purple-500',
    isAvailable: false,
  },
  {
    id: 'syllables',
    number: 4,
    title: 'Je combine les sons',
    description: 'Former des syllabes',
    icon: <Puzzle className="w-8 h-8" />,
    color: 'from-orange-400 to-orange-500',
    isAvailable: false,
  },
  {
    id: 'words',
    number: 5,
    title: 'Je lis des mots',
    description: 'Lire des mots avec le son',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-pink-400 to-pink-500',
    isAvailable: false,
  },
  {
    id: 'writing',
    number: 6,
    title: "J'écris des mots",
    description: 'Écrire des mots avec le son',
    icon: <Pencil className="w-8 h-8" />,
    color: 'from-teal-400 to-teal-500',
    isAvailable: false,
  },
  {
    id: 'sentences',
    number: 7,
    title: 'Je lis des phrases',
    description: 'Comprendre des phrases',
    icon: <BookOpenText className="w-8 h-8" />,
    color: 'from-indigo-400 to-indigo-500',
    isAvailable: false,
  },
  {
    id: 'dictation',
    number: 8,
    title: "J'ecris des phrases",
    description: 'Ecrire des phrases sous la dictee',
    icon: <Mic2 className="w-8 h-8" />,
    color: 'from-rose-400 to-rose-500',
    isAvailable: true,
  },
];

export const ExerciseSelector = ({
  phoneme,
  onSelectExercise,
  onBack,
}: ExerciseSelectorProps) => {
  const typeColors = {
    vowel: 'text-vowel',
    consonant: 'text-consonant',
    complex: 'text-syllable',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background py-6 px-4">
      <div className="w-full max-w-4xl mx-auto">
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
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-fredoka font-bold text-foreground">
              Le son{' '}
              <span className={typeColors[phoneme.type]}>"{phoneme.symbol}"</span>{' '}
              <span className="text-muted-foreground text-xl">{phoneme.phonetic}</span>
            </h1>
            <p className="text-muted-foreground">{phoneme.description}</p>
          </div>
          <Mascot mood="encouraging" size="sm" />
        </div>

        {/* Exemples de mots */}
        <div className="bg-card rounded-2xl p-4 mb-8 shadow-soft">
          <p className="text-sm text-muted-foreground mb-2">Exemples de mots :</p>
          <div className="flex flex-wrap gap-2">
            {phoneme.exampleWords.slice(0, 5).map((word) => (
              <span
                key={word}
                className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Liste des exercices */}
        <div className="space-y-4">
          <h2 className="text-lg font-fredoka font-semibold text-foreground mb-4">
            Choisis un exercice 📚
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => exercise.isAvailable && onSelectExercise(exercise.id as ExerciseType)}
                disabled={!exercise.isAvailable}
                className={cn(
                  'relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300',
                  'text-left w-full',
                  exercise.isAvailable
                    ? 'bg-card border-border hover:border-primary hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                    : 'bg-muted/50 border-border/50 cursor-not-allowed opacity-60'
                )}
              >
                {/* Numéro de l'écran */}
                <div
                  className={cn(
                    'flex items-center justify-center w-14 h-14 rounded-xl text-white',
                    exercise.isAvailable
                      ? `bg-gradient-to-br ${exercise.color}`
                      : 'bg-muted-foreground/30'
                  )}
                >
                  {exercise.isAvailable ? (
                    exercise.icon
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Écran {exercise.number}
                    </span>
                    {!exercise.isAvailable && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        Bientôt disponible
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-fredoka font-semibold text-foreground">
                    {exercise.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                </div>

                {/* Indicateur de progression (à implémenter) */}
                {exercise.isAvailable && (
                  <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">0%</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message d'encouragement */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Commence par l'écran 1 et progresse à ton rythme ! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};
