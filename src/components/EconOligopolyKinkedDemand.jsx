export default function EconOligopolyKinkedDemand() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 640 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="kdR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="kdU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="640" height="540" fill="#fff"/>
        <text x="320" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Oligopoly — Kinked Demand Curve</text>
        <text x="320" y="44" textAnchor="middle" fontSize="11" fill="#555">Price rigidity: rivals match price cuts but not rises → kinked AR and discontinuous MR</text>
        <line x1="80" y1="450" x2="80" y2="42" stroke="#111" strokeWidth="2.2" markerEnd="url(#kdU)"/>
        <line x1="80" y1="450" x2="562" y2="450" stroke="#111" strokeWidth="2.2" markerEnd="url(#kdR)"/>
        <text x="74" y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Price/costs</text>
        <text x="550" y="458" fontSize="13" fontWeight="bold" fill="#111">Output</text>
        <polyline points="80.0,157.5 83.8,158.7 87.7,159.8 91.5,161.0 95.3,162.1 99.2,163.3 103.0,164.5 106.8,165.6 110.7,166.8 114.5,167.9 118.3,169.1 122.2,170.3 126.0,171.4 129.8,172.6 133.7,173.8 137.5,174.9 141.3,176.1 145.2,177.2 149.0,178.4 152.8,179.6 156.7,180.7 160.5,181.9 164.3,183.0 168.2,184.2 172.0,185.4 175.8,186.5 179.7,187.7 183.5,188.8 187.3,190.0 191.2,191.2 195.0,192.3 198.8,193.5 202.7,194.6 206.5,195.8 210.3,197.0 214.2,198.1 218.0,199.3 221.8,200.4 225.7,201.6 229.5,202.8 233.3,203.9 237.2,205.1 241.0,206.3 244.8,207.4 248.7,208.6 252.5,209.7 256.3,210.9 260.2,212.1 264.0,213.2 267.8,214.4 271.7,215.5 275.5,216.7 279.3,217.9 283.2,219.0 287.0,220.2 290.8,221.3 294.7,222.5 298.5,223.7 302.3,224.8 306.2,226.0 310.0,227.1" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="310.0,227.1 313.5,229.6 316.9,232.2 320.4,234.7 323.8,237.2 327.3,239.7 330.7,242.2 334.1,244.7 337.6,247.2 341.1,249.7 344.5,252.2 347.9,254.7 351.4,257.2 354.8,259.7 358.3,262.2 361.8,264.8 365.2,267.3 368.7,269.8 372.1,272.3 375.5,274.8 379.0,277.3 382.4,279.8 385.9,282.3 389.3,284.8 392.8,287.3 396.3,289.8 399.7,292.3 403.2,294.8 406.6,297.3 410.1,299.8 413.5,302.4 417.0,304.9 420.4,307.4 423.8,309.9 427.3,312.4 430.8,314.9 434.2,317.4 437.7,319.9 441.1,322.4 444.6,324.9 448.0,327.4 451.4,329.9 454.9,332.4 458.4,334.9 461.8,337.5 465.3,340.0 468.7,342.5 472.2,345.0 475.6,347.5 479.1,350.0 482.5,352.5 485.9,355.0 489.4,357.5 492.8,360.0 496.3,362.5 499.8,365.0 503.2,367.5 506.6,370.0 510.1,372.6 513.6,375.1 517.0,377.6" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="523.0" y="391.6" fontSize="13" fontWeight="bold" fill="#2255cc">AR=D</text>
        <polyline points="80.0,157.5 83.8,159.8 87.7,162.1 91.5,164.5 95.3,166.8 99.2,169.1 103.0,171.4 106.8,173.8 110.7,176.1 114.5,178.4 118.3,180.7 122.2,183.0 126.0,185.4 129.8,187.7 133.7,190.0 137.5,192.3 141.3,194.6 145.2,197.0 149.0,199.3 152.8,201.6 156.7,203.9 160.5,206.3 164.3,208.6 168.2,210.9 172.0,213.2 175.8,215.5 179.7,217.9 183.5,220.2 187.3,222.5 191.2,224.8 195.0,227.1 198.8,229.5 202.7,231.8 206.5,234.1 210.3,236.4 214.2,238.8 218.0,241.1 221.8,243.4 225.7,245.7 229.5,248.0 233.3,250.4 237.2,252.7 241.0,255.0 244.8,257.3 248.7,259.6 252.5,262.0 256.3,264.3 260.2,266.6 264.0,268.9 267.8,271.3 271.7,273.6 275.5,275.9 279.3,278.2 283.2,280.5 287.0,282.9 290.8,285.2 294.7,287.5 298.5,289.8 302.3,292.1 306.2,294.5 310.0,296.8" fill="none" stroke="#cc4400" strokeWidth="2.2" strokeDasharray="7,5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="310.0,394.3 313.5,399.3 316.9,404.3 320.4,409.3 323.8,414.3 327.3,419.4 330.7,424.4 334.1,429.4 337.6,434.4 341.1,439.4 344.5,444.4 347.9,449.4 351.4,454.5 354.8,459.5 358.3,464.5 361.8,469.5 365.2,474.5 368.7,479.5 372.1,484.5 375.5,489.6 379.0,494.6 382.4,499.6 385.9,504.6" fill="none" stroke="#cc4400" strokeWidth="2.2" strokeDasharray="7,5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="523.0" y="709.1" fontSize="13" fontWeight="bold" fill="#cc4400">MR</text>
        <rect x="310.0" y="296.8" width="4" height="97.5" fill="rgba(255,100,0,0.30)" stroke="#cc4400" strokeWidth="1.2"/>
        <text x="318.0" y="350.6" fontSize="10" fontWeight="bold" fill="#cc4400">MR gap</text>
        <polyline points="93.8,416.3 100.1,413.6 106.4,411.0 112.7,408.3 118.9,405.6 125.2,403.0 131.5,400.3 137.8,397.6 144.1,395.0 150.4,392.3 156.7,389.6 163.0,387.0 169.2,384.3 175.5,381.6 181.8,379.0 188.1,376.3 194.4,373.7 200.7,371.0 207.0,368.3 213.2,365.7 219.5,363.0 225.8,360.3 232.1,357.7 238.4,355.0 244.7,352.3 251.0,349.7 257.3,347.0 263.5,344.3 269.8,341.7 276.1,339.0 282.4,336.3 288.7,333.7 295.0,331.0 301.3,328.3 307.5,325.7 313.8,323.0 320.1,320.4 326.4,317.7 332.7,315.0 339.0,312.4 345.3,309.7 351.6,307.0 357.8,304.4 364.1,301.7 370.4,299.0 376.7,296.4 383.0,293.7 389.3,291.0 395.6,288.4 401.8,285.7 408.1,283.0 414.4,280.4 420.7,277.7 427.0,275.0 433.3,272.4 439.6,269.7 445.9,267.1 452.1,264.4 458.4,261.7 464.7,259.1 471.0,256.4" fill="none" stroke="#1a944a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="477.0" y="248.4" fontSize="13" fontWeight="bold" fill="#1a944a">MC</text>
        <line x1="80" y1="227.1" x2="310.0" y2="227.1" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="310.0" y1="227.1" x2="310.0" y2="450" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="310.0" cy="227.1" r="8" fill="#fff" stroke="#2255cc" strokeWidth="2.5"/>
        <text x="70" y="231.1" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">P*</text>
        <text x="310.0" y="468" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Q*</text>
        <text x="149.0" y="164.4" fontSize="10" fill="#555">Rivals do NOT</text>
        <text x="149.0" y="176.4" fontSize="10" fill="#555">match price rise</text>
        <text x="379.0" y="293.3" fontSize="10" fill="#555">Rivals match</text>
        <text x="379.0" y="305.3" fontSize="10" fill="#555">price cut</text>
        <rect x="80" y="486" width="482" height="42" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="92" y="502" fontSize="11" fontWeight="bold" fill="#111">Price rigidity:</text>
        <text x="92" y="518" fontSize="11" fill="#555">MC can shift within the MR gap without changing P* or Q*. Explains sticky prices in oligopolistic markets.</text>
      </svg>
    </div>
  );
}