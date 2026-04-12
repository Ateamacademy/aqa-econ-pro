export default function EconADASCostPush() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'0px',maxWidth:'620px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc',overflow:'hidden'}}>
      <div style={{background:'#4a1e7a',padding:'14px 20px'}}>
        <div style={{fontSize:'20px',fontWeight:'bold',color:'#fff',textAlign:'center',letterSpacing:'1px'}}>COST PUSH INFLATION</div>
      </div>
      <svg viewBox="0 0 620 620" width="100%" style={{display:'block',background:'#fff'}}>
        <defs>
          <marker id="cpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="cpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="cpBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#2255cc"/></marker>
        </defs>
        <rect width="620" height="620" fill="#fff"/>
        <line x1="100" y1="450" x2="100" y2="102" stroke="#111" strokeWidth="2.2" markerEnd="url(#cpU)"/>
        <line x1="100" y1="450" x2="522" y2="450" stroke="#111" strokeWidth="2.2" markerEnd="url(#cpR)"/>
        <text x="96" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">GPL</text>
        <text x="510" y="458" fontSize="13" fontWeight="bold" fill="#111">Real GDP</text>
        <polyline points="100.0,422.5 106.7,418.8 113.3,415.2 120.0,411.5 126.7,407.8 133.3,404.2 140.0,400.5 146.7,396.8 153.3,393.2 160.0,389.5 166.7,385.8 173.3,382.2 180.0,378.5 186.7,374.8 193.3,371.2 200.0,367.5 206.7,363.8 213.3,360.2 220.0,356.5 226.7,352.8 233.3,349.2 240.0,345.5 246.7,341.8 253.3,338.2 260.0,334.5 266.7,330.8 273.3,327.2 280.0,323.5 286.7,319.8 293.3,316.2 300.0,312.5 306.7,308.8 313.3,305.2 320.0,301.5 326.7,297.8 333.3,294.2 340.0,290.5 346.7,286.8 353.3,283.2 360.0,279.5 366.7,275.8 373.3,272.2 380.0,268.5 386.7,264.8 393.3,261.2 400.0,257.5 406.7,253.8 413.3,250.2 420.0,246.5 426.7,242.8 433.3,239.2 440.0,235.5 446.7,231.8 453.3,228.2 460.0,224.5 466.7,220.8 473.3,217.2 480.0,213.5 486.7,209.8 493.3,206.2 500.0,202.5" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="506.0" y="194.5" fontSize="13" fontWeight="bold" fill="#2255cc">SRAS1</text>
        <polyline points="100.0,340.0 105.3,337.1 110.7,334.1 116.0,331.2 121.3,328.3 126.7,325.3 132.0,322.4 137.3,319.5 142.7,316.5 148.0,313.6 153.3,310.7 158.7,307.7 164.0,304.8 169.3,301.9 174.7,298.9 180.0,296.0 185.3,293.1 190.7,290.1 196.0,287.2 201.3,284.3 206.7,281.3 212.0,278.4 217.3,275.5 222.7,272.5 228.0,269.6 233.3,266.7 238.7,263.7 244.0,260.8 249.3,257.9 254.7,254.9 260.0,252.0 265.3,249.1 270.7,246.1 276.0,243.2 281.3,240.3 286.7,237.3 292.0,234.4 297.3,231.5 302.7,228.5 308.0,225.6 313.3,222.7 318.7,219.7 324.0,216.8 329.3,213.9 334.7,210.9 340.0,208.0 345.3,205.1 350.7,202.1 356.0,199.2 361.3,196.3 366.7,193.3 372.0,190.4 377.3,187.5 382.7,184.5 388.0,181.6 393.3,178.7 398.7,175.7 404.0,172.8 409.3,169.9 414.7,166.9 420.0,164.0" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="426.0" y="156.0" fontSize="13" fontWeight="bold" fill="#2255cc">SRAS2</text>
        <line x1="440.0" y1="235.5" x2="472.0" y2="135.4" stroke="#2255cc" strokeWidth="2.2" markerEnd="url(#cpBlue)"/>
        <polyline points="100.0,175.0 106.7,178.7 113.3,182.3 120.0,186.0 126.7,189.7 133.3,193.3 140.0,197.0 146.7,200.7 153.3,204.3 160.0,208.0 166.7,211.7 173.3,215.3 180.0,219.0 186.7,222.7 193.3,226.3 200.0,230.0 206.7,233.7 213.3,237.3 220.0,241.0 226.7,244.7 233.3,248.3 240.0,252.0 246.7,255.7 253.3,259.3 260.0,263.0 266.7,266.7 273.3,270.3 280.0,274.0 286.7,277.7 293.3,281.3 300.0,285.0 306.7,288.7 313.3,292.3 320.0,296.0 326.7,299.7 333.3,303.3 340.0,307.0 346.7,310.7 353.3,314.3 360.0,318.0 366.7,321.7 373.3,325.3 380.0,329.0 386.7,332.7 393.3,336.3 400.0,340.0 406.7,343.7 413.3,347.3 420.0,351.0 426.7,354.7 433.3,358.3 440.0,362.0 446.7,365.7 453.3,369.3 460.0,373.0 466.7,376.7 473.3,380.3 480.0,384.0 486.7,387.7 493.3,391.3 500.0,395.0" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="506.0" y="409.0" fontSize="13" fontWeight="bold" fill="#2255cc">AD</text>
        <line x1="100" y1="274.0" x2="280.0" y2="274.0" stroke="#f97316" strokeWidth="1.6" strokeDasharray="7,5"/>
        <line x1="100" y1="307.0" x2="340.0" y2="307.0" stroke="#f97316" strokeWidth="1.6" strokeDasharray="7,5"/>
        <line x1="280.0" y1="274.0" x2="280.0" y2="450" stroke="#f97316" strokeWidth="1.6" strokeDasharray="7,5"/>
        <line x1="340.0" y1="307.0" x2="340.0" y2="450" stroke="#f97316" strokeWidth="1.6" strokeDasharray="7,5"/>
        <circle cx="280.0" cy="274.0" r="7" fill="#f97316"/>
        <circle cx="340.0" cy="307.0" r="7" fill="#f97316"/>
        <text x="90" y="278.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#f97316">GPL2</text>
        <text x="90" y="311.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#f97316">GPL1</text>
        <text x="280.0" y="470" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f97316">Y2</text>
        <text x="340.0" y="470" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f97316">Y1</text>
        <rect x="100" y="486" width="422" height="50" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="112" y="504" fontSize="12" fontWeight="bold" fill="#111">In cost-push inflation,</text>
        <text x="112" y="520" fontSize="11" fill="#555">increased production costs are passed on through higher prices.</text>
        <text x="112" y="534" fontSize="11" fill="#555">SRAS shifts left: GPL rises GPL1→GPL2, Real GDP falls Y1→Y2.</text>
      </svg>
    </div>
  );
}