-- Enable pg_cron and pg_net for scheduled edge function calls
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove any existing schedule with the same name to make this idempotent
DO $$
DECLARE
  job_id bigint;
BEGIN
  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'sync-musescore-daily';
  IF job_id IS NOT NULL THEN
    PERFORM cron.unschedule(job_id);
  END IF;
END $$;

-- Schedule the sync-musescore function daily at 03:00 UTC
SELECT cron.schedule(
  'sync-musescore-daily',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url := 'https://dcfwukeqyydxwkxfgbxg.supabase.co/functions/v1/sync-musescore',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb
  ) AS request_id;
  $$
);

-- Commission inquiries table
CREATE TABLE IF NOT EXISTS public.commission_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  occasion text,
  ensemble text,
  voice_type text,
  deadline text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.commission_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a commission inquiry"
  ON public.commission_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND length(name) <= 120 AND
    length(email) > 0 AND length(email) <= 255 AND
    length(message) > 0 AND length(message) <= 4000 AND
    (occasion IS NULL OR length(occasion) <= 200) AND
    (ensemble IS NULL OR length(ensemble) <= 120) AND
    (voice_type IS NULL OR length(voice_type) <= 60) AND
    (deadline IS NULL OR length(deadline) <= 100)
  );

CREATE POLICY "Block public reads of commission inquiries"
  ON public.commission_inquiries
  FOR SELECT
  TO anon, authenticated
  USING (false);