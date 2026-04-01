export default function KinkedDemandCurve() {
  // Key coordinates
  const kink = { x: 200, y: 160 }; // The kink point X (P1, Q1)
  const axisL = 60;
  const axisB = 340;
  const axisT = 30;
  const axisR = 380;

  // AR curve: two segments with different slopes meeting at kink
  // Upper segment (elastic): from top-left to kink
  const arStart = { x: 100, y: 70 };
  // Lower segment (inelastic): from kink to bottom-right
  const arEnd = { x: 280, y: 320 };

  // MR curve: two segments with a vertical discontinuity
  // Upper MR segment (steeper than upper AR)
  const mrUpperStart = { x: 100, y: 70 };
  const mrUpperEnd = { x: 200, y: 210 }; // ends at kink x but lower
  // Lower MR segment starts lower after the gap
  const mrLowerStart = { x: 200, y: 280 };
  const mrLowerEnd = { x: 310, y: 370 };

  // MC curve (U-shape passing through the MR gap)
  const mcPath = "M 130,280 Q 170,220 200,240 Q 240,270 300,120";

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, maxWidth: 480, margin: "0 auto" }}>
      <svg viewBox="0 0 440 420" width="100%" height="auto" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* Title */}
        <text x="220" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">
          OLIGOPOLY — KINKED DEMAND CURVE
        </text>

        {/* Axes */}
        <line x1={axisL} y1={axisT} x2={axisL} y2={axisB} stroke="#334155" strokeWidth="2" />
        <line x1={axisL} y1={axisB} x2={axisR} y2={axisB} stroke="#334155" strokeWidth="2" />
        {/* Arrow heads */}
        <polygon points={`${axisL},${axisT} ${axisL - 5},${axisT + 10} ${axisL + 5},${axisT + 10}`} fill="#334155" />
        <polygon points={`${axisR},${axisB} ${axisR - 10},${axisB - 5} ${axisR - 10},${axisB + 5}`} fill="#334155" />

        {/* Axis labels */}
        <text x={axisL - 8} y={axisT - 5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">Price</text>
        <text x={axisR + 5} y={axisB + 15} textAnchor="end" fontSize="11" fontWeight="600" fill="#475569">Quantity</text>

        {/* Dashed reference lines from kink to axes */}
        <line x1={axisL} y1={kink.y} x2={kink.x} y2={kink.y} stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />
        <line x1={kink.x} y1={kink.y} x2={kink.x} y2={axisB} stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />

        {/* P1 and Q1 labels */}
        <text x={axisL - 12} y={kink.y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#f97316">P1</text>
        <text x={kink.x} y={axisB + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill="#f97316">Q1</text>

        {/* AR (Kinked demand curve) — two segments */}
        {/* Upper elastic segment */}
        <line x1={arStart.x} y1={arStart.y} x2={kink.x} y2={kink.y}
          stroke="#1e293b" strokeWidth="2.5" />
        {/* Lower inelastic segment */}
        <line x1={kink.x} y1={kink.y} x2={arEnd.x} y2={arEnd.y}
          stroke="#1e293b" strokeWidth="2.5" />

        {/* AR label */}
        <text x={arEnd.x + 5} y={arEnd.y - 10} fontSize="11" fontWeight="700" fill="#1e293b">AR</text>

        {/* MR curve — two segments with gap */}
        {/* Upper MR (steeper) */}
        <line x1={mrUpperStart.x} y1={mrUpperStart.y + 30} x2={mrUpperEnd.x} y2={mrUpperEnd.y}
          stroke="#1e293b" strokeWidth="2" strokeDasharray="6,3" />
        {/* Lower MR */}
        <line x1={mrLowerStart.x} y1={mrLowerStart.y} x2={mrLowerEnd.x} y2={mrLowerEnd.y}
          stroke="#1e293b" strokeWidth="2" strokeDasharray="6,3" />

        {/* Vertical discontinuity (red highlight) */}
        <line x1={kink.x} y1={mrUpperEnd.y} x2={kink.x} y2={mrLowerStart.y}
          stroke="#ef4444" strokeWidth="3" />

        {/* MR label */}
        <text x={mrLowerEnd.x + 5} y={mrLowerEnd.y - 5} fontSize="11" fontWeight="700" fill="#1e293b">MR</text>

        {/* MC curve */}
        <path d={mcPath} fill="none" stroke="#6b7280" strokeWidth="2" />
        <text x="305" y="115" fontSize="11" fontWeight="700" fill="#6b7280">MC</text>

        {/* Kink point X */}
        <circle cx={kink.x} cy={kink.y} r="5" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
        <text x={kink.x + 10} y={kink.y - 8} fontSize="12" fontWeight="700" fill="#1e293b">X</text>

        {/* Annotation: elastic segment */}
        <text x="110" y="55" fontSize="9" fill="#475569" fontStyle="italic">
          <tspan x="105" dy="0">Relatively elastic demand</tspan>
          <tspan x="105" dy="12">curve — P↑ TR↓</tspan>
        </text>

        {/* Annotation: inelastic segment */}
        <text x="240" y="250" fontSize="9" fill="#475569" fontStyle="italic">
          <tspan x="240" dy="0">Relatively inelastic demand</tspan>
          <tspan x="240" dy="12">curve — P↓ TR↓</tspan>
        </text>

        {/* Annotation: MR discontinuity */}
        <text x="260" y="225" fontSize="9" fill="#ef4444" fontWeight="600">
          <tspan x="260" dy="0">Vertical discontinuity</tspan>
          <tspan x="260" dy="12">of the MR curve</tspan>
        </text>

        {/* Annotation: initial price/output */}
        <text x={kink.x + 25} y={kink.y - 25} fontSize="9" fill="#475569" fontStyle="italic">
          <tspan x={kink.x + 25} dy="0">The Oligopolist's initial</tspan>
          <tspan x={kink.x + 25} dy="12">price and output</tspan>
        </text>
        {/* Dotted line from annotation to X */}
        <line x1={kink.x + 25} y1={kink.y - 15} x2={kink.x + 8} y2={kink.y - 5}
          stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />

        {/* Annotation: MR starts at 0 */}
        <text x="270" y="350" fontSize="9" fill="#475569" fontStyle="italic">
          <tspan x="270" dy="0">The MR curve starts at 0</tspan>
          <tspan x="270" dy="12">as Q1 is where TR is</tspan>
          <tspan x="270" dy="12">maximised</tspan>
        </text>
      </svg>
    </div>
  );
}
