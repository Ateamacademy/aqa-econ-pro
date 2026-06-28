import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Only allow a password change when this page was actually reached via a valid
  // recovery link (which establishes a recovery session). Otherwise show an
  // invalid/expired state instead of letting any visitor call updateUser.
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) setReady(true);
    });
    // The recovery link is consumed asynchronously on load; check for an existing
    // session, and if none has appeared shortly after, treat the link as invalid.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const t = setTimeout(() => setReady((r) => { if (!r) setInvalid(true); return r; }), 4000);
    return () => { sub.subscription.unsubscribe(); clearTimeout(t); };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated! Please log in with your new password.");
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="container py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {invalid ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This password reset link is invalid or has expired. Request a new one from the login page.
              </p>
              <Button className="w-full" onClick={() => navigate("/auth")}>Back to login</Button>
            </div>
          ) : !ready ? (
            <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <Input type="password" placeholder="New password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
