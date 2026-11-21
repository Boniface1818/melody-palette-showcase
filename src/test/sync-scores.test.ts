import { describe, expect, it } from "vitest";
import {
  classifySyncResult,
  getRetryAfterSeconds,
  SCORE_SYNC_COOLDOWN_MS,
} from "@/components/SyncScoresButton";

describe("score sync result handling", () => {
  it("recognizes a confirmed new-score import", () => {
    expect(classifySyncResult({
      success: true,
      added: 1,
      synced: 21,
      total: 21,
      source: "firecrawl",
      warning: null,
    })).toBe("added");
  });

  it("recognizes a complete check with no new scores", () => {
    expect(classifySyncResult({
      success: true,
      added: 0,
      synced: 20,
      total: 20,
      source: "firecrawl",
      warning: null,
    })).toBe("checked");
  });

  it("does not treat a fallback catalog as a verified MuseScore check", () => {
    expect(classifySyncResult({
      success: true,
      added: 0,
      synced: 7,
      total: 7,
      source: "fallback",
      warning: null,
    })).toBe("incomplete");
  });

  it("does not report success when a score failed to sync", () => {
    expect(classifySyncResult({
      success: true,
      added: 1,
      synced: 20,
      total: 21,
      source: "firecrawl",
      warning: null,
    })).toBe("incomplete");
  });

  it("does not call an empty response an up-to-date catalog", () => {
    expect(classifySyncResult({
      success: true,
      added: 0,
      synced: 0,
      total: 0,
      source: "firecrawl",
      warning: null,
    })).toBe("incomplete");
  });
});

describe("score sync cooldown", () => {
  it("matches the server's 15-minute refresh limit", () => {
    expect(SCORE_SYNC_COOLDOWN_MS).toBe(900_000);
  });

  it("uses the server Retry-After value and defaults to 15 minutes", () => {
    expect(getRetryAfterSeconds("45")).toBe(45);
    expect(getRetryAfterSeconds(null)).toBe(900);
    expect(getRetryAfterSeconds("invalid")).toBe(900);
  });
});