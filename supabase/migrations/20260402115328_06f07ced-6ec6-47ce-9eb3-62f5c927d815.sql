
-- Diagram mark schemes: accepted labels, synonyms, and marking config per component
CREATE TABLE public.diagram_mark_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  diagram_type TEXT NOT NULL,
  component_name TEXT NOT NULL,
  accepted_labels TEXT[] NOT NULL DEFAULT '{}',
  mark_value INTEGER NOT NULL DEFAULT 1,
  positional_required BOOLEAN NOT NULL DEFAULT false,
  strict_mode BOOLEAN NOT NULL DEFAULT false,
  board TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(diagram_type, component_name, board)
);

ALTER TABLE public.diagram_mark_schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mark schemes are publicly readable"
  ON public.diagram_mark_schemes FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage mark schemes"
  ON public.diagram_mark_schemes FOR ALL
  TO authenticated
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

-- Diagram marking results: detailed per-submission outcomes
CREATE TABLE public.diagram_marking_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  diagram_type TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'moderate',
  total_marks INTEGER NOT NULL,
  marks_awarded INTEGER NOT NULL DEFAULT 0,
  answer_type TEXT NOT NULL DEFAULT 'text',
  component_results JSONB NOT NULL DEFAULT '[]',
  examiner_report JSONB DEFAULT NULL,
  feedback_text TEXT DEFAULT NULL,
  question_text TEXT DEFAULT NULL,
  student_answer TEXT DEFAULT NULL,
  scenario_id TEXT DEFAULT NULL,
  retry_of UUID DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagram_marking_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own marking results"
  ON public.diagram_marking_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own marking results"
  ON public.diagram_marking_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can read all marking results"
  ON public.diagram_marking_results FOR SELECT
  USING (auth.role() = 'service_role'::text);

-- Indexes for analytics queries
CREATE INDEX idx_marking_results_user ON public.diagram_marking_results(user_id);
CREATE INDEX idx_marking_results_diagram_type ON public.diagram_marking_results(diagram_type);
CREATE INDEX idx_marking_results_created ON public.diagram_marking_results(created_at DESC);

-- Diagram misconceptions: common errors tracked
CREATE TABLE public.diagram_misconceptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  diagram_type TEXT NOT NULL,
  misconception_text TEXT NOT NULL,
  correct_explanation TEXT DEFAULT NULL,
  frequency_count INTEGER NOT NULL DEFAULT 0,
  severity TEXT NOT NULL DEFAULT 'minor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagram_misconceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Misconceptions are publicly readable"
  ON public.diagram_misconceptions FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage misconceptions"
  ON public.diagram_misconceptions FOR ALL
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

-- Diagram exemplars: model answers
CREATE TABLE public.diagram_exemplars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  diagram_type TEXT NOT NULL,
  board TEXT DEFAULT NULL,
  exemplar_text TEXT NOT NULL,
  exemplar_image_url TEXT DEFAULT NULL,
  mark_level TEXT NOT NULL DEFAULT 'full_marks',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagram_exemplars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exemplars are publicly readable"
  ON public.diagram_exemplars FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage exemplars"
  ON public.diagram_exemplars FOR ALL
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

-- Enable realtime for marking results (live dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE public.diagram_marking_results;
