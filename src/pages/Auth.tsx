import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/studio", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/studio", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
      const { error } = await fn({
        email, password,
        ...(mode === "signup" && { options: { emailRedirectTo: `${window.location.origin}/studio` } }),
      } as any);
      if (error) throw error;
      if (mode === "signup") toast.success("Check your email to confirm your account.");
    } catch (err: any) {
      toast.error(err.message ?? "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/studio`,
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message ?? "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Studio Sign In — BK Music" description="Admin sign in for the BK Music studio agent dashboard." path="/auth" />
      <Navbar />
      <main className="pt-28 pb-12 container mx-auto px-6 max-w-md">
        <div className="glass-card p-8">
          <h1 className="font-display text-3xl font-bold mb-2 text-gradient">Studio Sign In</h1>
          <p className="text-sm text-muted-foreground mb-6">Access the AI agent dashboard.</p>

          <Button onClick={google} disabled={busy} className="w-full mb-4" variant="outline">
            Continue with Google
          </Button>

          <div className="ornament-divider text-xs mb-4">or with email</div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" disabled={busy} className="w-full btn-primary">
              {busy ? "Working..." : mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground w-full text-center"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
    </>
  );
}
