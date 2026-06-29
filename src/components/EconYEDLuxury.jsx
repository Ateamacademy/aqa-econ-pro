export default function EconYEDLuxury() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'580px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 580 480" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ya1" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ya2" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ya3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#cc2222"/></marker>
          <marker id="ya4" markerWidth="6" markerHeight="8" refX="3" refY="1" orient="auto"><polygon points="0 8,3 0,6 8" fill="#cc2222"/></marker>
        </defs>
        <rect width="580" height="480" fill="#fff"/>
        <text x="290" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">YED · Normal vs Luxury Goods</text>
        <line x1="95" y1="440" x2="95" y2="32" stroke="#111" strokeWidth="2.5" markerEnd="url(#ya2)"/>
        <line x1="95" y1="440" x2="530" y2="440" stroke="#111" strokeWidth="2.5" markerEnd="url(#ya1)"/>
        <text x="44" y="108" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Average</text>
        <text x="44" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Income</text>
        <text x="44" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">£ week</text>
        <text x="488" y="465" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Quantity</text>
        <line x1="108" y1="422" x2="490" y2="72" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
        <text x="430" y="62" fontSize="12" fontWeight="bold" fill="#111">Demand for normal good</text>
        <text x="430" y="78" fontSize="12" fill="#111">YED &gt; 0</text>
        <line x1="62" y1="432" x2="508" y2="192" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
        <text x="418" y="238" fontSize="12" fontWeight="bold" fill="#111">Demand for luxury</text>
        <text x="418" y="254" fontSize="12" fill="#111">YED &gt; 1</text>
        <text x="380" y="348" fontSize="12" fill="#111">(Luxury good is</text>
        <text x="380" y="364" fontSize="12" fill="#111">normal good as well)</text>
        <line x1="95" y1="248" x2="286" y2="248" stroke="#111" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="95" y1="336" x2="286" y2="336" stroke="#111" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="95" y1="384" x2="286" y2="384" stroke="#111" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="286" y1="248" x2="286" y2="440" stroke="#111" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="346" y1="248" x2="346" y2="440" stroke="#111" strokeWidth="1.3" strokeDasharray="5,4"/>
        <text x="88" y="253" textAnchor="end" fontSize="12" fill="#111">700</text>
        <text x="88" y="341" textAnchor="end" fontSize="12" fill="#111">550</text>
        <text x="88" y="389" textAnchor="end" fontSize="12" fill="#111">500</text>
        <text x="286" y="458" textAnchor="middle" fontSize="12" fill="#111">800</text>
        <text x="346" y="458" textAnchor="middle" fontSize="12" fill="#111">900</text>
        <circle cx="286" cy="384" r="7" fill="#cc2222"/>
        <text x="270" y="380" fontSize="12" fontWeight="bold" fill="#111">A</text>
        <circle cx="286" cy="248" r="7" fill="#cc2222"/>
        <text x="270" y="244" fontSize="12" fontWeight="bold" fill="#111">B</text>
        <circle cx="346" cy="336" r="7" fill="#cc2222"/>
        <text x="352" y="332" fontSize="12" fontWeight="bold" fill="#111">C</text>
        <line x1="56" y1="330" x2="56" y2="190" stroke="#cc2222" strokeWidth="3" markerEnd="url(#ya4)"/>
        <line x1="172" y1="470" x2="268" y2="470" stroke="#cc2222" strokeWidth="3" markerEnd="url(#ya3)"/>
      </svg>
    </div>
  );
}