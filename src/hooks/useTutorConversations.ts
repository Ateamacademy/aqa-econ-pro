import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type TutorMsg = { role: "user" | "assistant"; content: string };

export interface TutorConversationSummary {
  id: string;
  title: string;
  subject: string;
  updated_at: string;
}

// `tutor_conversations` is a newer table; cast through `any` so the typed client
// doesn't complain before types.ts is regenerated. Every call is wrapped in
// try/catch so the tutor keeps working even if the migration hasn't been applied
// yet (history simply won't load/save — it never crashes the page).
const table = () => (supabase as any).from("tutor_conversations");

function deriveTitle(messages: TutorMsg[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  const raw = (firstUser?.content || "New conversation").trim().replace(/\s+/g, " ");
  return raw.length > 60 ? `${raw.slice(0, 57)}…` : raw;
}

const byRecency = (a: TutorConversationSummary, b: TutorConversationSummary) =>
  a.updated_at < b.updated_at ? 1 : -1;

/**
 * Persistent 24/7-tutor conversation history for the signed-in student, scoped to
 * the current subject. Returns the conversation list plus helpers to load, create,
 * save and delete conversations.
 */
export function useTutorConversations(subject: string) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<TutorConversationSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setConversations([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await table()
        .select("id, title, subject, updated_at")
        .eq("user_id", user.id)
        .eq("subject", subject)
        .order("updated_at", { ascending: false })
        .limit(100);
      if (!error && data) setConversations(data as TutorConversationSummary[]);
    } catch (e) {
      console.warn("[tutor history] list failed (table may not exist yet)", e);
    } finally {
      setLoading(false);
    }
  }, [user, subject]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Fetch the full message list for one conversation (null on failure). */
  const loadMessages = useCallback(async (id: string): Promise<TutorMsg[] | null> => {
    try {
      const { data, error } = await table().select("messages").eq("id", id).maybeSingle();
      if (error || !data) return null;
      return (data.messages as TutorMsg[]) ?? [];
    } catch (e) {
      console.warn("[tutor history] load failed", e);
      return null;
    }
  }, []);

  /** Create a new conversation row; returns its id (null on failure). */
  const createConversation = useCallback(
    async (messages: TutorMsg[]): Promise<string | null> => {
      if (!user) return null;
      try {
        const now = new Date().toISOString();
        const { data, error } = await table()
          .insert({ user_id: user.id, subject, title: deriveTitle(messages), messages, updated_at: now } as any)
          .select("id, title, subject, updated_at")
          .single();
        if (error || !data) return null;
        setConversations((prev) => [data as TutorConversationSummary, ...prev]);
        return (data as { id: string }).id;
      } catch (e) {
        console.warn("[tutor history] create failed", e);
        return null;
      }
    },
    [user, subject],
  );

  /** Overwrite an existing conversation's messages (and refresh its title/recency). */
  const saveConversation = useCallback(async (id: string, messages: TutorMsg[]): Promise<void> => {
    try {
      const now = new Date().toISOString();
      const title = deriveTitle(messages);
      const { error } = await table().update({ messages, title, updated_at: now } as any).eq("id", id);
      if (!error) {
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, title, updated_at: now } : c)).sort(byRecency),
        );
      }
    } catch (e) {
      console.warn("[tutor history] save failed", e);
    }
  }, []);

  const deleteConversation = useCallback(async (id: string): Promise<void> => {
    try {
      await table().delete().eq("id", id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.warn("[tutor history] delete failed", e);
    }
  }, []);

  return { conversations, loading, refresh, loadMessages, createConversation, saveConversation, deleteConversation };
}
