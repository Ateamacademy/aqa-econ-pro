/**
 * Allocative Inefficiency from a Negative Production Externality
 * IB HL/SL · Paper 3 Moderate Q1(a)(iv)
 *
 * MC/MB framing:
 *  - S = MC slopes upward
 *  - D = MU slopes downward
 *  - Q1 = 70 (allocatively efficient: MU = MC at P = 11)
 *  - Q2 = 40 (allocatively inefficient: MU = 15 > MC = 6)
 *  - Vertical red double-arrow at Q2 highlights the MU > MC welfare wedge.
 *
 * Coordinate plan (viewBox 0 0 760 600):
 *  Origin (140, 500). Plot area 140..700 horizontally, 500..90 vertically.
 *  Q axis: Q=0 at x=140, Q=70 at x=420, Q=100 at x=540 (4 units per Q).
 *  P axis: P=0 at y=500, P=11 at y=300, P=15 at y=200, P=6 at y=400 (25 px per £).
 *  S = MC: slope chosen so MC(40)=6 and MC(70)=11 → through (220,400) and (420,300).
 *  D = MU: slope chosen so MU(40)=15 and MU(70)=11 → through (220,200) and (420,300).
 */
export default function EconAllocativeInefficiencyMCMB() {
  return (
    <div
      style={{
        background: '#0d1b2e',
        borderRadius: '10px',
        padding: '4px',
        maxWidth: '760px',
        margin: '0 auto',
        fontFamily: "'Segoe UI',Arial,sans-serif",
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div style={{ padding: '10px 14px 4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#818cf8' }}>
          ALLOCATIVE INEFFICIENCY · MC / MB DIAGRAM
        </div>
        <div style={{ fontSize: '12px', color: '#c8d6e8', marginTop: 2 }}>
          IB HL/SL · At Q₁ MU = MC (efficient). At Q₂ &lt; Q₁ MU &gt; MC, so society values an extra unit more than it costs to produce.
        </div>
      </div>
      <svg viewBox="0 0 760 600" width="100%" role="img" style={{ display: 'block', background: 'transparent' }}>
        <title>Allocative efficiency vs inefficiency on an MC/MB diagram</title>
        <desc>
          S = MC slopes upward and D = MU slopes downward. They cross at Q1 = 70, P = 11 where MU = MC
          (allocatively efficient). At Q2 = 40 the demand curve is at 15 and the supply curve is at 6, so MU
          (15) exceeds MC (6) and the allocation is inefficient.
        </desc>
        <defs>
          <pattern id="mcmbDotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" fill="#cbd5e1" opacity="0.15" />
          </pattern>
          <marker id="mcmbArrowEnd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#f87171" />
          </marker>
          <marker id="mcmbArrowStart" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#f87171" />
          </marker>
          <marker id="mcmbPointer" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#f87171" />
          </marker>
        </defs>

        <rect width="760" height="600" fill="url(#mcmbDotGrid)" />

        {/* Axes */}
        <line x1="140" y1="540" x2="140" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="140,85 135,95 145,95" fill="#cbd5e1" />
        <line x1="100" y1="500" x2="700" y2="500" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="705,500 695,495 695,505" fill="#cbd5e1" />

        {/* Axis titles */}
        <text x="118" y="78" fill="#e2e8f0" fontSize="14" fontWeight="600">Price</text>
        <text x="690" y="525" fill="#e2e8f0" fontSize="14" fontWeight="600">Q</text>

        {/* Supply S = MC (upward) · extend slightly beyond plotted points for arrowheads/labels */}
        <line x1="170" y1="437.5" x2="560" y2="275" stroke="#60a5fa" strokeWidth="2.6" />
        <text x="568" y="272" fill="#60a5fa" fontSize="14" fontWeight="700">S = MC</text>

        {/* Demand D = MU (downward) */}
        <line x1="170" y1="187.5" x2="560" y2="350" stroke="#f87171" strokeWidth="2.6" />
        <text x="568" y="355" fill="#f87171" fontSize="14" fontWeight="700">D = MU</text>

        {/* Equilibrium at Q1 = 70, P = 11 */}
        <line x1="140" y1="300" x2="420" y2="300" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="420" y1="300" x2="420" y2="500" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
        <circle cx="420" cy="300" r="4.5" fill="#fbbf24" stroke="#fde68a" strokeWidth="1.2" />

        {/* Q2 = 40 dashed verticals to MU (y=200) and MC (y=400) */}
        <line x1="220" y1="200" x2="220" y2="500" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
        {/* Horizontal dashed price guides at 15 and 6 */}
        <line x1="140" y1="200" x2="220" y2="200" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="140" y1="400" x2="220" y2="400" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />

        {/* Y-axis price labels */}
        <text x="115" y="205" textAnchor="end" fill="#e2e8f0" fontSize="13" fontWeight="600">15</text>
        <text x="115" y="305" textAnchor="end" fill="#e2e8f0" fontSize="13" fontWeight="600">11</text>
        <text x="115" y="405" textAnchor="end" fill="#e2e8f0" fontSize="13" fontWeight="600">6</text>

        {/* X-axis quantity labels */}
        <text x="220" y="520" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">40</text>
        <text x="420" y="520" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">70</text>

        {/* Vertical MU > MC double-headed red arrow at Q2 = 40, between y=200 (MU) and y=400 (MC) */}
        <line
          x1="220"
          y1="208"
          x2="220"
          y2="392"
          stroke="#f87171"
          strokeWidth="2"
          markerStart="url(#mcmbArrowStart)"
          markerEnd="url(#mcmbArrowEnd)"
        />
        {/* Endpoint dots at MU and MC where the arrow sits */}
        <circle cx="220" cy="200" r="3.5" fill="#f87171" />
        <circle cx="220" cy="400" r="3.5" fill="#f87171" />

        {/* Annotation: Q2 inefficient (top-left) */}
        <text x="260" y="135" fill="#e2e8f0" fontSize="13" fontWeight="700">Q₂, Allocatively</text>
        <text x="260" y="153" fill="#e2e8f0" fontSize="13" fontWeight="700">inefficient</text>
        <text x="260" y="173" fill="#fbbf24" fontSize="13" fontWeight="700">MU &gt; MC</text>

        {/* Annotation: Q1 efficient (right of equilibrium) with pointer arrow */}
        <line x1="540" y1="305" x2="432" y2="302" stroke="#f87171" strokeWidth="1.6" markerEnd="url(#mcmbPointer)" />
        <text x="548" y="295" fill="#e2e8f0" fontSize="13" fontWeight="700">Q₁, Allocatively efficient</text>
        <text x="548" y="313" fill="#fbbf24" fontSize="13" fontWeight="700">MU = MC</text>

        {/* Footer caption */}
        <text x="380" y="575" textAnchor="middle" fill="#94a3b8" fontSize="11">
          At Q₂ society would gain by producing more (MU &gt; MC). Free-market over-production with a negative externality pushes output past Q₁, so MC &gt; MU and welfare falls.
        </text>
      </svg>
    </div>
  );
}
