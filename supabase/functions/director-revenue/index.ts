import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY missing");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const auth = req.headers.get("Authorization") ?? "";
    const token = auth.replace("Bearer ", "");
    const { data: u } = await supabase.auth.getUser(token);
    const email = u.user?.email?.toLowerCase();
    if (!email || !ALLOWED.includes(email)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const days = rangeToDays(body.timeRange ?? "30d");
    const since = Math.floor(Date.now() / 1000) - days * 86400;

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const warnings: string[] = [];
    const safe = async <T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
      try { return await fn(); } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`[director-revenue] ${label} failed`, msg);
        warnings.push(`${label}: ${msg}`);
        return fallback;
      }
    };

    // Active subs (paginate up to 300)
    const activeSubs: Stripe.Subscription[] = await safe("subscriptions.list(active)", async () => {
      const out: Stripe.Subscription[] = [];
      let starting_after: string | undefined;
      for (let i = 0; i < 3; i++) {
        const page = await stripe.subscriptions.list({ status: "active", limit: 100, starting_after });
        out.push(...page.data);
        if (!page.has_more) break;
        starting_after = page.data[page.data.length - 1]?.id;
      }
      return out;
    }, []);

    let mrr = 0;
    const productCounts: Record<string, number> = {};
    for (const s of activeSubs) {
      for (const item of s.items.data) {
        const price = item.price;
        const amount = price.unit_amount ?? 0;
        const qty = item.quantity ?? 1;
        const interval = price.recurring?.interval ?? "month";
        const intervalCount = price.recurring?.interval_count ?? 1;
        let monthly = (amount * qty) / 100 / intervalCount;
        if (interval === "year") monthly = monthly / 12;
        if (interval === "week") monthly = monthly * 4.33;
        if (interval === "day") monthly = monthly * 30;
        mrr += monthly;
        const pid = typeof price.product === "string" ? price.product : price.product?.id ?? "unknown";
        productCounts[pid] = (productCounts[pid] ?? 0) + 1;
      }
    }

    const newSubs: Stripe.Subscription[] = await safe("subscriptions.list(new)", async () => {
      const out: Stripe.Subscription[] = [];
      let starting_after: string | undefined;
      for (let i = 0; i < 3; i++) {
        const page = await stripe.subscriptions.list({ created: { gte: since }, limit: 100, starting_after, status: "all" });
        out.push(...page.data);
        if (!page.has_more) break;
        starting_after = page.data[page.data.length - 1]?.id;
      }
      return out;
    }, []);
    const newCount = newSubs.length;

    const cancelledList = await safe("subscriptions.list(canceled)",
      () => stripe.subscriptions.list({ status: "canceled", limit: 100 }),
      { data: [] as Stripe.Subscription[] } as any);
    const cancelledRange = (cancelledList.data as Stripe.Subscription[]).filter(
      (s) => (s.canceled_at ?? 0) >= since,
    ).length;

    const churnRate = activeSubs.length > 0
      ? Math.round((cancelledRange / (activeSubs.length + cancelledRange)) * 1000) / 10
      : 0;

    const charges = await safe("charges.list",
      () => stripe.charges.list({ created: { gte: since }, limit: 100 }),
      { data: [] as Stripe.Charge[] } as any);
    const grossRevenue = (charges.data as Stripe.Charge[])
      .filter((c) => c.paid && !c.refunded)
      .reduce((sum, c) => sum + (c.amount ?? 0) / 100, 0);
    const refunded = (charges.data as Stripe.Charge[]).reduce(
      (sum, c) => sum + (c.amount_refunded ?? 0) / 100,
      0,
    );

    const byDay: Record<string, number> = {};
    for (const c of charges.data as Stripe.Charge[]) {
      if (!c.paid || c.refunded) continue;
      const d = new Date(c.created * 1000).toISOString().slice(0, 10);
      byDay[d] = (byDay[d] ?? 0) + (c.amount ?? 0) / 100;
    }
    const revenueTrend = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, amount]) => ({ date, amount: Math.round(amount * 100) / 100 }));

    return new Response(
      JSON.stringify({
        mrr: Math.round(mrr * 100) / 100,
        arr: Math.round(mrr * 12 * 100) / 100,
        activeSubs: activeSubs.length,
        newSubs: newCount,
        cancelled: cancelledRange,
        churnRate,
        grossRevenue: Math.round(grossRevenue * 100) / 100,
        refunded: Math.round(refunded * 100) / 100,
        netRevenue: Math.round((grossRevenue - refunded) * 100) / 100,
        productMix: productCounts,
        revenueTrend,
        currency: (charges.data as Stripe.Charge[])[0]?.currency?.toUpperCase() ?? "GBP",
        timeRangeDays: days,
        degraded: warnings.length > 0,
        warnings,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[director-revenue] error", msg);
    // Fail-open so the dashboard still loads.
    return new Response(JSON.stringify({
      mrr: 0, arr: 0, activeSubs: 0, newSubs: 0, cancelled: 0, churnRate: 0,
      grossRevenue: 0, refunded: 0, netRevenue: 0, productMix: {}, revenueTrend: [],
      currency: "GBP", timeRangeDays: 30, degraded: true, warnings: [msg],
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
