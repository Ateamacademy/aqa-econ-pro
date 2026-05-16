-- =============================================================================
-- 1. Telemetry table for client-side errors (consumed by ErrorBoundary)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.client_errors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  area        TEXT,
  route       TEXT,
  component   TEXT,
  message     TEXT NOT NULL,
  stack       TEXT,
  user_agent  TEXT,
  meta        JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS client_errors_user_id_idx ON public.client_errors (user_id);
CREATE INDEX IF NOT EXISTS client_errors_created_at_idx ON public.client_errors (created_at DESC);
CREATE INDEX IF NOT EXISTS client_errors_area_idx ON public.client_errors (area);

ALTER TABLE public.client_errors ENABLE ROW LEVEL SECURITY;

-- Signed-in users can record their own errors (anon writes blocked).
DROP POLICY IF EXISTS "Users insert their own errors" ON public.client_errors;
CREATE POLICY "Users insert their own errors"
  ON public.client_errors FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Only platform admins can read the firehose.
DROP POLICY IF EXISTS "Admins read all errors" ON public.client_errors;
CREATE POLICY "Admins read all errors"
  ON public.client_errors FOR SELECT
  TO authenticated
  USING (public.is_platform_admin());

-- =============================================================================
-- 2. Tighten the 3 always-true WRITE policies
-- =============================================================================

-- public.reports — was: WITH CHECK (true). Restrict to authenticated.
DROP POLICY IF EXISTS "Anyone can insert reports" ON public.reports;
CREATE POLICY "Authenticated users can insert reports"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- public.question_fingerprints — was: WITH CHECK (true) for authenticated. Make explicit + reject anon.
DROP POLICY IF EXISTS "Authenticated users can insert fingerprints" ON public.question_fingerprints;
CREATE POLICY "Authenticated users can insert fingerprints"
  ON public.question_fingerprints FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- public.ai_marking_cache — same treatment.
DROP POLICY IF EXISTS "Anyone authenticated can write cache" ON public.ai_marking_cache;
CREATE POLICY "Authenticated users can write cache"
  ON public.ai_marking_cache FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================================================
-- 3. Pin search_path on 4 SECURITY DEFINER functions missing it
-- =============================================================================

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$ SELECT pgmq.send(queue_name, payload); $function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$ SELECT msg_id, read_ct, message FROM pgmq.read(queue_name, vt, batch_size); $function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$ SELECT pgmq.delete(queue_name, message_id); $function$;

-- =============================================================================
-- 4. Revoke EXECUTE from anon on SECURITY DEFINER functions that should
--    only be callable by authenticated users / service role.
--    (Default Postgres grants EXECUTE to PUBLIC — strip it explicitly.)
-- =============================================================================

REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_child_profiles(uuid)               FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_child_sessions(uuid)               FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_friend_scores(uuid)                FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_class_roster(uuid)                 FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_class_predictions(uuid)            FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.refresh_class_predictions(uuid)        FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_department_overview(uuid)          FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.join_class_by_code(text)               FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_pending_class_invites()          FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.accept_parent_invite(uuid)             FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.search_similar_questions(vector, text, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_platform_admin()                    FROM PUBLIC, anon;

-- Grant back to authenticated where the app needs it.
GRANT EXECUTE ON FUNCTION public.get_child_profiles(uuid)        TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_child_sessions(uuid)        TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_friend_scores(uuid)         TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_class_roster(uuid)          TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_class_predictions(uuid)     TO authenticated;
GRANT EXECUTE ON FUNCTION public.refresh_class_predictions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_department_overview(uuid)   TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_class_by_code(text)        TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_pending_class_invites()   TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_parent_invite(uuid)      TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_similar_questions(vector, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_platform_admin()             TO authenticated;
