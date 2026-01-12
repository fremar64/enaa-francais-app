'use client';

/**
 * Composant QuizQCMJustifie
 * QCM avec justification textuelle obligatoire pour valider les compétences Domaine 5
 * 
 * MAPPING OPÉRATIONNEL FINAL - Règle §4.3 :
 * "Aucune compétence métalinguistique ne doit être validée uniquement sur la base de QCM"
 * 
 * Ce composant permet de valider :
 * - 1.1, 2.1 : Compréhension (via les réponses QCM)
 * - 5.1, 5.2 : Métalinguistique (via la justification textuelle)
 * 
 * Compétences CEREDIS ciblées : 1.1, 2.1, 5.1, 5.2
 */

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Send, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { QuestionQCM } from '@/types/seance';
import { cn } from '@/lib/utils';

export interface QuestionQCMJustifie extends QuestionQCM {
  /** Prompt pour guider la justification */
  promptJustification?: string;
  /** Nombre minimum de caractères pour la justification */
  justificationMinLength?: number;
}

interface QuizQCMJustifieProps {
  questions: QuestionQCMJustifie[];
  onComplete: (score: number, justification: string) => void;
  /** Titre optionnel pour le quiz */
  titre?: string;
}

interface QuestionState {
  answered: boolean;
  selectedOption: number | null;
  isCorrect: boolean;
  justification: string;
}

export function QuizQCMJustifie({ questions, onComplete, titre }: QuizQCMJustifieProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>(() => {
    const initial: Record<string, QuestionState> = {};
    questions.forEach(q => {
      initial[q.id] = { answered: false, selectedOption: null, isCorrect: false, justification: '' };
    });
    return initial;
  });
  const [showExplication, setShowExplication] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestion];
  const state = questionStates[question.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const minJustificationLength = question.justificationMinLength || 30;

  const handleSelectOption = (optionIndex: number) => {
    if (state?.answered) return;

    const isCorrect = optionIndex === question.reponseCorrecte;
    
    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        answered: true,
        selectedOption: optionIndex,
        isCorrect,
      },
    }));
    setShowExplication(true);
  };

  const handleJustificationChange = (value: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        justification: value,
      },
    }));
  };

  const isJustificationValid = () => {
    return state.justification.trim().length >= minJustificationLength;
  };

  const handleNext = () => {
    if (!isJustificationValid()) return;
    
    setShowExplication(false);
    
    if (isLastQuestion) {
      calculateAndSubmit();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const calculateAndSubmit = () => {
    setIsSubmitting(true);
    
    // Calculer le score QCM (50% du score total)
    const correctAnswers = Object.values(questionStates).filter(s => s.isCorrect).length;
    const qcmScore = (correctAnswers / questions.length) * 50;
    
    // Calculer le score justification (50% du score total)
    // Basé sur la longueur moyenne des justifications
    const totalJustificationLength = Object.values(questionStates)
      .reduce((sum, s) => sum + s.justification.trim().length, 0);
    const avgLength = totalJustificationLength / questions.length;
    
    let justificationScore = 0;
    if (avgLength >= 100) justificationScore = 50;
    else if (avgLength >= 60) justificationScore = 40;
    else if (avgLength >= minJustificationLength) justificationScore = 30;
    else justificationScore = 20;
    
    const totalScore = Math.round(qcmScore + justificationScore);
    
    // Concaténer toutes les justifications pour la preuve CaSS
    const allJustifications = Object.entries(questionStates)
      .map(([id, s], i) => `Q${i + 1}: ${s.justification}`)
      .join('\n\n');
    
    onComplete(totalScore, allJustifications);
  };

  const getOptionStyle = (index: number) => {
    if (!state?.answered) {
      return 'border-border hover:border-accent hover:bg-accent/5 cursor-pointer';
    }

    if (index === question.reponseCorrecte) {
      return 'border-green-500 bg-green-50 text-green-900';
    }

    if (index === state.selectedOption && !state.isCorrect) {
      return 'border-red-500 bg-red-50 text-red-900';
    }

    return 'border-border opacity-50';
  };

  const getOptionIcon = (index: number) => {
    if (!state?.answered) return null;

    if (index === question.reponseCorrecte) {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }

    if (index === state.selectedOption && !state.isCorrect) {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }

    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            {titre || 'QCM avec justification'}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Compétences 5.1, 5.2
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Répondez aux questions puis justifiez votre choix pour valider vos compétences métalinguistiques
        </p>
      </CardHeader>

      <CardContent className="p-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
          <span>Question {currentQuestion + 1} sur {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={cn(
                  "h-2 w-6 rounded-full",
                  i === currentQuestion && "bg-accent",
                  i < currentQuestion && (questionStates[q.id]?.isCorrect ? "bg-green-500" : "bg-red-400"),
                  i > currentQuestion && "bg-muted",
                )}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <h2 className="font-display text-xl font-semibold mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={state?.answered}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all text-left",
                getOptionStyle(index)
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full border-2",
                  state?.answered && index === question.reponseCorrecte && "border-green-500 bg-green-100",
                  state?.answered && index === state.selectedOption && !state.isCorrect && "border-red-500 bg-red-100",
                  !state?.answered && "border-muted-foreground"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {/* Explication et Justification */}
        {showExplication && (
          <div className="space-y-4 mt-6 pt-6 border-t">
            {/* Explication de la bonne réponse */}
            {question.explication && (
              <div className={cn(
                "p-4 rounded-lg border",
                state.isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
              )}>
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4" />
                  Explication
                </h4>
                <p className="text-sm">{question.explication}</p>
              </div>
            )}

            {/* Zone de justification */}
            <div className="space-y-2">
              <Label htmlFor="justification" className="font-medium">
                {question.promptJustification || 'Expliquez votre raisonnement :'}
              </Label>
              <Textarea
                id="justification"
                value={state.justification}
                onChange={(e) => handleJustificationChange(e.target.value)}
                placeholder="Justifiez votre choix en expliquant comment vous avez analysé la question..."
                className="min-h-[100px] resize-y"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className={cn(
                  state.justification.length >= minJustificationLength ? "text-green-600" : "text-amber-600"
                )}>
                  {state.justification.length} / {minJustificationLength} caractères minimum
                </span>
                {!isJustificationValid() && (
                  <span className="text-amber-600">
                    Justification requise pour continuer
                  </span>
                )}
              </div>
            </div>

            {/* Bouton suivant */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNext}
                disabled={!isJustificationValid() || isSubmitting}
                className="gradient-accent gap-2"
              >
                {isLastQuestion ? (
                  <>
                    <Send className="h-4 w-4" />
                    Terminer le quiz
                  </>
                ) : (
                  'Question suivante →'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
