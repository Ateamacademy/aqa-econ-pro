import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users, ClipboardCheck, AlertTriangle, TrendingUp, Activity, GraduationCap, Sparkles,
} from "lucide-react";

type Metrics = {
  totalStudents: number;
  activeClasses: number;
  homeworkCompletion: number;
  avgGrade: number | null;
  awaitingReview: number;
  atRisk: number;
};

type StudentRow = {
  user_id: string;
  display_name: string | null;
  email: string | null;
  avg_score: number | null;
  attempts: number;
  trend: number[];
};

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metrics>({
    totalStudents: 0, activeClasses: 0, homeworkCompletion: 0,
    avgGrade: null, awaitingReview: 0, atRisk: 0,
  });
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      // Classes I teach
      const { data: classes } = await supabase
        .from("classes").select("id, name").eq("teacher_id", user.id);
      const classIds = (classes ?? []).map((c: any) => c.id);

      // Roster
      let studentIds: string[] = [];
      if (classIds.length) {
        const { data: roster } = await supabase
          .from("class_students").select("student_id").in("class_id", classIds);
        studentIds = Array.from(new Set((roster ?? []).map((r: any) => r.student_id)));
      }

      // Homework metrics
      let awaitingReview = 0;
      let homeworkCompletion = 0;
      if (classIds.length) {
        const { data: assignments } = await supabase
          .from("homework_assignments").select("id").in("class_id", classIds);
        const assignmentIds = (assignments ?? []).map((a: any) => a.id);
        if (assignmentIds.length) {
          const { data: subs } = await supabase
            .from("homework_submissions").select("id, status").in("assignment_id", assignmentIds);
          const submitted = (subs ?? []).filter((s: any) => s.submitted_at !== null || s.status !== "pending").length;
          awaitingReview = (subs ?? []).filter((s: any) => s.status === "ai_marked").length;
          const expected = assignmentIds.length * Math.max(1, studentIds.length);
          homeworkCompletion = expected ? Math.round((submitted / expected) * 100) : 0;
        }
      }

      // Practice sessions for analytics
      const studentRows: StudentRow[] = [];
      let avgGradeAcc = 0; let avgGradeN = 0; let atRisk = 0;

      if (studentIds.length) {
        const { data: sessions } = await supabase
          .from("practice_sessions")
          .select("user_id, score_percent, created_at")
          .in("user_id", studentIds)
          .order("created_at", { ascending: false })
          .limit(2000);

        // Profile names
        const { data: profiles } = await supabase
          .from("profiles").select("user_id, display_name").in("user_id", studentIds);
        const nameMap = new Map<string, string | null>();
        (profiles ?? []).forEach((p: any) => nameMap.set(p.user_id, p.display_name));

        for (const sid of studentIds) {
          const userSessions = (sessions ?? []).filter((s: any) => s.user_id === sid && s.score_percent != null);
          const recent = userSessions.slice(0, 8).map((s: any) => Number(s.score_percent));
          const avg = recent.length ? Math.round(recent.reduce((a, b) => a + b, 0) / recent.length) : null;
          if (avg !== null) { avgGradeAcc += avg; avgGradeN++; }
          if (avg !== null && avg < 50) atRisk++;
          studentRows.push({
            user_id: sid,
            display_name: nameMap.get(sid) ?? null,
            email: null,
            avg_score: avg,
            attempts: userSessions.length,
            trend: recent.slice(0, 6).reverse(),
          });
        }
      }

      setMetrics({
        totalStudents: studentIds.length,
        activeClasses: classIds.length,
        homeworkCompletion,
        avgGrade: avgGradeN ? Math.round(avgGradeAcc / avgGradeN) : null,
        awaitingReview,
        atRisk,
      });
      setStudents(studentRows.sort((a, b) => (b.avg_score ?? -1) - (a.avg_score ?? -1)));
      setLoading(false);
    })();
  }, [user]);

  const tiles = [
    { icon: Users, label: "Total students", value: metrics.totalStudents },
    { icon: GraduationCap, label: "Active classes", value: metrics.activeClasses },
    { icon: ClipboardCheck, label: "Homework completion", value: `${metrics.homeworkCompletion}%` },
    { icon: TrendingUp, label: "Avg cohort score", value: metrics.avgGrade == null ? "—" : `${metrics.avgGrade}%` },
    { icon: Activity, label: "Awaiting review", value: metrics.awaitingReview },
    { icon: AlertTriangle, label: "Students at risk", value: metrics.atRisk },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">An at-a-glance view of your cohort.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline"><Link to="/teacher/classes">Manage classes</Link></Button>
          <Button asChild size="sm"><Link to="/teacher/homework">Set homework</Link></Button>
        </div>
      </div>

      {/* Metric strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tiles.map((t) => (
          <Card key={t.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <t.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{t.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{t.label}</p>
          </Card>
        ))}
      </div>

      {/* Performance table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Student performance overview</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pulled live from practice sessions.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Avg score</th>
                <th className="px-5 py-3 font-medium">Trend</th>
                <th className="px-5 py-3 font-medium">Attempts</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-muted-foreground">Loading…</td></tr>
              )}
              {!loading && students.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-xs text-muted-foreground">
                  No students yet. <Link to="/teacher/classes" className="text-primary underline">Create a class</Link> and invite students.
                </td></tr>
              )}
              {students.map((s) => {
                const max = Math.max(1, ...s.trend);
                const status =
                  s.avg_score == null ? { label: "No data", cls: "bg-muted text-muted-foreground" }
                  : s.avg_score >= 70 ? { label: "On track", cls: "bg-emerald-500/15 text-emerald-400" }
                  : s.avg_score >= 50 ? { label: "Watch", cls: "bg-amber-500/15 text-amber-400" }
                  : { label: "At risk", cls: "bg-rose-500/15 text-rose-400" };
                return (
                  <tr key={s.user_id} className="border-t border-border/60 hover:bg-muted/20">
                    <td className="px-5 py-3 font-medium text-foreground">{s.display_name ?? s.user_id.slice(0, 8)}</td>
                    <td className="px-5 py-3">{s.avg_score == null ? "—" : `${s.avg_score}%`}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-end gap-0.5 h-6">
                        {s.trend.length === 0 && <span className="text-[11px] text-muted-foreground">—</span>}
                        {s.trend.map((v, i) => (
                          <div key={i} className="w-1.5 bg-primary/70 rounded-sm" style={{ height: `${(v / max) * 100}%` }} />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{s.attempts}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.cls}`}>{status.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights placeholder */}
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Next best action</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.atRisk > 0
                ? `${metrics.atRisk} student${metrics.atRisk === 1 ? "" : "s"} scoring below 50%. Consider assigning targeted practice.`
                : "Cohort looks healthy. Set a stretch homework to push your top performers."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
