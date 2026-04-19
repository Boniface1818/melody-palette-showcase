import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useAnimatedSkills } from "@/hooks/useAnimatedSkills";
import { Music, Piano, Users, BookOpen, HeartHandshake, Mic } from "lucide-react";

const aboutSubtitles = [
  "A composer who thinks in harmonies and feels in rhythm.",
  "Crafting sacred music that unites voices and lifts spirits.",
  "From piano compositions to full choir arrangements — music is my calling.",
  "Every score is a conversation between the composer and the congregation.",
];

const skills = [
  { name: "SATB Choral Arrangements", level: 95 },
  { name: "Piano Composition", level: 88 },
  { name: "MuseScore Notation", level: 92 },
  { name: "Liturgical Music", level: 90 },
  { name: "Choir Direction", level: 80 },
  { name: "String & Ensemble Writing", level: 85 },
];

function AnimatedBar({ level }: { level: number }) {
  const { ref, width } = useAnimatedSkills(level);
  return (
    <div ref={ref} className="h-1.5 rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        style={{ width: `${width}%`, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </div>
  );
}

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

        {/* Bio */}
        <Section delay={100}>
          <div className="glass-card mt-16 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Music size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-display font-semibold">My Story</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm Boniface Kagunda, a Kenyan composer and music arranger with a deep passion
                for sacred and liturgical music. My journey began in the church choir, where I
                discovered the power of well-crafted harmony to move hearts and elevate worship.
              </p>
              <p>
                Today, I compose original works for piano, strings, and mixed vocal ensembles.
                My repertoire spans piano duos, string duets, mixed trios, and quartets —
                all written with care for the liturgical moment they serve.
              </p>
              <p>
                Every composition I create is rooted in a desire to serve the sacred —
                music that helps congregations pray, praise, and connect with something
                greater than themselves.
              </p>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section delay={200}>
          <div className="glass-card mt-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-accent/10">
                <HeartHandshake size={20} className="text-accent" />
              </div>
              <h2 className="text-lg font-display font-semibold">Musical Skills</h2>
            </div>
            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground tabular-nums">{s.level}%</span>
                  </div>
                  <AnimatedBar level={s.level} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* What I Offer */}
        <Section delay={300}>
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
