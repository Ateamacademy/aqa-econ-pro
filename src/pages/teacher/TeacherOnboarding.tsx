import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, Building2, KeyRound } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function TeacherOnboarding() {
  const { user } = useAuth();
  const { refresh } = useUserRoles();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [schoolName, setSchoolName] = useState("");
  const [examBoards, setExamBoards] = useState("AQA, Edexcel A");
  const [inviteToken, setInviteToken] = useState("");
  const [busy, setBusy] = useState(false);

  const createSchool = async () => {
    if (!user || !schoolName.trim()) return;
    setBusy(true);
    const boards = examBoards.split(",").map((b) => b.trim()).filter(Boolean);
    const { data: school, error } = await supabase
      .from("schools")
      .insert({ name: schoolName.trim(), exam_boards: boards, owner_id: user.id })
      .select("id")
      .single();
    if (error || !school) {
      toast({ title: "Could not create school", description: error?.message, variant: "destructive" });
      setBusy(false);
      return;
    }
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ school_id: (school as any).id })
      .eq("user_id", user.id);
    if (profileErr) {
      toast({ title: "Could not link school to profile", description: profileErr.message, variant: "destructive" });
      setBusy(false);
      return;
    }
    toast({ title: "School created", description: "You are now the school admin." });
    await refresh();
    navigate("/teacher");
  };

  const joinByInvite = async () => {
    if (!user || !inviteToken.trim()) return;
    setBusy(true);
    const { data: invite, error } = await supabase
      .from("school_invites")
      .select("id, school_id, email, role, expires_at, accepted_at")
      .eq("token", inviteToken.trim())
      .maybeSingle();
    if (error || !invite) {
      toast({ title: "Invalid invite token", variant: "destructive" });
      setBusy(false);
      return;
    }
    const inv: any = invite;
    if (inv.accepted_at) { toast({ title: "Invite already used", variant: "destructive" }); setBusy(false); return; }
    if (new Date(inv.expires_at) < new Date()) { toast({ title: "Invite expired", variant: "destructive" }); setBusy(false); return; }
    const { error: profErr } = await supabase
      .from("profiles")
      .update({ school_id: inv.school_id })
      .eq("user_id", user.id);
    if (profErr) { toast({ title: profErr.message, variant: "destructive" }); setBusy(false); return; }
    await supabase.from("school_invites").update({ accepted_at: new Date().toISOString() }).eq("id", inv.id);
    toast({ title: "Joined school" });
    await refresh();
    navigate("/teacher");
  };

  return (
    <div className="min-h-screen bg-background dot-grid-bg flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, teacher</h1>
          <p className="text-sm text-muted-foreground mt-2">Create a school workspace or join an existing one.</p>
        </div>

        {mode === "choose" && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setMode("create")}>
              <Building2 className="h-6 w-6 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Create a school</h3>
              <p className="text-xs text-muted-foreground">You become the school admin and can invite teachers.</p>
            </Card>
            <Card className="p-6 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setMode("join")}>
              <KeyRound className="h-6 w-6 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Join via invite link</h3>
              <p className="text-xs text-muted-foreground">Paste the invite token your school admin shared.</p>
            </Card>
          </div>
        )}

        {mode === "create" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Create your school</h3>
            <div className="space-y-2">
              <Label>School name</Label>
              <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="St James College" />
            </div>
            <div className="space-y-2">
              <Label>Exam boards (comma-separated)</Label>
              <Input value={examBoards} onChange={(e) => setExamBoards(e.target.value)} placeholder="AQA, Edexcel A, OCR" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setMode("choose")} disabled={busy}>Back</Button>
              <Button onClick={createSchool} disabled={busy || !schoolName.trim()} className="flex-1">
                {busy ? "Creating…" : "Create school"}
              </Button>
            </div>
          </Card>
        )}

        {mode === "join" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Join an existing school</h3>
            <div className="space-y-2">
              <Label>Invite token</Label>
              <Input value={inviteToken} onChange={(e) => setInviteToken(e.target.value)} placeholder="paste token here" />
              <p className="text-[11px] text-muted-foreground">Your school admin can generate this from Settings.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setMode("choose")} disabled={busy}>Back</Button>
              <Button onClick={joinByInvite} disabled={busy || !inviteToken.trim()} className="flex-1">
                {busy ? "Joining…" : "Join school"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
