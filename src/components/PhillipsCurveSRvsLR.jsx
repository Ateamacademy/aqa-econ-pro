export default function PhillipsCurveSRvsLR() {
  /**
   * Exact textbook replica · Phillips Curve SR vs LR
   *
   * COORDINATE SYSTEM  viewBox="0 0 580 430"
   *   x_svg = 90 + U  * 26   (y-axis at U=0, x=90)
   *   y_svg = 370 − π * 30   (x-axis at π=0, y=370)
   *
   * CURVES
   *   1st SRPC  π = 22.5/U − 2.5   → A=(5,2)  B=(3,5)
   *   2nd SRPC  π = 22.5/U + 0.5   → C=(5,5)
   *
   * At U=9:  1st→π≈0 (near x-axis),  2nd→π≈3 (upper)
   * Labels therefore: "Second" above "First" on right side ✓
   */

  const toX = (U)  => 90 + U * 26;
  const toY = (pi) => 370 - pi * 30;

  /* ── Catmull-Rom → cubic Bézier ── */
  function smoothPath(pts) {
    if (pts.length < 2) return "";
    const ext = (a, b) => [2 * a[0] - b[0], 2 * a[1] - b[1]];
    const all  = [ext(pts[0], pts[1]), ...pts, ext(pts[pts.length - 1], pts[pts.length - 2])];
    const d    = [`M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0,y0]=all[i],[x1,y1]=all[i+1],[x2,y2]=all[i+2],[x3,y3]=all[i+3];
      d.push(
        `C ${(x1+(x2-x0)/6).toFixed(2)},${(y1+(y2-y0)/6).toFixed(2)}` +
        ` ${(x2-(x3-x1)/6).toFixed(2)},${(y2-(y3-y1)/6).toFixed(2)}` +
        ` ${x2.toFixed(2)},${y2.toFixed(2)}`
      );
    }
    return d.join(" ");
  }

  /* ── Generate SRPC points (π = 22.5/U + b) ── */
  function makeSRPC(b, steps = 220) {
    const pts = [];
    const uStart = 22.5 / (10.5 - b);   // where curve enters top edge (π≈10.5)
    const uEnd   = 12.8;                  // slightly past right edge
    for (let i = 0; i <= steps; i++) {
      const U  = uStart + (uEnd - uStart) * i / steps;
      const pi = 22.5 / U + b;
      const x  = toX(U);
      const y  = toY(pi);
      // Keep points within visible chart (generous clip)
      if (x >= 35 && x <= 425 && y >= 50 && y <= 390) {
        pts.push([x, y]);
      }
    }
    return pts;
  }

  const srpc1 = makeSRPC(-2.5); // 1st (lower)
  const srpc2 = makeSRPC( 0.5); // 2nd (upper)

  const LRPC_X = toX(5);          // 220
  const pA = [toX(5), toY(2)];    // [220, 310]
  const pB = [toX(3), toY(5)];    // [168, 220]
  const pC = [toX(5), toY(5)];    // [220, 220]

  const uTicks  = [-2, 0, 2, 4, 6, 8, 10, 12];
  const piTicks = [0, 2, 4, 6, 8, 10];

  return (
    <div style={{
      background: "#fff",
      fontFamily: "'Times New Roman', Georgia, serif",
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
      padding: "6px",
      maxWidth: "620px",
      margin: "0 auto",
    }}>
      <svg
        width="100%"
        viewBox="0 0 580 430"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          {/* Arrowhead for axes */}
          <marker id="axArr" markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#222"/>
          </marker>
          {/* Small arrowhead for leader/shift arrows */}
          <marker id="smArr" markerWidth="7" markerHeight="5"
            refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#222"/>
          </marker>
        </defs>

        {/* ══ LIGHT GRID ══ */}
        {uTicks.filter(u => u >= 0).map(U => (
          <line key={`gU${U}`}
            x1={toX(U)} y1={68} x2={toX(U)} y2={370}
            stroke="#f0f0f0" strokeWidth="0.8"/>
        ))}
        {piTicks.map(pi => (
          <line key={`gP${pi}`}
            x1={38} y1={toY(pi)} x2={415} y2={toY(pi)}
            stroke="#f0f0f0" strokeWidth="0.8"/>
        ))}

        {/* ══ X-AXIS ══ */}
        <line x1={38} y1={370} x2={424} y2={370}
          stroke="#222" strokeWidth="1.5" markerEnd="url(#axArr)"/>
        {uTicks.map(U => (
          <g key={`xt${U}`}>
            <line x1={toX(U)} y1={370} x2={toX(U)} y2={377}
              stroke="#222" strokeWidth="1.2"/>
            <text x={toX(U)} y={392}
              textAnchor="middle" fontSize="11.5" fill="#222"
              fontFamily="'Times New Roman', serif">
              {U}
            </text>
          </g>
        ))}
        <text x={232} y={413}
          textAnchor="middle" fontSize="12.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          Unemployment rate
        </text>

        {/* ══ Y-AXIS ══ */}
        <line x1={90} y1={395} x2={90} y2={54}
          stroke="#222" strokeWidth="1.5" markerEnd="url(#axArr)"/>
        {piTicks.map(pi => (
          <g key={`yt${pi}`}>
            <line x1={83} y1={toY(pi)} x2={90} y2={toY(pi)}
              stroke="#222" strokeWidth="1.2"/>
            <text x={76} y={toY(pi) + 4}
              textAnchor="end" fontSize="11.5" fill="#222"
              fontFamily="'Times New Roman', serif">
              {pi}
            </text>
          </g>
        ))}
        {/* Y-axis title (rotated) */}
        <text
          x={14} y={220}
          textAnchor="middle" fontSize="12.5" fill="#222"
          fontFamily="'Times New Roman', serif"
          transform="rotate(-90 14 220)">
          Inflation rate
        </text>

        {/* ══ UPWARD ARROW (policy-shift indicator, left of y-axis) ══ */}
        <line x1={65} y1={262} x2={65} y2={188}
          stroke="#222" strokeWidth="2.2" markerEnd="url(#axArr)"/>

        {/* ══ LRPC (solid vertical at U=5) ══ */}
        <line x1={LRPC_X} y1={58} x2={LRPC_X} y2={385}
          stroke="#222" strokeWidth="1.6"/>

        {/* ══ LRPC TITLE + LEADER ARROW ══ */}
        <text x={316} y={22}
          textAnchor="middle" fontSize="12.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          Long-run Phillips curve
        </text>
        {/* Elbow leader: text → LRPC top */}
        <polyline
          points={`${280},26 ${LRPC_X + 4},26 ${LRPC_X + 4},58`}
          fill="none" stroke="#222" strokeWidth="0.9"
          markerEnd="url(#smArr)"/>

        {/* ══ DOTTED REFERENCE LINES ══ */}
        {/* π=5 horizontal  y-axis → C */}
        <line x1={90} y1={toY(5)} x2={pC[0]} y2={toY(5)}
          stroke="#555" strokeWidth="1.1" strokeDasharray="4,3"/>
        {/* π=2 horizontal  y-axis → A */}
        <line x1={90} y1={toY(2)} x2={pA[0]} y2={toY(2)}
          stroke="#555" strokeWidth="1.1" strokeDasharray="4,3"/>
        {/* U=3 vertical    x-axis → B */}
        <line x1={toX(3)} y1={370} x2={toX(3)} y2={pB[1]}
          stroke="#555" strokeWidth="1.1" strokeDasharray="4,3"/>

        {/* ══ SRPC CURVES ══ */}
        {/* 1st SRPC · lower */}
        <path d={smoothPath(srpc1)}
          fill="none" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>
        {/* 2nd SRPC · upper */}
        <path d={smoothPath(srpc2)}
          fill="none" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/>

        {/* ══ SHIFT ARROWS ≫ between curves (at π≈7.5, between U≈2.2 & 3.2) ══ */}
        {/* Two staggered right-pointing arrows */}
        <line x1={148} y1={130} x2={163} y2={130}
          stroke="#222" strokeWidth="1.4" markerEnd="url(#smArr)"/>
        <line x1={155} y1={138} x2={170} y2={138}
          stroke="#222" strokeWidth="1.4" markerEnd="url(#smArr)"/>

        {/* ══ POINTS A, B, C ══ */}
        <circle cx={pA[0]} cy={pA[1]} r="4.5"
          fill="#fff" stroke="#222" strokeWidth="1.6"/>
        <circle cx={pB[0]} cy={pB[1]} r="4.5"
          fill="#fff" stroke="#222" strokeWidth="1.6"/>
        <circle cx={pC[0]} cy={pC[1]} r="4.5"
          fill="#fff" stroke="#222" strokeWidth="1.6"/>

        {/* ══ POINT LABELS ══ */}
        <text x={pB[0] - 15} y={pB[1] + 5}
          fontSize="13" fill="#222" fontWeight="bold"
          fontFamily="'Times New Roman', serif">B</text>
        <text x={pC[0] + 8}  y={pC[1] + 5}
          fontSize="13" fill="#222" fontWeight="bold"
          fontFamily="'Times New Roman', serif">C</text>
        <text x={pA[0] + 8}  y={pA[1] + 5}
          fontSize="13" fill="#222" fontWeight="bold"
          fontFamily="'Times New Roman', serif">A</text>

        {/* ══ CURVE LABELS (right side) ══ */}
        {/* 2nd SRPC · sits ~π=2.4 at U=12 → y≈298 */}
        <text x={424} y={294}
          fontSize="11.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          Second short-term
        </text>
        <text x={424} y={309}
          fontSize="11.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          Phillips curve
        </text>
        {/* 1st SRPC · sits ~π≈0 at U=12 → y≈370 */}
        <text x={424} y={350}
          fontSize="11.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          First short-term
        </text>
        <text x={424} y={365}
          fontSize="11.5" fill="#222"
          fontFamily="'Times New Roman', serif">
          Phillips curve
        </text>
      </svg>
    </div>
  );
}
