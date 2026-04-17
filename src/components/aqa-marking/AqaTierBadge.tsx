import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles, ShieldCheck, UserCheck } from "lucide-react";

export type AqaTier = "auto" | "self" | "ai";

const TIER_META: Record<
  AqaTier,
  { label: string; icon: typeof Sparkles; cls: string }
> = {
  auto: {
    label: "Auto",
    icon: ShieldCheck,
    cls: "bg-emerald-500/15 border-emerald-500/40 text-emerald-200",
  },
  self: {
    label: "Self",
    icon: UserCheck,
    cls: "bg-amber-500/15 border-amber-500/40 text-amber-200",
  },
  ai: {
    label: "AI feedback",
    icon: Sparkles,
    cls: "bg-purple-500/15 border-purple-500/40 text-purple-200",
  },
};

export function AqaTierBadge({ tier, className }: { tier: AqaTier; className?: string }) {
  const m = TIER_META[tier];
  const Icon = m.icon;
  return (
    <Badge
      variant="outline"
      className={cn("gap-1 px-2 py-0.5 text-[10px] font-semibold border", m.cls, className)}
    >
      <Icon className="h-3 w-3" />
      {m.label}
    </Badge>
  );
}
