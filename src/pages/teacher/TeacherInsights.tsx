import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Prediction {
  student_id: string;
  email: string;
  display_name: string | null;
  sample_size: number;
  recent_avg: number;
  predicted_grade: string | null;
  trend: "improving" | "steady" | "declining" | "insufficient";
  target_grade: string | null;
}

const trendIcon = {
  improving: <TrendingUp className="h-3.5 w-3.5 text-success" />,
  declining: <TrendingDown className="h-3.5 w-3.5 text-destructive" />,
  steady: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
  insufficient: <Minus className="h-3.5 w-3.5 text-muted-foreground/50" />,
} as const;

export default function TeacherInsights() {
  const { classId } = useParams<{ classId: string }>();
  const [cls, setCls] = useState<any>(null);
  const [rows, setRows] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    if (!classId) return;
    setLoading(true);
    const [{ data: c }, { data: p, error }] = await Promise.all([
      supabase.from("classes").select("*").eq("id", classId).maybeSingle(),
      supabase.rpc("get_class_predictions", { _class_id: classId }),
    ]);
    if (error) toast({ title: "Could not load predictions", description: error.message, variant: "destructive" });
    setCls(c);
    setRows((p as Prediction[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [classId]);

  const persist = async () => {
    if (!classId) return;
    setRefreshing(true);
    const { data, error } = await supabase.rpc("refresh_class_predictions", { _class_id: classId });
    setRefreshing(false);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Predictions saved", description: `${data ?? 0} student grades updated.` });
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!cls) return <div className="p-8 text-sm text-muted-foreground">Class not found.</div>;

  const onTrack = rows.filter((r) => r.predicted_grade && r.target_grade && gradeIndex(r.predicted_grade) <= gradeIndex(r.target_grade)).length;
  const offTrack = rows.filter((r) => r.predicted_grade && r.target_grade && gradeIndex(r.predicted_grade) > gradeIndex(r.target_grade)).length;
  const noData = rows.filter((r) => !r.predicted_grade).length;

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <Link to={`/teacher/classes/${classId}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> {cls.name}
      </Link>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Predicted grades</h1>
          <p className="text-sm text-muted-foreground mt-1">Based on the last 60 days of practice and diagram marking.</p>
        </div>
        <Button onClick={persist} disabled={refreshing} className="gap-1.5">
          {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Save predictions
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">On track</p><p className="text-2xl font-bold text-success mt-1">{onTrack}</p></Card>
        <Card className="p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Below target</p><p className="text-2xl font-bold text-destructive mt-1">{offTrack}</p></Card>
        <Card className="p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Insufficient data</p><p className="text-2xl font-bold text-muted-foreground mt-1">{noData}</p></Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Sample</th>
                <th className="px-5 py-3 font-medium">Avg %</th>
                <th className="px-5 py-3 font-medium">Predicted</th>
                <th className="px-5 py-3 font-medium">Target</th>
                <th className="px-5 py-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-xs text-muted-foreground">No students in this class yet.</td></tr>
              )}
              {rows.map((r) => {
                const off = r.predicted_grade && r.target_grade && gradeIndex(r.predicted_grade) > gradeIndex(r.target_grade);
                return (
                  <tr key={r.student_id} className="border-t border-border/60">
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{r.display_name ?? r.email.split("@")[0]}</p>
                      <p className="text-[11px] text-muted-foreground">{r.email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.sample_size}</td>
                    <td className="px-5 py-3 font-mono text-foreground">{r.sample_size > 0 ? `${r.recent_avg}%` : "—"}</td>
                    <td className="px-5 py-3">
                      {r.predicted_grade ? (
                        <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded ${off ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"}`}>
                          {r.predicted_grade}
                        </span>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">{r.target_grade ?? "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground capitalize flex items-center gap-1.5">
                      {trendIcon[r.trend]} {r.trend}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Lower index = better grade
function gradeIndex(g: string): number {
  const order = ["A*", "A", "B", "C", "D", "E", "U", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
  const i = order.indexOf(g);
  return i === -1 ? 99 : i;
}
