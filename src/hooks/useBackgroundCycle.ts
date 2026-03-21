import { useEffect, useState } from "react";

const backgrounds = [
  "radial-gradient(ellipse at top, hsl(220 20% 8%), hsl(0 0% 2%))",
  "radial-gradient(ellipse at top, hsl(260 20% 8%), hsl(270 10% 3%))",
  "radial-gradient(ellipse at top, hsl(200 25% 7%), hsl(210 15% 2%))",
  "radial-gradient(ellipse at top, hsl(340 15% 7%), hsl(350 10% 2%))",
  "radial-gradient(ellipse at top, hsl(160 20% 6%), hsl(170 15% 2%))",
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
    document.body.style.transition = "background 2s ease";
    document.body.style.background = backgrounds[index];
  }, [index]);
}
