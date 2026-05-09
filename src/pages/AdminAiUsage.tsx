import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Database, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

interface UsageRow {
  created_at: string;
  cache_hit: boolean;
  status: string;
  provider: string;
  model: string;
  input_tokens: number | null;
  output_tokens: number | null;
}

interface DailyBucket {
  date: string;
  total: number;
  hits: number;
  misses: number;
  errors: number;
}

const FREE_TIER_DAILY = {
  lovable: 5000, // illustrative · Lovable AI workspace limit varies
  gemini: 1500,
  anthropic: 1000,
  openai: 1000,
};

export default function AdminAiUsage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<UsageRow[]>([]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    let mounted = true;
    (async () => {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("ai_usage_log")
        .select("created_at, cache_hit, status, provider, model, input_tokens, output_tokens")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (!mounted) return;
      setRows((data ?? []) as UsageRow[]);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const daily = useMemo<DailyBucket[]>(() => {
    const map = new Map<string, DailyBucket>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      map.set(d, { date: d, total: 0, hits: 0, misses: 0, errors: 0 });
    }
    for (const r of rows) {
      const d = r.created_at.slice(0, 10);
      const b = map.get(d);
      if (!b) continue;
      b.total++;
      if (r.cache_hit) b.hits++;
      else b.misses++;
      if (r.status !== "ok") b.errors++;
    }
    return [...map.values()];
  }, [rows]);

  const today = daily[daily.length - 1] ?? { total: 0, hits: 0, misses: 0, errors: 0 };
  const cacheHitRate = useMemo(() => {
    if (rows.length === 0) return 0;
    const hits = rows.filter((r) => r.cache_hit).length;
    return Math.round((hits / rows.length) * 100);
  }, [rows]);

  const providerNow = rows[0]?.provider ?? "lovable";
  const dailyCeiling = FREE_TIER_DAILY[providerNow as keyof typeof FREE_TIER_DAILY] ?? 1500;
  const headroomPct = Math.max(0, Math.round(((dailyCeiling - today.misses) / dailyCeiling) * 100));

  // Estimated cost (very rough · for budget awareness only)
  const totalInput = rows.reduce((s, r) => s + (r.input_tokens ?? 0), 0);
  const totalOutput = rows.reduce((s, r) => s + (r.output_tokens ?? 0), 0);
  const estUsd = ((totalInput / 1_000_000) * 0.075 + (totalOutput / 1_000_000) * 0.3).toFixed(2);

  if (!user) return <Navigate to="/auth" replace />;
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Admin
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-1">AI marking usage</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last 30 days of Tier 3 AI marking calls. Cache hits don't cost API quota.
          </p>
        </div>
      </header>

      {loading ? (
        <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading usage data…</CardContent></Card>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Sparkles className="h-3.5 w-3.5" />}
              label="Calls today"
              value={String(today.total)}
              hint={`${today.hits} cached / ${today.misses} provider`}
            />
            <StatCard
              icon={<Database className="h-3.5 w-3.5" />}
              label="Cache hit rate"
              value={`${cacheHitRate}%`}
              hint={`${rows.length} calls in last 30 days`}
            />
            <StatCard
              icon={<ShieldCheck className="h-3.5 w-3.5" />}
              label="Free-tier headroom"
              value={`${headroomPct}%`}
              hint={`${today.misses}/${dailyCeiling} ${providerNow} calls today`}
              warn={headroomPct < 20}
            />
            <StatCard
              icon={<AlertTriangle className="h-3.5 w-3.5" />}
              label="Est. monthly cost"
              value={`$${estUsd}`}
              hint="If on paid tier (last 30 days)"
            />
          </div>

          {/* Daily chart */}
          <Card>
            <CardContent className="p-5">
              <h2 className="text-sm font-bold text-foreground mb-1">Daily AI marking calls</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Provider calls vs cache hits over the last 30 days.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={daily}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      tickFormatter={(d: string) => d.slice(5)}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="misses"
                      name="Provider calls"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="hits"
                      name="Cache hits"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="errors"
                      name="Errors"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">Provider:</strong> {providerNow} ·{" "}
            <strong className="text-foreground">Daily ceiling shown:</strong>{" "}
            {dailyCeiling.toLocaleString()} calls. Switch providers via the{" "}
            <code className="text-purple-300">AI_PROVIDER</code> Supabase secret. See
            AI_MARKING_NOTES.md.
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  warn,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 bg-card ${
        warn ? "border-amber-500/40" : "border-border"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
        {icon} {label}
      </div>
      <div
        className={`text-2xl font-mono font-bold ${
          warn ? "text-amber-300" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
    </div>
  );
}
