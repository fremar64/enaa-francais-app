import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { LectureActivityContent } from '@packages/lecture-curriculum';
import { Volume2, ArrowLeft, Star, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AudioExerciseProps {
  phoneme: LectureActivityContent;
  onComplete: (score: number) => void;
  onBack: () => void;
  onAttempt?: () => void;
  onError?: (code: string) => void;
  onSuccess?: () => void;
}

interface Question {
  word: string;
  containsPhoneme: boolean;
}

const generateQuestions = (phoneme: LectureActivityContent): Question[] => {
  const wordsWithPhoneme = phoneme.exampleWords.slice(0, 5);
  const wordsWithoutPhoneme = getDistractorWords(phoneme);

  const questions: Question[] = [
    ...wordsWithPhoneme.map((word) => ({ word, containsPhoneme: true })),
    ...wordsWithoutPhoneme.map((word) => ({ word, containsPhoneme: false })),
  ];

  // Mélanger les questions
  return questions.sort(() => Math.random() - 0.5).slice(0, 8);
};

const getDistractorWords = (phoneme: LectureActivityContent): string[] => {
  const allDistractors: Record<string, string[]> = {
    a: ['bille', 'livre', 'plume', 'bulle'],
    i: ['chat', 'table', 'porte', 'mouton'],
    o: ['petit', 'lapin', 'jardin', 'sapin'],
    u: ['papa', 'maman', 'bateau', 'maison'],
    e: ['roi', 'loi', 'doigt', 'voix'],
    é: ['loup', 'hibou', 'caillou', 'genou'],
    l: ['moto', 'vélo', 'piano', 'radio'],
    s: ['balle', 'table', 'câble', 'fable'],
    r: ['sifflet', 'buffet', 'effet', 'billet'],
    m: ['soleil', 'orteil', 'réveil', 'pareil'],
    n: ['mousse', 'rousse', 'pousse', 'trousse'],
    f: ['matin', 'lapin', 'sapin', 'cousin'],
    t: ['melon', 'salon', 'ballon', 'papillon'],
    p: ['fête', 'tête', 'bête', 'crête'],
    d: ['soupe', 'loupe', 'coupe', 'troupe'],
    b: ['panda', 'agenda', 'veranda', 'canada'],
    ch: ['table', 'sable', 'câble', 'stable'],
    ou: ['ami', 'parti', 'fini', 'joli'],
    on: ['fête', 'tête', 'bête', 'crête'],
    an: ['souris', 'brebis', 'radis', 'tapis'],
    in: ['bateau', 'château', 'gâteau', 'plateau'],
    oi: ['lune', 'dune', 'prune', 'brune'],
    au: ['table', 'sable', 'câble', 'fable'],
  };

  return allDistractors[phoneme.symbol] || ['table', 'livre', 'porte', 'fenêtre'];
};

export const AudioExercise = ({
  phoneme,
  onComplete,
  onBack,
  onAttempt,
  onError,
  onSuccess
}: AudioExerciseProps) => {
  const [questions] = useState(() => generateQuestions(phoneme));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'incorrect' | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const speakWord = useCallback((word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleAnswer = (userAnswer: boolean) => {
    if (answered) return;
    onAttempt?.();

    const isCorrect = userAnswer === currentQuestion.containsPhoneme;
    setAnswered(true);
    setLastAnswer(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      onError?.("incorrect");
    }

    // Passage automatique après un délai
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setAnswered(false);
        setLastAnswer(null);
      } else {
        setIsComplete(true);
        const finalScore = isCorrect ? score + 1 : score;
        onSuccess?.();
        onComplete(Math.round((finalScore / questions.length) * 100));
      }
    }, 1500);
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setLastAnswer(null);
    setIsComplete(false);
  };

  if (isComplete) {
    const finalScore = Math.round((score / questions.length) * 100);
    const stars = finalScore >= 80 ? 3 : finalScore >= 60 ? 2 : finalScore >= 40 ? 1 : 0;

    return (
      <div className="exercise-container">
        <div className="w-full max-w-md mx-auto text-center animate-scale-in">
          <h2 className="text-3xl font-fredoka font-bold mb-4 text-foreground">
            Bravo ! 🎉
          </h2>

          {/* Étoiles */}
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={cn(
                  'w-12 h-12 transition-all duration-500',
                  star <= stars
                    ? 'text-warning fill-warning star earned'
                    : 'text-muted stroke-muted-foreground'
                )}
                style={{ animationDelay: `${star * 0.2}s` }}
              />
            ))}
          </div>

          <p className="text-xl text-muted-foreground mb-2">
            Tu as trouvé {score} bonnes réponses sur {questions.length}
          </p>

          <p className="text-4xl font-fredoka font-bold text-primary mb-8">
            {finalScore}%
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={resetExercise} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Recommencer
            </Button>
            <Button onClick={onBack}>
              Retour aux sons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-container">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-3" />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8 animate-fade-in" key={currentIndex}>
          <h2 className="text-xl md:text-2xl font-fredoka font-bold text-foreground mb-2">
            Entends-tu le son{' '}
            <span className="text-primary">"{phoneme.symbol}"</span>{' '}
            <span className="text-muted-foreground">{phoneme.phonetic}</span>
          </h2>
          <p className="text-muted-foreground">dans ce mot ?</p>
        </div>

        {/* Mot à écouter */}
        <div className="flex flex-col items-center mb-10">
          <button
            onClick={() => speakWord(currentQuestion.word)}
            className={cn(
              'w-40 h-40 rounded-full flex items-center justify-center',
              'bg-gradient-to-br from-secondary to-secondary/60',
              'shadow-soft-lg hover:scale-105 transition-transform duration-200',
              'focus:outline-none focus:ring-4 focus:ring-secondary/40'
            )}
          >
            <Volume2 className="w-16 h-16 text-secondary-foreground" />
          </button>
          <p className="mt-4 text-2xl font-fredoka font-bold text-foreground">
            {currentQuestion.word}
          </p>
          <button
            onClick={() => speakWord(currentQuestion.word)}
            className="text-sm text-primary mt-2 hover:underline"
          >
            🔊 Écouter encore
          </button>
        </div>

        {/* Boutons de réponse */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAnswer(true)}
            disabled={answered}
            className={cn(
              'answer-button flex-1 max-w-48',
              answered && currentQuestion.containsPhoneme && 'correct',
              answered && !currentQuestion.containsPhoneme && lastAnswer === 'incorrect' && 'incorrect'
            )}
          >
            <span className="text-3xl mb-2">✓</span>
            <span>OUI</span>
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={answered}
            className={cn(
              'answer-button flex-1 max-w-48',
              answered && !currentQuestion.containsPhoneme && 'correct',
              answered && currentQuestion.containsPhoneme && lastAnswer === 'incorrect' && 'incorrect'
            )}
          >
            <span className="text-3xl mb-2">✗</span>
            <span>NON</span>
          </button>
        </div>

        {/* Feedback */}
        {answered && (
          <div className="mt-6 text-center animate-fade-in">
            {lastAnswer === 'correct' ? (
              <p className="text-xl font-fredoka text-success">
                Super ! 🌟
              </p>
            ) : (
              <p className="text-xl font-fredoka text-destructive">
                {currentQuestion.containsPhoneme
                  ? `Écoute bien, "${currentQuestion.word}" contient le son "${phoneme.symbol}" !`
                  : `"${currentQuestion.word}" ne contient pas le son "${phoneme.symbol}".`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
