export default function YEDLuxuryGoods() {
  const BLK='#111', RED='#cc2222', GRAY='rgba(0,0,0,0.18)';
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'580px',margin:'0 auto',fontFamily:"'Times New Roman',Georgia,serif",border:'1px solid #ddd'}}>
      <svg viewBox="0 0 580 500" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ydAxR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill={BLK}/></marker>
          <marker id="ydAxU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill={BLK}/></marker>
          <marker id="ydRedR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill={RED}/></marker>
          <marker id="ydRedU" markerWidth="6" markerHeight="8" refX="3" refY="1" orient="auto"><polygon points="0 8,3 0,6 8" fill={RED}/></marker>
        </defs>
        <rect width="580" height="500" fill="#fff"/>
        {/* Y axis */}
        <line x1="95" y1="440" x2="95" y2="30" stroke={BLK} strokeWidth="2.5" markerEnd="url(#ydAxU)"/>
        {/* X axis */}
        <line x1="95" y1="440" x2="530" y2="440" stroke={BLK} strokeWidth="2.5" markerEnd="url(#ydAxR)"/>
        {/* Axis labels */}
        <text x="46" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>Average</text>
        <text x="46" y="138" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>Income</text>
        <text x="46" y="156" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLK}>£ week</text>
        <text x="490" y="465" textAnchor="middle" fontSize="15" fontWeight="bold" fill={BLK}>Quantity</text>
        {/* Income levels: 500, 550, 700 mapped to y */}
        {/* y: 500→y=390, 550→y=350, 700→y=255 — linear scale 0-800 in 0-420px */}
        {/* Dashed horizontals */}
        <line x1="95" y1="255" x2="342" y2="255" stroke={BLK} strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="95" y1="350" x2="342" y2="350" stroke={BLK} strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="95" y1="390" x2="342" y2="390" stroke={BLK} strokeWidth="1.4" strokeDasharray="6,4"/>
        {/* Dashed verticals at Q=800 and Q=900 */}
        <line x1="278" y1="255" x2="278" y2="440" stroke={BLK} strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="342" y1="255" x2="342" y2="440" stroke={BLK} strokeWidth="1.4" strokeDasharray="6,4"/>
        {/* Income tick labels */}
        <text x="88" y="260" textAnchor="end" fontSize="13" fill={BLK}>700</text>
        <text x="88" y="355" textAnchor="end" fontSize="13" fill={BLK}>550</text>
        <text x="88" y="395" textAnchor="end" fontSize="13" fill={BLK}>500</text>
        {/* Qty tick labels */}
        <text x="278" y="458" textAnchor="middle" fontSize="13" fill={BLK}>800</text>
        <text x="342" y="458" textAnchor="middle" fontSize="13" fill={BLK}>900</text>
        {/* Normal good demand: steeper, from (100,430) to (500,80) */}
        <line x1="110" y1="425" x2="490" y2="75" stroke={BLK} strokeWidth="3" strokeLinecap="round"/>
        <text x="466" y="66" fontSize="13" fontWeight="bold" fill={BLK}>Demand for normal good</text>
        <text x="466" y="82" fontSize="13" fill={BLK}>YED &gt; 0</text>
        {/* Luxury good demand: flatter, from (50,430) to (510,190) */}
        <line x1="60" y1="430" x2="510" y2="195" stroke={BLK} strokeWidth="3" strokeLinecap="round"/>
        <text x="418" y="250" fontSize="13" fontWeight="bold" fill={BLK}>Demand for luxury</text>
        <text x="418" y="266" fontSize="13" fill={BLK}>YED &gt; 1</text>
        {/* Note */}
        <text x="390" y="360" fontSize="12" fill={BLK}>(Luxury good is</text>
        <text x="390" y="378" fontSize="12" fill={BLK}>normal good as well)</text>
        {/* Points A, B, C as red dots */}
        <circle cx="278" cy="390" r="8" fill={RED}/>
        <text x="262" y="386" fontSize="13" fontWeight="bold" fill={BLK}>A</text>
        <circle cx="278" cy="255" r="8" fill={RED}/>
        <text x="262" y="251" fontSize="13" fontWeight="bold" fill={BLK}>B</text>
        <circle cx="342" cy="350" r="8" fill={RED}/>
        <text x="348" y="346" fontSize="13" fontWeight="bold" fill={BLK}>C</text>
        {/* Red arrows on axes */}
        <line x1="56" y1="340" x2="56" y2="200" stroke={RED} strokeWidth="3" markerEnd="url(#ydRedU)"/>
        <line x1="175" y1="458" x2="290" y2="458" stroke={RED} strokeWidth="3" markerEnd="url(#ydRedR)"/>
      </svg>
    </div>
  );
}