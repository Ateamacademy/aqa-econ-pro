export default function EconEdexcelMonopsony() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Inter','Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 480" width="100%" style={{display:'block'}}>
        <rect width="620" height="480" fill="#ffffff"/>
        <text x="310" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0f172a">Monopsony in the UK Social Care Labour Market</text>
        <line x1="90" y1="420" x2="570" y2="420" stroke="#0f172a" strokeWidth="2"/>
        <line x1="90" y1="60" x2="90" y2="420" stroke="#0f172a" strokeWidth="2"/>
        <text x="580" y="425" fontSize="12" fill="#0f172a">Quantity of Labour (Q)</text>
        <text x="60" y="55" fontSize="12" fill="#0f172a">Wage (W)</text>
        <line x1="110" y1="400" x2="540" y2="110" stroke="#0284c7" strokeWidth="2.5"/>
        <text x="545" y="108" fontSize="12" fontWeight="600" fill="#0284c7">S_L = AC_L</text>
        <line x1="110" y1="400" x2="420" y2="80" stroke="#be123c" strokeWidth="2.5"/>
        <text x="395" y="75" fontSize="12" fontWeight="600" fill="#be123c">MC_L</text>
        <line x1="110" y1="110" x2="550" y2="400" stroke="#15803d" strokeWidth="2.5"/>
        <text x="555" y="400" fontSize="12" fontWeight="600" fill="#15803d">MRP_L = D_L</text>
        <circle cx="327" cy="253" r="5" fill="#15803d"/>
        <line x1="327" y1="253" x2="327" y2="420" stroke="#15803d" strokeDasharray="4,4" strokeWidth="1.5"/>
        <line x1="90" y1="253" x2="327" y2="253" stroke="#15803d" strokeDasharray="4,4" strokeWidth="1.5"/>
        <text x="332" y="435" fontSize="11" fontWeight="700" fill="#15803d">Qc</text>
        <text x="68" y="257" fontSize="11" fontWeight="700" fill="#15803d">Wc</text>
        <circle cx="281" cy="223" r="5" fill="#be123c"/>
        <line x1="281" y1="223" x2="281" y2="420" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5"/>
        <circle cx="281" cy="285" r="5" fill="#0284c7"/>
        <line x1="90" y1="285" x2="281" y2="285" stroke="#0284c7" strokeDasharray="4,4" strokeWidth="1.5"/>
        <text x="286" y="435" fontSize="11" fontWeight="700" fill="#be123c">Qm</text>
        <text x="66" y="289" fontSize="11" fontWeight="700" fill="#0284c7">Wm</text>
        <text x="335" y="248" fontSize="10" fill="#15803d" fontWeight="600">Competitive</text>
        <text x="335" y="260" fontSize="10" fill="#15803d" fontWeight="600">equilibrium</text>
        <text x="200" y="218" fontSize="10" fill="#be123c" fontWeight="600">Monopsonist's</text>
        <text x="200" y="230" fontSize="10" fill="#be123c" fontWeight="600">profit-max (MC=MRP)</text>
        <text x="310" y="458" textAnchor="middle" fontSize="11" fill="#334155">{"Qm < Qc and Wm < Wc: fewer workers hired, lower wage paid than in a competitive market."}</text>
      </svg>
    </div>
  );
}