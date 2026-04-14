
CREATE TABLE public.scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  musescore_id text UNIQUE NOT NULL,
  musescore_url text NOT NULL,
  thumbnail_url text,
  ensemble_type text,
  instruments text,
  parts integer DEFAULT 1,
  pages integer DEFAULT 1,
  duration text,
  views integer DEFAULT 0,
  published_date text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scores"
ON public.scores
FOR SELECT
TO anon, authenticated
USING (true);
