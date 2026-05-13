import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

interface Body {
  class_id: string
  topic: string
  difficulty: 'foundation' | 'standard' | 'stretch'
  question_type?: 'short_answer' | 'essay' | 'data_response' | 'mixed'
  num_questions?: number
  time_minutes?: number
  publish?: boolean
  exam_board?: string | null
}

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
const MODEL = 'google/gemini-2.5-pro'

function systemPrompt(board: string, level: string) {
  return `You are an experienced ${board} Economics examiner. Generate exam-style questions in the strict house style of the awarding body. ` +
    `Rigour is paramount: marks must reflect official mark allocations. Mark schemes must list distinct, level-descriptor-based criteria.\n` +
    `Difficulty tier: ${level} (foundation = recall + simple application, standard = extended application + analysis, stretch = full evaluation with synoptic links).`
}

function userPrompt(b: Body) {
  return `Generate a homework worksheet for a school class.

Topic: ${b.topic}
Number of questions: ${b.num_questions ?? 4}
Question type: ${b.question_type ?? 'mixed'}
Time: ${b.time_minutes ?? 45} minutes
Exam board: ${b.exam_board ?? 'AQA'}

Return JSON ONLY (no prose, no markdown fences) shaped exactly:
{
  "title": "string – short worksheet title",
  "intro": "string – 1-2 sentence rubric to students",
  "total_marks": number,
  "questions": [
    {
      "number": "1a",
      "marks": number,
      "command": "Define | Explain | Analyse | Evaluate | Discuss | Calculate",
      "stem": "the question text, may include data table or short stimulus in plain text",
      "context": "optional 1-sentence stimulus, or null",
      "mark_scheme": [
        { "level": 1, "marks_range": "1-2", "criteria": "string", "indicative": "1-2 example points" }
      ]
    }
  ]
}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const auth = req.headers.get('Authorization') ?? ''
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!
    const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } })
    const { data: ud } = await userClient.auth.getUser()
    if (!ud?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const userId = ud.user.id

    const body = (await req.json()) as Body
    if (!body?.class_id || !body?.topic || !body?.difficulty) {
      return new Response(JSON.stringify({ error: 'class_id, topic, difficulty required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const admin = createClient(SUPABASE_URL, SERVICE)
    const { data: cls } = await admin.from('classes').select('id,name,teacher_id,exam_board,subject').eq('id', body.class_id).maybeSingle()
    if (!cls) {
      return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (cls.teacher_id !== userId) {
      const { data: roles } = await admin.from('user_roles').select('role').eq('user_id', userId)
      if (!(roles ?? []).some((r: any) => ['hod', 'admin'].includes(r.role))) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }
    }

    const board = body.exam_board ?? cls.exam_board ?? 'AQA'

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt(board, body.difficulty) },
          { role: 'user', content: userPrompt({ ...body, exam_board: board }) },
        ],
        response_format: { type: 'json_object' },
      }),
    })
    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded — try again in a moment.' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: 'AI credits exhausted. Add credits in workspace settings.' }), { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    if (!aiRes.ok) {
      const errText = await aiRes.text()
      return new Response(JSON.stringify({ error: `AI error ${aiRes.status}: ${errText}` }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const aiJson = await aiRes.json()
    let content = aiJson?.choices?.[0]?.message?.content ?? '{}'
    if (typeof content !== 'string') content = JSON.stringify(content)
    let parsed: any
    try { parsed = JSON.parse(content) } catch {
      return new Response(JSON.stringify({ error: 'AI returned non-JSON' }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const total_marks: number = Number(parsed.total_marks) ||
      (Array.isArray(parsed.questions) ? parsed.questions.reduce((s: number, q: any) => s + (Number(q.marks) || 0), 0) : 0)

    const { data: row, error: insErr } = await admin.from('homework_assignments').insert({
      class_id: body.class_id,
      created_by: userId,
      title: parsed.title ?? `${body.topic} – Homework`,
      topic: body.topic,
      question_type: body.question_type ?? 'mixed',
      difficulty: body.difficulty,
      time_minutes: body.time_minutes ?? 45,
      content_json: { intro: parsed.intro ?? '', questions: parsed.questions ?? [], total_marks, exam_board: board },
      mark_scheme_json: { questions: (parsed.questions ?? []).map((q: any) => ({ number: q.number, marks: q.marks, mark_scheme: q.mark_scheme })) },
      status: body.publish ? 'published' : 'draft',
    }).select().single()
    if (insErr) {
      return new Response(JSON.stringify({ error: insErr.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ assignment: row }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
