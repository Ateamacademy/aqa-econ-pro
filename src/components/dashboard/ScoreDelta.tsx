import { useEffect, useState } from "react";

export default function ScoreDelta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 1800);
    const hide = setTimeout(() => setVisible(false), 4800);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute -top-2 -right-2 z-10 rounded-xl bg-[#0f1a15] border border-[#22c55e]/40 px-3 py-2 shadow-lg"
      style={{
        animation: "fadeSlideUp 0.4s ease-out both",
      }}
    >
      <span className="text-[#22c55e] text-sm font-bold">+5 Readiness Points</span>
    </div>
  );
}
