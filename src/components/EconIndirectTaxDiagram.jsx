export default function EconIndirectTaxDiagram() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 640 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="itR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="itU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="itArrU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="itArrD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="itRedL" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#cc0000"/></marker>
        </defs>
        <rect width="640" height="560" fill="#fff"/>

        {/* Axes */}
        <line x1="80" y1="470" x2="80" y2="34" stroke="#111" strokeWidth="2.5" markerEnd="url(#itU)"/>
        <line x1="80" y1="470" x2="552" y2="470" stroke="#111" strokeWidth="2.5" markerEnd="url(#itR)"/>
        <text x="74" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="558" y="476" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <text x="66" y="488" fontSize="13" fill="#111">0</text>

        {/* Welfare loss triangle: d, e, a  (d=Q2,P2  e=Q2,P1  a=Q1,P1) */}
        <polygon points="236.3,235.8 236.3,276.2 288.3,276.2" fill="rgba(200,0,0,0.75)"/>

        {/* Consumer surplus lost shading (lighter red trapezoid above P1 left of Q2) */}
        <polygon points="80,235.8 236.3,235.8 236.3,276.2 80,276.2" fill="rgba(200,0,0,0.25)"/>

        {/* Producer surplus lost shading (below P1 to Ps, left of Q2) */}
        <polygon points="80,276.2 236.3,276.2 236.3,316.5 80,316.5" fill="rgba(180,0,0,0.18)"/>

        {/* S1 curve */}
        <polyline points="80.0,437.7 85.2,433.7 90.3,429.7 95.5,425.7 100.6,421.7 105.8,417.7 110.9,413.7 116.1,409.7 121.3,405.7 126.4,401.7 131.6,397.7 136.7,393.7 141.9,389.7 147.0,385.7 152.2,381.7 157.3,377.7 162.5,373.7 167.7,369.7 172.8,365.7 178.0,361.7 183.1,357.7 188.3,353.7 193.4,349.7 198.6,345.7 203.8,341.7 208.9,337.7 214.1,333.7 219.2,329.7 224.4,325.7 229.5,321.7 234.7,317.8 239.8,313.8 245.0,309.8 250.2,305.8 255.3,301.8 260.5,297.8 265.6,293.8 270.8,289.8 275.9,285.8 281.1,281.8 286.3,277.8 291.4,273.8 296.6,269.8 301.7,265.8 306.9,261.8 312.0,257.8 317.2,253.8 322.3,249.8 327.5,245.8 332.7,241.8 337.8,237.8 343.0,233.8 348.1,229.8 353.3,225.8 358.4,221.8 363.6,217.8 368.8,213.8 373.9,209.8 379.1,205.8 384.2,201.8 389.4,197.8 394.5,193.8 399.7,189.8 404.8,185.8 410.0,181.8 415.2,177.8 420.3,173.8 425.5,169.8 430.6,165.8 435.8,161.8 440.9,157.8 446.1,153.8 451.3,149.8 456.4,145.8 461.6,141.8 466.7,137.8 471.9,133.8 477.0,129.8 482.2,125.8 487.3,121.8 492.5,117.8" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="473.8" y="120.4" fontSize="13" fontWeight="bold" fill="#111">S1</text>

        {/* S1+Tax curve */}
        <polyline points="80.0,356.9 84.7,353.3 89.4,349.7 94.1,346.0 98.8,342.4 103.4,338.8 108.1,335.1 112.8,331.5 117.5,327.8 122.2,324.2 126.9,320.6 131.6,316.9 136.3,313.3 140.9,309.7 145.6,306.0 150.3,302.4 155.0,298.8 159.7,295.1 164.4,291.5 169.1,287.9 173.8,284.2 178.4,280.6 183.1,277.0 187.8,273.3 192.5,269.7 197.2,266.1 201.9,262.4 206.6,258.8 211.3,255.2 215.9,251.5 220.6,247.9 225.3,244.2 230.0,240.6 234.7,237.0 239.4,233.3 244.1,229.7 248.8,226.1 253.4,222.4 258.1,218.8 262.8,215.2 267.5,211.5 272.2,207.9 276.9,204.3 281.6,200.6 286.3,197.0 290.9,193.4 295.6,189.7 300.3,186.1 305.0,182.5 309.7,178.8 314.4,175.2 319.1,171.6 323.8,167.9 328.4,164.3 333.1,160.7 337.8,157.0 342.5,153.4 347.2,149.8 351.9,146.1 356.6,142.5 361.3,138.8 365.9,135.2 370.6,131.6 375.3,127.9 380.0,124.3 384.7,120.7 389.4,117.0 394.1,113.4 398.8,109.8 403.4,106.1 408.1,102.5 412.8,98.9 417.5,95.2 422.2,91.6 426.9,88.0 431.6,84.3 436.3,80.7 440.9,77.1 445.6,73.4 450.3,69.8 455.0,66.2" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="436.3" y="68.7" fontSize="13" fontWeight="bold" fill="#111">S1+Tax</text>

        {/* D1 curve */}
        <polyline points="80.0,114.6 85.2,118.6 90.3,122.6 95.5,126.6 100.6,130.6 105.8,134.6 110.9,138.6 116.1,142.6 121.3,146.6 126.4,150.6 131.6,154.6 136.7,158.6 141.9,162.6 147.0,166.6 152.2,170.6 157.3,174.6 162.5,178.6 167.7,182.6 172.8,186.6 178.0,190.6 183.1,194.6 188.3,198.6 193.4,202.6 198.6,206.6 203.8,210.6 208.9,214.6 214.1,218.6 219.2,222.6 224.4,226.6 229.5,230.6 234.7,234.6 239.8,238.6 245.0,242.6 250.2,246.6 255.3,250.5 260.5,254.5 265.6,258.5 270.8,262.5 275.9,266.5 281.1,270.5 286.3,274.5 291.4,278.5 296.6,282.5 301.7,286.5 306.9,290.5 312.0,294.5 317.2,298.5 322.3,302.5 327.5,306.5 332.7,310.5 337.8,314.5 343.0,318.5 348.1,322.5 353.3,326.5 358.4,330.5 363.6,334.5 368.8,338.5 373.9,342.5 379.1,346.5 384.2,350.5 389.4,354.5 394.5,358.5 399.7,362.5 404.8,366.5 410.0,370.5 415.2,374.5 420.3,378.5 425.5,382.5 430.6,386.5 435.8,390.5 440.9,394.5 446.1,398.5 451.3,402.5 456.4,406.5 461.6,410.5 466.7,414.5 471.9,418.5 477.0,422.5 482.2,426.5 487.3,430.5 492.5,434.5" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="485.0" y="442.6" fontSize="13" fontWeight="bold" fill="#111">D1</text>

        {/* Dotted guide lines */}
        <line x1="80" y1="235.8" x2="236.3" y2="235.8" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="80" y1="276.2" x2="288.3" y2="276.2" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="80" y1="316.5" x2="236.3" y2="316.5" stroke="#cc0000" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="236.3" y1="235.8" x2="236.3" y2="470" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="288.3" y1="276.2" x2="288.3" y2="470" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>

        {/* Key points */}
        <circle cx="288.3" cy="276.2" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="296.3" y="270.2" fontSize="13" fontWeight="bold" fill="#111">a</text>

        <circle cx="236.3" cy="235.8" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="222.3" y="229.8" fontSize="13" fontWeight="bold" fill="#111">d</text>

        <circle cx="236.3" cy="276.2" r="4" fill="#cc0000"/>
        <text x="242.3" y="281.2" fontSize="13" fontWeight="bold" fill="#111">e</text>

        <circle cx="236.3" cy="316.5" r="4" fill="#fff" stroke="#111" strokeWidth="2"/>
        <text x="242.3" y="321.5" fontSize="13" fontWeight="bold" fill="#111">c</text>

        {/* Y-axis price labels */}
        <text x="70" y="240.8" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc0000">P2</text>
        <text x="70" y="281.2" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc0000">P1</text>
        <text x="70" y="321.5" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">b</text>

        {/* X-axis quantity labels */}
        <text x="236.3" y="490" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc0000">Q2</text>
        <text x="288.3" y="490" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc0000">Q1</text>

        {/* Tax per unit double arrow */}
        <line x1="333.3" y1="241.3" x2="333.3" y2="160.5" stroke="#111" strokeWidth="1.8" markerEnd="url(#itArrU)" markerStart="url(#itArrD)"/>
        <text x="341.3" y="196.9" fontSize="11" fontWeight="bold" fill="#111">Tax per</text>
        <text x="341.3" y="209.9" fontSize="11" fontWeight="bold" fill="#111">unit</text>

        {/* Welfare loss label + left-pointing arrow */}
        <text x="358.3" y="281.2" fontSize="12" fontWeight="bold" fill="#111">Welfare loss</text>
        <line x1="356.3" y1="276.2" x2="302.3" y2="276.2" stroke="#cc0000" strokeWidth="1.8" markerEnd="url(#itRedL)"/>

        {/* Consumer / Producer labels inside shaded areas */}
        <text x="158.2" y="261.0" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Consumer</text>
        <text x="158.2" y="301.4" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Producer</text>

        {/* Explanation box */}
        <rect x="80" y="504" width="472" height="56" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="92" y="522" fontSize="11" fontWeight="bold" fill="#111">Specific (per unit) tax effect:</text>
        <text x="92" y="538" fontSize="11" fill="#333">S1 shifts left/up to S1+Tax. Price rises P1→P2 (consumer burden). Producer receives less (b).</text>
        <text x="92" y="554" fontSize="11" fill="#333">Output falls Q1→Q2. Red triangle (d-e-a) = deadweight welfare loss from tax.</text>
      </svg>
    </div>
  );
}