import { useState, useEffect, useRef } from "react";

export function useAnimatedSkills(targetLevel: number, duration = 1200) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate after a small delay
          requestAnimationFrame(() => {
            setWidth(targetLevel);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetLevel]);

  return { ref, width };
}
