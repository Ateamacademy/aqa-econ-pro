import type { Rubric } from "./rubrics";
import type { MarkingResult, SynthesisResult } from "./validation";
import { parseMarkingJSON, parseSynthesisJSON, validateMarks, enforceAxesCap } from "./validation";

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mark-exam`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

async function callMarkingEdge(body: Record<string, unknown>): Promise<string> {
  const resp = await fetch(EDGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: AUTH_HEADER },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: `Marking failed (${resp.status})` }));
    throw new Error(err.error || `Marking failed (${resp.status})`);
  }
  return resp.text();
}

function buildDiagramPrompt(
  question: string,
  rubric: Rubric,
  studentAnswer: string,
  hasImage: boolean
): string {
  const reqList = (rubric.diagramRequirements ?? [])
    .map((r, i) => `  ${i + 1}. [${r.id}] ${r.requirement} (${r.marks} mark${r.marks > 1 ? "s" : ""})${r.critical ? " [CRITICAL]" : ""}`)
    .join("\n");

  const levelList = rubric.levels
    .map((l) => `  Level ${l.level} (${l.markRange[0]}-${l.markRange[1]}): ${l.descriptor}`)
    .join("\n");

  return `QUESTION: ${question}

COMMAND WORD: ${rubric.command} (weight AO1/AO2/AO3/AO4 accordingly)

TOTAL MARKS: ${rubric.totalMarks}

RUBRIC — DIAGRAM REQUIREMENTS (each with its own marks):
${reqList}

RUBRIC — LEVEL DESCRIPTORS:
${levelList}

INDICATIVE CONTENT (not exhaustive, credit valid alternatives):
${rubric.indicativeContent.map((c) => `  • ${c}`).join("\n")}

CONTEXT HOOKS (scenario phrases the student should engage with for application marks):
${rubric.contextHooks.length ? rubric.contextHooks.map((c) => `  • ${c}`).join("\n") : "  (none for this question)"}

COMMON ERRORS TO CHECK FOR:
${rubric.commonErrors.map((e) => `  • ${e}`).join("\n")}

STUDENT SUBMISSION:
${hasImage ? "See attached diagram image plus written explanation below:" : ""}
${studentAnswer}

MARKING INSTRUCTIONS:
1. For EACH diagramRequirement, decide: fully met / partially met / not met. Award the stated marks accordingly.
2. For written explanation, judge against level descriptors using AO1 (knowledge), AO2 (application), AO3 (analysis), AO4 (evaluation, only if command word requires it).
3. A diagram with missing axes labels cannot score above Level 2 regardless of prose quality.
4. Application marks REQUIRE direct engagement with the scenario's contextHooks — generic textbook answers cap at mid-Level 2.
5. If the student's diagram contains a factual error, deduct the relevant requirement marks AND flag it in errors.
6. Output JSON EXACTLY in the shape specified. No markdown, no prose outside JSON.`;
}

const SYSTEM_PROMPT = `You are a senior Edexcel A-Level Economics examiner marking to the official mark scheme. You are STRICT, FAIR, and EVIDENCE-BASED. You never award marks that are not earned. You never withhold marks that are earned. You quote directly from the student's work to justify every decision. You reply with ONLY a single JSON object, no prose, no markdown fences.

Output JSON must have this exact shape:
{
  "totalAwarded": number,
  "totalPossible": number,
  "level": 1|2|3|4,
  "levelJustification": string,
  "requirementBreakdown": [
    {
      "id": string,
      "requirement": string,
      "marksAwarded": number,
      "marksAvailable": number,
      "status": "met"|"partial"|"missing"|"incorrect",
      "evidence": string,
      "examinerNote": string
    }
  ],
  "writtenExplanation": {
    "ao1": { "score": number, "outOf": number, "comment": string },
    "ao2": { "score": number, "outOf": number, "comment": string },
    "ao3": { "score": number, "outOf": number, "comment": string },
    "ao4": { "score": number, "outOf": number, "comment": string } | null
  },
  "strengths": [string, string, string],
  "improvements": [string, string, string],
  "modelImprovement": string,
  "nextSteps": [string, string]
}`;

export async function markDiagramAnswer(
  question: string,
  rubric: Rubric,
  studentAnswer: string,
  imageBase64?: string
): Promise<{ result: MarkingResult; warning: string | null }> {
  const userPrompt = buildDiagramPrompt(question, rubric, studentAnswer, !!imageBase64);

  const messages: Array<{ role: string; content: unknown }> = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
        { type: "text", text: userPrompt },
      ],
    });
  } else {
    messages.push({ role: "user", content: userPrompt });
  }

  const raw = await callMarkingEdge({ messages, maxTokens: 2000 });
  let result = parseMarkingJSON(raw);
  result = enforceAxesCap(result, rubric);
  const warning = validateMarks(result, rubric);
  return { result, warning };
}

export async function markSubQuestion(
  question: string,
  rubric: Rubric,
  studentAnswer: string,
  extract?: string,
  imageBase64?: string
): Promise<{ result: MarkingResult; warning: string | null }> {
  const prompt = buildDiagramPrompt(
    `${question}${extract ? `\n\nEXTRACT:\n${extract}` : ""}`,
    rubric,
    studentAnswer,
    !!imageBase64
  );

  const messages: Array<{ role: string; content: unknown }> = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
        { type: "text", text: prompt },
      ],
    });
  } else {
    messages.push({ role: "user", content: prompt });
  }

  const raw = await callMarkingEdge({ messages, maxTokens: 2000 });
  let result = parseMarkingJSON(raw);
  result = enforceAxesCap(result, rubric);
  const warning = validateMarks(result, rubric);
  return { result, warning };
}

export async function synthesisePaper(
  results: Array<{ questionId: string; questionNumber: string; result: MarkingResult; totalMarks: number }>
): Promise<SynthesisResult> {
  const summaryData = results.map((r) => ({
    questionNumber: r.questionNumber,
    totalAwarded: r.result.totalAwarded,
    totalPossible: r.result.totalPossible,
    level: r.result.level,
    strengths: r.result.strengths,
    improvements: r.result.improvements,
    ao1: r.result.writtenExplanation.ao1,
    ao2: r.result.writtenExplanation.ao2,
    ao3: r.result.writtenExplanation.ao3,
    ao4: r.result.writtenExplanation.ao4,
  }));

  const messages = [
    {
      role: "system",
      content: `You are a senior Edexcel A-Level Economics examiner producing a whole-paper report. Reply with ONLY a single JSON object, no prose, no markdown fences.

Output JSON shape:
{
  "overallGrade": "A*"|"A"|"B"|"C"|"D"|"E"|"U",
  "overallPercentage": number,
  "totalAwarded": number,
  "totalPossible": number,
  "gradeBoundaryContext": string,
  "aoBreakdown": { "ao1": number, "ao2": number, "ao3": number, "ao4": number },
  "themesWeakest": [string, string, string],
  "themesStrongest": [string, string],
  "examTechniqueFeedback": string,
  "personalisedStudyPlan": [
    { "week": 1, "focus": string, "resources": [string] },
    { "week": 2, "focus": string, "resources": [string] },
    { "week": 3, "focus": string, "resources": [string] }
  ]
}`,
    },
    {
      role: "user",
      content: `You have these per-question marking results for a student's Edexcel paper:\n\n${JSON.stringify(summaryData, null, 2)}\n\nProduce a whole-paper examiner report as JSON.`,
    },
  ];

  const raw = await callMarkingEdge({ messages, maxTokens: 2000 });
  return parseSynthesisJSON(raw);
}
