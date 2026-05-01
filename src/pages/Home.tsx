import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useRotatingQuotes } from "@/hooks/useRotatingQuotes";
import { useColorCycle } from "@/hooks/useColorCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Music, Heart, Sparkles, Users, BookOpen, Piano, Hand, RefreshCw, Mic, Quote } from "lucide-react";
import logo from "@/assets/bk-logo.png";

const swahiliQuotes = [
  { sw: "Bwana ni mchungaji wangu, sitapungukiwa na kitu.", en: "The Lord is my shepherd; I shall not want.", attr: "Zaburi 23" },
  { sw: "Mtumikieni Bwana kwa furaha; njoni mbele zake kwa kuimba.", en: "Serve the Lord with gladness; come before Him with singing.", attr: "Zaburi 100" },
  { sw: "Anayeimba, anasali mara mbili.", en: "He who sings, prays twice.", attr: "Mt. Augustino" },
  { sw: "Cantare amantis est — kuimba ni kwa yule anayependa.", en: "Singing belongs to the one who loves.", attr: "St. Augustine" },
];

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
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda monogram in gold with treble clef and musical staff"
                width={160}
                height={160}
                className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full object-cover ring-2 ring-primary/50 shadow-2xl mx-auto"
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
              Composer · Arranger · Sacred Music for the Catholic Church
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

        {/* Welcome — Karibu */}
        <Section delay={100}>
          <div className="glass-card mt-12 text-center max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <div className="flex justify-center mb-4 gap-2 items-center">
                <Hand size={28} className="text-accent" style={{ animation: "wave 2.4s ease-in-out infinite", transformOrigin: "70% 70%" }} />
                <Heart size={22} className="text-primary" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-body">Karibu sana · Welcome</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-5 leading-tight">
                Step in, sit a while, and let the <span className="text-primary">music speak</span>.
              </h2>

              <blockquote className="text-base sm:text-lg text-foreground/90 italic leading-relaxed mb-2 max-w-xl mx-auto">
                "Mtumikieni Bwana kwa furaha; njoni mbele zake kwa kuimba."
              </blockquote>
              <p className="text-xs text-accent mb-6 tracking-wide">
                Serve the Lord with gladness; come before Him with singing. — <span className="text-muted-foreground">Zaburi 100</span>
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                I'm <span className="text-foreground font-semibold">Boniface Kagunda</span> — a Kenyan composer
                writing music for parishes, choirs, soloists, and the kind of Sundays that don't make headlines but
                <span className="text-primary"> quiet the soul</span>. Every score on this site was written for someone, somewhere, who needed a song before they had words.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                You're welcome to listen, to download, to commission — and most of all, to pray.
              </p>

              <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/80 text-sm max-w-md mx-auto text-left mb-5">
                <Quote size={14} className="text-accent inline -mt-1 mr-1" />
                "Anayeimba, anasali mara mbili." — He who sings, prays twice.
                <span className="block text-[11px] text-muted-foreground not-italic mt-1">— Mt. Augustino</span>
              </blockquote>

              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                <RefreshCw size={10} className="text-primary" />
                New compositions appear here automatically every day
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
                  <Mic size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Solo Catholic Artists</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Custom songs in your voice & key</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Rotating Swahili wisdom */}
        <Section delay={150}>
          <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto">
            {swahiliQuotes.slice(0, 2).map((q) => (
              <div key={q.sw} className="glass-card text-center">
                <Quote size={16} className="text-primary mx-auto mb-3 opacity-60" />
                <p className="text-sm text-foreground italic leading-relaxed">"{q.sw}"</p>
                <p className="text-xs text-muted-foreground mt-2">{q.en}</p>
                <p className="text-[10px] uppercase tracking-widest text-accent mt-2">— {q.attr}</p>
              </div>
            ))}
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
