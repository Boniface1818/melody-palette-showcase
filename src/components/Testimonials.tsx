import { Heart, Music2, Quote, Sparkles, Star } from "lucide-react";

export interface Testimonial {
  name: string;
  role: string;
  song?: string;
  occasion?: string;
  text: string;
  emoji?: string;
}

export const featuredTestimonials: Testimonial[] = [
  {
    name: "Cynthia",
    role: "Soloist · Nairobi",
    song: "Asante",
    occasion: "A song of thanksgiving",
    text:
      "Boniface wrote 'Asante' for me to thank God for His many blessings. The first time I sang it, I cried before I reached the chorus — it felt like my own prayer had finally found its melody. I feel truly blessed.",
    emoji: "🙏",
  },
  {
    name: "Kinani",
    role: "Graduate · Campus celebration",
    song: "Heko",
    occasion: "Graduation tribute",
    text:
      "When I graduated, Boniface surprised me with 'Heko' — a song crafted just to celebrate me. Every line carried my journey. Years of late nights, prayers and small victories were lifted into one beautiful song. I feel blessed beyond words.",
    emoji: "🎓",
  },
  {
    name: "Sr. Mary",
    role: "Choir Director · Parish in Nairobi",
    text:
      "Boniface writes for the choir we actually have, not the one we wish we had. The pieces stick after one rehearsal — and the assembly sings along by the second Sunday.",
  },
  {
    name: "Fr. James",
    role: "Liturgy Team · Western Kenya",
    text:
      "The psalm setting he wrote for our ordination is now the one the cantor reaches for first. Singable, dignified, and unmistakably prayerful.",
  },
  {
    name: "Esther",
    role: "Catholic Recording Artist",
    text:
      "He pitched the song in my key, sent a guide vocal and a backing track. I learned it in a weekend. The best gift anyone has ever given to my voice.",
  },
];

interface Props {
  heading?: string;
  eyebrow?: string;
  items?: Testimonial[];
  compact?: boolean;
}

export default function Testimonials({
  heading,
  eyebrow,
  items = featuredTestimonials,
  compact = false,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
          <Heart size={12} /> {eyebrow ?? "Songs that found their people"}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
          {heading ?? (
            <>
              Real voices. <span className="text-gradient">Real blessings.</span>
            </>
          )}
        </h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
          Stories from singers and soloists I've written for — moments where a song became a prayer, a thank-you, or a celebration.
        </p>
      </div>

      <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {items.map((t, i) => (
          <figure
            key={t.name + i}
            className="premium-card shine relative flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} fill="currentColor" />
                ))}
              </div>
              {t.emoji && <span className="text-lg" aria-hidden>{t.emoji}</span>}
            </div>

            {t.song && (
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Music2 size={12} className="text-primary" />
                <span className="text-[11px] font-display font-semibold tracking-wide text-primary">
                  "{t.song}"
                </span>
                {t.occasion && (
                  <span className="text-[10px] text-muted-foreground">· {t.occasion}</span>
                )}
              </div>
            )}

            <blockquote className="text-sm text-foreground/90 leading-relaxed italic relative">
              <Quote size={14} className="text-primary/50 inline mr-1 -mt-1" />
              {t.text}
            </blockquote>

            <figcaption className="mt-auto pt-2 border-t border-border/40">
              <p className="font-display font-semibold text-sm">{t.name}</p>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
          <Sparkles size={12} className="text-accent" />
          Your story could be the next one written into a song.
        </p>
      </div>
    </div>
  );
}
