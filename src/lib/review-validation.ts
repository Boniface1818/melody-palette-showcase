import { z } from "zod";

export const visitorReviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(60, "Name must be 60 characters or fewer."),
  rating: z.number().int().min(1, "Choose a star rating.").max(5, "Rating cannot exceed 5 stars."),
  review: z.string().trim().min(10, "Please write at least 10 characters.").max(1000, "Review must be 1,000 characters or fewer."),
});

export type VisitorReviewInput = z.infer<typeof visitorReviewSchema>;