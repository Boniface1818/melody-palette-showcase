// Approximate liturgical season for the current date (Roman Rite).
export type Season = {
  key: "advent" | "christmas" | "lent" | "easter" | "ordinary";
  name: string;
  swahili: string;
  color: string; // tailwind text color class
  hint: string;
};

function easterSunday(year: number): Date {
  // Anonymous Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function adventStart(year: number): Date {
  // 4th Sunday before Christmas
  const christmas = new Date(year, 11, 25);
  const dow = christmas.getDay(); // 0=Sun
  const sundayBefore = addDays(christmas, -((dow + 7) % 7 || 7));
  return addDays(sundayBefore, -21);
}

export function currentSeason(now: Date = new Date()): Season {
  const y = now.getFullYear();
  const advent = adventStart(y);
  const christmasEnd = new Date(y + 1, 0, 13); // ~Baptism of the Lord
  const easter = easterSunday(y);
  const ashWed = addDays(easter, -46);
  const pentecost = addDays(easter, 49);

  if (now >= advent || now < new Date(y, 0, 13)) {
    if (now >= advent && now < new Date(y, 11, 25))
      return { key: "advent", name: "Advent", swahili: "Majilio", color: "text-primary", hint: "Watchful, hopeful — a quieter palette." };
    return { key: "christmas", name: "Christmas Season", swahili: "Krismasi", color: "text-accent", hint: "Joyful, radiant — let the brass in." };
  }
  if (now < christmasEnd && now >= new Date(y, 0, 1))
    return { key: "christmas", name: "Christmas Season", swahili: "Krismasi", color: "text-accent", hint: "Joyful, radiant — let the brass in." };
  if (now >= ashWed && now < easter)
    return { key: "lent", name: "Lent", swahili: "Kwaresima", color: "text-primary", hint: "Restrained, prayerful — fewer flourishes." };
  if (now >= easter && now <= pentecost)
    return { key: "easter", name: "Easter Season", swahili: "Pasaka", color: "text-accent", hint: "Alleluias unfurled — the music breathes wide." };
  return { key: "ordinary", name: "Ordinary Time", swahili: "Wakati wa Mwaka", color: "text-foreground", hint: "Steady, grounded — the long song of the Church." };
}
