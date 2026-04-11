export default function EconPEDRevenueElastic() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 580" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="peR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="peU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="peAmberU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#d97706"/></marker>
          <marker id="peAmberD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#d97706"/></marker>
        </defs>
        <rect width="680" height="580" fill="#fff"/>

        {/* Title */}
        <text x="340" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">PED Revenue Impact — Price Elastic Demand</text>
        <text x="340" y="52" textAnchor="middle" fontSize="12" fill="#555">TfL London Underground: Price rise when PED &gt; 1</text>

        {/* Revenue LOST (red) — drawn first */}
        <polygon points="242.4,255.4 300.9,255.4 300.9,460 242.4,460" fill="rgba(220,40,40,0.50)"/>

        {/* Revenue GAINED (green) */}
        <polygon points="92,214.5 242.4,214.5 242.4,255.4 92,255.4" fill="rgba(34,197,94,0.48)"/>

        {/* Demand curve — flat/elastic */}
        <polyline points="92.0,109.2 97.4,113.0 102.9,116.8 108.3,120.6 113.7,124.4 119.2,128.2 124.6,132.0 130.0,135.8 135.5,139.6 140.9,143.4 146.3,147.2 151.8,151.0 157.2,154.8 162.6,158.6 168.1,162.4 173.5,166.2 178.9,170.0 184.3,173.8 189.8,177.6 195.2,181.4 200.6,185.2 206.1,189.0 211.5,192.8 216.9,196.6 222.4,200.4 227.8,204.2 233.2,208.0 238.7,211.8 244.1,215.6 249.5,219.4 255.0,223.2 260.4,227.0 265.8,230.8 271.3,234.6 276.7,238.4 282.1,242.2 287.6,246.0 293.0,249.8 298.4,253.6 303.9,257.4 309.3,261.2 314.7,265.0 320.1,268.8 325.6,272.6 331.0,276.4 336.4,280.2 341.9,284.0 347.3,287.8 352.7,291.6 358.2,295.4 363.6,299.2 369.0,303.0 374.5,306.8 379.9,310.6 385.3,314.4 390.8,318.2 396.2,322.0 401.6,325.8 407.1,329.6 412.5,333.4 417.9,337.2 423.4,341.0 428.8,344.8 434.2,348.6 439.7,352.4 445.1,356.2 450.5,360.0 456.0,363.8 461.4,367.6 466.8,371.4 472.3,375.2 477.7,379.0 483.1,382.8 488.5,386.6 494.0,390.4 499.4,394.2 504.8,398.0 510.3,401.8 515.7,405.6 521.1,409.4 526.6,413.2" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="519.9" y="426.6" fontSize="14" fontWeight="bold" fill="#111">D</text>
        <text x="535.9" y="430.6" fontSize="11" fill="#111">(PED &gt; 1)</text>

        {/* Dashed guides P1, P2, Q1, Q2 */}
        <line x1="92" y1="255.4" x2="300.9" y2="255.4" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeDasharray="7,5"/>
        <line x1="92" y1="214.5" x2="242.4" y2="214.5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeDasharray="7,5"/>
        <line x1="300.9" y1="255.4" x2="300.9" y2="460" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeDasharray="7,5"/>
        <line x1="242.4" y1="214.5" x2="242.4" y2="460" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeDasharray="7,5"/>

        {/* Equilibrium dots */}
        <circle cx="300.9" cy="255.4" r="6" fill="#fff" stroke="#555" strokeWidth="2.2"/>
        <circle cx="242.4" cy="214.5" r="6" fill="#fff" stroke="#555" strokeWidth="2.2"/>

        {/* Price arrow bracket on y-axis */}
        <line x1="70.0" y1="255.4" x2="70.0" y2="214.5" stroke="#d97706" strokeWidth="2" markerEnd="url(#peAmberU)" markerStart="url(#peAmberD)"/>
        <text x="56.0" y="230.9" textAnchor="end" fontSize="10" fontWeight="bold" fill="#d97706">+10%</text>

        {/* Axis labels */}
        <text x="86" y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="572" y="468" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <text x="78" y="478" fontSize="13" fill="#111">O</text>

        {/* Price labels on y-axis */}
        <text x="82" y="260.4" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P1</text>
        <text x="82" y="219.5" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P2</text>

        {/* Quantity labels on x-axis */}
        <text x="242.4" y="480" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Q2</text>
        <text x="300.9" y="480" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Q1</text>

        {/* In-region labels */}
        <text x="167.2" y="228.9" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">Revenue</text>
        <text x="167.2" y="244.9" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">Gained</text>
        <text x="271.7" y="351.7" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">Revenue</text>
        <text x="271.7" y="367.7" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">Lost</text>

        {/* Net effect banner */}
        <rect x="92" y="66" width="330" height="26" rx="5" fill="rgba(220,40,40,0.12)" stroke="#dc2626" strokeWidth="1.2"/>
        <text x="257" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">Net Effect: Total Revenue FALLS (Lost &gt; Gained)</text>

        {/* Axes */}
        <line x1="92" y1="476" x2="92" y2="62" stroke="#111" strokeWidth="2.5" markerEnd="url(#peU)"/>
        <line x1="92" y1="460" x2="578" y2="460" stroke="#111" strokeWidth="2.5" markerEnd="url(#peR)"/>

        {/* Legend */}
        <rect x="92" y="496" width="16" height="16" rx="3" fill="rgba(34,197,94,0.55)" stroke="#15803d" strokeWidth="1"/>
        <text x="114" y="509" fontSize="12" fill="#111">Revenue Gained</text>
        <rect x="252" y="496" width="16" height="16" rx="3" fill="rgba(220,40,40,0.55)" stroke="#dc2626" strokeWidth="1"/>
        <text x="274" y="509" fontSize="12" fill="#111">Revenue Lost</text>

        {/* Explanation box */}
        <rect x="92" y="524" width="486" height="68" rx="6" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="104" y="542" fontSize="11" fontWeight="bold" fill="#111">Why TfL may fail to raise revenue:</text>
        <text x="104" y="558" fontSize="11" fill="#333">When PED &gt; 1, a 10% price rise causes a &gt;10% fall in quantity demanded.</text>
        <text x="104" y="574" fontSize="11" fill="#333">Commuters switch to cycling, walking or bus. The red area (revenue lost)</text>
        <text x="104" y="590" fontSize="11" fill="#333">exceeds the green area (revenue gained), so total revenue decreases.</text>
      </svg>
    </div>
  );
}