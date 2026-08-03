import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Flame, Gift, ListMusic } from "lucide-react";

const guides = [
  {
    to: "/resources/christmas-hymns",
    icon: Gift,
    title: "Christmas hymns guide",
    text: "Carols and Christmas Mass selections for choirs, in English, Kiswahili, and Kikuyu.",
  },
  {
    to: "/resources/funeral-hymns",
    icon: BookOpen,
    title: "Funeral hymns guide",
    text: "Gentle, singable pieces for vigils, requiem Mass, and committal moments.",
  },
  {
    to: "/resources/holy-spirit-hymns",
    icon: Flame,
    title: "Holy Spirit hymns guide",
    text: "Confirmation, Pentecost, and general invocation songs sorted by arrangement.",
  },
  {
    to: "/liturgical-music-suggestions",
    icon: ListMusic,
    title: "Liturgical music planner",
    text: "Season-by-season suggestions for building a Mass music list with confidence.",
  },
];

export default function ResourceGuides() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
          <BookOpen size={12} /> Free guides
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
          Planning music? Start with a <span className="text-gradient">ready-made guide</span>.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {guides.map((g) => (
          <Link
            key={g.to}
            to={g.to}
            className="glass-card shine group hover:-translate-y-1 transition-transform duration-500 block"
          >
            <g.icon size={20} className="text-accent mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">{g.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{g.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary">
              Read guide
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
