
# BK Music AI Agent — Build Plan

One "Studio Agent" powered by Lovable AI (Gemini) that handles four jobs autonomously, with an admin log page where you can review everything it did.

## Phase 1 — Foundation (built first)

- **Admin route `/studio`** protected by Lovable Cloud auth (you sign in with your email; no public sign-ups). Shows agent activity, drafts, and toggles.
- **`agent_actions` table** — every action the agent takes (reply sent, score tagged, digest emailed) is logged here with status, payload, timestamp. Your source of truth.
- **`user_roles` table** (`admin` role) so only you can access `/studio`.
- **Lovable Emails** set up for outbound (auto-replies + your weekly digest).

## Phase 2 — Reply to commission inquiries (auto-act, notify you)

- Edge function `agent-reply-inquiry` triggered by a database webhook whenever a new row lands in `commission_inquiries` or `contact_submissions`.
- Gemini drafts a warm, personalized reply using your bio, languages (English/Kiswahili/Kikuyu), and the inquiry's occasion/ensemble/voice type.
- Auto-sends from your Lovable Emails domain, CCs you, and logs to `agent_actions`. You get an email notification with the draft + a "flag as wrong" link.

## Phase 3 — Visitor chatbot

- Floating chat widget on every page ("Ask BK's Studio").
- Streaming edge function `chat` using `google/gemini-3-flash-preview` with a system prompt loaded with: your bio, services, languages, commission flow, and live catalog from the `scores` table (tool call: `list_scores`).
- Suggests scores, quotes prices/ranges you set, and routes serious commission asks straight into the inquiry form.
- One-conversation-per-visitor, stored in `localStorage` (no thread history table needed).

## Phase 4 — Curate & tag new scores

- Extend the existing `sync-musescore` function: after each new score is inserted, call Gemini to generate `mood`, `story` (short blurb), and detect liturgical season / language from the title.
- Writes back to the `scores` row. Auto-promotes 1 score/week to `featured=true` based on freshness + variety.

## Phase 5 — Weekly summary email

- Scheduled edge function `agent-weekly-digest` running Mondays 8am Nairobi via pg_cron.
- Aggregates: new inquiries (with agent's reply status), new scores synced + tagged, top-viewed scores, site traffic snippet, and 2–3 suggested follow-ups written by Gemini.
- Emails you a nicely formatted HTML digest.

## Technical section

- **Model**: `google/gemini-3-flash-preview` via Lovable AI Gateway (no API key needed from you).
- **Backend**: Supabase Edge Functions (`agent-reply-inquiry`, `chat`, `agent-curate-score`, `agent-weekly-digest`) + one shared `_shared/ai-gateway.ts` provider helper.
- **Triggers**:
  - Inquiry reply → Supabase database webhook on `INSERT` to inquiries tables.
  - Score curation → called inline from `sync-musescore` after `INSERT`.
  - Weekly digest → `pg_cron` + `pg_net` calling the function.
- **Auth**: `user_roles` table with `has_role()` security-definer function; `/studio` route redirects non-admins.
- **Safety rails**: every outbound action is idempotent (dedup by `commission_inquiries.id`), and you have a global kill switch in `/studio` that pauses all agent activity.

## What I need from you before starting

1. **Your email address** — where notifications and the weekly digest are sent.
2. Confirm you'd like me to build all 5 phases in one go, or stop after Phase 2 (inquiry replies) so you can test it live first before I continue.
