import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import {
  BookMarked, Church, FileMusic, Fingerprint, Globe2, Languages, Layers3,
  MapPin, Mic2, Music, PenLine, Quote, Sparkles, UsersRound, Volume2,
} from "lucide-react";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://bk-melodies.lovable.app/about",
  mainEntity: {
    "@type": "Person",
    name: "Boniface Kagunda",
    jobTitle: "Composer & Songwriter",
    nationality: "Kenyan",
  },
};

const aboutSubtitles = [
  "A Kenyan composer writing songs with names attached to them.",
  "English, Kiswahili, and Kikuyu melodies for faith, family, and celebration.",
  "A score should sound personal before anyone reads the dedication.",
];

const identityCards = [
  { icon: Fingerprint, title: "Personal by design", text: "I write toward the person, not just the occasion — the name, the story, the way the room should feel when the song begins." },
  { icon: Languages, title: "Kikuyu included", text: "Kikuyu can sit naturally beside English and Kiswahili, bringing family memory, home language, and cultural warmth into the music." },
  { icon: Church, title: "Sacred without stiffness", text: "The work can serve prayer and still feel alive: graceful, singable, emotionally clear, and ready for real singers." },
];

const craftMap = [
  { icon: PenLine, title: "Words first", text: "Before notes, I look for the phrase that carries the whole story." },
  { icon: Mic2, title: "Voice next", text: "The melody is tested like a singer will use it — breath by breath." },
  { icon: Layers3, title: "Harmony after", text: "Parts support the main line so choirs sound full without feeling overloaded." },
  { icon: FileMusic, title: "Clean delivery", text: "Finished pages are prepared for rehearsal, printing, sharing, and performance." },
];

const languageUses = [
  { label: "English", text: "Clear storytelling, dedications, worship lyrics, and songs meant for broad audiences." },
  { label: "Kiswahili", text: "Warm congregational flow, thanksgiving, praise, and East African sacred expression." },
  { label: "Kikuyu", text: "Family-rooted pieces, heritage moments, home celebrations, and lyrics that feel close to the heart." },
];

export default function About() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("The Composer's Hand", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(aboutSubtitles, 8000);

  return (
    <>
      <SEO
        title="About BK Music — Boniface Kagunda"
        description="Learn about Boniface Kagunda's fresh approach to original songs, Kikuyu music, Kiswahili and English sacred compositions, and personal commissions."
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
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-xl mx-auto transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        <Section delay={80}>
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md p-8 sm:p-12 aurora shine">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
              <MapPin size={12} /> Kenya · Worldwide
            </p>
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05]">
                I build songs that feel like they were <span className="text-gradient">already waiting</span> for the right voice.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  BK Music is not only a catalog. It is a writing room for dedications, worship moments, family celebrations, graduations, choir pieces, and quiet prayers that need melody.
                </p>
                <p>
                  My focus is simple: make the song sound personal, make the score readable, and make the melody strong enough to be remembered after the first hearing.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section delay={130}>
          <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {identityCards.map((item) => (
              <article key={item.title} className="glass-card shine hover:-translate-y-1 transition-transform duration-500">
                <item.icon size={22} className="text-primary mb-3" />
                <h3 className="font-display font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section delay={170}>
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <BookMarked size={12} /> Language palette
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                The right language changes <span className="text-gradient">the temperature of a song</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {languageUses.map((lang) => (
                <div key={lang.label} className="premium-card shine">
                  <p className="font-display text-2xl font-bold text-primary mb-2">{lang.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{lang.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section delay={210}>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <Volume2 size={12} /> How I hear a new piece
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Four decisions before the final score.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {craftMap.map((item) => (
                <div key={item.title} className="glass-card shine hover:-translate-y-1 transition-transform duration-500">
                  <item.icon size={20} className="text-accent mb-3" />
                  <h3 className="font-display font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section delay={250}>
          <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-5 items-stretch">
            <div className="glass-card glow-border shine flex flex-col justify-center">
              <Globe2 size={24} className="text-primary mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">For choirs, families, parishes, and solo voices.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A commission can be a full choir piece, a small piano song, a Kikuyu family dedication, a graduation celebration, or a new sacred melody for worship.
              </p>
            </div>
            <div className="glass-card shine">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4 inline-flex items-center gap-2">
                <UsersRound size={12} /> What matters most
              </p>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I listen for the part of the story that cannot be copied into another song. That is where the title, melodic shape, and emotional center usually come from.
                </p>
                <p>
                  The goal is never to make music feel complicated. The goal is to make it feel true: easy enough to sing, rich enough to keep, and personal enough to belong to the people who requested it.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section delay={290}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <blockquote className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
              <Quote size={16} className="inline text-primary mr-2 -mt-1" />
              "A good song does not only sound beautiful. It remembers why it was written."
            </blockquote>
            <p className="text-[10px] uppercase tracking-widest text-accent mt-4">— BK Music studio note</p>
          </div>
        </Section>

        <Section delay={320}>
          <div className="mt-12 max-w-3xl mx-auto glass-card shine text-center">
            <Music size={20} className="text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              New MuseScore uploads are checked automatically, and the compositions page now refreshes itself when a fresh score is found.
            </p>
          </div>
        </Section>

        {/* Journey timeline */}
        <Section delay={340}>
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <BookMarked size={12} /> The journey so far
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                Songs come from <span className="text-gradient">a long, quiet road</span>.
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/40 to-transparent -translate-x-1/2 hidden md:block" aria-hidden />
              <div className="space-y-6">
                {[
                  { y: "The spark", t: "A melody that wouldn't leave", d: "A simple tune hummed during ordinary days slowly turned into a habit of writing songs down — the beginning of a long conversation with music." },
                  { y: "The craft", t: "Years inside real choirs", d: "Singing and writing alongside parish choirs shaped my ear for what truly works for living voices — not just for the page." },
                  { y: "BK Music today", t: "Songs with names attached", d: "Now BK Music carries personal commissions, sacred pieces, and Kikuyu, Kiswahili and English songs to families, soloists, and choirs around the world." },
                ].map((s, i) => (
                  <div key={s.y} className={`md:grid md:grid-cols-2 md:gap-8 relative ${i % 2 ? "md:[&>:first-child]:order-2" : ""}`}>
                    <div className="glass-card glow-border">
                      <p className="text-[10px] uppercase tracking-widest text-accent">{s.y}</p>
                      <h3 className="font-display font-semibold text-lg mt-1 mb-2">{s.t}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background relative z-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Signature sounds — new feature */}
        <Section delay={370}>
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Sparkles size={12} /> Signature sounds
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                Recurring textures you'll <span className="text-gradient">hear across the catalog</span>.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Warm inner voices", d: "Alto and tenor lines that carry real melody, not just filler harmony." },
                { t: "Breath-shaped phrases", d: "Lines built around where a singer would naturally rest." },
                { t: "Text-first pacing", d: "The words are never rushed to fit the meter — the meter bends first." },
                { t: "Quiet climaxes", d: "The loudest moment isn't always the highest note. Sometimes it's the softest." },
              ].map((s) => (
                <div key={s.t} className="glass-card shine hover:-translate-y-1 transition-transform duration-500">
                  <h3 className="font-display font-semibold text-sm mb-2">{s.t}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </main>
      <Footer />
    </>
  );
}
