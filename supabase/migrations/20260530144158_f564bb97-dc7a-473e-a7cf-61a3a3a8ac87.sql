-- Harden paid_users: explicitly restrict INSERT/UPDATE/DELETE to service_role only.
-- (RLS already denies by default since no policies exist for these ops, but explicit
-- policies make the security posture clear and satisfy the scanner.)

CREATE POLICY "Service role manages paid_users inserts"
  ON public.paid_users FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role manages paid_users updates"
  ON public.paid_users FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role manages paid_users deletes"
  ON public.paid_users FOR DELETE
  TO public
  USING (auth.role() = 'service_role');
