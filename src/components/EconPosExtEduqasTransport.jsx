import React from "react";

/**
 * Eduqas A-Level — Positive externality of consumption (public transport).
 * Used by Paper 1 — Moderate (eduqas-p1-a) Q22 and any other Eduqas
 * positive-consumption-externality predicted-paper questions.
 *
 * Geometry:
 *   - MPC = MSC = S      : upward-sloping blue line
 *   - MPB = D            : downward-sloping red line (private benefit)
 *   - MSB                : downward-sloping red line, parallel ABOVE/right of MPB
 *   - Market eq (F)      : MSC ∩ MPB at (Q1, P1)
 *   - Social opt (B)     : MSC ∩ MSB at (Q2, P2), with Q2 > Q1
 *   - Welfare loss (ABF) : triangle bounded by MSB above, MPB below, vertical at Q1
 *                          → vertices: A = (Q1, MSBatQ1), B = (Q2, P2), F = (Q1, P1)
 */
export default function EconPosExtEduqasTransport() {
  // Supply MSC = MPC (blue, upward): from (110,420) to (610,90).
  //   slope = (90-420)/(610-110) = -0.66 ; y = 420 - 0.66*(x-110)
  // MPB = D (red, downward, private):  from (110,180) to (610,460).
  //   slope = (460-180)/(610-110) = 0.56 ; y = 180 + 0.56*(x-110)
  // MSB (red, parallel, shifted UP — at any x, MSB sits ABOVE MPB):
  //                                    from (110,110) to (610,390). y = 110 + 0.56*(x-110)
  //
  // Market eq (MSC ∩ MPB): 420 - 0.66(x-110) = 180 + 0.56(x-110)
  //   240 = 1.22(x-110) → x-110 = 196.7 → x ≈ 306.7 ; y = 180 + 0.56*196.7 ≈ 290.2
  // Social opt (MSC ∩ MSB): 420 - 0.66(x-110) = 110 + 0.56(x-110)
  //   310 = 1.22(x-110) → x-110 = 254.1 → x ≈ 364.1 ; y = 110 + 0.56*254.1 ≈ 252.3
  // MSB at Q1 (x=306.7): y = 110 + 0.56*196.7 ≈ 220.2  (this is point A — above F)
  const Q1 = 306.7, P1 = 290.2;        // F: market equilibrium
  const Q2 = 364.1, P2 = 252.3;        // B: social optimum
  const MSBatQ1 = 220.2;               // A: MSB value at Q1 (above F)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 540"
      role="img"
      aria-label="Eduqas A-Level Economics — positive externality of consumption (public transport): MSC = MPC blue upward, MPB and MSB red downward with MSB above MPB, welfare loss triangle ABF between Q1 and Q2"
      style={{ width: "100%", height: "auto", background: "#ffffff" }}
    >
      <defs>
        <marker id="eduPosArrH" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#1f2937" />
        </marker>
        <marker id="eduPosArrV" markerWidth="9" markerHeight="9" refX="4.5" refY="1" orient="auto">
          <path d="M0,9 L4.5,0 L9,9 z" fill="#1f2937" />
        </marker>
        <marker id="eduPosArrWL" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#374151" />
        </marker>
      </defs>

      {/* Axes */}
      <line x1="90" y1="470" x2="90" y2="60" stroke="#1f2937" strokeWidth="1.6" markerEnd="url(#eduPosArrV)" />
      <line x1="90" y1="470" x2="660" y2="470" stroke="#1f2937" strokeWidth="1.6" markerEnd="url(#eduPosArrH)" />
      <text x="90" y="48" textAnchor="start" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Benefit / cost / price</text>
      <text x="660" y="492" textAnchor="end" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Quantity of public transport</text>
      <text x="78" y="488" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="Arial, sans-serif">O</text>

      {/* Welfare loss triangle ABF (drawn before curves so curves overlay) */}
      <polygon
        points={`${Q1},${MSBatQ1} ${Q2},${P2} ${Q1},${P1}`}
        fill="#b91c1c" fillOpacity="0.22"
        stroke="#7f1d1d" strokeWidth="1.1"
      />

      {/* MSC = MPC = S — blue upward */}
      <line x1="110" y1="420" x2="610" y2="90" stroke="#2563eb" strokeWidth="2.4" />
      <text x="615" y="92" fontSize="13" fill="#2563eb" fontFamily="Arial, sans-serif" fontWeight="700">MSC = MPC</text>

      {/* MPB = D — red downward (private) */}
      <line x1="110" y1="180" x2="610" y2="460" stroke="#dc2626" strokeWidth="2.4" />
      <text x="430" y="408" fontSize="13" fill="#dc2626" fontFamily="Arial, sans-serif" fontWeight="700">MPB</text>

      {/* MSB — red downward, parallel, above MPB */}
      <line x1="110" y1="110" x2="610" y2="390" stroke="#dc2626" strokeWidth="2.4" />
      <text x="540" y="395" fontSize="13" fill="#dc2626" fontFamily="Arial, sans-serif" fontWeight="700">MSB</text>

      {/* Market equilibrium F (Q1) */}
      <circle cx={Q1} cy={P1} r="5" fill="#16a34a" stroke="#065f46" strokeWidth="1.4" />
      <text x={Q1 + 8} y={P1 + 14} fontSize="13" fill="#16a34a" fontFamily="Arial, sans-serif" fontWeight="700">F</text>

      {/* Social optimum B (Q2) */}
      <circle cx={Q2} cy={P2} r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.4" />
      <text x={Q2 + 8} y={P2 - 4} fontSize="13" fill="#16a34a" fontFamily="Arial, sans-serif" fontWeight="700">B</text>

      {/* A — top vertex of welfare-loss triangle (MSB at Q1) */}
      <text x={Q1 - 4} y={MSBatQ1 - 6} fontSize="13" fill="#dc2626" fontFamily="Arial, sans-serif" fontWeight="700">A</text>

      {/* Dashed guides for P1, Q1 (F) */}
      <line x1="90" y1={P1} x2={Q1} y2={P1} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={Q1} y1={P1} x2={Q1} y2="470" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x="62" y={P1 + 4} fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">P<tspan fontSize="10" baselineShift="sub">1</tspan></text>
      <text x={Q1} y="487" textAnchor="middle" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Q<tspan fontSize="10" baselineShift="sub">1</tspan></text>

      {/* Dashed guides for P2, Q2 (B) */}
      <line x1="90" y1={P2} x2={Q2} y2={P2} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={Q2} y1={P2} x2={Q2} y2="470" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x="62" y={P2 + 4} fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">P<tspan fontSize="10" baselineShift="sub">2</tspan></text>
      <text x={Q2} y="487" textAnchor="middle" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Q<tspan fontSize="10" baselineShift="sub">2</tspan></text>

      {/* Welfare loss callout */}
      <line x1="470" y1="180" x2={(Q1 + Q2) / 2 + 4} y2={(P1 + MSBatQ1 + P2) / 3} stroke="#374151" strokeWidth="1.2" markerEnd="url(#eduPosArrWL)" />
      <text x="478" y="172" fontSize="13" fill="#7f1d1d" fontFamily="Arial, sans-serif" fontWeight="700">Welfare loss (ABF)</text>
      <text x="478" y="188" fontSize="11" fill="#6b7280" fontFamily="Arial, sans-serif">under-consumption: Q1 &lt; Q2</text>

      {/* Caption */}
      <text x="360" y="522" textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="Arial, sans-serif">
        Eduqas A-Level — positive externality of consumption (public transport). MSB &gt; MPB by MEB.
      </text>
    </svg>
  );
}
