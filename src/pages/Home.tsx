import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useRotatingQuotes } from "@/hooks/useRotatingQuotes";
import { useColorCycle } from "@/hooks/useColorCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Music, Heart, Sparkles, Users, BookOpen, Piano, Hand, RefreshCw } from "lucide-react";
import logo from "@/assets/bk-logo.png";

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);
  const heading = useTextReveal("Boniface Kagunda", 70, 300, true, 60000);
  const [quote1Text, quote2Text] = useRotatingQuotes(12000);
  const headingColor = useColorCycle(3000);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center text-center relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-primary/30 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-accent/25 animate-pulse" style={{ animationDelay: "3s" }} />
          </div>

          <Section>
            <div className="relative mb-8 inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda monogram in gold with treble clef and musical staff"
                width={140}
                height={140}
                className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover ring-2 ring-primary/40 shadow-2xl mx-auto"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-body">
                Catalog auto-updates daily
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              Composer · Arranger · Musician
            </p>
          </Section>
          <Section delay={100}>
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] cursor-default relative"
              style={{ textWrap: "balance" as any, color: headingColor, transition: "color 1.5s ease" }}
            >
              {heading.revealed}
              {!heading.done && <span className="typing-cursor" />}
              {heading.done && (
                <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full opacity-60" style={{ background: `linear-gradient(90deg, ${headingColor}, hsl(36, 90%, 54%))`, transition: "background 1.5s ease" }} />
              )}
            </h1>
          </Section>
          <Section delay={200}>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-muted-foreground font-body">
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </p>
          </Section>
          <Section delay={350}>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed mx-auto transition-opacity duration-700" style={{ textWrap: "pretty" as any }}>
              {quote1Text}
            </p>
          </Section>
          <Section delay={450}>
            <p className="mt-4 max-w-md text-sm text-muted-foreground/80 leading-relaxed mx-auto italic transition-opacity duration-700" style={{ textWrap: "pretty" as any }}>
              {quote2Text}
            </p>
          </Section>
          <Section delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/compositions" className="btn-primary group">
                Explore My Music
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-primary"
                style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}
              >
                Commission a Piece
              </Link>
            </div>
          </Section>
        </section>

        {/* Welcome */}
        <Section delay={100}>
          <div className="glass-card mt-12 text-center max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <div className="flex justify-center mb-4 gap-2 items-center">
                <Hand size={26} className="text-accent" style={{ animation: "wave 2.4s ease-in-out infinite", transformOrigin: "70% 70%" }} />
                <Heart size={22} className="text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                Karibu — Welcome, Friend.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                I'm <span className="text-foreground font-semibold">Boniface Kagunda</span> — a composer and arranger
                shaping music that <span className="text-primary">serves worship</span>, <span className="text-accent">unites voices</span>,
                and glorifies God.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                From intimate piano duos to full mass settings, every piece is crafted with devotion,
                precision, and a deep love for sacred music. Make yourself at home.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                <RefreshCw size={10} className="text-primary" />
                New compositions appear here automatically
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors">
                  <Music size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Original Compositions</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Sacred & liturgical works</p>
                </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Sparkles size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-xs font-semibold text-foreground">Multi-Part Arrangements</p>
                <p className="text-[11px] text-muted-foreground mt-1">SATB, duets, quartets & more</p>
              </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <Users size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Available for Commission</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Custom pieces for your choir</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Stats */}
        <Section delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Compositions", value: "7+", Icon: Music },
              { label: "Ensemble Types", value: "4", Icon: Users },
              { label: "Total Views", value: "100+", Icon: BookOpen },
              { label: "Instruments", value: "5+", Icon: Piano },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center group cursor-default py-8" style={{ transitionDelay: `${i * 80}ms` }}>
                <s.Icon size={24} className="mx-auto mb-3 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                <p className="text-2xl font-display font-bold text-foreground tabular-nums">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Quick Link */}
        <Section delay={300}>
          <a
            href="https://musescore.com/user/108485503"
            target="_blank"
            rel="noreferrer"
            className="glass-card glow-border flex items-center gap-4 group mt-8 max-w-lg mx-auto"
          >
            <Music size={32} className="text-primary transition-colors duration-300 group-hover:text-accent" />
            <div>
              <p className="font-display font-semibold text-sm">Listen on MuseScore</p>
              <p className="text-xs text-muted-foreground">Browse all compositions, listen, and download sheet music</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </a>
        </Section>
      </main>
      <Footer />
    </>
  );
}
