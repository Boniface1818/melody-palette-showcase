import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_commission_inquiries",
  title: "List commission inquiries",
  description: "List recent song commission inquiries. Requires an admin account; row-level security applies.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Maximum number of inquiries (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("commission_inquiries")
      .select("id,name,email,occasion,ensemble,voice_type,deadline,message,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { inquiries: data ?? [] },
    };
  },
});
