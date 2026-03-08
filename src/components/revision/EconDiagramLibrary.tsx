/**
 * Predefined SVG Economics Diagram Templates
 * 
 * The AI selects a diagram_type and the platform renders it.
 * No more ASCII art — clean, labelled, textbook-quality SVGs.
 */

import { cn } from "@/lib/utils";

export type DiagramType =
  | "supply_demand"
  | "demand_increase"
  | "demand_decrease"
  | "supply_increase"
  | "supply_decrease"
  | "positive_externality"
  | "negative_externality"
  | "negative_production_externality"
  | "positive_production_externality"
  | "ad_increase"
  | "ad_decrease"
  | "sras_decrease"
  | "sras_increase"
  | "ped_elastic"
  | "ped_inelastic"
  | "ppf"
  | "ppf_growth"
  | "phillips_curve"
  | "tax_incidence"
  | "subsidy"
  | "price_floor"
  | "price_ceiling"
  | "monopoly"
  | "perfect_competition";

interface DiagramConfig {
  title: string;
  xAxis: string;
  yAxis: string;
  render: (p: DrawParams) => JSX.Element;
}

interface DrawParams {
  W: number; H: number;
  mx: number; my: number; pw: number; ph: number;
}

const COLORS = {
  demand: "#3b82f6",     // blue
  supply: "#ef4444",     // red
  shifted: "#f59e0b",    // amber
  eq: "#16a34a",         // green
  area: "#8b5cf6",       // purple
  msc: "#ef4444",
  msb: "#3b82f6",
  mpb: "#93c5fd",
  mpc: "#fca5a5",
};

function Line({ x1, y1, x2, y2, color, dashed, width = 2.5 }: {
  x1: number; y1: number; x2: number; y2: number; color: string; dashed?: boolean; width?: number;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "6,3" : undefined} />;
}

function Label({ x, y, text, color, size = 10, anchor = "start" }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string;
}) {
  return <text x={x} y={y} fill={color} textAnchor={anchor} fontSize={size} fontWeight="bold">{text}</text>;
}

function Dot({ x, y, color, label, labelPos = "tr" }: {
  x: number; y: number; color: string; label: string; labelPos?: "tr" | "tl" | "br";
}) {
  const dx = labelPos === "tl" ? -8 : 8;
  const dy = labelPos === "br" ? 14 : -6;
  return (
    <>
      <circle cx={x} cy={y} r={4} fill={color} stroke="white" strokeWidth={1.5} />
      <Label x={x + dx} y={y + dy} text={label} color={color} />
    </>
  );
}

function DashedToAxes({ x, y, mx, ph, my, color, pLabel, qLabel }: {
  x: number; y: number; mx: number; ph: number; my: number; color: string; pLabel: string; qLabel: string;
}) {
  return (
    <>
      <Line x1={mx} y1={y} x2={x} y2={y} color={color} width={1} dashed />
      <Line x1={x} y1={y} x2={x} y2={my + ph} color={color} width={1} dashed />
      <Label x={mx - 4} y={y + 3} text={pLabel} color={color} size={9} anchor="end" />
      <Label x={x} y={my + ph + 12} text={qLabel} color={color} size={9} anchor="middle" />
    </>
  );
}

function Axes({ mx, my, pw, ph, xLabel, yLabel }: {
  mx: number; my: number; pw: number; ph: number; xLabel: string; yLabel: string;
}) {
  return (
    <>
      <line x1={mx} y1={my} x2={mx} y2={my + ph} stroke="currentColor" strokeWidth={2} />
      <line x1={mx} y1={my + ph} x2={mx + pw} y2={my + ph} stroke="currentColor" strokeWidth={2} />
      <polygon points={`${mx - 4},${my + 8} ${mx},${my - 2} ${mx + 4},${my + 8}`} fill="currentColor" />
      <polygon points={`${mx + pw - 8},${my + ph - 4} ${mx + pw + 2},${my + ph} ${mx + pw - 8},${my + ph + 4}`} fill="currentColor" />
      <text x={mx - 8} y={my + ph / 2} textAnchor="middle" transform={`rotate(-90 ${mx - 8} ${my + ph / 2})`} fontSize={11} fontWeight={600} fill="currentColor">{yLabel}</text>
      <text x={mx + pw / 2} y={my + ph + 30} textAnchor="middle" fontSize={11} fontWeight={600} fill="currentColor">{xLabel}</text>
    </>
  );
}

/* ── Diagram Definitions ── */

const supplyDemandBase = (p: DrawParams, shiftCurve?: "demand" | "supply", shiftDir?: "left" | "right") => {
  const { mx, my, pw, ph } = p;
  const offset = shiftDir === "right" ? 50 : shiftDir === "left" ? -50 : 0;
  
  // Demand: top-left to bottom-right
  const d = { x1: mx + 30, y1: my + 15, x2: mx + pw - 30, y2: my + ph - 15 };
  // Supply: bottom-left to top-right
  const s = { x1: mx + 30, y1: my + ph - 15, x2: mx + pw - 30, y2: my + 15 };
  
  const eqX = mx + pw * 0.45;
  const eqY = my + ph * 0.45;
  
  let newX = eqX, newY = eqY;
  if (shiftCurve === "supply") {
    newX = eqX + (shiftDir === "left" ? -25 : 25);
    newY = eqY + (shiftDir === "left" ? -20 : 20);
  } else if (shiftCurve === "demand") {
    newX = eqX + (shiftDir === "right" ? 25 : -25);
    newY = eqY + (shiftDir === "right" ? -20 : 20);
  }
  
  return (
    <>
      <Line {...d} color={COLORS.demand} />
      <Label x={d.x2 + 4} y={d.y2 + 4} text="D₁" color={COLORS.demand} />
      
      {shiftCurve === "demand" && (
        <>
          <Line x1={d.x1 + offset} y1={d.y1} x2={d.x2 + offset} y2={d.y2} color={COLORS.demand} dashed />
          <Label x={d.x2 + offset + 4} y={d.y2 + 4} text="D₂" color={COLORS.demand} />
        </>
      )}
      
      <Line {...s} color={COLORS.supply} />
      <Label x={s.x2 + 4} y={s.y2 + 4} text="S₁" color={COLORS.supply} />
      
      {shiftCurve === "supply" && (
        <>
          <Line x1={s.x1 + offset} y1={s.y1} x2={s.x2 + offset} y2={s.y2} color={COLORS.supply} dashed />
          <Label x={s.x2 + offset + 4} y={s.y2 + 4} text="S₂" color={COLORS.supply} />
        </>
      )}
      
      <DashedToAxes x={eqX} y={eqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
      <Dot x={eqX} y={eqY} color={COLORS.eq} label="E₁" />
      
      {shiftCurve && (
        <>
          <DashedToAxes x={newX} y={newY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Dot x={newX} y={newY} color={COLORS.shifted} label="E₂" />
        </>
      )}
    </>
  );
};

const DIAGRAMS: Record<string, DiagramConfig> = {
  supply_demand: {
    title: "Supply & Demand Equilibrium",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => <>{supplyDemandBase(p)}</>,
  },
  demand_increase: {
    title: "Increase in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => <>{supplyDemandBase(p, "demand", "right")}</>,
  },
  demand_decrease: {
    title: "Decrease in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => <>{supplyDemandBase(p, "demand", "left")}</>,
  },
  supply_increase: {
    title: "Increase in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => <>{supplyDemandBase(p, "supply", "right")}</>,
  },
  supply_decrease: {
    title: "Decrease in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => <>{supplyDemandBase(p, "supply", "left")}</>,
  },
  positive_externality: {
    title: "Positive Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const sX1 = mx + 30, sY1 = my + ph - 15, sX2 = mx + pw - 30, sY2 = my + 15;
      // MPB line
      const mpbX1 = mx + 30, mpbY1 = my + 15, mpbX2 = mx + pw - 50, mpbY2 = my + ph - 30;
      // MSB line (to the right of MPB)
      const msbX1 = mx + 60, msbY1 = my + 15, msbX2 = mx + pw - 20, msbY2 = my + ph - 30;
      
      const freeEqX = mx + pw * 0.38, freeEqY = my + ph * 0.42;
      const optEqX = mx + pw * 0.52, optEqY = my + ph * 0.35;
      
      return (
        <>
          <Line x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} />
          <Label x={sX2 + 4} y={sY2 + 4} text="S = MPC" color={COLORS.supply} />
          
          <Line x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} />
          <Label x={mpbX2 + 4} y={mpbY2 + 4} text="D = MPB" color={COLORS.mpb} />
          
          <Line x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} dashed />
          <Label x={msbX2 + 4} y={msbY2 + 4} text="MSB" color={COLORS.demand} />
          
          {/* Welfare loss area */}
          <polygon
            points={`${freeEqX},${freeEqY} ${optEqX},${optEqY} ${mx + pw * 0.45},${my + ph * 0.55}`}
            fill={COLORS.area} fillOpacity={0.15} stroke={COLORS.area} strokeWidth={1} strokeDasharray="3,3"
          />
          <Label x={mx + pw * 0.42} y={my + ph * 0.48} text="Welfare" color={COLORS.area} size={8} anchor="middle" />
          <Label x={mx + pw * 0.42} y={my + ph * 0.53} text="Loss" color={COLORS.area} size={8} anchor="middle" />
          
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <Dot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" />
          
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <Dot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" />
        </>
      );
    },
  },
  negative_externality: {
    title: "Negative Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const sX1 = mx + 30, sY1 = my + ph - 15, sX2 = mx + pw - 30, sY2 = my + 15;
      // MPB (higher, to the right)
      const mpbX1 = mx + 60, mpbY1 = my + 15, mpbX2 = mx + pw - 20, mpbY2 = my + ph - 30;
      // MSB (lower, to the left of MPB)
      const msbX1 = mx + 30, msbY1 = my + 15, msbX2 = mx + pw - 50, msbY2 = my + ph - 30;
      
      const freeEqX = mx + pw * 0.52, freeEqY = my + ph * 0.35;
      const optEqX = mx + pw * 0.38, optEqY = my + ph * 0.42;
      
      return (
        <>
          <Line x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} />
          <Label x={sX2 + 4} y={sY2 + 4} text="S = MPC" color={COLORS.supply} />
          
          <Line x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} />
          <Label x={mpbX2 + 4} y={mpbY2 + 4} text="D = MPB" color={COLORS.mpb} />
          
          <Line x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} dashed />
          <Label x={msbX2 + 4} y={msbY2 + 4} text="MSB" color={COLORS.demand} />
          
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.45},${my + ph * 0.55}`}
            fill={COLORS.area} fillOpacity={0.15} stroke={COLORS.area} strokeWidth={1} strokeDasharray="3,3"
          />
          <Label x={mx + pw * 0.45} y={my + ph * 0.48} text="Welfare" color={COLORS.area} size={8} anchor="middle" />
          <Label x={mx + pw * 0.45} y={my + ph * 0.53} text="Loss" color={COLORS.area} size={8} anchor="middle" />
          
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <Dot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" />
          
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <Dot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" />
        </>
      );
    },
  },
  negative_production_externality: {
    title: "Negative Production Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // MPC (lower supply)
      const mpcX1 = mx + 30, mpcY1 = my + ph - 15, mpcX2 = mx + pw - 20, mpcY2 = my + 25;
      // MSC (higher, to the left)
      const mscX1 = mx + 60, mscY1 = my + ph - 15, mscX2 = mx + pw - 20, mscY2 = my + 5;
      // Demand
      const dX1 = mx + 30, dY1 = my + 15, dX2 = mx + pw - 30, dY2 = my + ph - 15;
      
      const freeEqX = mx + pw * 0.48, freeEqY = my + ph * 0.40;
      const optEqX = mx + pw * 0.38, optEqY = my + ph * 0.35;
      
      return (
        <>
          <Line x1={mpcX1} y1={mpcY1} x2={mpcX2} y2={mpcY2} color={COLORS.mpc} />
          <Label x={mpcX2 + 4} y={mpcY2 + 4} text="S = MPC" color={COLORS.mpc} />
          
          <Line x1={mscX1} y1={mscY1} x2={mscX2} y2={mscY2} color={COLORS.msc} dashed />
          <Label x={mscX2 + 4} y={mscY2 - 4} text="MSC" color={COLORS.msc} />
          
          <Line x1={dX1} y1={dY1} x2={dX2} y2={dY2} color={COLORS.demand} />
          <Label x={dX2 + 4} y={dY2 + 4} text="D = MSB" color={COLORS.demand} />
          
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.43},${my + ph * 0.28}`}
            fill={COLORS.area} fillOpacity={0.15} stroke={COLORS.area} strokeWidth={1} strokeDasharray="3,3"
          />
          
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <Dot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" />
          
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <Dot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" />
        </>
      );
    },
  },
  ad_increase: {
    title: "Increase in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // LRAS vertical
      const lrasX = mx + pw * 0.65;
      // SRAS upward sloping
      const srasX1 = mx + 20, srasY1 = my + ph - 20, srasX2 = mx + pw - 20, srasY2 = my + 30;
      // AD1
      const ad1X1 = mx + 20, ad1Y1 = my + 20, ad1X2 = mx + pw * 0.6, ad1Y2 = my + ph - 20;
      // AD2 (shifted right)
      const ad2X1 = mx + 60, ad2Y1 = my + 20, ad2X2 = mx + pw * 0.8, ad2Y2 = my + ph - 20;
      
      const eq1X = mx + pw * 0.38, eq1Y = my + ph * 0.48;
      const eq2X = mx + pw * 0.50, eq2Y = my + ph * 0.38;
      
      return (
        <>
          <Line x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color="#6b7280" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color="#6b7280" />
          
          <Line x1={srasX1} y1={srasY1} x2={srasX2} y2={srasY2} color={COLORS.supply} />
          <Label x={srasX2 + 4} y={srasY2 + 4} text="SRAS" color={COLORS.supply} />
          
          <Line x1={ad1X1} y1={ad1Y1} x2={ad1X2} y2={ad1Y2} color={COLORS.demand} />
          <Label x={ad1X2 + 4} y={ad1Y2 + 4} text="AD₁" color={COLORS.demand} />
          
          <Line x1={ad2X1} y1={ad2Y1} x2={ad2X2} y2={ad2Y2} color={COLORS.demand} dashed />
          <Label x={ad2X2 + 4} y={ad2Y2 + 4} text="AD₂" color={COLORS.demand} />
          
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <Dot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" />
          
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <Dot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" />
        </>
      );
    },
  },
  ad_decrease: {
    title: "Decrease in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.65;
      const srasX1 = mx + 20, srasY1 = my + ph - 20, srasX2 = mx + pw - 20, srasY2 = my + 30;
      const ad1X1 = mx + 60, ad1Y1 = my + 20, ad1X2 = mx + pw * 0.8, ad1Y2 = my + ph - 20;
      const ad2X1 = mx + 20, ad2Y1 = my + 20, ad2X2 = mx + pw * 0.6, ad2Y2 = my + ph - 20;
      
      const eq1X = mx + pw * 0.50, eq1Y = my + ph * 0.38;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.48;
      
      return (
        <>
          <Line x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color="#6b7280" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color="#6b7280" />
          <Line x1={srasX1} y1={srasY1} x2={srasX2} y2={srasY2} color={COLORS.supply} />
          <Label x={srasX2 + 4} y={srasY2 + 4} text="SRAS" color={COLORS.supply} />
          <Line x1={ad1X1} y1={ad1Y1} x2={ad1X2} y2={ad1Y2} color={COLORS.demand} />
          <Label x={ad1X2 + 4} y={ad1Y2 + 4} text="AD₁" color={COLORS.demand} />
          <Line x1={ad2X1} y1={ad2Y1} x2={ad2X2} y2={ad2Y2} color={COLORS.demand} dashed />
          <Label x={ad2X2 + 4} y={ad2Y2 + 4} text="AD₂" color={COLORS.demand} />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <Dot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <Dot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" />
        </>
      );
    },
  },
  sras_decrease: {
    title: "Decrease in SRAS (Cost-Push Inflation)",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.65;
      const sras1X1 = mx + 20, sras1Y1 = my + ph - 20, sras1X2 = mx + pw - 20, sras1Y2 = my + 30;
      const sras2X1 = mx + 50, sras2Y1 = my + ph - 20, sras2X2 = mx + pw - 20, sras2Y2 = my + 10;
      const adX1 = mx + 30, adY1 = my + 20, adX2 = mx + pw * 0.7, adY2 = my + ph - 20;
      const eq1X = mx + pw * 0.45, eq1Y = my + ph * 0.42;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.32;
      return (
        <>
          <Line x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color="#6b7280" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color="#6b7280" />
          <Line x1={sras1X1} y1={sras1Y1} x2={sras1X2} y2={sras1Y2} color={COLORS.supply} />
          <Label x={sras1X2 + 4} y={sras1Y2 + 4} text="SRAS₁" color={COLORS.supply} />
          <Line x1={sras2X1} y1={sras2Y1} x2={sras2X2} y2={sras2Y2} color={COLORS.supply} dashed />
          <Label x={sras2X2 + 4} y={sras2Y2 + 4} text="SRAS₂" color={COLORS.supply} />
          <Line x1={adX1} y1={adY1} x2={adX2} y2={adY2} color={COLORS.demand} />
          <Label x={adX2 + 4} y={adY2 + 4} text="AD" color={COLORS.demand} />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <Dot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <Dot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" />
        </>
      );
    },
  },
  tax_incidence: {
    title: "Effect of an Indirect Tax",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const dX1 = mx + 30, dY1 = my + 15, dX2 = mx + pw - 30, dY2 = my + ph - 15;
      const s1X1 = mx + 30, s1Y1 = my + ph - 15, s1X2 = mx + pw - 30, s1Y2 = my + 15;
      const s2X1 = mx + 60, s2Y1 = my + ph - 15, s2X2 = mx + pw - 10, s2Y2 = my + 15;
      const eq1X = mx + pw * 0.45, eq1Y = my + ph * 0.45;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.38;
      
      return (
        <>
          <Line x1={dX1} y1={dY1} x2={dX2} y2={dY2} color={COLORS.demand} />
          <Label x={dX2 + 4} y={dY2 + 4} text="D" color={COLORS.demand} />
          <Line x1={s1X1} y1={s1Y1} x2={s1X2} y2={s1Y2} color={COLORS.supply} />
          <Label x={s1X2 + 4} y={s1Y2 + 4} text="S₁" color={COLORS.supply} />
          <Line x1={s2X1} y1={s2Y1} x2={s2X2} y2={s2Y2} color={COLORS.supply} dashed />
          <Label x={s2X2 + 4} y={s2Y2 + 4} text="S₁ + Tax" color={COLORS.supply} />
          
          {/* Tax revenue rectangle */}
          <rect x={eq2X - 5} y={eq2Y} width={eq1X - eq2X + 10} height={20}
            fill={COLORS.area} fillOpacity={0.12} stroke={COLORS.area} strokeWidth={1} strokeDasharray="3,3" />
          <Label x={mx + pw * 0.41} y={eq2Y + 14} text="Tax Revenue" color={COLORS.area} size={8} anchor="middle" />
          
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <Dot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Dot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" />
        </>
      );
    },
  },
  ppf: {
    title: "Production Possibility Frontier",
    xAxis: "Good B", yAxis: "Good A",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const cx = mx + pw * 0.85, cy = my + ph * 0.15;
      const startX = mx + 10, startY = my + 15;
      const endX = mx + pw - 15, endY = my + ph - 10;
      return (
        <>
          <path
            d={`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`}
            fill="none" stroke={COLORS.demand} strokeWidth={2.5}
          />
          <Label x={mx + pw * 0.55} y={my + 25} text="PPF" color={COLORS.demand} />
          {/* Point on curve */}
          <Dot x={mx + pw * 0.45} y={my + ph * 0.32} color={COLORS.eq} label="A (efficient)" />
          {/* Point inside */}
          <Dot x={mx + pw * 0.35} y={my + ph * 0.55} color={COLORS.shifted} label="B (inefficient)" />
        </>
      );
    },
  },
  ppf_growth: {
    title: "Economic Growth (PPF Shift)",
    xAxis: "Good B", yAxis: "Good A",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <path
            d={`M ${mx + 10} ${my + 20} Q ${mx + pw * 0.75} ${my + ph * 0.15} ${mx + pw * 0.7} ${my + ph - 10}`}
            fill="none" stroke={COLORS.demand} strokeWidth={2.5}
          />
          <Label x={mx + pw * 0.45} y={my + 30} text="PPF₁" color={COLORS.demand} />
          <path
            d={`M ${mx + 10} ${my + 10} Q ${mx + pw * 0.9} ${my + ph * 0.1} ${mx + pw * 0.85} ${my + ph - 10}`}
            fill="none" stroke={COLORS.demand} strokeWidth={2.5} strokeDasharray="6,3"
          />
          <Label x={mx + pw * 0.6} y={my + 18} text="PPF₂" color={COLORS.shifted} />
        </>
      );
    },
  },
  phillips_curve: {
    title: "Short-Run Phillips Curve",
    xAxis: "Unemployment Rate (%)", yAxis: "Inflation Rate (%)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <path
            d={`M ${mx + 30} ${my + 20} Q ${mx + pw * 0.3} ${my + ph * 0.5} ${mx + pw - 30} ${my + ph - 30}`}
            fill="none" stroke={COLORS.demand} strokeWidth={2.5}
          />
          <Label x={mx + pw - 25} y={my + ph - 15} text="SRPC" color={COLORS.demand} />
          <Dot x={mx + pw * 0.3} y={my + ph * 0.3} color={COLORS.eq} label="Low unemployment, high inflation" />
          <Dot x={mx + pw * 0.65} y={my + ph * 0.65} color={COLORS.shifted} label="High unemployment, low inflation" />
        </>
      );
    },
  },
  ped_elastic: {
    title: "Price Elastic Demand (PED > 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // Flat demand curve
      return (
        <>
          <Line x1={mx + 20} y1={my + ph * 0.25} x2={mx + pw - 20} y2={my + ph * 0.55} color={COLORS.demand} />
          <Label x={mx + pw - 15} y={my + ph * 0.55 + 12} text="D (elastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.35} y={my + ph * 0.33} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.6} y={my + ph * 0.42} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.5} y={my + ph * 0.7} text="Small ΔP → Large ΔQ" color={COLORS.area} size={10} anchor="middle" />
        </>
      );
    },
  },
  ped_inelastic: {
    title: "Price Inelastic Demand (PED < 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // Steep demand curve
      return (
        <>
          <Line x1={mx + pw * 0.35} y1={my + 15} x2={mx + pw * 0.55} y2={my + ph - 15} color={COLORS.demand} />
          <Label x={mx + pw * 0.55 + 4} y={my + ph - 10} text="D (inelastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.40} y={my + ph * 0.3} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.47} y={my + ph * 0.55} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.5} y={my + ph * 0.8} text="Large ΔP → Small ΔQ" color={COLORS.area} size={10} anchor="middle" />
        </>
      );
    },
  },
  monopoly: {
    title: "Monopoly Profit Maximisation",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Revenue",
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // MC upward sloping
      const mcX1 = mx + pw * 0.2, mcY1 = my + ph - 30, mcX2 = mx + pw - 20, mcY2 = my + 30;
      // AR (demand) downward
      const arX1 = mx + 20, arY1 = my + 20, arX2 = mx + pw - 20, arY2 = my + ph - 20;
      // MR below AR, steeper
      const mrX1 = mx + 20, mrY1 = my + 20, mrX2 = mx + pw * 0.55, mrY2 = my + ph - 20;
      
      const profitMaxX = mx + pw * 0.38;
      const priceY = my + ph * 0.3;
      const costY = my + ph * 0.5;
      
      return (
        <>
          <Line x1={mcX1} y1={mcY1} x2={mcX2} y2={mcY2} color={COLORS.supply} />
          <Label x={mcX2 + 4} y={mcY2 + 4} text="MC" color={COLORS.supply} />
          
          <Line x1={arX1} y1={arY1} x2={arX2} y2={arY2} color={COLORS.demand} />
          <Label x={arX2 + 4} y={arY2 + 4} text="AR = D" color={COLORS.demand} />
          
          <Line x1={mrX1} y1={mrY1} x2={mrX2} y2={mrY2} color={COLORS.demand} dashed />
          <Label x={mrX2 + 4} y={mrY2 + 4} text="MR" color={COLORS.demand} />
          
          {/* Supernormal profit area */}
          <rect x={mx} y={priceY} width={profitMaxX - mx} height={costY - priceY}
            fill={COLORS.area} fillOpacity={0.12} />
          <Label x={mx + (profitMaxX - mx) / 2} y={(priceY + costY) / 2 + 4} text="Supernormal Profit" color={COLORS.area} size={8} anchor="middle" />
          
          <DashedToAxes x={profitMaxX} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          <Dot x={profitMaxX} y={priceY} color={COLORS.eq} label="MC=MR" />
        </>
      );
    },
  },
};

// Alias mappings for flexible AI output
const ALIASES: Record<string, string> = {
  "positive_consumption_externality": "positive_externality",
  "negative_consumption_externality": "negative_externality",
  "externality_positive": "positive_externality",
  "externality_negative": "negative_externality",
  "ad_as": "ad_increase",
  "adas": "ad_increase",
  "aggregate_demand_increase": "ad_increase",
  "aggregate_demand_decrease": "ad_decrease",
  "cost_push": "sras_decrease",
  "cost_push_inflation": "sras_decrease",
  "demand_pull": "ad_increase",
  "demand_pull_inflation": "ad_increase",
  "indirect_tax": "tax_incidence",
  "taxation": "tax_incidence",
  "tax": "tax_incidence",
  "production_possibility": "ppf",
  "production_possibility_frontier": "ppf",
  "production_possibility_curve": "ppf",
  "economic_growth": "ppf_growth",
  "growth": "ppf_growth",
  "elastic": "ped_elastic",
  "inelastic": "ped_inelastic",
  "price_elasticity": "ped_elastic",
  "monopoly_profit": "monopoly",
  "profit_maximisation": "monopoly",
};

export function resolveDiagramType(raw: string): DiagramType | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  if (key in DIAGRAMS) return key as DiagramType;
  if (key in ALIASES) return ALIASES[key] as DiagramType;
  return null;
}

export function EconDiagramTemplate({ type, className }: { type: DiagramType; className?: string }) {
  const config = DIAGRAMS[type];
  if (!config) return null;
  
  const W = 420, H = 320;
  const mx = 55, my = 20, pw = W - mx - 25, ph = H - my - 45;
  
  return (
    <div className={cn("my-4 rounded-xl border-2 border-[hsl(var(--chart-2)/.3)] bg-[hsl(var(--chart-2)/.05)] p-4 shadow-sm", className)}>
      <p className="text-xs font-bold uppercase tracking-wide mb-3 text-[hsl(var(--chart-2))]">
        📊 {config.title}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[460px] h-auto text-foreground">
        <Axes mx={mx} my={my} pw={pw} ph={ph} xLabel={config.xAxis} yLabel={config.yAxis} />
        {config.render({ W, H, mx, my, pw, ph })}
      </svg>
    </div>
  );
}

export function getAllDiagramTypes(): { type: DiagramType; title: string }[] {
  return Object.entries(DIAGRAMS).map(([type, config]) => ({
    type: type as DiagramType,
    title: config.title,
  }));
}
