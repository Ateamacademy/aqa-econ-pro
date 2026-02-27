import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
];

const SHADE_OPTIONS: Record<string, { label: string; options: { id: string; label: string }[] }> = {
  "supply-demand": {
    label: "Shade areas",
    options: [
      { id: "consumer-surplus", label: "Consumer Surplus" },
      { id: "producer-surplus", label: "Producer Surplus" },
    ],
  },
  "adas": {
    label: "Shade areas",
    options: [{ id: "inflationary-gap", label: "Inflationary Gap" }],
  },
  "externality": {
    label: "Shade areas",
    options: [{ id: "deadweight-loss", label: "Deadweight Loss" }],
  },
  "monopoly": {
    label: "Shade areas",
    options: [{ id: "supernormal-profit", label: "Supernormal Profit" }],
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
