export default function PredictedGrade() {
  return (
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <h3 className="text-[#64748b] text-xs font-medium mb-1">Predicted Grade</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[#f1f5f9]">A</span>
        <div className="flex flex-col">
          <span className="text-[10px] text-[#64748b]">Boundary: 72%</span>
          <span className="text-[10px] text-[#22c55e] font-medium">Your avg: 78%</span>
        </div>
      </div>
      {/* Mini sparkline */}
      <svg viewBox="0 0 120 30" className="w-full h-8 mt-3">
        <polyline
          points="0,25 15,22 30,20 45,18 60,16 75,13 90,10 105,8 120,5"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="120" cy="5" r="3" fill="#22c55e">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
