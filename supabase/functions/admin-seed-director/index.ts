// One-off bootstrap function: creates the director account for
// info@ateamacademy.co.uk (if missing) and assigns director + member roles
// plus full paid access. Safe to re-run — all operations are idempotent.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const TARGET_EMAIL = "info@ateamacademy.co.uk";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(url, key, { auth: { persistSession: false } });

  // 1. Find or create the auth user
  let userId: string | null = null;
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const existing = list?.users?.find((u) => u.email?.toLowerCase() === TARGET_EMAIL);
  let createdNew = false;
  let tempPassword: string | null = null;
  if (existing) {
    userId = existing.id;
  } else {
    tempPassword = `ATeam-${crypto.randomUUID().slice(0, 12)}!`;
    const { data: created, error: cErr } = await admin.auth.admin.createUser({
      email: TARGET_EMAIL,
      password: tempPassword,
      email_confirm: true,
    });
    if (cErr) {
      return new Response(JSON.stringify({ error: cErr.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    userId = created.user!.id;
    createdNew = true;
  }

  // 2. Assign roles (idempotent)
  for (const role of ["director", "member"]) {
    await admin.from("user_roles").upsert(
      { user_id: userId, role },
      { onConflict: "user_id,role" },
    );
  }

  // 3. Grant full paid access (no expiry)
  const { data: paid } = await admin.from("paid_users")
    .select("id").ilike("email", TARGET_EMAIL).maybeSingle();
  if (!paid) {
    await admin.from("paid_users").insert({
      email: TARGET_EMAIL,
      expires_at: "2099-12-31T00:00:00Z",
      amount_paid: 0,
      currency: "gbp",
    });
  }

  // 4. Read back for confirmation
  const { data: roles } = await admin.from("user_roles")
    .select("role").eq("user_id", userId);
  const { data: paidRow } = await admin.from("paid_users")
    .select("email,expires_at").ilike("email", TARGET_EMAIL).maybeSingle();

  return new Response(JSON.stringify({
    ok: true,
    user_id: userId,
    email: TARGET_EMAIL,
    created_new: createdNew,
    temp_password: tempPassword, // only returned on first creation
    roles: roles?.map((r: any) => r.role) ?? [],
    paid_users: paidRow,
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
