import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_score",
  title: "Get score details",
  description: "Fetch full metadata for a single sacred music score by its ID.",
  inputSchema: {
    id: z.string().uuid().describe("Score UUID from list_scores."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase.from("scores").select("*").eq("id", id).maybeSingle();
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    if (!data) return { content: [{ type: "text", text: "Score not found." }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { score: data },
    };
  },
});
