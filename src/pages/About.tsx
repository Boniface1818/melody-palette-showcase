import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import Testimonials from "@/components/Testimonials";
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
  "Composer of songs that turn moments into memories.",
  "Where a graduation, a thanksgiving, a Sunday — all become music.",
  "Bespoke songs, sacred scores, and stories shaped in sound.",
  "Kalamu moja, sauti nyingi — one pen, many voices.",
];

const chapters = [
  {
    icon: BookOpen,
    label: "Chimbuko · The spark",
    text:
      "It started with watching people sing words that didn't quite fit their hearts. I picked up a pen and decided no one I write for would ever again borrow another person's song to express their own joy, grief, or gratitude.",
  },
  {
    icon: PenLine,
    label: "Mtindo · The craft",
    text:
      "I write the way a tailor cuts cloth — measured to one voice, one range, one story. Every page is engraved so the singer never has to wrestle the score; they only have to mean it.",
  },
  {
    icon: Church,
    label: "Maana · The meaning",
    text:
      "A song is finished when it disappears into the person singing it. My name belongs at the bottom of the page — the moment belongs to you, and through you, to God.",
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
                "Sijaitwa kuandika nyimbo — nimeitwa kuandika nyakati."
              </blockquote>
              <p className="text-xs text-muted-foreground mt-2 mb-1">
                I was not called to write songs — I was called to write moments.
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
              I write <span className="text-gradient">songs</span> for the moments
              <br className="hidden sm:block" />
              that <span className="text-gradient">deserve their own melody</span>.
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
                Kenyan composer, arranger, and storyteller. Writes original songs and sacred scores
                that turn personal moments — graduations, thanksgivings, ordinations — into music people keep.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Composer", "Arranger", "Songwriter", "Engraver", "Storyteller"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-foreground/80">{t}</span>
                ))}
              </div>
            </div>

            {/* Right narrative */}
            <div className="glass-card shine">
              <h2 className="text-lg font-display font-semibold mb-4">The longer story</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I'm <span className="text-foreground font-semibold">Boniface Kagunda</span>, a Kenyan composer who treats
                  every song like a small, private commission from real life. When Cynthia wanted to thank God for His blessings,
                  she didn't borrow somebody else's hymn — I wrote <em className="text-foreground">"Asante"</em> for her.
                  When Kinani graduated from campus, his celebration wasn't background music — it was <em className="text-foreground">"Heko"</em>,
                  a song built around his own journey.
                </p>
                <p>
                  That's the work: turning a feeling that's hard to name into a melody you'll never forget. Sacred or personal,
                  choir or soloist, Kiswahili or Latin — the brief is always the same. Find the song already living inside the
                  moment, and write it down before it gets away.
                </p>
                <p>
                  My promise is short: <span className="text-foreground">your story leads, the music follows</span> — and what
                  you receive is a score you can sing, share, and keep for the rest of your life.
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
        {/* Testimonials — songs that found their people */}
        <Section delay={280}>
          <div className="mt-16">
            <Testimonials
              eyebrow="Songs already written for real people"
              heading={<>Stories that became <span className="text-gradient">songs</span>.</>}
            />
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
