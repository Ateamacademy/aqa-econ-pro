
-- Fix homework_submissions: students can no longer overwrite scores/marks
DROP POLICY IF EXISTS "Students manage own submissions" ON public.homework_submissions;

CREATE POLICY "Students insert own submissions"
  ON public.homework_submissions FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students read own submissions"
  ON public.homework_submissions FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

-- Trigger: students may only update response_json on pending submissions
CREATE OR REPLACE FUNCTION public.guard_homework_submission_student_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;
  -- If updater is the student (not teacher), restrict mutable columns
  IF NEW.student_id = auth.uid() THEN
    -- Teachers may also be the student in rare cases; allow if they're the class teacher
    IF EXISTS (
      SELECT 1 FROM public.homework_assignments a
      WHERE a.id = NEW.assignment_id AND public.is_class_teacher(auth.uid(), a.class_id)
    ) THEN
      RETURN NEW;
    END IF;
    IF OLD.status <> 'pending' THEN
      RAISE EXCEPTION 'Cannot edit a submission after it has been marked';
    END IF;
    IF NEW.ai_marks_json IS DISTINCT FROM OLD.ai_marks_json
       OR NEW.teacher_marks_json IS DISTINCT FROM OLD.teacher_marks_json
       OR NEW.total_score IS DISTINCT FROM OLD.total_score
       OR NEW.ao_breakdown_json IS DISTINCT FROM OLD.ao_breakdown_json
       OR NEW.feedback_json IS DISTINCT FROM OLD.feedback_json
       OR NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Students cannot modify marks, scores, status, or feedback';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_homework_submission_student_update ON public.homework_submissions;
CREATE TRIGGER guard_homework_submission_student_update
  BEFORE UPDATE ON public.homework_submissions
  FOR EACH ROW EXECUTE FUNCTION public.guard_homework_submission_student_update();

CREATE POLICY "Students update own pending submission body"
  ON public.homework_submissions FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Fix paper_feedback: restrict reads to owner only (admins use service_role)
DROP POLICY IF EXISTS "Authenticated can read aggregate feedback" ON public.paper_feedback;

CREATE POLICY "Users read their own feedback"
  ON public.paper_feedback FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());
