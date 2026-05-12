import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ACCESS_EXPIRES = "2026-06-29T23:59:59Z";

const respond = (b: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(b), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) return respond({ error: "STRIPE_NOT_CONFIGURED" }, 500);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.json().catch(() => ({}));
    const sessionId = (body?.sessionId || body?.session_id || "").toString().trim();
    if (!sessionId) return respond({ error: "MISSING_SESSION_ID" }, 400);

    // Optional: tie to authenticated user when available
    let userEmail: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await admin.auth.getUser(token);
      userEmail = data?.user?.email?.toLowerCase() ?? null;
    }

    const { default: Stripe } = await import("https://esm.sh/stripe@18.5.0");
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) return respond({ paid: false, error: "SESSION_NOT_FOUND" }, 404);

    const isPaid = session.payment_status === "paid" || session.status === "complete";
    if (!isPaid) {
      return respond({ paid: false, status: session.status, payment_status: session.payment_status });
    }

    const email = (
      session.customer_details?.email ||
      session.customer_email ||
      userEmail ||
      ""
    ).toLowerCase().trim();

    if (!email) return respond({ paid: true, persisted: false, warning: "NO_EMAIL_ON_SESSION" });

    // Persist so future check-subscription calls are instant + reliable.
    const { error: upsertError } = await admin.from("paid_users").upsert(
      {
        email,
        stripe_session_id: session.id,
        stripe_customer_id: (session.customer as string) ?? null,
        amount_paid: session.amount_total ?? null,
        currency: session.currency ?? null,
        expires_at: ACCESS_EXPIRES,
      },
      { onConflict: "stripe_session_id" }
    );

    if (upsertError) {
      console.error("verify-checkout upsert failed:", upsertError);
      return respond({ paid: true, persisted: false, error: upsertError.message }, 200);
    }

    return respond({ paid: true, persisted: true, email, expires_at: ACCESS_EXPIRES });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("verify-checkout error:", message);
    return respond({ error: message }, 500);
  }
});
