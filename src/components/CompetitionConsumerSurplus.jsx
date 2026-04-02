export default function CompetitionConsumerSurplus() {
  /**
   * Competition & Consumer Surplus — two-panel diagram matching reference image.
   *
   * LEFT PANEL: Perfectly Competitive Market
   *   Supply:  P = 1 + 0.6Q  (teal, upward)
   *   Demand:  P = 9 - Q     (coral, downward)
   *   Equilibrium: Q=5, P=4
   *   CS: triangle (0,9)→(0,4)→(5,4)  dark teal
   *   PS: triangle (0,1)→(0,4)→(5,4)  magenta
   *
   * RIGHT PANEL: Monopoly
   *   Demand: P = 9 - Q      (orange, downward)
   *   MR:     P = 9 - 2Q     (red, steeper downward)
   *   MC:     P = Q²/3       (orange, upward curved)
   *   Monopoly: Q=3 (MR=MC), P=6 (from Demand)
   *   CS: triangle (0,9)→(0,6)→(3,6)
   *   PS: rectangle (0,0)→(3,0)→(3,6)→(0,6)  [MC drawn on top]
   *   DWL: triangle (3,6)→(3,3)→(Qcomp,Pcomp)
   */

  const W = 1060, H = 610;
  const BG = "#1d2921";
  const sc = 34; // pixels per Q/P unit

  // Left origin, Right origin
  const Lox = 90,  Loy = 415;
  const Rox = 610, Roy = 415;

  const LX = q => Lox + q * sc;
  const LY = p => Loy - p * sc;
  const RX = q => Rox + q * sc;
  const RY = p => Roy - p * sc;

  // Curve formulas
  const Lsup = q => 1 + 0.6 * q;     // Left supply
  const Ldem = q => 9 - q;            // Left demand
  const Rdem = q => 9 - q;            // Right demand (orange)
  const Rmr  = q => 9 - 2 * q;       // Right MR
  const Rmc  = q => (q * q) / 3;     // Right MC (curved)

  // MC/Demand intersection (MC = Demand): q²/3 = 9−q  ⟹  q≈3.908, p≈5.092
  const Qcomp = (-3 + Math.sqrt(117)) / 2;
  const Pcomp = 9 - Qcomp;

  // MC polyline points
  const mcPts = [];
  for (let q = 0; q <= 5.45; q += 0.12) {
    const p = Rmc(q);
    if (p <= 10.5) mcPts.push(`${RX(q).toFixed(1)},${RY(p).toFixed(1)}`);
  }

  const ticks = [1,2,3,4,5,6,7,8,9,10];
  const ARW = 11; // arrowhead half-size

  // Axis helper
  const Axis = ({ ox, oy, dir }) => {
    const isLeft = dir === "left";
    return (
      <>
        {/* Y-axis (vertical, arrow up) */}
        <line x1={ox} y1={oy + 16} x2={ox} y2={LY(10) - ARW - 2} stroke="#fff" strokeWidth="2.5"/>
        <polygon points={`${ox - 5},${LY(10) - ARW} ${ox + 5},${LY(10) - ARW} ${ox},${LY(10) - ARW - ARW}`} fill="#fff"/>
        {/* X-axis bidirectional */}
        <line x1={ox - 16} y1={oy} x2={ox + 10 * sc + ARW + 2} y2={oy} stroke="#fff" strokeWidth="2.5"/>
        <polygon points={`${ox - 16},${oy - 5} ${ox - 16},${oy + 5} ${ox - 16 - ARW},${oy}`} fill="#fff"/>
        <polygon points={`${ox + 10 * sc + ARW},${oy - 5} ${ox + 10 * sc + ARW},${oy + 5} ${ox + 10 * sc + ARW + ARW},${oy}`} fill="#fff"/>
        {/* Axis labels */}
        <text x={ox - 28} y={LY(10) - 14} textAnchor="end" fontSize="14" fill="#fff" fontWeight="bold">Price in $</text>
        <text x={ox + 10 * sc + ARW + 18} y={oy + 5} fontSize="14" fill="#fff" fontWeight="bold">Quantity</text>
        {/* Tick marks + labels */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={ox - 4} y1={oy - t * sc} x2={ox + 4} y2={oy - t * sc} stroke="#fff" strokeWidth="1.5"/>
            <text x={ox - 8} y={oy - t * sc + 5} textAnchor="end" fontSize="12" fill="#fff">{t}</text>
            <line x1={ox + t * sc} y1={oy - 4} x2={ox + t * sc} y2={oy + 4} stroke="#fff" strokeWidth="1.5"/>
            <text x={ox + t * sc} y={oy + 18} textAnchor="middle" fontSize="12" fill="#fff">{t}</text>
          </g>
        ))}
      </>
    );
  };

  return (
    <div style={{
      background: BG, borderRadius: "10px", padding: "12px",
      maxWidth: "1060px", margin: "0 auto", fontFamily: "Arial, sans-serif"
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="tealArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#3dd6b5"/>
          </marker>
        </defs>

        <rect width={W} height={H} fill={BG}/>

        {/* ══════════════ LEFT DIAGRAM ══════════════ */}

        {/* CS region — dark teal triangle above eq. price */}
        <polygon
          points={`${LX(0)},${LY(9)} ${LX(0)},${LY(4)} ${LX(5)},${LY(4)}`}
          fill="#1b6555"
        />
        {/* PS region — magenta triangle below eq. price, above supply */}
        <polygon
          points={`${LX(0)},${LY(1)} ${LX(0)},${LY(4)} ${LX(5)},${LY(4)}`}
          fill="#c0188a"
        />

        {/* Dashed guide lines */}
        <line x1={LX(0)} y1={LY(4)} x2={LX(5)} y2={LY(4)} stroke="#888" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1={LX(5)} y1={Loy}  x2={LX(5)} y2={LY(4)} stroke="#888" strokeWidth="1.5" strokeDasharray="6,4"/>

        {/* Supply: P = 1+0.6Q (teal) */}
        <line x1={LX(0)} y1={LY(Lsup(0))} x2={LX(10)} y2={LY(Lsup(10))}
          stroke="#3dd6b5" strokeWidth="2.8"/>

        {/* Demand: P = 9−Q (coral) */}
        <line x1={LX(0)} y1={LY(Ldem(0))} x2={LX(9)} y2={LY(0)}
          stroke="#e06575" strokeWidth="2.8"/>

        {/* Equilibrium dot */}
        <circle cx={LX(5)} cy={LY(4)} r={7} fill="#fff"/>

        {/* Axes */}
        <Axis ox={Lox} oy={Loy}/>

        {/* Curve labels */}
        <text x={LX(9.4)} y={LY(Lsup(9.4)) - 10} fontSize="16" fill="#3dd6b5" fontWeight="bold">Supply</text>
        <text x={LX(8.5)} y={LY(Ldem(8.5)) + 22} fontSize="16" fill="#e06575" fontWeight="bold">Demand</text>

        {/* Region labels */}
        <text x={LX(0.9)} y={LY(5.9)}      fontSize="14" fill="#fff" fontWeight="bold">Consumer</text>
        <text x={LX(0.9)} y={LY(5.9) + 19} fontSize="14" fill="#fff" fontWeight="bold">Surplus</text>
        <text x={LX(0.9)} y={LY(2.7)}      fontSize="14" fill="#fff" fontWeight="bold">Producer</text>
        <text x={LX(0.9)} y={LY(2.7) + 19} fontSize="14" fill="#fff" fontWeight="bold">Surplus</text>

        {/* ══════════════ RIGHT DIAGRAM ══════════════ */}

        {/* PS — magenta rectangle: Q=0→3, P=0→6 */}
        <rect x={RX(0)} y={RY(6)} width={RX(3) - RX(0)} height={RY(0) - RY(6)} fill="#c0188a"/>

        {/* CS — dark teal triangle: (0,9)→(0,6)→(3,6) */}
        <polygon
          points={`${RX(0)},${RY(9)} ${RX(0)},${RY(6)} ${RX(3)},${RY(6)}`}
          fill="#1b6555"
        />

        {/* DWL — gray triangle: (3,6)→(3,3)→(Qcomp,Pcomp) */}
        <polygon
          points={`${RX(3)},${RY(6)} ${RX(3)},${RY(3)} ${RX(Qcomp)},${RY(Pcomp)}`}
          fill="#7a7a95"
        />

        {/* Dashed guide lines */}
        <line x1={Rox}   y1={RY(6)} x2={RX(3)} y2={RY(6)} stroke="#888" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1={RX(3)} y1={Roy}   x2={RX(3)} y2={RY(6)} stroke="#888" strokeWidth="1.5" strokeDasharray="6,4"/>

        {/* MC curve (orange, curved upward — drawn before demand so demand is on top) */}
        <polyline points={mcPts.join(' ')} fill="none" stroke="#f5a520" strokeWidth="2.8"/>

        {/* MR: P = 9−2Q (coral/red, steeper) */}
        <line x1={RX(0)} y1={RY(9)} x2={RX(4.5)} y2={RY(0)}
          stroke="#e06575" strokeWidth="2.8"/>

        {/* Demand: P = 9−Q (orange, same slope as left demand but golden) */}
        <line x1={RX(0)} y1={RY(9)} x2={RX(9)} y2={RY(0)}
          stroke="#f5a520" strokeWidth="2.8"/>

        {/* Monopoly equilibrium dot (on demand at Q=3) */}
        <circle cx={RX(3)} cy={RY(6)} r={7} fill="#fff"/>

        {/* Axes */}
        <Axis ox={Rox} oy={Roy}/>

        {/* Curve labels */}
        <text x={RX(8.5)} y={RY(Rdem(8.5)) + 22} fontSize="16" fill="#f5a520" fontWeight="bold">Demand</text>
        <text x={RX(5.3)} y={RY(Rmr(5.3)) + 22} fontSize="16" fill="#e06575" fontWeight="bold">MR</text>

        {/* Region labels */}
        {/* Consumer Surplus label + teal arrow */}
        <text x={RX(0.55)} y={RY(8.2)}      fontSize="13" fill="#fff" fontWeight="bold">Consumer</text>
        <text x={RX(0.55)} y={RY(8.2) + 17} fontSize="13" fill="#fff" fontWeight="bold">Surplus</text>
        <path
          d={`M ${RX(1.6)},${RY(7.8)} Q ${RX(2.1)},${RY(7.6)} ${RX(2.4)},${RY(7.2)}`}
          fill="none" stroke="#3dd6b5" strokeWidth="2" markerEnd="url(#tealArrow)"
        />

        {/* Producer Surplus label */}
        <text x={RX(0.35)} y={RY(4.2)}      fontSize="13" fill="#fff" fontWeight="bold">Producer</text>
        <text x={RX(0.35)} y={RY(4.2) + 17} fontSize="13" fill="#fff" fontWeight="bold">Surplus</text>

        {/* DWL label */}
        <text x={RX(3.05)} y={RY(4.2)} fontSize="13" fill="#fff" fontWeight="bold">DWL</text>

        {/* ══════════════ BOTTOM TITLES ══════════════ */}

        {/* Left title */}
        <text x={(LX(0) + LX(10)) / 2} y={H - 42}
          textAnchor="middle" fontSize="18" fill="#3dd6b5" fontWeight="bold">
          Economic Surplus in a perfectly
        </text>
        <text x={(LX(0) + LX(10)) / 2} y={H - 18}
          textAnchor="middle" fontSize="18" fill="#3dd6b5" fontWeight="bold">
          competitive market
        </text>

        {/* Right title */}
        <text x={(RX(0) + RX(10)) / 2} y={H - 42}
          textAnchor="middle" fontSize="18" fill="#3dd6b5" fontWeight="bold">
          Economic Surplus
        </text>
        <text x={(RX(0) + RX(10)) / 2} y={H - 18}
          textAnchor="middle" fontSize="18" fill="#3dd6b5" fontWeight="bold">
          in a monopoly
        </text>

      </svg>
    </div>
  );
}
