import { ReactNode, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { toast } from "sonner";

/**
 * Server-backed RBAC guard for the Director section.
 *
 * Membership is determined by the `director` row in `public.user_roles`,
 * which is enforced server-side by RLS on every query the dashboard makes.
 * This guard is the client-side mirror: it prevents the page from rendering
 * for non-directors and redirects them with a clear toast.
 */
export default function DirectorGuard({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { isDirector, loading: rolesLoading } = useUserRoles();
  const location = useLocation();
  const notified = useRef(false);

  const loading = authLoading || rolesLoading;

  useEffect(() => {
    if (!loading && user && !isDirector && !notified.current) {
      notified.current = true;
      toast.error("You don't have access to this section.");
    }
  }, [loading, user, isDirector]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;
  if (!isDirector) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
