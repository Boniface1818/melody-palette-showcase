import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Music, Loader2, Sparkles, Quote, Star, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Marketable narrative snippets — picked deterministically per score so each card tells a story.
const storyByEnsemble: Record<string, string[]> = {
  "Piano Duo": [
    "Two pianists, four hands, one shared breath — written for the intimacy of liturgy and the thrill of concert stages alike.",
    "A conversation between two players, where harmony becomes prayer and counterpoint becomes communion.",
  ],
  "String Duet": [
    "Bow meets bow in a dialogue carved from silence — ideal for weddings, vigils, and reflective moments of worship.",
    "Two strings, infinite warmth: a piece that lingers long after the final note fades.",
  ],
  "Mixed Quartet": [
    "Four distinct voices woven into one tapestry — full-bodied sound designed to fill sanctuaries and lift congregations.",
    "Crafted for choirs that crave both depth and clarity, this piece balances rich harmony with singable lines.",
  ],
  "Mixed Trio": [
    "A nimble trio setting — perfect for small ensembles seeking polished, performance-ready repertoire.",
    "Three voices, intricately interlocked, written to shine in chapels, recitals, and recording sessions.",
  ],
  default: [
    "A composition shaped by years of liturgical service — written to be sung, played, and prayed.",
    "Music born from devotion, refined for performance, and shared freely with the choirs who need it.",
  ],
};

const storyFor = (score: Score) => {
  const pool = storyByEnsemble[score.ensemble_type ?? ""] ?? storyByEnsemble.default;
  // Stable index from musescore_id so the blurb never changes between renders
  const seed = (score.musescore_id || score.id).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
};

interface Score {
  id: string;
  title: string;
  musescore_id: string;
  musescore_url: string;
  thumbnail_url: string | null;
  ensemble_type: string | null;
  instruments: string | null;
  parts: number;
  pages: number;
  duration: string | null;
  views: number;
  published_date: string | null;
}

const compositionSubtitles = [
  "Sacred music crafted with devotion and precision.",
  "From piano duos to full mass settings — explore the catalog.",
  "Each composition serves a purpose, a moment, a prayer.",
  "Music that unites voices and glorifies God.",
];

type Filter = "All" | "Piano Duo" | "String Duet" | "Mixed Quartet" | "Mixed Trio";
const filters: Filter[] = ["All", "Piano Duo", "String Duet", "Mixed Quartet", "Mixed Trio"];

export default function Compositions() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Compositions", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(compositionSubtitles, 8000);

  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Filter>("All");

  const fetchScores = async () => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setScores(data as Score[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const filtered = active === "All" ? scores : scores.filter((s) => s.ensemble_type === active);
  const featured = scores[0]; // newest by created_at
  const totalViews = scores.reduce((sum, s) => sum + (s.views || 0), 0);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mt-12"
            style={{ color: headingColor, transition: "color 1.5s ease" }}
          >
            {heading.revealed}
            {!heading.done && <span className="typing-cursor" />}
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>


        {/* The Story Behind the Catalog */}
        <Section delay={80}>
          <div className="glass-card mt-10 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Quote size={18} className="text-accent" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">The Story</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-3 leading-snug">
                A catalog built one prayer at a time.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Every score in this collection began the same way — at a piano, late at night, with a melody that
                refused to leave. Some were written for a specific liturgy. Others arrived as gifts for choirs
                searching for something <span className="text-foreground">honest, singable, and unmistakably sacred</span>.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What you'll find here is a living catalog: piano duos, string duets, mixed quartets, and full
                arrangements — each one engraved with care, free to download, and ready for your next service or recital.
              </p>
              {scores.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border/50">
                  <div className="text-center">
                    <p className="font-display text-lg font-bold text-primary tabular-nums">{scores.length}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Scores</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-lg font-bold text-accent tabular-nums">
                      {new Set(scores.map((s) => s.ensemble_type).filter(Boolean)).size}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Ensembles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-lg font-bold text-primary tabular-nums">{totalViews}+</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Listens</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Featured Composition spotlight (newest) */}
        {featured && (
          <Section delay={140}>
            <a
              href={featured.musescore_url}
              target="_blank"
              rel="noreferrer"
              className="glass-card glow-border mt-8 max-w-4xl mx-auto block group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30">
                <Star size={11} className="text-accent fill-accent" />
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Featured · Newest</span>
              </div>
              <div className="grid md:grid-cols-[200px,1fr] gap-6 items-center">
                {featured.thumbnail_url ? (
                  <div className="rounded-xl overflow-hidden bg-secondary/50">
                    <img
                      src={featured.thumbnail_url}
                      alt={`${featured.title} — featured composition preview`}
                      className="w-full h-44 md:h-48 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl bg-secondary/50 h-44 md:h-48 flex items-center justify-center">
                    <Music size={48} className="text-primary/50" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Latest release</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {storyFor(featured)}
                  </p>
                  <span className="color-shift text-sm font-medium inline-flex items-center gap-1.5">
                    Listen & download free
                    <ExternalLink size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          </Section>
        )}

        {/* Filter pills */}
        <Section delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-300 active:scale-95 ${
                  active === f
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Section>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Section delay={200}>
            <p className="text-center text-muted-foreground mt-20">
              No compositions yet. The catalog auto-updates daily.
            </p>
          </Section>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filtered.map((score, i) => (
              <Section key={score.id} delay={i * 80}>
                <a
                  href={score.musescore_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card glow-border h-full flex flex-col group block"
                >
                  {/* Thumbnail */}
                  {score.thumbnail_url && (
                    <div className="rounded-xl overflow-hidden mb-4 bg-secondary/50">
                      <img
                        src={score.thumbnail_url}
                        alt={`${score.title} sheet music preview`}
                        className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <Music size={20} className="text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                    {score.ensemble_type && (
                      <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                        {score.ensemble_type}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-base mb-2">{score.title}</h3>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mt-1 mb-3">
                    {score.parts > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                        {score.parts} parts
                      </span>
                    )}
                    {score.pages > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                        {score.pages} pages
                      </span>
                    )}
                    {score.duration && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                        {score.duration}
                      </span>
                    )}
                    {score.views > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                        {score.views} views
                      </span>
                    )}
                  </div>

                  {score.instruments && (
                    <p className="text-xs text-muted-foreground mb-2">{score.instruments}</p>
                  )}

                  {/* Story blurb — gives each score a marketable narrative */}
                  <p className="text-xs text-muted-foreground/90 italic leading-relaxed mb-3 border-l-2 border-accent/40 pl-3">
                    {storyFor(score)}
                  </p>

                  <div className="mt-auto pt-2">
                    <span className="color-shift text-sm font-medium inline-flex items-center gap-1.5 group/link">
                      Listen on MuseScore
                      <ExternalLink size={13} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </Section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
