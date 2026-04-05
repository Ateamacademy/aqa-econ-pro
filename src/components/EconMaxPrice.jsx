export default function EconMaxPrice() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'580px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 580 490" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mp1" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="mp2" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="580" height="490" fill="#fff"/>
        <text x="290" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Figure 1: Maximum Price Diagram</text>
        <line x1="88" y1="432" x2="88" y2="54" stroke="#111" strokeWidth="2.5" markerEnd="url(#mp2)"/>
        <line x1="88" y1="432" x2="518" y2="432" stroke="#111" strokeWidth="2.5" markerEnd="url(#mp1)"/>
        <text x="88" y="50" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7b2fbe">Price</text>
        <text x="478" y="464" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7b2fbe">Quantity</text>
        <line x1="88" y1="420" x2="434" y2="88" stroke="#1a44cc" strokeWidth="3.5" strokeLinecap="round"/>
        <text x="438" y="84" fontSize="16" fontWeight="bold" fill="#111">S</text>
        <line x1="88" y1="88" x2="468" y2="420" stroke="#1a44cc" strokeWidth="3.5" strokeLinecap="round"/>
        <text x="466" y="436" fontSize="16" fontWeight="bold" fill="#111">D</text>
        <circle cx="261" cy="254" r="7" fill="#fff" stroke="#1a44cc" strokeWidth="2.5"/>
        <line x1="88" y1="254" x2="261" y2="254" stroke="#111" strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="80" y="259" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Pe</text>
        <line x1="261" y1="254" x2="261" y2="432" stroke="#111" strokeWidth="1.5" strokeDasharray="8,5"/>
        <line x1="88" y1="312" x2="488" y2="312" stroke="#dd2222" strokeWidth="3"/>
        <text x="492" y="316" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="492" y="330" fontSize="12" fill="#111">(max)</text>
        <line x1="200" y1="312" x2="200" y2="432" stroke="#111" strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="200" y="450" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">M</text>
        <text x="261" y="450" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Qe</text>
        <line x1="342" y1="312" x2="342" y2="432" stroke="#111" strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="342" y="450" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">N</text>
      </svg>
    </div>
  );
}