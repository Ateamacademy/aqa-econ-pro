export default function EconADSupplySide() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'660px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 660 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ssR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ssU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ssGrn" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a944a"/></marker>
        </defs>
        <rect width="660" height="540" fill="#fff"/>
        <text x="330" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">AD/AS · Supply-Side Policy Effect</text>
        <text x="330" y="50" textAnchor="middle" fontSize="12" fill="#555">Rightward shift of LRAS/SRAS → lower price level, higher real GDP</text>
        <line x1="88" y1="440" x2="88" y2="52" stroke="#111" strokeWidth="2.5" markerEnd="url(#ssU)"/>
        <line x1="88" y1="440" x2="562" y2="440" stroke="#111" strokeWidth="2.5" markerEnd="url(#ssR)"/>
        <text x="82" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="82" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Level</text>
        <text x="314" y="476" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Real GDP</text>
        <line x1="336.6" y1="440" x2="336.6" y2="60" stroke="#111" strokeWidth="2.8"/>
        <text x="314.6" y="66" fontSize="12" fontWeight="bold" fill="#111">LRAS1</text>
        <line x1="449.6" y1="440" x2="449.6" y2="60" stroke="#1a944a" strokeWidth="2.8" strokeDasharray="none"/>
        <text x="453.6" y="66" fontSize="12" fontWeight="bold" fill="#1a944a">LRAS2</text>
        <line x1="348.6" y1="110" x2="437.6" y2="110" stroke="#1a944a" strokeWidth="2.2" markerEnd="url(#ssGrn)"/>
        <polyline points="88.0,434.4 93.4,434.2 98.7,433.9 104.1,433.6 109.5,433.4 114.8,433.0 120.2,432.7 125.6,432.4 130.9,432.0 136.3,431.7 141.7,431.3 147.0,430.9 152.4,430.5 157.8,430.0 163.1,429.6 168.5,429.1 173.9,428.6 179.2,428.0 184.6,427.5 190.0,426.9 195.3,426.3 200.7,425.7 206.1,425.0 211.5,424.3 216.8,423.6 222.2,422.9 227.6,422.1 232.9,421.2 238.3,420.4 243.7,419.5 249.0,418.5 254.4,417.5 259.8,416.5 265.1,415.4 270.5,414.3 275.9,413.1 281.2,411.8 286.6,410.5 292.0,409.2 297.3,407.7 302.7,406.3 308.1,404.7 313.4,403.1 318.8,401.4 324.2,399.6 329.5,397.7 334.9,395.8 340.3,393.7 345.6,391.6 351.0,389.4 356.4,387.0 361.7,384.6 367.1,382.0 372.5,379.3 377.8,376.5 383.2,373.6 388.6,370.5 393.9,367.3 399.3,364.0 404.7,360.5 410.1,356.8 415.4,353.0 420.8,348.9 426.2,344.7 431.5,340.3 436.9,335.7 442.3,330.9 447.6,325.9 453.0,320.6 458.4,315.1 463.7,309.3 469.1,303.3 474.5,297.0 479.8,290.4 485.2,283.5 490.6,276.3 495.9,268.7 501.3,260.8 506.7,252.5 512.0,243.9 517.4,234.8" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="none"/>
        <text x="517.4" y="222.8" fontSize="12" fontWeight="bold" fill="#555">SRAS1</text>
        <polyline points="88.0,437.9 93.4,437.8 98.7,437.7 104.1,437.5 109.5,437.4 114.8,437.3 120.2,437.2 125.6,437.1 130.9,436.9 136.3,436.8 141.7,436.6 147.0,436.5 152.4,436.3 157.8,436.1 163.1,436.0 168.5,435.8 173.9,435.6 179.2,435.4 184.6,435.2 190.0,434.9 195.3,434.7 200.7,434.5 206.1,434.2 211.5,433.9 216.8,433.7 222.2,433.4 227.6,433.1 232.9,432.7 238.3,432.4 243.7,432.1 249.0,431.7 254.4,431.3 259.8,430.9 265.1,430.5 270.5,430.0 275.9,429.6 281.2,429.1 286.6,428.6 292.0,428.1 297.3,427.5 302.7,426.9 308.1,426.3 313.4,425.7 318.8,425.1 324.2,424.4 329.5,423.6 334.9,422.9 340.3,422.1 345.6,421.3 351.0,420.4 356.4,419.5 361.7,418.6 367.1,417.6 372.5,416.5 377.8,415.5 383.2,414.3 388.6,413.1 393.9,411.9 399.3,410.6 404.7,409.2 410.1,407.8 415.4,406.3 420.8,404.8 426.2,403.2 431.5,401.5 436.9,399.7 442.3,397.8 447.6,395.9 453.0,393.8 458.4,391.7 463.7,389.5 469.1,387.1 474.5,384.7 479.8,382.1 485.2,379.5 490.6,376.7 495.9,373.8 501.3,370.7 506.7,367.5 512.0,364.2 517.4,360.7" fill="none" stroke="#1a944a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="348.7" fontSize="12" fontWeight="bold" fill="#1a944a">SRAS2</text>
        <polyline points="110.6,173.3 115.7,175.7 120.8,178.1 125.9,180.6 130.9,183.0 136.0,185.4 141.1,187.9 146.2,190.3 151.3,192.7 156.4,195.1 161.4,197.6 166.5,200.0 171.6,202.4 176.7,204.9 181.8,207.3 186.9,209.7 192.0,212.1 197.0,214.6 202.1,217.0 207.2,219.4 212.3,221.9 217.4,224.3 222.5,226.7 227.6,229.1 232.6,231.6 237.7,234.0 242.8,236.4 247.9,238.9 253.0,241.3 258.1,243.7 263.1,246.1 268.2,248.6 273.3,251.0 278.4,253.4 283.5,255.8 288.6,258.3 293.7,260.7 298.7,263.1 303.8,265.6 308.9,268.0 314.0,270.4 319.1,272.8 324.2,275.3 329.3,277.7 334.3,280.1 339.4,282.6 344.5,285.0 349.6,287.4 354.7,289.8 359.8,292.3 364.9,294.7 369.9,297.1 375.0,299.6 380.1,302.0 385.2,304.4 390.3,306.8 395.4,309.3 400.4,311.7 405.5,314.1 410.6,316.6 415.7,319.0 420.8,321.4 425.9,323.8 431.0,326.3 436.0,328.7 441.1,331.1 446.2,333.5 451.3,336.0 456.4,338.4 461.5,340.8 466.6,343.3 471.6,345.7 476.7,348.1 481.8,350.5 486.9,353.0 492.0,355.4 497.1,357.8 502.1,360.3 507.2,362.7 512.3,365.1 517.4,367.5" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="517.4" y="383.5" fontSize="13" fontWeight="bold" fill="#2255cc">AD</text>
        <line x1="88" y1="331.5" x2="441.9" y2="331.5" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="88" y1="356.8" x2="494.8" y2="356.8" stroke="#1a944a" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="441.9" y1="331.5" x2="441.9" y2="440" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="494.8" y1="356.8" x2="494.8" y2="440" stroke="#1a944a" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="441.9" cy="331.5" r="6" fill="#fff" stroke="#555" strokeWidth="2"/>
        <circle cx="494.8" cy="356.8" r="6" fill="#fff" stroke="#1a944a" strokeWidth="2"/>
        <text x="78" y="336.5" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">PL1</text>
        <text x="78" y="361.8" textAnchor="end" fontSize="13" fontWeight="bold" fill="#1a944a">PL2</text>
        <text x="441.9" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Y1</text>
        <text x="494.8" y="460" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a944a">Y2</text>
        <text x="98" y="100" fontSize="12" fontWeight="bold" fill="#1a944a">Supply-side policies:</text>
        <text x="98" y="116" fontSize="11" fill="#555">e.g. vocational training, deregulation,</text>
        <text x="98" y="130" fontSize="11" fill="#555">infrastructure investment → LRAS shifts right</text>
      </svg>
    </div>
  );
}