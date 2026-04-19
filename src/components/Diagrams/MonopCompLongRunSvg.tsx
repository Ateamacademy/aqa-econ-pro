import React from "react";
import { MONOP_COMP_COLORS, SHARED_COST_PATHS, SHARED_MARKERS, svgLabelStyle } from "@/components/Diagrams/monopolisticCompetitionShared";

const LONG_RUN_PATHS = {
  ar: "M 120 250 L 740 590",
  mr: "M 120 250 L 470 650",
  ghost: "M 120 150 L 845 525",
} as const;

function MonopCompLongRunSvgInner() {
  const q2x = 360;
  const p2y = 382;

  return (
    <svg viewBox="0 0 1000 750" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <g style={svgLabelStyle}>
        <line x1={SHARED_MARKERS.axisLeft} y1="90" x2={SHARED_MARKERS.axisLeft} y2={SHARED_MARKERS.axisBottom} stroke={MONOP_COMP_COLORS.muted} strokeWidth="2" />
        <line x1={SHARED_MARKERS.axisLeft} y1={SHARED_MARKERS.axisBottom} x2="900" y2={SHARED_MARKERS.axisBottom} stroke={MONOP_COMP_COLORS.muted} strokeWidth="2" />
        <text x="505" y="708" textAnchor="middle" fontSize="24" fontWeight="700" fill={MONOP_COMP_COLORS.text}>Quantity (Q)</text>
        <text x="34" y="372" textAnchor="middle" fontSize="24" fontWeight="700" fill={MONOP_COMP_COLORS.text} transform="rotate(-90 34 372)">Price / Cost / Revenue</text>

        <path d={LONG_RUN_PATHS.ghost} fill="none" stroke={MONOP_COMP_COLORS.ghost} strokeWidth="4" strokeDasharray="10 14" strokeLinecap="round" />
        <text x="790" y="440" fontSize="18" fontWeight="700" fill={MONOP_COMP_COLORS.ghost}>D₁</text>

        <path d={LONG_RUN_PATHS.ar} fill="none" stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="6" strokeLinecap="round" />
        <path d={LONG_RUN_PATHS.mr} fill="none" stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="5" strokeDasharray="18 14" strokeLinecap="round" />
        <path d={SHARED_COST_PATHS.mc} fill="none" stroke={MONOP_COMP_COLORS.marginalCost} strokeWidth="6" strokeLinecap="round" />
        <path d={SHARED_COST_PATHS.ac} fill="none" stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="6" strokeLinecap="round" />

        <text x="705" y="590" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>AR₂ = D₂</text>
        <text x="448" y="650" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>MR₂</text>
        <text x="650" y="165" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.marginalCost}>MC</text>
        <text x="785" y="262" fontSize="22" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>AC</text>

        <line x1={SHARED_MARKERS.axisLeft} y1={p2y} x2={q2x} y2={p2y} stroke={MONOP_COMP_COLORS.shortRun} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={q2x} y1={SHARED_MARKERS.axisBottom} x2={q2x} y2={p2y} stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="2" strokeDasharray="7 7" />
        <circle cx={q2x} cy={p2y} r="12" fill="none" stroke={MONOP_COMP_COLORS.averageCost} strokeWidth="4" />
        <circle cx={q2x} cy={p2y} r="5" fill={MONOP_COMP_COLORS.averageCost} />

        <text x="90" y={p2y + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={MONOP_COMP_COLORS.shortRun}>P₂</text>
        <text x={q2x} y="685" textAnchor="middle" fontSize="20" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>Q₂</text>

        <circle cx={SHARED_MARKERS.acMinX} cy={SHARED_MARKERS.acMinY} r="6" fill={MONOP_COMP_COLORS.averageCost} />
        <text x="520" y="505" fontSize="18" fontWeight="700" fill={MONOP_COMP_COLORS.averageCost}>AC min</text>

        <rect x="395" y="328" width="208" height="58" rx="10" fill={MONOP_COMP_COLORS.yellowCallout} stroke={MONOP_COMP_COLORS.border} />
        <text x="499" y="352" textAnchor="middle" fontSize="18" fontWeight="700" fill={MONOP_COMP_COLORS.calloutText}>Normal profit</text>
        <text x="499" y="372" textAnchor="middle" fontSize="14" fill={MONOP_COMP_COLORS.calloutText}>(P = AC at Q₂)</text>

        <text x="295" y="442" fontSize="18" fontStyle="italic" fill={MONOP_COMP_COLORS.averageCost}>AR tangent to AC → zero supernormal profit</text>

        <line x1="545" y1="215" x2="435" y2="215" stroke={MONOP_COMP_COLORS.longRun} strokeWidth="4" />
        <polygon points="435,215 452,206 452,224" fill={MONOP_COMP_COLORS.longRun} />
        <text x="490" y="188" textAnchor="middle" fontSize="19" fontWeight="700" fill={MONOP_COMP_COLORS.longRun}>New firms enter → D shifts left</text>

        <line x1={q2x} y1="610" x2={SHARED_MARKERS.acMinX} y2="610" stroke={MONOP_COMP_COLORS.danger} strokeWidth="4" />
        <polygon points={`${q2x},610 ${q2x + 14},602 ${q2x + 14},618`} fill={MONOP_COMP_COLORS.danger} />
        <polygon points={`${SHARED_MARKERS.acMinX},610 ${SHARED_MARKERS.acMinX - 14},602 ${SHARED_MARKERS.acMinX - 14},618`} fill={MONOP_COMP_COLORS.danger} />
        <text x={(q2x + SHARED_MARKERS.acMinX) / 2} y="595" textAnchor="middle" fontSize="18" fontWeight="700" fill={MONOP_COMP_COLORS.danger}>Excess capacity</text>
      </g>
    </svg>
  );
}