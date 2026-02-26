import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EquationToolbarProps {
  onInsert: (text: string) => void;
}

const symbols = [
  { label: "x²", insert: "x²", tip: "Squared" },
  { label: "x³", insert: "x³", tip: "Cubed" },
  { label: "√", insert: "√()", tip: "Square root" },
  { label: "π", insert: "π", tip: "Pi" },
  { label: "±", insert: "±", tip: "Plus-minus" },
  { label: "≤", insert: "≤", tip: "Less than or equal" },
  { label: "≥", insert: "≥", tip: "Greater than or equal" },
  { label: "≠", insert: "≠", tip: "Not equal" },
  { label: "θ", insert: "θ", tip: "Theta" },
  { label: "÷", insert: "÷", tip: "Divide" },
  { label: "×", insert: "×", tip: "Multiply" },
  { label: "∠", insert: "∠", tip: "Angle" },
  { label: "°", insert: "°", tip: "Degree" },
  { label: "½", insert: "½", tip: "Half" },
  { label: "⅓", insert: "⅓", tip: "Third" },
  { label: "fraction", insert: " _ / _ ", tip: "Fraction (a/b)" },
];

export function EquationToolbar({ onInsert }: EquationToolbarProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-wrap gap-1">
        {symbols.map((s) => (
          <Tooltip key={s.label}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 w-auto min-w-[28px] px-1.5 text-xs font-mono"
                onClick={() => onInsert(s.insert)}
              >
                {s.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {s.tip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
