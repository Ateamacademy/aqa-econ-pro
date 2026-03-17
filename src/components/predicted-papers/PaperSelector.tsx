import { BarChart3, Globe, Landmark, Calculator, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { paperOptionsBySubject } from "@/lib/subjectConfig";
import type { Subject } from "@/contexts/SubjectContext";

const iconMap: Record<string, any> = {
  economics: [BarChart3, Globe, FileText],
  maths: [Calculator, Calculator, Calculator],
  "edexcel-a": [BarChart3, Globe, FileText],
  "edexcel-b": [BarChart3, Globe, FileText],
  "cambridge": [BarChart3, Globe, FileText],
  "ocr": [BarChart3, Globe, FileText],
  "ib": [BarChart3, Globe, FileText],
  "wjec": [BarChart3, Globe, FileText],
  "eduqas": [BarChart3, Globe, FileText],
  "aqa-gcse": [BarChart3, Globe, FileText],
  "cambridge-igcse": [BarChart3, Globe, FileText],
  "edexcel-igcse": [BarChart3, Globe, FileText],
  "ocr-gcse": [BarChart3, Globe, FileText],
};

const colorSets = [
  { color: "border-primary", bg: "text-primary" },
  { color: "border-accent", bg: "text-accent" },
  { color: "border-primary", bg: "text-primary" },
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
              "relative text-left rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5",
              isSelected
                ? "border-primary shadow-md shadow-primary/10 bg-card"
                : "border-border bg-card hover:border-primary/30"
            )}
          >
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-colors",
                isSelected ? "bg-primary" : "bg-transparent"
              )}
            />
            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center mb-3", isSelected ? "bg-primary/15" : "bg-muted")}>
              <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-muted-foreground")} />
            </div>
            <span className={cn("inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2", isSelected ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted")}>
              {p.label}
            </span>
            <h3 className="font-bold text-foreground text-base mb-1">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            {isSelected && (
              <p className="mt-3 text-xs font-semibold flex items-center gap-1 text-primary">
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
