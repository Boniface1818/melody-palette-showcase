UPDATE public.agent_shared_secret
SET secret = encode(gen_random_bytes(32), 'hex')
WHERE id = 1;

INSERT INTO public.agent_shared_secret (id, secret)
SELECT 1, encode(gen_random_bytes(32), 'hex')
WHERE NOT EXISTS (SELECT 1 FROM public.agent_shared_secret WHERE id = 1);