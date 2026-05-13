import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Users, ClipboardList, Sparkles } from "lucide-react";

/**
 * Banner shown on the student Dashboard for users who also have a staff role.
 * Provides a one-click bridge into the teacher workspace.
 */
export default function TeacherWorkspaceBanner() {
  const { user } = useAuth();
  const [isStaff, setIsStaff] = useState(false);
  const [hasSchool, setHasSchool] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const [rolesRes, profileRes] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", user.id),
        supabase.from("profiles").select("school_id").eq("user_id", user.id).maybeSingle(),
      ]);
      const roles = (rolesRes.data ?? []).map((r: any) => r.role);
      setIsStaff(roles.some((r: string) => ["teacher", "tutor", "hod", "admin"].includes(r)));
      setHasSchool(!!(profileRes.data as any)?.school_id);
      setLoading(false);
    })();
  }, [user?.id]);

  if (loading || !isStaff) return null;

  const target = hasSchool ? "/teacher" : "/teacher/onboarding";

  return (
    <Card className="mb-4 p-5 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded-full">
              Teacher
            </span>
            <span className="text-xs text-muted-foreground">Staff workspace available</span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-foreground">Open your teacher dashboard</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            Manage classes, set homework, review marking, and track department analytics.
          </p>
          <div className="hidden md:flex items-center gap-3 mt-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Classes</span>
            <span className="flex items-center gap-1"><ClipboardList className="h-3 w-3" /> Homework</span>
            <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> Insights</span>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link to={target}>
            {hasSchool ? "Open workspace" : "Set up school"}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
