import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { supabase } from "@/integrations/supabase/client";
import TeacherShell from "./TeacherShell";

export default function TeacherGuard({ children, allowOnboarding = false }: { children: ReactNode; allowOnboarding?: boolean }) {
  const { user, loading: authLoading } = useAuth();
  const { roles, schoolId, loading: rolesLoading, isStaff } = useUserRoles();
  const location = useLocation();
  const [schoolName, setSchoolName] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setSchoolName(null); return; }
    supabase.from("schools").select("name").eq("id", schoolId).maybeSingle()
      .then(({ data }: any) => setSchoolName(data?.name ?? null));
  }, [schoolId]);

  if (authLoading || rolesLoading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;
  if (!isStaff) return <Navigate to="/dashboard" replace />;
  if (!schoolId && !allowOnboarding) return <Navigate to="/teacher/onboarding" replace />;
  if (schoolId && allowOnboarding) return <Navigate to="/teacher" replace />;

  if (allowOnboarding) {
    // Onboarding renders without the shell
    return <>{children}</>;
  }
  return <TeacherShell schoolName={schoolName}>{children}</TeacherShell>;
}
