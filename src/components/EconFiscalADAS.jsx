export default function EconFiscalADAS() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'660px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 660 530" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="faR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="faU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="faBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc4400"/></marker>
        </defs>
        <rect width="660" height="530" fill="#fff"/>
        <text x="330" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Fiscal Policy and Aggregate Demand</text>
        <text x="330" y="48" textAnchor="middle" fontSize="12" fill="#555">£20bn infrastructure spending shifts AD right → higher PL and Real GDP</text>
        <line x1="88" y1="440" x2="88" y2="54" stroke="#111" strokeWidth="2.5" markerEnd="url(#faU)"/>
        <line x1="88" y1="440" x2="562" y2="440" stroke="#111" strokeWidth="2.5" markerEnd="url(#faR)"/>
        <text x="80" y="58" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="80" y="72" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Level</text>
        <text x="314" y="476" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Real National Output</text>
        <line x1="440.6" y1="440" x2="440.6" y2="62" stroke="#111" strokeWidth="2.8"/>
        <text x="446.6" y="68" fontSize="12" fontWeight="bold" fill="#111">LRAS</text>
        <polyline points="88.0,435.4 93.4,435.2 98.7,434.9 104.1,434.7 109.5,434.4 114.8,434.2 120.2,433.9 125.6,433.6 130.9,433.3 136.3,432.9 141.7,432.6 147.0,432.2 152.4,431.9 157.8,431.5 163.1,431.1 168.5,430.6 173.9,430.2 179.2,429.7 184.6,429.2 190.0,428.7 195.3,428.1 200.7,427.5 206.1,426.9 211.5,426.3 216.8,425.6 222.2,424.9 227.6,424.2 232.9,423.4 238.3,422.6 243.7,421.8 249.0,420.9 254.4,419.9 259.8,419.0 265.1,417.9 270.5,416.9 275.9,415.7 281.2,414.6 286.6,413.3 292.0,412.0 297.3,410.7 302.7,409.2 308.1,407.7 313.4,406.2 318.8,404.5 324.2,402.8 329.5,401.0 334.9,399.1 340.3,397.1 345.6,395.0 351.0,392.8 356.4,390.5 361.7,388.1 367.1,385.6 372.5,383.0 377.8,380.2 383.2,377.3 388.6,374.2 393.9,371.0 399.3,367.7 404.7,364.2 410.1,360.5 415.4,356.6 420.8,352.6 426.2,348.3 431.5,343.8 436.9,339.2 442.3,334.3 447.6,329.1 453.0,323.7 458.4,318.1 463.7,312.1 469.1,305.9 474.5,299.4 479.8,292.5 485.2,285.4 490.6,277.8 495.9,270.0 501.3,261.7 506.7,253.0 512.0,243.9 517.4,234.4" fill="none" stroke="#1a944a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="222.4" fontSize="13" fontWeight="bold" fill="#1a944a">SRAS</text>
        <polyline points="110.6,159.4 115.7,161.8 120.8,164.2 125.9,166.6 130.9,169.1 136.0,171.5 141.1,173.9 146.2,176.3 151.3,178.7 156.4,181.1 161.4,183.6 166.5,186.0 171.6,188.4 176.7,190.8 181.8,193.2 186.9,195.6 192.0,198.0 197.0,200.5 202.1,202.9 207.2,205.3 212.3,207.7 217.4,210.1 222.5,212.5 227.6,214.9 232.6,217.4 237.7,219.8 242.8,222.2 247.9,224.6 253.0,227.0 258.1,229.4 263.1,231.9 268.2,234.3 273.3,236.7 278.4,239.1 283.5,241.5 288.6,243.9 293.7,246.3 298.7,248.8 303.8,251.2 308.9,253.6 314.0,256.0 319.1,258.4 324.2,260.8 329.3,263.2 334.3,265.7 339.4,268.1 344.5,270.5 349.6,272.9 354.7,275.3 359.8,277.7 364.9,280.1 369.9,282.6 375.0,285.0 380.1,287.4 385.2,289.8 390.3,292.2 395.4,294.6 400.4,297.1 405.5,299.5 410.6,301.9 415.7,304.3 420.8,306.7 425.9,309.1 431.0,311.5 436.0,314.0 441.1,316.4 446.2,318.8 451.3,321.2 456.4,323.6 461.5,326.0 466.6,328.4 471.6,330.9 476.7,333.3 481.8,335.7 486.9,338.1 492.0,340.5 497.1,342.9 502.1,345.4 507.2,347.8 512.3,350.2 517.4,352.6" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="368.6" fontSize="13" fontWeight="bold" fill="#2255cc">AD1</text>
        <polyline points="110.6,82.7 115.7,85.1 120.8,87.6 125.9,90.0 130.9,92.4 136.0,94.8 141.1,97.2 146.2,99.6 151.3,102.1 156.4,104.5 161.4,106.9 166.5,109.3 171.6,111.7 176.7,114.1 181.8,116.5 186.9,119.0 192.0,121.4 197.0,123.8 202.1,126.2 207.2,128.6 212.3,131.0 217.4,133.4 222.5,135.9 227.6,138.3 232.6,140.7 237.7,143.1 242.8,145.5 247.9,147.9 253.0,150.4 258.1,152.8 263.1,155.2 268.2,157.6 273.3,160.0 278.4,162.4 283.5,164.8 288.6,167.3 293.7,169.7 298.7,172.1 303.8,174.5 308.9,176.9 314.0,179.3 319.1,181.7 324.2,184.2 329.3,186.6 334.3,189.0 339.4,191.4 344.5,193.8 349.6,196.2 354.7,198.7 359.8,201.1 364.9,203.5 369.9,205.9 375.0,208.3 380.1,210.7 385.2,213.1 390.3,215.6 395.4,218.0 400.4,220.4 405.5,222.8 410.6,225.2 415.7,227.6 420.8,230.0 425.9,232.5 431.0,234.9 436.0,237.3 441.1,239.7 446.2,242.1 451.3,244.5 456.4,247.0 461.5,249.4 466.6,251.8 471.6,254.2 476.7,256.6 481.8,259.0 486.9,261.4 492.0,263.9 497.1,266.3 502.1,268.7 507.2,271.1 512.3,273.5 517.4,275.9" fill="none" stroke="#cc4400" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="291.9" fontSize="13" fontWeight="bold" fill="#cc4400">AD2</text>
        <line x1="246.2" y1="223.8" x2="291.4" y2="168.6" stroke="#cc4400" strokeWidth="2.2" markerEnd="url(#faBlue)"/>
        <line x1="88" y1="322.7" x2="454.5" y2="322.7" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="88" y1="265.2" x2="494.8" y2="265.2" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="454.5" y1="322.7" x2="454.5" y2="440" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="494.8" y1="265.2" x2="494.8" y2="440" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="454.5" cy="322.7" r="6" fill="#fff" stroke="#2255cc" strokeWidth="2"/>
        <circle cx="494.8" cy="265.2" r="6" fill="#fff" stroke="#cc4400" strokeWidth="2"/>
        <text x="78" y="327.7" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">PL1</text>
        <text x="78" y="270.2" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc4400">PL2</text>
        <text x="454.5" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Y1</text>
        <text x="494.8" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc4400">Y2</text>
        <rect x="88" y="472" width="474" height="54" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="100" y="492" fontSize="11" fontWeight="bold" fill="#111">Transmission mechanism:</text>
        <text x="100" y="508" fontSize="11" fill="#333">G↑ (£20bn) → AD shifts right (AD1→AD2) → Real GDP rises Y1→Y2 and Price Level rises PL1→PL2.</text>
        <text x="100" y="522" fontSize="11" fill="#555">Multiplier effect amplifies initial injection. Near LRAS, most impact is inflationary.</text>
      </svg>
    </div>
  );
}