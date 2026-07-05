
-- 1) Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2) Agent action log
CREATE TABLE public.agent_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL,                 -- 'inquiry_reply' | 'score_tag' | 'weekly_digest' | 'chat_turn'
  status TEXT NOT NULL DEFAULT 'success', -- 'success' | 'failed' | 'skipped'
  subject_id TEXT,                    -- id of the related row (inquiry, score, etc.)
  summary TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX agent_actions_kind_created_idx ON public.agent_actions (kind, created_at DESC);
CREATE INDEX agent_actions_subject_idx ON public.agent_actions (subject_id);

GRANT SELECT ON public.agent_actions TO authenticated;
GRANT ALL ON public.agent_actions TO service_role;
ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read agent actions"
ON public.agent_actions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3) Agent settings (single row, kill switch + config)
CREATE TABLE public.agent_settings (
  id INT PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN NOT NULL DEFAULT true,
  auto_reply_inquiries BOOLEAN NOT NULL DEFAULT true,
  notify_email TEXT NOT NULL DEFAULT 'Kagundaboniface98@gmail.com',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
INSERT INTO public.agent_settings (id) VALUES (1);

GRANT SELECT ON public.agent_settings TO authenticated;
GRANT ALL ON public.agent_settings TO service_role;
ALTER TABLE public.agent_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read agent settings"
ON public.agent_settings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update agent settings"
ON public.agent_settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4) Allow admins to read inquiries in the studio dashboard (they were blocked before)
CREATE POLICY "Admins can read commission inquiries"
ON public.commission_inquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
