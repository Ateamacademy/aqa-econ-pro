
CREATE OR REPLACE FUNCTION public.is_director(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'director'::public.app_role
  );
$$;

DO $$
DECLARE _uid uuid;
BEGIN
  SELECT id INTO _uid FROM auth.users WHERE lower(email) = 'info@ateamacademy.co.uk' LIMIT 1;
  IF _uid IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'director'::public.app_role)
      ON CONFLICT (user_id, role) DO NOTHING;
    INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'member'::public.app_role)
      ON CONFLICT (user_id, role) DO NOTHING;
    IF NOT EXISTS (SELECT 1 FROM public.paid_users WHERE lower(email)='info@ateamacademy.co.uk') THEN
      INSERT INTO public.paid_users (email, expires_at, amount_paid, currency)
      VALUES ('info@ateamacademy.co.uk', '2099-12-31'::timestamptz, 0, 'gbp');
    END IF;
  END IF;
END $$;
