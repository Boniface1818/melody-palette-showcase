import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

const projects = [
  {
    title: "Developer Portfolio",
    description: "My full stack of projects, code, and experiments.",
    icon: "💻",
    link: "https://github.com/Boniface1818",
    linkLabel: "View GitHub →",
    category: "Tech",
  },
  {
    title: "Music Compositions",
    description: "Sheet music, choir arrangements, and original compositions.",
    icon: "🎵",
    link: "https://musescore.com/user/108485503",
    linkLabel: "Listen on MuseScore →",
    category: "Music",
  },
  {
    title: "Personal Website",
    description: "This modern, responsive portfolio blending tech and music.",
    icon: "🌐",
    link: "/",
    linkLabel: "You're here →",
    category: "Tech",
  },
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mt-12">
            Projects 🚀
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4">
            A blend of code and composition.
          </p>
        </Section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {projects.map((p, i) => (
            <Section key={i} delay={i * 120}>
              <div className="glass-card glow-border h-full flex flex-col group">
                <span className="text-3xl mb-4 block transition-transform duration-300 group-hover:scale-110">
                  {p.icon}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  {p.category}
                </span>
                <h3 className="font-display font-semibold text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {p.description}
                </p>
                <a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                  className="color-shift text-sm font-medium mt-4 inline-block"
                >
                  {p.linkLabel}
                </a>
              </div>
            </Section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
