import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Piano, Users, BookOpen, HeartHandshake, Mic, Feather, Sparkles, MapPin, Quote } from "lucide-react";

const aboutSubtitles = [
  "A composer who thinks in harmonies and feels in rhythm.",
  "Crafting sacred music that unites voices and lifts spirits.",
  "From piano compositions to full choir arrangements — music is my calling.",
  "Every score is a conversation between the composer and the congregation.",
];

const chapters = [
  {
    icon: MapPin,
    tag: "The Beginning",
    title: "A boy, a choir loft, and a question",
    body:
      "Long before I knew the word 'composer,' I knew the feeling of a choir locking into harmony — that sudden hush in a parish when voices align and the room itself seems to listen. I grew up in that hush, in Kenyan choir lofts where hymns were rehearsed by candlelight and improvised by ear.",
  },
  {
    icon: Feather,
    tag: "The Apprenticeship",
    title: "Learning the grammar of sacred sound",
    body:
      "The questions came next. Why does this cadence feel like surrender? Why does that suspension feel like prayer? Years of choral study, liturgical training, and stubborn late-night notation taught me the grammar — voice leading, modal color, the geometry of SATB writing — without dulling the wonder that started it all.",
  },
  {
    icon: Sparkles,
    tag: "The Calling",
    title: "Writing music a parish can actually sing",
    body:
      "Today, every score I publish is built around one quiet test: can an ordinary choir, on an ordinary Sunday, sing this and mean it? I write for breath, for budget, for rehearsal time that's always too short — and for the moment a congregation forgets it's listening and begins to pray.",
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

        {/* Story header */}
        <Section delay={100}>
          <div className="glass-card mt-16 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
              <Feather size={12} /> The Long Version
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-4">
              Three chapters, one <span className="text-primary">vocation</span>.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every composer's path is part inheritance, part stubbornness, part grace. Here is mine — told in three short chapters,
              the way I'd tell it to a friend over coffee after a Sunday rehearsal.
            </p>
          </div>
        </Section>

        {/* Chapters */}
        <Section delay={180}>
          <ol className="mt-6 max-w-3xl mx-auto space-y-4">
            {chapters.map((c, i) => (
              <li key={c.tag} className="glass-card relative">
                <div className="absolute top-6 left-6 text-5xl font-display font-bold text-primary/10 leading-none select-none" aria-hidden>
                  0{i + 1}
                </div>
                <div className="relative pl-14">
                  <div className="flex items-center gap-2 mb-2">
                    <c.icon size={14} className="text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.tag}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-2 text-foreground">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Closing quote */}
        <Section delay={260}>
          <div className="glass-card mt-6 max-w-3xl mx-auto">
            <blockquote className="flex gap-3 items-start">
              <Quote size={20} className="text-primary shrink-0 mt-1" />
              <p className="text-sm sm:text-base italic text-foreground/90 leading-relaxed">
                "I'm not chasing applause. I'm chasing that one breath a choir takes together,
                right before the first chord — when everyone in the room remembers why they came."
              </p>
            </blockquote>
          </div>
        </Section>

        {/* What I Offer */}
        <Section delay={320}>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Piano, label: "Piano Compositions" },
              { icon: Users, label: "Choir Arrangements" },
              { icon: Music, label: "String Ensembles" },
              { icon: Mic, label: "Worship Music" },
              { icon: BookOpen, label: "Mass Settings" },
              { icon: HeartHandshake, label: "Custom Commissions" },
            ].map((t, i) => (
              <div key={i} className="glass-card flex items-center gap-3 py-4 group cursor-default">
                <t.icon size={18} className="text-primary transition-colors duration-300 group-hover:text-accent" />
                <span className="text-sm font-body">{t.label}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
