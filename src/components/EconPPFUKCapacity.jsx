export default function EconPPFUKCapacity() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 640 620" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ukR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="ukU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="ukBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a5fb4"/></marker>
        </defs>
        <rect width="640" height="620" fill="#fff"/>

        {/* Title */}
        <text x="320" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">UK Productive Capacity: Effect of Vocational Training</text>
        <text x="320" y="50" textAnchor="middle" fontSize="12" fill="#555">and Capital Investment on the PPF</text>

        {/* Y-axis */}
        <line x1="100" y1="420" x2="100" y2="53" stroke="#111" strokeWidth="2.5" markerEnd="url(#ukU)"/>
        {/* X-axis */}
        <line x1="100" y1="420" x2="538" y2="420" stroke="#111" strokeWidth="2.5" markerEnd="url(#ukR)"/>

        {/* Axis labels */}
        <text x="96" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Capital</text>
        <text x="96" y="59" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Goods</text>
        <text x="319" y="456" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Consumer Goods</text>
        <text x="86" y="436" textAnchor="middle" fontSize="13" fill="#111">O</text>

        {/* Y-axis capacity ticks */}
        <line x1="94" y1="110.0" x2="106" y2="110.0" stroke="#888" strokeWidth="1.2"/>
        <line x1="94" y1="30.0" x2="106" y2="30.0" stroke="#1a5fb4" strokeWidth="1.2"/>

        {/* X-axis capacity ticks */}
        <line x1="432.0" y1="414" x2="432.0" y2="426" stroke="#888" strokeWidth="1.2"/>
        <line x1="512.0" y1="414" x2="512.0" y2="426" stroke="#1a5fb4" strokeWidth="1.2"/>

        {/* PPF1 (black) */}
        <polyline points="100.0,110.0 105.2,110.0 110.4,110.2 115.5,110.3 120.7,110.6 125.9,111.0 131.1,111.4 136.2,111.9 141.4,112.4 146.5,113.1 151.6,113.8 156.7,114.6 161.8,115.5 166.9,116.4 172.0,117.5 177.0,118.6 182.1,119.7 187.1,121.0 192.1,122.3 197.0,123.7 202.0,125.2 206.9,126.7 211.8,128.3 216.6,130.0 221.5,131.8 226.3,133.6 231.1,135.5 235.8,137.5 240.5,139.5 245.2,141.6 249.8,143.8 254.4,146.0 259.0,148.3 263.5,150.7 268.0,153.2 272.4,155.7 276.8,158.3 281.2,160.9 285.5,163.6 289.8,166.4 294.0,169.2 298.1,172.1 302.3,175.1 306.3,178.1 310.3,181.1 314.3,184.3 318.2,187.5 322.1,190.7 325.9,194.0 329.7,197.4 333.3,200.8 337.0,204.3 340.6,207.8 344.1,211.4 347.5,215.0 350.9,218.7 354.3,222.4 357.5,226.2 360.8,230.0 363.9,233.9 367.0,237.8 370.0,241.7 372.9,245.8 375.8,249.8 378.6,253.9 381.4,258.0 384.0,262.2 386.6,266.4 389.2,270.7 391.6,274.9 394.0,279.3 396.3,283.6 398.6,288.0 400.8,292.4 402.9,296.9 404.9,301.4 406.8,305.9 408.7,310.4 410.5,315.0 412.2,319.6 413.8,324.2 415.4,328.8 416.9,333.5 418.3,338.2 419.6,342.9 420.9,347.6 422.1,352.4 423.1,357.1 424.2,361.9 425.1,366.7 425.9,371.5 426.7,376.3 427.4,381.1 428.0,386.0 428.5,390.8 429.0,395.7 429.3,400.5 429.6,405.4 429.8,410.3 430.0,415.1 430.0,420.0" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>

        {/* PPF2 (blue) */}
        <polyline points="100.0,30.0 106.4,30.0 112.9,30.2 119.3,30.4 125.7,30.8 132.2,31.2 138.6,31.7 145.0,32.4 151.4,33.1 157.8,33.9 164.1,34.8 170.5,35.8 176.8,36.9 183.1,38.1 189.4,39.4 195.7,40.8 202.0,42.3 208.2,43.8 214.4,45.5 220.6,47.2 226.7,49.1 232.8,51.0 238.9,53.1 244.9,55.2 250.9,57.4 256.9,59.7 262.8,62.1 268.7,64.6 274.6,67.1 280.4,69.8 286.1,72.5 291.9,75.3 297.5,78.2 303.1,81.2 308.7,84.3 314.2,87.5 319.7,90.7 325.1,94.0 330.5,97.4 335.8,100.9 341.0,104.5 346.2,108.1 351.3,111.8 356.3,115.6 361.3,119.5 366.3,123.4 371.1,127.5 375.9,131.5 380.7,135.7 385.3,139.9 389.9,144.2 394.4,148.6 398.9,153.0 403.2,157.5 407.5,162.1 411.8,166.7 415.9,171.4 420.0,176.2 424.0,181.0 427.9,185.8 431.7,190.8 435.4,195.7 439.1,200.8 442.7,205.9 446.2,211.0 449.6,216.2 452.9,221.5 456.1,226.8 459.3,232.1 462.3,237.5 465.3,242.9 468.2,248.4 471.0,253.9 473.7,259.5 476.3,265.1 478.8,270.8 481.2,276.4 483.5,282.1 485.8,287.9 487.9,293.7 489.9,299.5 491.9,305.3 493.7,311.2 495.5,317.1 497.1,323.0 498.7,329.0 500.1,334.9 501.5,340.9 502.7,346.9 503.9,352.9 505.0,359.0 505.9,365.0 506.8,371.1 507.5,377.2 508.2,383.3 508.7,389.4 509.2,395.5 509.5,401.6 509.8,407.7 509.9,413.9 510.0,420.0" fill="none" stroke="#1a5fb4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>

        {/* PPF1 label · below x-axis at curve end, clearly spaced */}
        <text x="438.0" y="438.0" textAnchor="start" fontSize="14" fontWeight="bold" fill="#111">PPF</text>
        <text x="472.0" y="442.0" fontSize="11" fill="#111">1</text>

        {/* PPF2 label · further right, same row */}
        <text x="518.0" y="438.0" textAnchor="start" fontSize="14" fontWeight="bold" fill="#1a5fb4">PPF</text>
        <text x="552.0" y="442.0" fontSize="11" fill="#1a5fb4">2</text>

        {/* Three outward shift arrows */}
        <line x1="172.0" y1="117.5" x2="191.5" y2="37.4" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>
        <line x1="286.3" y1="164.1" x2="333.5" y2="96.1" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>
        <line x1="409.9" y1="313.5" x2="487.0" y2="284.0" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>

        {/* "Outward shift" annotation · placed in open space centre-right */}
        <text x="360.0" y="107.0" fontSize="12" fontWeight="bold" fill="#1a5fb4">Economic Growth</text>
        <text x="360.0" y="123.0" fontSize="12" fill="#1a5fb4">(Outward Shift)</text>
        <line x1="400.0" y1="127.0" x2="191.5" y2="37.4" stroke="#1a5fb4" strokeWidth="1.2" strokeDasharray="5,4"/>

        {/* Dashed guides from PPF1 sample point */}
        <line x1="100" y1="200.8" x2="333.3" y2="200.8" stroke="rgba(0,0,0,0.28)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="333.3" y1="200.8" x2="333.3" y2="420" stroke="rgba(0,0,0,0.28)" strokeWidth="1.3" strokeDasharray="7,5"/>

        {/* Dashed guides from PPF2 sample point */}
        <line x1="100" y1="144.2" x2="389.9" y2="144.2" stroke="rgba(26,95,180,0.32)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="389.9" y1="144.2" x2="389.9" y2="420" stroke="rgba(26,95,180,0.32)" strokeWidth="1.3" strokeDasharray="7,5"/>

        {/* Dots at sample points */}
        <circle cx="333.3" cy="200.8" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <circle cx="389.9" cy="144.2" r="5" fill="#fff" stroke="#1a5fb4" strokeWidth="2"/>

        {/* Reasoning box · well below chart, with generous padding */}
        <rect x="100" y="472" width="438" height="80" rx="6" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="112" y="492" fontSize="11" fontWeight="bold" fill="#111">Microeconomic Reasoning:</text>
        <text x="112" y="509" fontSize="11" fill="#333">Vocational training improves labour productivity (human capital).</text>
        <text x="112" y="525" fontSize="11" fill="#333">Capital investment expands the capital stock. Both increase the quantity</text>
        <text x="112" y="541" fontSize="11" fill="#333">and quality of factors of production, shifting the PPF outward (PPF1 to PPF2).</text>
      </svg>
    </div>
  );
}