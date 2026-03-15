
-- Parent links table: links a student to their parent via email invite
CREATE TABLE public.parent_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_email text NOT NULL,
  invite_token uuid NOT NULL DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  accepted_at timestamp with time zone,
  UNIQUE(student_id, parent_email)
);

-- Enable RLS
ALTER TABLE public.parent_links ENABLE ROW LEVEL SECURITY;

-- Students can view and manage their own parent links
CREATE POLICY "Students can view own parent links"
  ON public.parent_links FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own parent links"
  ON public.parent_links FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can delete own parent links"
  ON public.parent_links FOR DELETE
  TO authenticated
  USING (student_id = auth.uid());

-- Parents can view links where they are the parent
CREATE POLICY "Parents can view their links"
  ON public.parent_links FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

-- Allow accepting invites (update parent_id and status) via service role or a function
CREATE OR REPLACE FUNCTION public.accept_parent_invite(token uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.parent_links
  SET parent_id = auth.uid(),
      status = 'accepted',
      accepted_at = now()
  WHERE invite_token = token
    AND status = 'pending';
  RETURN FOUND;
END;
$$;

-- Function for parents to get their linked students' practice sessions
CREATE OR REPLACE FUNCTION public.get_child_sessions(p_parent_id uuid)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  subject text,
  topic text,
  session_type text,
  score_percent integer,
  feedback_summary text,
  created_at timestamp with time zone,
  student_email text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ps.id, ps.user_id, ps.subject, ps.topic, ps.session_type,
    ps.score_percent, ps.feedback_summary, ps.created_at,
    u.email AS student_email
  FROM public.practice_sessions ps
  JOIN public.parent_links pl ON pl.student_id = ps.user_id
  JOIN auth.users u ON u.id = ps.user_id
  WHERE pl.parent_id = p_parent_id
    AND pl.status = 'accepted';
$$;

-- Function for parents to get linked student profiles
CREATE OR REPLACE FUNCTION public.get_child_profiles(p_parent_id uuid)
RETURNS TABLE(
  user_id uuid,
  display_name text,
  student_email text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.user_id,
    COALESCE(p.display_name, split_part(u.email, '@', 1)) AS display_name,
    u.email AS student_email
  FROM public.profiles p
  JOIN public.parent_links pl ON pl.student_id = p.user_id
  JOIN auth.users u ON u.id = p.user_id
  WHERE pl.parent_id = p_parent_id
    AND pl.status = 'accepted';
$$;
