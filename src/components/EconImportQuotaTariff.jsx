export default function EconImportQuotaTariff() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'700px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 700 580" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="iqR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="iqU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="iqBi" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
        </defs>
        <rect width="700" height="580" fill="#fff"/>
        <text x="350" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Trade Diagram · Effect of Import Quota</text>
        <text x="350" y="44" textAnchor="middle" fontSize="11" fill="#555">Quota raises domestic price above world price → welfare loss (hatched region)</text>
        <line x1="80" y1="470" x2="80" y2="40" stroke="#111" strokeWidth="2.2" markerEnd="url(#iqU)"/>
        <line x1="80" y1="470" x2="622" y2="470" stroke="#111" strokeWidth="2.2" markerEnd="url(#iqR)"/>
        <text x="72" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">P</text>
        <text x="610" y="478" fontSize="13" fontWeight="bold" fill="#111">Q</text>
        <polygon points="424.5,240.0 224.4,240.0 224.4,315.5 424.5,315.5" fill="rgba(220,50,50,0.15)"/>
        <line x1="409.1" y1="240" x2="409.1" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="393.7" y1="240" x2="393.7" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="378.3" y1="240" x2="378.3" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="362.9" y1="240" x2="362.9" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="347.5" y1="240" x2="347.5" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="332.1" y1="240" x2="332.1" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="316.8" y1="240" x2="316.8" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="301.4" y1="240" x2="301.4" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="286.0" y1="240" x2="286.0" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="270.6" y1="240" x2="270.6" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="255.2" y1="240" x2="255.2" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <line x1="239.8" y1="240" x2="239.8" y2="315.5" stroke="#cc2222" strokeWidth="1.2" opacity="0.6"/>
        <polygon points="80,240.0 224.4,240.0 224.4,315.5 80,315.5" fill="rgba(100,150,240,0.18)"/>
        <rect x="224.4" y="240.0" width="200.1" height="75.5" fill="rgba(100,200,100,0.18)"/>
        <polyline points="80.0,401.3 86.2,397.7 92.3,394.0 98.5,390.3 104.7,386.7 110.9,383.0 117.1,379.3 123.2,375.6 129.4,372.0 135.6,368.3 141.8,364.6 147.9,361.0 154.1,357.3 160.3,353.6 166.4,350.0 172.6,346.3 178.8,342.6 185.0,339.0 191.2,335.3 197.3,331.6 203.5,327.9 209.7,324.3 215.9,320.6 222.0,316.9 228.2,313.3 234.4,309.6 240.5,305.9 246.7,302.3 252.9,298.6 259.1,294.9 265.3,291.3 271.4,287.6 277.6,283.9 283.8,280.2 289.9,276.6 296.1,272.9 302.3,269.2 308.5,265.6 314.7,261.9 320.8,258.2 327.0,254.6 333.2,250.9 339.3,247.2 345.5,243.6 351.7,239.9 357.9,236.2 364.0,232.5 370.2,228.9 376.4,225.2 382.6,221.5 388.8,217.9 394.9,214.2 401.1,210.5 407.3,206.9 413.5,203.2 419.6,199.5 425.8,195.8 432.0,192.2 438.1,188.5 444.3,184.8 450.5,181.2 456.7,177.5 462.8,173.8 469.0,170.2 475.2,166.5 481.4,162.8 487.5,159.2 493.7,155.5 499.9,151.8 506.1,148.1 512.3,144.5 518.4,140.8 524.6,137.1 530.8,133.5 536.9,129.8 543.1,126.1 549.3,122.5 555.5,118.8 561.6,115.1 567.8,111.5 574.0,107.8" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="580.0" y="99.8" fontSize="12" fontWeight="bold" fill="#111">S (domestic)</text>
        <polyline points="80.0,325.8 85.5,322.5 91.0,319.2 96.6,316.0 102.1,312.7 107.6,309.4 113.2,306.1 118.7,302.8 124.2,299.5 129.7,296.3 135.3,293.0 140.8,289.7 146.3,286.4 151.8,283.1 157.3,279.8 162.9,276.6 168.4,273.3 173.9,270.0 179.4,266.7 185.0,263.4 190.5,260.1 196.0,256.9 201.6,253.6 207.1,250.3 212.6,247.0 218.1,243.7 223.7,240.4 229.2,237.2 234.7,233.9 240.2,230.6 245.8,227.3 251.3,224.0 256.8,220.7 262.3,217.5 267.8,214.2 273.4,210.9 278.9,207.6 284.4,204.3 289.9,201.0 295.5,197.8 301.0,194.5 306.5,191.2 312.1,187.9 317.6,184.6 323.1,181.3 328.6,178.1 334.1,174.8 339.7,171.5 345.2,168.2 350.7,164.9 356.3,161.6 361.8,158.4 367.3,155.1 372.8,151.8 378.4,148.5 383.9,145.2 389.4,141.9 394.9,138.7 400.4,135.4 406.0,132.1 411.5,128.8 417.0,125.5 422.6,122.2 428.1,119.0 433.6,115.7 439.1,112.4 444.6,109.1 450.2,105.8 455.7,102.5 461.2,99.3 466.8,96.0 472.3,92.7 477.8,89.4 483.3,86.1 488.9,82.8 494.4,79.6 499.9,76.3 505.4,73.0 510.9,69.7 516.5,66.4 522.0,63.1" fill="none" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="528.0" y="55.1" fontSize="11" fontWeight="bold" fill="#2255cc">S (domestic)</text>
        <text x="528.0" y="69.1" fontSize="11" fontWeight="bold" fill="#2255cc">+ quota</text>
        <line x1="80" y1="315.5" x2="610" y2="315.5" stroke="#2255cc" strokeWidth="2.2"/>
        <text x="614" y="319.5" fontSize="12" fontWeight="bold" fill="#2255cc">S (world)</text>
        <polyline points="80.0,58.0 86.2,61.3 92.3,64.5 98.5,67.8 104.7,71.0 110.9,74.3 117.1,77.6 123.2,80.8 129.4,84.1 135.6,87.4 141.8,90.6 147.9,93.9 154.1,97.1 160.3,100.4 166.4,103.7 172.6,106.9 178.8,110.2 185.0,113.4 191.2,116.7 197.3,120.0 203.5,123.2 209.7,126.5 215.9,129.8 222.0,133.0 228.2,136.3 234.4,139.5 240.5,142.8 246.7,146.1 252.9,149.3 259.1,152.6 265.3,155.8 271.4,159.1 277.6,162.4 283.8,165.6 289.9,168.9 296.1,172.2 302.3,175.4 308.5,178.7 314.7,181.9 320.8,185.2 327.0,188.5 333.2,191.7 339.3,195.0 345.5,198.3 351.7,201.5 357.9,204.8 364.0,208.0 370.2,211.3 376.4,214.6 382.6,217.8 388.8,221.1 394.9,224.3 401.1,227.6 407.3,230.9 413.5,234.1 419.6,237.4 425.8,240.7 432.0,243.9 438.1,247.2 444.3,250.4 450.5,253.7 456.7,257.0 462.8,260.2 469.0,263.5 475.2,266.7 481.4,270.0 487.5,273.3 493.7,276.5 499.9,279.8 506.1,283.1 512.3,286.3 518.4,289.6 524.6,292.8 530.8,296.1 536.9,299.4 543.1,302.6 549.3,305.9 555.5,309.1 561.6,312.4 567.8,315.7 574.0,318.9" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="580.0" y="332.9" fontSize="13" fontWeight="bold" fill="#111">D</text>
        <line x1="80" y1="240.0" x2="224.4" y2="240.0" stroke="#111" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="224.4" y1="240.0" x2="224.4" y2="470" stroke="#888" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="424.5" y1="240.0" x2="424.5" y2="470" stroke="#888" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="224.4" y1="240.0" x2="224.4" y2="470" stroke="#888" strokeWidth="1.2" strokeDasharray="5,4"/>
        <line x1="567.5" y1="315.5" x2="567.5" y2="470" stroke="#888" strokeWidth="1.2" strokeDasharray="5,4"/>
        <text x="70" y="244.0" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P quota</text>
        <text x="70" y="319.5" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P world</text>
        <text x="224.4" y="488" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Q 1</text>
        <text x="424.5" y="488" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Q 2</text>
        <text x="224.4" y="488" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Q 3</text>
        <text x="567.5" y="488" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Q4</text>
        <text x="152.2" y="282.8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333">A</text>
        <text x="324.4" y="282.8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333">B</text>
        <text x="324.4" y="282.8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#cc2222">C</text>
        <line x1="424.5" y1="218.0" x2="224.4" y2="218.0" stroke="#111" strokeWidth="1.5" markerEnd="url(#iqR)" markerStart="url(#iqBi)"/>
        <text x="324.4" y="212.0" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">quota</text>
        <text x="274.4" y="230.0" fontSize="11" fontWeight="bold" fill="#cc2222">welfare loss</text>
        <line x1="272.4" y1="234.0" x2="224.4" y2="240.0" stroke="#cc2222" strokeWidth="1.3"/>
      </svg>
    </div>
  );
}