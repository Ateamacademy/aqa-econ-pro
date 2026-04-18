ALTER TABLE public.predicted_paper_solutions
ADD COLUMN IF NOT EXISTS migration_debug JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS public.pdf_diagram_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id TEXT NOT NULL,
  question_number TEXT,
  diagram_id TEXT,
  failure_kind TEXT NOT NULL,
  failure_message TEXT,
  debug_enabled BOOLEAN NOT NULL DEFAULT false,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pdf_diagram_failures_created_at
  ON public.pdf_diagram_failures (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pdf_diagram_failures_paper_id
  ON public.pdf_diagram_failures (paper_id);
CREATE INDEX IF NOT EXISTS idx_pdf_diagram_failures_failure_kind
  ON public.pdf_diagram_failures (failure_kind);

ALTER TABLE public.pdf_diagram_failures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can create pdf diagram failures"
  ON public.pdf_diagram_failures
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read pdf diagram failures"
  ON public.pdf_diagram_failures
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role manages pdf diagram failures"
  ON public.pdf_diagram_failures
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');