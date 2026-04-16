import { useMemo } from "react";

const NOTES = ["♪", "♫", "♬", "♩", "𝄞", "♭", "♯"];

interface Props {
  count?: number;
  className?: string;
}

/**
 * Animated floating musical notes drifting upward in the background.
 * Purely decorative — pointer-events none, aria-hidden.
 */
export default function FloatingNotes({ count = 14, className = "" }: Props) {
  const notes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 14 + Math.random() * 28;
        const duration = 14 + Math.random() * 18;
        const delay = -Math.random() * duration;
        const drift = (Math.random() - 0.5) * 80;
        const isAccent = i % 3 === 0;
        return {
          id: i,
          char: NOTES[Math.floor(Math.random() * NOTES.length)],
          left,
          size,
          duration,
          delay,
          drift,
          isAccent,
          opacity: 0.15 + Math.random() * 0.25,
        };
      }),
    [count]
  );

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      {notes.map((n) => (
        <span
          key={n.id}
          className="absolute font-display select-none"
          style={{
            left: `${n.left}%`,
            bottom: `-10%`,
            fontSize: `${n.size}px`,
            color: n.isAccent ? "hsl(var(--accent))" : "hsl(var(--primary))",
            opacity: n.opacity,
            animation: `float-note ${n.duration}s linear ${n.delay}s infinite`,
            ["--drift" as string]: `${n.drift}px`,
            textShadow: `0 0 12px ${n.isAccent ? "hsl(var(--accent) / 0.4)" : "hsl(var(--primary) / 0.4)"}`,
          }}
        >
          {n.char}
        </span>
      ))}
    </div>
  );
}
