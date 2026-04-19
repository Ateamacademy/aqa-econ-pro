import { MONOP_COMP_COLORS, SHARED_COST_PATHS, SHARED_MARKERS, svgLabelStyle } from "@/components/Diagrams/monopolisticCompetitionShared";

const SHORT_RUN_PATHS = {
  ar: "M 120 150 L 845 525",
  mr: "M 120 150 L 555 640",
} as const;

export function MonopCompShortRunSvg() {
  const q1x = 395;
  const p1y = 292;
  const ac1y = 510;
  const profitY = 408;

  return (
    <svg viewBox="0 0 1000 750" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <g style={svgLabelStyle}>
        <line x1={SHARED_MARKERS.axisLeft} y1="90" x2={SHARED_MARKERS.axisLeft} y2={SHARED_MARKERS.axisBottom} stroke={MONOP_COMP_COLORS.muted} strokeWidth="2" />
        <line x1={SHARED_MARKERS.axisLeft} y1={SHARED_MARKERS.axisBottom} x2="900" y2={SHARED_MARKERS.axisBottom} stroke={MONOP_COMP_COLORS.muted} strokeWidth="2" />
        <text x="505" y="708" textAnchor="middle" fontSize="24" fontWeight="700" fill={MONOP_COMP_COLORS.text}>Quantity (Q)</text>
        <text x="34" y="372" textAnchor="middle" fontSize="24" fontWeight="700" fill={MONOP_COMP_COLORS.text} transform="rotate(-90 34 372)">Price / Cost / Revenue</text>

        <rect x={SHARED_MARKERS.axisLeft} y={p1y} width={q1x - SHARED_MARKERS.axisLeft} height={ac1y - p1y} fill={MONOP_COMP_COLORS.profitFill} />
        <text x="250" y="380" textAnchor="middle" fontSize="26" fontWeight="700" fill={MONOP_COMP_COLORS.profitText}>Supernormal profit</text>

        <path d={SHORT_RUN_PATHS.ar} fill="none" stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="6" strokeLinecap="round" />
        <path d={SHORT_RUN_PATHS.mr} fill="none" stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="5" strokeDasharray="18 14" strokeLinecap="round" />
        <path d={SHARED_COST_PATHS.mc} fill="none" stroke={MONOP_COMP_COLORS.marginalCost} strokeWidth="6" strokeLinecap="round" />
        <path d={SHARED_COST_PATHS.ac} fill="none" stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="6" strokeLinecap="round" />

        <text x="820" y="520" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>AR = D</text>
        <text x="520" y="640" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>MR</text>
        <text x="650" y="165" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.marginalCost}>MC</text>
        <text x="785" y="262" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>AC</text>

        <line x1={SHARED_MARKERS.axisLeft} y1={p1y} x2={q1x} y2={p1y} stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={SHARED_MARKERS.axisLeft} y1={ac1y} x2={q1x} y2={ac1y} stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={q1x} y1={SHARED_MARKERS.axisBottom} x2={q1x} y2={p1y} stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="2" strokeDasharray="7 7" />

        <circle cx={q1x} cy={profitY} r="8" fill={MONOP_COMP_COLORS.marginalCost} />
        <circle cx={q1x} cy={p1y} r="8" fill={MONOP_COMP_COLORS.shortRun} />

        <rect x="428" y="377" width="166" height="56" rx="10" fill={MONOP_COMP_COLORS.yellowCallout} stroke={MONOP_COMP_COLORS.border} />
        <text x="511" y="401" textAnchor="middle" fontSize="18" fontWeight="700" fill={MONOP_COMP_COLORS.calloutText}>Profit max</text>
        <text x="511" y="422" textAnchor="middle" fontSize="14" fill={MONOP_COMP_COLORS.calloutText}>(MR = MC)</text>

        <text x="90" y={p1y + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>P₁</text>
        <text x="90" y={ac1y + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>AC₁</text>
        <text x={q1x} y="685" textAnchor="middle" fontSize="20" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>Q₁</text>
      </g>
    </svg>
  );
}