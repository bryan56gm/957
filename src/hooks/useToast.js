import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_MS = 2200;

export function useToast() {
  const [message, setMessage] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), TOAST_MS);
  }, []);

  return { message, notify };
}
