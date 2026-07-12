
CREATE OR REPLACE FUNCTION public.notify_agent_new_inquiry()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  fn_url TEXT := 'https://dcfwukeqyydxwkxfgbxg.supabase.co/functions/v1/agent-reply-inquiry';
  sync_secret TEXT := '40801337e29ddeec9f30eb626b53f825a755038c46387bc9fe1f36b7355bde80';
BEGIN
  PERFORM net.http_post(
    url := fn_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-sync-secret', sync_secret),
    body := jsonb_build_object('source', TG_TABLE_NAME, 'id', NEW.id)
  );
  RETURN NEW;
END;
$function$;
