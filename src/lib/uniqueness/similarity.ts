/** Jaccard similarity on two token sets. */
export function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 1;
  const setA = new Set(a);
  const setB = new Set(b);
  let inter = 0;
  for (const t of setA) if (setB.has(t)) inter++;
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** Cosine similarity on word-frequency vectors derived from two strings. */
export function cosine(a: string, b: string): number {
  const tokA = a.split(/\s+/).filter(Boolean);
  const tokB = b.split(/\s+/).filter(Boolean);
  if (tokA.length === 0 || tokB.length === 0) return 0;
  const freqA: Record<string, number> = {};
  const freqB: Record<string, number> = {};
  for (const t of tokA) freqA[t] = (freqA[t] ?? 0) + 1;
  for (const t of tokB) freqB[t] = (freqB[t] ?? 0) + 1;
  const all = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const k of all) {
    const x = freqA[k] ?? 0;
    const y = freqB[k] ?? 0;
    dot += x * y;
    magA += x * x;
    magB += y * y;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
