import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FREE_LIMITS } from "@/lib/plans";

type DiagramAccessSnapshot = {
  isLoading: boolean;
  isAllowed: boolean;
  remainingAttempts: number | null;
  isPremium: boolean;
  message: string;
  error: string | null;
};

const CHECKING_MESSAGE = "We’re checking your available attempts...";

const normaliseUsed = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.floor(value));
};

const buildSnapshot = ({
  used,
  isPremium,
  isLoading,
  error,
}: {
  used: number;
  isPremium: boolean;
  isLoading: boolean;
  error: string | null;
}): DiagramAccessSnapshot => {
  const remaining = Math.max(0, FREE_LIMITS.diagrams - used);

  if (isPremium) {
    return {
      isLoading,
      isAllowed: true,
      remainingAttempts: null,
      isPremium: true,
      message: "Unlimited practice",
      error,
    };
  }

  if (isLoading || error) {
    return {
      isLoading,
      isAllowed: true,
      remainingAttempts: remaining,
      isPremium: false,
      message: CHECKING_MESSAGE,
      error,
    };
  }

  return {
    isLoading: false,
    isAllowed: remaining > 0,
    remainingAttempts: remaining,
    isPremium: false,
    message:
      remaining > 0
        ? `${remaining} free attempt(s) remaining`
        : `You’ve used all ${FREE_LIMITS.diagrams} free diagram attempts.`,
    error: null,
  };
};

export function useDiagramAccess() {
  const {
    user,
    loading: authLoading,
    profile,
    subscribed,
    refreshProfile,
    refreshSubscription,
  } = useAuth();

  const usedRef = useRef<number>(normaliseUsed(profile?.free_diagrams_used));
  const premiumRef = useRef<boolean>(!!subscribed);
  const [state, setState] = useState<DiagramAccessSnapshot>(() =>
    authLoading
      ? buildSnapshot({ used: usedRef.current, isPremium: premiumRef.current, isLoading: true, error: null })
      : buildSnapshot({ used: usedRef.current, isPremium: premiumRef.current, isLoading: false, error: null })
  );

  const applyState = useCallback((next: DiagramAccessSnapshot, used: number, premium: boolean) => {
    usedRef.current = used;
    premiumRef.current = premium;
    setState(next);
    return next;
  }, []);

  const refresh = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}): Promise<DiagramAccessSnapshot> => {
      if (!user) {
        const signedOutState: DiagramAccessSnapshot = {
          isLoading: false,
          isAllowed: false,
          remainingAttempts: FREE_LIMITS.diagrams,
          isPremium: false,
          message: "Sign in to practice diagrams",
          error: null,
        };
        return applyState(signedOutState, 0, false);
      }

      const fallbackUsed = normaliseUsed(profile?.free_diagrams_used ?? usedRef.current);
      const fallbackPremium = subscribed || premiumRef.current;

      if (!silent) {
        applyState(
          buildSnapshot({
            used: fallbackUsed,
            isPremium: fallbackPremium,
            isLoading: true,
            error: null,
          }),
          fallbackUsed,
          fallbackPremium
        );
      }

      let latestUsed = fallbackUsed;
      let latestPremium = fallbackPremium;
      let errorMessage: string | null = null;

      const [subscriptionResult, profileResult] = await Promise.allSettled([
        supabase.functions.invoke("check-subscription"),
        supabase
          .from("profiles")
          .select("free_diagrams_used")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (subscriptionResult.status === "fulfilled") {
        const { data, error } = subscriptionResult.value;
        if (error) {
          errorMessage = error.message;
        } else if (typeof data?.subscribed === "boolean") {
          latestPremium = data.subscribed;
        }
      } else {
        errorMessage = subscriptionResult.reason instanceof Error
          ? subscriptionResult.reason.message
          : "Failed to check subscription status";
      }

      if (profileResult.status === "fulfilled") {
        const { data, error } = profileResult.value;
        if (error) {
          errorMessage = error.message;
        } else if (data) {
          latestUsed = normaliseUsed(data.free_diagrams_used);
        } else {
          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .upsert({ user_id: user.id }, { onConflict: "user_id" })
            .select("free_diagrams_used")
            .maybeSingle();

          if (createError) {
            errorMessage = createError.message;
          } else {
            latestUsed = normaliseUsed(createdProfile?.free_diagrams_used);
          }
        }
      } else {
        errorMessage = profileResult.reason instanceof Error
          ? profileResult.reason.message
          : "Failed to load diagram attempts";
      }

      const next = buildSnapshot({
        used: latestUsed,
        isPremium: latestPremium,
        isLoading: false,
        error: errorMessage,
      });

      void refreshProfile();
      void refreshSubscription();

      return applyState(next, latestUsed, latestPremium);
    },
    [applyState, profile?.free_diagrams_used, refreshProfile, refreshSubscription, subscribed, user]
  );

  const consumeAttempt = useCallback(async () => {
    if (!user) return false;
    if (premiumRef.current) return true;

    const currentUsed = normaliseUsed(usedRef.current);
    const remaining = Math.max(0, FREE_LIMITS.diagrams - currentUsed);
    if (remaining <= 0) {
      applyState(buildSnapshot({ used: currentUsed, isPremium: false, isLoading: false, error: null }), currentUsed, false);
      return false;
    }

    const nextUsed = currentUsed + 1;
    const { data, error } = await supabase
      .from("profiles")
      .update({ free_diagrams_used: nextUsed } as never)
      .eq("user_id", user.id)
      .eq("free_diagrams_used", currentUsed)
      .select("free_diagrams_used")
      .maybeSingle();

    if (error || !data) {
      const latest = await refresh({ silent: true });
      return latest.isAllowed;
    }

    const committedUsed = normaliseUsed(data.free_diagrams_used);
    const next = buildSnapshot({ used: committedUsed, isPremium: false, isLoading: false, error: null });
    applyState(next, committedUsed, false);
    void refreshProfile();
    return next.isAllowed;
  }, [applyState, refresh, refreshProfile, user]);

  const resetAttemptsForTesting = useCallback(async () => {
    if (!import.meta.env.DEV || !user) return false;

    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: user.id, free_diagrams_used: 0 }, { onConflict: "user_id" });

    if (error) {
      setState((prev) => ({ ...prev, error: error.message }));
      return false;
    }

    await refresh();
    return true;
  }, [refresh, user]);

  useEffect(() => {
    if (!user) {
      applyState(
        {
          isLoading: authLoading,
          isAllowed: false,
          remainingAttempts: FREE_LIMITS.diagrams,
          isPremium: false,
          message: authLoading ? CHECKING_MESSAGE : "Sign in to practice diagrams",
          error: null,
        },
        0,
        false
      );
      return;
    }

    void refresh();
  }, [applyState, authLoading, refresh, user]);

  useEffect(() => {
    if (!user) return;

    const refreshSilently = () => {
      void refresh({ silent: true });
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") refreshSilently();
    };

    window.addEventListener("focus", refreshSilently);
    document.addEventListener("visibilitychange", handleVisibility);
    const intervalId = window.setInterval(refreshSilently, 45000);

    return () => {
      window.removeEventListener("focus", refreshSilently);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearInterval(intervalId);
    };
  }, [refresh, user]);

  return {
    ...state,
    refresh,
    consumeAttempt,
    resetAttemptsForTesting,
  };
}