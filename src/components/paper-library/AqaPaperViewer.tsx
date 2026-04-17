import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowLeft, Clock, FileText, BookOpen, ClipboardList, ChevronLeft, ChevronRight, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getAqaPaperById } from "@/data/aqaPapers";
import type { GeneratedPaper, AqaQuestion, AqaExtract, AqaMarkSchemeEntry } from "@/lib/aqa-spec";
import { AQA_SPEC } from "@/lib/aqa-spec";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { InlineDiagramCanvas } from "@/components/paper-library/InlineDiagramCanvas";

type View = "qp" | "insert" | "markscheme";

const STORAGE_KEY = (id: string) => `aqa-attempt-${id}`;

interface Props {
  paperId: string;
  initialView?: View;
}

export default function AqaPaperViewer({ paperId, initialView = "qp" }: Props) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const paper = useMemo(() => getAqaPaperById(paperId), [paperId]);
  const view = (params.get("view") as View | null) ?? initialView;
  const setView = (v: View) => setParams((p) => { const np = new URLSearchParams(p); if (v === "qp") np.delete("view"); else np.set("view", v); return np; });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [mcqChoices, setMcqChoices] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // hydrate
  useEffect(() => {
    if (!paper) return;
    setTimeLeft(AQA_SPEC[`PAPER_${paper.paperNumber}`].durationMinutes * 60);
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY(paper.id)) || "null");
      if (saved) {
        setAnswers(saved.answers || {});
        setMcqChoices(saved.mcqChoices || {});
      }
    } catch { /* ignore */ }
  }, [paper]);

  // autosave
  useEffect(() => {
    if (!paper) return;
    const t = setInterval(() => {
      localStorage.setItem(STORAGE_KEY(paper.id), JSON.stringify({ answers, mcqChoices, ts: Date.now() }));
    }, 10_000);
    return () => clearInterval(t);
  }, [paper, answers, mcqChoices]);

  // timer
  useEffect(() => {
    if (timeLeft <= 0 || view !== "qp") return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, view]);

  if (!paper) {
    return <div className="max-w-4xl mx-auto px-5 py-12 text-center text-muted-foreground">AQA paper not found.</div>;
  }

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const sectionA = paper.questions.filter((q) => q.section === "A");
  const sectionB = paper.questions.filter((q) => q.section === "B");

  return (
    <div className="min-h-screen bg-background">
      {/* ── White-on-dark exam header ── */}
      <header className="sticky top-0 z-30 bg-[#0b0d18] border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate("/paper-library")} className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground" aria-label="Back to library">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-muted-foreground">{paper.paperCode}</div>
              <div className="text-sm font-semibold text-foreground truncate">AQA A-Level Economics — Paper {paper.paperNumber}: {paper.title}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="hidden sm:inline">{paper.totalMarks} marks</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1 font-mono"><Clock className="h-3.5 w-3.5" /> {fmt(timeLeft)}</span>
          </div>
        </div>
        {/* sub-toggle: QP | Insert | MS */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
          <div className="inline-flex p-1 rounded-lg bg-card border border-border">
            <SubTab active={view === "qp"} onClick={() => setView("qp")} icon={FileText} label="Question Paper" />
            <SubTab active={view === "insert"} onClick={() => setView("insert")} icon={BookOpen} label={paper.paperNumber === 3 ? "Case study" : "Insert"} />
            <SubTab active={view === "markscheme"} onClick={() => setView("markscheme")} icon={ClipboardList} label="Mark Scheme" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {view === "insert" && <InsertView extracts={paper.extracts ?? []} />}
        {view === "markscheme" && <MarkSchemeView paper={paper} />}
        {view === "qp" && (
          <div className="grid lg:grid-cols-[1fr_220px] gap-6">
            <div className="space-y-8">
              {/* Section A */}
              <section>
                <h2 className="text-lg font-bold text-foreground border-b-2 border-indigo-500/40 pb-1 mb-4">
                  Section A {paper.paperNumber === 3 ? "— Multiple choice (30 marks)" : "— Data response (40 marks)"}
                </h2>
                {paper.paperNumber !== 3 && (paper.extracts ?? []).map((e) => <ExtractPanel key={e.id} extract={e} />)}

                <div className="space-y-4 mt-4">
                  {sectionA.map((q) =>
                    q.mcqOptions
                      ? <McqBlock key={q.number} q={q} choice={mcqChoices[q.number]} onChoose={(c) => setMcqChoices((p) => ({ ...p, [q.number]: c }))} />
                      : <QuestionBlock
                          key={q.number}
                          q={q}
                          paperId={paper.id}
                          value={answers[q.number] || ""}
                          onChange={(v) => setAnswers((p) => ({ ...p, [q.number]: v }))}
                          active={activeQ === q.number}
                          onFocus={() => setActiveQ(q.number)}
                        />
                  )}
                </div>
              </section>

              {/* Section B */}
              <section>
                <h2 className="text-lg font-bold text-foreground border-b-2 border-indigo-500/40 pb-1 mb-4">
                  Section B {paper.paperNumber === 3 ? "— Case study (50 marks)" : "— Essay (40 marks)"}
                </h2>
                {paper.paperNumber === 3 && (paper.extracts ?? []).map((e) => <ExtractPanel key={e.id} extract={e} />)}
                <div className="space-y-4 mt-4">
                  {sectionB.map((q) => (
                    <QuestionBlock
                      key={q.number}
                      q={q}
                      paperId={paper.id}
                      value={answers[q.number] || ""}
                      onChange={(v) => setAnswers((p) => ({ ...p, [q.number]: v }))}
                      active={activeQ === q.number}
                      onFocus={() => setActiveQ(q.number)}
                    />
                  ))}
                </div>
              </section>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" size="sm" onClick={() => navigate("/paper-library")} className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Save & Exit
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setView("markscheme")}>
                    View mark scheme
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      localStorage.setItem(STORAGE_KEY(paper.id), JSON.stringify({ answers, mcqChoices, ts: Date.now() }));
                      navigate(`/predicted/aqa/mark/${paper.id}`);
                    }}
                  >
                    Submit & mark <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating navigator */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Time remaining</div>
                  <div className={cn("text-2xl font-mono font-bold", timeLeft < 600 ? "text-red-400" : "text-foreground")}>{fmt(timeLeft)}</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Questions</div>
                  <NavGrid questions={paper.questions} answers={answers} mcqChoices={mcqChoices} onJump={(n) => {
                    const el = document.getElementById(`q-${n}`); el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }} />
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── building blocks ── */

function SubTab({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof FileText; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors",
        active ? "bg-indigo-500/15 text-indigo-200 border border-indigo-500/30" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function ExtractPanel({ extract }: { extract: AqaExtract }) {
  return (
    <div className="rounded-xl bg-muted/30 border border-border p-4 sm:p-5 mb-3">
      <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">{extract.title}</div>
      <div className="text-sm text-foreground/90 leading-relaxed">
        <MathsMarkdown>{extract.body}</MathsMarkdown>
      </div>
      {extract.figures?.map((f) => (
        <div key={f.id} className="mt-4 rounded-lg bg-card border border-border p-3">
          <div className="text-xs font-semibold text-foreground mb-2">{f.title}</div>
          {f.data && f.xKey && f.yKeys && (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={f.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey={f.xKey} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: "11px" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  {f.yKeys.map((k, i) => (
                    <Line key={k} type="monotone" dataKey={k} stroke={["#818cf8", "#34d399", "#f59e0b"][i % 3]} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {f.caption && <p className="text-[10px] text-muted-foreground mt-1 italic">{f.caption}</p>}
        </div>
      ))}
      {extract.source && <p className="text-[10px] text-muted-foreground mt-3 italic">{extract.source}</p>}
    </div>
  );
}

function QuestionBlock({
  q, paperId, value, onChange, active, onFocus,
}: {
  q: AqaQuestion; paperId: string; value: string; onChange: (v: string) => void; active: boolean; onFocus: () => void;
}) {
  const showCanvas = q.requiresDiagram || q.diagramOptional;
  return (
    <div id={`q-${q.number}`} className={cn("rounded-xl border bg-card p-4 sm:p-5 transition-colors", active ? "border-indigo-500/40" : "border-border")}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-foreground">Question {q.number}</span>
          {q.contextLabel && <Badge variant="outline" className="text-[10px]">{q.contextLabel}</Badge>}
          {q.requiresDiagram && (
            <Badge className="text-[10px] bg-indigo-500/15 border-indigo-500/40 text-indigo-200 hover:bg-indigo-500/15">
              Diagram required
            </Badge>
          )}
          {q.diagramOptional && !q.requiresDiagram && (
            <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-200/80">
              Diagram supports top band
            </Badge>
          )}
        </div>
        <span className="font-mono text-[11px] font-semibold text-foreground bg-muted/50 border border-border px-2 py-0.5 rounded">
          [{q.marks} mark{q.marks === 1 ? "" : "s"}]
        </span>
      </div>
      <div className="text-sm text-foreground/90 mb-3">
        <MathsMarkdown>{q.prompt}</MathsMarkdown>
      </div>
      {showCanvas && (
        <InlineDiagramCanvas
          questionNumber={q.number}
          paperId={paperId}
          rubric={q.diagramRubric}
          diagramType={q.diagramType}
          optional={!!q.diagramOptional && !q.requiresDiagram}
        />
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={showCanvas ? "Write your explanation here — refer to your diagram." : "Type your answer here…"}
        className="min-h-[140px]"
      />
    </div>
  );
}

function McqBlock({
  q, choice, onChoose,
}: {
  q: AqaQuestion; choice?: "A" | "B" | "C" | "D"; onChoose: (c: "A" | "B" | "C" | "D") => void;
}) {
  return (
    <div id={`q-${q.number}`} className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-sm font-bold text-foreground">Question {q.number}</span>
        <span className="font-mono text-[11px] font-semibold text-foreground bg-muted/50 border border-border px-2 py-0.5 rounded">[1 mark]</span>
      </div>
      <p className="text-sm text-foreground/90 mb-3">{q.prompt}</p>
      <div className="grid sm:grid-cols-2 gap-1.5">
        {q.mcqOptions?.map((opt, i) => {
          const letter = (["A", "B", "C", "D"] as const)[i];
          const sel = choice === letter;
          return (
            <button
              key={letter}
              onClick={() => onChoose(letter)}
              className={cn(
                "text-left text-xs px-3 py-2 rounded-lg border transition-colors",
                sel ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-100" : "bg-card border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="font-mono font-bold mr-2">{letter}</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavGrid({ questions, answers, mcqChoices, onJump }: {
  questions: AqaQuestion[];
  answers: Record<number, string>;
  mcqChoices: Record<number, string>;
  onJump: (n: number) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-1">
      {questions.map((q) => {
        const done = q.mcqOptions ? !!mcqChoices[q.number] : !!answers[q.number]?.trim();
        return (
          <button
            key={q.number}
            onClick={() => onJump(q.number)}
            className={cn(
              "h-7 text-[10px] font-mono rounded border transition-colors",
              done ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200" : "bg-card border-border text-muted-foreground hover:text-foreground",
            )}
            title={`Q${q.number} · ${q.marks}m`}
          >
            {q.number}
          </button>
        );
      })}
    </div>
  );
}

/* ── Insert view: extracts only ── */
function InsertView({ extracts }: { extracts: AqaExtract[] }) {
  if (!extracts.length) return <p className="text-sm text-muted-foreground">No insert / case-study material attached.</p>;
  return <div>{extracts.map((e) => <ExtractPanel key={e.id} extract={e} />)}</div>;
}

/* ── Mark scheme: side-by-side with question ── */
function MarkSchemeView({ paper }: { paper: GeneratedPaper }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3 text-xs text-indigo-200">
        Mark scheme uses AQA's level-based descriptors for extended response (Knowledge / Application / Analysis + Evaluation).
        Point-marked schemes are used for 2- and 4-mark questions.
      </div>
      {paper.questions.map((q) => {
        const ms = paper.markScheme.find((m) => m.questionNumber === q.number);
        return (
          <div key={q.number} className="grid md:grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-foreground">Q{q.number}</span>
                <span className="font-mono text-[11px] font-semibold text-foreground bg-muted/50 border border-border px-2 py-0.5 rounded">[{q.marks} mark{q.marks === 1 ? "" : "s"}]</span>
              </div>
              <p className="text-sm text-foreground/90">{q.prompt}</p>
              {q.mcqOptions && (
                <ul className="mt-2 space-y-0.5">
                  {q.mcqOptions.map((opt, i) => (
                    <li key={i} className="text-xs text-muted-foreground"><span className="font-mono mr-1.5">{(["A","B","C","D"] as const)[i]}</span>{opt}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-l border-border/60 md:pl-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-2">Mark scheme</div>
              {ms?.mcqAnswer && (
                <div>
                  <div className="text-sm"><span className="font-mono font-bold text-emerald-300">Answer: {ms.mcqAnswer}</span></div>
                  {ms.mcqJustification && <p className="text-xs text-muted-foreground mt-1">{ms.mcqJustification}</p>}
                </div>
              )}
              {ms?.pointMarks && (
                <ul className="space-y-1.5">
                  {ms.pointMarks.map((p, i) => (
                    <li key={i} className="text-xs text-foreground/90 flex gap-1.5"><span className="text-emerald-400 mt-0.5">✓</span>{p}</li>
                  ))}
                </ul>
              )}
              {ms?.levels && (
                <div className="space-y-2">
                  {ms.levels.map((lv) => (
                    <div key={lv.level} className="rounded border border-border bg-muted/20 p-2">
                      <div className="text-[11px] font-bold text-foreground mb-0.5">
                        Level {lv.level} <span className="text-muted-foreground font-normal">({lv.markBand[0]}–{lv.markBand[1]} marks)</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{lv.descriptor}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
