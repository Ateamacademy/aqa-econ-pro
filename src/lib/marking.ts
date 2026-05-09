import type { Rubric } from "./rubrics";
import type { MarkingResult, SynthesisResult } from "./validation";
import { parseMarkingJSON, parseSynthesisJSON, validateMarks, enforceAxesCap } from "./validation";
import { verifyDiagramImage, type VerificationReport } from "./verification";
import { validateAndCorrectMarks, checkWordCountGate, checkKeyTermGate, checkContextGate, checkPlagiarismGate } from "./markValidator";
import { logMarkingEvent } from "./markingTelemetry";

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
  hasImage: boolean,
  verification: VerificationReport | null
): string {
  const reqList = (rubric.diagramRequirements ?? [])
    .map((r, i) => `  ${i + 1}. [${r.id}] ${r.requirement} (${r.marks} mark${r.marks > 1 ? "s" : ""})${r.critical ? " [CRITICAL]" : ""}`)
    .join("\n");

  const levelList = rubric.levels
    .map((l) => `  Level ${l.level} (${l.markRange[0]}-${l.markRange[1]}): ${l.descriptor}`)
    .join("\n");

  let verificationSection = "";
  if (verification) {
    verificationSection = `\n\nVERIFICATION REPORT (authoritative · you cannot override this):
${JSON.stringify(verification, null, 2)}

Remember: if verification says a feature is absent, marks for that feature = 0. Do not be generous. Do not assume. The student earns marks by showing the work, not by potentially knowing it.`;
  }

  return `QUESTION: ${question}

COMMAND WORD: ${rubric.command} (weight AO1/AO2/AO3/AO4 accordingly)

TOTAL MARKS: ${rubric.totalMarks}

RUBRIC · DIAGRAM REQUIREMENTS (each with its own marks):
${reqList}

RUBRIC · LEVEL DESCRIPTORS:
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
${verificationSection}

MARKING INSTRUCTIONS:
1. For EACH diagramRequirement, decide: fully met / partially met / not met. Award the stated marks accordingly.
2. For written explanation, judge against level descriptors using AO1 (knowledge), AO2 (application), AO3 (analysis), AO4 (evaluation, only if command word requires it).
3. A diagram with missing axes labels cannot score above Level 2 regardless of prose quality.
4. Application marks REQUIRE direct engagement with the scenario's contextHooks · generic textbook answers cap at mid-Level 2.
5. If the student's diagram contains a factual error, deduct the relevant requirement marks AND flag it in errors.
6. For every mark you award, cite a specific feature from the verification report or a direct quote from the written explanation. Citations like 'shows understanding' or 'attempts to draw' are FORBIDDEN.
7. If the written explanation is empty or under 20 words, the writtenExplanation AO scores are all 0.
8. Output JSON EXACTLY in the shape specified. No markdown, no prose outside JSON.`;
}

const STRICT_SYSTEM_PROMPT = `You are a senior Edexcel A-Level Economics examiner. You mark to the official mark scheme with ZERO generosity bias. You DO NOT award marks for effort, attempt, or potential. You award marks ONLY for features that are demonstrably present in the student's submission.

HARD RULES · VIOLATION OF ANY OF THESE INVALIDATES YOUR MARKING:

1. You will receive a verification report describing what is literally in the diagram. You may NOT award marks for any feature flagged as absent in that report. If the verification says 'no axes', you award 0 for the axes requirement · no exceptions, no benefit of the doubt.

2. If verification.completeness == 'empty': total score MUST be 0. Output only zeros.

3. If verification.completeness == 'sparse': maximum possible total is 1, and only if there is identifiable economic content.

4. If verification.completeness == 'partial': maximum possible total is 50% of totalMarks.

5. You may not award 'half marks for trying'. A requirement is either met (full marks), partially met (clearly defined fraction stated in rubric), or not met (zero).

6. For every mark you award, you MUST cite a specific feature from the verification report or a direct quote from the written explanation. Citations like 'shows understanding' or 'attempts to draw' are FORBIDDEN · only concrete evidence counts.

7. If the written explanation is empty or under 20 words, the writtenExplanation AO scores are all 0.

8. You reply with ONLY a single JSON object, no prose, no markdown fences.

FORBIDDEN MARK AWARDS:
- Do NOT award marks for 'attempting to set up axes' without labels.
- Do NOT award marks for 'a line that could be a curve' without a label.
- Do NOT award 'partial credit' unless the rubric explicitly lists a partial-marks tier for that requirement.
- Do NOT award 'understanding demonstrated' marks without diagram evidence of that understanding.
- Do NOT award 1 mark for 'axes present' unless BOTH axes are present AND BOTH are labelled with economic variables (e.g. Price, Quantity).

If the verification report shows completeness 'empty' or 'sparse' with no curves detected, your total MUST be 0. Any non-zero total in this case is a SEVERE ERROR.

MIN-MARKS THRESHOLD CHECK:
If your totalAwarded would be 1 or 2 out of {totalMarks} based on this diagram alone: REVIEW WHETHER IT SHOULD BE 0. A near-zero score implies the diagram is near-empty. Verify that the requirements you awarded marks for have explicit verification evidence. If not, reduce to 0.

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

export interface MarkingOutput {
  result: MarkingResult;
  warning: string | null;
  verification: VerificationReport | null;
  flags: {
    capped: boolean;
    capReason: string | null;
    correctedRequirements: string[];
    recalculated: boolean;
    originalTotal: number;
  };
}

export async function markDiagramAnswer(
  question: string,
  rubric: Rubric,
  studentAnswer: string,
  imageBase64?: string,
  inkRatio: number = 1
): Promise<MarkingOutput> {
  // Step 1: Run verification on image if present
  let verification: VerificationReport | null = null;
  if (imageBase64) {
    verification = await verifyDiagramImage(imageBase64);
  }

  const userPrompt = buildDiagramPrompt(question, rubric, studentAnswer, !!imageBase64, verification);

  const messages: Array<{ role: string; content: unknown }> = [
    { role: "system", content: STRICT_SYSTEM_PROMPT },
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

  // Step 2: Post-marking validation
  const wordCount = studentAnswer.trim().split(/\s+/).filter(Boolean).length;
  const { result: validatedResult, flags } = validateAndCorrectMarks(
    result, rubric, verification, inkRatio, wordCount
  );

  // Step 3: Telemetry
  logMarkingEvent({
    timestamp: new Date().toISOString(),
    questionId: rubric.id,
    inkRatio,
    verificationCompleteness: verification?.completeness ?? null,
    claudeRawTotal: result.totalAwarded,
    validatedTotal: validatedResult.totalAwarded,
    capped: flags.capped,
    capReason: flags.capReason,
  });

  return { result: validatedResult, warning, verification, flags };
}

export async function markSubQuestion(
  question: string,
  rubric: Rubric,
  studentAnswer: string,
  extract?: string,
  imageBase64?: string
): Promise<MarkingOutput> {
  const wordCount = studentAnswer.trim().split(/\s+/).filter(Boolean).length;

  // Word count gate
  const { passed: wordGatePassed, minWords } = checkWordCountGate(wordCount, rubric.totalMarks);
  if (!wordGatePassed) {
    const zeroResult: MarkingResult = {
      totalAwarded: 0,
      totalPossible: rubric.totalMarks,
      level: 1,
      levelJustification: `Answer too short (${wordCount} words, minimum ${minWords} required for ${rubric.totalMarks}-mark question).`,
      requirementBreakdown: [],
      writtenExplanation: {
        ao1: { score: 0, outOf: 2, comment: "Answer too brief." },
        ao2: { score: 0, outOf: 2, comment: "Answer too brief." },
        ao3: { score: 0, outOf: 2, comment: "Answer too brief." },
        ao4: null,
      },
      strengths: ["N/A"],
      improvements: [`Write at least ${minWords} words to demonstrate the economics required for this mark band.`],
      modelImprovement: "",
      nextSteps: ["Practise writing under timed conditions to build up answer length."],
    };
    return {
      result: zeroResult,
      warning: `Your answer is too short to demonstrate the economics required for this mark band (${wordCount}/${minWords} words).`,
      verification: null,
      flags: { capped: true, capReason: "Word count gate", correctedRequirements: [], recalculated: false, originalTotal: 0 },
    };
  }

  // Key term gate check (for later cap enforcement)
  const keyTermCheck = checkKeyTermGate(studentAnswer, rubric.keyTerms);

  // Context engagement gate
  const contextCheck = checkContextGate(studentAnswer, rubric.contextHooks);

  // Run verification if image present
  let verification: VerificationReport | null = null;
  if (imageBase64) {
    verification = await verifyDiagramImage(imageBase64);
  }

  const prompt = buildDiagramPrompt(
    `${question}${extract ? `\n\nEXTRACT:\n${extract}` : ""}`,
    rubric,
    studentAnswer,
    !!imageBase64,
    verification
  );

  const messages: Array<{ role: string; content: unknown }> = [
    { role: "system", content: STRICT_SYSTEM_PROMPT },
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

  // Apply key term cap
  if (!keyTermCheck.passed && result.writtenExplanation.ao1) {
    const lowestBand = Math.min(1, result.writtenExplanation.ao1.outOf);
    if (result.writtenExplanation.ao1.score > lowestBand) {
      result.writtenExplanation.ao1 = {
        ...result.writtenExplanation.ao1,
        score: lowestBand,
        comment: `${result.writtenExplanation.ao1.comment} [Capped: only ${keyTermCheck.found}/${keyTermCheck.total} key terms used]`,
      };
    }
  }

  // Apply context gate cap
  if (!contextCheck.passed && (rubric.questionType === "data-response" || rubric.questionType === "essay")) {
    if (result.writtenExplanation.ao2) {
      result.writtenExplanation.ao2 = {
        ...result.writtenExplanation.ao2,
        score: 0,
        comment: `${result.writtenExplanation.ao2.comment} [Capped at 0: no context hooks referenced · this is a textbook answer, not a contextualised one]`,
      };
    }
  }

  const { result: validatedResult, flags } = validateAndCorrectMarks(result, rubric, verification, 1, wordCount);
  const warning = validateMarks(validatedResult, rubric);

  logMarkingEvent({
    timestamp: new Date().toISOString(),
    questionId: rubric.id,
    inkRatio: 1,
    verificationCompleteness: verification?.completeness ?? null,
    claudeRawTotal: result.totalAwarded,
    validatedTotal: validatedResult.totalAwarded,
    capped: flags.capped,
    capReason: flags.capReason,
  });

  return { result: validatedResult, warning, verification, flags };
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
