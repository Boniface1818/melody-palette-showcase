import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const NEXT_KEY = "bk_auth_next";

function safeNext(raw: string | null): string {
  if (!raw) return "/studio";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/studio";
  return raw;
}

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paramNext = params.get("next");
  const next = safeNext(paramNext ?? sessionStorage.getItem(NEXT_KEY));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (paramNext) sessionStorage.setItem(NEXT_KEY, paramNext);
    const finish = () => {
      sessionStorage.removeItem(NEXT_KEY);
      navigate(next, { replace: true });
    };
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) finish();
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next, paramNext]);

  function passwordProblem(pw: string): string | null {
    if (pw.length < 10) return "Password must be at least 10 characters.";
    if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw)) return "Password must include both upper and lower case letters.";
    if (!/[0-9]/.test(pw)) return "Password must include at least one number.";
    if (!/[^A-Za-z0-9]/.test(pw)) return "Password must include at least one symbol.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signup") {
      const problem = passwordProblem(password);
      if (problem) {
        toast.error(problem);
        return;
      }
    }
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
      }
    } catch (err: any) {
      toast.error("Sign-in failed. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      const { error, redirected } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      if (redirected) return;
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Sign In — BK Melodies" description="Sign in to your BK Melodies account with email or Google." path="/auth" />
      <Navbar />
      <main className="pt-28 pb-12 container mx-auto px-6 max-w-md">
        <div className="glass-card p-8">
          <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
            {mode === "signin" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with Google or your email to continue.
          </p>

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
