export type RunMode = "short-run" | "long-run";

export const MONOP_COMP_COLORS = {
  surface: "hsl(var(--card))",
  panel: "hsl(var(--background) / 0.32)",
  border: "hsl(var(--border) / 0.9)",
  text: "hsl(var(--foreground))",
  muted: "hsl(var(--muted-foreground))",
  shortRun: "hsl(var(--electric-blue))",
  longRun: "hsl(var(--indigo-glow))",
  marginalCost: "hsl(var(--warning))",
  averageCost: "hsl(var(--success))",
  accent: "hsl(var(--accent))",
  danger: "hsl(var(--destructive))",
  profitFill: "hsl(var(--success) / 0.2)",
  profitText: "hsl(var(--success))",
  ghost: "hsl(var(--electric-blue) / 0.2)",
  callout: "hsl(var(--card) / 0.92)",
  calloutText: "hsl(var(--foreground))",
  yellowCallout: "hsl(var(--warning) / 0.22)",
} as const;

export const svgLabelStyle = {
  fontFamily: "Inter, system-ui, sans-serif",
};

/* ──────────────────────────────────────────────────────────────────────────
 * Parametric geometry shared by the short-run and long-run diagrams so the
 * curves are mathematically consistent (MC cuts AC at AC's minimum; the LR
 * tangency point is, by construction, also where MR = MC).
 * Data space: q ∈ [0, Q_MAX], value (price/cost) ∈ [0, V_MAX].
 * ────────────────────────────────────────────────────────────────────────── */
export const VIEW = { w: 1000, h: 750 } as const;
export const PLOT = { left: 130, right: 860, top: 110, bottom: 620 } as const;
export const Q_MAX = 10;
export const V_MAX = 10;

export const toX = (q: number) => PLOT.left + (q / Q_MAX) * (PLOT.right - PLOT.left);
export const toY = (v: number) => PLOT.bottom - (v / V_MAX) * (PLOT.bottom - PLOT.top);

// Cost family: AC(q) = A(q - Q*)² + B. MC = d(TC)/dq (TC = q·AC) passes through
// AC exactly at its minimum Q*, so MC cuts AC at the AC minimum by construction.
export const Q_STAR = 6;
const A = 0.12;
const B = 2.5;
export const acFn = (q: number) => A * (q - Q_STAR) * (q - Q_STAR) + B;
export const mcFn = (q: number) => A * (q - Q_STAR) * (3 * q - Q_STAR) + B;
export const acDeriv = (q: number) => 2 * A * (q - Q_STAR);

// Polyline (screen-space "x,y x,y …") for a data-space cost function.
export function curvePoints(fn: (q: number) => number, q0 = 0.6, q1 = Q_MAX - 0.3, n = 90): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const q = q0 + (i / n) * (q1 - q0);
    const v = fn(q);
    if (v < 0.15 || v > V_MAX) continue;
    pts.push(`${toX(q).toFixed(1)},${toY(v).toFixed(1)}`);
  }
  return pts.join(" ");
}

// Smallest q in (lo, hi] where f changes sign — used to locate MR = MC.
export function solveCross(f: (q: number) => number, lo = 0.4, hi = Q_MAX): number {
  let prev = f(lo);
  for (let q = lo + 0.01; q <= hi; q += 0.01) {
    const cur = f(q);
    if (prev === 0 || (prev > 0) !== (cur > 0)) return q;
    prev = cur;
  }
  return hi;
}
