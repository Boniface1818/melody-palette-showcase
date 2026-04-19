import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import {
  Music,
  Feather,
  Quote,
  Church,
  Globe2,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
  Flame,
  Compass,
} from "lucide-react";
import logo from "@/assets/bk-logo.png";

const aboutSubtitles = [
  "A composer who thinks in harmonies and feels in rhythm.",
  "Crafting sacred music that unites voices and lifts spirits.",
  "From piano compositions to full choir arrangements — music is my calling.",
  "Every score is a conversation between the composer and the congregation.",
];

const chapters = [
  {
    icon: Flame,
    era: "The Spark",
    title: "A boy at the back of the choir",
    body:
      "Long before I could read music, I was the youngest voice in the back row, mouthing words I half-knew. The first time the soprano line broke open into a descant above me, I realized music wasn't sound — it was architecture for the soul.",
  },
  {
    icon: BookOpen,
    era: "The Apprenticeship",
    title: "Learning the language",
    body:
      "Years of choral formation, late nights at MuseScore, and patient mentors taught me that a great arrangement is invisible — it lets the prayer come forward and the singer feel held. I write parts I'd want to sing.",
  },
  {
    icon: Compass,
    era: "The Calling",
    title: "Music in service of the Mass",
    body:
      "Today I compose Mass settings, offertories, and acclamations rooted in East African melodic tradition — singable for parish choirs, faithful to the liturgy, and crafted to lift an assembly the very first Sunday it's sung.",
  },
];

export default function About() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("About Me", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(aboutSubtitles, 8000);

  return (
    <>
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
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-md mx-auto transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        {/* My Story — long-form, mirrored from home but distinct */}
        <Section delay={120}>
          <article
            id="my-story"
            className="glass-card mt-16 max-w-5xl mx-auto relative overflow-hidden"
            aria-labelledby="about-story-heading"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-start">
              {/* Narrative (left on desktop) */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 font-body inline-flex items-center gap-2">
                  <Feather size={12} /> My Story
                </p>
                <h2
                  id="about-story-heading"
                  className="text-3xl sm:text-4xl font-display font-bold mb-5 leading-tight"
                >
                  Between the <span className="text-accent">silence of a parish</span> and
                  the <span className="text-primary">first held chord</span> — that is where I live.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    I'm <span className="text-foreground font-semibold">Boniface Kagunda</span>,
                    a Kenyan composer and arranger. I don't write music to be admired from a stage —
                    I write it to be carried by ordinary voices in ordinary parishes, on ordinary
                    Sundays that suddenly become holy.
                  </p>
                  <p>
                    My work lives at the meeting place of three rivers: the
                    <span className="text-foreground"> melodic warmth of East Africa</span>, the
                    <span className="text-foreground"> discipline of classical voice-leading</span>,
                    and the <span className="text-foreground"> humility of the liturgy</span>. When
                    those three currents agree, a choir can sing something the first time and feel
                    like they've always known it.
                  </p>
                  <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/90 flex gap-2">
                    <Quote size={16} className="text-accent shrink-0 mt-1" />
                    <span>
                      "I'm not chasing applause. I'm chasing the moment a tired soprano closes her
                      eyes mid-phrase because the music finally said what she came to say."
                    </span>
                  </blockquote>
                  <p>
                    Every score in my catalog has a true story behind it — a friend lost, a
                    grandmother buried, a flooded harvest carried bravely to the altar. The notes
                    are only the surface. Underneath each one is a real person whose faith taught
                    me to listen.
                  </p>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link to="/compositions" className="btn-primary group">
                    Hear the Stories in the Music
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
              </div>

              {/* Portrait + chips (right on desktop) */}
              <div className="flex flex-col items-center md:items-end order-first md:order-last">
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 blur-xl" aria-hidden />
                  <img
                    src={logo}
                    alt="Boniface Kagunda — composer monogram portrait"
                    width={180}
                    height={180}
                    loading="lazy"
                    className="relative h-40 w-40 rounded-2xl object-cover ring-2 ring-accent/40 shadow-xl"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                    <Church size={11} /> Sacred Music Specialist
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    <Globe2 size={11} /> Rooted in Kenya
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary text-foreground/80">
                    <Award size={11} /> Commissions Open
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary text-foreground/80">
                    <Sparkles size={11} /> SATB · Strings · Piano
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Section>

        {/* Chapters — creative timeline */}
        <Section delay={200}>
          <div className="mt-8 max-w-5xl mx-auto">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-primary mb-6 inline-flex items-center gap-2 w-full justify-center">
              <Music size={12} /> Three Movements of a Life in Music
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {chapters.map((c, i) => (
                <article
                  key={c.era}
                  className="glass-card relative group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute -top-3 left-5 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-background border border-border text-accent">
                    Mvt. {i + 1}
                  </div>
                  <div className="flex items-center gap-3 mb-3 mt-2">
                    <div className="p-2.5 rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-accent/15">
                      <c.icon size={18} className="text-primary transition-colors duration-300 group-hover:text-accent" />
                    </div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {c.era}
                    </p>
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
