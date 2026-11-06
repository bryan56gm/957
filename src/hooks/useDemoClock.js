import { useEffect, useState } from "react";
import { demoNow } from "../lib/clock";

const TICK_MS = 20000;

export function useDemoClock() {
  const [now, setNow] = useState(demoNow);
  useEffect(() => {
    const timer = setInterval(() => setNow(demoNow()), TICK_MS);
    return () => clearInterval(timer);
  }, []);
  return now;
}
