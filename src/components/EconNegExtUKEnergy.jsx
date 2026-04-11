export default function EconNegExtUKEnergy() {
  return (
    <div style={{background:'#0d1b2e',borderRadius:'10px',padding:'4px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <svg viewBox="0 0 640 600" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ukneR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#c8d6e8"/></marker>
          <marker id="ukneU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#c8d6e8"/></marker>
          <marker id="ukneOrgL" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#f5a623"/></marker>
          <marker id="ukneArrU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#e84040"/></marker>
          <marker id="ukneArrD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#e84040"/></marker>
        </defs>
        <rect width="640" height="600" fill="#0d1b2e"/>

        {/* Title */}
        <text x="320" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff">Negative Production Externality</text>
        <text x="320" y="44" textAnchor="middle" fontSize="12" fill="#c8d6e8">UK Energy Sector — Gas-Fired Power Stations &amp; Carbon Emissions</text>

        {/* Axes */}
        <line x1="90" y1="450" x2="90" y2="38" stroke="#c8d6e8" strokeWidth="2.2" markerEnd="url(#ukneU)"/>
        <line x1="90" y1="450" x2="534" y2="450" stroke="#c8d6e8" strokeWidth="2.2" markerEnd="url(#ukneR)"/>
        <text x="82" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c8d6e8">Costs &amp;</text>
        <text x="82" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c8d6e8">Benefits</text>
        <text x="520" y="458" fontSize="12" fontWeight="bold" fill="#c8d6e8">Output (Q)</text>

        {/* DWL welfare loss triangle: B → A → C */}
        <polygon points="295.1,233.9 357.3,282.2 357.3,178.3" fill="rgba(220,50,50,0.80)"/>

        {/* External cost gap (brace) at mid-Q */}
        <line x1="300.0" y1="311.2" x2="300.0" y2="229.5" stroke="rgba(232,64,64,0.55)" strokeWidth="1.5"/>
        <text x="306.0" y="266.4" fontSize="10" fill="#e84040">External</text>
        <text x="306.0" y="278.4" fontSize="10" fill="#e84040">cost</text>

        {/* MPC — Private Supply (blue, upward) */}
        <polyline points="90.0,417.3 95.8,414.4 101.5,411.5 107.3,408.6 113.1,405.7 118.9,402.7 124.7,399.8 130.4,396.9 136.2,394.0 142.0,391.1 147.8,388.1 153.5,385.2 159.3,382.3 165.1,379.4 170.8,376.5 176.6,373.5 182.4,370.6 188.2,367.7 193.9,364.8 199.7,361.9 205.5,358.9 211.3,356.0 217.1,353.1 222.8,350.2 228.6,347.3 234.4,344.3 240.2,341.4 245.9,338.5 251.7,335.6 257.5,332.7 263.3,329.7 269.0,326.8 274.8,323.9 280.6,321.0 286.4,318.1 292.1,315.1 297.9,312.2 303.7,309.3 309.4,306.4 315.2,303.5 321.0,300.5 326.8,297.6 332.6,294.7 338.3,291.8 344.1,288.9 349.9,286.0 355.6,283.0 361.4,280.1 367.2,277.2 373.0,274.3 378.8,271.4 384.5,268.4 390.3,265.5 396.1,262.6 401.9,259.7 407.6,256.8 413.4,253.8 419.2,250.9 424.9,248.0 430.7,245.1 436.5,242.2 442.3,239.2 448.1,236.3 453.8,233.4 459.6,230.5 465.4,227.6 471.1,224.6 476.9,221.7 482.7,218.8 488.5,215.9 494.3,213.0 500.0,210.0 505.8,207.1 511.6,204.2 517.4,201.3 523.1,198.4 528.9,195.4 534.7,192.5 540.5,189.6 546.2,186.7 552.0,183.8" fill="none" stroke="#4a90e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="86.0" y="405.3" fontSize="13" fontWeight="bold" fill="#4a90e8">S</text>
        <text x="549.6" y="194.0" fontSize="12" fontWeight="bold" fill="#4a90e8">S</text>
        <text x="413.0" y="244.1" fontSize="11" fontWeight="bold" fill="#4a90e8">MPC</text>
        <text x="413.0" y="256.1" fontSize="10" fill="#c8d6e8">(Private Supply)</text>

        {/* MSC — Social Cost (red, steeper) */}
        <polyline points="90.0,417.3 95.0,412.9 100.0,408.4 105.0,404.0 110.0,399.5 114.9,395.0 119.9,390.6 124.9,386.1 129.9,381.6 134.9,377.2 139.9,372.7 144.9,368.3 149.9,363.8 154.8,359.3 159.8,354.9 164.8,350.4 169.8,346.0 174.8,341.5 179.8,337.0 184.8,332.6 189.8,328.1 194.7,323.7 199.7,319.2 204.7,314.7 209.7,310.3 214.7,305.8 219.7,301.3 224.7,296.9 229.6,292.4 234.6,288.0 239.6,283.5 244.6,279.0 249.6,274.6 254.6,270.1 259.6,265.7 264.6,261.2 269.6,256.7 274.5,252.3 279.5,247.8 284.5,243.4 289.5,238.9 294.5,234.4 299.5,230.0 304.5,225.5 309.5,221.0 314.4,216.6 319.4,212.1 324.4,207.7 329.4,203.2 334.4,198.7 339.4,194.3 344.4,189.8 349.3,185.4 354.3,180.9 359.3,176.4 364.3,172.0 369.3,167.5 374.3,163.1 379.3,158.6 384.3,154.1 389.3,149.7 394.2,145.2 399.2,140.7 404.2,136.3 409.2,131.8 414.2,127.4 419.2,122.9 424.2,118.4 429.1,114.0 434.1,109.5 439.1,105.1 444.1,100.6 449.1,96.1 454.1,91.7 459.1,87.2 464.1,82.8 469.1,78.3 474.0,73.8 479.0,69.4 484.0,64.9 489.0,60.5" fill="none" stroke="#e84040" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="86.0" y="405.3" fontSize="13" fontWeight="bold" fill="#e84040">S</text>
        <text x="170.4" y="287.1" fontSize="11" fontWeight="bold" fill="#e84040">MSC</text>
        <text x="170.4" y="299.1" fontSize="10" fill="#c8d6e8">(Social Cost)</text>

        {/* Social Benefit / MPB (orange, downward) */}
        <polyline points="111.0,90.7 116.5,95.0 122.0,99.2 127.5,103.5 133.1,107.8 138.6,112.1 144.1,116.4 149.6,120.7 155.1,125.0 160.6,129.3 166.1,133.5 171.6,137.8 177.2,142.1 182.7,146.4 188.2,150.7 193.7,155.0 199.2,159.3 204.7,163.6 210.2,167.8 215.7,172.1 221.3,176.4 226.8,180.7 232.3,185.0 237.8,189.3 243.3,193.6 248.8,197.9 254.3,202.1 259.8,206.4 265.4,210.7 270.9,215.0 276.4,219.3 281.9,223.6 287.4,227.9 292.9,232.2 298.4,236.4 303.9,240.7 309.5,245.0 315.0,249.3 320.5,253.6 326.0,257.9 331.5,262.2 337.0,266.5 342.5,270.7 348.0,275.0 353.6,279.3 359.1,283.6 364.6,287.9 370.1,292.2 375.6,296.5 381.1,300.8 386.6,305.0 392.1,309.3 397.7,313.6 403.2,317.9 408.7,322.2 414.2,326.5 419.7,330.8 425.2,335.1 430.7,339.3 436.2,343.6 441.8,347.9 447.3,352.2 452.8,356.5 458.3,360.8 463.8,365.1 469.3,369.4 474.8,373.6 480.3,377.9 485.8,382.2 491.4,386.5 496.9,390.8 502.4,395.1 507.9,399.4 513.4,403.7 518.9,407.9 524.4,412.2 529.9,416.5 535.5,420.8 541.0,425.1 546.5,429.4 552.0,433.7" fill="none" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="526.4" y="413.5" fontSize="12" fontWeight="bold" fill="#f5a623">S</text>
        <text x="455.0" y="370.0" fontSize="11" fontWeight="bold" fill="#f5a623">MPB = MSB</text>
        <text x="455.0" y="382.0" fontSize="10" fill="#c8d6e8">(Social Benefit)</text>

        {/* P dashed horizontal guide */}
        <line x1="90" y1="282.2" x2="357.3" y2="282.2" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="80" y="287.2" textAnchor="end" fontSize="13" fontWeight="bold" fill="#c8d6e8">P</text>

        {/* Q1 vertical dashed guide */}
        <line x1="295.1" y1="233.9" x2="295.1" y2="450" stroke="rgba(76,221,136,0.45)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="295.1" y="470" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4cdd88">Q1</text>
        <text x="295.1" y="484" textAnchor="middle" fontSize="10" fill="#4cdd88">Socially</text>
        <text x="295.1" y="496" textAnchor="middle" fontSize="10" fill="#4cdd88">Efficient</text>

        {/* Q vertical dashed guide */}
        <line x1="357.3" y1="282.2" x2="357.3" y2="450" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="357.3" y="470" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c8d6e8">Q</text>
        <text x="357.3" y="484" textAnchor="middle" fontSize="10" fill="#c8d6e8">Market</text>
        <text x="357.3" y="496" textAnchor="middle" fontSize="10" fill="#c8d6e8">Equilibrium</text>

        {/* Point A — market equilibrium (green ring) */}
        <circle cx="357.3" cy="282.2" r="9" fill="#0d1b2e" stroke="#4cdd88" strokeWidth="2.5"/>
        <circle cx="357.3" cy="282.2" r="4" fill="#4cdd88"/>
        <text x="369.3" y="287.2" fontSize="13" fontWeight="bold" fill="#ffffff">A</text>
        <text x="383.3" y="287.2" fontSize="10" fill="#c8d6e8">Market eq.</text>

        {/* Point B — socially efficient (white ring) */}
        <circle cx="295.1" cy="233.9" r="9" fill="#0d1b2e" stroke="#ffffff" strokeWidth="2.5"/>
        <circle cx="295.1" cy="233.9" r="4" fill="#ffffff"/>
        <text x="273.1" y="238.9" fontSize="13" fontWeight="bold" fill="#ffffff">B</text>
        <text x="233.1" y="251.9" fontSize="10" fill="#c8d6e8">Social opt.</text>

        {/* Point C — MSC at market Q (red ring) */}
        <circle cx="357.3" cy="178.3" r="9" fill="#0d1b2e" stroke="#e84040" strokeWidth="2.5"/>
        <circle cx="357.3" cy="178.3" r="4" fill="#e84040"/>
        <text x="369.3" y="183.3" fontSize="13" fontWeight="bold" fill="#e84040">C</text>
        <text x="383.3" y="183.3" fontSize="10" fill="#c8d6e8">MSC at Q</text>

        {/* Orange left-pointing arrow */}
        <line x1="409.3" y1="230.3" x2="371.3" y2="230.3" stroke="#f5a623" strokeWidth="2.5" markerEnd="url(#ukneOrgL)"/>

        {/* DWL label inside triangle */}
        <text x="336.2" y="262.1" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">DWL</text>

        {/* Legend box */}
        <rect x="90" y="508" width="444" height="80" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(200,214,232,0.25)" strokeWidth="1.2"/>
        <text x="102" y="526" fontSize="11" fontWeight="bold" fill="#ffffff">Market failure — overproduction of electricity (Q &gt; Q1):</text>
        <text x="102" y="542" fontSize="11" fill="#c8d6e8">Gas firms only consider MPC, ignoring carbon &amp; SO₂ emissions (external cost).</text>
        <text x="102" y="558" fontSize="11" fill="#c8d6e8">Output should be Q1 (MSC=MSB). Overproduction by (Q−Q1) causes DWL</text>
        <text x="102" y="574" fontSize="11" fill="#c8d6e8">(red triangle). Corrective tax = external cost → internalises the externality.</text>
      </svg>
    </div>
  );
}