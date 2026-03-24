import { useState, useEffect } from "react";

export function useRotatingSubtitles(pairs: string[], intervalMs = 8000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % pairs.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [pairs.length, intervalMs]);

  return pairs[index];
}
