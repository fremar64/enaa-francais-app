"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import type { LectureActivityContent } from "@packages/lecture-curriculum";
import { ArrowLeft, RefreshCw, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";

interface DictationExerciseProps {
  phoneme: LectureActivityContent;
  onComplete: (score: number) => void;
  onBack: () => void;
  onAttempt?: () => void;
  onError?: (code: string) => void;
  onSuccess?: () => void;
}

const buildSentences = (phoneme: LectureActivityContent) => {
  const words = phoneme.exampleWords.slice(0, 4);

  if (phoneme.level === "GS") {
    return [
      `Le ${words[0]} est la.`,
      `Voici un ${words[1]}.`,
      `Le ${words[2]} est joli.`,
    ];
  }

  if (phoneme.level === "CP") {
    return [
      `Je vois un ${words[0]} dans la cour.`,
      `Le ${words[1]} est tres joli.`,
      `Nous avons un ${words[2]} ici.`,
    ];
  }

  return [
    `Dans la cour, le ${words[0]} est tres joli.`,
    `Je vois un ${words[1]} qui bouge vite.`,
    `Nous avons un ${words[2]} pour la classe.`,
  ];
};

const maxLinesByLevel: Record<LectureActivityContent["level"], number> = {
  GS: 3,
  CP: 6,
  CE1: 10,
};

type Token = {
  value: string;
  type: "word" | "punct";
};

type WordFeedback = {
  expected: string;
  actual?: string;
  status: "exact" | "accent" | "wrong" | "missing";
};

type SentenceFeedback = {
  score: number;
  wordFeedback: WordFeedback[];
  accentWarnings: number;
  punctuationErrors: number;
};

type AnswerSegment = {
  value: string;
  type: "word" | "punct" | "space";
};

const normalizeForCompare = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const tokenize = (value: string): Token[] => {
  const matches = value.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9']+|[.,!?;:]/g) || [];

  return matches.map((token) => ({
    value: token,
    type: /[A-Za-zÀ-ÖØ-öø-ÿ0-9']+/.test(token) ? "word" : "punct",
  }));
};

const splitAnswerSegments = (value: string): AnswerSegment[] => {
  const segments: AnswerSegment[] = [];
  const regex = /[A-Za-zÀ-ÖØ-öø-ÿ0-9']+|[.,!?;:]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        value: value.slice(lastIndex, match.index),
        type: "space",
      });
    }

    const tokenValue = match[0];
    segments.push({
      value: tokenValue,
      type: /[A-Za-zÀ-ÖØ-öø-ÿ0-9']+/.test(tokenValue) ? "word" : "punct",
    });

    lastIndex = match.index + tokenValue.length;
  }

  if (lastIndex < value.length) {
    segments.push({
      value: value.slice(lastIndex),
      type: "space",
    });
  }

  return segments.length ? segments : [{ value, type: "space" }];
};

const scoreSentence = (expected: string, actual: string): SentenceFeedback => {
  const expectedTokens = tokenize(expected);
  const actualTokens = tokenize(actual);

  if (!expectedTokens.length) {
    return { score: 0, wordFeedback: [], accentWarnings: 0, punctuationErrors: 0 };
  }

  let rawScore = 0;
  let punctuationErrors = 0;

  expectedTokens.forEach((token, index) => {
    const actualToken = actualTokens[index];

    if (!actualToken) {
      if (token.type === "punct") {
        punctuationErrors += 1;
      }
      return;
    }

    if (token.type === "punct") {
      if (actualToken.value === token.value) {
        rawScore += 1;
      } else {
        punctuationErrors += 1;
      }
      return;
    }

    const expectedLower = token.value.toLowerCase();
    const actualLower = actualToken.value.toLowerCase();
    if (expectedLower === actualLower) {
      rawScore += 1;
      return;
    }

    if (normalizeForCompare(expectedLower) === normalizeForCompare(actualLower)) {
      rawScore += 0.7;
    }
  });

  const expectedWords = expectedTokens.filter((token) => token.type === "word");
  const actualWords = actualTokens.filter((token) => token.type === "word");
  const wordFeedback = expectedWords.map((token, index): WordFeedback => {
    const actualToken = actualWords[index];

    if (!actualToken) {
      return { expected: token.value, status: "missing" };
    }

    const expectedLower = token.value.toLowerCase();
    const actualLower = actualToken.value.toLowerCase();

    if (expectedLower === actualLower) {
      return { expected: token.value, actual: actualToken.value, status: "exact" };
    }

    if (normalizeForCompare(expectedLower) === normalizeForCompare(actualLower)) {
      return { expected: token.value, actual: actualToken.value, status: "accent" };
    }

    return { expected: token.value, actual: actualToken.value, status: "wrong" };
  });

  const accentWarnings = wordFeedback.filter((entry) => entry.status === "accent").length;
  const score = Math.round((rawScore / expectedTokens.length) * 100);

  return {
    score,
    wordFeedback,
    accentWarnings,
    punctuationErrors,
  };
};

export const DictationExercise = ({
  phoneme,
  onComplete,
  onBack,
  onAttempt,
  onError,
  onSuccess
}: DictationExerciseProps) => {
  const sentences = useMemo(() => buildSentences(phoneme), [phoneme]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<SentenceFeedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [lastElapsedSeconds, setLastElapsedSeconds] = useState<number | null>(null);
  const [startedAt] = useState(() => Date.now());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [limitBounce, setLimitBounce] = useState(false);
  const wasOverflowingRef = useRef(false);

  const progress = ((currentIndex + 1) / sentences.length) * 100;
  const currentSentence = sentences[currentIndex];
  const liveFeedback = useMemo(() => scoreSentence(currentSentence, answer), [currentSentence, answer]);
  const displayedFeedback = showFeedback && feedback ? feedback : liveFeedback;
  const expectedTokens = useMemo(() => tokenize(currentSentence), [currentSentence]);
  const answerSegments = useMemo(() => splitAnswerSegments(answer), [answer]);
  const expectedWords = useMemo(
    () => expectedTokens.filter((token) => token.type === "word"),
    [expectedTokens]
  );
  const expectedPunct = useMemo(
    () => expectedTokens.filter((token) => token.type === "punct"),
    [expectedTokens]
  );
  const maxLines = maxLinesByLevel[phoneme.level];

  const syncScroll = useCallback(() => {
    if (!textareaRef.current || !overlayRef.current) {
      return;
    }

    overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }, []);

  useEffect(() => {
    syncScroll();
  }, [answer, currentIndex, syncScroll]);

  useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    const computed = window.getComputedStyle(textarea);
    const fontSize = Number.parseFloat(computed.fontSize || "16");
    const paddingTop = Number.parseFloat(computed.paddingTop || "0");
    const paddingBottom = Number.parseFloat(computed.paddingBottom || "0");
    const computedLineHeight = Number.parseFloat(computed.lineHeight || "0");
    const lineHeight = Number.isFinite(computedLineHeight) && computedLineHeight > 0
      ? computedLineHeight
      : fontSize * 1.6;
    const minHeight = lineHeight * 3 + paddingTop + paddingBottom;
    const maxHeight = lineHeight * maxLines + paddingTop + paddingBottom;

    textarea.style.height = "auto";
    const naturalHeight = Math.max(textarea.scrollHeight, minHeight);
    const nextHeight = Math.min(naturalHeight, maxHeight);
    const overflowActive = naturalHeight > maxHeight;
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = overflowActive ? "auto" : "hidden";
    setEditorHeight(nextHeight);
    setIsOverflowing(overflowActive);

    if (overflowActive && !wasOverflowingRef.current) {
      setLimitBounce(true);
    }

    wasOverflowingRef.current = overflowActive;
  }, [answer, currentIndex, maxLines]);

  useEffect(() => {
    if (!limitBounce) {
      return;
    }

    const timer = window.setTimeout(() => setLimitBounce(false), 350);
    return () => window.clearTimeout(timer);
  }, [limitBounce]);

  const speakSentence = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleValidate = () => {
    const result = scoreSentence(currentSentence, answer);
    onAttempt?.();
    if (result.score < 100) {
      onError?.("dictation-mismatch");
    }
    const nextScores = [...scores, result.score];
    setScores(nextScores);
    setFeedback(result);
    setShowFeedback(true);
    setAttempts((value) => value + 1);
    setTotalScore((value) => value + result.score);
    setLastScore(result.score);
    setLastElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));

    if (currentIndex === sentences.length - 1) {
      const computedFinalScore = Math.round(
        nextScores.reduce((sum, value) => sum + value, 0) / nextScores.length
      );
      setFinalScore(computedFinalScore);
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setFeedback(null);

    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((value) => value + 1);
      setAnswer("");
      return;
    }

    const resolvedScore = finalScore ??
      Math.round(scores.reduce((sum, value) => sum + value, 0) / Math.max(scores.length, 1));
    setIsComplete(true);
    onSuccess?.();
    onComplete(resolvedScore);
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setAnswer("");
    setIsComplete(false);
    setScores([]);
    setFinalScore(null);
    setFeedback(null);
    setShowFeedback(false);
    setAttempts(0);
    setTotalScore(0);
    setLastScore(null);
    setLastElapsedSeconds(null);
  };

  if (isComplete) {
    return (
      <div className="exercise-container">
        <div className="w-full max-w-md mx-auto text-center animate-scale-in">
          <h2 className="text-3xl font-fredoka font-bold mb-4 text-foreground">
            Bravo ! 🎉
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Tu as termine la dictee de phrases.
          </p>
          <p className="text-4xl font-fredoka font-bold text-primary mb-8">
            {scores.length
              ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length)
              : 0}%
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
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-3" />
          </div>
          <div className="text-sm font-semibold text-muted-foreground">
            {currentIndex + 1}/{sentences.length}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Progression locale</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Tentatives</span>
              <span className="font-semibold text-foreground">{attempts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Score moyen</span>
              <span className="font-semibold text-foreground">
                {attempts ? Math.round(totalScore / attempts) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Dernier score</span>
              <span className="font-semibold text-foreground">
                {lastScore ?? 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Temps passe</span>
              <span className="font-semibold text-foreground">
                {lastElapsedSeconds !== null ? `${lastElapsedSeconds}s` : "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-xl md:text-2xl font-fredoka font-bold text-foreground mb-2">
            Ecris la phrase dictee
          </h2>
          <p className="text-muted-foreground">
            Son cible: <span className="text-primary">"{phoneme.symbol}"</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => speakSentence(currentSentence)}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-secondary to-secondary/60",
              "shadow-soft-lg hover:scale-105 transition-transform duration-200",
              "focus:outline-none focus:ring-4 focus:ring-secondary/40"
            )}
          >
            <Volume2 className="w-10 h-10 text-secondary-foreground" />
          </button>
          <button
            onClick={() => speakSentence(currentSentence)}
            className="text-sm text-primary hover:underline"
          >
            🔊 Ecouter la phrase
          </button>
        </div>

        <div className="mt-6">
          <div
            className={cn(
              "relative rounded-md transition-transform",
              limitBounce && "animate-[limit-bounce_300ms_ease-out]",
              isOverflowing && "shadow-[inset_0_10px_12px_-10px_rgba(0,0,0,0.25),_inset_0_-10px_12px_-10px_rgba(0,0,0,0.25)]",
            )}
          >
            <div
              ref={overlayRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 min-h-[160px] overflow-hidden",
                "whitespace-pre-wrap break-words",
                "rounded-md border border-transparent bg-transparent",
                "px-3 py-2 text-base leading-relaxed",
              )}
              style={editorHeight ? { height: editorHeight } : undefined}
            >
              {answerSegments.map((segment, index) => {
                if (segment.type === "space") {
                  return <span key={`space-${index}`}>{segment.value}</span>;
                }

                let status: WordFeedback["status"] = "wrong";

                if (segment.type === "word") {
                  const wordIndex = answerSegments
                    .slice(0, index)
                    .filter((item) => item.type === "word").length;
                  const expected = expectedWords[wordIndex]?.value ?? "";

                  if (!expected) {
                    status = "wrong";
                  } else if (segment.value.toLowerCase() === expected.toLowerCase()) {
                    status = "exact";
                  } else if (
                    normalizeForCompare(segment.value.toLowerCase()) ===
                    normalizeForCompare(expected.toLowerCase())
                  ) {
                    status = "accent";
                  }
                }

                if (segment.type === "punct") {
                  const punctIndex = answerSegments
                    .slice(0, index)
                    .filter((item) => item.type === "punct").length;
                  const expected = expectedPunct[punctIndex]?.value ?? "";
                  status = segment.value === expected ? "exact" : "wrong";
                }

                return (
                  <span
                    key={`token-${index}`}
                    className={cn(
                      "rounded px-1",
                      status === "exact" && "bg-success/20 text-success",
                      status === "accent" && "bg-warning/20 text-warning",
                      status === "wrong" && "bg-destructive/20 text-destructive",
                    )}
                  >
                    {segment.value}
                  </span>
                );
              })}
            </div>
            <Textarea
              ref={textareaRef}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onScroll={syncScroll}
              placeholder="Ecris la phrase ici"
              className={cn(
                "min-h-[160px] overflow-hidden resize-none",
                "bg-transparent text-transparent caret-foreground",
                "text-base leading-relaxed",
              )}
              style={editorHeight ? { height: editorHeight } : undefined}
              readOnly={showFeedback}
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card/60 p-4">
          <p className="text-xs text-muted-foreground mb-2">Feedback en temps reel</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>Accents a corriger: {displayedFeedback.accentWarnings}</span>
            <span>Ponctuation: {displayedFeedback.punctuationErrors}</span>
            <span>Score: {displayedFeedback.score}%</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {showFeedback ? (
            <Button onClick={handleContinue}>Continuer</Button>
          ) : (
            <Button onClick={handleValidate} disabled={!answer.trim()}>
              Valider
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
