import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import {
  Mail, MapPin, Phone, Music, Facebook, Instagram, Linkedin, Youtube,
  Sparkles, Heart, Award, Clock, CheckCircle2, Flame, ArrowRight,
} from "lucide-react";
import serviceLiturgical from "@/assets/service-liturgical.jpg";
import serviceFestivals from "@/assets/service-festivals.jpg";
import servicePsalms from "@/assets/service-psalms.jpg";
import serviceArrangements from "@/assets/service-arrangements.jpg";
import serviceWeddings from "@/assets/service-weddings.jpg";
import serviceCommissions from "@/assets/service-commissions.jpg";

const contactSubtitles = [
  "Need a custom arrangement for your choir? Let's talk.",
  "Commission a piece — from offertory hymns to full mass settings.",
  "Whether it's a piano duo or a four-part harmony, I'm ready to compose for you.",
  "Let's create music that moves your congregation.",
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
    desc: "Sunday-by-Sunday responsorial psalms set to fresh, singable melodies — written so the cantor leads with confidence and the assembly responds with joy.",
    tags: ["Cantor", "Assembly", "Lectionary-aligned"],
  },
  {
    image: serviceFestivals,
    title: "Festival & Feast Day Pieces",
    desc: "Bold, joyful compositions for Easter, Christmas, Marian feasts, patronal days, ordinations, and parish jubilees — music that turns a celebration into a memory.",
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
    title: "Original Commissions",
    desc: "Bespoke compositions written from the ground up — solo piano, chamber ensembles, full choir works. Bring me your vision and I'll bring it to life on the page.",
    tags: ["Original", "Custom", "Any Ensemble"],
  },
];

const reasons = [
  { icon: Award, title: "A Composer Who Reads the Room", desc: "I write for the choir you actually have — not the one a textbook imagines. Every voicing sits where your singers truly live, and the assembly's part is always within reach of the back pew." },
  { icon: Heart, title: "Liturgy First, Ego Never", desc: "The rite leads; the music follows. My name vanishes the moment the assembly opens its mouth — and that is exactly the success I'm chasing on every commission." },
  { icon: Clock, title: "Honest Timelines, Clean Scores", desc: "You receive a clear schedule, drafts you can react to, and final PDFs that print cleanly with sensible page turns. No surprises the Saturday before Sunday." },
  { icon: CheckCircle2, title: "Built to Be Sung Again", desc: "I write pieces a parish can return to for years — singable on the first rehearsal, still meaningful on the fiftieth Sunday. Lasting music, not novelty." },
];

export default function Contact() {
  useBackgroundCycle(5000);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Let's Make Music Together", 70, 200, true, 60000);
  const subtitle = useRotatingSubtitles(contactSubtitles, 8000);

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

        {/* Quick Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <Section delay={100}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com&su=Music%20Commission%20Inquiry"
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
            <div className="glass-card flex items-start gap-3 h-full">
              <Phone size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Call Me</p>
                <a href="tel:+254104586361" className="text-sm font-body text-foreground hover:text-primary transition-colors block">0104 586 361</a>
              </div>
            </div>
          </Section>
          <Section delay={200}>
            <div className="glass-card flex items-start gap-3 h-full">
              <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Based In</p>
                <p className="text-sm font-body text-foreground">Kenya · Available Worldwide</p>
              </div>
            </div>
          </Section>
        </div>

        {/* Services with images */}
        <Section delay={150}>
          <div className="mt-24 max-w-6xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-display font-bold text-center mb-3"
              style={{ color: headingColor, transition: "color 1.5s ease" }}
            >
              Music Crafted for Every Sacred Moment
            </h2>
            <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mb-12">
              From the solemn beauty of a Sunday Mass to the joyful explosion of a feast day —
              here's what I compose, arrange, and bring to life for you.
            </p>
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

        {/* Why Choose Me */}
        <Section delay={150}>
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-body tracking-wide mb-4">
                <Sparkles size={12} /> Why Choose Me
              </div>
              <h2
                className="text-3xl sm:text-4xl font-display font-bold mb-3"
                style={{ color: headingColor, transition: "color 1.5s ease" }}
              >
                Music Written With Devotion, Delivered With Care
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                You're not just hiring a composer — you're partnering with someone who treats
                your liturgy and your choir with the reverence they deserve.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => (
                <Section key={r.title} delay={i * 100}>
                  <div className="glass-card flex items-start gap-4 h-full">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 shrink-0">
                      <r.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base mb-1">{r.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </Section>

        {/* Passion / What Drives Me */}
        <Section delay={150}>
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="glass-card glow-border relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-wide mb-4">
                  <Flame size={12} /> My Passion · What Drives Me
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold mb-5"
                  style={{ color: headingColor, transition: "color 1.5s ease" }}
                >
                  The Hymn the Assembly Carries Home
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    What drives me is a small, stubborn picture: a mother walking out of Mass with
                    a melody still folded in her chest — humming it later that afternoon while she
                    cooks, while she scolds a child, while she prays in the dark. <span className="text-foreground font-semibold">That hum is the
                    real concert hall.</span> Every score I write is built to survive that journey home.
                  </p>
                  <p>
                    My passion is not for music in the abstract. It is for the
                    <span className="text-foreground"> specific Sunday</span>, the specific psalm,
                    the specific choir of seven faithful people who keep showing up. I write so the
                    cantor breathes easily, the alto trusts the line, the bass finds the note without
                    a piano, and the assembly is invited — never ambushed.
                  </p>
                  <p className="text-foreground italic">
                    "Cantare amantis est." — Singing belongs to the one who loves. (St. Augustine)
                  </p>
                  <p>
                    Every commission you trust me with becomes one more thread in that long, quiet
                    song the Church has been singing for two thousand years. I do not take that lightly.
                    I take it as a privilege.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com&su=Music%20Commission%20Inquiry"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary group"
                  >
                    <Sparkles size={14} /> Start Your Commission
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="tel:+254104586361"
                    className="btn-primary"
                    style={{ background: "transparent", border: "1px solid hsl(var(--border))" }}
                  >
                    <Phone size={14} /> Call 0104 586 361
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Thank You Note to Commissioners */}
        <Section delay={150}>
          <div className="mt-16 max-w-3xl mx-auto">
            <article className="glass-card relative overflow-hidden text-center">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-body tracking-wide mb-5">
                  <Heart size={12} /> A Note of Thanks
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold mb-4"
                  style={{ color: headingColor, transition: "color 1.5s ease" }}
                >
                  To the One Who Commissions a Song
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  <p>
                    If you have ever entrusted me with a piece — a Mass setting, a wedding hymn,
                    a quiet psalm for a funeral, a song for a feast no one outside the parish
                    will ever hear — <span className="text-foreground font-semibold">thank you</span>.
                    Truly. You did not have to choose me, and you did.
                  </p>
                  <p>
                    A commission is not a transaction. It is a small act of faith: you handed me
                    a moment that mattered to you and asked me to clothe it in sound. I have
                    carried each one of those moments to the desk like a candle, hands cupped,
                    afraid of the wind.
                  </p>
                  <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/90 text-left max-w-xl mx-auto my-4">
                    "Every song you commission outlives the cheque. It becomes someone's first
                    Communion, someone's last farewell, someone's quiet Tuesday in the car. You
                    paid for paper — but you gifted a parish a memory."
                  </blockquote>
                  <p>
                    So from this small desk in Kenya, with a pencil that has seen better days
                    and a heart that has not stopped being grateful — <span className="text-primary font-semibold">asante sana</span>.
                    May the music serve you long after the last bar is sung.
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 pt-2">
                    — Boniface Kagunda
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Section>

        {/* Socials */}
        <Section delay={200}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
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
      </main>
      <Footer />
    </>
  );
}
