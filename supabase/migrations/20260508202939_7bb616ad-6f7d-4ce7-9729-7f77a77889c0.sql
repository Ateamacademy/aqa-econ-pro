
CREATE TABLE public.director_dashboard_access_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  viewer_user_id UUID,
  viewer_email TEXT NOT NULL,
  time_range TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.director_dashboard_access_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages access log"
ON public.director_dashboard_access_log
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Authed users can insert own access record"
ON public.director_dashboard_access_log
FOR INSERT
TO authenticated
WITH CHECK (viewer_user_id = auth.uid());

CREATE INDEX idx_director_access_log_created_at
  ON public.director_dashboard_access_log (created_at DESC);
