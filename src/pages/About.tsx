import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Feather, Quote, BookOpen, PenLine, Church } from "lucide-react";

const aboutSubtitles = [
  "A Kenyan composer writing music the Church can actually sing.",
  "Sacred harmony, shaped for real choirs and real congregations.",
  "From the parish loft to the printed page — this is where I work.",
  "Liturgy first. Craft second. Ego, never.",
];

const chapters = [
  {
    icon: BookOpen,
    label: "The Listener",
    text:
      "Long before I wrote a single note, I was a listener — sitting in the pews, paying attention to which hymns made the assembly lean forward and which ones lost them by the second verse. That ear, trained in real Sunday liturgies, is still the one I trust most when I compose.",
  },
  {
    icon: PenLine,
    label: "The Craftsman",
    text:
      "I treat every score as a piece of work that has to function — singable ranges, honest harmonies, page turns that don't betray the choir mid-phrase. Composition, for me, is craftsmanship in service of prayer; the music must hold up on the eighth Sunday of Ordinary Time, not just on opening night.",
  },
  {
    icon: Church,
    label: "The Servant",
    text:
      "My name will not be on the lips of the congregation, and that is exactly as it should be. The composer's job is to disappear behind the prayer of the Church. If the assembly leaves singing the hymn instead of remembering the composer, the score has done its work.",
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

        {/* Bio — Who I Am */}
        <Section delay={100}>
          <div className="glass-card mt-16 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Music size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-display font-semibold">Who I Am</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I am <span className="text-foreground font-semibold">Boniface Kagunda</span> — a Kenyan
                composer and arranger working primarily in sacred and liturgical music.
                My catalogue includes Mass settings, responsorial psalms, offertory and
                communion pieces, piano duos, string duets, and SATB arrangements written
                for parishes, choirs, and ordinary Sundays.
              </p>
              <p>
                I do not write for stages. I write for the gathered assembly — for the
                cantor who has fifteen minutes to learn the psalm, for the four singers
                who carry the parish choir on their shoulders, for the congregation that
                will only ever hear the piece sung once. Every score is engineered to
                survive that reality and still sound beautiful.
              </p>
              <p>
                My approach is simple: clarity before cleverness, prayer before performance,
                the choir before the composer. If a piece of mine helps a parish pray more
                deeply on a single Sunday, the work has earned its place.
              </p>
            </div>
          </div>
        </Section>

        {/* Mirrored Story — Notes from the Desk */}
        <Section delay={200}>
          <article
            className="glass-card mt-6 max-w-3xl mx-auto relative overflow-hidden"
            aria-labelledby="confession-heading"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 font-body inline-flex items-center gap-2">
                <Feather size={12} /> Notes from the Desk
              </p>
              <h2
                id="confession-heading"
                className="text-2xl sm:text-3xl font-display font-bold mb-5 leading-tight"
              >
                I write for the <span className="text-primary">eighth Sunday</span>,
                not the <span className="text-accent">opening night</span>.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Most composers I admire share one quiet conviction: the score is not
                  finished when it looks beautiful on the page — it is finished when an
                  ordinary parish choir, with one rehearsal and tired voices, can lift it
                  on a Sunday morning and sound like themselves.
                </p>
                <p>
                  That is the standard I hold every piece to. I revise for the alto who
                  always sits second from the left. I voice chords for the bass who reads
                  by ear. I leave breathing room where the assembly will need it.
                  <span className="text-foreground"> The work is invisible when it works.</span>
                </p>
                <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 flex gap-2">
                  <Quote size={16} className="text-primary shrink-0 mt-1" />
                  <span>
                    "Liturgical music is not the composer's art on display —
                    it is the assembly's prayer, given a shape they can carry."
                  </span>
                </blockquote>
              </div>

              {/* Three Chapters */}
              <ol className="mt-7 grid sm:grid-cols-3 gap-3">
                {chapters.map((c) => (
                  <li
                    key={c.label}
                    className="p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <c.icon size={14} className="text-primary" />
                      <p className="text-[10px] uppercase tracking-widest text-primary">{c.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}
