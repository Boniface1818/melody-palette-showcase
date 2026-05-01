import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const ensembles = [
  "Solo Catholic Artist",
  "Parish Choir (SATB)",
  "Cantor + Assembly",
  "Piano Duo",
  "String Duet",
  "Chamber Ensemble",
  "Other",
];

const occasions = [
  "Sunday Liturgy",
  "Wedding",
  "Funeral",
  "Ordination / Jubilee",
  "Easter / Christmas",
  "Marian Feast",
  "Personal Devotion",
  "Other",
];

export default function CommissionForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    occasion: "",
    ensemble: "",
    voice_type: "",
    deadline: "",
    message: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Almost there", description: "Name, email, and a short message are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const id = crypto.randomUUID();
    const { error } = await supabase.from("commission_inquiries").insert({ id, ...form });
    if (error) {
      setSubmitting(false);
      toast({ title: "Could not send your inquiry", description: error.message, variant: "destructive" });
      return;
    }

    // Fire-and-forget thank-you email. Silently no-ops if email infra is not yet configured.
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "commission-thank-you",
          recipientEmail: form.email,
          idempotencyKey: `commission-${id}`,
          templateData: {
            name: form.name,
            occasion: form.occasion,
            ensemble: form.ensemble,
          },
        },
      });
    } catch {
      // No-op — inquiry is safely stored either way.
    }

    setSubmitting(false);
    setDone(true);
    toast({
      title: "Asante sana — your inquiry is in",
      description: "A thank-you note is on its way to your inbox. I'll personally reply within 48 hours.",
    });
  };

  if (done) {
    return (
      <div className="glass-card text-center py-12">
        <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">Asante, {form.name.split(" ")[0]}.</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Your commission has been received. A thank-you note is on its way to{" "}
          <span className="text-foreground">{form.email}</span>. I'll reach out personally within 48 hours.
        </p>
        <p className="mt-5 text-xs italic text-accent">
          "Bwana akubariki na kukulinda." — May the Lord bless you and keep you.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:bg-secondary/60 transition-colors";

  return (
    <form onSubmit={onSubmit} className="glass-card space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Your name *</label>
          <input className={inputCls} placeholder="Jane Wanjiru" value={form.name} onChange={onChange("name")} required maxLength={120} />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Gmail / email *</label>
          <input type="email" className={inputCls} placeholder="you@gmail.com" value={form.email} onChange={onChange("email")} required maxLength={255} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Occasion</label>
          <select className={inputCls} value={form.occasion} onChange={onChange("occasion")}>
            <option value="">Pick one…</option>
            {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Ensemble</label>
          <select className={inputCls} value={form.ensemble} onChange={onChange("ensemble")}>
            <option value="">Pick one…</option>
            {ensembles.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Voice type (if solo)</label>
          <input className={inputCls} placeholder="Soprano, Tenor, Baritone…" value={form.voice_type} onChange={onChange("voice_type")} maxLength={60} />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Needed by</label>
          <input className={inputCls} placeholder="e.g. Easter Vigil 2026" value={form.deadline} onChange={onChange("deadline")} maxLength={100} />
        </div>
      </div>

      <div>
        <label className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Tell me about the song *</label>
        <textarea
          className={inputCls + " min-h-[120px] resize-y"}
          placeholder="The story, the moment, a lyric you love, a feeling you want the music to carry…"
          value={form.message}
          onChange={onChange("message")}
          required
          maxLength={4000}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center group disabled:opacity-60">
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {submitting ? "Sending your inquiry…" : "Commission a Song"}
      </button>

      <p className="text-[11px] text-muted-foreground/70 text-center">
        A thank-you note is auto-sent to your inbox · I personally reply within 48 hours
      </p>
    </form>
  );
}
