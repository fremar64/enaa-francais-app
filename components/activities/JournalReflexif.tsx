'use client';

/**
 * Composant JournalReflexif
 * Permet la verbalisation des stratégies de compréhension (métacognition)
 * 
 * Compétence CEREDIS ciblée :
 * - 5.6 : Verbaliser ses stratégies de compréhension
 * 
 * Ce composant implémente l'activité A4 du MAPPING OPÉRATIONNEL FINAL :
 * "Qu'est-ce que l'analyse du conditionnel t'a permis de mieux comprendre ?"
 */

import { useState } from 'react';
import { BookOpen, Send, Brain, Lightbulb, CheckCircle2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface JournalReflexifData {
  id: string;
  titre: string;
  questionPrincipale: string;
  sousQuestions?: string[];
  echelleDifficulte?: boolean; // Demander à l'apprenant d'évaluer la difficulté
  promptsReflexion?: string[];
}

interface JournalReflexifProps {
  exercice: JournalReflexifData;
  onComplete: (score: number) => void;
}

interface ReflexionState {
  reponseTexte: string;
  difficultePercue: number | null; // 1-5
  strategiesUtilisees: string[];
}

export function JournalReflexif({ exercice, onComplete }: JournalReflexifProps) {
  const [reflexion, setReflexion] = useState<ReflexionState>({
    reponseTexte: '',
    difficultePercue: null,
    strategiesUtilisees: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  const strategiesPredefines = [
    'Relire plusieurs fois le passage',
    'Chercher le sens des mots inconnus',
    'Faire des liens avec mes connaissances',
    'Visualiser la scène mentalement',
    'Me poser des questions sur le texte',
    'Identifier la structure du texte',
    'Repérer les connecteurs logiques',
    'Analyser les temps verbaux'
  ];

  const toggleStrategie = (strategie: string) => {
    setReflexion(prev => ({
      ...prev,
      strategiesUtilisees: prev.strategiesUtilisees.includes(strategie)
        ? prev.strategiesUtilisees.filter(s => s !== strategie)
        : [...prev.strategiesUtilisees, strategie]
    }));
  };

  const isValidReflexion = () => {
    return reflexion.reponseTexte.trim().length >= 30; // Au moins 30 caractères
  };

  const calculateScore = (): number => {
    let score = 0;
    
    // Score basé sur la longueur de la réflexion (max 40 points)
    const textLength = reflexion.reponseTexte.trim().length;
    if (textLength >= 200) score += 40;
    else if (textLength >= 100) score += 30;
    else if (textLength >= 50) score += 20;
    else score += 10;
    
    // Score basé sur les stratégies identifiées (max 30 points)
    const strategiesCount = reflexion.strategiesUtilisees.length;
    score += Math.min(strategiesCount * 10, 30);
    
    // Score basé sur l'auto-évaluation (max 30 points)
    if (reflexion.difficultePercue !== null) {
      score += 30;
    }
    
    return score;
  };

  const handleSubmit = () => {
    if (isValidReflexion()) {
      setIsSubmitted(true);
      const score = calculateScore();
      onComplete(score);
    }
  };

  const getDifficultyLabel = (level: number): string => {
    const labels: Record<number, string> = {
      1: 'Très facile',
      2: 'Facile',
      3: 'Moyen',
      4: 'Difficile',
      5: 'Très difficile'
    };
    return labels[level] || '';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-b">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          {exercice.titre || 'Journal réflexif'}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Prenez un moment pour réfléchir à votre apprentissage
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Question principale */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5" />
            Question de réflexion
          </h3>
          <p className="text-purple-800 leading-relaxed">
            {exercice.questionPrincipale}
          </p>
        </div>

        {/* Sous-questions optionnelles */}
        {exercice.sousQuestions && exercice.sousQuestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Pour vous aider, pensez à :
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              {exercice.sousQuestions.map((question, i) => (
                <li key={i}>{question}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton aide réflexion */}
        {exercice.promptsReflexion && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPrompts(!showPrompts)}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            {showPrompts ? 'Masquer les pistes' : 'Besoin d\'inspiration ?'}
          </Button>
        )}

        {/* Prompts de réflexion */}
        {showPrompts && exercice.promptsReflexion && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">
              Pistes de réflexion :
            </h4>
            <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
              {exercice.promptsReflexion.map((prompt, i) => (
                <li key={i}>{prompt}</li>
              ))}
            </ul>
          </div>
        )}

        {!isSubmitted ? (
          <>
            {/* Zone de texte pour la réflexion */}
            <div className="space-y-2">
              <Label htmlFor="reflexion" className="font-medium">
                Votre réflexion :
              </Label>
              <Textarea
                id="reflexion"
                value={reflexion.reponseTexte}
                onChange={(e) => setReflexion(prev => ({ ...prev, reponseTexte: e.target.value }))}
                placeholder="Expliquez comment vous avez procédé pour comprendre le texte, ce qui vous a aidé, et ce que vous avez appris..."
                className="min-h-[150px] resize-y"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 30 caractères • Actuellement : {reflexion.reponseTexte.length} caractères
              </p>
            </div>

            {/* Sélection des stratégies utilisées */}
            <div className="space-y-3">
              <Label className="font-medium">
                Quelles stratégies avez-vous utilisées ?
              </Label>
              <div className="flex flex-wrap gap-2">
                {strategiesPredefines.map((strategie) => (
                  <Badge
                    key={strategie}
                    variant={reflexion.strategiesUtilisees.includes(strategie) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all",
                      reflexion.strategiesUtilisees.includes(strategie)
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "hover:border-purple-400"
                    )}
                    onClick={() => toggleStrategie(strategie)}
                  >
                    {strategie}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Échelle de difficulté perçue */}
            {exercice.echelleDifficulte !== false && (
              <div className="space-y-3">
                <Label className="font-medium">
                  Comment avez-vous trouvé cette activité ?
                </Label>
                <RadioGroup
                  value={reflexion.difficultePercue?.toString() || ''}
                  onValueChange={(value) => setReflexion(prev => ({ 
                    ...prev, 
                    difficultePercue: parseInt(value) 
                  }))}
                  className="flex flex-wrap gap-4"
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.toString()} id={`difficulty-${level}`} />
                      <Label htmlFor={`difficulty-${level}`} className="flex items-center gap-1">
                        {Array.from({ length: level }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {getDifficultyLabel(level)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!isValidReflexion()}
                className="gradient-accent gap-2"
              >
                <Send className="h-4 w-4" />
                Enregistrer ma réflexion
              </Button>
            </div>
          </>
        ) : (
          /* Confirmation de soumission */
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-green-900 mb-2">
              Réflexion enregistrée !
            </h4>
            <p className="text-sm text-green-800 mb-4">
              Votre journal réflexif a été sauvegardé. Cette démarche métacognitive 
              vous aide à progresser dans votre apprentissage.
            </p>
            
            {/* Résumé */}
            <div className="text-left bg-white rounded-lg p-4 mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Stratégies identifiées :</span>{' '}
                {reflexion.strategiesUtilisees.length > 0 
                  ? reflexion.strategiesUtilisees.join(', ')
                  : 'Aucune sélectionnée'}
              </p>
              {reflexion.difficultePercue && (
                <p className="text-sm">
                  <span className="font-medium">Difficulté perçue :</span>{' '}
                  {getDifficultyLabel(reflexion.difficultePercue)}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
