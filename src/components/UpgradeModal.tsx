import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Unlimited AI Predicted Papers",
  "Unlimited AI Marking & Grading",
  "Unlimited AI Tutor questions",
  "Unlimited diagram practice with AI feedback",
  "Full readiness engine & performance analytics",
];

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

export function UpgradeModal({ open, onOpenChange, feature }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center items-center">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
            <Crown className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold">
            You've hit your free limit
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {feature
              ? `You've used all your free ${feature}. Upgrade to unlock unlimited access.`
              : "Upgrade to Econ Rev Pro to unlock unlimited access to all features."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5 my-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">{b}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button asChild size="lg" className="w-full gap-2">
            <Link to="/pricing" onClick={() => onOpenChange(false)}>
              Upgrade for £29 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            One payment · Access until 29 June 2026
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
