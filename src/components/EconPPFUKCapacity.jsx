export default function EconPPFUKCapacity() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'620px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ukR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#111"/></marker>
          <marker id="ukU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#111"/></marker>
          <marker id="ukBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a5fb4"/></marker>
        </defs>
        <rect width="620" height="540" fill="#fff"/>
        <text x="310" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">UK Productive Capacity: Effect of Vocational Training</text>
        <text x="310" y="46" textAnchor="middle" fontSize="12" fill="#555">and Capital Investment on the PPF</text>
        <line x1="85" y1="468" x2="85" y2="30" stroke="#111" strokeWidth="2.5" markerEnd="url(#ukU)"/>
        <line x1="85" y1="468" x2="542" y2="468" stroke="#111" strokeWidth="2.5" markerEnd="url(#ukR)"/>
        <text x="77" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Capital</text>
        <text x="77" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Goods</text>
        <text x="302.5" y="508" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Consumer Goods</text>
        <text x="75" y="484" textAnchor="middle" fontSize="13" fill="#111">O</text>
        <polyline points="85.0,174.0 89.8,174.0 94.6,174.1 99.3,174.3 104.1,174.6 108.9,174.9 113.7,175.3 118.4,175.8 123.2,176.3 127.9,176.9 132.6,177.6 137.4,178.4 142.1,179.2 146.7,180.1 151.4,181.1 156.1,182.1 160.7,183.2 165.3,184.4 170.0,185.7 174.5,187.0 179.1,188.4 183.6,189.9 188.1,191.4 192.6,193.0 197.1,194.6 201.5,196.4 205.9,198.2 210.3,200.0 214.6,202.0 219.0,204.0 223.2,206.0 227.5,208.2 231.7,210.4 235.9,212.6 240.0,214.9 244.1,217.3 248.2,219.8 252.2,222.3 256.2,224.8 260.1,227.5 264.0,230.1 267.8,232.9 271.6,235.7 275.4,238.6 279.1,241.5 282.8,244.4 286.4,247.5 289.9,250.5 293.4,253.7 296.9,256.9 300.3,260.1 303.7,263.4 307.0,266.7 310.2,270.1 313.4,273.6 316.5,277.1 319.6,280.6 322.6,284.2 325.6,287.8 328.5,291.5 331.3,295.2 334.1,298.9 336.8,302.7 339.5,306.6 342.1,310.5 344.6,314.4 347.1,318.3 349.5,322.3 351.8,326.4 354.1,330.4 356.3,334.5 358.4,338.7 360.5,342.8 362.5,347.0 364.5,351.2 366.3,355.5 368.1,359.8 369.8,364.1 371.5,368.4 373.1,372.8 374.6,377.1 376.0,381.6 377.4,386.0 378.7,390.4 379.9,394.9 381.1,399.4 382.2,403.9 383.2,408.4 384.1,412.9 385.0,417.5 385.8,422.0 386.5,426.6 387.1,431.2 387.7,435.7 388.1,440.3 388.6,444.9 388.9,449.5 389.2,454.2 389.3,458.8 389.5,463.4 389.5,468.0" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="85.0,81.6 91.3,81.6 97.6,81.8 103.9,82.0 110.1,82.4 116.4,82.8 122.7,83.3 128.9,83.9 135.2,84.6 141.4,85.5 147.6,86.4 153.8,87.4 160.0,88.4 166.2,89.6 172.3,90.9 178.4,92.3 184.5,93.7 190.6,95.3 196.7,96.9 202.7,98.7 208.7,100.5 214.6,102.4 220.6,104.4 226.5,106.5 232.3,108.7 238.1,111.0 243.9,113.4 249.7,115.8 255.4,118.4 261.1,121.0 266.7,123.7 272.3,126.5 277.8,129.4 283.3,132.4 288.7,135.4 294.1,138.5 299.4,141.8 304.7,145.0 309.9,148.4 315.1,151.9 320.2,155.4 325.3,159.0 330.3,162.7 335.2,166.4 340.1,170.3 344.9,174.2 349.7,178.2 354.3,182.2 359.0,186.3 363.5,190.5 368.0,194.8 372.4,199.1 376.7,203.5 381.0,207.9 385.2,212.5 389.3,217.1 393.4,221.7 397.3,226.4 401.2,231.2 405.0,236.0 408.8,240.9 412.4,245.8 416.0,250.8 419.5,255.9 422.9,261.0 426.2,266.1 429.5,271.3 432.6,276.6 435.7,281.9 438.7,287.2 441.6,292.6 444.4,298.0 447.1,303.5 449.7,309.0 452.3,314.5 454.7,320.1 457.1,325.8 459.4,331.4 461.5,337.1 463.6,342.8 465.6,348.6 467.5,354.4 469.3,360.2 471.0,366.0 472.6,371.9 474.1,377.8 475.6,383.7 476.9,389.6 478.1,395.6 479.2,401.6 480.3,407.6 481.2,413.6 482.0,419.6 482.8,425.6 483.4,431.6 484.0,437.7 484.4,443.7 484.8,449.8 485.0,455.9 485.2,461.9 485.2,468.0" fill="none" stroke="#1a5fb4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="393.8" y="473.4" textAnchor="start" fontSize="14" fontWeight="bold" fill="#111">PPF</text>
        <text x="427.8" y="477.4" fontSize="11" fill="#111">1</text>
        <text x="489.6" y="473.4" textAnchor="start" fontSize="14" fontWeight="bold" fill="#1a5fb4">PPF</text>
        <text x="523.6" y="477.4" fontSize="11" fill="#1a5fb4">2</text>
        <line x1="128.5" y1="182.4" x2="141.6" y2="98.4" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>
        <line x1="259.0" y1="228.6" x2="311.2" y2="157.2" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>
        <line x1="367.8" y1="426.0" x2="450.4" y2="413.4" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#ukBlue)"/>
        <line x1="85" y1="260.1" x2="300.3" y2="260.1" stroke="rgba(0,0,0,0.30)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="300.3" y1="260.1" x2="300.3" y2="468" stroke="rgba(0,0,0,0.30)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="85" y1="194.6" x2="368.2" y2="194.6" stroke="rgba(26,95,180,0.35)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="368.2" y1="194.6" x2="368.2" y2="468" stroke="rgba(26,95,180,0.35)" strokeWidth="1.3" strokeDasharray="7,5"/>
        <circle cx="300.3" cy="260.1" r="5" fill="#fff" stroke="#111" strokeWidth="2"/>
        <circle cx="368.2" cy="194.6" r="5" fill="#fff" stroke="#1a5fb4" strokeWidth="2"/>
        <rect x="90" y="460" width="430" height="58" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1"/>
        <text x="100" y="478" fontSize="11" fontWeight="bold" fill="#111">Microeconomic Reasoning:</text>
        <text x="100" y="493" fontSize="11" fill="#333">Vocational training improves labour productivity (human capital). Capital</text>
        <text x="100" y="507" fontSize="11" fill="#333">investment expands the capital stock. Both increase the quantity and quality</text>
        <text x="100" y="521" fontSize="11" fill="#333">of factors of production, shifting the PPF outward from PPF1 to PPF2.</text>
      </svg>
    </div>
  );
}