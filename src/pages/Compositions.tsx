import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { supabase } from "@/integrations/supabase/client";
import {
  ExternalLink, Music, Loader2, Sparkles, Quote, Flame, Library, Search, ArrowUpDown,
  LayoutGrid, List, Shuffle, Eye, FileMusic, Users, Clock, X, Share2, Check,
} from "lucide-react";
import SyncScoresButton from "@/components/SyncScoresButton";

type SortKey = "newest" | "oldest" | "views" | "title" | "parts";
type ViewMode = "grid" | "list";

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
  story: string | null;
  mood: string | null;
  featured: boolean;
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
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

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

  const filtered = scores
    .filter((s) => active === "All" || s.ensemble_type === active)
    .filter((s) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        (s.instruments ?? "").toLowerCase().includes(q) ||
        (s.mood ?? "").toLowerCase().includes(q) ||
        (s.ensemble_type ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "oldest": return (a.published_date ?? "").localeCompare(b.published_date ?? "");
        case "views": return (b.views ?? 0) - (a.views ?? 0);
        case "title": return a.title.localeCompare(b.title);
        case "newest":
        default:
          return 0; // already newest-first from query
      }
    });
  const featured = scores.find((s) => s.featured) ?? scores[0];

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
          {/* Catalog meta + manual sync */}
          <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Library size={14} className="text-primary" />
              <span className="font-body tracking-wide">{scores.length} scores · auto-syncs daily</span>
            </div>
            <span className="hidden sm:block w-px h-5 bg-border" />
            <SyncScoresButton variant="ghost" label="Check for new scores" onSynced={fetchScores} />
          </div>
        </Section>

        {/* Featured Story of the Week */}
        {featured && (
          <Section delay={80}>
            <a
              href={featured.musescore_url}
              target="_blank"
              rel="noreferrer"
              className="glass-card glow-border block mt-12 grid md:grid-cols-[200px_1fr] gap-6 group"
            >
              {featured.thumbnail_url && (
                <div className="relative rounded-xl overflow-hidden bg-secondary/50">
                  <img
                    src={featured.thumbnail_url}
                    alt={`${featured.title} featured sheet music`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {featured.title?.toUpperCase().includes("MISA ANTHONY") && (
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 shadow-lg">
                      <Flame size={12} className="text-accent animate-pulse" />
                      <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/90 font-medium">In Memoriam</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-accent text-[10px] uppercase tracking-[0.2em] mb-3">
                  {featured.title?.toUpperCase().includes("MISA ANTHONY") ? (
                    <><Flame size={14} className="animate-pulse" /> A Dedication</>
                  ) : (
                    <><Sparkles size={14} /> Featured Story</>
                  )}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">{featured.title}</h2>
                {featured.story && (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex gap-2">
                    <Quote size={16} className="text-primary shrink-0 mt-1" />
                    <span>{featured.story}</span>
                  </p>
                )}
                <span className="color-shift text-sm font-medium inline-flex items-center gap-1.5 mt-4">
                  Listen on MuseScore
                  <ExternalLink size={13} />
                </span>
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

        {/* Search + Sort */}
        <Section delay={140}>
          <div className="mt-6 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, instrument, mood…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 text-sm font-body focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
              />
            </div>
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none pl-10 pr-8 py-3 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 text-sm font-body focus:outline-none focus:border-primary/60 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="views">Most viewed</option>
                <option value="title">Title (A–Z)</option>
              </select>
            </div>
          </div>
        </Section>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Section delay={200}>
            <p className="text-center text-muted-foreground mt-20">
              No compositions match your search. Try a different filter.
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
                    <div className="relative rounded-xl overflow-hidden mb-4 bg-secondary/50">
                      <img
                        src={score.thumbnail_url}
                        alt={`${score.title} sheet music preview`}
                        className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {score.title?.toUpperCase().includes("MISA ANTHONY") && (
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 shadow-lg">
                          <Flame size={11} className="text-accent animate-pulse" />
                          <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/90 font-medium">In Memoriam</span>
                        </div>
                      )}
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
                    <p className="text-xs text-muted-foreground mb-3">{score.instruments}</p>
                  )}

                  {score.mood && (
                    <span className="self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-primary/10 text-primary mb-2">
                      {score.mood}
                    </span>
                  )}

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
