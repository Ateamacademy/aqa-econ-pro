import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import type { PredictionResult } from "@/lib/gradeCalculator";

interface Props {
  p3Score: number;
  p3Max: number;
  onChange: (v: number) => void;
  simulated: PredictionResult;
}

export function WhatIfSlider({ p3Score, p3Max, onChange, simulated }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">What if Paper 3 = </h3>
        <motion.span
          key={p3Score}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-mono text-2xl font-bold text-primary"
        >
          {p3Score}/{p3Max}
        </motion.span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Drag to simulate different Paper 3 outcomes.</p>
      <Slider value={[p3Score]} min={0} max={p3Max} step={1} onValueChange={(v) => onChange(v[0])} />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Resulting grade</span>
        <motion.span
          key={simulated.likelyGrade}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-mono text-2xl font-bold text-foreground"
        >
          {simulated.likelyGrade}
        </motion.span>
      </div>
    </div>
  );
}
