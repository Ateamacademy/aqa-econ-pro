/**
 * EconDiagramSVG — renders structured diagram descriptions as polished,
 * interactive SVG diagrams with animations, tooltips and a professional look.
 */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DiagramProps {
  type: string;
  xAxis: string;
  yAxis: string;
  initialCurves: string;
  initialEquilibrium: string;
  shift: string;
  newEquilibrium: string;
  shadedArea?: string;
  conclusion: string;
}

function parseDiagramBlock(text: string): DiagramProps | null {
  const typeMatch = text.match(/\*?\*?Diagram:\s*(.+?)\*?\*?/i);
  if (!typeMatch) return null;

  const get = (label: string) => {
    const re = new RegExp(`\\*?\\*?${label}\\*?\\*?:\\s*(.+)`, "im");
    const m = text.match(re);
    return m?.[1]?.trim() || "";
  };

  return {
    type: typeMatch[1].trim(),
    xAxis: get("X-axis") || get("Horizontal axis") || "Quantity (Q)",
    yAxis: get("Y-axis") || get("Vertical axis") || "Price (P)",
    initialCurves: get("Initial curves") || get("Original curves") || "",
    initialEquilibrium: get("Initial equilibrium") || "",
    shift: get("Shift") || "",
    newEquilibrium: get("New equilibrium") || "",
    shadedArea: get("Shaded area") || "",
    conclusion: get("Key conclusion") || get("Effect") || "",
  };
}

function getShiftInfo(shift: string): { curve: "supply" | "demand" | "ad" | "as"; direction: "left" | "right" } {
  const s = shift.toLowerCase();
  const isLeft = s.includes("left") || s.includes("decrease") || s.includes("inward");
  const direction: "left" | "right" = isLeft ? "left" : "right";

  if (s.includes("supply") || s.includes("sras") || s.match(/\bs[12]/)) return { curve: "supply", direction };
  if (s.includes("ad") || s.includes("aggregate demand")) return { curve: "ad", direction };
  if (s.includes("as") || s.includes("aggregate supply")) return { curve: "as", direction };
  return { curve: "demand", direction };
}

/* ── Animated SVG line ── */
function AnimatedLine({
  x1, y1, x2, y2, stroke, strokeWidth = 2.5, dashed = false, delay = 0,
}: {
  x1: number; y1: number; x2: number; y2: number;
  stroke: string; strokeWidth?: number; dashed?: boolean; delay?: number;
}) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "8,4" : `${length}`}
      strokeDashoffset={dashed ? 0 : length}
      strokeLinecap="round"
      initial={dashed ? { opacity: 0 } : { strokeDashoffset: length }}
      animate={dashed ? { opacity: 1 } : { strokeDashoffset: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    />
  );
}

/* ── Tooltip dot ── */
function EquilibriumDot({
  cx, cy, fill, label, pLabel, qLabel,
  margin, plotH, delay,
}: {
  cx: number; cy: number; fill: string; label: string;
  pLabel: string; qLabel: string;
  margin: { top: number; left: number }; plotH: number; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      {/* Dotted lines to axes */}
      <motion.line
        x1={margin.left} y1={cy} x2={cx} y2={cy}
        stroke={fill} strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay }}
      />
      <motion.line
        x1={cx} y1={cy} x2={cx} y2={margin.top + plotH}
        stroke={fill} strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      />

      {/* Axis tick labels */}
      <text x={margin.left - 6} y={cy + 4} textAnchor="end" fontSize="10" fontWeight="600" fill={fill}>{pLabel}</text>
      <text x={cx} y={margin.top + plotH + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill={fill}>{qLabel}</text>

      {/* Glow ring on hover */}
      {hovered && (
        <circle cx={cx} cy={cy} r="14" fill={fill} opacity={0.12} />
      )}

      {/* Dot */}
      <motion.circle
        cx={cx} cy={cy} r={hovered ? 6 : 5}
        fill={fill} stroke="white" strokeWidth={2}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", delay, stiffness: 300 }}
      />

      {/* Label */}
      <motion.text
        x={cx + 10} y={cy - 8} fontSize="11" fontWeight="700" fill={fill}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {label}
      </motion.text>

      {/* Tooltip */}
      {hovered && (
        <g>
          <rect x={cx + 14} y={cy - 36} width={90} height={28} rx={6} fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={1} />
          <text x={cx + 20} y={cy - 20} fontSize="9" fontWeight="500" fill="hsl(var(--popover-foreground))">
            {pLabel}, {qLabel}
          </text>
        </g>
      )}
    </g>
  );
}

/* ── Shift arrow ── */
function ShiftArrow({ x, y, offset, color, delay }: { x: number; y: number; offset: number; color: string; delay: number }) {
  const endX = x + offset * 0.55;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.4 }}>
      <line x1={x} y1={y} x2={endX} y2={y} stroke={color} strokeWidth={1.8} markerEnd={`url(#arrow-${color.replace("#", "")})`} />
    </motion.g>
  );
}

function EconDiagramCanvas({ diagram }: { diagram: DiagramProps }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 440;
  const H = 340;
  const margin = { top: 24, right: 24, bottom: 48, left: 56 };
  const plotW = W - margin.left - margin.right;
  const plotH = H - margin.top - margin.bottom;

  const shiftInfo = getShiftInfo(diagram.shift);
  const shiftOffset = shiftInfo.direction === "right" ? 55 : -55;

  // Curve endpoints
  const dX1 = margin.left + 25, dY1 = margin.top + 12;
  const dX2 = margin.left + plotW - 15, dY2 = margin.top + plotH - 12;
  const sX1 = margin.left + 25, sY1 = margin.top + plotH - 12;
  const sX2 = margin.left + plotW - 15, sY2 = margin.top + 12;

  // Equilibria
  const eqX = margin.left + plotW * 0.44;
  const eqY = margin.top + plotH * 0.44;

  let newEqX = eqX, newEqY = eqY;
  const isSS = shiftInfo.curve === "supply" || shiftInfo.curve === "as";
  const isDD = shiftInfo.curve === "demand" || shiftInfo.curve === "ad";

  if (isSS) {
    newEqX = eqX + (shiftInfo.direction === "left" ? -28 : 28);
    newEqY = eqY + (shiftInfo.direction === "left" ? -22 : 22);
  } else {
    newEqX = eqX + (shiftInfo.direction === "right" ? 28 : -28);
    newEqY = eqY + (shiftInfo.direction === "right" ? -22 : 22);
  }

  // Colors
  const demandColor = "#2563eb"; // blue-600
  const supplyColor = "#dc2626"; // red-600
  const eq1Color = "#059669";    // emerald-600
  const eq2Color = "#d97706";    // amber-600

  if (!animated) {
    return <div ref={ref} className="h-[340px]" />;
  }

  return (
    <div ref={ref} className="my-5 rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card to-muted/20 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border/40 bg-muted/30">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">📊</span>
        <div>
          <p className="text-[13px] font-semibold text-foreground leading-tight">MODEL DIAGRAM</p>
          <p className="text-[11px] text-muted-foreground leading-tight">{diagram.type}</p>
        </div>
      </div>

      {/* SVG */}
      <div className="px-4 py-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[460px] mx-auto h-auto" role="img" aria-label={`Economics diagram: ${diagram.type}`}>
          <defs>
            {/* Grid pattern */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
            </pattern>
            {/* Arrow markers */}
            {[{ id: demandColor }, { id: supplyColor }].map(({ id }) => (
              <marker key={id} id={`arrow-${id.replace("#", "")}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0,0.5 7,3 0,5.5" fill={id} />
              </marker>
            ))}
          </defs>

          {/* Grid background */}
          <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="url(#grid)" rx="6" />

          {/* Axes */}
          <motion.line
            x1={margin.left} y1={margin.top - 4} x2={margin.left} y2={margin.top + plotH}
            stroke="hsl(var(--foreground))" strokeWidth={2.2} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
          />
          <motion.line
            x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW + 4} y2={margin.top + plotH}
            stroke="hsl(var(--foreground))" strokeWidth={2.2} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          />

          {/* Arrow tips */}
          <polygon points={`${margin.left - 5},${margin.top + 4} ${margin.left},${margin.top - 6} ${margin.left + 5},${margin.top + 4}`} fill="hsl(var(--foreground))" />
          <polygon points={`${margin.left + plotW - 2},${margin.top + plotH - 5} ${margin.left + plotW + 6},${margin.top + plotH} ${margin.left + plotW - 2},${margin.top + plotH + 5}`} fill="hsl(var(--foreground))" />

          {/* Y-axis label */}
          <text x={margin.left - 14} y={margin.top + plotH / 2} textAnchor="middle" transform={`rotate(-90 ${margin.left - 14} ${margin.top + plotH / 2})`} fontSize="12" fontWeight="700" fill="hsl(var(--foreground))" fontFamily="inherit">
            {diagram.yAxis}
          </text>
          {/* X-axis label */}
          <text x={margin.left + plotW / 2} y={H - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))" fontFamily="inherit">
            {diagram.xAxis}
          </text>

          {/* ── Original Demand (D₁) ── */}
          <AnimatedLine x1={dX1} y1={dY1} x2={dX2} y2={dY2} stroke={demandColor} delay={0.3} />
          <motion.text x={dX2 + 6} y={dY2 + 2} fontSize="12" fontWeight="800" fill={demandColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>D₁</motion.text>

          {/* ── Original Supply (S₁) ── */}
          <AnimatedLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} stroke={supplyColor} delay={0.5} />
          <motion.text x={sX2 + 6} y={sY2 + 2} fontSize="12" fontWeight="800" fill={supplyColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>S₁</motion.text>

          {/* ── Shifted Demand (D₂) ── */}
          {isDD && (
            <>
              <AnimatedLine x1={dX1 + shiftOffset} y1={dY1} x2={dX2 + shiftOffset} y2={dY2} stroke={demandColor} dashed delay={1.2} />
              <motion.text x={dX2 + shiftOffset + 6} y={dY2 + 2} fontSize="12" fontWeight="800" fill={demandColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>D₂</motion.text>
              <ShiftArrow x={dX1 + plotW * 0.28} y={dY1 + plotH * 0.28} offset={shiftOffset} color={demandColor} delay={1.3} />
            </>
          )}

          {/* ── Shifted Supply (S₂) ── */}
          {isSS && (
            <>
              <AnimatedLine x1={sX1 + shiftOffset} y1={sY1} x2={sX2 + shiftOffset} y2={sY2} stroke={supplyColor} dashed delay={1.2} />
              <motion.text x={sX2 + shiftOffset + 6} y={sY2 + 2} fontSize="12" fontWeight="800" fill={supplyColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>S₂</motion.text>
              <ShiftArrow x={sX1 + plotW * 0.28} y={sY1 - plotH * 0.28} offset={shiftOffset} color={supplyColor} delay={1.3} />
            </>
          )}

          {/* ── Equilibria ── */}
          <EquilibriumDot cx={eqX} cy={eqY} fill={eq1Color} label="E₁" pLabel="P₁" qLabel="Q₁" margin={margin} plotH={plotH} delay={0.9} />
          <EquilibriumDot cx={newEqX} cy={newEqY} fill={eq2Color} label="E₂" pLabel="P₂" qLabel="Q₂" margin={margin} plotH={plotH} delay={1.4} />
        </svg>
      </div>

      {/* Footer — conclusion & legend */}
      <div className="px-5 pb-4 space-y-2.5">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: demandColor }} /> Demand</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-[3px] rounded" style={{ background: supplyColor }} /> Supply</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: eq1Color }} /> Original eq.</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: eq2Color }} /> New eq.</span>
        </div>

        {diagram.conclusion && (
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-2">
            <span className="font-semibold text-foreground">Key conclusion: </span>{diagram.conclusion}
          </p>
        )}
        {diagram.shadedArea && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Shaded area: </span>{diagram.shadedArea}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Scans markdown text for diagram blocks and returns segments.
 */
export function extractDiagramBlocks(text: string): Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> {
  const segments: Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> = [];

  const diagramRegex = /\*?\*?Diagram:\s*.+?\*?\*?\s*\n([\s\S]*?)(?=\n(?:\*?\*?Diagram:|\n##|\n\*\*[A-Z])|\n\n\n|$)/gi;
  let lastIndex = 0;
  let match;

  while ((match = diagramRegex.exec(text)) !== null) {
    const fullMatch = match[0];
    const startIdx = match.index;

    if (startIdx > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, startIdx) });
    }

    const parsed = parseDiagramBlock(fullMatch);
    if (parsed) {
      segments.push({ type: "diagram", diagram: parsed });
    } else {
      segments.push({ type: "text", content: fullMatch });
    }

    lastIndex = startIdx + fullMatch.length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ type: "text", content: text });
  }

  return segments;
}

export { EconDiagramCanvas, parseDiagramBlock };
export type { DiagramProps };
