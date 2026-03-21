import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mt-12">
            About Me
          </h1>
        </Section>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <Section delay={100}>
            <div className="glass-card h-full">
              <h2 className="text-lg font-display font-semibold mb-3 color-shift">
                💻 Developer
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Passionate full-stack developer with a love for clean code and
                scalable architectures. I enjoy building real-world solutions
                with modern web technologies and am always exploring new tools.
              </p>
            </div>
          </Section>

          <Section delay={200}>
            <div className="glass-card h-full">
              <h2 className="text-lg font-display font-semibold mb-3 color-shift">
                🎵 Musician
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I compose and arrange music for choirs and ensembles. Music
                sharpens my sense of structure, timing, and harmony — skills
                that translate beautifully into crafting elegant software.
              </p>
            </div>
          </Section>
        </div>

        <Section delay={300}>
          <div className="glass-card mt-6">
            <h2 className="text-lg font-display font-semibold mb-3 color-shift">
              ⚡ Where They Meet
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I see rhythm in algorithms and patterns in melodies. Whether I'm
              debugging a complex system or scoring a piece for four voices, I'm
              solving creative problems — just in different languages.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
