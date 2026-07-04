import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_scores",
  title: "List sacred music scores",
  description:
    "List Boniface Kagunda's published sacred music scores from the public catalog. Supports filtering by ensemble and optional text search over title and story.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max scores to return (default 20)."),
    ensemble: z.string().optional().describe("Filter by ensemble_type, e.g. 'SATB Choir'."),
    search: z.string().optional().describe("Case-insensitive substring match on title."),
    featured_only: z.boolean().optional().describe("Return only featured scores."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, ensemble, search, featured_only }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    let q = supabase
      .from("scores")
      .select("id,title,musescore_url,thumbnail_url,ensemble_type,mood,instruments,duration,pages,story,views,featured,published_date")
      .order("published_date", { ascending: false, nullsFirst: false })
      .limit(limit ?? 20);

    if (ensemble) q = q.eq("ensemble_type", ensemble);
    if (featured_only) q = q.eq("featured", true);
    if (search) q = q.ilike("title", `%${search}%`);

    const { data, error } = await q;
    if (error) {
      return { content: [{ type: "text", text: `Error loading scores: ${error.message}` }], isError: true };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { scores: data ?? [] },
    };
  },
});
