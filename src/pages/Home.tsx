import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight, BookOpen, Disc3, Globe2, Headphones, HeartHandshake, Languages,
  Mail, Mic2, Music2, PenLine, PlayCircle, Quote, Radio, Sparkles, Wand2,
} from "lucide-react";
import logo from "@/assets/bk-logo.png";
import ScoreOfTheDay from "@/components/ScoreOfTheDay";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Boniface Kagunda",
  jobTitle: "Composer & Songwriter",
  description:
    "Kenyan composer creating original sacred music, personal songs, Kikuyu pieces, Kiswahili songs, and English compositions for choirs, soloists, and families.",
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

const listeningPaths = [
  { icon: Disc3, title: "Fresh MuseScore shelf", text: "The catalog checks MuseScore automatically so the newest score can appear without waiting for a manual update." },
  { icon: Languages, title: "English · Kiswahili · Kikuyu", text: "Songs can carry the words your people already use for prayer, thanksgiving, celebration, and memory." },
  { icon: Mic2, title: "Voice-first writing", text: "Each melody is shaped around real breathing, real range, and the emotional weight of the person singing." },
];

const requestTypes = [
  "Graduation tributes",
  "Thanksgiving songs",
  "Wedding moments",
  "Choir pieces",
  "Kikuyu hymns",
  "Personal dedications",
];

const studioFlow = [
  { step: "Listen", text: "Your story, occasion, language, voice range, and the feeling behind the song." },
  { step: "Shape", text: "Melody, harmony, text setting, and a structure that can be learned quickly." },
  { step: "Deliver", text: "A polished score with learning audio so singers can rehearse confidently." },
];

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);
  const heading = useTextReveal("Boniface Kagunda", 70, 300, true, 60000);

  return (
    <>
      <SEO
        title="Boniface Kagunda — Elegance In Every Note"
        description="BK Music by Boniface Kagunda: original sacred songs, Kikuyu pieces, Kiswahili and English compositions, choir scores, and personal music commissions."
        path="/"
        type="profile"
        jsonLd={personJsonLd}
      />
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <section className="min-h-[76vh] flex flex-col items-center justify-center text-center relative">
          <Section>
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" aria-hidden />
              <img
                src={logo}
                alt="BK Music — Boniface Kagunda profile mark"
                width={160}
                height={160}
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
              Composer · Songwriter · Score Maker
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
            <p className="mt-5 text-base sm:text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
              A home for sacred songs, personal dedications, Kikuyu melodies, choir scores, and original music written for real people.
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
                Hear the Latest Scores
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-primary shine group hover-scale"
                style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}
              >
                <Mail size={14} />
                Start a Commission
              </Link>
            </div>
          </Section>
        </section>

        <Section delay={100}>
          <div className="mt-16 max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
            <div className="glass-card glow-border shine p-8 sm:p-10 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Radio size={12} /> New signal
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.05] mb-5">
                Music that knows the <span className="text-gradient">name, place, and prayer</span> behind it.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                BK Music is built around moments people want to keep: a graduate walking into a new life, a singer thanking God, a choir preparing Sunday, or a family asking for a song in English, Kiswahili, or Kikuyu.
              </p>
            </div>
            <div className="grid gap-4">
              {studioFlow.map((item, index) => (
                <div key={item.step} className="premium-card shine flex gap-4 items-start">
                  <span className="font-display text-3xl font-bold text-primary/30 leading-none">0{index + 1}</span>
                  <div>
                    <h3 className="font-display font-semibold text-base mb-1">{item.step}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section delay={150}>
          <div className="grid md:grid-cols-3 gap-4 mt-12 max-w-6xl mx-auto">
            {listeningPaths.map((path) => (
              <article key={path.title} className="glass-card shine hover:-translate-y-1 transition-transform duration-500">
                <path.icon size={22} className="text-primary mb-3" />
                <h3 className="font-display font-semibold text-base mb-2">{path.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{path.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section delay={200}>
          <div className="mt-14 max-w-5xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 inline-flex items-center gap-2">
              <Wand2 size={12} /> What can be written
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {requestTypes.map((type) => (
                <Link
                  key={type}
                  to="/contact"
                  className="px-4 py-2 rounded-full bg-secondary/60 border border-border/60 text-xs text-foreground/80 hover:border-primary/60 hover:text-primary transition"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </Section>

        <Section delay={260}>
          <div className="mt-16">
            <ScoreOfTheDay />
          </div>
        </Section>

        <Section delay={300}>
          <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
            {[
              { icon: Music2, label: "Catalog", value: "Auto-synced", text: "New MuseScore uploads are checked and pulled into the compositions page." },
              { icon: BookOpen, label: "Languages", value: "3", text: "English, Kiswahili, and Kikuyu options for commissions and worship pieces." },
              { icon: HeartHandshake, label: "Commission path", value: "Simple", text: "Share the story, voice, language, deadline, and the feeling you want the song to carry." },
            ].map((item) => (
              <div key={item.label} className="glass-card text-center group cursor-default py-8 hover-scale">
                <item.icon size={20} className="mx-auto mb-3 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-display font-bold text-foreground mt-1">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>






        <Section delay={330}>
          <div className="mt-20">
            <Testimonials />
          </div>
        </Section>

        <Section delay={350}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              <Sparkles size={12} className="inline mr-1" /> One invitation
            </p>
            <blockquote className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
              <Quote size={16} className="inline text-primary mr-2 -mt-1" />
              Bring the name, the reason, and the language. I will bring the melody.
            </blockquote>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="btn-primary shine inline-flex">
                <PenLine size={14} /> Write Your Brief
              </Link>
              <a href="https://musescore.com/user/108485503" target="_blank" rel="noreferrer" className="btn-primary shine inline-flex" style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}>
                <Headphones size={14} /> Listen on MuseScore
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
