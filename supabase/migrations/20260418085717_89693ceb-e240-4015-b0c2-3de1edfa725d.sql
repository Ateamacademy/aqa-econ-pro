-- Profiles: optional exam dates for the AQA Economics countdown
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS exam_paper1_date date,
  ADD COLUMN IF NOT EXISTS exam_paper2_date date,
  ADD COLUMN IF NOT EXISTS exam_paper3_date date;

-- Practice sessions: richer fields so the dashboard numbers can be internally consistent
ALTER TABLE public.practice_sessions
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'completed',
  ADD COLUMN IF NOT EXISTS duration_seconds integer,
  ADD COLUMN IF NOT EXISTS total_marks integer,
  ADD COLUMN IF NOT EXISTS marks_awarded integer,
  ADD COLUMN IF NOT EXISTS max_score integer,
  ADD COLUMN IF NOT EXISTS kaae_skills jsonb,
  ADD COLUMN IF NOT EXISTS paper_id text;

-- Constrain status to known values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'practice_sessions_status_check'
  ) THEN
    ALTER TABLE public.practice_sessions
      ADD CONSTRAINT practice_sessions_status_check
      CHECK (status IN ('in_progress', 'completed', 'abandoned'));
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_status
  ON public.practice_sessions (user_id, status, created_at DESC);