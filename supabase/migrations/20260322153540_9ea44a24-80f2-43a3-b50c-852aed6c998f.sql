
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS exam_board text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS target_grade text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
