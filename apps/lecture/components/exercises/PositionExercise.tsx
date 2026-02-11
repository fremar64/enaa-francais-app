import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { LectureActivityContent } from '@packages/lecture-curriculum';
import { Volume2, ArrowLeft, Star, RefreshCw, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PositionExerciseProps {
  phoneme: LectureActivityContent;
  onComplete: (score: number) => void;
  onBack: () => void;
  onAttempt?: () => void;
  onError?: (code: string) => void;
  onSuccess?: () => void;
}

type PhonemePosition = 'start' | 'middle' | 'end';

interface PositionQuestion {
  word: string;
  syllables: string[];
  position: PhonemePosition;
}

// Génère les questions basées sur le phonème
const generateQuestions = (phoneme: LectureActivityContent): PositionQuestion[] => {
  const wordData = getWordPositionData(phoneme);
  // Mélanger et prendre 8 questions
  return wordData.sort(() => Math.random() - 0.5).slice(0, 8);
};

// Base de données des mots avec leur position de phonème
const getWordPositionData = (phoneme: LectureActivityContent): PositionQuestion[] => {
  const positionData: Record<string, PositionQuestion[]> = {
    a: [
      { word: 'arbre', syllables: ['ar', 'bre'], position: 'start' },
      { word: 'ami', syllables: ['a', 'mi'], position: 'start' },
      { word: 'ananas', syllables: ['a', 'na', 'nas'], position: 'start' },
      { word: 'salade', syllables: ['sa', 'la', 'de'], position: 'middle' },
      { word: 'bateau', syllables: ['ba', 'teau'], position: 'middle' },
      { word: 'papa', syllables: ['pa', 'pa'], position: 'middle' },
      { word: 'pizza', syllables: ['piz', 'za'], position: 'end' },
      { word: 'cinéma', syllables: ['ci', 'né', 'ma'], position: 'end' },
      { word: 'opéra', syllables: ['o', 'pé', 'ra'], position: 'end' },
    ],
    i: [
      { word: 'île', syllables: ['île'], position: 'start' },
      { word: 'igloo', syllables: ['i', 'gloo'], position: 'start' },
      { word: 'idée', syllables: ['i', 'dée'], position: 'start' },
      { word: 'livre', syllables: ['li', 'vre'], position: 'middle' },
      { word: 'souris', syllables: ['sou', 'ris'], position: 'end' },
      { word: 'tapis', syllables: ['ta', 'pis'], position: 'end' },
      { word: 'ami', syllables: ['a', 'mi'], position: 'end' },
      { word: 'merci', syllables: ['mer', 'ci'], position: 'end' },
    ],
    o: [
      { word: 'orange', syllables: ['o', 'ran', 'ge'], position: 'start' },
      { word: 'olive', syllables: ['o', 'li', 've'], position: 'start' },
      { word: 'océan', syllables: ['o', 'cé', 'an'], position: 'start' },
      { word: 'robot', syllables: ['ro', 'bot'], position: 'middle' },
      { word: 'domino', syllables: ['do', 'mi', 'no'], position: 'end' },
      { word: 'vélo', syllables: ['vé', 'lo'], position: 'end' },
      { word: 'piano', syllables: ['pi', 'a', 'no'], position: 'end' },
      { word: 'moto', syllables: ['mo', 'to'], position: 'end' },
    ],
    u: [
      { word: 'usine', syllables: ['u', 'si', 'ne'], position: 'start' },
      { word: 'univers', syllables: ['u', 'ni', 'vers'], position: 'start' },
      { word: 'lune', syllables: ['lu', 'ne'], position: 'middle' },
      { word: 'plume', syllables: ['plu', 'me'], position: 'middle' },
      { word: 'tortue', syllables: ['tor', 'tue'], position: 'end' },
      { word: 'rue', syllables: ['rue'], position: 'end' },
      { word: 'statue', syllables: ['sta', 'tue'], position: 'end' },
      { word: 'venue', syllables: ['ve', 'nue'], position: 'end' },
    ],
    e: [
      { word: 'renard', syllables: ['re', 'nard'], position: 'start' },
      { word: 'petit', syllables: ['pe', 'tit'], position: 'start' },
      { word: 'chemin', syllables: ['che', 'min'], position: 'middle' },
      { word: 'melon', syllables: ['me', 'lon'], position: 'start' },
      { word: 'cerise', syllables: ['ce', 'ri', 'se'], position: 'middle' },
      { word: 'fenêtre', syllables: ['fe', 'nê', 'tre'], position: 'start' },
      { word: 'secret', syllables: ['se', 'cret'], position: 'start' },
      { word: 'repas', syllables: ['re', 'pas'], position: 'start' },
    ],
    é: [
      { word: 'école', syllables: ['é', 'co', 'le'], position: 'start' },
      { word: 'étoile', syllables: ['é', 'toi', 'le'], position: 'start' },
      { word: 'été', syllables: ['é', 'té'], position: 'start' },
      { word: 'bébé', syllables: ['bé', 'bé'], position: 'middle' },
      { word: 'café', syllables: ['ca', 'fé'], position: 'end' },
      { word: 'clé', syllables: ['clé'], position: 'end' },
      { word: 'fée', syllables: ['fée'], position: 'end' },
      { word: 'idée', syllables: ['i', 'dée'], position: 'end' },
    ],
    l: [
      { word: 'lune', syllables: ['lu', 'ne'], position: 'start' },
      { word: 'lapin', syllables: ['la', 'pin'], position: 'start' },
      { word: 'lion', syllables: ['li', 'on'], position: 'start' },
      { word: 'ballon', syllables: ['bal', 'lon'], position: 'middle' },
      { word: 'soleil', syllables: ['so', 'leil'], position: 'middle' },
      { word: 'éléphant', syllables: ['é', 'lé', 'phant'], position: 'middle' },
      { word: 'animal', syllables: ['a', 'ni', 'mal'], position: 'end' },
      { word: 'cheval', syllables: ['che', 'val'], position: 'end' },
    ],
    s: [
      { word: 'soleil', syllables: ['so', 'leil'], position: 'start' },
      { word: 'souris', syllables: ['sou', 'ris'], position: 'start' },
      { word: 'serpent', syllables: ['ser', 'pent'], position: 'start' },
      { word: 'poisson', syllables: ['pois', 'son'], position: 'middle' },
      { word: 'maison', syllables: ['mai', 'son'], position: 'end' },
      { word: 'salade', syllables: ['sa', 'la', 'de'], position: 'start' },
      { word: 'dessert', syllables: ['des', 'sert'], position: 'middle' },
      { word: 'parasol', syllables: ['pa', 'ra', 'sol'], position: 'end' },
    ],
    r: [
      { word: 'renard', syllables: ['re', 'nard'], position: 'start' },
      { word: 'roi', syllables: ['roi'], position: 'start' },
      { word: 'rivière', syllables: ['ri', 'viè', 're'], position: 'start' },
      { word: 'carotte', syllables: ['ca', 'rot', 'te'], position: 'middle' },
      { word: 'arbre', syllables: ['ar', 'bre'], position: 'middle' },
      { word: 'tigre', syllables: ['ti', 'gre'], position: 'end' },
      { word: 'livre', syllables: ['li', 'vre'], position: 'end' },
      { word: 'quatre', syllables: ['qua', 'tre'], position: 'end' },
    ],
    m: [
      { word: 'maman', syllables: ['ma', 'man'], position: 'start' },
      { word: 'maison', syllables: ['mai', 'son'], position: 'start' },
      { word: 'mouton', syllables: ['mou', 'ton'], position: 'start' },
      { word: 'pomme', syllables: ['pom', 'me'], position: 'middle' },
      { word: 'fromage', syllables: ['fro', 'ma', 'ge'], position: 'middle' },
      { word: 'chambre', syllables: ['cham', 'bre'], position: 'middle' },
      { word: 'parfum', syllables: ['par', 'fum'], position: 'end' },
      { word: 'album', syllables: ['al', 'bum'], position: 'end' },
    ],
    n: [
      { word: 'nuage', syllables: ['nu', 'a', 'ge'], position: 'start' },
      { word: 'nez', syllables: ['nez'], position: 'start' },
      { word: 'nature', syllables: ['na', 'tu', 're'], position: 'start' },
      { word: 'banane', syllables: ['ba', 'na', 'ne'], position: 'middle' },
      { word: 'animal', syllables: ['a', 'ni', 'mal'], position: 'middle' },
      { word: 'lune', syllables: ['lu', 'ne'], position: 'end' },
      { word: 'cabane', syllables: ['ca', 'ba', 'ne'], position: 'end' },
      { word: 'carbone', syllables: ['car', 'bo', 'ne'], position: 'end' },
    ],
    f: [
      { word: 'fleur', syllables: ['fleur'], position: 'start' },
      { word: 'forêt', syllables: ['fo', 'rêt'], position: 'start' },
      { word: 'feuille', syllables: ['feu', 'ille'], position: 'start' },
      { word: 'éléphant', syllables: ['é', 'lé', 'phant'], position: 'middle' },
      { word: 'café', syllables: ['ca', 'fé'], position: 'middle' },
      { word: 'girafe', syllables: ['gi', 'ra', 'fe'], position: 'end' },
      { word: 'carafe', syllables: ['ca', 'ra', 'fe'], position: 'end' },
      { word: 'griffe', syllables: ['grif', 'fe'], position: 'end' },
    ],
    t: [
      { word: 'table', syllables: ['ta', 'ble'], position: 'start' },
      { word: 'tapis', syllables: ['ta', 'pis'], position: 'start' },
      { word: 'tortue', syllables: ['tor', 'tue'], position: 'start' },
      { word: 'étoile', syllables: ['é', 'toi', 'le'], position: 'middle' },
      { word: 'bateau', syllables: ['ba', 'teau'], position: 'middle' },
      { word: 'tomate', syllables: ['to', 'ma', 'te'], position: 'end' },
      { word: 'carotte', syllables: ['ca', 'rot', 'te'], position: 'end' },
      { word: 'porte', syllables: ['por', 'te'], position: 'end' },
    ],
    p: [
      { word: 'papa', syllables: ['pa', 'pa'], position: 'start' },
      { word: 'pomme', syllables: ['pom', 'me'], position: 'start' },
      { word: 'papillon', syllables: ['pa', 'pil', 'lon'], position: 'start' },
      { word: 'tapis', syllables: ['ta', 'pis'], position: 'middle' },
      { word: 'lapin', syllables: ['la', 'pin'], position: 'end' },
      { word: 'sirop', syllables: ['si', 'rop'], position: 'end' },
      { word: 'galop', syllables: ['ga', 'lop'], position: 'end' },
      { word: 'tulipe', syllables: ['tu', 'li', 'pe'], position: 'end' },
    ],
    d: [
      { word: 'dent', syllables: ['dent'], position: 'start' },
      { word: 'dragon', syllables: ['dra', 'gon'], position: 'start' },
      { word: 'dimanche', syllables: ['di', 'man', 'che'], position: 'start' },
      { word: 'cadeau', syllables: ['ca', 'deau'], position: 'middle' },
      { word: 'radis', syllables: ['ra', 'dis'], position: 'middle' },
      { word: 'salade', syllables: ['sa', 'la', 'de'], position: 'end' },
      { word: 'monde', syllables: ['mon', 'de'], position: 'end' },
      { word: 'grande', syllables: ['gran', 'de'], position: 'end' },
    ],
    b: [
      { word: 'ballon', syllables: ['bal', 'lon'], position: 'start' },
      { word: 'bébé', syllables: ['bé', 'bé'], position: 'start' },
      { word: 'bateau', syllables: ['ba', 'teau'], position: 'start' },
      { word: 'cabane', syllables: ['ca', 'ba', 'ne'], position: 'middle' },
      { word: 'robot', syllables: ['ro', 'bot'], position: 'middle' },
      { word: 'arabe', syllables: ['a', 'ra', 'be'], position: 'end' },
      { word: 'tube', syllables: ['tu', 'be'], position: 'end' },
      { word: 'robe', syllables: ['ro', 'be'], position: 'end' },
    ],
    ch: [
      { word: 'chat', syllables: ['chat'], position: 'start' },
      { word: 'cheval', syllables: ['che', 'val'], position: 'start' },
      { word: 'chocolat', syllables: ['cho', 'co', 'lat'], position: 'start' },
      { word: 'cochon', syllables: ['co', 'chon'], position: 'middle' },
      { word: 'vache', syllables: ['va', 'che'], position: 'end' },
      { word: 'bouche', syllables: ['bou', 'che'], position: 'end' },
      { word: 'peluche', syllables: ['pe', 'lu', 'che'], position: 'end' },
      { word: 'proche', syllables: ['pro', 'che'], position: 'end' },
    ],
    ou: [
      { word: 'ours', syllables: ['ours'], position: 'start' },
      { word: 'ouvrir', syllables: ['ou', 'vrir'], position: 'start' },
      { word: 'mouton', syllables: ['mou', 'ton'], position: 'middle' },
      { word: 'poule', syllables: ['pou', 'le'], position: 'middle' },
      { word: 'loup', syllables: ['loup'], position: 'end' },
      { word: 'hibou', syllables: ['hi', 'bou'], position: 'end' },
      { word: 'coucou', syllables: ['cou', 'cou'], position: 'end' },
      { word: 'genou', syllables: ['ge', 'nou'], position: 'end' },
    ],
    on: [
      { word: 'oncle', syllables: ['on', 'cle'], position: 'start' },
      { word: 'ombre', syllables: ['om', 'bre'], position: 'start' },
      { word: 'bonbon', syllables: ['bon', 'bon'], position: 'middle' },
      { word: 'mouton', syllables: ['mou', 'ton'], position: 'end' },
      { word: 'maison', syllables: ['mai', 'son'], position: 'end' },
      { word: 'lion', syllables: ['li', 'on'], position: 'end' },
      { word: 'ballon', syllables: ['bal', 'lon'], position: 'end' },
      { word: 'melon', syllables: ['me', 'lon'], position: 'end' },
    ],
    an: [
      { word: 'enfant', syllables: ['en', 'fant'], position: 'start' },
      { word: 'ancien', syllables: ['an', 'cien'], position: 'start' },
      { word: 'maman', syllables: ['ma', 'man'], position: 'end' },
      { word: 'banane', syllables: ['ba', 'na', 'ne'], position: 'middle' },
      { word: 'chambre', syllables: ['cham', 'bre'], position: 'middle' },
      { word: 'géant', syllables: ['gé', 'ant'], position: 'end' },
      { word: 'éléphant', syllables: ['é', 'lé', 'phant'], position: 'end' },
      { word: 'volant', syllables: ['vo', 'lant'], position: 'end' },
    ],
    in: [
      { word: 'insecte', syllables: ['in', 'sec', 'te'], position: 'start' },
      { word: 'indien', syllables: ['in', 'dien'], position: 'start' },
      { word: 'lapin', syllables: ['la', 'pin'], position: 'end' },
      { word: 'jardin', syllables: ['jar', 'din'], position: 'end' },
      { word: 'peinture', syllables: ['pein', 'tu', 're'], position: 'start' },
      { word: 'sapin', syllables: ['sa', 'pin'], position: 'end' },
      { word: 'matin', syllables: ['ma', 'tin'], position: 'end' },
      { word: 'cousin', syllables: ['cou', 'sin'], position: 'end' },
    ],
    oi: [
      { word: 'oiseau', syllables: ['oi', 'seau'], position: 'start' },
      { word: 'oie', syllables: ['oie'], position: 'start' },
      { word: 'voiture', syllables: ['voi', 'tu', 're'], position: 'start' },
      { word: 'poisson', syllables: ['pois', 'son'], position: 'middle' },
      { word: 'roi', syllables: ['roi'], position: 'end' },
      { word: 'trois', syllables: ['trois'], position: 'end' },
      { word: 'étoile', syllables: ['é', 'toi', 'le'], position: 'middle' },
      { word: 'doigt', syllables: ['doigt'], position: 'end' },
    ],
    au: [
      { word: 'auto', syllables: ['au', 'to'], position: 'start' },
      { word: 'autre', syllables: ['au', 'tre'], position: 'start' },
      { word: 'bateau', syllables: ['ba', 'teau'], position: 'end' },
      { word: 'chapeau', syllables: ['cha', 'peau'], position: 'end' },
      { word: 'oiseau', syllables: ['oi', 'seau'], position: 'end' },
      { word: 'jaune', syllables: ['jau', 'ne'], position: 'start' },
      { word: 'chaud', syllables: ['chaud'], position: 'end' },
      { word: 'gâteau', syllables: ['gâ', 'teau'], position: 'end' },
    ],
  };

  return positionData[phoneme.symbol] || positionData['a'];
};

const getPositionLabel = (position: PhonemePosition): string => {
  switch (position) {
    case 'start':
      return 'Début';
    case 'middle':
      return 'Milieu';
    case 'end':
      return 'Fin';
  }
};

const getPositionEmoji = (position: PhonemePosition): string => {
  switch (position) {
    case 'start':
      return '🏁';
    case 'middle':
      return '🎯';
    case 'end':
      return '🏆';
  }
};

export const PositionExercise = ({
  phoneme,
  onComplete,
  onBack,
  onAttempt,
  onError,
  onSuccess,
}: PositionExerciseProps) => {
  const [questions] = useState(() => generateQuestions(phoneme));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PhonemePosition | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const speakWord = useCallback((word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Prononcer le mot automatiquement quand on passe à une nouvelle question
  useEffect(() => {
    if (currentQuestion && !answered) {
      const timer = setTimeout(() => {
        speakWord(currentQuestion.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion, answered, speakWord]);

  const handleAnswer = (position: PhonemePosition) => {
    if (answered) return;
    onAttempt?.();

    const isCorrect = position === currentQuestion.position;
    setAnswered(true);
    setSelectedPosition(position);
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
        setSelectedPosition(null);
      } else {
        setIsComplete(true);
        const finalScore = isCorrect ? score + 1 : score;
        onSuccess?.();
        onComplete(Math.round((finalScore / questions.length) * 100));
      }
    }, 2000);
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setLastAnswer(null);
    setSelectedPosition(null);
    setIsComplete(false);
  };

  // Écran de résultats
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
                    ? 'text-warning fill-warning animate-bounce-soft'
                    : 'text-muted stroke-muted-foreground'
                )}
                style={{ animationDelay: `${star * 0.2}s` }}
              />
            ))}
          </div>

          <p className="text-xl text-muted-foreground mb-2">
            Tu as trouvé {score} bonnes positions sur {questions.length}
          </p>

          <p className="text-4xl font-fredoka font-bold text-primary mb-8">
            {finalScore}%
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={resetExercise} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Recommencer
            </Button>
            <Button onClick={onBack}>Retour aux sons</Button>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-3" />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        {/* Consigne */}
        <div className="text-center mb-6 animate-fade-in" key={currentIndex}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-foreground">
              Où se trouve le son{' '}
              <span className="text-primary">"{phoneme.symbol}"</span>{' '}
              <span className="text-muted-foreground">{phoneme.phonetic}</span> ?
            </h2>
          </div>
          <p className="text-muted-foreground">dans ce mot</p>
        </div>

        {/* Mot à écouter */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={() => speakWord(currentQuestion.word)}
            className={cn(
              'w-48 h-32 rounded-2xl flex flex-col items-center justify-center gap-2',
              'bg-gradient-to-br from-secondary to-secondary/60',
              'shadow-soft-lg hover:scale-105 transition-transform duration-200',
              'focus:outline-none focus:ring-4 focus:ring-secondary/40'
            )}
          >
            <Volume2 className="w-10 h-10 text-secondary-foreground" />
            <p className="text-2xl font-fredoka font-bold text-foreground">
              {currentQuestion.word}
            </p>
          </button>
          <button
            onClick={() => speakWord(currentQuestion.word)}
            className="text-sm text-primary mt-2 hover:underline"
          >
            🔊 Écouter encore
          </button>
        </div>

        {/* Visualisation des syllabes */}
        <div className="flex justify-center items-center gap-1 mb-8 flex-wrap">
          {currentQuestion.syllables.map((syllable, index) => (
            <div
              key={index}
              className={cn(
                'px-4 py-3 rounded-xl font-fredoka text-xl font-semibold transition-all duration-300',
                answered && (
                  (currentQuestion.position === 'start' && index === 0) ||
                  (currentQuestion.position === 'middle' && index > 0 && index < currentQuestion.syllables.length - 1) ||
                  (currentQuestion.position === 'end' && index === currentQuestion.syllables.length - 1)
                )
                  ? 'bg-success text-success-foreground scale-110 shadow-lg'
                  : 'bg-muted text-foreground'
              )}
            >
              {syllable}
            </div>
          ))}
        </div>

        {/* Frise de position */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Clique sur l'endroit où tu entends le son
          </p>
          <div className="flex justify-center gap-4">
            {(['start', 'middle', 'end'] as PhonemePosition[]).map((position) => (
              <button
                key={position}
                onClick={() => handleAnswer(position)}
                disabled={answered}
                className={cn(
                  'position-button flex-1 max-w-32 aspect-square rounded-2xl flex flex-col items-center justify-center gap-2',
                  'border-2 transition-all duration-300',
                  'hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30',
                  answered && position === currentQuestion.position && 'bg-success border-success text-success-foreground',
                  answered && position === selectedPosition && position !== currentQuestion.position && 'bg-destructive border-destructive text-destructive-foreground',
                  !answered && 'bg-card border-border hover:border-primary hover:bg-primary/10',
                  answered && position !== currentQuestion.position && position !== selectedPosition && 'opacity-50'
                )}
              >
                <span className="text-3xl">{getPositionEmoji(position)}</span>
                <span className="text-lg font-fredoka font-semibold">
                  {getPositionLabel(position)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {answered && (
          <div className="text-center animate-fade-in">
            {lastAnswer === 'correct' ? (
              <div className="text-xl font-fredoka text-success">
                <p>Super ! 🌟</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Le son "{phoneme.symbol}" est bien au{' '}
                  <strong>{getPositionLabel(currentQuestion.position).toLowerCase()}</strong> du mot !
                </p>
              </div>
            ) : (
              <div className="text-xl font-fredoka text-destructive">
                <p>Pas tout à fait... 🤔</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Le son "{phoneme.symbol}" est au{' '}
                  <strong>{getPositionLabel(currentQuestion.position).toLowerCase()}</strong> du mot "
                  {currentQuestion.word}".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
