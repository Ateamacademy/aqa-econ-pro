import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2, Users, GraduationCap, TrendingDown, TrendingUp,
  AlertTriangle, BookOpen, Activity, ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

type Overview = {
  totals: { total_classes: number; total_students: number; total_teachers: number; school_avg: number | null; practice_volume: number; pending_marking: number };
  classes: Array<{ class_id: string; name: string; exam_board: string | null; year_group: string | null; teacher_id: string; student_count: number; avg_score: number | null; practice_count: number; hw_submitted: number; hw_total: number }>;
  teachers: Array<{ teacher_id: string; teacher_name: string; teacher_email: string; class_count: number; student_count: number; avg_score: number | null }>;
  topic_gaps: Array<{ topic: string; avg_score: number; sample: number }>;
  weekly_activity: Array<{ week: string; sessions: number; avg_score: number | null }>;
  ao_avgs: { ao1: number | null; ao2: number | null; ao3: number | null; ao4: number | null } | null;
  board_split: Array<{ board: string; classes: number; students: number }>;
  interventions: Array<{ severity: string; n: number }>;
};

export default function TeacherDepartment() {
  const { schoolId, isHod, loading: rolesLoading } = useUserRoles();
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (rolesLoading || !schoolId) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_department_overview", { _school_id: schoolId });
      if (error) setError(error.message);
      else setData(data as unknown as Overview);
      setLoading(false);
    })();
  }, [schoolId, rolesLoading]);

  const aoData = useMemo(() => {
    const a = data?.ao_avgs;
    if (!a) return [];
    return [
      { ao: "AO1", value: Number(a.ao1 ?? 0) },
      { ao: "AO2", value: Number(a.ao2 ?? 0) },
      { ao: "AO3", value: Number(a.ao3 ?? 0) },
      { ao: "AO4", value: Number(a.ao4 ?? 0) },
    ];
  }, [data]);

  if (!rolesLoading && !isHod) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-lg font-semibold mb-2">Department analytics</h1>
          <p className="text-sm text-muted-foreground">
            This area is restricted to Heads of Department and school admins.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
            <Building2 className="h-3.5 w-3.5" /> Department
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">School-wide analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Cohort performance, teacher comparison and curriculum gaps across your department.</p>
        </div>
      </header>

      {error && (
        <Card className="p-4 border-destructive/40 bg-destructive/5 text-sm text-destructive">{error}</Card>
      )}

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi icon={<Users className="h-4 w-4" />} label="Students" value={data?.totals.total_students ?? "—"} loading={loading} />
        <Kpi icon={<GraduationCap className="h-4 w-4" />} label="Classes" value={data?.totals.total_classes ?? "—"} loading={loading} />
        <Kpi icon={<Users className="h-4 w-4" />} label="Teachers" value={data?.totals.total_teachers ?? "—"} loading={loading} />
        <Kpi icon={<Activity className="h-4 w-4" />} label="School avg" value={data?.totals.school_avg != null ? `${data.totals.school_avg}%` : "—"} loading={loading} />
        <Kpi icon={<BookOpen className="h-4 w-4" />} label="Practices (60d)" value={data?.totals.practice_volume ?? "—"} loading={loading} />
        <Kpi icon={<AlertTriangle className="h-4 w-4" />} label="Pending marking" value={data?.totals.pending_marking ?? "—"} loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity trend */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Weekly practice activity</h2>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Last 60 days</span>
          </div>
          <div className="h-[240px]">
            {loading ? <Skeleton className="h-full w-full" /> : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.weekly_activity ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Line type="monotone" dataKey="sessions" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Sessions" />
                  <Line type="monotone" dataKey="avg_score" stroke="hsl(var(--accent-foreground))" strokeWidth={2} dot={false} name="Avg score" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* AO radar */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Assessment Objective averages</h2>
          <div className="h-[240px]">
            {loading ? <Skeleton className="h-full w-full" /> : aoData.every((d) => !d.value) ? (
              <p className="text-xs text-muted-foreground">No marked homework yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={aoData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="ao" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic gaps */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><TrendingDown className="h-4 w-4 text-destructive" /> Curriculum gaps</h2>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Lowest avg topics</span>
          </div>
          {loading ? <Skeleton className="h-40 w-full" /> : (
            <div className="space-y-1.5">
              {(data?.topic_gaps ?? []).length === 0 && <p className="text-xs text-muted-foreground">Not enough data yet.</p>}
              {(data?.topic_gaps ?? []).map((t) => (
                <div key={t.topic} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">{t.topic}</p>
                    <p className="text-[10px] text-muted-foreground">{t.sample} attempts</p>
                  </div>
                  <Badge variant={t.avg_score < 50 ? "destructive" : t.avg_score < 65 ? "secondary" : "outline"} className="ml-3">
                    {t.avg_score}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Exam board / interventions */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Exam board mix</h2>
          {loading ? <Skeleton className="h-24 w-full" /> : (
            <div className="space-y-2 mb-5">
              {(data?.board_split ?? []).map((b) => (
                <div key={b.board} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{b.board}</span>
                  <span className="text-muted-foreground">{b.classes} classes · {b.students} students</span>
                </div>
              ))}
            </div>
          )}
          <h2 className="text-sm font-semibold text-foreground mb-3">Open interventions</h2>
          {loading ? <Skeleton className="h-16 w-full" /> : (data?.interventions ?? []).length === 0 ? (
            <p className="text-xs text-muted-foreground">No open interventions.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(data?.interventions ?? []).map((i) => (
                <Badge key={i.severity} variant={i.severity === "high" ? "destructive" : "secondary"}>
                  {i.severity}: {i.n}
                </Badge>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Teacher leaderboard */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Teacher comparison</h2>
        {loading ? <Skeleton className="h-40 w-full" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="py-2 font-medium">Teacher</th>
                  <th className="py-2 font-medium">Classes</th>
                  <th className="py-2 font-medium">Students</th>
                  <th className="py-2 font-medium">Avg score (60d)</th>
                </tr>
              </thead>
              <tbody>
                {(data?.teachers ?? []).map((t) => (
                  <tr key={t.teacher_id} className="border-b border-border/40 last:border-0">
                    <td className="py-2.5">
                      <p className="font-medium text-foreground">{t.teacher_name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.teacher_email}</p>
                    </td>
                    <td className="py-2.5 text-foreground">{t.class_count}</td>
                    <td className="py-2.5 text-foreground">{t.student_count}</td>
                    <td className="py-2.5">
                      {t.avg_score != null ? (
                        <Badge variant={t.avg_score >= 70 ? "outline" : t.avg_score >= 55 ? "secondary" : "destructive"}>
                          {t.avg_score}%
                        </Badge>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Class table */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">All classes</h2>
        {loading ? <Skeleton className="h-40 w-full" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="py-2 font-medium">Class</th>
                  <th className="py-2 font-medium">Board / Year</th>
                  <th className="py-2 font-medium">Students</th>
                  <th className="py-2 font-medium">Avg score</th>
                  <th className="py-2 font-medium">Homework</th>
                  <th className="py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {(data?.classes ?? []).map((c) => (
                  <tr key={c.class_id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 text-muted-foreground">{c.exam_board ?? "—"} · {c.year_group ?? "—"}</td>
                    <td className="py-2.5 text-foreground">{c.student_count}</td>
                    <td className="py-2.5">
                      {c.avg_score != null ? (
                        <Badge variant={c.avg_score >= 70 ? "outline" : c.avg_score >= 55 ? "secondary" : "destructive"}>
                          {c.avg_score}%
                        </Badge>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{c.hw_submitted}/{c.hw_total}</td>
                    <td className="py-2.5 text-right">
                      <Link to={`/teacher/classes/${c.class_id}`} className="inline-flex items-center text-xs text-primary hover:underline">
                        View <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {(data?.classes ?? []).length === 0 && (
                  <tr><td colSpan={6} className="py-6 text-center text-xs text-muted-foreground">No classes yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function Kpi({ icon, label, value, loading }: { icon: React.ReactNode; label: string; value: React.ReactNode; loading?: boolean }) {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <div className="text-xl font-semibold text-foreground mt-1">
        {loading ? <Skeleton className="h-6 w-12" /> : value}
      </div>
    </Card>
  );
}
