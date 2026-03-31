/**
 * PerfectCompDiagram — Textbook-style Perfect Competition diagrams.
 *
 * Two bordered panels stacked vertically:
 *   Panel 1: Short Run — single firm diagram + theory text
 *   Panel 2: Long Run  — firm diagram (left) + industry diagram (right) + theory text
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
      <text x={W - 18} y={py(p) + 4} fontSize={9} fontWeight={700} fill="#ef4444" fontFamily="serif">AR=MR=p</text>

      {/* MC curve (blue) */}
      <path d={mc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />
      {/* ATC curve (blue) */}
      <path d={atc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />

      {/* Curve labels */}
      {(() => {
        const mcEndY = evalQuad(MC.a, MC.b, MC.c, 4.2);
        return <text x={px(4.2) + 4} y={py(mcEndY) - 6} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">MC</text>;
      })()}
      {(() => {
        const atcEndY = evalQuad(ATC.a, ATC.b, ATC.c, maxX);
        return <text x={px(maxX) + 4} y={py(atcEndY) + 4} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">ATC</text>;
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
  const W = 600, H = 280;
  // Firm panel: left half
  const fOx = 55, fOy = H - 40;
  const fSx = 42, fSy = 34;
  const fMaxX = 5.2;
  // Industry panel: right half
  const iOx = 370, iOy = H - 40;
  const iSx = 32, iSy = 34;
  const iMaxX = 5.5;

  const computed = useMemo(() => {
    const E1 = intersectLinear(D_IND.slope, D_IND.intercept, S_IND.slope, S_IND.intercept)!;
    const E2 = intersectLinear(D_IND.slope, D_IND.intercept, S1_IND.slope, S1_IND.intercept)!;
    const p = E2.y; // original SR high price
    const minATC = findMinATC(MC.a, MC.b, MC.c, ATC.a, ATC.b, ATC.c)!;
    const p1 = minATC.y; // LR price = min ATC
    const q = solveQuadForY(MC.a, MC.b, MC.c, p)!; // SR output
    const q1 = minATC.x; // LR output
    return { E1, E2, p, p1, q, q1, minATC };
  }, []);

  const { E1, E2, p, p1, q, q1 } = computed;
  const mc = quadPath(MC.a, MC.b, MC.c, fOx, fOy, fSx, fSy, 0.6, fMaxX);
  const atc = quadPath(ATC.a, ATC.b, ATC.c, fOx, fOy, fSx, fSy, 0.4, fMaxX);

  const fpx = (v: number) => fOx + v * fSx;
  const fpy = (v: number) => fOy - v * fSy;
  const ipx = (v: number) => iOx + v * iSx;
  const ipy = (v: number) => iOy - v * iSy;

  // Industry curves
  const evalLin = (s: number, i: number, x: number) => s * x + i;
  const dX0 = 0, dX1 = iMaxX;
  const sX0 = 0, sX1 = iMaxX;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxWidth: 700 }}>
      {/* ═══ FIRM PANEL ═══ */}
      <text x={fOx + (fMaxX * fSx) / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor" fontFamily="serif" textDecoration="underline">Firm</text>

      {/* Axes */}
      <line x1={fOx} y1={18} x2={fOx} y2={fOy} stroke="currentColor" strokeWidth={1.5} />
      <line x1={fOx} y1={fOy} x2={fOx + fMaxX * fSx + 20} y2={fOy} stroke="currentColor" strokeWidth={1.5} />
      <polygon points={`${fOx - 3},22 ${fOx},14 ${fOx + 3},22`} fill="currentColor" />
      <polygon points={`${fOx + fMaxX * fSx + 16},${fOy - 3} ${fOx + fMaxX * fSx + 23},${fOy} ${fOx + fMaxX * fSx + 16},${fOy + 3}`} fill="currentColor" />

      <text x={10} y={18} fontSize={9} fontWeight={600} fill="currentColor" fontFamily="serif">Revenue /</text>
      <text x={10} y={29} fontSize={9} fontWeight={600} fill="currentColor" fontFamily="serif">Cost</text>
      <text x={fOx + fMaxX * fSx - 10} y={fOy + 16} fontSize={9} fontWeight={600} fill="currentColor" fontFamily="serif">Output</text>

      {/* MC curve (blue) */}
      <path d={mc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />
      {/* ATC curve (blue) */}
      <path d={atc} fill="none" stroke="#3b82f6" strokeWidth={2.2} />

      {/* MC label */}
      {(() => {
        const mcY = evalQuad(MC.a, MC.b, MC.c, 4.2);
        return <text x={fpx(4.2) + 4} y={fpy(mcY) - 6} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">MC</text>;
      })()}
      {/* ATC label */}
      {(() => {
        const atcY = evalQuad(ATC.a, ATC.b, ATC.c, fMaxX - 0.3);
        return <text x={fpx(fMaxX - 0.3) + 6} y={fpy(atcY) + 4} fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">ATC</text>;
      })()}

      {/* AR = MR = p (upper red line) */}
      <line x1={fOx} y1={fpy(p)} x2={fOx + fMaxX * fSx + 10} y2={fpy(p)} stroke="#ef4444" strokeWidth={2.2} />
      <text x={fOx + fMaxX * fSx + 14} y={fpy(p) + 4} fontSize={8} fontWeight={700} fill="#ef4444" fontFamily="serif">AR=MR=p</text>

      {/* AR₁ = MR₁ = p₁ (lower red line) */}
      <line x1={fOx} y1={fpy(p1)} x2={fOx + fMaxX * fSx + 10} y2={fpy(p1)} stroke="#ef4444" strokeWidth={2.2} />
      <text x={fOx + fMaxX * fSx + 14} y={fpy(p1) + 4} fontSize={7.5} fontWeight={700} fill="#ef4444" fontFamily="serif">AR₁=MR₁=p₁</text>

      {/* Green downward arrow between the two price lines */}
      {(() => {
        const arrowX = fpx(2.8);
        return (
          <>
            <line x1={arrowX} y1={fpy(p) + 4} x2={arrowX} y2={fpy(p1) - 4} stroke="#16a34a" strokeWidth={2} />
            <polygon points={`${arrowX - 4},${fpy(p1) - 8} ${arrowX},${fpy(p1) - 2} ${arrowX + 4},${fpy(p1) - 8}`} fill="#16a34a" />
          </>
        );
      })()}

      {/* Dotted projections for q and q₁ */}
      <line x1={fpx(q)} y1={fpy(p)} x2={fpx(q)} y2={fOy} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={fpx(q1)} y1={fpy(p1)} x2={fpx(q1)} y2={fOy} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />

      {/* Axis markers */}
      <text x={fOx - 5} y={fpy(p) + 4} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="end" fontFamily="serif">p</text>
      <text x={fOx - 5} y={fpy(p1) + 4} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="end" fontFamily="serif">c</text>
      <text x={fOx - 5} y={fpy(p1) + 14} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="end" fontFamily="serif">p₁</text>
      <text x={fpx(q1)} y={fOy + 14} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="middle" fontFamily="serif">q₁</text>
      <text x={fpx(q)} y={fOy + 14} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="middle" fontFamily="serif">q</text>

      {/* ═══ INDUSTRY PANEL ═══ */}
      <text x={iOx + (iMaxX * iSx) / 2} y={14} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor" fontFamily="serif" textDecoration="underline">Industry</text>

      {/* Axes */}
      <line x1={iOx} y1={18} x2={iOx} y2={iOy} stroke="currentColor" strokeWidth={1.5} />
      <line x1={iOx} y1={iOy} x2={iOx + iMaxX * iSx + 20} y2={iOy} stroke="currentColor" strokeWidth={1.5} />
      <polygon points={`${iOx - 3},22 ${iOx},14 ${iOx + 3},22`} fill="currentColor" />
      <polygon points={`${iOx + iMaxX * iSx + 16},${iOy - 3} ${iOx + iMaxX * iSx + 23},${iOy} ${iOx + iMaxX * iSx + 16},${iOy + 3}`} fill="currentColor" />

      <text x={iOx - 30} y={20} fontSize={9} fontWeight={600} fill="currentColor" fontFamily="serif">Price</text>
      <text x={iOx + iMaxX * iSx - 10} y={iOy + 16} fontSize={9} fontWeight={600} fill="currentColor" fontFamily="serif">Quantity</text>

      {/* S (original supply, blue) */}
      <line
        x1={ipx(sX0)} y1={ipy(evalLin(S_IND.slope, S_IND.intercept, sX0))}
        x2={ipx(sX1)} y2={ipy(evalLin(S_IND.slope, S_IND.intercept, sX1))}
        stroke="#3b82f6" strokeWidth={2.2}
      />
      <text
        x={ipx(sX1) + 4} y={ipy(evalLin(S_IND.slope, S_IND.intercept, sX1)) - 2}
        fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">S</text>

      {/* S₁ (shifted supply, blue) */}
      <line
        x1={ipx(sX0)} y1={ipy(evalLin(S1_IND.slope, S1_IND.intercept, sX0))}
        x2={ipx(sX1)} y2={ipy(evalLin(S1_IND.slope, S1_IND.intercept, sX1))}
        stroke="#3b82f6" strokeWidth={2.2}
      />
      <text
        x={ipx(sX1) + 4} y={ipy(evalLin(S1_IND.slope, S1_IND.intercept, sX1)) - 2}
        fontSize={10} fontWeight={700} fill="#3b82f6" fontFamily="serif">S₁</text>

      {/* Green rightward arrow between S and S₁ */}
      {(() => {
        const ay = 4;
        const sMidX = (ipx(sX0) + ipx(sX1)) / 2 - 20;
        const s1MidX = sMidX + 30;
        const sMidY = ipy(ay);
        return (
          <>
            <line x1={sMidX} y1={sMidY} x2={s1MidX - 4} y2={sMidY} stroke="#16a34a" strokeWidth={2} />
            <polygon points={`${s1MidX - 8},${sMidY - 4} ${s1MidX},${sMidY} ${s1MidX - 8},${sMidY + 4}`} fill="#16a34a" />
          </>
        );
      })()}

      {/* D (demand, red) */}
      <line
        x1={ipx(dX0)} y1={ipy(evalLin(D_IND.slope, D_IND.intercept, dX0))}
        x2={ipx(dX1)} y2={ipy(evalLin(D_IND.slope, D_IND.intercept, dX1))}
        stroke="#ef4444" strokeWidth={2.2}
      />
      <text
        x={ipx(dX1) + 4} y={ipy(evalLin(D_IND.slope, D_IND.intercept, dX1)) + 4}
        fontSize={10} fontWeight={700} fill="#ef4444" fontFamily="serif">D</text>

      {/* Industry equilibria projections */}
      {/* E2 = D ∩ S1 (original high price) */}
      <line x1={iOx} y1={ipy(E2.y)} x2={ipx(E2.x)} y2={ipy(E2.y)} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={ipx(E2.x)} y1={ipy(E2.y)} x2={ipx(E2.x)} y2={iOy} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <circle cx={ipx(E2.x)} cy={ipy(E2.y)} r={3} fill="currentColor" />

      {/* E1 = D ∩ S (new LR equilibrium at lower price) */}
      <line x1={iOx} y1={ipy(E1.y)} x2={ipx(E1.x)} y2={ipy(E1.y)} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={ipx(E1.x)} y1={ipy(E1.y)} x2={ipx(E1.x)} y2={iOy} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <circle cx={ipx(E1.x)} cy={ipy(E1.y)} r={3} fill="currentColor" />

      {/* Industry axis labels */}
      <text x={ipx(E2.x)} y={iOy + 14} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="middle" fontFamily="serif">q₂</text>
      <text x={ipx(E1.x)} y={iOy + 14} fontSize={9} fontWeight={700} fill="currentColor" textAnchor="middle" fontFamily="serif">q₃</text>
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
      <p className="font-bold underline mb-2 text-foreground">Perfect competition – long run</p>
      <p className="text-muted-foreground mb-1.5">There are no barriers to entry in perfect competition.</p>
      <p className="text-muted-foreground mb-1.5">Suppose there are supernormal profits in the short run. Then firms enter the market, shifting supply right from S to S₁.</p>
      <p className="text-muted-foreground mb-1.5">This lowers the industry equilibrium price from p to p₁.</p>
      <p className="text-muted-foreground mb-1.5">The perfectly competitive firm now takes a lower price (p₁) as given. This shifts AR and MR down from AR to AR₁.</p>
      <p className="text-muted-foreground">Entry continues until supernormal profit is eliminated. In long-run equilibrium, firms earn normal profit only, where price = minimum ATC.</p>
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
