export default function EconNegExtUKEnergy() {
  return (
    <div style={{background:'#0d1b2e',borderRadius:'10px',padding:'4px',maxWidth:'720px',margin:'0 auto',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <div style={{padding:'10px 14px 4px'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'1.5px',color:'#818cf8'}}>NEGATIVE EXTERNALITY OF PRODUCTION</div>
        <div style={{fontSize:'12px',color:'#c8d6e8',marginTop:2}}>UK Energy Sector — MSC parallel to MPC; constant marginal external cost</div>
      </div>
      <svg viewBox="0 0 900 650" width="100%" style={{display:'block', background:'transparent', fontFamily:'sans-serif'}}>
        <defs>
          <pattern id="negExtDotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" fill="#cbd5e1" opacity="0.15"/>
          </pattern>
          <marker id="negExtArrowUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0,4 4,0 8,4" fill="#a855f7"/>
          </marker>
          <marker id="negExtArrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0,0 8,0 4,4" fill="#a855f7"/>
          </marker>
        </defs>
        <rect width="900" height="650" fill="url(#negExtDotGrid)"/>

        {/* Y-axis */}
        <line x1="120" y1="80" x2="120" y2="560" stroke="#cbd5e1" strokeWidth="2"/>
        <polygon points="120,75 115,85 125,85" fill="#cbd5e1"/>

        {/* X-axis */}
        <line x1="120" y1="560" x2="820" y2="560" stroke="#cbd5e1" strokeWidth="2"/>
        <polygon points="825,560 815,555 815,565" fill="#cbd5e1"/>

        {/* Axis labels */}
        <text x="75" y="320" fontSize="14" fill="#cbd5e1" transform="rotate(-90, 75, 320)" textAnchor="middle">Price, Costs, Benefits</text>
        <text x="750" y="595" fontSize="14" fill="#cbd5e1">Quantity</text>
        <text x="104" y="580" fontSize="14" fill="#cbd5e1">0</text>

        {/* MPC (red, rising) */}
        <line x1="140" y1="500" x2="780" y2="160" stroke="#ef4444" strokeWidth="3"/>
        <text x="790" y="155" fontSize="16" fontWeight="700" fill="#ef4444">MPC</text>

        {/* MSC (blue, parallel to MPC, +80 above) */}
        <line x1="140" y1="420" x2="780" y2="80" stroke="#3b82f6" strokeWidth="3"/>
        <text x="790" y="85" fontSize="16" fontWeight="700" fill="#3b82f6">MSC</text>

        {/* MPB = MSB (green, downward) */}
        <line x1="140" y1="160" x2="780" y2="500" stroke="#10b981" strokeWidth="3"/>
        <text x="790" y="510" fontSize="16" fontWeight="700" fill="#10b981">MPB = MSB</text>

        {/* Welfare loss triangle: Q* (385,290), Q1 on MPB (460,330), Q1 on MSC (460,250) */}
        <polygon points="385,290 460,330 460,250" fill="#f59e0b" fillOpacity="0.35" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="478" y="288" fontSize="13" fontWeight="600" fill="#fbbf24">Welfare Loss</text>

        {/* Guide lines for Q* */}
        <line x1="385" y1="290" x2="385" y2="560" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="385" y1="290" x2="120" y2="290" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>

        {/* Guide lines for Q1 */}
        <line x1="460" y1="330" x2="460" y2="560" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="460" y1="330" x2="120" y2="330" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4"/>

        {/* Equilibrium markers */}
        <circle cx="385" cy="290" r="6" fill="#10b981" stroke="#fff" strokeWidth="2"/>
        <circle cx="460" cy="330" r="6" fill="#ef4444" stroke="#fff" strokeWidth="2"/>

        {/* Q and P labels */}
        <text x="375" y="582" fontSize="13" fontWeight="600" fill="#10b981">Q*</text>
        <text x="452" y="582" fontSize="13" fontWeight="600" fill="#ef4444">Q₁</text>
        <text x="96" y="295" fontSize="13" fontWeight="600" fill="#10b981">P*</text>
        <text x="96" y="335" fontSize="13" fontWeight="600" fill="#ef4444">P₁</text>

        {/* External cost annotation */}
        <line x1="600" y1="245" x2="600" y2="165" stroke="#a855f7" strokeWidth="1.5" markerStart="url(#negExtArrowUp)" markerEnd="url(#negExtArrowDown)"/>
        <text x="610" y="210" fontSize="12" fontWeight="600" fill="#a855f7">External cost</text>
        <text x="610" y="226" fontSize="11" fontStyle="italic" fill="#a855f7">(MSC − MPC)</text>
      </svg>
    </div>
  );
}
