export default function EconExchangeRateNaira() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="ngnR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="ngnU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="ngnArrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc6600"/></marker>
          <marker id="ngnRedU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
          <marker id="ngnRedD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill="#cc2222"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Currency Market — Nigerian Naira (NGN)</text>
        <text x="340" y="48" textAnchor="middle" fontSize="12" fill="#555">Unification of FX rates → official supply of naira rises → naira depreciates → exports cheaper abroad</text>
        <line x1="90" y1="460" x2="90" y2="48" stroke="#111" strokeWidth="2.2" markerEnd="url(#ngnU)"/>
        <line x1="90" y1="460" x2="602" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#ngnR)"/>
        <text x="84" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Exchange</text>
        <text x="84" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">rate</text>
        <text x="84" y="70" textAnchor="middle" fontSize="11" fill="#555">USD/NGN</text>
        <text x="335" y="494" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Quantity of Nigerian Naira</text>
        {/* Demand for Naira (downward sloping) */}
        <polyline points="114.5,97.4 145.0,118.0 175.5,138.6 206.0,159.2 236.5,179.8 267.0,200.4 297.5,221.0 328.0,241.6 358.5,262.2 389.0,282.8 419.5,303.4 450.0,324.0 480.5,344.6 511.0,365.2 541.5,385.8 555.5,395.0" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="402.0" fontSize="13" fontWeight="bold" fill="#cc2222">D</text>
        <text x="573.5" y="406.0" fontSize="10" fill="#555">(demand for NGN)</text>
        {/* Original Supply (upward sloping) S1 */}
        <polyline points="90.0,411.0 121.0,388.5 152.0,366.0 183.0,343.5 214.0,321.0 245.0,298.5 276.0,276.0 307.0,253.5 338.0,231.0 369.0,208.5 400.0,186.0 431.0,163.5 462.0,141.0 493.0,118.5 524.0,96.0 555.5,73.5" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="68.5" fontSize="13" fontWeight="bold" fill="#2255cc">S1</text>
        <text x="577.5" y="72.5" fontSize="10" fill="#555">(original)</text>
        {/* New Supply S2 — shifted right (more naira supplied at every rate) */}
        <polyline points="180.0,411.0 211.0,388.5 242.0,366.0 273.0,343.5 304.0,321.0 335.0,298.5 366.0,276.0 397.0,253.5 428.0,231.0 459.0,208.5 490.0,186.0 521.0,163.5 552.0,141.0 583.0,118.5" fill="none" stroke="#cc6600" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="9,5"/>
        <text x="589.0" y="113.5" fontSize="13" fontWeight="bold" fill="#cc6600">S2</text>
        <text x="589.0" y="128.5" fontSize="10" fill="#cc6600">(unified FX)</text>
        {/* Shift arrow */}
        <line x1="276.0" y1="276.0" x2="335.0" y2="298.5" stroke="#cc6600" strokeWidth="2.2" markerEnd="url(#ngnArrow)"/>
        {/* E1 — original equilibrium: S1 ∩ D
            S1: y = 411 - (x-90)*22.5/31  -> slope -0.7258
            D:  y = 97.4 + (x-114.5)*0.6754
            Solve: 411 - 0.7258(x-90) = 97.4 + 0.6754(x-114.5)
                   411 - 0.7258x + 65.32 = 97.4 + 0.6754x - 77.34
                   476.32 - 0.7258x = 20.06 + 0.6754x
                   456.26 = 1.4012x
                   x ≈ 325.6 ; y ≈ 411 - 0.7258*(325.6-90) = 411 - 171.0 = 240.0  */}
        <line x1="90" y1="240.0" x2="325.6" y2="240.0" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="325.6" y1="240.0" x2="325.6" y2="460" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="325.6" cy="240.0" r="7" fill="#fff" stroke="#555" strokeWidth="2"/>
        <text x="335.6" y="244.0" fontSize="13" fontWeight="bold" fill="#555">E1</text>
        {/* E2 — new equilibrium: S2 ∩ D
            S2 starts at x=180 same slope -0.7258 from y=411 ; y = 411 - 0.7258(x-180)
            Solve: 411 - 0.7258(x-180) = 97.4 + 0.6754(x-114.5)
                   411 - 0.7258x + 130.65 = 97.4 + 0.6754x - 77.34
                   541.65 - 0.7258x = 20.06 + 0.6754x
                   521.59 = 1.4012x
                   x ≈ 372.3 ; y ≈ 411 - 0.7258*(372.3-180) = 411 - 139.6 = 271.4  */}
        <line x1="90" y1="271.4" x2="372.3" y2="271.4" stroke="#cc6600" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="372.3" y1="271.4" x2="372.3" y2="460" stroke="#cc6600" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="372.3" cy="271.4" r="7" fill="#fff" stroke="#cc6600" strokeWidth="2"/>
        <text x="382.3" y="275.4" fontSize="13" fontWeight="bold" fill="#cc6600">E2</text>
        {/* Axis labels for ER and Q */}
        <text x="80" y="244.0" textAnchor="end" fontSize="12" fontWeight="bold" fill="#555">ER1</text>
        <text x="80" y="275.4" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc6600">ER2</text>
        <text x="325.6" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555">Q1</text>
        <text x="372.3" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc6600">Q2</text>
        {/* Depreciation arrow on Y-axis (downward) */}
        <line x1="68.0" y1="240.0" x2="68.0" y2="271.4" stroke="#cc2222" strokeWidth="2" markerEnd="url(#ngnRedD)" markerStart="url(#ngnRedU)"/>
        <text x="54.0" y="252.7" textAnchor="end" fontSize="10" fontWeight="bold" fill="#cc2222">NGN</text>
        <text x="54.0" y="265.7" textAnchor="end" fontSize="10" fill="#cc2222">deprec.</text>
        {/* Caption box */}
        <rect x="90" y="500" width="512" height="58" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="102" y="518" fontSize="11" fontWeight="bold" fill="#111">Effect on Nigerian exporters:</text>
        <text x="102" y="534" fontSize="11" fill="#555">Unification removes the over-valued official rate → effective supply of NGN rises</text>
        <text x="102" y="548" fontSize="11" fill="#555">→ ER falls (ER1 → ER2). Exports priced in USD become cheaper → demand for exports rises.</text>
      </svg>
    </div>
  );
}
