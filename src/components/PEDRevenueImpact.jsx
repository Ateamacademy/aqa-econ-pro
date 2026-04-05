export default function PEDRevenueImpact() {
  const W = 720, H = 1160;

  // ── Shared colours ──
  const NAVY    = "#0d1b2e";
  const BLUE    = "#4a90e8";
  const DARKRED = "#c22040";
  const RED     = "#e84040";
  const TEAL    = "#20c0b0";
  const GREEN   = "#2ecc71";
  const AMBER   = "#f5c518";
  const ORANGE  = "#e87c18";
  const WHITE   = "#ffffff";
  const AX      = "#c8d6e8";
  const DASH    = "7,5";

  // ── DIAGRAM 1 geometry (monopolist) ──
  const D1 = { cL:76, cT:118, cR:564, cB:490, QM:9, PM:14 };
  const X1 = q => D1.cL + (q / D1.QM) * (D1.cR - D1.cL);
  const Y1 = p => D1.cB - (p / D1.PM) * (D1.cB - D1.cT);

  const ar  = q => 13 - q;
  const mr  = q => 13 - 2 * q;
  const mc  = q => 0.3 + 0.38 * Math.pow(q, 1.6);
  const atc = q => 4.5 / q + 1.6 + 0.2 * q;

  const Qstar = 4.1, Pstar = ar(4.1), ATCq = atc(4.1);
  const Qa = 6.5, Pa = ar(6.5);

  const pts1 = (fn, q0, q1, n = 120) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const q = q0 + (i / n) * (q1 - q0);
      const p = fn(q);
      if (!isFinite(p) || p < -1 || p > D1.PM + 2) return null;
      return `${X1(q).toFixed(2)},${Y1(p).toFixed(2)}`;
    }).filter(Boolean).join(" ");

  const profitPoly = [
    `${D1.cL},${Y1(Pstar)}`,
    `${X1(Qstar)},${Y1(Pstar)}`,
    `${X1(Qstar)},${Y1(ATCq)}`,
    `${D1.cL},${Y1(ATCq)}`,
  ].join(" ");

  // ── DIAGRAM 2 geometry (petrol) — offset by H1+gap ──
  const GAP = 58;   // gap + divider between the two charts
  const H1  = 490;  // height of first chart block
  const OY  = H1 + GAP;   // y-offset for diagram 2

  const D2 = { cL:76, cT:118+OY, cR:564, cB:490+OY, QM:9, PM:14 };
  const X2 = q => D2.cL + (q / D2.QM) * (D2.cR - D2.cL);
  const Y2 = p => D2.cB - (p / D2.PM) * (D2.cB - D2.cT);

  const dem = q => 13 - 0.6 * q;
  const P1v = 9.4,  Q1v = 6.0;
  const P2v = 10.34, Q2v = (13 - 10.34) / 0.6;

  const xQ1 = X2(Q1v), yP1 = Y2(P1v);
  const xQ2 = X2(Q2v), yP2 = Y2(P2v);

  const gainPoly = [`${D2.cL},${yP2}`,`${xQ2},${yP2}`,`${xQ2},${yP1}`,`${D2.cL},${yP1}`].join(" ");
  const lostPoly = [`${xQ2},${yP1}`,`${xQ1},${yP1}`,`${xQ1},${D2.cB}`,`${xQ2},${D2.cB}`].join(" ");

  return (
    <div style={{ background: NAVY, borderRadius:"10px", padding:"4px", maxWidth:"100%",
      fontFamily:"'Segoe UI', Arial, sans-serif", border:"1px solid rgba(255,255,255,0.10)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:"block" }}>
        <defs>
          <marker id="aR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={AX}/></marker>
          <marker id="aU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto">
            <polygon points="0 9,3.5 0,7 9" fill={AX}/></marker>
          <marker id="amU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto">
            <polygon points="0 9,3.5 0,7 9" fill={AMBER}/></marker>
          <marker id="amD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse">
            <polygon points="0 9,3.5 0,7 9" fill={AMBER}/></marker>
          <marker id="wArr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill={WHITE}/></marker>
        </defs>

        <rect width={W} height={H} fill={NAVY}/>

        {/* ════════════════════════════════════════════
            DIAGRAM 1 — Profit-Maximising Monopolist
            ════════════════════════════════════════════ */}

        {/* Section header */}
        <rect x={0} y={0} width={W} height={36} rx="6" fill="rgba(74,144,232,0.18)"/>
        <text x={W/2} y={24} textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLUE}>
          Diagram 1 — Profit-Maximising Monopolist &amp; PED Regions
        </text>

        {/* Title lines */}
        <text x={W/2} y={54}  textAnchor="middle" fontSize="13" fill={AX}>The profit maximising monopolist</text>
        <text x={W/2} y={70}  textAnchor="middle" fontSize="13" fill={AX}>produces in the elastic range of the demand (AR) curve</text>

        {/* Profit shading */}
        <polygon points={profitPoly} fill="rgba(232,124,24,0.60)"/>

        {/* Dashed guides D1 */}
        <line x1={D1.cL} y1={Y1(Pstar)} x2={X1(Qstar)} y2={Y1(Pstar)}
          stroke="rgba(200,220,200,0.38)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1={X1(Qstar)} y1={Y1(Pstar)} x2={X1(Qstar)} y2={D1.cB}
          stroke="rgba(200,220,200,0.38)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1={X1(Qa)} y1={Y1(Pa)} x2={X1(Qa)} y2={D1.cB}
          stroke="rgba(200,220,200,0.25)" strokeWidth="1.2" strokeDasharray={DASH}/>

        {/* ATC */}
        <polyline points={pts1(atc,0.36,8.8)} fill="none" stroke={TEAL} strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X1(8.5)+6} y={Y1(atc(8.5))+5} fontSize="13" fontWeight="bold" fill={TEAL}>ATC</text>

        {/* MC */}
        <polyline points={pts1(mc,0.2,7.8)} fill="none" stroke={RED} strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X1(7.6)} y={Y1(mc(7.6))-12} fontSize="13" fontWeight="bold" fill={RED}>MC</text>

        {/* AR = Demand */}
        <line x1={X1(0)} y1={Y1(ar(0))} x2={X1(8.9)} y2={Y1(ar(8.9))}
          stroke={DARKRED} strokeWidth="3" strokeLinecap="round"/>
        <text x={X1(8.8)+6} y={Y1(ar(8.8))+6} fontSize="12.5" fontWeight="bold" fill={DARKRED}>Demand = AR</text>

        {/* MR */}
        <line x1={X1(0)} y1={Y1(mr(0))} x2={X1(6.5)} y2={Y1(mr(6.5))}
          stroke={BLUE} strokeWidth="2.8" strokeLinecap="round"/>
        <text x={X1(6.6)} y={Y1(mr(6.5))+18} fontSize="13" fontWeight="bold" fill={BLUE}>MR</text>

        {/* Point A */}
        <circle cx={X1(Qa)} cy={Y1(Pa)} r="9"  fill={BLUE} stroke={WHITE} strokeWidth="2"/>
        <circle cx={X1(Qa)} cy={Y1(Pa)} r="3.5" fill={WHITE}/>
        <text x={X1(Qa)-22} y={Y1(Pa)-12} fontSize="13.5" fontWeight="bold" fill={WHITE}>A</text>

        {/* Circle at Q^D on x-axis */}
        <circle cx={X1(Qa)} cy={D1.cB} r="6" fill={NAVY} stroke={BLUE} strokeWidth="2"/>

        {/* Profit-max dot */}
        <circle cx={X1(Qstar)} cy={Y1(Pstar)} r="6" fill={WHITE} stroke={ORANGE} strokeWidth="2.2"/>

        {/* PED labels */}
        <rect x={X1(1.1)} y={Y1(11.8)-18} width={82} height={26} rx="4" fill="rgba(232,124,24,0.82)"/>
        <text x={X1(1.1)+41} y={Y1(11.8)+3} textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>PED &gt; 1</text>

        <rect x={X1(4.5)} y={Y1(7.6)-18} width={72} height={26} rx="4" fill="rgba(232,124,24,0.82)"/>
        <text x={X1(4.5)+36} y={Y1(7.6)+3} textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>PED = 1</text>
        <line x1={X1(4.5)+72} y1={Y1(7.6)-5} x2={X1(Qa)-12} y2={Y1(Pa)+2}
          stroke={WHITE} strokeWidth="1.3" markerEnd="url(#wArr)"/>

        <text x={X1(7.4)} y={Y1(3.8)} fontSize="13" fontWeight="bold" fill={WHITE}>PED &lt; 1</text>

        {/* Price label */}
        <text x={D1.cL-10} y={Y1(Pstar)+5} textAnchor="end" fontSize="13.5" fontWeight="bold" fill={AX}>P</text>

        {/* Axes D1 */}
        <line x1={D1.cL} y1={D1.cB+16} x2={D1.cL} y2={D1.cT-14} stroke={AX} strokeWidth="2" markerEnd="url(#aU)"/>
        <line x1={D1.cL} y1={D1.cB} x2={D1.cR+22} y2={D1.cB} stroke={AX} strokeWidth="2" markerEnd="url(#aR)"/>
        <text x={D1.cL-6} y={D1.cT-20} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Costs /</text>
        <text x={D1.cL-6} y={D1.cT-6}  textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Revenue</text>
        <text x={D1.cR+28} y={D1.cB+8} fontSize="13.5" fontWeight="bold" fill={AX}>Output</text>
        <text x={D1.cL-16} y={D1.cB+20} fontSize="13" fill={AX}>O</text>
        <text x={X1(Qstar)} y={D1.cB+20} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={AX}>Q</text>
        <text x={X1(Qa)}    y={D1.cB+34} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={AX}>Q<tspan fontSize="10" dy="-3">D</tspan></text>

        {/* ── DIVIDER ── */}
        <line x1={24} y1={H1+GAP/2} x2={W-24} y2={H1+GAP/2}
          stroke="rgba(74,144,232,0.30)" strokeWidth="1.5"/>
        <text x={W/2} y={H1+GAP/2+14} textAnchor="middle" fontSize="12" fill="rgba(200,214,232,0.45)">
          ── ── ──
        </text>

        {/* ════════════════════════════════════════════
            DIAGRAM 2 — Petrol PED Revenue Impact
            ════════════════════════════════════════════ */}

        {/* Section header */}
        <rect x={0} y={OY} width={W} height={36} rx="6" fill="rgba(46,204,113,0.15)"/>
        <text x={W/2} y={OY+24} textAnchor="middle" fontSize="14" fontWeight="bold" fill={GREEN}>
          Diagram 2 — Petrol: Price Inelastic Demand &amp; Revenue Impact
        </text>

        {/* Title lines */}
        <text x={W/2} y={OY+54} textAnchor="middle" fontSize="13" fill={AX}>Petrol: Price Inelastic Demand (PED &lt; 1)</text>
        <text x={W/2} y={OY+70} textAnchor="middle" fontSize="13" fill={AX}>A 10% price rise — few substitutes → small fall in quantity</text>

        {/* Revenue Lost */}
        <polygon points={lostPoly} fill="rgba(232,64,64,0.55)"/>
        {/* Revenue Gained */}
        <polygon points={gainPoly} fill="rgba(46,204,113,0.58)"/>

        {/* Demand curve (steep) */}
        <line x1={X2(0)} y1={Y2(dem(0))} x2={X2(8.5)} y2={Y2(dem(8.5))}
          stroke={DARKRED} strokeWidth="3" strokeLinecap="round"/>
        <text x={X2(8.5)+6} y={Y2(dem(8.5))+5} fontSize="12.5" fontWeight="bold" fill={DARKRED}>Demand</text>

        {/* PED<1 label box */}
        <rect x={X2(6.8)-4} y={Y2(dem(6.8))-30} width={70} height={24} rx="4" fill="rgba(232,64,64,0.82)"/>
        <text x={X2(6.8)+31} y={Y2(dem(6.8))-12} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={WHITE}>PED &lt; 1</text>

        {/* Dashed guides D2 */}
        <line x1={D2.cL} y1={yP2} x2={xQ2} y2={yP2}
          stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1={D2.cL} y1={yP1} x2={xQ1} y2={yP1}
          stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1={xQ2} y1={yP2} x2={xQ2} y2={D2.cB}
          stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1={xQ1} y1={yP1} x2={xQ1} y2={D2.cB}
          stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>

        {/* Price-rise arrow on y-axis */}
        <line x1={D2.cL-22} y1={yP1-3} x2={D2.cL-22} y2={yP2+3}
          stroke={AMBER} strokeWidth="2.2" markerEnd="url(#amU)" markerStart="url(#amD)"/>
        <text x={D2.cL-38} y={(yP1+yP2)/2+5}
          textAnchor="middle" fontSize="11" fontWeight="bold" fill={AMBER}>+10%</text>

        {/* Dots */}
        <circle cx={xQ1} cy={yP1} r="8" fill={NAVY} stroke={AMBER} strokeWidth="2.2"/>
        <circle cx={xQ1} cy={yP1} r="3.5" fill={AMBER}/>
        <circle cx={xQ2} cy={yP2} r="8" fill={NAVY} stroke={WHITE} strokeWidth="2.2"/>
        <circle cx={xQ2} cy={yP2} r="3.5" fill={WHITE}/>

        {/* In-region labels */}
        <text x={(D2.cL+xQ2)/2} y={(yP2+yP1)/2-6}  textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Revenue</text>
        <text x={(D2.cL+xQ2)/2} y={(yP2+yP1)/2+12} textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Gained</text>
        <text x={(xQ2+xQ1)/2} y={(yP1+D2.cB)/2-6}  textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Revenue</text>
        <text x={(xQ2+xQ1)/2} y={(yP1+D2.cB)/2+12} textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Lost</text>

        {/* Net effect banner */}
        <rect x={D2.cL+8} y={D2.cT-18} width={380} height={26} rx="5"
          fill="rgba(46,204,113,0.18)" stroke={GREEN} strokeWidth="1.2"/>
        <text x={D2.cL+198} y={D2.cT+1} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={GREEN}>
          Net Effect: Total Revenue INCREASES (Gained &gt; Lost)
        </text>

        {/* Price / Qty labels */}
        <text x={D2.cL-10} y={yP2+5} textAnchor="end" fontSize="13.5" fontWeight="bold" fill={WHITE}>P₂</text>
        <text x={D2.cL-10} y={yP1+5} textAnchor="end" fontSize="13.5" fontWeight="bold" fill={AMBER}>P₁</text>
        <text x={xQ2} y={D2.cB+20} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={WHITE}>Q₂</text>
        <text x={xQ1} y={D2.cB+20} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={AMBER}>Q₁</text>

        {/* Axes D2 */}
        <line x1={D2.cL} y1={D2.cB+16} x2={D2.cL} y2={D2.cT-14} stroke={AX} strokeWidth="2" markerEnd="url(#aU)"/>
        <line x1={D2.cL} y1={D2.cB} x2={D2.cR+22} y2={D2.cB} stroke={AX} strokeWidth="2" markerEnd="url(#aR)"/>
        <text x={D2.cL-6} y={D2.cT-20} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Costs /</text>
        <text x={D2.cL-6} y={D2.cT-5}  textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Revenue</text>
        <text x={D2.cR+28} y={D2.cB+8} fontSize="13.5" fontWeight="bold" fill={AX}>Output</text>
        <text x={D2.cL-16} y={D2.cB+20} fontSize="13" fill={AX}>O</text>

        {/* Legend D2 */}
        <rect x={16}  y={D2.cB+38} width={16} height={16} rx="3" fill="rgba(46,204,113,0.60)" stroke={GREEN} strokeWidth="1"/>
        <text x={38}  y={D2.cB+51} fontSize="12" fill={AX}>Revenue Gained</text>
        <rect x={172} y={D2.cB+38} width={16} height={16} rx="3" fill="rgba(232,64,64,0.60)" stroke={RED} strokeWidth="1"/>
        <text x={194} y={D2.cB+51} fontSize="12" fill={AX}>Revenue Lost</text>
        <circle cx={354} cy={D2.cB+46} r="5" fill={AMBER}/>
        <text x={364} y={D2.cB+51} fontSize="12" fill={AX}>Before (P₁, Q₁)</text>
        <circle cx={488} cy={D2.cB+46} r="5" fill={WHITE}/>
        <text x={498} y={D2.cB+51} fontSize="12" fill={AX}>After (P₂, Q₂)</text>

      </svg>
    </div>
  );
}
