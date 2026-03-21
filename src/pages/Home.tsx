import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import Section from "@/components/Section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const typedText = useTypingAnimation();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <Section>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]" style={{ textWrap: "balance" as any }}>
              Hi, I'm <span className="color-shift">Boniface</span> 👋
            </h1>
          </Section>
          <Section delay={150}>
            <p className="mt-6 text-xl sm:text-2xl text-muted-foreground font-body">
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </p>
          </Section>
          <Section delay={300}>
            <p className="mt-8 max-w-lg text-sm text-muted-foreground leading-relaxed" style={{ textWrap: "pretty" as any }}>
              Where code meets composition — I build scalable web systems and craft
              musical arrangements that move people.
            </p>
          </Section>
          <Section delay={450}>
            <div className="mt-10 flex gap-4">
              <a href="/projects" className="btn-primary">
                View Projects
              </a>
              <a href="/contact" className="btn-primary" style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}>
                Say Hello
              </a>
            </div>
          </Section>
        </section>

        {/* Quick Stats */}
        <Section delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Projects Built", value: "12+", icon: "💻" },
              { label: "Compositions", value: "8+", icon: "🎵" },
              { label: "Technologies", value: "15+", icon: "⚡" },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center group cursor-default">
                <span className="text-3xl block mb-3 transition-transform duration-300 group-hover:scale-110">
                  {s.icon}
                </span>
                <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
