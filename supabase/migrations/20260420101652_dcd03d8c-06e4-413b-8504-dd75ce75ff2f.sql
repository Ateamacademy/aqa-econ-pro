-- ── QA Tracker issues table ──
CREATE TABLE public.qa_tracker_issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board TEXT NOT NULL DEFAULT 'aqa',
  paper_code TEXT NOT NULL,
  paper_set TEXT,
  question_number TEXT,
  category TEXT NOT NULL CHECK (category IN ('wording','mark-scheme','diagram','strictness','model-answer','other')),
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low','medium','high','critical')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved','wont-fix')),
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual','reviewer-tracker','auto-validator')),
  resolution_notes TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_qa_tracker_status ON public.qa_tracker_issues(status);
CREATE INDEX idx_qa_tracker_paper ON public.qa_tracker_issues(paper_code, question_number);

ALTER TABLE public.qa_tracker_issues ENABLE ROW LEVEL SECURITY;

-- Helper function: is the current user the platform admin?
CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) = 'swapnil.kumar22@alumni.imperial.ac.uk'
  );
$$;

CREATE POLICY "Admin can view QA issues" ON public.qa_tracker_issues
  FOR SELECT TO authenticated
  USING (public.is_platform_admin());

CREATE POLICY "Admin can insert QA issues" ON public.qa_tracker_issues
  FOR INSERT TO authenticated
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "Admin can update QA issues" ON public.qa_tracker_issues
  FOR UPDATE TO authenticated
  USING (public.is_platform_admin());

CREATE POLICY "Admin can delete QA issues" ON public.qa_tracker_issues
  FOR DELETE TO authenticated
  USING (public.is_platform_admin());

CREATE POLICY "Service role manages QA issues" ON public.qa_tracker_issues
  FOR ALL TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.qa_tracker_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_qa_tracker_updated_at
  BEFORE UPDATE ON public.qa_tracker_issues
  FOR EACH ROW EXECUTE FUNCTION public.qa_tracker_set_updated_at();

-- Seed the 6 reviewer-flagged issues from the QA Tracker spreadsheet
INSERT INTO public.qa_tracker_issues (paper_code, question_number, category, severity, title, description, source) VALUES
  ('7136/1', 'Q1', 'wording', 'medium', 'Percentage change ambiguous on direction', 'Q1 asked for a percentage change without specifying whether to indicate direction (increase/decrease). Reworded to "increase or decrease".', 'reviewer-tracker'),
  ('7136/1', 'Q2', 'strictness', 'high', '4-mark diagram question accepts numeric-only answer', 'Mark scheme too generous — a numeric-only answer received marks. Strict dual-gate (diagram + ≥30-word explanation) now required.', 'reviewer-tracker'),
  ('7136/1', 'Q3', 'wording', 'medium', '9-mark diagram question lacks explicit diagram instruction', 'Used "your knowledge of economics" phrasing (essay convention) without telling student a diagram is needed. Reworded to "With the help of a diagram and using the extracts...".', 'reviewer-tracker'),
  ('7136/1', 'Q6', 'model-answer', 'high', '25-mark Evaluate question lacks evaluation/conclusion in mark scheme', 'Model answer and mark scheme contained no AO4 evaluation or supported conclusion. Mark scheme restructured to AQA 5-level banding with explicit AO4 requirements.', 'reviewer-tracker'),
  ('7136/1', 'Q6', 'diagram', 'high', 'Negative externality diagram: MSC intersects MPC', 'MSC line was drawn crossing MPC, which is geometrically incorrect. SVG fixed so MSC is parallel to MPC with consistent vertical MEC gap.', 'reviewer-tracker'),
  ('7136/2', 'Q3', 'wording', 'medium', '9-mark diagram question lacks explicit diagram instruction', 'Same pattern as Paper 1 Q3. Reworded to "With the help of a diagram and using the extracts...".', 'reviewer-tracker');