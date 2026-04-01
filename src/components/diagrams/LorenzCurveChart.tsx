import LorenzCanvasPanel from "@/components/diagrams/LorenzCanvasPanel";

interface LorenzCurveChartProps {
  showRegionsToggle?: boolean;
  showRefToggle?: boolean;
  height?: number;
  className?: string;
}

export default function LorenzCurveChart({
  showRegionsToggle = true,
  showRefToggle = true,
  height = 420,
  className,
}: LorenzCurveChartProps) {
  return (
    <LorenzCanvasPanel
      showRegionsToggle={showRegionsToggle}
      showRefToggle={showRefToggle}
      height={height}
      className={className}
    />
  );
}