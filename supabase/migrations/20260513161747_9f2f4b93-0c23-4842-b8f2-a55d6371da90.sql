
-- Map a 0-100 score to a grade band given a board profile
CREATE OR REPLACE FUNCTION public.score_to_grade(_score numeric, _board text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    -- GCSE-style numeric grades
    WHEN lower(coalesce(_board,'')) IN ('aqa-gcse','edexcel-gcse','ocr-gcse','wjec-gcse','eduqas-gcse','caie-igcse','edexcel-igcse','gcse','igcse')
    THEN CASE
      WHEN _score >= 88 THEN '9'
      WHEN _score >= 78 THEN '8'
      WHEN _score >= 68 THEN '7'
      WHEN _score >= 58 THEN '6'
      WHEN _score >= 48 THEN '5'
      WHEN _score >= 38 THEN '4'
      WHEN _score >= 28 THEN '3'
      WHEN _score >= 18 THEN '2'
      ELSE '1'
    END
    -- A-Level / IB / CAIE letter grades
    ELSE CASE
      WHEN _score >= 88 THEN 'A*'
      WHEN _score >= 78 THEN 'A'
      WHEN _score >= 68 THEN 'B'
      WHEN _score >= 58 THEN 'C'
      WHEN _score >= 48 THEN 'D'
      WHEN _score >= 38 THEN 'E'
      ELSE 'U'
    END
  END;
$$;

-- Compute per-student predictions for a class (no writes)
CREATE OR REPLACE FUNCTION public.get_class_predictions(_class_id uuid)
RETURNS TABLE(
  student_id uuid,
  email text,
  display_name text,
  sample_size bigint,
  recent_avg numeric,
  predicted_grade text,
  trend text,
  target_grade text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _board text;
BEGIN
  IF NOT public.is_class_teacher(auth.uid(), _class_id) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT exam_board INTO _board FROM public.classes WHERE id = _class_id;

  RETURN QUERY
  WITH roster AS (
    SELECT cs.student_id, u.email, p.display_name
    FROM public.class_students cs
    JOIN auth.users u ON u.id = cs.student_id
    LEFT JOIN public.profiles p ON p.user_id = cs.student_id
    WHERE cs.class_id = _class_id
  ),
  recent AS (
    SELECT r.student_id,
           coalesce(ps.score_percent, NULL)::numeric AS score,
           ps.created_at
    FROM roster r
    LEFT JOIN public.practice_sessions ps
      ON ps.user_id = r.student_id
     AND ps.created_at > now() - interval '60 days'
     AND ps.score_percent IS NOT NULL
    UNION ALL
    SELECT r.student_id,
           CASE WHEN dmr.total_marks > 0 THEN (dmr.marks_awarded::numeric / dmr.total_marks::numeric) * 100 ELSE NULL END,
           dmr.created_at
    FROM roster r
    LEFT JOIN public.diagram_marking_results dmr
      ON dmr.user_id = r.student_id
     AND dmr.created_at > now() - interval '60 days'
  ),
  agg AS (
    SELECT student_id,
           count(score) AS sample_size,
           avg(score) AS recent_avg,
           avg(score) FILTER (WHERE created_at > now() - interval '14 days') AS recent14,
           avg(score) FILTER (WHERE created_at <= now() - interval '14 days') AS prior
    FROM recent
    GROUP BY student_id
  ),
  meta AS (
    SELECT student_id, target_grade FROM public.student_class_metadata WHERE class_id = _class_id
  )
  SELECT
    r.student_id,
    r.email,
    r.display_name,
    coalesce(a.sample_size, 0) AS sample_size,
    round(coalesce(a.recent_avg, 0), 1) AS recent_avg,
    CASE WHEN coalesce(a.sample_size,0) >= 3 THEN public.score_to_grade(a.recent_avg, _board) ELSE NULL END AS predicted_grade,
    CASE
      WHEN a.recent14 IS NULL OR a.prior IS NULL THEN 'insufficient'
      WHEN a.recent14 - a.prior >= 5 THEN 'improving'
      WHEN a.prior - a.recent14 >= 5 THEN 'declining'
      ELSE 'steady'
    END AS trend,
    m.target_grade
  FROM roster r
  LEFT JOIN agg a ON a.student_id = r.student_id
  LEFT JOIN meta m ON m.student_id = r.student_id
  ORDER BY r.display_name NULLS LAST, r.email;
END;
$$;

-- Persist predictions into student_class_metadata
CREATE OR REPLACE FUNCTION public.refresh_class_predictions(_class_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _count integer := 0;
BEGIN
  IF NOT public.is_class_teacher(auth.uid(), _class_id) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  WITH preds AS (
    SELECT student_id, predicted_grade
    FROM public.get_class_predictions(_class_id)
    WHERE predicted_grade IS NOT NULL
  ), upserted AS (
    INSERT INTO public.student_class_metadata (student_id, class_id, predicted_grade)
    SELECT student_id, _class_id, predicted_grade FROM preds
    ON CONFLICT (student_id, class_id) DO UPDATE
      SET predicted_grade = EXCLUDED.predicted_grade,
          updated_at = now()
    RETURNING 1
  )
  SELECT count(*) INTO _count FROM upserted;
  RETURN _count;
END;
$$;
