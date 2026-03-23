import { useState, useEffect, useCallback } from "react";

export function useTextReveal(text: string, speed = 60, delay = 0, loop = false, loopPause = 2000) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const startTimeout = setTimeout(() => {
      function tick() {
        if (cancelled) return;
        if (!deleting) {
          i++;
          setRevealed(text.slice(0, i));
          if (i >= text.length) {
            setDone(true);
            if (loop) {
              timeout = setTimeout(() => {
                deleting = true;
                setDone(false);
                tick();
              }, loopPause);
            }
            return;
          }
        } else {
          i--;
          setRevealed(text.slice(0, i));
          if (i <= 0) {
            deleting = false;
            timeout = setTimeout(tick, 400);
            return;
          }
        }
        timeout = setTimeout(tick, deleting ? 30 : speed);
      }
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, loop, loopPause]);

  return { revealed, done };
}
