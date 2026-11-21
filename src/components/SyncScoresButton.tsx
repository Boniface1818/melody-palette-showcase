import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export interface ScoreSyncResult {
  success?: boolean;
  added?: number;
  synced?: number;
  total?: number;
  source?: string;
  warning?: string | null;
}

const SERVER_COOLDOWN_SECONDS = 15 * 60;
export const SCORE_SYNC_COOLDOWN_MS = SERVER_COOLDOWN_SECONDS * 1000;

export const classifySyncResult = (result: ScoreSyncResult | null | undefined) => {
  if (
    result?.success !== true ||
    result.source !== "firecrawl" ||
    Boolean(result.warning) ||
    !Number.isFinite(result.added) ||
    !Number.isFinite(result.synced) ||
    !Number.isFinite(result.total) ||
    (result.total ?? 0) <= 0 ||
    (result.synced ?? 0) !== result.total
  ) {
    return "incomplete" as const;
  }

  return (result.added ?? 0) > 0 ? "added" as const : "checked" as const;
};

export const getRetryAfterSeconds = (header: string | null) => {
  const seconds = Number(header);
  return Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : SERVER_COOLDOWN_SECONDS;
};

export class SyncCooldownError extends Error {
  constructor(readonly retryAfterSeconds: number) {
    super("The score catalog was checked recently.");
    this.name = "SyncCooldownError";
  }
}

const LAST_SYNC_KEY = "bk_last_sync_ts";
const COOLDOWN_UNTIL_KEY = "bk_sync_cooldown_until";
const COOLDOWN_EVENT = "bk-score-sync-cooldown";

export const recordSyncCooldown = (durationMs = SCORE_SYNC_COOLDOWN_MS, notify = true) => {
  const until = Date.now() + durationMs;
  try {
    localStorage.setItem(COOLDOWN_UNTIL_KEY, String(until));
  } catch {
    // The visible countdown still works if browser storage is unavailable.
  }
  if (notify) window.dispatchEvent(new CustomEvent(COOLDOWN_EVENT, { detail: until }));
  return until;
};

export const recordSuccessfulSync = (cooldownMs = SCORE_SYNC_COOLDOWN_MS, notify = true) => {
  try {
    localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
  } catch {
    // Keep the successful result even when browser storage is unavailable.
  }
  return recordSyncCooldown(cooldownMs, notify);
};

export const syncScoresNow = async (): Promise<ScoreSyncResult> => {
  const { data, error } = await supabase.functions.invoke<ScoreSyncResult>("trigger-sync", {
    body: { refresh: Date.now() },
  });

  if (error) {
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response && context.status === 429) {
      throw new SyncCooldownError(getRetryAfterSeconds(context.headers.get("Retry-After")));
    }
    throw new Error("Could not check the score catalog. Please try again shortly.");
  }

  if (data?.success !== true) {
    throw new Error("The score catalog could not be confirmed.");
  }

  return data;
};

interface Props {
  onSynced?: () => void | Promise<void>;
  label?: string;
  variant?: "primary" | "ghost";
  cooldownMs?: number;
}

export default function SyncScoresButton({
  onSynced,
  label = "Refresh Catalog",
  variant = "primary",
  cooldownMs = SCORE_SYNC_COOLDOWN_MS,
}: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error" | "cooldown">("idle");
  const [message, setMessage] = useState<string>("");
  const [remaining, setRemaining] = useState(0);
  const tickRef = useRef<number | null>(null);

  const startCooldown = (ms: number) => {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (ms <= 0) {
      setState("idle");
      setRemaining(0);
      return;
    }
    setState("cooldown");
    setRemaining(Math.ceil(ms / 1000));
    tickRef.current = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          if (tickRef.current) window.clearInterval(tickRef.current);
          tickRef.current = null;
          try {
            localStorage.removeItem(COOLDOWN_UNTIL_KEY);
          } catch {
            // Ignore unavailable browser storage.
          }
          setState("idle");
          setMessage("");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    try {
      const cooldownUntil = Number(localStorage.getItem(COOLDOWN_UNTIL_KEY) ?? 0);
      if (cooldownUntil > Date.now()) {
        startCooldown(cooldownUntil - Date.now());
      } else {
        localStorage.removeItem(COOLDOWN_UNTIL_KEY);
        const last = Number(localStorage.getItem(LAST_SYNC_KEY) ?? 0);
        const elapsed = Date.now() - last;
        if (last && elapsed < cooldownMs) startCooldown(cooldownMs - elapsed);
      }
    } catch {
      // Sync remains available when browser storage is unavailable.
    }

    const handleSharedCooldown = (event: Event) => {
      const until = (event as CustomEvent<number>).detail;
      if (typeof until === "number") startCooldown(Math.max(0, until - Date.now()));
    };
    window.addEventListener(COOLDOWN_EVENT, handleSharedCooldown);
    return () => {
      window.removeEventListener(COOLDOWN_EVENT, handleSharedCooldown);
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSync = async () => {
    if (state === "loading" || state === "cooldown") return;
    setState("loading");
    setMessage("");
    try {
      const data = await syncScoresNow();
      await onSynced?.();
      const outcome = classifySyncResult(data);

      if (outcome === "incomplete") {
        setMessage("MuseScore did not return a complete catalog check.");
        recordSyncCooldown(cooldownMs, false);
        startCooldown(cooldownMs);
        return;
      }

      setMessage(
        outcome === "added"
          ? `Added ${data.added} new score${data.added === 1 ? "" : "s"} from MuseScore.`
          : "MuseScore checked · no new scores found.",
      );
      recordSuccessfulSync(cooldownMs, false);
      setState("done");
      setTimeout(() => startCooldown(cooldownMs), 2000);
    } catch (error) {
      if (error instanceof SyncCooldownError) {
        const cooldownMsFromServer = error.retryAfterSeconds * 1000;
        setMessage("A recent catalog check used the refresh limit. Please wait for the timer.");
        recordSyncCooldown(cooldownMsFromServer, false);
        startCooldown(cooldownMsFromServer);
        return;
      }
      setMessage("Could not check MuseScore for new scores. Please try again shortly.");
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
      ? "Checking MuseScore…"
      : state === "done"
      ? "Checked"
      : state === "error"
      ? "Try again"
      : state === "cooldown"
      ? `Wait ${Math.floor(remaining / 60)}m ${String(remaining % 60).padStart(2, "0")}s`
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
