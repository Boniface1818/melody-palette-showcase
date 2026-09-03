-- Least-privilege grants: match table privileges to the RLS policies.
REVOKE ALL ON public.scores FROM anon, authenticated;
GRANT SELECT ON public.scores TO anon, authenticated;
GRANT ALL ON public.scores TO service_role;

REVOKE ALL ON public.commission_inquiries FROM anon, authenticated;
GRANT INSERT ON public.commission_inquiries TO anon, authenticated;
GRANT SELECT ON public.commission_inquiries TO authenticated;
GRANT ALL ON public.commission_inquiries TO service_role;

REVOKE ALL ON public.contact_submissions FROM anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

REVOKE ALL ON public.agent_actions FROM anon, authenticated;
GRANT SELECT ON public.agent_actions TO authenticated;
GRANT ALL ON public.agent_actions TO service_role;

REVOKE ALL ON public.agent_settings FROM anon, authenticated;
GRANT SELECT, UPDATE ON public.agent_settings TO authenticated;
GRANT ALL ON public.agent_settings TO service_role;

REVOKE ALL ON public.sync_rate_limit FROM anon, authenticated;
GRANT ALL ON public.sync_rate_limit TO service_role;

REVOKE ALL ON public.agent_shared_secret FROM anon, authenticated;
GRANT ALL ON public.agent_shared_secret TO service_role;

REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;