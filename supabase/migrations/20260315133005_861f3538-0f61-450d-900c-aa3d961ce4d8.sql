ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS free_tutor_used integer NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS free_diagrams_used integer NOT NULL DEFAULT 0;