export default function SugarTaxWelfareAnalysis() {
  /**
   * Sugar Tax Welfare Analysis — exact replica of reference diagram.
   *
   * DATA
   *   MPC:     P = 2 + Q   (private marginal cost)
   *   MPC+Tax: P = 5 + Q   (private cost + sugar tax)
   *   MSC:     P = 8 + Q   (marginal social cost)
   *   MSB:     P = 20 − 2Q (marginal social benefit / demand)
   *
   * KEY INTERSECTIONS
   *   Q* = 4, P* = 12   MSC = MSB  (socially optimal)
   *   Q1 = 5, P1 = 10   MPC+Tax = MSB  (with tax)
   *   Q  = 6, P  = 8    MPC = MSB  (free-market equilibrium)
   *
   * SHADED REGIONS
   *   Brown: DWL after tax  — triangle (Q*,P*) → (Q1,MSB) → (Q1,MSC)
   *   Blue:  DWL (original) — quad    (Q1,MSB) → (Q1,MSC) → (Q,MSC) → (Q,MSB)
   */

  const W = 680, H = 590;

  // Chart boundaries
  const cL = 90, cT = 130, cR = 490, cB = 510;
  const cW = cR - cL; // 400
  const cH = cB - cT; // 380
  const QM = 9, PM = 22;

  const X = Q => cL + (Q / QM) * cW;
  const Y = P => cB - (P / PM) * cH;

  // Curve formulas
  const mpc    = Q => 2 + Q;
  const mpcTax = Q => 5 + Q;
  const msc    = Q => 8 + Q;
  const msb    = Q => 20 - 2 * Q;

  // Key SVG positions
  const xQs  = X(4), yPs  = Y(12);          // Q*, P*
  const xQ1  = X(5), yP1  = Y(10);          // Q1, P1
  const xQ   = X(6), yP   = Y(8);           // Q,  P
  const yMscQ1  = Y(msc(5));                 // MSC at Q1
  const yMscQ   = Y(msc(6));                 // MSC at Q

  // Curve drawing range
  const qS = -0.25, qE = 8.4;

  return (
    <div style={{
      background: "#fff",
      padding: "6px",
      maxWidth: "680px",
      margin: "0 auto",
      fontFamily: "'Arial', sans-serif",
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="blueArrow" markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#4a90d9"/>
          </marker>
        </defs>

        {/* ══ DWL TEXT LABELS (top, blue) ══ */}
        <text x={215} y={52}  textAnchor="middle" fontSize="15" fill="#4a90d9" fontWeight="bold">Deadweight</text>
        <text x={215} y={70}  textAnchor="middle" fontSize="15" fill="#4a90d9" fontWeight="bold">welfare loss after</text>
        <text x={215} y={88}  textAnchor="middle" fontSize="15" fill="#4a90d9" fontWeight="bold">tax</text>
        <text x={415} y={52}  textAnchor="middle" fontSize="15" fill="#4a90d9" fontWeight="bold">Deadweight</text>
        <text x={415} y={70}  textAnchor="middle" fontSize="15" fill="#4a90d9" fontWeight="bold">welfare loss</text>

        {/* ══ BLUE ARROWS to shaded regions ══ */}
        {/* Arrow → brown triangle */}
        <line x1={230} y1={93} x2={xQs + 6} y2={yPs + 6}
          stroke="#4a90d9" strokeWidth="1.6" markerEnd="url(#blueArrow)"/>
        {/* Arrow → blue quad */}
        <line x1={405} y1={74} x2={(xQ1 + xQ) / 2 + 5} y2={(yMscQ1 + yP1) / 2 + 18}
          stroke="#4a90d9" strokeWidth="1.6" markerEnd="url(#blueArrow)"/>

        {/* ══ SHADED WELFARE REGIONS (drawn before curves) ══ */}

        {/* Blue: original DWL (Q1→Q between MSB and MSC) */}
        <polygon
          points={`${xQ1},${yP1} ${xQ1},${yMscQ1} ${xQ},${yMscQ} ${xQ},${yP}`}
          fill="rgba(140,195,240,0.60)"
        />

        {/* Brown/maroon: DWL after tax (Q*→Q1 between MSB and MSC) */}
        <polygon
          points={`${xQs},${yPs} ${xQ1},${yP1} ${xQ1},${yMscQ1}`}
          fill="rgba(180,110,85,0.65)"
        />

        {/* ══ DASHED GUIDE LINES ══ */}

        {/* Green: P* and Q* */}
        <line x1={cL} y1={yPs} x2={xQs} y2={yPs}
          stroke="#22bb22" strokeWidth="2" strokeDasharray="9,6"/>
        <line x1={xQs} y1={cB} x2={xQs} y2={yPs}
          stroke="#22bb22" strokeWidth="2" strokeDasharray="9,6"/>

        {/* Red: P1 and Q1 */}
        <line x1={cL} y1={yP1} x2={xQ1} y2={yP1}
          stroke="#cc1111" strokeWidth="2" strokeDasharray="9,6"/>
        <line x1={xQ1} y1={cB} x2={xQ1} y2={yP1}
          stroke="#cc1111" strokeWidth="2" strokeDasharray="9,6"/>

        {/* Red: P and Q */}
        <line x1={cL} y1={yP} x2={xQ} y2={yP}
          stroke="#cc1111" strokeWidth="2" strokeDasharray="9,6"/>
        <line x1={xQ} y1={cB} x2={xQ} y2={yP}
          stroke="#cc1111" strokeWidth="2" strokeDasharray="9,6"/>

        {/* ══ SUPPLY / DEMAND CURVES (thick black) ══ */}

        {/* MSB: P = 20−2Q */}
        <line x1={X(qS)} y1={Y(msb(qS))} x2={X(qE)} y2={Y(msb(qE))}
          stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>

        {/* MPC: P = 2+Q */}
        <line x1={X(qS)} y1={Y(mpc(qS))} x2={X(qE)} y2={Y(mpc(qE))}
          stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>

        {/* MPC+Tax: P = 5+Q */}
        <line x1={X(qS)} y1={Y(mpcTax(qS))} x2={X(qE)} y2={Y(mpcTax(qE))}
          stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>

        {/* MSC: P = 8+Q */}
        <line x1={X(qS)} y1={Y(msc(qS))} x2={X(qE)} y2={Y(msc(qE))}
          stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>

        {/* ══ AXES ══ */}
        {/* Y-axis */}
        <line x1={cL} y1={cT - 18} x2={cL} y2={cB}
          stroke="#111" strokeWidth="3"/>
        {/* X-axis */}
        <line x1={cL} y1={cB} x2={cR + 32} y2={cB}
          stroke="#111" strokeWidth="3"/>

        {/* ══ AXIS TITLES ══ */}
        {/* Y-axis: "Costs and Benefits" (horizontal, two lines) */}
        <text x={38} y={cT + cH / 2 - 12}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Costs and</text>
        <text x={38} y={cT + cH / 2 + 10}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Benefits</text>

        {/* X-axis: "Quantity" */}
        <text x={cR + 58} y={cB + 8}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Quantity</text>

        {/* ══ AXIS TICK LABELS ══ */}

        {/* X-axis quantities */}
        <text x={xQs} y={cB + 22}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Q*</text>
        <text x={xQ1} y={cB + 22}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#cc1111">Q1</text>
        <text x={xQ}  y={cB + 22}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#cc1111">Q</text>

        {/* Y-axis prices */}
        <text x={cL - 8} y={yPs + 5}
          textAnchor="end" fontSize="14" fontWeight="bold" fill="#111">P*</text>
        <text x={cL - 8} y={yP1 + 5}
          textAnchor="end" fontSize="14" fontWeight="bold" fill="#cc1111">P1</text>
        <text x={cL - 8} y={yP + 5}
          textAnchor="end" fontSize="14" fontWeight="bold" fill="#cc1111">P</text>

        {/* ══ CURVE LABELS (right side) ══ */}
        <text x={cR + 8} y={Y(msc(qE)) + 5}    fontSize="14" fontWeight="bold" fill="#111">MSC</text>
        <text x={cR + 8} y={Y(mpcTax(qE)) + 5} fontSize="14" fontWeight="bold" fill="#111">MPC + Tax</text>
        <text x={cR + 8} y={Y(mpc(qE)) + 5}    fontSize="14" fontWeight="bold" fill="#111">MPC</text>
        <text x={cR + 8} y={Y(msb(qE)) + 5}    fontSize="14" fontWeight="bold" fill="#111">MSB</text>

      </svg>
    </div>
  );
}
