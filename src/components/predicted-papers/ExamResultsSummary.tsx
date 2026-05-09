import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MathsMarkdown } from "./MathsMarkdown";
import type { ParsedQuestion } from "./parseQuestions";

interface QuestionFeedback {
  markScheme: string;
  modelAnswer: string;
  examinerTip: string;
  isDiagramFeedback?: boolean;
  mark?: string;
  smartFeedback?: string;
  explainFeedback?: string;
  improveFeedback?: string;
}

interface ExamResultsSummaryProps {
  questions: ParsedQuestion[];
  feedbacks: Record<string, QuestionFeedback>;
  answers: Record<string, string>;
  onBackToPapers: () => void;
  paperTitle: string;
  timeExpired: boolean;
}

function extractMark(feedback: QuestionFeedback, totalMarks: number): number | null {
  // Try diagram format first
  if (feedback.isDiagramFeedback && feedback.mark) {
    const match = feedback.mark.match(/(\d+)\s*\/\s*(\d+)/);
    if (match) return parseInt(match[1]);
    const numMatch = feedback.mark.match(/(\d+)/);
    if (numMatch) return parseInt(numMatch[1]);
  }
  // Standard format · look for "X/Y" in markScheme
  const markScheme = feedback.markScheme || "";
  const patterns = [
    /(\d+)\s*\/\s*(\d+)\s*marks?/i,
    /(\d+)\s*out\s*of\s*(\d+)/i,
    /mark[:\s]*(\d+)\s*\/\s*(\d+)/i,
    /(\d+)\s*\/\s*(\d+)/,
  ];
  for (const pat of patterns) {
    const match = markScheme.match(pat);
    if (match) {
      const scored = parseInt(match[1]);
      if (scored <= totalMarks) return scored;
    }
  }
  return null;
}

export function ExamResultsSummary({
  questions,
  feedbacks,
  answers,
  onBackToPapers,
  paperTitle,
  timeExpired,
}: ExamResultsSummaryProps) {
  const results = useMemo(() => {
    const totalAvailable = questions.reduce((sum, q) => sum + q.marks, 0);
    let totalScored = 0;
    let markedCount = 0;
    let unmarkedCount = 0;
    let unansweredCount = 0;

    const questionResults = questions.map((q) => {
      const answer = answers[q.id];
      const feedback = feedbacks[q.id];
      const hasAnswer = answer && answer.trim().length > 0;
      const hasFeedback = !!feedback;

      let scored: number | null = null;
      if (hasFeedback) {
        scored = extractMark(feedback, q.marks);
        if (scored !== null) {
          totalScored += scored;
          markedCount++;
        } else {
          unmarkedCount++;
        }
      } else if (!hasAnswer) {
        unansweredCount++;
      } else {
        unmarkedCount++;
      }

      return { question: q, answer, feedback, scored, hasAnswer, hasFeedback };
    });

    const percentage = totalAvailable > 0
      ? Math.round((totalScored / totalAvailable) * 100)
      : 0;

    // Grade boundary
    let grade = "E";
    if (percentage >= 80) grade = "A*";
    else if (percentage >= 70) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else if (percentage >= 40) grade = "D";

    return {
      questionResults,
      totalAvailable,
      totalScored,
      markedCount,
      unmarkedCount,
      unansweredCount,
      percentage,
      grade,
    };
  }, [questions, feedbacks, answers]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="space-y-8"
    >
      {/* Hero results card */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="p-8 md:p-10 text-center">
          {timeExpired && (
            <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
              <Target className="h-3.5 w-3.5" /> Time expired · paper auto-submitted
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Exam Results
          </h2>
          <p className="text-sm text-muted-foreground mb-8">{paperTitle}</p>

          {/* Big score */}
          <div className="inline-flex flex-col items-center mb-8">
            <div className="relative">
              <svg viewBox="0 0 120 120" className="w-32 h-32">
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(results.percentage / 100) * 326.73} 326.73`}
                  initial={{ strokeDashoffset: 326.73 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  className="-rotate-90 origin-center"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold font-mono text-foreground">
                  {results.percentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Score + Grade row */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                {results.totalScored} / {results.totalAvailable}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Marks</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className={cn(
                "text-3xl font-extrabold font-mono",
                results.grade === "A*" || results.grade === "A" ? "text-primary" :
                results.grade === "B" ? "text-cyan-pop" :
                results.grade === "C" ? "text-warning" : "text-destructive"
              )}>
                {results.grade}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Predicted Grade</p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1.5">
              <CheckCircle2 className="h-3 w-3" /> {results.markedCount} marked
            </span>
            {results.unansweredCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full px-3 py-1.5">
                <XCircle className="h-3 w-3" /> {results.unansweredCount} unanswered
              </span>
            )}
            {results.unmarkedCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-warning/10 text-warning rounded-full px-3 py-1.5">
                {results.unmarkedCount} pending marking
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Question-by-question breakdown */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="p-5 border-b border-border/40">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Marking Breakdown
          </h3>
        </div>
        <div className="divide-y divide-border/30">
          {results.questionResults.map(({ question, scored, hasAnswer, hasFeedback }) => (
            <div key={question.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                scored !== null && scored >= question.marks * 0.7
                  ? "bg-success/15 text-success"
                  : scored !== null
                  ? "bg-warning/15 text-warning"
                  : !hasAnswer
                  ? "bg-destructive/15 text-destructive"
                  : "bg-muted text-muted-foreground"
              )}>
                {scored !== null ? `${scored}` : !hasAnswer ? "·" : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {question.label}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-mono font-semibold text-foreground">
                  {scored !== null ? `${scored}/${question.marks}` : `·/${question.marks}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4 pb-8">
        <Button onClick={onBackToPapers} variant="outline" className="gap-2 rounded-full px-8">
          Back to Papers
        </Button>
      </div>
    </motion.div>
  );
}
