import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { toast } from "sonner";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-6 max-w-xl">
        <Section>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mt-12">
            Contact Me
          </h1>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Got a project or idea? Let's talk.
          </p>
        </Section>

        <Section delay={150}>
          <form onSubmit={handleSubmit} className="glass-card mt-12 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              minLength={3}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            />
            <textarea
              placeholder="Message"
              required
              minLength={10}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow resize-none"
            />
            <button type="submit" disabled={sending} className="btn-primary justify-center mt-2">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </Section>
      </main>
      <Footer />
    </>
  );
}
