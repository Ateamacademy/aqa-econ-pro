import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown, FileText, BookOpen, ClipboardList, Clock, Trophy,
  Sparkles, Crown, Pin, AlertTriangle, Plus, Copy, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  blueprintStrip, questionMarkChips, validateGeneratedPaper,
  type GeneratedPaper, type PaperNumber,
} from "@/lib/aqa-spec";
import { getAllAqaPapers } from "@/data/aqaPapers";

interface Props {
  /** Bumping this re-reads the generated-paper store. */
  refreshKey?: number;
  onGenerateClick?: (paperNumber: PaperNumber) => void;
}

const PAPER_TABS: { value: PaperNumber; label: string; sub: string }[] = [
  { value: 1, label: "Paper 1", sub: "7136/1 — Markets" },
  { value: 2, label: "Paper 2", sub: "7136/2 — Macro" },
  { value: 3, label: "Paper 3", sub: "7136/3 — Synoptic" },
];

export default function AqaPaperLibrarySection({ refreshKey = 0, onGenerateClick }: Props) {
  const [active, setActive] = useState<PaperNumber>(1);

  const papers = useMemo(() => getAllAqaPapers(), [refreshKey]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex items-end justify-between mb-4 gap-3 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-2">
            <Sparkles className="h-3 w-3" /> AQA A-Level Economics (7136)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Practice paper library</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sessioned packs structured to AQA's official blueprint. Each session ships with a question paper, insert, and mark scheme.
          </p>
        </div>
      </div>

      <Tabs value={String(active)} onValueChange={(v) => setActive(Number(v) as PaperNumber)}>
        <TabsList className="bg-card border border-border">
          {PAPER_TABS.map((t) => (
            <TabsTrigger key={t.value} value={String(t.value)} className="text-xs sm:text-sm flex flex-col items-start py-1.5 px-3">
              <span className="font-semibold">{t.label}</span>
              <span className="text-[10px] text-muted-foreground font-normal">{t.sub}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {PAPER_TABS.map((t) => {
          const list = papers.filter((p) => p.paperNumber === t.value);
          const specimen = list.find((p) => p.status === "specimen");
          const others = list.filter((p) => p.status !== "specimen");
          return (
            <TabsContent key={t.value} value={String(t.value)} className="space-y-3 mt-4">
              {specimen && <PaperRow paper={specimen} pinned />}
              {others.length === 0 && (
                <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-6 text-center">
                  <p className="text-sm text-muted-foreground">No practice sessions yet for this paper.</p>
                  <Button size="sm" className="mt-3 gap-1.5" onClick={() => onGenerateClick?.(t.value)}>
                    <Plus className="h-3.5 w-3.5" /> Generate Paper {t.value}
                  </Button>
                </div>
              )}
              {others.map((p) => <PaperRow key={p.id} paper={p} />)}
              {others.length > 0 && (
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onGenerateClick?.(t.value)}>
                  <Plus className="h-3.5 w-3.5" /> Generate another Paper {t.value}
                </Button>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

/* ── PaperRow: PMT-style accordion row exposing QP / IN / MS ── */
function PaperRow({ paper, pinned = false }: { paper: GeneratedPaper; pinned?: boolean }) {
  const [open, setOpen] = useState(pinned);
  const validation = useMemo(() => validateGeneratedPaper(paper), [paper]);
  const navigate = useNavigate();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all",
          pinned && "border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.08)]",
          !validation.valid && "border-red-500/50",
        )}
      >
        {/* status accent */}
        <div
          className={cn(
            "h-1 w-full",
            paper.status === "specimen" && "bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400",
            paper.status === "generated" && "bg-emerald-500",
            paper.status === "draft" && "bg-amber-500",
          )}
        />
        <CollapsibleTrigger className="w-full text-left">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              {/* paper icon */}
              <div className="h-11 w-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-indigo-300" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono">{paper.paperCode}</Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wider",
                      paper.status === "specimen" && "border-indigo-500/40 text-indigo-300",
                      paper.status === "generated" && "border-emerald-500/40 text-emerald-300",
                      paper.status === "draft" && "border-amber-500/40 text-amber-300",
                    )}
                  >
                    {paper.status === "specimen" ? (
                      <><Pin className="h-2.5 w-2.5 mr-0.5" /> Official Specimen</>
                    ) : paper.status === "generated" ? "Generated" : "Draft"}
                  </Badge>
                  {!validation.valid && (
                    <Badge variant="outline" className="text-[10px] border-red-500/40 text-red-300">
                      <AlertTriangle className="h-2.5 w-2.5 mr-0.5" /> Blueprint error
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight">
                  Paper {paper.paperNumber} — {paper.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {paper.practiceSetLabel} · {paper.status === "specimen" ? "Specimen" : `Generated ${formatDate(paper.createdAt)}`}
                </p>

                {paper.focus.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-foreground font-medium">Focus:</span> {paper.focus.join(", ")}
                  </p>
                )}

                {/* blueprint strip */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {blueprintStrip(paper.paperNumber).split("·").map((seg, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded-md border",
                        i % 2 === 1 ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" : "bg-muted/40 border-border text-muted-foreground",
                      )}
                    >
                      {seg.trim()}
                    </span>
                  ))}
                </div>

                {/* per-question chips — format matches validator: Q1·2, Q31·10 etc. */}
                <div className="flex flex-wrap items-center gap-1 mt-2" data-testid="mark-chips">
                  {questionMarkChips(paper.paperNumber).map((c, i) => {
                    const compact = `${c.label}·${c.sub.replace(/\s*\(.*\)\s*/g, "").trim()}`;
                    return (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground font-mono"
                        data-chip={compact}
                      >
                        <span className="text-foreground font-semibold">{c.label}</span>
                        <span className="opacity-50">·</span>
                        <span>{c.sub}</span>
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3">
                  <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> {paper.totalMarks} marks</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2h</span>
                </div>
              </div>

              <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0 mt-1", open && "rotate-180")} />
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 pb-5 -mt-1">
            {!validation.valid && (
              <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> This paper does not conform to the AQA blueprint
                </div>
                <ul className="list-disc list-inside space-y-0.5">
                  {validation.issues.slice(0, 4).map((i, idx) => <li key={idx}>{i.message}</li>)}
                </ul>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-2">
              <ResourceButton
                icon={FileText}
                label="QP — Question Paper"
                onClick={() => navigate(`/papers/${paper.id}/attempt`)}
                disabled={!validation.valid}
              />
              <ResourceButton
                icon={BookOpen}
                label={paper.paperNumber === 3 ? "Case study booklet" : "IN — Insert (extracts)"}
                onClick={() => navigate(`/papers/${paper.id}/attempt?view=insert`)}
                disabled={!validation.valid}
              />
              <ResourceButton
                icon={ClipboardList}
                label="MS — Mark Scheme"
                onClick={() => navigate(`/papers/${paper.id}/attempt?view=markscheme`)}
                disabled={!validation.valid}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => navigate(`/papers/${paper.id}/attempt`)}
                className="text-xs text-indigo-300 hover:text-indigo-200 font-medium underline-offset-4 hover:underline"
              >
                Start timed attempt (2h) →
              </button>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  title="Regenerate"
                  onClick={(e) => { e.stopPropagation(); /* hook later */ }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  title="Duplicate"
                  onClick={(e) => { e.stopPropagation(); /* hook later */ }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function ResourceButton({
  icon: Icon, label, onClick, disabled,
}: {
  icon: typeof FileText; label: string; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium transition-colors",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5 text-indigo-300" />
      <span>{label}</span>
    </button>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}
