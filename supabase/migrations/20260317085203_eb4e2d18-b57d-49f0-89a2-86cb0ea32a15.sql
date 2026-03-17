
-- Activity tracking table for DAU/MAU and feature usage analytics
CREATE TABLE public.user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  event_type text NOT NULL,
  feature text,
  metadata jsonb,
  session_duration_seconds integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- Users can insert their own activity
CREATE POLICY "Users can insert own activity"
ON public.user_activity_log FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Service role can read all activity for analytics
CREATE POLICY "Service role can read all activity"
ON public.user_activity_log FOR SELECT
TO public
USING (auth.role() = 'service_role');

-- Indexes for analytics queries
CREATE INDEX idx_activity_log_created_at ON public.user_activity_log(created_at);
CREATE INDEX idx_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX idx_activity_log_event_type ON public.user_activity_log(event_type);
CREATE INDEX idx_activity_log_feature ON public.user_activity_log(feature);
