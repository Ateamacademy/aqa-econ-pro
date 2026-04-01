import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscribed: boolean;
  subscriptionEnd: string | null;
  profile: { free_papers_used: number; free_questions_used: number; free_predicted_papers_used: number; free_tutor_used: number; free_diagrams_used: number; exam_board: string | null; target_grade: string | null; onboarding_completed: boolean } | null;
  signOut: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null, session: null, loading: true, subscribed: false,
  subscriptionEnd: null, profile: null,
  signOut: async () => {}, refreshSubscription: async () => {}, refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ free_papers_used: number; free_questions_used: number; free_predicted_papers_used: number; free_tutor_used: number; free_diagrams_used: number; exam_board: string | null; target_grade: string | null; onboarding_completed: boolean } | null>(null);
  const subscriptionRefreshInFlight = useRef<Promise<void> | null>(null);
  const lastSubscriptionRefreshAt = useRef(0);

  const refreshProfile = async () => {
    const { data: { user: u } } = await supabase.auth.getUser();
    if (!u) return;
    const { data } = await supabase.from("profiles").select("free_papers_used, free_questions_used, free_predicted_papers_used, free_tutor_used, free_diagrams_used, exam_board, target_grade, onboarding_completed").eq("user_id", u.id).single();
    if (data) setProfile(data);
  };

  const refreshSubscription = async () => {
    const now = Date.now();
    if (now - lastSubscriptionRefreshAt.current < 60_000) return;
    if (subscriptionRefreshInFlight.current) return subscriptionRefreshInFlight.current;

    const request = (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-subscription");
        if (error) {
          console.error("Sub check error:", error);
          return;
        }
        setSubscribed(data?.subscribed ?? false);
        setSubscriptionEnd(data?.subscription_end ?? null);
      } catch (e) {
        console.error("Sub check failed:", e);
      } finally {
        lastSubscriptionRefreshAt.current = Date.now();
        subscriptionRefreshInFlight.current = null;
      }
    })();

    subscriptionRefreshInFlight.current = request;
    return request;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setTimeout(() => { refreshSubscription(); refreshProfile(); }, 0);
      } else {
        setSubscribed(false);
        setSubscriptionEnd(null);
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) { refreshSubscription(); refreshProfile(); }
    }).catch((err) => {
      console.error("Auth session error:", err);
      setLoading(false);
    });

    // Safety timeout: never stay loading forever
    const safetyTimeout = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn("Auth loading timed out after 8s");
        return false;
      });
    }, 8000);

    return () => { subscription.unsubscribe(); clearTimeout(safetyTimeout); };
  }, []);

  // Auto-refresh subscription every 5 minutes (reduced to avoid Stripe rate limits)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(refreshSubscription, 300000);
    return () => clearInterval(interval);
  }, [user]);

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{ user, session, loading, subscribed, subscriptionEnd, profile, signOut, refreshSubscription, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
