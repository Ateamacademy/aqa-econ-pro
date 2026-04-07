export default function EconFiscalPolicyAD() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'600px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 600 520" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="fpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="fpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="600" height="520" fill="#fff"/>
        <text x="300" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Figure: Aggregate Demand and Fiscal Policy</text>
        <line x1="72" y1="450" x2="72" y2="46" stroke="#111" strokeWidth="2.5" markerEnd="url(#fpU)"/>
        <line x1="72" y1="450" x2="540" y2="450" stroke="#111" strokeWidth="2.5" markerEnd="url(#fpR)"/>
        <text x="52" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Inflation</text>
        <text x="52" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">rate, π</text>
        <text x="490" y="472" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Real GDP</text>
        <text x="490" y="488" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">growth rate</text>
        <text x="72" y="464" textAnchor="middle" fontSize="11" fill="#111">0</text>
        <text x="170" y="464" textAnchor="middle" fontSize="11" fill="#111">1%</text>
        <text x="248" y="464" textAnchor="middle" fontSize="11" fill="#111">2%</text>
        <text x="326" y="464" textAnchor="middle" fontSize="11" fill="#111">3%</text>
        <text x="420" y="464" textAnchor="middle" fontSize="11" fill="#111">5%</text>
        <text x="63" y="348" textAnchor="end" fontSize="11" fill="#111">4%</text>
        <text x="63" y="298" textAnchor="end" fontSize="11" fill="#111">5%</text>
        <text x="63" y="228" textAnchor="end" fontSize="11" fill="#111">7%</text>
        <text x="63" y="158" textAnchor="end" fontSize="11" fill="#111">10%</text>
        <line x1="67" y1="348" x2="77" y2="348" stroke="#111" strokeWidth="1"/>
        <line x1="67" y1="298" x2="77" y2="298" stroke="#111" strokeWidth="1"/>
        <line x1="67" y1="228" x2="77" y2="228" stroke="#111" strokeWidth="1"/>
        <line x1="67" y1="158" x2="77" y2="158" stroke="#111" strokeWidth="1"/>
        <line x1="170" y1="445" x2="170" y2="455" stroke="#111" strokeWidth="1"/>
        <line x1="248" y1="445" x2="248" y2="455" stroke="#111" strokeWidth="1"/>
        <line x1="326" y1="445" x2="326" y2="455" stroke="#111" strokeWidth="1"/>
        <line x1="420" y1="445" x2="420" y2="455" stroke="#111" strokeWidth="1"/>
        <line x1="326" y1="450" x2="326" y2="54" stroke="#111" strokeWidth="2.2"/>
        <path d="M 92 370 Q 200 320 300 250 Q 380 190 440 130" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="444" y="125" fontSize="11" fontWeight="bold" fill="#111">Short-run</text>
        <text x="444" y="139" fontSize="11" fontWeight="bold" fill="#111">aggregate supply</text>
        <path d="M 290 420 Q 340 340 390 270 Q 430 210 470 160" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
        <text x="474" y="155" fontSize="11" fontWeight="bold" fill="#111">AD3</text>
        <path d="M 170 420 Q 230 340 290 270 Q 340 200 390 150" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
        <text x="394" y="145" fontSize="11" fontWeight="bold" fill="#111">AD0</text>
        <path d="M 110 420 Q 170 340 240 270 Q 300 210 360 158" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
        <text x="364" y="153" fontSize="11" fontWeight="bold" fill="#111">AD1</text>
        <path d="M 200 420 Q 260 340 320 260 Q 370 195 420 148" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
        <text x="424" y="143" fontSize="11" fontWeight="bold" fill="#111">AD2</text>
        <line x1="72" y1="158" x2="420" y2="158" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="420" y1="158" x2="420" y2="450" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="72" y1="228" x2="326" y2="228" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="326" y1="228" x2="326" y2="450" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="72" y1="298" x2="248" y2="298" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="248" y1="298" x2="248" y2="450" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="72" y1="348" x2="170" y2="348" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <line x1="170" y1="348" x2="170" y2="450" stroke="#111" strokeWidth="1" strokeDasharray="5,4"/>
        <circle cx="420" cy="158" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="428" y="154" fontSize="12" fontWeight="bold" fill="#111">W</text>
        <circle cx="326" cy="228" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="334" y="224" fontSize="12" fontWeight="bold" fill="#111">X</text>
        <circle cx="248" cy="298" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="234" y="294" fontSize="12" fontWeight="bold" fill="#111">Z</text>
        <circle cx="170" cy="348" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="156" y="344" fontSize="12" fontWeight="bold" fill="#111">Y</text>
      </svg>
    </div>
  );
}