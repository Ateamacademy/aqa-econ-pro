import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Users, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function TeacherClasses() {
  const { user } = useAuth();
  const { schoolId } = useUserRoles();
  const [classes, setClasses] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", year_group: "Year 12", subject: "Mixed", exam_board: "AQA", ability_set: "Top set" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("classes").select("*").order("created_at", { ascending: false });
    const list = (data ?? []) as any[];
    setClasses(list);
    if (list.length) {
      const ids = list.map((c) => c.id);
      const { data: roster } = await supabase.from("class_students").select("class_id").in("class_id", ids);
      const map: Record<string, number> = {};
      (roster ?? []).forEach((r: any) => { map[r.class_id] = (map[r.class_id] ?? 0) + 1; });
      setCounts(map);
    }
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user?.id]);

  const create = async () => {
    if (!user || !schoolId) return;
    setBusy(true);
    const { error } = await supabase.from("classes").insert({
      school_id: schoolId, teacher_id: user.id, ...form,
    });
    if (error) { toast({ title: "Could not create class", description: error.message, variant: "destructive" }); setBusy(false); return; }
    toast({ title: "Class created" });
    setOpen(false);
    setBusy(false);
    setForm({ name: "", year_group: "Year 12", subject: "Mixed", exam_board: "AQA", ability_set: "Top set" });
    load();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: `Copied ${code}` });
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Classes</h1>
          <p className="text-sm text-muted-foreground mt-1">Create classes and share join codes with students.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Create class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New class</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="12A Economics" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Year group</Label><Input value={form.year_group} onChange={(e) => setForm({ ...form, year_group: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Micro / Macro / Mixed" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Exam board</Label><Input value={form.exam_board} onChange={(e) => setForm({ ...form, exam_board: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Ability set</Label><Input value={form.ability_set} onChange={(e) => setForm({ ...form, ability_set: e.target.value })} /></div>
              </div>
              <Button onClick={create} disabled={busy || !form.name.trim()} className="w-full">{busy ? "Creating…" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && classes.length === 0 && (
        <Card className="p-10 text-center">
          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium">No classes yet</p>
          <p className="text-xs text-muted-foreground mt-1">Create your first class to start onboarding students.</p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((c) => (
          <Card key={c.id} className="p-5 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{c.year_group} · {c.subject} · {c.exam_board}</p>
              </div>
              <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">{c.ability_set}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{counts[c.id] ?? 0} student{(counts[c.id] ?? 0) === 1 ? "" : "s"}</span>
              <button onClick={() => copyCode(c.join_code)} className="font-mono text-[11px] flex items-center gap-1 px-2 py-1 rounded-md bg-muted hover:bg-muted/80">
                {c.join_code} <Copy className="h-3 w-3" />
              </button>
            </div>
            <Button asChild size="sm" variant="outline" className="w-full mt-4">
              <Link to={`/teacher/classes/${c.id}`}>Open class</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
