
CREATE TABLE IF NOT EXISTS public.agent_shared_secret (
  id INT PRIMARY KEY DEFAULT 1,
  secret TEXT NOT NULL,
  CONSTRAINT agent_shared_secret_singleton CHECK (id = 1)
);

REVOKE ALL ON public.agent_shared_secret FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.agent_shared_secret TO service_role;

ALTER TABLE public.agent_shared_secret ENABLE ROW LEVEL SECURITY;

-- No policies: only service_role (which bypasses RLS) can read/write.

INSERT INTO public.agent_shared_secret (id, secret)
VALUES (1, encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.notify_agent_new_inquiry()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  fn_url TEXT := 'https://dcfwukeqyydxwkxfgbxg.supabase.co/functions/v1/agent-reply-inquiry';
  sync_secret TEXT;
BEGIN
  SELECT secret INTO sync_secret FROM public.agent_shared_secret WHERE id = 1;
  PERFORM net.http_post(
    url := fn_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-sync-secret', sync_secret),
    body := jsonb_build_object('source', TG_TABLE_NAME, 'id', NEW.id)
  );
  RETURN NEW;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.notify_agent_new_inquiry() FROM PUBLIC, anon, authenticated;
