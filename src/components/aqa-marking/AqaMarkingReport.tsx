import { useMemo } from "react";
import { Download, Trophy, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  AQA_GRADE_BOUNDARIES,
  gradeFromMark,
  latestVerifiedSeries,
  proRataPaper,
  seriesLabel,
} from "@/lib/aqa-grade-boundaries";
import {
  aggregateKaae,
  type KaaeSelfScore,
} from "@/lib/aqa-marking-engine";
import { cn } from "@/lib/utils";

export interface MarkedQuestion {
  questionNumber: number;
  totalMarks: number;
  marksAwarded: number;
  tier: "auto" | "self" | "ai";
  levelReached?: number;
  topic?: string;
  notes?: string;
}

interface Props {
  paperTitle: string;
  paperCode: string;
  attemptedAt: string;
  durationSeconds?: number;
  questionResults: MarkedQuestion[];
  kaaeScores: KaaeSelfScore[];
  /** Topic → suggested specification reference for revision targets. */
  weakTopics?: { topic: string; specRef?: string; suggestion: string }[];
  studentName?: string;
  onExportPdf?: () => void;
}

const SKILL_LABEL: Record<string, string> = {
  K: "Knowledge",
  App: "Application",
  An: "Analysis",
  Eval: "Evaluation",
};

export function AqaMarkingReport({
  paperTitle,
  paperCode,
  attemptedAt,
  durationSeconds,
  questionResults,
  kaaeScores,
  weakTopics = [],
  studentName,
  onExportPdf,
}: Props) {
  const totalAwarded = questionResults.reduce((s, q) => s + q.marksAwarded, 0);
  const totalAvailable = questionResults.reduce((s, q) => s + q.totalMarks, 0);
  const pct = totalAvailable > 0 ? Math.round((totalAwarded / totalAvailable) * 100) : 0;

  const verified = latestVerifiedSeries();
  const paperBounds = verified ? proRataPaper(verified.boundaries, 80) : null;
  const grade = paperBounds ? gradeFromMark(totalAwarded, paperBounds) : "·";

  const kaae = useMemo(() => aggregateKaae(kaaeScores), [kaaeScores]);
  const radarData = (Object.keys(SKILL_LABEL) as Array<keyof typeof SKILL_LABEL>).map((k) => ({
    skill: SKILL_LABEL[k],
    value: kaae[k as keyof typeof kaae],
  }));

  const fmtDuration = (s?: number) => {
    if (!s) return "·";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="space-y-6" id="aqa-marking-report">
      {/* Header */}
      <div className="rounded-2xl border border-indigo-500/30 bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-mono text-muted-foreground">{paperCode}</div>
            <h1 className="text-2xl font-bold text-foreground mt-0.5 tracking-tight">{paperTitle}</h1>
            <div className="text-xs text-muted-foreground mt-1.5 flex flex-wrap gap-3">
              {studentName && <span>Student: <span className="text-foreground/80">{studentName}</span></span>}
              <span>Attempted: <span className="text-foreground/80">{new Date(attemptedAt).toLocaleString()}</span></span>
              <span>Time taken: <span className="text-foreground/80">{fmtDuration(durationSeconds)}</span></span>
            </div>
          </div>
          {onExportPdf && (
            <Button onClick={onExportPdf} size="sm" variant="outline" className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export PDF
            </Button>
          )}
        </div>
      </div>

      {/* Score + grade */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Self-reported mark
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {totalAwarded}
            <span className="text-base text-muted-foreground"> / {totalAvailable}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">{pct}%</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Indicative grade
          </div>
          <div className={cn(
            "text-3xl font-extrabold font-mono",
            grade === "A*" || grade === "A" ? "text-emerald-300" :
            grade === "B" ? "text-cyan-300" :
            grade === "C" ? "text-amber-300" :
            grade === "U" ? "text-muted-foreground" : "text-red-300",
          )}>{grade}</div>
          {verified && (
            <div className="text-[11px] text-muted-foreground mt-1">
              Pro-rata of {seriesLabel(verified.series)} boundaries
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Pro-rata boundaries (this paper)
          </div>
          {paperBounds ? (
            <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-xs font-mono">
              {(["A*", "A", "B", "C", "D", "E"] as const).map((g) => (
                <div key={g} className="flex justify-between">
                  <span className="text-muted-foreground">{g}</span>
                  <span className="text-foreground">{paperBounds[g]}/80</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No verified boundaries available.</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-[11px] text-amber-200">
        <strong>Indicative only</strong> · real grade boundaries apply across the full
        qualification (all three papers combined), not a single paper.
      </div>

      {/* Per-question table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <Trophy className="h-4 w-4 text-indigo-300" />
          <h2 className="text-sm font-bold text-foreground">Per-question breakdown</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Q</TableHead>
              <TableHead>Mark</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionResults.map((q) => (
              <TableRow key={q.questionNumber}>
                <TableCell className="font-mono text-xs">{q.questionNumber}</TableCell>
                <TableCell className="font-mono text-xs">
                  {q.marksAwarded}/{q.totalMarks}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      q.tier === "auto" && "border-emerald-500/40 text-emerald-200",
                      q.tier === "self" && "border-amber-500/40 text-amber-200",
                      q.tier === "ai" && "border-purple-500/40 text-purple-200",
                    )}
                  >
                    {q.tier}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {q.levelReached ? `L${q.levelReached}` : "·"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{q.notes || "·"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* KAA+E radar */}
      <div className="grid md:grid-cols-[1fr_1fr] gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5" /> KAA + E skills profile
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Radar dataKey="value" stroke="#818cf8" fill="#818cf8" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {(Object.keys(SKILL_LABEL) as Array<keyof typeof SKILL_LABEL>).map((k) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted-foreground">{SKILL_LABEL[k]}</span>
                <span className="font-mono text-foreground">{kaae[k as keyof typeof kaae]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revision targets */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Revision targets
          </div>
          {weakTopics.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No specific weak topics identified · keep practising mixed papers.
            </p>
          ) : (
            <ul className="space-y-2">
              {weakTopics.slice(0, 5).map((t, i) => (
                <li key={i} className="rounded-lg bg-muted/30 border border-border p-2.5">
                  <div className="text-sm font-semibold text-foreground">{t.topic}</div>
                  {t.specRef && (
                    <div className="text-[10px] font-mono text-indigo-300 mt-0.5">
                      Spec: {t.specRef}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {t.suggestion}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
