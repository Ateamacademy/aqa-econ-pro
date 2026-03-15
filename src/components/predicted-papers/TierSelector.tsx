import { cn } from "@/lib/utils";
import { GraduationCap, TrendingUp } from "lucide-react";

interface TierSelectorProps {
  selected: "Foundation" | "Higher";
  onSelect: (tier: "Foundation" | "Higher") => void;
}

const tiers = [
  {
    value: "Foundation" as const,
    label: "Foundation",
    desc: "Grades 1–5. Covers core topics with structured questions and guided working.",
    icon: GraduationCap,
  },
  {
    value: "Higher" as const,
    label: "Higher",
    desc: "Grades 4–9. Includes advanced algebra, trigonometry, circle theorems, and proof.",
    icon: TrendingUp,
  },
];

export function TierSelector({ selected, onSelect }: TierSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {tiers.map((t) => {
        const isSelected = selected === t.value;
        const Icon = t.icon;
        return (
          <button
            key={t.value}
            onClick={() => onSelect(t.value)}
            className={cn(
              "relative text-left rounded-xl border-2 p-5 transition-all hover:shadow-md",
              isSelected
                ? `${t.accent} shadow-md bg-background`
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                isSelected ? t.bg : "bg-transparent"
              )}
            />
            <Icon className={cn("h-7 w-7 mb-2", t.text)} />
            <h3 className="font-bold text-foreground text-base mb-1">{t.label}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
