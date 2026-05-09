export default function SugarTaxWelfareAnalysis() {
  return (
    <div style={{background:'#fff',maxWidth:'863px',margin:'0 auto',fontFamily:"'Arial',sans-serif"}}>
      <svg viewBox="0 0 863 712" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="stR" markerWidth="12" markerHeight="10" refX="11" refY="5" orient="auto"><polygon points="0 0,12 5,0 10" fill="#111"/></marker>
          <marker id="stU" markerWidth="10" markerHeight="12" refX="5" refY="1" orient="auto"><polygon points="0 12,5 0,10 12" fill="#111"/></marker>
        </defs>
        <rect width="863" height="712" fill="#fff"/>
        <text x="431.5" y="28" textAnchor="middle" fontSize="22" fontWeight="700" fill="#111">Sugar Tax · Welfare Analysis (UK SDIL 2018)</text>
        <line x1="106" y1="603" x2="106" y2="72" stroke="#222" strokeWidth="3.5" markerEnd="url(#stU)"/>
        <line x1="106" y1="603" x2="740" y2="603" stroke="#222" strokeWidth="3.5" markerEnd="url(#stR)"/>
        <text x="100" y="61" fontSize="18" fontWeight="700" fill="#111">Costs/Benefits</text>
        <text x="743" y="611" fontSize="16" fontWeight="700" fill="#111">Quantity</text>
        <line x1="140" y1="100" x2="760" y2="550" stroke="#2c57c7" strokeWidth="4" strokeLinecap="round"/>
        <line x1="100" y1="580" x2="760" y2="315" stroke="#1c9a4a" strokeWidth="4" strokeLinecap="round"/>
        <line x1="100" y1="580" x2="700" y2="157" stroke="#d61f1f" strokeWidth="4" strokeLinecap="round"/>
        <line x1="100" y1="505" x2="650" y2="276" stroke="#c85b00" strokeWidth="4" strokeLinecap="round"/>
        <polygon points="479,313 479,347 550,399" fill="rgba(179,118,48,0.42)" stroke="rgba(179,118,48,0.72)" strokeWidth="1.2"/>
        <polygon points="456,329 479,313 479,347" fill="rgba(220,38,38,0.45)" stroke="rgba(220,38,38,0.78)" strokeWidth="1.2"/>
        <line x1="106" y1="399" x2="550" y2="399" stroke="#9ca3af" strokeWidth="2" strokeDasharray="9,8"/>
        <line x1="106" y1="347" x2="479" y2="347" stroke="#f97316" strokeWidth="2" strokeDasharray="9,8"/>
        <line x1="106" y1="329" x2="456" y2="329" stroke="#ef4444" strokeWidth="2" strokeDasharray="9,8"/>
        <line x1="550" y1="399" x2="550" y2="603" stroke="#9ca3af" strokeWidth="2" strokeDasharray="9,8"/>
        <line x1="479" y1="347" x2="479" y2="603" stroke="#f97316" strokeWidth="2" strokeDasharray="9,8"/>
        <line x1="456" y1="329" x2="456" y2="603" stroke="#ef4444" strokeWidth="2" strokeDasharray="9,8"/>
        <circle cx="456" cy="329" r="9.5" fill="#fff" stroke="#ef4444" strokeWidth="3"/>
        <circle cx="479" cy="347" r="9.5" fill="#fff" stroke="#f97316" strokeWidth="3"/>
        <circle cx="550" cy="399" r="9.5" fill="#fff" stroke="#a3a3a3" strokeWidth="3"/>
        <text x="77" y="405" fontSize="15" fontWeight="700" fill="#8b95a5">P1</text>
        <text x="75" y="353" fontSize="15" fontWeight="700" fill="#f97316">P2</text>
        <text x="79" y="335" fontSize="15" fontWeight="700" fill="#ef4444">P*</text>
        <text x="448" y="628" fontSize="15" fontWeight="700" fill="#ef4444">Q*</text>
        <text x="470" y="628" fontSize="15" fontWeight="700" fill="#f97316">Qt</text>
        <text x="537" y="628" fontSize="15" fontWeight="700" fill="#8b95a5">Qm</text>
        <text x="705" y="150" fontSize="16" fontWeight="700" fill="#d61f1f">MSC</text>
        <text x="662" y="272" fontSize="16" fontWeight="700" fill="#c85b00">MPC+Tax</text>
        <text x="766" y="320" fontSize="16" fontWeight="700" fill="#1c9a4a">MPC</text>
        <text x="766" y="572" fontSize="16" fontWeight="700" fill="#2c57c7">MPB=MSB</text>
        <text x="596" y="324" fontSize="14" fontWeight="400" fill="#7a5010">DWL</text>
        <text x="588" y="342" fontSize="14" fontWeight="400" fill="#7a5010">(before tax)</text>
        <text x="496" y="351" fontSize="14" fontWeight="400" fill="#ef4444">Residual DWL</text>
        <rect x="106" y="648" width="630" height="74" rx="8" fill="#fff8ea" stroke="#dfb24f" strokeWidth="1.8"/>
        <text x="124" y="673" fontSize="14" fontWeight="700" fill="#111">Sugar tax effect:</text>
        <text x="124" y="696" fontSize="13.5" fill="#333">Tax shifts MPC up toward MSC. Quantity falls Qm→Qt→Q* (social optimum). Brown area</text>
        <text x="124" y="716" fontSize="13.5" fill="#333">= DWL eliminated by tax, red area = residual DWL if tax doesn't fully correct externality.</text>
      </svg>
    </div>
  );
}