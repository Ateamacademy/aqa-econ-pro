import React from "react";

interface SmartXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
  fill?: string;
  fontSize?: number;
  maxChars?: number;
  rotateThreshold?: number;
}

/**
 * Recharts custom tick for XAxis that rotates labels 45° when text > threshold chars.
 * Truncates only as last resort; tooltip shows full text via Recharts Tooltip.
 */
export default function SmartXAxisTick({
  x = 0,
  y = 0,
  payload,
  fill = "hsl(var(--muted-foreground))",
  fontSize = 10,
  maxChars = 24,
  rotateThreshold = 12,
}: SmartXAxisTickProps) {
  const text = payload?.value ?? "";
  const needsRotation = text.length > rotateThreshold;
  const display = text.length > maxChars ? text.slice(0, maxChars - 1) + "…" : text;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor={needsRotation ? "end" : "middle"}
        fill={fill}
        fontSize={fontSize}
        transform={needsRotation ? "rotate(-45)" : undefined}
      >
        {display}
      </text>
    </g>
  );
}
