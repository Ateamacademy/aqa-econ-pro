// Sends a parent email via send-transactional-email and logs to public.parent_emails
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json().catch(() => ({}));
    const { studentId, classId, parentEmail, subject, bodyText, type = "report" } = body ?? {};
    if (!studentId || !classId || !parentEmail || !subject || !bodyText) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (subject.length > 200 || bodyText.length > 10000) {
      return new Response(JSON.stringify({ error: "Content too long" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: isTeacher } = await admin.rpc("is_class_teacher", { _user_id: user.id, _class_id: classId });
    if (!isTeacher) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: profile } = await admin.from("profiles").select("display_name").eq("user_id", studentId).maybeSingle();
    const { data: teacherProfile } = await admin.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle();

    // Persist to parent_emails (audit/history)
    const { data: logged, error: logErr } = await admin.from("parent_emails").insert({
      student_id: studentId, class_id: classId, created_by: user.id,
      subject, body: bodyText, type,
    }).select().single();
    if (logErr) {
      return new Response(JSON.stringify({ error: logErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Send via send-transactional-email
    const sendRes = await admin.functions.invoke("send-transactional-email", {
      body: {
        templateName: "parent-update",
        recipientEmail: parentEmail,
        idempotencyKey: `parent-email-${logged.id}`,
        templateData: {
          parentName: null,
          studentName: profile?.display_name ?? null,
          teacherName: teacherProfile?.display_name ?? null,
          subject,
          bodyText,
        },
      },
    });

    if (sendRes.error) {
      return new Response(JSON.stringify({ error: "Email send failed", detail: sendRes.error.message, log_id: logged.id }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await admin.from("parent_emails").update({ sent_at: new Date().toISOString() }).eq("id", logged.id);

    return new Response(JSON.stringify({ ok: true, id: logged.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
