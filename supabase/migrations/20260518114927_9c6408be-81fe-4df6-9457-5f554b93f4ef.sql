
CREATE TABLE public.grade_calculator_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  qualification text NOT NULL,
  exam_board text NOT NULL,
  target_grade text NOT NULL,
  paper1_score numeric,
  paper2_score numeric,
  paper1_max integer,
  paper2_max integer,
  confidence text,
  predicted_grade text,
  p3_required_target integer,
  p3_max integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.grade_calculator_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own grade calc sessions"
  ON public.grade_calculator_sessions FOR INSERT TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Users read own grade calc sessions"
  ON public.grade_calculator_sessions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service role manages grade calc sessions"
  ON public.grade_calculator_sessions FOR ALL TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_gcs_user ON public.grade_calculator_sessions(user_id);
CREATE INDEX idx_gcs_created ON public.grade_calculator_sessions(created_at DESC);
