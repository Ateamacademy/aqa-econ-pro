export default function TariffDiagram() {
  /**
   * Exact replica of textbook Tariff Diagram.
   *
   * DATA MODEL
   *   DD: P = 10 − Q   (demand, blue diagonal ↘)
   *   DS: P = Q         (domestic supply, blue diagonal ↗)
   *   Pw  = 2   (world price)
   *   PwT = 4   (world price + tariff)
   *
   * KEY QUANTITIES
   *   Q1=2  DS ∩ Pw     (domestic production at world price)
   *   Q2=8  DD ∩ Pw     (domestic consumption at world price)
   *   Q3=4  DS ∩ Pw+T   (domestic production with tariff)
   *   Q4=6  DD ∩ Pw+T   (domestic consumption with tariff)
   *
   * WELFARE REGIONS
   *   CS  (lavender)  triangle (0,P_max)→(0,PwT)→(Q4,PwT)   below DD above PwT
   *   PS  (orange)    triangle (0,0)→(0,PwT)→(Q3,PwT)        above DS below PwT
   *   DWL (yellow×2)  left  (Q1,Pw)→(Q3,PwT)→(Q3,Pw)
   *                   right (Q4,PwT)→(Q2,Pw)→(Q4,Pw)
   *   Tax (green rect) Q3–Q4, Pw–PwT
   *
   * COORDINATE SYSTEM  viewBox "0 0 680 510"
   *   X(Q) = 95 + Q * 43        Q range 0–10
   *   Y(P) = 410 − P * 36       P range 0–10
   */

  const W = 680, H = 510;

  const X = Q  => 95 + Q  * 43;
  const Y = P  => 410 - P * 36;

  const Pw = 2, PwT = 4;
  const Q1 = 2, Q2 = 8, Q3 = 4, Q4 = 6;

  const xO   = X(0),  yO   = Y(0);   // origin (0,0)
  const xQ1  = X(Q1), xQ2  = X(Q2);
  const xQ3  = X(Q3), xQ4  = X(Q4);
  const yPw  = Y(Pw), yPwT = Y(PwT);
  const yTop = Y(10), xMax = X(10);

  // Centre of each region (for labels)
  const cxCS  = (xO + xQ4) / 2;
  const cyCS  = (yTop + yPwT) / 2 - 15;
  const cxTax = (xQ3 + xQ4) / 2;
  const cyTax = (yPwT + yPw) / 2;
  const cxDWL = (xQ3 + xQ4) / 2;

  const arrowG = { stroke: "#18a03a", strokeWidth: "1.6" };
  const boldG  = { fontSize: "12", fontWeight: "bold", fill: "#18a03a",
                   fontFamily: "Arial, sans-serif" };

  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0",
                  borderRadius: "8px", padding: "4px", maxWidth: "680px", margin: "0 auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          {/* Black arrowhead */}
          <marker id="arrBlk" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#222"/>
          </marker>
          {/* Green arrowhead */}
          <marker id="arrGrn" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#18a03a"/>
          </marker>
          {/* White arrowhead (for inside green box) */}
          <marker id="arrWht" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#fff"/>
          </marker>
        </defs>

        {/* ══ BACKGROUND ══ */}
        <rect x="0" y="0" width={W} height={H} fill="#fff"/>

        {/* ══ SHADED REGIONS (back to front) ══ */}

        {/* Wide peach background · below Pw, 0 → Q2 */}
        <polygon
          points={`${xO},${yPw} ${xQ2},${yPw} ${xQ2},${yO} ${xO},${yO}`}
          fill="#fde8c0"/>

        {/* Consumer Surplus · lavender triangle below DD above PwT */}
        <polygon
          points={`${xO},${yTop} ${xO},${yPwT} ${xQ4},${yPwT}`}
          fill="#b0a0f0" opacity="0.65"/>

        {/* Producer Surplus · orange triangle above DS below PwT */}
        <polygon
          points={`${xO},${yO} ${xO},${yPwT} ${xQ3},${yPwT}`}
          fill="#f0872a" opacity="0.65"/>

        {/* Left Dead-Weight-Loss · yellow triangle */}
        <polygon
          points={`${xQ1},${yPw} ${xQ3},${yPwT} ${xQ3},${yPw}`}
          fill="#ffe033" opacity="0.9"/>

        {/* Tax Revenue · bright green rectangle */}
        <rect
          x={xQ3} y={yPwT}
          width={xQ4 - xQ3} height={yPw - yPwT}
          fill="#22c55e" opacity="0.85"/>

        {/* Right Dead-Weight-Loss · yellow triangle */}
        <polygon
          points={`${xQ4},${yPwT} ${xQ2},${yPw} ${xQ4},${yPw}`}
          fill="#ffe033" opacity="0.9"/>

        {/* ══ PRICE LINES (Pw and Pw+T horizontal) ══ */}

        {/* Pw (world price) · amber */}
        <line x1={xO} y1={yPw} x2={xMax + 45} y2={yPw}
          stroke="#d97706" strokeWidth="2.8"/>

        {/* Pw + Tariff · dark green */}
        <line x1={xO} y1={yPwT} x2={xMax + 45} y2={yPwT}
          stroke="#15803d" strokeWidth="2.8"/>

        {/* ══ DD and DS CURVES ══ */}

        {/* DS: from (Q=0,P=0) to (Q=10,P=10) */}
        <line x1={xO} y1={yO} x2={xMax} y2={yTop}
          stroke="#1d4ed8" strokeWidth="2.8"/>

        {/* DD: from (Q=0,P=10) to (Q=10,P=0) */}
        <line x1={xO} y1={yTop} x2={xMax} y2={yO}
          stroke="#1d4ed8" strokeWidth="2.8"/>

        {/* ══ RED DASHED VERTICAL LINES ══ */}

        {/* Q1: from x-axis up to Pw */}
        <line x1={xQ1} y1={yO} x2={xQ1} y2={yPw}
          stroke="#dc2626" strokeWidth="1.8" strokeDasharray="7,5"/>
        {/* Q3: from x-axis up to PwT */}
        <line x1={xQ3} y1={yO} x2={xQ3} y2={yPwT}
          stroke="#dc2626" strokeWidth="1.8" strokeDasharray="7,5"/>
        {/* Q4: from x-axis up to PwT */}
        <line x1={xQ4} y1={yO} x2={xQ4} y2={yPwT}
          stroke="#dc2626" strokeWidth="1.8" strokeDasharray="7,5"/>
        {/* Q2: from x-axis up to Pw */}
        <line x1={xQ2} y1={yO} x2={xQ2} y2={yPw}
          stroke="#dc2626" strokeWidth="1.8" strokeDasharray="7,5"/>

        {/* ══ AXES ══ */}

        {/* P-axis */}
        <line x1={xO} y1={yO} x2={xO} y2={yTop - 14}
          stroke="#111" strokeWidth="2.2" markerEnd="url(#arrBlk)"/>
        {/* Q-axis */}
        <line x1={xO} y1={yO} x2={xMax + 62} y2={yO}
          stroke="#111" strokeWidth="2.2" markerEnd="url(#arrBlk)"/>

        {/* Axis labels */}
        <text x={xO - 4} y={yTop - 20}
          textAnchor="middle" fontSize="18" fontWeight="bold"
          fontFamily="Arial" fill="#111">P</text>
        <text x={xMax + 72} y={yO + 6}
          textAnchor="start" fontSize="18" fontWeight="bold"
          fontFamily="Arial" fill="#111">Q</text>

        {/* ══ QUANTITY LABELS ON X-AXIS ══ */}
        {[["Q1",xQ1],["Q3",xQ3],["Q4",xQ4],["Q2",xQ2]].map(([lbl,x]) => (
          <text key={lbl} x={x} y={yO + 22}
            textAnchor="middle" fontSize="13" fontWeight="bold"
            fontFamily="Arial" fill="#111">{lbl}</text>
        ))}

        {/* ══ PRICE LABELS ON Y-AXIS ══ */}
        <text x={xO - 8} y={yPwT + 5}
          textAnchor="end" fontSize="13" fontWeight="bold"
          fontFamily="Arial" fill="#15803d">Pw + Tariff</text>
        <text x={xO - 8} y={yPw + 5}
          textAnchor="end" fontSize="13" fontWeight="bold"
          fontFamily="Arial" fill="#d97706">P<tspan baselineShift="sub" fontSize="10">w</tspan></text>

        {/* ══ CURVE LABELS ══ */}
        {/* DS label: upper-right end of supply curve */}
        <text x={xMax + 6} y={yTop + 14}
          fontSize="14" fontWeight="bold" fill="#1d4ed8"
          fontFamily="Arial">DS</text>
        {/* DD label: lower-right end of demand curve */}
        <text x={xMax + 6} y={yO - 8}
          fontSize="14" fontWeight="bold" fill="#1d4ed8"
          fontFamily="Arial">DD</text>

        {/* ══ Ws / Ws+Tariff LABELS (right side of price lines) ══ */}
        <text x={xMax + 50} y={yPw + 5}
          fontSize="12" fontWeight="bold" fill="#d97706"
          fontFamily="Arial">W<tspan fontSize="10" baselineShift="sub">s</tspan></text>
        <text x={xMax + 50} y={yPwT - 6}
          fontSize="12" fontWeight="bold" fill="#15803d"
          fontFamily="Arial">W<tspan fontSize="10" baselineShift="sub">s</tspan> + Tariff</text>

        {/* ══ INTERIOR LABELS WITH ARROWS ══ */}

        {/* Consumer Surplus · with two downward arrows */}
        <text x={cxCS - 10} y={cyCS}
          textAnchor="middle" {...boldG}>Consumer</text>
        <text x={cxCS - 10} y={cyCS + 16}
          textAnchor="middle" {...boldG}>Surplus</text>
        {/* Arrow 1 → down-left */}
        <line x1={cxCS - 40} y1={cyCS + 22}
              x2={cxCS - 65} y2={cyCS + 52}
          {...arrowG} markerEnd="url(#arrGrn)"/>
        {/* Arrow 2 → down-right */}
        <line x1={cxCS + 18} y1={cyCS + 22}
              x2={cxCS + 50} y2={cyCS + 52}
          {...arrowG} markerEnd="url(#arrGrn)"/>

        {/* Tax Revenue · white text inside green rect */}
        <text x={cxTax} y={cyTax - 4}
          textAnchor="middle" fontSize="12" fontWeight="bold"
          fill="#fff" fontFamily="Arial">Tax</text>
        <text x={cxTax} y={cyTax + 12}
          textAnchor="middle" fontSize="12" fontWeight="bold"
          fill="#fff" fontFamily="Arial">Revenue</text>
        {/* Small arrows from Tax label corners */}
        <line x1={cxTax - 30} y1={cyTax + 4}
              x2={cxTax - 10} y2={cyTax + 4}
          stroke="#fff" strokeWidth="1.4" markerEnd="url(#arrWht)"/>
        <line x1={cxTax + 30} y1={cyTax + 4}
              x2={cxTax + 10} y2={cyTax + 4}
          stroke="#fff" strokeWidth="1.4"
          markerEnd="url(#arrWht)" style={{ transform: "scaleX(-1)", transformOrigin: `${cxTax}px ${cyTax}px` }}/>

        {/* Dead Weight Loss · label below with arrows up to yellow triangles */}
        <text x={cxDWL} y={yPw + 48}
          textAnchor="middle" {...boldG}>Dead</text>
        <text x={cxDWL} y={yPw + 63}
          textAnchor="middle" {...boldG}>Weight</text>
        <text x={cxDWL} y={yPw + 78}
          textAnchor="middle" {...boldG}>Loss</text>
        {/* Arrow → left DWL triangle */}
        <line x1={cxDWL - 22} y1={yPw + 44}
              x2={(xQ1 + xQ3) / 2} y2={yPw + 14}
          {...arrowG} markerEnd="url(#arrGrn)"/>
        {/* Arrow → right DWL triangle */}
        <line x1={cxDWL + 22} y1={yPw + 44}
              x2={(xQ4 + xQ2) / 2} y2={yPw + 14}
          {...arrowG} markerEnd="url(#arrGrn)"/>

        {/* Producer Surplus · label lower-left with rightward arrow */}
        <text x={xO - 8} y={yO - 72}
          textAnchor="end" {...boldG}>Producer</text>
        <text x={xO - 8} y={yO - 57}
          textAnchor="end" {...boldG}>Surplus</text>
        {/* Arrow pointing into the PS orange region */}
        <line x1={xO - 6} y1={yO - 62}
              x2={xO + 30} y2={yO - 50}
          {...arrowG} markerEnd="url(#arrGrn)"/>

        {/* ══ "Imported" BRACKET below Q3–Q4 ══ */}
        {/* Horizontal brace */}
        <line x1={xQ3} y1={yO + 14} x2={xQ4} y2={yO + 14}
          stroke="#333" strokeWidth="1.8"/>
        <line x1={xQ3} y1={yO + 8}  x2={xQ3} y2={yO + 14}
          stroke="#333" strokeWidth="1.8"/>
        <line x1={xQ4} y1={yO + 8}  x2={xQ4} y2={yO + 14}
          stroke="#333" strokeWidth="1.8"/>
        <text x={(xQ3 + xQ4) / 2} y={yO + 30}
          textAnchor="middle" fontSize="13" fontWeight="bold"
          fontFamily="Arial" fill="#333">Imported</text>

      </svg>
    </div>
  );
}
