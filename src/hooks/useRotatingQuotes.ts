import { useState, useEffect } from "react";

const quotePairs = [
  [
    "Where code meets composition — I build scalable web systems and craft musical arrangements that move people.",
    "Every algorithm has a rhythm, every melody has logic — I live at the intersection of both.",
  ],
  [
    "Debugging code by day, orchestrating harmonies by night — two languages, one creative mind.",
    "Clean code and clean counterpoint share the same secret: elegant simplicity.",
  ],
  [
    "I write functions that scale and fugues that soar — precision in both worlds.",
    "The compiler and the conductor both demand perfection — I answer to both.",
  ],
  [
    "From terminal to treble clef, every project is a performance waiting to happen.",
    "Software architecture and musical arrangement — both are the art of structured beauty.",
  ],
  [
    "Pixels and pitches, APIs and arpeggios — creativity has no single language.",
    "I ship features and sheet music with the same obsession for craft.",
  ],
];

export function useRotatingQuotes(intervalMs = 12000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotePairs.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return quotePairs[index];
}
