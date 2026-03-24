import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { ExternalLink, Github, Music, Code2, Globe } from "lucide-react";

type Category = "All" | "Tech" | "Music";

const projectSubtitles = [
  "A blend of code and composition.",
  "Where software engineering meets musical artistry.",
  "Each project tells a story — in logic or in melody.",
  "From web apps to worship songs, crafted with care.",
];

const projects = [
  {
    title: "Developer Portfolio",
    description:
      "This very site — a cinematic portfolio blending code and music, built with React, TypeScript, and Tailwind CSS.",
    icon: Globe,
    link: "/",
    linkLabel: "You're here",
    category: "Tech" as const,
    tags: ["React", "Tailwind", "TypeScript"],
  },
  {
    title: "GitHub Repositories",
    description:
      "Open-source projects, experiments, and contributions across full-stack web development.",
    icon: Github,
    link: "https://github.com/Boniface1818",
    linkLabel: "Browse repos",
    category: "Tech" as const,
    tags: ["Open Source", "Full Stack"],
  },
  {
    title: "HEKO",
    description:
      "A piano duo composition — 2 parts, 2 pages. An energetic piece exploring interplay between two piano voices.",
    icon: Music,
    link: "https://musescore.com/user/108485503/scores/29658509",
    linkLabel: "Listen on MuseScore",
    category: "Music" as const,
    tags: ["Piano Duo", "2 Parts"],
  },
  {
    title: "HALELUYA",
    description:
      "A mixed quartet arrangement for bass guitar and strings — a praise piece with rich harmonic layers.",
    icon: Music,
    link: "https://musescore.com/user/108485503/scores/28959626",
    linkLabel: "Listen on MuseScore",
    category: "Music" as const,
    tags: ["Mixed Quartet", "4 Parts"],
  },
  {
    title: "SADAKA TAKATIFU",
    description:
      "A string duet for church offertory — contemplative and reverent, built around two interwoven string voices.",
    icon: Music,
    link: "https://musescore.com/user/108485503/scores/31555013",
    linkLabel: "Listen on MuseScore",
    category: "Music" as const,
    tags: ["String Duet", "Church"],
  },
  {
    title: "NJONI TUINGIE",
    description:
      "A mixed quartet with piano and bass guitar — an invitational hymn with a warm, welcoming character.",
    icon: Music,
    link: "https://musescore.com/user/108485503/scores/32170553",
    linkLabel: "Listen on MuseScore",
    category: "Music" as const,
    tags: ["Mixed Quartet", "Piano"],
  },
  {
    title: "MISA ANTHONY",
    description:
      "A three-part mixed trio for strings — a fuller liturgical mass setting spanning 3 pages.",
    icon: Music,
    link: "https://musescore.com/user/108485503/scores/30245900",
    linkLabel: "Listen on MuseScore",
    category: "Music" as const,
    tags: ["Mixed Trio", "3 Parts"],
  },
];

const filters: Category[] = ["All", "Tech", "Music"];

export default function Projects() {
  useBackgroundCycle(5000);
  const [active, setActive] = useState<Category>("All");
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Projects", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(projectSubtitles, 8000);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        <Section>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mt-12"
            style={{ color: headingColor, transition: "color 1.5s ease" }}
          >
            {heading.revealed}
            {!heading.done && <span className="typing-cursor" />}
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        {/* Filter pills */}
        <Section delay={100}>
          <div className="flex justify-center gap-3 mt-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-xs font-body tracking-wide transition-all duration-300 active:scale-95 ${
                  active === f
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {filtered.map((p, i) => (
            <Section key={p.title} delay={i * 100}>
              <div className="glass-card glow-border h-full flex flex-col group">
                <div className="flex items-center justify-between mb-4">
                  <p.icon
                    size={24}
                    className="text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110"
                  />
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      p.category === "Music"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {p.category}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                  className="color-shift text-sm font-medium mt-4 inline-flex items-center gap-1.5 group/link"
                >
                  {p.linkLabel}
                  <ExternalLink
                    size={13}
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                  />
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
