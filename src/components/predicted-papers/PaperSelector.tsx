import { BarChart3, Globe, Landmark, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const papers = [
  {
    value: "1",
    label: "Paper 1",
    title: "Markets & Market Failure",
    desc: "Microeconomics — supply & demand, elasticity, market failure, government intervention",
    icon: BarChart3,
    color: "border-blue-600",
    bg: "text-blue-600",
  },
  {
    value: "2",
    label: "Paper 2",
    title: "National & International Economy",
    desc: "Macroeconomics — GDP, inflation, unemployment, fiscal & monetary policy, trade",
    icon: Globe,
    color: "border-green-600",
    bg: "text-green-600",
  },
  {
    value: "3",
    label: "Paper 3",
    title: "Economic Principles & Issues",
    desc: "Mixed micro & macro — market structures, labour markets, inequality, policy conflicts",
    icon: Landmark,
    color: "border-purple-600",
    bg: "text-purple-600",
  },
];

interface PaperSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

export function PaperSelector({ selected, onSelect }: PaperSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {papers.map((p) => {
        const isSelected = selected === p.value;
        const Icon = p.icon;
        return (
          <button
            key={p.value}
            onClick={() => onSelect(p.value)}
            className={cn(
              "relative text-left rounded-xl border-2 p-5 transition-all hover:shadow-md",
              isSelected
                ? `${p.color} shadow-md bg-background`
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            {/* Top accent bar */}
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                isSelected ? p.color.replace("border-", "bg-") : "bg-transparent"
              )}
            />
            <Icon className={cn("h-8 w-8 mb-3", p.bg)} />
            <span
              className={cn(
                "inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2",
                p.bg,
                `bg-${p.bg.replace("text-", "")}/10`
              )}
              style={{
                backgroundColor: isSelected ? undefined : undefined,
              }}
            >
              {p.label}
            </span>
            <h3 className="font-bold text-foreground text-base mb-1">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            {isSelected && (
              <p className={cn("mt-3 text-xs font-medium flex items-center gap-1", p.bg)}>
                <Check className="h-3.5 w-3.5" /> Selected
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { papers as paperOptions };
