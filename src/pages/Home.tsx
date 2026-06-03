import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useRotatingQuotes } from "@/hooks/useRotatingQuotes";
import { useColorCycle } from "@/hooks/useColorCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Music, Sparkles, Users, BookOpen, Piano, Quote, Feather, Headphones, Mail, MessageCircle, Pen, Mic2, Send, Star, ShieldCheck, Globe, Heart, Clock3 } from "lucide-react";
import logo from "@/assets/bk-logo.png";
import ScoreOfTheDay from "@/components/ScoreOfTheDay";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Boniface Kagunda",
  jobTitle: "Composer & Arranger",
  description: "Kenyan composer of sacred Catholic music — Mass settings, psalms, SATB arrangements, and bespoke songs for cantors and soloists.",
  url: "https://bk-melodies.lovable.app/",
  image: "https://bk-melodies.lovable.app/bk-logo.png",
  nationality: "Kenyan",
  sameAs: [
    "https://musescore.com/user/108485503",
    "https://www.linkedin.com/in/BonifaceKagunda",
    "https://www.instagram.com/bonifacekagunda39/",
    "https://www.facebook.com/profile.php?id=61550230027573",
    "https://www.youtube.com/@BonifaceKagunda006",
  ],
};

const journey = [
  { icon: MessageCircle, title: "Tell the story", text: "Share the moment, the voice, and the prayer the piece must carry." },
  { icon: Pen, title: "I sketch it", text: "A melody first — then voicings, harmony, and a draft sent for your ear." },
  { icon: Mic2, title: "We shape it", text: "Refine key, lyrics, and dynamics together until it sings the way you imagined." },
  { icon: Send, title: "You receive it", text: "Engraved PDF score, MIDI, MP3 mock-up, backing track and guide vocal — delivered to keep." },
];

const verses = [
  { line: "A song is a feeling that finally learned how to breathe.", attr: "Studio note" },
  { line: "Write the melody people will remember at the kitchen sink, not just at the altar.", attr: "Pinned above the desk" },
  { line: "The best harmony is the one no singer has to fight.", attr: "Rehearsal lesson" },
  { line: "Every commission is a small, private miracle waiting to be notated.", attr: "Letter to a friend" },
];


const trustChips = [
  { Icon: ShieldCheck, label: "Two free revisions" },
  { Icon: Globe, label: "Worldwide delivery" },
  { Icon: Clock3, label: "Reply in 24h" },
  { Icon: Heart, label: "Built for real choirs" },
];

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);
  const heading = useTextReveal("Boniface Kagunda", 70, 300, true, 60000);
  const [quote1Text, quote2Text] = useRotatingQuotes(12000);
  const headingColor = useColorCycle(3000);

  return (
    <>
      <SEO
        title="Boniface Kagunda — Sacred Music Composer & Arranger"
        description="Kenyan composer Boniface Kagunda writes sacred music for the Catholic Church — Mass settings, psalms, SATB arrangements, and bespoke songs for cantors and soloists."
        path="/"
        type="profile"
        jsonLd={personJsonLd}
      />
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
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda monogram in gold with treble clef and musical staff"
                width={160}
                height={160}
                fetchPriority="high"
                decoding="async"
                className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full object-cover ring-2 ring-primary/50 shadow-2xl mx-auto"
              />
            </div>

            {/* Tagline directly under the logo */}
            <p className="font-display italic text-lg sm:text-2xl text-gradient tracking-wide mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              Elegance In Every Note
              <span className="h-px w-8 bg-accent/50" />
            </p>

            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              Composer · Arranger · Storyteller in Sound
            </p>
          </Section>

          <Section delay={100}>
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] cursor-default relative inline-block shine"
              style={{ textWrap: "balance" as any }}
            >
              <span className="text-gradient">{heading.revealed}</span>
              {!heading.done && <span className="typing-cursor" />}
              <span className="sr-only"> — Sacred Music Composer & Arranger</span>
              {heading.done && (
                <span
                  className="absolute -bottom-2 left-0 w-full h-1 rounded-full opacity-70"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                />
              )}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-body">
              Sacred Music Composer &amp; Arranger
            </p>
          </Section>

          <Section delay={200}>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/90 font-body min-h-[2em]">
              <span className="text-gradient font-semibold">{typedText}</span>
              <span className="typing-cursor" />
            </p>
          </Section>

          <Section delay={350}>
            <p className="mt-8 max-w-lg text-sm text-muted-foreground leading-relaxed mx-auto transition-opacity duration-700" style={{ textWrap: "pretty" as any }}>
              {quote1Text}
            </p>
          </Section>
          <Section delay={450}>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground/80 leading-relaxed mx-auto italic transition-opacity duration-700" style={{ textWrap: "pretty" as any }}>
              {quote2Text}
            </p>
          </Section>

          <Section delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/compositions" className="btn-primary shine group hover-scale">
                Listen to the Catalog
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-primary shine group hover-scale"
                style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}
              >
                <Mail size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Commission Your Song
              </Link>
            </div>
            {/* Trust chips */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
              {trustChips.map(({ Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <Icon size={12} className="text-accent" /> {label}
                </li>
              ))}
            </ul>
          </Section>
        </section>

        {/* Welcome — refreshed copy */}
        <Section delay={100}>
          <div className="relative mt-16 max-w-5xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl pointer-events-none" aria-hidden />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 p-8 sm:p-12 rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md aurora shine">
              <div className="hidden md:flex flex-col items-center gap-3">
                <Feather size={26} className="text-primary" />
                <div className="w-px flex-1 bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
                <Headphones size={20} className="text-accent" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-body">
                  Welcome · Step into the studio
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] mb-5">
                  I write the <span className="text-gradient">songs</span> people sing
                  <br className="hidden sm:block" />
                  on the most important <span className="text-gradient">days of their lives</span>.
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  I'm <span className="text-foreground font-semibold">Boniface Kagunda</span> — a composer who treats
                  every brief like a love letter someone has been waiting their whole life to receive. Tell me the
                  moment — a graduation, a wedding, a goodbye, a thanksgiving — and I'll send back a finished score,
                  in your key, in your language, ready to sing the first time you open it.
                </p>

                <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/85 text-sm mb-3">
                  <Quote size={14} className="inline text-accent mr-1 -mt-1" />
                  "A song doesn't belong to the composer. It belongs to the moment it was written for — and to the person who sings it next."
                </blockquote>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Browse the catalog, listen with headphones on, and when your moment is ready —
                  <span className="text-foreground"> the pen is warm</span>.
                </p>

                <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  New scores published weekly · Catalog auto-syncs from MuseScore
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Verses — refreshed quartet */}
        <Section delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-6xl mx-auto">
            {verses.map((q) => (
              <div key={q.line} className="glass-card shine text-center hover:-translate-y-1 transition-transform duration-500">
                <Quote size={16} className="text-primary mx-auto mb-3 opacity-60" />
                <p className="text-sm text-foreground italic leading-relaxed">"{q.line}"</p>
                <p className="text-[10px] uppercase tracking-widest text-accent mt-3">— {q.attr}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <Section delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Compositions", value: "7+", Icon: Music },
              { label: "Ensemble Types", value: "4", Icon: Users },
              { label: "Total Views", value: "100+", Icon: BookOpen },
              { label: "Instruments", value: "5+", Icon: Piano },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center group cursor-default py-8 hover-scale" style={{ transitionDelay: `${i * 80}ms` }}>
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
            className="glass-card glow-border shine flex items-center gap-4 group mt-8 max-w-lg mx-auto"
          >
            <Music size={32} className="text-primary transition-colors duration-300 group-hover:text-accent" />
            <div>
              <p className="font-display font-semibold text-sm">Listen on MuseScore</p>
              <p className="text-xs text-muted-foreground">Stream every score, follow new releases, download sheet music</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </a>
        </Section>

        {/* Score of the Day */}
        <Section delay={320}>
          <div className="mt-16">
            <ScoreOfTheDay />
          </div>
        </Section>

        {/* Testimonials — real songs, real people */}
        <Section delay={330}>
          <div className="mt-20">
            <Testimonials />
          </div>
        </Section>

        {/* Commission Journey Timeline */}
        <Section delay={340}>
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Feather size={12} /> Path of a Commission
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                From <span className="text-gradient">first whisper</span> to finished score.
              </h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {journey.map((step, i) => (
                <li key={step.title} className="glass-card shine relative group hover:-translate-y-1 transition-transform duration-500">
                  <span className="absolute -top-3 -left-3 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold flex items-center justify-center shadow-lg">
                    {i + 1}
                  </span>
                  <step.icon size={20} className="text-accent mb-3" />
                  <h3 className="font-display font-semibold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="text-center mt-6">
              <Link to="/contact" className="btn-primary shine inline-flex">
                <Mail size={14} /> Begin Your Commission
              </Link>
            </div>
          </div>
        </Section>

        {/* Closing invitation strip */}
        <Section delay={350}>
          <div className="mt-12 max-w-4xl mx-auto text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              <Sparkles size={12} className="inline mr-1" /> Your song is somewhere on this desk
            </p>
            <p className="text-base sm:text-lg text-foreground/85 font-display italic">
              "Bring the prayer; I'll bring the harmony — and together we'll send it singing."
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
