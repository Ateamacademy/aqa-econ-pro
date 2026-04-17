/**
 * Client helper for the `aqa-mark-diagram` edge function.
 * Calls in parallel across questions, sanitises any numeric-mark leakage as a
 * second backstop (the function already sanitises server-side), and caches
 * results by hash of (rubric + elements + written answer).
 */

import { supabase } from "@/integrations/supabase/client";
import type { AqaDiagramRubric } from "./aqa-diagram-rubric";

export interface AiDiagramAnalysis {
  contextualComponents: Array<{
    componentId: string;
    present: boolean;
    evidence: string;
    confidence: "high" | "medium" | "low";
  }>;
  strengths: string[];
  gaps: string[];
  levelRecommendation: { level: "L1" | "L2" | "L3" | "L4"; rationale: string };
  writtenAnswerInteraction: string | null;
}

export interface AiDiagramFallback {
  fallback: true;
  message: string;
}

export type AiDiagramResult = AiDiagramAnalysis | AiDiagramFallback;

const CACHE = new Map<string, AiDiagramResult>();

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return String(h);
}

const NUMERIC_MARK_RE = /\b\d+\s*\/\s*\d+\b|\b\d+\s*marks?\b|worth\s+\d+|awarded?\s+\d+/gi;

function sanitiseString(s: string): string {
  return s
    .replace(/\b\d+\s*\/\s*\d+\b/g, "—")
    .replace(/\b\d+\s*marks?\b/gi, "marks")
    .replace(/worth\s+\d+/gi, "worth")
    .replace(/awarded?\s+\d+/gi, "awarded");
}

function sanitiseDeep<T>(v: T): T {
  if (typeof v === "string") return sanitiseString(v) as unknown as T;
  if (Array.isArray(v)) return v.map(sanitiseDeep) as unknown as T;
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = sanitiseDeep(val);
    return out as unknown as T;
  }
  return v;
}

export interface MarkDiagramInput {
  prompt: string;
  rubric: AqaDiagramRubric;
  diagramElements: unknown[];
  writtenAnswer?: string;
  structuralResults?: Array<{ componentId: string; passed: boolean }>;
}

export async function markDiagramAi(input: MarkDiagramInput): Promise<AiDiagramResult> {
  const key = hash(JSON.stringify({
    p: input.prompt,
    r: input.rubric.primaryExpected,
    e: input.diagramElements,
    w: input.writtenAnswer ?? "",
  }));
  const cached = CACHE.get(key);
  if (cached) return cached;

  const { data, error } = await supabase.functions.invoke("aqa-mark-diagram", { body: input });
  if (error) {
    const fb: AiDiagramFallback = { fallback: true, message: "AI analysis unavailable — proceed with self-assessment." };
    return fb;
  }
  const cleaned = sanitiseDeep(data) as AiDiagramResult;
  CACHE.set(key, cleaned);
  return cleaned;
}

/** Run analyses in parallel across many questions. */
export async function markDiagramsAiParallel(
  inputs: Array<MarkDiagramInput & { questionNumber: number }>,
  onProgress?: (qn: number, done: number, total: number) => void,
): Promise<Record<number, AiDiagramResult>> {
  const out: Record<number, AiDiagramResult> = {};
  let done = 0;
  await Promise.all(
    inputs.map(async (i) => {
      const r = await markDiagramAi(i);
      out[i.questionNumber] = r;
      done += 1;
      onProgress?.(i.questionNumber, done, inputs.length);
    }),
  );
  return out;
}

export function isFallback(r: AiDiagramResult): r is AiDiagramFallback {
  return (r as AiDiagramFallback).fallback === true;
}

/** Final UI-side backstop: never render any string containing N/N or "N marks". */
export function safeText(s: string): string {
  return s.replace(NUMERIC_MARK_RE, (m) => (m.includes("/") ? "—" : "marks"));
}
