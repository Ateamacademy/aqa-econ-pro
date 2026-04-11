export default function EconTermsOfTradeUK() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'660px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 660 580" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="totR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="totU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="totRedD" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc2222"/></marker>
          <marker id="totRedL" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="660" height="580" fill="#fff"/>
        <text x="330" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Terms of Trade — UK Energy Price Shock</text>
        <text x="330" y="48" textAnchor="middle" fontSize="12" fill="#555">Rising global energy prices increase UK import prices → ToT deteriorates</text>
        <line x1="90" y1="460" x2="90" y2="72" stroke="#111" strokeWidth="2.5" markerEnd="url(#totU)"/>
        <line x1="90" y1="460" x2="600" y2="460" stroke="#111" strokeWidth="2.5" markerEnd="url(#totR)"/>
        <text x="82" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Price</text>
        <text x="82" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Index</text>
        <text x="570" y="480" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <line x1="90" y1="110" x2="560" y2="460" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round"/>
        <text x="564" y="464" fontSize="13" fontWeight="bold" fill="#2255cc">D (exports)</text>
        <line x1="90" y1="460" x2="560" y2="110" stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>
        <text x="562" y="108" fontSize="12" fontWeight="bold" fill="#111">S1 (imports)</text>
        <line x1="90" y1="390" x2="560" y2="40" stroke="#cc2222" strokeWidth="2.8" strokeDasharray="none" strokeLinecap="round"/>
        <text x="562" y="38" fontSize="12" fontWeight="bold" fill="#cc2222">S2 (imports</text>
        <text x="562" y="52" fontSize="12" fill="#cc2222">after shock)</text>
        <line x1="490" y1="40" x2="440" y2="40" stroke="#cc2222" strokeWidth="2" markerEnd="url(#totRedD)"/>
        <text x="498" y="36" fontSize="11" fontWeight="bold" fill="#cc2222">Supply of</text>
        <text x="498" y="50" fontSize="11" fill="#cc2222">imports falls</text>
        <circle cx="325" cy="285" r="7" fill="#111"/>
        <text x="337" y="281" fontSize="13" fontWeight="bold" fill="#111">E1</text>
        <line x1="90" y1="285" x2="325" y2="285" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="325" y1="285" x2="325" y2="460" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="245" cy="228" r="7" fill="#cc2222"/>
        <text x="257" y="224" fontSize="13" fontWeight="bold" fill="#cc2222">E2</text>
        <line x1="90" y1="228" x2="245" y2="228" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="245" y1="228" x2="245" y2="460" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="80" y="290" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P1</text>
        <text x="80" y="233" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc2222">P2</text>
        <text x="325" y="478" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Q1</text>
        <text x="245" y="478" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc2222">Q2</text>
        <line x1="62" y1="285" x2="62" y2="230" stroke="#cc2222" strokeWidth="2" markerEnd="url(#totU)" markerStart="url(#totRedL)"/>
        <text x="54" y="260" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc2222">Import</text>
        <text x="54" y="273" textAnchor="end" fontSize="10" fill="#cc2222">price rises</text>
        <rect x="90" y="492" width="484" height="72" rx="6" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="102" y="510" fontSize="11" fontWeight="bold" fill="#111">UK Terms of Trade deteriorates:</text>
        <text x="102" y="526" fontSize="11" fill="#333">ToT = (Index of Export Prices / Index of Import Prices) × 100</text>
        <text x="102" y="542" fontSize="11" fill="#333">Rising global gas/oil prices raise import price index → ToT ratio falls.</text>
        <text x="102" y="558" fontSize="11" fill="#555">UK must export more to pay for same quantity of energy imports.</text>
      </svg>
    </div>
  );
}