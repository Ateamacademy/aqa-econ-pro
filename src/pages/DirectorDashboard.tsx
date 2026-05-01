import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, TrendingUp, DollarSign, Brain, ShieldCheck,
  AlertCircle, RefreshCw, Activity, Zap, FileWarning, Server, CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";

const ALLOWED_EMAILS = [
  "admin@econrev.co",
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "aminul.miah@ateamacademy.co.uk",
  "info@ateamacademy.co.uk",
].map((e) => e.toLowerCase());

const TIME_FILTERS = [
  { value: "7d", label: "7 D" },
  { value: "30d", label: "30 D" },
  { value: "90d", label: "90 D" },
  { value: "all", label: "All" },
];

const SECTIONS = [
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "features", label: "Features", icon: Zap },
  { id: "ai", label: "AI Cost", icon: Brain },
  { id: "qa", label: "QA Health", icon: ShieldCheck },
];

const C = [
  "hsl(221, 83%, 53%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)", "hsl(262, 83%, 58%)", "hsl(199, 89%, 48%)",
];

interface RevenueData {
  mrr: number; arr: number; activeSubs: number; newSubs: number;
  cancelled: number; churnRate: number; grossRevenue: number;
  refunded: number; netRevenue: number; productMix: Record<string, number>;
  revenueTrend: { date: string; amount: number }[]; currency: string;
}

interface PlatformData {
  users: {
    total: number; newToday: number; newWeek: number; newMonth: number;
    onboarded: number; onboardedRate: number; dau: number; wau: number; mau: number;
    dauMau: number; userGrowth: { date: string; count: number }[];
    dauTrend: { date: string; count: number }[];
  };
  features: {
    activityCounts: Record<string, number>;
    counterTotals: { papers: number; practice: number; predictedPapers: number; tutor: number; diagrams: number };
  };
  ai: {
    calls: number; inputTokens: number; outputTokens: number; totalTokens: number;
    cacheHits: number; cacheHitRate: number; errors: number;
    byModel: Record<string, { in: number; out: number; calls: number }>;
    trend: { date: string; tokens: number }[];
  };
  qa: { open: number; resolved: number; bySeverity: Record<string, number>; pdfFailures: number };
}

function fmtDate(d: string) {
  if (!d) return "";
  const x = new Date(d);
  return `${x.getDate()}/${x.getMonth() + 1}`;
}

function fmtMoney(n: number, ccy = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(n);
}

function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

function Metric({ label, value, sub, icon: Icon, color }: {
  label: string; value: string | number; sub?: string; icon: any; color?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="rounded-xl border border-border/40 bg-card p-4 hover:border-primary/20 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
            <p className="text-xl font-bold mt-0.5 font-mono truncate">{value}</p>
            {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
          </div>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color || "hsl(var(--primary))"}15` }}>
            <Icon className="h-4 w-4" style={{ color: color || "hsl(var(--primary))" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ id, title, icon: Icon, desc, children }: {
  id: string; title: string; icon: any; desc?: string; children: React.ReactNode;
}) {
  return (
    <section id={`s-${id}`} className="scroll-mt-28 mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
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
      <CardHeader className="pb-1 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">{children}</CardContent>
    </Card>
  );
}

export default function DirectorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [platform, setPlatform] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeNav, setActiveNav] = useState("revenue");

  const isAllowed = user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    if (user && isAllowed) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAllowed, timeRange]);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [rev, plat] = await Promise.all([
        supabase.functions.invoke("director-revenue", { body: { timeRange } }),
        supabase.functions.invoke("director-platform-stats", { body: { timeRange } }),
      ]);
      if (rev.error) throw new Error(`Revenue: ${rev.error.message}`);
      if (plat.error) throw new Error(`Platform: ${plat.error.message}`);
      if (rev.data?.error) throw new Error(rev.data.error);
      if (plat.data?.error) throw new Error(plat.data.error);
      setRevenue(rev.data);
      setPlatform(plat.data);
    } catch (e: any) {
      console.error("Director dashboard error:", e);
      setError(e.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id.replace("s-", "")); }),
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(`s-${s.id}`); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [revenue, platform]);

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
        <h1 className="text-xl font-bold mb-2">Sign in required</h1>
        <p className="text-sm text-muted-foreground">Please sign in to access the Director Dashboard.</p>
      </div>
    );
  }
  if (!isAllowed) {
    return (
      <div className="container py-20 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-muted-foreground">Restricted to authorised team members.</p>
        <p className="text-xs text-muted-foreground/60 mt-2">Signed in as: {user.email}</p>
      </div>
    );
  }
  if (loading && (!revenue || !platform)) {
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
        <h1 className="text-xl font-bold mb-2">Error Loading Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchAll} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />Retry
        </Button>
      </div>
    );
  }
  if (!revenue || !platform) return null;

  const ccy = revenue.currency || "USD";
  const featureRows = Object.entries(platform.features.activityCounts)
    .map(([f, c]) => ({ feature: f, count: c }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
  const counterRows = [
    { feature: "Papers", count: platform.features.counterTotals.papers },
    { feature: "Practice", count: platform.features.counterTotals.practice },
    { feature: "Predicted Papers", count: platform.features.counterTotals.predictedPapers },
    { feature: "24/7 Tutor", count: platform.features.counterTotals.tutor },
    { feature: "Diagrams", count: platform.features.counterTotals.diagrams },
  ].sort((a, b) => b.count - a.count);
  const modelRows = Object.entries(platform.ai.byModel)
    .map(([m, v]) => ({ model: m, ...v, total: v.in + v.out }))
    .sort((a, b) => b.total - a.total);
  const sevRows = Object.entries(platform.qa.bySeverity)
    .map(([s, c]) => ({ severity: s, count: c }));
  let cum = 0;
  const cumGrowth = platform.users.userGrowth.map((d) => {
    cum += d.count;
    return { date: d.date, total: cum, new: d.count };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* sticky header */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3">
            <div>
              <h1 className="text-lg font-bold tracking-tight">Director Dashboard</h1>
              <p className="text-[10px] text-muted-foreground">Econ Rev · Revenue, growth & operations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={fetchAll} disabled={loading} className="h-7 w-7 p-0">
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
              </Button>
              <div className="inline-flex bg-muted/60 rounded-lg p-0.5">
                {TIME_FILTERS.map((f) => (
                  <button key={f.value} onClick={() => setTimeRange(f.value)}
                    className={cn(
                      "px-3 py-1 rounded-md text-[10px] font-semibold transition-all",
                      timeRange === f.value
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5 overflow-x-auto pb-2 -mb-px scrollbar-none">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id}
                  onClick={() => document.getElementById(`s-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all",
                    activeNav === s.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )}>
                  <Icon className="h-3 w-3" />{s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Revenue */}
        <Section id="revenue" title="Revenue & Subscriptions" icon={DollarSign} desc="Live from Stripe">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            <Metric label="MRR" value={fmtMoney(revenue.mrr, ccy)} icon={DollarSign} color={C[1]} />
            <Metric label="ARR" value={fmtMoney(revenue.arr, ccy)} icon={TrendingUp} color={C[1]} />
            <Metric label="Active Subs" value={revenue.activeSubs} icon={CreditCard} />
            <Metric label="New Subs" value={revenue.newSubs} sub={`Last ${timeRange}`} icon={Users} color={C[0]} />
            <Metric label="Churn" value={`${revenue.churnRate}%`} sub={`${revenue.cancelled} cancelled`} icon={Activity} color={C[3]} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
            <Metric label="Gross Revenue" value={fmtMoney(revenue.grossRevenue, ccy)} sub={`Last ${timeRange}`} icon={DollarSign} />
            <Metric label="Refunded" value={fmtMoney(revenue.refunded, ccy)} icon={DollarSign} color={C[3]} />
            <Metric label="Net Revenue" value={fmtMoney(revenue.netRevenue, ccy)} icon={DollarSign} color={C[1]} />
          </div>
          <ChartCard title="Revenue Trend">
            {revenue.revenueTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenue.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} formatter={(v: number) => fmtMoney(v, ccy)} />
                  <Area type="monotone" dataKey="amount" stroke={C[1]} fill={C[1]} fillOpacity={0.12} strokeWidth={2} name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            ) : <p className="text-xs text-muted-foreground py-8 text-center">No payments in range</p>}
          </ChartCard>
        </Section>

        {/* Growth */}
        <Section id="growth" title="User Growth & Activity" icon={TrendingUp}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            <Metric label="Total Users" value={platform.users.total} icon={Users} />
            <Metric label="New Today" value={platform.users.newToday} icon={Users} color={C[1]} />
            <Metric label="New This Week" value={platform.users.newWeek} icon={Users} />
            <Metric label="New This Month" value={platform.users.newMonth} icon={Users} />
            <Metric label="Onboarded" value={`${platform.users.onboardedRate}%`} sub={`${platform.users.onboarded} users`} icon={ShieldCheck} color={C[4]} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="DAU" value={platform.users.dau} icon={Activity} color={C[1]} />
            <Metric label="WAU" value={platform.users.wau} icon={Activity} />
            <Metric label="MAU" value={platform.users.mau} icon={Activity} />
            <Metric label="DAU/MAU" value={`${platform.users.dauMau}%`} sub="Stickiness" icon={Zap} color={C[4]} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
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
                <BarChart data={platform.users.dauTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Bar dataKey="count" fill={C[1]} radius={[3, 3, 0, 0]} name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </Section>

        {/* Features */}
        <Section id="features" title="Feature Usage" icon={Zap} desc="Free-tier counters & activity events">
          <div className="grid lg:grid-cols-2 gap-3 mb-5">
            <ChartCard title="Free-Tier Usage by Feature">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={counterRows} layout="vertical" margin={{ left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 9 }} />
                  <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={110} />
                  <Tooltip />
                  <Bar dataKey="count" fill={C[0]} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Top Activity Events">
              {featureRows.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={featureRows} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 9 }} />
                    <YAxis type="category" dataKey="feature" tick={{ fontSize: 9 }} width={130} />
                    <Tooltip />
                    <Bar dataKey="count" fill={C[4]} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-xs text-muted-foreground py-8 text-center">No activity in range</p>}
            </ChartCard>
          </div>
        </Section>

        {/* AI Cost */}
        <Section id="ai" title="AI Cost & Usage" icon={Brain} desc="Token spend across models">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            <Metric label="Total Calls" value={fmtNum(platform.ai.calls)} icon={Server} />
            <Metric label="Input Tokens" value={fmtNum(platform.ai.inputTokens)} icon={Brain} />
            <Metric label="Output Tokens" value={fmtNum(platform.ai.outputTokens)} icon={Brain} color={C[0]} />
            <Metric label="Cache Hit Rate" value={`${platform.ai.cacheHitRate}%`} sub={`${platform.ai.cacheHits} hits`} icon={Zap} color={C[1]} />
            <Metric label="Errors" value={platform.ai.errors} icon={AlertCircle} color={C[3]} />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <ChartCard title="Token Usage Trend">
              {platform.ai.trend.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={platform.ai.trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={fmtNum} />
                    <Tooltip labelFormatter={fmtDate} formatter={(v: number) => fmtNum(v)} />
                    <Area type="monotone" dataKey="tokens" stroke={C[4]} fill={C[4]} fillOpacity={0.1} strokeWidth={2} name="Tokens" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : <p className="text-xs text-muted-foreground py-8 text-center">No AI calls in range</p>}
            </ChartCard>
            <ChartCard title="Tokens by Model">
              {modelRows.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={modelRows} layout="vertical" margin={{ left: 90 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={fmtNum} />
                    <YAxis type="category" dataKey="model" tick={{ fontSize: 9 }} width={140} />
                    <Tooltip formatter={(v: number) => fmtNum(v)} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="in" stackId="a" fill={C[0]} name="Input" />
                    <Bar dataKey="out" stackId="a" fill={C[1]} name="Output" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-xs text-muted-foreground py-8 text-center">No model data</p>}
            </ChartCard>
          </div>
        </Section>

        {/* QA Health */}
        <Section id="qa" title="Content & QA Health" icon={ShieldCheck} desc="Tracker issues and pipeline failures">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="Open Issues" value={platform.qa.open} icon={AlertCircle} color={C[3]} />
            <Metric label="Resolved" value={platform.qa.resolved} icon={ShieldCheck} color={C[1]} />
            <Metric label="PDF/Diagram Failures" value={platform.qa.pdfFailures} sub={`Last ${timeRange}`} icon={FileWarning} color={C[2]} />
            <Metric label="Resolution Rate"
              value={`${platform.qa.open + platform.qa.resolved > 0
                ? Math.round((platform.qa.resolved / (platform.qa.open + platform.qa.resolved)) * 100)
                : 0}%`}
              icon={ShieldCheck} color={C[4]} />
          </div>
          {sevRows.length > 0 && (
            <ChartCard title="Open Issues by Severity">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={sevRows} dataKey="count" nameKey="severity" cx="50%" cy="50%" outerRadius={80} label={{ fontSize: 10 }}>
                    {sevRows.map((_, i) => <Cell key={i} fill={C[i % C.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </Section>
      </div>
    </div>
  );
}
