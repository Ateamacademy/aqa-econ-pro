export default function SpecificAdValoremDiagram() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      width: "100%",
    }}>

      {/* Purple Header */}
      <div style={{
        background: "#6b2d8b",
        color: "#fff",
        textAlign: "center",
        padding: "10px 0",
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: ".04em",
      }}>
        SPECIFIC TAX &amp; AD VALOREM TAX
      </div>

      {/* Two panels side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ─────────────────────────────────────────
            LEFT PANEL · SPECIFIC TAX
            Key intersections (mathematically exact):
            Q1,P1 = Demand∩PreTax     → (146, 115)
            Q2,P2 = Demand∩WithTax    → (120, 96)
            P3    = PreTax at Q2=120  → (120, 135)
            T gap = 40px (parallel shift = constant)
        ───────────────────────────────────────── */}
        <div style={{ position: "relative", padding: "10px 8px 6px 8px", borderRight: "1px solid #e5e7eb" }}>
          <div style={{
            position: "absolute", top: 12, left: 48,
            background: "#fffde7", border: "1px solid #c8a800",
            color: "#333", fontSize: 10, fontWeight: 700,
            padding: "3px 10px", borderRadius: 2, zIndex: 2,
          }}>
            Specific Tax
          </div>

          <svg width="100%" viewBox="0 0 290 245" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="axL" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#222" />
              </marker>
              <marker id="tdL" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
                <path d="M0,0 L3,6 L6,0" fill="none" stroke="#333" strokeWidth="1.3" />
              </marker>
              <marker id="tuL" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
                <path d="M0,6 L3,0 L6,6" fill="none" stroke="#333" strokeWidth="1.3" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="42" y1="10" x2="42" y2="218" stroke="#222" strokeWidth="1.5" markerEnd="url(#axL)" />
            <line x1="40" y1="215" x2="278" y2="215" stroke="#222" strokeWidth="1.5" markerEnd="url(#axL)" />
            <text x="10" y="15" fill="#333" fontSize="10">Price</text>
            <text x="252" y="230" fill="#333" fontSize="10">Output</text>

            {/* Green tax rectangle: P2(y=96) → P3(y=135) over Q2(x=120) */}
            <polygon points="42,96 120,96 120,135 42,135" fill="#a5d6a7" fillOpacity="0.6" />

            {/* Demand: (55,48)→(268,210) */}
            <line x1="55" y1="48" x2="268" y2="210" stroke="#1a56db" strokeWidth="2.3" />
            <text x="245" y="210" fill="#1a56db" fontSize="9" fontWeight="bold">Demand</text>

            {/* Supply Pre Tax: (55,188)→(228,48) slope=-0.80925 */}
            <line x1="55" y1="188" x2="228" y2="48" stroke="#1a56db" strokeWidth="2.3" />
            <text x="212" y="44" fill="#1a56db" fontSize="8.5" fontWeight="bold">Supply</text>
            <text x="210" y="54" fill="#1a56db" fontSize="8.5" fontWeight="bold">Pre Tax</text>

            {/* Supply With Tax: (55,148)→(228,8) [parallel shift 40px up] */}
            <line x1="55" y1="148" x2="228" y2="8" stroke="#1a56db" strokeWidth="2.3" />
            <text x="180" y="12" fill="#1a56db" fontSize="8.5" fontWeight="bold">Supply</text>
            <text x="175" y="22" fill="#1a56db" fontSize="8.5" fontWeight="bold">With Tax</text>

            {/* T bracket: x=213, WithTax y≈20, PreTax y≈60, gap=40px */}
            <line x1="213" y1="22" x2="213" y2="58"
              stroke="#333" strokeWidth="1.4"
              markerEnd="url(#tdL)" markerStart="url(#tuL)" />
            <text x="218" y="43" fill="#333" fontSize="11" fontWeight="bold">T</text>

            {/* Orange dashed reference lines */}
            <line x1="42" y1="96"  x2="120" y2="96"  stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="42" y1="115" x2="146" y2="115" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="42" y1="135" x2="120" y2="135" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="120" y1="96"  x2="120" y2="215" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="146" y1="115" x2="146" y2="215" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />

            {/* Dots exactly on curve intersections */}
            <circle cx="120" cy="96"  r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />
            <circle cx="146" cy="115" r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />
            <circle cx="120" cy="135" r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />

            {/* Price labels */}
            <text x="24" y="100" fill="#333" fontSize="10" fontWeight="bold">P2</text>
            <text x="24" y="119" fill="#333" fontSize="10" fontWeight="bold">P1</text>
            <text x="24" y="139" fill="#333" fontSize="10" fontWeight="bold">P3</text>

            {/* Quantity labels */}
            <text x="113" y="228" fill="#333" fontSize="10" fontWeight="bold">Q2</text>
            <text x="139" y="228" fill="#333" fontSize="10" fontWeight="bold">Q1</text>
          </svg>
        </div>

        {/* ─────────────────────────────────────────
            RIGHT PANEL · AD VALOREM TAX
            Key intersections (mathematically exact):
            Q1,P1 = Demand∩PreTax    → (146, 115)
            Q2,P2 = Demand∩AdVal     → (104, 84)
            P3    = PreTax at Q2=104 → (104, 148)
            T gap = 64px (wider than left · proportional to price)
            Green area = 64px tall vs 39px on left (1.64× bigger)
        ───────────────────────────────────────── */}
        <div style={{ position: "relative", padding: "10px 8px 6px 8px" }}>
          <div style={{
            position: "absolute", top: 12, left: 48,
            background: "#fffde7", border: "1px solid #c8a800",
            color: "#333", fontSize: 10, fontWeight: 700,
            padding: "3px 10px", borderRadius: 2, zIndex: 2,
          }}>
            Ad Valorem Tax
          </div>

          <svg width="100%" viewBox="0 0 290 245" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="axR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#222" />
              </marker>
              <marker id="tdR" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
                <path d="M0,0 L3,6 L6,0" fill="none" stroke="#333" strokeWidth="1.3" />
              </marker>
              <marker id="tuR" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
                <path d="M0,6 L3,0 L6,6" fill="none" stroke="#333" strokeWidth="1.3" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="42" y1="10" x2="42" y2="218" stroke="#222" strokeWidth="1.5" markerEnd="url(#axR)" />
            <line x1="40" y1="215" x2="278" y2="215" stroke="#222" strokeWidth="1.5" markerEnd="url(#axR)" />
            <text x="10" y="15" fill="#333" fontSize="10">Price</text>
            <text x="252" y="230" fill="#333" fontSize="10">Output</text>

            {/* Green tax trapezoid: P2(y=84) → P3(y=148) over Q2(x=104) · 64px tall */}
            <polygon points="42,84 104,84 104,148 42,148" fill="#a5d6a7" fillOpacity="0.6" />

            {/* Demand: (55,48)→(268,210) */}
            <line x1="55" y1="48" x2="268" y2="210" stroke="#1a56db" strokeWidth="2.3" />
            <text x="245" y="210" fill="#1a56db" fontSize="9" fontWeight="bold">Demand</text>

            {/* Supply Pre Tax: (55,188)→(228,48) */}
            <line x1="55" y1="188" x2="228" y2="48" stroke="#1a56db" strokeWidth="2.3" />
            <text x="218" y="44" fill="#1a56db" fontSize="8.5" fontWeight="bold">Supply</text>
            <text x="216" y="54" fill="#1a56db" fontSize="8.5" fontWeight="bold">Pre Tax</text>

            {/* Supply Ad Valorem: slope=-2.531, passes through (104,84)
                Start (55,208), End (129,21)
                Verify: 208-2.531*(104-55)=208-124=84 ✓ */}
            <line x1="55" y1="208" x2="129" y2="21" stroke="#1a56db" strokeWidth="2.3" />
            <text x="122" y="15" fill="#1a56db" fontSize="8.5" fontWeight="bold">Supply with ad</text>
            <text x="122" y="25" fill="#1a56db" fontSize="8.5" fontWeight="bold">valorem tax</text>

            {/* T bracket: at x=118, from y=87(P2) to y=145(P3), gap=58px */}
            <line x1="118" y1="87" x2="118" y2="145"
              stroke="#333" strokeWidth="1.4"
              markerEnd="url(#tdR)" markerStart="url(#tuR)" />
            <text x="122" y="120" fill="#333" fontSize="11" fontWeight="bold">T</text>

            {/* Orange dashed reference lines */}
            <line x1="42" y1="84"  x2="104" y2="84"  stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="42" y1="115" x2="146" y2="115" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="42" y1="148" x2="104" y2="148" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="104" y1="84"  x2="104" y2="215" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />
            <line x1="146" y1="115" x2="146" y2="215" stroke="#e8883a" strokeWidth="1.4" strokeDasharray="5,4" />

            {/* Dots exactly on curve intersections */}
            <circle cx="104" cy="84"  r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />
            <circle cx="146" cy="115" r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />
            <circle cx="104" cy="148" r="5.5" fill="#1a56db" stroke="#fff" strokeWidth="1.8" />

            {/* Price labels */}
            <text x="24" y="88"  fill="#333" fontSize="10" fontWeight="bold">P2</text>
            <text x="24" y="119" fill="#333" fontSize="10" fontWeight="bold">P1</text>
            <text x="24" y="152" fill="#333" fontSize="10" fontWeight="bold">P3</text>

            {/* Quantity labels */}
            <text x="97"  y="228" fill="#333" fontSize="10" fontWeight="bold">Q2</text>
            <text x="139" y="228" fill="#333" fontSize="10" fontWeight="bold">Q1</text>
          </svg>
        </div>

      </div>

      {/* Purple Footer */}
      <div style={{
        background: "#6b2d8b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 14px",
      }}>
        <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>🌸 A-LEVEL ECONOMICS</span>
        <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>TUTOR2U.NET/ECONOMICS</span>
      </div>

    </div>
  );
}
