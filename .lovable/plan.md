# Full site test pass + security hardening

## Current state (verified this session)

- Dependency audit: no high or critical vulnerabilities. `@lovable.dev/mcp-js` 1.0.0, lockfile is text `bun.lock`.
- Fresh backend security scan: only one warning remains — anonymous-access policy on `cron.job`, which is a platform-managed table, not something in this app's schema.
- Backend functions deployed: `agent-reply-inquiry`, `mcp`, `sync-musescore`, `trigger-sync`.
- TypeScript check passes with no errors.

## Part 1 — Test everything

End-to-end checks with a real browser against the running app:

1. Signed-out gate: `/`, `/about`, `/compositions`, `/contact`, `/studio` all redirect to the sign-in page with the return path preserved; `/auth` and the OAuth consent page stay public.
2. Signed-in flow: sign in, confirm redirect back to the originally requested page, and confirm the navbar shows Studio + Sign out.
3. Page-by-page render check (Home, About, Compositions, Contact, Studio) for console errors, broken images, and missing data.
4. Compositions: score list loads, language/ensemble filters work, MuseScore sync button runs and reports a correct result (synced vs. throttled) instead of failing silently.
5. Contact: submit a test message and confirm it lands in the database and the agent auto-reply log records the action.
6. Studio: agent activity log, settings, and inquiry list load for the admin account.
7. MCP tools: re-run all five tools with an authenticated agent to confirm they still respond.
8. Production build.

Anything broken gets fixed in the same pass, then re-tested.

## Part 2 — Upgrade the security

1. **Leaked password protection** — enable the Have I Been Pwned check so signup and password changes reject known-breached passwords.
2. **Password strength policy** — require a minimum length and character mix at the auth level, with matching client-side validation and clear error copy on the sign-up form.
3. **Edge function auth posture** — audit each function: `mcp` and `agent-reply-inquiry` must stay locked to verified OAuth tokens / shared secret, `trigger-sync` must keep its server-side cooldown, and `sync-musescore` must not be publicly invocable without throttling.
4. **Row-level policy re-audit** — confirm every public table's grants match its policies exactly (no wider `anon` grant than the policies allow) and that write paths on submission tables stay insert-only.
5. **Client error hygiene** — sweep all forms and auth flows so no raw backend error text reaches the user; generic messages only.
6. **Security headers / robots** — confirm private routes (`/studio`, OAuth consent) stay excluded from indexing and the sitemap.
7. Re-run the dependency and backend scans at the end to confirm a clean result.

## Not in scope

The `cron.job` anonymous-policy warning is on a platform-managed table outside this app's schema and cannot be safely changed here; it will be left as-is.

## Technical notes

- Auth settings changed via the auth configuration tool (HIBP + password policy), not code.
- Browser testing via Playwright against `localhost:8080`; authenticated checks need an active preview session — if none is injected, those steps are verified by code review plus signed-out behaviour and reported as such.
- No schema changes are expected unless the grant audit turns up a mismatch.
