import { supabase } from "@/integrations/supabase/client";
import { PLAN } from "@/lib/plans";
import { toast } from "sonner";

/**
 * Start Stripe checkout immediately, skipping the pricing page.
 * - If user is not authenticated, sends them to /auth with a return target.
 * - On success, redirects current tab to Stripe Checkout.
 */
export async function startCheckout(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    // Remember intent so /auth can resume checkout after sign-in.
    try { sessionStorage.setItem("postAuthAction", "checkout"); } catch {}
    window.location.href = "/auth";
    return;
  }

  const t = toast.loading("Redirecting to secure checkout…");
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId: PLAN.priceId },
    });
    if (error) throw error;
    if (!data?.url) throw new Error("Checkout URL not returned");
    toast.dismiss(t);
    window.location.href = data.url;
  } catch (e: any) {
    toast.error(e?.message || "Failed to start checkout", { id: t });
  }
}
