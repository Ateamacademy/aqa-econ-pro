import { useState, useEffect } from "react";
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
  BookOpen, PenTool, GraduationCap, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALLOWED_EMAILS = ["haider_78@outlook.com", "admin@econrev.co"];
const TIME_FILTERS = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
];

const CHART_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(262, 83%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(25, 95%, 53%)",
  "hsl(330, 81%, 60%)",
];

const TIER_COLORS: Record<string, string> = {
  "Exam Ready": "hsl(142, 71%, 45%)",
  "On Track": "hsl(221, 83%, 53%)",
  "Building": "hsl(38, 92%, 50%)",
  "Starting": "hsl(0, 72%, 51%)",
};

interface AnalyticsData {
  productGrowth: {
    totalUsers: number;
    newUsersToday: number;
    newUsersWeek: number;
    newUsersMonth: number;
    dau: number;
    wau: number;
    mau: number;
    dauMauRatio: number;
    avgSessionDuration: number;
    userGrowth: { date: string; count: number }[];
    dauTrend: { date: string; count: number }[];
    retentionCohorts: { cohort: string; week0: number; week1: number; week2: number; week3: number; week4: number }[];
  };
  habitFormation: {
    avgStreak: number;
    longestStreak: number;
    studying3Plus: number;
    studying5Plus: number;
    avgSessionsPerUser: number;
    dailyReturningUsers: number;
    streakDistribution: { range: string; count: number }[];
    weeklyHeatmap: { day: string; sessions: number }[];
    dailySessionTrend: { date: string; sessions: number; users: number }[];
    avgSessionLength: number;
  };
  learningOutcomes: {
    avgScore: number;
    avgEssayScore: number;
    avgDiagramScore: number;
    avgImprovement: number;
    gradeDistribution: Record<string, number>;
    scoreOverTime: { date: string; avgScore: number }[];
    topicPerformance: { topic: string; avgScore: number; count: number }[];
    totalSessions: number;
  };
  featureAdoption: {
    featureUsage: Record<string, number>;
    dailyFeatureUsage: Record<string, number>;
    avgFeaturesPerUser: number;
    featureTrend: any[];
  };
  predictedPaperIntel: {
    totalGenerated: number;
    totalCompleted: number;
    avgScore: number;
    bySubject: Record<string, number>;
    topicWeaknesses: { topic: string; avgScore: number; count: number }[];
    mostImprovedModules: { topic: string; avgImprovement: number }[];
    ppScoreOverTime: { date: string; avgScore: number }[];
  };
  studentBehaviour: {
    activeStudents: number;
    avgSessionsPerUser: number;
    avgQuestionsPerStudent: number;
    avgPPsPerStudent: number;
    avgDiagramsPerStudent: number;
    avgEssaysPerStudent: number;
    avgStudyTimePerDay: number;
    hourlyActivity: { hour: number; sessions: number }[];
  };
  readiness: {
    avgReadiness: number;
    readinessTiers: Record<string, number>;
    readinessDistribution: { range: string; count: number }[];
    readinessGrowth: { week: string; avgReadiness: number }[];
    topReadiness: { userId: string; name: string; score: number; tier: string }[];
  };
  leaderboard: {
    topScorers: { userId: string; name: string; avgScore: number; sessions: number }[];
    mostActive: { userId: string; name: string; sessions: number; features: number }[];
    longestStreakers: { userId: string; name: string; streak: number }[];
    mostPPsCompleted: { userId: string; name: string; pps: number }[];
  };
  insights: string[];
}

function MetricCard({ title, value, subtitle, icon: Icon, trend, color }: {
  title: string; value: string | number; subtitle?: string;
  icon: any; trend?: string; color?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
              <p className="text-2xl font-bold mt-1 truncate">{value}</p>
              {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
              {trend && <p className="text-xs text-emerald-400 mt-1">{trend}</p>}
            </div>
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${!color ? "bg-primary/10" : ""}`}
              style={color ? { backgroundColor: `${color}20` } : undefined}
            >
              <Icon
                className={`h-5 w-5 ${!color ? "text-primary" : ""}`}
                style={color ? { color } : undefined}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionHeader({ title, icon: Icon, description }: { title: string; icon: any; description?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5 mt-10 first:mt-0">
      <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

function LeaderboardTable({ headers, rows, emptyMessage }: {
  headers: string[];
  rows: (string | number)[][];
  emptyMessage?: string;
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {headers.map((h, i) => (
                <th key={h} className={`p-3 text-xs text-muted-foreground ${i > 1 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={headers.length} className="p-6 text-center text-muted-foreground">{emptyMessage || "No data yet"}</td></tr>
            ) : rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`p-3 ${j === 0 ? "font-medium" : ""} ${j > 1 ? "text-right" : ""} ${j === row.length - 1 ? "text-muted-foreground" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default function FounderDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isAllowed = user?.email && ALLOWED_EMAILS.includes(user.email);

  useEffect(() => {
    if (!user || !isAllowed) return;
    fetchAnalytics();
  }, [user, isAllowed, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        "founder-analytics",
        { body: { timeRange } }
      );
      if (fnError) throw fnError;
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
        <p className="text-muted-foreground">Please sign in to access the Founder Dashboard.</p>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="container py-20 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground">This dashboard is restricted to authorised team members.</p>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Analytics</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const gradeDistData = Object.entries(data.learningOutcomes.gradeDistribution)
    .map(([grade, count]) => ({ grade, count }))
    .filter(d => d.count > 0);

  const featureUsageData = Object.entries(data.featureAdoption.featureUsage)
    .map(([feature, count]) => ({ feature: formatFeatureName(feature), count }))
    .sort((a, b) => b.count - a.count);

  const ppSubjectData = Object.entries(data.predictedPaperIntel.bySubject)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count);

  let cumulative = 0;
  const cumulativeGrowth = data.productGrowth.userGrowth.map(d => {
    cumulative += d.count;
    return { date: d.date, total: cumulative, new: d.count };
  });

  const tierData = Object.entries(data.readiness.readinessTiers)
    .map(([tier, count]) => ({ tier, count }))
    .filter(d => d.count > 0);

  return (
    <div className="container py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Founder Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time analytics for Econ Rev</p>
        </div>
        <div className="inline-flex items-center bg-muted rounded-full p-1 gap-0.5">
          {TIME_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setTimeRange(f.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                timeRange === f.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 11. Founder Insights Panel */}
      {data.insights.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Key Insights</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {data.insights.map((insight, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-xs text-muted-foreground bg-background/50 rounded-lg px-3 py-2 flex items-start gap-2"
                  >
                    <ChevronRight className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    <span>{insight}</span>
                  </motion.p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 1. Product Growth */}
      <SectionHeader title="Product Growth" icon={TrendingUp} description="Track overall adoption and platform growth" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <MetricCard title="Total Users" value={data.productGrowth.totalUsers} icon={Users} />
        <MetricCard title="New Today" value={data.productGrowth.newUsersToday} icon={Users} />
        <MetricCard title="New This Week" value={data.productGrowth.newUsersWeek} icon={Users} />
        <MetricCard title="DAU" value={data.productGrowth.dau} subtitle={`WAU: ${data.productGrowth.wau} · MAU: ${data.productGrowth.mau}`} icon={Activity} />
        <MetricCard title="DAU/MAU" value={`${data.productGrowth.dauMauRatio}%`} subtitle="Engagement ratio" icon={Target} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MetricCard title="New This Month" value={data.productGrowth.newUsersMonth} icon={Users} />
        <MetricCard title="WAU" value={data.productGrowth.wau} icon={Activity} />
        <MetricCard title="MAU" value={data.productGrowth.mau} icon={Activity} />
        <MetricCard title="Avg Session" value={data.productGrowth.avgSessionDuration > 0 ? `${Math.round(data.productGrowth.avgSessionDuration / 60)}m` : "N/A"} icon={Clock} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">User Growth (Cumulative)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={cumulativeGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={formatDate} />
                <Area type="monotone" dataKey="total" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.1} name="Total Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Daily Active Users</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.productGrowth.dauTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={formatDate} />
                <Bar dataKey="count" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Retention Cohort */}
      {data.productGrowth.retentionCohorts.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2"><CardTitle className="text-sm">User Retention Cohorts (% active by week)</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground">Cohort</th>
                    <th className="text-center p-3 text-muted-foreground">Wk 0</th>
                    <th className="text-center p-3 text-muted-foreground">Wk 1</th>
                    <th className="text-center p-3 text-muted-foreground">Wk 2</th>
                    <th className="text-center p-3 text-muted-foreground">Wk 3</th>
                    <th className="text-center p-3 text-muted-foreground">Wk 4</th>
                  </tr>
                </thead>
                <tbody>
                  {data.productGrowth.retentionCohorts.map((c, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="p-3 font-medium">{c.cohort}</td>
                      {[c.week0, c.week1, c.week2, c.week3, c.week4].map((v, j) => (
                        <td key={j} className="p-3 text-center">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `hsl(${Math.min(v * 1.4, 142)}, 60%, ${95 - v * 0.4}%)`,
                              color: v > 50 ? "hsl(142, 40%, 20%)" : "hsl(0, 0%, 30%)",
                            }}
                          >
                            {v}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 2. Habit Formation */}
      <SectionHeader title="Habit Formation" icon={Flame} description="Is Econ Rev becoming a daily study habit?" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <MetricCard title="Avg Streak" value={`${data.habitFormation.avgStreak} days`} icon={Flame} />
        <MetricCard title="Longest Streak" value={`${data.habitFormation.longestStreak} days`} icon={Award} />
        <MetricCard title="Daily Returns" value={data.habitFormation.dailyReturningUsers} icon={Users} />
        <MetricCard title="3+ Days/Wk" value={data.habitFormation.studying3Plus} icon={Target} />
        <MetricCard title="5+ Days/Wk" value={data.habitFormation.studying5Plus} icon={Zap} />
        <MetricCard title="Avg Sessions" value={data.habitFormation.avgSessionsPerUser} subtitle="per student" icon={Activity} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Study Streak Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.habitFormation.streakDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" name="Students" radius={[4, 4, 0, 0]}>
                  {(data.habitFormation.streakDistribution || []).map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Weekly Activity Heatmap</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 mt-2">
              {(data.habitFormation.weeklyHeatmap || []).map((d) => {
                const maxSessions = Math.max(...(data.habitFormation.weeklyHeatmap || []).map(h => h.sessions), 1);
                const pct = (d.sessions / maxSessions) * 100;
                return (
                  <div key={d.day} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8">{d.day}</span>
                    <div className="flex-1 h-6 rounded-md overflow-hidden bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-md"
                        style={{ backgroundColor: CHART_COLORS[0], opacity: 0.3 + (pct / 100) * 0.7 }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8 text-right">{d.sessions}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Daily Study Sessions</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.habitFormation.dailySessionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={formatDate} />
                <Line type="monotone" dataKey="sessions" stroke={CHART_COLORS[4]} strokeWidth={2} dot={false} name="Sessions" />
                <Line type="monotone" dataKey="users" stroke={CHART_COLORS[5]} strokeWidth={2} dot={false} name="Unique Users" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 3. Learning Outcomes */}
      <SectionHeader title="Learning Outcomes" icon={Brain} description="Are students getting better?" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <MetricCard title="Avg Score" value={`${data.learningOutcomes.avgScore}%`} icon={Target} />
        <MetricCard title="Avg Essay Score" value={`${data.learningOutcomes.avgEssayScore}%`} icon={PenTool} />
        <MetricCard title="Avg Diagram" value={`${data.learningOutcomes.avgDiagramScore}%`} icon={BarChart3} />
        <MetricCard title="Score Improvement" value={`${data.learningOutcomes.avgImprovement > 0 ? "+" : ""}${data.learningOutcomes.avgImprovement}%`} icon={TrendingUp} trend={data.learningOutcomes.avgImprovement > 0 ? "Improving" : undefined} />
        <MetricCard title="Total Sessions" value={data.learningOutcomes.totalSessions} icon={Activity} />
        <MetricCard title="Topics Covered" value={data.learningOutcomes.topicPerformance.length} icon={BookOpen} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score Improvement Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data.learningOutcomes.scoreOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={formatDate} />
                <Line type="monotone" dataKey="avgScore" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} name="Avg Score %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Grade Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={gradeDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" name="Students" radius={[4, 4, 0, 0]}>
                  {gradeDistData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Topic Mastery Heatmap */}
      {data.learningOutcomes.topicPerformance.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Topic Mastery (Weakest → Strongest)</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {data.learningOutcomes.topicPerformance.slice(0, 16).map((t) => (
                <div
                  key={t.topic}
                  className="rounded-lg px-3 py-2 text-xs"
                  style={{
                    backgroundColor: `hsl(${Math.min(t.avgScore * 1.2, 142)}, 60%, ${90 - t.avgScore * 0.3}%)`,
                    color: t.avgScore < 50 ? "hsl(0,0%,20%)" : "hsl(0,0%,15%)",
                  }}
                >
                  <p className="font-medium truncate">{t.topic}</p>
                  <p className="font-bold">{t.avgScore}% <span className="font-normal opacity-70">({t.count})</span></p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Feature Adoption */}
      <SectionHeader title="Feature Adoption" icon={Zap} description="Which features drive the most engagement?" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <MetricCard title="Total Feature Uses" value={Object.values(data.featureAdoption.featureUsage).reduce((a, b) => a + b, 0)} icon={Zap} />
        <MetricCard title="Avg Features/User" value={data.featureAdoption.avgFeaturesPerUser} icon={Activity} />
        <MetricCard title="Features Tracked" value={Object.keys(data.featureAdoption.featureUsage).length} icon={BarChart3} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Feature Usage</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={featureUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 10 }} width={130} />
                <Tooltip />
                <Bar dataKey="count" name="Usage" radius={[0, 4, 4, 0]}>
                  {featureUsageData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Feature Engagement Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.featureAdoption.featureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={formatDate} />
                <Area type="monotone" dataKey="question" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} name="Questions" />
                <Area type="monotone" dataKey="predicted_paper" stackId="1" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.3} name="Predicted Papers" />
                <Area type="monotone" dataKey="essay" stackId="1" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.3} name="Essays" />
                <Area type="monotone" dataKey="diagram" stackId="1" stroke={CHART_COLORS[3]} fill={CHART_COLORS[3]} fillOpacity={0.3} name="Diagrams" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 5. Predicted Paper Intelligence */}
      <SectionHeader title="Predicted Paper Intelligence" icon={Target} description="Deeper insights into the core feature" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MetricCard title="Papers Generated" value={data.predictedPaperIntel.totalGenerated} icon={BarChart3} />
        <MetricCard title="Papers Completed" value={data.predictedPaperIntel.totalCompleted} icon={Target} />
        <MetricCard title="Avg Score" value={`${data.predictedPaperIntel.avgScore}%`} icon={Award} />
        <MetricCard title="Completion Rate" value={
          data.predictedPaperIntel.totalGenerated > 0
            ? `${Math.round((data.predictedPaperIntel.totalCompleted / data.predictedPaperIntel.totalGenerated) * 100)}%`
            : "N/A"
        } icon={TrendingUp} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {ppSubjectData.length > 0 && (
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Papers by Exam Board</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={ppSubjectData} dataKey="count" nameKey="subject" cx="50%" cy="50%" outerRadius={90} label={({ subject, percent }) => `${subject} (${(percent * 100).toFixed(0)}%)`}>
                    {ppSubjectData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {data.predictedPaperIntel.topicWeaknesses.length > 0 && (
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Weakest Topics in Predicted Papers</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.predictedPaperIntel.topicWeaknesses} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <YAxis dataKey="topic" type="category" tick={{ fontSize: 9 }} width={140} />
                  <Tooltip />
                  <Bar dataKey="avgScore" name="Avg Score %" radius={[0, 4, 4, 0]}>
                    {data.predictedPaperIntel.topicWeaknesses.map((t, i) => (
                      <Cell key={i} fill={t.avgScore < 50 ? CHART_COLORS[3] : t.avgScore < 70 ? CHART_COLORS[2] : CHART_COLORS[1]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      {/* PP Score Trend & Most Improved */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {data.predictedPaperIntel.ppScoreOverTime.length > 0 && (
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Predicted Paper Score Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.predictedPaperIntel.ppScoreOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={formatDate} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip labelFormatter={formatDate} />
                  <Line type="monotone" dataKey="avgScore" stroke={CHART_COLORS[4]} strokeWidth={2} dot={false} name="Avg PP Score %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {data.predictedPaperIntel.mostImprovedModules.length > 0 && (
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Most Improved Modules</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.predictedPaperIntel.mostImprovedModules.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="topic" type="category" tick={{ fontSize: 9 }} width={140} />
                  <Tooltip />
                  <Bar dataKey="avgImprovement" name="Avg Improvement %" radius={[0, 4, 4, 0]}>
                    {data.predictedPaperIntel.mostImprovedModules.slice(0, 8).map((t, i) => (
                      <Cell key={i} fill={t.avgImprovement > 0 ? CHART_COLORS[1] : CHART_COLORS[3]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 6. Student Behaviour */}
      <SectionHeader title="Student Behaviour Insights" icon={Activity} description="How students actually use the platform" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
        <MetricCard title="Active Students" value={data.studentBehaviour.activeStudents} icon={Users} />
        <MetricCard title="Avg Sessions" value={data.studentBehaviour.avgSessionsPerUser} subtitle="per student" icon={Activity} />
        <MetricCard title="Avg Questions" value={data.studentBehaviour.avgQuestionsPerStudent} subtitle="per student" icon={BookOpen} />
        <MetricCard title="Avg PPs" value={data.studentBehaviour.avgPPsPerStudent} subtitle="per student" icon={Target} />
        <MetricCard title="Avg Diagrams" value={data.studentBehaviour.avgDiagramsPerStudent} subtitle="per student" icon={BarChart3} />
        <MetricCard title="Avg Essays" value={data.studentBehaviour.avgEssaysPerStudent} subtitle="per student" icon={PenTool} />
        <MetricCard title="Avg Study/Day" value={data.studentBehaviour.avgStudyTimePerDay > 0 ? `${data.studentBehaviour.avgStudyTimePerDay}m` : "N/A"} icon={Clock} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Hourly Activity Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.studentBehaviour.hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickFormatter={(h) => `${h}:00`} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip labelFormatter={(h) => `${h}:00 UTC`} />
                <Bar dataKey="sessions" name="Sessions" radius={[4, 4, 0, 0]} fill={CHART_COLORS[5]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Feature Usage Per Student</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {[
                { label: "Questions", value: data.studentBehaviour.avgQuestionsPerStudent, color: CHART_COLORS[0] },
                { label: "Predicted Papers", value: data.studentBehaviour.avgPPsPerStudent, color: CHART_COLORS[1] },
                { label: "Diagrams", value: data.studentBehaviour.avgDiagramsPerStudent, color: CHART_COLORS[2] },
                { label: "Essays", value: data.studentBehaviour.avgEssaysPerStudent, color: CHART_COLORS[3] },
              ].map((item) => {
                const maxVal = Math.max(
                  data.studentBehaviour.avgQuestionsPerStudent,
                  data.studentBehaviour.avgPPsPerStudent,
                  data.studentBehaviour.avgDiagramsPerStudent,
                  data.studentBehaviour.avgEssaysPerStudent,
                  1
                );
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28">{item.label}</span>
                    <div className="flex-1 h-5 rounded-md overflow-hidden bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / maxVal) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-md"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8 text-right">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7. Readiness Score Distribution */}
      <SectionHeader title="Readiness Score Distribution" icon={Mountain} description="Is the readiness system motivating students?" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MetricCard title="Avg Readiness" value={`${data.readiness.avgReadiness}%`} icon={Mountain} />
        <MetricCard title="Exam Ready" value={data.readiness.readinessTiers["Exam Ready"] || 0} icon={GraduationCap} color={TIER_COLORS["Exam Ready"]} />
        <MetricCard title="On Track" value={data.readiness.readinessTiers["On Track"] || 0} icon={TrendingUp} color={TIER_COLORS["On Track"]} />
        <MetricCard title="Building" value={data.readiness.readinessTiers["Building"] || 0} icon={Flame} color={TIER_COLORS["Building"]} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Readiness Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.readiness.readinessDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" name="Students" radius={[4, 4, 0, 0]}>
                  {data.readiness.readinessDistribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Readiness by Tier</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={tierData} dataKey="count" nameKey="tier" cx="50%" cy="50%" outerRadius={80} label={({ tier, percent }) => `${tier} (${(percent * 100).toFixed(0)}%)`}>
                  {tierData.map((d) => (
                    <Cell key={d.tier} fill={TIER_COLORS[d.tier] || CHART_COLORS[0]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Readiness Growth (Weekly Avg Score)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.readiness.readinessGrowth.filter(d => d.avgReadiness > 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avgReadiness" stroke={CHART_COLORS[1]} strokeWidth={2} dot name="Avg Readiness %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 8. Leaderboard Insights */}
      <SectionHeader title="Leaderboard Insights" icon={Award} description="Top students and power users" />
      <Tabs defaultValue="scores" className="mb-8">
        <TabsList>
          <TabsTrigger value="scores">Top Scores</TabsTrigger>
          <TabsTrigger value="active">Most Active</TabsTrigger>
          <TabsTrigger value="streaks">Longest Streaks</TabsTrigger>
          <TabsTrigger value="pps">Most PPs</TabsTrigger>
          <TabsTrigger value="readiness">Top Readiness</TabsTrigger>
        </TabsList>
        <TabsContent value="scores">
          <LeaderboardTable
            headers={["#", "Student", "Avg Score", "Sessions"]}
            rows={data.leaderboard.topScorers.map((s, i) => [i + 1, s.name, `${s.avgScore}%`, s.sessions])}
          />
        </TabsContent>
        <TabsContent value="active">
          <LeaderboardTable
            headers={["#", "Student", "Sessions", "Features Used"]}
            rows={data.leaderboard.mostActive.map((s, i) => [i + 1, s.name, s.sessions, s.features])}
          />
        </TabsContent>
        <TabsContent value="streaks">
          <LeaderboardTable
            headers={["#", "Student", "Streak (Days)"]}
            rows={data.leaderboard.longestStreakers.map((s, i) => [i + 1, s.name, `${s.streak} 🔥`])}
          />
        </TabsContent>
        <TabsContent value="pps">
          <LeaderboardTable
            headers={["#", "Student", "Papers Completed"]}
            rows={(data.leaderboard.mostPPsCompleted || []).map((s, i) => [i + 1, s.name, s.pps])}
          />
        </TabsContent>
        <TabsContent value="readiness">
          <LeaderboardTable
            headers={["#", "Student", "Readiness Score", "Tier"]}
            rows={(data.readiness.topReadiness || []).map((s, i) => [i + 1, s.name, `${s.score}%`, s.tier])}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function formatFeatureName(name: string) {
  const map: Record<string, string> = {
    question: "Practice Questions",
    predicted_paper: "Predicted Papers",
    "predicted-paper": "Predicted Papers",
    essay: "Essay Grader",
    diagram: "Diagram Builder",
    tutor: "AI Tutor",
    notes: "Study Notes",
    feature_use: "Feature Use",
    session_start: "Sessions",
  };
  return map[name] || name.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
