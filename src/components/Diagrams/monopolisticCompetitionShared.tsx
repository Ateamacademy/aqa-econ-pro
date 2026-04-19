export type RunMode = "short-run" | "long-run";

export const MONOP_COMP_COLORS = {
  surface: "hsl(var(--card))",
  panel: "hsl(var(--background) / 0.32)",
  border: "hsl(var(--border) / 0.9)",
  text: "hsl(var(--foreground))",
  muted: "hsl(var(--muted-foreground))",
  shortRun: "hsl(var(--electric-blue))",
  longRun: "hsl(var(--indigo-glow))",
  marginalCost: "hsl(var(--warning))",
  averageCost: "hsl(var(--success))",
  accent: "hsl(var(--accent))",
  danger: "hsl(var(--destructive))",
  profitFill: "hsl(var(--success) / 0.2)",
  profitText: "hsl(var(--success))",
  ghost: "hsl(var(--electric-blue) / 0.2)",
  callout: "hsl(var(--card) / 0.92)",
  calloutText: "hsl(var(--foreground))",
  yellowCallout: "hsl(var(--warning) / 0.22)",
} as const;

export const SHARED_COST_PATHS = {
  mc: "M 160 560 C 230 640, 320 615, 395 500 C 455 395, 520 210, 650 105",
  ac: "M 145 470 C 240 555, 360 585, 490 500 C 585 438, 690 320, 775 210",
} as const;

export const SHARED_MARKERS = {
  acMinX: 490,
  acMinY: 500,
  axisLeft: 110,
  axisBottom: 650,
} as const;

export const svgLabelStyle = {
  fontFamily: "Inter, system-ui, sans-serif",
};