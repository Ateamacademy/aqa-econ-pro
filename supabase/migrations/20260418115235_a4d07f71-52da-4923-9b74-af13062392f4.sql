-- Question fingerprints for deduplication across predicted paper sets
CREATE TABLE IF NOT EXISTS public.question_fingerprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id text,
  paper_code text NOT NULL,
  set_label text NOT NULL,
  section text NOT NULL,
  marks integer NOT NULL,
  question_number text NOT NULL,
  normalised_text text NOT NULL,
  token_set text[] NOT NULL DEFAULT '{}',
  semantic_core text NOT NULL,
  scenario_key text,
  mcq_concept text,
  mcq_answer_value text,
  whitelisted_pair_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qfp_paper_section_marks
  ON public.question_fingerprints (paper_code, section, marks);
CREATE INDEX IF NOT EXISTS idx_qfp_scenario
  ON public.question_fingerprints (paper_code, scenario_key)
  WHERE scenario_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_qfp_mcq
  ON public.question_fingerprints (paper_code, mcq_concept)
  WHERE mcq_concept IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_qfp_paper_id
  ON public.question_fingerprints (paper_id);

ALTER TABLE public.question_fingerprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fingerprints are publicly readable"
  ON public.question_fingerprints FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert fingerprints"
  ON public.question_fingerprints FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can insert fingerprints"
  ON public.question_fingerprints FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can update fingerprints"
  ON public.question_fingerprints FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete fingerprints"
  ON public.question_fingerprints FOR DELETE
  USING (auth.role() = 'service_role');

-- Whitelist table for accepted near-duplicate pairs (admin overrides)
CREATE TABLE IF NOT EXISTS public.fingerprint_whitelist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint_a_id uuid NOT NULL,
  fingerprint_b_id uuid NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fingerprint_whitelist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Whitelist publicly readable"
  ON public.fingerprint_whitelist FOR SELECT
  USING (true);

CREATE POLICY "Service role manages whitelist"
  ON public.fingerprint_whitelist FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');