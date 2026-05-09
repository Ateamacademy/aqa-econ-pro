import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, RotateCcw, Sparkles, Target, Loader2, X, Share2, Twitter, MessageCircle, Link as LinkIcon, Mail, Upload, Image as ImageIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DrawingCanvas from "./DrawingCanvas";

type Board =
  | "aqa" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge" | "ib"
  | "wjec" | "eduqas" | "aqa-gcse" | "cambridge-igcse" | "edexcel-igcse" | "ocr-gcse";

const BOARD_OPTIONS: { value: Board; label: string }[] = [
  { value: "aqa", label: "AQA A-Level (7136)" },
  { value: "edexcel-a", label: "Edexcel A A-Level (9EC0)" },
  { value: "edexcel-b", label: "Edexcel B A-Level (9EB0)" },
  { value: "ocr", label: "OCR A-Level (H460)" },
  { value: "cambridge", label: "CAIE A-Level (9708)" },
  { value: "ib", label: "IB Diploma (HL/SL)" },
  { value: "wjec", label: "WJEC A-Level" },
  { value: "eduqas", label: "Eduqas A-Level" },
  { value: "aqa-gcse", label: "AQA GCSE (8136)" },
  { value: "cambridge-igcse", label: "CAIE IGCSE (0455)" },
  { value: "edexcel-igcse", label: "Edexcel IGCSE (4EC1)" },
  { value: "ocr-gcse", label: "OCR GCSE (J205)" },
];

/**
 * Diagnostic Grade Calculator — proper board-aligned marking.
 *  Q1 — Calculation (2)        : automatic numeric + formatting check
 *  Q2 — MCQ (1)                : automatic
 *  Q3 — MCQ (1)                : automatic
 *  Q4 — 4-mark explain         : marked by examiner edge function
 *  Q5 — 15-mark essay+diagram  : examiner edge function (vision verifies diagram)
 *  Q6 — 6-mark diagram-only    : pure diagram, vision-marked
 *  Total: 29 marks
 */

type Step = number;

const TOTAL = 29;

const Q1 = {
  prompt:
    "A country's nominal GDP rose from £500bn to £540bn. Inflation over the same period was 3%. Calculate the real GDP growth rate (to 1 decimal place, as a %).",
  hint: "Real growth ≈ nominal growth − inflation. Give your answer to 1 d.p. with a % sign.",
  correct: 5.0,
  tolerance: 0.2,
  marks: 2 as const,
};
const Q2 = {
  prompt: "Which of the following would most likely cause a rightward shift of the aggregate demand curve?",
  options: [
    "A rise in income tax rates",
    "A fall in consumer confidence",
    "A cut in the central bank's base interest rate",
    "An appreciation of the domestic currency",
  ],
  correctIndex: 2,
};
const Q3 = {
  prompt: "A monopolist maximises profit where:",
  options: [
    "Price equals average cost",
    "Marginal revenue equals marginal cost",
    "Average revenue equals average cost",
    "Price equals marginal cost",
  ],
  correctIndex: 1,
};
const Q4 = {
  prompt:
    "Explain two reasons why a government might impose an indirect tax on a demerit good such as cigarettes. (4 marks)",
  totalMarks: 4,
  rubric: [
    "Award 1 mark per valid reason identified (max 2 reasons).",
    "Award 1 further mark per reason for development with economic theory or example.",
    "Valid reasons include: internalising negative externalities (MPC < MSC), reducing overconsumption, raising government revenue, correcting information failure, discouraging consumption due to inelastic PED.",
    "Mere assertion without economic mechanism scores 1 mark per reason.",
  ].join(" "),
};
const Q5 = {
  prompt:
    "Evaluate the likely impact of a significant increase in the national minimum wage on the level of unemployment in the UK. (15 marks)",
  totalMarks: 15,
  rubric: [
    "AQA 15-mark levels-of-response. KAA = 9 marks, Evaluation = 6 marks.",
    "Required: definitions of NMW & unemployment; correct labour-market diagram (W on Y, QL on X) showing NMW above equilibrium creating excess supply; chains of reasoning linking higher labour cost → lower demand for labour → unemployment; UK context/data; counter-arguments (monopsony case, efficiency wages, demand-side multiplier effects); supported judgement (depends on size of rise, elasticity, sector).",
    "Level descriptors: L1 (1-3) isolated, no diagram. L2 (4-6) some knowledge, weak diagram. L3 (7-9) sound chains, attempted evaluation. L4 (10-12) developed analysis + reasoned evaluation. L5 (13-15) sustained analysis + supported prioritised judgement.",
    "If no diagram, cap at 7/15 (50%).",
    "If no evaluation at all, cap at 7/15.",
    "If no supported judgement, cap at 10/15.",
  ].join(" "),
};

const Q6 = {
  prompt:
    "Draw a fully labelled supply-and-demand diagram for the market for petrol, showing the impact of an indirect tax (specific tax) imposed on producers. Label clearly: P, Q axes; original S and D curves; new S+tax curve; original equilibrium (P₁, Q₁); new equilibrium (P₂, Q₂); the tax wedge; and the consumer/producer tax incidence regions.",
  totalMarks: 6,
  rubric: [
    "Diagram-only marking (vision). Award marks against components actually drawn:",
    "1 mark — Both axes labelled correctly (Price on Y, Quantity on X).",
    "1 mark — Upward-sloping supply (S) and downward-sloping demand (D) curves.",
    "1 mark — A second supply curve (S+tax) clearly parallel & shifted left/up of S.",
    "1 mark — Original equilibrium (P₁, Q₁) and new equilibrium (P₂, Q₂) both labelled.",
    "1 mark — Vertical tax wedge shown between S+tax and S at Q₂ (or labelled 'tax').",
    "1 mark — Consumer incidence and producer incidence regions clearly indicated.",
    "If no image is uploaded → 0 marks. If image is blank or off-topic → 0 marks.",
  ].join(" "),
};

interface AiItemResult {
  id: "q4" | "q5" | "q6";
  marks: number;
  totalMarks: number;
  rationale: string;
  strengths: string[];
  improvements: string[];
}

interface GradeBand {
  grade: string;
  min: number;
  label: string;
  color: string;
  blurb: string;
}
const BANDS: GradeBand[] = [
  { grade: "A*", min: 85, label: "Exceptional",  color: "text-success",     blurb: "Top of the cohort. Focus on consistency under timed conditions." },
  { grade: "A",  min: 73, label: "Strong",       color: "text-success",     blurb: "Excellent foundations. Sharpen evaluation and diagram precision to push into A*." },
  { grade: "B",  min: 60, label: "Solid",        color: "text-primary",     blurb: "Good base. The next jump comes from deeper analysis chains and clearer judgement." },
  { grade: "C",  min: 48, label: "Developing",   color: "text-warning",     blurb: "Knowledge is forming but application and analysis need more practice." },
  { grade: "D",  min: 36, label: "Emerging",     color: "text-warning",     blurb: "Build core definitions and diagram accuracy first — that unlocks the higher marks." },
  { grade: "E",  min: 22, label: "Foundational", color: "text-destructive", blurb: "Start with structured notes and topic-by-topic practice to lock in the basics." },
  { grade: "U",  min: 0,  label: "Below E",      color: "text-destructive", blurb: "We'll start from first principles — predicted papers + study notes daily." },
];
const gradeFor = (m: number) => BANDS.find((b) => (m / TOTAL) * 100 >= b.min) ?? BANDS[BANDS.length - 1];

export default function DiagnosticCalculator() {
  const [step, setStep] = useState<Step>(0);
  const [board, setBoard] = useState<Board>("aqa");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState<number | null>(null);
  const [a3, setA3] = useState<number | null>(null);
  const [a4Text, setA4Text] = useState("");
  const [a5Text, setA5Text] = useState("");
  const [a5HasDiagram, setA5HasDiagram] = useState<boolean | null>(null);
  const [a5DiagramImage, setA5DiagramImage] = useState<string | null>(null); // base64 data URL
  const [a5DiagramFileName, setA5DiagramFileName] = useState<string | null>(null);

  const [marking, setMarking] = useState(false);
  const [aiResults, setAiResults] = useState<AiItemResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Auto marks */
  const m1 = useMemo(() => {
    const trimmed = a1.trim();
    if (!trimmed) return 0;
    // Parse the number, ignoring %, spaces, etc.
    const cleaned = trimmed.replace(/[%\s,]/g, "");
    const n = parseFloat(cleaned);
    if (!Number.isFinite(n)) return 0;
    if (Math.abs(n - Q1.correct) > Q1.tolerance) return 0;
    // Need correct value AND formatting (% sign OR 1+ decimal place)
    const hasPct = /%/.test(trimmed);
    const hasDecimal = /\.\d/.test(trimmed);
    return hasPct && hasDecimal ? 2 : 1;
  }, [a1]);
  const m2 = a2 === Q2.correctIndex ? 1 : 0;
  const m3 = a3 === Q3.correctIndex ? 1 : 0;
  const m4 = aiResults?.find((r) => r.id === "q4")?.marks ?? 0;
  const m5 = aiResults?.find((r) => r.id === "q5")?.marks ?? 0;
  const total = m1 + m2 + m3 + m4 + m5;
  const band = gradeFor(total);

  const next = () => setStep((s) => Math.min(5, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);
  const reset = () => {
    setStep(0); setA1(""); setA2(null); setA3(null);
    setA4Text(""); setA5Text(""); setA5HasDiagram(null);
    setA5DiagramImage(null); setA5DiagramFileName(null);
    setAiResults(null); setError(null);
  };

  async function handleDiagramFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG / JPG).");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      toast.error("Image too large — please keep it under 6 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setA5DiagramImage(typeof reader.result === "string" ? reader.result : null);
      setA5DiagramFileName(file.name);
      setA5HasDiagram(true);
    };
    reader.onerror = () => toast.error("Couldn't read that image — try another file.");
    reader.readAsDataURL(file);
  }

  async function submitForMarking() {
    setMarking(true); setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("mark-diagnostic", {
        body: {
          board,
          items: [
            { id: "q4", prompt: Q4.prompt, totalMarks: Q4.totalMarks, rubric: Q4.rubric, answer: a4Text },
            {
              id: "q5",
              prompt: Q5.prompt,
              totalMarks: Q5.totalMarks,
              rubric: Q5.rubric,
              answer: a5Text,
              hasDiagram: a5HasDiagram === true && !!a5DiagramImage,
              diagramImage: a5DiagramImage ?? undefined,
            },
          ],
        },
      });
      if (error) throw new Error(error.message);
      if (!data?.results) throw new Error("Marking service returned no results");
      setAiResults(data.results);
      setStep(5);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Marking failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setMarking(false);
    }
  }

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
    <>
      {/* Exam board picker — sits above the calculator card */}
      <div className="mb-5 flex flex-col items-center text-center">
        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Pick your exam board
        </label>
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value as Board)}
          disabled={step > 0 && step < 5}
          className="h-11 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground disabled:opacity-60 min-w-[260px]"
        >
          {BOARD_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-border bg-gradient-to-br from-primary/10 via-card to-card">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="h-3 w-3" /> Instant Examiner Feedback
            </div>
            <h3 className="text-xl lg:text-2xl font-extrabold tracking-tight text-foreground">
              Diagnostic Grade Calculator
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Five questions across the full skill range. Your written answers are marked using your exam board's official mark scheme. We'll predict your current grade based on your total marks (out of {TOTAL}).
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-1.5">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={cn(
                "h-1.5 rounded-full transition-colors",
                step > i ? "bg-primary" : step === i ? "bg-primary/60" : "bg-popover",
              )} />
              <p className={cn(
                "text-[10px] font-mono mt-1.5 text-center hidden sm:block",
                step >= i ? "text-foreground" : "text-muted-foreground/50",
              )}>Q{i + 1}</p>
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
              <Input value={a1} onChange={(e) => setA1(e.target.value)} placeholder="e.g. 5.0%" className="h-12 text-base font-mono" />
            </motion.div>
          )}
          {step === 1 && <McqStep n={2} q={Q2} value={a2} onChange={setA2} />}
          {step === 2 && <McqStep n={3} q={Q3} value={a3} onChange={setA3} />}

          {step === 3 && (
            <motion.div key="q4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <QHeader num={4} marks={4} type="Short answer" />
              <p className="text-base text-foreground leading-relaxed mb-4">{Q4.prompt}</p>
              <Textarea value={a4Text} onChange={(e) => setA4Text(e.target.value)} placeholder="Write your answer here…" className="min-h-[160px] text-sm leading-relaxed" />
              <p className="text-[11px] text-muted-foreground mt-2 text-right font-mono">
                {a4Text.trim().split(/\s+/).filter(Boolean).length} words
              </p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="q5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <QHeader num={5} marks={15} type="Essay + diagram" />
              <p className="text-base text-foreground leading-relaxed mb-4">{Q5.prompt}</p>
              <Textarea value={a5Text} onChange={(e) => setA5Text(e.target.value)} placeholder="Write your evaluation. Describe the labour-market diagram you would draw…" className="min-h-[200px] text-sm leading-relaxed" />
              <p className="text-[11px] text-muted-foreground mt-2 text-right font-mono">
                {a5Text.trim().split(/\s+/).filter(Boolean).length} words
              </p>

              <div className="mt-4 rounded-xl border border-border bg-popover/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Diagram — upload your labour-market diagram
                </p>
                <div className="flex gap-2">
                  {[{ label: "Yes — I'll upload it", val: true }, { label: "No diagram drawn", val: false }].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => {
                        setA5HasDiagram(opt.val);
                        if (!opt.val) { setA5DiagramImage(null); setA5DiagramFileName(null); }
                      }}
                      className={cn(
                        "flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all",
                        a5HasDiagram === opt.val ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40",
                      )}
                    >{opt.label}</button>
                  ))}
                </div>

                {a5HasDiagram === true && (
                  <div className="mt-3">
                    <label
                      htmlFor="diagnostic-diagram-upload"
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 cursor-pointer transition-all",
                        a5DiagramImage ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/40 bg-popover/40",
                      )}
                    >
                      {a5DiagramImage ? (
                        <>
                          <img src={a5DiagramImage} alt="Your diagram" className="max-h-40 rounded-md border border-border object-contain" />
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[200px]">{a5DiagramFileName}</span>
                            <span className="text-primary underline">Replace</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <p className="text-xs font-semibold text-foreground">Upload diagram (PNG / JPG)</p>
                          <p className="text-[10px] text-muted-foreground">Hand-drawn or digital — the examiner will verify it</p>
                        </>
                      )}
                      <input
                        id="diagnostic-diagram-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleDiagramFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>
                )}

                {a5HasDiagram === true && !a5DiagramImage && (
                  <p className="text-[11px] text-warning mt-2 leading-relaxed">
                    Upload an image of your diagram to unlock the full 15 marks.
                  </p>
                )}
                {a5HasDiagram === false && (
                  <p className="text-[11px] text-warning mt-2 leading-relaxed">
                    No diagram → marks for this question will be capped at ~50% (board examiner convention).
                  </p>
                )}
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2">
                  <X className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </motion.div>
          )}

          {step === 5 && aiResults && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Results
                total={total}
                band={band}
                breakdown={[
                  { label: "Q1 · Calculation",    got: m1, of: 2 },
                  { label: "Q2 · MCQ",            got: m2, of: 1 },
                  { label: "Q3 · MCQ",            got: m3, of: 1 },
                  { label: "Q4 · 4-mark explain", got: m4, of: 4 },
                  { label: "Q5 · 15-mark essay",  got: m5, of: 15 },
                ]}
                aiResults={aiResults}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-popover/30 flex items-center justify-between gap-3">
        {step < 5 ? (
          <>
            <Button variant="ghost" onClick={back} disabled={step === 0 || marking} className="gap-1.5 text-xs">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Button>
            <p className="text-[11px] text-muted-foreground font-mono hidden sm:block">Question {step + 1} of 5</p>
            {step < 4 ? (
              <Button onClick={next} disabled={!canAdvance} className="gap-1.5 text-xs">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button onClick={submitForMarking} disabled={!canAdvance || marking} className="gap-1.5 text-xs">
                {marking ? (<><Loader2 className="h-3.5 w-3.5 animate-spin" /> Marking…</>) : (<>Mark My Answers <ArrowRight className="h-3.5 w-3.5" /></>)}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={reset} className="gap-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Try again
            </Button>
            <p className="text-[11px] text-muted-foreground font-mono">{total} / {TOTAL} marks</p>
            <Button asChild className="gap-1.5 text-xs">
              <a href="/auth">Start Practising Free <ArrowRight className="h-3.5 w-3.5" /></a>
            </Button>
          </>
        )}
      </div>
      </div>
    </>
  );
}

/* ───── helpers ───── */

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

function McqStep({ n, q, value, onChange }: { n: number; q: { prompt: string; options: string[] }; value: number | null; onChange: (i: number) => void }) {
  return (
    <motion.div key={`mcq-${n}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <QHeader num={n} marks={1} type="Multiple choice" />
      <p className="text-base text-foreground leading-relaxed mb-5">{q.prompt}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => onChange(i)} className={cn(
            "w-full text-left rounded-xl border px-4 py-3.5 transition-all flex items-center gap-3",
            value === i ? "border-primary bg-primary/10" : "border-border bg-popover/40 hover:border-primary/40",
          )}>
            <div className={cn(
              "h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
              value === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
            )}>{String.fromCharCode(65 + i)}</div>
            <span className="text-sm text-foreground">{opt}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Results({
  total, band, breakdown, aiResults,
}: {
  total: number;
  band: GradeBand;
  breakdown: { label: string; got: number; of: number }[];
  aiResults: AiItemResult[];
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
        >{band.grade}</motion.div>
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
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-primary rounded-full" />
                </div>
                <span className="text-[11px] font-mono font-bold text-foreground w-10 text-right">{b.got}/{b.of}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Examiner feedback per long-form question */}
      <div className="space-y-3 mb-5">
        {aiResults.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-popover/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                {r.id === "q4" ? "Q4 Examiner Feedback" : "Q5 Examiner Feedback"}
              </span>
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {r.marks}/{r.totalMarks}
              </span>
            </div>
            {r.rationale && <p className="text-xs text-foreground leading-relaxed mb-2">{r.rationale}</p>}
            {r.improvements.length > 0 && (
              <ul className="space-y-1 mt-2">
                {r.improvements.map((s, i) => (
                  <li key={i} className="text-[11px] text-muted-foreground leading-relaxed flex gap-1.5">
                    <span className="text-primary">→</span>{s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <ShareBar grade={band.grade} total={total} totalMax={TOTAL} />

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">What this means</p>
        <p className="text-sm text-foreground leading-relaxed">{band.blurb}</p>
      </div>
    </div>
  );
}

function ShareBar({ grade, total, totalMax }: { grade: string; total: number; totalMax: number }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/#diagnostic` : "https://econrev.co/#diagnostic";
  const text = `I just scored ${total}/${totalMax} on the Econ Rev diagnostic — predicted grade ${grade}. Think you can beat me?`;
  const enc = encodeURIComponent;

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try { await (navigator as any).share({ title: "Econ Rev diagnostic", text, url }); return; }
      catch { /* fall through */ }
    }
    copyLink();
  };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(`${text} ${url}`); toast.success("Link copied — share it with a friend!"); }
    catch { toast.error("Couldn't copy. Long-press the link instead."); }
  };

  const buttons = [
    { label: "Share", onClick: nativeShare, icon: Share2, className: "bg-primary text-primary-foreground hover:bg-primary/90 border-primary" },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${text} ${url}`)}`, icon: MessageCircle, className: "" },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`, icon: Twitter, className: "" },
    { label: "Email", href: `mailto:?subject=${enc("Try this Economics diagnostic")}&body=${enc(`${text}\n\n${url}`)}`, icon: Mail, className: "" },
    { label: "Copy link", onClick: copyLink, icon: LinkIcon, className: "" },
  ];

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="h-3.5 w-3.5 text-primary" />
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">Challenge a friend</p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        Share your grade and see if your friends can beat you. Every share helps another student find honest, examiner-style marking.
      </p>
      <div className="flex flex-wrap gap-2">
        {buttons.map((b) => {
          const Icon = b.icon;
          const cls = cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-border bg-popover/60 px-3 py-2 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors",
            b.className,
          );
          return b.href ? (
            <a key={b.label} href={b.href} target="_blank" rel="noreferrer" className={cls}>
              <Icon className="h-3.5 w-3.5" /> {b.label}
            </a>
          ) : (
            <button key={b.label} onClick={b.onClick} className={cls}>
              <Icon className="h-3.5 w-3.5" /> {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
