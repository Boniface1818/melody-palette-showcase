import { useState, useEffect } from "react";

const quotePairs = [
  [
    "Every composition is a prayer set to music — I craft arrangements that move hearts and lift spirits.",
    "From the silence of the page to the fullness of four-part harmony, music speaks what words cannot.",
  ],
  [
    "I write for choirs, ensembles, and piano — each voice carefully placed to serve the song.",
    "Liturgical music is both a discipline and a devotion — I bring both to every score.",
  ],
  [
    "Piano duos, string duets, mixed quartets — every arrangement tells its own story.",
    "Music is the language of the soul, and I am its faithful translator.",
  ],
  [
    "From offertory hymns to full mass settings, I compose music that serves the sacred moment.",
    "Each note is chosen with intention — because music in worship deserves nothing less than excellence.",
  ],
  [
    "I believe music has the power to unite voices, uplift congregations, and glorify God.",
    "My compositions are a bridge between tradition and fresh expression — honoring the old, embracing the new.",
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
