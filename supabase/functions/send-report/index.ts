// Edge Function: send-report
// Persists report to public.reports, then attempts email via Resend.
// Rate-limits 5 reports/hour per session_id. Honeypot enforced client-side.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReportPayload {
  category: string;
  description: string;
  userEmail?: string;
  context: {
    page: string;
    board?: string;
    paperCode?: string;
    questionNumber?: string;
    sessionId: string;
    timestamp: string;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  content_error: "Content error",
  structural_error: "Structural error",
  diagram_canvas: "Diagram canvas issue",
  marking_issue: "Marking issue",
  performance: "Performance issue",
  other: "Other",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: ReportPayload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Validation (defence in depth)
  const category = String(payload?.category ?? "").trim();
  const description = String(payload?.description ?? "").trim();
  const userEmail = payload?.userEmail ? String(payload.userEmail).trim() : undefined;
  const ctx = payload?.context ?? ({} as ReportPayload["context"]);
  const sessionId = String(ctx?.sessionId ?? "").trim();
  const page = String(ctx?.page ?? "").trim();

  if (!CATEGORY_LABELS[category]) return json({ error: "Invalid category" }, 400);
  if (description.length < 20 || description.length > 500) {
    return json({ error: "Description must be 20-500 characters" }, 400);
  }
  if (!sessionId || !page) return json({ error: "Missing context" }, 400);
  if (userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    return json({ error: "Invalid email" }, 400);
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // Rate limit: 5 per session per hour
  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countErr } = await supabase
      .from("reports")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .gte("created_at", since);
    if (countErr) console.error("rate-limit count error", countErr);
    if ((count ?? 0) >= 5) {
      return json({ error: "Too many reports — please wait a bit", code: "rate_limited" }, 429);
    }
  } catch (e) {
    console.error("rate-limit check failed", e);
  }

  // Persist FIRST so we never lose data even if email fails
  const { data: insertedRow, error: insertErr } = await supabase
    .from("reports")
    .insert({
      category,
      description,
      user_email: userEmail ?? null,
      page,
      board: ctx.board ?? null,
      paper_code: ctx.paperCode ?? null,
      question_number: ctx.questionNumber ?? null,
      session_id: sessionId,
    })
    .select("id")
    .single();

  if (insertErr) {
    console.error("Insert report failed", insertErr);
    return json({ error: "Could not save report" }, 500);
  }

  // Email via Resend (best-effort)
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail = Deno.env.get("ADMIN_EMAIL");
  // The "From" header always uses Resend's verified sandbox sender so delivery
  // works without domain verification. The reporter's email (if provided) is
  // surfaced via Reply-To and inside the email body.
  const fromEmail = "Econ Rev Reports <onboarding@resend.dev>";

  if (!resendApiKey || !adminEmail) {
    // Saved but not emailed — still success from user POV
    console.warn("RESEND_API_KEY or ADMIN_EMAIL not set — report saved but no email sent", insertedRow?.id);
    return json({ success: true, saved: true, emailed: false });
  }

  const categoryLabel = CATEGORY_LABELS[category];
  const subject = `[Econ Rev Report] ${categoryLabel} — ${ctx.page}`;
  const html = `
    <h2>New report from Econ Rev</h2>
    <p><strong>Category:</strong> ${escapeHtml(categoryLabel)}</p>
    <p><strong>Page:</strong> ${escapeHtml(ctx.page)}</p>
    ${ctx.board ? `<p><strong>Board:</strong> ${escapeHtml(ctx.board)}</p>` : ""}
    ${ctx.paperCode ? `<p><strong>Paper code:</strong> ${escapeHtml(ctx.paperCode)}</p>` : ""}
    ${ctx.questionNumber ? `<p><strong>Question:</strong> ${escapeHtml(ctx.questionNumber)}</p>` : ""}
    <p><strong>Submitted at:</strong> ${escapeHtml(ctx.timestamp)}</p>
    <p><strong>Session ID:</strong> ${escapeHtml(sessionId)}</p>
    <p><strong>Reporter email:</strong> ${userEmail ? escapeHtml(userEmail) : "(anonymous)"}</p>
    <hr />
    <h3>Description</h3>
    <p style="white-space:pre-wrap">${escapeHtml(description)}</p>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: userEmail || undefined,
        subject,
        html,
      }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.error("Resend error", resp.status, text);
      return json({ success: true, saved: true, emailed: false });
    }
  } catch (e) {
    console.error("Resend fetch failed", e);
    return json({ success: true, saved: true, emailed: false });
  }

  return json({ success: true, saved: true, emailed: true });
});
