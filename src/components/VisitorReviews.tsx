import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, MessageSquareHeart, Send, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { visitorReviewSchema, type VisitorReviewInput } from "@/lib/review-validation";

type VisitorReview = VisitorReviewInput & { id: string; created_at: string };
type ReviewField = "name" | "rating" | "review";
type ReviewErrors = Partial<Record<ReviewField, string>>;

export default function VisitorReviews() {
  const [reviews, setReviews] = useState<VisitorReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState<ReviewErrors>({});

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,name,rating,review,created_at")
        .order("created_at", { ascending: false })
        .limit(12);

      if (!active) return;
      if (error) {
        toast.error("Reviews could not be loaded right now.");
      } else {
        setReviews(data ?? []);
      }
      setLoadingReviews(false);
    };

    void loadReviews();
    return () => {
      active = false;
    };
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = visitorReviewSchema.safeParse({ name, rating, review });
    if (!result.success) {
      const nextErrors: ReviewErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if ((field === "name" || field === "rating" || field === "review") && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    const { data, error } = await supabase
      .from("reviews")
      .insert(result.data)
      .select("id,name,rating,review,created_at")
      .single();
    setSubmitting(false);

    if (error) {
      toast.error("Your review could not be sent. Please try again.");
      return;
    }

    setReviews((current) => [data, ...current].slice(0, 12));
    setName("");
    setRating(0);
    setReview("");
    toast.success("Thank you for sharing your review.");
  };

  return (
    <section aria-labelledby="visitor-reviews-title" className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
            <MessageSquareHeart size={13} aria-hidden="true" /> Your voice matters
          </p>
          <h2 id="visitor-reviews-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
            Share your <span className="text-gradient">experience.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Have a song or score that stayed with you? Leave a note for the next visitor.
          </p>

          <form onSubmit={submitReview} className="mt-7 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="visitor-review-name">Your name</Label>
              <Input
                id="visitor-review-name"
                name="name"
                autoComplete="name"
                maxLength={60}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((current) => ({ ...current, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "visitor-review-name-error" : undefined}
                placeholder="How should we credit you?"
              />
              {errors.name && <p id="visitor-review-name-error" className="text-sm text-destructive" role="alert">{errors.name}</p>}
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Your rating</legend>
              <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="ghost"
                    size="icon"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    onClick={() => {
                      setRating(value);
                      setErrors((current) => ({ ...current, rating: undefined }));
                    }}
                    className="h-11 w-11"
                  >
                    <Star size={20} fill={value <= rating ? "currentColor" : "none"} className={value <= rating ? "text-accent" : "text-muted-foreground"} />
                  </Button>
                ))}
                <span className="sr-only">{rating ? `${rating} out of 5 stars selected` : "No rating selected"}</span>
              </div>
              {errors.rating && <p className="text-sm text-destructive" role="alert">{errors.rating}</p>}
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="visitor-review-text">Your review</Label>
              <Textarea
                id="visitor-review-text"
                name="review"
                rows={4}
                maxLength={1000}
                value={review}
                onChange={(event) => {
                  setReview(event.target.value);
                  setErrors((current) => ({ ...current, review: undefined }));
                }}
                aria-invalid={Boolean(errors.review)}
                aria-describedby={errors.review ? "visitor-review-text-error" : "visitor-review-count"}
                placeholder="What did the music mean to you?"
              />
              <div className="flex justify-between gap-3 text-xs text-muted-foreground">
                {errors.review ? <p id="visitor-review-text-error" className="text-destructive" role="alert">{errors.review}</p> : <span>10–1,000 characters</span>}
                <span id="visitor-review-count" className="shrink-0">{review.length}/1,000</span>
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
              {submitting ? "Sending…" : "Share your review"}
            </Button>
          </form>
        </div>

        <div aria-live="polite" aria-busy={loadingReviews}>
          <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 mb-5">
            <h3 className="font-display text-lg font-semibold">Visitor notes</h3>
            {!loadingReviews && <span className="text-xs text-muted-foreground">{reviews.length} recent {reviews.length === 1 ? "review" : "reviews"}</span>}
          </div>
          {loadingReviews ? (
            <p className="text-sm text-muted-foreground inline-flex items-center gap-2"><LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <div className="py-8 text-center sm:text-left">
              <MessageSquareHeart size={24} className="text-primary mb-3 mx-auto sm:mx-0" aria-hidden="true" />
              <p className="font-medium">Be the first to leave a review.</p>
              <p className="text-sm text-muted-foreground mt-1">Your words can help someone discover their next favorite song.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {reviews.map((item) => (
                <article key={item.id} className="py-5 first:pt-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-display font-semibold">{item.name}</p>
                    <div className="flex gap-0.5 text-accent" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < item.rating ? "currentColor" : "none"} aria-hidden="true" />)}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed mt-2 whitespace-pre-wrap">{item.review}</p>
                  <p className="text-xs text-muted-foreground mt-3 inline-flex items-center gap-1.5"><CheckCircle2 size={12} aria-hidden="true" /> {new Date(item.created_at).toLocaleDateString()}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}