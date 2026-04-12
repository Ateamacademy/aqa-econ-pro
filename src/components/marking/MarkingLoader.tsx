import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_MESSAGES = [
  "Reading your answer…",
  "Checking rubric criteria…",
  "Allocating marks…",
  "Writing feedback…",
];

export function MarkingLoader() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
      <p className="text-sm font-medium text-foreground animate-pulse">{STATUS_MESSAGES[msgIndex]}</p>
      <div className="w-full max-w-md space-y-3 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}
