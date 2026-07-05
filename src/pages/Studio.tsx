import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle, Clock, Bot, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

type Action = {
  id: string;
  kind: string;
  status: string;
  subject_id: string | null;
  summary: string;
  payload: any;
  error: string | null;
  created_at: string;
};

type Settings = { enabled: boolean; auto_reply_inquiries: boolean; notify_email: string };

export default function Studio() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/auth", { replace: true }); return; }
      const { data: user } = await supabase.auth.getUser();
      setUserEmail(user.user?.email ?? null);

      const { data: roles } = await supabase.from("user_roles").select("role");
      const admin = (roles ?? []).some((r: any) => r.role === "admin");
      setIsAdmin(admin);
      setReady(true);

      if (admin) {
        await Promise.all([loadActions(), loadSettings()]);
      }
    })();
  }, [navigate]);

  async function loadActions() {
    const { data } = await supabase
      .from("agent_actions").select("*")
      .order("created_at", { ascending: false }).limit(50);
    setActions((data ?? []) as Action[]);
  }

  async function loadSettings() {
    const { data } = await supabase.from("agent_settings").select("*").eq("id", 1).maybeSingle();
    if (data) setSettings(data as Settings);
  }

  async function toggle(field: "enabled" | "auto_reply_inquiries", value: boolean) {
    const { error } = await supabase.from("agent_settings").update({ [field]: value, updated_at: new Date().toISOString() }).eq("id", 1);
    if (error) { toast.error(error.message); return; }
    toast.success("Updated");
    loadSettings();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  if (!ready) return <div className="pt-28 text-center text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-12 container mx-auto px-6 max-w-2xl">
          <div className="glass-card p-8 text-center">
            <h1 className="font-display text-2xl mb-3">Not authorized</h1>
            <p className="text-muted-foreground mb-6 text-sm">
              You're signed in as <span className="text-foreground">{userEmail}</span>, but this account isn't an admin.
              Ask Boniface to run the promotion SQL for your user id, then reload.
            </p>
            <Button onClick={signOut} variant="outline"><LogOut size={14} /> Sign out</Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title="Studio Agent — BK Music" description="AI agent activity log and controls." path="/studio" />
      <Navbar />
      <main className="pt-28 pb-16 container mx-auto px-6 max-w-5xl">
        <header className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 inline-flex items-center gap-2">
              <Bot size={12} /> Studio Agent
            </p>
            <h1 className="font-display text-4xl font-bold text-gradient">Agent Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-2">Signed in as {userEmail}</p>
          </div>
          <Button onClick={signOut} variant="outline" size="sm"><LogOut size={14} /> Sign out</Button>
        </header>

        {settings && (
          <section className="glass-card p-6 mb-8">
            <h2 className="font-display text-lg font-semibold mb-4">Controls</h2>
            <div className="space-y-4">
              <ToggleRow
                label="Agent enabled"
                description="Global kill switch. When off, the agent does nothing."
                value={settings.enabled}
                onChange={(v) => toggle("enabled", v)}
              />
              <ToggleRow
                label="Auto-reply to inquiries"
                description="Draft (and eventually send) replies to new commission and contact messages."
                value={settings.auto_reply_inquiries}
                onChange={(v) => toggle("auto_reply_inquiries", v)}
              />
              <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                Notifications & digest email: <span className="text-foreground">{settings.notify_email}</span>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Recent activity</h2>
            <Button variant="ghost" size="sm" onClick={loadActions}>Refresh</Button>
          </div>

          {actions.length === 0 ? (
            <div className="glass-card p-8 text-center text-sm text-muted-foreground">
              No agent activity yet. When a visitor submits a form or the agent runs, it will show up here.
            </div>
          ) : (
            <ul className="space-y-3">
              {actions.map((a) => (
                <li key={a.id} className="glass-card p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={a.status} />
                      <Badge variant="outline" className="text-[10px]">{a.kind}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-2">{a.summary}</p>
                  {a.payload?.body && (
                    <details className="mt-3">
                      <summary className="text-xs text-primary cursor-pointer hover:underline">View draft</summary>
                      <div className="mt-2 p-3 rounded bg-secondary/60 text-xs whitespace-pre-wrap font-mono">
                        <div className="text-muted-foreground mb-2">
                          <strong>To:</strong> {a.payload.to}<br />
                          <strong>Subject:</strong> {a.payload.subject}
                        </div>
                        {a.payload.body}
                      </div>
                    </details>
                  )}
                  {a.error && <p className="text-xs text-destructive mt-2">{a.error}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function ToggleRow({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "success") return <CheckCircle2 size={14} className="text-primary" />;
  if (status === "failed") return <XCircle size={14} className="text-destructive" />;
  return <Clock size={14} className="text-muted-foreground" />;
}
