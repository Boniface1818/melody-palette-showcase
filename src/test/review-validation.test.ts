import { describe, expect, it } from "vitest";
import { visitorReviewSchema } from "@/lib/review-validation";

describe("visitor review validation", () => {
  it("accepts a 2-character name, a 1-star rating, and a 10-character review", () => {
    expect(visitorReviewSchema.safeParse({ name: "Jo", rating: 1, review: "Lovely song" }).success).toBe(true);
  });

  it("rejects names shorter than 2 characters", () => {
    expect(visitorReviewSchema.safeParse({ name: "J", rating: 5, review: "A lovely song." }).success).toBe(false);
  });

  it("rejects names longer than 60 characters", () => {
    expect(visitorReviewSchema.safeParse({ name: "N".repeat(61), rating: 5, review: "A lovely song." }).success).toBe(false);
  });

  it("accepts ratings from 1 through 5 and rejects values outside that range", () => {
    for (const rating of [1, 5]) {
      expect(visitorReviewSchema.safeParse({ name: "Jo", rating, review: "A lovely song." }).success).toBe(true);
    }
    for (const rating of [0, 6]) {
      expect(visitorReviewSchema.safeParse({ name: "Jo", rating, review: "A lovely song." }).success).toBe(false);
    }
  });

  it("rejects reviews shorter than 10 characters", () => {
    expect(visitorReviewSchema.safeParse({ name: "Jo", rating: 5, review: "Nice song" }).success).toBe(false);
  });

  it("rejects reviews longer than 1,000 characters", () => {
    expect(visitorReviewSchema.safeParse({ name: "Jo", rating: 5, review: "R".repeat(1001) }).success).toBe(false);
  });

  it("trims whitespace before validation and submission", () => {
    expect(visitorReviewSchema.parse({ name: "  Jo  ", rating: 5, review: "  A lovely song.  " })).toEqual({
      name: "Jo",
      rating: 5,
      review: "A lovely song.",
    });
  });
});