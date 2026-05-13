
-- Class invites: pending email invites for a class roster
CREATE TABLE public.class_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  target_grade text,
  invited_by uuid NOT NULL REFERENCES auth.users(id),
  token uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (class_id, email)
);

CREATE INDEX class_invites_email_idx ON public.class_invites (lower(email)) WHERE accepted_at IS NULL;
CREATE INDEX class_invites_class_id_idx ON public.class_invites (class_id);

ALTER TABLE public.class_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers manage class invites"
ON public.class_invites
FOR ALL TO authenticated
USING (public.is_class_teacher(auth.uid(), class_id))
WITH CHECK (public.is_class_teacher(auth.uid(), class_id));

CREATE POLICY "Invitee can read own invite"
ON public.class_invites
FOR SELECT TO authenticated
USING (lower(email) = lower((SELECT u.email FROM auth.users u WHERE u.id = auth.uid())));

-- RPC: claim all pending invites for the current authenticated user (by their email)
CREATE OR REPLACE FUNCTION public.claim_pending_class_invites()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
  _count integer := 0;
BEGIN
  SELECT email INTO _email FROM auth.users WHERE id = auth.uid();
  IF _email IS NULL THEN RETURN 0; END IF;

  WITH claimed AS (
    UPDATE public.class_invites ci
    SET accepted_at = now()
    WHERE lower(ci.email) = lower(_email)
      AND ci.accepted_at IS NULL
      AND ci.expires_at > now()
    RETURNING ci.class_id, ci.target_grade
  ), insert_roster AS (
    INSERT INTO public.class_students (class_id, student_id)
    SELECT class_id, auth.uid() FROM claimed
    ON CONFLICT DO NOTHING
    RETURNING class_id
  ), upsert_meta AS (
    INSERT INTO public.student_class_metadata (student_id, class_id, target_grade)
    SELECT auth.uid(), class_id, target_grade FROM claimed WHERE target_grade IS NOT NULL
    ON CONFLICT (student_id, class_id) DO UPDATE
      SET target_grade = COALESCE(EXCLUDED.target_grade, public.student_class_metadata.target_grade),
          updated_at = now()
    RETURNING 1
  )
  SELECT count(*) INTO _count FROM claimed;
  RETURN COALESCE(_count, 0);
END;
$$;

-- Trigger: auto-claim pending invites when profile row is created (i.e. user signs up)
CREATE OR REPLACE FUNCTION public.auto_claim_class_invites_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
BEGIN
  SELECT email INTO _email FROM auth.users WHERE id = NEW.user_id;
  IF _email IS NULL THEN RETURN NEW; END IF;

  WITH claimed AS (
    UPDATE public.class_invites ci
    SET accepted_at = now()
    WHERE lower(ci.email) = lower(_email)
      AND ci.accepted_at IS NULL
      AND ci.expires_at > now()
    RETURNING ci.class_id, ci.target_grade
  ), ins AS (
    INSERT INTO public.class_students (class_id, student_id)
    SELECT class_id, NEW.user_id FROM claimed
    ON CONFLICT DO NOTHING
    RETURNING 1
  )
  INSERT INTO public.student_class_metadata (student_id, class_id, target_grade)
  SELECT NEW.user_id, class_id, target_grade FROM claimed WHERE target_grade IS NOT NULL
  ON CONFLICT (student_id, class_id) DO UPDATE
    SET target_grade = COALESCE(EXCLUDED.target_grade, public.student_class_metadata.target_grade),
        updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_auto_claim_invites_on_profile_insert
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.auto_claim_class_invites_on_signup();
