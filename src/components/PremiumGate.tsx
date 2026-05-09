import { Link } from "react-router-dom";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { hasPremiumAccess } from "@/lib/premiumAccess";
import type { ReactNode } from "react";

interface PremiumGateProps {
  /** Short feature label e.g. "Papers" or "Hard & Advanced predicted papers". */
  feature: string;
  /** Optional supporting copy. */
  description?: string;
  children: ReactNode;
}

/**
 * Wraps premium-only routes. Renders an upgrade prompt for non-subscribers
 * (admins are auto-allowed via the tester allowlist on the backend).
 */
export function PremiumGate({ feature, description, children }: PremiumGateProps) {
  const { user, subscribed, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (hasPremiumAccess({ subscribed, email: user?.email })) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-12 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
          {feature} is a Pro feature
        </h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          {description ??
            "Upgrade to unlock the full library of mock papers, mark schemes and AI marking."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/pricing">
              <Sparkles className="h-4 w-4" /> Upgrade to Pro
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {!user && (
            <Button asChild size="lg" variant="outline">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
