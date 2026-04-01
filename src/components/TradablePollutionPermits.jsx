export default function TradablePollutionPermits() {
  /**
   * MATHEMATICAL SETUP — viewBox 0 0 290 245 per panel
   * Axes: Y at x=48, X at y=210
   *
   * ── LEFT PANEL: CORRECTIVE TAX ──
   * Demand for pollution (MPC): downward slope
   *   (58,42) → (268,188)   slope = 146/210 = +0.695
   * Corrective Tax: horizontal line at y=130
   *   x=48 → x=268
   * Intersection Tax∩Demand:
   *   Demand: y=42+0.695*(x-58)  → 130=42+0.695*(x-58)
   *   0.695*(x-58)=88 → x-58=126.6 → x=184.6≈185
   *   Point T=(185,130)
   *
   * ── RIGHT PANEL: POLLUTION PERMITS ──
   * Demand for pollution rights: downward slope (same as left)
   *   (58,42) → (268,188)   slope same
   * Supply of Pollution Permits: vertical line at x=185
   * Intersection: vertical supply x=185 ∩ Demand
   *   y=42+0.695*(185-58)=42+88.3=130.3≈130
   *   Point P=(185,130)
   */

  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      width: "100%",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ══════════════════════════════
            LEFT PANEL — CORRECTIVE TAX
        ══════════════════════════════ */}
        <div style={{
          position: "relative",
          padding: "8px 6px 4px 6px",
          borderRight: "1px solid #e5e7eb",
          background: "#fff",
        }}>
          <svg width="100%" viewBox="0 0 290 248" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="axLY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#444" />
              </marker>
              <marker id="axLX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#444" />
              </marker>
            </defs>

            {/* Title */}
            <text x="145" y="14" fill="#222" fontSize="11" fontFamily="Arial"
              fontWeight="bold" textAnchor="middle">Corrective Tax</text>

            {/* Axes */}
            <line x1="48" y1="22" x2="48" y2="216"
              stroke="#444" strokeWidth="1.5" markerEnd="url(#axLY)" />
            <line x1="46" y1="212" x2="278" y2="212"
              stroke="#444" strokeWidth="1.5" markerEnd="url(#axLX)" />

            {/* Axis labels */}
            <text transform="translate(13,170) rotate(-90)"
              fill="#444" fontSize="9" fontFamily="Arial" textAnchor="middle">Price of Pollution</text>
            <text x="212" y="230" fill="#444" fontSize="9" fontFamily="Arial" textAnchor="middle">
              Quantity of Pollution
            </text>

            {/* Demand for pollution (MPC): (58,42)→(268,188) */}
            <line x1="58" y1="42" x2="268" y2="188"
              stroke="#1a56db" strokeWidth="2.0" />
            <text x="165" y="200" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold" textAnchor="middle">Demand for</text>
            <text x="165" y="210" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold" textAnchor="middle">pollution rights (MPC)</text>

            {/* Corrective Tax: horizontal line at y=130, x=48→x=268 */}
            <line x1="48" y1="130" x2="268" y2="130"
              stroke="#2e9e5b" strokeWidth="1.8" />
            <text x="100" y="122" fill="#2e9e5b" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">Corrective Tax</text>

            {/* Intersection point T=(185,130) */}
            {/* Dashed vertical from T down to x-axis */}
            <line x1="185" y1="130" x2="185" y2="212"
              stroke="#888" strokeWidth="1.1" strokeDasharray="4,3" />
            {/* Dashed horizontal from P on y-axis to T */}
            <line x1="48" y1="130" x2="185" y2="130"
              stroke="#888" strokeWidth="1.1" strokeDasharray="4,3" />

            {/* Dot at intersection T */}
            <circle cx="185" cy="130" r="4.5" fill="#e05a1e" stroke="#fff" strokeWidth="1.5" />

            {/* P label on y-axis */}
            <text x="34" y="134" fill="#333" fontSize="10" fontFamily="Arial" fontWeight="bold">P</text>
            {/* Q label on x-axis */}
            <text x="180" y="226" fill="#333" fontSize="10" fontFamily="Arial" fontWeight="bold">Q</text>
          </svg>
        </div>

        {/* ══════════════════════════════
            RIGHT PANEL — POLLUTION PERMITS
        ══════════════════════════════ */}
        <div style={{
          position: "relative",
          padding: "8px 6px 4px 6px",
          background: "#fff",
        }}>
          <svg width="100%" viewBox="0 0 290 248" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="axRY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#444" />
              </marker>
              <marker id="axRX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#444" />
              </marker>
            </defs>

            {/* Title */}
            <text x="145" y="14" fill="#222" fontSize="11" fontFamily="Arial"
              fontWeight="bold" textAnchor="middle">Pollution Permits</text>

            {/* Axes */}
            <line x1="48" y1="22" x2="48" y2="216"
              stroke="#444" strokeWidth="1.5" markerEnd="url(#axRY)" />
            <line x1="46" y1="212" x2="278" y2="212"
              stroke="#444" strokeWidth="1.5" markerEnd="url(#axRX)" />

            {/* Axis labels */}
            <text transform="translate(13,170) rotate(-90)"
              fill="#444" fontSize="9" fontFamily="Arial" textAnchor="middle">Price of Pollution</text>
            <text x="212" y="230" fill="#444" fontSize="9" fontFamily="Arial" textAnchor="middle">
              Quantity of Pollution
            </text>

            {/* Supply of Pollution Permits: vertical line at x=185, y=42→y=212 */}
            <line x1="185" y1="38" x2="185" y2="212"
              stroke="#1a56db" strokeWidth="2.0" />
            <text x="188" y="52" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">Supply of</text>
            <text x="188" y="62" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">Pollution</text>
            <text x="188" y="72" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">Permits</text>

            {/* Demand for pollution rights: (58,42)→(268,188) */}
            <line x1="58" y1="42" x2="268" y2="188"
              stroke="#1a56db" strokeWidth="2.0" />
            <text x="195" y="188" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">Demand for</text>
            <text x="195" y="198" fill="#1a56db" fontSize="8.5" fontFamily="Arial"
              fontWeight="bold">pollution rights</text>

            {/* Intersection point P=(185,130) */}
            {/* Dashed vertical down to x-axis */}
            <line x1="185" y1="130" x2="185" y2="212"
              stroke="#888" strokeWidth="1.1" strokeDasharray="4,3" />
            {/* Dashed horizontal from y-axis to P */}
            <line x1="48" y1="130" x2="185" y2="130"
              stroke="#888" strokeWidth="1.1" strokeDasharray="4,3" />

            {/* Dot at intersection */}
            <circle cx="185" cy="130" r="4.5" fill="#e05a1e" stroke="#fff" strokeWidth="1.5" />

            {/* P label on y-axis */}
            <text x="34" y="134" fill="#333" fontSize="10" fontFamily="Arial" fontWeight="bold">P</text>
            {/* Q label on x-axis */}
            <text x="180" y="226" fill="#333" fontSize="10" fontFamily="Arial" fontWeight="bold">Q</text>
          </svg>
        </div>

      </div>
    </div>
  );
}
