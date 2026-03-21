import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { Code2, Music, Layers, Terminal, Piano, Users } from "lucide-react";

const techSkills = [
  { name: "React / TypeScript", level: 90 },
  { name: "Node.js / Express", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "PostgreSQL / Supabase", level: 78 },
  { name: "Git / CI-CD", level: 80 },
];

const musicSkills = [
  { name: "SATB Arrangements", level: 95 },
  { name: "Piano Composition", level: 85 },
  { name: "MuseScore Notation", level: 90 },
  { name: "Choir Direction", level: 80 },
];

export default function About() {
  useBackgroundCycle(5000);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mt-12"
            style={{ textWrap: "balance" as any }}
          >
            About Me
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            A developer who thinks in algorithms and a musician who feels in harmonies.
          </p>
        </Section>

        {/* Two pillars */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <Section delay={100}>
            <div className="glass-card h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Terminal size={20} className="text-primary" />
                </div>
                <h2 className="text-lg font-display font-semibold">Developer</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                I build fast, accessible web applications with modern frameworks.
                Clean architecture and user experience drive every decision I make.
              </p>
              <div className="space-y-3">
                {techSkills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground tabular-nums">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={200}>
            <div className="glass-card h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-accent/10">
                  <Music size={20} className="text-accent" />
                </div>
                <h2 className="text-lg font-display font-semibold">Musician</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                I compose and arrange for choirs, piano, and ensembles. Music
                sharpens my sense of structure and timing — skills that flow
                directly into my code.
              </p>
              <div className="space-y-3">
                {musicSkills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground tabular-nums">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Where they meet */}
        <Section delay={300}>
          <div className="glass-card mt-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Layers size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-display font-semibold">Where They Meet</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I see rhythm in algorithms and patterns in melodies. Whether I'm
              debugging a complex system or scoring a piece for four voices, I'm
              solving creative problems — just in different languages. Both
              demand patience, precision, and the courage to start over when
              something doesn't feel right.
            </p>
          </div>
        </Section>

        {/* Tools */}
        <Section delay={400}>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: Code2, label: "VS Code" },
              { icon: Terminal, label: "Linux / CLI" },
              { icon: Layers, label: "Figma" },
              { icon: Piano, label: "Piano" },
              { icon: Music, label: "MuseScore" },
              { icon: Users, label: "Choir Direction" },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card flex items-center gap-3 py-4 group cursor-default"
              >
                <t.icon
                  size={18}
                  className="text-primary transition-colors duration-300 group-hover:text-accent"
                />
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
