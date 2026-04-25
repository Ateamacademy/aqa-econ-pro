export default function EconMonopolyDWL() {
  // Geometry
  // D=AR: linear from (60,80) to (760,540) — slope = 460/700
  // MR: linear from (60,80) to (410,540) — twice the slope of D (steeper)
  // MC: U-shape, monotonically rising past min; passes through MR at M=(Qm, ?)
  // AC: U-shape, tangent area; intersects MC at its minimum (where MC cuts AC from below)
  // MC=D=AR (allocatively efficient) at C: (Qc, Pc)
  // Pm sits on AR above Qm. Pc sits on AR=MC at Qc.
  //
  // Chosen anchors:
  //   Qm x = 300   (Pm on AR)  -> AR(300) = 80 + (460/700)*(300-60) = 80 + 157.71 = 237.71  -> Pm y ≈ 238
  //   Qc x = 470   (Pc on AR=MC) -> AR(470) = 80 + (460/700)*(470-60) = 80 + 269.43 = 349.43 -> Pc y ≈ 349
  //   M point on MC at Qm=300, y=Pm=238 (so MC passes through (300,238))
  //   C point at (470, 349) where MC = AR
  //   AC at Qm=300 is y≈322 (lower than Pm so supernormal profit exists)
  //   AC minimum near x≈430, ymin≈335 ; MC crosses AC there.
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'10px',maxWidth:'780px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 820 620" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mdR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="mdU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="820" height="620" fill="#fff"/>
        <text x="410" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Monopoly — Supernormal Profit & Deadweight Welfare Loss</text>

        {/* Axes */}
        <line x1="60" y1="560" x2="60" y2="40" stroke="#111" strokeWidth="2.2" markerEnd="url(#mdU)"/>
        <line x1="60" y1="560" x2="780" y2="560" stroke="#111" strokeWidth="2.2" markerEnd="url(#mdR)"/>
        <text x="48" y="34" fontSize="14" fontWeight="bold" fill="#111">P</text>
        <text x="772" y="582" fontSize="14" fontWeight="bold" fill="#111">Q</text>

        {/* Supernormal profit rectangle: from (60, Pm=238) to (Qm=300, AC(Qm)=322) */}
        <rect x="60" y="238" width="240" height="84" fill="#f4b89a" fillOpacity="0.55" stroke="none"/>

        {/* DWL triangle: vertices M(300,238), C(470,349), and MC at Qm intersection going down to MC base.
            Standard DWL = triangle between MC, D and the vertical at Qm, bounded right by C.
            Vertices: M=(300,238) on AR/Pm, C=(470,349) on AR=MC, and point on MC at Qm: MC(300) ≈ 425 (below). */}
        <polygon points="300,238 470,349 300,425" fill="#7ec8f0" fillOpacity="0.55" stroke="none"/>

        {/* AR = D : linear from (60,80) to (760,540) */}
        <line x1="60" y1="80" x2="760" y2="540" stroke="#111" strokeWidth="2.4"/>
        <text x="700" y="528" fontSize="13" fontWeight="bold" fill="#111">D = AR</text>

        {/* MR : linear from (60,80) to (410,540) — twice slope */}
        <line x1="60" y1="80" x2="410" y2="540" stroke="#111" strokeWidth="2.2"/>
        <text x="415" y="548" fontSize="13" fontWeight="bold" fill="#111">MR</text>

        {/* MC : U-shape passing through (300,238) [M] and (470,349) [C].
            Use a smooth curve via two cubic segments. Min near x=360, y=420. */}
        <path d="M 130 540 C 230 480 290 460 340 430 C 380 400 360 320 300 238 C 350 210 410 250 470 349 C 540 470 600 540 660 560"
              fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round"/>
        <text x="345" y="100" fontSize="13" fontWeight="bold" fill="#111">MC</text>

        {/* AC : U-shape, minimum near (440, 340), passes through (300,322) and (470, 349) approximately tangent area */}
        <path d="M 110 200 C 200 270 260 310 300 322 C 360 338 410 335 440 340 C 500 350 580 380 700 460"
              fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round"/>
        <text x="510" y="150" fontSize="13" fontWeight="bold" fill="#111">AC</text>

        {/* Dotted guide lines (green) */}
        {/* Horizontal Pm -> M */}
        <line x1="60" y1="238" x2="300" y2="238" stroke="#0a7d3b" strokeWidth="1.8" strokeDasharray="2,5" strokeLinecap="round"/>
        {/* Horizontal Pc -> C */}
        <line x1="60" y1="349" x2="470" y2="349" stroke="#0a7d3b" strokeWidth="1.8" strokeDasharray="2,5" strokeLinecap="round"/>
        {/* Vertical Qm -> axis */}
        <line x1="300" y1="238" x2="300" y2="560" stroke="#0a7d3b" strokeWidth="1.8" strokeDasharray="2,5" strokeLinecap="round"/>
        {/* Vertical Qc -> axis */}
        <line x1="470" y1="349" x2="470" y2="560" stroke="#0a7d3b" strokeWidth="1.8" strokeDasharray="2,5" strokeLinecap="round"/>

        {/* Equilibrium points */}
        <circle cx="300" cy="238" r="6" fill="#d61f1f" stroke="#111" strokeWidth="1"/>
        <text x="310" y="232" fontSize="13" fontWeight="bold" fill="#111">M</text>
        <circle cx="470" cy="349" r="6" fill="#d61f1f" stroke="#111" strokeWidth="1"/>
        <text x="480" y="345" fontSize="13" fontWeight="bold" fill="#111">C</text>

        {/* Axis labels for Pm, Pc, Qm, Qc */}
        <text x="52" y="242" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Pm</text>
        <text x="52" y="353" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">Pc</text>
        <text x="300" y="578" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Qm</text>
        <text x="470" y="578" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Qc</text>

        {/* Legend box - Supernormal profit */}
        <rect x="600" y="80" width="180" height="48" fill="#f4b89a" fillOpacity="0.6" stroke="#c97a55" strokeWidth="1"/>
        <text x="690" y="102" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Supernormal profit</text>
        <text x="690" y="120" textAnchor="middle" fontSize="12" fill="#111">Qm(AR − AC)</text>

        {/* Legend box - DWL */}
        <rect x="600" y="150" width="180" height="40" fill="#7ec8f0" fillOpacity="0.6" stroke="#3b86b8" strokeWidth="1"/>
        <text x="690" y="174" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#111">Deadweight welfare loss</text>
      </svg>
    </div>
  );
}
