import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AQA_SPEC, AQA_TOPIC_FOCUS, blueprintStrip, questionMarkChips,
  type PaperNumber,
} from "@/lib/aqa-spec";
import { generateAqaPaper } from "@/lib/aqaPaperGenerator";
import { saveGeneratedPaper } from "@/data/aqaPapers";
import { toast } from "sonner";

interface Props {
  initialPaper?: PaperNumber;
  onGenerated?: () => void;
}

export default function AqaGenerateNewPanel({ initialPaper = 1, onGenerated }: Props) {
  const [paperNumber, setPaperNumber] = useState<PaperNumber>(initialPaper);
  const [practiceSetLabel, setPracticeSetLabel] = useState("Practice Set");
  const [focus, setFocus] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"as" | "a2" | "mixed">("mixed");
  const [thematicEssays, setThematicEssays] = useState(false);
  const [synopticMcq, setSynopticMcq] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const spec = AQA_SPEC[`PAPER_${paperNumber}`];
  const focusOptions = AQA_TOPIC_FOCUS[paperNumber];

  const toggleFocus = (f: string) =>
    setFocus((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const handleGenerate = () => {
    setError(null);
    try {
      const paper = generateAqaPaper({
        paperNumber,
        practiceSetLabel: practiceSetLabel.trim() || `Practice Set ${new Date().toLocaleDateString("en-GB")}`,
        focus,
        difficulty,
        thematicEssays: paperNumber !== 3 ? thematicEssays : undefined,
        synopticMcq: paperNumber === 3 ? synopticMcq : undefined,
      });
      saveGeneratedPaper(paper);
      toast.success(`Generated ${paper.title} — ${paper.practiceSetLabel}`);
      onGenerated?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      toast.error("Generation failed — paper rejected by validator");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-2">
          <Sparkles className="h-3 w-3" /> Generate a new AQA paper
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Build a paper to the AQA blueprint</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Structure is locked to the official spec — you choose the topic focus and difficulty.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* ── Form ── */}
        <Card className="lg:col-span-2">
          <CardContent className="p-5 space-y-5">
            {/* Paper picker */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Paper</label>
              <div className="grid sm:grid-cols-3 gap-2 mt-2">
                {([1, 2, 3] as const).map((n) => {
                  const s = AQA_SPEC[`PAPER_${n}`];
                  return (
                    <button
                      key={n}
                      onClick={() => setPaperNumber(n)}
                      className={cn(
                        "rounded-lg border p-3 text-left transition-colors",
                        paperNumber === n
                          ? "border-indigo-500/50 bg-indigo-500/10"
                          : "border-border bg-card hover:border-indigo-500/30",
                      )}
                    >
                      <div className="text-[10px] font-mono text-muted-foreground">{s.code}</div>
                      <div className="text-sm font-semibold text-foreground">Paper {n}</div>
                      <div className="text-[11px] text-muted-foreground">{s.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Set label */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Practice set label</label>
              <Input
                value={practiceSetLabel}
                onChange={(e) => setPracticeSetLabel(e.target.value)}
                placeholder="e.g. Practice Set A — Microeconomics focus"
                className="mt-2 bg-card border-border"
              />
            </div>

            {/* Focus picker */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Topic focus (multi-select)</label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {focusOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFocus(f)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors",
                      focus.includes(f)
                        ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-200"
                        : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-indigo-500/30",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {([
                  { v: "as" as const, l: "AS-level" },
                  { v: "mixed" as const, l: "Mixed" },
                  { v: "a2" as const, l: "A2 challenging" },
                ]).map((d) => (
                  <button
                    key={d.v}
                    onClick={() => setDifficulty(d.v)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                      difficulty === d.v
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-200"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {d.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper-specific options */}
            {paperNumber !== 3 && (
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={thematicEssays}
                  onChange={(e) => setThematicEssays(e.target.checked)}
                  className="accent-indigo-500"
                />
                Section B — link the three essay choices around one theme
              </label>
            )}
            {paperNumber === 3 && (
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={synopticMcq}
                  onChange={(e) => setSynopticMcq(e.target.checked)}
                  className="accent-indigo-500"
                />
                MCQs synoptic across all three Paper 3 themes (AQA convention)
              </label>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200 flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button onClick={handleGenerate} className="w-full gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Generate paper
            </Button>
          </CardContent>
        </Card>

        {/* ── Locked blueprint preview ── */}
        <Card className="border-indigo-500/30 bg-indigo-500/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">Locked blueprint</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground mb-1">{spec.code}</div>
            <h3 className="text-base font-bold text-foreground">{spec.title}</h3>
            <p className="text-[11px] text-muted-foreground mb-4">
              {spec.durationMinutes} minutes · {spec.totalMarks} marks
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {blueprintStrip(paperNumber).split("·").map((seg, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-md border",
                    i % 2 === 1
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-200"
                      : "bg-muted/40 border-border text-muted-foreground",
                  )}
                >
                  {seg.trim()}
                </span>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              {spec.sections.map((s) => (
                <div key={s.id} className="rounded-md border border-border bg-card/50 p-2.5">
                  <div className="text-[11px] font-semibold text-foreground">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground mb-1.5">{s.marks} marks</div>
                  <div className="flex flex-wrap gap-1">
                    {s.questions.length > 4 ? (
                      <Badge variant="outline" className="text-[10px]">
                        Q{s.questions[0].number}–{s.questions[s.questions.length - 1].number} · {s.questions[0].format === "MCQ" ? "MCQ" : ""}
                      </Badge>
                    ) : (
                      s.questions.map((q) => (
                        <Badge key={q.number} variant="outline" className="text-[10px]">
                          Q{q.number} · {q.marks}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> Generated papers are validated against this spec
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
