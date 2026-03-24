/**
 * EconDiagramSVG — renders structured diagram descriptions as polished,
 * 3D-styled interactive SVG diagrams with depth, gradients, glow effects,
 * animations, tooltips and a premium look.
 *
 * When a known diagram type is detected (e.g. externalities, monopoly, AD/AS),
 * it delegates to the predefined EconDiagramTemplate library for exam-accurate
 * rendering with welfare loss/gain areas, proper curve labels, and colored boundaries.
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveDiagramType, EconDiagramTemplate } from "@/components/revision/EconDiagramLibrary";

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
  family?: string;
}

interface DiagramParseOptions {
  contextText?: string;
  fallbackType?: string;
  fallbackShift?: string;
}

function parseDiagramBlock(text: string, options: DiagramParseOptions = {}): DiagramProps | null {
  const headingMatch = text.match(/^\s*(?:#{2,4}\s*)?(?:\*\*)?Diagram\s*:\s*([^\n*]+?)(?:\*\*)?\s*$/im);
  const get = (label: string) => {
    const re = new RegExp(`^\\s*(?:[-•*]\\s*)?\\*?\\*?${label}\\*?\\*?:\\s*(.+)$`, "im");
    const m = text.match(re);
    return m?.[1]?.trim() || "";
  };

  const shift = get("Shift") || options.fallbackShift || "";
  const rawType = headingMatch?.[1]?.trim() || "";
  const family = get("Diagram family") || "";

  // Resolve using family first, then title, then fallbacks
  const resolvedType =
    (family ? resolveDiagramType(family, shift) : null) ||
    resolveDiagramType(rawType, shift) ||
    (options.fallbackType ? resolveDiagramType(options.fallbackType, shift) : null) ||
    (options.contextText ? resolveDiagramType(options.contextText, shift) : null);

  const finalType = resolvedType || rawType || options.fallbackType;
  if (!finalType) return null;

  return {
    type: finalType,
    xAxis: get("X-axis") || get("Horizontal axis") || "Quantity (Q)",
    yAxis: get("Y-axis") || get("Vertical axis") || "Price (P)",
    initialCurves: get("Initial curves") || get("Original curves") || "",
    initialEquilibrium: get("Initial equilibrium") || "",
    shift,
    newEquilibrium: get("New equilibrium") || "",
    shadedArea: get("Shaded area") || "",
    conclusion: get("Key conclusion") || get("Effect") || "",
    family: family || undefined,
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

/* ── Animated SVG line with gradient stroke ── */
function AnimatedLine({
  x1, y1, x2, y2, stroke, strokeWidth = 3, dashed = false, delay = 0, gradientId,
}: {
  x1: number; y1: number; x2: number; y2: number;
  stroke: string; strokeWidth?: number; dashed?: boolean; delay?: number; gradientId?: string;
}) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={gradientId ? `url(#${gradientId})` : stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "10,5" : `${length}`}
      strokeDashoffset={dashed ? 0 : length}
      strokeLinecap="round"
      filter={dashed ? undefined : "url(#curveGlow)"}
      initial={dashed ? { opacity: 0 } : { strokeDashoffset: length }}
      animate={dashed ? { opacity: 0.85 } : { strokeDashoffset: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    />
  );
}

/* ── 3D Equilibrium dot with glow ── */
function EquilibriumDot({
  cx, cy, fill, label, pLabel, qLabel,
  margin, plotW, plotH, delay, glowId,
}: {
  cx: number; cy: number; fill: string; label: string;
  pLabel: string; qLabel: string;
  margin: { top: number; left: number; right: number; bottom: number }; plotW: number; plotH: number; delay: number;
  glowId: string;
}) {
  const [hovered, setHovered] = useState(false);
  const axisBottom = margin.top + plotH;
  const axisLeft = margin.left;

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      {/* Horizontal dotted line → to Y-axis */}
      <motion.line
        x1={axisLeft} y1={cy} x2={cx} y2={cy}
        stroke={fill} strokeWidth={1.2} strokeDasharray="4,4" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay }}
      />
      {/* Vertical dotted line → to X-axis */}
      <motion.line
        x1={cx} y1={cy} x2={cx} y2={axisBottom}
        stroke={fill} strokeWidth={1.2} strokeDasharray="4,4" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      />

      {/* Y-axis tick mark */}
      <motion.line
        x1={axisLeft - 5} y1={cy} x2={axisLeft} y2={cy}
        stroke={fill} strokeWidth={2}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      />
      {/* Y-axis tick label (P₁ / P₂) */}
      <motion.text
        x={axisLeft - 10} y={cy + 5} textAnchor="end" fontSize="13" fontWeight="900" fill={fill}
        initial={{ opacity: 0, x: axisLeft - 22 }} animate={{ opacity: 1, x: axisLeft - 10 }}
        transition={{ delay: delay + 0.25, duration: 0.4 }}
      >
        {pLabel}
      </motion.text>

      {/* X-axis tick mark */}
      <motion.line
        x1={cx} y1={axisBottom} x2={cx} y2={axisBottom + 6}
        stroke={fill} strokeWidth={2}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      />
      {/* X-axis tick label (Q₁ / Q₂) */}
      <motion.text
        x={cx} y={axisBottom + 20} textAnchor="middle" fontSize="13" fontWeight="900" fill={fill}
        initial={{ opacity: 0, y: axisBottom + 30 }} animate={{ opacity: 1, y: axisBottom + 20 }}
        transition={{ delay: delay + 0.25, duration: 0.4 }}
      >
        {qLabel}
      </motion.text>

      {/* Outer glow ring on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.circle
            cx={cx} cy={cy} r={20}
            fill={fill} opacity={0.08}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.08 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* 3D dot: shadow */}
      <motion.circle
        cx={cx + 1.5} cy={cy + 1.5} r={hovered ? 7 : 6}
        fill="rgba(0,0,0,0.2)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", delay, stiffness: 300 }}
      />
      {/* 3D dot: main */}
      <motion.circle
        cx={cx} cy={cy} r={hovered ? 7 : 6}
        fill={`url(#${glowId})`} stroke="white" strokeWidth={2.5}
        filter="url(#dotGlow)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", delay, stiffness: 300 }}
      />
      {/* Highlight spec */}
      <motion.circle
        cx={cx - 2} cy={cy - 2} r={2}
        fill="rgba(255,255,255,0.6)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", delay: delay + 0.1, stiffness: 300 }}
      />

      {/* Label with backdrop */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.3 }}>
        <rect x={cx + 10} y={cy - 18} width={24} height={18} rx={4} fill="hsl(var(--card))" stroke={fill} strokeWidth={1} opacity={0.9} />
        <text x={cx + 22} y={cy - 5} fontSize="11" fontWeight="800" fill={fill} textAnchor="middle">
          {label}
        </text>
      </motion.g>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <rect x={cx + 16} y={cy - 44} width={100} height={34} rx={8}
              fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={1}
              filter="url(#tooltipShadow)" />
            <text x={cx + 24} y={cy - 30} fontSize="9" fontWeight="600" fill="hsl(var(--muted-foreground))">
              Equilibrium
            </text>
            <text x={cx + 24} y={cy - 18} fontSize="10" fontWeight="700" fill="hsl(var(--popover-foreground))">
              {pLabel}, {qLabel}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}

/* ── 3D Shift arrow ── */
function ShiftArrow({ x, y, offset, color, delay }: { x: number; y: number; offset: number; color: string; delay: number }) {
  const endX = x + offset * 0.55;
  const arrowSize = 6;
  const dir = offset > 0 ? 1 : -1;
  return (
    <motion.g initial={{ opacity: 0, x: -dir * 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.5, type: "spring" }}>
      {/* Arrow body with glow */}
      <line x1={x} y1={y} x2={endX - dir * arrowSize} y2={y} stroke={color} strokeWidth={2.5} strokeLinecap="round" filter="url(#curveGlow)" />
      {/* Arrow head */}
      <polygon
        points={`${endX},${y} ${endX - dir * arrowSize},${y - arrowSize / 1.5} ${endX - dir * arrowSize},${y + arrowSize / 1.5}`}
        fill={color}
      />
    </motion.g>
  );
}

function EconDiagramCanvas({ diagram }: { diagram: DiagramProps }) {
  // Try to resolve to a predefined template for exam-accurate rendering
  const resolvedType = resolveDiagramType(diagram.type, diagram.shift);
  
  const [animated, setAnimated] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // If we have a predefined template, use it — it has proper welfare loss/gain
  // triangles, colored boundaries, correct curve labels (MSC, MPC, MSB, MPB), etc.
    if (resolvedType) {
    return (
      <div className="my-6">
        <EconDiagramTemplate type={resolvedType} />
      </div>
    );
  }

  const W = 480;
  const H = 380;
  const margin = { top: 32, right: 32, bottom: 62, left: 72 };
  const plotW = W - margin.left - margin.right;
  const plotH = H - margin.top - margin.bottom;

  const shiftInfo = getShiftInfo(diagram.shift);
  const shiftOffset = shiftInfo.direction === "right" ? 58 : -58;

  const dX1 = margin.left + 25, dY1 = margin.top + 14;
  const dX2 = margin.left + plotW - 15, dY2 = margin.top + plotH - 14;
  const sX1 = margin.left + 25, sY1 = margin.top + plotH - 14;
  const sX2 = margin.left + plotW - 15, sY2 = margin.top + 14;

  // Calculate actual line intersection for equilibrium points
  const lineIntersect = (
    ax1: number, ay1: number, ax2: number, ay2: number,
    bx1: number, by1: number, bx2: number, by2: number
  ) => {
    const denom = (ax1 - ax2) * (by1 - by2) - (ay1 - ay2) * (bx1 - bx2);
    if (Math.abs(denom) < 0.001) return null;
    const t = ((ax1 - bx1) * (by1 - by2) - (ay1 - by1) * (bx1 - bx2)) / denom;
    return { x: ax1 + t * (ax2 - ax1), y: ay1 + t * (ay2 - ay1) };
  };

  // E₁ = intersection of D1 and S1
  const eq1 = lineIntersect(dX1, dY1, dX2, dY2, sX1, sY1, sX2, sY2);
  const eqX = eq1?.x ?? margin.left + plotW * 0.5;
  const eqY = eq1?.y ?? margin.top + plotH * 0.5;

  const isSS = shiftInfo.curve === "supply" || shiftInfo.curve === "as";
  const isDD = shiftInfo.curve === "demand" || shiftInfo.curve === "ad";

  // E₂ = intersection of shifted curve with the unchanged curve
  let newEqX = eqX, newEqY = eqY;
  if (isSS) {
    const eq2 = lineIntersect(dX1, dY1, dX2, dY2, sX1 + shiftOffset, sY1, sX2 + shiftOffset, sY2);
    if (eq2) { newEqX = eq2.x; newEqY = eq2.y; }
  } else if (isDD) {
    const eq2 = lineIntersect(dX1 + shiftOffset, dY1, dX2 + shiftOffset, dY2, sX1, sY1, sX2, sY2);
    if (eq2) { newEqX = eq2.x; newEqY = eq2.y; }
  }

  const demandColor = "#2563eb";
  const supplyColor = "#dc2626";
  const eq1Color = "#059669";
  const eq2Color = "#d97706";

  if (!animated) {
    return <div ref={ref} className="h-[380px]" />;
  }

  const pageLabels = ["Diagram", "Analysis"];

  return (
    <div ref={ref} className="my-6 rounded-2xl overflow-hidden border border-border/40 shadow-2xl relative">
      {/* 3D depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.04] rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-b-2xl" />

      {/* Header — no logo, with functional page dots */}
      <div className="relative flex items-center gap-3 px-5 py-3.5 border-b border-border/30 bg-gradient-to-r from-muted/40 via-muted/20 to-transparent backdrop-blur-sm">
        <div>
          <p className="text-xs font-bold tracking-widest text-primary/80 uppercase">Model Diagram</p>
          <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{diagram.type}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {pageLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setActivePage(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activePage === i
                  ? "bg-primary scale-125 shadow-sm"
                  : "bg-muted-foreground/25 hover:bg-muted-foreground/40"
              }`}
              title={label}
              aria-label={`View ${label}`}
            />
          ))}
        </div>
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {activePage === 0 && (
          <motion.div key="diagram" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
            {/* SVG Diagram */}
            <div className="relative px-4 py-4">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] mx-auto h-auto drop-shadow-sm" role="img" aria-label={`Economics diagram: ${diagram.type}`}>
                <defs>
                  <pattern id="grid3d" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.25" opacity="0.35" />
                  </pattern>
                  <linearGradient id="plotBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id="demandGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="supplyGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                  <radialGradient id="eq1Grad" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </radialGradient>
                  <radialGradient id="eq2Grad" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </radialGradient>
                  <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feFlood floodColor="currentColor" floodOpacity="0.15" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                    <feFlood floodColor="currentColor" floodOpacity="0.25" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="tooltipShadow" x="-10%" y="-10%" width="130%" height="150%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
                  </filter>
                  <filter id="axisShadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="0.5" floodOpacity="0.08" />
                  </filter>
                  {[{ id: demandColor }, { id: supplyColor }].map(({ id }) => (
                    <marker key={id} id={`arrow-${id.replace("#", "")}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0,0.5 7,3 0,5.5" fill={id} />
                    </marker>
                  ))}
                </defs>

                {/* Plot area */}
                <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="url(#plotBg)" rx="8" />
                <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="url(#grid3d)" rx="8" />
                <rect x={margin.left + 0.5} y={margin.top + 0.5} width={plotW - 1} height={plotH - 1} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" rx="8" opacity="0.3" />

                {/* Y-axis */}
                <motion.line
                  x1={margin.left} y1={margin.top - 6} x2={margin.left} y2={margin.top + plotH}
                  stroke="hsl(var(--foreground))" strokeWidth={2.5} strokeLinecap="round"
                  filter="url(#axisShadow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
                />
                {/* X-axis */}
                <motion.line
                  x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW + 6} y2={margin.top + plotH}
                  stroke="hsl(var(--foreground))" strokeWidth={2.5} strokeLinecap="round"
                  filter="url(#axisShadow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                />

                {/* Y-axis arrow */}
                <motion.polygon
                  points={`${margin.left - 6},${margin.top + 2} ${margin.left},${margin.top - 8} ${margin.left + 6},${margin.top + 2}`}
                  fill="hsl(var(--foreground))"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                />
                {/* X-axis arrow */}
                <motion.polygon
                  points={`${margin.left + plotW},${margin.top + plotH - 6} ${margin.left + plotW + 8},${margin.top + plotH} ${margin.left + plotW},${margin.top + plotH + 6}`}
                  fill="hsl(var(--foreground))"
                  initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                />

                {/* Origin "O" label */}
                <motion.text
                  x={margin.left - 10} y={margin.top + plotH + 16}
                  textAnchor="middle" fontSize="12" fontWeight="800" fill="hsl(var(--foreground))"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                >
                  O
                </motion.text>

                {/* Y-axis label */}
                <motion.text
                  x={16} y={margin.top + plotH / 2} textAnchor="middle"
                  transform={`rotate(-90 16 ${margin.top + plotH / 2})`}
                  fontSize="13" fontWeight="900" fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.04em"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                >
                  {diagram.yAxis}
                </motion.text>
                {/* X-axis label */}
                <motion.text
                  x={margin.left + plotW / 2} y={H - 6} textAnchor="middle"
                  fontSize="13" fontWeight="900" fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.04em"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                >
                  {diagram.xAxis}
                </motion.text>

                {/* Demand D₁ */}
                <AnimatedLine x1={dX1} y1={dY1} x2={dX2} y2={dY2} stroke={demandColor} gradientId="demandGrad" delay={0.3} />
                <motion.text x={dX2 + 8} y={dY2 + 4} fontSize="13" fontWeight="900" fill={demandColor}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  D₁
                </motion.text>

                {/* Supply S₁ */}
                <AnimatedLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} stroke={supplyColor} gradientId="supplyGrad" delay={0.5} />
                <motion.text x={sX2 + 8} y={sY2 + 4} fontSize="13" fontWeight="900" fill={supplyColor}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                  S₁
                </motion.text>

                {/* Shifted Demand D₂ */}
                {isDD && (
                  <>
                    <AnimatedLine x1={dX1 + shiftOffset} y1={dY1} x2={dX2 + shiftOffset} y2={dY2} stroke={demandColor} dashed delay={1.2} />
                    <motion.text x={dX2 + shiftOffset + 8} y={dY2 + 4} fontSize="13" fontWeight="900" fill={demandColor}
                      initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 1.5 }}>
                      D₂
                    </motion.text>
                    <ShiftArrow x={dX1 + plotW * 0.28} y={dY1 + plotH * 0.28} offset={shiftOffset} color={demandColor} delay={1.3} />
                  </>
                )}

                {/* Shifted Supply S₂ */}
                {isSS && (
                  <>
                    <AnimatedLine x1={sX1 + shiftOffset} y1={sY1} x2={sX2 + shiftOffset} y2={sY2} stroke={supplyColor} dashed delay={1.2} />
                    <motion.text x={sX2 + shiftOffset + 8} y={sY2 + 4} fontSize="13" fontWeight="900" fill={supplyColor}
                      initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 1.5 }}>
                      S₂
                    </motion.text>
                    <ShiftArrow x={sX1 + plotW * 0.28} y={sY1 - plotH * 0.28} offset={shiftOffset} color={supplyColor} delay={1.3} />
                  </>
                )}

                {/* Equilibria */}
                <EquilibriumDot cx={eqX} cy={eqY} fill={eq1Color} label="E₁" pLabel="P₁" qLabel="Q₁" margin={margin} plotW={plotW} plotH={plotH} delay={0.9} glowId="eq1Grad" />
                <EquilibriumDot cx={newEqX} cy={newEqY} fill={eq2Color} label="E₂" pLabel="P₂" qLabel="Q₂" margin={margin} plotW={plotW} plotH={plotH} delay={1.4} glowId="eq2Grad" />
              </svg>
            </div>

            {/* Legend */}
            <div className="relative px-5 pb-5">
              <div className="flex flex-wrap gap-2.5 text-[11px]">
                {[
                  { color: demandColor, label: "Demand", type: "line" },
                  { color: supplyColor, label: "Supply", type: "line" },
                  { color: eq1Color, label: "Original eq.", type: "dot" },
                  { color: eq2Color, label: "New eq.", type: "dot" },
                ].map(({ color, label, type }) => (
                  <span key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border border-border/30 font-medium" style={{ fontSize: 11 }}>
                    {type === "line" ? (
                      <span className="inline-block w-4 h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}dd)`, boxShadow: `0 0 4px ${color}40` }} />
                    ) : (
                      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}50` }} />
                    )}
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activePage === 1 && (
          <motion.div key="analysis" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}
            className="relative px-5 py-6 space-y-4 min-h-[320px]">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="inline-block w-1 h-5 rounded-full bg-primary/60" />
              Analysis
            </h4>
            {diagram.shift && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shift</p>
                <p className="text-sm text-foreground leading-relaxed">{diagram.shift}</p>
              </div>
            )}
            {diagram.initialEquilibrium && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Initial Equilibrium</p>
                <p className="text-sm text-foreground leading-relaxed">{diagram.initialEquilibrium}</p>
              </div>
            )}
            {diagram.newEquilibrium && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">New Equilibrium</p>
                <p className="text-sm text-foreground leading-relaxed">{diagram.newEquilibrium}</p>
              </div>
            )}
            {diagram.shadedArea && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shaded Area</p>
                <p className="text-sm text-foreground leading-relaxed">{diagram.shadedArea}</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* Page indicator labels */}
      <div className="relative flex justify-center gap-4 pb-4">
        {pageLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActivePage(i)}
            className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
              activePage === i ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Scans markdown text for diagram blocks and returns segments.
 */
export function extractDiagramBlocks(
  text: string,
  options: DiagramParseOptions = {}
): Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> {
  const segments: Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> = [];
  const lines = text.split("\n");
  let i = 0;
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length > 0) {
      segments.push({ type: "text", content: textBuffer.join("\n") });
      textBuffer = [];
    }
  };

  const isDiagramStart = (line: string) =>
    /^\s*(?![-•]\s)(?:#{2,4}\s*)?(?:\*\*)?Diagram\s*:/i.test(line);

  const isSectionHeader = (line: string) =>
    /^\s*#{1,4}\s+\S/.test(line) && !isDiagramStart(line);

  while (i < lines.length) {
    if (!isDiagramStart(lines[i])) {
      textBuffer.push(lines[i]);
      i++;
      continue;
    }

    flushText();

    const blockLines = [lines[i]];
    i++;

    while (i < lines.length) {
      if (isDiagramStart(lines[i]) || isSectionHeader(lines[i])) break;
      blockLines.push(lines[i]);
      i++;
    }

    const blockText = blockLines.join("\n");
    const parsed = parseDiagramBlock(blockText, options);
    if (parsed) {
      segments.push({ type: "diagram", diagram: parsed });
    } else {
      segments.push({ type: "text", content: blockText });
    }
  }

  flushText();

  const hasDiagram = segments.some((seg) => seg.type === "diagram");
  if (!hasDiagram && (options.fallbackType || options.contextText)) {
    const fallbackSeed = options.fallbackType ?? "supply_demand";
    const fallbackBlock = `### Diagram: ${fallbackSeed}\n- Diagram family: ${fallbackSeed}\n- X-axis: Quantity (Q)\n- Y-axis: Price (P)\n- Initial curves: D1 and S1\n- Shift: ${options.fallbackShift ?? ""}\n- Key conclusion: Use this as the reference diagram.`;
    const fallbackParsed = parseDiagramBlock(fallbackBlock, options);
    if (fallbackParsed) {
      segments.push({ type: "diagram", diagram: fallbackParsed });
    }
  }

  if (segments.length === 0) {
    segments.push({ type: "text", content: text });
  }

  return segments;
}

export { EconDiagramCanvas, parseDiagramBlock };
export type { DiagramProps };
