export default function CompetitionConsumerSurplus() {
  /**
   * Dual-panel economics diagram on dark-green background.
   * Matches the textbook reference exactly.
   *
   * LEFT — perfectly competitive:
   *   Supply (teal linear):  P = Q − 1
   *   Demand (red linear):   P = 9 − Q
   *   Eq: Q=5, P=4  (white dot)
   *   CS (dark teal): triangle (0,9)→(0,4)→(5,4)
   *   PS (magenta):   triangle (0,0)→(0,4)→(5,4)→(1,0)
   *
   * RIGHT — monopoly:
   *   Demand (orange curved): downward
   *   MR (pink, steeper):     P = 9 − 2Q
   *   MC (orange curved):     upward power curve
   *   Mono eq: Q=3, P=6  (white dot)
   *   CS (dark teal): triangle (0,9)→(0,6)→(3,6)
   *   PS (magenta):   quad    (0,0)→(0,6)→(3,6)→(3,0)
   *   DWL (gray):     triangle (3,6)→(4.5,4.5)→(3,3)
   */

  const W = 880, H = 520;

  // Shared chart vertical bounds
  const cT = 28, cB = 380;
  const cH = cB - cT; // 352

  const QM = 10, PM = 10;

  // LEFT panel x-bounds
  const LL = 72, LR = 390;
  // RIGHT panel x-bounds
  const RL = 460, RR = 858;

  const xS = (LR - LL) / QM;  // px per Q unit (left)
  const xSR = (RR - RL) / QM; // px per Q unit (right)
  const yS = cH / PM;          // px per P unit

  const X1 = q => LL + q * xS;
  const X2 = q => RL + q * xSR;
  const Y  = p => cB - p * yS;

  // Curve equations
  const sup = q => q - 1;
  const dem = q => 9 - q;
  const mr  = q => 9 - 2 * q;
  // MC as power curve: P = 0.44 * Q^1.65  (passes near (3,3) area, steepens right)
  const mc  = q => 0.44 * Math.pow(q, 1.65);

  // Equilibrium points
  const LEqX = X1(5), LEqY = Y(4);   // left competitive
  const REqX = X2(3), REqY = Y(6);   // right monopoly
  const RCpX = X2(4.5), RCpY = Y(4.5); // competitive output (DWL right vertex)

  // Colors
  const BG       = "#163324";
  const TEAL     = "#14b89a";
  const CS_FILL  = "#1a6651";
  const PS_FILL  = "#cc1f8a";
  const DWL_FILL = "#8888aa";
  const RED_D    = "#dd2222";
  const ORANGE   = "#e8820a";
  const PINK_MR  = "#e0507a";
  const AXIS_COL = "#c8d9c8";
  const WHITE    = "#ffffff";

  // Generate MC path points for right panel (Q=0 to Q=9)
  const mcPts = [];
  for (let q = 0; q <= 9.5; q += 0.25) {
    if (mc(q) <= PM + 1) mcPts.push(`${X2(q)},${Y(mc(q))}`);
  }
  // Generate demand path for right panel (curved look — actually linear P=9-Q but styled orange)
  // Using quadratic bezier to give slight curve look matching reference
  const demRPts = [];
  for (let q = 0; q <= 9.5; q += 0.25) {
    if (dem(q) >= -0.5) demRPts.push(`${X2(q)},${Y(dem(q))}`);
  }

  const ticks = [1,2,3,4,5,6,7,8,9,10];

  const AxisArrows = ({ x1, y1, x2, y2, col }) => (
    <defs>
      <marker id={`arr${x1}`} markerWidth="8" markerHeight="6"
        refX="7" refY="3" orient="auto">
        <polygon points="0 0,8 3,0 6" fill={col}/>
      </marker>
    </defs>
  );

  return (
    <div style={{
      background: BG,
      borderRadius: "10px",
      padding: "4px",
      maxWidth: "100%",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        <defs>
          <marker id="aR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill={AXIS_COL}/>
          </marker>
          <marker id="aL" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
            <polygon points="0 0,8 3,0 6" fill={AXIS_COL}/>
          </marker>
          <marker id="aU" markerWidth="6" markerHeight="8" refX="3" refY="1" orient="auto">
            <polygon points="0 8,3 0,6 8" fill={AXIS_COL}/>
          </marker>
          <marker id="tealArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill={TEAL}/>
          </marker>
        </defs>

        {/* Background */}
        <rect width={W} height={H} fill={BG}/>

        {/* ═══════════════════════════════════════
            LEFT PANEL — perfectly competitive
            ═══════════════════════════════════════ */}

        {/* CS — dark teal triangle: (0,9)→(0,4)→(5,4) */}
        <polygon
          points={`${X1(0)},${Y(9)} ${X1(0)},${Y(4)} ${X1(5)},${Y(4)}`}
          fill={CS_FILL}
        />

        {/* PS — magenta: (0,0)→(0,4)→(5,4)→(1,0) */}
        <polygon
          points={`${X1(0)},${Y(0)} ${X1(0)},${Y(4)} ${X1(5)},${Y(4)} ${X1(1)},${Y(0)}`}
          fill={PS_FILL}
        />

        {/* Dashed vertical at Q=5 */}
        <line x1={LEqX} y1={LEqY} x2={LEqX} y2={cB}
          stroke="rgba(200,200,200,0.5)" strokeWidth="1.6" strokeDasharray="7,5"/>

        {/* Supply (teal): P = Q-1, from (1,0) to (10,9) */}
        <line x1={X1(1)} y1={Y(0)} x2={X1(10)} y2={Y(9)}
          stroke={TEAL} strokeWidth="3" strokeLinecap="round"/>

        {/* Demand (red): P = 9-Q, from (0,9) to (9,0) */}
        <line x1={X1(0)} y1={Y(9)} x2={X1(9)} y2={Y(0)}
          stroke={RED_D} strokeWidth="3" strokeLinecap="round"/>

        {/* Equilibrium white dot */}
        <circle cx={LEqX} cy={LEqY} r="7" fill={WHITE}/>

        {/* LEFT axes */}
        {/* Y-axis with up arrow */}
        <line x1={X1(0)} y1={cB} x2={X1(0)} y2={cT - 16}
          stroke={AXIS_COL} strokeWidth="2" markerEnd="url(#aU)"/>
        {/* X-axis bidirectional */}
        <line x1={LL - 22} y1={cB} x2={LR + 22} y2={cB}
          stroke={AXIS_COL} strokeWidth="2"
          markerEnd="url(#aR)" markerStart="url(#aL)"/>

        {/* Axis labels LEFT */}
        <text x={X1(0) - 5} y={cT - 22}
          fontSize="13" fontWeight="bold" fill={WHITE}>Price in $</text>
        <text x={LR + 26} y={cB + 5}
          fontSize="13" fontWeight="bold" fill={RED_D}>Demand</text>
        <text x={LR + 24} y={cB + 18}
          fontSize="13" fill={AXIS_COL}>→  Quantity</text>

        {/* Ticks LEFT */}
        {ticks.map(t => (
          <g key={`lt${t}`}>
            <text x={X1(t)} y={cB + 16} textAnchor="middle" fontSize="12" fill={AXIS_COL}>{t}</text>
            <text x={X1(0) - 8} y={Y(t) + 4} textAnchor="end" fontSize="12" fill={AXIS_COL}>{t}</text>
          </g>
        ))}

        {/* Curve labels LEFT */}
        <text x={X1(7.2)} y={Y(6.5)}
          fontSize="15" fontWeight="bold" fill={TEAL}>Supply</text>

        {/* Region labels LEFT */}
        <text x={X1(1.2)} y={Y(6.4)}
          fontSize="15" fontWeight="bold" fill={WHITE}>Consumer</text>
        <text x={X1(1.2)} y={Y(6.4) + 20}
          fontSize="15" fontWeight="bold" fill={WHITE}>Surplus</text>
        <text x={X1(1.2)} y={Y(2.2)}
          fontSize="15" fontWeight="bold" fill={WHITE}>Producer</text>
        <text x={X1(1.2)} y={Y(2.2) + 20}
          fontSize="15" fontWeight="bold" fill={WHITE}>Surplus</text>

        {/* ═══════════════════════════════════════
            RIGHT PANEL — monopoly
            ═══════════════════════════════════════ */}

        {/* CS — dark teal triangle: (0,9)→(0,6)→(3,6) */}
        <polygon
          points={`${X2(0)},${Y(9)} ${X2(0)},${Y(6)} ${X2(3)},${Y(6)}`}
          fill={CS_FILL}
        />

        {/* PS — magenta quad: (0,0)→(0,6)→(3,6)→(3,0) */}
        <polygon
          points={`${X2(0)},${Y(0)} ${X2(0)},${Y(6)} ${X2(3)},${Y(6)} ${X2(3)},${Y(0)}`}
          fill={PS_FILL}
        />

        {/* DWL — gray triangle: (3,6)→(4.5,4.5)→(3,3) */}
        <polygon
          points={`${REqX},${REqY} ${RCpX},${RCpY} ${X2(3)},${Y(3)}`}
          fill={DWL_FILL}
        />

        {/* MC (orange, curved upward using polyline) */}
        <polyline
          points={mcPts.join(" ")}
          fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* Demand right (orange, linear downward): P=9-Q */}
        <line x1={X2(0)} y1={Y(9)} x2={X2(9)} y2={Y(0)}
          stroke={ORANGE} strokeWidth="3" strokeLinecap="round"/>

        {/* MR (pink/red, steeper): P=9-2Q, from (0,9) to (4.5,0) */}
        <line x1={X2(0)} y1={Y(9)} x2={X2(4.5)} y2={Y(0)}
          stroke={PINK_MR} strokeWidth="3" strokeLinecap="round"/>

        {/* Monopoly white dot */}
        <circle cx={REqX} cy={REqY} r="7" fill={WHITE}/>

        {/* RIGHT axes */}
        <line x1={X2(0)} y1={cB} x2={X2(0)} y2={cT - 16}
          stroke={AXIS_COL} strokeWidth="2" markerEnd="url(#aU)"/>
        <line x1={RL - 22} y1={cB} x2={RR + 22} y2={cB}
          stroke={AXIS_COL} strokeWidth="2"
          markerEnd="url(#aR)" markerStart="url(#aL)"/>

        {/* Axis labels RIGHT */}
        <text x={X2(0) - 5} y={cT - 22}
          fontSize="13" fontWeight="bold" fill={WHITE}>Price in $</text>
        <text x={RR + 26} y={cB + 5}
          fontSize="13" fontWeight="bold" fill={ORANGE}>Demand</text>
        <text x={RR + 24} y={cB + 18}
          fontSize="13" fill={AXIS_COL}>→  Quantity</text>

        {/* Ticks RIGHT */}
        {ticks.map(t => (
          <g key={`rt${t}`}>
            <text x={X2(t)} y={cB + 16} textAnchor="middle" fontSize="12" fill={AXIS_COL}>{t}</text>
            <text x={X2(0) - 8} y={Y(t) + 4} textAnchor="end" fontSize="12" fill={AXIS_COL}>{t}</text>
          </g>
        ))}

        {/* Consumer Surplus label + teal arrow */}
        <text x={X2(1.0)} y={Y(8.5)}
          fontSize="14" fontWeight="bold" fill={WHITE}>Consumer</text>
        <text x={X2(1.0)} y={Y(8.5) + 18}
          fontSize="14" fontWeight="bold" fill={WHITE}>Surplus</text>
        {/* Arrow pointing down-right into CS triangle */}
        <line
          x1={X2(2.2)} y1={Y(8.0)}
          x2={X2(2.6)} y2={Y(7.3)}
          stroke={TEAL} strokeWidth="2" markerEnd="url(#tealArrow)"/>

        {/* PS label */}
        <text x={X2(0.3)} y={Y(3.4)}
          fontSize="14" fontWeight="bold" fill={WHITE}>Producer</text>
        <text x={X2(0.3)} y={Y(3.4) + 18}
          fontSize="14" fontWeight="bold" fill={WHITE}>Surplus</text>

        {/* DWL label */}
        <text x={X2(3.2)} y={Y(5.1)}
          fontSize="14" fontWeight="bold" fill={WHITE}>DWL</text>

        {/* MR label below axis */}
        <text x={X2(3.5)} y={cB + 38}
          textAnchor="middle" fontSize="15" fontWeight="bold" fill={PINK_MR}>MR</text>

        {/* ═══════════════════════════════════════
            BOTTOM CAPTIONS
            ═══════════════════════════════════════ */}

        <text x={(LL + LR) / 2} y={cB + 58}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          Economic Surplus in a perfectly
        </text>
        <text x={(LL + LR) / 2} y={cB + 78}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          competitive market
        </text>

        <text x={(RL + RR) / 2} y={cB + 58}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          Economic Surplus
        </text>
        <text x={(RL + RR) / 2} y={cB + 78}
          textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          in a monopoly
        </text>

      </svg>
    </div>
  );
}
