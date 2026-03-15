
-- Friendships table for friend connections
CREATE TABLE public.friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  addressee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(requester_id, addressee_id),
  CHECK (requester_id <> addressee_id)
);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- Users can see friendships they're involved in
CREATE POLICY "Users can view own friendships"
  ON public.friendships FOR SELECT TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Users can send friend requests
CREATE POLICY "Users can send friend requests"
  ON public.friendships FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = requester_id);

-- Users can update friendships addressed to them (accept/reject)
CREATE POLICY "Users can respond to friend requests"
  ON public.friendships FOR UPDATE TO authenticated
  USING (auth.uid() = addressee_id);

-- Users can delete their own friendships
CREATE POLICY "Users can delete own friendships"
  ON public.friendships FOR DELETE TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Add display_name to profiles for leaderboard
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;

-- Function to get friend leaderboard scores
CREATE OR REPLACE FUNCTION public.get_friend_scores(requesting_user_id uuid)
RETURNS TABLE(user_id uuid, display_name text, score_avg numeric, session_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'public'
AS $$
  WITH friends AS (
    SELECT CASE 
      WHEN requester_id = requesting_user_id THEN addressee_id 
      ELSE requester_id 
    END AS friend_id
    FROM public.friendships
    WHERE status = 'accepted'
      AND (requester_id = requesting_user_id OR addressee_id = requesting_user_id)
  ),
  all_users AS (
    SELECT requesting_user_id AS uid
    UNION ALL
    SELECT friend_id FROM friends
  )
  SELECT 
    au.uid AS user_id,
    COALESCE(p.display_name, 'User') AS display_name,
    COALESCE(ROUND(AVG(ps.score_percent)::numeric, 0), 0) AS score_avg,
    COUNT(ps.id) AS session_count
  FROM all_users au
  LEFT JOIN public.profiles p ON p.user_id = au.uid
  LEFT JOIN public.practice_sessions ps ON ps.user_id = au.uid 
    AND ps.created_at > now() - interval '30 days'
  GROUP BY au.uid, p.display_name
  ORDER BY score_avg DESC, session_count DESC;
$$;
