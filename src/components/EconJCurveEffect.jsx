export default function EconJCurveEffect() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Inter','Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 460" width="100%" style={{display:'block'}}>
        <rect width="620" height="460" fill="#ffffff"/>
        <text x="310" y="28" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">The J-Curve · Current Account after Sterling Depreciation (2022)</text>
        <line x1="90" y1="240" x2="570" y2="240" stroke="#0f172a" strokeWidth="2"/>
        <line x1="90" y1="60" x2="90" y2="400" stroke="#0f172a" strokeWidth="2"/>
        <text x="560" y="258" fontSize="12" fill="#0f172a">Time</text>
        <text x="52" y="55" fontSize="12" fill="#0f172a">Current</text>
        <text x="52" y="69" fontSize="12" fill="#0f172a">Account</text>
        <text x="98" y="80" fontSize="11" fill="#15803d" fontWeight="600">Surplus (+)</text>
        <text x="98" y="395" fontSize="11" fontWeight="600" fill="#be123c">Deficit (−)</text>
        <text x="76" y="244" textAnchor="end" fontSize="11" fill="#0f172a">0</text>
        <line x1="160" y1="60" x2="160" y2="400" stroke="#7c3aed" strokeDasharray="5,4" strokeWidth="1.5"/>
        <text x="163" y="75" fontSize="11" fontWeight="700" fill="#7c3aed">Depreciation</text>
        <text x="163" y="88" fontSize="11" fill="#7c3aed">(£ falls)</text>
        <path d="M 100 260 L 160 260 C 200 260 220 340 240 340 C 280 340 320 260 360 230 C 420 190 480 160 540 140" fill="none" stroke="#0284c7" strokeWidth="3"/>
        <circle cx="160" cy="260" r="4" fill="#0f172a"/>
        <text x="130" y="275" fontSize="10" fill="#0f172a">Initial CA</text>
        <circle cx="240" cy="340" r="5" fill="#be123c"/>
        <text x="200" y="365" fontSize="10" fontWeight="700" fill="#be123c">Short-run trough</text>
        <text x="200" y="378" fontSize="10" fill="#be123c">(deficit widens)</text>
        <circle cx="360" cy="230" r="4" fill="#0f172a"/>
        <text x="335" y="218" fontSize="10" fill="#0f172a">Back to start</text>
        <circle cx="540" cy="140" r="5" fill="#15803d"/>
        <text x="460" y="135" fontSize="10" fontWeight="700" fill="#15803d">Long-run improvement</text>
        <text x="460" y="148" fontSize="10" fill="#15803d">(Marshall-Lerner holds)</text>
        <text x="200" y="415" textAnchor="middle" fontSize="11" fontWeight="600" fill="#be123c">Short run</text>
        <text x="200" y="430" textAnchor="middle" fontSize="10" fill="#475569">{"inelastic PEDx + PEDm < 1"}</text>
        <text x="450" y="415" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">Long run</text>
        <text x="450" y="430" textAnchor="middle" fontSize="10" fill="#475569">{"elastic PEDx + PEDm > 1"}</text>
        <text x="310" y="105" textAnchor="middle" fontSize="11" fill="#334155">Trade balance first worsens, then improves · tracing the shape of a "J".</text>
      </svg>
    </div>
  );
}