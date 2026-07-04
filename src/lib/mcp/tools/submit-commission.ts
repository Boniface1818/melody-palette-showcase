import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_commission_inquiry",
  title: "Submit a commission inquiry",
  description:
    "Send a new commission inquiry to Boniface Kagunda. Use this when a user wants to request a custom sacred music composition.",
  inputSchema: {
    name: z.string().min(1).max(120).describe("Full name of the person commissioning."),
    email: z.string().email().max(255).describe("Contact email."),
    message: z.string().min(1).max(4000).describe("Details: story, occasion, lyrics, feeling."),
    occasion: z.string().max(120).optional(),
    ensemble: z.string().max(120).optional(),
    voice_type: z.string().max(60).optional(),
    deadline: z.string().max(100).optional().describe("Free-text deadline, e.g. 'Easter Vigil 2026'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const id = crypto.randomUUID();
    const { error } = await supabase.from("commission_inquiries").insert({ id, ...input });
    if (error) {
      return { content: [{ type: "text", text: `Failed to submit inquiry: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Inquiry received (id: ${id}). Boniface personally replies within 48 hours.` }],
      structuredContent: { id, status: "received" },
    };
  },
});
