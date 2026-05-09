export default function EconLabourMinWage() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'600px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 600 490" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="lmR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="lmU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="lmDn" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><polygon points="0 0,8 0,4 8" fill="#cc0000"/></marker>
        </defs>
        <rect width="600" height="490" fill="#fff"/>
        <text x="300" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Labour Market · Minimum Wage</text>
        <line x1="85" y1="440" x2="85" y2="36" stroke="#111" strokeWidth="2.5" markerEnd="url(#lmU)"/>
        <line x1="85" y1="440" x2="520" y2="440" stroke="#111" strokeWidth="2.5" markerEnd="url(#lmR)"/>
        <text x="85" y="26" fontSize="13" fontWeight="bold" fill="#111">Wage rate</text>
        <text x="293" y="478" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Quantity of workers</text>
        <line x1="85" y1="420" x2="380" y2="80" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="386" y="76" fontSize="14" fontWeight="bold" fill="#111">S</text>
        <line x1="85" y1="80" x2="480" y2="410" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="484" y="424" fontSize="13" fontWeight="bold" fill="#111">D=MRP</text>
        <line x1="85" y1="170" x2="510" y2="170" stroke="#111" strokeWidth="1.8"/>
        <text x="514" y="175" fontSize="12" fill="#111">Minimum wage</text>
        <text x="77" y="175" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">WMIN</text>
        <line x1="85" y1="222.9" x2="256.0" y2="222.9" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <text x="77" y="227.9" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">W1</text>
        <polygon points="192.7,170 301.9,170 256.0,222.9" fill="rgba(200,0,0,0.80)"/>
        <line x1="192.7" y1="170" x2="192.7" y2="440" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="256.0" y1="170" x2="256.0" y2="440" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="301.9" y1="170" x2="301.9" y2="440" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <text x="192.7" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">QMIN</text>
        <text x="256.0" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Q1</text>
        <text x="301.9" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">QS</text>
        <text x="179.3" y="162.0" fontSize="12" fontWeight="bold" fill="#111">Real wage unemployment</text>
        <line x1="256.0" y1="182.0" x2="256.0" y2="210.0" stroke="#cc0000" strokeWidth="2.2" markerEnd="url(#lmDn)"/>
      </svg>
    </div>
  );
}