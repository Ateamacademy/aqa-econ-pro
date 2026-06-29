/**
 * PerfectCompDiagram · Textbook-style Perfect Competition diagrams.
 *
 * Two bordered panels stacked vertically:
 *   Panel 1: Short Run · single firm diagram + theory text
 *   Panel 2: Long Run  · firm diagram (left) + industry diagram (right) + theory text
 *
 * All equilibria computed mathematically. Matches standard A-level textbook style.
 */

import { useMemo } from "react";

/* ═══════ Math helpers ═══════ */
function evalQuad(a: number, b: number, c: number, x: number) {
  return a * x * x + b * x + c;
}

function solveQuadForY(a: number, b: number, c: number, y: number): number | null {
  const A = a, B = b, C = c - y;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const x1 = (-B + Math.sqrt(disc)) / (2 * A);
  const x2 = (-B - Math.sqrt(disc)) / (2 * A);
  const valid = [x1, x2].filter(v => v >= 0.3 && v <= 6).sort((a, b) => a - b);
  return valid.length > 0 ? valid[valid.length - 1] : null;
}

function findMinATC(mcA: number, mcB: number, mcC: number, atcA: number, atcB: number, atcC: number) {
  const A = mcA - atcA, B = mcB - atcB, C = mcC - atcC;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const x1 = (-B + Math.sqrt(disc)) / (2 * A);
  const x2 = (-B - Math.sqrt(disc)) / (2 * A);
  const valid = [x1, x2].filter(v => v > 0.5 && v <= 6);
  if (valid.length === 0) return null;
  const x = valid[0];
  return { x, y: evalQuad(atcA, atcB, atcC, x) };
}

function intersectLinear(s1: number, i1: number, s2: number, i2: number) {
  const d = s1 - s2;
  if (Math.abs(d) < 1e-9) return null;
  const x = (i2 - i1) / d;
  return { x, y: s1 * x + i1 };
}

function quadPath(a: number, b: number, c: number, ox: number, oy: number, sx: number, sy: number, xFrom: number, xTo: number) {
  const steps = 60;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = xFrom + (i / steps) * (xTo - xFrom);
    const y = evalQuad(a, b, c, x);
    if (y >= -0.5 && y <= 12) {
      const px = ox + x * sx;
      const py = oy - y * sy;
      pts.push(`${pts.length === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
  }
  return pts.join(" ");
}

/* ═══════ Locked curve parameters ═══════ */
const MC = { a: 0.6, b: -2, c: 3.5 };
const ATC = { a: 0.5, b: -2.2, c: 4.8 };
const D_IND = { slope: -0.8, intercept: 9 };
const S_IND = { slope: 0.9, intercept: 0.5 };
const S1_IND = { slope: 0.9, intercept: 2.2 };

/* ═══════ Short Run Panel ═══════ */
function ShortRunPanel() {
  const W = 340, H = 260;
  const ox = 55, oy = H - 35; // origin
  const sx = 50, sy = 38; // scale per data unit
  const maxX = 5.2;

  const computed = useMemo(() => {
    // SR price: use E2 = intersect(D, S1) which gives higher price
    const E2 = intersectLinear(D_IND.slope, D_IND.intercept, S1_IND.slope, S1_IND.intercept)!;
    const p = E2.y;
    const q = solveQuadForY(MC.a, MC.b, MC.c, p)!;
    const c = evalQuad(ATC.a, ATC.b, ATC.c, q);
    return { p, q, c };
  }, []);

  const { p, q, c } = computed;
  const mc = quadPath(MC.a, MC.b, MC.c, ox, oy, sx, sy, 0.6, maxX);
  const atc = quadPath(ATC.a, ATC.b, ATC.c, ox, oy, sx, sy, 0.4, maxX);

  const px = (v: number) => ox + v * sx;
  const py = (v: number) => oy - v * sy;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxWidth: 420 }}>
      {/* Axes */}
      <line x1={ox} y1={12} x2={ox} y2={oy} stroke="currentColor" strokeWidth={1.5} />
      <line x1={ox} y1={oy} x2={W - 15} y2={oy} stroke="currentColor" strokeWidth={1.5} />
      <polygon points={`${ox - 3},16 ${ox},8 ${ox + 3},16`} fill="currentColor" />
      <polygon points={`${W - 19},${oy - 3} ${W - 12},${oy} ${W - 19},${oy + 3}`} fill="currentColor" />

      {/* Axis labels */}
      <text x={16} y={14} fontSize={10} fontWeight={600} fill="currentColor" fontFamily="serif">Revenue /</text>
      <text x={16} y={26} fontSize={10} fontWeight={600} fill="currentColor" fontFamily="serif">Cost</text>
      <text x={W - 50} y={oy + 16} fontSize={10} fontWeight={600} fill="currentColor" fontFamily="serif">Output</text>

      {/* AR = MR = p line (red, horizontal) */}
      <line x1={ox} y1={py(p)} x2={W - 20} y2={py(p)} stroke="#ef4444" strokeWidth={2.5} />
      <text x={W - 22} y={py(p) + 12} fontSize={9} fontWeight={700} fill="#ef4444" fontFamily="serif" textAnchor="end">AR=MR=p</text>

      {/* MC curve (blue) */}
      <path d={mc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />
      {/* ATC curve (blue) */}
      <path d={atc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />

      {/* Curve labels */}
      {(() => {
        const mcLabelX = 4.0;
        const mcLabelY = evalQuad(MC.a, MC.b, MC.c, mcLabelX);
        return <text x={px(mcLabelX) + 5} y={py(mcLabelY) - 4} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">MC</text>;
      })()}
      {(() => {
        const atcLabelX = 4.3;
        const atcLabelY = evalQuad(ATC.a, ATC.b, ATC.c, atcLabelX);
        return <text x={px(atcLabelX) + 6} y={py(atcLabelY)} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">ATC</text>;
      })()}

      {/* Dotted projection: vertical from q */}
      <line x1={px(q)} y1={py(p)} x2={px(q)} y2={oy} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      {/* Dotted projection: horizontal from c */}
      <line x1={ox} y1={py(c)} x2={px(q)} y2={py(c)} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />

      {/* Axis markers */}
      <text x={ox - 6} y={py(p) + 4} fontSize={10} fontWeight={700} fill="currentColor" textAnchor="end" fontFamily="serif">p</text>
      <text x={ox - 6} y={py(c) + 4} fontSize={10} fontWeight={700} fill="currentColor" textAnchor="end" fontFamily="serif">c</text>
      <text x={px(q)} y={oy + 14} fontSize={10} fontWeight={700} fill="currentColor" textAnchor="middle" fontFamily="serif">q</text>

      {/* Supernormal profit shading (light green) */}
      <rect
        x={px(0)} y={py(p)}
        width={px(q) - px(0)} height={py(c) - py(p)}
        fill="rgba(74,222,128,0.12)" stroke="#16a34a" strokeWidth={0.8} strokeDasharray="3,2"
      />
    </svg>
  );
}

/* ═══════ Long Run Panel ═══════ */
function LongRunPanel() {
  const W = 620, H = 280;
  // Firm panel: left half
  const fOx = 55, fOy = H - 40;
  const fSx = 44, fSy = 34;
  const fMaxX = 5.2;
  // Industry panel: right half
  const iOx = 380, iOy = H - 40;
  const iSx = 34, iSy = 34;
  const iMaxX = 5.5;

  const computed = useMemo(() => {
    const E1 = intersectLinear(D_IND.slope, D_IND.intercept, S_IND.slope, S_IND.intercept)!;
    const minATC = findMinATC(MC.a, MC.b, MC.c, ATC.a, ATC.b, ATC.c)!;
    const pe = minATC.y; // LR price = min ATC = normal profit
    const qe = minATC.x; // LR firm output
    return { E1, pe, qe };
  }, []);

  const { E1, pe, qe } = computed;
  const mc = quadPath(MC.a, MC.b, MC.c, fOx, fOy, fSx, fSy, 0.6, fMaxX);
  const atc = quadPath(ATC.a, ATC.b, ATC.c, fOx, fOy, fSx, fSy, 0.4, fMaxX);

  const fpx = (v: number) => fOx + v * fSx;
  const fpy = (v: number) => fOy - v * fSy;
  const ipx = (v: number) => iOx + v * iSx;
  const ipy = (v: number) => iOy - v * iSy;

  const evalLin = (s: number, i: number, x: number) => s * x + i;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxWidth: 720 }}>
      {/* ═══ FIRM PANEL (left) ═══ */}
      <text x={fOx + (fMaxX * fSx) / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor" fontFamily="serif" textDecoration="underline">Firm</text>

      {/* Axes */}
      <line x1={fOx} y1={18} x2={fOx} y2={fOy} stroke="currentColor" strokeWidth={2} />
      <line x1={fOx} y1={fOy} x2={fOx + fMaxX * fSx + 20} y2={fOy} stroke="currentColor" strokeWidth={2} />
      <polygon points={`${fOx - 4},22 ${fOx},12 ${fOx + 4},22`} fill="currentColor" />
      <polygon points={`${fOx + fMaxX * fSx + 16},${fOy - 4} ${fOx + fMaxX * fSx + 24},${fOy} ${fOx + fMaxX * fSx + 16},${fOy + 4}`} fill="currentColor" />

      <text x={12} y={18} fontSize={10} fontWeight={700} fill="currentColor" fontFamily="serif">C/R</text>
      <text x={fOx + fMaxX * fSx - 5} y={fOy + 16} fontSize={10} fontWeight={700} fill="currentColor" fontFamily="serif">Quantity</text>

      {/* MC curve (blue) */}
      <path d={mc} fill="none" stroke="#3b82f6" strokeWidth={2.5} />
      {/* AC curve (blue) */}
      <path d={atc} fill="none" stroke="#3b82f6" strokeWidth={2.5} />

      {/* MC label */}
      {(() => {
        const mcY = evalQuad(MC.a, MC.b, MC.c, 4.2);
        return <text x={fpx(4.2) + 5} y={fpy(mcY) - 8} fontSize={11} fontWeight={700} fill="#3b82f6" fontFamily="serif">MC</text>;
      })()}
      {/* AC label */}
      {(() => {
        const atcY = evalQuad(ATC.a, ATC.b, ATC.c, fMaxX - 0.2);
        return <text x={fpx(fMaxX - 0.2) + 6} y={fpy(atcY) + 4} fontSize={11} fontWeight={700} fill="#3b82f6" fontFamily="serif">AC</text>;
      })()}

      {/* AR = MR horizontal line at PE (red, dashed, bold) */}
      <line x1={fOx} y1={fpy(pe)} x2={fOx + fMaxX * fSx + 10} y2={fpy(pe)} stroke="#ef4444" strokeWidth={3} strokeDasharray="8,4" />
      <text x={fOx + fMaxX * fSx / 2} y={fpy(pe) + 16} fontSize={10} fontWeight={700} fill="#ef4444" fontFamily="serif" textAnchor="middle">AR = MR</text>

      {/* Dashed projection: vertical from QE down to x-axis */}
      <line x1={fpx(qe)} y1={fpy(pe)} x2={fpx(qe)} y2={fOy} stroke="#ef4444" strokeWidth={2} strokeDasharray="6,4" />

      {/* PE label on y-axis */}
      <text x={fOx - 6} y={fpy(pe) + 4} fontSize={10} fontWeight={700} fill="#ef4444" textAnchor="end" fontFamily="serif">PE</text>
      {/* QE label on x-axis */}
      <text x={fpx(qe)} y={fOy + 15} fontSize={10} fontWeight={700} fill="#ef4444" textAnchor="middle" fontFamily="serif">QE</text>

      {/* Equilibrium dot where MC = AC = AR */}
      <circle cx={fpx(qe)} cy={fpy(pe)} r={4} fill="#ef4444" />

      {/* ═══ INDUSTRY PANEL (right) ═══ */}
      <text x={iOx + (iMaxX * iSx) / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor" fontFamily="serif" textDecoration="underline">Industry</text>

      {/* Axes */}
      <line x1={iOx} y1={18} x2={iOx} y2={iOy} stroke="currentColor" strokeWidth={2} />
      <line x1={iOx} y1={iOy} x2={iOx + iMaxX * iSx + 20} y2={iOy} stroke="currentColor" strokeWidth={2} />
      <polygon points={`${iOx - 4},22 ${iOx},12 ${iOx + 4},22`} fill="currentColor" />
      <polygon points={`${iOx + iMaxX * iSx + 16},${iOy - 4} ${iOx + iMaxX * iSx + 24},${iOy} ${iOx + iMaxX * iSx + 16},${iOy + 4}`} fill="currentColor" />

      <text x={iOx - 28} y={18} fontSize={10} fontWeight={700} fill="currentColor" fontFamily="serif">C/R</text>
      <text x={iOx + iMaxX * iSx - 5} y={iOy + 16} fontSize={10} fontWeight={700} fill="currentColor" fontFamily="serif">Quantity</text>

      {/* S (supply, orange) */}
      <line
        x1={ipx(0)} y1={ipy(evalLin(S_IND.slope, S_IND.intercept, 0))}
        x2={ipx(iMaxX)} y2={ipy(evalLin(S_IND.slope, S_IND.intercept, iMaxX))}
        stroke="#f59e0b" strokeWidth={2.8}
      />
      <text
        x={ipx(iMaxX) + 5} y={ipy(evalLin(S_IND.slope, S_IND.intercept, iMaxX)) - 2}
        fontSize={11} fontWeight={700} fill="#f59e0b" fontFamily="serif">S</text>

      {/* D (demand, blue) */}
      <line
        x1={ipx(0)} y1={ipy(evalLin(D_IND.slope, D_IND.intercept, 0))}
        x2={ipx(iMaxX)} y2={ipy(evalLin(D_IND.slope, D_IND.intercept, iMaxX))}
        stroke="#3b82f6" strokeWidth={2.8}
      />
      <text
        x={ipx(iMaxX) + 5} y={ipy(evalLin(D_IND.slope, D_IND.intercept, iMaxX)) + 4}
        fontSize={11} fontWeight={700} fill="#3b82f6" fontFamily="serif">D</text>

      {/* Equilibrium dot */}
      <circle cx={ipx(E1.x)} cy={ipy(E1.y)} r={4} fill="#16a34a" />

      {/* Dashed projections from equilibrium */}
      <line x1={iOx} y1={ipy(E1.y)} x2={ipx(E1.x)} y2={ipy(E1.y)} stroke="#ef4444" strokeWidth={2} strokeDasharray="6,4" />
      <line x1={ipx(E1.x)} y1={ipy(E1.y)} x2={ipx(E1.x)} y2={iOy} stroke="#ef4444" strokeWidth={2} strokeDasharray="6,4" />

      {/* PE and QE labels */}
      <text x={iOx - 6} y={ipy(E1.y) + 4} fontSize={10} fontWeight={700} fill="#ef4444" textAnchor="end" fontFamily="serif">PE</text>
      <text x={ipx(E1.x)} y={iOy + 15} fontSize={10} fontWeight={700} fill="#ef4444" textAnchor="middle" fontFamily="serif">QE</text>
    </svg>
  );
}

/* ═══════ Theory Text Boxes ═══════ */
function SRTheoryBox() {
  return (
    <div className="border border-border p-4 text-sm leading-relaxed" style={{ fontFamily: "serif", maxWidth: 320 }}>
      <p className="font-bold underline mb-2 text-foreground">Perfect competition – short run</p>
      <p className="text-muted-foreground mb-1.5">Firms are price takers in perfect competition. So the price (which is also average revenue, AR) is taken as given (fixed).</p>
      <p className="text-muted-foreground mb-1.5">Firms profit-maximise where MC = MR.</p>
      <p className="text-muted-foreground mb-1.5">In the short run, firms can earn supernormal profits when price {">"} ATC.</p>
      <p className="text-muted-foreground">Supernormal profit is (p − c) × q.</p>
    </div>
  );
}

function LRTheoryBox() {
  return (
    <div className="border border-border p-4 text-sm leading-relaxed" style={{ fontFamily: "serif", maxWidth: 320 }}>
      <p className="font-bold underline mb-2 text-foreground">Perfect competition – long run (normal profits)</p>
      <p className="text-muted-foreground mb-1.5">In the long run, freedom of entry and exit eliminates supernormal profit.</p>
      <p className="text-muted-foreground mb-1.5">New firms enter → market supply increases → equilibrium price falls to PE.</p>
      <p className="text-muted-foreground mb-1.5">At PE, the firm produces where MC = AR = MR, and this exactly equals the minimum of AC.</p>
      <p className="text-muted-foreground mb-1.5">The firm earns <strong>normal profit only</strong> (AR = AC). There is no supernormal profit rectangle.</p>
      <p className="text-muted-foreground">The industry equilibrium (S ∩ D) sets the price PE that each price-taking firm accepts.</p>
    </div>
  );
}

/* ═══════ Main Component ═══════ */
export default function PerfectCompDiagram({ className }: { className?: string }) {
  return (
    <div className={`space-y-8 ${className ?? ""}`}>
      {/* ═══ Panel 1: Short Run ═══ */}
      <div className="border border-border bg-card rounded-sm p-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="flex-1 min-w-0">
            <ShortRunPanel />
          </div>
          <SRTheoryBox />
        </div>
      </div>

      {/* ═══ Panel 2: Long Run ═══ */}
      <div className="border border-border bg-card rounded-sm p-4">
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="flex-1 min-w-0">
            <LongRunPanel />
          </div>
          <LRTheoryBox />
        </div>
      </div>
    </div>
  );
}
