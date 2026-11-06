import { useCallback, useEffect, useRef, useState } from "react";

const PUSH_MS = 4600;

// In-app imitation of a phone notification (the real app would send a push).
export function usePush() {
  const [push, setPush] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback((next) => {
    navigator.vibrate?.([40, 60, 40]);
    setPush({ ...next, id: Date.now() });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPush(null), PUSH_MS);
  }, []);

  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setPush(null);
  }, []);

  return { push, show, dismiss };
}
