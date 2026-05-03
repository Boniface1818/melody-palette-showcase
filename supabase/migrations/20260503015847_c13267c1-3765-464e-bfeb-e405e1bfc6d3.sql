DROP POLICY IF EXISTS "Block public reads of commission inquiries" ON public.commission_inquiries;

CREATE POLICY "Block public reads of commission inquiries"
ON public.commission_inquiries
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);