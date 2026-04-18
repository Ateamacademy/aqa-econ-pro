-- Cache for AI marking responses keyed by SHA-256 of payload
CREATE TABLE IF NOT EXISTS public.ai_marking_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL,
  question_id TEXT NOT NULL,
  analysis JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days')
);

CREATE INDEX IF NOT EXISTS idx_ai_marking_cache_key ON public.ai_marking_cache (cache_key);
CREATE INDEX IF NOT EXISTS idx_ai_marking_cache_expires ON public.ai_marking_cache (expires_at);

ALTER TABLE public.ai_marking_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can read cache"
  ON public.ai_marking_cache FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone authenticated can write cache"
  ON public.ai_marking_cache FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage cache"
  ON public.ai_marking_cache FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Usage log: every AI marking call (cache hits + misses) for admin cost tracking
CREATE TABLE IF NOT EXISTS public.ai_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  paper_id TEXT,
  question_id TEXT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  cache_hit BOOLEAN NOT NULL DEFAULT false,
  input_tokens INTEGER,
  output_tokens INTEGER,
  status TEXT NOT NULL DEFAULT 'ok',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_log_created ON public.ai_usage_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_log_user ON public.ai_usage_log (user_id);

ALTER TABLE public.ai_usage_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can write own usage log"
  ON public.ai_usage_log FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can read own usage log"
  ON public.ai_usage_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can read all usage log"
  ON public.ai_usage_log FOR SELECT
  USING (auth.role() = 'service_role');