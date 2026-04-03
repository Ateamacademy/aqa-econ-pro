export default function PPFNaturalDisaster() {
  /**
   * PPF — Natural Disaster (Earthquake)
   * An earthquake destroys a proportion of ALL factors of production,
   * so the PPF shifts INWARD on BOTH axes.
   *
   * Dark-navy Lovable app style.
   *
   * ORIGINAL PPF  (solid blue):   full quarter-ellipse
   * NEW PPF₁      (dashed red):   ~62% scale inward on both axes
   *
   * Point A: on original PPF (where economy was before disaster)
   * Point B: on new PPF₁    (new productive capacity limit)
   *
   * Inward shift arrows show both axes shrink simultaneously.
   */

  const W = 700, H = 530;
  const cL = 88, cT = 44, cR = 600, cB = 430;

  /* Quarter-ellipse polyline generator */
  const ppfPts = (L, T, R, B, n = 100) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const t = (i / n) * (Math.PI / 2);
      return `${(L + (R - L) * Math.sin(t)).toFixed(2)},${(T + (B - T) * (1 - Math.cos(t))).toFixed(2)}`;
    }).join(" ");

  const onCurve = (L, T, R, B, t) => ({
    x: L + (R - L) * Math.sin(t),
    y: T + (B - T) * (1 - Math.cos(t)),
  });

  /* New PPF₁ bounds — earthquake contracts both axes by ~38% */
  const SCALE   = 0.62;
  const origW   = cR - cL;
  const origH   = cB - cT;
  const n1L     = cL;
  const n1T     = cB - origH * SCALE;   // lower max capital goods
  const n1R     = cL + origW * SCALE;   // lower max consumer goods
  const n1B     = cB;

  /* Key points */
  const A = onCurve(cL, cT, cR, cB, 0.72);     // on original PPF
  const B = onCurve(n1L, n1T, n1R, n1B, 0.72); // same t on new PPF₁

  /* Colors */
  const NAVY   = "#0d1b2e";
  const BLUE   = "#4a90e8";
  const RED    = "#e84a4a";
  const GREEN  = "#4cdd88";
  const ORANGE = "#f5a623";
  const AX     = "#c8d6e8";
  const DASH_G = "rgba(200,220,200,0.4)";

  return (
    <div style={{
      background: NAVY,
      borderRadius: "10px",
      padding: "4px",
      maxWidth: "100%",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="axArR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={AX}/>
          </marker>
          <marker id="axArU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto">
            <polygon points="0 9,3.5 0,7 9" fill={AX}/>
          </marker>
          {/* Inward arrow — red */}
          <marker id="redArr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0,8 3.5,0 7" fill={RED}/>
          </marker>
          {/* Inward double-head for axis annotations */}
          <marker id="redArrL" markerWidth="8" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse">
            <polygon points="0 0,8 3.5,0 7" fill={RED}/>
          </marker>
        </defs>

        <rect width={W} height={H} fill={NAVY}/>

        {/* ── ORIGINAL PPF (solid blue) ── */}
        <polyline
          points={ppfPts(cL, cT, cR, cB)}
          fill="none" stroke={BLUE} strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"/>

        {/* ── NEW PPF₁ after earthquake (dashed red) ── */}
        <polyline
          points={ppfPts(n1L, n1T, n1R, n1B)}
          fill="none" stroke={RED} strokeWidth="2.8"
          strokeDasharray="10,6"
          strokeLinecap="round" strokeLinejoin="round"/>

        {/* ── INWARD SHIFT ARROWS (red, showing contraction) ── */}
        {/* Arrow on upper-left section of curve (near top) */}
        <line
          x1={onCurve(cL,cT,cR,cB,0.22).x} y1={onCurve(cL,cT,cR,cB,0.22).y}
          x2={onCurve(n1L,n1T,n1R,n1B,0.22).x + 4} y2={onCurve(n1L,n1T,n1R,n1B,0.22).y - 4}
          stroke={RED} strokeWidth="2" strokeDasharray="none"
          markerEnd="url(#redArr)"/>
        {/* Arrow on mid section of curve */}
        <line
          x1={onCurve(cL,cT,cR,cB,0.72).x + 2} y1={onCurve(cL,cT,cR,cB,0.72).y}
          x2={onCurve(n1L,n1T,n1R,n1B,0.72).x + 8} y2={onCurve(n1L,n1T,n1R,n1B,0.72).y - 4}
          stroke={RED} strokeWidth="2"
          markerEnd="url(#redArr)"/>
        {/* Arrow on lower-right section */}
        <line
          x1={onCurve(cL,cT,cR,cB,1.18).x} y1={onCurve(cL,cT,cR,cB,1.18).y - 2}
          x2={onCurve(n1L,n1T,n1R,n1B,1.18).x + 4} y2={onCurve(n1L,n1T,n1R,n1B,1.18).y - 6}
          stroke={RED} strokeWidth="2"
          markerEnd="url(#redArr)"/>

        {/* ── Y-AXIS: max capital drops (dashed guide + brace) ── */}
        {/* Original max capital = cT on y-axis */}
        <line x1={cL - 5} y1={cT}  x2={cL + 12} y2={cT}  stroke={BLUE} strokeWidth="1.5"/>
        {/* New max capital = n1T on y-axis */}
        <line x1={cL - 5} y1={n1T} x2={cL + 12} y2={n1T} stroke={RED}  strokeWidth="1.5" strokeDasharray="6,4"/>
        {/* Downward red arrow showing Y-axis shrinks */}
        <line x1={cL - 16} y1={cT + 6} x2={cL - 16} y2={n1T - 6}
          stroke={RED} strokeWidth="1.8" markerEnd="url(#redArr)" markerStart="url(#redArrL)"/>

        {/* ── X-AXIS: max consumer goods drops ── */}
        <line x1={cR}  y1={cB - 5} x2={cR}  y2={cB + 12} stroke={BLUE} strokeWidth="1.5"/>
        <line x1={n1R} y1={cB - 5} x2={n1R} y2={cB + 12} stroke={RED}  strokeWidth="1.5" strokeDasharray="6,4"/>
        {/* Leftward red arrow showing X-axis shrinks */}
        <line x1={cR - 6} y1={cB + 22} x2={n1R + 6} y2={cB + 22}
          stroke={RED} strokeWidth="1.8" markerEnd="url(#redArrL)" markerStart="url(#redArr)"/>

        {/* ── POINT A — on original PPF (green) ── */}
        <circle cx={A.x} cy={A.y} r="10" fill="none" stroke={GREEN} strokeWidth="2.2"/>
        <circle cx={A.x} cy={A.y} r="4"  fill={GREEN}/>
        {/* Dashed guide lines */}
        <line x1={cL} y1={A.y} x2={A.x} y2={A.y}
          stroke={DASH_G} strokeWidth="1.2" strokeDasharray="7,5"/>
        <line x1={A.x} y1={A.y} x2={A.x} y2={cB}
          stroke={DASH_G} strokeWidth="1.2" strokeDasharray="7,5"/>
        <text x={A.x + 14} y={A.y - 4}
          fontSize="14" fontWeight="bold" fill={GREEN}>A</text>
        <text x={A.x + 14} y={A.y + 14}
          fontSize="11" fill={GREEN}>(before)</text>

        {/* ── POINT B — on new PPF₁ (orange) ── */}
        <circle cx={B.x} cy={B.y} r="10" fill="none" stroke={ORANGE} strokeWidth="2.2"/>
        <circle cx={B.x} cy={B.y} r="4"  fill={ORANGE}/>
        <line x1={cL} y1={B.y} x2={B.x} y2={B.y}
          stroke="rgba(245,166,35,0.35)" strokeWidth="1.2" strokeDasharray="7,5"/>
        <line x1={B.x} y1={B.y} x2={B.x} y2={cB}
          stroke="rgba(245,166,35,0.35)" strokeWidth="1.2" strokeDasharray="7,5"/>
        <text x={B.x - 52} y={B.y - 10}
          fontSize="14" fontWeight="bold" fill={ORANGE}>B</text>
        <text x={B.x - 52} y={B.y + 8}
          fontSize="11" fill={ORANGE}>(after)</text>

        {/* ── CURVE LABELS ── */}
        {/* PPF label (blue) — bottom right of original */}
        <text x={cR + 8} y={cB - 10}
          fontSize="14" fontWeight="bold" fill={BLUE} fontStyle="italic">PPF</text>
        {/* PPF₁ label (red) — bottom right of new curve */}
        <text x={n1R + 8} y={cB - 8}
          fontSize="14" fontWeight="bold" fill={RED} fontStyle="italic">
          PPF<tspan fontSize="11" dy="4">1</tspan>
        </text>

        {/* ── AXES ── */}
        <line x1={cL} y1={cB + 16} x2={cL} y2={cT - 20}
          stroke={AX} strokeWidth="2" markerEnd="url(#axArU)"/>
        <line x1={cL} y1={cB} x2={cR + 36} y2={cB}
          stroke={AX} strokeWidth="2" markerEnd="url(#axArR)"/>

        {/* Origin */}
        <text x={cL - 18} y={cB + 20} fontSize="14" fill={AX}>O</text>

        {/* Y-axis label */}
        <text
          transform={`rotate(-90,${cL - 42},${(cT + cB) / 2})`}
          x={cL - 42} y={(cT + cB) / 2 + 5}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill={AX}>Capital Goods</text>

        {/* X-axis label */}
        <text x={(cL + cR + 36) / 2} y={cB + 46}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill={AX}>Consumer Goods</text>

        {/* ── LEGEND ── */}
        {/* PPF (original) */}
        <line x1={16} y1={500} x2={50} y2={500} stroke={BLUE} strokeWidth="3"/>
        <text x={56} y={505} fontSize="12" fill={AX}>Original PPF</text>

        {/* PPF₁ (after earthquake) */}
        <line x1={166} y1={500} x2={200} y2={500}
          stroke={RED} strokeWidth="2.5" strokeDasharray="8,5"/>
        <text x={206} y={505} fontSize="12" fill={AX}>PPF₁ after earthquake</text>

        {/* Point A */}
        <circle cx={372} cy={500} r="5" fill={GREEN}/>
        <text x={382} y={505} fontSize="12" fill={AX}>Efficient point (before)</text>

        {/* Point B */}
        <circle cx={548} cy={500} r="5" fill={ORANGE}/>
        <text x={558} y={505} fontSize="12" fill={AX}>New limit (after)</text>

      </svg>
    </div>
  );
}
