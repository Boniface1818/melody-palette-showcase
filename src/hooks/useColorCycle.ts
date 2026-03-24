import { useState, useEffect } from "react";

const colors = [
  "hsl(174, 84%, 42%)", // teal
  "hsl(36, 90%, 54%)",  // gold
  "hsl(0, 80%, 55%)",   // red
  "hsl(270, 70%, 55%)", // violet
  "hsl(120, 60%, 45%)", // green
  "hsl(200, 80%, 50%)", // sky blue
  "hsl(330, 70%, 55%)", // rose
  "hsl(45, 90%, 50%)",  // amber
  "hsl(185, 75%, 45%)", // cyan
  "hsl(300, 60%, 50%)", // magenta
  "hsl(25, 85%, 50%)",  // orange
  "hsl(220, 70%, 55%)", // blue
];

export function useColorCycle(intervalMs = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % colors.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return colors[index];
}
