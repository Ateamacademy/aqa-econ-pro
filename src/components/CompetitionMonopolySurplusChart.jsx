export default function CompetitionMonopolySurplusChart() {
  /**
   * TWO-PANEL diagram: competitive market (left) vs monopoly (right).
   * Dark forest-green background. Pure inline SVG, zero dependencies.
   *
   * LEFT  — P.Competitive: Supply P=Q-1 (teal), Demand P=9-Q (red)
   *         Eq (5,4) white dot. CS dark-teal, PS magenta.
   * RIGHT — Monopoly: Demand P=9-Q (orange), MR P=9-2Q (pink),
   *         MC curved (orange). Mono eq (3,6) white dot.
   *         CS dark-teal, PS magenta, DWL grey.
   */

  const W = 900, H = 530;
  const cT = 32, cB = 390;
  const QM = 10, PM = 10;
  const cH = cB - cT;

  // left panel
  const LL = 76,  LR = 398;
  // right panel
  const RL = 468, RR = 862;

  const xSL = (LR - LL) / QM;
  const xSR = (RR - RL) / QM;
  const yS  = cH / PM;

  const X1 = q => LL + q * xSL;
  const X2 = q => RL + q * xSR;
  const Y  = p => cB - p * yS;

  // MC curved: 0.44·Q^1.65 — matches visual shape of reference
  const mcPts = [];
  for (let q = 0.1; q <= 9.6; q += 0.2) {
    const p = 0.44 * Math.pow(q, 1.65);
    if (p <= PM + 0.5) mcPts.push(`${X2(q).toFixed(1)},${Y(p).toFixed(1)}`);
  }

  const BG      = "#163324";
  const TEAL    = "#18c4a6";
  const CS_F    = "#1a6651";
  const PS_F    = "#c2197f";
  const DWL_F   = "#888899";
  const RED_D   = "#dd2828";
  const ORA     = "#e8820a";
  const PINK    = "#e05080";
  const AX      = "#b8ccb8";
  const WH      = "#ffffff";

  const ticks = [1,2,3,4,5,6,7,8,9,10];

  // key coords
  const LEqX = X1(5),   LEqY = Y(4);
  const REqX = X2(3),   REqY = Y(6);
  const RCpX = X2(4.5), RCpY = Y(4.5);

  return (
    <div style={{ background: BG, borderRadius: "10px", padding: "4px", maxWidth: "100%", fontFamily: "Arial, sans-serif" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="cmscArR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill={AX}/>
          </marker>
          <marker id="cmscArL" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
            <polygon points="0 0,8 3,0 6" fill={AX}/>
          </marker>
          <marker id="cmscArU" markerWidth="6" markerHeight="9" refX="3" refY="1" orient="auto">
            <polygon points="0 9,3 0,6 9" fill={AX}/>
          </marker>
          <marker id="cmscTeal" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill={TEAL}/>
          </marker>
        </defs>

        <rect width={W} height={H} fill={BG}/>

        {/* ═══ LEFT PANEL ═══ */}

        {/* CS teal: (0,9)→(0,4)→(5,4) */}
        <polygon points={`${X1(0)},${Y(9)} ${X1(0)},${Y(4)} ${X1(5)},${Y(4)}`} fill={CS_F}/>
        {/* PS magenta: (0,0)→(0,4)→(5,4)→(1,0) */}
        <polygon points={`${X1(0)},${Y(0)} ${X1(0)},${Y(4)} ${X1(5)},${Y(4)} ${X1(1)},${Y(0)}`} fill={PS_F}/>

        {/* dashed vertical Q=5 */}
        <line x1={LEqX} y1={LEqY} x2={LEqX} y2={cB}
          stroke="rgba(200,210,200,0.45)" strokeWidth="1.5" strokeDasharray="7,5"/>

        {/* Supply teal */}
        <line x1={X1(1)} y1={Y(0)} x2={X1(10)} y2={Y(9)}
          stroke={TEAL} strokeWidth="3" strokeLinecap="round"/>
        {/* Demand red */}
        <line x1={X1(0)} y1={Y(9)} x2={X1(9)} y2={Y(0)}
          stroke={RED_D} strokeWidth="3" strokeLinecap="round"/>

        {/* eq dot */}
        <circle cx={LEqX} cy={LEqY} r="7" fill={WH}/>

        {/* LEFT axes */}
        <line x1={X1(0)} y1={cB} x2={X1(0)} y2={cT-18}
          stroke={AX} strokeWidth="2" markerEnd="url(#cmscArU)"/>
        <line x1={LL-22} y1={cB} x2={LR+24} y2={cB}
          stroke={AX} strokeWidth="2" markerEnd="url(#cmscArR)" markerStart="url(#cmscArL)"/>

        {/* axis labels */}
        <text x={X1(0)-4} y={cT-26} fontSize="13" fontWeight="bold" fill={WH}>Price in $</text>
        <text x={LR+28}   y={cB+5}  fontSize="13" fontWeight="bold" fill={RED_D}>Demand</text>
        <text x={LR+26}   y={cB+20} fontSize="13" fill={AX}>→ Quantity</text>

        {/* ticks LEFT */}
        {ticks.map(t => (
          <g key={`lT${t}`}>
            <text x={X1(t)} y={cB+16} textAnchor="middle" fontSize="12" fill={AX}>{t}</text>
            <text x={X1(0)-8} y={Y(t)+4} textAnchor="end" fontSize="12" fill={AX}>{t}</text>
          </g>
        ))}

        {/* curve + region labels LEFT */}
        <text x={X1(6.6)} y={Y(6.0)} fontSize="15" fontWeight="bold" fill={TEAL}>Supply</text>
        <text x={X1(1.1)} y={Y(6.5)}    fontSize="15" fontWeight="bold" fill={WH}>Consumer</text>
        <text x={X1(1.1)} y={Y(6.5)+20} fontSize="15" fontWeight="bold" fill={WH}>Surplus</text>
        <text x={X1(1.1)} y={Y(2.3)}    fontSize="15" fontWeight="bold" fill={WH}>Producer</text>
        <text x={X1(1.1)} y={Y(2.3)+20} fontSize="15" fontWeight="bold" fill={WH}>Surplus</text>

        {/* ═══ RIGHT PANEL ═══ */}

        {/* CS teal: (0,9)→(0,6)→(3,6) */}
        <polygon points={`${X2(0)},${Y(9)} ${X2(0)},${Y(6)} ${X2(3)},${Y(6)}`} fill={CS_F}/>
        {/* PS magenta: (0,0)→(0,6)→(3,6)→(3,0) */}
        <polygon points={`${X2(0)},${Y(0)} ${X2(0)},${Y(6)} ${X2(3)},${Y(6)} ${X2(3)},${Y(0)}`} fill={PS_F}/>
        {/* DWL grey: (3,6)→(4.5,4.5)→(3,3) */}
        <polygon points={`${REqX},${REqY} ${RCpX},${RCpY} ${X2(3)},${Y(3)}`} fill={DWL_F}/>

        {/* MC orange curved */}
        <polyline points={mcPts.join(" ")}
          fill="none" stroke={ORA} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Demand orange: P=9-Q */}
        <line x1={X2(0)} y1={Y(9)} x2={X2(9)} y2={Y(0)}
          stroke={ORA} strokeWidth="3" strokeLinecap="round"/>
        {/* MR pink: P=9-2Q */}
        <line x1={X2(0)} y1={Y(9)} x2={X2(4.5)} y2={Y(0)}
          stroke={PINK} strokeWidth="3" strokeLinecap="round"/>

        {/* eq dot */}
        <circle cx={REqX} cy={REqY} r="7" fill={WH}/>

        {/* RIGHT axes */}
        <line x1={X2(0)} y1={cB} x2={X2(0)} y2={cT-18}
          stroke={AX} strokeWidth="2" markerEnd="url(#cmscArU)"/>
        <line x1={RL-22} y1={cB} x2={RR+24} y2={cB}
          stroke={AX} strokeWidth="2" markerEnd="url(#cmscArR)" markerStart="url(#cmscArL)"/>

        {/* axis labels RIGHT */}
        <text x={X2(0)-4} y={cT-26} fontSize="13" fontWeight="bold" fill={WH}>Price in $</text>
        <text x={RR+28}   y={cB+5}  fontSize="13" fontWeight="bold" fill={ORA}>Demand</text>
        <text x={RR+26}   y={cB+20} fontSize="13" fill={AX}>→ Quantity</text>

        {/* ticks RIGHT */}
        {ticks.map(t => (
          <g key={`rT${t}`}>
            <text x={X2(t)} y={cB+16} textAnchor="middle" fontSize="12" fill={AX}>{t}</text>
            <text x={X2(0)-8} y={Y(t)+4} textAnchor="end" fontSize="12" fill={AX}>{t}</text>
          </g>
        ))}

        {/* Consumer Surplus label + teal arrow */}
        <text x={X2(0.8)} y={Y(8.6)}    fontSize="14" fontWeight="bold" fill={WH}>Consumer</text>
        <text x={X2(0.8)} y={Y(8.6)+18} fontSize="14" fontWeight="bold" fill={WH}>Surplus</text>
        <line x1={X2(2.1)} y1={Y(8.1)} x2={X2(2.5)} y2={Y(7.4)}
          stroke={TEAL} strokeWidth="2" markerEnd="url(#cmscTeal)"/>

        {/* PS + DWL labels */}
        <text x={X2(0.4)} y={Y(3.5)}    fontSize="14" fontWeight="bold" fill={WH}>Producer</text>
        <text x={X2(0.4)} y={Y(3.5)+18} fontSize="14" fontWeight="bold" fill={WH}>Surplus</text>
        <text x={X2(3.2)} y={Y(5.1)}    fontSize="14" fontWeight="bold" fill={WH}>DWL</text>

        {/* MR label below x-axis */}
        <text x={X2(3.5)} y={cB+40} textAnchor="middle" fontSize="15" fontWeight="bold" fill={PINK}>MR</text>

        {/* ═══ BOTTOM CAPTIONS ═══ */}
        <text x={(LL+LR)/2} y={cB+64} textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          Economic Surplus in a perfectly
        </text>
        <text x={(LL+LR)/2} y={cB+84} textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          competitive market
        </text>
        <text x={(RL+RR)/2} y={cB+64} textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          Economic Surplus
        </text>
        <text x={(RL+RR)/2} y={cB+84} textAnchor="middle" fontSize="16" fontWeight="bold" fill={TEAL}>
          in a monopoly
        </text>
      </svg>
    </div>
  );
}
