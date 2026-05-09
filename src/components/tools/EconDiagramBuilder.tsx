import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EconDiagramBuilderProps {
  onSave?: (diagramData: DiagramData) => void;
}

export interface DiagramData {
  type: string;
  labels: Record<string, string>;
  shadedAreas: string[];
  description: string;
}

const DIAGRAM_TYPES = [
  {
    id: "supply-demand",
    label: "Supply & Demand",
    description: "Standard market equilibrium diagram",
    defaultLabels: { xAxis: "Quantity", yAxis: "Price", curve1: "D", curve2: "S", eq: "P₁, Q₁" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="12" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Price"}</text>
        <text x="160" y="245" fontSize="12" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>
        {shaded.includes("consumer-surplus") && (
          <polygon points="40,60 155,120 40,120" fill="hsl(210 100% 60% / 0.2)" stroke="hsl(210 100% 60%)" strokeWidth="1" />
        )}
        {shaded.includes("producer-surplus") && (
          <polygon points="40,120 155,120 40,180" fill="hsl(0 100% 60% / 0.2)" stroke="hsl(0 100% 60%)" strokeWidth="1" />
        )}
        <line x1="50" y1="40" x2="270" y2="200" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="272" y="205" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "S"}</text>
        <line x1="50" y1="200" x2="270" y2="40" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="272" y="45" fontSize="11" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "D"}</text>
        <circle cx="155" cy="120" r="4" fill="currentColor" />
        <line x1="40" y1="120" x2="155" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <line x1="155" y1="120" x2="155" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <text x="30" y="124" fontSize="10" fill="currentColor" textAnchor="end">P₁</text>
        <text x="155" y="235" fontSize="10" fill="currentColor" textAnchor="middle">Q₁</text>
      </svg>
    ),
  },
  {
    id: "supply-demand-shift",
    label: "S&D Shift",
    description: "Supply or demand shift with new equilibrium",
    defaultLabels: { xAxis: "Quantity", yAxis: "Price", curve1: "D₁", curve2: "S", curve3: "D₂" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="12" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Price"}</text>
        <text x="160" y="245" fontSize="12" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>
        {shaded.includes("welfare-change") && (
          <polygon points="130,100 175,90 175,130 130,130" fill="hsl(45 100% 50% / 0.25)" stroke="hsl(45 100% 50%)" strokeWidth="1" />
        )}
        <line x1="50" y1="40" x2="270" y2="200" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="272" y="205" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "S"}</text>
        <line x1="50" y1="200" x2="270" y2="40" stroke="hsl(0 80% 50%)" strokeWidth="2" strokeDasharray="5" />
        <text x="272" y="45" fontSize="10" fill="hsl(0 80% 50%)">{labels.curve1 || "D₁"}</text>
        <line x1="80" y1="200" x2="280" y2="30" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="278" y="25" fontSize="11" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve3 || "D₂"}</text>
        <circle cx="130" cy="130" r="3" fill="currentColor" />
        <circle cx="175" cy="110" r="4" fill="hsl(130 60% 40%)" />
        <line x1="40" y1="130" x2="130" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
        <line x1="40" y1="110" x2="175" y2="110" stroke="hsl(130 60% 40%)" strokeWidth="1" strokeDasharray="3" />
        <text x="30" y="134" fontSize="9" fill="currentColor" textAnchor="end">P₁</text>
        <text x="30" y="114" fontSize="9" fill="hsl(130 60% 40%)" textAnchor="end">P₂</text>
      </svg>
    ),
  },
  {
    id: "both-curves-shift",
    label: "Both Shift",
    description: "Both S&D shift (AQA June 2024 Q6a pattern)",
    defaultLabels: { xAxis: "Quantity", yAxis: "Price", curve1: "D₁", curve2: "D₂", curve3: "S₁", curve4: "S₂", eq1: "E₁", eq2: "E₂" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 260" className="w-full">
        {/* Axes */}
        <line x1="50" y1="20" x2="50" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="20" y="120" fontSize="12" fill="currentColor" transform="rotate(-90 20 120)">{labels.yAxis || "Price"}</text>
        <text x="165" y="252" fontSize="12" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>

        {/* Shading options */}
        {shaded.includes("price-change") && (
          <rect x="50" y="108" width="110" height="22" fill="hsl(45 100% 50% / 0.15)" stroke="hsl(45 100% 50%)" strokeWidth="1" strokeDasharray="3" />
        )}
        {shaded.includes("quantity-change") && (
          <rect x="130" y="130" width="40" height="90" fill="hsl(210 100% 60% / 0.12)" stroke="hsl(210 100% 60%)" strokeWidth="1" strokeDasharray="3" />
        )}

        {/* S₁ · original supply (steeper, starts higher-left) */}
        <line x1="90" y1="30" x2="250" y2="200" stroke="hsl(210 100% 50%)" strokeWidth="2" strokeDasharray="5" />
        <text x="252" y="195" fontSize="10" fill="hsl(210 100% 50%)">{labels.curve3 || "S₁"}</text>

        {/* S₂ · shifted supply RIGHT (parallel, further right) */}
        <line x1="120" y1="30" x2="275" y2="190" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="272" y="182" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve4 || "S₂"}</text>

        {/* D₁ · original demand */}
        <line x1="60" y1="40" x2="240" y2="200" stroke="hsl(0 80% 50%)" strokeWidth="2" strokeDasharray="5" transform="rotate(0)" />
        <line x1="60" y1="200" x2="240" y2="40" stroke="hsl(0 80% 50%)" strokeWidth="2" strokeDasharray="5" />
        <text x="242" y="45" fontSize="10" fill="hsl(0 80% 50%)">{labels.curve1 || "D₁"}</text>

        {/* D₂ · shifted demand RIGHT */}
        <line x1="90" y1="200" x2="270" y2="40" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="268" y="35" fontSize="11" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve2 || "D₂"}</text>

        {/* E₁ · original equilibrium (intersection of D₁ and S₁) */}
        <circle cx="155" cy="118" r="4" fill="currentColor" />
        <text x="160" y="112" fontSize="10" fill="currentColor" fontWeight="bold">{labels.eq1 || "E₁"}</text>

        {/* E₂ · new equilibrium (intersection of D₂ and S₂) · lower price, higher quantity */}
        <circle cx="195" cy="108" r="5" fill="hsl(130 60% 40%)" />
        <text x="200" y="102" fontSize="10" fill="hsl(130 60% 40%)" fontWeight="bold">{labels.eq2 || "E₂"}</text>

        {/* Dashed lines to axes from E₁ */}
        <line x1="50" y1="118" x2="155" y2="118" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <line x1="155" y1="118" x2="155" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <text x="40" y="122" fontSize="9" fill="currentColor" textAnchor="end">P₁</text>
        <text x="155" y="235" fontSize="9" fill="currentColor" textAnchor="middle">Q₁</text>

        {/* Dashed lines to axes from E₂ */}
        <line x1="50" y1="108" x2="195" y2="108" stroke="hsl(130 60% 40%)" strokeWidth="1" strokeDasharray="4" />
        <line x1="195" y1="108" x2="195" y2="220" stroke="hsl(130 60% 40%)" strokeWidth="1" strokeDasharray="4" />
        <text x="40" y="112" fontSize="9" fill="hsl(130 60% 40%)" textAnchor="end">P₂</text>
        <text x="195" y="235" fontSize="9" fill="hsl(130 60% 40%)" textAnchor="middle">Q₂</text>

        {/* Shift arrows */}
        <line x1="135" y1="175" x2="155" y2="175" stroke="hsl(0 80% 50%)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
        <line x1="165" y1="80" x2="185" y2="80" stroke="hsl(210 100% 50%)" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
        <defs>
          <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(0 80% 50%)" />
          </marker>
          <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(210 100% 50%)" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    id: "adas",
    label: "AD/AS",
    description: "Aggregate Demand / Aggregate Supply",
    defaultLabels: { xAxis: "Real GDP", yAxis: "Price Level", curve1: "AD", curve2: "SRAS", curve3: "LRAS" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="11" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Price Level"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Real GDP"}</text>
        {shaded.includes("inflationary-gap") && (
          <rect x="180" y="80" width="30" height="60" fill="hsl(0 100% 60% / 0.15)" stroke="hsl(0 100% 60%)" strokeWidth="1" strokeDasharray="3" />
        )}
        {shaded.includes("deflationary-gap") && (
          <rect x="150" y="80" width="30" height="60" fill="hsl(210 100% 60% / 0.15)" stroke="hsl(210 100% 60%)" strokeWidth="1" strokeDasharray="3" />
        )}
        <line x1="200" y1="30" x2="200" y2="210" stroke="hsl(130 60% 40%)" strokeWidth="2.5" />
        <text x="202" y="25" fontSize="11" fill="hsl(130 60% 40%)" fontWeight="bold">{labels.curve3 || "LRAS"}</text>
        <line x1="60" y1="50" x2="260" y2="190" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="262" y="195" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "SRAS"}</text>
        <line x1="60" y1="190" x2="260" y2="50" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="262" y="55" fontSize="11" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "AD"}</text>
      </svg>
    ),
  },
  {
    id: "keynesian-as",
    label: "Keynesian AS",
    description: "Keynesian aggregate supply with three ranges",
    defaultLabels: { xAxis: "Real GDP", yAxis: "Price Level", curve1: "AD", curve2: "Keynesian AS", yf: "Yf" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="11" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Price Level"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Real GDP"}</text>
        {shaded.includes("spare-capacity") && (
          <rect x="40" y="180" width="120" height="40" fill="hsl(210 100% 60% / 0.1)" stroke="none" />
        )}
        {/* Keynesian AS: horizontal → upward sloping → vertical */}
        <path d="M 50 180 L 160 180 Q 200 170 220 120 Q 230 80 230 40" stroke="hsl(210 100% 50%)" strokeWidth="2.5" fill="none" />
        <text x="235" y="45" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "AS"}</text>
        <line x1="60" y1="190" x2="240" y2="60" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="242" y="65" fontSize="11" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "AD"}</text>
        <line x1="230" y1="220" x2="230" y2="215" stroke="currentColor" strokeWidth="1" />
        <text x="230" y="235" fontSize="10" fill="currentColor" textAnchor="middle">{labels.yf || "Yf"}</text>
      </svg>
    ),
  },
  {
    id: "ppf",
    label: "PPF",
    description: "Production Possibility Frontier",
    defaultLabels: { xAxis: "Good B", yAxis: "Good A", curve1: "PPF" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="12" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Good A"}</text>
        <text x="160" y="245" fontSize="12" fill="currentColor" textAnchor="middle">{labels.xAxis || "Good B"}</text>
        {shaded.includes("attainable") && (
          <path d="M 40 50 Q 140 55 250 220 L 40 220 Z" fill="hsl(130 60% 50% / 0.1)" stroke="none" />
        )}
        <path d="M 40 50 Q 140 55 250 220" stroke="hsl(210 100% 50%)" strokeWidth="2.5" fill="none" />
        <text x="252" y="215" fontSize="11" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve1 || "PPF"}</text>
        <circle cx="120" cy="150" r="4" fill="hsl(130 60% 40%)" />
        <text x="130" y="147" fontSize="10" fill="hsl(130 60% 40%)">X</text>
        <circle cx="200" cy="100" r="4" fill="hsl(0 80% 50%)" />
        <text x="210" y="97" fontSize="10" fill="hsl(0 80% 50%)">Y</text>
      </svg>
    ),
  },
  {
    id: "externality",
    label: "Externality",
    description: "Negative/Positive externality with welfare loss",
    defaultLabels: { xAxis: "Quantity", yAxis: "Cost/Benefit", curve1: "MPB", curve2: "MPC", curve3: "MSC" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="10" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Cost/Benefit"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>
        {shaded.includes("deadweight-loss") && (
          <polygon points="170,100 210,80 210,130" fill="hsl(45 100% 50% / 0.3)" stroke="hsl(45 100% 50%)" strokeWidth="1" />
        )}
        {shaded.includes("welfare-loss") && (
          <polygon points="170,100 210,80 210,130" fill="hsl(0 80% 50% / 0.2)" stroke="hsl(0 80% 50%)" strokeWidth="1" />
        )}
        <line x1="50" y1="200" x2="270" y2="40" stroke="hsl(0 80% 50%)" strokeWidth="2" />
        <text x="272" y="45" fontSize="10" fill="hsl(0 80% 50%)">{labels.curve1 || "MPB"}</text>
        <line x1="50" y1="60" x2="260" y2="180" stroke="hsl(210 100% 50%)" strokeWidth="2" />
        <text x="262" y="185" fontSize="10" fill="hsl(210 100% 50%)">{labels.curve2 || "MPC"}</text>
        <line x1="50" y1="30" x2="260" y2="150" stroke="hsl(130 60% 40%)" strokeWidth="2" strokeDasharray="6" />
        <text x="262" y="155" fontSize="10" fill="hsl(130 60% 40%)">{labels.curve3 || "MSC"}</text>
      </svg>
    ),
  },
  {
    id: "monopoly",
    label: "Monopoly",
    description: "Profit maximisation for a monopolist",
    defaultLabels: { xAxis: "Quantity", yAxis: "Revenue/Cost", curve1: "AR=D", curve2: "MR", curve3: "MC", curve4: "AC" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="10" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Revenue/Cost"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>
        {shaded.includes("supernormal-profit") && (
          <rect x="40" y="95" width="110" height="35" fill="hsl(130 60% 50% / 0.15)" stroke="hsl(130 60% 40%)" strokeWidth="1" />
        )}
        {shaded.includes("deadweight-loss") && (
          <polygon points="150,95 200,120 150,130" fill="hsl(0 80% 50% / 0.2)" stroke="hsl(0 80% 50%)" strokeWidth="1" />
        )}
        <line x1="50" y1="60" x2="260" y2="200" stroke="hsl(130 60% 40%)" strokeWidth="2" />
        <text x="262" y="205" fontSize="10" fill="hsl(130 60% 40%)">{labels.curve3 || "MC"}</text>
        <path d="M 60 180 Q 120 50 260 160" stroke="hsl(45 80% 40%)" strokeWidth="2" fill="none" />
        <text x="262" y="165" fontSize="10" fill="hsl(45 80% 40%)">{labels.curve4 || "AC"}</text>
        <line x1="50" y1="50" x2="260" y2="190" stroke="hsl(0 80% 50%)" strokeWidth="2" />
        <text x="262" y="195" fontSize="10" fill="hsl(0 80% 50%)">{labels.curve1 || "AR=D"}</text>
        <line x1="50" y1="50" x2="180" y2="210" stroke="hsl(210 100% 50%)" strokeWidth="2" strokeDasharray="5" />
        <text x="182" y="215" fontSize="10" fill="hsl(210 100% 50%)">{labels.curve2 || "MR"}</text>
      </svg>
    ),
  },
  {
    id: "labour-market",
    label: "Labour Market",
    description: "Wage determination in a competitive labour market",
    defaultLabels: { xAxis: "Quantity of Labour", yAxis: "Wage Rate (W)", curve1: "DL (MRP)", curve2: "SL" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="10" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Wage Rate (W)"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity of Labour"}</text>
        {shaded.includes("wage-floor") && (
          <line x1="40" y1="100" x2="260" y2="100" stroke="hsl(45 100% 50%)" strokeWidth="2" strokeDasharray="6" />
        )}
        <line x1="50" y1="190" x2="260" y2="50" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="262" y="55" fontSize="10" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "DL"}</text>
        <line x1="50" y1="50" x2="260" y2="190" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="262" y="195" fontSize="10" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "SL"}</text>
        <circle cx="155" cy="120" r="4" fill="currentColor" />
        <line x1="40" y1="120" x2="155" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <line x1="155" y1="120" x2="155" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
        <text x="30" y="124" fontSize="10" fill="currentColor" textAnchor="end">W₁</text>
        <text x="155" y="235" fontSize="10" fill="currentColor" textAnchor="middle">L₁</text>
      </svg>
    ),
  },
  {
    id: "tariff",
    label: "Tariff",
    description: "Effect of a tariff on imports",
    defaultLabels: { xAxis: "Quantity", yAxis: "Price", curve1: "D", curve2: "S(domestic)", pw: "Pw", pwt: "Pw+t" },
    svgContent: (labels: Record<string, string>, shaded: string[]) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="11" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Price"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Quantity"}</text>
        {shaded.includes("tariff-revenue") && (
          <rect x="110" y="130" width="80" height="20" fill="hsl(130 60% 50% / 0.2)" stroke="hsl(130 60% 40%)" strokeWidth="1" />
        )}
        {shaded.includes("deadweight-loss") && (
          <>
            <polygon points="80,150 110,130 110,150" fill="hsl(0 80% 50% / 0.2)" stroke="hsl(0 80% 50%)" strokeWidth="1" />
            <polygon points="190,150 220,130 220,150" fill="hsl(0 80% 50% / 0.2)" stroke="hsl(0 80% 50%)" strokeWidth="1" />
          </>
        )}
        <line x1="50" y1="190" x2="270" y2="50" stroke="hsl(0 80% 50%)" strokeWidth="2.5" />
        <text x="272" y="55" fontSize="10" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "D"}</text>
        <line x1="50" y1="50" x2="260" y2="190" stroke="hsl(210 100% 50%)" strokeWidth="2.5" />
        <text x="262" y="195" fontSize="10" fill="hsl(210 100% 50%)" fontWeight="bold">{labels.curve2 || "S"}</text>
        <line x1="40" y1="150" x2="270" y2="150" stroke="hsl(45 80% 40%)" strokeWidth="1.5" />
        <text x="272" y="154" fontSize="10" fill="hsl(45 80% 40%)">{labels.pw || "Pw"}</text>
        <line x1="40" y1="130" x2="270" y2="130" stroke="hsl(45 80% 40%)" strokeWidth="1.5" strokeDasharray="5" />
        <text x="272" y="134" fontSize="10" fill="hsl(45 80% 40%)">{labels.pwt || "Pw+t"}</text>
      </svg>
    ),
  },
  {
    id: "phillips-curve",
    label: "Phillips Curve",
    description: "Short-run and long-run Phillips Curve",
    defaultLabels: { xAxis: "Unemployment (%)", yAxis: "Inflation (%)", curve1: "SRPC", curve2: "LRPC", nru: "NRU" },
    svgContent: (labels: Record<string, string>) => (
      <svg viewBox="0 0 300 250" className="w-full">
        <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="2" />
        <text x="15" y="120" fontSize="10" fill="currentColor" transform="rotate(-90 15 120)">{labels.yAxis || "Inflation (%)"}</text>
        <text x="160" y="245" fontSize="11" fill="currentColor" textAnchor="middle">{labels.xAxis || "Unemployment (%)"}</text>
        <line x1="160" y1="30" x2="160" y2="210" stroke="hsl(130 60% 40%)" strokeWidth="2.5" />
        <text x="162" y="25" fontSize="11" fill="hsl(130 60% 40%)" fontWeight="bold">{labels.curve2 || "LRPC"}</text>
        <path d="M 60 50 Q 100 100 140 150 Q 160 180 260 200" stroke="hsl(0 80% 50%)" strokeWidth="2.5" fill="none" />
        <text x="262" y="205" fontSize="10" fill="hsl(0 80% 50%)" fontWeight="bold">{labels.curve1 || "SRPC"}</text>
        <text x="160" y="235" fontSize="10" fill="currentColor" textAnchor="middle">{labels.nru || "NRU"}</text>
      </svg>
    ),
  },
];

const SHADE_OPTIONS: Record<string, { label: string; options: { id: string; label: string }[] }> = {
  "supply-demand": {
    label: "Shade areas",
    options: [
      { id: "consumer-surplus", label: "Consumer Surplus" },
      { id: "producer-surplus", label: "Producer Surplus" },
    ],
  },
  "supply-demand-shift": {
    label: "Shade areas",
    options: [{ id: "welfare-change", label: "Welfare Change" }],
  },
  "both-curves-shift": {
    label: "Shade areas",
    options: [
      { id: "price-change", label: "Price Change" },
      { id: "quantity-change", label: "Quantity Change" },
    ],
  },
  "adas": {
    label: "Shade areas",
    options: [
      { id: "inflationary-gap", label: "Inflationary Gap" },
      { id: "deflationary-gap", label: "Deflationary Gap" },
    ],
  },
  "keynesian-as": {
    label: "Shade areas",
    options: [{ id: "spare-capacity", label: "Spare Capacity" }],
  },
  "ppf": {
    label: "Shade areas",
    options: [{ id: "attainable", label: "Attainable Region" }],
  },
  "externality": {
    label: "Shade areas",
    options: [
      { id: "deadweight-loss", label: "Deadweight Loss" },
      { id: "welfare-loss", label: "Welfare Loss" },
    ],
  },
  "monopoly": {
    label: "Shade areas",
    options: [
      { id: "supernormal-profit", label: "Supernormal Profit" },
      { id: "deadweight-loss", label: "Deadweight Loss" },
    ],
  },
  "labour-market": {
    label: "Shade areas",
    options: [{ id: "wage-floor", label: "Minimum Wage" }],
  },
  "tariff": {
    label: "Shade areas",
    options: [
      { id: "tariff-revenue", label: "Tariff Revenue" },
      { id: "deadweight-loss", label: "Deadweight Loss" },
    ],
  },
};

export function EconDiagramBuilder({ onSave }: EconDiagramBuilderProps) {
  const [selectedType, setSelectedType] = useState(DIAGRAM_TYPES[0].id);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [shadedAreas, setShadedAreas] = useState<string[]>([]);

  const diagram = DIAGRAM_TYPES.find((d) => d.id === selectedType)!;
  const mergedLabels = { ...diagram.defaultLabels, ...labels };
  const shadeOpts = SHADE_OPTIONS[selectedType];

  const toggleShade = (id: string) => {
    setShadedAreas((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleSave = () => {
    onSave?.({
      type: selectedType,
      labels: mergedLabels,
      shadedAreas,
      description: `${diagram.label} diagram with labels: ${Object.entries(mergedLabels).map(([k, v]) => `${k}=${v}`).join(", ")}. Shaded: ${shadedAreas.join(", ") || "none"}.`,
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">Economics Diagram Builder</p>
      
      {/* Diagram type selector */}
      <div className="flex flex-wrap gap-1.5">
        {DIAGRAM_TYPES.map((d) => (
          <Button
            key={d.id} type="button" size="sm" variant={selectedType === d.id ? "default" : "outline"}
            className="text-xs h-7"
            onClick={() => { setSelectedType(d.id); setLabels({}); setShadedAreas([]); }}
          >
            {d.label}
          </Button>
        ))}
      </div>

      {/* Diagram preview */}
      <div className="border rounded-lg bg-white p-4 text-foreground">
        {diagram.svgContent(mergedLabels, shadedAreas)}
      </div>

      {/* Label editing */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(diagram.defaultLabels).map(([key, defaultVal]) => (
          <div key={key}>
            <label className="text-[10px] text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <Input
              value={labels[key] ?? ""}
              placeholder={defaultVal}
              onChange={(e) => setLabels((prev) => ({ ...prev, [key]: e.target.value }))}
              className="h-7 text-xs"
            />
          </div>
        ))}
      </div>

      {/* Shading options */}
      {shadeOpts && (
        <div>
          <p className="text-[10px] text-muted-foreground mb-1">{shadeOpts.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {shadeOpts.options.map((opt) => (
              <Button
                key={opt.id} type="button" size="sm"
                variant={shadedAreas.includes(opt.id) ? "default" : "outline"}
                className="text-xs h-7"
                onClick={() => toggleShade(opt.id)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {onSave && (
        <Button type="button" size="sm" variant="outline" className="text-xs" onClick={handleSave}>
          Attach Diagram to Answer
        </Button>
      )}
    </div>
  );
}
