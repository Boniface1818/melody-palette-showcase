REVOKE ALL PRIVILEGES ON TABLE public.user_roles FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.user_roles FROM PUBLIC;
GRANT SELECT ON TABLE public.user_roles TO authenticated;
GRANT ALL PRIVILEGES ON TABLE public.user_roles TO service_role;

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Authenticated users can read only their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);