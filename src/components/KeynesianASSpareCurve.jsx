export default function KeynesianASSpareCurve() {
  /**
   * LEFT PANEL — Spare Capacity
   * AS bezier path anchored EXACTLY at (112,210) and (155,210) so the
   * curve is truly flat at P level between Y and Y₁, then steep to Y_FE.
   *   M 58,248 C 78,244 95,228 112,210   ← rises to Y at P level
   *             C 135,210 148,210 155,210 ← stays flat through Y₁
   *             C 178,202 212,162 265,52  ← shoots nearly vertical to Y_FE
   *
   * AD  slope=1.55, through (112,210): (58,126)→(139,252)
   * AD₁ slope=1.55, through (155,210): (58,60)→(182,252)
   *
   * RIGHT PANEL — Full Capacity
   * LRAS vertical red at x=158
   * AD  slope=0.4, through (158,225): (58,185)→(290,278)  → lower dot P
   * AD₁ slope=0.4, through (158,160): (58,120)→(290,213)  → upper dot P₁
   * Bold green ↑ arrow from P(225) to P₁(160) on y-axis
   */
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #bbb",
      width: "100%",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ══════════════ LEFT — SPARE CAPACITY ══════════════ */}
        <div style={{ display:"flex", flexDirection:"column", borderRight:"2px solid #ccc" }}>
          <div style={{ background:"#485565", color:"#fff", textAlign:"center",
            padding:"9px 0", fontSize:"14px", fontWeight:"600" }}>
            Spare Capacity
          </div>

          <div style={{ background:"#fff", flex:1 }}>
            <svg width="100%" viewBox="0 0 320 290" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="aLY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#111"/>
                </marker>
                <marker id="aLX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#111"/>
                </marker>
                <marker id="blArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0,0 8,4 0,8" fill="#1a56db"/>
                </marker>
                <marker id="grArrR" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0,0 10,5 0,10" fill="#2a9d3f"/>
                </marker>
              </defs>

              {/* Axes */}
              <line x1="58" y1="22" x2="58" y2="258" stroke="#111" strokeWidth="2" markerEnd="url(#aLY)"/>
              <line x1="56" y1="252" x2="305" y2="252" stroke="#111" strokeWidth="2" markerEnd="url(#aLX)"/>
              <text transform="translate(15,168) rotate(-90)" fill="#222" fontSize="10.5"
                fontFamily="Arial" fontWeight="bold" textAnchor="middle">Price</text>
              <text transform="translate(27,180) rotate(-90)" fill="#222" fontSize="10.5"
                fontFamily="Arial" fontWeight="bold" textAnchor="middle">Level</text>
              <text x="244" y="272" fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold">Real Output</text>

              {/* Y_FE dashed vertical */}
              <line x1="265" y1="52" x2="265" y2="252"
                stroke="#222" strokeWidth="1.5" strokeDasharray="6,4"/>

              {/* ── Bold dashed reference lines ── */}
              {/* P horizontal: y-axis → Y₁ dot (x=155) */}
              <line x1="58" y1="210" x2="155" y2="210"
                stroke="#333" strokeWidth="1.8" strokeDasharray="5,4"/>
              {/* Y vertical: dot (112,210) → x-axis */}
              <line x1="112" y1="210" x2="112" y2="252"
                stroke="#333" strokeWidth="1.8" strokeDasharray="5,4"/>
              {/* Y₁ vertical: dot (155,210) → x-axis */}
              <line x1="155" y1="210" x2="155" y2="252"
                stroke="#333" strokeWidth="1.8" strokeDasharray="5,4"/>

              {/* ── AS curve: anchored at (112,210) AND (155,210) — truly flat at P ── */}
              {/*
                Segment 1: (58,248)→(112,210)  — gentle rise from bottom-left to Y
                  control pts (78,244)(95,228) guide it upward
                Segment 2: (112,210)→(155,210) — FLAT at P through Y₁
                  control pts (130,210)(148,210) keep it horizontal
                Segment 3: (155,210)→(265,52)  — steep rise to Y_FE
                  control pts (178,202)(215,160) create the steep curve
              */}
              <path
                d="M 58,248 C 78,244 95,228 112,210
                           C 130,210 148,210 155,210
                           C 178,202 215,160 265,52"
                fill="none" stroke="#e03030" strokeWidth="2.8" strokeLinecap="round"/>

              {/* AS label */}
              <text x="268" y="50" fill="#222" fontSize="12" fontFamily="Arial" fontWeight="bold">AS</text>

              {/* AD: (58,126)→(139,252) — passes through (112,210) ✓ */}
              {/* slope=(252-126)/(139-58)=126/81=1.556; at x=112: 126+1.556*54=126+84=210 ✓ */}
              <line x1="58" y1="126" x2="139" y2="252" stroke="#1a56db" strokeWidth="2.4"/>

              {/* AD₁: (58,60)→(182,252) — passes through (155,210) ✓ */}
              {/* slope=(252-60)/(182-58)=192/124=1.548; at x=155: 60+1.548*97=60+150.2=210.2≈210 ✓ */}
              <line x1="58" y1="60" x2="182" y2="252" stroke="#1a56db" strokeWidth="2.4"/>

              {/* AD labels + blue rightward shift arrow */}
              <text x="62" y="120" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">AD</text>
              <line x1="84" y1="116" x2="104" y2="116"
                stroke="#1a56db" strokeWidth="2.2" markerEnd="url(#blArr)"/>
              <text x="109" y="68" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">
                AD<tspan fontSize="8.5" dy="2">1</tspan>
              </text>

              {/* Red dots — exactly at AS flat points (112,210) and (155,210) */}
              <circle cx="112" cy="210" r="6.5" fill="#e03030" stroke="#fff" strokeWidth="2"/>
              <circle cx="155" cy="210" r="6.5" fill="#e03030" stroke="#fff" strokeWidth="2"/>

              {/* Axis labels */}
              <text x="44" y="214" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="end">P</text>
              <text x="112" y="268" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="middle">Y</text>
              <text x="155" y="268" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="middle">Y<tspan fontSize="9" dy="2">1</tspan></text>
              <text x="265" y="268" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="middle">Y<tspan fontSize="9" dy="2">FE</tspan></text>

              {/* Green → arrow between Y and Y₁ */}
              <line x1="120" y1="280" x2="147" y2="280"
                stroke="#2a9d3f" strokeWidth="3.2" markerEnd="url(#grArrR)"/>
            </svg>
          </div>

          <div style={{ background:"#1a56db", color:"#fff", textAlign:"center",
            padding:"8px 0", fontSize:"15px", fontWeight:"700" }}>Growth</div>
        </div>

        {/* ══════════════ RIGHT — FULL CAPACITY ══════════════ */}
        <div style={{ display:"flex", flexDirection:"column" }}>
          <div style={{ background:"#485565", color:"#fff", textAlign:"center",
            padding:"9px 0", fontSize:"14px", fontWeight:"600" }}>
            Full Capacity
          </div>

          <div style={{ background:"#fff", flex:1 }}>
            <svg width="100%" viewBox="0 0 320 290" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="aRY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#111"/>
                </marker>
                <marker id="aRX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <polygon points="0,0 6,3 0,6" fill="#111"/>
                </marker>
                {/* Green upward arrow: triangle tip pointing up */}
                <marker id="grArrU" markerWidth="14" markerHeight="14" refX="7" refY="0" orient="auto">
                  <polygon points="7,0 0,12 14,12" fill="#2a9d3f"/>
                </marker>
                {/* Dark diagonal arrows */}
                <marker id="dkArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0,0 8,4 0,8" fill="#333"/>
                </marker>
              </defs>

              {/* Axes */}
              <line x1="58" y1="22" x2="58" y2="258" stroke="#111" strokeWidth="2" markerEnd="url(#aRY)"/>
              <line x1="56" y1="252" x2="305" y2="252" stroke="#111" strokeWidth="2" markerEnd="url(#aRX)"/>
              <text transform="translate(15,168) rotate(-90)" fill="#222" fontSize="10.5"
                fontFamily="Arial" fontWeight="bold" textAnchor="middle">Price</text>
              <text transform="translate(27,180) rotate(-90)" fill="#222" fontSize="10.5"
                fontFamily="Arial" fontWeight="bold" textAnchor="middle">Level</text>
              <text x="234" y="272" fill="#222" fontSize="9.5" fontFamily="Arial" fontWeight="bold">Real Output</text>

              {/* ── LRAS: straight vertical red line at x=158 ── */}
              <line x1="158" y1="28" x2="158" y2="252"
                stroke="#e03030" strokeWidth="2.8"/>
              <text x="163" y="38" fill="#222" fontSize="12" fontFamily="Arial" fontWeight="bold">LRAS</text>

              {/* ── AD curves ── */}
              {/* AD: slope=0.4, through (158,225): (58,185)→(290,278) */}
              {/* Verify: 185+0.4*(158-58)=185+40=225 ✓ */}
              <line x1="58" y1="185" x2="290" y2="278" stroke="#1a56db" strokeWidth="2.4"/>

              {/* AD₁: slope=0.4, through (158,160): (58,120)→(290,213) */}
              {/* Verify: 120+0.4*(158-58)=120+40=160 ✓ */}
              <line x1="58" y1="120" x2="290" y2="213" stroke="#1a56db" strokeWidth="2.4"/>

              {/* Labels: AD₁ upper, AD lower on right */}
              <text x="265" y="209" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">
                AD<tspan fontSize="8.5" dy="2">1</tspan>
              </text>
              <text x="265" y="268" fill="#1a56db" fontSize="11" fontFamily="Arial" fontWeight="bold">AD</text>

              {/* Dark diagonal shift arrows on each curve */}
              <line x1="225" y1="188" x2="210" y2="170"
                stroke="#333" strokeWidth="2.4" markerEnd="url(#dkArr)"/>
              <line x1="225" y1="244" x2="210" y2="226"
                stroke="#333" strokeWidth="2.4" markerEnd="url(#dkArr)"/>

              {/* ── Bold dashed reference lines ── */}
              {/* P₁ horizontal y=160: y-axis → upper dot (158,160) */}
              <line x1="58" y1="160" x2="158" y2="160"
                stroke="#333" strokeWidth="1.8" strokeDasharray="5,4"/>
              {/* P horizontal y=225: y-axis → lower dot (158,225) */}
              <line x1="58" y1="225" x2="158" y2="225"
                stroke="#333" strokeWidth="1.8" strokeDasharray="5,4"/>

              {/* Red dots — exactly at LRAS∩AD intersections */}
              {/* Upper dot P₁: AD₁ meets LRAS at (158,160) */}
              <circle cx="158" cy="160" r="6.5" fill="#e03030" stroke="#fff" strokeWidth="2"/>
              {/* Lower dot P: AD meets LRAS at (158,225) */}
              <circle cx="158" cy="225" r="6.5" fill="#e03030" stroke="#fff" strokeWidth="2"/>

              {/* ── BOLD GREEN ↑ ARROW on y-axis: P(225) → P₁(160) ── */}
              <line x1="40" y1="225" x2="40" y2="170"
                stroke="#2a9d3f" strokeWidth="7" markerEnd="url(#grArrU)"/>

              {/* Axis labels */}
              <text x="44" y="164" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="end">P<tspan fontSize="9" dy="-2">1</tspan></text>
              <text x="44" y="229" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="end">P</text>
              <text x="158" y="268" fill="#222" fontSize="12" fontFamily="Arial"
                fontWeight="bold" textAnchor="middle">Y<tspan fontSize="9" dy="2">FE</tspan></text>
            </svg>
          </div>

          <div style={{ background:"#1a56db", color:"#fff", textAlign:"center",
            padding:"8px 0", fontSize:"15px", fontWeight:"700" }}>Inflation</div>
        </div>

      </div>
    </div>
  );
}
