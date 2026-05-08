import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED = [
  "admin@econrev.co",
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "aminul.miah@ateamacademy.co.uk",
  "info@ateamacademy.co.uk",
].map((e) => e.toLowerCase());

function rangeToDays(r: string) {
  if (r === "7d") return 7;
  if (r === "90d") return 90;
  if (r === "all") return 3650;
  return 30;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

function pctChange(curr: number, prev: number): number {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const sb = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const auth = req.headers.get("Authorization") ?? "";
    const token = auth.replace("Bearer ", "");
    const { data: u } = await sb.auth.getUser(token);
    const email = u.user?.email?.toLowerCase();
    if (!email || !ALLOWED.includes(email)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const days = rangeToDays(body.timeRange ?? "30d");
    const sinceISO = new Date(Date.now() - days * 86400 * 1000).toISOString();
    const prevSinceISO = new Date(Date.now() - days * 2 * 86400 * 1000).toISOString();
    const todayISO = new Date(Date.now() - 86400 * 1000).toISOString();
    const weekISO = new Date(Date.now() - 7 * 86400 * 1000).toISOString();
    const monthISO = new Date(Date.now() - 30 * 86400 * 1000).toISOString();

    // ── Audit log this dashboard load ──
    await sb.from("director_dashboard_access_log").insert({
      viewer_user_id: u.user?.id,
      viewer_email: email,
      time_range: body.timeRange ?? "30d",
      ip_address: req.headers.get("x-forwarded-for") ?? null,
      user_agent: req.headers.get("user-agent") ?? null,
    });

    // ── User growth + period-over-period ──
    const { count: totalUsers = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true });
    const { count: newToday = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", todayISO);
    const { count: newWeek = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", weekISO);
    const { count: newMonth = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", monthISO);
    const { count: newInRange = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", sinceISO);
    const { count: newPrevRange = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .gte("created_at", prevSinceISO).lt("created_at", sinceISO);
    const { count: onboarded = 0 } = await sb
      .from("profiles").select("*", { count: "exact", head: true })
      .eq("onboarding_completed", true);

    // Growth trend
    const { data: profileRows } = await sb
      .from("profiles")
      .select("user_id, created_at")
      .gte("created_at", new Date(Date.now() - 90 * 86400 * 1000).toISOString())
      .limit(20000);
    const growthMap: Record<string, number> = {};
    const inRangeProfiles = (profileRows ?? []).filter(
      (r) => new Date(r.created_at as string) >= new Date(sinceISO),
    );
    for (const r of inRangeProfiles) {
      const d = (r.created_at as string).slice(0, 10);
      growthMap[d] = (growthMap[d] ?? 0) + 1;
    }
    const userGrowth = Object.entries(growthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    // ── Activity (current + previous period for delta) ──
    const { data: activity } = await sb
      .from("user_activity_log")
      .select("user_id, feature, event_type, created_at, session_duration_seconds")
      .gte("created_at", prevSinceISO)
      .limit(100000);

    const dauSet = new Set<string>();
    const wauSet = new Set<string>();
    const mauSet = new Set<string>();
    const mauPrevSet = new Set<string>();
    const inRangeActiveSet = new Set<string>();
    const featureUsage: Record<string, number> = {};
    const dailyActiveMap: Record<string, Set<string>> = {};
    const sessionDurations: number[] = [];
    let totalSessionSecondsAll = 0;
    let totalSessionSecondsToday = 0;
    let totalSessionSecondsWeek = 0;
    let totalSessionSecondsMonth = 0;
    const lastActiveByUser: Record<string, string> = {};
    const nowMs = Date.now();
    const sinceMs = new Date(sinceISO).getTime();

    for (const a of activity ?? []) {
      const tISO = a.created_at as string;
      const t = new Date(tISO).getTime();
      const ageDays = (nowMs - t) / 86400000;
      const uid = a.user_id as string | null;
      if (uid) {
        if (ageDays <= 1) dauSet.add(uid);
        if (ageDays <= 7) wauSet.add(uid);
        if (ageDays <= 30) mauSet.add(uid);
        if (ageDays > 30 && ageDays <= 60) mauPrevSet.add(uid);
        if (t >= sinceMs) inRangeActiveSet.add(uid);
        if (!lastActiveByUser[uid] || lastActiveByUser[uid] < tISO) {
          lastActiveByUser[uid] = tISO;
        }
      }
      if (t >= sinceMs) {
        const feat = (a.feature as string) ?? (a.event_type as string) ?? "unknown";
        featureUsage[feat] = (featureUsage[feat] ?? 0) + 1;
        const d = tISO.slice(0, 10);
        if (!dailyActiveMap[d]) dailyActiveMap[d] = new Set();
        if (uid) dailyActiveMap[d].add(uid);
      }
      const dur = (a.session_duration_seconds as number) ?? 0;
      if (dur > 0 && a.event_type === "session_end") {
        if (t >= sinceMs) sessionDurations.push(dur);
        totalSessionSecondsAll += dur;
        if (ageDays <= 1) totalSessionSecondsToday += dur;
        if (ageDays <= 7) totalSessionSecondsWeek += dur;
        if (ageDays <= 30) totalSessionSecondsMonth += dur;
      }
    }
    const dauTrend = Object.entries(dailyActiveMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, set]) => ({ date, count: set.size }));

    const avgSession = sessionDurations.length
      ? Math.round(sessionDurations.reduce((s, x) => s + x, 0) / sessionDurations.length)
      : 0;
    const medSession = median(sessionDurations);

    // Histogram buckets (seconds)
    const buckets = [
      { label: "<1m", min: 0, max: 60 },
      { label: "1-5m", min: 60, max: 300 },
      { label: "5-15m", min: 300, max: 900 },
      { label: "15-30m", min: 900, max: 1800 },
      { label: "30-60m", min: 1800, max: 3600 },
      { label: "60m+", min: 3600, max: Infinity },
    ];
    const sessionHistogram = buckets.map((b) => ({
      bucket: b.label,
      count: sessionDurations.filter((d) => d >= b.min && d < b.max).length,
    }));

    // ── Retention cohorts (weekly) ──
    // Cohort = signup week. Retention week N = % of cohort active in week N after signup.
    const cohortSize: Record<string, Set<string>> = {};
    const cohortActive: Record<string, Record<number, Set<string>>> = {};
    function weekKey(iso: string) {
      const d = new Date(iso);
      const year = d.getUTCFullYear();
      const start = new Date(Date.UTC(year, 0, 1));
      const wk = Math.floor((d.getTime() - start.getTime()) / 86400000 / 7);
      return `${year}-W${String(wk + 1).padStart(2, "0")}`;
    }
    for (const r of profileRows ?? []) {
      const uid = r.user_id as string;
      const wk = weekKey(r.created_at as string);
      cohortSize[wk] ??= new Set();
      cohortSize[wk].add(uid);
      cohortActive[wk] ??= {};
    }
    const userSignupISO: Record<string, string> = {};
    for (const r of profileRows ?? []) {
      userSignupISO[r.user_id as string] = r.created_at as string;
    }
    for (const a of activity ?? []) {
      const uid = a.user_id as string | null;
      if (!uid || !userSignupISO[uid]) continue;
      const signup = new Date(userSignupISO[uid]).getTime();
      const t = new Date(a.created_at as string).getTime();
      const wkN = Math.floor((t - signup) / 86400000 / 7);
      if (wkN < 0 || wkN > 7) continue;
      const ck = weekKey(userSignupISO[uid]);
      cohortActive[ck] ??= {};
      cohortActive[ck][wkN] ??= new Set();
      cohortActive[ck][wkN].add(uid);
    }
    const cohorts = Object.keys(cohortSize)
      .sort()
      .slice(-8)
      .map((wk) => {
        const size = cohortSize[wk].size;
        const row: Record<string, number | string> = { cohort: wk, size };
        for (let i = 0; i <= 7; i++) {
          const active = cohortActive[wk]?.[i]?.size ?? 0;
          row[`w${i}`] = size > 0 ? Math.round((active / size) * 100) : 0;
        }
        return row;
      });

    // Day 1/7/30 retention (overall)
    function retentionDay(day: number) {
      const eligibleUsers = (profileRows ?? []).filter((r) => {
        const sgn = new Date(r.created_at as string).getTime();
        return nowMs - sgn >= day * 86400000;
      });
      if (!eligibleUsers.length) return 0;
      let retained = 0;
      for (const r of eligibleUsers) {
        const uid = r.user_id as string;
        const sgn = new Date(r.created_at as string).getTime();
        const targetMin = sgn + (day - 0.5) * 86400000;
        const targetMax = sgn + (day + 1.5) * 86400000;
        const hit = (activity ?? []).some((a) => {
          if (a.user_id !== uid) return false;
          const t = new Date(a.created_at as string).getTime();
          return t >= targetMin && t <= targetMax;
        });
        if (hit) retained++;
      }
      return Math.round((retained / eligibleUsers.length) * 1000) / 10;
    }
    const retention = {
      d1: retentionDay(1),
      d7: retentionDay(7),
      d30: retentionDay(30),
    };

    // ── Page views by route ──
    const routePageviews: Record<string, { views: number; users: Set<string> }> = {};
    for (const a of activity ?? []) {
      if (a.event_type !== "session_start") continue;
      const t = new Date(a.created_at as string).getTime();
      if (t < sinceMs) continue;
      const path = (a.metadata as any)?.path ?? "/unknown";
      routePageviews[path] ??= { views: 0, users: new Set() };
      routePageviews[path].views += 1;
      if (a.user_id) routePageviews[path].users.add(a.user_id as string);
    }
    const topRoutes = Object.entries(routePageviews)
      .map(([path, v]) => ({ path, views: v.views, uniqueUsers: v.users.size }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);

    // ── Feature counters from profiles ──
    const { data: profUse } = await sb
      .from("profiles")
      .select("free_papers_used, free_questions_used, free_predicted_papers_used, free_tutor_used, free_diagrams_used")
      .limit(20000);
    const counterTotals = { papers: 0, practice: 0, predictedPapers: 0, tutor: 0, diagrams: 0 };
    for (const p of profUse ?? []) {
      counterTotals.papers += (p.free_papers_used as number) ?? 0;
      counterTotals.practice += (p.free_questions_used as number) ?? 0;
      counterTotals.predictedPapers += (p.free_predicted_papers_used as number) ?? 0;
      counterTotals.tutor += (p.free_tutor_used as number) ?? 0;
      counterTotals.diagrams += (p.free_diagrams_used as number) ?? 0;
    }

    // ── AI cost ──
    const { data: ai } = await sb
      .from("ai_usage_log")
      .select("provider, model, input_tokens, output_tokens, cache_hit, status, created_at")
      .gte("created_at", sinceISO)
      .limit(50000);
    let inTok = 0, outTok = 0, cacheHits = 0, errors = 0;
    const byModel: Record<string, { in: number; out: number; calls: number }> = {};
    const aiByDay: Record<string, number> = {};
    for (const r of ai ?? []) {
      const i = (r.input_tokens as number) ?? 0;
      const o = (r.output_tokens as number) ?? 0;
      inTok += i; outTok += o;
      if (r.cache_hit) cacheHits++;
      if (r.status && r.status !== "ok") errors++;
      const m = (r.model as string) ?? "unknown";
      byModel[m] ??= { in: 0, out: 0, calls: 0 };
      byModel[m].in += i; byModel[m].out += o; byModel[m].calls += 1;
      const d = (r.created_at as string).slice(0, 10);
      aiByDay[d] = (aiByDay[d] ?? 0) + i + o;
    }
    const aiTrend = Object.entries(aiByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, tokens]) => ({ date, tokens }));
    const totalCalls = (ai ?? []).length;
    const cacheHitRate = totalCalls > 0 ? Math.round((cacheHits / totalCalls) * 1000) / 10 : 0;

    // ── QA health ──
    const { count: qaOpen = 0 } = await sb
      .from("qa_tracker_issues").select("*", { count: "exact", head: true }).eq("status", "open");
    const { count: qaResolved = 0 } = await sb
      .from("qa_tracker_issues").select("*", { count: "exact", head: true }).eq("status", "resolved");
    const { data: qaBySev } = await sb
      .from("qa_tracker_issues").select("severity").eq("status", "open").limit(5000);
    const qaSeverity: Record<string, number> = {};
    for (const q of qaBySev ?? []) {
      const s = (q.severity as string) ?? "unknown";
      qaSeverity[s] = (qaSeverity[s] ?? 0) + 1;
    }
    const { count: pdfFailures = 0 } = await sb
      .from("pdf_diagram_failures").select("*", { count: "exact", head: true })
      .gte("created_at", sinceISO);

    return new Response(
      JSON.stringify({
        users: {
          total: totalUsers, newToday, newWeek, newMonth, onboarded,
          onboardedRate: totalUsers > 0 ? Math.round((onboarded / totalUsers) * 1000) / 10 : 0,
          dau: dauSet.size, wau: wauSet.size, mau: mauSet.size,
          dauMau: mauSet.size > 0 ? Math.round((dauSet.size / mauSet.size) * 1000) / 10 : 0,
          activeInRange: inRangeActiveSet.size,
          userGrowth, dauTrend,
          deltas: {
            newSignups: pctChange(newInRange, newPrevRange),
            mau: pctChange(mauSet.size, mauPrevSet.size),
          },
        },
        sessions: {
          avgSeconds: avgSession,
          medianSeconds: medSession,
          totalSecondsToday: totalSessionSecondsToday,
          totalSecondsWeek: totalSessionSecondsWeek,
          totalSecondsMonth: totalSessionSecondsMonth,
          totalSecondsAll: totalSessionSecondsAll,
          sampleCount: sessionDurations.length,
          histogram: sessionHistogram,
        },
        retention,
        cohorts,
        routes: topRoutes,
        features: { activityCounts: featureUsage, counterTotals },
        ai: {
          calls: totalCalls, inputTokens: inTok, outputTokens: outTok,
          totalTokens: inTok + outTok, cacheHits, cacheHitRate, errors,
          byModel, trend: aiTrend,
        },
        qa: { open: qaOpen, resolved: qaResolved, bySeverity: qaSeverity, pdfFailures },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[director-platform-stats] error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
