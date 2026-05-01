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
    const todayISO = new Date(Date.now() - 86400 * 1000).toISOString();
    const weekISO = new Date(Date.now() - 7 * 86400 * 1000).toISOString();
    const monthISO = new Date(Date.now() - 30 * 86400 * 1000).toISOString();

    // ── User growth ──
    const { count: totalUsers = 0 } = await sb
      .from("profiles")
      .select("*", { count: "exact", head: true });
    const { count: newToday = 0 } = await sb
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayISO);
    const { count: newWeek = 0 } = await sb
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekISO);
    const { count: newMonth = 0 } = await sb
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthISO);
    const { count: onboarded = 0 } = await sb
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("onboarding_completed", true);

    // Growth trend
    const { data: profileRows } = await sb
      .from("profiles")
      .select("created_at")
      .gte("created_at", sinceISO)
      .limit(10000);
    const growthMap: Record<string, number> = {};
    for (const r of profileRows ?? []) {
      const d = (r.created_at as string).slice(0, 10);
      growthMap[d] = (growthMap[d] ?? 0) + 1;
    }
    const userGrowth = Object.entries(growthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    // ── Activity ──
    const { data: activity } = await sb
      .from("user_activity_log")
      .select("user_id, feature, event_type, created_at, session_duration_seconds")
      .gte("created_at", sinceISO)
      .limit(50000);

    const dauSet = new Set<string>();
    const wauSet = new Set<string>();
    const mauSet = new Set<string>();
    const featureUsage: Record<string, number> = {};
    const dailyActiveMap: Record<string, Set<string>> = {};
    const nowMs = Date.now();
    for (const a of activity ?? []) {
      const t = new Date(a.created_at as string).getTime();
      const ageDays = (nowMs - t) / 86400000;
      if (a.user_id) {
        if (ageDays <= 1) dauSet.add(a.user_id as string);
        if (ageDays <= 7) wauSet.add(a.user_id as string);
        if (ageDays <= 30) mauSet.add(a.user_id as string);
      }
      const feat = (a.feature as string) ?? (a.event_type as string) ?? "unknown";
      featureUsage[feat] = (featureUsage[feat] ?? 0) + 1;
      const d = (a.created_at as string).slice(0, 10);
      if (!dailyActiveMap[d]) dailyActiveMap[d] = new Set();
      if (a.user_id) dailyActiveMap[d].add(a.user_id as string);
    }
    const dauTrend = Object.entries(dailyActiveMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, set]) => ({ date, count: set.size }));

    // ── Feature counters from profiles ──
    const { data: profUse } = await sb
      .from("profiles")
      .select(
        "free_papers_used, free_questions_used, free_predicted_papers_used, free_tutor_used, free_diagrams_used",
      )
      .limit(10000);
    const counterTotals = {
      papers: 0,
      practice: 0,
      predictedPapers: 0,
      tutor: 0,
      diagrams: 0,
    };
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
      inTok += i;
      outTok += o;
      if (r.cache_hit) cacheHits++;
      if (r.status && r.status !== "ok") errors++;
      const m = (r.model as string) ?? "unknown";
      byModel[m] ??= { in: 0, out: 0, calls: 0 };
      byModel[m].in += i;
      byModel[m].out += o;
      byModel[m].calls += 1;
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
      .from("qa_tracker_issues")
      .select("*", { count: "exact", head: true })
      .eq("status", "open");
    const { count: qaResolved = 0 } = await sb
      .from("qa_tracker_issues")
      .select("*", { count: "exact", head: true })
      .eq("status", "resolved");
    const { data: qaBySev } = await sb
      .from("qa_tracker_issues")
      .select("severity")
      .eq("status", "open")
      .limit(5000);
    const qaSeverity: Record<string, number> = {};
    for (const q of qaBySev ?? []) {
      const s = (q.severity as string) ?? "unknown";
      qaSeverity[s] = (qaSeverity[s] ?? 0) + 1;
    }
    const { count: pdfFailures = 0 } = await sb
      .from("pdf_diagram_failures")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sinceISO);

    return new Response(
      JSON.stringify({
        users: {
          total: totalUsers,
          newToday,
          newWeek,
          newMonth,
          onboarded,
          onboardedRate: totalUsers > 0 ? Math.round((onboarded / totalUsers) * 1000) / 10 : 0,
          dau: dauSet.size,
          wau: wauSet.size,
          mau: mauSet.size,
          dauMau: mauSet.size > 0 ? Math.round((dauSet.size / mauSet.size) * 1000) / 10 : 0,
          userGrowth,
          dauTrend,
        },
        features: {
          activityCounts: featureUsage,
          counterTotals,
        },
        ai: {
          calls: totalCalls,
          inputTokens: inTok,
          outputTokens: outTok,
          totalTokens: inTok + outTok,
          cacheHits,
          cacheHitRate,
          errors,
          byModel,
          trend: aiTrend,
        },
        qa: {
          open: qaOpen,
          resolved: qaResolved,
          bySeverity: qaSeverity,
          pdfFailures,
        },
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
