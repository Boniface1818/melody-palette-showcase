import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Feather, Quote, BookOpen, PenLine, Church, Heart, Sparkles, RefreshCw } from "lucide-react";

const aboutSubtitles = [
  "A Kenyan composer crafting music for the universal Church.",
  "Sacred harmony, shaped for real choirs and real voices.",
  "From the quiet desk to the singing assembly — this is where I work.",
  "Liturgia kwanza. Ubunifu wa pili. Kiburi, kamwe.",
];

const chapters = [
  {
    icon: BookOpen,
    label: "Msikilizaji · The Listener",
    text:
      "Before I ever wrote a note, I was a listener — paying attention to which melodies made hearts lean in, and which ones drifted past unnoticed. That ear, trained in living worship, is still the one I trust most when I compose.",
  },
  {
    icon: PenLine,
    label: "Mfundi · The Craftsman",
    text:
      "I treat each score as honest work — singable lines, kind harmonies, page turns that respect the singer. Composition, for me, is craftsmanship in service of prayer; the music must hold up the hundredth time it's sung, not just the first.",
  },
  {
    icon: Church,
    label: "Mtumishi · The Servant",
    text:
      "My name will not be on the lips of the assembly, and that is exactly as it should be. The composer's job is to disappear behind the prayer of the Church — if people leave singing the song instead of remembering the writer, the score has done its work.",
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

        {/* Karibu — opening scripture */}
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

        {/* Pull quote — designed feature */}
        <Section delay={120}>
          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> Elegance In Every Note
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight max-w-3xl mx-auto">
              I write quiet music for <span className="text-primary">loud souls</span>,
              and brave music for <span className="text-accent">tender ones</span>.
            </h2>
          </div>
        </Section>

        {/* Bio — split layout */}
        <Section delay={150}>
          <div className="mt-10 max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-6">
            {/* Left identity card */}
            <div className="glass-card glow-border flex flex-col justify-center text-center md:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 inline-flex w-fit mx-auto md:mx-0 mb-4">
                <Music size={22} className="text-primary" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">The short version</p>
              <h3 className="text-xl font-display font-bold mb-2">Boniface Kagunda</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kenyan composer. Sacred music. Choirs, cantors, soloists, and seekers — all welcome.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Composer", "Arranger", "Cantor", "Catholic"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-foreground/80">{t}</span>
                ))}
              </div>
            </div>

            {/* Right narrative */}
            <div className="glass-card">
              <h2 className="text-lg font-display font-semibold mb-4">Who I Am</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I am <span className="text-foreground font-semibold">Boniface Kagunda</span> — a Kenyan
                  composer and arranger working primarily in sacred and liturgical music.
                  My catalogue spans Mass settings, responsorial psalms, offertory and communion pieces,
                  piano duos, string duets, SATB arrangements, and bespoke songs for soloists who carry the gospel in their own voice.
                </p>
                <p>
                  I do not write for the spotlight. I write for the gathered assembly, for the cantor with little time and a big heart, for the four singers who are the parish choir, for the soloist who needs a piece in <em>her</em> key. Every score is engineered to survive that reality and still sound beautiful.
                </p>
                <p>
                  My approach is simple: <span className="text-foreground">clarity before cleverness</span>,
                  prayer before performance, the singer before the composer.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Three Chapters */}
        <Section delay={200}>
          <article className="mt-10 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <Feather size={12} /> Notes from the Desk
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                Three faces of the same vocation.
              </h2>
            </div>

            <ol className="grid sm:grid-cols-3 gap-4">
              {chapters.map((c, i) => (
                <li
                  key={c.label}
                  className="glass-card relative group hover:-translate-y-1 transition-transform duration-500"
                >
                  <span className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/20 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2 mb-3">
                    <c.icon size={16} className="text-primary" />
                    <p className="text-[10px] uppercase tracking-widest text-primary">{c.label}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </li>
              ))}
            </ol>

            <blockquote className="mt-8 border-l-2 border-primary pl-4 italic text-foreground/85 max-w-2xl mx-auto flex gap-2">
              <Quote size={16} className="text-primary shrink-0 mt-1" />
              <span>
                "Cantare amantis est." — Singing belongs to the one who loves.
                <span className="block text-xs text-muted-foreground not-italic mt-1">— Mt. Augustino wa Hippo</span>
              </span>
            </blockquote>
          </article>
        </Section>

        {/* Auto-sync notice */}
        <Section delay={250}>
          <div className="mt-12 max-w-3xl mx-auto glass-card text-center">
            <RefreshCw size={20} className="text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-base mb-2">Fresh scores, always</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
              The catalogue updates automatically every day, pulling the latest scores straight from MuseScore.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
