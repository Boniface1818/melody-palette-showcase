GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT SELECT ON public.agent_actions TO authenticated;
GRANT SELECT ON public.commission_inquiries TO authenticated;
GRANT SELECT ON public.contact_submissions TO authenticated;