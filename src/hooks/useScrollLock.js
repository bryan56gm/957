import { useEffect } from "react";

// Freezes the page behind sheets and full-screen overlays so mobile browsers don't scroll it.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { documentElement: html, body } = document;
    const previous = [html.style.overflow, body.style.overflow];
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      [html.style.overflow, body.style.overflow] = previous;
    };
  }, [locked]);
}
