export default function EconGameTheoryPayoff() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Inter','Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 620 460" width="100%" style={{display:'block'}}>
        <rect width="620" height="460" fill="#ffffff"/>
        <text x="310" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Payoff Matrix — Tesco vs Sainsbury's (£m profit)</text>
        <text x="310" y="52" textAnchor="middle" fontSize="12" fill="#475569">Cell format: (Tesco, Sainsbury's)</text>
        <text x="360" y="95" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0f172a">Sainsbury's</text>
        <text x="260" y="120" textAnchor="middle" fontSize="12" fill="#0f172a">High price</text>
        <text x="460" y="120" textAnchor="middle" fontSize="12" fill="#0f172a">Low price</text>
        <text x="70" y="230" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0f172a" transform="rotate(-90 70 230)">Tesco</text>
        <text x="130" y="200" textAnchor="middle" fontSize="12" fill="#0f172a">High</text>
        <text x="130" y="215" textAnchor="middle" fontSize="12" fill="#0f172a">price</text>
        <text x="130" y="310" textAnchor="middle" fontSize="12" fill="#0f172a">Low</text>
        <text x="130" y="325" textAnchor="middle" fontSize="12" fill="#0f172a">price</text>
        <rect x="170" y="140" width="180" height="120" fill="#dcfce7" stroke="#15803d" strokeWidth="2"/>
        <text x="260" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#14532d">(100, 100)</text>
        <text x="260" y="200" textAnchor="middle" fontSize="11" fill="#166534">Collusion</text>
        <text x="260" y="218" textAnchor="middle" fontSize="11" fill="#166534">(jointly optimal)</text>
        <rect x="370" y="140" width="180" height="120" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
        <text x="460" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350f">(10, 150)</text>
        <text x="460" y="200" textAnchor="middle" fontSize="11" fill="#92400e">Sainsbury's undercuts;</text>
        <text x="460" y="218" textAnchor="middle" fontSize="11" fill="#92400e">Tesco loses market</text>
        <rect x="170" y="260" width="180" height="120" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
        <text x="260" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350f">(150, 10)</text>
        <text x="260" y="320" textAnchor="middle" fontSize="11" fill="#92400e">Tesco undercuts;</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11" fill="#92400e">Sainsbury's loses</text>
        <rect x="370" y="260" width="180" height="120" fill="#fee2e2" stroke="#b91c1c" strokeWidth="3"/>
        <text x="460" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7f1d1d">(40, 40)</text>
        <text x="460" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">NASH EQUILIBRIUM</text>
        <text x="460" y="338" textAnchor="middle" fontSize="11" fill="#991b1b">Dominant-strategy outcome</text>
        <text x="310" y="410" textAnchor="middle" fontSize="11" fill="#1e3a8a" fontWeight="600">Each firm's dominant strategy = Low price ⇒ Nash equilibrium at (Low, Low)</text>
        <text x="310" y="430" textAnchor="middle" fontSize="11" fill="#475569">Collusion at (High, High) is jointly better but unstable without enforcement — incentive to defect</text>
      </svg>
    </div>
  );
}