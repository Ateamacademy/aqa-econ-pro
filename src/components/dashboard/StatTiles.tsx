import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Flame, FileText, Target, TrendingUp, ArrowRight, Info } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { StudentDashboardState } from "@/hooks/useDashboardState";
import { cn } from "@/lib/utils";

type TileKey = "readiness" | "grade" | "streak" | "papers" | null;

interface Props {
  state: StudentDashboardState;
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  // Lightweight count-up using framer-motion
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-3xl font-bold text-foreground font-mono"
    >
      {value}
      {suffix}
    </motion.span>
  );
}

export default function StatTiles({ state }: Props) {
  const [open, setOpen] = useState<TileKey>(null);

  const r = state.readinessScore;
  const tiles: Array<{
    key: Exclude<TileKey, null>;
    label: string;
    value: string;
    sub: string;
    subTone?: string;
    icon: typeof Flame;
  }> = [
    {
      key: "readiness",
      label: "Readiness Score",
      value: `${r.value}`,
      sub:
        r.weeklyChange === 0
          ? "Steady this week"
          : `${r.weeklyChange > 0 ? "↑" : "↓"} ${Math.abs(r.weeklyChange)} pts this week`,
      subTone: r.weeklyChange > 0 ? "text-success" : r.weeklyChange < 0 ? "text-destructive" : "text-muted-foreground",
      icon: Target,
    },
    {
      key: "grade",
      label: "Trending towards",
      value: state.predictedGrade.letter,
      sub: state.predictedGrade.basedOnPapers > 0 ? `From ${state.predictedGrade.basedOnPapers} paper${state.predictedGrade.basedOnPapers === 1 ? "" : "s"}` : "Complete a paper",
      icon: TrendingUp,
    },
    {
      key: "streak",
      label: "Study Streak",
      value: `${state.streakDays}`,
      sub: state.streakDays === 0 ? "Start one today" : state.streakDays === 1 ? "1 day" : `${state.streakDays} days running`,
      icon: Flame,
    },
    {
      key: "papers",
      label: "Papers Completed",
      value: `${state.papersCompleted}`,
      sub: `Out of ${state.totalGeneratedPapers} available`,
      icon: FileText,
    },
  ];

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setOpen(t.key)}
              className="rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.1)] focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ borderTopWidth: "2px", borderTopColor: "hsl(var(--primary))" }}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <Info className="h-3 w-3 text-muted-foreground/40" />
              </div>
              <CountUp value={parseInt(t.value, 10) || 0} />
              <p className="text-[10px] text-muted-foreground mt-0.5">{t.label}</p>
              {t.sub && <p className={cn("text-[10px] mt-1 font-medium", t.subTone || "text-muted-foreground")}>{t.sub}</p>}
            </button>
          );
        })}
      </motion.div>

      <Sheet open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="right" className="w-full sm:max-w-[440px] overflow-y-auto bg-card border-border">
          {open === "readiness" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-foreground">Readiness Score breakdown</SheetTitle>
                <SheetDescription>
                  How your {r.value}% readiness is built up. The largest contributor is also the biggest opportunity.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                {state.breakdown.totalContribution.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground font-medium">{c.label}</span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {c.value}/100 · weight {c.weight}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-popover overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${c.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-primary mb-1">
                  Biggest opportunity
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  {(() => {
                    const lowest = [...state.breakdown.totalContribution].sort((a, b) => a.value - b.value)[0];
                    if (!lowest || lowest.value >= 80) return "You're scoring strongly across every component. Keep it up.";
                    return `Your lowest component is ${lowest.label} (${lowest.value}/100). Improving here gains the most ground per session.`;
                  })()}
                </p>
              </div>
              <Link
                to="/predicted"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Open Predicted Papers <ArrowRight className="h-3 w-3" />
              </Link>
            </>
          )}

          {open === "grade" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-foreground">Trending towards: {state.predictedGrade.letter}</SheetTitle>
                <SheetDescription>
                  Based on average performance across your last {state.predictedGrade.basedOnPapers} predicted paper
                  {state.predictedGrade.basedOnPapers === 1 ? "" : "s"}.
                </SheetDescription>
              </SheetHeader>
              {state.paperAttempts.length === 0 ? (
                <div className="mt-6 text-center py-10 rounded-xl border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">Complete your first predicted paper to see your trend.</p>
                </div>
              ) : (
                <div className="mt-6 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={state.paperAttempts.map((p) => ({ ...p, dateLabel: fmt(p.date) }))}>
                      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="dateLabel" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 80]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }}
                      />
                      <Line type="monotone" dataKey="marksAwarded" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="mt-4 rounded-xl border border-warning/20 bg-warning/5 p-3 text-[11px] text-muted-foreground leading-relaxed">
                <strong className="text-warning">Indicative only.</strong> AQA grade boundaries apply to the full
                qualification (all three papers, out of 240 marks). Per-paper estimates here divide the Summer 2024
                full-qualification boundaries by 3.
              </div>
              {state.paperAttempts.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                    Papers driving this prediction
                  </p>
                  <ul className="space-y-1">
                    {state.paperAttempts.slice(-3).reverse().map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/predicted"
                          className="flex items-center justify-between text-xs text-foreground hover:text-primary py-1.5 px-2 rounded hover:bg-popover/40 transition"
                        >
                          <span className="truncate">{p.topic}</span>
                          <span className="font-mono text-muted-foreground shrink-0 ml-2">
                            {p.marksAwarded}/{p.totalMarks}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {open === "streak" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-foreground">Study streak</SheetTitle>
                <SheetDescription>
                  {state.streakDays === 0
                    ? "Start a 5-minute practice session today to begin your streak."
                    : `You've studied ${Math.min(state.streakDays, 14)} of the last 14 days.`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 grid grid-cols-7 gap-1">
                {Array.from({ length: 90 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (89 - i));
                  const key = d.toISOString().slice(0, 10);
                  const lit = state.recentActivity.some((a) => a.date.slice(0, 10) === key);
                  return (
                    <div
                      key={i}
                      title={key}
                      className={cn(
                        "h-3 rounded-sm",
                        lit ? "bg-primary/80" : "bg-popover",
                      )}
                    />
                  );
                })}
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground">
                Last 90 days · {state.recentActivity.length === 0 ? "No activity yet" : "Lit cells = days with at least one session"}
              </p>
              {state.streakDays === 0 && (
                <Link
                  to="/practice"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:bg-primary/90"
                >
                  Start a 5-minute session <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </>
          )}

          {open === "papers" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-foreground">Papers completed</SheetTitle>
                <SheetDescription>
                  {state.papersCompleted} of {state.totalGeneratedPapers} available papers submitted with marking.
                </SheetDescription>
              </SheetHeader>
              {state.paperAttempts.length === 0 ? (
                <div className="mt-6 text-center py-8 rounded-xl border border-dashed border-border">
                  <p className="text-sm text-muted-foreground mb-3">No papers completed yet.</p>
                  <Link
                    to="/predicted"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:bg-primary/90"
                  >
                    Try your first predicted paper <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <ul className="mt-6 space-y-2">
                  {state.paperAttempts.slice().reverse().map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-popover/40 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-foreground truncate">{p.topic}</p>
                        <p className="text-[10px] text-muted-foreground">{fmt(p.date)}</p>
                      </div>
                      <span className="text-xs font-mono text-primary shrink-0 ml-2">
                        {p.marksAwarded}/{p.totalMarks}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to="/history"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Open paper history <ArrowRight className="h-3 w-3" />
              </Link>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
