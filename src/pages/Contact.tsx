import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import {
  Mail, MapPin, Phone, Music, Facebook, Instagram, Linkedin, Youtube,
  Sparkles, Heart, Clock, Mic, Quote, Users, BookOpen, Crown, Feather, Handshake, Headphones,
  MessageCircle, HelpCircle, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useNairobiClock } from "@/hooks/useNairobiClock";
import serviceLiturgical from "@/assets/service-liturgical.jpg";
import serviceFestivals from "@/assets/service-festivals.jpg";
import servicePsalms from "@/assets/service-psalms.jpg";
import serviceArrangements from "@/assets/service-arrangements.jpg";
import serviceWeddings from "@/assets/service-weddings.jpg";
import serviceCommissions from "@/assets/service-commissions.jpg";

const contactSubtitles = [
  "Open for collaborations — reach out any time, any zone.",
  "Choirs, cantors, soloists, parishes — there's a song for you here.",
  "Have a melody in mind? Hum it. Send it. I'll write it.",
  "Music shaped to your voice, your moment, your prayer.",
];

const services = [
  {
    image: serviceLiturgical,
    title: "Catholic Liturgical Music",
    desc: "Mass settings, communion hymns, offertory pieces, and entrance antiphons crafted to follow the rhythm of the liturgy and elevate every part of the celebration.",
    tags: ["Mass Settings", "Offertory", "Communion", "Entrance"],
  },
  {
    image: servicePsalms,
    title: "Responsorial Psalms",
    desc: "Fresh, singable psalm settings — written so the cantor leads with confidence and the assembly answers with joy.",
    tags: ["Cantor", "Assembly", "Lectionary"],
  },
  {
    image: serviceFestivals,
    title: "Festival & Feast Day Pieces",
    desc: "Bold, joyful compositions for Easter, Christmas, Marian feasts, ordinations, and parish jubilees — music that turns a celebration into a memory.",
    tags: ["Easter", "Christmas", "Marian", "Jubilees"],
  },
  {
    image: serviceArrangements,
    title: "SATB & Multi-Part Arrangements",
    desc: "Existing hymns reimagined for SATB, SAB, SSA, or unison voices — arranged thoughtfully around your choir's actual voice ranges and skill level.",
    tags: ["SATB", "SAB", "SSA", "Unison"],
  },
  {
    image: serviceWeddings,
    title: "Weddings & Sacraments",
    desc: "Music for weddings, baptisms, confirmations, and funerals — tender, dignified, and shaped to the personal story behind the moment.",
    tags: ["Weddings", "Baptism", "Funerals"],
  },
  {
    image: serviceCommissions,
    title: "Solo Catholic Artists",
    desc: "Bespoke songs for solo artists carrying the gospel through their own voice — custom-pitched to your range, with sheet music, chord chart, backing track and guide vocal included.",
    tags: ["Custom Key", "Chord Chart", "Backing Track", "Guide Vocal"],
  },
];

const audiences = [
  {
    icon: Users,
    color: "text-primary",
    title: "Are you a Choir Director?",
    body: "I write SATB, SAB, and SSA arrangements that respect your singers' actual ranges. You'll get clean PDFs, sensible page turns, and rehearsal-ready voicings — not textbook fantasies.",
    cta: "Commission a choir piece",
  },
  {
    icon: Crown,
    color: "text-accent",
    title: "Are you a Cantor needing a Psalm?",
    body: "Responsorial psalms set to fresh, lyrical melodies — easy for the assembly to grasp on the first hearing, dignified enough to carry the Word. I tailor it to your voice and the day's reading.",
    cta: "Request a custom psalm",
  },
  {
    icon: Mic,
    color: "text-primary",
    title: "Are you a Solo Catholic Artist?",
    body: "Tell me your story, your voice type, your favourite scripture. You'll receive a song built for you — sheet music in your key, chord chart, backing track, and a guide vocal to learn from.",
    cta: "Order your song",
  },
  {
    icon: BookOpen,
    color: "text-accent",
    title: "Are you a Parish or Movement?",
    body: "Jubilees, ordinations, novenas, patronal feasts — I compose pieces your community will return to year after year. Bilingual welcome: Kiswahili, Latin, English, or all three at once.",
    cta: "Commission a parish piece",
  },
  {
    icon: Headphones,
    color: "text-primary",
    title: "Have a melody already in your head?",
    body: "Hum it into your phone. Sing it badly. Sketch the chords on paper. Send it to me and I'll turn that whisper into a finished, beautifully notated score with full harmony.",
    cta: "Send your melody",
  },
  {
    icon: Handshake,
    color: "text-accent",
    title: "Looking to collaborate?",
    body: "Composers, lyricists, producers, choirs, schools of music — I'm always open to writing with others. If you have a project that needs a sacred touch, let's talk.",
    cta: "Start a collaboration",
  },
];

const gmailLink = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com&su=${encodeURIComponent(subject)}`;

const faqs = [
  {
    q: "How long does a commission take?",
    a: "Most pieces take 2–4 weeks from first sketch to finished score. Rush jobs are possible — let me know your deadline up front and I'll be honest about whether it can be done well in the time you have.",
  },
  {
    q: "Do you write in Kiswahili, English, Latin?",
    a: "All three, often in the same piece. Tell me which liturgical languages your community uses, and I'll shape the text accordingly.",
  },
  {
    q: "What do I receive when the song is done?",
    a: "A clean PDF score, MIDI file, an MP3 mock-up, and (for soloists) a backing track and guide vocal — everything you need to learn the piece without me there.",
  },
  {
    q: "How do payments work?",
    a: "A small deposit confirms the brief; the rest is due once you've heard a draft you love. M-Pesa, bank transfer, and international options are all supported.",
  },
  {
    q: "Can I request edits after delivery?",
    a: "Yes — two rounds of revisions are included on every commission. Beyond that we can talk, but it's almost never needed.",
  },
];

export default function Contact() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Let's Make Music Together", 70, 200, true, 60000);
  const subtitle = useRotatingSubtitles(contactSubtitles, 8000);
  const nairobiTime = useNairobiClock();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6">
        {/* Hero */}
        <Section>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mt-12"
            style={{ color: headingColor, transition: "color 1.5s ease" }}
          >
            {heading.revealed}
            {!heading.done && <span className="typing-cursor" />}
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-md mx-auto transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        {/* Availability banner */}
        <Section delay={80}>
          <div className="mt-10 max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <p className="text-sm sm:text-base font-display font-semibold">Open for collaborations</p>
              </div>
              <span className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-accent" />
                <span className="text-foreground">Nairobi · <span className="font-mono tabular-nums">{nairobiTime}</span></span>
              </div>
              <span className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <Handshake size={16} className="text-primary" />
                <span className="text-foreground">Choirs · Cantors · Soloists · Parishes</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Quick Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
          <Section delay={100}>
            <a
              href={gmailLink("Music Inquiry")}
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-start gap-3 hover:border-primary/50 transition-all group h-full"
            >
              <Mail size={20} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-muted-foreground">Email — opens Gmail</p>
                <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors break-all">Kagundaboniface98@gmail.com</p>
              </div>
            </a>
          </Section>
          <Section delay={150}>
            <a href="tel:+254104586361" className="glass-card flex items-start gap-3 h-full hover:border-primary/50 transition-all group">
              <Phone size={20} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-muted-foreground">Call (voice only)</p>
                <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors">0104 586 361</p>
              </div>
            </a>
          </Section>
          <Section delay={200}>
            <a
              href="https://wa.me/254104586361?text=Habari%20Boniface%2C%20I%27d%20like%20to%20talk%20about%20a%20song."
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-start gap-3 h-full hover:border-primary/50 transition-all group"
            >
              <MessageCircle size={20} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-xs text-muted-foreground">WhatsApp chat</p>
                <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors">Message me directly</p>
              </div>
            </a>
          </Section>
          <Section delay={250}>
            <div className="glass-card flex items-start gap-3 h-full">
              <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Based In</p>
                <p className="text-sm font-body text-foreground">Kenya · Worldwide</p>
              </div>
            </div>
          </Section>
        </div>

        {/* Services with images */}
        <Section delay={150}>
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
                <Sparkles size={12} /> What I Offer
              </p>
              <h2
                className="text-3xl sm:text-4xl font-display font-bold mb-3"
                style={{ color: headingColor, transition: "color 1.5s ease" }}
              >
                Music Crafted for Every Sacred Moment
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                A complete catalogue of services — from full Mass settings to a single song shaped to your voice.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <Section key={s.title} delay={i * 80}>
                  <article className="glass-card glow-border h-full flex flex-col overflow-hidden p-0 group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-display font-semibold text-lg leading-tight">{s.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {s.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-body tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Section>
              ))}
            </div>
          </div>
        </Section>

        {/* Got a melody? */}
        <Section delay={150}>
          <div className="mt-20 max-w-4xl mx-auto glass-card glow-border relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/15 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-6 items-center">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 inline-flex w-fit mx-auto md:mx-0">
                <Headphones size={36} className="text-primary" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Got a tune in your head?</p>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                  If you already have a melody you want — <span className="text-primary">I'll bring it to life.</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Hum it into your phone, sing it on a voice note, sketch it on paper, or describe it in words.
                  I'll arrange it, harmonise it, and deliver a finished score with backing track — fully yours.
                </p>
                <a href={gmailLink("I have a melody — please help me build it")} target="_blank" rel="noreferrer" className="btn-primary inline-flex">
                  <Mail size={14} /> Send Me Your Melody
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Audience advertisements */}
        <Section delay={150}>
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 inline-flex items-center gap-2">
                <Feather size={12} /> Who I Write For
              </p>
              <h2
                className="text-3xl sm:text-4xl font-display font-bold mb-3"
                style={{ color: headingColor, transition: "color 1.5s ease" }}
              >
                Find your invitation below.
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Pick the line that sounds like you — and let's begin.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {audiences.map((a, i) => (
                <Section key={a.title} delay={i * 80}>
                  <div className="glass-card h-full flex flex-col group hover:-translate-y-1 transition-transform duration-500">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 shrink-0">
                        <a.icon size={22} className={a.color} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-base mb-2">{a.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{a.body}</p>
                        <a
                          href={gmailLink(a.title)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs color-shift inline-flex items-center gap-1.5 font-body tracking-wide"
                        >
                          {a.cta} →
                        </a>
                      </div>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </Section>

        {/* Socials */}
        <Section delay={200}>
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted-foreground tracking-wide uppercase mb-4">Find me online</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "https://musescore.com/user/108485503", icon: Music, label: "MuseScore" },
                { href: "https://www.linkedin.com/in/BonifaceKagunda", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/bonifacekagunda39/", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/profile.php?id=61550230027573", icon: Facebook, label: "Facebook" },
                { href: "https://www.youtube.com/@BonifaceKagunda006", icon: Youtube, label: "YouTube" },
                { href: "https://www.tiktok.com/@b.o.n.i.5090", icon: Music, label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card flex items-center gap-2 text-sm color-shift px-4 py-2.5"
                >
                  <s.icon size={16} /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* Asante — bottom thank-you */}
        <Section delay={250}>
          <div className="mt-20 max-w-3xl mx-auto text-center relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-2xl" aria-hidden />
            <div className="rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md p-8 sm:p-10">
              <Heart size={28} className="text-accent mx-auto mb-3" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Asante sana · Thank you</p>
              <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-4">
                For visiting, for listening, for singing along.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto">
                Whether you came to download a score, commission a piece, or simply to listen — your presence here means more than you know.
                Every note on this site exists because someone, somewhere, decided that prayer deserved a melody. Thank you for being part of that long, beautiful song.
              </p>
              <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/85 text-sm max-w-md mx-auto text-left">
                <Quote size={14} className="inline text-primary mr-1 -mt-1" />
                "Mungu hupenda anayetoa kwa furaha." — God loves a cheerful giver.
                <span className="block text-[11px] text-muted-foreground not-italic mt-1">— 2 Wakorintho 9:7</span>
              </blockquote>
              <p className="mt-6 text-xs text-muted-foreground">
                — With gratitude, <span className="text-foreground font-display font-semibold">Boniface Kagunda</span>
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
