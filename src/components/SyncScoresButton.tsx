import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  onSynced?: () => void;
  label?: string;
  variant?: "primary" | "ghost";
}

export default function SyncScoresButton({ onSynced, label = "Refresh Catalog", variant = "primary" }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSync = async () => {
    setState("loading");
    setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("sync-musescore", { body: {} });
      if (error) throw error;
      const count = (data as any)?.scoresUpdated ?? (data as any)?.count ?? 0;
      setMessage(count ? `Synced ${count} new/updated scores` : "Catalog is already up to date");
      setState("done");
      onSynced?.();
      setTimeout(() => setState("idle"), 3500);
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

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <button onClick={handleSync} disabled={state === "loading"} className={`${base} disabled:opacity-60 disabled:cursor-not-allowed group`}>
        {state === "done" ? (
          <CheckCircle2 size={16} className="text-accent" />
        ) : state === "error" ? (
          <AlertCircle size={16} className="text-destructive" />
        ) : (
          <RefreshCw size={16} className={state === "loading" ? "animate-spin" : "transition-transform group-hover:rotate-180 duration-500"} />
        )}
        {state === "loading" ? "Refreshing…" : state === "done" ? "Updated" : state === "error" ? "Try again" : label}
      </button>
      {message && (
        <p className={`text-[10px] uppercase tracking-widest ${state === "error" ? "text-destructive" : "text-muted-foreground"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
