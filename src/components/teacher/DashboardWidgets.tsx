import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sparkles, AlertTriangle, ClipboardCheck, TrendingUp, TrendingDown,
  Flame, Target, ArrowRight, Activity, Layers,
} from "lucide-react";

/* ---------------- AO Breakdown ---------------- */

export function AOBreakdownWidget({ assignmentIds }: { assignmentIds: string[] }) {
  const [data, setData] = useState<{ ao: string; avg: number; n: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!assignmentIds.length) { setData([]); setLoading(false); return; }
      const { data: subs } = await supabase
        .from("homework_submissions")
        .select("ao_breakdown_json")
        .in("assignment_id", assignmentIds)
        .not("ao_breakdown_json", "is", null);

      const acc: Record<string, { sum: number; n: number }> = {
        AO1: { sum: 0, n: 0 }, AO2: { sum: 0, n: 0 }, AO3: { sum: 0, n: 0 }, AO4: { sum: 0, n: 0 },
      };
      (subs ?? []).forEach((s: any) => {
        const ao = s.ao_breakdown_json || {};
        ["AO1", "AO2", "AO3", "AO4"].forEach((k) => {
          const v = ao[k];
          if (typeof v === "number") { acc[k].sum += v; acc[k].n += 1; }
          else if (v && typeof v.percent === "number") { acc[k].sum += v.percent; acc[k].n += 1; }
        });
      });
      setData(["AO1", "AO2", "AO3", "AO4"].map((k) => ({
        ao: k, avg: acc[k].n ? Math.round(acc[k].sum / acc[k].n) : 0, n: acc[k].n,
      })));
      setLoading(false);
    })();
  }, [assignmentIds.join(",")]);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Assessment objective breakdown</h3>
      </div>
      {loading ? (
        <p className="text-xs text-muted-foreground">Loading…</p>
      ) : data.every((d) => d.n === 0) ? (
        <p className="text-xs text-muted-foreground">No marked submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.ao}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-foreground">{d.ao}</span>
                <span className="text-muted-foreground">{d.n === 0 ? "—" : `${d.avg}%`}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.avg >= 70 ? "bg-emerald-500" : d.avg >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                  style={{ width: `${d.avg}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ---------------- Topic Heatmap ---------------- */

export function TopicHeatmapWidget({ studentIds }: { studentIds: string[] }) {
  const [topics, setTopics] = useState<{ topic: string; avg: number; n: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!studentIds.length) { setTopics([]); setLoading(false); return; }
      const { data } = await supabase
        .from("practice_sessions")
        .select("topic, score_percent")
        .in("user_id", studentIds)
        .not("score_percent", "is", null)
        .gte("created_at", new Date(Date.now() - 60 * 86400 * 1000).toISOString())
        .limit(2000);

      const acc: Record<string, { sum: number; n: number }> = {};
      (data ?? []).forEach((r: any) => {
        const t = (r.topic ?? "Unspecified").toString();
        if (!acc[t]) acc[t] = { sum: 0, n: 0 };
        acc[t].sum += Number(r.score_percent);
        acc[t].n += 1;
      });
      const rows = Object.entries(acc)
        .map(([topic, v]) => ({ topic, avg: Math.round(v.sum / v.n), n: v.n }))
        .filter((r) => r.n >= 2)
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 8);
      setTopics(rows);
      setLoading(false);
    })();
  }, [studentIds.join(",")]);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Weakest topics (last 60 days)</h3>
      </div>
      {loading ? (
        <p className="text-xs text-muted-foreground">Loading…</p>
      ) : topics.length === 0 ? (
        <p className="text-xs text-muted-foreground">Not enough practice data yet.</p>
      ) : (
        <div className="space-y-2">
          {topics.map((t) => (
            <div key={t.topic} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{t.topic}</p>
                <p className="text-[10px] text-muted-foreground">{t.n} attempts</p>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${t.avg >= 70 ? "bg-emerald-500" : t.avg >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                  style={{ width: `${t.avg}%` }}
                />
              </div>
              <span className="text-xs font-semibold w-10 text-right text-foreground">{t.avg}%</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ---------------- Insights Feed ---------------- */

export type FeedInput = {
  classes: { id: string; name: string }[];
  studentIds: string[];
  awaitingReview: number;
  atRiskCount: number;
  homeworkCompletion: number;
  topPerformerName?: string | null;
  decliningCount: number;
};

export function InsightsFeed({ input }: { input: FeedInput }) {
  const items = useMemo(() => {
    const list: { icon: any; tone: string; title: string; body: string; cta?: { label: string; to: string } }[] = [];

    if (input.awaitingReview > 0) {
      list.push({
        icon: ClipboardCheck, tone: "text-primary",
        title: `${input.awaitingReview} submission${input.awaitingReview === 1 ? "" : "s"} awaiting review`,
        body: "AI marks are ready for your sign-off.",
        cta: input.classes[0] ? { label: "Review now", to: `/teacher/classes/${input.classes[0].id}` } : undefined,
      });
    }
    if (input.atRiskCount > 0) {
      list.push({
        icon: AlertTriangle, tone: "text-rose-400",
        title: `${input.atRiskCount} student${input.atRiskCount === 1 ? "" : "s"} at risk`,
        body: "Average below 50%. Consider targeted practice or 1:1 intervention.",
        cta: input.classes[0] ? { label: "View cohort", to: `/teacher/classes/${input.classes[0].id}` } : undefined,
      });
    }
    if (input.decliningCount > 0) {
      list.push({
        icon: TrendingDown, tone: "text-amber-400",
        title: `${input.decliningCount} student${input.decliningCount === 1 ? "" : "s"} trending down`,
        body: "Recent scores have dropped meaningfully vs. prior fortnight.",
      });
    }
    if (input.homeworkCompletion < 60 && input.classes.length > 0) {
      list.push({
        icon: Activity, tone: "text-amber-400",
        title: `Homework completion at ${input.homeworkCompletion}%`,
        body: "Send a nudge or extend the deadline to lift completion.",
        cta: { label: "Manage homework", to: "/teacher/homework" },
      });
    }
    if (input.topPerformerName) {
      list.push({
        icon: Target, tone: "text-emerald-400",
        title: `Stretch ${input.topPerformerName}`,
        body: "Top performer — assign a harder predicted paper or 25-mark essay.",
        cta: { label: "Set homework", to: "/teacher/homework" },
      });
    }
    if (list.length === 0) {
      list.push({
        icon: Sparkles, tone: "text-primary",
        title: "Cohort looks healthy",
        body: "No urgent actions. Consider a stretch homework or progress check.",
      });
    }
    return list;
  }, [input]);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Next best actions</h3>
      </div>
      <ul className="divide-y divide-border">
        {items.map((it, i) => (
          <li key={i} className="px-5 py-4 flex items-start gap-3 hover:bg-muted/20">
            <it.icon className={`h-4 w-4 mt-0.5 ${it.tone}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{it.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{it.body}</p>
            </div>
            {it.cta && (
              <Button asChild size="sm" variant="ghost" className="shrink-0">
                <Link to={it.cta.to}>
                  {it.cta.label} <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- Recent Activity ---------------- */

export function RecentActivityWidget({ studentIds, nameMap }: { studentIds: string[]; nameMap: Map<string, string | null> }) {
  const [rows, setRows] = useState<{ user_id: string; topic: string; score: number | null; at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!studentIds.length) { setRows([]); setLoading(false); return; }
      const { data } = await supabase
        .from("practice_sessions")
        .select("user_id, topic, score_percent, created_at")
        .in("user_id", studentIds)
        .order("created_at", { ascending: false })
        .limit(10);
      setRows((data ?? []).map((r: any) => ({
        user_id: r.user_id,
        topic: r.topic ?? "—",
        score: r.score_percent,
        at: r.created_at,
      })));
      setLoading(false);
    })();
  }, [studentIds.join(",")]);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Recent activity</h3>
      </div>
      {loading ? (
        <p className="text-xs text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-xs text-muted-foreground">No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => (
            <li key={i} className="flex items-center gap-3 text-xs">
              <span className="flex-1 min-w-0 truncate text-foreground">
                {nameMap.get(r.user_id) ?? r.user_id.slice(0, 8)} · <span className="text-muted-foreground">{r.topic}</span>
              </span>
              <span className={`font-semibold ${r.score == null ? "text-muted-foreground" : r.score >= 70 ? "text-emerald-400" : r.score >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                {r.score == null ? "—" : `${r.score}%`}
              </span>
              <span className="text-muted-foreground w-16 text-right">{timeAgo(r.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
