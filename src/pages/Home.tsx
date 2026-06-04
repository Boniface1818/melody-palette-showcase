import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, Music, Sparkles, Mail, Headphones, Feather,
  Compass, Layers, Sun, Moon, Star, Quote, PlayCircle, Disc3,
} from "lucide-react";
import logo from "@/assets/bk-logo.png";
import ScoreOfTheDay from "@/components/ScoreOfTheDay";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Boniface Kagunda",
  jobTitle: "Composer & Arranger",
  description:
    "Kenyan composer writing original songs and sacred scores — Mass settings, psalms, SATB arrangements, and bespoke pieces for cantors, choirs and soloists.",
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

const pillars = [
  {
    icon: Compass,
    title: "Direction",
    text: "Every score begins with a single question — what should the listener feel at the final bar? Everything I write points there.",
  },
  {
    icon: Layers,
    title: "Texture",
    text: "Voicings, instrumentation and silence — layered so the singer rises, never strains, and the assembly answers without thinking.",
  },
  {
    icon: Sun,
    title: "Daylight",
    text: "Bright, singable melodies that survive a parish hall, a wedding tent, a small chapel and a borrowed keyboard.",
  },
  {
    icon: Moon,
    title: "Stillness",
    text: "Some songs are written to be whispered. I leave room for those, too — for adoration, for grief, for late prayers.",
  },
];

const catalogStats = [
  { value: "12+", label: "Live scores" },
  { value: "4", label: "Ensemble types" },
  { value: "100+", label: "Plays on MuseScore" },
  { value: "24h", label: "Reply window" },
];

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);
  const heading = useTextReveal("Boniface Kagunda", 70, 300, true, 60000);

  return (
    <>
      <SEO
        title="Boniface Kagunda — Composer, Arranger & Songwriter"
        description="Original songs and sacred scores from Kenyan composer Boniface Kagunda. Bespoke pieces for soloists, cantors, choirs and parishes — delivered worldwide."
        path="/"
        type="profile"
        jsonLd={personJsonLd}
      />
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center text-center relative">
          <Section>
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda monogram"
                width={160}
                height={160}
                fetchPriority="high"
                decoding="async"
                className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full object-cover ring-2 ring-primary/50 shadow-2xl mx-auto"
              />
            </div>

            <p className="font-display italic text-lg sm:text-2xl text-gradient tracking-wide mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              Elegance In Every Note
              <span className="h-px w-8 bg-accent/50" />
            </p>

            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              Composer · Arranger · Songwriter
            </p>
          </Section>

          <Section delay={100}>
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] cursor-default relative inline-block shine"
              style={{ textWrap: "balance" as any }}
            >
              <span className="text-gradient">{heading.revealed}</span>
              {!heading.done && <span className="typing-cursor" />}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-body">
              Songs written for the people who will sing them.
            </p>
          </Section>

          <Section delay={200}>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/90 font-body min-h-[2em]">
              <span className="text-gradient font-semibold">{typedText}</span>
              <span className="typing-cursor" />
            </p>
          </Section>

          <Section delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/compositions" className="btn-primary shine group hover-scale">
                <PlayCircle size={16} />
                Open the Catalog
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-primary shine group hover-scale"
                style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}
              >
                <Mail size={14} />
                Commission a Song
              </Link>
            </div>
          </Section>
        </section>

        {/* Studio statement */}
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
                  The studio · In one breath
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] mb-5">
                  Music made <span className="text-gradient">to fit one voice</span> —<br className="hidden sm:block" />
                  and one moment at a time.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  I'm a composer working from Nairobi, writing original songs and sacred scores for singers
                  around the world. The desk stays small on purpose — one project at a time, one voice at a time,
                  so every page feels like it was always meant for you.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Listen to what's on the shelf, or write to me about a piece that doesn't exist yet.
                  Both doors are open.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Four pillars */}
        <Section delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
            {pillars.map((p) => (
              <div key={p.title} className="glass-card shine hover:-translate-y-1 transition-transform duration-500">
                <p.icon size={22} className="text-primary mb-3" />
                <h3 className="font-display font-semibold text-base mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <Section delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {catalogStats.map((s, i) => (
              <div
                key={s.label}
                className="glass-card text-center group cursor-default py-8 hover-scale"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Star size={20} className="mx-auto mb-3 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                <p className="text-2xl font-display font-bold text-foreground tabular-nums">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* MuseScore link */}
        <Section delay={300}>
          <a
            href="https://musescore.com/user/108485503"
            target="_blank"
            rel="noreferrer"
            className="glass-card glow-border shine flex items-center gap-4 group mt-10 max-w-lg mx-auto"
          >
            <Disc3 size={32} className="text-primary transition-colors duration-300 group-hover:text-accent" />
            <div>
              <p className="font-display font-semibold text-sm">Listen on MuseScore</p>
              <p className="text-xs text-muted-foreground">Stream every score and download the sheet music.</p>
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

        {/* Testimonials */}
        <Section delay={330}>
          <div className="mt-20">
            <Testimonials />
          </div>
        </Section>

        {/* Closing invitation */}
        <Section delay={350}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              <Sparkles size={12} className="inline mr-1" /> One last note
            </p>
            <blockquote className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
              <Quote size={16} className="inline text-primary mr-2 -mt-1" />
              If a song has been waiting inside you, the pen is warm.
              Send a message — I'll write back the same day, and we'll start.
            </blockquote>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary shine inline-flex">
                <Mail size={14} /> Start a Conversation
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
