import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const respond = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("create-checkout: STRIPE_SECRET_KEY is not configured");
      return respond({ error: "Payments are not configured. Please contact support." }, 500);
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return respond({ error: "Please sign in before checking out." }, 401);

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData?.user?.email) {
      return respond({ error: "Please sign in again to continue." }, 401);
    }
    const user = userData.user;
    const email = user.email!.toLowerCase().trim();

    const body = await req.json().catch(() => ({}));
    const priceId = (body?.priceId || "").toString().trim();
    if (!priceId) return respond({ error: "Missing price configuration." }, 400);

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Re-use an existing customer if we already have one for this email.
    let customerId: string | undefined;
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) customerId = customers.data[0].id;
    } catch (e) {
      console.error("create-checkout: customer lookup failed (continuing as guest)", e);
    }

    const origin = req.headers.get("origin") || "https://econrev.co";

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : email,
        client_reference_id: user.id,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        allow_promotion_codes: true,
        metadata: { user_id: user.id, email },
        payment_intent_data: { metadata: { user_id: user.id, email } },
        success_url: `${origin}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?checkout=cancelled`,
      });
    } catch (e: any) {
      console.error("create-checkout: stripe session create failed", e?.message || e);
      return respond(
        { error: e?.message || "We could not start the checkout. Please try again." },
        502,
      );
    }

    if (!session?.url) {
      console.error("create-checkout: stripe returned no URL", session);
      return respond({ error: "Checkout URL was not generated. Please try again." }, 502);
    }

    return respond({ url: session.url, sessionId: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("create-checkout fatal error:", message);
    return respond({ error: message || "Unexpected error" }, 500);
  }
});
