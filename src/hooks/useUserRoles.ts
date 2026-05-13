import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type AppRole = "student" | "teacher" | "tutor" | "hod" | "admin";

export function useUserRoles() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!user) {
      setRoles([]);
      setSchoolId(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [rolesRes, profileRes] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", user.id),
      supabase.from("profiles").select("school_id").eq("user_id", user.id).maybeSingle(),
    ]);
    setRoles((rolesRes.data ?? []).map((r: any) => r.role as AppRole));
    setSchoolId((profileRes.data as any)?.school_id ?? null);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const isStaff = roles.some((r) => ["teacher", "tutor", "hod", "admin"].includes(r));
  const isAdmin = roles.includes("admin");
  const isHod = roles.includes("hod") || isAdmin;

  return { roles, schoolId, loading, isStaff, isAdmin, isHod, refresh };
}
