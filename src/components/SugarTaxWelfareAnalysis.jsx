export default function SugarTaxWelfareAnalysis() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="stR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="stU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Sugar Tax — Welfare Analysis (UK SDIL 2018)</text>
        <text x="340" y="44" textAnchor="middle" fontSize="11" fill="#555">Tax internalises external cost → shifts MPC toward MSC, reduces DWL</text>
        <line x1="88" y1="460" x2="88" y2="50" stroke="#111" strokeWidth="2.2" markerEnd="url(#stU)"/>
        <line x1="88" y1="460" x2="582" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#stR)"/>
        <text x="82" y="44" textAnchor="start" fontSize="12" fontWeight="bold" fill="#111">Costs/Benefits</text>
        <text x="570" y="468" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <polygon points="347.6,229.7 412.5,270.1 347.6,229.7" fill="rgba(180,120,40,0.45)"/>
        <polygon points="347.6,229.7 371.2,224.8 347.6,229.7" fill="rgba(220,38,38,0.55)"/>
        <polyline points="88.0,427.3 94.4,424.2 100.8,421.1 107.2,418.0 113.6,414.9 120.0,411.8 126.4,408.7 132.8,405.6 139.2,402.5 145.7,399.4 152.1,396.3 158.5,393.2 164.9,390.1 171.3,387.0 177.7,383.9 184.1,380.8 190.5,377.7 196.9,374.6 203.3,371.5 209.7,368.4 216.1,365.3 222.5,362.2 228.9,359.1 235.3,356.0 241.7,352.9 248.1,349.8 254.5,346.6 261.0,343.5 267.4,340.4 273.8,337.3 280.2,334.2 286.6,331.1 293.0,328.0 299.4,324.9 305.8,321.8 312.2,318.7 318.6,315.6 325.0,312.5 331.4,309.4 337.8,306.3 344.2,303.2 350.6,300.1 357.0,297.0 363.4,293.9 369.9,290.8 376.3,287.7 382.7,284.6 389.1,281.5 395.5,278.4 401.9,275.3 408.3,272.2 414.7,269.1 421.1,266.0 427.5,262.9 433.9,259.8 440.3,256.7 446.7,253.5 453.1,250.4 459.5,247.3 465.9,244.2 472.3,241.1 478.7,238.0 485.2,234.9 491.6,231.8 498.0,228.7 504.4,225.6 510.8,222.5 517.2,219.4 523.6,216.3 530.0,213.2 536.4,210.1" fill="none" stroke="#1a944a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="542.4" y="202.1" fontSize="12" fontWeight="bold" fill="#1a944a">MPC</text>
        <polyline points="88.0,362.0 93.7,359.2 99.5,356.4 105.2,353.7 110.9,350.9 116.7,348.1 122.4,345.3 128.1,342.6 133.9,339.8 139.6,337.0 145.3,334.2 151.0,331.5 156.8,328.7 162.5,325.9 168.2,323.1 174.0,320.4 179.7,317.6 185.4,314.8 191.2,312.0 196.9,309.2 202.6,306.5 208.4,303.7 214.1,300.9 219.8,298.1 225.6,295.4 231.3,292.6 237.0,289.8 242.7,287.0 248.5,284.3 254.2,281.5 259.9,278.7 265.7,275.9 271.4,273.1 277.1,270.4 282.9,267.6 288.6,264.8 294.3,262.0 300.1,259.3 305.8,256.5 311.5,253.7 317.3,250.9 323.0,248.2 328.7,245.4 334.5,242.6 340.2,239.8 345.9,237.1 351.6,234.3 357.4,231.5 363.1,228.7 368.8,225.9 374.6,223.2 380.3,220.4 386.0,217.6 391.8,214.8 397.5,212.1 403.2,209.3 409.0,206.5 414.7,203.7 420.4,201.0 426.2,198.2 431.9,195.4 437.6,192.6 443.3,189.8 449.1,187.1 454.8,184.3 460.5,181.5 466.3,178.7 472.0,176.0 477.7,173.2 483.5,170.4 489.2,167.6" fill="none" stroke="#cc4400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="495.2" y="159.6" fontSize="12" fontWeight="bold" fill="#cc4400">MPC+Tax</text>
        <polyline points="88.0,427.3 93.7,423.0 99.5,418.6 105.2,414.2 110.9,409.9 116.7,405.5 122.4,401.2 128.1,396.8 133.9,392.4 139.6,388.1 145.3,383.7 151.0,379.3 156.8,375.0 162.5,370.6 168.2,366.2 174.0,361.9 179.7,357.5 185.4,353.2 191.2,348.8 196.9,344.4 202.6,340.1 208.4,335.7 214.1,331.3 219.8,327.0 225.6,322.6 231.3,318.3 237.0,313.9 242.7,309.5 248.5,305.2 254.2,300.8 259.9,296.4 265.7,292.1 271.4,287.7 277.1,283.3 282.9,279.0 288.6,274.6 294.3,270.3 300.1,265.9 305.8,261.5 311.5,257.2 317.3,252.8 323.0,248.4 328.7,244.1 334.5,239.7 340.2,235.3 345.9,231.0 351.6,226.6 357.4,222.3 363.1,217.9 368.8,213.5 374.6,209.2 380.3,204.8 386.0,200.4 391.8,196.1 397.5,191.7 403.2,187.4 409.0,183.0 414.7,178.6 420.4,174.3 426.2,169.9 431.9,165.5 437.6,161.2 443.3,156.8 449.1,152.4 454.8,148.1 460.5,143.7 466.3,139.4 472.0,135.0 477.7,130.6 483.5,126.3 489.2,121.9" fill="none" stroke="#cc2222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="495.2" y="113.9" fontSize="12" fontWeight="bold" fill="#cc2222">MSC</text>
        <polyline points="111.6,82.7 117.7,86.5 123.7,90.3 129.8,94.0 135.9,97.8 141.9,101.6 148.0,105.4 154.1,109.2 160.1,112.9 166.2,116.7 172.3,120.5 178.4,124.3 184.4,128.1 190.5,131.8 196.6,135.6 202.6,139.4 208.7,143.2 214.8,147.0 220.8,150.7 226.9,154.5 233.0,158.3 239.0,162.1 245.1,165.9 251.2,169.6 257.2,173.4 263.3,177.2 269.4,181.0 275.5,184.8 281.5,188.5 287.6,192.3 293.7,196.1 299.7,199.9 305.8,203.7 311.9,207.4 317.9,211.2 324.0,215.0 330.1,218.8 336.1,222.6 342.2,226.3 348.3,230.1 354.3,233.9 360.4,237.7 366.5,241.5 372.5,245.2 378.6,249.0 384.7,252.8 390.8,256.6 396.8,260.4 402.9,264.1 409.0,267.9 415.0,271.7 421.1,275.5 427.2,279.3 433.2,283.0 439.3,286.8 445.4,290.6 451.4,294.4 457.5,298.2 463.6,301.9 469.6,305.7 475.7,309.5 481.8,313.3 487.9,317.1 493.9,320.8 500.0,324.6 506.1,328.4 512.1,332.2 518.2,336.0 524.3,339.7 530.3,343.5 536.4,347.3" fill="none" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="542.4" y="363.3" fontSize="12" fontWeight="bold" fill="#2255cc">MPB=MSB</text>
        <line x1="88" y1="270.1" x2="412.5" y2="270.1" stroke="#888" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="88" y1="224.8" x2="371.2" y2="224.8" stroke="#cc4400" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="88" y1="229.7" x2="347.6" y2="229.7" stroke="#cc2222" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="412.5" y1="270.1" x2="412.5" y2="460" stroke="#888" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="371.2" y1="224.8" x2="371.2" y2="460" stroke="#cc4400" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="347.6" y1="229.7" x2="347.6" y2="460" stroke="#cc2222" strokeWidth="1.3" strokeDasharray="6,4"/>
        <circle cx="412.5" cy="270.1" r="6" fill="#fff" stroke="#1a944a" strokeWidth="2"/>
        <circle cx="371.2" cy="224.8" r="6" fill="#fff" stroke="#cc4400" strokeWidth="2"/>
        <circle cx="347.6" cy="229.7" r="6" fill="#fff" stroke="#cc2222" strokeWidth="2"/>
        <text x="78" y="274.1" textAnchor="end" fontSize="11" fontWeight="bold" fill="#555">P1</text>
        <text x="78" y="228.8" textAnchor="end" fontSize="11" fontWeight="bold" fill="#cc4400">P2</text>
        <text x="78" y="233.7" textAnchor="end" fontSize="11" fontWeight="bold" fill="#cc2222">P*</text>
        <text x="412.5" y="478" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555">Qm</text>
        <text x="371.2" y="478" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc4400">Qt</text>
        <text x="347.6" y="478" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc2222">Q*</text>
        <text x="380.1" y="239.9" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7a5010">DWL</text>
        <text x="380.1" y="253.9" textAnchor="middle" fontSize="10" fill="#7a5010">(before tax)</text>
        <text x="359.4" y="227.3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#cc2222">Residual</text>
        <rect x="88" y="496" width="494" height="50" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="100" y="514" fontSize="11" fontWeight="bold" fill="#111">Sugar tax effect:</text>
        <text x="100" y="530" fontSize="11" fill="#555">Tax shifts MPC up toward MSC. Quantity falls Qm→Qt→Q* (social optimum). Brown area</text>
        <text x="100" y="543" fontSize="11" fill="#555">= DWL eliminated by tax; red area = residual DWL if tax doesn't fully correct externality.</text>
      </svg>
    </div>
  );
}