export default function EconADDemandPull() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'660px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 660 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="dpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="dpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="dpBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#2255cc"/></marker>
        </defs>
        <rect width="660" height="540" fill="#fff"/>
        <text x="330" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">AD/AS — Demand-Pull Inflation</text>
        <text x="330" y="50" textAnchor="middle" fontSize="12" fill="#555">Rightward shift of AD causes higher price level and higher real GDP</text>
        <line x1="88" y1="440" x2="88" y2="52" stroke="#111" strokeWidth="2.5" markerEnd="url(#dpU)"/>
        <line x1="88" y1="440" x2="562" y2="440" stroke="#111" strokeWidth="2.5" markerEnd="url(#dpR)"/>
        <text x="82" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="82" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Level</text>
        <text x="314" y="476" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Real GDP</text>
        <line x1="404.4" y1="440" x2="404.4" y2="60" stroke="#111" strokeWidth="2.8"/>
        <text x="410.4" y="66" fontSize="12" fontWeight="bold" fill="#111">LRAS</text>
        <polyline points="88.0,434.4 93.4,434.2 98.7,433.9 104.1,433.6 109.5,433.4 114.8,433.0 120.2,432.7 125.6,432.4 130.9,432.0 136.3,431.7 141.7,431.3 147.0,430.9 152.4,430.5 157.8,430.0 163.1,429.6 168.5,429.1 173.9,428.6 179.2,428.0 184.6,427.5 190.0,426.9 195.3,426.3 200.7,425.7 206.1,425.0 211.5,424.3 216.8,423.6 222.2,422.9 227.6,422.1 232.9,421.2 238.3,420.4 243.7,419.5 249.0,418.5 254.4,417.5 259.8,416.5 265.1,415.4 270.5,414.3 275.9,413.1 281.2,411.8 286.6,410.5 292.0,409.2 297.3,407.7 302.7,406.3 308.1,404.7 313.4,403.1 318.8,401.4 324.2,399.6 329.5,397.7 334.9,395.8 340.3,393.7 345.6,391.6 351.0,389.4 356.4,387.0 361.7,384.6 367.1,382.0 372.5,379.3 377.8,376.5 383.2,373.6 388.6,370.5 393.9,367.3 399.3,364.0 404.7,360.5 410.1,356.8 415.4,353.0 420.8,348.9 426.2,344.7 431.5,340.3 436.9,335.7 442.3,330.9 447.6,325.9 453.0,320.6 458.4,315.1 463.7,309.3 469.1,303.3 474.5,297.0 479.8,290.4 485.2,283.5 490.6,276.3 495.9,268.7 501.3,260.8 506.7,252.5 512.0,243.9 517.4,234.8" fill="none" stroke="#1a944a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="222.8" fontSize="13" fontWeight="bold" fill="#1a944a">SRAS</text>
        <polyline points="110.6,203.4 115.7,205.6 120.8,207.9 125.9,210.1 130.9,212.4 136.0,214.6 141.1,216.9 146.2,219.1 151.3,221.4 156.4,223.6 161.4,225.9 166.5,228.2 171.6,230.4 176.7,232.7 181.8,234.9 186.9,237.2 192.0,239.4 197.0,241.7 202.1,243.9 207.2,246.2 212.3,248.4 217.4,250.7 222.5,253.0 227.6,255.2 232.6,257.5 237.7,259.7 242.8,262.0 247.9,264.2 253.0,266.5 258.1,268.7 263.1,271.0 268.2,273.2 273.3,275.5 278.4,277.8 283.5,280.0 288.6,282.3 293.7,284.5 298.7,286.8 303.8,289.0 308.9,291.3 314.0,293.5 319.1,295.8 324.2,298.1 329.3,300.3 334.3,302.6 339.4,304.8 344.5,307.1 349.6,309.3 354.7,311.6 359.8,313.8 364.9,316.1 369.9,318.3 375.0,320.6 380.1,322.9 385.2,325.1 390.3,327.4 395.4,329.6 400.4,331.9 405.5,334.1 410.6,336.4 415.7,338.6 420.8,340.9 425.9,343.1 431.0,345.4 436.0,347.7 441.1,349.9 446.2,352.2 451.3,354.4 456.4,356.7 461.5,358.9 466.6,361.2 471.6,363.4 476.7,365.7 481.8,367.9 486.9,370.2 492.0,372.5 497.1,374.7 502.1,377.0 507.2,379.2 512.3,381.5 517.4,383.7" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="399.7" fontSize="13" fontWeight="bold" fill="#2255cc">AD1</text>
        <polyline points="110.6,126.3 115.7,128.5 120.8,130.8 125.9,133.0 130.9,135.3 136.0,137.5 141.1,139.8 146.2,142.1 151.3,144.3 156.4,146.6 161.4,148.8 166.5,151.1 171.6,153.3 176.7,155.6 181.8,157.8 186.9,160.1 192.0,162.3 197.0,164.6 202.1,166.9 207.2,169.1 212.3,171.4 217.4,173.6 222.5,175.9 227.6,178.1 232.6,180.4 237.7,182.6 242.8,184.9 247.9,187.1 253.0,189.4 258.1,191.7 263.1,193.9 268.2,196.2 273.3,198.4 278.4,200.7 283.5,202.9 288.6,205.2 293.7,207.4 298.7,209.7 303.8,211.9 308.9,214.2 314.0,216.5 319.1,218.7 324.2,221.0 329.3,223.2 334.3,225.5 339.4,227.7 344.5,230.0 349.6,232.2 354.7,234.5 359.8,236.8 364.9,239.0 369.9,241.3 375.0,243.5 380.1,245.8 385.2,248.0 390.3,250.3 395.4,252.5 400.4,254.8 405.5,257.0 410.6,259.3 415.7,261.6 420.8,263.8 425.9,266.1 431.0,268.3 436.0,270.6 441.1,272.8 446.2,275.1 451.3,277.3 456.4,279.6 461.5,281.8 466.6,284.1 471.6,286.4 476.7,288.6 481.8,290.9 486.9,293.1 492.0,295.4 497.1,297.6 502.1,299.9 507.2,302.1 512.3,304.4 517.4,306.6" fill="none" stroke="#cc4400" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="322.6" fontSize="13" fontWeight="bold" fill="#cc4400">AD2</text>
        <line x1="246.2" y1="263.5" x2="291.4" y2="206.4" stroke="#cc4400" strokeWidth="2.2" markerEnd="url(#dpBlue)"/>
        <line x1="88" y1="343.0" x2="425.6" y2="343.0" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="88" y1="289.4" x2="478.5" y2="289.4" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="425.6" y1="343.0" x2="425.6" y2="440" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="478.5" y1="289.4" x2="478.5" y2="440" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="425.6" cy="343.0" r="6" fill="#fff" stroke="#2255cc" strokeWidth="2"/>
        <circle cx="478.5" cy="289.4" r="6" fill="#fff" stroke="#cc4400" strokeWidth="2"/>
        <text x="78" y="348.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">PL1</text>
        <text x="78" y="294.4" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc4400">PL2</text>
        <text x="425.6" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Y1</text>
        <text x="478.5" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc4400">Y2</text>
        <text x="178.4" y="100" fontSize="12" fontWeight="bold" fill="#cc4400">AD shifts right →</text>
        <text x="178.4" y="116" fontSize="11" fill="#555">e.g. higher consumer spending,</text>
        <text x="178.4" y="130" fontSize="11" fill="#555">government spending or exports</text>
      </svg>
    </div>
  );
}