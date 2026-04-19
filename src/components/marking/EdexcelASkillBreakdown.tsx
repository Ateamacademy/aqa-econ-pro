import { getEdexcelASkillSplit } from "@/lib/boards/edexcel-a-a-level";
import type { SkillSplit } from "@/lib/boards/board-definition";

interface Props {
  marks: number;
  awarded?: Partial<SkillSplit>;
}

const LABELS: Array<{ key: keyof SkillSplit; name: string; tone: string }> = [
  { key: "K",  name: "Knowledge",   tone: "bg-primary/15 text-primary border-primary/30" },
  { key: "Ap", name: "Application", tone: "bg-cyan-pop/15 text-cyan-pop border-cyan-pop/30" },
  { key: "An", name: "Analysis",    tone: "bg-warning/15 text-warning border-warning/30" },
  { key: "Ev", name: "Evaluation",  tone: "bg-success/15 text-success border-success/30" },
];

/**
 * Edexcel A renders mark schemes as explicit per-skill (K/Ap/An/Ev) splits
 * rather than AQA-style level descriptors.
 */
export function EdexcelASkillBreakdown({ marks, awarded }: Props) {
  const split = getEdexcelASkillSplit(marks);
  if (!split) {
    return (
      <p className="text-xs text-muted-foreground italic">
        No K/Ap/An/Ev split defined for {marks}-mark Edexcel A questions.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Edexcel mark scheme — per-skill split
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {LABELS.map(({ key, name, tone }) => {
          const max = split[key];
          if (max === 0) return null;
          const got = awarded?.[key];
          return (
            <div key={key} className={`rounded-lg border px-3 py-2 ${tone}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{name}</p>
              <p className="text-sm font-mono font-bold">
                {typeof got === "number" ? `${got}/${max}` : `${max} marks`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
