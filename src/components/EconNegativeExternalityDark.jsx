export default function EconNegativeExternalityDark() {
  return (
    <div style={{background:'#0d1b2e',borderRadius:'10px',padding:'4px',maxWidth:'620px',margin:'0 auto',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <svg viewBox="0 0 620 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="neR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#c8d6e8"/></marker>
          <marker id="neU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#c8d6e8"/></marker>
          <marker id="neOrgL" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#f5a623"/></marker>
        </defs>
        <rect width="620" height="560" fill="#0d1b2e"/>

        {/* Title */}
        <text x="310" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff">Negative Production Externality (MSC &gt; MPC)</text>
        <text x="310" y="46" textAnchor="middle" fontSize="11" fill="#c8d6e8">Coal electricity: market overproduces at Q — social optimum is Q1</text>

        {/* Axes */}
        <line x1="88" y1="440" x2="88" y2="32" stroke="#c8d6e8" strokeWidth="2.2" markerEnd="url(#neU)"/>
        <line x1="88" y1="440" x2="522" y2="440" stroke="#c8d6e8" strokeWidth="2.2" markerEnd="url(#neR)"/>

        {/* DWL triangle: B-A-C */}
        <polygon points="284.2,221.8 345.5,265.3 345.5,163.7" fill="rgba(220,50,50,0.78)"/>

        {/* MPC/Private Supply (blue, upward) */}
        <polyline points="88.0,407.5 93.7,404.4 99.3,401.2 105.0,398.1 110.7,395.0 116.3,391.9 122.0,388.7 127.7,385.6 133.3,382.5 139.0,379.3 144.7,376.2 150.3,373.1 156.0,370.0 161.6,366.8 167.3,363.7 173.0,360.6 178.6,357.4 184.3,354.3 190.0,351.2 195.6,348.1 201.3,344.9 207.0,341.8 212.6,338.7 218.3,335.6 224.0,332.4 229.6,329.3 235.3,326.2 241.0,323.0 246.6,319.9 252.3,316.8 257.9,313.7 263.6,310.5 269.3,307.4 274.9,304.3 280.6,301.1 286.3,298.0 291.9,294.9 297.6,291.8 303.3,288.6 308.9,285.5 314.6,282.4 320.3,279.2 325.9,276.1 331.6,273.0 337.3,269.9 342.9,266.7 348.6,263.6 354.3,260.5 359.9,257.4 365.6,254.2 371.3,251.1 376.9,248.0 382.6,244.8 388.2,241.7 393.9,238.6 399.6,235.5 405.2,232.3 410.9,229.2 416.6,226.1 422.2,222.9 427.9,219.8 433.6,216.7 439.2,213.6 444.9,210.4 450.6,207.3 456.2,204.2 461.9,201.0 467.6,197.9 473.2,194.8 478.9,191.7 484.6,188.5 490.2,185.4 495.9,182.3 501.5,179.1 507.2,176.0 512.9,172.9 518.5,169.8 524.2,166.6 529.9,163.5 535.5,160.4 541.2,157.3" fill="none" stroke="#4a90e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="121.0" y="375.3" fontSize="13" fontWeight="bold" fill="#4a90e8">S</text>
        <text x="508.0" y="186.0" fontSize="12" fontWeight="bold" fill="#4a90e8">S</text>

        {/* MSC/Social Cost (red, steeper) */}
        <polyline points="88.0,407.5 93.2,402.6 98.3,397.8 103.5,392.9 108.6,388.0 113.8,383.1 118.9,378.3 124.0,373.4 129.2,368.5 134.3,363.6 139.5,358.8 144.7,353.9 149.8,349.0 154.9,344.1 160.1,339.3 165.3,334.4 170.4,329.5 175.6,324.6 180.7,319.8 185.8,314.9 191.0,310.0 196.2,305.1 201.3,300.3 206.4,295.4 211.6,290.5 216.8,285.6 221.9,280.8 227.1,275.9 232.2,271.0 237.3,266.1 242.5,261.3 247.7,256.4 252.8,251.5 257.9,246.6 263.1,241.8 268.3,236.9 273.4,232.0 278.6,227.1 283.7,222.3 288.9,217.4 294.0,212.5 299.1,207.6 304.3,202.8 309.4,197.9 314.6,193.0 319.8,188.1 324.9,183.3 330.1,178.4 335.2,173.5 340.4,168.6 345.5,163.8 350.6,158.9 355.8,154.0 360.9,149.1 366.1,144.3 371.3,139.4 376.4,134.5 381.6,129.6 386.7,124.8 391.9,119.9 397.0,115.0 402.1,110.1 407.3,105.3 412.4,100.4 417.6,95.5 422.8,90.6 427.9,85.8 433.1,80.9 438.2,76.0 443.4,71.1 448.5,66.3 453.6,61.4 458.8,56.5 463.9,51.6 469.1,46.8 474.3,41.9 479.4,37.0 484.6,32.1 489.7,27.3 494.9,22.4 500.0,17.5" fill="none" stroke="#e84040" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="121.0" y="362.3" fontSize="13" fontWeight="bold" fill="#e84040">S</text>
        <text x="266.0" y="198.5" fontSize="11" fontWeight="bold" fill="#e84040">Social Cost</text>

        {/* Social Benefit / Demand (orange, downward) */}
        <polyline points="88.0,82.5 93.7,86.5 99.3,90.5 105.0,94.6 110.7,98.6 116.3,102.6 122.0,106.6 127.7,110.7 133.3,114.7 139.0,118.7 144.7,122.7 150.3,126.7 156.0,130.8 161.6,134.8 167.3,138.8 173.0,142.8 178.6,146.9 184.3,150.9 190.0,154.9 195.6,158.9 201.3,162.9 207.0,167.0 212.6,171.0 218.3,175.0 224.0,179.0 229.6,183.0 235.3,187.1 241.0,191.1 246.6,195.1 252.3,199.1 257.9,203.2 263.6,207.2 269.3,211.2 274.9,215.2 280.6,219.2 286.3,223.3 291.9,227.3 297.6,231.3 303.3,235.3 308.9,239.4 314.6,243.4 320.3,247.4 325.9,251.4 331.6,255.4 337.3,259.5 342.9,263.5 348.6,267.5 354.3,271.5 359.9,275.5 365.6,279.6 371.3,283.6 376.9,287.6 382.6,291.6 388.2,295.7 393.9,299.7 399.6,303.7 405.2,307.7 410.9,311.7 416.6,315.8 422.2,319.8 427.9,323.8 433.6,327.8 439.2,331.9 444.9,335.9 450.6,339.9 456.2,343.9 461.9,347.9 467.6,352.0 473.2,356.0 478.9,360.0 484.6,364.0 490.2,368.1 495.9,372.1 501.5,376.1 507.2,380.1 512.9,384.1 518.5,388.2 524.2,392.2 529.9,396.2 535.5,400.2 541.2,404.3" fill="none" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="508.0" y="381.0" fontSize="12" fontWeight="bold" fill="#f5a623">S</text>
        <text x="444.2" y="349.1" fontSize="11" fontWeight="bold" fill="#f5a623">Social Benefit</text>

        {/* P dashed horizontal */}
        <line x1="88" y1="265.3" x2="345.5" y2="265.3" stroke="rgba(200,220,200,0.45)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="78" y="270.3" textAnchor="end" fontSize="13" fontWeight="bold" fill="#c8d6e8">P</text>

        {/* Q1 vertical dashed */}
        <line x1="284.2" y1="221.8" x2="284.2" y2="440" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="284.2" y="460" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4cdd88">Q1</text>
        <text x="284.2" y="474" textAnchor="middle" fontSize="10" fill="#4cdd88">Socially</text>
        <text x="284.2" y="486" textAnchor="middle" fontSize="10" fill="#4cdd88">Efficient</text>

        {/* Q vertical dashed */}
        <line x1="345.5" y1="265.3" x2="345.5" y2="440" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="345.5" y="460" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c8d6e8">Q</text>

        {/* Point A — market equilibrium */}
        <circle cx="345.5" cy="265.3" r="9" fill="#0d1b2e" stroke="#4cdd88" strokeWidth="2.5"/>
        <circle cx="345.5" cy="265.3" r="4" fill="#4cdd88"/>
        <text x="357.5" y="270.3" fontSize="13" fontWeight="bold" fill="#ffffff">A</text>
        <text x="371.5" y="270.3" fontSize="11" fill="#c8d6e8">£10m</text>

        {/* Point B — socially efficient */}
        <circle cx="284.2" cy="221.8" r="9" fill="#0d1b2e" stroke="#ffffff" strokeWidth="2.5"/>
        <circle cx="284.2" cy="221.8" r="4" fill="#ffffff"/>
        <text x="262.2" y="226.8" fontSize="13" fontWeight="bold" fill="#ffffff">B</text>

        {/* Point C — MSC at market Q */}
        <circle cx="345.5" cy="163.7" r="9" fill="#0d1b2e" stroke="#e84040" strokeWidth="2.5"/>
        <circle cx="345.5" cy="163.7" r="4" fill="#e84040"/>
        <text x="357.5" y="168.7" fontSize="13" fontWeight="bold" fill="#e84040">C</text>
        <text x="371.5" y="168.7" fontSize="11" fill="#c8d6e8">£15m</text>

        {/* Orange arrow pointing left toward B (showing excess social cost) */}
        <line x1="385.5" y1="214.5" x2="357.5" y2="214.5" stroke="#f5a623" strokeWidth="2.5" markerEnd="url(#neOrgL)"/>

        {/* Copyright note */}
        <text x="310" y="552" textAnchor="middle" fontSize="9" fill="rgba(200,214,232,0.45)">www.economicsonline.co.uk</text>
      </svg>
    </div>
  );
}