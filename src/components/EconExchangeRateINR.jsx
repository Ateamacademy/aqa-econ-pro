export default function EconExchangeRateINR() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="erR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="erU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="erBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc2222"/></marker>
          <marker id="erRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="erRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Exchange Rate Determination — Indian Rupee</text>
        <text x="340" y="48" textAnchor="middle" fontSize="12" fill="#555">FDI inflows + rising service exports → demand for INR rises → rupee appreciates</text>
        <line x1="90" y1="460" x2="90" y2="48" stroke="#111" strokeWidth="2.2" markerEnd="url(#erU)"/>
        <line x1="90" y1="460" x2="602" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#erR)"/>
        <text x="84" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Exchange</text>
        <text x="84" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">rate</text>
        <text x="84" y="70" textAnchor="middle" fontSize="11" fill="#555">INR/$</text>
        <text x="335" y="494" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Quantity of Indian Rupees</text>
        <polyline points="90.0,411.0 96.7,407.9 103.3,404.8 110.0,401.7 116.6,398.6 123.3,395.5 129.9,392.4 136.6,389.3 143.2,386.2 149.8,383.1 156.5,380.0 163.2,376.9 169.8,373.8 176.4,370.7 183.1,367.6 189.8,364.4 196.4,361.3 203.1,358.2 209.7,355.1 216.3,352.0 223.0,348.9 229.7,345.8 236.3,342.7 243.0,339.6 249.6,336.5 256.3,333.4 262.9,330.3 269.6,327.2 276.2,324.1 282.9,321.0 289.5,317.9 296.1,314.8 302.8,311.7 309.4,308.6 316.1,305.5 322.8,302.4 329.4,299.3 336.0,296.2 342.7,293.1 349.3,290.0 356.0,286.9 362.7,283.8 369.3,280.7 376.0,277.6 382.6,274.5 389.3,271.4 395.9,268.2 402.5,265.1 409.2,262.0 415.8,258.9 422.5,255.8 429.1,252.7 435.8,249.6 442.4,246.5 449.1,243.4 455.8,240.3 462.4,237.2 469.1,234.1 475.7,231.0 482.4,227.9 489.0,224.8 495.6,221.7 502.3,218.6 509.0,215.5 515.6,212.4 522.3,209.3 528.9,206.2 535.5,203.1 542.2,200.0 548.8,196.9 555.5,193.8" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="183.8" fontSize="13" fontWeight="bold" fill="#cc2222">S</text>
        <text x="573.5" y="187.8" fontSize="10" fill="#555">(supply of INR)</text>
        <polyline points="114.5,97.4 120.8,100.8 127.1,104.1 133.4,107.5 139.7,110.8 146.0,114.2 152.3,117.6 158.6,120.9 164.9,124.3 171.2,127.6 177.5,131.0 183.8,134.4 190.1,137.7 196.4,141.1 202.7,144.4 209.0,147.8 215.3,151.2 221.6,154.5 227.9,157.9 234.2,161.2 240.5,164.6 246.8,168.0 253.1,171.3 259.4,174.7 265.7,178.0 272.0,181.4 278.3,184.8 284.6,188.1 290.9,191.5 297.2,194.8 303.5,198.2 309.8,201.6 316.1,204.9 322.4,208.3 328.7,211.6 335.0,215.0 341.3,218.4 347.6,221.7 353.9,225.1 360.2,228.4 366.5,231.8 372.8,235.2 379.1,238.5 385.4,241.9 391.7,245.2 398.0,248.6 404.3,252.0 410.6,255.3 416.9,258.7 423.2,262.0 429.5,265.4 435.8,268.8 442.1,272.1 448.4,275.5 454.7,278.8 461.0,282.2 467.3,285.6 473.6,288.9 479.9,292.3 486.2,295.6 492.5,299.0 498.8,302.4 505.1,305.7 511.4,309.1 517.7,312.4 524.0,315.8 530.3,319.2 536.6,322.5 542.9,325.9 549.2,329.2 555.5,332.6" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="348.6" fontSize="13" fontWeight="bold" fill="#2255cc">D1</text>
        <text x="577.5" y="350.6" fontSize="10" fill="#555">(original)</text>
        <polyline points="114.5,32.1 120.8,35.4 127.1,38.8 133.4,42.1 139.7,45.5 146.0,48.9 152.3,52.2 158.6,55.6 164.9,58.9 171.2,62.3 177.5,65.7 183.8,69.0 190.1,72.4 196.4,75.7 202.7,79.1 209.0,82.5 215.3,85.8 221.6,89.2 227.9,92.5 234.2,95.9 240.5,99.3 246.8,102.6 253.1,106.0 259.4,109.3 265.7,112.7 272.0,116.1 278.3,119.4 284.6,122.8 290.9,126.1 297.2,129.5 303.5,132.9 309.8,136.2 316.1,139.6 322.4,142.9 328.7,146.3 335.0,149.7 341.3,153.0 347.6,156.4 353.9,159.7 360.2,163.1 366.5,166.5 372.8,169.8 379.1,173.2 385.4,176.5 391.7,179.9 398.0,183.3 404.3,186.6 410.6,190.0 416.9,193.3 423.2,196.7 429.5,200.1 435.8,203.4 442.1,206.8 448.4,210.1 454.7,213.5 461.0,216.9 467.3,220.2 473.6,223.6 479.9,226.9 486.2,230.3 492.5,233.7 498.8,237.0 505.1,240.4 511.4,243.7 517.7,247.1 524.0,250.5 530.3,253.8 536.6,257.2 542.9,260.5 549.2,263.9 555.5,267.3" fill="none" stroke="#cc4400" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="283.3" fontSize="13" fontWeight="bold" fill="#cc4400">D2</text>
        <text x="577.5" y="285.3" fontSize="10" fill="#cc4400">(FDI + exports↑)</text>
        <line x1="457.5" y1="280.3" x2="496.7" y2="235.9" stroke="#cc4400" strokeWidth="2.2" markerEnd="url(#erBlue)"/>
        <line x1="90" y1="258.6" x2="416.7" y2="258.6" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="90" y1="228.1" x2="482.0" y2="228.1" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="416.7" y1="258.6" x2="416.7" y2="460" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="482.0" y1="228.1" x2="482.0" y2="460" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="416.7" cy="258.6" r="7" fill="#fff" stroke="#555" strokeWidth="2"/>
        <text x="426.7" y="263.6" fontSize="13" fontWeight="bold" fill="#555">E1</text>
        <text x="440.7" y="263.6" fontSize="10" fill="#555">Initial eq.</text>
        <circle cx="482.0" cy="228.1" r="7" fill="#fff" stroke="#cc4400" strokeWidth="2"/>
        <text x="492.0" y="233.1" fontSize="13" fontWeight="bold" fill="#cc4400">E2</text>
        <text x="506.0" y="233.1" fontSize="10" fill="#cc4400">New eq.</text>
        <text x="80" y="262.6" textAnchor="end" fontSize="12" fontWeight="bold" fill="#555">ER1</text>
        <text x="80" y="232.1" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc4400">ER2</text>
        <text x="416.7" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555">Q1</text>
        <text x="482.0" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc4400">Q2</text>
        <line x1="68.0" y1="258.6" x2="68.0" y2="228.1" stroke="#cc4400" strokeWidth="2" markerEnd="url(#erRedU)" markerStart="url(#erRedD)"/>
        <text x="54.0" y="241.4" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc4400">INR</text>
        <text x="54.0" y="254.4" textAnchor="end" fontSize="10" fill="#cc4400">apprec.</text>
        <rect x="90" y="500" width="512" height="58" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="102" y="518" fontSize="11" fontWeight="bold" fill="#111">Why the INR appreciates:</text>
        <text x="102" y="534" fontSize="11" fill="#555">FDI inflows → foreign firms buy INR to invest in India. Rising service exports</text>
        <text x="102" y="548" fontSize="11" fill="#555">→ foreign buyers demand INR to pay Indian firms. D shifts right → ER rises.</text>
      </svg>
    </div>
  );
}