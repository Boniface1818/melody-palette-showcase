import { useEffect, useState } from "react";

const backgrounds = [
  "radial-gradient(ellipse at top left, hsl(220 25% 10%), hsl(240 15% 3%))",
  "radial-gradient(ellipse at top right, hsl(280 22% 9%), hsl(260 18% 3%))",
  "radial-gradient(ellipse at bottom left, hsl(195 30% 8%), hsl(200 20% 2%))",
  "radial-gradient(ellipse at top, hsl(350 18% 8%), hsl(340 12% 3%))",
  "radial-gradient(ellipse at bottom right, hsl(150 22% 7%), hsl(160 18% 2%))",
  "radial-gradient(ellipse at center, hsl(30 20% 7%), hsl(20 15% 2%))",
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
