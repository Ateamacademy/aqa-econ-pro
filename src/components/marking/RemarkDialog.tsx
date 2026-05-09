import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface RemarkDialogProps {
  onRemark: (justification: string) => void;
  isReMarking: boolean;
}

export function RemarkDialog({ onRemark, isReMarking }: RemarkDialogProps) {
  const [open, setOpen] = useState(false);
  const [justification, setJustification] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <MessageSquare className="h-3.5 w-3.5" />
          Disagree with this mark? Request re-mark
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Re-Mark</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">Explain why you believe the mark should be different. Your justification will be sent alongside your original answer for a second opinion.</p>
        <Textarea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder="e.g. I believe I correctly labelled the MC_L curve above AC_L · see the top-right of my diagram…"
          className="min-h-[100px]"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            size="sm"
            disabled={!justification.trim() || isReMarking}
            onClick={() => {
              onRemark(justification.trim());
              setOpen(false);
            }}
          >
            {isReMarking ? "Re-marking…" : "Submit Re-Mark Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
