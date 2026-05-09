import React from "react";

/**
 * Eduqas A-Level · Monopoly: Business Objectives (cost & revenue diagram).
 * Used by Paper 2 · Moderate (eduqas-p2-a) Q2.3: effects on a supermarket's
 * abnormal profits of the expansion of Aldi and Lidl.
 *
 * Geometry (literal coordinates · DO NOT prettify):
 *   - AR = D   : red, downward (110,150) → (610,460)
 *   - MR       : red, steeper, same intercept ~150, hits axis at x≈360
 *                from (110,150) → (360,470)
 *   - MC       : blue, U-shape rising sharply right
 *   - ATC      : blue, U-shape, wider/shallower, min near (370,310)
 *   - Profit Max : MC = MR ≈ (270, 339); price read up to AR ≈ (270, 250)
 *   - Rev Max    : MR = 0 ≈ (360, 305) on AR
 *   - Sales Max  : AR = ATC ≈ (395, 295)
 *   - Supernormal profit rectangle: x∈[110,270], y∈[250, ATC(270)≈310]
 */
export default function EconMonopolyBusinessObjectivesEduqas() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 560"
      role="img"
      aria-label="Eduqas A-Level Economics · Monopoly business objectives: MC and ATC blue U-shape curves, AR and MR red downward, supernormal profit rectangle, Profit Max at MC=MR, Rev Max at MR=0, Sales Max at AR=ATC"
      style={{ width: "100%", height: "auto", background: "#0b1020" }}
      fontFamily="Inter, Arial, sans-serif"
    >
      {/* Title chip */}
      <g>
        <rect x="24" y="20" width="22" height="22" rx="4" fill="#1e293b" stroke="#334155" />
        <text x="58" y="36" fill="#a78bfa" fontSize="13" fontWeight="700" letterSpacing="1.5">
          MONOPOLY · BUSINESS OBJECTIVES
        </text>
      </g>

      {/* Axes */}
      <line x1="110" y1="80" x2="110" y2="490" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="110" y1="490" x2="650" y2="490" stroke="#e2e8f0" strokeWidth="2" />
      {/* Arrows */}
      <polygon points="110,72 105,82 115,82" fill="#e2e8f0" />
      <polygon points="658,490 648,485 648,495" fill="#e2e8f0" />
      <text x="60" y="280" fill="#cbd5e1" fontSize="12" transform="rotate(-90 60 280)">Revenue / Cost</text>
      <text x="370" y="525" fill="#cbd5e1" fontSize="12" textAnchor="middle">Output</text>
      <text x="96" y="505" fill="#94a3b8" fontSize="11">O</text>

      {/* Supernormal profit rectangle (drawn first, behind curves) */}
      <rect x="110" y="250" width="160" height="60" fill="#16a34a" fillOpacity="0.22" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="5,3" />
      <text x="190" y="285" fill="#4ade80" fontSize="11" fontWeight="700" textAnchor="middle">
        Supernormal Profit
      </text>

      {/* AR = D (red downward) */}
      <line x1="110" y1="150" x2="660" y2="490" stroke="#ef4444" strokeWidth="2.5" />
      <text x="668" y="488" fill="#ef4444" fontSize="13" fontWeight="700">A</text>

      {/* MR (red, steeper) */}
      <line x1="110" y1="150" x2="430" y2="490" stroke="#ef4444" strokeWidth="2.3" />
      <text x="430" y="505" fill="#ef4444" fontSize="12" fontWeight="700">MR</text>

      {/* ATC (blue U-shape) · min near (370, 310) */}
      <path
        d="M 130 200 C 220 410 320 350 370 310 C 460 250 540 230 600 200"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
      />
      <text x="608" y="200" fill="#60a5fa" fontSize="12" fontWeight="700">ATC</text>

      {/* MC (blue U-shape) · passes through ATC min and rises sharply */}
      <path
        d="M 140 360 C 200 430 250 410 270 339 C 320 280 360 220 410 110"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
      />
      <text x="412" y="105" fill="#60a5fa" fontSize="12" fontWeight="700">MC</text>

      {/* Profit Max: MC=MR at (270, 339); price up to AR at y≈250 */}
      <line x1="270" y1="250" x2="270" y2="490" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="110" y1="250" x2="270" y2="250" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="110" y1="310" x2="270" y2="310" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
      <circle cx="270" cy="250" r="5" fill="#22c55e" stroke="#0b1020" strokeWidth="1.5" />
      <text x="278" y="246" fill="#ef4444" fontSize="11" fontWeight="700">Profit Max</text>
      <circle cx="270" cy="339" r="5" fill="#22c55e" stroke="#0b1020" strokeWidth="1.5" />
      <text x="278" y="343" fill="#60a5fa" fontSize="11" fontWeight="700">MC=MR</text>

      {/* Rev Max: MR=0 at x=430; price on AR at that x */}
      {(() => {
        // AR slope: (490-150)/(660-110) = 340/550 ≈ 0.618
        const arY = 150 + ((430 - 110) * 340) / 550; // ≈ 347.8
        return (
          <>
            <line x1="430" y1={arY} x2="430" y2="490" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <line x1="110" y1={arY} x2="430" y2={arY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <circle cx="430" cy={arY} r="5" fill="#22c55e" stroke="#0b1020" strokeWidth="1.5" />
            <text x="438" y={arY + 4} fill="#ef4444" fontSize="11" fontWeight="700">Rev Max</text>
          </>
        );
      })()}

      {/* Sales Max: AR ≈ ATC (right side); approx (470, 360) on AR */}
      <circle cx="470" cy="358" r="5" fill="#22c55e" stroke="#0b1020" strokeWidth="1.5" />
      <text x="478" y="354" fill="#60a5fa" fontSize="11" fontWeight="700">Sales Max</text>

      {/* Legend */}
      <g transform="translate(40, 535)">
        <circle cx="6" cy="0" r="6" fill="#3b82f6" />
        <text x="18" y="4" fill="#cbd5e1" fontSize="11" fontWeight="600">MC</text>
        <circle cx="60" cy="0" r="6" fill="#3b82f6" />
        <text x="72" y="4" fill="#cbd5e1" fontSize="11" fontWeight="600">ATC</text>
        <circle cx="118" cy="0" r="6" fill="#ef4444" />
        <text x="130" y="4" fill="#cbd5e1" fontSize="11" fontWeight="600">AR</text>
        <circle cx="172" cy="0" r="6" fill="#ef4444" />
        <text x="184" y="4" fill="#cbd5e1" fontSize="11" fontWeight="600">MR</text>
      </g>
    </svg>
  );
}
