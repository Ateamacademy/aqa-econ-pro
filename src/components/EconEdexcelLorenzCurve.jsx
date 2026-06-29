export default function EconEdexcelLorenzCurve() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Inter','Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 500" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="aLz" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker>
        </defs>
        <rect width="620" height="500" fill="#ffffff"/>
        <text x="310" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">Lorenz Curve · UK Income Inequality (2020 vs 2024)</text>
        <line x1="100" y1="420" x2="500" y2="420" stroke="#0f172a" strokeWidth="2"/>
        <line x1="100" y1="60" x2="100" y2="420" stroke="#0f172a" strokeWidth="2"/>
        <text x="300" y="460" textAnchor="middle" fontSize="12" fill="#0f172a">Cumulative % of population</text>
        <text x="50" y="240" fontSize="12" fill="#0f172a" transform="rotate(-90 50 240)">Cumulative % of income</text>
        <g fontSize="10" fill="#475569">
          <text x="100" y="435" textAnchor="middle">0</text>
          <text x="200" y="435" textAnchor="middle">25</text>
          <text x="300" y="435" textAnchor="middle">50</text>
          <text x="400" y="435" textAnchor="middle">75</text>
          <text x="500" y="435" textAnchor="middle">100</text>
          <text x="92" y="424" textAnchor="end">0</text>
          <text x="92" y="330" textAnchor="end">25</text>
          <text x="92" y="240" textAnchor="end">50</text>
          <text x="92" y="150" textAnchor="end">75</text>
          <text x="92" y="64" textAnchor="end">100</text>
        </g>
        <line x1="100" y1="420" x2="500" y2="60" stroke="#15803d" strokeWidth="2" strokeDasharray="6,4"/>
        <text x="430" y="80" fontSize="10" fontWeight="600" fill="#15803d">Line of perfect equality (45°)</text>
        <path d="M 100 420 Q 250 390 350 310 Q 430 240 500 60" fill="none" stroke="#0284c7" strokeWidth="2.5"/>
        <text x="345" y="295" fontSize="11" fontWeight="600" fill="#0284c7">Lorenz 2020 (G ≈ 0.33)</text>
        <path d="M 100 420 Q 290 410 380 340 Q 445 275 500 60" fill="none" stroke="#be123c" strokeWidth="3"/>
        <text x="365" y="380" fontSize="11" fontWeight="700" fill="#be123c">Lorenz 2024 (G ≈ 0.36)</text>
        <path d="M 100 420 L 500 60 L 500 60 Q 445 275 380 340 Q 290 410 100 420 Z" fill="#fecaca" fillOpacity="0.45"/>
        <text x="270" y="210" fontSize="14" fontWeight="700" fill="#7f1d1d">A</text>
        <text x="380" y="405" fontSize="14" fontWeight="700" fill="#1e3a8a">B</text>
        <path d="M 330 320 Q 360 350 370 360" fill="none" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#aLz)"/>
        <text x="230" y="335" fontSize="11" fill="#0f172a">Curve bows outward →</text>
        <text x="230" y="350" fontSize="11" fill="#0f172a">inequality rises</text>
        <rect x="130" y="80" width="170" height="60" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="215" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">Gini coefficient</text>
        <text x="215" y="122" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">G = A / (A + B)</text>
        <text x="310" y="485" textAnchor="middle" fontSize="11" fill="#334155">As area A grows (2020 → 2024), G rises · worsening UK income inequality.</text>
      </svg>
    </div>
  );
}