import { Link } from "react-router-dom";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useRotatingQuotes } from "@/hooks/useRotatingQuotes";
import { useColorCycle } from "@/hooks/useColorCycle";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Github, Music, Code2, Sparkles, Zap, Heart, Shield, Users } from "lucide-react";

export default function Home() {
  const typedText = useTypingAnimation();
  useBackgroundCycle(5000);
  const heading = useTextReveal("Hi, I'm Boniface", 70, 300, true, 60000);
  const [quote1Text, quote2Text] = useRotatingQuotes(12000);
  const headingColor = useColorCycle(3000);

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
            <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-accent/25 animate-pulse" style={{ animationDelay: "3s" }} />
          </div>

          <Section>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
              Developer · Composer · Creator
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
            <p
              className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed mx-auto transition-opacity duration-700"
              style={{ textWrap: "pretty" as any }}
            >
              {quote1Text}
            </p>
          </Section>
          <Section delay={450}>
            <p
              className="mt-4 max-w-md text-sm text-muted-foreground/80 leading-relaxed mx-auto italic transition-opacity duration-700"
              style={{ textWrap: "pretty" as any }}
            >
              {quote2Text}
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

        {/* Welcome / Why Choose Me */}
        <Section delay={100}>
          <div className="glass-card mt-12 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <Heart size={28} className="text-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-4">Welcome to My World</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              I'm Boniface — a developer who thinks in code and a musician who feels in harmony. 
              Whether you need a beautifully crafted web application or an original musical composition, 
              I bring the same passion, precision, and creativity to every project.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-secondary/50">
                <Shield size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xs font-semibold text-foreground">Reliable & Dedicated</p>
                <p className="text-[11px] text-muted-foreground mt-1">I deliver on time, every time</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Sparkles size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-xs font-semibold text-foreground">Creative Vision</p>
                <p className="text-[11px] text-muted-foreground mt-1">Unique blend of tech & art</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Users size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-xs font-semibold text-foreground">Client-Focused</p>
                <p className="text-[11px] text-muted-foreground mt-1">Your vision, my execution</p>
              </div>
            </div>
          </div>
        </Section>

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
