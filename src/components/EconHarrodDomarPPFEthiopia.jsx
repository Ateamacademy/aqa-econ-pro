export default function EconHarrodDomarPPFEthiopia() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 640 580" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="hdpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="hdpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="hdpBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a5fb4"/></marker>
        </defs>
        <rect width="640" height="580" fill="#fff"/>
        <text x="320" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Harrod-Domar Model: Capital Accumulation in Ethiopia</text>
        <text x="320" y="48" textAnchor="middle" fontSize="12" fill="#555">High savings ratio + GERD investment → PPF shifts outward (g = s/v)</text>
        <line x1="100" y1="420" x2="100" y2="53" stroke="#111" strokeWidth="2.5" markerEnd="url(#hdpU)"/>
        <line x1="100" y1="420" x2="536" y2="420" stroke="#111" strokeWidth="2.5" markerEnd="url(#hdpR)"/>
        <text x="92" y="45" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Capital</text>
        <text x="92" y="59" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Goods</text>
        <text x="318" y="456" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Consumer Goods</text>
        <text x="86" y="438" fontSize="13" fill="#111">O</text>
        <polyline points="100.0,130.0 104.7,130.0 109.4,130.1 114.1,130.3 118.8,130.6 123.5,130.9 128.2,131.3 132.9,131.8 137.6,132.3 142.3,132.9 146.9,133.6 151.6,134.3 156.2,135.1 160.8,136.0 165.4,137.0 170.0,138.0 174.6,139.1 179.2,140.3 183.7,141.5 188.2,142.8 192.7,144.2 197.2,145.6 201.6,147.1 206.0,148.7 210.4,150.4 214.8,152.1 219.1,153.9 223.5,155.7 227.7,157.6 232.0,159.6 236.2,161.6 240.4,163.7 244.5,165.9 248.6,168.1 252.7,170.4 256.7,172.7 260.7,175.1 264.7,177.6 268.6,180.1 272.5,182.7 276.3,185.4 280.1,188.1 283.9,190.9 287.6,193.7 291.2,196.6 294.8,199.5 298.4,202.5 301.9,205.5 305.4,208.6 308.8,211.7 312.1,214.9 315.4,218.2 318.7,221.5 321.9,224.8 325.0,228.2 328.1,231.7 331.2,235.1 334.1,238.7 337.0,242.3 339.9,245.9 342.7,249.5 345.4,253.2 348.1,257.0 350.7,260.8 353.3,264.6 355.8,268.5 358.2,272.4 360.6,276.3 362.9,280.3 365.1,284.3 367.3,288.3 369.4,292.4 371.4,296.5 373.4,300.7 375.3,304.8 377.2,309.0 378.9,313.2 380.6,317.5 382.3,321.8 383.8,326.1 385.3,330.4 386.7,334.7 388.1,339.1 389.4,343.5 390.6,347.9 391.7,352.3 392.8,356.7 393.8,361.2 394.7,365.7 395.5,370.1 396.3,374.6 397.0,379.1 397.6,383.7 398.2,388.2 398.7,392.7 399.1,397.2 399.4,401.8 399.7,406.3 399.9,410.9 400.0,415.4 400.0,420.0" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="404.0" y="438.0" textAnchor="start" fontSize="14" fontWeight="bold" fill="#111">PPF</text>
        <text x="438.0" y="442.0" fontSize="11" fill="#111">1</text>
        <polyline points="100.0,35.0 106.3,35.0 112.6,35.2 118.8,35.4 125.1,35.8 131.4,36.2 137.6,36.7 143.9,37.3 150.1,38.0 156.4,38.8 162.6,39.7 168.8,40.7 175.0,41.8 181.1,43.0 187.3,44.3 193.4,45.6 199.5,47.1 205.5,48.6 211.6,50.3 217.6,52.0 223.6,53.8 229.6,55.8 235.5,57.8 241.4,59.9 247.2,62.0 253.1,64.3 258.9,66.7 264.6,69.1 270.3,71.6 276.0,74.3 281.6,77.0 287.2,79.8 292.7,82.6 298.2,85.6 303.6,88.6 309.0,91.7 314.3,94.9 319.6,98.2 324.8,101.6 330.0,105.0 335.1,108.5 340.2,112.1 345.2,115.8 350.1,119.5 355.0,123.4 359.8,127.2 364.5,131.2 369.2,135.2 373.8,139.3 378.4,143.5 382.8,147.8 387.3,152.1 391.6,156.4 395.9,160.9 400.0,165.4 404.2,170.0 408.2,174.6 412.2,179.3 416.1,184.0 419.9,188.8 423.6,193.7 427.3,198.6 430.8,203.6 434.3,208.6 437.7,213.7 441.1,218.8 444.3,224.0 447.5,229.2 450.5,234.5 453.5,239.8 456.4,245.2 459.2,250.6 461.9,256.1 464.6,261.6 467.1,267.1 469.6,272.7 471.9,278.3 474.2,283.9 476.4,289.6 478.4,295.3 480.4,301.0 482.3,306.8 484.1,312.6 485.8,318.4 487.4,324.3 488.9,330.1 490.4,336.0 491.7,341.9 492.9,347.9 494.0,353.8 495.1,359.8 496.0,365.8 496.8,371.7 497.6,377.8 498.2,383.8 498.8,389.8 499.2,395.8 499.6,401.9 499.8,407.9 500.0,414.0 500.0,420.0" fill="none" stroke="#1a5fb4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="504.0" y="438.0" textAnchor="start" fontSize="14" fontWeight="bold" fill="#1a5fb4">PPF</text>
        <text x="538.0" y="442.0" fontSize="11" fill="#1a5fb4">2</text>
        <line x1="159.6" y1="135.8" x2="179.5" y2="42.7" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#hdpBlue)"/>
        <line x1="274.3" y1="184.0" x2="332.4" y2="106.7" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#hdpBlue)"/>
        <line x1="381.7" y1="320.3" x2="475.6" y2="287.7" stroke="#1a5fb4" strokeWidth="2.2" markerEnd="url(#hdpBlue)"/>
        <text x="300.0" y="111.0" fontSize="12" fontWeight="bold" fill="#1a5fb4">Outward shift</text>
        <text x="300.0" y="127.0" fontSize="11" fill="#555">(g = s/v: higher savings</text>
        <text x="300.0" y="141.0" fontSize="11" fill="#555">ratio raises growth rate)</text>
        <line x1="94" y1="130" x2="106" y2="130" stroke="#888" strokeWidth="1.2"/>
        <line x1="94" y1="35" x2="106" y2="35" stroke="#1a5fb4" strokeWidth="1.2"/>
        <line x1="400" y1="414" x2="400" y2="426" stroke="#888" strokeWidth="1.2"/>
        <line x1="500" y1="414" x2="500" y2="426" stroke="#1a5fb4" strokeWidth="1.2"/>
        <rect x="100" y="472" width="436" height="76" rx="6" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="112" y="490" fontSize="11" fontWeight="bold" fill="#111">Causal chain (Harrod-Domar):</text>
        <text x="112" y="506" fontSize="11" fill="#333">Higher savings rate (s) → more funds for investment → capital accumulation</text>
        <text x="112" y="522" fontSize="11" fill="#333">→ productive capacity expands → PPF shifts outward → sustained GDP growth.</text>
        <text x="112" y="538" fontSize="11" fill="#555">Formula: g = s/v. Ethiopia's GERD + industrial parks reduced effective ICOR (v).</text>
      </svg>
    </div>
  );
}