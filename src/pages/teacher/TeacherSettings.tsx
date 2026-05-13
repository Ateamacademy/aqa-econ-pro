import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Settings, Loader2, Building2, User, Shield, LogOut, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function TeacherSettings() {
  const { user, signOut } = useAuth();
  const { roles, isHod } = useUserRoles();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingSchool, setSavingSchool] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [department, setDepartment] = useState("");
  const [school, setSchool] = useState<{ id: string; name: string; owner_id: string; exam_boards: string[] } | null>(null);
  const [schoolName, setSchoolName] = useState("");
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: prof } = await supabase
        .from("profiles")
        .select("display_name, department, school_id")
        .eq("user_id", user.id).maybeSingle();
      setDisplayName(prof?.display_name ?? "");
      setDepartment(prof?.department ?? "");
      if (prof?.school_id) {
        const { data: s } = await supabase.from("schools").select("*").eq("id", prof.school_id).maybeSingle();
        if (s) { setSchool(s as any); setSchoolName((s as any).name); }
      }
      const { count: cc } = await supabase.from("classes").select("id", { count: "exact", head: true }).eq("teacher_id", user.id);
      setClassCount(cc ?? 0);
      const { data: roster } = await supabase.from("classes").select("id").eq("teacher_id", user.id);
      const ids = (roster ?? []).map((r: any) => r.id);
      if (ids.length) {
        const { data: cs } = await supabase.from("class_students").select("student_id").in("class_id", ids);
        setStudentCount(new Set((cs ?? []).map((r: any) => r.student_id)).size);
      }
      setLoading(false);
    })();
  }, [user?.id]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() || null, department: department.trim() || null })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated" });
  };

  const saveSchool = async () => {
    if (!school || school.owner_id !== user?.id) return;
    setSavingSchool(true);
    const { error } = await supabase.from("schools").update({ name: schoolName.trim() }).eq("id", school.id);
    setSavingSchool(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "School updated" }); setSchool({ ...school, name: schoolName.trim() }); }
  };

  const ownsSchool = !!school && school.owner_id === user?.id;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[900px] mx-auto">
      <header>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
          <Settings className="h-3.5 w-3.5" /> Settings
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Workspace settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, school and access.</p>
      </header>

      {/* Account */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Your profile</h2>
        </div>
        {loading ? (
          <div className="space-y-3"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Email</Label>
              <Input value={user?.email ?? ""} disabled />
            </div>
            <div>
              <Label className="text-xs">Display name</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Mr Patel" />
            </div>
            <div>
              <Label className="text-xs">Department</Label>
              <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Economics" />
            </div>
            <div className="flex items-end">
              <Button onClick={saveProfile} disabled={saving} size="sm">
                {saving && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />} Save profile
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Roles */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Roles & access</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.length === 0
            ? <span className="text-xs text-muted-foreground">No roles assigned.</span>
            : roles.map((r) => <Badge key={r} variant="outline" className="text-[10px] uppercase">{r}</Badge>)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          <Mini label="Classes" value={classCount} />
          <Mini label="Students" value={studentCount} />
          <Mini label="HoD access" value={isHod ? "Yes" : "No"} />
        </div>
      </Card>

      {/* School */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">School</h2>
        </div>
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : !school ? (
          <div className="text-sm text-muted-foreground">
            You're not linked to a school yet.{" "}
            <Link to="/teacher/onboarding" className="text-primary underline">Complete onboarding</Link>.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">School name</Label>
              <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} disabled={!ownsSchool} />
              {!ownsSchool && <p className="text-[11px] text-muted-foreground mt-1">Only the school owner can rename.</p>}
            </div>
            <div>
              <Label className="text-xs">Exam boards</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {(school.exam_boards ?? []).length === 0
                  ? <span className="text-xs text-muted-foreground">None set</span>
                  : (school.exam_boards ?? []).map((b) => <Badge key={b} variant="secondary" className="text-[10px] uppercase">{b}</Badge>)}
              </div>
            </div>
            {ownsSchool && (
              <div className="flex items-end">
                <Button onClick={saveSchool} disabled={savingSchool || !schoolName.trim()} size="sm">
                  {savingSchool && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />} Save school
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Quick links */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Shortcuts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button asChild variant="outline" size="sm" className="justify-between"><Link to="/teacher/classes">Classes <ExternalLink className="h-3 w-3" /></Link></Button>
          <Button asChild variant="outline" size="sm" className="justify-between"><Link to="/teacher/reports">Reports <ExternalLink className="h-3 w-3" /></Link></Button>
          <Button asChild variant="outline" size="sm" className="justify-between"><Link to="/teacher/interventions">Interventions <ExternalLink className="h-3 w-3" /></Link></Button>
          {isHod && <Button asChild variant="outline" size="sm" className="justify-between"><Link to="/teacher/department">Department <ExternalLink className="h-3 w-3" /></Link></Button>}
          <Button asChild variant="outline" size="sm" className="justify-between"><Link to="/dashboard">Student view <ExternalLink className="h-3 w-3" /></Link></Button>
        </div>
      </Card>

      <Card className="p-5 border-destructive/30">
        <h2 className="text-sm font-semibold text-foreground mb-1">Sign out</h2>
        <p className="text-xs text-muted-foreground mb-3">End your session on this device.</p>
        <Button onClick={signOut} variant="destructive" size="sm" className="gap-1.5">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </Button>
      </Card>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-border rounded-lg p-3 bg-muted/20">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}
