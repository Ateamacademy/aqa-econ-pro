export default function SupplyDemandMultipleShifts() {
  /**
   * Supply & Demand · Multiple Shifts (both D and S shift left).
   * White background, textbook black-line style.
   *
   * CURVES
   *   D  (solid):  P = 10 − Q  original demand
   *   D1 (dashed): P = 8  − Q  demand shifts left (decreases)
   *   S  (solid):  P = 2  + Q  original supply
   *   S1 (dashed): P = 4  + Q  supply shifts left (decreases)
   *
   * EQUILIBRIA
   *   E  = D ∩ S  → Q=4, P=6  (original)
   *   E1 = D1∩ S1 → Q=2, P=6  (new · same price, lower quantity)
   *
   * Horizontal line at P=6 shows price unchanged after both shifts.
   */

  const W = 560, H = 520;
  const cL = 85, cT = 42, cR = 468, cB = 420;
  const QM = 8, PM = 11;

  const X = q => cL + (q / QM) * (cR - cL);
  const Y = p => cB - (p / PM) * (cB - cT);

  // Curves
  const D  = q => 10 - q;
  const D1 = q => 8  - q;
  const S  = q => 2  + q;
  const S1 = q => 4  + q;

  // Key coordinates
  const eX  = X(4), eY  = Y(6);   // original equilibrium E
  const e1X = X(2), e1Y = Y(6);   // new equilibrium E1
  const pY  = Y(6);                 // equilibrium price level

  const STROKE = "#111";
  const DASH   = "9,6";

  return (
    <div style={{
      background: "#fff",
      padding: "8px",
      maxWidth: "560px",
      margin: "0 auto",
      fontFamily: "'Times New Roman', Georgia, serif",
      border: "1px solid #ccc",
      borderRadius: "6px",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="mdsArR" markerWidth="9" markerHeight="7"
            refX="8.5" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={STROKE}/>
          </marker>
          <marker id="mdsArU" markerWidth="7" markerHeight="9"
            refX="3.5" refY="1" orient="auto">
            <polygon points="0 9,3.5 0,7 9" fill={STROKE}/>
          </marker>
          {/* Leftward arrow for shift indicators */}
          <marker id="mdsArLft" markerWidth="9" markerHeight="7"
            refX="0.5" refY="3.5" orient="auto">
            <polygon points="9 0,0 3.5,9 7" fill={STROKE}/>
          </marker>
        </defs>

        {/* White background */}
        <rect width={W} height={H} fill="#fff"/>

        {/* ══ DOTTED VERTICALS ══ */}
        {/* Q1 vertical dashed */}
        <line x1={e1X} y1={e1Y} x2={e1X} y2={cB}
          stroke={STROKE} strokeWidth="1.5" strokeDasharray={DASH}/>
        {/* Q vertical dashed */}
        <line x1={eX} y1={eY} x2={eX} y2={cB}
          stroke={STROKE} strokeWidth="1.5" strokeDasharray={DASH}/>

        {/* ══ HORIZONTAL PRICE LINE at P=6 ══ */}
        <line x1={cL} y1={pY} x2={cR + 14} y2={pY}
          stroke={STROKE} strokeWidth="1.8"/>

        {/* ══ D1 · dashed demand (shifted left): P=8-Q ══ */}
        {/* from (0,8) to (8,0) */}
        <line x1={X(0)} y1={Y(D1(0))} x2={X(8)} y2={Y(D1(8))}
          stroke={STROKE} strokeWidth="2.2" strokeDasharray={DASH} strokeLinecap="round"/>

        {/* ══ S1 · dashed supply (shifted left): P=4+Q ══ */}
        {/* from (0,4) to (6,10) */}
        <line x1={X(0)} y1={Y(S1(0))} x2={X(6)} y2={Y(S1(6))}
          stroke={STROKE} strokeWidth="2.2" strokeDasharray={DASH} strokeLinecap="round"/>

        {/* ══ D · solid demand: P=10-Q ══ */}
        {/* from (0,10) to (8,2) */}
        <line x1={X(0)} y1={Y(D(0))} x2={X(8)} y2={Y(D(8))}
          stroke={STROKE} strokeWidth="2.8" strokeLinecap="round"/>

        {/* ══ S · solid supply: P=2+Q ══ */}
        {/* from (0,2) to (7,9) */}
        <line x1={X(0)} y1={Y(S(0))} x2={X(7)} y2={Y(S(7))}
          stroke={STROKE} strokeWidth="2.8" strokeLinecap="round"/>

        {/* ══ EQUILIBRIUM DOTS ══ */}
        <circle cx={eX}  cy={eY}  r="5.5" fill="#fff" stroke={STROKE} strokeWidth="2"/>
        <circle cx={e1X} cy={e1Y} r="5.5" fill="#fff" stroke={STROKE} strokeWidth="2"/>

        {/* ══ SHIFT ARROWS ══ */}
        {/* S → S1 arrow (upper right area, pointing left) */}
        <line x1={X(5.8)} y1={Y(S(5.8)) - 14} x2={X(5.1)} y2={Y(S1(5.1)) + 5}
          stroke={STROKE} strokeWidth="1.6" markerEnd="url(#mdsArLft)"/>

        {/* D → D1 arrow (lower right area, pointing left/down) */}
        <line x1={X(6.2)} y1={Y(D(6.2)) + 14} x2={X(5.5)} y2={Y(D1(5.5)) - 5}
          stroke={STROKE} strokeWidth="1.6" markerEnd="url(#mdsArLft)"/>

        {/* ══ AXES ══ */}
        {/* Y-axis */}
        <line x1={cL} y1={cB + 18} x2={cL} y2={cT - 22}
          stroke={STROKE} strokeWidth="2.5" markerEnd="url(#mdsArU)"/>
        {/* X-axis */}
        <line x1={cL} y1={cB} x2={cR + 28} y2={cB}
          stroke={STROKE} strokeWidth="2.5" markerEnd="url(#mdsArR)"/>

        {/* ══ AXIS LABELS ══ */}
        {/* "Price" rotated on y-axis */}
        <text
          transform={`rotate(-90,${cL - 44},${(cT + cB) / 2})`}
          x={cL - 44} y={(cT + cB) / 2 + 5}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={STROKE}>Price</text>
        {/* "Quantity" on x-axis */}
        <text x={(cL + cR + 28) / 2} y={cB + 46}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={STROKE}>Quantity</text>
        {/* Origin */}
        <text x={cL - 14} y={cB + 20} fontSize="15" fill={STROKE}>O</text>

        {/* ══ PRICE / QUANTITY TICK LABELS ══ */}
        {/* P on y-axis */}
        <text x={cL - 10} y={pY + 5}
          textAnchor="end" fontSize="15" fontWeight="bold" fill={STROKE}>P</text>
        {/* Q1 on x-axis */}
        <text x={e1X} y={cB + 22}
          textAnchor="middle" fontSize="15" fill={STROKE}>Q</text>
        <text x={e1X + 10} y={cB + 27}
          fontSize="11" fill={STROKE}>1</text>
        {/* Q on x-axis */}
        <text x={eX} y={cB + 22}
          textAnchor="middle" fontSize="15" fill={STROKE}>Q</text>

        {/* ══ EQUILIBRIUM LABELS ══ */}
        {/* E1 */}
        <text x={e1X - 22} y={e1Y - 10} fontSize="15" fill={STROKE}>E</text>
        <text x={e1X - 10} y={e1Y - 5}  fontSize="11" fill={STROKE}>1</text>
        {/* E */}
        <text x={eX + 8}  y={eY - 10}  fontSize="15" fill={STROKE}>E</text>

        {/* ══ CURVE LABELS ══ */}
        {/* D · solid demand (upper-left of curve) */}
        <text x={X(1.2)} y={Y(D(1.2)) - 10}
          fontSize="16" fontWeight="bold" fill={STROKE}>D</text>
        {/* D1 · dashed demand */}
        <text x={X(0.5)} y={Y(D1(0.5)) - 10}
          fontSize="15" fill={STROKE}>D</text>
        <text x={X(0.5) + 13} y={Y(D1(0.5)) - 4}
          fontSize="11" fill={STROKE}>1</text>
        {/* S1 · dashed supply (upper right, above S) */}
        <text x={X(5.7)} y={Y(S1(5.7)) - 12}
          fontSize="15" fill={STROKE}>S</text>
        <text x={X(5.7) + 11} y={Y(S1(5.7)) - 6}
          fontSize="11" fill={STROKE}>1</text>
        {/* S · solid supply */}
        <text x={X(6.8)} y={Y(S(6.8)) - 12}
          fontSize="16" fontWeight="bold" fill={STROKE}>S</text>

      </svg>
    </div>
  );
}
