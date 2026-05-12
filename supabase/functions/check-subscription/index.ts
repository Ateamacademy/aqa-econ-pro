import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ACCESS_EXPIRES = "2026-06-29T23:59:59Z";

const TESTER_EMAILS = [
  "student1@email.com",
  "student2@email.com",
  "tester@email.com",
  "trial1@econrev.com",
  "trial2@econrev.com",
  "trial3@econrev.com",
  "trial4@econrev.com",
  "trial5@econrev.com",
  "aminul_miah@yahoo.co.uk",
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "adeniyisarah05@gmail.com",
  "swapnilkumar.2016@vitalum.ac.in",
  "ivan.radic1992@gmail.com",
  "ufareed12@gmail.com",
  "anjali.doal08@gmail.com",
  "zaki089@outlook.com",
  "anviparmar88@hotmail.com",
  "zakariyahassan185@gmail.com",
  "samirmiskin@icloud.com",
  "adie.gascoigne@gmail.com",
];

const cache = new Map<string, { result: Record<string, unknown>; ts: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

const respond = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  let email: string | null = null;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return respond({ subscribed: false, subscription_end: null, unauthenticated: true });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData?.user?.email) {
      // Token missing sub claim, expired, or anon key · treat as unauthenticated, don't 500
      return respond({ subscribed: false, subscription_end: null, unauthenticated: true });
    }

    const user = userData.user;

    email = user.email!.toLowerCase();

    // Allow callers (e.g. post-checkout) to bypass the cache.
    let force = false;
    try {
      const url = new URL(req.url);
      if (url.searchParams.get("force") === "1") force = true;
      if (req.method === "POST") {
        const body = await req.clone().json().catch(() => null);
        if (body && body.force) force = true;
      }
    } catch (_) { /* ignore */ }

    if (TESTER_EMAILS.includes(email)) {
      return respond({ subscribed: true, subscription_end: ACCESS_EXPIRES, tester: true });
    }

    if (new Date() > new Date(ACCESS_EXPIRES)) {
      return respond({ subscribed: false, expired: true });
    }

    if (!force) {
      const cached = cache.get(email);
      if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
        return respond(cached.result);
      }
    } else {
      cache.delete(email);
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      const result = { subscribed: false, subscription_end: null, degraded: true, fallback: true };
      cache.set(email, { result, ts: Date.now() });
      return respond(result);
    }

    // Load Stripe only for non-tester users. This keeps cold starts for whitelisted
    // users independent from third-party module loading and prevents transient boot 503s.
    const { default: Stripe } = await import("https://esm.sh/stripe@18.5.0");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Try multiple email variants to defeat case/whitespace mismatches between
    // Supabase auth and the email the user typed at Stripe checkout.
    const rawEmail = user.email!;
    const variants = Array.from(new Set([rawEmail, rawEmail.toLowerCase(), rawEmail.trim()]));

    const customerLists = await Promise.all(
      variants.map((e) => stripe.customers.list({ email: e, limit: 5 }).catch(() => ({ data: [] as any[] })))
    );
    const customers = Array.from(
      new Map(customerLists.flatMap((c) => c.data).map((c: any) => [c.id, c])).values()
    );

    let hasPurchased = false;

    // 1) Check checkout sessions per known customer.
    for (const c of customers) {
      const sessions = await stripe.checkout.sessions.list({
        customer: (c as any).id,
        status: "complete",
        limit: 20,
      });
      if (sessions.data.some((s: { payment_status: string }) => s.payment_status === "paid")) {
        hasPurchased = true;
        break;
      }
    }

    // 2) Fallback: search recent paid sessions by customer_details.email
    //    (covers guest checkouts where no customer record was reused).
    if (!hasPurchased) {
      try {
        const paid = await stripe.checkout.sessions.list({ limit: 100, status: "complete" });
        hasPurchased = paid.data.some((s: any) => {
          const detailsEmail = (s.customer_details?.email || s.customer_email || "").toLowerCase();
          return s.payment_status === "paid" && detailsEmail === email;
        });
      } catch (_) { /* ignore */ }
    }

    if (!hasPurchased && customers.length === 0) {
      const result = { subscribed: false, subscription_end: null };
      cache.set(email, { result, ts: Date.now() });
      return respond(result);
    }

    const result = {
      subscribed: hasPurchased,
      subscription_end: hasPurchased ? ACCESS_EXPIRES : null,
    };

    cache.set(email, { result, ts: Date.now() });
    return respond(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const statusCode = (error as { statusCode?: number })?.statusCode;
    const isRateLimited = statusCode === 429 || /rate limit/i.test(message);

    if (isRateLimited) {
      if (email) {
        const cached = cache.get(email);
        if (cached) return respond({ ...cached.result, degraded: true });
      }

      // Fail-open with safe defaults to prevent frontend blank-screen loops.
      return respond({ subscribed: false, subscription_end: null, degraded: true }, 200);
    }

    console.error("check-subscription unexpected error:", message);
    // Fail-open to prevent frontend blank-screen loops on transient runtime errors.
    if (email) {
      const cached = cache.get(email);
      if (cached) return respond({ ...cached.result, degraded: true, fallback: true });
    }
    return respond(
      { subscribed: false, subscription_end: null, degraded: true, fallback: true, error: "SERVICE_UNAVAILABLE" },
      200,
    );
  }
});
