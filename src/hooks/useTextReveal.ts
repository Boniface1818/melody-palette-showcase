import { useState, useEffect } from "react";

export function useTextReveal(text: string, speed = 60, delay = 0) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTimeout = setTimeout(() => {
      function tick() {
        i++;
        setRevealed(text.slice(0, i));
        if (i < text.length) {
          timeout = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      }
      tick();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return { revealed, done };
}
