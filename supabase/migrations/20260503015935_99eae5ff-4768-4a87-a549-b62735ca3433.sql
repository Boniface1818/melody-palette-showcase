-- Store SYNC_SECRET in vault (idempotent). Replace the placeholder via Lovable Cloud Secrets if value differs.
DO $$
DECLARE
  existing_id uuid;
BEGIN
  SELECT id INTO existing_id FROM vault.secrets WHERE name = 'SYNC_SECRET';
  IF existing_id IS NULL THEN
    PERFORM vault.create_secret(
      coalesce(current_setting('app.sync_secret', true), 'placeholder-set-via-vault-ui'),
      'SYNC_SECRET',
      'Shared secret for triggering sync-musescore edge function'
    );
  END IF;
END $$;

-- Reschedule cron job with the secret header
DO $$
DECLARE
  job_id bigint;
BEGIN
  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'sync-musescore-daily';
  IF job_id IS NOT NULL THEN
    PERFORM cron.unschedule(job_id);
  END IF;
END $$;

SELECT cron.schedule(
  'sync-musescore-daily',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url := 'https://dcfwukeqyydxwkxfgbxg.supabase.co/functions/v1/sync-musescore',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-sync-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SYNC_SECRET' LIMIT 1)
    ),
    body := '{"trigger": "cron"}'::jsonb
  ) AS request_id;
  $$
);