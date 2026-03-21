import { useState, useEffect } from "react";

const phrases = [
  "Full-Stack Developer",
  "Music Composer",
  "Building Scalable Systems",
  "Composing Digital Soundscapes",
  "Tech × Music Creator",
];

export function useTypingAnimation(speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
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
      timeout = setTimeout(tick, deleting ? 40 : speed);
    }

    tick();
    return () => clearTimeout(timeout);
  }, [phraseIndex, speed, pause]);

  return text;
}
