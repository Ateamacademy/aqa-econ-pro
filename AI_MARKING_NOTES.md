# Tier 3 — AI Marking Notes

This document covers the optional AI-powered marking layer (Tier 3) for AQA
predicted papers. **Read this before changing the AI marking pipeline.**

## What Tier 3 is — and what it isn't

- ✅ **Advisory.** It identifies strengths, gaps, and a recommended level
  using the AQA KAA+E framework.
- ❌ **Not a marker.** It never assigns numerical marks. The student's Tier 2
  self-assessment is the source of truth for the report's totals.

The disclaimer card below every AI analysis card is **load-bearing** — do not
remove it. Students rely on it to interpret what they're seeing.

## Provider abstraction

The Edge Function `mark-with-ai` supports four providers, selected by the
`AI_PROVIDER` Supabase secret:

| `AI_PROVIDER` | Default model               | Key secret needed     |
|---------------|-----------------------------|-----------------------|
| `lovable`     | `google/gemini-2.5-flash`   | `LOVABLE_API_KEY` ✓   |
| `gemini`      | `gemini-2.0-flash`          | `AI_API_KEY`          |
| `anthropic`   | `claude-sonnet-4-20250514`  | `AI_API_KEY`          |
| `openai`      | `gpt-4o-mini`               | `AI_API_KEY`          |

`lovable` (Lovable AI Gateway) is the default and **needs no setup** — the
`LOVABLE_API_KEY` is auto-provisioned. To swap providers later:

1. Set `AI_PROVIDER` to `gemini` / `anthropic` / `openai`
2. Set `AI_API_KEY` to a key from that provider
3. Optionally set `AI_MODEL` to override the default
4. No code change needed — the routing logic already handles all four

### Setting up Gemini direct (free tier) instead of Lovable AI

1. https://aistudio.google.com/apikey → create API key (free, no card)
2. Supabase → Edge Functions → Secrets:
   - `AI_PROVIDER` = `gemini`
   - `AI_API_KEY` = your key
   - `AI_MODEL` = `gemini-2.0-flash` (~1,500 free requests/day)

## Anti-mark guarantees (defence in depth)

1. **System prompt** explicitly forbids marks — "ABSOLUTE RULES" block.
2. **JSON response format** enforced via `response_format: json_object` (or
   Gemini's `responseMimeType`).
3. **Schema validation** — malformed responses return `malformed_response`
   without surfacing partial output.
4. **`sanitiseAnalysis`** server-side regex strips `\d+/\d+`, `\d+ marks`,
   `worth \d+`, `awarded \d+`, `score of \d+`, `level \d is worth` from every
   field before returning.

If the model still slips through with a mark, both the prompt and the regex
need updating — never just the regex.

## Caching + rate limiting

- Every AI response is cached in `ai_marking_cache` keyed by SHA-256 of
  `(questionId, studentAnswer, diagramData)`. 30-day TTL.
- Cache hits cost no API quota and are served before the rate-limit check.
- Per-user rate limit: **20 calls/hour** (in-memory bucket in the Edge
  Function instance). Lovable AI Gateway has its own workspace-level limit;
  Gemini free tier is ~1,500/day.
- Every call (cached or not) is logged to `ai_usage_log` for admin visibility
  at `/admin/ai-usage`.

## Graceful degradation

The marking report must still work end-to-end if Tier 3 fails. UI states:

| Edge function returns | UI shows                                                |
|-----------------------|---------------------------------------------------------|
| `503 ai_not_configured` | Trigger button hidden entirely                        |
| `429 rate_limited`      | "You've used today's AI analysis quota…" with hours   |
| `502 provider_error`    | "AI analysis couldn't run just now…" with Retry      |
| `502 malformed_response`| "AI response was incomplete…"                         |
| `401 auth_required`     | Trigger button hidden (user not signed in)            |

Tier 1 (auto) and Tier 2 (self-assessment) remain authoritative in all cases.

## Honest limits

- **Gemini free tier ceiling**: ~1,500/day → roughly 75 student sessions
  before saturation. Switch to Lovable AI Gateway (default) or paid Gemini
  if you need more.
- **Quality varies by question type.** Strong on 15/25-mark essay analysis
  and KAA+E breakdown. Weaker on subjective evaluation calls where expert
  markers themselves disagree.
- **Diagrams analysed from structured data**, not from a screenshot. The AI
  sees the canvas element list (labels, lines, markers).
- **Cache key is content-derived** — different students answering identically
  share a cache hit. Acceptable since the analysis is purely a function of
  the answer text.

## Files

- `supabase/functions/mark-with-ai/index.ts` — provider-agnostic Edge Function
- `src/lib/aiMarking.ts` — typed client wrapper
- `src/hooks/useAiMarking.ts` — React state for parallel AI calls
- `src/components/aqa-marking/AiAnalysisCard.tsx` — purple-accent result card
- `src/components/aqa-marking/AiAnalysisTrigger.tsx` — opt-in CTA
- `src/pages/AdminAiUsage.tsx` — usage dashboard at `/admin/ai-usage`
