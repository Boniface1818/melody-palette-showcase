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

        {/* Filter pills + sync button */}
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
                    <p className="text-xs text-muted-foreground mb-3">{score.instruments}</p>
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
