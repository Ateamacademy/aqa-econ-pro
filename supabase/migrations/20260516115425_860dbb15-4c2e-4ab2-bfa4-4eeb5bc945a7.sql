REVOKE EXECUTE ON FUNCTION public.handle_new_user()                       FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.auto_claim_class_invites_on_signup()    FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_class_teacher(uuid, uuid)            FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role)                FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_school(uuid)                   FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_school_staff(uuid)                   FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_own_profile(uuid)                    FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_school_hod(uuid, uuid)               FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.is_class_teacher(uuid, uuid)             TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role)                 TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_school(uuid)                    TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_school_staff(uuid)                    TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_own_profile(uuid)                     TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_school_hod(uuid, uuid)                TO authenticated;