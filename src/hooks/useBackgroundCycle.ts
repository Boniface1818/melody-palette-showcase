import { useEffect, useState } from "react";

const backgrounds = [
  // Red
  "radial-gradient(ellipse at top left, hsl(0 70% 12%), hsl(0 50% 3%))",
  // Orange
  "radial-gradient(ellipse at top right, hsl(25 80% 10%), hsl(20 60% 3%))",
  // Amber / Yellow
  "radial-gradient(ellipse at bottom left, hsl(45 75% 10%), hsl(40 55% 3%))",
  // Lime / Yellow-green
  "radial-gradient(ellipse at center, hsl(75 60% 9%), hsl(80 45% 2%))",
  // Green
  "radial-gradient(ellipse at bottom right, hsl(120 50% 8%), hsl(130 40% 2%))",
  // Emerald / Teal
  "radial-gradient(ellipse at top left, hsl(160 55% 9%), hsl(165 40% 2%))",
  // Cyan
  "radial-gradient(ellipse at top, hsl(185 65% 10%), hsl(190 50% 3%))",
  // Sky / Light blue
  "radial-gradient(ellipse at bottom, hsl(200 60% 11%), hsl(210 45% 3%))",
  // Blue
  "radial-gradient(ellipse at top right, hsl(220 60% 12%), hsl(230 45% 3%))",
  // Indigo
  "radial-gradient(ellipse at center left, hsl(245 50% 11%), hsl(250 40% 3%))",
  // Violet / Purple
  "radial-gradient(ellipse at bottom left, hsl(270 55% 10%), hsl(275 40% 3%))",
  // Magenta / Pink
  "radial-gradient(ellipse at top, hsl(300 45% 10%), hsl(310 35% 3%))",
  // Rose
  "radial-gradient(ellipse at bottom right, hsl(330 55% 10%), hsl(340 40% 3%))",
  // Deep teal (original)
  "radial-gradient(ellipse at top left, hsl(174 40% 8%), hsl(174 30% 2%))",
  // Warm gold
  "radial-gradient(ellipse at top right, hsl(36 35% 8%), hsl(30 25% 2%))",
  // Electric blue-violet
  "radial-gradient(ellipse at center, hsl(255 65% 10%), hsl(260 50% 3%))",
  // Coral
  "radial-gradient(ellipse at bottom, hsl(10 70% 10%), hsl(5 55% 3%))",
  // Mint
  "radial-gradient(ellipse at top left, hsl(150 50% 9%), hsl(155 40% 2%))",
];

export function useBackgroundCycle(intervalMs = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  useEffect(() => {
    document.body.style.transition = "background 3s ease";
    document.body.style.background = backgrounds[index];
  }, [index]);
}
