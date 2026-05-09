export default function EconNegativeExternalityCoal() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ne2R" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ne2U" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ne2Lft" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Negative Production Externality · Coal Electricity</text>
        <text x="340" y="44" textAnchor="middle" fontSize="11" fill="#555">MSC &gt; MPC: market overproduces at Q1 · social optimum at Qsop (MSC = MSB)</text>
        <line x1="88" y1="460" x2="88" y2="50" stroke="#111" strokeWidth="2.2" markerEnd="url(#ne2U)"/>
        <line x1="88" y1="460" x2="592" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#ne2R)"/>
        <text x="82" y="44" textAnchor="start" fontSize="12" fontWeight="bold" fill="#111">Costs/Benefits</text>
        <text x="580" y="468" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <polygon points="340.5,222.0 419.4,270.1 340.5,222.0" fill="rgba(220,38,38,0.80)"/>
        <polyline points="88.0,427.3 94.2,422.3 100.4,417.3 106.6,412.2 112.8,407.2 119.0,402.1 125.2,397.1 131.4,392.1 137.6,387.0 143.8,382.0 150.0,376.9 156.2,371.9 162.4,366.9 168.6,361.8 174.8,356.8 181.0,351.7 187.2,346.7 193.4,341.7 199.5,336.6 205.7,331.6 211.9,326.5 218.1,321.5 224.3,316.5 230.5,311.4 236.7,306.4 242.9,301.3 249.1,296.3 255.3,291.3 261.5,286.2 267.7,281.2 273.9,276.1 280.1,271.1 286.3,266.1 292.5,261.0 298.7,256.0 304.9,250.9 311.1,245.9 317.3,240.9 323.5,235.8 329.7,230.8 335.9,225.7 342.1,220.7 348.3,215.7 354.5,210.6 360.7,205.6 366.9,200.5 373.1,195.5 379.3,190.5 385.5,185.4 391.7,180.4 397.9,175.3 404.1,170.3 410.3,165.3 416.4,160.2 422.6,155.2 428.8,150.1 435.0,145.1 441.2,140.1 447.4,135.0 453.6,130.0 459.8,124.9 466.0,119.9 472.2,114.9 478.4,109.8 484.6,104.8 490.8,99.7 497.0,94.7 503.2,89.7 509.4,84.6 515.6,79.6 521.8,74.5" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="527.8" y="66.5" fontSize="13" fontWeight="bold" fill="#111">MSC</text>
        <polyline points="88.0,427.3 94.5,424.2 101.1,421.1 107.6,418.0 114.2,414.9 120.7,411.8 127.2,408.7 133.8,405.6 140.3,402.5 146.9,399.4 153.4,396.3 160.0,393.2 166.5,390.1 173.0,387.0 179.6,383.9 186.1,380.8 192.7,377.7 199.2,374.6 205.7,371.5 212.3,368.4 218.8,365.3 225.4,362.2 231.9,359.1 238.5,356.0 245.0,352.9 251.5,349.8 258.1,346.6 264.6,343.5 271.2,340.4 277.7,337.3 284.2,334.2 290.8,331.1 297.3,328.0 303.9,324.9 310.4,321.8 316.9,318.7 323.5,315.6 330.0,312.5 336.6,309.4 343.1,306.3 349.7,303.2 356.2,300.1 362.7,297.0 369.3,293.9 375.8,290.8 382.4,287.7 388.9,284.6 395.4,281.5 402.0,278.4 408.5,275.3 415.1,272.2 421.6,269.1 428.2,266.0 434.7,262.9 441.2,259.8 447.8,256.7 454.3,253.5 460.9,250.4 467.4,247.3 473.9,244.2 480.5,241.1 487.0,238.0 493.6,234.9 500.1,231.8 506.7,228.7 513.2,225.6 519.7,222.5 526.3,219.4 532.8,216.3 539.4,213.2 545.9,210.1" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="551.9" y="202.1" fontSize="13" fontWeight="bold" fill="#111">MPC</text>
        <polyline points="112.1,82.7 118.3,86.5 124.5,90.3 130.7,94.0 136.9,97.8 143.1,101.6 149.3,105.4 155.5,109.2 161.7,112.9 167.9,116.7 174.1,120.5 180.3,124.3 186.5,128.1 192.7,131.8 198.9,135.6 205.1,139.4 211.3,143.2 217.5,147.0 223.6,150.7 229.8,154.5 236.0,158.3 242.2,162.1 248.4,165.9 254.6,169.6 260.8,173.4 267.0,177.2 273.2,181.0 279.4,184.8 285.6,188.5 291.8,192.3 298.0,196.1 304.2,199.9 310.4,203.7 316.6,207.4 322.8,211.2 329.0,215.0 335.2,218.8 341.4,222.6 347.6,226.3 353.8,230.1 360.0,233.9 366.2,237.7 372.4,241.5 378.6,245.2 384.8,249.0 391.0,252.8 397.2,256.6 403.4,260.4 409.6,264.1 415.8,267.9 422.0,271.7 428.2,275.5 434.4,279.3 440.5,283.0 446.7,286.8 452.9,290.6 459.1,294.4 465.3,298.2 471.5,301.9 477.7,305.7 483.9,309.5 490.1,313.3 496.3,317.1 502.5,320.8 508.7,324.6 514.9,328.4 521.1,332.2 527.3,336.0 533.5,339.7 539.7,343.5 545.9,347.3" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="551.9" y="361.3" fontSize="13" fontWeight="bold" fill="#111">MSB/MPB</text>
        <line x1="88" y1="222.0" x2="340.5" y2="222.0" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="88" y1="270.1" x2="419.4" y2="270.1" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="340.5" y1="222.0" x2="340.5" y2="460" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <line x1="419.4" y1="270.1" x2="419.4" y2="460" stroke="#cc0000" strokeWidth="1.5" strokeDasharray="6,4"/>
        <text x="78" y="226.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc0000">Psop</text>
        <text x="78" y="274.1" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc0000">P1</text>
        <text x="340.5" y="478" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cc0000">Qsop</text>
        <text x="419.4" y="478" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cc0000">Q1</text>
        <line x1="479.4" y1="246.1" x2="431.4" y2="246.1" stroke="#111" strokeWidth="1.8" markerEnd="url(#ne2Lft)"/>
        <text x="485.4" y="242.1" fontSize="12" fontWeight="bold" fill="#111">Welfare loss</text>
        <rect x="88" y="496" width="504" height="50" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="100" y="514" fontSize="11" fontWeight="bold" fill="#111">Market failure:</text>
        <text x="100" y="530" fontSize="11" fill="#555">Coal firms only consider MPC · overproduction at Q1. Social optimum is Qsop (MSC=MSB).</text>
        <text x="100" y="543" fontSize="11" fill="#555">Red triangle = deadweight welfare loss. Corrective carbon tax shifts MPC up to MSC.</text>
      </svg>
    </div>
  );
}