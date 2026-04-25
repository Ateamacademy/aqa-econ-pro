export default function EconMonopolyDWL() {
  // Geometry tuned to match the reference image (economicshelp.org style):
  //  - Linear D=AR and MR (MR twice the slope of AR, sharing same vertical intercept)
  //  - U-shaped MC and AC; MC cuts AC at AC's minimum
  //  - M = profit-max point on AR above Qm where MC = MR (monopoly equilibrium)
  //  - C = allocatively efficient point where MC = AR (=D)
  //  - Supernormal profit rectangle: width Qm, height (Pm − AC(Qm))
  //  - DWL triangle: vertices M (Pm,Qm), C (Pc,Qc), and point on MR/MC vertical span at Qm
  //
  // Anchors (SVG y grows downward):
  //   AR: from (60,80) to (760,540)        slope = 460/700
  //   MR: from (60,80) to (410,540)        twice slope of AR
  //   Qm = 300  → on AR: Pm-y ≈ 238
  //   Qc = 470  → on AR: Pc-y ≈ 349 (also where MC crosses AR)
  //   AC at Qm: y ≈ 322 (below Pm → supernormal profit)
  //   MC at Qm (lower branch / where MR crosses): y ≈ 425
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'10px',maxWidth:'820px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 820 620" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mdR2" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="mdU2" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="820" height="620" fill="#fff"/>
        <text x="410" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Firm X — Monopoly Long-Run Equilibrium (Supernormal Profit & DWL)</text>

        {/* Axes */}
        <line x1="60" y1="560" x2="60" y2="40" stroke="#111" strokeWidth="2.4" markerEnd="url(#mdU2)"/>
        <line x1="60" y1="560" x2="780" y2="560" stroke="#111" strokeWidth="2.4" markerEnd="url(#mdR2)"/>
        <text x="46" y="36" fontSize="14" fontWeight="bold" fill="#111">P</text>
        <text x="772" y="582" fontSize="14" fontWeight="bold" fill="#111">Q</text>

        {/* Supernormal profit rectangle: y from Pm(238) to AC(Qm)≈322, x from 60 to Qm(300) */}
        <rect x="60" y="238" width="240" height="84" fill="#f4b89a" fillOpacity="0.6" stroke="#c97a55" strokeWidth="1" strokeDasharray="3,3"/>

        {/* DWL triangle: M (300,238) — C (470,349) — point on vertical at Qm where MC sits ≈ (300,425) */}
        <polygon points="300,238 470,349 300,425" fill="#7ec8f0" fillOpacity="0.6" stroke="#3b86b8" strokeWidth="1"/>

        {/* AR = D */}
        <line x1="60" y1="80" x2="760" y2="540" stroke="#111" strokeWidth="2.5"/>
        <text x="700" y="528" fontSize="13" fontWeight="bold" fill="#111">D = AR</text>

        {/* MR */}
        <line x1="60" y1="80" x2="410" y2="540" stroke="#111" strokeWidth="2.3"/>
        <text x="415" y="548" fontSize="13" fontWeight="bold" fill="#111">MR</text>

        {/* MC : U-shape passing through (300,425) lower branch then up through (470,349) and beyond */}
        <path d="M 130 540 C 200 480 250 460 290 430 C 320 410 320 360 320 320 C 330 270 380 290 470 349 C 540 410 600 470 660 540"
              fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="335" y="118" fontSize="13" fontWeight="bold" fill="#111">MC</text>

        {/* AC : U-shape, passes through (300, 322) and (470, 349); minimum to right where MC crosses */}
        <path d="M 110 200 C 200 270 260 308 300 322 C 360 340 430 348 470 349 C 540 352 620 400 700 470"
              fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="500" y="148" fontSize="13" fontWeight="bold" fill="#111">AC</text>

        {/* Dotted guide lines (green) */}
        <line x1="60" y1="238" x2="300" y2="238" stroke="#0a7d3b" strokeWidth="2" strokeDasharray="2,5" strokeLinecap="round"/>
        <line x1="60" y1="349" x2="470" y2="349" stroke="#0a7d3b" strokeWidth="2" strokeDasharray="2,5" strokeLinecap="round"/>
        <line x1="300" y1="238" x2="300" y2="560" stroke="#0a7d3b" strokeWidth="2" strokeDasharray="2,5" strokeLinecap="round"/>
        <line x1="470" y1="349" x2="470" y2="560" stroke="#0a7d3b" strokeWidth="2" strokeDasharray="2,5" strokeLinecap="round"/>

        {/* Equilibrium points */}
        <circle cx="300" cy="238" r="6.5" fill="#d61f1f" stroke="#111" strokeWidth="1.2"/>
        <text x="310" y="232" fontSize="14" fontWeight="bold" fill="#111">M</text>
        <circle cx="470" cy="349" r="6.5" fill="#d61f1f" stroke="#111" strokeWidth="1.2"/>
        <text x="480" y="345" fontSize="14" fontWeight="bold" fill="#111">C</text>

        {/* Axis labels for Pm, Pc, Qm, Qc */}
        <text x="52" y="242" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Pm</text>
        <text x="52" y="353" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Pc</text>
        <text x="300" y="580" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Qm</text>
        <text x="470" y="580" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Qc</text>

        {/* Legend - Supernormal profit */}
        <rect x="600" y="78" width="190" height="50" fill="#f4b89a" fillOpacity="0.65" stroke="#c97a55" strokeWidth="1"/>
        <text x="695" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Supernormal profit</text>
        <text x="695" y="119" textAnchor="middle" fontSize="12" fill="#111">Qm × (AR − AC)</text>

        {/* Legend - DWL */}
        <rect x="600" y="148" width="190" height="42" fill="#7ec8f0" fillOpacity="0.65" stroke="#3b86b8" strokeWidth="1"/>
        <text x="695" y="174" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Deadweight welfare loss</text>
      </svg>
    </div>
  );
}
