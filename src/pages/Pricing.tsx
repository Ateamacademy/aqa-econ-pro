import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PLANS } from "@/lib/plans";
import { Check, Crown } from "lucide-react";
import { toast } from "sonner";

const features = [
  "Unlimited AI Tutor conversations",
  "Unlimited essay grading with detailed feedback",
  "Unlimited practice question generation",
  "Full past paper library access",
  "Complete study notes for all topics",
  "Progress tracking dashboard",
];

export default function Pricing() {
  const { user, subscribed } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (priceId: string) => {
    if (!user) { navigate("/auth"); return; }
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
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
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Unlock Full Access</h1>
        <p className="text-muted-foreground text-lg">
          {subscribed
            ? "You have full access to all features!"
            : "Try 1 free paper and 2 free questions, then subscribe for unlimited access."}
        </p>
      </div>

      {subscribed ? (
        <div className="text-center">
          <Card className="max-w-md mx-auto border-accent">
            <CardContent className="p-8">
              <Crown className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h2 className="text-2xl font-bold mb-2">Active Subscriber</h2>
              <p className="text-muted-foreground mb-6">You have unlimited access to all features.</p>
              <Button onClick={handleManage} variant="outline">Manage Subscription</Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(PLANS).map(([key, plan]) => (
            <Card key={key} className={key === "yearly" ? "border-accent shadow-lg relative" : ""}>
              {"badge" in plan && plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => handleCheckout(plan.priceId)} className="w-full" size="lg">
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
