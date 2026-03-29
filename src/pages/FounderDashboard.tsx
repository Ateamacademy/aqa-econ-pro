import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";
import {
  Users, TrendingUp, Target, Zap, Brain, Award, Clock,
  Flame, BarChart3, Activity, AlertCircle, ShieldCheck, Mountain,
  BookOpen, PenTool, GraduationCap, ChevronRight, FileText,
  MessageCircle, RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ── constants ── */
const ALLOWED_EMAILS = ["admin@econrev.co", "swapnil.kumar22@alumni.imperial.ac.uk", "aminul.miah@ateamacademy.co.uk", "info@ateamacademy.co.uk"].map(e => e.toLowerCase());

const TIME_FILTERS = [
  { value: "7d", label: "7 D" },
  { value: "30d", label: "30 D" },
  { value: "90d", label: "90 D" },
  { value: "all", label: "All" },
];

const SECTIONS = [
  { id: "insights", label: "Insights", icon: Zap },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "habit", label: "Habits", icon: Flame },
  { id: "learning", label: "Learning", icon: Brain },
  { id: "features", label: "Features", icon: Zap },
  { id: "papers", label: "Papers", icon: FileText },
  { id: "behaviour", label: "Behaviour", icon: Activity },
  { id: "readiness", label: "Readiness", icon: Mountain },
  { id: "leaderboard", label: "Leaders", icon: Award },
];

const C = [
  "hsl(221, 83%, 53%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)", "hsl(262, 83%, 58%)", "hsl(199, 89%, 48%)",
  "hsl(25, 95%, 53%)", "hsl(330, 81%, 60%)",
];

const TIER_C: Record<string, string> = {
  "Exam Ready": C[1], "On Track": C[0], "Building": C[2], "Starting": C[3],
};

/* ── types ── */
interface AnalyticsData {
  productGrowth: { totalUsers: number; newUsersToday: number; newUsersWeek: number; newUsersMonth: number; dau: number; wau: number; mau: number; dauMauRatio: number; avgSessionDuration: number; userGrowth: { date: string; count: number }[]; dauTrend: { date: string; count: number }[]; retentionCohorts: { cohort: string; week0: number; week1: number; week2: number; week3: number; week4: number }[] };
  habitFormation: { avgStreak: number; longestStreak: number; studying3Plus: number; studying5Plus: number; avgSessionsPerUser: number; dailyReturningUsers: number; streakDistribution: { range: string; count: number }[]; weeklyHeatmap: { day: string; sessions: number }[]; dailySessionTrend: { date: string; sessions: number; users: number }[]; avgSessionLength: number };
  learningOutcomes: { avgScore: number; avgEssayScore: number; avgDiagramScore: number; avgImprovement: number; gradeDistribution: Record<string, number>; scoreOverTime: { date: string; avgScore: number }[]; topicPerformance: { topic: string; avgScore: number; count: number }[]; totalSessions: number };
  featureAdoption: { featureUsage: Record<string, number>; dailyFeatureUsage: Record<string, number>; avgFeaturesPerUser: number; featureTrend: any[] };
  predictedPaperIntel: { totalGenerated: number; totalCompleted: number; avgScore: number; bySubject: Record<string, number>; topicWeaknesses: { topic: string; avgScore: number; count: number }[]; mostImprovedModules: { topic: string; avgImprovement: number }[]; ppScoreOverTime: { date: string; avgScore: number }[] };
  studentBehaviour: { activeStudents: number; avgSessionsPerUser: number; avgQuestionsPerStudent: number; avgPPsPerStudent: number; avgDiagramsPerStudent: number; avgEssaysPerStudent: number; avgStudyTimePerDay: number; hourlyActivity: { hour: number; sessions: number }[] };
  readiness: { avgReadiness: number; readinessTiers: Record<string, number>; readinessDistribution: { range: string; count: number }[]; readinessGrowth: { week: string; avgReadiness: number }[]; topReadiness: { userId: string; name: string; score: number; tier: string }[] };
  leaderboard: { topScorers: { userId: string; name: string; avgScore: number; sessions: number }[]; mostActive: { userId: string; name: string; sessions: number; features: number }[]; longestStreakers: { userId: string; name: string; streak: number }[]; mostPPsCompleted: { userId: string; name: string; pps: number }[] };
  insights: string[];
}

/* ── small reusable components ── */

function Metric({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string | number; sub?: string; icon: any; color?: string; trend?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="rounded-xl border border-border/40 bg-card p-4 hover:border-primary/20 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
            <p className="text-xl font-bold mt-0.5 font-mono truncate">{value}</p>
            {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
            {trend && <p className="text-[10px] text-emerald-500 font-medium mt-0.5">{trend}</p>}
          </div>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color || "hsl(var(--primary))"}15` }}>
            <Icon className="h-4 w-4" style={{ color: color || "hsl(var(--primary))" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ id, title, icon: Icon, desc, children }: { id: string; title: string; icon: any; desc?: string; children: React.ReactNode }) {
  return (
    <section id={`s-${id}`} className="scroll-mt-28 mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="h-3.5 w-3.5 text-primary" /></div>
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {desc && <p className="text-[10px] text-muted-foreground">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function ChartCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn("border-border/40", className)}>
      <CardHeader className="pb-1 pt-4 px-4"><CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle></CardHeader>
      <CardContent className="px-4 pb-4">{children}</CardContent>
    </Card>
  );
}

function LbTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="rounded-xl border border-border/40 overflow-hidden">
      <table className="w-full text-xs">
        <thead><tr className="bg-muted/30">{headers.map(h => <th key={h} className="p-2.5 text-left text-muted-foreground font-medium">{h}</th>)}</tr></thead>
        <tbody>{rows.length === 0
          ? <tr><td colSpan={headers.length} className="p-6 text-center text-muted-foreground">No data yet</td></tr>
          : rows.map((r, i) => <tr key={i} className="border-t border-border/30">{r.map((c, j) => <td key={j} className={cn("p-2.5", j === 0 && "font-semibold")}>{c}</td>)}</tr>)
        }</tbody>
      </table>
    </div>
  );
}

/* ── helpers ── */
function fmtDate(d: string) { if (!d) return ""; const x = new Date(d); return `${x.getDate()}/${x.getMonth() + 1}`; }
function fmtFeature(n: string) {
  const m: Record<string, string> = { question: "Practice", predicted_paper: "Predicted Papers", "predicted-paper": "Predicted Papers", essay: "Essay Grader", diagram: "Diagram Builder", tutor: "AI Tutor", notes: "Study Notes", feature_use: "Feature Use", session_start: "Sessions" };
  return m[n] || n.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/* ── main component ── */
export default function FounderDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeNav, setActiveNav] = useState("insights");
  const mainRef = useRef<HTMLDivElement>(null);

  const isAllowed = user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => { if (user && isAllowed) fetchAnalytics(); }, [user, isAllowed, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true); setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("founder-analytics", { body: { timeRange } });
      if (fnError) throw new Error(fnError.message || "Edge function error");
      if (result?.error) throw new Error(result.error);
      setData(result);
    } catch (err: any) {
      console.error("Founder analytics fetch failed:", err);
      setError(err.message || "Failed to load analytics");
    }
    finally { setLoading(false); }
  };

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id.replace("s-", "")); }); },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(`s-${s.id}`); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [data]);

  /* guard states */
  if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!user) return <div className="container py-20 text-center"><ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h1 className="text-xl font-bold mb-2">Sign in required</h1><p className="text-sm text-muted-foreground">Please sign in to access the Founder Dashboard.</p></div>;
  if (!isAllowed) return <div className="container py-20 text-center"><AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" /><h1 className="text-xl font-bold mb-2">Access Denied</h1><p className="text-sm text-muted-foreground">Restricted to authorised team members.</p><p className="text-xs text-muted-foreground/60 mt-2">Signed in as: {user.email}</p></div>;
  if (loading && !data) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (error) return (
    <div className="container py-20 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h1 className="text-xl font-bold mb-2">Error Loading Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-4">{error}</p>
      <Button onClick={fetchAnalytics} variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Retry</Button>
    </div>
  );

  /* derived data */
  const gradeDistData = Object.entries(data.learningOutcomes.gradeDistribution).map(([grade, count]) => ({ grade, count })).filter(d => d.count > 0);
  const featureUsageData = Object.entries(data.featureAdoption.featureUsage).map(([f, c]) => ({ feature: fmtFeature(f), count: c })).sort((a, b) => b.count - a.count);
  const ppSubjectData = Object.entries(data.predictedPaperIntel.bySubject).map(([s, c]) => ({ subject: s, count: c })).sort((a, b) => b.count - a.count);
  let cum = 0;
  const cumGrowth = data.productGrowth.userGrowth.map(d => { cum += d.count; return { date: d.date, total: cum, new: d.count }; });
  const tierData = Object.entries(data.readiness.readinessTiers).map(([t, c]) => ({ tier: t, count: c })).filter(d => d.count > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── sticky header ── */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* top row */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h1 className="text-lg font-bold tracking-tight">Founder Dashboard</h1>
              <p className="text-[10px] text-muted-foreground">Econ Rev · Real-time analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={fetchAnalytics} disabled={loading} className="h-7 w-7 p-0">
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              </Button>
              <div className="inline-flex bg-muted/60 rounded-lg p-0.5">
                {TIME_FILTERS.map(f => (
                  <button key={f.value} onClick={() => setTimeRange(f.value)}
                    className={cn("px-3 py-1 rounded-md text-[10px] font-semibold transition-all",
                      timeRange === f.value ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* section nav */}
          <div className="flex gap-0.5 overflow-x-auto pb-2 -mb-px scrollbar-none">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.id}
                  onClick={() => document.getElementById(`s-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all",
                    activeNav === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}>
                  <Icon className="h-3 w-3" />{s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── content ── */}
      <div ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">

        {/* 0. Insights */}
        {data.insights.length > 0 && (
          <Section id="insights" title="Key Insights" icon={Zap} desc="Auto-generated highlights">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {data.insights.map((ins, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5">
                  <ChevronRight className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{ins}</span>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* 1. Product Growth */}
        <Section id="growth" title="Product Growth" icon={TrendingUp} desc="Track overall platform adoption">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            <Metric label="Total Users" value={data.productGrowth.totalUsers} icon={Users} />
            <Metric label="New Today" value={data.productGrowth.newUsersToday} icon={Users} color={C[1]} />
            <Metric label="New This Week" value={data.productGrowth.newUsersWeek} icon={Users} />
            <Metric label="DAU / WAU / MAU" value={data.productGrowth.dau} sub={`W: ${data.productGrowth.wau} · M: ${data.productGrowth.mau}`} icon={Activity} />
            <Metric label="DAU/MAU Ratio" value={`${data.productGrowth.dauMauRatio}%`} sub="Engagement" icon={Target} color={C[4]} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="New This Month" value={data.productGrowth.newUsersMonth} icon={Users} />
            <Metric label="WAU" value={data.productGrowth.wau} icon={Activity} />
            <Metric label="MAU" value={data.productGrowth.mau} icon={Activity} />
            <Metric label="Avg Session" value={data.productGrowth.avgSessionDuration > 0 ? `${Math.round(data.productGrowth.avgSessionDuration / 60)}m` : "N/A"} icon={Clock} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-5">
            <ChartCard title="Cumulative User Growth">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={cumGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Area type="monotone" dataKey="total" stroke={C[0]} fill={C[0]} fillOpacity={0.08} strokeWidth={2} name="Total" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Daily Active Users">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.productGrowth.dauTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Bar dataKey="count" fill={C[1]} radius={[3, 3, 0, 0]} name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {data.productGrowth.retentionCohorts.length > 0 && (
            <ChartCard title="Retention Cohorts (% active by week)">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border/40">
                    {["Cohort", "Wk 0", "Wk 1", "Wk 2", "Wk 3", "Wk 4"].map(h => <th key={h} className="p-2 text-muted-foreground text-center first:text-left">{h}</th>)}
                  </tr></thead>
                  <tbody>{data.productGrowth.retentionCohorts.map((c, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="p-2 font-medium">{c.cohort}</td>
                      {[c.week0, c.week1, c.week2, c.week3, c.week4].map((v, j) => (
                        <td key={j} className="p-2 text-center">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
                            style={{ backgroundColor: `hsl(${Math.min(v * 1.4, 142)}, 55%, ${94 - v * 0.35}%)`, color: v > 50 ? "hsl(142,35%,18%)" : "hsl(0,0%,28%)" }}>
                            {v}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </ChartCard>
          )}
        </Section>

        {/* 2. Habit Formation */}
        <Section id="habit" title="Habit Formation" icon={Flame} desc="Is Econ Rev becoming a daily habit?">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
            <Metric label="Avg Streak" value={`${data.habitFormation.avgStreak}d`} icon={Flame} color={C[2]} />
            <Metric label="Longest Streak" value={`${data.habitFormation.longestStreak}d`} icon={Award} color={C[6]} />
            <Metric label="Daily Returns" value={data.habitFormation.dailyReturningUsers} icon={Users} />
            <Metric label="3+ Days/Wk" value={data.habitFormation.studying3Plus} icon={Target} />
            <Metric label="5+ Days/Wk" value={data.habitFormation.studying5Plus} icon={Zap} color={C[1]} />
            <Metric label="Avg Sessions" value={data.habitFormation.avgSessionsPerUser} sub="per student" icon={Activity} />
          </div>
          <div className="grid lg:grid-cols-3 gap-3">
            <ChartCard title="Streak Distribution">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.habitFormation.streakDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Students" radius={[3, 3, 0, 0]}>
                    {data.habitFormation.streakDistribution.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Weekly Activity">
              <div className="space-y-2 mt-1">
                {data.habitFormation.weeklyHeatmap.map(d => {
                  const mx = Math.max(...data.habitFormation.weeklyHeatmap.map(h => h.sessions), 1);
                  const pct = (d.sessions / mx) * 100;
                  return (
                    <div key={d.day} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-7">{d.day}</span>
                      <div className="flex-1 h-5 rounded bg-muted/20 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }}
                          className="h-full rounded" style={{ backgroundColor: C[0], opacity: 0.25 + (pct / 100) * 0.75 }} />
                      </div>
                      <span className="text-[10px] font-medium w-6 text-right">{d.sessions}</span>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
            <ChartCard title="Daily Study Sessions">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.habitFormation.dailySessionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Line type="monotone" dataKey="sessions" stroke={C[4]} strokeWidth={2} dot={false} name="Sessions" />
                  <Line type="monotone" dataKey="users" stroke={C[5]} strokeWidth={2} dot={false} name="Users" />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Section>

        {/* 3. Learning Outcomes */}
        <Section id="learning" title="Learning Outcomes" icon={Brain} desc="Are students getting better?">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
            <Metric label="Avg Score" value={`${data.learningOutcomes.avgScore}%`} icon={Target} />
            <Metric label="Essay Score" value={`${data.learningOutcomes.avgEssayScore}%`} icon={PenTool} />
            <Metric label="Diagram Acc." value={`${data.learningOutcomes.avgDiagramScore}%`} icon={BarChart3} />
            <Metric label="Improvement" value={`${data.learningOutcomes.avgImprovement > 0 ? "+" : ""}${data.learningOutcomes.avgImprovement}%`} icon={TrendingUp} trend={data.learningOutcomes.avgImprovement > 0 ? "Improving" : undefined} />
            <Metric label="Total Sessions" value={data.learningOutcomes.totalSessions} icon={Activity} />
            <Metric label="Topics Covered" value={data.learningOutcomes.topicPerformance.length} icon={BookOpen} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-5">
            <ChartCard title="Score Improvement Over Time">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data.learningOutcomes.scoreOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Line type="monotone" dataKey="avgScore" stroke={C[1]} strokeWidth={2} dot={false} name="Avg Score %" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Grade Distribution">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={gradeDistData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Students" radius={[3, 3, 0, 0]}>
                    {gradeDistData.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {data.learningOutcomes.topicPerformance.length > 0 && (
            <ChartCard title="Topic Mastery (Weakest → Strongest)">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                {data.learningOutcomes.topicPerformance.slice(0, 16).map(t => (
                  <div key={t.topic} className="rounded-lg px-3 py-2 text-[10px]"
                    style={{ backgroundColor: `hsl(${Math.min(t.avgScore * 1.2, 142)}, 55%, ${92 - t.avgScore * 0.3}%)`, color: t.avgScore < 50 ? "hsl(0,0%,18%)" : "hsl(0,0%,12%)" }}>
                    <p className="font-medium truncate">{t.topic}</p>
                    <p className="font-bold">{t.avgScore}% <span className="font-normal opacity-60">({t.count})</span></p>
                  </div>
                ))}
              </div>
            </ChartCard>
          )}
        </Section>

        {/* 4. Feature Adoption */}
        <Section id="features" title="Feature Adoption" icon={Zap} desc="Which features drive engagement?">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
            <Metric label="Total Uses" value={Object.values(data.featureAdoption.featureUsage).reduce((a, b) => a + b, 0)} icon={Zap} />
            <Metric label="Avg Features/User" value={data.featureAdoption.avgFeaturesPerUser} icon={Activity} />
            <Metric label="Features Tracked" value={Object.keys(data.featureAdoption.featureUsage).length} icon={BarChart3} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <ChartCard title="Feature Usage">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={featureUsageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 9 }} />
                  <YAxis dataKey="feature" type="category" tick={{ fontSize: 9 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="count" name="Usage" radius={[0, 3, 3, 0]}>
                    {featureUsageData.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Feature Engagement Trend">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.featureAdoption.featureTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Area type="monotone" dataKey="question" stackId="1" stroke={C[0]} fill={C[0]} fillOpacity={0.2} name="Questions" />
                  <Area type="monotone" dataKey="predicted_paper" stackId="1" stroke={C[1]} fill={C[1]} fillOpacity={0.2} name="Predicted Papers" />
                  <Area type="monotone" dataKey="essay" stackId="1" stroke={C[2]} fill={C[2]} fillOpacity={0.2} name="Essays" />
                  <Area type="monotone" dataKey="diagram" stackId="1" stroke={C[3]} fill={C[3]} fillOpacity={0.2} name="Diagrams" />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Section>

        {/* 5. Predicted Paper Intelligence */}
        <Section id="papers" title="Predicted Paper Intelligence" icon={FileText} desc="Deeper insights into the core feature">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="Generated" value={data.predictedPaperIntel.totalGenerated} icon={BarChart3} />
            <Metric label="Completed" value={data.predictedPaperIntel.totalCompleted} icon={Target} />
            <Metric label="Avg Score" value={`${data.predictedPaperIntel.avgScore}%`} icon={Award} />
            <Metric label="Completion Rate" value={data.predictedPaperIntel.totalGenerated > 0 ? `${Math.round((data.predictedPaperIntel.totalCompleted / data.predictedPaperIntel.totalGenerated) * 100)}%` : "N/A"} icon={TrendingUp} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-5">
            {ppSubjectData.length > 0 && (
              <ChartCard title="Papers by Exam Board">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={ppSubjectData} dataKey="count" nameKey="subject" cx="50%" cy="50%" outerRadius={85} label={({ subject, percent }) => `${subject} (${(percent * 100).toFixed(0)}%)`}>
                      {ppSubjectData.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
            {data.predictedPaperIntel.topicWeaknesses.length > 0 && (
              <ChartCard title="Weakest Topics">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data.predictedPaperIntel.topicWeaknesses} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <YAxis dataKey="topic" type="category" tick={{ fontSize: 8 }} width={130} />
                    <Tooltip />
                    <Bar dataKey="avgScore" name="Avg %" radius={[0, 3, 3, 0]}>
                      {data.predictedPaperIntel.topicWeaknesses.map((t, i) => <Cell key={i} fill={t.avgScore < 50 ? C[3] : t.avgScore < 70 ? C[2] : C[1]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            {data.predictedPaperIntel.ppScoreOverTime.length > 0 && (
              <ChartCard title="PP Score Trend">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data.predictedPaperIntel.ppScoreOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Tooltip labelFormatter={fmtDate} />
                    <Line type="monotone" dataKey="avgScore" stroke={C[4]} strokeWidth={2} dot={false} name="Avg Score %" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
            {data.predictedPaperIntel.mostImprovedModules.length > 0 && (
              <ChartCard title="Most Improved Modules">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.predictedPaperIntel.mostImprovedModules.slice(0, 8)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 9 }} />
                    <YAxis dataKey="topic" type="category" tick={{ fontSize: 8 }} width={130} />
                    <Tooltip />
                    <Bar dataKey="avgImprovement" name="Improvement %" radius={[0, 3, 3, 0]}>
                      {data.predictedPaperIntel.mostImprovedModules.slice(0, 8).map((t, i) => <Cell key={i} fill={t.avgImprovement > 0 ? C[1] : C[3]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
        </Section>

        {/* 6. Student Behaviour */}
        <Section id="behaviour" title="Student Behaviour" icon={Activity} desc="How students use the platform">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
            <Metric label="Active Students" value={data.studentBehaviour.activeStudents} icon={Users} />
            <Metric label="Avg Sessions" value={data.studentBehaviour.avgSessionsPerUser} sub="per student" icon={Activity} />
            <Metric label="Questions" value={data.studentBehaviour.avgQuestionsPerStudent} sub="per student" icon={BookOpen} />
            <Metric label="Pred. Papers" value={data.studentBehaviour.avgPPsPerStudent} sub="per student" icon={Target} />
            <Metric label="Diagrams" value={data.studentBehaviour.avgDiagramsPerStudent} sub="per student" icon={BarChart3} />
            <Metric label="Essays" value={data.studentBehaviour.avgEssaysPerStudent} sub="per student" icon={PenTool} />
            <Metric label="Study/Day" value={data.studentBehaviour.avgStudyTimePerDay > 0 ? `${data.studentBehaviour.avgStudyTimePerDay}m` : "N/A"} icon={Clock} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <ChartCard title="Hourly Activity">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.studentBehaviour.hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} tickFormatter={h => `${h}:00`} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={h => `${h}:00 UTC`} />
                  <Bar dataKey="sessions" name="Sessions" radius={[3, 3, 0, 0]} fill={C[5]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Feature Usage Per Student">
              <div className="space-y-2.5 mt-1">
                {[
                  { label: "Questions", value: data.studentBehaviour.avgQuestionsPerStudent, color: C[0] },
                  { label: "Predicted Papers", value: data.studentBehaviour.avgPPsPerStudent, color: C[1] },
                  { label: "Diagrams", value: data.studentBehaviour.avgDiagramsPerStudent, color: C[2] },
                  { label: "Essays", value: data.studentBehaviour.avgEssaysPerStudent, color: C[3] },
                ].map(item => {
                  const mx = Math.max(data.studentBehaviour.avgQuestionsPerStudent, data.studentBehaviour.avgPPsPerStudent, data.studentBehaviour.avgDiagramsPerStudent, data.studentBehaviour.avgEssaysPerStudent, 1);
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-24">{item.label}</span>
                      <div className="flex-1 h-4 rounded bg-muted/20 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / mx) * 100}%` }} transition={{ duration: 0.4 }}
                          className="h-full rounded" style={{ backgroundColor: item.color }} />
                      </div>
                      <span className="text-[10px] font-semibold w-6 text-right">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </div>
        </Section>

        {/* 7. Readiness */}
        <Section id="readiness" title="Readiness Score Distribution" icon={Mountain} desc="Is the readiness system motivating students?">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="Avg Readiness" value={`${data.readiness.avgReadiness}%`} icon={Mountain} />
            <Metric label="Exam Ready" value={data.readiness.readinessTiers["Exam Ready"] || 0} icon={GraduationCap} color={TIER_C["Exam Ready"]} />
            <Metric label="On Track" value={data.readiness.readinessTiers["On Track"] || 0} icon={TrendingUp} color={TIER_C["On Track"]} />
            <Metric label="Building" value={data.readiness.readinessTiers["Building"] || 0} icon={Flame} color={TIER_C["Building"]} />
          </div>
          <div className="grid lg:grid-cols-3 gap-3">
            <ChartCard title="Score Distribution">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.readiness.readinessDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Students" radius={[3, 3, 0, 0]}>
                    {data.readiness.readinessDistribution.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Readiness by Tier">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={tierData} dataKey="count" nameKey="tier" cx="50%" cy="50%" outerRadius={75} label={({ tier, percent }) => `${tier} (${(percent * 100).toFixed(0)}%)`}>
                    {tierData.map(d => <Cell key={d.tier} fill={TIER_C[d.tier] || C[0]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Weekly Readiness Growth">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.readiness.readinessGrowth.filter(d => d.avgReadiness > 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgReadiness" stroke={C[1]} strokeWidth={2} dot name="Avg %" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Section>

        {/* 8. Leaderboard */}
        <Section id="leaderboard" title="Leaderboard Insights" icon={Award} desc="Top students and power users">
          <Tabs defaultValue="scores">
            <TabsList className="mb-3">
              <TabsTrigger value="scores" className="text-xs">Top Scores</TabsTrigger>
              <TabsTrigger value="active" className="text-xs">Most Active</TabsTrigger>
              <TabsTrigger value="streaks" className="text-xs">Streaks</TabsTrigger>
              <TabsTrigger value="pps" className="text-xs">Papers</TabsTrigger>
              <TabsTrigger value="readiness" className="text-xs">Readiness</TabsTrigger>
            </TabsList>
            <TabsContent value="scores">
              <LbTable headers={["#", "Student", "Avg Score", "Sessions"]} rows={data.leaderboard.topScorers.map((s, i) => [i + 1, s.name, `${s.avgScore}%`, s.sessions])} />
            </TabsContent>
            <TabsContent value="active">
              <LbTable headers={["#", "Student", "Sessions", "Features"]} rows={data.leaderboard.mostActive.map((s, i) => [i + 1, s.name, s.sessions, s.features])} />
            </TabsContent>
            <TabsContent value="streaks">
              <LbTable headers={["#", "Student", "Streak"]} rows={data.leaderboard.longestStreakers.map((s, i) => [i + 1, s.name, `${s.streak} 🔥`])} />
            </TabsContent>
            <TabsContent value="pps">
              <LbTable headers={["#", "Student", "Papers"]} rows={(data.leaderboard.mostPPsCompleted || []).map((s, i) => [i + 1, s.name, s.pps])} />
            </TabsContent>
            <TabsContent value="readiness">
              <LbTable headers={["#", "Student", "Score", "Tier"]} rows={(data.readiness.topReadiness || []).map((s, i) => [i + 1, s.name, `${s.score}%`, s.tier])} />
            </TabsContent>
          </Tabs>
        </Section>

      </div>
    </div>
  );
}
