import React from "react";

/**
 * IB HL/SL — Negative externality of consumption (soft drinks).
 * Single canonical externality diagram used across all IB Predicted Papers
 * negative-externality questions (production OR consumption framing).
 *
 * Geometry (matches reference image):
 *   - MPC = MSC = S        : upward-sloping red line
 *   - MPB = D              : downward-sloping solid blue line (private benefit)
 *   - MSB                  : downward-sloping dashed blue line (parallel, below MPB)
 *   - Market eq Pm,Qm      : MPC ∩ MPB
 *   - Social opt P*, Q*    : MSC ∩ MSB (left of Qm)
 *   - Welfare loss triangle: between Qopt and Qm, bounded by MSC above and MSB below
 *   - External cost (MEC)  : vertical gap between MPB and MSB
 */
export default function EconNegExtIBSoftDrinks() {
  // Lines (in SVG coords). Solve intersections.
  // Supply MPC = MSC: from (110,420) to (610,90).  slope = (90-420)/(610-110) = -0.66 ; y = 420 - 0.66*(x-110)
  // MPB = D:           from (110,120) to (610,400). slope = (400-120)/(610-110) = 0.56 ; y = 120 + 0.56*(x-110)
  // MSB (parallel, shifted down ~70px on y axis ⇒ visually lower benefit):
  //                    from (110,190) to (610,470). y = 190 + 0.56*(x-110)
  //
  // Market eq: 420 - 0.66(x-110) = 120 + 0.56(x-110)
  //            300 = 1.22(x-110) → x-110 = 245.9 → x ≈ 355.9 ; y = 120 + 0.56*245.9 ≈ 257.7
  // Social opt: 420 - 0.66(x-110) = 190 + 0.56(x-110)
  //             230 = 1.22(x-110) → x-110 = 188.5 → x ≈ 298.5 ; y = 190 + 0.56*188.5 ≈ 295.6
  //
  // MSC value at Qm (x=356):  y = 420 - 0.66*246 = 420 - 162.4 = 257.6  (≈ market eq, by design)
  // MSB value at Qm (x=356):  y = 190 + 0.56*246 = 190 + 137.8 = 327.8
  // MSC value at Q* (x=298.5): y = 295.6 (social optimum)
  //
  // Welfare loss triangle vertices:
  //   A = (Q*, social opt)        = (298.5, 295.6)
  //   B = (Qm, on MSC)            = (355.9, 257.7)
  //   C = (Qm, on MSB)            = (355.9, 327.8)

  const Qm = 355.9, Pm = 257.7;
  const Qopt = 298.5, Popt = 295.6;
  const MSBatQm = 327.8;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 540"
      role="img"
      aria-label="IB Economics HL/SL — negative externality of consumption (soft drinks): MPC = MSC, MPB above MSB, welfare loss triangle between Qopt and Qm"
      style={{ width: "100%", height: "auto", background: "#ffffff" }}
    >
      <defs>
        <marker id="ibnegArrH" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#1f2937" />
        </marker>
        <marker id="ibnegArrV" markerWidth="9" markerHeight="9" refX="4.5" refY="1" orient="auto">
          <path d="M0,9 L4.5,0 L9,9 z" fill="#1f2937" />
        </marker>
        <marker id="ibnegArrEcUp" markerWidth="8" markerHeight="8" refX="4" refY="1" orient="auto">
          <path d="M0,8 L4,0 L8,8 z" fill="#1f3a8a" />
        </marker>
        <marker id="ibnegArrEcDn" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
          <path d="M0,0 L4,8 L8,0 z" fill="#1f3a8a" />
        </marker>
        <marker id="ibnegArrWL" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#374151" />
        </marker>
        <pattern id="ibnegHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#9ca3af" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Axes */}
      <line x1="90" y1="470" x2="90" y2="60" stroke="#1f2937" strokeWidth="1.6" markerEnd="url(#ibnegArrV)" />
      <line x1="90" y1="470" x2="660" y2="470" stroke="#1f2937" strokeWidth="1.6" markerEnd="url(#ibnegArrH)" />
      <text x="90" y="48" textAnchor="start" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Price, costs, benefits</text>
      <text x="660" y="492" textAnchor="end" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Quantity of soft drinks</text>

      {/* Welfare loss triangle (drawn before curves so curves overlay) */}
      <polygon
        points={`${Qopt},${Popt} ${Qm},${Pm} ${Qm},${MSBatQm}`}
        fill="url(#ibnegHatch)"
        stroke="#374151"
        strokeWidth="1.1"
      />

      {/* MPC = MSC = S — red upward */}
      <line x1="110" y1="420" x2="610" y2="90" stroke="#c0392b" strokeWidth="2.2" />
      <text x="615" y="92" fontSize="13" fill="#c0392b" fontFamily="Arial, sans-serif" fontWeight="600">MPC = MSC = S</text>

      {/* MPB = D — solid blue downward */}
      <line x1="110" y1="120" x2="610" y2="400" stroke="#2563eb" strokeWidth="2.2" />
      <text x="615" y="404" fontSize="13" fill="#2563eb" fontFamily="Arial, sans-serif" fontWeight="600">MPB = D</text>

      {/* MSB — dashed blue downward, parallel below MPB */}
      <line x1="110" y1="190" x2="610" y2="470" stroke="#2563eb" strokeWidth="2" strokeDasharray="7,5" />
      <text x="500" y="438" fontSize="13" fill="#2563eb" fontFamily="Arial, sans-serif" fontWeight="600">MSB</text>

      {/* "Private benefit overstates social benefit" italic note near top of MPB */}
      <text x="120" y="112" fontSize="12" fill="#2563eb" fontStyle="italic" fontFamily="Arial, sans-serif">
        Private benefit overstates social benefit
      </text>

      {/* External cost (MEC) double-headed arrow between MPB and MSB at x≈170 */}
      {(() => {
        const xMec = 170;
        const yMpb = 120 + 0.56 * (xMec - 110); // ≈ 153.6
        const yMsb = 190 + 0.56 * (xMec - 110); // ≈ 223.6
        return (
          <>
            <line
              x1={xMec} y1={yMpb + 4} x2={xMec} y2={yMsb - 4}
              stroke="#1f3a8a" strokeWidth="1.4"
              markerStart="url(#ibnegArrEcUp)" markerEnd="url(#ibnegArrEcDn)"
            />
            <text x={xMec + 8} y={(yMpb + yMsb) / 2 + 4} fontSize="12" fill="#1f3a8a" fontFamily="Arial, sans-serif">
              External cost (MEC)
            </text>
          </>
        );
      })()}

      {/* Market equilibrium dot */}
      <circle cx={Qm} cy={Pm} r="4" fill="#111827" />
      {/* Social optimum dot */}
      <circle cx={Qopt} cy={Popt} r="4" fill="#111827" />

      {/* Pm dashed guides */}
      <line x1="90" y1={Pm} x2={Qm} y2={Pm} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={Qm} y1={Pm} x2={Qm} y2="470" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x="62" y={Pm + 4} fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">P<tspan fontSize="10" baselineShift="sub">m</tspan></text>
      <text x={Qm} y="487" textAnchor="middle" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Q<tspan fontSize="10" baselineShift="sub">m</tspan></text>

      {/* P* / Q* dashed guides */}
      <line x1="90" y1={Popt} x2={Qopt} y2={Popt} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <line x1={Qopt} y1={Popt} x2={Qopt} y2="470" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x="55" y={Popt + 4} fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">P<tspan fontSize="10" baselineShift="sub">opt</tspan></text>
      <text x={Qopt} y="487" textAnchor="middle" fontSize="13" fill="#1f2937" fontFamily="Arial, sans-serif">Q<tspan fontSize="10" baselineShift="sub">opt</tspan></text>

      {/* Welfare loss callout */}
      <line x1="470" y1="240" x2={Qm - 4} y2={(Pm + MSBatQm) / 2} stroke="#374151" strokeWidth="1.2" markerEnd="url(#ibnegArrWL)" />
      <text x="478" y="232" fontSize="13" fill="#374151" fontFamily="Arial, sans-serif" fontWeight="700">Welfare loss</text>
      <text x="478" y="248" fontSize="11" fill="#6b7280" fontFamily="Arial, sans-serif">(deadweight loss)</text>

      {/* Caption */}
      <text x="360" y="522" textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="Arial, sans-serif">
        IB Economics HL/SL — market failure from negative externality of consumption
      </text>
    </svg>
  );
}
