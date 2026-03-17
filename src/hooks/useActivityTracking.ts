import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useActivityTracking() {
  const { user } = useAuth();
  const sessionStart = useRef<number>(Date.now());

  useEffect(() => {
    if (!user) return;
    sessionStart.current = Date.now();

    // Log page visit
    supabase.from("user_activity_log").insert({
      user_id: user.id,
      event_type: "session_start",
      metadata: { path: window.location.pathname },
    } as any).then(() => {});

    // Log session end on unload
    const handleUnload = () => {
      const duration = Math.round((Date.now() - sessionStart.current) / 1000);
      navigator.sendBeacon?.(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_activity_log`,
        JSON.stringify({
          user_id: user.id,
          event_type: "session_end",
          session_duration_seconds: duration,
        })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user]);

  const trackFeatureUse = (feature: string, metadata?: Record<string, any>) => {
    if (!user) return;
    supabase.from("user_activity_log").insert({
      user_id: user.id,
      event_type: "feature_use",
      feature,
      metadata: metadata || null,
    } as any).then(() => {});
  };

  return { trackFeatureUse };
}
