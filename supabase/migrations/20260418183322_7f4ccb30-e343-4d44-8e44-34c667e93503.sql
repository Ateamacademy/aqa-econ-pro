-- Cache for generated predicted-paper solutions (mark schemes).
-- Stores a typed-block JSON document per (paper_id, question_number).
-- Generation is expensive; this lets the UI viewer + PDF downloader reuse one
-- canonical mark scheme rather than regenerating on every interaction, and
-- also gives the legacy migration + admin/legacy-diagrams page real data to
-- operate on.

CREATE TABLE IF NOT EXISTS public.predicted_paper_solutions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id        TEXT NOT NULL,
  question_number TEXT NOT NULL,
  marks           INTEGER NOT NULL DEFAULT 0,
  question_text   TEXT,
  -- Typed-block document: { sections: MarkSchemeSection[], examinerTips: string[],
  -- modelAnswer?: MarkSchemeSection[], indicativeContent?: string[] }
  mark_scheme     JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Schema version so we can run forward migrations without losing legacy rows.
  schema_version  INTEGER NOT NULL DEFAULT 2,
  -- Set to true while a row is the result of the legacy "Diagram: <id>" prose
  -- format and could not be fully mapped to the catalog. Used by
  -- /admin/legacy-diagrams.
  has_legacy_unmapped BOOLEAN NOT NULL DEFAULT false,
  -- List of legacy diagram ids that the migration could not map.
  legacy_unmapped_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT predicted_paper_solutions_paper_q_unique UNIQUE (paper_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_pps_paper_id            ON public.predicted_paper_solutions (paper_id);
CREATE INDEX IF NOT EXISTS idx_pps_has_legacy_unmapped ON public.predicted_paper_solutions (has_legacy_unmapped) WHERE has_legacy_unmapped = true;

ALTER TABLE public.predicted_paper_solutions ENABLE ROW LEVEL SECURITY;

-- Mark schemes are study material — readable by any signed-in student.
CREATE POLICY "Authenticated can read solutions"
  ON public.predicted_paper_solutions
  FOR SELECT
  TO authenticated
  USING (true);

-- Generation runs from the client (signed-in student) the first time a paper's
-- solutions are requested; subsequent students reuse the cached row.
CREATE POLICY "Authenticated can insert solutions"
  ON public.predicted_paper_solutions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update solutions"
  ON public.predicted_paper_solutions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Service role retains full access for the admin migration script.
CREATE POLICY "Service role manages solutions"
  ON public.predicted_paper_solutions
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Reuse the existing updated_at convention — define a local trigger function
-- if the project doesn't already expose one in a shared form.
CREATE OR REPLACE FUNCTION public.pps_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pps_set_updated_at ON public.predicted_paper_solutions;
CREATE TRIGGER trg_pps_set_updated_at
  BEFORE UPDATE ON public.predicted_paper_solutions
  FOR EACH ROW
  EXECUTE FUNCTION public.pps_set_updated_at();