import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  type AqaLevelBand,
  KAAE_SKILLS,
  type KaaeSkill,
  levelsForMarks,
} from "@/lib/aqa-levels";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { AqaTierBadge } from "./AqaTierBadge";

export interface SelfAssessment {
  selectedLevel: 1 | 2 | 3 | 4 | 5 | null;
  markAwarded: number;
  kaae: Record<KaaeSkill, boolean>;
}

interface Props {
  questionNumber: number;
  totalMarks: number;
  prompt: string;
  studentAnswer: string;
  value: SelfAssessment;
  onChange: (v: SelfAssessment) => void;
}

/**
 * Tier 2 · Guided self-assessment for 9/15/25-mark questions.
 * Two-column: student answer (left) | level descriptors + mark + KAA+E (right).
 */
export function AqaSelfAssessmentPanel({
  questionNumber,
  totalMarks,
  prompt,
  studentAnswer,
  value,
  onChange,
}: Props) {
  const levels = levelsForMarks(totalMarks);
  if (!levels) return null;

  const setLevel = (lv: AqaLevelBand) => {
    onChange({
      ...value,
      selectedLevel: lv.level,
      markAwarded: Math.round((lv.markBand[0] + lv.markBand[1]) / 2),
    });
  };
  const setMark = (m: number) =>
    onChange({ ...value, markAwarded: Math.max(0, Math.min(totalMarks, m)) });
  const toggleKaae = (k: KaaeSkill) =>
    onChange({ ...value, kaae: { ...value.kaae, [k]: !value.kaae[k] } });

  return (
    <div className="rounded-xl border border-amber-500/30 bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-amber-500/5">
        <div>
          <span className="text-sm font-bold text-foreground">Question {questionNumber}</span>
          <span className="ml-2 text-[11px] font-mono text-muted-foreground">
            [{totalMarks} marks]
          </span>
        </div>
        <AqaTierBadge tier="self" />
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left: prompt + student answer */}
        <div className="p-4 space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Question
            </div>
            <p className="text-sm text-foreground/90 leading-snug">{prompt}</p>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Your answer
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-3 text-sm text-foreground/90 whitespace-pre-wrap min-h-[120px] max-h-[280px] overflow-auto">
              {studentAnswer.trim() || (
                <span className="text-muted-foreground italic">No answer recorded.</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: levels + KAA+E */}
        <div className="p-4 space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              AQA level descriptors · pick the one your answer matches
            </div>
            <div className="space-y-1.5">
              {levels.map((lv) => (
                <button
                  key={lv.level}
                  onClick={() => setLevel(lv)}
                  className={cn(
                    "w-full text-left rounded-lg border p-2.5 transition-colors",
                    value.selectedLevel === lv.level
                      ? "bg-indigo-500/15 border-indigo-500/50"
                      : "bg-muted/20 border-border hover:border-border/80",
                  )}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-bold text-foreground">
                      Level {lv.level}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {lv.markBand[0]}–{lv.markBand[1]} marks
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/80 leading-snug">{lv.descriptor}</p>
                </button>
              ))}
            </div>
          </div>

          {value.selectedLevel !== null && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between">
                <span>Mark within band</span>
                <span className="font-mono text-foreground">
                  {value.markAwarded} / {totalMarks}
                </span>
              </div>
              <Slider
                value={[value.markAwarded]}
                onValueChange={(v) => setMark(v[0] ?? 0)}
                min={0}
                max={totalMarks}
                step={1}
              />
            </div>
          )}

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              KAA + E self-check
            </div>
            <div className="space-y-1.5">
              {KAAE_SKILLS.map((s) => (
                <label
                  key={s.id}
                  className="flex items-start gap-2 text-xs text-foreground/85 cursor-pointer"
                >
                  <Checkbox
                    checked={value.kaae[s.id]}
                    onCheckedChange={() => toggleKaae(s.id)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-muted-foreground"> · {s.question}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function emptySelfAssessment(): SelfAssessment {
  return {
    selectedLevel: null,
    markAwarded: 0,
    kaae: { K: false, App: false, An: false, Eval: false },
  };
}
