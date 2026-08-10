import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listScoresTool from "./tools/list-scores";
import getScoreTool from "./tools/get-score";
import listCommissionInquiriesTool from "./tools/list-commission-inquiries";
import listContactMessagesTool from "./tools/list-contact-messages";
import listAgentActionsTool from "./tools/list-agent-actions";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "musical-portfolio",
  title: "MUSICAL PORTFOLIO",
  version: "0.1.0",
  instructions:
    "Tools for the BK Melodies music portfolio by Boniface Kagunda. Use `list_scores` and `get_score` to browse the composition catalog, `list_commission_inquiries` and `list_contact_messages` to review incoming requests, and `list_agent_actions` to inspect the studio agent's activity log.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listScoresTool,
    getScoreTool,
    listCommissionInquiriesTool,
    listContactMessagesTool,
    listAgentActionsTool,
  ],
});
