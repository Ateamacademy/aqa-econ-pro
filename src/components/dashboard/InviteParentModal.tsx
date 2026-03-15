import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface InviteParentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteParentModal({ open, onOpenChange }: InviteParentModalProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
    if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("invite-parent", {
        body: { parentEmail: email },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); setLoading(false); return; }
      if (data?.inviteUrl) {
        setInviteUrl(data.inviteUrl);
        toast.success("Invite created! Share the link with your parent.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to send invite");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = (open: boolean) => {
    if (!open) { setEmail(""); setInviteUrl(null); setCopied(false); }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center items-center">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold">Invite Your Parent</DialogTitle>
          <DialogDescription>
            Your parent will be able to view your progress, grades, and study activity.
          </DialogDescription>
        </DialogHeader>

        {!inviteUrl ? (
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Parent's Email</label>
              <Input
                type="email"
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleInvite} disabled={loading} className="w-full gap-2">
              <Send className="h-4 w-4" />
              {loading ? "Creating Invite..." : "Send Invite"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">
              Share this link with your parent. They'll need to create an account to view your dashboard.
            </p>
            <div className="flex gap-2">
              <Input value={inviteUrl} readOnly className="text-xs" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Once your parent signs up and opens this link, they'll be connected to your account.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
