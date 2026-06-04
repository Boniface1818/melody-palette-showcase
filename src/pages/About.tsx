import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import {
  Music, Feather, Quote, Pen, Headphones, MapPin, Coffee, Mic2, Library, Lightbulb,
} from "lucide-react";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://bk-melodies.lovable.app/about",
  mainEntity: {
    "@type": "Person",
    name: "Boniface Kagunda",
    jobTitle: "Composer, Arranger & Songwriter",
    nationality: "Kenyan",
  },
};

const aboutSubtitles = [
  "A composer working one voice, one moment at a time.",
  "Original songs, sacred scores, and quiet, careful arrangements.",
  "From Nairobi to anywhere a song needs to be sung.",
];

const dayInTheStudio = [
  { icon: Coffee, time: "Early", title: "First light, first lines", text: "Coffee, a blank stave, and whatever melody followed me out of sleep. Most pieces start here as a single sung phrase." },
  { icon: Pen, time: "Mid-morning", title: "Writing the bones", text: "Voicings, harmony, form. The piece is sketched on paper before it ever touches a screen — keeps it honest." },
  { icon: Headphones, time: "Afternoon", title: "Listening tests", text: "Playback through small speakers, headphones, and a phone. If it survives all three, it survives a real congregation." },
  { icon: Mic2, time: "Evening", title: "Recording the guide", text: "A guide vocal so whoever sings it next can hear exactly how the melody breathes — long before our first call." },
];

const beliefs = [
  { icon: Lightbulb, title: "The melody is the gift", text: "Harmony serves melody, not the other way around. If you can hum it on the bus, it's nearly finished." },
  { icon: Library, title: "Singable beats clever", text: "I'd rather write a line a child can sing on Sunday than a passage only a professor could analyse." },
  { icon: Feather, title: "Quiet authorship", text: "My name belongs at the bottom of the page. The song belongs to the singer, and through them, to the room." },
];

export default function About() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Behind the Music", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(aboutSubtitles, 8000);

  return (
    <>
      <SEO
        title="About Boniface Kagunda — Composer & Arranger"
        description="Meet Boniface Kagunda — a Nairobi-based composer writing original songs, Mass settings, psalms, and bespoke scores for singers around the world."
        path="/about"
        jsonLd={aboutJsonLd}
      />
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

        {/* Intro card */}
        <Section delay={80}>
          <div className="glass-card shine mt-12 max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 font-body inline-flex items-center gap-2">
                <MapPin size={12} /> Nairobi, Kenya
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-4">
                Hello — I'm <span className="text-gradient">Boniface Kagunda</span>.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                I write songs. Some are sacred, some are personal, all of them are made for someone in particular.
                What follows isn't a CV — it's a short walk around the desk where the music gets made.
              </p>
            </div>
          </div>
        </Section>

        {/* Long form letter */}
        <Section delay={120}>
          <article className="mt-10 max-w-3xl mx-auto glass-card shine">
            <div className="flex items-center gap-2 mb-4">
              <Pen size={14} className="text-primary" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">A short letter</p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I came to composition the long way around — singing first, listening longer, and writing only when
                I could no longer find a song that said the thing I needed to say. That gap between what I felt and
                what existed is still where every new piece begins.
              </p>
              <p>
                Most of my work is sacred music — Mass settings, psalms, communion and offertory pieces — but the
                heart of the studio is bespoke songwriting. Birthdays, ordinations, weddings, graduations, ordinary
                Sundays that quietly mattered. Someone tells me about a moment; I send back a finished score.
              </p>
              <p>
                I keep the studio small on purpose. One project at a time, one voice at a time. It's the only way
                I know to make sure each page sounds like it was always meant for the person on the cover.
              </p>
              <p className="text-foreground">
                If you've read this far, you're already part of the music. Thank you.
              </p>
            </div>
          </article>
        </Section>

        {/* A day in the studio */}
        <Section delay={180}>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <Coffee size={12} /> A day in the studio
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight">
                How a piece actually <span className="text-gradient">comes together</span>.
              </h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dayInTheStudio.map((d) => (
                <li key={d.title} className="glass-card shine relative hover:-translate-y-1 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-2">{d.time}</p>
                  <d.icon size={20} className="text-accent mb-3" />
                  <h3 className="font-display font-semibold text-sm mb-1.5">{d.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Three beliefs */}
        <Section delay={220}>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Lightbulb size={12} /> Things I believe about songs
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Three short convictions.</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {beliefs.map((b) => (
                <div key={b.title} className="premium-card shine hover:-translate-y-1 transition-transform duration-500">
                  <b.icon size={22} className="text-primary mb-3" />
                  <h3 className="font-display font-semibold text-base mb-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Closing quote */}
        <Section delay={260}>
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <blockquote className="text-lg sm:text-xl font-display italic text-foreground/90 leading-relaxed">
              <Quote size={16} className="inline text-primary mr-2 -mt-1" />
              "I'm not trying to be the loudest voice in the room.
              I'm trying to write the song the room ends up singing on the way home."
            </blockquote>
            <p className="text-[10px] uppercase tracking-widest text-accent mt-4">— A note above the desk</p>
          </div>
        </Section>

        {/* Footer signature */}
        <Section delay={300}>
          <div className="mt-12 max-w-3xl mx-auto glass-card shine text-center">
            <Music size={20} className="text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              The catalog refreshes itself from MuseScore — so anything new on the desk shows up here automatically.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
