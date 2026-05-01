import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Feather, Quote, BookOpen, PenLine, Church, Mic, Heart } from "lucide-react";

const aboutSubtitles = [
  "A Kenyan composer writing music the Church can actually sing.",
  "Sacred harmony, shaped for real choirs and real congregations.",
  "From the parish loft to the printed page — this is where I work.",
  "Liturgia kwanza. Ubunifu wa pili. Kiburi, kamwe.",
];

const chapters = [
  {
    icon: BookOpen,
    label: "Msikilizaji · The Listener",
    text:
      "Long before I wrote a single note, I was a listener — sitting in the pews, paying attention to which hymns made the assembly lean forward and which ones lost them by the second verse. That ear, trained in real Sunday liturgies, is still the one I trust most when I compose.",
  },
  {
    icon: PenLine,
    label: "Mfundi · The Craftsman",
    text:
      "I treat every score as a piece of work that has to function — singable ranges, honest harmonies, page turns that don't betray the choir mid-phrase. Composition, for me, is craftsmanship in service of prayer; the music must hold up on the eighth Sunday of Ordinary Time, not just on opening night.",
  },
  {
    icon: Church,
    label: "Mtumishi · The Servant",
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

        {/* Welcome / Karibu */}
        <Section delay={80}>
          <div className="glass-card mt-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 font-body inline-flex items-center gap-2">
                <Heart size={12} /> Karibu kwenye hadithi yangu
              </p>
              <blockquote className="text-lg sm:text-xl text-foreground italic leading-relaxed max-w-xl mx-auto">
                "Imba kwa Bwana wimbo mpya, kwa maana ametenda mambo ya ajabu."
              </blockquote>
              <p className="text-xs text-muted-foreground mt-2 mb-1">
                Sing to the Lord a new song, for He has done marvellous things.
              </p>
              <p className="text-[10px] uppercase tracking-widest text-accent">— Zaburi 98</p>
            </div>
          </div>
        </Section>

        {/* Bio — Who I Am */}
        <Section delay={100}>
          <div className="glass-card mt-6 max-w-3xl mx-auto">
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
                communion pieces, piano duos, string duets, SATB arrangements, and bespoke songs
                for solo Catholic artists who carry the gospel in their own voice.
              </p>
              <p>
                I do not write for stages. I write for the gathered assembly — for the
                cantor who has fifteen minutes to learn the psalm, for the four singers
                who carry the parish choir on their shoulders, for the soloist who needs
                a piece in <em>her</em> key, for the congregation that will only ever hear
                the piece sung once. Every score is engineered to survive that reality
                and still sound beautiful.
              </p>
              <p>
                My approach is simple: <span className="text-foreground">clarity before cleverness</span>,
                prayer before performance, the choir before the composer. If a piece of mine
                helps a parish pray more deeply on a single Sunday, the work has earned its place.
              </p>
            </div>
          </div>
        </Section>

        {/* Are you a Solo Catholic Artist? */}
        <Section delay={150}>
          <div className="glass-card glow-border mt-6 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/15 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 font-body inline-flex items-center gap-2">
                <Mic size={12} /> For Solo Catholic Artists
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 leading-tight">
                Are you a solo Catholic artist looking for <span className="text-primary">a song that's truly yours</span>?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                If you carry the gospel through your own voice — at adoration, at gatherings,
                on your channel, or on a stage — I'd love to write for you. Here's what you get:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { t: "A song in YOUR key", d: "Custom-pitched to your voice — soprano, tenor, baritone — never strained." },
                  { t: "Original lyrics or your own", d: "Bring me your verse, or I'll write words that match the song you imagine." },
                  { t: "Sheet music + chord chart", d: "Professional PDF score plus a guitar/piano chord chart for live use." },
                  { t: "Backing track + guide vocal", d: "Studio-quality MP3 backing track and a guide melody to learn from." },
                  { t: "Bilingual welcome", d: "Kiswahili, English, or both — sacred music that sounds like home." },
                  { t: "Free of stage ego", d: "Liturgically faithful, theologically sound, never showy. Built to lift souls." },
                ].map((i) => (
                  <li key={i.t} className="p-3 rounded-xl bg-secondary/40 border border-border/50">
                    <p className="text-foreground font-semibold text-sm">{i.t}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{i.d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs italic text-accent text-center">
                "Mungu hupenda anayetoa kwa furaha." — God loves a cheerful giver. (2 Wakor. 9:7)
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
                    "Cantare amantis est." — Singing belongs to the one who loves.
                    <span className="block text-xs text-muted-foreground not-italic mt-1">— Mt. Augustino wa Hippo</span>
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
