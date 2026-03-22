import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Github, Music, Code2, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center text-center relative">
          {/* Floating ambient dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-primary/30 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <Section>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              Developer · Composer · Creator
            </p>
          </Section>
          <Section delay={100}>
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95]"
              style={{ textWrap: "balance" as any }}
            >
              Hi, I'm{" "}
              <span className="color-shift relative">
                Boniface
                <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-60" />
              </span>
            </h1>
          </Section>
          <Section delay={200}>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-muted-foreground font-body">
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </p>
          </Section>
          <Section delay={350}>
            <p
              className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed mx-auto"
              style={{ textWrap: "pretty" as any }}
            >
              Where code meets composition — I build scalable web systems and
              craft musical arrangements that move people.
            </p>
          </Section>
          <Section delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/projects" className="btn-primary group">
                View Projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="btn-primary"
                style={{
                  background: "transparent",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                Say Hello
              </Link>
            </div>
          </Section>
        </section>

        {/* Stats */}
        <Section delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Projects Built", value: "12+", Icon: Code2 },
              { label: "Compositions", value: "5+", Icon: Music },
              { label: "Technologies", value: "15+", Icon: Zap },
              { label: "Years Coding", value: "3+", Icon: Sparkles },
            ].map((s, i) => (
              <div
                key={i}
                className="glass-card text-center group cursor-default py-8"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <s.Icon
                  size={24}
                  className="mx-auto mb-3 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110"
                />
                <p className="text-2xl font-display font-bold text-foreground tabular-nums">
                  {s.value}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Quick Links */}
        <Section delay={300}>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <a
              href="https://github.com/Boniface1818"
              target="_blank"
              rel="noreferrer"
              className="glass-card glow-border flex items-center gap-4 group"
            >
              <Github size={28} className="text-primary transition-colors duration-300 group-hover:text-accent" />
              <div>
                <p className="font-display font-semibold text-sm">GitHub</p>
                <p className="text-xs text-muted-foreground">Browse my repositories & open-source work</p>
              </div>
            </a>
            <a
              href="https://musescore.com/user/108485503"
              target="_blank"
              rel="noreferrer"
              className="glass-card glow-border flex items-center gap-4 group"
            >
              <Music size={28} className="text-primary transition-colors duration-300 group-hover:text-accent" />
              <div>
                <p className="font-display font-semibold text-sm">MuseScore</p>
                <p className="text-xs text-muted-foreground">Listen to my choir compositions & arrangements</p>
              </div>
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
