export default function DailyGoalBanner() {
  return (
    <div className="flex-1 min-w-0 hidden md:block">
      <div className="flex items-center gap-3">
        <p className="text-foreground text-sm font-medium whitespace-nowrap">
          Today's Goal: <span className="text-primary font-bold">+3 Readiness Points</span>
          <span className="text-muted-foreground ml-2 text-xs">1/3 complete</span>
        </p>
        <div className="flex-1 max-w-[200px] h-1.5 rounded-full bg-popover overflow-hidden">
          <div className="h-full rounded-full bg-primary w-[33%]" />
        </div>
      </div>
    </div>
  );
}
