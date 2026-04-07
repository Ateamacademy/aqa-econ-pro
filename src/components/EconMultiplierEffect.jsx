export default function EconMultiplierEffect() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'600px',margin:'0 auto',fontFamily:"Arial,sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 600 500" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="meR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="meU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="meRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#cc2222"/></marker>
        </defs>
        <rect width="600" height="500" fill="#fff"/>
        <line x1="70" y1="450" x2="70" y2="36" stroke="#111" strokeWidth="2.5" markerEnd="url(#meU)"/>
        <line x1="70" y1="450" x2="540" y2="450" stroke="#111" strokeWidth="2.5" markerEnd="url(#meR)"/>
        <text x="64" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price</text>
        <text x="64" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">level</text>
        <text x="510" y="472" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Real GDP</text>
        <line x1="385.0" y1="450" x2="385.0" y2="54" stroke="#111" strokeWidth="2.8"/>
        <text x="391" y="62" fontSize="12" fontWeight="bold" fill="#111">LRAS1</text>
        <polyline points="70.0,230.0 76.8,233.6 83.5,237.2 90.3,240.8 97.0,244.4 103.8,248.0 110.5,251.6 117.3,255.2 124.0,258.8 130.8,262.4 137.5,266.0 144.3,269.6 151.0,273.2 157.8,276.8 164.5,280.4 171.3,284.0 178.0,287.6 184.8,291.2 191.5,294.8 198.3,298.4 205.0,302.0 211.8,305.6 218.5,309.2 225.3,312.8 232.0,316.4 238.8,320.0 245.5,323.6 252.3,327.2 259.0,330.8 265.8,334.4 272.5,338.0 279.3,341.6 286.0,345.2 292.8,348.8 299.5,352.4 306.3,356.0 313.0,359.6 319.8,363.2 326.5,366.8 333.3,370.4 340.0,374.0 346.8,377.6 353.5,381.2 360.3,384.8 367.0,388.4 373.8,392.0 380.5,395.6 387.3,399.2 394.0,402.8 400.8,406.4 407.5,410.0 414.2,413.6 421.0,417.2 427.7,420.8 434.5,424.4 441.3,428.0 448.0,431.6 454.7,435.2 461.5,438.8 468.3,442.4 475.0,446.0" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="475" y="460" fontSize="12" fontWeight="bold" fill="#111">AD1</text>
        <polyline points="70.0,150.0 76.8,153.6 83.5,157.2 90.3,160.8 97.0,164.4 103.8,168.0 110.5,171.6 117.3,175.2 124.0,178.8 130.8,182.4 137.5,186.0 144.3,189.6 151.0,193.2 157.8,196.8 164.5,200.4 171.3,204.0 178.0,207.6 184.8,211.2 191.5,214.8 198.3,218.4 205.0,222.0 211.8,225.6 218.5,229.2 225.3,232.8 232.0,236.4 238.8,240.0 245.5,243.6 252.3,247.2 259.0,250.8 265.8,254.4 272.5,258.0 279.3,261.6 286.0,265.2 292.8,268.8 299.5,272.4 306.3,276.0 313.0,279.6 319.8,283.2 326.5,286.8 333.3,290.4 340.0,294.0 346.8,297.6 353.5,301.2 360.3,304.8 367.0,308.4 373.8,312.0 380.5,315.6 387.3,319.2 394.0,322.8 400.8,326.4 407.5,330.0 414.2,333.6 421.0,337.2 427.7,340.8 434.5,344.4 441.3,348.0 448.0,351.6 454.7,355.2 461.5,358.8 468.3,362.4 475.0,366.0" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="475" y="380" fontSize="12" fontWeight="bold" fill="#111">AD2</text>
        <polyline points="70.0,70.0 76.8,73.6 83.5,77.2 90.3,80.8 97.0,84.4 103.8,88.0 110.5,91.6 117.3,95.2 124.0,98.8 130.8,102.4 137.5,106.0 144.3,109.6 151.0,113.2 157.8,116.8 164.5,120.4 171.3,124.0 178.0,127.6 184.8,131.2 191.5,134.8 198.3,138.4 205.0,142.0 211.8,145.6 218.5,149.2 225.3,152.8 232.0,156.4 238.8,160.0 245.5,163.6 252.3,167.2 259.0,170.8 265.8,174.4 272.5,178.0 279.3,181.6 286.0,185.2 292.8,188.8 299.5,192.4 306.3,196.0 313.0,199.6 319.8,203.2 326.5,206.8 333.3,210.4 340.0,214.0 346.8,217.6 353.5,221.2 360.3,224.8 367.0,228.4 373.8,232.0 380.5,235.6 387.3,239.2 394.0,242.8 400.8,246.4 407.5,250.0 414.2,253.6 421.0,257.2 427.7,260.8 434.5,264.4 441.3,268.0 448.0,271.6 454.7,275.2 461.5,278.8 468.3,282.4 475.0,286.0" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="475" y="300" fontSize="12" fontWeight="bold" fill="#111">AD3</text>
        <line x1="70" y1="326.0" x2="250.0" y2="326.0" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="70" y1="306.0" x2="362.5" y2="306.0" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="70" y1="238.0" x2="385.0" y2="238.0" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="250.0" y1="326.0" x2="250.0" y2="450" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="362.5" y1="306.0" x2="362.5" y2="450" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="385.0" y1="238.0" x2="385.0" y2="450" stroke="#cc2222" strokeWidth="1.4" strokeDasharray="6,4"/>
        <text x="63" y="331" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P1</text>
        <text x="63" y="311" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P2</text>
        <text x="63" y="243" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P3</text>
        <text x="250" y="464" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y1</text>
        <text x="363" y="464" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y2</text>
        <text x="385" y="464" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y3 YFE</text>
        <path d="M 130 160 L 175 120" stroke="#cc2222" strokeWidth="2.5" markerEnd="url(#meRed)"/>
        <path d="M 130 160 L 85 200" stroke="#cc2222" strokeWidth="2.5" markerEnd="url(#meRed)"/>
        <text x="138" y="158" fontSize="12" fontWeight="bold" fill="#cc2222">Multiplier</text>
        <text x="138" y="172" fontSize="12" fontWeight="bold" fill="#cc2222">Effect</text>
      </svg>
    </div>
  );
}