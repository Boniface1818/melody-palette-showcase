import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ExternalLink, Calendar, Eye } from "lucide-react";

interface DailyScore {
  id: string;
  title: string;
  musescore_url: string;
  thumbnail_url: string | null;
  ensemble_type: string | null;
  story: string | null;
  views: number;
}

// Deterministic pick by day-of-year so it stays the same for everyone all day.
function dayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function ScoreOfTheDay() {
  const [score, setScore] = useState<DailyScore | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
    (async () => {
      const { data } = await supabase
        .from("scores")
        .select("id,title,musescore_url,thumbnail_url,ensemble_type,story,views")
        .order("created_at", { ascending: true });
      if (data && data.length) {
        const pick = data[dayIndex() % data.length];
        setScore(pick as DailyScore);
      }
    })();
  }, []);

  if (!score) return null;

  return (
    <a
      href={score.musescore_url}
      target="_blank"
      rel="noreferrer"
      className="glass-card glow-border block group relative overflow-hidden max-w-4xl mx-auto"
    >
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent/15 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-primary/15 blur-3xl pointer-events-none" aria-hidden />
      <div className="relative grid md:grid-cols-[180px_1fr] gap-6 items-center">
        {score.thumbnail_url && (
          <div className="relative rounded-xl overflow-hidden bg-secondary/40 aspect-[3/4] md:aspect-auto md:h-44">
            <img
              src={score.thumbnail_url}
              alt={`${score.title} sheet music thumbnail`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 text-accent text-[10px] uppercase tracking-[0.25em] mb-2">
            <Sparkles size={12} className="animate-pulse" />
            Score of the Day
            <span className="hidden sm:inline-flex items-center gap-1 text-muted-foreground normal-case tracking-normal text-[11px] ml-2">
              <Calendar size={10} /> {today}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2 leading-tight">{score.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {score.ensemble_type && (
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {score.ensemble_type}
              </span>
            )}
            {score.views > 0 && (
              <span className="text-[10px] inline-flex items-center gap-1 text-muted-foreground">
                <Eye size={11} /> {score.views.toLocaleString()} views
              </span>
            )}
          </div>
          {score.story && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
              {score.story}
            </p>
          )}
          <span className="color-shift text-sm font-medium inline-flex items-center gap-1.5">
            Listen today on MuseScore <ExternalLink size={13} />
          </span>
        </div>
      </div>
    </a>
  );
}
