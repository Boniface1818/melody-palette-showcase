import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useRotatingQuotes } from "@/hooks/useRotatingQuotes";
import { useColorCycle } from "@/hooks/useColorCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Music, Sparkles, Users, BookOpen, Piano, Quote, Feather, Headphones, Mail, MessageCircle, Pen, Mic2, Send } from "lucide-react";
import logo from "@/assets/bk-logo.png";
import ScoreOfTheDay from "@/components/ScoreOfTheDay";

const journey = [
  { icon: MessageCircle, title: "You reach out", text: "Tell me the moment, the voice, the prayer behind the song." },
  { icon: Pen, title: "I sketch", text: "Melody first, then harmony — drafts shared with you for feedback." },
  { icon: Mic2, title: "We refine", text: "Tweak keys, voicings, and lyrics until the score sings to you." },
  { icon: Send, title: "You receive", text: "Final PDF, MIDI, backing track, and a guide vocal — yours forever." },
];

const swahiliQuotes = [
  { sw: "Bwana ni mchungaji wangu, sitapungukiwa na kitu.", en: "The Lord is my shepherd; I shall not want.", attr: "Zaburi 23" },
  { sw: "Anayeimba, anasali mara mbili.", en: "He who sings, prays twice.", attr: "Mt. Augustino" },
  { sw: "Imba kwa Bwana wimbo mpya.", en: "Sing to the Lord a new song.", attr: "Zaburi 96" },
  { sw: "Cantare amantis est.", en: "Singing belongs to the one who loves.", attr: "St. Augustine" },
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
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda monogram in gold with treble clef and musical staff"
                width={160}
                height={160}
                className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full object-cover ring-2 ring-primary/50 shadow-2xl mx-auto"
              />
            </div>

            {/* Tagline directly under the logo */}
            <p className="font-display italic text-base sm:text-lg text-primary tracking-wide mb-5 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-primary/50" />
              Elegance In Every Note
              <span className="h-px w-6 bg-primary/50" />
            </p>

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

        {/* Welcome — fresh, lyrical, no Sunday emphasis */}
        <Section delay={100}>
          <div className="relative mt-16 max-w-5xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl pointer-events-none" aria-hidden />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 p-8 sm:p-12 rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md">
              {/* left side: vertical accent */}
              <div className="hidden md:flex flex-col items-center gap-3">
                <Feather size={26} className="text-primary" />
                <div className="w-px flex-1 bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
                <Headphones size={20} className="text-accent" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-body">
                  Karibu sana · Welcome
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] mb-5">
                  Where <span className="text-primary">prayer</span> learns to sing,
                  <br className="hidden sm:block" />
                  and <span className="text-accent">silence</span> finds its melody.
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  I'm <span className="text-foreground font-semibold">Boniface Kagunda</span> — a Kenyan
                  composer crafting sacred music for choirs, cantors, soloists, and anyone whose worship needs words a melody can carry. Every score here was written for a real moment, a real voice, a real prayer.
                </p>

                <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/85 text-sm mb-3">
                  <Quote size={14} className="inline text-primary mr-1 -mt-1" />
                  "Ubora ni utumishi uliopambwa kwa upendo." — Excellence is service dressed in love.
                </blockquote>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Listen freely. Download what speaks to you. And when you're ready to commission a piece of your own — I'm one note away.
                </p>

                <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  Catalog auto-syncs daily from MuseScore
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Rotating Swahili wisdom — quartet of cards */}
        <Section delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-6xl mx-auto">
            {swahiliQuotes.map((q) => (
              <div key={q.sw} className="glass-card text-center hover:-translate-y-1 transition-transform duration-500">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
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

        {/* Score of the Day */}
        <Section delay={320}>
          <div className="mt-16">
            <ScoreOfTheDay />
          </div>
        </Section>

        {/* Commission Journey Timeline */}
        <Section delay={340}>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Feather size={12} /> How a Commission Unfolds
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                Four steps from your idea to a finished score.
              </h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {journey.map((step, i) => (
                <li key={step.title} className="glass-card relative group hover:-translate-y-1 transition-transform duration-500">
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
              <Link to="/contact" className="btn-primary inline-flex">
                <Mail size={14} /> Begin Your Commission
              </Link>
            </div>
          </div>
        </Section>

        {/* Closing invitation strip */}
        <Section delay={350}>
          <div className="mt-12 max-w-4xl mx-auto text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              <Sparkles size={12} className="inline mr-1" /> A song is waiting for you
            </p>
            <p className="text-base sm:text-lg text-foreground/85 font-display italic">
              "Where words end, music begins — and prayer finds wings."
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
