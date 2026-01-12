'use client';

import { useState, useCallback } from 'react';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrdreElementsData } from '@/types/seance';
import { cn } from '@/lib/utils';

interface OrdreElementsProps {
  exercice: OrdreElementsData;
  onComplete: (score: number) => void;
}

interface ElementItem {
  id: string;
  texte: string;
  ordreCorrect: number;
  ordreActuel: number;
}

export function OrdreElements({ exercice, onComplete }: OrdreElementsProps) {
  // Mélanger les éléments au départ
  const [elements, setElements] = useState<ElementItem[]>(() => {
    const shuffled = [...exercice.elements]
      .map((el, index) => ({
        id: el.id,
        texte: el.texte,
        ordreCorrect: el.ordre,
        ordreActuel: index,
      }))
      .sort(() => Math.random() - 0.5)
      .map((el, index) => ({ ...el, ordreActuel: index }));
    return shuffled;
  });

  const [isVerified, setIsVerified] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newElements = [...elements];
    const [draggedElement] = newElements.splice(draggedIndex, 1);
    newElements.splice(dropIndex, 0, draggedElement);

    // Mettre à jour les ordres actuels
    const updatedElements = newElements.map((el, index) => ({
      ...el,
      ordreActuel: index,
    }));

    setElements(updatedElements);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsVerified(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Déplacer un élément avec les boutons (accessibilité)
  const moveElement = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= elements.length) return;

    const newElements = [...elements];
    [newElements[index], newElements[newIndex]] = [newElements[newIndex], newElements[index]];
    
    const updatedElements = newElements.map((el, i) => ({
      ...el,
      ordreActuel: i,
    }));

    setElements(updatedElements);
    setIsVerified(false);
  };

  const verifierOrdre = () => {
    setIsVerified(true);
  };

  const calculerScore = (): number => {
    const correctes = elements.filter(
      (el, index) => el.ordreCorrect === index + 1
    ).length;
    return Math.round((correctes / elements.length) * 100);
  };

  const estCorrectPosition = (element: ElementItem, index: number): boolean => {
    return element.ordreCorrect === index + 1;
  };

  const tousCorrects = elements.every((el, index) => estCorrectPosition(el, index));

  return (
    <Card>
      <CardContent className="p-6">
        {/* Consigne */}
        <p className="text-muted-foreground mb-6">
          {exercice.consigne || 'Glissez-déposez les éléments pour les remettre dans le bon ordre.'}
        </p>

        {/* Liste des éléments */}
        <div className="space-y-2 mb-6">
          {elements.map((element, index) => (
            <div
              key={element.id}
              draggable={!isVerified}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                !isVerified && "cursor-grab active:cursor-grabbing hover:border-accent hover:bg-accent/5",
                draggedIndex === index && "opacity-50 scale-95",
                dragOverIndex === index && "border-accent border-dashed",
                isVerified && estCorrectPosition(element, index) && "border-green-500 bg-green-50",
                isVerified && !estCorrectPosition(element, index) && "border-red-500 bg-red-50",
              )}
            >
              {/* Handle de drag */}
              {!isVerified && (
                <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />
              )}

              {/* Numéro */}
              <span className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium text-sm shrink-0",
                isVerified && estCorrectPosition(element, index) && "border-green-500 bg-green-500 text-white",
                isVerified && !estCorrectPosition(element, index) && "border-red-500 bg-red-500 text-white",
                !isVerified && "border-muted-foreground/30",
              )}>
                {index + 1}
              </span>

              {/* Texte */}
              <span className="flex-1">{element.texte}</span>

              {/* Indicateur de résultat */}
              {isVerified && (
                estCorrectPosition(element, index) ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                )
              )}

              {/* Boutons de déplacement (accessibilité) */}
              {!isVerified && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveElement(index, 'up')}
                    disabled={index === 0}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Monter"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveElement(index, 'down')}
                    disabled={index === elements.length - 1}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                    aria-label="Descendre"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Résultat après vérification */}
        {isVerified && (
          <div className={cn(
            "mb-6 p-4 rounded-lg border",
            tousCorrects ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200",
          )}>
            <div className="flex items-center gap-3">
              {tousCorrects ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <p className="font-medium text-green-900">
                    Parfait ! L'ordre est correct.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-2xl">🤔</span>
                  <div>
                    <p className="font-medium text-amber-900">
                      {calculerScore()}% des éléments sont bien placés
                    </p>
                    <p className="text-sm text-amber-800 mt-1">
                      Les éléments en rouge ne sont pas à la bonne position.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!isVerified && (
            <Button onClick={verifierOrdre} className="gradient-accent">
              Vérifier l'ordre
            </Button>
          )}
          {isVerified && (
            <Button onClick={() => onComplete(calculerScore())} className="gradient-accent">
              Continuer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
