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
  ChevronLeft, ChevronRight, Download, History, Trophy, Printer,
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

const FAV_KEY = "bk_favorites";
const RECENT_KEY = "bk_recent";
const RECENT_MAX = 6;

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
  const [view, setView] = useState<ViewMode>("grid");
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<Score | null>(null);
  const [shared, setShared] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

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
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavorites(new Set(JSON.parse(raw)));
      const r = localStorage.getItem(RECENT_KEY);
      if (r) setRecent(JSON.parse(r));
    } catch {}
  }, []);

  // Keyboard "/" to focus search, "Esc" to close preview
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(FAV_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const handleShare = async (e: React.MouseEvent, score: Score) => {
    e.preventDefault();
    e.stopPropagation();
    const url = score.musescore_url;
    try {
      if (navigator.share) {
        await navigator.share({ title: score.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(score.id);
        setTimeout(() => setShared(null), 1500);
      }
    } catch {}
  };

  const filtered = useMemo(() => scores
    .filter((s) => active === "All" || s.ensemble_type === active)
    .filter((s) => !favOnly || favorites.has(s.id))
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
        case "parts": return (b.parts ?? 0) - (a.parts ?? 0);
        case "newest":
        default: return 0;
      }
    }), [scores, active, favOnly, favorites, query, sort]);

  const featured = scores.find((s) => s.featured) ?? scores[0];

  // Aggregate stats
  const stats = useMemo(() => {
    const totalViews = scores.reduce((sum, s) => sum + (s.views ?? 0), 0);
    const totalParts = scores.reduce((sum, s) => sum + (s.parts ?? 0), 0);
    const totalPages = scores.reduce((sum, s) => sum + (s.pages ?? 0), 0);
    return { totalViews, totalParts, totalPages };
  }, [scores]);

  const surpriseMe = () => {
    if (!filtered.length) return;
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    setPreview(pick);
  };

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

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

          {/* Stats dashboard */}
          {!loading && scores.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {[
                { icon: FileMusic, label: "Scores", value: scores.length },
                { icon: Eye, label: "Total Views", value: formatNum(stats.totalViews) },
                { icon: Users, label: "Parts Written", value: stats.totalParts },
                { icon: Clock, label: "Pages", value: stats.totalPages },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card !p-4 text-center">
                  <Icon size={16} className="mx-auto text-primary mb-1.5" />
                  <div className="font-display text-xl font-semibold">{value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Catalog meta + manual sync */}
          <div className="mt-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Library size={14} className="text-primary" />
              <span className="font-body tracking-wide">Auto-syncs daily from MuseScore</span>
            </div>
            <span className="hidden sm:block w-px h-5 bg-border" />
            <SyncScoresButton variant="ghost" label="Check for new scores" onSynced={fetchScores} />
          </div>
        </Section>

        {/* Featured Story */}
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
            <button
              onClick={() => setFavOnly((v) => !v)}
              className={`px-5 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-300 active:scale-95 inline-flex items-center gap-1.5 ${
                favOnly
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
              aria-pressed={favOnly}
            >
              ♥ Favorites {favorites.size > 0 && `(${favorites.size})`}
            </button>
          </div>
        </Section>

        {/* Search + Sort + view toggles */}
        <Section delay={140}>
          <div className="mt-6 max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by title, instrument, mood…  (press / )"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 text-sm font-body focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none pl-10 pr-8 py-3 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 text-sm font-body focus:outline-none focus:border-primary/60 cursor-pointer w-full"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="views">Most viewed</option>
                <option value="title">Title (A–Z)</option>
                <option value="parts">Most parts</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={surpriseMe}
                className="px-4 py-3 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 text-xs font-body inline-flex items-center gap-2 hover:border-accent/60 hover:text-accent transition active:scale-95"
                aria-label="Surprise me with a random score"
                title="Random score"
              >
                <Shuffle size={14} /> Surprise me
              </button>
              <div className="flex rounded-full bg-background/40 backdrop-blur-sm border border-border/50 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-full transition ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid view"
                ><LayoutGrid size={14} /></button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-full transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="List view"
                ><List size={14} /></button>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-3">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> of {scores.length}
          </p>
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
          <div className={view === "grid"
            ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            : "flex flex-col gap-4 mt-12 max-w-4xl mx-auto"}>
            {filtered.map((score, i) => {
              const isFav = favorites.has(score.id);
              const isList = view === "list";
              return (
                <Section key={score.id} delay={Math.min(i * 60, 400)}>
                  <div
                    className={`glass-card glow-border h-full flex group cursor-pointer ${isList ? "flex-row gap-4 items-center !p-4" : "flex-col"}`}
                    onClick={() => setPreview(score)}
                  >
                    {score.thumbnail_url && (
                      <div className={`relative rounded-xl overflow-hidden bg-secondary/50 ${isList ? "w-28 h-28 shrink-0" : "mb-4"}`}>
                        <img
                          src={score.thumbnail_url}
                          alt={`${score.title} sheet music preview`}
                          className={`w-full ${isList ? "h-28" : "h-48"} object-cover object-top transition-transform duration-500 group-hover:scale-105`}
                          loading="lazy"
                        />
                        {score.title?.toUpperCase().includes("MISA ANTHONY") && !isList && (
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 shadow-lg">
                            <Flame size={11} className="text-accent animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/90 font-medium">In Memoriam</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <Music size={20} className="text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                        <div className="flex items-center gap-2">
                          {score.ensemble_type && (
                            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                              {score.ensemble_type}
                            </span>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(score.id); }}
                            className={`p-1.5 rounded-full transition ${isFav ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                          >
                            <span className="text-base leading-none">{isFav ? "♥" : "♡"}</span>
                          </button>
                          <button
                            onClick={(e) => handleShare(e, score)}
                            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition"
                            aria-label="Share score"
                            title="Copy link"
                          >
                            {shared === score.id ? <Check size={14} className="text-primary" /> : <Share2 size={14} />}
                          </button>
                        </div>
                      </div>

                      <h3 className="font-display font-semibold text-base mb-2">{score.title}</h3>

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
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground inline-flex items-center gap-1">
                            <Eye size={10} /> {formatNum(score.views)}
                          </span>
                        )}
                      </div>

                      {score.instruments && !isList && (
                        <p className="text-xs text-muted-foreground mb-3">{score.instruments}</p>
                      )}

                      {score.mood && (
                        <span className="self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-primary/10 text-primary mb-2">
                          {score.mood}
                        </span>
                      )}

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="color-shift text-xs font-medium inline-flex items-center gap-1.5">
                          Quick preview
                        </span>
                        <a
                          href={score.musescore_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-medium inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition"
                        >
                          MuseScore <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Section>
              );
            })}
          </div>
        )}
      </main>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl glass-card !p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/70 hover:bg-background border border-border/50 transition"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
            <div className="aspect-video bg-secondary">
              <iframe
                src={`https://musescore.com/user/108485503/scores/${preview.musescore_id}/embed`}
                title={preview.title}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">{preview.title}</h3>
              {preview.instruments && (
                <p className="text-sm text-muted-foreground mb-3">{preview.instruments}</p>
              )}
              {preview.story && (
                <p className="text-sm text-muted-foreground leading-relaxed flex gap-2 mb-4">
                  <Quote size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{preview.story}</span>
                </p>
              )}
              <a
                href={preview.musescore_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Open on MuseScore <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
