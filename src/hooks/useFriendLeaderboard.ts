import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface FriendScore {
  user_id: string;
  display_name: string;
  score_avg: number;
  session_count: number;
  isYou: boolean;
}

export interface FriendRequest {
  id: string;
  requester_id: string;
  display_name: string;
  created_at: string;
}

export function useFriendLeaderboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState<FriendScore[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [friendCount, setFriendCount] = useState(0);

  const fetchScores = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.rpc("get_friend_scores", {
      requesting_user_id: user.id,
    });
    if (data) {
      setScores(
        (data as any[]).map((d) => ({
          user_id: d.user_id,
          display_name: d.user_id === user.id ? "You" : (d.display_name || "User"),
          score_avg: Number(d.score_avg),
          session_count: Number(d.session_count),
          isYou: d.user_id === user.id,
        }))
      );
      setFriendCount((data as any[]).length - 1); // exclude self
    }
    setLoading(false);
  }, [user]);

  const fetchPending = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("friendships")
      .select("id, requester_id, created_at")
      .eq("addressee_id", user.id)
      .eq("status", "pending");
    if (data) {
      // Get display names for requesters
      const ids = data.map((d) => d.requester_id);
      if (ids.length === 0) {
        setPendingRequests([]);
        return;
      }
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", ids);
      const nameMap = new Map(
        (profiles || []).map((p) => [p.user_id, p.display_name || "User"])
      );
      setPendingRequests(
        data.map((d) => ({
          id: d.id,
          requester_id: d.requester_id,
          display_name: nameMap.get(d.requester_id) || "User",
          created_at: d.created_at,
        }))
      );
    }
  }, [user]);

  useEffect(() => {
    fetchScores();
    fetchPending();
  }, [fetchScores, fetchPending]);

  const sendRequest = useCallback(
    async (friendEmail: string): Promise<{ error?: string }> => {
      if (!user) return { error: "Not signed in" };
      // We need to find the user by email - but we can't query auth.users
      // Instead, we'll use a friend code approach: user shares their user_id
      // For now, treat friendEmail as the target user_id (friend code)
      const targetId = friendEmail.trim();
      if (targetId === user.id) return { error: "Can't add yourself" };

      // Check if friendship already exists
      const { data: existing } = await supabase
        .from("friendships")
        .select("id")
        .or(
          `and(requester_id.eq.${user.id},addressee_id.eq.${targetId}),and(requester_id.eq.${targetId},addressee_id.eq.${user.id})`
        );
      if (existing && existing.length > 0) return { error: "Already connected" };

      const { error } = await supabase.from("friendships").insert({
        requester_id: user.id,
        addressee_id: targetId,
      });
      if (error) return { error: error.message.includes("uuid") ? "Invalid friend code" : error.message };
      await fetchScores();
      return {};
    },
    [user, fetchScores]
  );

  const respondToRequest = useCallback(
    async (requestId: string, accept: boolean) => {
      await supabase
        .from("friendships")
        .update({ status: accept ? "accepted" : "rejected" })
        .eq("id", requestId);
      await Promise.all([fetchScores(), fetchPending()]);
    },
    [fetchScores, fetchPending]
  );

  const removeFriend = useCallback(
    async (friendUserId: string) => {
      if (!user) return;
      await supabase
        .from("friendships")
        .delete()
        .or(
          `and(requester_id.eq.${user.id},addressee_id.eq.${friendUserId}),and(requester_id.eq.${friendUserId},addressee_id.eq.${user.id})`
        );
      await fetchScores();
    },
    [user, fetchScores]
  );

  return {
    scores,
    pendingRequests,
    loading,
    friendCount,
    sendRequest,
    respondToRequest,
    removeFriend,
    refresh: fetchScores,
  };
}
