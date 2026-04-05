export default function MaximumPriceCeiling() {
  const BLK='#111', BLUE='#1a44cc', RED='#dd2222', PURP='#7b2fbe';
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'580px',margin:'0 auto',fontFamily:"'Times New Roman',Georgia,serif",border:'1px solid #ddd'}}>
      <svg viewBox="0 0 580 500" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mpAxR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill={BLK}/></marker>
          <marker id="mpAxU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill={BLK}/></marker>
        </defs>
        <rect width="580" height="500" fill="#fff"/>
        {/* Title */}
        <text x="290" y="32" textAnchor="middle" fontSize="17" fontWeight="bold" fill={BLK}>Figure 1: Maximum Price Diagram</text>
        {/* Axes */}
        <line x1="90" y1="430" x2="90" y2="55" stroke={BLK} strokeWidth="2.5" markerEnd="url(#mpAxU)"/>
        <line x1="90" y1="430" x2="520" y2="430" stroke={BLK} strokeWidth="2.5" markerEnd="url(#mpAxR)"/>
        {/* Axis labels */}
        <text x="90" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill={PURP}>Price</text>
        <text x="480" y="465" textAnchor="middle" fontSize="16" fontWeight="bold" fill={PURP}>Quantity</text>
        {/* Supply (blue, upward): from (90,420) to (440,90) */}
        <line x1="90" y1="420" x2="440" y2="90" stroke={BLUE} strokeWidth="3.5" strokeLinecap="round"/>
        <text x="444" y="87" fontSize="17" fontWeight="bold" fill={BLK}>S</text>
        {/* Demand (blue, downward): from (90,90) to (480,420) */}
        <line x1="90" y1="90" x2="470" y2="420" stroke={BLUE} strokeWidth="3.5" strokeLinecap="round"/>
        <text x="468" y="435" fontSize="17" fontWeight="bold" fill={BLK}>D</text>
        {/* Equilibrium: S=D at (265,255) approx */}
        <circle cx="265" cy="255" r="7" fill="#fff" stroke={BLUE} strokeWidth="2.5"/>
        {/* Pe dashed */}
        <line x1="90" y1="255" x2="265" y2="255" stroke={BLK} strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="83" y="260" textAnchor="end" fontSize="14" fontWeight="bold" fill={BLK}>Pe</text>
        <line x1="265" y1="255" x2="265" y2="430" stroke={BLK} strokeWidth="1.5" strokeDasharray="8,5"/>
        {/* Max price line (red, horizontal) at ~P=310 */}
        <line x1="90" y1="310" x2="490" y2="310" stroke={RED} strokeWidth="3"/>
        <text x="495" y="315" fontSize="14" fontWeight="bold" fill={BLK}>Price</text>
        <text x="495" y="331" fontSize="13" fill={BLK}>(max)</text>
        {/* M: where supply meets max price line */}
        {/* S: P = -330/350*Q + 420 → at P=310 → Q≈11.7 → x=90+11.7*40=558 too far */}
        {/* Let me recalc: S from (90,420)→(440,90): slope = (90-420)/(440-90)= -330/350 = -0.943 per px */}
        {/* At y=310: 310=420-0.943*(x-90) → x-90=(420-310)/0.943=116.6 → x=206 */}
        <line x1="206" y1="310" x2="206" y2="430" stroke={BLK} strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="206" y="450" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>M</text>
        {/* Qe */}
        <text x="265" y="450" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>Qe</text>
        {/* N: where demand meets max price: D from (90,90)→(470,420): slope=(420-90)/(470-90)=330/380=0.868 */}
        {/* At y=310: 310=90+0.868*(x-90) → x-90=(310-90)/0.868=253 → x=343 */}
        <line x1="343" y1="310" x2="343" y2="430" stroke={BLK} strokeWidth="1.5" strokeDasharray="8,5"/>
        <text x="343" y="450" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>N</text>
      </svg>
    </div>
  );
}