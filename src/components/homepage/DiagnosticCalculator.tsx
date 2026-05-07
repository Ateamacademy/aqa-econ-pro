import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, RotateCcw, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * Diagnostic Grade Calculator
 * 5 questions, 23 marks total:
 *   Q1 — Calculation (2)
 *   Q2 — MCQ (1)
 *   Q3 — MCQ (1)
 *   Q4 — Short answer 4-mark (self-checklist of mark-scheme points)
 *   Q5 — 15-mark essay with diagram (self-checklist)
 */

type Step = number; // 0..5 (5 = results)

interface CalcQ {
  prompt: string;
  hint: string;
  correct: number;
  tolerance: number;
  marks: 2;
}
interface McqQ {
  prompt: string;
  options: string[];
  correctIndex: number;
  marks: 1;
}
interface ChecklistQ {
  prompt: string;
  guidance: string;
  points: { label: string; marks: number }[];
  totalMarks: number;
  requireDiagram?: boolean;
}

const Q1: CalcQ = {
  prompt:
    "A country's nominal GDP rose from £500bn to £540bn. Inflation over the same period was 3%. Calculate the real GDP growth rate (to 1 decimal place, as a %).",
  hint: "Use: real growth ≈ nominal growth − inflation. Give your answer to 1 d.p. with a % sign.",
  correct: 5.0,
  tolerance: 0.2,
  marks: 2,
};

const Q2: McqQ = {
  prompt: "Which of the following would most likely cause a rightward shift of the aggregate demand curve?",
  options: [
    "A rise in income tax rates",
    "A fall in consumer confidence",
    "A cut in the central bank's base interest rate",
    "An appreciation of the domestic currency",
  ],
  correctIndex: 2,
  marks: 1,
};

const Q3: McqQ = {
  prompt: "A monopolist maximises profit where:",
  options: [
    "Price equals average cost",
    "Marginal revenue equals marginal cost",
    "Average revenue equals average cost",
    "Price equals marginal cost",
  ],
  correctIndex: 1,
  marks: 1,
};

const Q4: ChecklistQ = {
  prompt: "Explain two reasons why a government might impose an indirect tax on a demerit good such as cigarettes. (4 marks)",
  guidance: "Tick each mark-scheme point your answer clearly makes.",
  totalMarks: 4,
  points: [
    { label: "Identifies a valid reason (e.g. internalise negative externality / reduce overconsumption / raise revenue)", marks: 1 },
    { label: "Develops that reason with economic theory (e.g. MPC > MSC, market failure)", marks: 1 },
    { label: "Identifies a second valid reason", marks: 1 },
    { label: "Develops the second reason with theory or example", marks: 1 },
  ],
};

const Q5: ChecklistQ = {
  prompt:
    "Evaluate the likely impact of a significant increase in the national minimum wage on the level of unemployment in the UK. (15 marks)",
  guidance:
    "Tick each criterion your answer + diagram meets. Be honest — examiners only credit what is clearly written.",
  totalMarks: 15,
  requireDiagram: true,
  points: [
    { label: "Clear definition of national minimum wage / unemployment", marks: 1 },
    { label: "Correctly drawn labour market diagram (axes: W & QL; D_L, S_L; NMW above equilibrium)", marks: 2 },
    { label: "Diagram shows excess supply of labour (classical unemployment) clearly labelled", marks: 1 },
    { label: "Knowledge: explains theoretical link between NMW and unemployment", marks: 2 },
    { label: "Application: uses UK context / data / specific industry", marks: 2 },
    { label: "Analysis: developed chains of reasoning (cost of labour → demand for labour → unemployment)", marks: 3 },
    { label: "Evaluation: counter-argument (e.g. monopsony, efficiency wages, demand-side effects)", marks: 2 },
    { label: "Evaluation: judgement with justification (depends on size, elasticity, industry)", marks: 2 },
  ],
};

const TOTAL = 23;

interface GradeBand {
  grade: string;
  min: number; // % of total
  label: string;
  color: string;
  blurb: string;
}

const BANDS: GradeBand[] = [
  { grade: "A*", min: 85, label: "Exceptional", color: "text-success", blurb: "You're operating at the top of the cohort. Focus on consistency under timed conditions." },
  { grade: "A",  min: 73, label: "Strong",      color: "text-success", blurb: "Excellent foundations. Sharpen evaluation and diagram precision to push into A*." },
  { grade: "B",  min: 60, label: "Solid",       color: "text-primary", blurb: "Good knowledge base. The next jump comes from deeper analysis chains and clearer judgement." },
  { grade: "C",  min: 48, label: "Developing",  color: "text-warning", blurb: "Knowledge is forming but application and analysis need more practice." },
  { grade: "D",  min: 36, label: "Emerging",    color: "text-warning", blurb: "Build core definitions and diagram accuracy first — that unlocks the higher marks." },
  { grade: "E",  min: 22, label: "Foundational", color: "text-destructive", blurb: "Start with structured notes and topic-by-topic practice to lock in the basics." },
  { grade: "U",  min: 0,  label: "Below E",     color: "text-destructive", blurb: "We'll start from first principles — predicted papers + study notes daily." },
];

function gradeFor(marks: number): GradeBand {
  const pct = (marks / TOTAL) * 100;
  return BANDS.find((b) => pct >= b.min) ?? BANDS[BANDS.length - 1];
}

export default function DiagnosticCalculator() {
  const [step, setStep] = useState<Step>(0);

  // answers
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState<number | null>(null);
  const [a3, setA3] = useState<number | null>(null);
  const [a4, setA4] = useState<boolean[]>(Q4.points.map(() => false));
  const [a5, setA5] = useState<boolean[]>(Q5.points.map(() => false));
  const [a5HasDiagram, setA5HasDiagram] = useState<boolean | null>(null);
  const [a4Text, setA4Text] = useState("");
  const [a5Text, setA5Text] = useState("");

  /* ── scoring ── */
  const m1 = useMemo(() => {
    const n = parseFloat(a1.replace(/[^0-9.\-]/g, ""));
    if (!Number.isFinite(n)) return 0;
    if (Math.abs(n - Q1.correct) <= Q1.tolerance) {
      // 2 marks if formatted (% sign or 1dp), else 1
      const formatted = /%/.test(a1) || /\.\d/.test(a1);
      return formatted ? 2 : 1;
    }
    return 0;
  }, [a1]);
  const m2 = a2 === Q2.correctIndex ? 1 : 0;
  const m3 = a3 === Q3.correctIndex ? 1 : 0;
  const m4 = a4.reduce((s, v, i) => s + (v ? Q4.points[i].marks : 0), 0);
  const rawM5 = a5.reduce((s, v, i) => s + (v ? Q5.points[i].marks : 0), 0);
  // ghost-mark prevention: cap written marks at 50% if no diagram
  const m5 = a5HasDiagram === false ? Math.min(rawM5, Math.floor(Q5.totalMarks * 0.5)) : rawM5;

  const total = m1 + m2 + m3 + m4 + m5;
  const band = gradeFor(total);

  /* ── nav ── */
  const next = () => setStep((s) => Math.min(5, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);
  const reset = () => {
    setStep(0); setA1(""); setA2(null); setA3(null);
    setA4(Q4.points.map(() => false)); setA5(Q5.points.map(() => false));
    setA5HasDiagram(null); setA4Text(""); setA5Text("");
  };

  const canAdvance = (() => {
    switch (step) {
      case 0: return a1.trim().length > 0;
      case 1: return a2 !== null;
      case 2: return a3 !== null;
      case 3: return a4Text.trim().length > 20;
      case 4: return a5Text.trim().length > 50 && a5HasDiagram !== null;
      default: return true;
    }
  })();

  const stepLabels = ["Calculation", "MCQ 1", "MCQ 2", "Short answer", "Essay + diagram"];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-border bg-gradient-to-br from-primary/10 via-card to-card">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="h-3 w-3" /> Free · 5 minutes
            </div>
            <h3 className="text-xl lg:text-2xl font-extrabold tracking-tight text-foreground">
              Diagnostic Grade Calculator
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Five questions across the full skill range — calculation, MCQ, short answer and a 15-mark essay with a diagram. We'll predict your current grade based on the marks you score (out of {TOTAL}).
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-1.5">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  step > i ? "bg-primary" : step === i ? "bg-primary/60" : "bg-popover",
                )}
              />
              <p className={cn(
                "text-[10px] font-mono mt-1.5 text-center hidden sm:block",
                step >= i ? "text-foreground" : "text-muted-foreground/50",
              )}>
                Q{i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 lg:p-8 min-h-[420px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="q1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <QHeader num={1} marks={2} type="Calculation" />
              <p className="text-base text-foreground leading-relaxed mb-4">{Q1.prompt}</p>
              <p className="text-xs text-muted-foreground italic mb-4">{Q1.hint}</p>
              <Input
                value={a1}
                onChange={(e) => setA1(e.target.value)}
                placeholder="e.g. 5.0%"
                className="h-12 text-base font-mono"
              />
            </motion.div>
          )}

          {step === 1 && <McqStep n={2} q={Q2} value={a2} onChange={setA2} />}
          {step === 2 && <McqStep n={3} q={Q3} value={a3} onChange={setA3} />}

          {step === 3 && (
            <motion.div key="q4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <QHeader num={4} marks={4} type="Short answer" />
              <p className="text-base text-foreground leading-relaxed mb-4">{Q4.prompt}</p>
              <Textarea
                value={a4Text}
                onChange={(e) => setA4Text(e.target.value)}
                placeholder="Write your answer here…"
                className="min-h-[140px] text-sm leading-relaxed"
              />
              {a4Text.trim().length > 20 && (
                <ChecklistGrader
                  guidance={Q4.guidance}
                  points={Q4.points}
                  values={a4}
                  onChange={setA4}
                />
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="q5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <QHeader num={5} marks={15} type="Essay + diagram" />
              <p className="text-base text-foreground leading-relaxed mb-4">{Q5.prompt}</p>
              <Textarea
                value={a5Text}
                onChange={(e) => setA5Text(e.target.value)}
                placeholder="Write your evaluation answer here. Describe the diagram you would draw…"
                className="min-h-[180px] text-sm leading-relaxed"
              />

              <div className="mt-4 rounded-xl border border-border bg-popover/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Did you draw a labour-market diagram on paper alongside this answer?
                </p>
                <div className="flex gap-2">
                  {[
                    { label: "Yes — drawn & labelled", val: true },
                    { label: "No diagram drawn", val: false },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setA5HasDiagram(opt.val)}
                      className={cn(
                        "flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all",
                        a5HasDiagram === opt.val
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {a5HasDiagram === false && (
                  <p className="text-[11px] text-warning mt-2 leading-relaxed">
                    No diagram → written marks will be capped at 50% (examiner convention).
                  </p>
                )}
              </div>

              {a5Text.trim().length > 50 && a5HasDiagram !== null && (
                <ChecklistGrader
                  guidance={Q5.guidance}
                  points={Q5.points}
                  values={a5}
                  onChange={setA5}
                />
              )}
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Results total={total} band={band} breakdown={[
                { label: "Q1 · Calculation", got: m1, of: 2 },
                { label: "Q2 · MCQ", got: m2, of: 1 },
                { label: "Q3 · MCQ", got: m3, of: 1 },
                { label: "Q4 · 4-mark explain", got: m4, of: 4 },
                { label: "Q5 · 15-mark essay", got: m5, of: 15 },
              ]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-popover/30 flex items-center justify-between gap-3">
        {step < 5 ? (
          <>
            <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-1.5 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Button>
            <p className="text-[11px] text-muted-foreground font-mono hidden sm:block">
              Question {step + 1} of 5
            </p>
            <Button onClick={next} disabled={!canAdvance} className="gap-1.5 text-xs">
              {step === 4 ? "See My Predicted Grade" : "Next"} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={reset} className="gap-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Try again
            </Button>
            <p className="text-[11px] text-muted-foreground font-mono">
              {total} / {TOTAL} marks
            </p>
            <Button asChild className="gap-1.5 text-xs">
              <a href="/auth">Start Practising Free <ArrowRight className="h-3.5 w-3.5" /></a>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────── helpers ───────────── */

function QHeader({ num, marks, type }: { num: number; marks: number; type: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
        Question {num} · {type}
      </span>
      <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
        [{marks} mark{marks > 1 ? "s" : ""}]
      </span>
    </div>
  );
}

function McqStep({ n, q, value, onChange }: { n: number; q: McqQ; value: number | null; onChange: (i: number) => void }) {
  return (
    <motion.div key={`mcq-${n}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <QHeader num={n} marks={1} type="Multiple choice" />
      <p className="text-base text-foreground leading-relaxed mb-5">{q.prompt}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={cn(
              "w-full text-left rounded-xl border px-4 py-3.5 transition-all flex items-center gap-3",
              value === i
                ? "border-primary bg-primary/10"
                : "border-border bg-popover/40 hover:border-primary/40",
            )}
          >
            <div className={cn(
              "h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
              value === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
            )}>
              {String.fromCharCode(65 + i)}
            </div>
            <span className="text-sm text-foreground">{opt}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function ChecklistGrader({
  guidance, points, values, onChange,
}: {
  guidance: string;
  points: { label: string; marks: number }[];
  values: boolean[];
  onChange: (next: boolean[]) => void;
}) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-popover/40 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Self-mark · {guidance}
      </p>
      <div className="space-y-2">
        {points.map((p, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                const copy = [...values]; copy[i] = !copy[i]; onChange(copy);
              }}
              className={cn(
                "h-5 w-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                values[i] ? "border-primary bg-primary" : "border-border group-hover:border-primary/50",
              )}
            >
              {values[i] && <Check className="h-3 w-3 text-primary-foreground" />}
            </button>
            <span className="text-xs text-foreground leading-relaxed flex-1">
              {p.label}
              <span className="ml-1.5 text-[10px] font-mono text-muted-foreground">[{p.marks}]</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Results({
  total, band, breakdown,
}: {
  total: number;
  band: GradeBand;
  breakdown: { label: string; got: number; of: number }[];
}) {
  const pct = Math.round((total / TOTAL) * 100);
  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Your Predicted Grade
        </p>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className={cn("text-7xl lg:text-8xl font-extrabold font-mono tracking-tighter", band.color)}
        >
          {band.grade}
        </motion.div>
        <p className="text-sm font-semibold text-foreground mt-2">{band.label}</p>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          {total} / {TOTAL} marks · {pct}%
        </p>
      </div>

      <div className="rounded-xl border border-border bg-popover/40 p-4 mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Breakdown</p>
        <div className="space-y-2.5">
          {breakdown.map((b) => {
            const p = (b.got / b.of) * 100;
            return (
              <div key={b.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground flex-1 truncate">{b.label}</span>
                <div className="h-1.5 w-24 rounded-full bg-popover overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-foreground w-10 text-right">
                  {b.got}/{b.of}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">What this means</p>
        <p className="text-sm text-foreground leading-relaxed">{band.blurb}</p>
      </div>
    </div>
  );
}
