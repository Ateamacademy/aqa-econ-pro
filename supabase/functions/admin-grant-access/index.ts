import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Hard-coded allowlist of emails this endpoint can provision.
// Keeps the endpoint safe from being abused to take over arbitrary accounts.
const ALLOWED = new Set<string>([
  "avni08parmar@hotmail.com",
  "avniparmar88@hotmail.com",
  "avi08parmar@hotmail.com",
  "aviparmar88@hotmail.com",
  "anvi08parmar@hotmail.com",
  "anviparmar88@hotmail.com",
  "zainabintrayhan@gmail.com",
  "fatima4r@hotmail.com",
  "isabella270708@icloud.com",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, password } = await req.json();
    const normalized = String(email || "").trim().toLowerCase();
    if (!normalized || !password || String(password).length < 6) {
      return new Response(JSON.stringify({ error: "email and password (>=6 chars) required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!ALLOWED.has(normalized)) {
      return new Response(JSON.stringify({ error: "email not allowed" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Find existing user by paging through admin.listUsers (no direct getByEmail).
    let userId: string | null = null;
    for (let page = 1; page <= 20 && !userId; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) break;
      const hit = data.users.find((u) => (u.email || "").toLowerCase() === normalized);
      if (hit) userId = hit.id;
      if (data.users.length < 200) break;
    }

    if (userId) {
      const { error } = await admin.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
      });
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, action: "updated", email: normalized }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await admin.auth.admin.createUser({
      email: normalized,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, action: "created", email: normalized, id: data.user?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
