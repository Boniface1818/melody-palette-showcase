import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_scores",
  title: "List scores",
  description: "List published BK Melodies scores, newest first, with optional title search.",
  inputSchema: {
    search: z.string().trim().optional().describe("Optional case-insensitive title search."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum number of scores (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ search, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("scores")
      .select("id,title,musescore_url,ensemble_type,mood,duration,pages,views,published_date,featured")
      .order("published_date", { ascending: false })
      .limit(limit ?? 20);
    if (search) query = query.ilike("title", `%${search}%`);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { scores: data ?? [] },
    };
  },
});
