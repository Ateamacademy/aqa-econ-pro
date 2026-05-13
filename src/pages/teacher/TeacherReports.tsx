import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Send, Loader2, FileText, Mail, History } from "lucide-react";

type Cls = { id: string; name: string };
type Student = { user_id: string; display_name: string | null; email: string | null };
type ReportContent = {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  next_steps: string[];
  predicted_grade: string | null;
};

export default function TeacherReports() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Cls[]>([]);
  const [classId, setClassId] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState<string>("");
  const [tone, setTone] = useState<"warm" | "professional" | "concise">("professional");
  const [period, setPeriod] = useState("Autumn half-term");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<ReportContent | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  const [parentEmail, setParentEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("classes").select("id, name").eq("teacher_id", user.id).then(({ data }) => {
      setClasses((data ?? []) as Cls[]);
      if (data?.[0]) setClassId(data[0].id);
    });
  }, [user]);

  useEffect(() => {
    if (!classId) return;
    setStudentId(""); setReport(null); setReportId(null);
    supabase.rpc("get_class_roster", { _class_id: classId }).then(({ data }) => {
      setStudents((data ?? []).map((r: any) => ({ user_id: r.student_id, display_name: r.display_name, email: r.email })));
    });
    supabase.from("parent_emails").select("*").eq("class_id", classId).order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setHistory(data ?? []));
  }, [classId]);

  const studentName = useMemo(() => students.find((s) => s.user_id === studentId)?.display_name || students.find((s) => s.user_id === studentId)?.email?.split("@")[0] || "student", [students, studentId]);

  const generate = async () => {
    if (!studentId) { toast({ title: "Pick a student first" }); return; }
    setGenerating(true); setReport(null);
    const { data, error } = await supabase.functions.invoke("generate-student-report", {
      body: { studentId, classId, tone, period },
    });
    setGenerating(false);
    if (error || data?.error) {
      toast({ title: "Couldn't generate report", description: data?.error || error?.message, variant: "destructive" });
      return;
    }
    const r = data.report;
    setReport(r.content);
    setReportId(r.id);
    // Pre-fill email
    setEmailSubject(`${studentName} — ${period} update`);
    setEmailBody(composeEmailBody(r.content, studentName));
  };

  const composeEmailBody = (c: ReportContent, name: string) => {
    const parts: string[] = [];
    if (c.overview) parts.push(c.overview);
    if (c.strengths?.length) parts.push(`Strengths:\n• ${c.strengths.join("\n• ")}`);
    if (c.weaknesses?.length) parts.push(`Areas to develop:\n• ${c.weaknesses.join("\n• ")}`);
    if (c.next_steps?.length) parts.push(`Next steps:\n• ${c.next_steps.join("\n• ")}`);
    if (c.predicted_grade) parts.push(`Current predicted grade: ${c.predicted_grade}.`);
    return parts.join("\n\n");
  };

  const send = async () => {
    if (!parentEmail || !emailSubject || !emailBody) { toast({ title: "Fill all email fields" }); return; }
    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-parent-email", {
      body: { studentId, classId, parentEmail, subject: emailSubject, bodyText: emailBody, type: "report" },
    });
    setSending(false);
    if (error || data?.error) {
      toast({ title: "Couldn't send", description: data?.error || error?.message, variant: "destructive" });
      return;
    }
    toast({ title: "Email sent", description: `Delivered to ${parentEmail}` });
    setParentEmail("");
    // Refresh history
    const { data: h } = await supabase.from("parent_emails").select("*").eq("class_id", classId).order("created_at", { ascending: false }).limit(20);
    setHistory(h ?? []);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Reports & parent comms</h1>
        <p className="text-sm text-muted-foreground mt-1">Generate AI-written reports and send branded parent updates.</p>
      </div>

      {/* Selectors */}
      <Card className="p-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Label className="text-xs">Class</Label>
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger><SelectValue placeholder="Pick a class" /></SelectTrigger>
            <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Student</Label>
          <Select value={studentId} onValueChange={setStudentId}>
            <SelectTrigger><SelectValue placeholder="Pick a student" /></SelectTrigger>
            <SelectContent>{students.map((s) => <SelectItem key={s.user_id} value={s.user_id}>{s.display_name || s.email}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Tone</Label>
          <Select value={tone} onValueChange={(v: any) => setTone(v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="warm">Warm & encouraging</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Period</Label>
          <Input value={period} onChange={(e) => setPeriod(e.target.value)} />
        </div>
        <div className="md:col-span-4">
          <Button onClick={generate} disabled={generating || !studentId}>
            {generating ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate report</>}
          </Button>
        </div>
      </Card>

      {/* Report */}
      {report && (
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Report card · {studentName}</h2>
            {report.predicted_grade && <span className="ml-auto text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">Predicted: {report.predicted_grade}</span>}
          </div>
          {report.overview && <p className="text-sm text-foreground leading-relaxed">{report.overview}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReportList title="Strengths" items={report.strengths} tone="text-emerald-400" />
            <ReportList title="Areas to develop" items={report.weaknesses} tone="text-amber-400" />
            <ReportList title="Next steps" items={report.next_steps} tone="text-primary" />
          </div>
        </Card>
      )}

      {/* Parent email composer */}
      {report && (
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Compose parent email</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Parent email</Label>
              <Input type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} placeholder="parent@example.com" />
            </div>
            <div>
              <Label className="text-xs">Subject</Label>
              <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Body (edit before sending)</Label>
            <Textarea rows={10} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
          </div>
          <Button onClick={send} disabled={sending}>
            {sending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</> : <><Send className="h-4 w-4 mr-2" /> Send email</>}
          </Button>
        </Card>
      )}

      {/* History */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Parent email history</h2>
        </div>
        {history.length === 0 ? (
          <p className="px-5 py-8 text-center text-xs text-muted-foreground">No emails sent yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {history.map((h) => (
              <li key={h.id} className="px-5 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{h.subject}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{h.body?.slice(0, 120)}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${h.sent_at ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                  {h.sent_at ? "Sent" : "Draft"}
                </span>
                <span className="text-[11px] text-muted-foreground w-28 text-right">{new Date(h.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function ReportList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className={`text-[11px] uppercase tracking-wider font-semibold mb-2 ${tone}`}>{title}</p>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-foreground leading-relaxed flex gap-2">
            <span className="text-muted-foreground">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
