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
import { Send, Mail, MapPin, Phone, Music, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const contactSubtitles = [
  "Need a custom arrangement for your choir? Let's talk.",
  "Commission a piece — from offertory hymns to full mass settings.",
  "Whether it's a piano duo or a four-part harmony, I'm ready to compose for you.",
  "Let's create music that moves your congregation.",
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
    const email = (formData.get("email") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();

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
              <div className="glass-card flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-body text-foreground">Kagundaboniface98@gmail.com</p>
                </div>
              </div>
            </Section>
            <Section delay={150}>
              <div className="glass-card flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Call Me</p>
                  <a href="tel:+254757394587" className="text-sm font-body text-foreground hover:text-primary transition-colors block">0757 394 587</a>
                  <a href="tel:+254104586361" className="text-sm font-body text-foreground hover:text-primary transition-colors block">0104 586 361</a>
                  <p className="text-[10px] text-muted-foreground mt-1 italic">For calls only — not WhatsApp</p>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your name" required minLength={3} className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
                <input type="email" name="email" placeholder="Your email" required className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
              </div>
              <input type="text" name="subject" placeholder="Subject (e.g. Commission request)" required className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
              <textarea name="message" placeholder="Tell me about the piece you'd like me to compose..." required minLength={10} rows={6} className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow resize-none" />
              <button type="submit" disabled={sending} className="btn-primary justify-center mt-1 group">
                {sending ? "Sending..." : (<>Send Message <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></>)}
              </button>
            </form>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
