import { useI18n } from "../hooks/useI18n";
import { BASE_LABEL, EXTRA_LABEL, INGREDIENT_LABEL } from "./ProductSheet";

// "Base de fajol · + Ceps · sense ceba" for a cart/order line.
export function useLineDetails() {
  const { t } = useI18n();
  return (line) => {
    const parts = [];
    if (line.base && line.base !== "classic") parts.push(t(BASE_LABEL(line.base)));
    if (line.doneness) parts.push(t(line.doneness));
    (line.extras || []).forEach((id) => parts.push(`+ ${t(EXTRA_LABEL(id))}`));
    (line.removed || []).forEach((id) => parts.push(t("without", { what: t(INGREDIENT_LABEL(id)).toLowerCase() })));
    if (line.note) parts.push(`«${line.note}»`);
    return parts.join(" · ");
  };
}
