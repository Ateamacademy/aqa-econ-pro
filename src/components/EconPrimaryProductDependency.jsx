export default function EconPrimaryProductDependency() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'600px',margin:'0 auto',fontFamily:"'Times New Roman',Georgia,serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 600 520" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ppR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ppU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ppRL" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse"><polygon points="0 0,8 3,0 6" fill="#111"/></marker>
        </defs>
        <rect width="600" height="520" fill="#fff"/>
        <text x="300" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Speculative Overreaction</text>
        <text x="300" y="50" textAnchor="middle" fontSize="14" fill="#111">to physical shortage</text>
        <line x1="80" y1="460" x2="80" y2="46" stroke="#111" strokeWidth="2.5" markerEnd="url(#ppU)"/>
        <line x1="80" y1="460" x2="540" y2="460" stroke="#111" strokeWidth="2.5" markerEnd="url(#ppR)"/>
        <text x="74" y="44" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Price</text>
        <text x="510" y="480" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Quantity</text>
        <line x1="80" y1="100" x2="460" y2="460" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="468" y="464" fontSize="13" fontWeight="bold" fill="#111">Demand</text>
        <path d="M 110 440 Q 200 300 340 150" fill="none" stroke="#111" strokeWidth="2.5"/>
        <text x="346" y="145" fontSize="12" fontWeight="bold" fill="#111">Supply</text>
        <path d="M 90 440 Q 165 280 280 130" fill="none" stroke="#cc0000" strokeWidth="2.5"/>
        <text x="205" y="118" fontSize="11" fontWeight="bold" fill="#cc0000">Supply 2</text>
        <text x="188" y="131" fontSize="10" fill="#cc0000">(including speculative</text>
        <text x="188" y="143" fontSize="10" fill="#cc0000">futures trading volume)</text>
        <path d="M 155 440 Q 260 310 390 160" fill="none" stroke="#2244cc" strokeWidth="2.5"/>
        <text x="396" y="155" fontSize="11" fontWeight="bold" fill="#2244cc">Supply 2</text>
        <text x="396" y="168" fontSize="10" fill="#2244cc">(based on physical</text>
        <text x="396" y="180" fontSize="10" fill="#2244cc">shortage)</text>
        <line x1="396" y1="185" x2="356" y2="205" stroke="#2244cc" strokeWidth="1.5" markerEnd="url(#ppR)"/>
        <circle cx="248" cy="300" r="7" fill="#cc0000"/>
        <circle cx="316" cy="340" r="7" fill="#2244cc"/>
        <circle cx="370" cy="370" r="7" fill="#111"/>
        <text x="376" y="375" fontSize="12" fontWeight="bold" fill="#111">Origin</text>
        <line x1="80" y1="300" x2="248" y2="300" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="248" y1="300" x2="248" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="80" y1="340" x2="316" y2="340" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="316" y1="340" x2="316" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="80" y1="370" x2="370" y2="370" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="370" y1="370" x2="370" y2="460" stroke="#111" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="54" y1="300" x2="54" y2="342" stroke="#cc0000" strokeWidth="2" markerEnd="url(#ppU)" markerStart="url(#ppRL)"/>
        <text x="48" y="314" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc0000">Actual Price</text>
        <text x="48" y="326" textAnchor="end" fontSize="10" fill="#cc0000">Increase*</text>
        <line x1="54" y1="342" x2="54" y2="373" stroke="#2244cc" strokeWidth="2" markerEnd="url(#ppU)" markerStart="url(#ppRL)"/>
        <text x="48" y="352" textAnchor="end" fontSize="10" fontWeight="bold" fill="#2244cc">Expected Price</text>
        <text x="48" y="364" textAnchor="end" fontSize="10" fill="#2244cc">Increase</text>
        <text x="86" y="490" fontSize="10" fontStyle="italic" fill="#555">* Outsized price increase causes an outsized physical supply increase in</text>
        <text x="86" y="503" fontSize="10" fontStyle="italic" fill="#555">response, eventually exceeding demand and causing a price crash.</text>
      </svg>
    </div>
  );
}