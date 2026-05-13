import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sparkles, TrendingUp, TrendingDown, Minus, ChevronRight, RefreshCw, Activity,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Pred = {
  student_id: string;
  email: string;
  display_name: string | null;
  sample_size: number;
  recent_avg: number;
  predicted_grade: string | null;
  trend: "improving" | "steady" | "declining" | "insufficient";
  target_grade: string | null;
  class_id: string;
  class_name: string;
};

const trendIcon = {
  improving: <TrendingUp className="h-3.5 w-3.5 text-success" />,
  declining: <TrendingDown className="h-3.5 w-3.5 text-destructive" />,
  steady: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
  insufficient: <Minus className="h-3.5 w-3.5 text-muted-foreground/50" />,
} as const;

export default function TeacherInsightsAll() {
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [rows, setRows] = useState<Pred[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data: cls } = await supabase.from("classes").select("id, name").order("name");
    const list = (cls ?? []) as { id: string; name: string }[];
    setClasses(list);
    if (list.length === 0) { setRows([]); setLoading(false); return; }

    const all: Pred[] = [];
    for (const c of list) {
      const { data, error } = await supabase.rpc("get_class_predictions", { _class_id: c.id });
      if (error) continue;
      ((data as any[]) ?? []).forEach((p: any) => all.push({ ...p, class_id: c.id, class_name: c.name }));
    }
    setRows(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() =>
    rows.filter((r) => filterClass === "all" || r.class_id === filterClass),
    [rows, filterClass]
  );

  const counts = useMemo(() => {
    const scored = filtered.filter((r) => r.trend !== "insufficient");
    const distribution = new Map<string, number>();
    scored.forEach((r) => {
      if (!r.predicted_grade) return;
      distribution.set(r.predicted_grade, (distribution.get(r.predicted_grade) ?? 0) + 1);
    });
    const above = scored.filter((r) => r.target_grade && r.predicted_grade && r.predicted_grade <= r.target_grade).length;
    const below = scored.filter((r) => r.target_grade && r.predicted_grade && r.predicted_grade > r.target_grade).length;
    const improving = scored.filter((r) => r.trend === "improving").length;
    const declining = scored.filter((r) => r.trend === "declining").length;
    return { distribution, above, below, improving, declining, total: scored.length };
  }, [filtered]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1300px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
            <Sparkles className="h-3.5 w-3.5" /> Insights
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Cohort insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Predicted grades and momentum across every class.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterClass} onValueChange={setFilterClass}>
            <SelectTrigger className="h-9 w-[200px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh</Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Students predicted" value={counts.total} />
        <Stat label="On / above target" value={counts.above} />
        <Stat label="Below target" value={counts.below} />
        <Stat label="Improving / declining" value={`${counts.improving} / ${counts.declining}`} />
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Predicted grade distribution</h2>
        </div>
        {counts.distribution.size === 0 ? (
          <p className="text-xs text-muted-foreground">Not enough data yet.</p>
        ) : (
          <div className="space-y-2">
            {Array.from(counts.distribution.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([grade, n]) => {
              const pct = Math.round((n / counts.total) * 100);
              return (
                <div key={grade} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-mono font-bold text-foreground">{grade}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-16 text-right text-xs text-muted-foreground">{n} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">All students</h2>
        </div>
        {loading ? (
          <div className="p-5 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              {classes.length === 0
                ? <>No classes yet. <Link to="/teacher/classes" className="text-primary underline">Create one</Link>.</>
                : "No predictions available yet — students need a few attempts first."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Class</th>
                  <th className="px-5 py-3 font-medium">Predicted</th>
                  <th className="px-5 py-3 font-medium">Target</th>
                  <th className="px-5 py-3 font-medium">Recent avg</th>
                  <th className="px-5 py-3 font-medium">Trend</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={`${r.class_id}-${r.student_id}`} className="border-t border-border/60 hover:bg-muted/20">
                    <td className="px-5 py-3 font-medium text-foreground">{r.display_name ?? r.email ?? r.student_id.slice(0, 8)}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.class_name}</td>
                    <td className="px-5 py-3 font-mono font-bold text-foreground">{r.predicted_grade ?? "—"}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">{r.target_grade ?? "—"}</td>
                    <td className="px-5 py-3">{r.recent_avg ? `${Math.round(r.recent_avg)}%` : "—"}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs capitalize text-muted-foreground">
                        {trendIcon[r.trend]} {r.trend}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                        <Link to={`/teacher/classes/${r.class_id}/insights`}>Class <ChevronRight className="h-3 w-3" /></Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-foreground">{value}</p>
    </Card>
  );
}
