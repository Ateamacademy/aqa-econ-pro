export default function PPFBalancedGrowth() {
  /**
   * PPF · Balanced Growth. Dark-navy Lovable style.
   * Curve: perfect parametric quarter-ellipse (concave to origin).
   *   X(t) = cL + (cR-cL)*sin(t)
   *   Y(t) = cT + (cB-cT)*(1 - cos(t))
   *   t ∈ [0, π/2]
   * This gives the exact hyperbolic/quarter-circle bow seen in the reference.
   */

  const W = 760, H = 490;
  const cL = 80, cT = 36, cR = 648, cB = 400;

  // Quarter-ellipse parametric
  const steps = 120;
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = (i / steps) * (Math.PI / 2);
    const x = cL + (cR - cL) * Math.sin(t);
    const y = cT + (cB - cT) * (1 - Math.cos(t));
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const polyPoints = pts.join(" ");

  // Point A on curve · t ≈ 0.62 rad
  const tA = 0.62;
  const Ax = cL + (cR - cL) * Math.sin(tA);
  const Ay = cT + (cB - cT) * (1 - Math.cos(tA));

  // Point B · inside the curve
  const Bx = 248, By = 228;

  const NAVY   = "#0d1b2e";
  const BLUE   = "#4a90e8";
  const GREEN  = "#4cdd88";
  const ORANGE = "#f5a623";
  const AX     = "#c8d6e8";

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
          <marker id="ppfArR" markerWidth="9" markerHeight="7"
            refX="8.5" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={AX}/>
          </marker>
          <marker id="ppfArU" markerWidth="7" markerHeight="9"
            refX="3.5" refY="1" orient="auto">
            <polygon points="0 9,3.5 0,7 9" fill={AX}/>
          </marker>
        </defs>

        <rect width={W} height={H} fill={NAVY}/>

        {/* ══ PPF · parametric quarter-ellipse polyline ══ */}
        <polyline
          points={polyPoints}
          fill="none"
          stroke={BLUE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* PPF label · top right of curve */}
        <text x={430} y={cT + 20} fontSize="16" fontWeight="bold" fill={BLUE}>PPF</text>

        {/* ══ POINT A · on curve (efficient) ══ */}
        <circle cx={Ax} cy={Ay} r="11" fill="none" stroke={GREEN} strokeWidth="2.4"/>
        <circle cx={Ax} cy={Ay} r="5"  fill={GREEN}/>
        <text x={Ax + 15} y={Ay + 6}
          fontSize="15" fontWeight="bold" fill={GREEN}>A (efficient)</text>

        {/* ══ POINT B · inside curve (inefficient) ══ */}
        <circle cx={Bx} cy={By} r="8" fill={ORANGE}/>
        <text x={Bx + 12} y={By + 16}
          fontSize="15" fontWeight="bold" fill={ORANGE}>B (inefficient)</text>

        {/* ══ AXES ══ */}
        <line x1={cL} y1={cB + 14} x2={cL} y2={cT - 22}
          stroke={AX} strokeWidth="2" markerEnd="url(#ppfArU)"/>
        <line x1={cL} y1={cB} x2={cR + 22} y2={cB}
          stroke={AX} strokeWidth="2" markerEnd="url(#ppfArR)"/>

        {/* Origin */}
        <text x={cL - 16} y={cB + 20} fontSize="14" fill={AX}>O</text>

        {/* Y-axis label */}
        <text
          transform={`rotate(-90,${cL - 40},${(cT + cB) / 2})`}
          x={cL - 40} y={(cT + cB) / 2 + 5}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill={AX}>Good A</text>

        {/* X-axis label */}
        <text x={(cL + cR) / 2} y={cB + 44}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill={AX}>Good B</text>

        {/* ══ LEGEND ══ */}
        <rect x={18}  y={444} width={54}  height={20} rx="10"
          fill={NAVY} stroke={BLUE}   strokeWidth="1.8"/>
        <circle cx={34}  cy={454} r="5" fill={BLUE}/>
        <text x={46}  y={459} fontSize="13" fontWeight="bold" fill={AX}>PPF</text>

        <rect x={84}  y={444} width={86}  height={20} rx="10"
          fill={NAVY} stroke={GREEN}  strokeWidth="1.5"/>
        <circle cx={100} cy={454} r="5" fill={GREEN}/>
        <text x={112} y={459} fontSize="13" fontWeight="bold" fill={AX}>Efficient</text>

        <rect x={184} y={444} width={102} height={20} rx="10"
          fill={NAVY} stroke={ORANGE} strokeWidth="1.5"/>
        <circle cx={200} cy={454} r="5" fill={ORANGE}/>
        <text x={212} y={459} fontSize="13" fontWeight="bold" fill={AX}>Inefficient</text>

      </svg>
    </div>
  );
}
