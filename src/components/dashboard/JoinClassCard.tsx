import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function JoinClassCard() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const join = async () => {
    if (!code.trim()) return;
    setBusy(true);
    const { error } = await supabase.rpc("join_class_by_code", { _code: code.trim().toUpperCase() });
    if (error) {
      toast({ title: "Could not join", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Joined class", description: "You'll see assignments from your teacher here." });
      setCode("");
    }
    setBusy(false);
  };

  return (
    <Card className="p-4 flex items-center gap-4 mb-4">
      <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
        <Users className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">Join a class</p>
        <p className="text-[11px] text-muted-foreground">Got a 6-character code from your teacher? Enter it here.</p>
      </div>
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        maxLength={6}
        placeholder="ABC123"
        className="w-28 font-mono text-center tracking-widest"
      />
      <Button size="sm" onClick={join} disabled={busy || code.trim().length < 4}>
        {busy ? "…" : "Join"}
      </Button>
    </Card>
  );
}
