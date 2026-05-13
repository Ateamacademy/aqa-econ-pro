
-- Helper: is user HoD/admin for the given school
CREATE OR REPLACE FUNCTION public.is_school_hod(_user_id uuid, _school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _school_id = public.get_user_school(_user_id)
    AND (public.has_role(_user_id, 'hod') OR public.has_role(_user_id, 'admin'));
$$;

-- Department analytics
CREATE OR REPLACE FUNCTION public.get_department_overview(_school_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT public.is_school_hod(auth.uid(), _school_id) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  WITH cls AS (
    SELECT c.id, c.name, c.teacher_id, c.exam_board, c.year_group, c.subject
    FROM public.classes c
    WHERE c.school_id = _school_id
  ),
  roster AS (
    SELECT cs.class_id, cs.student_id
    FROM public.class_students cs
    JOIN cls ON cls.id = cs.class_id
  ),
  recent_ps AS (
    SELECT r.class_id, ps.user_id, ps.score_percent, ps.topic, ps.created_at
    FROM roster r
    JOIN public.practice_sessions ps ON ps.user_id = r.student_id
    WHERE ps.created_at > now() - interval '60 days'
      AND ps.score_percent IS NOT NULL
  ),
  hw AS (
    SELECT a.class_id, hs.total_score, hs.ao_breakdown_json, hs.status, hs.submitted_at
    FROM public.homework_assignments a
    JOIN cls ON cls.id = a.class_id
    LEFT JOIN public.homework_submissions hs ON hs.assignment_id = a.id
  ),
  class_summary AS (
    SELECT
      cls.id AS class_id,
      cls.name,
      cls.exam_board,
      cls.year_group,
      cls.teacher_id,
      (SELECT COUNT(*) FROM roster r WHERE r.class_id = cls.id) AS student_count,
      (SELECT ROUND(AVG(score_percent)::numeric, 1) FROM recent_ps rp WHERE rp.class_id = cls.id) AS avg_score,
      (SELECT COUNT(*) FROM recent_ps rp WHERE rp.class_id = cls.id) AS practice_count,
      (SELECT COUNT(*) FROM hw h WHERE h.class_id = cls.id AND h.submitted_at IS NOT NULL) AS hw_submitted,
      (SELECT COUNT(*) FROM hw h WHERE h.class_id = cls.id) AS hw_total
    FROM cls
  ),
  teacher_summary AS (
    SELECT
      cls.teacher_id,
      COALESCE(p.display_name, split_part(u.email, '@', 1)) AS teacher_name,
      u.email AS teacher_email,
      COUNT(DISTINCT cls.id) AS class_count,
      COUNT(DISTINCT r.student_id) AS student_count,
      ROUND(AVG(rp.score_percent)::numeric, 1) AS avg_score
    FROM cls
    LEFT JOIN auth.users u ON u.id = cls.teacher_id
    LEFT JOIN public.profiles p ON p.user_id = cls.teacher_id
    LEFT JOIN roster r ON r.class_id = cls.id
    LEFT JOIN recent_ps rp ON rp.class_id = cls.id
    GROUP BY cls.teacher_id, p.display_name, u.email
  ),
  topic_gaps AS (
    SELECT topic, ROUND(AVG(score_percent)::numeric, 1) AS avg_score, COUNT(*) AS sample
    FROM recent_ps
    WHERE topic IS NOT NULL AND topic <> ''
    GROUP BY topic
    HAVING COUNT(*) >= 3
    ORDER BY AVG(score_percent) ASC
    LIMIT 10
  ),
  weekly_activity AS (
    SELECT
      to_char(date_trunc('week', created_at), 'YYYY-MM-DD') AS week,
      COUNT(*) AS sessions,
      ROUND(AVG(score_percent)::numeric, 1) AS avg_score
    FROM recent_ps
    GROUP BY date_trunc('week', created_at)
    ORDER BY date_trunc('week', created_at)
  ),
  ao_avgs AS (
    SELECT
      ROUND(AVG((ao_breakdown_json->>'AO1')::numeric), 1) AS ao1,
      ROUND(AVG((ao_breakdown_json->>'AO2')::numeric), 1) AS ao2,
      ROUND(AVG((ao_breakdown_json->>'AO3')::numeric), 1) AS ao3,
      ROUND(AVG((ao_breakdown_json->>'AO4')::numeric), 1) AS ao4
    FROM hw
    WHERE ao_breakdown_json IS NOT NULL
  ),
  board_split AS (
    SELECT COALESCE(exam_board, 'Unspecified') AS board, COUNT(*) AS classes,
           (SELECT COUNT(*) FROM roster r2 JOIN cls c2 ON c2.id = r2.class_id WHERE COALESCE(c2.exam_board,'Unspecified') = COALESCE(cls.exam_board,'Unspecified')) AS students
    FROM cls
    GROUP BY exam_board
  ),
  intervention_counts AS (
    SELECT severity, COUNT(*) AS n
    FROM public.interventions i
    WHERE i.detected_by_class_id IN (SELECT id FROM cls)
      AND i.resolved_at IS NULL
    GROUP BY severity
  ),
  totals AS (
    SELECT
      (SELECT COUNT(*) FROM cls) AS total_classes,
      (SELECT COUNT(DISTINCT student_id) FROM roster) AS total_students,
      (SELECT COUNT(DISTINCT teacher_id) FROM cls) AS total_teachers,
      (SELECT ROUND(AVG(score_percent)::numeric, 1) FROM recent_ps) AS school_avg,
      (SELECT COUNT(*) FROM recent_ps) AS practice_volume,
      (SELECT COUNT(*) FROM hw WHERE status = 'pending') AS pending_marking
  )
  SELECT jsonb_build_object(
    'totals', (SELECT row_to_json(t) FROM totals t),
    'classes', COALESCE((SELECT jsonb_agg(row_to_json(c)) FROM class_summary c), '[]'::jsonb),
    'teachers', COALESCE((SELECT jsonb_agg(row_to_json(t)) FROM teacher_summary t), '[]'::jsonb),
    'topic_gaps', COALESCE((SELECT jsonb_agg(row_to_json(t)) FROM topic_gaps t), '[]'::jsonb),
    'weekly_activity', COALESCE((SELECT jsonb_agg(row_to_json(w)) FROM weekly_activity w), '[]'::jsonb),
    'ao_avgs', (SELECT row_to_json(a) FROM ao_avgs a),
    'board_split', COALESCE((SELECT jsonb_agg(row_to_json(b)) FROM board_split b), '[]'::jsonb),
    'interventions', COALESCE((SELECT jsonb_agg(row_to_json(i)) FROM intervention_counts i), '[]'::jsonb)
  ) INTO result;

  RETURN result;
END;
$$;
