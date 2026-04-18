ALTER TABLE public.predicted_paper_solutions
ADD COLUMN IF NOT EXISTS generated_by_user_id UUID;

DROP POLICY IF EXISTS "Authenticated can insert solutions" ON public.predicted_paper_solutions;
DROP POLICY IF EXISTS "Authenticated can update solutions" ON public.predicted_paper_solutions;

CREATE POLICY "Authenticated can insert solutions"
  ON public.predicted_paper_solutions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = generated_by_user_id);

CREATE POLICY "Authenticated can update their solutions"
  ON public.predicted_paper_solutions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = generated_by_user_id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = generated_by_user_id);

DROP POLICY IF EXISTS "Authenticated can create pdf diagram failures" ON public.pdf_diagram_failures;
DROP POLICY IF EXISTS "Authenticated can read pdf diagram failures" ON public.pdf_diagram_failures;

ALTER TABLE public.pdf_diagram_failures
ALTER COLUMN user_id SET NOT NULL;

CREATE POLICY "Authenticated can create own pdf diagram failures"
  ON public.pdf_diagram_failures
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Authenticated can read own pdf diagram failures"
  ON public.pdf_diagram_failures
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);