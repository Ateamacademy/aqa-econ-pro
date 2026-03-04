/**
 * EconDiagramSVG — renders structured diagram descriptions as visual SVG diagrams.
 * Parses "**Diagram: [Type]**" blocks from model answers and draws them.
 */

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

// Detect shift type from text
function getShiftInfo(shift: string): { curve: "supply" | "demand" | "ad" | "as"; direction: "left" | "right" } {
  const s = shift.toLowerCase();
  const isLeft = s.includes("left") || s.includes("decrease") || s.includes("inward");
  const direction: "left" | "right" = isLeft ? "left" : "right";

  if (s.includes("supply") || s.includes("sras") || s.match(/\bs[12]/)) return { curve: "supply", direction };
  if (s.includes("ad") || s.includes("aggregate demand")) return { curve: "ad", direction };
  if (s.includes("as") || s.includes("aggregate supply")) return { curve: "as", direction };
  return { curve: "demand", direction };
}

function EconDiagramCanvas({ diagram }: { diagram: DiagramProps }) {
  const W = 380;
  const H = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = W - margin.left - margin.right;
  const plotH = H - margin.top - margin.bottom;

  const shiftInfo = getShiftInfo(diagram.shift);
  const shiftOffset = shiftInfo.direction === "right" ? 50 : -50;

  // Demand curve: top-left to bottom-right
  const demandY1 = margin.top + 15;
  const demandY2 = margin.top + plotH - 15;
  const demandX1 = margin.left + 30;
  const demandX2 = margin.left + plotW - 30;

  // Supply curve: bottom-left to top-right
  const supplyY1 = margin.top + plotH - 15;
  const supplyY2 = margin.top + 15;
  const supplyX1 = margin.left + 30;
  const supplyX2 = margin.left + plotW - 30;

  // Original equilibrium (intersection roughly in center)
  const eqX = margin.left + plotW * 0.45;
  const eqY = margin.top + plotH * 0.45;

  // New equilibrium based on shift
  let newEqX = eqX;
  let newEqY = eqY;

  if (shiftInfo.curve === "supply" || shiftInfo.curve === "as") {
    if (shiftInfo.direction === "left") {
      newEqX = eqX - 25;
      newEqY = eqY - 20;
    } else {
      newEqX = eqX + 25;
      newEqY = eqY + 20;
    }
  } else {
    if (shiftInfo.direction === "right") {
      newEqX = eqX + 25;
      newEqY = eqY - 20;
    } else {
      newEqX = eqX - 25;
      newEqY = eqY + 20;
    }
  }

  const isDemandShift = shiftInfo.curve === "demand" || shiftInfo.curve === "ad";
  const isSupplyShift = shiftInfo.curve === "supply" || shiftInfo.curve === "as";

  return (
    <div className="my-4 bg-background border border-border rounded-xl p-4 shadow-sm">
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
        📊 Model Diagram: {diagram.type}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[420px] h-auto">
        {/* Background */}
        <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="hsl(var(--muted))" rx="4" opacity="0.3" />

        {/* Axes */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotH} stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW} y2={margin.top + plotH} stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Axis labels */}
        <text x={margin.left - 8} y={margin.top + plotH / 2} textAnchor="middle" transform={`rotate(-90 ${margin.left - 8} ${margin.top + plotH / 2})`} className="fill-foreground text-[11px] font-semibold">
          {diagram.yAxis}
        </text>
        <text x={margin.left + plotW / 2} y={H - 5} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {diagram.xAxis}
        </text>

        {/* Arrow heads on axes */}
        <polygon points={`${margin.left - 4},${margin.top + 8} ${margin.left},${margin.top - 2} ${margin.left + 4},${margin.top + 8}`} className="fill-foreground" />
        <polygon points={`${margin.left + plotW - 8},${margin.top + plotH - 4} ${margin.left + plotW + 2},${margin.top + plotH} ${margin.left + plotW - 8},${margin.top + plotH + 4}`} className="fill-foreground" />

        {/* Original Demand curve (D₁) — blue */}
        <line x1={demandX1} y1={demandY1} x2={demandX2} y2={demandY2} stroke="#3b82f6" strokeWidth="2.5" />
        <text x={demandX2 + 4} y={demandY2 + 4} className="text-[10px] font-bold" fill="#3b82f6">D₁</text>

        {/* Shifted Demand curve (D₂) if demand shifts */}
        {isDemandShift && (
          <>
            <line x1={demandX1 + shiftOffset} y1={demandY1} x2={demandX2 + shiftOffset} y2={demandY2} stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,3" />
            <text x={demandX2 + shiftOffset + 4} y={demandY2 + 4} className="text-[10px] font-bold" fill="#3b82f6">D₂</text>
            {/* Shift arrow */}
            <line x1={demandX1 + plotW * 0.3} y1={demandY1 + plotH * 0.3} x2={demandX1 + plotW * 0.3 + shiftOffset * 0.6} y2={demandY1 + plotH * 0.3} stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowBlue)" opacity="0.7" />
          </>
        )}

        {/* Original Supply curve (S₁) — red */}
        <line x1={supplyX1} y1={supplyY1} x2={supplyX2} y2={supplyY2} stroke="#ef4444" strokeWidth="2.5" />
        <text x={supplyX2 + 4} y={supplyY2 + 4} className="text-[10px] font-bold" fill="#ef4444">S₁</text>

        {/* Shifted Supply curve (S₂) if supply shifts */}
        {isSupplyShift && (
          <>
            <line x1={supplyX1 + shiftOffset} y1={supplyY1} x2={supplyX2 + shiftOffset} y2={supplyY2} stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,3" />
            <text x={supplyX2 + shiftOffset + 4} y={supplyY2 + 4} className="text-[10px] font-bold" fill="#ef4444">S₂</text>
            {/* Shift arrow */}
            <line x1={supplyX1 + plotW * 0.3} y1={supplyY1 - plotH * 0.3} x2={supplyX1 + plotW * 0.3 + shiftOffset * 0.6} y2={supplyY1 - plotH * 0.3} stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" opacity="0.7" />
          </>
        )}

        {/* Original equilibrium point E₁ */}
        <circle cx={eqX} cy={eqY} r="4" fill="#16a34a" stroke="white" strokeWidth="1.5" />
        <text x={eqX + 8} y={eqY - 6} className="text-[10px] font-bold" fill="#16a34a">E₁</text>

        {/* Dotted lines from E₁ to axes */}
        <line x1={margin.left} y1={eqY} x2={eqX} y2={eqY} stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        <line x1={eqX} y1={eqY} x2={eqX} y2={margin.top + plotH} stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        <text x={margin.left - 4} y={eqY + 3} textAnchor="end" className="text-[9px]" fill="#16a34a">P₁</text>
        <text x={eqX} y={margin.top + plotH + 12} textAnchor="middle" className="text-[9px]" fill="#16a34a">Q₁</text>

        {/* New equilibrium point E₂ */}
        <circle cx={newEqX} cy={newEqY} r="4" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
        <text x={newEqX + 8} y={newEqY - 6} className="text-[10px] font-bold" fill="#f59e0b">E₂</text>

        {/* Dotted lines from E₂ to axes */}
        <line x1={margin.left} y1={newEqY} x2={newEqX} y2={newEqY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        <line x1={newEqX} y1={newEqY} x2={newEqX} y2={margin.top + plotH} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        <text x={margin.left - 4} y={newEqY + 3} textAnchor="end" className="text-[9px]" fill="#f59e0b">P₂</text>
        <text x={newEqX} y={margin.top + plotH + 12} textAnchor="middle" className="text-[9px]" fill="#f59e0b">Q₂</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0,0 8,3 0,6" fill="#3b82f6" />
          </marker>
          <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0,0 8,3 0,6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      {/* Conclusion text */}
      {diagram.conclusion && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          <strong className="text-foreground">Conclusion:</strong> {diagram.conclusion}
        </p>
      )}
      {diagram.shadedArea && (
        <p className="text-xs text-muted-foreground mt-1 italic">
          <strong className="text-foreground">Shaded area:</strong> {diagram.shadedArea}
        </p>
      )}
    </div>
  );
}

/**
 * Scans markdown text for diagram blocks and returns segments:
 * either plain text or parsed diagram objects.
 */
export function extractDiagramBlocks(text: string): Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> {
  const segments: Array<{ type: "text"; content: string } | { type: "diagram"; diagram: DiagramProps }> = [];

  // Match "**Diagram: ..." blocks that span multiple bullet lines
  const diagramRegex = /\*?\*?Diagram:\s*.+?\*?\*?\s*\n([\s\S]*?)(?=\n(?:\*?\*?Diagram:|\n##|\n\*\*[A-Z])|\n\n\n|$)/gi;
  let lastIndex = 0;
  let match;

  while ((match = diagramRegex.exec(text)) !== null) {
    const fullMatch = match[0];
    const startIdx = match.index;

    // Add text before this diagram
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

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  // If no diagrams found, return everything as text
  if (segments.length === 0) {
    segments.push({ type: "text", content: text });
  }

  return segments;
}

export { EconDiagramCanvas, parseDiagramBlock };
export type { DiagramProps };
