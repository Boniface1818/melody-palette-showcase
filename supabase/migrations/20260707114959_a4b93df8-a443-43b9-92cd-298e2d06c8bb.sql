-- Revoke direct EXECUTE on SECURITY DEFINER functions from public API roles.
-- has_role() is still callable from RLS policies (runs as postgres in-policy),
-- and notify_agent_new_inquiry() runs only as a trigger.

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated;

REVOKE ALL ON FUNCTION public.notify_agent_new_inquiry() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_agent_new_inquiry() FROM anon, authenticated;