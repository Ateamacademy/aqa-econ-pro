import { useState } from "react";
import { X } from "lucide-react";

export default function DailyGoalBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[#f1f5f9] text-sm font-medium">
          Daily Goal: Gain +3 readiness points today —{" "}
          <span className="text-[#a855f7] font-bold">2/3 complete</span>
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-[#2a2a4a] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            style={{ width: "66%" }}
          />
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-[#64748b] hover:text-[#f1f5f9] transition-colors shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
