import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
const MODEL = 'google/gemini-2.5-pro'

interface Body { submission_id: string }

function systemPrompt(board: string) {
  return `You are an experienced ${board} Economics examiner. ` +
    `Mark each student response strictly against its mark scheme. ` +
    `Award marks per question (integer, 0..marks_total). ` +
    `Allocate awarded marks across the four Assessment Objectives (AO1 Knowledge, AO2 Application, AO3 Analysis, AO4 Evaluation) based on what the student demonstrated. ` +
    `Be honest and rigorous: missing diagrams, missing evaluation, irrelevant content all reduce marks. ` +
    `Provide constructive, second-person feedback (max 60 words per question), with 1-2 strengths and 1-2 improvements.`
}

function userPrompt(assignment: any, responses: Record<string, string>) {
  const qs = (assignment.content_json?.questions ?? []).map((q: any) => ({
    number: q.number,
    marks_total: q.marks,
    command: q.command,
    stem: q.stem,
    context: q.context ?? null,
    mark_scheme: q.mark_scheme ?? [],
    student_response: responses[q.number] ?? '',
  }))
  return `Assignment: ${assignment.title}\nTopic: ${assignment.topic ?? '(none)'}\nDifficulty: ${assignment.difficulty ?? 'standard'}\n\nMark the following student responses. Return JSON ONLY (no markdown fences) shaped exactly:\n{\n  "questions": [\n    { "number": "1a", "marks_awarded": number, "marks_total": number,\n      "ao_breakdown": { "ao1": {"awarded": n, "total": n}, "ao2": {...}, "ao3": {...}, "ao4": {...} },\n      "feedback": "string", "strengths": ["..."], "improvements": ["..."] }\n  ],\n  "overall": { "summary": "string", "strengths": ["..."], "improvements": ["..."] }\n}\n\nQuestions:\n${JSON.stringify(qs, null, 2)}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const auth = req.headers.get('Authorization') ?? ''
    if (!auth.startsWith('Bearer ')) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
    const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } })
    const { data: ud } = await userClient.auth.getUser()
    if (!ud?.user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    const userId = ud.user.id

    const { submission_id } = (await req.json()) as Body
    if (!submission_id) return new Response(JSON.stringify({ error: 'submission_id required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const admin = createClient(SUPABASE_URL, SERVICE)
    const { data: sub, error: se } = await admin.from('homework_submissions').select('*').eq('id', submission_id).maybeSingle()
    if (se || !sub) return new Response(JSON.stringify({ error: 'Submission not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    if (sub.student_id !== userId) {
      // teachers may also trigger; check via assignment->class
      const { data: a } = await admin.from('homework_assignments').select('class_id').eq('id', sub.assignment_id).maybeSingle()
      const { data: ok } = a ? await admin.rpc('is_class_teacher', { _user_id: userId, _class_id: a.class_id }) : { data: false }
      if (!ok) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { data: assignment } = await admin.from('homework_assignments').select('*, classes(exam_board)').eq('id', sub.assignment_id).maybeSingle()
    if (!assignment) return new Response(JSON.stringify({ error: 'Assignment missing' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const board = (assignment as any).classes?.exam_board ?? 'AQA'
    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt(board) },
          { role: 'user', content: userPrompt(assignment, sub.response_json ?? {}) },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!aiResp.ok) {
      const t = await aiResp.text()
      console.error('AI error', aiResp.status, t)
      if (aiResp.status === 429) return new Response(JSON.stringify({ error: 'Rate limit, try again in a moment.' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      if (aiResp.status === 402) return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      return new Response(JSON.stringify({ error: 'AI marking failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const aiJson = await aiResp.json()
    const raw = aiJson.choices?.[0]?.message?.content ?? '{}'
    let parsed: any
    try { parsed = JSON.parse(raw) } catch { parsed = { questions: [], overall: { summary: raw } } }
    const questions: any[] = Array.isArray(parsed.questions) ? parsed.questions : []

    // Aggregate AOs
    const ao: Record<string, { awarded: number; total: number }> = {}
    let totalAwarded = 0
    let totalAvailable = 0
    for (const q of questions) {
      totalAwarded += Number(q.marks_awarded ?? 0)
      totalAvailable += Number(q.marks_total ?? 0)
      const b = q.ao_breakdown ?? {}
      for (const k of Object.keys(b)) {
        if (!ao[k]) ao[k] = { awarded: 0, total: 0 }
        ao[k].awarded += Number(b[k]?.awarded ?? 0)
        ao[k].total += Number(b[k]?.total ?? 0)
      }
    }
    const pct = totalAvailable > 0 ? (totalAwarded / totalAvailable) * 100 : 0

    const { error: ue } = await admin
      .from('homework_submissions')
      .update({
        status: 'ai_marked',
        ai_marks_json: { questions },
        ao_breakdown_json: ao,
        feedback_json: parsed.overall ?? {},
        total_score: pct,
        submitted_at: sub.submitted_at ?? new Date().toISOString(),
      })
      .eq('id', submission_id)
    if (ue) return new Response(JSON.stringify({ error: ue.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ ok: true, total_score: pct, questions: questions.length }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('mark-homework-submission error', e)
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
