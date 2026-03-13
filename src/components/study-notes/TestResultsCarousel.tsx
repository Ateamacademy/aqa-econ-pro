/**
 * TestResultsCarousel — 3-slide carousel for End of Chapter Test results.
 * Slide 1: Score Overview
 * Slide 2: Answer Review (correct/incorrect)
 * Slide 3: Areas to Improve with relevant diagrams
 *
 * Styled with the notebook/revision card aesthetic.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, TrendingUp, BookOpen, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EconDiagramTemplate, resolveDiagramType, type DiagramType } from "@/components/revision/EconDiagramLibrary";
import { cn } from "@/lib/utils";

interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

interface TestResultsCarouselProps {
  questions: MCQ[];
  selected: (number | null)[];
  onRetake: () => void;
  onClose: () => void;
}

/** Try to resolve a diagram type from question text */
function detectDiagram(questionText: string): DiagramType | null {
  const mappings: [RegExp, string][] = [
    [/supply\s*(curve\s*)?shift.*right|increase.*supply/i, "supply_increase"],
    [/supply\s*(curve\s*)?shift.*left|decrease.*supply|fall.*supply/i, "supply_decrease"],
    [/demand\s*(curve\s*)?shift.*right|increase.*demand/i, "demand_increase"],
    [/demand\s*(curve\s*)?shift.*left|decrease.*demand|fall.*demand/i, "demand_decrease"],
    [/positive\s*externality|merit\s*good/i, "positive_externality"],
    [/negative\s*externality|demerit\s*good/i, "negative_externality"],
    [/negative\s*production\s*externality|pollution/i, "negative_production_externality"],
    [/positive\s*production\s*externality/i, "positive_production_externality"],
    [/aggregate\s*demand.*increase|ad.*shift.*right|expansionary.*fiscal/i, "ad_increase"],
    [/aggregate\s*demand.*decrease|ad.*shift.*left|contractionary/i, "ad_decrease"],
    [/sras.*decrease|cost.*push|sras.*left/i, "sras_decrease"],
    [/sras.*increase|sras.*right/i, "sras_increase"],
    [/elastic.*demand|ped.*elastic/i, "ped_elastic"],
    [/inelastic.*demand|ped.*inelastic/i, "ped_inelastic"],
    [/production\s*possibility|ppf|ppc/i, "ppf"],
    [/monopoly|monopolist/i, "monopoly"],
    [/perfect\s*competition/i, "perfect_competition"],
    [/tax\s*incidence|indirect\s*tax|specific\s*tax/i, "tax_incidence"],
    [/subsidy|government\s*subsidy/i, "subsidy"],
    [/price\s*floor|minimum\s*price|minimum\s*wage/i, "price_floor"],
    [/price\s*ceiling|maximum\s*price|rent\s*control/i, "price_ceiling"],
    [/phillips\s*curve/i, "phillips_curve"],
    [/supply\s*and\s*demand|equilibrium\s*price/i, "supply_demand"],
  ];

  for (const [regex, type] of mappings) {
    if (regex.test(questionText)) {
      const resolved = resolveDiagramType(type);
      if (resolved) return resolved;
    }
  }
  return null;
}

export function TestResultsCarousel({ questions, selected, onRetake, onClose }: TestResultsCarouselProps) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const score = questions.reduce((acc, q, i) => acc + (selected[i] === q.correctIndex ? 1 : 0), 0);
  const scorePercent = Math.round((score / questions.length) * 100);

  const incorrectQs = questions
    .map((q, i) => ({ ...q, index: i, userAnswer: selected[i] }))
    .filter(q => q.userAnswer !== q.correctIndex);

  const correctQs = questions
    .map((q, i) => ({ ...q, index: i }))
    .filter((_, i) => selected[i] === questions[i].correctIndex);

  // Find diagrams relevant to incorrect answers
  const relevantDiagrams: { question: string; diagramType: DiagramType }[] = [];
  for (const q of incorrectQs) {
    const dt = detectDiagram(q.question);
    if (dt && !relevantDiagrams.find(d => d.diagramType === dt)) {
      relevantDiagrams.push({ question: q.question, diagramType: dt });
    }
  }

  const goTo = (next: number) => {
    setDirection(next > slide ? 1 : -1);
    setSlide(next);
  };

  const slideLabels = ["Score", "Review", "Improve"];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="revision-topic-card overflow-hidden">
      {/* Notebook hole decorations */}
      <div className="absolute left-3 top-4 flex flex-col gap-6">
        <div className="w-3 h-3 rounded-full border-2 border-border opacity-30" />
        <div className="w-3 h-3 rounded-full border-2 border-border opacity-30" />
      </div>

      <div className="pl-5">
        {/* Header with dot navigation */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="revision-topic-title handwritten-underline text-lg">
            📝 Your Results
          </h2>
          <div className="flex items-center gap-2">
            {slideLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  slide === i
                    ? "bg-primary scale-125 shadow-sm"
                    : "bg-muted-foreground/25 hover:bg-muted-foreground/40"
                )}
                title={label}
                aria-label={`View ${label}`}
              />
            ))}
          </div>
        </div>

        {/* Slide content */}
        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {slide === 0 && (
              <motion.div
                key="score"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-4"
              >
                {/* Score banner — notebook style */}
                <div className={cn(
                  "text-center py-6 rounded-xl border",
                  scorePercent >= 80
                    ? "bg-[hsl(var(--revision-green)/0.08)] border-[hsl(var(--revision-green)/0.2)]"
                    : scorePercent >= 60
                    ? "bg-[hsl(var(--revision-amber)/0.08)] border-[hsl(var(--revision-amber)/0.2)]"
                    : "bg-[hsl(var(--revision-red)/0.08)] border-[hsl(var(--revision-red)/0.2)]"
                )}>
                  <Trophy className={cn(
                    "h-10 w-10 mx-auto mb-3",
                    scorePercent >= 80 ? "text-[hsl(var(--revision-green))]"
                      : scorePercent >= 60 ? "text-[hsl(var(--revision-amber))]"
                      : "text-[hsl(var(--revision-red))]"
                  )} />
                  <p className="font-handwriting text-5xl font-bold">{score}/{questions.length}</p>
                  <p className="font-handwriting-alt text-lg mt-2 text-muted-foreground">
                    {scorePercent}% — {
                      scorePercent >= 80 ? "Excellent! 🎉" :
                      scorePercent >= 60 ? "Good effort! Keep practising 💪" :
                      "Review this chapter and try again 📖"
                    }
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="revision-box revision-definition p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--revision-green))]" />
                      <span className="font-handwriting text-lg font-bold">{correctQs.length} Correct</span>
                    </div>
                  </div>
                  <div className="revision-box revision-exam-tip p-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-[hsl(var(--revision-red))]" />
                      <span className="font-handwriting text-lg font-bold">{incorrectQs.length} Incorrect</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {slide === 1 && (
              <motion.div
                key="review"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-3 max-h-[400px] overflow-y-auto pr-1"
              >
                {questions.map((q, qi) => {
                  const isCorrect = selected[qi] === q.correctIndex;
                  return (
                    <div
                      key={qi}
                      className={cn(
                        "revision-box p-3 text-sm",
                        isCorrect ? "revision-definition" : "revision-exam-tip"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--revision-green))] mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-[hsl(var(--revision-red))] mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-handwriting-alt text-base font-medium leading-snug">
                            Q{qi + 1}. {q.question}
                          </p>
                          {!isCorrect && (
                            <div className="mt-2 text-xs space-y-1">
                              <p>
                                <span className="text-muted-foreground">Your answer: </span>
                                <span className="text-[hsl(var(--revision-red))] font-medium">
                                  {q.options[selected[qi]!]}
                                </span>
                              </p>
                              <p>
                                <span className="text-muted-foreground">Correct: </span>
                                <span className="text-[hsl(var(--revision-green))] font-semibold highlighter-yellow">
                                  {q.options[q.correctIndex]}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {slide === 2 && (
              <motion.div
                key="improve"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-4 max-h-[500px] overflow-y-auto pr-1"
              >
                {incorrectQs.length === 0 ? (
                  <div className="revision-box revision-definition p-5 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-[hsl(var(--revision-green))]" />
                    <p className="font-handwriting text-xl font-bold">Perfect Score!</p>
                    <p className="font-handwriting-alt text-base text-muted-foreground mt-1">
                      You answered every question correctly. Well done! 🌟
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="revision-box revision-exam-tip p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-[hsl(var(--revision-red))]" />
                        <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-red))]">
                          Areas to Review
                        </span>
                      </div>
                      <ul className="space-y-1.5 pl-1">
                        {incorrectQs.map((q, i) => (
                          <li key={i} className="font-handwriting-alt text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-[hsl(var(--revision-red))] font-bold shrink-0">▸</span>
                            <span>{q.question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Relevant diagrams */}
                    {relevantDiagrams.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-1">
                          <TrendingUp className="h-4 w-4 text-[hsl(var(--revision-green))]" />
                          <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-green))]">
                            Key Diagrams to Revise
                          </span>
                        </div>
                        {relevantDiagrams.map((d, i) => (
                          <div key={i} className="revision-box revision-diagram">
                            <div className="revision-box-content p-2">
                              <EconDiagramTemplate type={d.diagramType} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
          <Button
            size="sm"
            variant="ghost"
            disabled={slide === 0}
            onClick={() => goTo(slide - 1)}
            className="gap-1 font-handwriting-alt text-base"
          >
            <ChevronLeft className="h-4 w-4" /> {slide > 0 ? slideLabels[slide - 1] : ""}
          </Button>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onRetake} className="gap-1.5 font-handwriting-alt text-sm">
              <RotateCcw className="h-3.5 w-3.5" /> Retake
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="font-handwriting-alt text-sm">
              Close
            </Button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            disabled={slide === 2}
            onClick={() => goTo(slide + 1)}
            className="gap-1 font-handwriting-alt text-base"
          >
            {slide < 2 ? slideLabels[slide + 1] : ""} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
