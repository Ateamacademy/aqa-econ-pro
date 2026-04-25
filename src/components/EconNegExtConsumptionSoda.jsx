export default function EconNegExtConsumptionSoda() {
  return (
    <div style={{background:'#0d1b2e',borderRadius:'10px',padding:'4px',maxWidth:'760px',margin:'0 auto',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <div style={{padding:'10px 14px 4px'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.5px',color:'#818cf8'}}>NEGATIVE EXTERNALITY OF CONSUMPTION</div>
        <div style={{fontSize:'12px',color:'#c8d6e8',marginTop:2}}>IB HL/SL — High-sugar soft drinks; MSB lies below MPB by the marginal external cost</div>
      </div>
      <svg viewBox="0 0 760 600" width="100%" role="img" style={{display:'block', background:'transparent'}}>
        <title>Negative externality of consumption — high-sugar soft drinks</title>
        <desc>MPC equals MSC slopes upward; MPB slopes downward; MSB lies parallel below MPB by the marginal external cost. Market equilibrium Qm exceeds social optimum Qopt, creating a deadweight welfare loss triangle.</desc>
        <defs>
          <pattern id="ibSodaHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#fbbf24" strokeWidth="1.2" opacity="0.55"/>
          </pattern>
          <marker id="ibSodaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <pattern id="ibSodaDotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" fill="#cbd5e1" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="760" height="600" fill="url(#ibSodaDotGrid)"/>

        {/* Axes */}
        <line x1="140" y1="540" x2="140" y2="90" stroke="#cbd5e1" strokeWidth="1.5"/>
        <polygon points="140,85 135,95 145,95" fill="#cbd5e1"/>
        <line x1="100" y1="500" x2="700" y2="500" stroke="#cbd5e1" strokeWidth="1.5"/>
        <polygon points="705,500 695,495 695,505" fill="#cbd5e1"/>

        {/* Axis titles */}
        <text x="140" y="78" fontSize="12" fill="#cbd5e1" textAnchor="middle">Price, costs, benefits</text>
        <text x="700" y="522" fontSize="12" fill="#cbd5e1" textAnchor="end">Quantity of soft drinks</text>

        {/* Welfare loss triangle (drawn before curves) */}
        <polygon points="340,360 405,304 405,407" fill="url(#ibSodaHatch)" stroke="#fbbf24" strokeWidth="0.8" strokeOpacity="0.65"/>

        {/* MPC = MSC = S (red, upward) */}
        <line x1="190" y1="480" x2="630" y2="120" stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round"/>
        <text x="636" y="116" fontSize="13" fontWeight="700" fill="#ef4444">MPC = MSC = S</text>

        {/* MPB = D (blue, downward, solid) */}
        <line x1="150" y1="120" x2="640" y2="480" stroke="#60a5fa" strokeWidth="2.6" strokeLinecap="round"/>
        <text x="648" y="488" fontSize="13" fontWeight="700" fill="#60a5fa">MPB = D</text>

        {/* MSB (blue, downward, dashed, parallel 100px below MPB) */}
        <line x1="150" y1="220" x2="490" y2="470" stroke="#60a5fa" strokeWidth="2.6" strokeDasharray="7 5" strokeLinecap="round"/>
        <text x="496" y="464" fontSize="13" fontWeight="700" fill="#60a5fa">MSB</text>

        {/* Market equilibrium (405, 304) */}
        <line x1="405" y1="500" x2="405" y2="304" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="140" y1="304" x2="405" y2="304" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <circle cx="405" cy="304" r="4" fill="#0f172a" stroke="#fff" strokeWidth="1.5"/>
        <text x="132" y="300" fontSize="12" fontWeight="600" fill="#e5e7eb" textAnchor="end">P<tspan dy="3" fontSize="10">m</tspan></text>
        <text x="405" y="520" fontSize="12" fontWeight="600" fill="#e5e7eb" textAnchor="middle">Q<tspan dy="3" fontSize="10">m</tspan></text>

        {/* Social optimum (340, 360) */}
        <line x1="340" y1="500" x2="340" y2="360" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="140" y1="360" x2="340" y2="360" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <circle cx="340" cy="360" r="4" fill="#0f172a" stroke="#fff" strokeWidth="1.5"/>
        <text x="132" y="356" fontSize="12" fontWeight="600" fill="#10b981" textAnchor="end">P<tspan dy="3" fontSize="10">opt</tspan></text>
        <text x="340" y="520" fontSize="12" fontWeight="600" fill="#10b981" textAnchor="middle">Q<tspan dy="3" fontSize="10">opt</tspan></text>

        {/* External cost (MEC) bracket at x=220 between MPB and MSB */}
        <line x1="220" y1="186" x2="220" y2="286" stroke="#a855f7" strokeWidth="1.4" markerStart="url(#ibSodaArrow)" markerEnd="url(#ibSodaArrow)"/>
        <text x="228" y="240" fontSize="12" fill="#a855f7">External cost (MEC)</text>

        {/* Welfare loss callout */}
        <line x1="528" y1="272" x2="408" y2="346" stroke="#fbbf24" strokeWidth="1" markerEnd="url(#ibSodaArrow)"/>
        <text x="532" y="266" fontSize="12" fontWeight="600" fill="#fbbf24">Welfare loss</text>
        <text x="532" y="280" fontSize="11" fill="#cbd5e1">(deadweight loss)</text>

        {/* Caption near MPB */}
        <text x="158" y="138" fontSize="11" fontStyle="italic" fill="#93c5fd">Private benefit overstates social benefit</text>
      </svg>
    </div>
  );
}
