import { useCallback, useEffect, useRef, useState } from "react";
import { WAITLIST_TABLE } from "../data/venue";

// Simulated queue: a group leaves every few seconds until it's your turn.
const START_POSITION = 3;
const STEP_MS = 6000;
const MINUTES_PER_GROUP = 5;

export function useWaitlist(onReady) {
  const [entry, setEntry] = useState(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    if (!entry || entry.status !== "waiting") return undefined;
    const timer = setTimeout(() => {
      if (entry.ahead > 0) {
        setEntry((current) => ({ ...current, ahead: current.ahead - 1 }));
      } else {
        const ready = { ...entry, status: "ready", table: WAITLIST_TABLE };
        setEntry(ready);
        readyRef.current?.(ready);
      }
    }, STEP_MS);
    return () => clearTimeout(timer);
  }, [entry]);

  const join = useCallback(({ people, zone, name }) => {
    setEntry({ people, zone, name, number: 17, ahead: START_POSITION, status: "waiting" });
  }, []);

  const leave = useCallback(() => setEntry(null), []);

  return {
    entry,
    minutes: entry ? Math.max(entry.ahead, 0) * MINUTES_PER_GROUP + 3 : START_POSITION * MINUTES_PER_GROUP,
    progress: entry ? 1 - entry.ahead / (START_POSITION + 1) : 0,
    join,
    leave
  };
}
