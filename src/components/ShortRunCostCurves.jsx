export default function ShortRunCostCurves() {
  const BLK='#111';
  // MC: steep upward J-curve
  // ATC: U-shaped, min at ~Q1
  // AVC: U-shaped lower, min at Q1
  // AFC: hyperbola (ATC-AVC), always falling
  // All generated as polyline points
  const n=80;
  // Q domain: 0.4 to 9.5, mapped to x: 80+Q*44
  // P domain: 0 to 12, mapped to y: 440-P*36
  const X=q=>(80+q*44).toFixed(1);
  const Y=p=>(440-p*36).toFixed(1);
  const mc  =q=>0.5+0.7*Math.pow(q-3,2)+0.15*Math.pow(q,2.2);
  const atc =q=>7.5/q+0.6+0.38*q;
  const avc =q=>4.2/q+0.15+0.38*q;
  const afc =q=>3.3/q;
  function pts(fn,q0,q1){
    return Array.from({length:n+1},(_,i)=>{
      const q=q0+(i/n)*(q1-q0), p=fn(q);
      if(p<0||p>13) return null;
      return X(q)+','+Y(p);
    }).filter(Boolean).join(' ');
  }
  const mcPts  =pts(mc,  0.5,7.5);
  const atcPts =pts(atc, 0.55,9.0);
  const avcPts =pts(avc, 0.6,9.0);
  const afcPts =pts(afc, 0.5,9.0);
  // Min of AVC: d/dq(4.2/q^2+0.38)=0 → q=sqrt(4.2/0.38)≈3.32 → P=avc(3.32)≈2.78 → Q1
  // Min of ATC: d/dq(-7.5/q^2+0.38)=0 → q=sqrt(7.5/0.38)≈4.44 → P=atc(4.44)≈4.23 → Q2
  const Q1=3.32, Q2=4.44;
  const P1=avc(Q1).toFixed(2), P2=atc(Q2).toFixed(2);
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'620px',margin:'0 auto',fontFamily:"'Times New Roman',Georgia,serif",border:'1px solid #ddd'}}>
      <svg viewBox="0 0 620 480" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="srcAxR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill={BLK}/></marker>
          <marker id="srcAxU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill={BLK}/></marker>
        </defs>
        <rect width="620" height="480" fill="#fff"/>
        {/* Axes */}
        <line x1="80" y1="440" x2="80" y2="30" stroke={BLK} strokeWidth="2.5" markerEnd="url(#srcAxU)"/>
        <line x1="80" y1="440" x2="520" y2="440" stroke={BLK} strokeWidth="2.5" markerEnd="url(#srcAxR)"/>
        <text x="72" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill={BLK}>£</text>
        <text x="510" y="462" textAnchor="middle" fontSize="15" fontWeight="bold" fill={BLK}>Q</text>
        {/* AFC */}
        <polyline points={afcPts} fill="none" stroke={BLK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X(9.0)} y={Y(afc(9.0))} fontSize="13" fontWeight="bold" fill={BLK}> AFC</text>
        {/* AVC */}
        <polyline points={avcPts} fill="none" stroke={BLK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X(9.0)} y={Y(avc(9.0))} fontSize="13" fontWeight="bold" fill={BLK}> AVC</text>
        {/* ATC */}
        <polyline points={atcPts} fill="none" stroke={BLK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X(9.0)} y={Y(atc(9.0))} fontSize="13" fontWeight="bold" fill={BLK}> ATC</text>
        {/* MC */}
        <polyline points={mcPts} fill="none" stroke={BLK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x={X(7.4)} y={Y(mc(7.4))-10} fontSize="13" fontWeight="bold" fill={BLK}>MC</text>
        {/* P1 dotted horizontal */}
        <line x1="80" y1={Y(P1)} x2={X(Q1)} y2={Y(P1)} stroke={BLK} strokeWidth="1.4" strokeDasharray="5,4"/>
        <text x="72" y={parseFloat(Y(P1))+5} textAnchor="end" fontSize="13" fontWeight="bold" fill={BLK}>P1</text>
        {/* P2 dotted horizontal */}
        <line x1="80" y1={Y(P2)} x2={X(Q2)} y2={Y(P2)} stroke={BLK} strokeWidth="1.4" strokeDasharray="5,4"/>
        <text x="72" y={parseFloat(Y(P2))+5} textAnchor="end" fontSize="13" fontWeight="bold" fill={BLK}>P2</text>
        {/* Q1 vertical */}
        <line x1={X(Q1)} y1={Y(P1)} x2={X(Q1)} y2="440" stroke={BLK} strokeWidth="1.4" strokeDasharray="5,4"/>
        <text x={X(Q1)} y="458" textAnchor="middle" fontSize="13" fontWeight="bold" fill={BLK}>Q1</text>
        {/* Q2 vertical */}
        <line x1={X(Q2)} y1={Y(P2)} x2={X(Q2)} y2="440" stroke={BLK} strokeWidth="1.4" strokeDasharray="5,4"/>
        <text x={X(Q2)} y="458" textAnchor="middle" fontSize="13" fontWeight="bold" fill={BLK}>Q2</text>
        {/* Min dots */}
        <circle cx={X(Q1)} cy={Y(P1)} r="5" fill="#fff" stroke={BLK} strokeWidth="2"/>
        <circle cx={X(Q2)} cy={Y(P2)} r="5" fill="#fff" stroke={BLK} strokeWidth="2"/>
      </svg>
    </div>
  );
}