export default function EconCoffeeMarketUK() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ckR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="ckU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="ckBlueLft" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,10 3.5,0 7" fill="#2255cc"/></marker>
          <marker id="ckRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="ckRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>

        {/* Title */}
        <text x="340" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#111">UK Coffee Market</text>
        <text x="340" y="52" textAnchor="middle" fontSize="12" fill="#555">Supply shock (Brazil harvest) + Demand increase (at-home brewing)</text>

        {/* Axes */}
        <line x1="100" y1="460" x2="100" y2="60" stroke="#111" strokeWidth="2.8" markerEnd="url(#ckU)"/>
        <line x1="100" y1="460" x2="588" y2="460" stroke="#111" strokeWidth="2.8" markerEnd="url(#ckR)"/>
        <text x="94" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Price</text>
        <text x="594" y="466" fontSize="14" fontWeight="bold" fill="#111">Quantity</text>

        {/* D1 curve · black downward */}
        <polyline points="113.8,106.8 118.2,110.2 122.5,113.7 126.9,117.1 131.3,120.6 135.7,124.1 140.0,127.5 144.4,131.0 148.8,134.4 153.1,137.9 157.5,141.4 161.9,144.8 166.2,148.3 170.6,151.7 175.0,155.2 179.4,158.7 183.7,162.1 188.1,165.6 192.5,169.0 196.8,172.5 201.2,175.9 205.6,179.4 209.9,182.9 214.3,186.3 218.7,189.8 223.0,193.2 227.4,196.7 231.8,200.2 236.2,203.6 240.5,207.1 244.9,210.5 249.3,214.0 253.6,217.5 258.0,220.9 262.4,224.4 266.8,227.8 271.1,231.3 275.5,234.8 279.9,238.2 284.2,241.7 288.6,245.1 293.0,248.6 297.3,252.1 301.7,255.5 306.1,259.0 310.5,262.4 314.8,265.9 319.2,269.4 323.6,272.8 327.9,276.3 332.3,279.7 336.7,283.2 341.0,286.7 345.4,290.1 349.8,293.6 354.1,297.0 358.5,300.5 362.9,304.0 367.3,307.4 371.6,310.9 376.0,314.3 380.4,317.8 384.7,321.3 389.1,324.7 393.5,328.2 397.8,331.6 402.2,335.1 406.6,338.6 411.0,342.0 415.3,345.5 419.7,348.9 424.1,352.4 428.4,355.8 432.8,359.3 437.2,362.8 441.5,366.2 445.9,369.7 450.3,373.1 454.7,376.6 459.0,380.1 463.4,383.5 467.8,387.0 472.1,390.4 476.5,393.9 480.9,397.4 485.3,400.8 489.6,404.3 494.0,407.7 498.4,411.2 502.7,414.7 507.1,418.1 511.5,421.6 515.8,425.0 520.2,428.5 524.6,432.0 529.0,435.4 533.3,438.9 537.7,442.3 542.1,445.8 546.4,449.3 550.8,452.7" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="558.8" y="457.7" fontSize="14" fontWeight="bold" fill="#111">D</text>
        <text x="574.8" y="461.7" fontSize="11" fill="#111">1</text>

        {/* S1 curve · black upward */}
        <polyline points="123.0,453.9 127.3,453.6 131.6,453.3 135.8,453.0 140.1,452.7 144.4,452.3 148.7,451.9 152.9,451.6 157.2,451.2 161.5,450.7 165.8,450.3 170.1,449.8 174.3,449.3 178.6,448.8 182.9,448.3 187.2,447.7 191.4,447.2 195.7,446.6 200.0,445.9 204.3,445.2 208.6,444.5 212.8,443.8 217.1,443.0 221.4,442.2 225.7,441.4 230.0,440.5 234.2,439.6 238.5,438.6 242.8,437.6 247.1,436.5 251.3,435.4 255.6,434.2 259.9,433.0 264.2,431.7 268.5,430.4 272.7,428.9 277.0,427.5 281.3,425.9 285.6,424.3 289.8,422.6 294.1,420.8 298.4,419.0 302.7,417.0 307.0,415.0 311.2,412.8 315.5,410.6 319.8,408.2 324.1,405.7 328.3,403.2 332.6,400.5 336.9,397.6 341.2,394.7 345.5,391.5 349.7,388.3 354.0,384.9 358.3,381.3 362.6,377.6 366.8,373.6 371.1,369.5 375.4,365.2 379.7,360.7 384.0,356.0 388.2,351.0 392.5,345.8 396.8,340.4 401.1,334.7 405.3,328.7 409.6,322.5 413.9,316.0 418.2,309.1 422.5,301.9 426.7,294.4 431.0,286.5 435.3,278.2 439.6,269.6 443.9,260.5 448.1,251.0 452.4,241.1 456.7,230.7 461.0,219.8 465.2,208.3 469.5,196.3 473.8,183.8 478.1,170.6 482.4,156.9 486.6,142.4 490.9,127.3 495.2,111.5 499.5,94.9 503.7,77.5 508.0,59.3 512.3,40.3" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="558.8" y="-190.9" fontSize="14" fontWeight="bold" fill="#111">S</text>
        <text x="574.8" y="-186.9" fontSize="11" fill="#111">1</text>

        {/* S2 curve · red upward (left shift) */}
        <polyline points="104.6,443.4 108.0,442.8 111.4,442.1 114.8,441.5 118.2,440.8 121.6,440.1 125.0,439.3 128.4,438.5 131.8,437.7 135.2,436.9 138.6,436.0 142.0,435.1 145.4,434.2 148.9,433.2 152.3,432.2 155.7,431.1 159.1,430.0 162.5,428.9 165.9,427.7 169.3,426.5 172.7,425.3 176.1,423.9 179.5,422.6 182.9,421.2 186.3,419.7 189.7,418.2 193.1,416.6 196.5,415.0 199.9,413.3 203.3,411.5 206.7,409.7 210.1,407.8 213.5,405.8 216.9,403.8 220.3,401.7 223.7,399.5 227.1,397.2 230.5,394.8 234.0,392.4 237.4,389.8 240.8,387.2 244.2,384.4 247.6,381.6 251.0,378.6 254.4,375.6 257.8,372.4 261.2,369.1 264.6,365.6 268.0,362.1 271.4,358.4 274.8,354.6 278.2,350.6 281.6,346.5 285.0,342.2 288.4,337.7 291.8,333.1 295.2,328.4 298.6,323.4 302.0,318.2 305.4,312.9 308.8,307.4 312.2,301.6 315.6,295.6 319.1,289.4 322.5,283.0 325.9,276.3 329.3,269.4 332.7,262.2 336.1,254.8 339.5,247.0 342.9,239.0 346.3,230.7 349.7,222.0 353.1,213.1 356.5,203.8 359.9,194.1 363.3,184.1 366.7,173.7 370.1,162.9 373.5,151.7 376.9,140.1 380.3,128.0 383.7,115.5 387.1,102.5 390.5,89.0 393.9,75.0 397.3,60.5 400.7,45.5" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="230.0" y="373.3" fontSize="14" fontWeight="bold" fill="#cc2222">S</text>
        <text x="246.0" y="377.3" fontSize="11" fill="#cc2222">2</text>
        <text x="256.0" y="373.3" fontSize="10" fill="#cc2222">(supply shock ·</text>
        <text x="256.0" y="386.3" fontSize="10" fill="#cc2222">Brazil frost)</text>

        {/* Shift arrow · horizontal pointing left */}
        <line x1="468.0" y1="200.7" x2="410.0" y2="200.7" stroke="#2255cc" strokeWidth="2.2" markerEnd="url(#ckBlueLft)"/>
        <text x="478.0" y="192.7" fontSize="12" fontWeight="bold" fill="#2255cc">Supply shifts left</text>

        {/* Dashed guide lines · E1 */}
        <line x1="100" y1="334.4" x2="401.3" y2="334.4" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="401.3" y1="460" x2="401.3" y2="334.4" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>

        {/* Dashed guide lines · E2 */}
        <line x1="100" y1="275.1" x2="326.5" y2="275.1" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="326.5" y1="460" x2="326.5" y2="275.1" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="7,5"/>

        {/* E1 dot and label */}
        <circle cx="401.3" cy="334.4" r="7" fill="#111"/>
        <text x="413.3" y="339.4" fontSize="14" fontWeight="bold" fill="#111">E</text>
        <text x="427.3" y="343.4" fontSize="11" fill="#111">1</text>

        {/* E2 dot and label */}
        <circle cx="326.5" cy="275.1" r="7" fill="#cc2222"/>
        <text x="338.5" y="269.1" fontSize="14" fontWeight="bold" fill="#cc2222">E</text>
        <text x="352.5" y="273.1" fontSize="11" fill="#cc2222">2</text>

        {/* Y-axis price labels */}
        <text x="88" y="339.4" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P1</text>
        <text x="88" y="280.1" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc2222">P2</text>

        {/* X-axis quantity labels */}
        <text x="401.3" y="482" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Q1</text>
        <text x="326.5" y="482" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc2222">Q2</text>

        {/* Price rise bracket on y-axis */}
        <line x1="72.0" y1="275.1" x2="72.0" y2="334.4" stroke="#cc2222" strokeWidth="2" markerEnd="url(#ckRedU)" markerStart="url(#ckRedD)"/>
        <text x="66.0" y="300.8" textAnchor="end" fontSize="11" fontWeight="bold" fill="#cc2222">Price</text>
        <text x="66.0" y="313.8" textAnchor="end" fontSize="11" fill="#cc2222">rises</text>

        {/* Footnote */}
        <text x="100" y="502" fontSize="10" fontStyle="italic" fill="#777">* Left shift of supply (Brazil frost) + right shift of demand (at-home brewing) both push price upward.</text>
        <text x="100" y="516" fontSize="10" fontStyle="italic" fill="#777">  Net effect on quantity is ambiguous · price rises unambiguously to P2.</text>
      </svg>
    </div>
  );
}