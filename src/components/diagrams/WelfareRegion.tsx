/**
 * WelfareRegion — Reusable closed SVG polygon for welfare loss/gain areas.
 * Renders a mathematically precise closed boundary from intersection points.
 * Used across both Diagram and Predicted Paper sections for consistency.
 */

interface WelfareRegionProps {
  /** Ordered list of {x, y} points forming the closed boundary */
  points: { x: number; y: number }[];
  /** Fill color — use standard exam colors: red=#ef4444, blue=#3b82f6, green=#16a34a */
  fill: string;
  /** Fill opacity (0-1). Default 0.35 for high visibility */
  fillOpacity?: number;
  /** Stroke color — defaults to fill color */
  stroke?: string;
  /** Stroke width — defaults to 2.5 for bold closed boundary */
  strokeWidth?: number;
  /** Optional label text rendered at centroid */
  label?: string;
  /** Label font size */
  labelSize?: number;
}

export function WelfareRegion({
  points,
  fill,
  fillOpacity = 0.35,
  stroke,
  strokeWidth = 2.5,
  label,
  labelSize = 10,
}: WelfareRegionProps) {
  if (points.length < 3) return null;

  const pointsStr = points.map(p => `${p.x},${p.y}`).join(" ");

  // Compute centroid for label placement
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  return (
    <g>
      <polygon
        points={pointsStr}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke ?? fill}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {label && (
        <>
          <rect
            x={cx - (label.length * labelSize * 0.32)}
            y={cy - labelSize / 2 - 2}
            width={label.length * labelSize * 0.64}
            height={labelSize + 4}
            rx={3}
            fill="hsl(var(--card))"
            opacity={0.85}
          />
          <text
            x={cx}
            y={cy + labelSize * 0.35}
            fill={stroke ?? fill}
            fontSize={labelSize}
            fontWeight={700}
            textAnchor="middle"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
}
