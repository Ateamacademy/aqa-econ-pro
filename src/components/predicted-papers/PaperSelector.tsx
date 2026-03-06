import { BarChart3, Globe, Landmark, Calculator, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { paperOptionsBySubject } from "@/lib/subjectConfig";
import type { Subject } from "@/contexts/SubjectContext";

const iconMap: Record<string, any> = {
  economics: [BarChart3, Globe, Landmark],
  maths: [Calculator, Calculator, Calculator],
  "edexcel-a": [BarChart3, Globe, Landmark],
  "edexcel-b": [BarChart3, Globe, Landmark],
  "cambridge": [BarChart3, Globe, BarChart3, Landmark],
};

const colorSets = [
  { color: "border-blue-600", bg: "text-blue-600" },
  { color: "border-green-600", bg: "text-green-600" },
  { color: "border-purple-600", bg: "text-purple-600" },
];

interface PaperSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
  subject: Subject;
}

export function PaperSelector({ selected, onSelect, subject }: PaperSelectorProps) {
  const papers = paperOptionsBySubject[subject].map((p, i) => ({
    ...p,
    icon: iconMap[subject]?.[i] ?? Calculator,
    ...colorSets[i],
  }));

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
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                isSelected ? p.color.replace("border-", "bg-") : "bg-transparent"
              )}
            />
            <Icon className={cn("h-8 w-8 mb-3", p.bg)} />
            <span className={cn("inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2", p.bg)}>
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

export { paperOptionsBySubject as paperOptions };
