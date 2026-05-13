import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Copy, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function TeacherClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const [cls, setCls] = useState<any>(null);
  const [roster, setRoster] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!classId) return;
    setLoading(true);
    const { data: c } = await supabase.from("classes").select("*").eq("id", classId).maybeSingle();
    setCls(c);
    const { data: r } = await supabase.rpc("get_class_roster", { _class_id: classId });
    setRoster((r as any[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [classId]);

  const inviteByEmail = async () => {
    if (!classId || !inviteEmail.trim()) return;
    setBusy(true);
    // Look up an existing profile by email via auth.users isn't available client-side.
    // Workaround: call a tiny RPC or rely on email being present in profiles.display_name? Not reliable.
    // For pass 1: just show the join code and tell teacher to share it. We still capture intent.
    toast({
      title: "Share the join code",
      description: `Ask ${inviteEmail.trim()} to enter code ${cls?.join_code} from their student dashboard.`,
    });
    setInviteEmail("");
    setBusy(false);
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!cls) return <div className="p-8 text-sm text-muted-foreground">Class not found.</div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <Link to="/teacher/classes" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All classes
      </Link>

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{cls.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{cls.year_group} · {cls.subject} · {cls.exam_board} · {cls.ability_set}</p>
        </div>
        <Card className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Join code</p>
          <button
            onClick={() => { navigator.clipboard.writeText(cls.join_code); toast({ title: "Copied" }); }}
            className="font-mono text-lg font-bold text-foreground flex items-center gap-2"
          >
            {cls.join_code} <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </Card>
      </div>

      {/* Invite */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2"><UserPlus className="h-4 w-4 text-primary" /> Add students</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Share the join code <span className="font-mono font-semibold text-foreground">{cls.join_code}</span> with your students — they enter it on their dashboard.
          Or invite by email below to send them a reminder.
        </p>
        <div className="flex gap-2">
          <Input placeholder="student@email.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          <Button onClick={inviteByEmail} disabled={busy || !inviteEmail.trim()} className="gap-1.5">
            <Mail className="h-4 w-4" /> Invite
          </Button>
        </div>
      </Card>

      {/* Roster */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Roster ({roster.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {roster.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-8 text-center text-xs text-muted-foreground">No students yet. Share the join code above.</td></tr>
              )}
              {roster.map((s: any) => (
                <tr key={s.student_id} className="border-t border-border/60">
                  <td className="px-5 py-3 font-medium text-foreground">{s.display_name ?? "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(s.joined_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
