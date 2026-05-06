import { useMemo } from "react";
import { currentSeason } from "@/lib/liturgicalSeason";
import { Sparkles } from "lucide-react";

export default function LiturgicalSeasonBadge() {
  const season = useMemo(() => currentSeason(), []);
  return (
    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border/60 bg-background/40 backdrop-blur-md">
      <Sparkles size={14} className={season.color} />
      <div className="text-left">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Liturgical Season</p>
        <p className="text-sm font-display font-semibold leading-tight">
          <span className={season.color}>{season.name}</span>
          <span className="text-muted-foreground"> · {season.swahili}</span>
        </p>
      </div>
      <span className="hidden sm:block w-px h-8 bg-border" />
      <p className="hidden sm:block text-xs text-muted-foreground italic max-w-[14rem] leading-snug">
        {season.hint}
      </p>
    </div>
  );
}
