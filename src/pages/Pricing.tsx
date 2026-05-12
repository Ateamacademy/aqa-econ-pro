import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLAN, FREE_LIMITS } from "@/lib/plans";
import { Check, Crown, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const freeFeatures = [
  `${FREE_LIMITS.predictedPapers} Predicted Papers / month`,
  `${FREE_LIMITS.marking} Marking sessions / month`,
  "Full access to notes, questions & mark schemes",
  `${FREE_LIMITS.tutorQuestions} Tutor questions / month`,
  "Basic readiness score & progress tracking",
  `${FREE_LIMITS.diagrams} diagram builds with feedback`,
];

const proFeatures = [
  "Unlimited Predicted Papers",
  "Unlimited Marking",
  "Full readiness engine with mountain tracker",
  "Diagram builder with feedback",
  "Parent monitoring dashboard",
  "Performance analytics & grade trajectory",
  "24/7 Tutor unlimited",
  "Access to all future platform updates",
];

export default function Pricing() {
  const { user, subscribed, refreshSubscription } = useAuth();
  const navigate = useNavigate();
  const [activating, setActivating] = useState(false);
  const [activationFailed, setActivationFailed] = useState(false);

  const handleRefresh = async () => {
    const t = toast.loading("Checking your payment…");
    try {
      await refreshSubscription(true);
      toast.success("Subscription refreshed", { id: t });
    } catch {
      toast.error("Could not refresh · please try again in a moment", { id: t });
    }
  };

  // Post-checkout activation: poll subscription status until it flips to subscribed.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") !== "success") return;

    // Clean URL so refreshes don't re-trigger.
    const url = new URL(window.location.href);
    url.searchParams.delete("checkout");
    url.searchParams.delete("session_id");
    window.history.replaceState({}, "", url.toString());

    if (subscribed) return;
    setActivating(true);
    setActivationFailed(false);

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 12; // ~36s total
    const tick = async () => {
      if (cancelled) return;
      attempts += 1;
      try { await refreshSubscription(true); } catch (_) {}
      if (cancelled) return;
      if (attempts >= maxAttempts) {
        setActivating(false);
        setActivationFailed(true);
        return;
      }
      setTimeout(tick, 3000);
    };
    tick();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop polling state once subscription becomes active.
  useEffect(() => {
    if (subscribed && activating) {
      setActivating(false);
      setActivationFailed(false);
      toast.success("Pro access activated!");
    }
  }, [subscribed, activating]);

  const handleCheckout = async () => {
    if (!user) { navigate("/auth"); return; }
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: PLAN.priceId },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) {
      toast.error(e.message || "Failed to start checkout");
    }
  };

  const handleManage = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) {
      toast.error(e.message || "Failed to open subscription management");
    }
  };

  return (
    <div className="container py-16 max-w-4xl">
      {(activating || activationFailed) && !subscribed && (
        <Card className="mb-8 border-accent">
          <CardContent className="p-6 flex items-start gap-4">
            {activating ? (
              <Loader2 className="h-6 w-6 animate-spin text-accent shrink-0 mt-1" />
            ) : (
              <Sparkles className="h-6 w-6 text-accent shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                {activating ? "Activating your Pro access…" : "Payment received · activation pending"}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {activating
                  ? "Stripe is confirming your payment. This usually takes 10–30 seconds."
                  : "Your payment may still be processing. Click below to re-check, or contact support if it persists."}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={handleRefresh}>Refresh access now</Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="mailto:info@ateamacademy.co.uk?subject=Payment%20activation%20issue">
                    Contact support
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Simple Pricing.<br />No Surprises.
        </h1>
        <p className="text-muted-foreground text-lg">
          {subscribed
            ? "You have full access to all features!"
            : "Try free with limited attempts, then unlock everything with a single payment."}
        </p>
      </div>

      {subscribed ? (
        <div className="text-center">
          <Card className="max-w-md mx-auto border-accent">
            <CardContent className="p-8">
              <Crown className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h2 className="text-2xl font-bold mb-2">Econ Rev Pro · Active</h2>
              <p className="text-muted-foreground mb-6">Full access until 29 June 2026.</p>
              <Button onClick={handleManage} variant="outline">Manage Payment</Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Free Tier */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold mb-1">Free</h2>
              <p className="text-3xl font-bold mb-1">£0</p>
              <p className="text-sm text-muted-foreground mb-6">Limited attempts</p>
              <ul className="space-y-2 mb-6">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" size="lg" onClick={() => !user && navigate("/auth")}>
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="border-accent shadow-lg relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Popular
            </span>
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold mb-1">Exam Window Pass</h2>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{PLAN.price}</span>
                <span className="text-sm text-muted-foreground">/one-off</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Unlimited access until 29 June 2026</p>
              <ul className="space-y-2 mb-6">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Get Unlimited Access →
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {!subscribed && (
        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            One payment. No subscription. Access ends 29 June 2026.
          </p>
          {user && (
            <p className="text-xs text-muted-foreground">
              Already paid?{" "}
              <button onClick={handleRefresh} className="underline text-primary hover:text-primary/80">
                Refresh my access
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
