import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileX2, RotateCcw, Pencil } from "lucide-react";

interface Props {
  totalMarks: number;
  reason: string;
  onRetryWithWork: () => void;
  onStartFresh: () => void;
}

export function EmptyDiagramResult({ totalMarks, reason, onRetryWithWork, onStartFresh }: Props) {
  return (
    <Card className="border-red-500/30 bg-red-500/5">
      <CardContent className="pt-6 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <FileX2 className="h-8 w-8 text-red-400" />
        </div>

        <div>
          <p className="text-2xl font-bold text-red-400">0 / {totalMarks}</p>
          <p className="text-sm text-muted-foreground mt-1">
            We couldn't detect a diagram in your submission.
          </p>
        </div>

        <div className="text-left bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
          <p className="font-semibold text-foreground">
            Diagram marking was bypassed because:
          </p>
          <p className="text-muted-foreground">• {reason}</p>
        </div>

        <div className="text-left bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
          <p className="font-semibold text-foreground">
            To receive marks on this question:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li>✓ Draw both axes with clear labels (e.g. Price, Quantity)</li>
            <li>✓ Include all required curves with labels</li>
            <li>✓ Mark equilibrium points with coordinates</li>
            <li>✓ Use the full canvas area</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" onClick={onRetryWithWork} className="gap-2">
            <Pencil className="h-4 w-4" /> Try again with my current work
          </Button>
          <Button onClick={onStartFresh} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Start fresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
