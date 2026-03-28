import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_ID = "prod_U9WtwjUWrx0aqq";
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
];

// In-memory cache: email → { result, timestamp }
const cache = new Map<string, { result: Record<string, unknown>; ts: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");

    const email = user.email.toLowerCase();

    // Beta / tester whitelist — instant premium access
    if (TESTER_EMAILS.includes(email)) {
      return new Response(JSON.stringify({ subscribed: true, subscription_end: ACCESS_EXPIRES, tester: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (new Date() > new Date(ACCESS_EXPIRES)) {
      return new Response(JSON.stringify({ subscribed: false, expired: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache first
    const cached = cache.get(email);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return new Response(JSON.stringify(cached.result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });

    if (customers.data.length === 0) {
      const result = { subscribed: false };
      cache.set(email, { result, ts: Date.now() });
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerId = customers.data[0].id;

    const sessions = await stripe.checkout.sessions.list({
      customer: customerId,
      status: "complete",
      limit: 100,
    });

    const hasPurchased = sessions.data.some((s) => {
      return s.payment_status === "paid";
    });

    const result = {
      subscribed: hasPurchased,
      subscription_end: hasPurchased ? ACCESS_EXPIRES : null,
    };

    cache.set(email, { result, ts: Date.now() });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
