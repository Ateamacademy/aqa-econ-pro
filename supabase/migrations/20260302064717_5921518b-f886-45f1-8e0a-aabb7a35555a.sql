
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge graph: topics and their relationships
CREATE TABLE public.econ_knowledge_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL DEFAULT 'economics',
  topic TEXT NOT NULL,
  subtopic TEXT NOT NULL,
  paper TEXT NOT NULL,
  bloom_level TEXT NOT NULL CHECK (bloom_level IN ('remember','understand','apply','analyse','evaluate','create')),
  keywords TEXT[] NOT NULL DEFAULT '{}',
  related_topics TEXT[] NOT NULL DEFAULT '{}',
  question_stem TEXT,
  mark_allocation INTEGER NOT NULL DEFAULT 4,
  embedding vector(768),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Question pattern embeddings for semantic search
CREATE TABLE public.question_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  paper TEXT NOT NULL,
  year TEXT,
  question_text TEXT NOT NULL,
  marks INTEGER NOT NULL,
  topic TEXT NOT NULL,
  bloom_level TEXT NOT NULL DEFAULT 'apply',
  tags TEXT[] NOT NULL DEFAULT '{}',
  embedding vector(768),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for vector similarity search
CREATE INDEX ON public.question_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
CREATE INDEX ON public.econ_knowledge_nodes USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- RLS: public read, admin write
ALTER TABLE public.econ_knowledge_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.econ_knowledge_nodes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.question_embeddings FOR SELECT USING (true);

-- Similarity search function
CREATE OR REPLACE FUNCTION public.search_similar_questions(
  query_embedding vector(768),
  match_subject TEXT DEFAULT 'economics',
  match_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  question_text TEXT,
  marks INTEGER,
  topic TEXT,
  bloom_level TEXT,
  tags TEXT[],
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    qe.id,
    qe.question_text,
    qe.marks,
    qe.topic,
    qe.bloom_level,
    qe.tags,
    1 - (qe.embedding <=> query_embedding) AS similarity
  FROM public.question_embeddings qe
  WHERE qe.subject = match_subject
    AND qe.embedding IS NOT NULL
  ORDER BY qe.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
