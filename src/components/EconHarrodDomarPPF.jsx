export default function EconHarrodDomarPPF() {
  const W=580, H=520;
  const cL=80, cT=50, cR=490, cB=440;
  function ppf(L,T,R,B,n){
    n=n||80;
    return Array.from({length:n+1},function(_,i){
      var t=(i/n)*(Math.PI/2);
      return (L+(R-L)*Math.sin(t)).toFixed(1)+','+(T+(B-T)*(1-Math.cos(t))).toFixed(1);
    }).join(' ');
  }
  var pts1=ppf(cL,cT,cR-80,cB);
  var pts2=ppf(cL,cT-40,cR,cB);
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'580px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox={"0 0 "+W+" "+H} width="100%" style={{display:'block'}}>
        <defs>
          <marker id="hdR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="hdU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="hdOArr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#cc2222"/></marker>
        </defs>
        <rect width={W} height={H} fill="#fff"/>
        <text x="290" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Harrod-Domar: Ethiopia PPF Shift</text>
        <text x="290" y="48" textAnchor="middle" fontSize="12" fill="#555">Capital accumulation shifts productive potential outward</text>
        <line x1={cL} y1={cB} x2={cL} y2={cT-24} stroke="#111" strokeWidth="2.5" markerEnd="url(#hdU)"/>
        <line x1={cL} y1={cB} x2={cR+22} y2={cB} stroke="#111" strokeWidth="2.5" markerEnd="url(#hdR)"/>
        <text x={cL-6} y={cT-30} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Capital</text>
        <text x={cL-6} y={cT-16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Goods</text>
        <text x={(cL+cR)/2} y={cB+36} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Consumer Goods</text>
        <polyline points={pts1} fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={cR-82} y={cB-8} fontSize="13" fontWeight="bold" fill="#111">PPF</text>
        <text x={cR-82} y={cB+8} fontSize="11" fill="#111">(before)</text>
        <polyline points={pts2} fill="none" stroke="#cc2222" strokeWidth="2.5" strokeDasharray="none" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={cR+4} y={cB-30} fontSize="13" fontWeight="bold" fill="#cc2222">PPF</text>
        <text x={cR+4} y={cB-14} fontSize="11" fill="#cc2222">(after)</text>
        <line x1={cR-50} y1={cB-80} x2={cR-12} y2={cB-55} stroke="#cc2222" strokeWidth="1.8" markerEnd="url(#hdOArr)"/>
        <text x="290" y={cB+68} textAnchor="middle" fontSize="12" fill="#555">Ethiopian investment shifts PPF outward — more of both goods producible</text>
        <text x={cL+30} y={cT+60} fontSize="12" fill="#555" fontStyle="italic">Investment in</text>
        <text x={cL+30} y={cT+75} fontSize="12" fill="#555" fontStyle="italic">industrial parks</text>
        <text x={cL+30} y={cT+90} fontSize="12" fill="#555" fontStyle="italic">+ infrastructure</text>
        <line x1={cL+95} y1={cT+75} x2={cL+125} y2={cT+62} stroke="#555" strokeWidth="1.2" markerEnd="url(#hdOArr)"/>
      </svg>
    </div>
  );
}