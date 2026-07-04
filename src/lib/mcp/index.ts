import { defineMcp } from "@lovable.dev/mcp-js";
import listScoresTool from "./tools/list-scores";
import getScoreTool from "./tools/get-score";
import submitCommissionTool from "./tools/submit-commission";

export default defineMcp({
  name: "bk-music-mcp",
  title: "BK Music",
  version: "0.1.0",
  instructions:
    "Tools for exploring Boniface Kagunda's sacred music catalog and submitting commission inquiries. Use `list_scores` to browse the catalog, `get_score` to fetch a single piece, and `submit_commission_inquiry` when a user wants to request a custom composition.",
  tools: [listScoresTool, getScoreTool, submitCommissionTool],
});
