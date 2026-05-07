// Diagnostic Calculator — strict marking via Lovable AI Gateway.
// Board-aware: applies the correct mark scheme convention for the chosen exam board.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Board =
  | "aqa" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge" | "ib"
  | "wjec" | "eduqas" | "aqa-gcse" | "cambridge-igcse" | "edexcel-igcse" | "ocr-gcse";

interface DiagnosticItem {
  id: "q4" | "q5";
  prompt: string;
  totalMarks: number;
  answer: string;
  hasDiagram?: boolean; // q5 only
  rubric: string;
}

interface ItemResult {
  id: string;
  marks: number;
  totalMarks: number;
  rationale: string;
  strengths: string[];
  improvements: string[];
}

/* ────── Board-specific marking conventions ────── */

interface BoardConvention {
  name: string;
  framework: string; // skill framework
  q4Convention: string; // 4-mark explain convention
  q5Convention: string; // 15-mark essay convention
  caps: string; // hard caps
}

const BOARD_CONVENTIONS: Record<Board, BoardConvention> = {
  "aqa": {
    name: "AQA A-Level Economics (7136)",
    framework: "KAA (Knowledge, Application, Analysis) + Evaluation, levels-of-response",
    q4Convention:
      "AQA 4-mark explain. Award 1 mark per valid reason identified, +1 for development with economic theory or example. Max 2 reasons.",
    q5Convention:
      "AQA 15-mark levels-of-response. KAA = 9 marks, Evaluation = 6 marks. L1 (1-3) isolated. L2 (4-6) some knowledge. L3 (7-9) sound chains, attempted eval. L4 (10-12) developed analysis + reasoned eval. L5 (13-15) sustained analysis + supported prioritised judgement.",
    caps:
      "No diagram → cap at 7/15. No evaluation at all → cap at 7/15. No supported judgement → cap at 10/15. Inaccurate theory → cap at 30%.",
  },
  "edexcel-a": {
    name: "Edexcel A A-Level Economics (9EC0)",
    framework: "Per-skill marks: K (Knowledge), Ap (Application), An (Analysis), Ev (Evaluation). NOT levels-based.",
    q4Convention:
      "Edexcel A 4-mark explain. K=2, Ap=2. 1 mark for definition/identification, 1 mark for development of each point. No evaluation required.",
    q5Convention:
      "Edexcel A 15-mark evaluate. K=3, Ap=3, An=5, Ev=4. Mark each skill independently and SUM. K: definitions of NMW & unemployment. Ap: UK context/data/figures. An: developed chains of reasoning + correct labour-market diagram (W on Y, QL on X). Ev: at least 2 reasoned evaluative points + supported judgement.",
    caps:
      "No diagram → An capped at 2/5 (max total ~12). No application/UK context → Ap = 0. No evaluation → Ev = 0. No judgement → Ev capped at 2/4.",
  },
  "edexcel-b": {
    name: "Edexcel B A-Level Economics (9EB0)",
    framework: "Levels-of-response with explicit AO weightings (AO1, AO2, AO3, AO4). Business/extract-driven.",
    q4Convention:
      "Edexcel B 4-mark explain. AO1=2, AO2=2. Define + apply to business context. Brief, no evaluation.",
    q5Convention:
      "Edexcel B 15-mark evaluate (Section B style). AO1=3, AO2=3, AO3=5, AO4=4. Levels: L1 (1-4), L2 (5-8), L3 (9-12), L4 (13-15). L4 requires sustained analysis + balanced evaluation + supported judgement in business context.",
    caps:
      "No diagram → cap at L2 (max 8). No evaluation → cap at L2. No judgement → cap at L3 (max 12). No business context → cap at L1.",
  },
  "ocr": {
    name: "OCR A-Level Economics (H460)",
    framework: "Levels-of-response with AO1/AO2/AO3/AO4 weightings.",
    q4Convention:
      "OCR 4-mark explain. AO1=2, AO2=2. Define + explain with mechanism. No evaluation.",
    q5Convention:
      "OCR 15-mark evaluate. AO1=3, AO2=3, AO3=5, AO4=4. L1 (1-3), L2 (4-7), L3 (8-11), L4 (12-15). L4 needs sustained analysis with reasoned evaluation and judgement.",
    caps: "No diagram → cap at L2 (7). No evaluation → cap at L2. No judgement → cap at L3 (11).",
  },
  "cambridge": {
    name: "CAIE A-Level Economics (9708)",
    framework: "Levels-of-response (essay) with AO1-AO4 emphasis.",
    q4Convention:
      "CAIE 4-mark short answer. 1 mark per valid point with development. Knowledge + application focus.",
    q5Convention:
      "CAIE essay-style 15 marks (mapped). L1 (1-4) descriptive. L2 (5-8) some analysis. L3 (9-12) developed analysis + some eval. L4 (13-15) sustained analysis + reasoned judgement with diagrams.",
    caps: "No diagram → cap at L2 (8). No evaluation → cap at L2. No judgement → cap at L3.",
  },
  "ib": {
    name: "IB Diploma Economics (HL/SL)",
    framework: "Criterion-based markbands (A: knowledge, B: application, C: analysis, D: evaluation/diagram).",
    q4Convention:
      "IB 4-mark explain. Award 1 mark per valid reason with brief economic explanation. Define key terms.",
    q5Convention:
      "IB 15-mark essay. Markbands: 1-3 (limited), 4-6 (some knowledge), 7-9 (correct analysis), 10-12 (developed + evaluation), 13-15 (clear sustained evaluation + accurate diagram + real-world example).",
    caps: "No diagram → cap at 9. No real-world example → cap at 12. No evaluation → cap at 9.",
  },
  "wjec": {
    name: "WJEC A-Level Economics",
    framework: "AO-based marks (AO1/AO2/AO3/AO4) with levels.",
    q4Convention: "WJEC 4-mark explain. AO1=2, AO2=2. Define + apply. No evaluation needed.",
    q5Convention:
      "WJEC 15-mark evaluate. AO1=3, AO2=3, AO3=5, AO4=4. L1 (1-4), L2 (5-9), L3 (10-15). L3 requires sustained analysis with reasoned judgement.",
    caps: "No diagram → cap at L2 (9). No evaluation → cap at L2. No judgement → cap at 12.",
  },
  "eduqas": {
    name: "Eduqas A-Level Economics",
    framework: "AO-based with band descriptors.",
    q4Convention: "Eduqas 4-mark explain. AO1=2, AO2=2. Definition + applied development.",
    q5Convention:
      "Eduqas 15-mark evaluate. AO1=3, AO2=3, AO3=5, AO4=4. Band 1 (1-5), Band 2 (6-10), Band 3 (11-15). Band 3 requires sustained chains + reasoned evaluation + judgement.",
    caps: "No diagram → cap at Band 2 (10). No evaluation → cap at 10. No judgement → cap at 12.",
  },
  "aqa-gcse": {
    name: "AQA GCSE Economics (8136)",
    framework: "GCSE band descriptors. Lower expectations on theory depth than A-Level.",
    q4Convention: "AQA GCSE 4-mark explain. 1 mark per point + 1 development. Two clear reasons expected.",
    q5Convention:
      "AQA GCSE 15-mark evaluate (mapped). L1 (1-5) basic. L2 (6-10) some analysis. L3 (11-15) developed analysis + simple evaluation/judgement. Diagrams appreciated but lighter standard than A-Level.",
    caps: "No evaluation → cap at L2 (10). No judgement → cap at 12.",
  },
  "cambridge-igcse": {
    name: "CAIE IGCSE Economics (0455)",
    framework: "Mark-per-point + levels for extended responses. Application to context essential.",
    q4Convention: "IGCSE 4-mark explain. 1 mark per point + 1 development per point. Two reasons.",
    q5Convention:
      "IGCSE extended response (15 mapped). L1 (1-5) identifies, L2 (6-10) explains, L3 (11-15) analyses + decision with reasoning.",
    caps: "No reasoned decision → cap at L2 (10). No evaluation → cap at L2.",
  },
  "edexcel-igcse": {
    name: "Edexcel IGCSE Economics (4EC1)",
    framework: "AO-based marks similar to Edexcel A but at IGCSE depth.",
    q4Convention: "Edexcel IGCSE 4-mark explain. AO1=2, AO2=2.",
    q5Convention:
      "Edexcel IGCSE 15-mark evaluate. AO1=3, AO2=3, AO3=5, AO4=4. Levels mapped 1-3.",
    caps: "No diagram → cap at L2. No evaluation → cap at L2.",
  },
  "ocr-gcse": {
    name: "OCR GCSE Economics (J205)",
    framework: "Levels-of-response with AO weightings. GCSE depth.",
    q4Convention: "OCR GCSE 4-mark explain. AO1=2, AO2=2.",
    q5Convention:
      "OCR GCSE 15-mark evaluate (mapped). L1 (1-5), L2 (6-10), L3 (11-15). L3 needs reasoned judgement.",
    caps: "No evaluation → cap at L2. No judgement → cap at 12.",
  },
};

function buildSystem(board: Board) {
  const c = BOARD_CONVENTIONS[board];
  return `You are a STRICT ${c.name} Principal Examiner.

You assign a NUMERICAL mark for the question using the EXACT mark scheme convention of this exam board.

BOARD MARKING FRAMEWORK:
${c.framework}

Q4 (4-mark) CONVENTION FOR THIS BOARD:
${c.q4Convention}

Q5 (15-mark) CONVENTION FOR THIS BOARD:
${c.q5Convention}

HARD CAPS FOR THIS BOARD:
${c.caps}

UNIVERSAL RULES (apply to every board):
- Apply the board's mark scheme with full rigor. Default LOWER on borderlines.
- Mark only what is actually written — never infer intent.
- Empty / off-topic / < 15 words → 0 marks.
- Inaccurate economic theory (wrong direction of shift, wrong definition) → cap at 30%.
- Length is NOT quality. Never round up for effort.
- Apply per-skill marks (Edexcel/OCR/WJEC/Eduqas/IB) by SUMMING component skills, not by levels.
- Apply levels-of-response (AQA, CAIE, Eduqas bands) by best-fit at the LOWEST level the answer fully meets.

Output JSON ONLY in this schema (no markdown, no preamble):
{
  "marks": <integer 0..totalMarks>,
  "rationale": "1-2 sentences citing the SPECIFIC ${c.name} discriminator that determined the mark (skill component or level)",
  "strengths": ["short bullet quoting student verbatim", ...],
  "improvements": ["specific ${c.name}-aligned next step", ...]
}`;
}

function buildUser(item: DiagnosticItem, board: Board): string {
  const wc = item.answer.trim().split(/\s+/).filter(Boolean).length;
  const c = BOARD_CONVENTIONS[board];
  const lines = [
    `EXAM BOARD: ${c.name}`,
    "",
    `QUESTION (${item.totalMarks} marks): ${item.prompt}`,
    "",
    `MARK SCHEME / RUBRIC:`,
    item.rubric,
    "",
    `STUDENT ANSWER (${wc} words):`,
    item.answer || "(empty)",
  ];
  if (item.id === "q5") {
    lines.push("", `STUDENT REPORTS DIAGRAM DRAWN: ${item.hasDiagram ? "YES" : "NO"}`);
    if (!item.hasDiagram) {
      lines.push(`→ Apply this board's no-diagram cap (see HARD CAPS).`);
    }
    if (wc < 200) {
      lines.push(`⚠ Under 200 words for a 15-mark question — almost certainly cannot reach the top level/skill bands.`);
    }
  }
  if (item.id === "q4" && wc < 30) {
    lines.push(`⚠ Under 30 words for a 4-mark explain question — almost certainly cannot exceed 2/4.`);
  }
  lines.push("", "Return JSON only.");
  return lines.join("\n");
}

async function markItem(apiKey: string, item: DiagnosticItem, board: Board): Promise<ItemResult> {
  if (!item.answer || item.answer.trim().length < 5) {
    return {
      id: item.id, marks: 0, totalMarks: item.totalMarks,
      rationale: "No answer provided.",
      strengths: [], improvements: ["Write a substantive response addressing the question."],
    };
  }

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: buildSystem(board) },
        { role: "user", content: buildUser(item, board) },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`AI gateway error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty AI response");
  const parsed = JSON.parse(text);
  let marks = Math.max(0, Math.min(item.totalMarks, Math.round(Number(parsed.marks) || 0)));

  // Universal server-side enforcement: no-diagram cap on Q5 (board-specific cap %)
  if (item.id === "q5" && item.hasDiagram === false) {
    // Most boards cap at ~50%-67% with no diagram. Use 50% as floor (toughest cap)
    // for boards where diagram is required (AQA, Edexcel, IB).
    const noDiagramCaps: Partial<Record<Board, number>> = {
      "aqa": 7, "edexcel-a": 12, "edexcel-b": 8, "ocr": 7,
      "cambridge": 8, "ib": 9, "wjec": 9, "eduqas": 10,
      "aqa-gcse": 12, "cambridge-igcse": 12, "edexcel-igcse": 9, "ocr-gcse": 12,
    };
    const cap = noDiagramCaps[board] ?? Math.floor(item.totalMarks * 0.5);
    marks = Math.min(marks, cap);
  }

  return {
    id: item.id,
    marks,
    totalMarks: item.totalMarks,
    rationale: String(parsed.rationale ?? ""),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3).map(String) : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 3).map(String) : [],
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const body = await req.json();
    const items: DiagnosticItem[] = body.items ?? [];
    const board: Board = (body.board as Board) || "aqa";
    if (!BOARD_CONVENTIONS[board]) {
      return new Response(JSON.stringify({ error: `Unknown board: ${board}` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results = await Promise.all(items.map((it) => markItem(apiKey, it, board)));

    return new Response(JSON.stringify({ results, board: BOARD_CONVENTIONS[board].name }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
