export default function EconEdexcelPhillipsCurve() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Inter','Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 470" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#15803d"/></marker>
        </defs>
        <rect width="620" height="470" fill="#ffffff"/>
        <text x="310" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">Short Run vs Long Run Phillips Curve</text>
        <line x1="90" y1="400" x2="580" y2="400" stroke="#0f172a" strokeWidth="2"/>
        <line x1="90" y1="50" x2="90" y2="400" stroke="#0f172a" strokeWidth="2"/>
        <text x="560" y="420" fontSize="12" fill="#0f172a">Unemployment (%)</text>
        <text x="60" y="45" fontSize="12" fill="#0f172a">Inflation (%)</text>
        <line x1="380" y1="60" x2="380" y2="400" stroke="#7c3aed" strokeWidth="3"/>
        <text x="385" y="70" fontSize="12" fontWeight="700" fill="#7c3aed">LRPC</text>
        <text x="385" y="415" fontSize="11" fontWeight="700" fill="#7c3aed">NRU</text>
        <path d="M 140 200 Q 260 260 380 300 Q 480 330 560 360" fill="none" stroke="#0284c7" strokeWidth="2.5"/>
        <text x="560" y="355" fontSize="12" fontWeight="600" fill="#0284c7">SRPC₁ (πᵉ = π₁)</text>
        <path d="M 140 120 Q 260 180 380 220 Q 480 250 560 280" fill="none" stroke="#be123c" strokeWidth="2.5"/>
        <text x="560" y="275" fontSize="12" fontWeight="600" fill="#be123c">SRPC₂ (πᵉ = π₂)</text>
        <circle cx="380" cy="300" r="5" fill="#0f172a"/>
        <text x="388" y="296" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
        <line x1="90" y1="300" x2="380" y2="300" stroke="#64748b" strokeDasharray="3,3" strokeWidth="1"/>
        <text x="66" y="304" fontSize="11" fill="#0f172a">π₁</text>
        <circle cx="300" cy="260" r="5" fill="#be123c"/>
        <text x="282" y="255" fontSize="12" fontWeight="700" fill="#be123c">B</text>
        <line x1="300" y1="260" x2="300" y2="400" stroke="#64748b" strokeDasharray="3,3" strokeWidth="1"/>
        <text x="294" y="415" fontSize="11" fill="#0f172a">U₁</text>
        <circle cx="380" cy="220" r="5" fill="#0f172a"/>
        <text x="388" y="216" fontSize="12" fontWeight="700" fill="#0f172a">C</text>
        <line x1="90" y1="220" x2="380" y2="220" stroke="#64748b" strokeDasharray="3,3" strokeWidth="1"/>
        <text x="66" y="224" fontSize="11" fill="#0f172a">π₂</text>
        <path d="M 375 298 Q 340 280 305 262" fill="none" stroke="#15803d" strokeWidth="2" markerEnd="url(#ar)"/>
        <path d="M 305 258 Q 345 235 376 222" fill="none" stroke="#15803d" strokeWidth="2" markerEnd="url(#ar)"/>
        <text x="310" y="445" textAnchor="middle" fontSize="11" fill="#334155">Expansionary policy moves A → B along SRPC₁. Expectations adjust, shifting SRPC₁ → SRPC₂, returning to NRU at C.</text>
        <text x="310" y="460" textAnchor="middle" fontSize="11" fill="#334155">Long run: unemployment = NRU, inflation permanently higher. LRPC is vertical.</text>
      </svg>
    </div>
  );
}