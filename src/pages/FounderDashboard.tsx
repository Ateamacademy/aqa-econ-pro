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
  Flame, BarChart3, Activity, AlertCircle, ShieldCheck,
} from "lucide-react";

const ALLOWED_EMAILS = ["haider_78@outlook.com", "admin@econrev.co"];
const TIME_FILTERS = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
];

const CHART_COLORS = [
  "hsl(221, 83%, 53%)", // blue
  "hsl(142, 71%, 45%)", // green
  "hsl(38, 92%, 50%)",  // amber
  "hsl(0, 72%, 51%)",   // red
  "hsl(262, 83%, 58%)", // purple
  "hsl(199, 89%, 48%)", // cyan
  "hsl(25, 95%, 53%)",  // orange
  "hsl(330, 81%, 60%)", // pink
];

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
  };
  habitFormation: {
    avgStreak: number;
    longestStreak: number;
    studying3Plus: number;
    studying5Plus: number;
    avgSessionsPerUser: number;
    dailyReturningUsers: number;
  };
  learningOutcomes: {
    avgScore: number;
    gradeDistribution: Record<string, number>;
    scoreOverTime: { date: string; avgScore: number }[];
    topicPerformance: { topic: string; avgScore: number; count: number }[];
    totalSessions: number;
  };
  featureAdoption: {
    featureUsage: Record<string, number>;
    featureTrend: any[];
  };
  predictedPaperIntel: {
    totalGenerated: number;
    totalCompleted: number;
    avgScore: number;
    bySubject: Record<string, number>;
    topicWeaknesses: { topic: string; avgScore: number; count: number }[];
  };
  studentBehaviour: {
    activeStudents: number;
    avgSessionsPerUser: number;
    avgQuestionsPerStudent: number;
  };
  leaderboard: {
    topScorers: { userId: string; name: string; avgScore: number; sessions: number }[];
    mostActive: { userId: string; name: string; sessions: number; features: number }[];
    longestStreakers: { userId: string; name: string; streak: number }[];
  };
  insights: string[];
}

function MetricCard({ title, value, subtitle, icon: Icon, trend }: {
  title: string; value: string | number; subtitle?: string;
  icon: any; trend?: string;
}) {
  return (
    <Card className="bg-card/80 backdrop-blur border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {trend && <p className="text-xs text-emerald-400 mt-1">{trend}</p>}
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeader({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

export default function FounderDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");

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

  // Cumulative user growth
  let cumulative = 0;
  const cumulativeGrowth = data.productGrowth.userGrowth.map(d => {
    cumulative += d.count;
    return { date: d.date, total: cumulative, new: d.count };
  });

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

      {/* Insights Panel */}
      {data.insights.length > 0 && (
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Key Insights</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {data.insights.map((insight, i) => (
                <p key={i} className="text-xs text-muted-foreground bg-background/50 rounded-lg px-3 py-2">
                  {insight}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 1. Product Growth */}
      <SectionHeader title="Product Growth" icon={TrendingUp} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <MetricCard title="Total Users" value={data.productGrowth.totalUsers} icon={Users} />
        <MetricCard title="New Today" value={data.productGrowth.newUsersToday} icon={Users} />
        <MetricCard title="New This Week" value={data.productGrowth.newUsersWeek} icon={Users} />
        <MetricCard title="DAU" value={data.productGrowth.dau} subtitle={`WAU: ${data.productGrowth.wau} | MAU: ${data.productGrowth.mau}`} icon={Activity} />
        <MetricCard title="DAU/MAU" value={`${data.productGrowth.dauMauRatio}%`} subtitle="Engagement ratio" icon={Target} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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
            <ResponsiveContainer width="100%" height={250}>
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

      {/* 2. Habit Formation */}
      <SectionHeader title="Habit Formation" icon={Flame} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <MetricCard title="Avg Streak" value={`${data.habitFormation.avgStreak} days`} icon={Flame} />
        <MetricCard title="Longest Streak" value={`${data.habitFormation.longestStreak} days`} icon={Award} />
        <MetricCard title="Daily Returns" value={data.habitFormation.dailyReturningUsers} icon={Users} />
        <MetricCard title="3+ Days/Wk" value={data.habitFormation.studying3Plus} icon={Target} />
        <MetricCard title="5+ Days/Wk" value={data.habitFormation.studying5Plus} icon={Zap} />
        <MetricCard title="Avg Sessions" value={data.habitFormation.avgSessionsPerUser} subtitle="per student" icon={Activity} />
      </div>

      {/* 3. Learning Outcomes */}
      <SectionHeader title="Learning Outcomes" icon={Brain} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MetricCard title="Avg Score" value={`${data.learningOutcomes.avgScore}%`} icon={Target} />
        <MetricCard title="Total Sessions" value={data.learningOutcomes.totalSessions} icon={BarChart3} />
        <MetricCard title="Topics Covered" value={data.learningOutcomes.topicPerformance.length} icon={Brain} />
        <MetricCard title="PP Avg Score" value={`${data.predictedPaperIntel.avgScore}%`} icon={Award} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score Improvement Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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
            <ResponsiveContainer width="100%" height={250}>
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

      {/* Topic Performance Heatmap (table style) */}
      {data.learningOutcomes.topicPerformance.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Topic Performance (Weakest → Strongest)</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {data.learningOutcomes.topicPerformance.slice(0, 16).map((t, i) => (
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
      <SectionHeader title="Feature Adoption" icon={Zap} />
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Feature Usage</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={featureUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 10 }} width={120} />
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
            <ResponsiveContainer width="100%" height={250}>
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
      <SectionHeader title="Predicted Paper Intelligence" icon={Target} />
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
              <ResponsiveContainer width="100%" height={250}>
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
              <ResponsiveContainer width="100%" height={250}>
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

      {/* 6. Student Behaviour */}
      <SectionHeader title="Student Behaviour" icon={Activity} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <MetricCard title="Active Students" value={data.studentBehaviour.activeStudents} icon={Users} />
        <MetricCard title="Avg Sessions/Student" value={data.studentBehaviour.avgSessionsPerUser} icon={Activity} />
        <MetricCard title="Avg Duration" value={data.productGrowth.avgSessionDuration > 0 ? `${Math.round(data.productGrowth.avgSessionDuration / 60)}m` : "N/A"} icon={Clock} />
      </div>

      {/* 7. Leaderboards */}
      <SectionHeader title="Leaderboard Insights" icon={Award} />
      <Tabs defaultValue="scores" className="mb-8">
        <TabsList>
          <TabsTrigger value="scores">Top Scores</TabsTrigger>
          <TabsTrigger value="active">Most Active</TabsTrigger>
          <TabsTrigger value="streaks">Longest Streaks</TabsTrigger>
        </TabsList>
        <TabsContent value="scores">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-xs text-muted-foreground">#</th>
                    <th className="text-left p-3 text-xs text-muted-foreground">Student</th>
                    <th className="text-right p-3 text-xs text-muted-foreground">Avg Score</th>
                    <th className="text-right p-3 text-xs text-muted-foreground">Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leaderboard.topScorers.map((s, i) => (
                    <tr key={s.userId} className="border-b border-border/50 last:border-0">
                      <td className="p-3 font-medium">{i + 1}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 text-right font-semibold">{s.avgScore}%</td>
                      <td className="p-3 text-right text-muted-foreground">{s.sessions}</td>
                    </tr>
                  ))}
                  {data.leaderboard.topScorers.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No data yet</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-xs text-muted-foreground">#</th>
                    <th className="text-left p-3 text-xs text-muted-foreground">Student</th>
                    <th className="text-right p-3 text-xs text-muted-foreground">Sessions</th>
                    <th className="text-right p-3 text-xs text-muted-foreground">Features Used</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leaderboard.mostActive.map((s, i) => (
                    <tr key={s.userId} className="border-b border-border/50 last:border-0">
                      <td className="p-3 font-medium">{i + 1}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 text-right font-semibold">{s.sessions}</td>
                      <td className="p-3 text-right text-muted-foreground">{s.features}</td>
                    </tr>
                  ))}
                  {data.leaderboard.mostActive.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No data yet</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="streaks">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-xs text-muted-foreground">#</th>
                    <th className="text-left p-3 text-xs text-muted-foreground">Student</th>
                    <th className="text-right p-3 text-xs text-muted-foreground">Streak (Days)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.leaderboard.longestStreakers.map((s, i) => (
                    <tr key={s.userId} className="border-b border-border/50 last:border-0">
                      <td className="p-3 font-medium">{i + 1}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 text-right font-semibold">{s.streak} 🔥</td>
                    </tr>
                  ))}
                  {data.leaderboard.longestStreakers.length === 0 && (
                    <tr><td colSpan={3} className="p-6 text-center text-muted-foreground">No data yet</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
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
