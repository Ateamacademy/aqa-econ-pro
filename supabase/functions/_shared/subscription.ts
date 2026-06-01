// Shared subscription gate: verifies the caller has an active paid subscription.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "./auth.ts";

// Admin / tester emails always allowed (mirrors check-subscription allowlist).
const ALWAYS_ALLOWED = new Set<string>([
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "aminul.miah@ateamacademy.co.uk",
  "info@ateamacademy.co.uk",
  "samirmiskin@icloud.com",
  "chitra.shahani@yahoo.com",
  "greensam1@sky.com",
  "student1@email.com",
  "student2@email.com",
  "tester@email.com",
  "trial1@econrev.com",
  "trial2@econrev.com",
  "trial3@econrev.com",
  "trial4@econrev.com",
  "trial5@econrev.com",
]);

export type SubResult = { ok: true } | { ok: false; response: Response };

export async function requireSubscription(email: string | null): Promise<SubResult> {
  const e = (email ?? "").trim().toLowerCase();
  if (e && ALWAYS_ALLOWED.has(e)) return { ok: true };
  if (!e) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Subscription required" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }
  const admin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );
  const { data, error } = await admin
    .from("paid_users")
    .select("expires_at")
    .ilike("email", e)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (error || !data) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Active subscription required" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }
  return { ok: true };
}
