import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  getBoardConfig,
  predictGrade,
  TARGET_GRADES,
  type Confidence,
  type ExamBoard,
  type Grade,
  type Qualification,
} from "@/lib/gradeCalculator";
import { GradeThermometer } from "@/components/grade-calculator/GradeThermometer";
import { Paper3RequirementCard } from "@/components/grade-calculator/Paper3RequirementCard";
import { WhatIfSlider } from "@/components/grade-calculator/WhatIfSlider";
import { AIInsightFeed } from "@/components/grade-calculator/AIInsightFeed";
import { GradeRescuePanel } from "@/components/grade-calculator/GradeRescuePanel";
import { ProbabilityBands } from "@/components/grade-calculator/ProbabilityBands";
import { CrossLinkStrip } from "@/components/grade-calculator/CrossLinkStrip";
import PaperFeedbackBellCurve from "@/components/grade-calculator/PaperFeedbackBellCurve";
import { ShareResultButton } from "@/components/grade-calculator/ShareResultButton";
import { useGradeInsights } from "@/hooks/useGradeInsights";
import { supabase } from "@/integrations/supabase/client";
import { Calculator, ShieldAlert, Sparkles } from "lucide-react";

const QUALIFICATIONS: Qualification[] = ["A-Level", "GCSE"];
const BOARDS: ExamBoard[] = ["AQA", "Edexcel", "OCR", "CAIE", "WJEC", "IB"];
const CONFIDENCE_OPTIONS: { key: Confidence; label: string; emoji: string }[] = [
  { key: "very", label: "Very Confident", emoji: "🔥" },
  { key: "somewhat", label: "Somewhat", emoji: "🙂" },
  { key: "unsure", label: "Unsure", emoji: "😬" },
  { key: "worst", label: "Worst Case", emoji: "😭" },
];

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
          : "bg-card text-muted-foreground border-border hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}

export default function GradeCalculator() {
  const [qualification, setQualification] = useState<Qualification>("A-Level");
  const [board, setBoard] = useState<ExamBoard>("AQA");
  const config = useMemo(() => getBoardConfig(qualification, board), [qualification, board]);
  const targetOptions = TARGET_GRADES[qualification] as Grade[];
  const [targetGrade, setTargetGrade] = useState<Grade>(qualification === "A-Level" ? "A" : ("7" as Grade));
  const [confidence, setConfidence] = useState<Confidence>("somewhat");
  const [paper1, setPaper1] = useState(0);
  const [paper2, setPaper2] = useState(0);
  const [p3Sim, setP3Sim] = useState<number | null>(null);

  // Reset target grade if qualification changes
  useEffect(() => {
    setTargetGrade(qualification === "A-Level" ? "A" : ("7" as Grade));
    setPaper1(0);
    setPaper2(0);
    setP3Sim(null);
  }, [qualification]);

  const prediction = useMemo(
    () => predictGrade({ config, paper1, paper2, confidence, targetGrade }),
    [config, paper1, paper2, confidence, targetGrade],
  );

  const defaultP3 = prediction.p3RequiredForTarget >= 0 ? prediction.p3RequiredForTarget : Math.round(config.paperMax[2] / 2);
  const simulatedP3 = p3Sim ?? defaultP3;
  const simulated = useMemo(
    () => predictGrade({ config, paper1, paper2, confidence, targetGrade, paper3Override: simulatedP3 }),
    [config, paper1, paper2, confidence, targetGrade, simulatedP3],
  );

  const hasMarks = paper1 > 0 || paper2 > 0;
  const insightsQ = useGradeInsights({
    qualification,
    board,
    targetGrade,
    confidence,
    paper1,
    paper2,
    paper1Max: config.paperMax[0],
    paper2Max: config.paperMax[1],
    paper3Max: config.paperMax[2],
    prediction,
    enabled: hasMarks,
  });

  // Log session once after first insights load
  useEffect(() => {
    if (!hasMarks || !insightsQ.data) return;
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      await supabase.from("grade_calculator_sessions" as any).insert({
        user_id: user?.id ?? null,
        qualification,
        exam_board: board,
        target_grade: targetGrade,
        paper1_score: paper1,
        paper2_score: paper2,
        paper1_max: config.paperMax[0],
        paper2_max: config.paperMax[1],
        confidence,
        predicted_grade: prediction.likelyGrade,
        p3_required_target: prediction.p3RequiredForTarget,
        p3_max: config.paperMax[2],
      });
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insightsQ.data]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-2">
            <Calculator className="h-3.5 w-3.5" />
            Grade Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your post-exam command centre
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Estimate your overall grade from Papers 1 &amp; 2, see exactly what Paper 3 needs to look like, and get a
            personalised improvement plan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* LEFT — inputs */}
          <div className="space-y-5 lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Setup</h3>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Qualification</div>
                <div className="flex flex-wrap gap-2">
                  {QUALIFICATIONS.map((q) => (
                    <Pill key={q} active={qualification === q} onClick={() => setQualification(q)}>{q}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Exam board</div>
                <div className="flex flex-wrap gap-2">
                  {BOARDS.map((b) => (
                    <Pill key={b} active={board === b} onClick={() => setBoard(b)}>{b}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Target grade</div>
                <div className="flex flex-wrap gap-1.5">
                  {targetOptions.map((g) => (
                    <Pill key={g} active={targetGrade === g} onClick={() => setTargetGrade(g)}>{g}</Pill>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
              <h3 className="text-sm font-semibold text-foreground">Your marks</h3>
              {[
                { label: "Paper 1", value: paper1, set: setPaper1, max: config.paperMax[0] },
                { label: "Paper 2", value: paper2, set: setPaper2, max: config.paperMax[1] },
              ].map((p) => (
                <div key={p.label}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">{p.label}</span>
                    <div className="flex items-baseline gap-2">
                      <Input
                        type="number"
                        min={0}
                        max={p.max}
                        value={p.value || ""}
                        onChange={(e) => p.set(Math.max(0, Math.min(p.max, Number(e.target.value) || 0)))}
                        className="w-20 h-8 text-right font-mono"
                      />
                      <span className="text-xs text-muted-foreground font-mono">/ {p.max}</span>
                    </div>
                  </div>
                  <Slider value={[p.value]} min={0} max={p.max} step={1} onValueChange={(v) => p.set(v[0])} />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">How confident are you?</h3>
              <div className="grid grid-cols-2 gap-2">
                {CONFIDENCE_OPTIONS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setConfidence(c.key)}
                    className={cn(
                      "px-3 py-3 rounded-xl text-xs font-medium border transition-all min-h-[56px] flex flex-col items-center justify-center gap-1",
                      confidence === c.key
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/40",
                    )}
                  >
                    <span className="text-lg leading-none">{c.emoji}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — output */}
          <div className="space-y-5 lg:col-span-2">
            {!hasMarks ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Calculator className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-1">Enter your Paper 1 &amp; 2 marks</h3>
                <p className="text-xs text-muted-foreground">Your grade projection and personalised plan will appear here.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <GradeThermometer prediction={prediction} targetGrade={targetGrade} grades={config.grades} />
                  <Paper3RequirementCard prediction={prediction} config={config} targetGrade={targetGrade} />
                </div>

                <ProbabilityBands prediction={prediction} config={config} />

                <WhatIfSlider
                  p3Score={simulatedP3}
                  p3Max={config.paperMax[2]}
                  onChange={setP3Sim}
                  simulated={simulated}
                />

                <GradeRescuePanel
                  prediction={prediction}
                  targetGrade={targetGrade}
                  p3Max={config.paperMax[2]}
                  rescueText={insightsQ.data?.rescuePlan}
                />

                <AIInsightFeed insights={insightsQ.data} loading={insightsQ.isLoading} />

                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Keep the momentum</h3>
                  </div>
                  <CrossLinkStrip weakestTopic={insightsQ.data?.priorities?.[0]} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <ShareResultButton
                    prediction={prediction}
                    targetGrade={targetGrade}
                    qualification={qualification}
                    board={board}
                    p3Max={config.paperMax[2]}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    Generates an image for socials — projected grade, target, Paper 3 needed.
                  </span>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-muted-foreground italic border-t border-border pt-4">
                  <ShieldAlert className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    Predictions are estimates based on historical grade boundaries and the marks you've entered. Real
                    boundaries shift year to year — not a guarantee.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
