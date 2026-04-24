export default function EconMaxPriceCeiling() {
  // Geometry: S rises from (140, 540) to (760, 100); D falls from (140, 100) to (760, 540).
  // They intersect at the midpoint (450, 320) — equilibrium (Pe, Qe).
  // Price ceiling drawn at y=420 (below Pe).
  //   On S: y=420 → x = 140 + (760-140) * (540-420)/(540-100) = 140 + 620*120/440 ≈ 309 → Qs
  //   On D: y=420 → x = 140 + (760-140) * (420-100)/(540-100) = 140 + 620*320/440 ≈ 591 → Qd
  // Welfare loss triangle: vertices at equilibrium (450,320), (Qs on S = 309,420), (Qs on D = 309, ?).
  //   D at x=309 → y = 100 + (540-100) * (309-140)/(760-140) = 100 + 440*169/620 ≈ 220
  //   So DWL triangle: (309, 220) on D, (309, 420) on S, (450, 320) at equilibrium.
  const Pe_y = 320;
  const Qe_x = 450;
  const Pc_y = 420;
  const Qs_x = 309;
  const Qd_x = 591;
  const Ds_at_Qs_y = 220;

  return (
    <div style={{background:'#0d1b2e',borderRadius:'10px',padding:'4px',maxWidth:'720px',margin:'0 auto',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <div style={{padding:'10px 14px 4px'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.5px',color:'#818cf8'}}>MAXIMUM PRICE (PRICE CEILING)</div>
        <div style={{fontSize:'12px',color:'#c8d6e8',marginTop:2}}>Pc set below Pe → excess demand (shortage) and welfare loss</div>
      </div>
      <svg viewBox="0 0 900 650" width="100%" style={{display:'block', background:'transparent', fontFamily:'sans-serif'}}>
        <defs>
          <pattern id="mpcDotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" fill="#cbd5e1" opacity="0.15"/>
          </pattern>
          <marker id="mpcArrowL" markerWidth="9" markerHeight="9" refX="1" refY="4" orient="auto">
            <polygon points="9,0 0,4 9,8" fill="#facc15"/>
          </marker>
          <marker id="mpcArrowR" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto">
            <polygon points="0,0 9,4 0,8" fill="#facc15"/>
          </marker>
        </defs>
        <rect width="900" height="650" fill="url(#mpcDotGrid)"/>

        {/* Axes */}
        <line x1="120" y1="80" x2="120" y2="580" stroke="#cbd5e1" strokeWidth="2"/>
        <polygon points="120,75 115,85 125,85" fill="#cbd5e1"/>
        <line x1="120" y1="580" x2="820" y2="580" stroke="#cbd5e1" strokeWidth="2"/>
        <polygon points="825,580 815,575 815,585" fill="#cbd5e1"/>
        <text x="75" y="330" fontSize="14" fill="#cbd5e1" transform="rotate(-90, 75, 330)" textAnchor="middle">Price</text>
        <text x="760" y="608" fontSize="14" fill="#cbd5e1">Quantity</text>
        <text x="104" y="600" fontSize="14" fill="#cbd5e1">O</text>

        {/* Supply (blue, upward) */}
        <line x1="140" y1="540" x2="760" y2="100" stroke="#3b82f6" strokeWidth="3"/>
        <text x="770" y="100" fontSize="16" fontWeight="700" fill="#3b82f6">S</text>

        {/* Demand (red, downward) */}
        <line x1="140" y1="100" x2="760" y2="540" stroke="#ef4444" strokeWidth="3"/>
        <text x="770" y="544" fontSize="16" fontWeight="700" fill="#ef4444">D</text>

        {/* Welfare loss triangle (green) */}
        <polygon
          points={`${Qe_x},${Pe_y} ${Qs_x},${Pc_y} ${Qs_x},${Ds_at_Qs_y}`}
          fill="#10b981"
          fillOpacity="0.55"
          stroke="#10b981"
          strokeWidth="1.5"
        />
        <rect x={Qs_x + 18} y="298" width="92" height="22" rx="4" fill="#0d1b2e" stroke="#10b981" strokeWidth="1"/>
        <text x={Qs_x + 64} y="313" fontSize="11" fontWeight="700" fill="#e2e8f0" textAnchor="middle">Welfare Loss</text>

        {/* Equilibrium dot */}
        <circle cx={Qe_x} cy={Pe_y} r="6" fill="#0d1b2e" stroke="#10b981" strokeWidth="2.5"/>
        <text x={Qe_x + 10} y={Pe_y - 8} fontSize="13" fontWeight="700" fill="#10b981">e</text>

        {/* Pe dashed lines */}
        <line x1="120" y1={Pe_y} x2={Qe_x} y2={Pe_y} stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="6,5" opacity="0.85"/>
        <line x1={Qe_x} y1={Pe_y} x2={Qe_x} y2="580" stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="6,5" opacity="0.85"/>
        <text x="108" y={Pe_y + 5} fontSize="13" fontWeight="700" fill="#cbd5e1" textAnchor="end">Pe</text>
        <text x={Qe_x} y="600" fontSize="13" fontWeight="700" fill="#cbd5e1" textAnchor="middle">Qe</text>

        {/* Maximum price ceiling line (white solid, full width) */}
        <line x1="120" y1={Pc_y} x2="820" y2={Pc_y} stroke="#f8fafc" strokeWidth="2"/>
        <text x="108" y={Pc_y + 5} fontSize="13" fontWeight="700" fill="#f8fafc" textAnchor="end">Pc</text>

        {/* Qs dashed */}
        <line x1={Qs_x} y1={Pc_y} x2={Qs_x} y2="580" stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="6,5" opacity="0.85"/>
        <text x={Qs_x} y="600" fontSize="13" fontWeight="700" fill="#3b82f6" textAnchor="middle">Qs</text>

        {/* Qd dashed */}
        <line x1={Qd_x} y1={Pc_y} x2={Qd_x} y2="580" stroke="#cbd5e1" strokeWidth="1.3" strokeDasharray="6,5" opacity="0.85"/>
        <text x={Qd_x} y="600" fontSize="13" fontWeight="700" fill="#ef4444" textAnchor="middle">Qd</text>

        {/* Excess demand bracket (yellow) */}
        <line
          x1={Qs_x} y1={Pc_y + 38}
          x2={Qd_x} y2={Pc_y + 38}
          stroke="#facc15" strokeWidth="2"
          markerStart="url(#mpcArrowL)" markerEnd="url(#mpcArrowR)"
        />
        <rect x={(Qs_x + Qd_x) / 2 - 56} y={Pc_y + 48} width="112" height="22" rx="4" fill="#0d1b2e" stroke="#facc15" strokeWidth="1"/>
        <text x={(Qs_x + Qd_x) / 2} y={Pc_y + 63} fontSize="12" fontWeight="700" fill="#facc15" textAnchor="middle">Excess demand</text>
      </svg>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',padding:'8px 14px 12px',justifyContent:'center'}}>
        <span style={{fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'9999px',border:'1px solid rgba(239,68,68,0.45)',color:'#fca5a5',background:'rgba(239,68,68,0.10)'}}>● Supply (S)</span>
        <span style={{fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'9999px',border:'1px solid rgba(59,130,246,0.45)',color:'#93c5fd',background:'rgba(59,130,246,0.10)'}}>● Demand (D)</span>
        <span style={{fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'9999px',border:'1px solid rgba(250,204,21,0.45)',color:'#fde68a',background:'rgba(250,204,21,0.10)'}}>● Excess demand</span>
        <span style={{fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'9999px',border:'1px solid rgba(16,185,129,0.45)',color:'#6ee7b7',background:'rgba(16,185,129,0.10)'}}>● Welfare loss</span>
      </div>
    </div>
  );
}
