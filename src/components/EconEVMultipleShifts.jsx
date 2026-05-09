export default function EconEVMultipleShifts() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ms1R" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ms1U" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ms1G" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a944a"/></marker>
          <marker id="ms1B" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#2255cc"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">UK Electric Vehicle Market · Multiple Shifts</text>
        <text x="340" y="46" textAnchor="middle" fontSize="11" fill="#555">S shifts right (lower costs) + D shifts right (higher MPB) → Q rises, P change ambiguous</text>
        <line x1="88" y1="460" x2="88" y2="50" stroke="#111" strokeWidth="2.2" markerEnd="url(#ms1U)"/>
        <line x1="88" y1="460" x2="582" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#ms1R)"/>
        <text x="82" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Price (£)</text>
        <text x="570" y="468" fontSize="13" fontWeight="bold" fill="#111">Quantity</text>
        <polyline points="88.0,362.0 94.4,358.9 100.8,355.8 107.2,352.7 113.6,349.6 120.0,346.5 126.4,343.4 132.8,340.3 139.2,337.2 145.7,334.1 152.1,331.0 158.5,327.9 164.9,324.8 171.3,321.7 177.7,318.6 184.1,315.5 190.5,312.3 196.9,309.2 203.3,306.1 209.7,303.0 216.1,299.9 222.5,296.8 228.9,293.7 235.3,290.6 241.7,287.5 248.1,284.4 254.5,281.3 261.0,278.2 267.4,275.1 273.8,272.0 280.2,268.9 286.6,265.8 293.0,262.7 299.4,259.6 305.8,256.5 312.2,253.4 318.6,250.3 325.0,247.2 331.4,244.1 337.8,241.0 344.2,237.9 350.6,234.8 357.0,231.7 363.4,228.6 369.9,225.5 376.3,222.3 382.7,219.2 389.1,216.1 395.5,213.0 401.9,209.9 408.3,206.8 414.7,203.7 421.1,200.6 427.5,197.5 433.9,194.4 440.3,191.3 446.7,188.2 453.1,185.1 459.5,182.0 465.9,178.9 472.3,175.8 478.7,172.7 485.2,169.6 491.6,166.5 498.0,163.4 504.4,160.3 510.8,157.2 517.2,154.1 523.6,151.0 530.0,147.9 536.4,144.8" fill="none" stroke="#1a944a" strokeWidth="2.2" strokeDasharray="8,5" strokeLinecap="round"/>
        <text x="542.4" y="136.8" fontSize="12" fontWeight="bold" fill="#1a944a">S1</text>
        <polyline points="88.0,427.3 94.4,424.2 100.8,421.1 107.2,418.0 113.6,414.9 120.0,411.8 126.4,408.7 132.8,405.6 139.2,402.5 145.7,399.4 152.1,396.3 158.5,393.2 164.9,390.1 171.3,387.0 177.7,383.9 184.1,380.8 190.5,377.7 196.9,374.6 203.3,371.5 209.7,368.4 216.1,365.3 222.5,362.2 228.9,359.1 235.3,356.0 241.7,352.9 248.1,349.8 254.5,346.6 261.0,343.5 267.4,340.4 273.8,337.3 280.2,334.2 286.6,331.1 293.0,328.0 299.4,324.9 305.8,321.8 312.2,318.7 318.6,315.6 325.0,312.5 331.4,309.4 337.8,306.3 344.2,303.2 350.6,300.1 357.0,297.0 363.4,293.9 369.9,290.8 376.3,287.7 382.7,284.6 389.1,281.5 395.5,278.4 401.9,275.3 408.3,272.2 414.7,269.1 421.1,266.0 427.5,262.9 433.9,259.8 440.3,256.7 446.7,253.5 453.1,250.4 459.5,247.3 465.9,244.2 472.3,241.1 478.7,238.0 485.2,234.9 491.6,231.8 498.0,228.7 504.4,225.6 510.8,222.5 517.2,219.4 523.6,216.3 530.0,213.2 536.4,210.1" fill="none" stroke="#1a944a" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="542.4" y="202.1" fontSize="12" fontWeight="bold" fill="#1a944a">S2</text>
        <line x1="229.6" y1="293.4" x2="276.8" y2="335.9" stroke="#1a944a" strokeWidth="1.8" markerEnd="url(#ms1G)"/>
        <text x="259.2" y="268.0" fontSize="10" fontWeight="bold" fill="#1a944a">EoS + tech↓</text>
        <polyline points="111.6,113.7 117.7,117.1 123.7,120.5 129.8,123.8 135.9,127.2 141.9,130.5 148.0,133.9 154.1,137.3 160.1,140.6 166.2,144.0 172.3,147.3 178.4,150.7 184.4,154.1 190.5,157.4 196.6,160.8 202.6,164.1 208.7,167.5 214.8,170.9 220.8,174.2 226.9,177.6 233.0,180.9 239.0,184.3 245.1,187.7 251.2,191.0 257.2,194.4 263.3,197.7 269.4,201.1 275.5,204.5 281.5,207.8 287.6,211.2 293.7,214.5 299.7,217.9 305.8,221.3 311.9,224.6 317.9,228.0 324.0,231.3 330.1,234.7 336.1,238.1 342.2,241.4 348.3,244.8 354.3,248.1 360.4,251.5 366.5,254.9 372.5,258.2 378.6,261.6 384.7,264.9 390.8,268.3 396.8,271.7 402.9,275.0 409.0,278.4 415.0,281.7 421.1,285.1 427.2,288.5 433.2,291.8 439.3,295.2 445.4,298.5 451.4,301.9 457.5,305.3 463.6,308.6 469.6,312.0 475.7,315.3 481.8,318.7 487.9,322.1 493.9,325.4 500.0,328.8 506.1,332.1 512.1,335.5 518.2,338.9 524.3,342.2 530.3,345.6 536.4,348.9" fill="none" stroke="#2255cc" strokeWidth="2.2" strokeDasharray="8,5" strokeLinecap="round"/>
        <text x="542.4" y="364.9" fontSize="12" fontWeight="bold" fill="#2255cc">D1</text>
        <polyline points="111.6,48.4 117.7,51.8 123.7,55.1 129.8,58.5 135.9,61.8 141.9,65.2 148.0,68.6 154.1,71.9 160.1,75.3 166.2,78.6 172.3,82.0 178.4,85.4 184.4,88.7 190.5,92.1 196.6,95.4 202.6,98.8 208.7,102.2 214.8,105.5 220.8,108.9 226.9,112.2 233.0,115.6 239.0,119.0 245.1,122.3 251.2,125.7 257.2,129.0 263.3,132.4 269.4,135.8 275.5,139.1 281.5,142.5 287.6,145.8 293.7,149.2 299.7,152.6 305.8,155.9 311.9,159.3 317.9,162.6 324.0,166.0 330.1,169.4 336.1,172.7 342.2,176.1 348.3,179.4 354.3,182.8 360.4,186.2 366.5,189.5 372.5,192.9 378.6,196.2 384.7,199.6 390.8,203.0 396.8,206.3 402.9,209.7 409.0,213.0 415.0,216.4 421.1,219.8 427.2,223.1 433.2,226.5 439.3,229.8 445.4,233.2 451.4,236.6 457.5,239.9 463.6,243.3 469.6,246.6 475.7,250.0 481.8,253.4 487.9,256.7 493.9,260.1 500.0,263.4 506.1,266.8 512.1,270.2 518.2,273.5 524.3,276.9 530.3,280.2 536.4,283.6" fill="none" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="542.4" y="299.6" fontSize="12" fontWeight="bold" fill="#2255cc">D2</text>
        <line x1="442.0" y1="296.7" x2="479.8" y2="252.2" stroke="#2255cc" strokeWidth="1.8" markerEnd="url(#ms1B)"/>
        <text x="464.2" y="292.5" fontSize="10" fontWeight="bold" fill="#2255cc">MPB↑ + ZEV</text>
        <line x1="88" y1="240.0" x2="339.7" y2="240.0" stroke="#888" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="88" y1="244.4" x2="465.6" y2="244.4" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="339.7" y1="240.0" x2="339.7" y2="460" stroke="#888" strokeWidth="1.4" strokeDasharray="6,4"/>
        <line x1="465.6" y1="244.4" x2="465.6" y2="460" stroke="#cc4400" strokeWidth="1.4" strokeDasharray="6,4"/>
        <circle cx="339.7" cy="240.0" r="7" fill="#fff" stroke="#555" strokeWidth="2.2"/>
        <text x="348.7" y="234.0" fontSize="13" fontWeight="bold" fill="#555">E1</text>
        <circle cx="465.6" cy="244.4" r="7" fill="#fff" stroke="#cc4400" strokeWidth="2.2"/>
        <text x="474.6" y="238.4" fontSize="13" fontWeight="bold" fill="#cc4400">E2</text>
        <text x="78" y="244.0" textAnchor="end" fontSize="13" fontWeight="bold" fill="#555">P1</text>
        <text x="78" y="248.4" textAnchor="end" fontSize="13" fontWeight="bold" fill="#cc4400">P2</text>
        <text x="339.7" y="478" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#555">Q1</text>
        <text x="465.6" y="478" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cc4400">Q2</text>
        <rect x="88" y="496" width="494" height="50" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="100" y="514" fontSize="11" fontWeight="bold" fill="#111">Net effect:</text>
        <text x="100" y="530" fontSize="11" fill="#555">Both S↑ and D↑ cause Q to rise unambiguously (Q1→Q2). Price effect is ambiguous · here</text>
        <text x="100" y="543" fontSize="11" fill="#555">supply shift dominates slightly so P falls marginally (P2 &lt; P1) as costs fall faster than demand rises.</text>
      </svg>
    </div>
  );
}