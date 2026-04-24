/**
 * Lazy loader for verbatim predicted-paper mark schemes.
 *
 * For every supported board (AQA, Edexcel A/B, OCR, IB, CIE, WJEC, Eduqas,
 * AQA GCSE, Edexcel/CIE/OCR IGCSE), we have parsed the official Download
 * Solution PDF into a sibling `.md` file in `/public/<board>-mocks/`.
 *
 * This module:
 *  - derives the `.md` URL from a predicted-paper id via the shared
 *    `staticPaperResolver` (so id ↔ file mapping stays in one place),
 *  - lazily fetches the markdown the first time it is needed,
 *  - caches results in-memory for the session.
 *
 * Returns `null` when no curated mark scheme exists for the given id (in
 * which case the AI marker falls back to the generic per-board prompt).
 */
import { resolveStaticPaperPdf } from "@/lib/staticPaperResolver";

const cache = new Map<string, string | null>();
const inflight = new Map<string, Promise<string | null>>();

/** Maximum characters of mark-scheme text injected into the AI prompt. */
const MAX_CHARS = 60_000;

function clampMarkScheme(md: string): string {
  if (md.length <= MAX_CHARS) return md;
  return md.slice(0, MAX_CHARS) + "\n\n[mark scheme truncated for prompt length]";
}

/**
 * Returns the verbatim mark-scheme markdown for the given predicted-paper id,
 * or `null` if no curated `.md` exists / the fetch failed.
 */
export async function loadPredictedMarkScheme(
  paperId: string | undefined,
): Promise<string | null> {
  if (!paperId) return null;
  if (cache.has(paperId)) return cache.get(paperId) ?? null;
  const existing = inflight.get(paperId);
  if (existing) return existing;

  const ms = resolveStaticPaperPdf(paperId, "mark-scheme");
  if (!ms) {
    cache.set(paperId, null);
    return null;
  }
  const url = ms.url.replace(/\.pdf$/i, ".md");

  const p = (async () => {
    try {
      const resp = await fetch(url, { cache: "force-cache" });
      if (!resp.ok) {
        cache.set(paperId, null);
        return null;
      }
      const text = clampMarkScheme((await resp.text()).trim());
      cache.set(paperId, text);
      return text;
    } catch (e) {
      console.warn("[predictedMarkSchemeLoader] fetch failed", url, e);
      cache.set(paperId, null);
      return null;
    } finally {
      inflight.delete(paperId);
    }
  })();
  inflight.set(paperId, p);
  return p;
}
