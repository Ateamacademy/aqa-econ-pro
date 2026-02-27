import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ruler, Circle, Triangle } from "lucide-react";

interface GeometryToolsProps {
  activeTool: string | null;
  onToolChange: (tool: string | null) => void;
}

const tools = [
  { id: "ruler", label: "Ruler", icon: Ruler, tip: "Measure distances on your diagram" },
  { id: "protractor", label: "Protractor", icon: Circle, tip: "Measure angles" },
  { id: "compass", label: "Compass", icon: Triangle, tip: "Draw arcs and circles" },
];

export function GeometryTools({ activeTool, onToolChange }: GeometryToolsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Geometry Tools</p>
      <div className="flex flex-wrap gap-1.5">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <Button
              key={t.id}
              type="button"
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => onToolChange(isActive ? null : t.id)}
              title={t.tip}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </Button>
          );
        })}
      </div>
      
      {activeTool === "ruler" && <RulerOverlay />}
      {activeTool === "protractor" && <ProtractorOverlay />}
      {activeTool === "compass" && <CompassInfo />}
    </div>
  );
}

function RulerOverlay() {
  return (
    <div className="border rounded-lg bg-white p-3">
      <svg viewBox="0 0 400 60" className="w-full">
        <rect x="0" y="10" width="400" height="40" fill="hsl(45 80% 90%)" stroke="hsl(45 60% 60%)" strokeWidth="1" rx="2" />
        {Array.from({ length: 21 }, (_, i) => {
          const x = i * 20;
          const isMajor = i % 5 === 0;
          return (
            <g key={i}>
              <line x1={x} y1="10" x2={x} y2={isMajor ? 35 : 25} stroke="hsl(0 0% 30%)" strokeWidth={isMajor ? 1.5 : 0.5} />
              {isMajor && (
                <text x={x} y="45" fontSize="8" fill="hsl(0 0% 30%)" textAnchor="middle">{i}cm</text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-[10px] text-muted-foreground mt-1">Use this ruler as a reference when measuring your diagram. Each mark = 1 cm.</p>
    </div>
  );
}

function ProtractorOverlay() {
  return (
    <div className="border rounded-lg bg-white p-3">
      <svg viewBox="0 0 300 170" className="w-full">
        <path d="M 30 150 A 120 120 0 0 1 270 150" fill="hsl(210 80% 95%)" stroke="hsl(210 60% 50%)" strokeWidth="1.5" />
        <line x1="30" y1="150" x2="270" y2="150" stroke="hsl(210 60% 50%)" strokeWidth="1.5" />
        {Array.from({ length: 19 }, (_, i) => {
          const angle = (i * 10) * (Math.PI / 180);
          const isMajor = i % 3 === 0;
          const r1 = 120;
          const r2 = isMajor ? 100 : 110;
          const cx = 150, cy = 150;
          return (
            <g key={i}>
              <line
                x1={cx - r1 * Math.cos(angle)} y1={cy - r1 * Math.sin(angle)}
                x2={cx - r2 * Math.cos(angle)} y2={cy - r2 * Math.sin(angle)}
                stroke="hsl(210 60% 40%)" strokeWidth={isMajor ? 1 : 0.5}
              />
              {isMajor && (
                <text
                  x={cx - 90 * Math.cos(angle)} y={cy - 90 * Math.sin(angle)}
                  fontSize="8" fill="hsl(210 60% 40%)" textAnchor="middle" dominantBaseline="middle"
                >
                  {i * 10}°
                </text>
              )}
            </g>
          );
        })}
        <circle cx="150" cy="150" r="3" fill="hsl(0 80% 50%)" />
      </svg>
      <p className="text-[10px] text-muted-foreground mt-1">Protractor for measuring angles. Place against your drawing to check angle sizes.</p>
    </div>
  );
}

function CompassInfo() {
  return (
    <div className="border rounded-lg bg-muted/50 p-3">
      <p className="text-xs text-foreground font-medium mb-1">Compass Tool</p>
      <p className="text-[10px] text-muted-foreground">
        Use the drawing canvas to draw arcs and circles freehand. For accurate construction:
      </p>
      <ul className="text-[10px] text-muted-foreground mt-1 space-y-0.5 list-disc pl-3">
        <li>Mark your centre point first</li>
        <li>Draw the arc keeping a consistent distance from the centre</li>
        <li>For bisector constructions, draw arcs from both endpoints</li>
        <li>Mark intersection points clearly</li>
      </ul>
    </div>
  );
}
