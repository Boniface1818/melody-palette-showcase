-- Replace overly permissive INSERT policy with length-bounded one
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) > 0 AND length(name) <= 100
  AND length(email) > 0 AND length(email) <= 255
  AND length(subject) > 0 AND length(subject) <= 200
  AND length(message) > 0 AND length(message) <= 2000
);

-- Explicit restrictive policy denying all SELECT to anon/authenticated.
-- Reads remain possible only via service role (backend dashboard).
CREATE POLICY "Block public reads of contact submissions"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);