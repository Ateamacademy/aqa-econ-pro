export default function MonopsonyEmployerCurve() {
  /**
   * MATHEMATICAL SETUP · viewBox 0 0 500 380
   * Axes: Y at x=65, X at y=320
   *
   * COMMON START POINT for both MCL and ACL: (65, 279)
   * Derived so ACL passes through all three key points:
   *
   * ACL slope = (190-279)/(285-65) = -89/220 = -0.405/px
   *   (65,279) → (218,217) → (285,190) → (430,131)
   *   Verify: 279-0.405*153=217 ✓  279-0.405*220=190 ✓
   *
   * MCL slope = (150-279)/(218-65) = -129/153 = -0.843/px
   *   (65,279) → (218,150) → (260,115)
   *   Verify: 279-0.843*153=150 ✓
   *
   * MRPL slope = (190-150)/(285-218) = 40/67 = +0.597/px
   *   (65,57) → (218,150) → (285,190) → (405,262)
   *   Verify: 150+0.597*67=190 ✓
   *
   * Dots:
   *   MCL∩MRPL  = (218,150)  → W2/E2
   *   ACL∩MRPL  = (285,190)  → W1/E1
   *   ACL at E2 = (218,217)  → W3/E2
   *
   * Shading:
   *   Blue  "Total wages":  (65,279)→(218,217)→(218,320)→(65,320)
   *   Yellow "Lost wages":  (65,150)→(218,150)→(218,217)→(65,217)
   */
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #cdd8e8",
      width: "100%",
    }}>
      <svg width="100%" viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="mpY" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#333"/>
          </marker>
          <marker id="mpX" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#333"/>
          </marker>
          <marker id="arrOrg" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="#e07b00"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="500" height="380" fill="#fff"/>

        {/* Blue "Total wages" trapezoid
            Follows ACL from COMMON START (65,279) → (218,217), then down to x-axis */}
        <polygon
          points="65,279 218,217 218,320 65,320"
          fill="#c6d8f0" fillOpacity="0.70"
        />

        {/* Yellow "Lost wages" rectangle: W3→W2, y-axis→E2 */}
        <polygon
          points="65,150 218,150 218,217 65,217"
          fill="#fff5a0" fillOpacity="0.90"
        />

        {/* ── Axes ── */}
        <line x1="65" y1="28" x2="65" y2="324"
          stroke="#333" strokeWidth="2" markerEnd="url(#mpY)"/>
        <line x1="63" y1="320" x2="460" y2="320"
          stroke="#333" strokeWidth="2" markerEnd="url(#mpX)"/>

        {/* Axis labels */}
        <text x="20" y="90" fill="#333" fontSize="10.5" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">Wage</text>
        <text x="20" y="103" fill="#333" fontSize="10.5" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">Rate</text>
        <text x="435" y="338" fill="#333" fontSize="10.5" fontFamily="Arial"
          fontWeight="bold">Employment</text>

        {/* ── CURVES ── */}

        {/* Labour Demand = MRPL: downward (65,57)→(405,262) */}
        <line x1="65" y1="57" x2="405" y2="262"
          stroke="#1a56db" strokeWidth="2.5"/>

        {/* MCL: steep upward · SAME start (65,279) → (260,115) */}
        <line x1="65" y1="279" x2="260" y2="115"
          stroke="#1a56db" strokeWidth="2.5"/>

        {/* ACL: moderate upward · SAME start (65,279) → (430,131) */}
        <line x1="65" y1="279" x2="430" y2="131"
          stroke="#1a56db" strokeWidth="2.5"/>

        {/* ── Red/orange dashed reference lines ── */}
        <line x1="65" y1="150" x2="218" y2="150"
          stroke="#cc3300" strokeWidth="1.9" strokeDasharray="7,5"/>
        <line x1="65" y1="190" x2="285" y2="190"
          stroke="#cc3300" strokeWidth="1.9" strokeDasharray="7,5"/>
        <line x1="65" y1="217" x2="218" y2="217"
          stroke="#cc3300" strokeWidth="1.9" strokeDasharray="7,5"/>
        <line x1="218" y1="150" x2="218" y2="320"
          stroke="#cc3300" strokeWidth="1.9" strokeDasharray="7,5"/>
        <line x1="285" y1="190" x2="285" y2="320"
          stroke="#cc3300" strokeWidth="1.9" strokeDasharray="7,5"/>

        {/* ── Equilibrium dots exactly on curve intersections ── */}
        <circle cx="218" cy="150" r="6.5" fill="#7ab8e8" stroke="#1a56db" strokeWidth="1.8"/>
        <circle cx="285" cy="190" r="6.5" fill="#7ab8e8" stroke="#1a56db" strokeWidth="1.8"/>
        <circle cx="218" cy="217" r="6.5" fill="#7ab8e8" stroke="#1a56db" strokeWidth="1.8"/>

        {/* ── Curve labels ── */}
        <text x="265" y="109" fill="#1a56db" fontSize="11.5" fontFamily="Arial" fontWeight="bold">Marginal cost of</text>
        <text x="265" y="123" fill="#1a56db" fontSize="11.5" fontFamily="Arial" fontWeight="bold">labour (MCL)</text>

        <text x="432" y="137" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">Labour Supply (=</text>
        <text x="432" y="150" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">ACL)</text>

        <text x="338" y="260" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">Labour Demand =</text>
        <text x="338" y="273" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">MRPL</text>

        {/* ── Wage axis labels ── */}
        <text x="50" y="154" fill="#333" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="end">W2</text>
        <text x="50" y="194" fill="#333" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="end">W1</text>
        <text x="50" y="221" fill="#333" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="end">W3</text>

        {/* ── Employment axis labels ── */}
        <text x="218" y="337" fill="#333" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">E2</text>
        <text x="285" y="337" fill="#333" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">E1</text>

        {/* ── "Total wages" label ── */}
        <text x="118" y="278" fill="#1a56db" fontSize="12" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">Total</text>
        <text x="118" y="293" fill="#1a56db" fontSize="12" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">wages</text>

        {/* ── "Lost wages" annotation box + arrow ── */}
        <rect x="78" y="112" width="136" height="40" rx="4"
          fill="#fff5a0" stroke="#e07b00" strokeWidth="1.4"/>
        <text x="146" y="129" fill="#b35900" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">Lost wages from</text>
        <text x="146" y="143" fill="#b35900" fontSize="11" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">under-payment</text>
        <line x1="175" y1="152" x2="185" y2="182"
          stroke="#e07b00" strokeWidth="2.6" markerEnd="url(#arrOrg)"/>
      </svg>
    </div>
  );
}
