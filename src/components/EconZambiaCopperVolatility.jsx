export default function EconZambiaCopperVolatility() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 570" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="zcR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="zcU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="zcLft" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#cc4400"/></marker>
          <marker id="zcRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="zcRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="680" height="570" fill="#fff"/>
        <text x="340" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Zambia · Copper Market: Primary Product Price Volatility</text>
        <text x="340" y="48" textAnchor="middle" fontSize="12" fill="#555">Inelastic S and D: fall in Chinese manufacturing demand causes large price drop</text>
        <line x1="100" y1="462" x2="100" y2="64" stroke="#111" strokeWidth="2.5" markerEnd="url(#zcU)"/>
        <line x1="100" y1="462" x2="582" y2="462" stroke="#111" strokeWidth="2.5" markerEnd="url(#zcR)"/>
        <text x="94" y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="94" y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">($/tonne)</text>
        <text x="570" y="470" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <polyline points="109.2,396.1 114.5,394.7 119.9,393.2 125.2,391.7 130.6,390.2 135.9,388.8 141.3,387.3 146.6,385.8 152.0,384.4 157.3,382.9 162.7,381.4 168.0,379.9 173.4,378.5 178.7,377.0 184.1,375.5 189.4,374.0 194.8,372.6 200.1,371.1 205.5,369.6 210.8,368.2 216.2,366.7 221.5,365.2 226.8,363.7 232.2,362.3 237.5,360.8 242.9,359.3 248.2,357.8 253.6,356.4 258.9,354.9 264.3,353.4 269.6,352.0 275.0,350.5 280.3,349.0 285.7,347.5 291.0,346.1 296.4,344.6 301.7,343.1 307.1,341.7 312.4,340.2 317.8,338.7 323.1,337.2 328.4,335.8 333.8,334.3 339.1,332.8 344.5,331.3 349.8,329.9 355.2,328.4 360.5,326.9 365.9,325.5 371.2,324.0 376.6,322.5 381.9,321.0 387.3,319.6 392.6,318.1 398.0,316.6 403.3,315.1 408.7,313.7 414.0,312.2 419.4,310.7 424.7,309.3 430.1,307.8 435.4,306.3 440.7,304.8 446.1,303.4 451.4,301.9 456.8,300.4 462.1,298.9 467.5,297.5 472.8,296.0 478.2,294.5 483.5,293.1 488.9,291.6 494.2,290.1 499.6,288.6 504.9,287.2 510.3,285.7 515.6,284.2 521.0,282.8 526.3,281.3 531.7,279.8 537.0,278.3" fill="none" stroke="#1a944a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="543.0" y="268.3" fontSize="13" fontWeight="bold" fill="#1a944a">S</text>
        <text x="543.0" y="284.3" fontSize="10" fill="#555">(inelastic)</text>
        <polyline points="123.0,139.0 128.2,141.1 133.3,143.3 138.5,145.4 143.7,147.6 148.9,149.7 154.0,151.8 159.2,154.0 164.4,156.1 169.6,158.2 174.8,160.4 179.9,162.5 185.1,164.6 190.3,166.8 195.4,168.9 200.6,171.1 205.8,173.2 211.0,175.3 216.2,177.5 221.3,179.6 226.5,181.8 231.7,183.9 236.8,186.0 242.0,188.2 247.2,190.3 252.4,192.4 257.6,194.6 262.7,196.7 267.9,198.9 273.1,201.0 278.3,203.1 283.4,205.3 288.6,207.4 293.8,209.5 298.9,211.7 304.1,213.8 309.3,216.0 314.5,218.1 319.6,220.2 324.8,222.4 330.0,224.5 335.2,226.6 340.4,228.8 345.5,230.9 350.7,233.0 355.9,235.2 361.1,237.3 366.2,239.5 371.4,241.6 376.6,243.7 381.8,245.9 386.9,248.0 392.1,250.2 397.3,252.3 402.4,254.4 407.6,256.6 412.8,258.7 418.0,260.8 423.1,263.0 428.3,265.1 433.5,267.3 438.7,269.4 443.9,271.5 449.0,273.7 454.2,275.8 459.4,277.9 464.6,280.1 469.7,282.2 474.9,284.3 480.1,286.5 485.3,288.6 490.4,290.8 495.6,292.9 500.8,295.0 506.0,297.2 511.1,299.3 516.3,301.4 521.5,303.6 526.6,305.7 531.8,307.9 537.0,310.0" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="543.0" y="326.0" fontSize="13" fontWeight="bold" fill="#2255cc">D1</text>
        <text x="543.0" y="340.0" fontSize="10" fill="#555">(inelastic)</text>
        <polyline points="123.0,218.2 128.2,220.3 133.3,222.4 138.5,224.6 143.7,226.7 148.9,228.9 154.0,231.0 159.2,233.1 164.4,235.3 169.6,237.4 174.8,239.5 179.9,241.7 185.1,243.8 190.3,246.0 195.4,248.1 200.6,250.2 205.8,252.4 211.0,254.5 216.2,256.6 221.3,258.8 226.5,260.9 231.7,263.1 236.8,265.2 242.0,267.3 247.2,269.5 252.4,271.6 257.6,273.7 262.7,275.9 267.9,278.0 273.1,280.2 278.3,282.3 283.4,284.4 288.6,286.6 293.8,288.7 298.9,290.8 304.1,293.0 309.3,295.1 314.5,297.3 319.6,299.4 324.8,301.5 330.0,303.7 335.2,305.8 340.4,307.9 345.5,310.1 350.7,312.2 355.9,314.4 361.1,316.5 366.2,318.6 371.4,320.8 376.6,322.9 381.8,325.0 386.9,327.2 392.1,329.3 397.3,331.5 402.4,333.6 407.6,335.7 412.8,337.9 418.0,340.0 423.1,342.1 428.3,344.3 433.5,346.4 438.7,348.6 443.9,350.7 449.0,352.8 454.2,355.0 459.4,357.1 464.6,359.2 469.7,361.4 474.9,363.5 480.1,365.7 485.3,367.8 490.4,369.9 495.6,372.1 500.8,374.2 506.0,376.3 511.1,378.5 516.3,380.6 521.5,382.8 526.6,384.9 531.8,387.0 537.0,389.2" fill="none" stroke="#cc4400" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="543.0" y="405.2" fontSize="13" fontWeight="bold" fill="#cc4400">D2</text>
        <text x="543.0" y="419.2" fontSize="10" fill="#cc4400">(China demand ↓)</text>
        <line x1="431.2" y1="266.3" x2="377.2" y2="266.3" stroke="#cc4400" strokeWidth="2" markerEnd="url(#zcLft)"/>
        <text x="441.2" y="258.3" fontSize="11" fontWeight="bold" fill="#cc4400">D shifts left</text>
        <line x1="100" y1="291.0" x2="491.0" y2="291.0" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="100" y1="322.7" x2="376.0" y2="322.7" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="491.0" y1="291.0" x2="491.0" y2="462" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="376.0" y1="322.7" x2="376.0" y2="462" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="491.0" cy="291.0" r="7" fill="#111"/>
        <circle cx="376.0" cy="322.7" r="7" fill="#cc2222"/>
        <text x="503.0" y="296.0" fontSize="13" fontWeight="bold" fill="#111">E1</text>
        <text x="388.0" y="316.7" fontSize="13" fontWeight="bold" fill="#cc2222">E2</text>
        <text x="90" y="296.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P1</text>
        <text x="90" y="327.7" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc2222">P2</text>
        <text x="491.0" y="482" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Q1</text>
        <text x="376.0" y="482" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc2222">Q2</text>
        <line x1="76.0" y1="291.0" x2="76.0" y2="322.7" stroke="#cc2222" strokeWidth="2" markerEnd="url(#zcRedD)" markerStart="url(#zcRedU)"/>
        <text x="62.0" y="302.9" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc2222">Large</text>
        <text x="62.0" y="315.9" textAnchor="end" fontSize="10" fill="#cc2222">price</text>
        <text x="62.0" y="328.9" textAnchor="end" fontSize="10" fill="#cc2222">fall</text>
        <rect x="100" y="498" width="482" height="62" rx="6" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="112" y="516" fontSize="11" fontWeight="bold" fill="#111">Why inelastic S and D cause large price swings:</text>
        <text x="112" y="532" fontSize="11" fill="#333">When both supply and demand are inelastic, a shift in demand causes a disproportionately</text>
        <text x="112" y="548" fontSize="11" fill="#333">large price change (P1→P2) but only a small quantity change (Q1→Q2).</text>
        <text x="112" y="560" fontSize="11" fill="#555">Zambia's copper export revenue is highly volatile · major risk for a mono-commodity economy.</text>
      </svg>
    </div>
  );
}