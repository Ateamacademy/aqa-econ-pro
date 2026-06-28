-- 24/7 Tutor: persistent per-student conversation history.
-- Students can refer back to previous chats across sessions and devices.
-- One row per conversation; the message list is stored as JSONB.

CREATE TABLE IF NOT EXISTS public.tutor_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  title text NOT NULL DEFAULT 'New conversation',
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tutor_conversations ENABLE ROW LEVEL SECURITY;

-- A student may only ever see and modify their OWN conversations.
CREATE POLICY "Users can read own tutor conversations"
  ON public.tutor_conversations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tutor conversations"
  ON public.tutor_conversations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tutor conversations"
  ON public.tutor_conversations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tutor conversations"
  ON public.tutor_conversations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_tutor_conversations_user
  ON public.tutor_conversations(user_id, updated_at DESC);
