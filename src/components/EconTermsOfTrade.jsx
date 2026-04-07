export default function EconTermsOfTrade() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'620px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="totR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="totU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="totRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="totRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="620" height="560" fill="#fff"/>
        <text x="56" y="46" textAnchor="start" fontSize="14" fontWeight="bold" fill="#111">Price</text>
        <text x="56" y="60" textAnchor="start" fontSize="14" fontWeight="bold" fill="#111">£</text>
        <text x="570" y="475" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Q millions</text>
        <line x1="72" y1="460" x2="72" y2="48" stroke="#111" strokeWidth="2.5" markerEnd="url(#totU)"/>
        <line x1="72" y1="460" x2="590" y2="460" stroke="#111" strokeWidth="2.5" markerEnd="url(#totR)"/>
        <line x1="72" y1="90" x2="530" y2="460" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="538" y="462" fontSize="13" fontWeight="bold" fill="#111">D</text>
        <line x1="72" y1="460" x2="560" y2="80" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="566" y="78" fontSize="12" fontWeight="bold" fill="#111">S UK</text>
        <line x1="72" y1="300" x2="570" y2="300" stroke="#111" strokeWidth="1.8"/>
        <text x="548" y="294" fontSize="11" fontWeight="bold" fill="#111">S EU + tariff</text>
        <line x1="72" y1="330" x2="570" y2="330" stroke="#111" strokeWidth="1.8"/>
        <text x="548" y="324" fontSize="11" fontWeight="bold" fill="#111">S Aus + tariff</text>
        <line x1="72" y1="370" x2="570" y2="370" stroke="#111" strokeWidth="1.8"/>
        <text x="548" y="364" fontSize="11" fontWeight="bold" fill="#111">S EU</text>
        <line x1="72" y1="400" x2="570" y2="400" stroke="#111" strokeWidth="1.8"/>
        <text x="548" y="394" fontSize="11" fontWeight="bold" fill="#111">S Aus</text>
        <text x="64" y="304" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc2222">P1</text>
        <text x="64" y="374" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc2222">P2</text>
        <line x1="54" y1="300" x2="54" y2="330" stroke="#cc2222" strokeWidth="2" markerEnd="url(#totRedD)" markerStart="url(#totRedU)"/>
        <line x1="516" y1="300" x2="516" y2="330" stroke="#cc2222" strokeWidth="2" markerEnd="url(#totRedD)" markerStart="url(#totRedU)"/>
        <text x="530" y="318" fontSize="10" fill="#cc2222">tariff</text>
        <line x1="180" y1="460" x2="180" y2="330" stroke="#111" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="260" y1="460" x2="260" y2="330" stroke="#111" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="380" y1="460" x2="380" y2="330" stroke="#111" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="430" y1="460" x2="430" y2="330" stroke="#111" strokeWidth="1.2" strokeDasharray="5,4"/>
        <text x="180" y="476" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Q1</text>
        <text x="260" y="476" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Q 2</text>
        <text x="380" y="476" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Q3</text>
        <text x="430" y="476" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Q4</text>
        <polygon points="180,300 260,300 260,330 180,330" fill="rgba(240,140,80,0.55)"/>
        <text x="210" y="318" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111">2</text>
        <rect x="260" y="330" width="120" height="30" fill="rgba(100,170,240,0.55)"/>
        <text x="320" y="348" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">5</text>
        <polygon points="380,300 430,300 430,330 380,330" fill="rgba(240,140,80,0.55)"/>
        <text x="405" y="318" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111">4</text>
        <text x="125" y="318" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">1</text>
        <text x="320" y="318" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">3</text>
        <line x1="96" y1="300" x2="96" y2="330" stroke="#cc2222" strokeWidth="1.8" markerEnd="url(#totRedD)" markerStart="url(#totRedU)"/>
        <text x="87" y="314" textAnchor="end" fontSize="9" fill="#cc2222">tariff</text>
        <rect x="310" y="76" width="220" height="38" fill="#fff" stroke="#ddd" strokeWidth="1"/>
        <rect x="316" y="84" width="14" height="10" rx="2" fill="rgba(240,140,80,0.7)"/>
        <text x="334" y="93" fontSize="9" fill="#111">net gain = increase in consumer surplus -</text>
        <text x="334" y="105" fontSize="9" fill="#111">decline in producer surplus - loss in tariff</text>
        <rect x="316" y="108" width="14" height="10" rx="2" fill="rgba(100,170,240,0.7)"/>
        <text x="334" y="117" fontSize="9" fill="#111">net loss = loss in tariff revenue.</text>
      </svg>
    </div>
  );
}