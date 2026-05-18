
CREATE TABLE public.paper_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  exam_board text NOT NULL,
  qualification text NOT NULL,
  paper_label text NOT NULL DEFAULT 'overall',
  difficulty text NOT NULL CHECK (difficulty IN ('easy','medium','hard','very_hard')),
  predicted_grade text,
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_paper_feedback_board_qual ON public.paper_feedback (exam_board, qualification, paper_label);

ALTER TABLE public.paper_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read aggregate feedback"
ON public.paper_feedback FOR SELECT
USING (true);

CREATE POLICY "Authenticated can submit feedback"
ON public.paper_feedback FOR INSERT
TO authenticated
WITH CHECK (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Anonymous can submit feedback"
ON public.paper_feedback FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

CREATE POLICY "Service role manages paper feedback"
ON public.paper_feedback FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
