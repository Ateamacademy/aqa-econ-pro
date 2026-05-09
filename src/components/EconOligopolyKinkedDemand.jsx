export default function EconOligopolyKinkedDemand() {
  return (
    <div style={{background:'#fff',maxWidth:'860px',margin:'0 auto',fontFamily:"'Arial',sans-serif"}}>
      <svg viewBox="0 0 860 760" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="kdR" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><polygon points="0 0,12 6,0 12" fill="#111"/></marker>
          <marker id="kdU" markerWidth="12" markerHeight="12" refX="6" refY="2" orient="auto"><polygon points="0 12,6 0,12 12" fill="#111"/></marker>
        </defs>
        <rect width="860" height="760" fill="#fff"/>
        <text x="430" y="38" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#111">Oligopoly · Kinked Demand Curve</text>
        <text x="98" y="50" fontSize="14" fontWeight="bold" fill="#111">Price/costs</text>
        <line x1="105" y1="635" x2="105" y2="84" stroke="#111" strokeWidth="3.2" markerEnd="url(#kdU)"/>
        <line x1="105" y1="635" x2="742" y2="635" stroke="#111" strokeWidth="3.2" markerEnd="url(#kdR)"/>
        <text x="750" y="642" fontSize="14" fontWeight="bold" fill="#111">Output</text>
        <line x1="105" y1="155" x2="410" y2="292" stroke="#2a5bcc" strokeWidth="4" strokeLinecap="round"/>
        <line x1="410" y1="292" x2="682" y2="511" stroke="#2a5bcc" strokeWidth="4" strokeLinecap="round"/>
        <text x="692" y="511" fontSize="18" fontWeight="bold" fill="#2a5bcc">AR=D</text>
        <line x1="105" y1="155" x2="410" y2="372" stroke="#d96a0b" strokeWidth="3" strokeDasharray="12 8" strokeLinecap="round"/>
        <line x1="410" y1="468" x2="491" y2="635" stroke="#d96a0b" strokeWidth="3" strokeDasharray="12 8" strokeLinecap="round"/>
        <rect x="402" y="372" width="16" height="96" fill="rgba(246,154,73,0.25)" stroke="#d96a0b" strokeWidth="2"/>
        <text x="428" y="429" fontSize="16" fontWeight="bold" fill="#d96a0b">MR gap</text>
        <line x1="105" y1="592" x2="676" y2="314" stroke="#14924a" strokeWidth="4" strokeLinecap="round"/>
        <text x="680" y="307" fontSize="16" fontWeight="bold" fill="#14924a">MC</text>
        <line x1="105" y1="292" x2="410" y2="292" stroke="#8b8b8b" strokeWidth="2" strokeDasharray="10 8"/>
        <line x1="410" y1="292" x2="410" y2="635" stroke="#8b8b8b" strokeWidth="2" strokeDasharray="10 8"/>
        <circle cx="410" cy="292" r="12" fill="#fff" stroke="#2a5bcc" strokeWidth="4"/>
        <text x="92" y="300" textAnchor="end" fontSize="15" fontWeight="bold" fill="#111">P*</text>
        <text x="410" y="658" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Q*</text>
        <rect x="153" y="199" width="182" height="44" rx="7" fill="rgba(255,255,255,0.82)" stroke="#d1d1d1" strokeWidth="1.3"/>
        <text x="162" y="220" fontSize="12" fill="#111">Rivals do NOT</text>
        <text x="162" y="236" fontSize="12" fill="#111">match price rise</text>
        <rect x="510" y="315" width="169" height="40" rx="7" fill="rgba(255,255,255,0.82)" stroke="#d1d1d1" strokeWidth="1.3"/>
        <text x="520" y="335" fontSize="12" fill="#111">Rivals match</text>
        <text x="520" y="351" fontSize="12" fill="#111">price cut</text>
        <rect x="105" y="682" width="640" height="60" rx="8" fill="#eef4ff" stroke="#b8c9e8" strokeWidth="1.6"/>
        <text x="124" y="707" fontSize="14" fontWeight="bold" fill="#111">Price rigidity:</text>
        <text x="124" y="729" fontSize="13" fill="#222">MC can shift within the MR gap without changing P* or Q*. Explains sticky prices in oligopolistic markets.</text>
      </svg>
    </div>
  );
}