import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Feather, Quote, BookOpen, PenLine, Church, Heart, Sparkles, RefreshCw } from "lucide-react";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://bk-melodies.lovable.app/about",
  mainEntity: {
    "@type": "Person",
    name: "Boniface Kagunda",
    jobTitle: "Sacred Music Composer & Arranger",
    nationality: "Kenyan",
  },
};

const aboutSubtitles = [
  "Sacred music written in Nairobi, sung wherever the Church gathers.",
  "Composer, arranger, and quiet servant of the liturgy.",
  "Music that respects the singer and serves the prayer.",
  "Ujenzi wa wimbo: kalamu, sauti, na sala.",
];

const chapters = [
  {
    icon: BookOpen,
    label: "Mwanzo · Where it began",
    text:
      "I grew up in a parish where the choir was small and the heart was huge. Long before any conservatory theory, I learned that a song lives or dies by whether the gathered assembly can carry it home and hum it on Monday morning.",
  },
  {
    icon: PenLine,
    label: "Kazi · The work",
    text:
      "I write every line on the page as if I were the singer staring at it for the first time. Page turns are planned, breath marks are honest, ranges are kind, and harmony is never decoration — only meaning.",
  },
  {
    icon: Church,
    label: "Wito · The calling",
    text:
      "The composer is not the point. The prayer is. If a piece I wrote can disappear into the lips of an assembly and leave behind only an encounter with God, then the score has done exactly its job.",
  },
];

export default function About() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("About Boniface Kagunda", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(aboutSubtitles, 8000);

  return (
    <>
      <SEO
        title="About Boniface Kagunda — Sacred Music Composer"
        description="Meet Boniface Kagunda, a Kenyan composer crafting liturgical music for the Catholic Church — Mass settings, psalms, SATB arrangements, and bespoke choral works."
        path="/about"
        jsonLd={aboutJsonLd}
      />
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mt-12"
            style={{ textWrap: "balance" as any, color: headingColor, transition: "color 1.5s ease" }}
          >
            {heading.revealed}
            {!heading.done && <span className="typing-cursor" />}
            <span className="sr-only"> — Sacred Music Composer</span>
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-md mx-auto transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        {/* Karibu — opening verse */}
        <Section delay={80}>
          <div className="glass-card shine mt-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 font-body inline-flex items-center gap-2">
                <Heart size={12} /> A few honest words
              </p>
              <blockquote className="text-lg sm:text-xl text-foreground italic leading-relaxed max-w-xl mx-auto">
                "Mimi siimbi ili nisikike — naimba ili Mungu apate kusikika."
              </blockquote>
              <p className="text-xs text-muted-foreground mt-2 mb-1">
                I do not sing to be heard — I sing so that God may be heard.
              </p>
              <p className="text-[10px] uppercase tracking-widest text-accent">— Studio motto</p>
            </div>
          </div>
        </Section>

        {/* Pull quote — designed feature */}
        <Section delay={120}>
          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> The studio in one sentence
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight max-w-3xl mx-auto">
              I write <span className="text-gradient">durable</span> sacred music
              <br className="hidden sm:block" />
              for choirs that need to <span className="text-gradient">sing it on Sunday</span>.
            </h2>
          </div>
        </Section>

        {/* Bio — split layout */}
        <Section delay={150}>
          <div className="mt-10 max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-6">
            {/* Left identity card */}
            <div className="glass-card glow-border shine flex flex-col justify-center text-center md:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 inline-flex w-fit mx-auto md:mx-0 mb-4">
                <Music size={22} className="text-primary" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">At a glance</p>
              <h3 className="text-xl font-display font-bold mb-2">Boniface Kagunda</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nairobi-based composer. Builds singable, durable sacred music
                — one commission, one assembly, one prayer at a time.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Composer", "Arranger", "Cantor", "Engraver", "Catholic"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-foreground/80">{t}</span>
                ))}
              </div>
            </div>

            {/* Right narrative */}
            <div className="glass-card shine">
              <h2 className="text-lg font-display font-semibold mb-4">The longer story</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I am <span className="text-foreground font-semibold">Boniface Kagunda</span>, a Kenyan composer working at the intersection of
                  liturgy and craft. Most of what leaves my desk is sacred — Mass settings, responsorial psalms,
                  offertory and communion pieces, hymn arrangements for SATB, SAB, SSA, and unison choirs, plus bespoke songs for
                  solo Catholic artists who carry the gospel in their own voice.
                </p>
                <p>
                  I work the same way whether the brief is one cantor or a hundred-voice festival choir:
                  start with the text, find the melody that already lives inside it, then dress it in harmony
                  that <em>helps</em> rather than decorates. Every page is engraved to be readable in low candlelight, with page turns
                  that respect the singer's breath.
                </p>
                <p>
                  My promise is short: <span className="text-foreground">clarity over cleverness, prayer over performance,
                  the singer before the composer</span> — and a finished score you can trust the very first time the choir opens it.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Three Chapters */}
        <Section delay={200}>
          <article className="mt-10 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <Feather size={12} /> Three chapters
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                The same desk, told three ways.
              </h2>
            </div>

            <ol className="grid sm:grid-cols-3 gap-4">
              {chapters.map((c, i) => (
                <li
                  key={c.label}
                  className="glass-card shine relative group hover:-translate-y-1 transition-transform duration-500"
                >
                  <span className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/20 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2 mb-3">
                    <c.icon size={16} className="text-primary" />
                    <p className="text-[10px] uppercase tracking-widest text-primary">{c.label}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </li>
              ))}
            </ol>

            <blockquote className="mt-8 border-l-2 border-primary pl-4 italic text-foreground/85 max-w-2xl mx-auto flex gap-2">
              <Quote size={16} className="text-primary shrink-0 mt-1" />
              <span>
                "The best score is the one nobody notices was written — they only notice they were praying."
                <span className="block text-xs text-muted-foreground not-italic mt-1">— Note pinned above my desk</span>
              </span>
            </blockquote>
          </article>
        </Section>

        {/* By the Numbers */}
        <Section delay={220}>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 inline-flex items-center gap-2">
                <Sparkles size={12} /> The studio, in figures
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Small numbers, carefully tended.</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { n: "5+", l: "Years composing" },
                { n: "3", l: "Liturgical languages" },
                { n: "24h", l: "Reply window" },
                { n: "2", l: "Free revision rounds" },
              ].map((s) => (
                <div key={s.l} className="glass-card text-center !p-5 hover-scale">
                  <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Composing Principles */}
        <Section delay={240}>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 inline-flex items-center gap-2">
                <PenLine size={12} /> Non-negotiables
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Four lines I will not cross.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { t: "The singer is sacred", d: "If a line is cruel to sing — wrong tessitura, wrong breath, wrong word stress — it is rewritten before the page leaves the desk." },
                { t: "Function before flair", d: "Every score must work the first Sunday it is opened, not after a season of rehearsal. Rehearsal time is a gift, not a fix." },
                { t: "Honest harmony", d: "No filler voices, no parade tricks. Each inner part has somewhere to go and a reason to be there — or it is cut." },
                { t: "Quiet authorship", d: "My name belongs at the bottom of the page. The song belongs to the assembly, and through them, to God." },
              ].map((p) => (
                <div key={p.t} className="glass-card shine">
                  <h3 className="font-display font-semibold text-base mb-2">{p.t}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Auto-sync notice */}
        <Section delay={300}>
          <div className="mt-12 max-w-3xl mx-auto glass-card shine text-center">
            <RefreshCw size={20} className="text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-base mb-2">Always something new on the desk</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
              The compositions catalog rebuilds itself nightly from MuseScore, so what you see is what I'm working on this week.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
