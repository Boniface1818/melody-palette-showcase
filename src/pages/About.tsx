import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Music, Feather, Quote, Flame, Compass, Sparkles, HandHeart, Headphones, Award, Clock, Globe2, Hand } from "lucide-react";

const aboutSubtitles = [
  "A composer who thinks in harmonies and feels in rhythm.",
  "Crafting sacred music that unites voices and lifts spirits.",
  "From piano compositions to full choir arrangements — music is my calling.",
  "Every score is a conversation between the composer and the congregation.",
];

const chapters = [
  {
    icon: Flame,
    label: "The Spark",
    text:
      "It began in a small parish loft in Kenya — a boy too short to see over the choir stand, mouthing harmonies he could not yet name. The hymns came home with me, lived in my chest, and quietly asked to be written down.",
  },
  {
    icon: Compass,
    label: "The Search",
    text:
      "Years of training, late-night MuseScore sessions, and stubborn experiments with SATB voicing taught me what every choirmaster already knows: a score only matters when ordinary voices can sing it on the first Sunday they try.",
  },
  {
    icon: Sparkles,
    label: "The Calling",
    text:
      "Today I write for the assembly more than for the page — Mass settings, offertories, piano duos, string duets — each one shaped by a person, a parish, or a moment that refused to leave me until it became music.",
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

        {/* Bio */}
        <Section delay={100}>
          <div className="glass-card mt-16 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Music size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-display font-semibold">My Story</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm Boniface Kagunda, a Kenyan composer and music arranger with a deep passion
                for sacred and liturgical music. My journey began in the church choir, where I
                discovered the power of well-crafted harmony to move hearts and elevate worship.
              </p>
              <p>
                Today, I compose original works for piano, strings, and mixed vocal ensembles.
                My repertoire spans piano duos, string duets, mixed trios, and quartets —
                all written with care for the liturgical moment they serve.
              </p>
              <p>
                Every composition I create is rooted in a desire to serve the sacred —
                music that helps congregations pray, praise, and connect with something
                greater than themselves.
              </p>
            </div>
          </div>
        </Section>

        {/* Mirrored Story — A Composer's Confession */}
        <Section delay={200}>
          <article
            className="glass-card mt-6 max-w-3xl mx-auto relative overflow-hidden"
            aria-labelledby="confession-heading"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 font-body inline-flex items-center gap-2">
                <Feather size={12} /> A Composer's Confession
              </p>
              <h2
                id="confession-heading"
                className="text-2xl sm:text-3xl font-display font-bold mb-5 leading-tight"
              >
                Music chose me <span className="text-primary">long before</span> I learned
                to <span className="text-accent">choose music</span>.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Most of my pieces did not start at a desk. They began in the in-between moments —
                  walking home after a vigil, sitting at a piano nobody else was using, listening
                  to a grieving family hum a tune they did not know they were inventing.
                </p>
                <p>
                  I think of composition less as <span className="text-foreground">writing</span> and more as
                  <span className="text-foreground"> remembering</span> — recovering melodies the moment already carried,
                  and giving them a shape a choir can hold.
                </p>
                <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 flex gap-2">
                  <Quote size={16} className="text-primary shrink-0 mt-1" />
                  <span>
                    "If a single soul in the pew breathes a little deeper because of a chord I wrote,
                    the score has done its job."
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

        {/* Karibu — Welcome */}
        <Section delay={250}>
          <div className="glass-card mt-6 max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <div className="flex justify-center mb-3 gap-2 items-center">
                <Hand size={24} className="text-accent" style={{ animation: "wave 2.4s ease-in-out infinite", transformOrigin: "70% 70%" }} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Karibu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                Pull up a chair. <span className="text-primary">The kettle is on.</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Most websites greet you with a résumé. I would rather greet you the way my mother
                greets every guest at the door — with both hands, a small bow, and the quiet
                promise that you will not leave hungry. So: <span className="text-foreground">karibu</span>.
                Stay as long as you like. The music here was written for someone exactly like you.
              </p>
            </div>
          </div>
        </Section>

        {/* My Passion */}
        <Section delay={300}>
          <div className="glass-card mt-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-accent/10">
                <HandHeart size={20} className="text-accent" />
              </div>
              <h2 className="text-lg font-display font-semibold">My Passion</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I am quietly obsessed with the moment a congregation stops <span className="text-foreground">listening</span> to
                a song and starts <span className="text-foreground">becoming</span> it — when the printed notes
                disappear and what remains is one breath, one heart, one rising sound.
              </p>
              <p>
                That moment is what I chase every time I sit down to write. Not applause, not
                streams, not perfect counterpoint — just that holy hush right before the room
                opens its mouth and sings something it did not know it knew.
              </p>
              <p className="text-foreground/90 italic">
                Sacred music, for me, is not a genre. It is a form of hospitality — making room
                in sound for everyone who walks in.
              </p>
            </div>
          </div>
        </Section>

        {/* Why Choose Me */}
        <Section delay={400}>
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="text-center mb-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Why work with me</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">
                Five reasons your choir will <span className="text-accent">thank you</span>.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  Icon: Headphones,
                  title: "Singable on the first Sunday",
                  text: "Every voicing is tested in real choir lofts — not just on a screen. Your sopranos will reach the high notes; your basses will not need oxygen.",
                },
                {
                  Icon: Globe2,
                  title: "Rooted in African worship",
                  text: "Swahili lyricism, call-and-response instincts, and parish realities are baked into the score — not bolted on as decoration.",
                },
                {
                  Icon: Award,
                  title: "Liturgically faithful",
                  text: "Every Mass setting respects the rite — Kyrie, Gloria, Sanctus, Agnus Dei — so your celebrant never has to apologise for the music.",
                },
                {
                  Icon: Clock,
                  title: "Delivered on time, every time",
                  text: "Commission a piece for Easter and you will rehearse it in Lent — not on Holy Saturday morning. Promised.",
                },
                {
                  Icon: HandHeart,
                  title: "Personal, not pre-packaged",
                  text: "Tell me about your choir, your patron saint, your grieving family, your wedding couple. I will write the piece that belongs only to that moment.",
                },
                {
                  Icon: Sparkles,
                  title: "Free MuseScore parts forever",
                  text: "Every commissioned score includes downloadable individual parts for every voice and instrument — keep them, share them, sing them again next year.",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="glass-card group hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                      <r.Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm mb-1.5">{r.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
