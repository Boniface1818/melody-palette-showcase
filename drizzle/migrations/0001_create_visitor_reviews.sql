CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 60),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review text NOT NULL CHECK (char_length(btrim(review)) BETWEEN 10 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visitor reviews"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit a visitor review"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 2 AND 60
    AND rating BETWEEN 1 AND 5
    AND char_length(btrim(review)) BETWEEN 10 AND 1000
  );

CREATE INDEX reviews_created_at_idx ON public.reviews (created_at DESC);