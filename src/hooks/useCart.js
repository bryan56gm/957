import { useCallback, useMemo, useState } from "react";
import { lineKey, linesCount, linesSubtotal } from "../lib/pricing";

// Cart lines: { key, itemId, size?, doneness?, extras[], removed[], note?, qty }.
export function useCart() {
  const [lines, setLines] = useState([]);

  const addLine = useCallback((line) => {
    const next = { extras: [], removed: [], qty: 1, ...line };
    const key = lineKey(next);
    setLines((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => (item.key === key ? { ...item, qty: item.qty + next.qty } : item));
      return [...current, { ...next, key }];
    });
  }, []);

  const addLines = useCallback((newLines) => newLines.forEach(addLine), [addLine]);

  const setQty = useCallback((key, qty) => {
    setLines((current) => (qty <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => (item.key === key ? { ...item, qty } : item))));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => linesCount(lines), [lines]);
  const subtotal = useMemo(() => linesSubtotal(lines), [lines]);
  const hasItem = useCallback((itemId) => lines.some((line) => line.itemId === itemId), [lines]);

  return { lines, count, subtotal, addLine, addLines, setQty, clearCart, hasItem };
}
