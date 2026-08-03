CREATE TABLE IF NOT EXISTS public.sync_rate_limit (
  id integer PRIMARY KEY DEFAULT 1,
  last_run_at timestamptz NOT NULL DEFAULT to_timestamp(0),
  CONSTRAINT sync_rate_limit_single_row CHECK (id = 1)
);

INSERT INTO public.sync_rate_limit (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

GRANT ALL ON public.sync_rate_limit TO service_role;

ALTER TABLE public.sync_rate_limit ENABLE ROW LEVEL SECURITY;

-- No policies: only service_role (edge functions) may read or write this table.

CREATE OR REPLACE FUNCTION public.try_consume_sync_slot(_cooldown_seconds integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated integer;
BEGIN
  UPDATE public.sync_rate_limit
     SET last_run_at = now()
   WHERE id = 1
     AND last_run_at < now() - make_interval(secs => GREATEST(_cooldown_seconds, 0));
  GET DIAGNOSTICS updated = ROW_COUNT;
  RETURN updated > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.try_consume_sync_slot(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.try_consume_sync_slot(integer) TO service_role;