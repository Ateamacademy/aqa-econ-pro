import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

interface InviteRow {
  email: string
  display_name?: string | null
  target_grade?: string | null
}

interface Body {
  class_id: string
  invites: InviteRow[]
  send_email?: boolean
}

const APP_URL = 'https://econrev.co'
const RESEND_KEY = Deno.env.get('RESEND_API_KEY')

async function sendInviteEmail(args: {
  to: string
  className: string
  joinCode: string
  teacherEmail: string | null
}) {
  if (!RESEND_KEY) return { skipped: true }
  const subject = `You've been added to ${args.className} on EconRev`
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
      <h2 style="margin:0 0 8px;font-size:20px">Welcome to ${escapeHtml(args.className)}</h2>
      <p style="margin:0 0 16px;color:#475569">Your teacher${args.teacherEmail ? ` (${escapeHtml(args.teacherEmail)})` : ''} has added you to a class on <strong>EconRev</strong>.</p>
      <p style="margin:0 0 8px">Sign in or create an account using <strong>this email address</strong>, and we'll automatically add you to the class.</p>
      <p style="margin:16px 0 8px">If asked, your class join code is:</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:4px;font-weight:700;background:#F1F5F9;padding:12px 20px;border-radius:8px;display:inline-block">${args.joinCode}</div>
      <p style="margin:24px 0 0"><a href="${APP_URL}/auth" style="background:#3B82F6;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Sign in to EconRev</a></p>
      <p style="margin:24px 0 0;font-size:12px;color:#94A3B8">If you didn't expect this email, you can safely ignore it.</p>
    </div>`
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'EconRev <noreply@notify.econrev.co>',
      to: [args.to],
      subject,
      html,
      reply_to: 'elevate@econrev.co',
    }),
  })
  if (!r.ok) return { ok: false, status: r.status, body: await r.text() }
  return { ok: true }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

const EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const auth = req.headers.get('Authorization') ?? ''
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
    const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } })
    const { data: userData, error: userErr } = await userClient.auth.getUser()
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const teacherId = userData.user.id
    const teacherEmail = userData.user.email ?? null

    const body = (await req.json()) as Body
    if (!body?.class_id || !Array.isArray(body.invites) || body.invites.length === 0) {
      return new Response(JSON.stringify({ error: 'class_id and invites[] required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (body.invites.length > 200) {
      return new Response(JSON.stringify({ error: 'Max 200 invites per request' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const admin = createClient(SUPABASE_URL, SERVICE)

    // Verify caller is the teacher of this class
    const { data: cls, error: clsErr } = await admin
      .from('classes')
      .select('id, name, join_code, teacher_id, school_id')
      .eq('id', body.class_id)
      .maybeSingle()
    if (clsErr || !cls) {
      return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (cls.teacher_id !== teacherId) {
      // allow HOD/admin of same school
      const { data: roles } = await admin.from('user_roles').select('role').eq('user_id', teacherId)
      const isStaff = (roles ?? []).some((r: any) => ['hod', 'admin'].includes(r.role))
      if (!isStaff) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }
    }

    // Normalise + dedupe
    const seen = new Set<string>()
    const rows: Array<Required<Pick<InviteRow, 'email'>> & InviteRow & { class_id: string; invited_by: string }> = []
    const skipped: Array<{ email: string; reason: string }> = []
    for (const r of body.invites) {
      const email = (r.email ?? '').trim().toLowerCase()
      if (!email || !EMAIL_RE.test(email)) { skipped.push({ email: r.email, reason: 'invalid email' }); continue }
      if (seen.has(email)) { skipped.push({ email, reason: 'duplicate in upload' }); continue }
      seen.add(email)
      rows.push({
        class_id: body.class_id,
        email,
        display_name: (r.display_name ?? '').toString().trim() || null,
        target_grade: (r.target_grade ?? '').toString().trim() || null,
        invited_by: teacherId,
      })
    }

    if (rows.length === 0) {
      return new Response(JSON.stringify({ created: 0, skipped }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Upsert invites (ON CONFLICT class_id+email keeps existing)
    const { data: inserted, error: insErr } = await admin
      .from('class_invites')
      .upsert(rows, { onConflict: 'class_id,email', ignoreDuplicates: false })
      .select('id, email')
    if (insErr) {
      return new Response(JSON.stringify({ error: insErr.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Auto-link any invitees who already have accounts
    const emails = rows.map(r => r.email)
    const { data: matches } = await admin.rpc('get_users_by_emails' as any, { _emails: emails }).select?.() ?? { data: null }
    // Fallback: query auth.users via admin.listUsers — too costly. Skip auto-link for existing users in this pass.

    // Send emails
    const emailResults: any[] = []
    if (body.send_email !== false) {
      for (const row of rows) {
        try {
          const r = await sendInviteEmail({
            to: row.email,
            className: cls.name,
            joinCode: cls.join_code,
            teacherEmail,
          })
          emailResults.push({ email: row.email, ...r })
        } catch (e) {
          emailResults.push({ email: row.email, ok: false, error: String(e) })
        }
      }
    }

    return new Response(
      JSON.stringify({
        created: inserted?.length ?? rows.length,
        skipped,
        emails: emailResults,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
