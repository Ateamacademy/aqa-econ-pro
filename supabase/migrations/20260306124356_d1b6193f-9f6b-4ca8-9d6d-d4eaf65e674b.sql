
CREATE TABLE public.practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  session_type text NOT NULL DEFAULT 'question',
  topic text NOT NULL,
  score_percent integer,
  feedback_summary text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own sessions"
  ON public.practice_sessions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own sessions"
  ON public.practice_sessions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_practice_sessions_user ON public.practice_sessions(user_id, created_at DESC);
