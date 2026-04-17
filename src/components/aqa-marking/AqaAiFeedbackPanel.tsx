import { useState } from "react";
import { Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AqaTierBadge } from "./AqaTierBadge";
import { sanitiseAiFeedback } from "@/lib/aqa-marking-engine";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  questionNumber: number;
  totalMarks: number;
  prompt: string;
  studentAnswer: string;
  /** Indicative content / mark scheme bullets for the question. */
  indicativeContent: string[];
}

/**
 * Tier 3 — Optional AI analytical feedback.
 * Calls the aqa-tier3-feedback edge function.
 * Sanitises any number-out-of-marks or "Level X" phrasing as a backstop.
 */
export function AqaAiFeedbackPanel({
  questionNumber,
  totalMarks,
  prompt,
  studentAnswer,
  indicativeContent,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestFeedback = async () => {
    if (!studentAnswer.trim()) {
      setError("Write an answer above before requesting feedback.");
      return;
    }
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "aqa-tier3-feedback",
        {
          body: {
            questionNumber,
            totalMarks,
            prompt,
            studentAnswer,
            indicativeContent,
          },
        },
      );
      if (fnError) throw fnError;
      const raw = (data as { feedback?: string })?.feedback ?? "";
      if (!raw) throw new Error("Empty response from feedback service.");
      setFeedback(sanitiseAiFeedback(raw));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to get feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-purple-500/30 bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-purple-500/5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-300" />
          <span className="text-sm font-bold text-foreground">Tier 3 — Analytical feedback</span>
        </div>
        <AqaTierBadge tier="ai" />
      </div>
      <div className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground leading-snug">
          AI analysis of strengths and gaps in your answer.{" "}
          <span className="text-foreground/85 font-semibold">
            For revision direction only — never a mark.
          </span>{" "}
          Marks shown in the report come from your Tier 2 self-assessment.
        </p>

        {!feedback && (
          <Button
            onClick={requestFeedback}
            disabled={loading}
            size="sm"
            className="gap-2 bg-purple-600 hover:bg-purple-500"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" /> Get feedback
              </>
            )}
          </Button>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {feedback && (
          <div className="rounded-lg bg-muted/30 border border-border p-3">
            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {feedback}
            </p>
            <Button
              onClick={requestFeedback}
              disabled={loading}
              size="sm"
              variant="ghost"
              className="mt-2 text-xs h-7"
            >
              Regenerate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
