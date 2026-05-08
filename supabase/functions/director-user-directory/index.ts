import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";

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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const sb = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );
    const auth = req.headers.get("Authorization") ?? "";
    const { data: u } = await sb.auth.getUser(auth.replace("Bearer ", ""));
    const email = u.user?.email?.toLowerCase();
    if (!email || !ALLOWED.includes(email)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const search = (body.search ?? "").toString().toLowerCase().trim();
    const sortBy = (body.sortBy ?? "signup") as "signup" | "lastActive" | "sessions" | "email";
    const sortDir = (body.sortDir ?? "desc") as "asc" | "desc";
    const page = Math.max(1, parseInt(body.page ?? "1"));
    const pageSize = Math.min(200, Math.max(10, parseInt(body.pageSize ?? "50")));
    const exportAll: boolean = body.exportAll === true;

    // Pull all auth users (paginate)
    const allAuth: { id: string; email: string; created_at: string; last_sign_in_at: string | null }[] = [];
    let p = 1;
    while (p < 50) {
      const { data, error } = await sb.auth.admin.listUsers({ page: p, perPage: 200 });
      if (error) throw error;
      const users = (data?.users ?? []).map((x) => ({
        id: x.id, email: x.email ?? "", created_at: x.created_at,
        last_sign_in_at: x.last_sign_in_at ?? null,
      }));
      allAuth.push(...users);
      if (users.length < 200) break;
      p++;
    }

    // Profile counter data
    const { data: profiles } = await sb
      .from("profiles")
      .select("user_id, display_name, exam_board, target_grade, free_papers_used, free_questions_used, free_predicted_papers_used, free_tutor_used, free_diagrams_used, onboarding_completed")
      .limit(50000);
    const profById: Record<string, any> = {};
    for (const pr of profiles ?? []) profById[pr.user_id as string] = pr;

    // Activity aggregates per user
    const { data: activity } = await sb
      .from("user_activity_log")
      .select("user_id, event_type, created_at, session_duration_seconds")
      .limit(200000);
    const sessionsByUser: Record<string, number> = {};
    const lifetimeSecondsByUser: Record<string, number> = {};
    const lastActiveByUser: Record<string, string> = {};
    for (const a of activity ?? []) {
      const uid = a.user_id as string | null;
      if (!uid) continue;
      const tISO = a.created_at as string;
      if (!lastActiveByUser[uid] || lastActiveByUser[uid] < tISO) lastActiveByUser[uid] = tISO;
      if (a.event_type === "session_start") sessionsByUser[uid] = (sessionsByUser[uid] ?? 0) + 1;
      if (a.event_type === "session_end") {
        lifetimeSecondsByUser[uid] = (lifetimeSecondsByUser[uid] ?? 0) + ((a.session_duration_seconds as number) ?? 0);
      }
    }

    // Stripe pro emails
    const proEmails = new Set<string>();
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (stripeKey) {
      try {
        const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
        let starting_after: string | undefined;
        for (let i = 0; i < 5; i++) {
          const page = await stripe.subscriptions.list({
            status: "active", limit: 100, starting_after, expand: ["data.customer"],
          });
          for (const s of page.data) {
            const cust = s.customer as Stripe.Customer | string;
            const em = typeof cust === "string" ? null : cust.email;
            if (em) proEmails.add(em.toLowerCase());
          }
          if (!page.has_more) break;
          starting_after = page.data[page.data.length - 1]?.id;
        }
      } catch (e) {
        console.error("[director-user-directory] stripe error", e);
      }
    }

    // Build merged rows
    let rows = allAuth.map((au) => {
      const prof = profById[au.id] ?? {};
      const isPro = proEmails.has(au.email.toLowerCase());
      return {
        user_id: au.id,
        email: au.email,
        display_name: prof.display_name ?? null,
        signup_date: au.created_at,
        last_active: lastActiveByUser[au.id] ?? au.last_sign_in_at ?? null,
        plan: isPro ? "pro" : "free",
        sessions: sessionsByUser[au.id] ?? 0,
        lifetime_seconds: lifetimeSecondsByUser[au.id] ?? 0,
        exam_board: prof.exam_board ?? null,
        target_grade: prof.target_grade ?? null,
        onboarded: prof.onboarding_completed ?? false,
        free_papers_used: prof.free_papers_used ?? 0,
        free_questions_used: prof.free_questions_used ?? 0,
        free_predicted_papers_used: prof.free_predicted_papers_used ?? 0,
        free_tutor_used: prof.free_tutor_used ?? 0,
        free_diagrams_used: prof.free_diagrams_used ?? 0,
      };
    });

    if (search) {
      rows = rows.filter((r) =>
        r.email.toLowerCase().includes(search) ||
        (r.display_name ?? "").toLowerCase().includes(search),
      );
    }

    rows.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortBy) {
        case "email": return a.email.localeCompare(b.email) * dir;
        case "lastActive": return ((a.last_active ?? "").localeCompare(b.last_active ?? "")) * dir;
        case "sessions": return (a.sessions - b.sessions) * dir;
        case "signup":
        default: return a.signup_date.localeCompare(b.signup_date) * dir;
      }
    });

    const total = rows.length;
    const totalPro = rows.filter((r) => r.plan === "pro").length;
    const paginated = exportAll ? rows : rows.slice((page - 1) * pageSize, page * pageSize);

    return new Response(
      JSON.stringify({ total, totalPro, page, pageSize, rows: paginated }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[director-user-directory] error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
