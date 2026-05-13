import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, FileText, Loader2, Eye, Send, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

interface Assignment {
  id: string;
  title: string;
  topic: string | null;
  difficulty: string | null;
  time_minutes: number | null;
  status: string;
  content_json: any;
  mark_scheme_json: any;
  created_at: string;
}

export default function TeacherHomework() {
  const { classId } = useParams<{ classId: string }>();
  const [cls, setCls] = useState<any>(null);
  const [items, setItems] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<Assignment | null>(null);

  // form state
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"foundation" | "standard" | "stretch">("standard");
  const [questionType, setQuestionType] = useState<"short_answer" | "essay" | "data_response" | "mixed">("mixed");
  const [numQ, setNumQ] = useState(4);
  const [time, setTime] = useState(45);

  const load = async () => {
    if (!classId) return;
    setLoading(true);
    const [{ data: c }, { data: a }] = await Promise.all([
      supabase.from("classes").select("*").eq("id", classId).maybeSingle(),
      supabase.from("homework_assignments").select("*").eq("class_id", classId).order("created_at", { ascending: false }),
    ]);
    setCls(c);
    setItems((a as Assignment[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [classId]);

  const generate = async (publish: boolean) => {
    if (!classId || !topic.trim()) return;
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("generate-homework", {
      body: {
        class_id: classId,
        topic: topic.trim(),
        difficulty,
        question_type: questionType,
        num_questions: numQ,
        time_minutes: time,
        publish,
      },
    });
    setBusy(false);
    if (error) {
      toast({ title: "Generation failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: publish ? "Homework published" : "Draft saved" });
    setOpen(false);
    setTopic("");
    await load();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("homework_assignments").update({ status }).eq("id", id);
    if (error) toast({ title: "Update failed", description: error.message, variant: "destructive" });
    else { toast({ title: status === "published" ? "Published" : "Updated" }); await load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this homework?")) return;
    const { error } = await supabase.from("homework_assignments").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); await load(); }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!cls) return <div className="p-8 text-sm text-muted-foreground">Class not found.</div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <Link to={`/teacher/classes/${classId}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> {cls.name}
      </Link>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Homework</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate exam-style worksheets for {cls.name}.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5"><Sparkles className="h-4 w-4" /> New homework</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Generate homework</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Topic</Label>
                <Textarea
                  rows={2}
                  placeholder="e.g. Price elasticity of demand and government taxation"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Difficulty</Label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Question type</Label>
                  <Select value={questionType} onValueChange={(v) => setQuestionType(v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="short_answer">Short answer</SelectItem>
                      <SelectItem value="data_response">Data response</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Number of questions</Label>
                  <Input type="number" min={1} max={10} value={numQ} onChange={(e) => setNumQ(parseInt(e.target.value) || 4)} />
                </div>
                <div>
                  <Label className="text-xs">Time (minutes)</Label>
                  <Input type="number" min={10} max={180} value={time} onChange={(e) => setTime(parseInt(e.target.value) || 45)} />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => generate(false)} disabled={busy || !topic.trim()}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save as draft"}
              </Button>
              <Button onClick={() => generate(true)} disabled={busy || !topic.trim()} className="gap-1.5">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Generate &amp; publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <Card className="p-10 text-center">
          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground">No homework yet</p>
          <p className="text-xs text-muted-foreground mt-1">Click "New homework" to generate your first worksheet.</p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {items.map((a) => (
            <Card key={a.id} className="p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${a.status === "published" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                    {a.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{a.difficulty} · {a.time_minutes} min · {(a.content_json?.questions?.length ?? 0)} Qs · {a.content_json?.total_marks ?? "?"} marks</span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground truncate">{a.topic}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setPreview(a)} className="h-8 gap-1.5"><Eye className="h-3.5 w-3.5" /> Preview</Button>
                {a.status === "published" && (
                  <Link to={`/teacher/classes/${classId}/homework/${a.id}/submissions`}>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5"><FileText className="h-3.5 w-3.5" /> Submissions</Button>
                  </Link>
                )}
                {a.status === "draft" ? (
                  <Button size="sm" onClick={() => updateStatus(a.id, "published")} className="h-8 gap-1.5"><Send className="h-3.5 w-3.5" /> Publish</Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => updateStatus(a.id, "draft")} className="h-8">Unpublish</Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => remove(a.id)} className="h-8 w-8 p-0 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
          </DialogHeader>
          {preview?.content_json?.intro && <p className="text-sm text-muted-foreground italic">{preview.content_json.intro}</p>}
          <div className="space-y-5 mt-4">
            {(preview?.content_json?.questions ?? []).map((q: any, i: number) => (
              <div key={i} className="border-l-2 border-primary pl-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{q.number}. {q.command}</p>
                  <span className="text-[11px] font-mono text-muted-foreground">[{q.marks} marks]</span>
                </div>
                {q.context && <p className="text-xs text-muted-foreground italic mb-1">{q.context}</p>}
                <p className="text-sm text-foreground whitespace-pre-wrap">{q.stem}</p>
                {Array.isArray(q.mark_scheme) && q.mark_scheme.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-[11px] text-muted-foreground cursor-pointer hover:text-foreground">Mark scheme</summary>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {q.mark_scheme.map((m: any, j: number) => (
                        <li key={j}><span className="font-mono text-foreground">L{m.level} ({m.marks_range})</span> — {m.criteria}{m.indicative ? ` · e.g. ${m.indicative}` : ""}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
