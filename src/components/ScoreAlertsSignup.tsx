import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BellRing, Loader2, CheckCircle2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ScoreAlertsSignup() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value) || value.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("score_subscribers").insert({ email: value });
    setBusy(false);
    if (error) {
      // Duplicate email is a success from the visitor's point of view.
      if (error.code === "23505") {
        setDone(true);
        return;
      }
      toast.error("Could not save your email. Please try again.");
      return;
    }
    setDone(true);
    toast.success("You're on the list — new scores will land in your inbox.");
  };

  if (done) {
    return (
      <div className="glass-card text-center py-8">
        <CheckCircle2 size={26} className="text-primary mx-auto mb-3" />
        <h3 className="font-display font-semibold text-lg mb-1">You're on the list</h3>
        <p className="text-xs text-muted-foreground">
          Every time a new composition is published, you'll be the first to know.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card">
      <div className="text-center mb-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-2">
          <BellRing size={12} /> New score alerts
        </p>
        <h3 className="font-display text-xl sm:text-2xl font-bold">
          Hear every <span className="text-gradient">new composition</span> first.
        </h3>
        <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          One short email whenever a fresh score is published — no newsletters, no noise.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          type="email"
          required
          maxLength={255}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
        />
        <button type="submit" disabled={busy} className="btn-primary justify-center disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <BellRing size={16} />}
          {busy ? "Adding…" : "Notify me"}
        </button>
      </div>
    </form>
  );
}
