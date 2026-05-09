import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, TrendingUp, DollarSign, Brain, ShieldCheck,
  AlertCircle, RefreshCw, Activity, Zap, FileWarning, Server, CreditCard,
  Clock, Search, Download, Info, ArrowUp, ArrowDown, Minus, Database,
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
  { id: "snapshot", label: "Snapshot", icon: Activity },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "engagement", label: "Engagement", icon: Clock },
  { id: "retention", label: "Retention", icon: Users },
  { id: "directory", label: "User Directory", icon: Database },
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
    dauMau: number; activeInRange: number;
    userGrowth: { date: string; count: number }[];
    dauTrend: { date: string; count: number }[];
    deltas: { newSignups: number; mau: number };
  };
  sessions: {
    avgSeconds: number; medianSeconds: number;
    totalSecondsToday: number; totalSecondsWeek: number;
    totalSecondsMonth: number; totalSecondsAll: number;
    sampleCount: number;
    histogram: { bucket: string; count: number }[];
  };
  retention: { d1: number; d7: number; d30: number };
  cohorts: { cohort: string; size: number; [k: string]: number | string }[];
  routes: { path: string; views: number; uniqueUsers: number }[];
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

interface UserRow {
  user_id: string; email: string; display_name: string | null;
  signup_date: string; last_active: string | null; plan: string;
  sessions: number; lifetime_seconds: number;
  exam_board: string | null; target_grade: string | null; onboarded: boolean;
  free_papers_used: number; free_questions_used: number;
  free_predicted_papers_used: number; free_tutor_used: number; free_diagrams_used: number;
}

function fmtDate(d: string) {
  if (!d) return "";
  const x = new Date(d);
  return `${x.getDate()}/${x.getMonth() + 1}`;
}
function fmtDateTime(d: string | null) {
  if (!d) return "·";
  return new Date(d).toLocaleString();
}
function fmtMoney(n: number, ccy = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(n);
}
function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}
function fmtDuration(seconds: number) {
  if (!seconds) return "0s";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
}

function Delta({ value }: { value: number }) {
  if (value === 0 || !isFinite(value)) {
    return <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><Minus className="h-2.5 w-2.5" />0%</span>;
  }
  const positive = value > 0;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[10px] font-medium",
      positive ? "text-emerald-500" : "text-red-500")}>
      {positive ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />}
      {Math.abs(value)}%
    </span>
  );
}

function Metric({ label, value, sub, icon: Icon, color, delta, tooltip }: {
  label: string; value: string | number; sub?: string; icon: any;
  color?: string; delta?: number; tooltip?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="rounded-xl border border-border/40 bg-card p-4 hover:border-primary/20 transition-colors h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
              {tooltip && (
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-2.5 w-2.5 text-muted-foreground/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">{tooltip}</TooltipContent>
                </UITooltip>
              )}
            </div>
            <p className="text-xl font-bold mt-0.5 font-mono truncate">{value}</p>
            <div className="flex items-center gap-2 mt-0.5">
              {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
              {delta !== undefined && <Delta value={delta} />}
            </div>
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

function exportCsv(rows: UserRow[]) {
  const headers = [
    "email", "display_name", "signup_date", "last_active", "plan",
    "sessions", "lifetime_seconds", "exam_board", "target_grade", "onboarded",
    "free_papers_used", "free_questions_used", "free_predicted_papers_used",
    "free_tutor_used", "free_diagrams_used",
  ];
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => {
      const v = (r as any)[h];
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `econrev-users-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DirectorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [platform, setPlatform] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeNav, setActiveNav] = useState("snapshot");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Directory state
  const [dirRows, setDirRows] = useState<UserRow[]>([]);
  const [dirTotal, setDirTotal] = useState(0);
  const [dirTotalPro, setDirTotalPro] = useState(0);
  const [dirLoading, setDirLoading] = useState(false);
  const [dirSearch, setDirSearch] = useState("");
  const [dirSortBy, setDirSortBy] = useState<"signup" | "lastActive" | "sessions" | "email">("signup");
  const [dirSortDir, setDirSortDir] = useState<"asc" | "desc">("desc");
  const [dirPage, setDirPage] = useState(1);
  const dirPageSize = 50;
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const dirSearchTimer = useRef<number | null>(null);

  const isAllowed = user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

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
      setLastRefresh(new Date());
    } catch (e: any) {
      console.error("Director dashboard error:", e);
      setError(e.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectory = async (overrides: Partial<{
    page: number; search: string; sortBy: string; sortDir: string; exportAll: boolean;
  }> = {}) => {
    if (!isAllowed) return null;
    setDirLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("director-user-directory", {
        body: {
          page: overrides.page ?? dirPage,
          pageSize: dirPageSize,
          search: overrides.search ?? dirSearch,
          sortBy: overrides.sortBy ?? dirSortBy,
          sortDir: overrides.sortDir ?? dirSortDir,
          exportAll: overrides.exportAll ?? false,
        },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (!overrides.exportAll) {
        setDirRows(data.rows);
        setDirTotal(data.total);
        setDirTotalPro(data.totalPro);
      }
      return data;
    } catch (e: any) {
      console.error("Directory fetch error:", e);
      return null;
    } finally {
      setDirLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAllowed) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAllowed, timeRange]);

  // Initial directory load
  useEffect(() => {
    if (user && isAllowed) fetchDirectory({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAllowed]);

  // Re-fetch directory on sort change
  useEffect(() => {
    if (user && isAllowed) fetchDirectory({ page: dirPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirSortBy, dirSortDir, dirPage]);

  // Debounced search
  useEffect(() => {
    if (!user || !isAllowed) return;
    if (dirSearchTimer.current) window.clearTimeout(dirSearchTimer.current);
    dirSearchTimer.current = window.setTimeout(() => {
      setDirPage(1);
      fetchDirectory({ page: 1, search: dirSearch });
    }, 300);
    return () => { if (dirSearchTimer.current) window.clearTimeout(dirSearchTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirSearch]);

  // Auto-refresh every 5 min
  useEffect(() => {
    if (!user || !isAllowed) return;
    const id = window.setInterval(() => {
      fetchAll();
    }, 5 * 60 * 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAllowed, timeRange]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id.replace("s-", "")); }),
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(`s-${s.id}`); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [revenue, platform]);

  const handleExportAll = async () => {
    const data = await fetchDirectory({ exportAll: true });
    if (data?.rows) exportCsv(data.rows as UserRow[]);
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
  const sevRows = Object.entries(platform.qa.bySeverity).map(([s, c]) => ({ severity: s, count: c }));
  let cum = 0;
  const cumGrowth = platform.users.userGrowth.map((d) => {
    cum += d.count;
    return { date: d.date, total: cum, new: d.count };
  });

  const conversionRate = platform.users.total > 0
    ? Math.round((revenue.activeSubs / platform.users.total) * 1000) / 10
    : 0;

  const totalPages = Math.max(1, Math.ceil(dirTotal / dirPageSize));

  return (
    <TooltipProvider delayDuration={150}>
    <div className="min-h-screen bg-background">
      {/* sticky header */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight">Director Dashboard</h1>
              <p className="text-[10px] text-muted-foreground truncate">
                Econ Rev · Live data{lastRefresh ? ` · Refreshed ${lastRefresh.toLocaleTimeString()}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="ghost" onClick={fetchAll} disabled={loading} className="h-7 w-7 p-0"
                title="Refresh now (auto every 5 min)">
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
        {/* Snapshot */}
        <Section id="snapshot" title="Top-Line Health" icon={Activity}
          desc={`Period over period (${timeRange} vs prior ${timeRange})`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <Metric label="Total Users" value={fmtNum(platform.users.total)}
              icon={Users} delta={platform.users.deltas.newSignups}
              sub={`+${platform.users.newMonth} this month`}
              tooltip="Lifetime registered accounts. Delta compares new signups in current vs previous period." />
            <Metric label="MAU" value={fmtNum(platform.users.mau)} icon={Activity} color={C[1]}
              delta={platform.users.deltas.mau}
              tooltip='Monthly Active Users · distinct accounts that performed at least one tracked action in the last 30 days.' />
            <Metric label="Pro Subscribers" value={revenue.activeSubs} icon={CreditCard} color={C[4]}
              sub={`${conversionRate}% conversion`}
              tooltip="Active Stripe subscriptions. Conversion = active subs ÷ total registered users." />
            <Metric label="MRR" value={fmtMoney(revenue.mrr, ccy)} icon={DollarSign} color={C[1]}
              sub={`${fmtMoney(revenue.arr, ccy)} ARR`}
              tooltip="Monthly Recurring Revenue · normalised across yearly/weekly subscriptions." />
            <Metric label="Avg Session" value={fmtDuration(platform.sessions.avgSeconds)}
              icon={Clock}
              sub={`Median ${fmtDuration(platform.sessions.medianSeconds)}`}
              tooltip="Mean and median of session_end events. Median is more honest with skewed data." />
          </div>
        </Section>

        {/* Revenue */}
        <Section id="revenue" title="Revenue & Subscriptions" icon={DollarSign} desc="Live from Stripe">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
            <Metric label="MRR" value={fmtMoney(revenue.mrr, ccy)} icon={DollarSign} color={C[1]}
              tooltip="Monthly Recurring Revenue across all active subscriptions, normalised to a monthly cadence." />
            <Metric label="ARR" value={fmtMoney(revenue.arr, ccy)} icon={TrendingUp} color={C[1]}
              tooltip="Annual Recurring Revenue (MRR × 12)." />
            <Metric label="Active Subs" value={revenue.activeSubs} icon={CreditCard}
              tooltip="Count of subscriptions with status=active in Stripe." />
            <Metric label="New Subs" value={revenue.newSubs} sub={`Last ${timeRange}`} icon={Users} color={C[0]}
              tooltip="New subscriptions created in the selected period." />
            <Metric label="Churn" value={`${revenue.churnRate}%`} sub={`${revenue.cancelled} cancelled`} icon={Activity} color={C[3]}
              tooltip="Cancelled subscriptions ÷ (active + cancelled) within the selected period." />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
            <Metric label="Gross Revenue" value={fmtMoney(revenue.grossRevenue, ccy)} sub={`Last ${timeRange}`} icon={DollarSign}
              tooltip="Sum of paid Stripe charges in the period (before refunds)." />
            <Metric label="Refunded" value={fmtMoney(revenue.refunded, ccy)} icon={DollarSign} color={C[3]}
              tooltip="Total refunded amount on charges in the period." />
            <Metric label="Net Revenue" value={fmtMoney(revenue.netRevenue, ccy)} icon={DollarSign} color={C[1]}
              tooltip="Gross revenue minus refunds." />
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
            <Metric label="Total Users" value={platform.users.total} icon={Users}
              tooltip="Lifetime profile rows (one per registered account)." />
            <Metric label="New Today" value={platform.users.newToday} icon={Users} color={C[1]}
              tooltip="Profiles created in the last 24 hours." />
            <Metric label="New This Week" value={platform.users.newWeek} icon={Users}
              tooltip="Profiles created in the last 7 days." />
            <Metric label="New This Month" value={platform.users.newMonth} icon={Users}
              tooltip="Profiles created in the last 30 days." />
            <Metric label="Onboarded" value={`${platform.users.onboardedRate}%`} sub={`${platform.users.onboarded} users`} icon={ShieldCheck} color={C[4]}
              tooltip="% of all users with onboarding_completed = true." />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            <Metric label="DAU" value={platform.users.dau} icon={Activity} color={C[1]}
              tooltip="Distinct users who logged at least one event in the last 24h. 'Active' = appears in user_activity_log." />
            <Metric label="WAU" value={platform.users.wau} icon={Activity}
              tooltip="Distinct active users in the last 7 days." />
            <Metric label="MAU" value={platform.users.mau} icon={Activity}
              tooltip="Distinct active users in the last 30 days." />
            <Metric label="DAU/MAU" value={`${platform.users.dauMau}%`} sub="Stickiness" icon={Zap} color={C[4]}
              tooltip="DAU ÷ MAU. Above 20% is generally considered strong stickiness." />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <ChartCard title="Cumulative User Growth (in range)">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={cumGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={fmtDate} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip labelFormatter={fmtDate} />
                  <Area type="monotone" dataKey="total" stroke={C[0]} fill={C[0]} fillOpacity={0.08} strokeWidth={2} name="Cumulative" />
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

        {/* Engagement */}
        <Section id="engagement" title="Engagement & Time on App" icon={Clock}
          desc={`From session_end events. Sample size: ${platform.sessions.sampleCount} sessions in range`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
            <Metric label="Avg Session" value={fmtDuration(platform.sessions.avgSeconds)} icon={Clock}
              tooltip="Mean session length from session_end events in selected range." />
            <Metric label="Median Session" value={fmtDuration(platform.sessions.medianSeconds)} icon={Clock} color={C[1]}
              tooltip="50th percentile session length. More resistant to outliers than the mean." />
            <Metric label="Time Today" value={fmtDuration(platform.sessions.totalSecondsToday)} icon={Activity}
              tooltip="Sum of all session durations in the last 24h." />
            <Metric label="Time This Week" value={fmtDuration(platform.sessions.totalSecondsWeek)} icon={Activity}
              tooltip="Sum of session durations in the last 7d." />
            <Metric label="Time This Month" value={fmtDuration(platform.sessions.totalSecondsMonth)} icon={Activity}
              tooltip="Sum of session durations in the last 30d." />
            <Metric label="Time Lifetime" value={fmtDuration(platform.sessions.totalSecondsAll)} icon={Activity} color={C[4]}
              tooltip="Cumulative session time across all loaded events (capped to recent history)." />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <ChartCard title="Session Duration Distribution">
              {platform.sessions.sampleCount > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={platform.sessions.histogram}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="bucket" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill={C[4]} radius={[3, 3, 0, 0]} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xs text-muted-foreground mb-2">No completed sessions in range yet</p>
                  <p className="text-[10px] text-muted-foreground/60">
                    Sessions are recorded when users navigate away (session_end event in user_activity_log).
                  </p>
                </div>
              )}
            </ChartCard>
            <ChartCard title="Top Pages by Visit">
              {platform.routes.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={platform.routes.slice(0, 10)} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 9 }} />
                    <YAxis type="category" dataKey="path" tick={{ fontSize: 9 }} width={130} />
                    <Tooltip />
                    <Bar dataKey="views" fill={C[0]} radius={[0, 3, 3, 0]} name="Views" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-xs text-muted-foreground py-8 text-center">No page-view data in range</p>}
            </ChartCard>
          </div>
        </Section>

        {/* Retention */}
        <Section id="retention" title="Retention & Cohorts" icon={Users}
          desc="Did users come back? Definition: any tracked event during the retention window">
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <Metric label="Day 1 Retention" value={`${platform.retention.d1}%`} icon={Activity} color={C[1]}
              tooltip="% of users who returned on day 1 after signup. Eligible cohort = users at least 1 day old." />
            <Metric label="Day 7 Retention" value={`${platform.retention.d7}%`} icon={Activity}
              tooltip="% of users active 7 days after signup. Eligible cohort = users at least 7 days old." />
            <Metric label="Day 30 Retention" value={`${platform.retention.d30}%`} icon={Activity} color={C[4]}
              tooltip="% of users active 30 days after signup. Eligible cohort = users at least 30 days old." />
          </div>
          <ChartCard title="Weekly Cohort Retention (last 8 cohorts)">
            {platform.cohorts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border/40">
                      <th className="text-left p-2 font-medium">Cohort</th>
                      <th className="text-right p-2 font-medium">Size</th>
                      {Array.from({ length: 8 }, (_, i) => (
                        <th key={i} className="text-center p-2 font-medium">W{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platform.cohorts.map((c) => (
                      <tr key={c.cohort as string} className="border-b border-border/20">
                        <td className="p-2 font-mono">{c.cohort}</td>
                        <td className="p-2 text-right font-mono">{c.size}</td>
                        {Array.from({ length: 8 }, (_, i) => {
                          const v = (c[`w${i}`] as number) ?? 0;
                          const intensity = Math.min(1, v / 100);
                          return (
                            <td key={i} className="p-1 text-center">
                              <div className="rounded px-1.5 py-1 font-mono"
                                style={{
                                  backgroundColor: v > 0 ? `hsla(142, 71%, 45%, ${intensity * 0.6})` : "transparent",
                                  color: intensity > 0.4 ? "white" : undefined,
                                }}>
                                {v}%
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-xs text-muted-foreground py-8 text-center">Not enough cohort data yet</p>}
          </ChartCard>
        </Section>

        {/* User Directory */}
        <Section id="directory" title="User Directory" icon={Database}
          desc={`${dirTotal} total users · ${dirTotalPro} pro · live join of auth.users + profiles + activity + Stripe`}>
          <Card className="border-border/40">
            <CardContent className="p-3">
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={dirSearch} onChange={(e) => setDirSearch(e.target.value)}
                    placeholder="Search by email or name..." className="pl-8 h-8 text-xs" />
                </div>
                <select value={dirSortBy} onChange={(e) => setDirSortBy(e.target.value as any)}
                  className="bg-muted/40 border border-border/40 rounded-md px-2 text-xs h-8">
                  <option value="signup">Signup date</option>
                  <option value="lastActive">Last active</option>
                  <option value="sessions">Sessions</option>
                  <option value="email">Email</option>
                </select>
                <Button variant="outline" size="sm" className="h-8" onClick={() => setDirSortDir(d => d === "asc" ? "desc" : "asc")}>
                  {dirSortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </Button>
                <Button size="sm" variant="outline" className="h-8" onClick={handleExportAll} disabled={dirLoading}>
                  <Download className="h-3 w-3 mr-1" /> Export CSV
                </Button>
              </div>
              <div className="overflow-x-auto rounded-md border border-border/40">
                <table className="w-full text-[11px]">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground">
                      <th className="p-2 font-medium">Email</th>
                      <th className="p-2 font-medium">Plan</th>
                      <th className="p-2 font-medium">Signup</th>
                      <th className="p-2 font-medium">Last Active</th>
                      <th className="p-2 font-medium text-right">Sessions</th>
                      <th className="p-2 font-medium text-right">Lifetime</th>
                      <th className="p-2 font-medium">Board</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dirRows.map((r) => (
                      <tr key={r.user_id}
                        onClick={() => setSelectedUser(r)}
                        className="border-t border-border/30 hover:bg-muted/30 cursor-pointer">
                        <td className="p-2 font-mono truncate max-w-[220px]" title={r.email}>{r.email}</td>
                        <td className="p-2">
                          <Badge variant={r.plan === "pro" ? "default" : "outline"} className="text-[9px] h-4 px-1.5">
                            {r.plan}
                          </Badge>
                        </td>
                        <td className="p-2 font-mono text-muted-foreground">
                          {r.signup_date ? new Date(r.signup_date).toLocaleDateString() : "·"}
                        </td>
                        <td className="p-2 font-mono text-muted-foreground">
                          {r.last_active ? new Date(r.last_active).toLocaleDateString() : "·"}
                        </td>
                        <td className="p-2 text-right font-mono">{r.sessions}</td>
                        <td className="p-2 text-right font-mono">{fmtDuration(r.lifetime_seconds)}</td>
                        <td className="p-2 text-muted-foreground">{r.exam_board ?? "·"}</td>
                      </tr>
                    ))}
                    {dirRows.length === 0 && !dirLoading && (
                      <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No users found</td></tr>
                    )}
                    {dirLoading && (
                      <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">
                        <div className="inline-flex items-center gap-2">
                          <RefreshCw className="h-3 w-3 animate-spin" /> Loading…
                        </div>
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
                <span>Page {dirPage} of {totalPages} · showing {dirRows.length} of {dirTotal}</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-6 text-[10px]"
                    disabled={dirPage <= 1 || dirLoading}
                    onClick={() => setDirPage(p => Math.max(1, p - 1))}>Prev</Button>
                  <Button variant="outline" size="sm" className="h-6 text-[10px]"
                    disabled={dirPage >= totalPages || dirLoading}
                    onClick={() => setDirPage(p => p + 1)}>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedUser && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedUser(null)}>
              <Card className="max-w-lg w-full border-border" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                  <CardTitle className="text-base font-mono">{selectedUser.email}</CardTitle>
                  <p className="text-[10px] text-muted-foreground">{selectedUser.user_id}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div><span className="text-muted-foreground">Plan:</span> <Badge variant={selectedUser.plan === "pro" ? "default" : "outline"} className="text-[9px] h-4">{selectedUser.plan}</Badge></div>
                    <div><span className="text-muted-foreground">Onboarded:</span> {selectedUser.onboarded ? "Yes" : "No"}</div>
                    <div><span className="text-muted-foreground">Signup:</span> {fmtDateTime(selectedUser.signup_date)}</div>
                    <div><span className="text-muted-foreground">Last active:</span> {fmtDateTime(selectedUser.last_active)}</div>
                    <div><span className="text-muted-foreground">Sessions:</span> {selectedUser.sessions}</div>
                    <div><span className="text-muted-foreground">Lifetime:</span> {fmtDuration(selectedUser.lifetime_seconds)}</div>
                    <div><span className="text-muted-foreground">Board:</span> {selectedUser.exam_board ?? "·"}</div>
                    <div><span className="text-muted-foreground">Target:</span> {selectedUser.target_grade ?? "·"}</div>
                  </div>
                  <div className="border-t border-border/40 pt-2 mt-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Free-tier counters</p>
                    <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                      <span>Papers: {selectedUser.free_papers_used}</span>
                      <span>Practice: {selectedUser.free_questions_used}</span>
                      <span>Predicted: {selectedUser.free_predicted_papers_used}</span>
                      <span>Tutor: {selectedUser.free_tutor_used}</span>
                      <span>Diagrams: {selectedUser.free_diagrams_used}</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedUser(null)}>Close</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
    </TooltipProvider>
  );
}
