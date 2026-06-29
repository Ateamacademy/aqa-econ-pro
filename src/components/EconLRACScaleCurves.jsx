export default function EconLRACScaleCurves() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'700px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 700 520" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="lrR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="lrU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="lrRedArr" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc0000"/></marker>
        </defs>
        <rect width="700" height="520" fill="#fff"/>
        <text x="350" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Long-Run Average Cost (LRAC)</text>
        <line x1="70" y1="460" x2="70" y2="44" stroke="#111" strokeWidth="2.2" markerEnd="url(#lrU)"/>
        <line x1="70" y1="460" x2="660" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#lrR)"/>
        <text x="55" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Costs</text>
        <text x="650" y="480" fontSize="13" fontWeight="bold" fill="#111">Output</text>
        <path d="M 80 80 Q 200 500 340 415 Q 480 330 620 120" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>
        <text x="612" y="108" fontSize="14" fontWeight="bold" fill="#111">LRAC</text>
        <line x1="325" y1="412" x2="325" y2="462" stroke="#cc0000" strokeWidth="1.8" strokeDasharray="6,4"/>
        <line x1="360" y1="415" x2="360" y2="462" stroke="#cc0000" strokeWidth="1.8" strokeDasharray="6,4"/>
        <circle cx="332" cy="414" r="6" fill="#cc0000"/>
        <line x1="332" y1="414" x2="296" y2="445" stroke="#cc0000" strokeWidth="1.5" markerEnd="url(#lrRedArr)"/>
        <text x="150" y="440" fontSize="12" fill="#cc0000">Minimum efficient scale</text>
        <text x="160" y="260" textAnchor="middle" fontSize="14" fill="#555">Economies of scale</text>
        <text x="500" y="280" textAnchor="middle" fontSize="14" fill="#555">Diseconomies of scale</text>
      </svg>
    </div>
  );
}