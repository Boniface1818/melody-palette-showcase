import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useBackgroundCycle } from "@/hooks/useBackgroundCycle";
import { useColorCycle } from "@/hooks/useColorCycle";
import { useRotatingSubtitles } from "@/hooks/useRotatingSubtitles";
import { useTextReveal } from "@/hooks/useTextReveal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Send, Mail, MapPin, Phone, Music, Facebook, Instagram, Linkedin, Youtube, Sparkles, Church, Heart, Calendar } from "lucide-react";

const contactSubtitles = [
  "Need a custom arrangement for your choir? Let's talk.",
  "Commission a piece — from offertory hymns to full mass settings.",
  "Whether it's a piano duo or a four-part harmony, I'm ready to compose for you.",
  "Let's create music that moves your congregation.",
];

const services = [
  { icon: Church, title: "Catholic Liturgical Music", desc: "Mass settings, offertory hymns, communion pieces & responsorial psalms tailored to the liturgical calendar." },
  { icon: Calendar, title: "Festivals & Special Events", desc: "Custom compositions for Easter, Christmas, Marian feasts, weddings, ordinations & jubilees." },
  { icon: Heart, title: "Choir Arrangements", desc: "SATB, SAB, and unison arrangements crafted for your choir's voice ranges and skill level." },
  { icon: Sparkles, title: "Original Commissions", desc: "Bespoke pieces from solo instruments to full ensembles — bring your vision to life through music." },
];

export default function Contact() {
  useBackgroundCycle(5000);
  const [sending, setSending] = useState(false);
  const headingColor = useColorCycle(3000);
  const heading = useTextReveal("Get in Touch", 80, 200, true, 60000);
  const subtitle = useRotatingSubtitles(contactSubtitles, 8000);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();
    // Email is optional now — users are encouraged to email directly via the mailto link
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@no-reply.bkmusic.local`;

    const { error } = await supabase.from("contact_submissions").insert({ name, email, subject, message });

    setSending(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Message sent! I'll get back to you soon.");
    form.reset();
  };

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
          <p className="text-center text-muted-foreground text-sm mt-4 max-w-sm mx-auto transition-opacity duration-700">
            {subtitle}
          </p>
        </Section>

        <div className="grid md:grid-cols-5 gap-8 mt-16 max-w-4xl mx-auto">
          {/* Sidebar */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Section delay={100}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com&su=Music%20Commission%20Inquiry"
                target="_blank"
                rel="noreferrer"
                className="glass-card flex items-start gap-3 hover:border-primary/50 transition-all group"
              >
                <Mail size={18} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground">Email — click to open Gmail</p>
                  <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors break-all">Kagundaboniface98@gmail.com</p>
                </div>
              </a>
            </Section>
            <Section delay={150}>
              <div className="glass-card flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Call Me</p>
                  <a href="tel:+254104586361" className="text-sm font-body text-foreground hover:text-primary transition-colors block">0104 586 361</a>
                </div>
              </div>
            </Section>
            <Section delay={200}>
              <div className="glass-card flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-body text-foreground">Kenya</p>
                </div>
              </div>
            </Section>
            <Section delay={300}>
              <div className="glass-card space-y-3">
                <p className="text-xs text-muted-foreground">Find me online</p>
                {[
                  { href: "https://musescore.com/user/108485503", icon: Music, label: "MuseScore" },
                  { href: "https://www.linkedin.com/in/BonifaceKagunda", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://www.instagram.com/bonifacekagunda39/", icon: Instagram, label: "Instagram" },
                  { href: "https://www.facebook.com/profile.php?id=61550230027573", icon: Facebook, label: "Facebook" },
                  { href: "https://www.youtube.com/@BonifaceKagunda006", icon: Youtube, label: "YouTube" },
                  { href: "https://www.tiktok.com/@b.o.n.i.5090", icon: Music, label: "TikTok" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm color-shift">
                    <s.icon size={16} /> {s.label}
                  </a>
                ))}
              </div>
            </Section>
          </div>

          {/* Form */}
          <Section delay={150} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5">
              <input type="text" name="name" placeholder="Your name" required minLength={3} className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
              <input type="text" name="subject" placeholder="Subject (e.g. Catholic festival hymn, wedding mass...)" required className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
              <textarea name="message" placeholder="Tell me about the piece you'd like me to compose — the occasion, ensemble, mood, and any specific requirements..." required minLength={10} rows={7} className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow resize-none" />
              <button type="submit" disabled={sending} className="btn-primary justify-center mt-1 group">
                {sending ? "Sending..." : (<>Send Message <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></>)}
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                Prefer email? <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">Open Gmail directly</a>
              </p>
            </form>
          </Section>
        </div>

        {/* Services / What I Offer */}
        <Section delay={200}>
          <div className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-3" style={{ color: headingColor, transition: "color 1.5s ease" }}>
              Music Crafted for Every Sacred Moment
            </h2>
            <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mb-12">
              From the solemn beauty of a Catholic mass to the joyful celebration of a festival, I compose music that elevates the moment and touches the soul.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {services.map((s, i) => (
                <Section key={s.title} delay={i * 100}>
                  <div className="glass-card glow-border h-full flex items-start gap-4 group">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <s.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base mb-1.5">{s.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Section>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Kagundaboniface98@gmail.com&su=Music%20Commission%20Inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex"
              >
                <Sparkles size={14} /> Start Your Commission Today
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
