
-- Fix search path for the similarity search function
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
SECURITY DEFINER
SET search_path = 'public'
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
