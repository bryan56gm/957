import { BASES, EXTRAS } from "../data/pizzas";
import { findItem, TERRACE_FEE } from "../data/menu";

const EXTRA_PRICE = Object.fromEntries(EXTRAS.map((extra) => [extra.id, extra.price]));
const BASE_PRICE = Object.fromEntries(BASES.map((base) => [base.id, base.price]));
const LOCALES = { ca: "ca-ES", es: "es-ES", en: "en-GB", fr: "fr-FR" };

export function formatMoney(amount, lang) {
  return new Intl.NumberFormat(LOCALES[lang] || "ca-ES", { style: "currency", currency: "EUR" }).format(amount);
}

// Gram sizes below 10 are placeholders for single-size items (no weight shown).
export function hasWeight(grams) {
  return Number(grams) >= 10;
}

export function unitPrice(line) {
  const item = findItem(line.itemId);
  if (!item) return 0;
  const base = item.sizes ? item.sizes[line.size] ?? item.price : item.price;
  const extras = (line.extras || []).reduce((sum, id) => sum + (EXTRA_PRICE[id] || 0), 0);
  return base + (BASE_PRICE[line.base] || 0) + extras;
}

export function lineTotal(line) {
  return unitPrice(line) * line.qty;
}

export function linesCount(lines) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function linesSubtotal(lines) {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

export function terraceFee(lines, zone) {
  return zone === "terrace" ? linesCount(lines) * TERRACE_FEE : 0;
}

// Same item with the same options = same line (quantity is merged).
export function lineKey(line) {
  return [line.itemId, line.base ?? "", line.size ?? "", line.doneness ?? "", [...(line.extras || [])].sort().join("+"), [...(line.removed || [])].sort().join("+"), line.note || ""].join("|");
}
