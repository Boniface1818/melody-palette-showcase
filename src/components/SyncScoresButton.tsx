import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  onSynced?: () => void;
  label?: string;
  variant?: "primary" | "ghost";
  /** Minimum ms between successful clicks (client-side debounce). */
  cooldownMs?: number;
}

const STORAGE_KEY = "bk_last_sync_ts";

export default function SyncScoresButton({
  onSynced,
  label = "Refresh Catalog",
  variant = "primary",
  cooldownMs = 30_000,
}: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error" | "cooldown">("idle");
  const [message, setMessage] = useState<string>("");
  const [remaining, setRemaining] = useState(0);
  const tickRef = useRef<number | null>(null);

  // Restore cooldown across reloads
  useEffect(() => {
    const last = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    const elapsed = Date.now() - last;
    if (last && elapsed < cooldownMs) startCooldown(cooldownMs - elapsed);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCooldown = (ms: number) => {
    setState("cooldown");
    setRemaining(Math.ceil(ms / 1000));
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (tickRef.current) window.clearInterval(tickRef.current);
          setState("idle");
          setMessage("");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const handleSync = async () => {
    if (state === "loading" || state === "cooldown") return;
    setState("loading");
    setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("trigger-sync", { body: {} });
      if (error) throw error;
      const synced = (data as any)?.synced ?? 0;
      const total = (data as any)?.total ?? 0;
      setMessage(synced ? `Added ${synced} new · ${total} total` : `Catalog up to date · ${total} scores`);
      setState("done");
      onSynced?.();
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      setTimeout(() => startCooldown(cooldownMs), 2000);
    } catch (e: any) {
      setMessage(e?.message ?? "Sync failed");
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  };

  const base =
    variant === "primary"
      ? "btn-primary"
      : "px-4 py-2 rounded-full text-xs font-body tracking-wide bg-secondary text-foreground hover:bg-secondary/80 transition-all inline-flex items-center gap-2";

  const disabled = state === "loading" || state === "cooldown";
  const text =
    state === "loading"
      ? "Refreshing…"
      : state === "done"
      ? "Updated"
      : state === "error"
      ? "Try again"
      : state === "cooldown"
      ? `Wait ${remaining}s`
      : label;

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <button onClick={handleSync} disabled={disabled} className={`${base} disabled:opacity-60 disabled:cursor-not-allowed group`}>
        {state === "done" ? (
          <CheckCircle2 size={16} className="text-accent" />
        ) : state === "error" ? (
          <AlertCircle size={16} className="text-destructive" />
        ) : (
          <RefreshCw size={16} className={state === "loading" ? "animate-spin" : "transition-transform group-hover:rotate-180 duration-500"} />
        )}
        {text}
      </button>
      {message && (
        <p className={`text-[10px] uppercase tracking-widest ${state === "error" ? "text-destructive" : "text-muted-foreground"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
