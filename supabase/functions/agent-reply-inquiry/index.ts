// Auto-draft a warm reply to a new commission inquiry or contact form submission.
// Triggered by a pg_net call from a database trigger. Logs everything to agent_actions.
import { createClient } from "npm:@supabase/supabase-js@2";
import { generateText } from "npm:ai";
import { createLovableAiGatewayProvider, corsHeaders } from "../_shared/ai-gateway.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SYNC_SECRET = Deno.env.get("SYNC_SECRET") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const ALLOWED_SOURCES = ["commission_inquiries", "contact_submissions"] as const;
type AllowedSource = typeof ALLOWED_SOURCES[number];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Require a shared secret OR the project's anon-key bearer (used by the DB trigger).
  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";
  const providedSecret = req.headers.get("x-sync-secret") ?? "";
  const authorized =
    (SYNC_SECRET && providedSecret === SYNC_SECRET) ||
    (ANON_KEY && bearer === ANON_KEY);
  if (!authorized) {
    return json({ error: "Unauthorized" }, 401);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

  try {
    const body = await req.json().catch(() => ({}));
    const source = body?.source as string | undefined;
    const rowId = body?.id as string | undefined;

    if (!source || !rowId) {
      return json({ error: "Missing source or id" }, 400);
    }
    if (!ALLOWED_SOURCES.includes(source as AllowedSource)) {
      return json({ error: "Invalid source" }, 400);
    }
    if (typeof rowId !== "string" || !/^[0-9a-f-]{36}$/i.test(rowId)) {
      return json({ error: "Invalid id" }, 400);
    }
    const safeSource = source as AllowedSource;


    // Kill-switch check
    const { data: settings } = await admin
      .from("agent_settings").select("*").eq("id", 1).maybeSingle();
    if (!settings?.enabled || !settings?.auto_reply_inquiries) {
      await admin.from("agent_actions").insert({
        kind: "inquiry_reply",
        status: "skipped",
        subject_id: rowId,
        summary: "Agent disabled — reply skipped",
        payload: { source: safeSource },
      });
      return json({ skipped: true });
    }

    // Idempotency: don't reply twice for the same row
    const { data: existing } = await admin
      .from("agent_actions").select("id")
      .eq("kind", "inquiry_reply").eq("subject_id", rowId).limit(1);
    if (existing && existing.length > 0) return json({ deduped: true });

    // Load the inquiry row
    const { data: row, error: rowErr } = await admin
      .from(safeSource).select("*").eq("id", rowId).maybeSingle();
    if (rowErr || !row) throw new Error(`Row not found: ${rowErr?.message ?? "no row"}`);

    // Build a prompt tailored to which form it came from
    const context =
      safeSource === "commission_inquiries"
        ? `A new COMMISSION inquiry.
Name: ${row.name}
Email: ${row.email}
Occasion: ${row.occasion ?? "not specified"}
Ensemble: ${row.ensemble ?? "not specified"}
Voice type: ${row.voice_type ?? "not specified"}
Deadline: ${row.deadline ?? "not specified"}
Message:
${row.message}`
        : `A new CONTACT form message.
Name: ${row.name}
Email: ${row.email}
Subject: ${row.subject}
Message:
${row.message}`;

    const system = `You are the studio assistant for Boniface Kagunda ("BK Music"), a Kenyan sacred-music composer and arranger.

You write short, warm, personal email replies on Boniface's behalf when someone contacts him. Rules:
- Address the sender by first name only.
- Sound like a real human composer — warm, respectful, unhurried. Never robotic.
- Detect the sender's likely language (English/Kiswahili/Kikuyu) from their message. Reply in that language; default to English.
- For commissions: acknowledge the specific occasion/ensemble/voice/deadline they mentioned, express genuine interest, and say Boniface will respond personally within 1–2 days with next steps and any questions.
- For general contact: thank them, mirror their intent briefly, and confirm Boniface has been notified and will reply personally soon.
- Never quote prices. Never make commitments about specific delivery dates.
- Sign off with:
  With gratitude,
  Boniface Kagunda
  BK Music
- Keep the whole reply under 140 words.

Return ONLY the email body text — no subject line, no markdown headers, no preamble.`;

    const gateway = createLovableAiGatewayProvider(LOVABLE_API_KEY);
    const model = gateway("google/gemini-3-flash-preview");

    const { text: draft } = await generateText({
      model,
      system,
      prompt: context,
    });

    // Log the draft. (Actual email send will be wired once your email domain is verified.)
    const { error: logErr } = await admin.from("agent_actions").insert({
      kind: "inquiry_reply",
      status: "success",
      subject_id: rowId,
      summary: `Drafted reply to ${row.name} <${row.email}>`,
      payload: {
        source: safeSource,
        to: row.email,
        name: row.name,
        subject:
          safeSource === "commission_inquiries"
            ? `Re: your commission — thank you, ${String(row.name).split(" ")[0]}`
            : `Re: ${row.subject ?? "your message"}`,
        body: draft,
        notify_email: settings.notify_email,
      },
    });
    if (logErr) throw logErr;

    return json({ ok: true, drafted: true });
  } catch (err) {
    await admin.from("agent_actions").insert({
      kind: "inquiry_reply",
      status: "failed",
      summary: "Agent failed to draft reply",
      error: String(err),
    }).catch(() => {});
    return json({ error: String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
