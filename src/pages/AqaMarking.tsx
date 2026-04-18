import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAqaPaperById } from "@/data/aqaPapers";
import {
  AqaSelfAssessmentPanel,
  AqaMarkingReport,
  AqaTierBadge,
  AqaDiagramMarkPanel,
  AiAnalysisTrigger,
  AiAnalysisCard,
  emptySelfAssessment,
  type SelfAssessment,
  type MarkedQuestion,
} from "@/components/aqa-marking";
import {
  markMcq,
  markCalculation,
  type CalcMarkSpec,
  type KaaeSelfScore,
} from "@/lib/aqa-marking-engine";
import { defaultAdAsRubric, defaultSdRubric, type CanvasElement } from "@/lib/aqa-diagram-rubric";
import { loadSavedDiagrams } from "@/components/paper-library/InlineDiagramCanvas";
import { useAiMarking } from "@/hooks/useAiMarking";
import type { AiMarkingPayload } from "@/lib/aiMarking";
import { cn } from "@/lib/utils";

const STORAGE_KEY = (id: string) => `aqa-attempt-${id}`;
const SA_KEY = (id: string) => `aqa-self-assess-${id}`;

/**
 * Dedicated AQA marking flow at /predicted/aqa/mark/:setId.
 * Loads the saved attempt from localStorage, walks the student through
 * Tier 1 (auto), Tier 2 (self-assess), Tier 3 (optional AI), then renders
 * the marking report.
 */
export default function AqaMarking() {
  const { setId = "" } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const paper = useMemo(() => getAqaPaperById(setId), [setId]);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [mcqChoices, setMcqChoices] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [selfAssess, setSelfAssess] = useState<Record<number, SelfAssessment>>({});
  const [step, setStep] = useState<"auto" | "self" | "ai" | "report">("auto");
  const ai = useAiMarking();

  // hydrate
  useEffect(() => {
    if (!paper) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY(paper.id)) || "null");
      if (saved) {
        setAnswers(saved.answers || {});
        setMcqChoices(saved.mcqChoices || {});
      }
      const sa = JSON.parse(localStorage.getItem(SA_KEY(paper.id)) || "null");
      if (sa) setSelfAssess(sa);
    } catch { /* ignore */ }
  }, [paper]);

  // persist self-assessment
  useEffect(() => {
    if (!paper) return;
    localStorage.setItem(SA_KEY(paper.id), JSON.stringify(selfAssess));
  }, [paper, selfAssess]);

  if (!paper) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-12 text-center">
        <p className="text-muted-foreground">AQA paper not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/paper-library">Back to Library</Link>
        </Button>
      </div>
    );
  }

  // Tier 1 — auto-marking results
  const mcqs = paper.questions.filter((q) => q.mcqOptions);
  const calcQs = paper.questions.filter((q) => q.marks === 2 && !q.mcqOptions);
  const extendedQs = paper.questions.filter((q) => q.marks >= 9);
  const fourMarkQs = paper.questions.filter((q) => q.marks === 4);

  const mcqResults = mcqs.map((q) => {
    const ms = paper.markScheme.find((m) => m.questionNumber === q.number);
    const correct = (q.mcqAnswer ?? ms?.mcqAnswer ?? "A") as "A" | "B" | "C" | "D";
    return markMcq(q.number, mcqChoices[q.number], correct);
  });

  // Build calc mark specs from mark scheme point hints (best-effort).
  const calcResults = calcQs.map((q) => {
    const ms = paper.markScheme.find((m) => m.questionNumber === q.number);
    // Try to find a numeric value in pointMarks / hints; fall back to 0 (will award only formatting).
    const hint = (ms?.pointMarks ?? []).join(" ");
    const numMatch = hint.match(/-?\d+(?:\.\d+)?/);
    const correctValue = numMatch ? parseFloat(numMatch[0]) : 0;
    const has2dp = /two\s+decimal|2\s*d\.?p\.?|2\s*decimal/i.test(hint);
    const has1dp = /one\s+decimal|1\s*d\.?p\.?/i.test(hint);
    const hasPct = /percent|%/i.test(hint + " " + q.prompt);
    const hasCurrency = /£/.test(q.prompt) ? "£" : /\$/.test(q.prompt) ? "$" : null;
    const spec: CalcMarkSpec = {
      questionNumber: q.number,
      correctValue,
      tolerance: has2dp ? 0.01 : has1dp ? 0.1 : 0.5,
      formatting: hasCurrency
        ? { kind: "currency", symbol: hasCurrency as "£" | "$" }
        : hasPct
        ? { kind: "percent" }
        : has2dp
        ? { kind: "decimal-places", places: 2 }
        : has1dp
        ? { kind: "decimal-places", places: 1 }
        : { kind: "none" },
      formattingHint: has2dp
        ? "two decimal places"
        : has1dp
        ? "one decimal place"
        : hasCurrency
        ? `${hasCurrency} symbol`
        : hasPct
        ? "% sign"
        : "as instructed",
    };
    return markCalculation(spec, answers[q.number] ?? "");
  });

  // Resolve diagram-required questions (rubric attached at paper-generation tagging time).
  const diagramQs = paper.questions.filter((q) => q.requiresDiagram || q.diagramOptional);
  const savedDiagrams = loadSavedDiagrams(paper.id, diagramQs.map((q) => q.number));

  /** Best-effort canvas-element shim: until the canvas exports structured
   *  primitives, treat presence of a saved data URL as "drew something". */
  const elementsFor = (qn: number): CanvasElement[] => (savedDiagrams[qn] ? [{ type: "raster" } as CanvasElement] : []);
  const hasDiagram = (qn: number) => !!savedDiagrams[qn];

  // Diagram rubric per extended Q (best-effort default, paper number aware).
  const rubricFor = (qNum: number) => {
    const q = paper.questions.find((x) => x.number === qNum);
    if (q?.diagramRubric) return q.diagramRubric;
    if (paper.paperNumber === 1) return defaultSdRubric("the relevant market");
    return defaultAdAsRubric("the relevant macro shock");
  };

  // Aggregate marks
  const autoTotal = mcqResults.reduce((s, r) => s + r.marksAwarded, 0)
    + calcResults.reduce((s, r) => s + r.marksAwarded, 0);
  const selfTotal = extendedQs.reduce(
    (s, q) => s + (selfAssess[q.number]?.markAwarded ?? 0),
    0,
  ) + fourMarkQs.reduce(
    (s, q) => s + (selfAssess[q.number]?.markAwarded ?? 0),
    0,
  );

  const allQs: MarkedQuestion[] = [
    ...mcqResults.map((r) => ({
      questionNumber: r.questionNumber,
      totalMarks: r.totalMarks,
      marksAwarded: r.marksAwarded,
      tier: "auto" as const,
      notes: r.correct ? "Correct" : `Answer ${r.correctAnswer}`,
    })),
    ...calcResults.map((r) => ({
      questionNumber: r.questionNumber,
      totalMarks: r.totalMarks,
      marksAwarded: r.marksAwarded,
      tier: "auto" as const,
      notes: r.feedback,
    })),
    ...fourMarkQs.map((q) => {
      const sa = selfAssess[q.number];
      return {
        questionNumber: q.number,
        totalMarks: q.marks,
        marksAwarded: sa?.markAwarded ?? 0,
        tier: "self" as const,
      };
    }),
    ...extendedQs.map((q) => {
      const sa = selfAssess[q.number];
      return {
        questionNumber: q.number,
        totalMarks: q.marks,
        marksAwarded: sa?.markAwarded ?? 0,
        tier: "self" as const,
        levelReached: sa?.selectedLevel ?? undefined,
      };
    }),
  ].sort((a, b) => a.questionNumber - b.questionNumber);

  const kaaeScores: KaaeSelfScore[] = [...extendedQs, ...fourMarkQs]
    .map((q) => selfAssess[q.number])
    .filter(Boolean)
    .map((sa, i) => ({
      ...sa.kaae,
      weight: ([...extendedQs, ...fourMarkQs][i]?.marks ?? 1),
    }));

  const weakTopics = extendedQs
    .filter((q) => {
      const sa = selfAssess[q.number];
      return sa && sa.markAwarded / q.marks < 0.5;
    })
    .map((q) => ({
      topic: `Question ${q.number} — ${q.prompt.slice(0, 70)}…`,
      specRef: paper.paperNumber === 1 ? "4.1 — Markets" : paper.paperNumber === 2 ? "4.2 — Macro" : "4.1 / 4.2 synoptic",
      suggestion: !selfAssess[q.number]?.kaae.Eval
        ? "Practise supported conclusions — Evaluation is the most common B→A discriminator."
        : !selfAssess[q.number]?.kaae.An
        ? "Build longer chains of reasoning (X → Y → Z) before evaluating."
        : "Tighten Application — link every theory point to the specific extract / context.",
    }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0b0d18] border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(`/paper-library`)}
              className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-muted-foreground">{paper.paperCode}</div>
              <div className="text-sm font-semibold text-foreground truncate">
                Marking — Paper {paper.paperNumber}: {paper.title}
              </div>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link to={`/paper-library?aqa=${paper.id}`}>
              <FileText className="h-3.5 w-3.5" /> View paper
            </Link>
          </Button>
        </div>
        {/* Step nav */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3 flex gap-2">
          {(["auto", "self", "ai", "report"] as const).map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium border transition-colors",
                step === s
                  ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-200"
                  : "bg-card border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {i + 1}.{" "}
              {s === "auto"
                ? "Tier 1 · Auto"
                : s === "self"
                ? "Tier 2 · Self-assess"
                : s === "ai"
                ? "Tier 3 · AI analysis"
                : "Report"}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {step === "auto" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Tier 1 — Automatic marking</h2>
              <AqaTierBadge tier="auto" />
            </div>
            <p className="text-xs text-muted-foreground">
              MCQs and 2-mark calculations marked automatically against the answer key with AQA's
              formatting rules. Auto-total: <span className="font-mono text-foreground">{autoTotal}</span>.
            </p>

            {mcqResults.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-bold mb-3">MCQs ({mcqResults.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {mcqResults.map((r) => (
                    <div
                      key={r.questionNumber}
                      className={cn(
                        "rounded border p-2 text-[11px] font-mono text-center",
                        r.correct
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                          : "bg-red-500/10 border-red-500/40 text-red-200",
                      )}
                    >
                      Q{r.questionNumber}: {r.studentChoice ?? "—"}/{r.correctAnswer}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {calcResults.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-4 space-y-2">
                <h3 className="text-sm font-bold mb-1">Calculations ({calcResults.length})</h3>
                {calcResults.map((r) => (
                  <div key={r.questionNumber} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Q{r.questionNumber}</span>
                      <span className="font-mono text-xs">
                        {r.marksAwarded}/{r.totalMarks}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80">
                      Your answer: <span className="font-mono">{r.studentAnswer || "—"}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{r.feedback}</p>
                  </div>
                ))}
              </section>
            )}

            {diagramQs.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-4 space-y-3">
                <h3 className="text-sm font-bold">Diagram marking ({diagramQs.length})</h3>
                <p className="text-[11px] text-muted-foreground">
                  Structural checks run automatically. Optional contextual analysis recommends an AQA level — never a mark.
                </p>
                {diagramQs.map((q) => (
                  <AqaDiagramMarkPanel
                    key={q.number}
                    questionNumber={q.number}
                    prompt={q.prompt}
                    rubric={rubricFor(q.number)}
                    diagramElements={elementsFor(q.number)}
                    hasDiagram={hasDiagram(q.number)}
                    writtenAnswer={answers[q.number] ?? ""}
                  />
                ))}
              </section>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setStep("self")} size="sm">
                Continue to Tier 2 →
              </Button>
            </div>
          </div>
        )}

        {step === "self" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Tier 2 — Guided self-assessment</h2>
              <AqaTierBadge tier="self" />
            </div>
            <p className="text-xs text-muted-foreground">
              Read each AQA level descriptor carefully and mark your answer honestly. Self-total:{" "}
              <span className="font-mono text-foreground">{selfTotal}</span>.
            </p>

            {[...fourMarkQs, ...extendedQs].map((q) => (
              <AqaSelfAssessmentPanel
                key={q.number}
                questionNumber={q.number}
                totalMarks={q.marks}
                prompt={q.prompt}
                studentAnswer={answers[q.number] ?? ""}
                value={selfAssess[q.number] ?? emptySelfAssessment()}
                onChange={(v) => setSelfAssess((p) => ({ ...p, [q.number]: v }))}
              />
            ))}

            <div className="flex justify-between">
              <Button onClick={() => setStep("auto")} size="sm" variant="outline">
                ← Back to Tier 1
              </Button>
              <Button onClick={() => setStep("report")} size="sm">
                Generate report →
              </Button>
            </div>
          </div>
        )}

        {step === "report" && (
          <AqaMarkingReport
            paperTitle={paper.title}
            paperCode={paper.paperCode}
            attemptedAt={new Date().toISOString()}
            questionResults={allQs}
            kaaeScores={kaaeScores}
            weakTopics={weakTopics}
            onExportPdf={() => window.print()}
          />
        )}
      </main>
    </div>
  );
}
