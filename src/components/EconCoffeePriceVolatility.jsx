export default function EconCoffeePriceVolatility() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'600px',margin:'0 auto',fontFamily:"'Times New Roman',Georgia,serif",border:'1px solid #ccc'}}>
      <svg viewBox="-48 0 648 520" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="cpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="cpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="cpLft" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse"><polygon points="0 0,8 3,0 6" fill="#111"/></marker>
          <marker id="cpRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="cpRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect x="-48" width="648" height="520" fill="#fff"/>
        <text x="300" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Speculative Overreaction</text>
        <text x="300" y="48" textAnchor="middle" fontSize="14" fill="#111">to physical shortage (Coffee Market)</text>
        <line x1="82" y1="460" x2="82" y2="44" stroke="#111" strokeWidth="2.5" markerEnd="url(#cpU)"/>
        <line x1="82" y1="460" x2="544" y2="460" stroke="#111" strokeWidth="2.5" markerEnd="url(#cpR)"/>
        <text x="76" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Price</text>
        <text x="510" y="480" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Quantity</text>
        <line x1="82" y1="100" x2="470" y2="460" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="476" y="462" fontSize="13" fontWeight="bold" fill="#111">Demand</text>
        <path d="M 115 445 Q 200 310 345 155" fill="none" stroke="#111" strokeWidth="2.5"/>
        <text x="350" y="150" fontSize="12" fontWeight="bold" fill="#111">Supply</text>
        <text x="350" y="164" fontSize="11" fill="#555">(original)</text>
        <path d="M 94 445 Q 168 290 288 135" fill="none" stroke="#cc0000" strokeWidth="2.5"/>
        <text x="214" y="122" fontSize="11" fontWeight="bold" fill="#cc0000">Supply 2</text>
        <text x="198" y="135" fontSize="10" fill="#cc0000">(including speculative</text>
        <text x="198" y="147" fontSize="10" fill="#cc0000">futures trading volume)</text>
        <path d="M 158 445 Q 262 316 394 165" fill="none" stroke="#2244cc" strokeWidth="2.5"/>
        <text x="400" y="160" fontSize="11" fontWeight="bold" fill="#2244cc">Supply 3</text>
        <text x="400" y="173" fontSize="10" fill="#2244cc">(based on physical</text>
        <text x="400" y="185" fontSize="10" fill="#2244cc">shortage)</text>
        <line x1="400" y1="190" x2="372" y2="208" stroke="#2244cc" strokeWidth="1.5" markerEnd="url(#cpR)"/>
        <circle cx="244" cy="304" r="7" fill="#cc0000"/>
        <circle cx="318" cy="344" r="7" fill="#2244cc"/>
        <circle cx="374" cy="374" r="7" fill="#111"/>
        <text x="380" y="378" fontSize="12" fontWeight="bold" fill="#111">Origin</text>
        <line x1="82" y1="304" x2="244" y2="304" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="244" y1="304" x2="244" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="82" y1="344" x2="318" y2="344" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="318" y1="344" x2="318" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="82" y1="374" x2="374" y2="374" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="374" y1="374" x2="374" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="56" y1="304" x2="56" y2="346" stroke="#cc0000" strokeWidth="2" markerEnd="url(#cpRedU)" markerStart="url(#cpRedD)"/>
        <text x="50" y="317" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc0000">Actual Price</text>
        <text x="50" y="329" textAnchor="end" fontSize="10" fill="#cc0000">Increase*</text>
        <line x1="56" y1="346" x2="56" y2="376" stroke="#2244cc" strokeWidth="2" markerEnd="url(#cpRedU)" markerStart="url(#cpRedD)"/>
        <text x="50" y="356" textAnchor="end" fontSize="10" fontWeight="bold" fill="#2244cc">Expected Price</text>
        <text x="50" y="368" textAnchor="end" fontSize="10" fill="#2244cc">Increase</text>
        <text x="88" y="492" fontSize="10" fontStyle="italic" fill="#555">* Outsized price increase causes an outsized physical supply increase in</text>
        <text x="88" y="505" fontSize="10" fontStyle="italic" fill="#555">response, eventually exceeding demand and causing a price crash.</text>
      </svg>
    </div>
  );
}
