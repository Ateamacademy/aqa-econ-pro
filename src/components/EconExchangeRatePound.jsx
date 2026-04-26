// High-fidelity Currency Market diagram for the British Pound (GBP).
// Used for Eduqas A-Level Paper 3 Hard (eduqas-p3-b) — Q3.1 "Using a diagram,
// explain the factors that determine the exchange rate of the pound in a
// floating exchange rate system." Shows S£, D£, and a rightward shift in the
// supply of pounds (S£ → SE₁) leading to a depreciation (E → E₁).
export default function EconExchangeRatePound() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 680 560" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="gbpR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="gbpU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="gbpArrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc6600"/></marker>
        </defs>
        <rect width="680" height="560" fill="#fff"/>
        <text x="340" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Currency Market — Exchange Rate (£)</text>
        <text x="340" y="48" textAnchor="middle" fontSize="12" fill="#555">Floating system: ER set by demand &amp; supply of pounds. Supply rises (S£ → SE₁) → £ depreciates</text>

        {/* Axes */}
        <line x1="90" y1="460" x2="90" y2="48" stroke="#111" strokeWidth="2.2" markerEnd="url(#gbpU)"/>
        <line x1="90" y1="460" x2="602" y2="460" stroke="#111" strokeWidth="2.2" markerEnd="url(#gbpR)"/>
        <text x="84" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Exchange</text>
        <text x="84" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Rate</text>
        <text x="84" y="70" textAnchor="middle" fontSize="11" fill="#555">($/£)</text>
        <text x="335" y="494" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Quantity of £</text>

        {/* Demand for £ (downward sloping) */}
        <polyline points="114.5,97.4 145.0,118.0 175.5,138.6 206.0,159.2 236.5,179.8 267.0,200.4 297.5,221.0 328.0,241.6 358.5,262.2 389.0,282.8 419.5,303.4 450.0,324.0 480.5,344.6 511.0,365.2 541.5,385.8 555.5,395.0" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="402.0" fontSize="13" fontWeight="bold" fill="#2255cc">D£</text>

        {/* Original Supply S£ (upward sloping) */}
        <polyline points="90.0,411.0 121.0,388.5 152.0,366.0 183.0,343.5 214.0,321.0 245.0,298.5 276.0,276.0 307.0,253.5 338.0,231.0 369.0,208.5 400.0,186.0 431.0,163.5 462.0,141.0 493.0,118.5 524.0,96.0 555.5,73.5" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="561.5" y="68.5" fontSize="13" fontWeight="bold" fill="#cc2222">S£</text>

        {/* New Supply SE₁ — shifted right (more pounds supplied at every rate) */}
        <polyline points="180.0,411.0 211.0,388.5 242.0,366.0 273.0,343.5 304.0,321.0 335.0,298.5 366.0,276.0 397.0,253.5 428.0,231.0 459.0,208.5 490.0,186.0 521.0,163.5 552.0,141.0 583.0,118.5" fill="none" stroke="#cc6600" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="9,5"/>
        <text x="589.0" y="113.5" fontSize="13" fontWeight="bold" fill="#cc6600">SE₁</text>

        {/* Shift arrow */}
        <line x1="276.0" y1="276.0" x2="335.0" y2="298.5" stroke="#cc6600" strokeWidth="2.2" markerEnd="url(#gbpArrow)"/>

        {/* E — original equilibrium: S£ ∩ D£ at (325.6, 240.0) */}
        <line x1="90" y1="240.0" x2="325.6" y2="240.0" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="325.6" y1="240.0" x2="325.6" y2="460" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="325.6" cy="240.0" r="7" fill="#fff" stroke="#2a8a3a" strokeWidth="2.2"/>
        <text x="335.6" y="244.0" fontSize="13" fontWeight="bold" fill="#2a8a3a">E</text>

        {/* E₁ — new equilibrium: SE₁ ∩ D£ at (372.3, 271.4) */}
        <line x1="90" y1="271.4" x2="372.3" y2="271.4" stroke="#cc6600" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="372.3" y1="271.4" x2="372.3" y2="460" stroke="#cc6600" strokeWidth="1.4" strokeDasharray="7,5"/>
        <circle cx="372.3" cy="271.4" r="7" fill="#fff" stroke="#cc6600" strokeWidth="2.2"/>
        <text x="382.3" y="275.4" fontSize="13" fontWeight="bold" fill="#cc6600">E₁</text>

        {/* Axis labels */}
        <text x="80" y="244.0" textAnchor="end" fontSize="12" fontWeight="bold" fill="#2a8a3a">ER</text>
        <text x="80" y="275.4" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc6600">ER₁</text>
        <text x="325.6" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2a8a3a">Q</text>
        <text x="372.3" y="480" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc6600">Q₁</text>

        {/* Caption */}
        <rect x="90" y="500" width="512" height="58" rx="5" fill="#fef9f0" stroke="#e5c97a" strokeWidth="1.2"/>
        <text x="102" y="518" fontSize="11" fontWeight="bold" fill="#111">Determinants of £ exchange rate (floating system):</text>
        <text x="102" y="534" fontSize="11" fill="#555">Demand for £ ↑ from UK exports, FDI inflows, higher UK interest rates, speculation £ will rise.</text>
        <text x="102" y="548" fontSize="11" fill="#555">Supply of £ ↑ from UK imports, outward FDI, lower UK interest rates → £ depreciates (ER → ER₁).</text>
      </svg>
    </div>
  );
}
