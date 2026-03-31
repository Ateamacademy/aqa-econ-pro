/**
 * FeedbackCarousel — 3-slide carousel for subtopic practice feedback.
 * Slide 1: Your Mark (score overview)
 * Slide 2: Detailed Feedback (strengths & improvements)
 * Slide 3: Model Answer + relevant diagrams
 *
 * Styled with the notebook/revision card aesthetic.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, AlertTriangle, BookOpen, ChevronLeft, ChevronRight, RotateCcw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { EconDiagramTemplate, resolveDiagramType, type DiagramType } from "@/components/revision/EconDiagramLibrary";
import { cn } from "@/lib/utils";

interface FeedbackCarouselProps {
  feedback: string;
  question: string;
  onNewQuestion: () => void;
  onClose: () => void;
}

/** Extract mark from feedback text, e.g. "3/4", "6/8" */
function extractMark(text: string): { earned: number; total: number } | null {
  const match = text.match(/(\d+)\s*\/\s*(\d+)\s*mark/i)
    || text.match(/(?:mark|score)[:\s]*(\d+)\s*\/\s*(\d+)/i)
    || text.match(/(\d+)\s*\/\s*(\d+)/);
  if (match) return { earned: parseInt(match[1]), total: parseInt(match[2]) };
  return null;
}

/** Split feedback into sections: strengths, improvements, model answer */
function parseFeedback(text: string) {
  let strengths = "";
  let improvements = "";
  let modelAnswer = "";
  let overall = "";

  // Try to split by common headings
  const sections = text.split(/\n(?=#+\s|(?:\*\*(?:What was good|Strengths|Well done|Good|What you did well|Feedback|What was missing|Areas for improvement|Improve|Missing|Model answer|Suggested answer|Sample answer|Mark)[:\s*]*\*\*))/i);

  for (const section of sections) {
    const trimmed = section.trim();
    const lower = trimmed.toLowerCase();

    if (/(?:what was good|strengths|well done|good points|what you did well)/i.test(lower.slice(0, 80))) {
      strengths += trimmed + "\n";
    } else if (/(?:what was missing|areas for improvement|improve|missing|weaknesses|to improve)/i.test(lower.slice(0, 80))) {
      improvements += trimmed + "\n";
    } else if (/(?:model answer|suggested answer|sample answer|ideal answer)/i.test(lower.slice(0, 80))) {
      modelAnswer += trimmed + "\n";
    } else {
      overall += trimmed + "\n";
    }
  }

  // If no structured sections found, split roughly
  if (!strengths && !improvements && !modelAnswer) {
    const lines = text.split("\n");
    const mid = Math.floor(lines.length / 2);
    overall = lines.slice(0, mid).join("\n");
    modelAnswer = lines.slice(mid).join("\n");
  }

  return { strengths: strengths.trim(), improvements: improvements.trim(), modelAnswer: modelAnswer.trim(), overall: overall.trim() };
}

/** Detect diagram type from question text */
function detectDiagram(questionText: string): DiagramType | null {
  const mappings: [RegExp, string][] = [
    // Lorenz / Gini MUST come first to prevent cross-topic fallback
    [/lorenz\s*curve|gini\s*coefficient|gini|income\s*inequality|income\s*distribution|cumulative\s*%\s*of\s*(income|population)|line\s*of\s*(perfect\s*)?equality|45[\s-]*degree/i, "lorenz_curve"],
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
    [/diagram/i, "supply_demand"],
  ];

  for (const [regex, type] of mappings) {
    if (regex.test(questionText)) {
      const resolved = resolveDiagramType(type);
      if (resolved) return resolved;
    }
  }
  return null;
}

export function FeedbackCarousel({ feedback, question, onNewQuestion, onClose }: FeedbackCarouselProps) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const mark = useMemo(() => extractMark(feedback), [feedback]);
  const parsed = useMemo(() => parseFeedback(feedback), [feedback]);
  const diagram = useMemo(() => detectDiagram(question + " " + feedback), [question, feedback]);

  const scorePercent = mark ? Math.round((mark.earned / mark.total) * 100) : null;

  const goTo = (next: number) => {
    setDirection(next > slide ? 1 : -1);
    setSlide(next);
  };

  const slideLabels = ["Mark", "Feedback", "Model Answer"];

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
            📝 Your Feedback
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
        <div className="relative min-h-[200px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Slide 1: Mark Overview */}
            {slide === 0 && (
              <motion.div
                key="mark"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-4"
              >
                {mark ? (
                  <div className={cn(
                    "text-center py-6 rounded-xl border",
                    scorePercent !== null && scorePercent >= 75
                      ? "bg-[hsl(var(--revision-green)/0.08)] border-[hsl(var(--revision-green)/0.2)]"
                      : scorePercent !== null && scorePercent >= 50
                      ? "bg-[hsl(var(--revision-amber)/0.08)] border-[hsl(var(--revision-amber)/0.2)]"
                      : "bg-[hsl(var(--revision-red)/0.08)] border-[hsl(var(--revision-red)/0.2)]"
                  )}>
                    <Trophy className={cn(
                      "h-10 w-10 mx-auto mb-3",
                      scorePercent !== null && scorePercent >= 75 ? "text-[hsl(var(--revision-green))]"
                        : scorePercent !== null && scorePercent >= 50 ? "text-[hsl(var(--revision-amber))]"
                        : "text-[hsl(var(--revision-red))]"
                    )} />
                    <p className="font-handwriting text-5xl font-bold">{mark.earned}/{mark.total}</p>
                    <p className="font-handwriting-alt text-lg mt-2 text-muted-foreground">
                      {scorePercent !== null && scorePercent >= 75 ? "Great work! 🎉" :
                       scorePercent !== null && scorePercent >= 50 ? "Good effort! Keep practising 💪" :
                       "Review and try again 📖"}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 rounded-xl border bg-[hsl(var(--revision-blue)/0.08)] border-[hsl(var(--revision-blue)/0.2)]">
                    <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-[hsl(var(--revision-blue))]" />
                    <p className="font-handwriting text-2xl font-bold">Marked ✓</p>
                    <p className="font-handwriting-alt text-base mt-2 text-muted-foreground">
                      See your detailed feedback →
                    </p>
                  </div>
                )}

                {/* Overall summary if available */}
                {parsed.overall && (
                  <div className="revision-box revision-definition p-3">
                    <div className="font-handwriting-alt text-base leading-relaxed ai-response">
                      <MathsMarkdown>{parsed.overall}</MathsMarkdown>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Slide 2: Detailed Feedback */}
            {slide === 1 && (
              <motion.div
                key="feedback"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-3 max-h-[400px] overflow-y-auto pr-1"
              >
                {parsed.strengths && (
                  <div className="revision-box revision-definition">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--revision-green))]" />
                      <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-green))]">What You Did Well</span>
                    </div>
                    <div className="revision-box-content notebook-paper notebook-margin pl-6">
                      <div className="font-handwriting-alt text-base leading-relaxed ai-response">
                        <MathsMarkdown>{parsed.strengths}</MathsMarkdown>
                      </div>
                    </div>
                  </div>
                )}

                {parsed.improvements && (
                  <div className="revision-box revision-exam-tip">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <AlertTriangle className="h-4 w-4 text-[hsl(var(--revision-red))]" />
                      <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-red))]">Areas to Improve</span>
                    </div>
                    <div className="revision-box-content notebook-paper pl-5">
                      <div className="border-l-4 border-[hsl(var(--revision-red)/0.3)] pl-3">
                        <div className="font-handwriting-alt text-base leading-relaxed ai-response">
                          <MathsMarkdown>{parsed.improvements}</MathsMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback: show all feedback if no structured sections */}
                {!parsed.strengths && !parsed.improvements && (
                  <div className="revision-box revision-definition">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <BookOpen className="h-4 w-4 text-[hsl(var(--revision-blue))]" />
                      <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-blue))]">Feedback</span>
                    </div>
                    <div className="revision-box-content notebook-paper notebook-margin pl-6">
                      <div className="font-handwriting-alt text-base leading-relaxed ai-response">
                        <MathsMarkdown>{feedback}</MathsMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Slide 3: Model Answer + Diagram */}
            {slide === 2 && (
              <motion.div
                key="model"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-4 max-h-[500px] overflow-y-auto pr-1"
              >
                {parsed.modelAnswer ? (
                  <div className="revision-box revision-definition">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <BookOpen className="h-4 w-4 text-[hsl(var(--revision-blue))]" />
                      <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-blue))]">Model Answer</span>
                    </div>
                    <div className="revision-box-content notebook-paper notebook-margin pl-6">
                      <div className="font-handwriting-alt text-base leading-relaxed ai-response">
                        <MathsMarkdown>{parsed.modelAnswer}</MathsMarkdown>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="revision-box revision-definition p-4 text-center">
                    <p className="font-handwriting-alt text-base text-muted-foreground">
                      No model answer provided for this question.
                    </p>
                  </div>
                )}

                {/* Relevant diagram */}
                {diagram && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <TrendingUp className="h-4 w-4 text-[hsl(var(--revision-green))]" />
                      <span className="font-handwriting text-lg font-bold text-[hsl(var(--revision-green))]">
                        Key Diagram
                      </span>
                    </div>
                    <div className="revision-box revision-diagram">
                      <div className="revision-box-content p-2">
                        <EconDiagramTemplate type={diagram} />
                      </div>
                    </div>
                  </div>
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
            <Button size="sm" variant="outline" onClick={onNewQuestion} className="gap-1.5 font-handwriting-alt text-sm">
              <RotateCcw className="h-3.5 w-3.5" /> New Question
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
