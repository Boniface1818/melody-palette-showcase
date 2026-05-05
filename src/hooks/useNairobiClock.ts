import { useEffect, useState } from "react";

export function useNairobiClock() {
  const [time, setTime] = useState(() => formatNairobi());
  useEffect(() => {
    const id = setInterval(() => setTime(formatNairobi()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function formatNairobi() {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
