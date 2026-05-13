
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('student','teacher','tutor','hod','admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Service role manages roles" ON public.user_roles
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- ============ PROFILES ADDITIONS ============
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS school_id uuid,
  ADD COLUMN IF NOT EXISTS department text;

-- ============ SCHOOLS ============
CREATE TABLE public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  exam_boards text[] NOT NULL DEFAULT '{}',
  owner_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_school_fk
  FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION public.get_user_school(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT school_id FROM public.profiles WHERE user_id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_school_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('teacher','tutor','hod','admin')
  );
$$;

CREATE POLICY "Members read their school" ON public.schools
  FOR SELECT TO authenticated
  USING (id = public.get_user_school(auth.uid()) OR owner_id = auth.uid());
CREATE POLICY "Staff create schools" ON public.schools
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid() AND public.is_school_staff(auth.uid()));
CREATE POLICY "Admin updates school" ON public.schools
  FOR UPDATE TO authenticated
  USING (id = public.get_user_school(auth.uid()) AND public.has_role(auth.uid(), 'admin'));

-- ============ SCHOOL INVITES ============
CREATE TABLE public.school_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  email text NOT NULL,
  role public.app_role NOT NULL,
  token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '14 days'),
  accepted_at timestamptz,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.school_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages invites" ON public.school_invites
  FOR ALL TO authenticated
  USING (school_id = public.get_user_school(auth.uid()) AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (school_id = public.get_user_school(auth.uid()) AND public.has_role(auth.uid(), 'admin'));

-- ============ CLASSES ============
CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES auth.users(id),
  name text NOT NULL,
  year_group text,
  subject text,
  exam_board text,
  ability_set text,
  join_code text NOT NULL UNIQUE DEFAULT upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6)),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_class_teacher(_user_id uuid, _class_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.classes c
    WHERE c.id = _class_id
      AND (
        c.teacher_id = _user_id
        OR (c.school_id = public.get_user_school(_user_id)
            AND (public.has_role(_user_id,'hod') OR public.has_role(_user_id,'admin')))
      )
  );
$$;

CREATE POLICY "Teachers read own classes" ON public.classes
  FOR SELECT TO authenticated
  USING (
    teacher_id = auth.uid()
    OR (school_id = public.get_user_school(auth.uid())
        AND (public.has_role(auth.uid(),'hod') OR public.has_role(auth.uid(),'admin')))
  );
CREATE POLICY "Staff create classes in their school" ON public.classes
  FOR INSERT TO authenticated
  WITH CHECK (
    school_id = public.get_user_school(auth.uid())
    AND public.is_school_staff(auth.uid())
    AND teacher_id = auth.uid()
  );
CREATE POLICY "Teachers update own or school classes" ON public.classes
  FOR UPDATE TO authenticated
  USING (
    teacher_id = auth.uid()
    OR (school_id = public.get_user_school(auth.uid())
        AND (public.has_role(auth.uid(),'hod') OR public.has_role(auth.uid(),'admin')))
  );
CREATE POLICY "Owners delete classes" ON public.classes
  FOR DELETE TO authenticated
  USING (
    teacher_id = auth.uid()
    OR (school_id = public.get_user_school(auth.uid()) AND public.has_role(auth.uid(),'admin'))
  );

-- ============ CLASS STUDENTS ============
CREATE TABLE public.class_students (
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (class_id, student_id)
);
ALTER TABLE public.class_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers and self read roster" ON public.class_students
  FOR SELECT TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id) OR student_id = auth.uid());
CREATE POLICY "Teachers add to roster" ON public.class_students
  FOR INSERT TO authenticated
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));
CREATE POLICY "Teachers remove from roster" ON public.class_students
  FOR DELETE TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id) OR student_id = auth.uid());

-- Student joins by code (security definer bypasses INSERT policy)
CREATE OR REPLACE FUNCTION public.join_class_by_code(_code text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _class_id uuid;
BEGIN
  SELECT id INTO _class_id FROM public.classes WHERE join_code = upper(_code) LIMIT 1;
  IF _class_id IS NULL THEN RAISE EXCEPTION 'Invalid class code'; END IF;
  INSERT INTO public.class_students (class_id, student_id)
  VALUES (_class_id, auth.uid())
  ON CONFLICT DO NOTHING;
  RETURN _class_id;
END; $$;

-- Roster with auth email (security definer)
CREATE OR REPLACE FUNCTION public.get_class_roster(_class_id uuid)
RETURNS TABLE(student_id uuid, email text, display_name text, joined_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT cs.student_id, u.email, p.display_name, cs.joined_at
  FROM public.class_students cs
  JOIN auth.users u ON u.id = cs.student_id
  LEFT JOIN public.profiles p ON p.user_id = cs.student_id
  WHERE cs.class_id = _class_id
    AND public.is_class_teacher(auth.uid(), _class_id);
$$;

-- ============ STUDENT CLASS METADATA ============
CREATE TABLE public.student_class_metadata (
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  target_grade text,
  predicted_grade text,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, class_id)
);
ALTER TABLE public.student_class_metadata ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage class metadata" ON public.student_class_metadata
  FOR ALL TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id))
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));
CREATE POLICY "Students read own metadata" ON public.student_class_metadata
  FOR SELECT TO authenticated USING (student_id = auth.uid());

-- ============ HOMEWORK ASSIGNMENTS ============
CREATE TABLE public.homework_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  title text NOT NULL,
  topic text,
  question_type text,
  difficulty text,
  time_minutes integer,
  due_date timestamptz,
  content_json jsonb NOT NULL DEFAULT '{}',
  mark_scheme_json jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.homework_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage assignments" ON public.homework_assignments
  FOR ALL TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id))
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));
CREATE POLICY "Students read assigned homework" ON public.homework_assignments
  FOR SELECT TO authenticated
  USING (
    status = 'published'
    AND EXISTS (
      SELECT 1 FROM public.class_students cs
      WHERE cs.class_id = homework_assignments.class_id AND cs.student_id = auth.uid()
    )
  );

-- ============ HOMEWORK SUBMISSIONS ============
CREATE TABLE public.homework_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.homework_assignments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  response_json jsonb NOT NULL DEFAULT '{}',
  submitted_at timestamptz,
  ai_marks_json jsonb,
  teacher_marks_json jsonb,
  total_score numeric,
  ao_breakdown_json jsonb,
  feedback_json jsonb,
  status text NOT NULL DEFAULT 'pending',
  UNIQUE(assignment_id, student_id)
);
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own submissions" ON public.homework_submissions
  FOR ALL TO authenticated
  USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "Teachers read class submissions" ON public.homework_submissions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.homework_assignments a
    WHERE a.id = assignment_id AND public.is_class_teacher(auth.uid(), a.class_id)
  ));
CREATE POLICY "Teachers update class submissions" ON public.homework_submissions
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.homework_assignments a
    WHERE a.id = assignment_id AND public.is_class_teacher(auth.uid(), a.class_id)
  ));

-- ============ INTERVENTIONS ============
CREATE TABLE public.interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  detected_by_class_id uuid REFERENCES public.classes(id) ON DELETE SET NULL,
  type text NOT NULL,
  severity text NOT NULL DEFAULT 'low',
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage interventions" ON public.interventions
  FOR ALL TO authenticated
  USING (detected_by_class_id IS NOT NULL AND public.is_class_teacher(auth.uid(), detected_by_class_id))
  WITH CHECK (detected_by_class_id IS NOT NULL AND public.is_class_teacher(auth.uid(), detected_by_class_id));

-- ============ STUDENT REPORTS ============
CREATE TABLE public.student_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  period text,
  tone text,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES auth.users(id)
);
ALTER TABLE public.student_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage student reports" ON public.student_reports
  FOR ALL TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id))
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));

-- ============ PARENT EMAILS ============
CREATE TABLE public.parent_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  type text,
  subject text,
  body text,
  sent_at timestamptz,
  created_by uuid NOT NULL REFERENCES auth.users(id)
);
ALTER TABLE public.parent_emails ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage parent emails" ON public.parent_emails
  FOR ALL TO authenticated
  USING (public.is_class_teacher(auth.uid(), class_id))
  WITH CHECK (public.is_class_teacher(auth.uid(), class_id));

-- ============ INDEXES ============
CREATE INDEX ON public.classes (school_id);
CREATE INDEX ON public.classes (teacher_id);
CREATE INDEX ON public.class_students (student_id);
CREATE INDEX ON public.homework_assignments (class_id);
CREATE INDEX ON public.homework_submissions (student_id);
CREATE INDEX ON public.interventions (student_id);
CREATE INDEX ON public.user_roles (user_id);
