import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Copy, UserPlus, Upload, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PendingInvite {
  id: string;
  email: string;
  display_name: string | null;
  target_grade: string | null;
  expires_at: string;
  created_at: string;
}

interface ParsedRow { email: string; display_name?: string; target_grade?: string }

function parseCsv(text: string): ParsedRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  // Detect header
  const first = lines[0].toLowerCase();
  const hasHeader = first.includes("email");
  const startIdx = hasHeader ? 1 : 0;
  const headers = hasHeader
    ? lines[0].split(",").map((h) => h.trim().toLowerCase())
    : ["email", "display_name", "target_grade"];
  const eIdx = headers.findIndex((h) => h === "email" || h === "e-mail");
  const nIdx = headers.findIndex((h) => h.includes("name"));
  const gIdx = headers.findIndex((h) => h.includes("target") || h === "grade");
  const out: ParsedRow[] = [];
  for (let i = startIdx; i < lines.length; i++) {
    const cells = lines[i].split(",").map((c) => c.trim());
    const email = cells[eIdx >= 0 ? eIdx : 0];
    if (!email) continue;
    out.push({
      email,
      display_name: nIdx >= 0 ? cells[nIdx] : undefined,
      target_grade: gIdx >= 0 ? cells[gIdx] : undefined,
    });
  }
  return out;
}

export default function TeacherClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const [cls, setCls] = useState<any>(null);
  const [roster, setRoster] = useState<any[]>([]);
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [csvBusy, setCsvBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!classId) return;
    setLoading(true);
    const [{ data: c }, { data: r }, { data: inv }] = await Promise.all([
      supabase.from("classes").select("*").eq("id", classId).maybeSingle(),
      supabase.rpc("get_class_roster", { _class_id: classId }),
      supabase
        .from("class_invites")
        .select("id,email,display_name,target_grade,expires_at,created_at")
        .eq("class_id", classId)
        .is("accepted_at", null)
        .order("created_at", { ascending: false }),
    ]);
    setCls(c);
    setRoster((r as any[]) ?? []);
    setInvites((inv as PendingInvite[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [classId]);

  const submitInvites = async (rows: ParsedRow[]) => {
    if (!classId || rows.length === 0) return;
    const { data, error } = await supabase.functions.invoke("import-class-students", {
      body: { class_id: classId, invites: rows, send_email: true },
    });
    if (error) {
      toast({ title: "Import failed", description: error.message, variant: "destructive" });
      return;
    }
    const created = (data as any)?.created ?? 0;
    const skipped = ((data as any)?.skipped ?? []).length;
    toast({ title: "Invites sent", description: `${created} invited, ${skipped} skipped.` });
    await load();
  };

  const inviteByEmail = async () => {
    if (!inviteEmail.trim()) return;
    setBusy(true);
    await submitInvites([{ email: inviteEmail.trim() }]);
    setInviteEmail("");
    setBusy(false);
  };

  const onCsvSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvBusy(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (rows.length === 0) {
        toast({ title: "Empty CSV", description: "No valid rows found.", variant: "destructive" });
      } else if (rows.length > 200) {
        toast({ title: "Too many rows", description: "Max 200 per upload.", variant: "destructive" });
      } else {
        await submitInvites(rows);
      }
    } finally {
      setCsvBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const revokeInvite = async (id: string) => {
    const { error } = await supabase.from("class_invites").delete().eq("id", id);
    if (error) toast({ title: "Could not revoke", description: error.message, variant: "destructive" });
    else { toast({ title: "Invite revoked" }); await load(); }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!cls) return <div className="p-8 text-sm text-muted-foreground">Class not found.</div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <Link to="/teacher/classes" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All classes
      </Link>

      <div className="flex items-end justify-between gap-4 flex-wrap">
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

      {/* Add students */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" /> Add students
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Invite by email (single or CSV). Students get an email with the join code; if they already have an account using the same email,
          they're added to the class automatically on next sign-in.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <Input placeholder="student@email.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          <Button onClick={inviteByEmail} disabled={busy || !inviteEmail.trim()} className="gap-1.5">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Invite
          </Button>
        </div>

        <div className="rounded-lg border border-dashed border-border p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">Bulk CSV upload</p>
            <p className="text-[11px] text-muted-foreground">Columns: <span className="font-mono">email, display_name, target_grade</span> (header optional, max 200 rows).</p>
          </div>
          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={onCsvSelected} className="hidden" />
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={csvBusy} className="gap-1.5">
              {csvBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Pending invites */}
      {invites.length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Pending invites ({invites.length})</h2>
            <span className="text-[10px] text-muted-foreground">Awaiting sign-in</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Target</th>
                  <th className="px-5 py-3 font-medium">Expires</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {invites.map((i) => (
                  <tr key={i.id} className="border-t border-border/60">
                    <td className="px-5 py-3 text-foreground">{i.email}</td>
                    <td className="px-5 py-3 text-muted-foreground">{i.display_name ?? "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{i.target_grade ?? "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(i.expires_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => revokeInvite(i.id)} className="h-7 w-7 p-0 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

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
                <tr><td colSpan={3} className="px-5 py-8 text-center text-xs text-muted-foreground">No students yet. Invite by email or share the join code above.</td></tr>
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
