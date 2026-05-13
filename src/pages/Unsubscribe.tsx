import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const r = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const j = await r.json().catch(() => ({}));
        if (j?.email) setEmail(j.email);
        if (j?.used || j?.alreadyUnsubscribed) setState("already");
        else if (r.ok && j?.valid !== false) setState("ready");
        else setState("invalid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error || (data as any)?.error) {
        setError((data as any)?.error || error?.message || "Could not unsubscribe");
        setState("error");
        return;
      }
      setState("done");
    } catch (e: any) {
      setError(e?.message || "Could not unsubscribe");
      setState("error");
    }
  };

  return (
    <div className="container max-w-md py-20">
      <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Email preferences</h1>
        {state === "loading" && (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" /> Checking link…
          </div>
        )}
        {state === "ready" && (
          <>
            <p className="text-muted-foreground text-sm">
              Unsubscribe {email ? <span className="text-foreground font-medium">{email}</span> : "this email"} from
              future Econ Rev emails?
            </p>
            <Button onClick={confirm} className="w-full">Confirm unsubscribe</Button>
          </>
        )}
        {state === "submitting" && (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" /> Updating…
          </div>
        )}
        {state === "done" && (
          <div className="space-y-2">
            <CheckCircle2 className="h-10 w-10 mx-auto text-primary" />
            <p className="font-semibold">You're unsubscribed</p>
            <p className="text-sm text-muted-foreground">
              {email || "This address"} won't receive further emails from us.
            </p>
          </div>
        )}
        {state === "already" && (
          <div className="space-y-2">
            <CheckCircle2 className="h-10 w-10 mx-auto text-primary" />
            <p className="font-semibold">Already unsubscribed</p>
            <p className="text-sm text-muted-foreground">No further action needed.</p>
          </div>
        )}
        {state === "invalid" && (
          <div className="space-y-2">
            <AlertCircle className="h-10 w-10 mx-auto text-destructive" />
            <p className="font-semibold">Invalid or expired link</p>
            <p className="text-sm text-muted-foreground">
              Contact elevate@econrev.co if you need help.
            </p>
          </div>
        )}
        {state === "error" && (
          <div className="space-y-2">
            <AlertCircle className="h-10 w-10 mx-auto text-destructive" />
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={confirm} variant="outline">Try again</Button>
          </div>
        )}
      </div>
    </div>
  );
}
