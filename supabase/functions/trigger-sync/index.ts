// Public wrapper for sync-musescore. Holds SYNC_SECRET server-side and forwards
// the request, so the shared secret never leaves the edge runtime.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

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

  if (!supabaseUrl || !syncSecret) {
    return new Response(
      JSON.stringify({ success: false, error: "Server is not configured for sync." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
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
