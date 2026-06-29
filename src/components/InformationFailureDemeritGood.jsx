export default function InformationFailureDemeritGood() {
  /**
   * MATHEMATICAL SETUP  (SVG viewBox 0 0 370 255)
   * Axes:  Y at x=58, X at y=218
   *
   * Supply S=MPC=MSC:  (68,205) → (295,48)
   *   slope dy/dx = (48-205)/(295-68) = -157/227 = -0.6916
   *   param: x=68+227t, y=205-157t
   *
   * Demand D=MPB:      (68,52)  → (305,178)
   *   slope dy/dx = 126/237 = 0.5316
   *   param: x=68+237t, y=52+126t
   *
   * MSB 'correct':     (68,98)  → (315,200)
   *   slope dy/dx = 102/247 = 0.4129
   *   param: x=68+247t, y=98+102t
   *
   * M = Supply ∩ Demand:
   *   227t = 237s → t = 1.04405s
   *   205-157(1.04405s) = 52+126s
   *   205-163.92s = 52+126s → 153 = 289.92s → s=0.5278
   *   x_M = 68+237*0.5278 = 193.1 ≈ 193
   *   y_M = 52+126*0.5278 = 118.5 ≈ 119
   *
   * N = Supply ∩ MSB:
   *   227t = 247s → t = 1.0881s
   *   205-157(1.0881s) = 98+102s
   *   205-170.83s = 98+102s → 107 = 272.83s → s=0.3923
   *   x_N = 68+247*0.3923 = 164.9 ≈ 165
   *   y_N = 98+102*0.3923 = 138.0 ≈ 138
   *
   * I = MSB at x=x_M=193:
   *   t = (193-68)/247 = 125/247 = 0.5061
   *   y_I = 98+102*0.5061 = 149.6 ≈ 150
   *
   * Welfare loss triangle: N(165,138), M(193,119), I(193,150)
   * Q_ef at x=165, Q_mkt at x=193
   */

  const M  = { x: 193, y: 119 };
  const N  = { x: 165, y: 138 };
  const I  = { x: 193, y: 150 };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      width: "100%",
    }}>
      <svg width="100%" viewBox="0 0 370 255" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Axis arrow markers */}
          <marker id="axY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#222" />
          </marker>
          <marker id="axX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#222" />
          </marker>
        </defs>

        {/* ── Axes ── */}
        {/* Y axis */}
        <line x1="58" y1="12" x2="58" y2="222"
          stroke="#222" strokeWidth="1.6" markerEnd="url(#axY)" />
        {/* X axis */}
        <line x1="56" y1="218" x2="348" y2="218"
          stroke="#222" strokeWidth="1.6" markerEnd="url(#axX)" />

        {/* Axis labels */}
        <text
          transform="translate(14,190) rotate(-90)"
          fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold"
          textAnchor="middle">
          Costs &amp; Benefits £s
        </text>
        <text x="325" y="236" fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold">
          Quantity
        </text>

        {/* ── Welfare loss triangle (pink fill, drawn BEHIND lines) ── */}
        <polygon
          points={`${N.x},${N.y} ${M.x},${M.y} ${I.x},${I.y}`}
          fill="#e8748a" fillOpacity="0.55"
          stroke="#c0394f" strokeWidth="0.8" strokeLinejoin="round"
        />

        {/* ── Supply S = MPC = MSC (upward slope) ── */}
        {/* (68,205) → (295,48) */}
        <line x1="68" y1="205" x2="295" y2="48"
          stroke="#1a56db" strokeWidth="2.2" />
        <text x="265" y="44" fill="#1a56db" fontSize="9.5" fontFamily="Arial" fontWeight="bold">
          S = MPC = MSC
        </text>

        {/* ── Demand D = MPB (downward slope, higher valuation) ── */}
        {/* (68,52) → (305,178) */}
        <line x1="68" y1="52" x2="305" y2="178"
          stroke="#1a56db" strokeWidth="2.2" />
        <text x="272" y="143" fill="#1a56db" fontSize="9" fontFamily="Arial" fontWeight="bold">
          D= MPB: consumers'
        </text>
        <text x="272" y="154" fill="#1a56db" fontSize="9" fontFamily="Arial" fontWeight="bold">
          over valuation
        </text>

        {/* ── MSB = 'correct' valuation (below D) ── */}
        {/* (68,98) → (315,200) */}
        <line x1="68" y1="98" x2="315" y2="200"
          stroke="#1a56db" strokeWidth="2.2" />
        <text x="200" y="188" fill="#1a56db" fontSize="9" fontFamily="Arial" fontWeight="bold">
          MSB = 'correct' valuation
        </text>

        {/* ── Orange dashed reference lines ── */}
        {/* Q_ef vertical: x=165, from y=138(N) down to x-axis y=218 */}
        <line x1={N.x} y1={N.y} x2={N.x} y2="218"
          stroke="#e07b00" strokeWidth="1.4" strokeDasharray="5,4" />
        {/* Q_mkt vertical: x=193, from y=119(M) down to x-axis y=218 */}
        <line x1={M.x} y1={M.y} x2={M.x} y2="218"
          stroke="#e07b00" strokeWidth="1.4" strokeDasharray="5,4" />

        {/* ── Equilibrium dots exactly on intersections ── */}
        {/* M = Supply ∩ Demand (193, 119) */}
        <circle cx={M.x} cy={M.y} r="4.5" fill="#1a56db" stroke="#fff" strokeWidth="1.5" />
        {/* N = Supply ∩ MSB (165, 138) */}
        <circle cx={N.x} cy={N.y} r="4.5" fill="#1a56db" stroke="#fff" strokeWidth="1.5" />
        {/* I = MSB at Q_mkt (193, 150) */}
        <circle cx={I.x} cy={I.y} r="4.5" fill="#1a56db" stroke="#fff" strokeWidth="1.5" />

        {/* ── Point labels M, N, I ── */}
        <text x={M.x + 5} y={M.y - 6}
          fill="#222" fontSize="10.5" fontFamily="Arial" fontWeight="bold">M</text>
        <text x={N.x - 14} y={N.y - 5}
          fill="#222" fontSize="10.5" fontFamily="Arial" fontWeight="bold">N</text>
        <text x={I.x + 5} y={I.y + 5}
          fill="#222" fontSize="10.5" fontFamily="Arial" fontWeight="bold">I</text>

        {/* ── X-axis quantity labels ── */}
        <text x={N.x - 8} y="232"
          fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold">Q<tspan fontSize="8" dy="2">ef</tspan></text>
        <text x={M.x - 8} y="232"
          fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold">Q<tspan fontSize="8" dy="2">mkt</tspan></text>

        {/* ── Title ── */}
        <text x="210" y="18"
          fill="#222" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle">
          Market Failure through information
        </text>
        <text x="210" y="30"
          fill="#222" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle">
          failure – demerit goods
        </text>
      </svg>
    </div>
  );
}
