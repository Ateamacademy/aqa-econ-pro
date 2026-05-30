
-- 1) paper_feedback: stop anon access entirely; restrict reads to authenticated and HIDE user_id by revoking column-level SELECT.
DROP POLICY IF EXISTS "Anyone can read aggregate feedback" ON public.paper_feedback;
DROP POLICY IF EXISTS "Anonymous can submit feedback" ON public.paper_feedback;

CREATE POLICY "Authenticated can read aggregate feedback"
  ON public.paper_feedback FOR SELECT TO authenticated USING (true);

REVOKE SELECT ON public.paper_feedback FROM anon;
REVOKE SELECT (user_id) ON public.paper_feedback FROM authenticated, anon;
GRANT SELECT (id, exam_board, qualification, paper_label, difficulty, predicted_grade, comment, created_at)
  ON public.paper_feedback TO authenticated;

-- 2) Remove user-private tables from realtime publication to eliminate cross-user channel exposure.
ALTER PUBLICATION supabase_realtime DROP TABLE public.practice_sessions;
ALTER PUBLICATION supabase_realtime DROP TABLE public.diagram_marking_results;

-- 3) Allow platform admin to read director_dashboard_access_log.
CREATE POLICY "Platform admin reads dashboard access log"
  ON public.director_dashboard_access_log FOR SELECT TO authenticated
  USING (public.is_platform_admin());

-- 4) Forbid NULL detected_by_class_id on interventions to close the RLS-bypass gap.
ALTER TABLE public.interventions ALTER COLUMN detected_by_class_id SET NOT NULL;
