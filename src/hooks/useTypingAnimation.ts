import { useState, useEffect } from "react";

const defaultPhrases = [
  "Composer of Sacred Music",
  "Arranger for Choirs & Cantors",
  "Liturgical Music Specialist",
  "SATB · SAB · SSA · Unison",
  "Bespoke Songs for Soloists",
  "Mass Settings · Psalms · Hymns",
  "Music shaped for prayer",
];

export function useTypingAnimation(
  speed = 70,
  pause = 1800,
  phrases: string[] = defaultPhrases,
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIndex % phrases.length];
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (!deleting) {
        setText(phrase.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === phrase.length) {
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, pause);
          return;
        }
      } else {
        setText(phrase.slice(0, charIndex));
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          setPhraseIndex((i) => (i + 1) % phrases.length);
          return;
        }
      }
      // Smoother variable cadence: faster delete, slight jitter on type
      const jitter = deleting ? 28 : speed + Math.floor(Math.random() * 30) - 10;
      timeout = setTimeout(tick, Math.max(20, jitter));
    }

    tick();
    return () => clearTimeout(timeout);
  }, [phraseIndex, speed, pause, phrases]);

  return text;
}
