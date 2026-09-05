ALTER TABLE public.commission_inquiries
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'received',
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS admin_notes text;

ALTER TABLE public.commission_inquiries
  ADD CONSTRAINT commission_inquiries_status_check
  CHECK (status IN ('received','reviewing','composing','delivered','declined'));

GRANT UPDATE (status, admin_notes, updated_at) ON public.commission_inquiries TO authenticated;

CREATE POLICY "Admins can update commission inquiries"
  ON public.commission_inquiries FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_commission_inquiries_updated_at
  BEFORE UPDATE ON public.commission_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.scores ADD COLUMN IF NOT EXISTS announced_at timestamptz;

CREATE TABLE public.score_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.score_subscribers TO anon, authenticated;
GRANT SELECT ON public.score_subscribers TO authenticated;
GRANT ALL ON public.score_subscribers TO service_role;

ALTER TABLE public.score_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.score_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (length(email) > 3 AND length(email) <= 255 AND email LIKE '%_@_%.__%');

CREATE POLICY "Admins can read subscribers"
  ON public.score_subscribers FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Block public reads of subscribers"
  ON public.score_subscribers AS RESTRICTIVE FOR SELECT TO anon
  USING (false);

CREATE TRIGGER update_score_subscribers_updated_at
  BEFORE UPDATE ON public.score_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();