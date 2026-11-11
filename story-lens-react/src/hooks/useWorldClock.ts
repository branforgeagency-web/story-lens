import { useEffect, useState } from 'react';

const format = (timeZone: string, locale: string): string =>
  new Date().toLocaleTimeString(locale, { timeZone, hour12: false });

/** A ticking `HH:MM:SS` string for the given IANA time zone. */
export function useWorldClock(timeZone: string, locale = 'en-GB'): string {
  const [time, setTime] = useState(() => format(timeZone, locale));

  useEffect(() => {
    const tick = () => setTime(format(timeZone, locale));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone, locale]);

  return time;
}
