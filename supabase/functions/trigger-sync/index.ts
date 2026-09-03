// Public wrapper for sync-musescore. Holds SYNC_SECRET server-side and forwards
// the request, so the shared secret never leaves the edge runtime.
// Abuse protection: a server-side, database-backed cooldown that cannot be
// bypassed by the client. Authenticated admins may bypass the cooldown.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const COOLDOWN_SECONDS = 900; // 15 minutes between public syncs

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const syncSecret = Deno.env.get("SYNC_SECRET");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !syncSecret || !serviceKey || !anonKey) {
    return new Response(
      JSON.stringify({ success: false, error: "Server is not configured for sync." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const admin = createClient(supabaseUrl, serviceKey);

  try {
    // Is the caller an authenticated admin? Admins skip the cooldown.
    let isAdmin = false;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await admin.auth.getClaims(token);
      const userId = data?.claims?.sub as string | undefined;
      if (userId) {
        // has_role lives in the non-exposed `private` schema, so check the
        // role table directly with the service-role client instead.
        const { data: roleRow } = await admin
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();
        isAdmin = !!roleRow;
      }
    }

    if (!isAdmin) {
      const { data: allowed, error: rlError } = await admin.rpc("try_consume_sync_slot", {
        _cooldown_seconds: COOLDOWN_SECONDS,
      });

      if (rlError) {
        console.error("rate limit check failed:", rlError.message);
        return new Response(
          JSON.stringify({ success: false, error: "Sync is temporarily unavailable." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (allowed !== true) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "The catalog was refreshed recently. Please try again later.",
          }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
              "Retry-After": String(COOLDOWN_SECONDS),
            },
          },
        );
      }
    }

    const upstream = await fetch(`${supabaseUrl}/functions/v1/sync-musescore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sync-secret": syncSecret,
      },
      body: JSON.stringify({ trigger: "manual" }),
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("trigger-sync error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to trigger sync." }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
