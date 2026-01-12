'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Music2,
  BookOpen,
  Trophy,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';

// Types pour les activités
interface Activite {
  id: string;
  type: 'qcm' | 'qcm_justifie' | 'texte_a_trous' | 'ordre_elements' | 'texte_libre' | 'journal_reflexif';
  consigne: string;
  contenu: Record<string, unknown>;
  points?: number;
}

interface Seance {
  id: string;
  chansonId: string;
  titre: string;
  objectifs: string[];
  niveau: string;
  duree: number;
  activites: Activite[];
}

// Composants d'activités
function QuizQCM({ 
  activite, 
  onComplete 
}: { 
  activite: Activite; 
  onComplete: (success: boolean, points: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const options = activite.contenu.options as string[] || [];
  const correctIndex = activite.contenu.correctIndex as number || 0;

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = selected === correctIndex;
    setTimeout(() => onComplete(isCorrect, isCorrect ? (activite.points || 10) : 0), 1500);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{activite.consigne}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !submitted && setSelected(index)}
            disabled={submitted}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              submitted
                ? index === correctIndex
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : index === selected
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-border'
                : selected === index
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {submitted && index === correctIndex && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              {submitted && index === selected && index !== correctIndex && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>
      {!submitted && selected !== null && (
        <Button onClick={handleSubmit} className="w-full">
          Valider ma réponse
        </Button>
      )}
    </div>
  );
}

function TexteATrous({ 
  activite, 
  onComplete 
}: { 
  activite: Activite; 
  onComplete: (success: boolean, points: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const texte = activite.contenu.texte as string || '';
  const trous = activite.contenu.trous as string[] || [];
  
  const parts = texte.split(/\[___\]/g);

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = trous.filter((t, i) => 
      answers[i]?.toLowerCase().trim() === t.toLowerCase().trim()
    ).length;
    const success = correct === trous.length;
    const points = Math.round((correct / trous.length) * (activite.points || 20));
    setTimeout(() => onComplete(success, points), 1500);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{activite.consigne}</p>
      <div className="p-4 bg-muted/50 rounded-lg text-lg leading-relaxed">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < trous.length && (
              <input
                type="text"
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                disabled={submitted}
                className={`inline-block w-32 mx-1 px-2 py-1 border-b-2 bg-transparent text-center focus:outline-none ${
                  submitted
                    ? answers[index]?.toLowerCase().trim() === trous[index].toLowerCase().trim()
                      ? 'border-green-500 text-green-600'
                      : 'border-red-500 text-red-600'
                    : 'border-accent focus:border-accent'
                }`}
                placeholder="..."
              />
            )}
          </span>
        ))}
      </div>
      {submitted && (
        <div className="text-sm text-muted-foreground">
          Réponses attendues : {trous.join(', ')}
        </div>
      )}
      {!submitted && (
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={Object.keys(answers).length < trous.length}
        >
          Valider mes réponses
        </Button>
      )}
    </div>
  );
}

function TexteLibre({ 
  activite, 
  onComplete 
}: { 
  activite: Activite; 
  onComplete: (success: boolean, points: number) => void;
}) {
  const [text, setText] = useState('');
  const minLength = activite.contenu.minLength as number || 50;

  const handleSubmit = () => {
    onComplete(true, activite.points || 15);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{activite.consigne}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-4 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder="Écrivez votre réponse ici..."
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{text.length} / {minLength} caractères minimum</span>
        <Button 
          onClick={handleSubmit}
          disabled={text.length < minLength}
        >
          Soumettre
        </Button>
      </div>
    </div>
  );
}

function JournalReflexif({ 
  activite, 
  onComplete 
}: { 
  activite: Activite; 
  onComplete: (success: boolean, points: number) => void;
}) {
  const [entries, setEntries] = useState<Record<string, string>>({});
  const prompts = activite.contenu.prompts as string[] || ['Qu\'avez-vous appris ?'];

  const handleSubmit = () => {
    onComplete(true, activite.points || 10);
  };

  const allFilled = prompts.every((_, i) => entries[i]?.trim().length > 10);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{activite.consigne}</p>
      {prompts.map((prompt, index) => (
        <div key={index} className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {prompt}
          </label>
          <textarea
            value={entries[index] || ''}
            onChange={(e) => setEntries({ ...entries, [index]: e.target.value })}
            className="w-full h-24 p-3 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Votre réflexion..."
          />
        </div>
      ))}
      <Button onClick={handleSubmit} disabled={!allFilled} className="w-full">
        Enregistrer mes réflexions
      </Button>
    </div>
  );
}

// Données de démonstration
const mockSeance: Seance = {
  id: 'demo-1',
  chansonId: 'la-bas',
  titre: 'Découverte et compréhension globale',
  objectifs: [
    'Comprendre le thème principal de la chanson',
    'Identifier les émotions exprimées',
    'Enrichir le vocabulaire du voyage et de l\'ailleurs'
  ],
  niveau: 'B1',
  duree: 45,
  activites: [
    {
      id: 'act-1',
      type: 'qcm',
      consigne: 'De quoi parle principalement cette chanson ?',
      contenu: {
        options: [
          'D\'un voyage en avion',
          'Du désir de partir vers un ailleurs meilleur',
          'D\'une histoire d\'amour',
          'De la vie quotidienne en France'
        ],
        correctIndex: 1
      },
      points: 10
    },
    {
      id: 'act-2',
      type: 'texte_a_trous',
      consigne: 'Complétez les paroles avec les mots manquants :',
      contenu: {
        texte: 'Là-bas, là-bas... Tout au bout de nos [___], il y a un [___] pour nous.',
        trous: ['rêves', 'océan']
      },
      points: 20
    },
    {
      id: 'act-3',
      type: 'texte_libre',
      consigne: 'Décrivez un endroit où vous aimeriez aller. Pourquoi cet endroit vous attire-t-il ?',
      contenu: {
        minLength: 80
      },
      points: 15
    },
    {
      id: 'act-4',
      type: 'journal_reflexif',
      consigne: 'Réfléchissez à votre apprentissage :',
      contenu: {
        prompts: [
          'Quels nouveaux mots avez-vous appris ?',
          'Qu\'avez-vous trouvé difficile ?',
          'Que souhaitez-vous approfondir ?'
        ]
      },
      points: 10
    }
  ]
};

export default function SeancePlayerPage() {
  const params = useParams<{ chansonId: string; seanceId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  
  const [seance] = useState<Seance>(mockSeance);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentActivite = seance.activites[currentIndex];
  const progress = (completedActivities.size / seance.activites.length) * 100;

  const handleActivityComplete = useCallback((success: boolean, points: number) => {
    setCompletedActivities(prev => new Set([...prev, currentActivite.id]));
    setTotalPoints(prev => prev + points);
    
    // Passer à l'activité suivante après un délai
    setTimeout(() => {
      if (currentIndex < seance.activites.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  }, [currentActivite, currentIndex, seance.activites.length]);

  const renderActivity = () => {
    if (!currentActivite) return null;

    switch (currentActivite.type) {
      case 'qcm':
      case 'qcm_justifie':
        return <QuizQCM activite={currentActivite} onComplete={handleActivityComplete} />;
      case 'texte_a_trous':
        return <TexteATrous activite={currentActivite} onComplete={handleActivityComplete} />;
      case 'texte_libre':
        return <TexteLibre activite={currentActivite} onComplete={handleActivityComplete} />;
      case 'journal_reflexif':
        return <JournalReflexif activite={currentActivite} onComplete={handleActivityComplete} />;
      default:
        return <p>Type d&apos;activité non supporté</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (showResults) {
    const maxPoints = seance.activites.reduce((sum, a) => sum + (a.points || 0), 0);
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl">Séance terminée !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-accent">
                {totalPoints} / {maxPoints} points
              </div>
              <Progress value={percentage} className="h-4" />
              <p className="text-lg text-muted-foreground">
                {percentage >= 80 
                  ? '🎉 Excellent travail !' 
                  : percentage >= 60 
                    ? '👍 Bon travail, continuez ainsi !'
                    : '💪 Continuez à pratiquer !'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href={`/chanson/${params?.chansonId}`}>
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la chanson
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="gradient-accent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Voir ma progression
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Barre de progression fixe */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link 
              href={`/chanson/${params?.chansonId}`}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quitter la séance
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-mono">
                {currentIndex + 1} / {seance.activites.length}
              </Badge>
              <Badge className="bg-accent">
                {totalPoints} pts
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <main className="container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Info de la séance */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Music2 className="h-5 w-5 text-accent" />
              <Badge>{seance.niveau}</Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {seance.duree} min
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold">{seance.titre}</h1>
          </div>

          {/* Activité courante */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="capitalize">
                  {currentActivite?.type.replace('_', ' ')}
                </Badge>
                {currentActivite?.points && (
                  <span className="text-sm text-muted-foreground">
                    {currentActivite.points} points
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {renderActivity()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(prev => Math.min(seance.activites.length - 1, prev + 1))}
              disabled={currentIndex === seance.activites.length - 1 || !completedActivities.has(currentActivite?.id)}
            >
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
