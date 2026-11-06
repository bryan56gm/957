import { findItem, UPSELL_IDS } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { CheckIcon, PlusIcon } from "./Icons";
import { Photo } from "./Photo";
import { Sheet } from "./Sheet";

// After the first pizza: offer a couple of tapas to share while it bakes.
export function UpsellSheet({ open, onClose, onAdd, hasItem }) {
  const { t, money, name } = useI18n();
  return (
    <Sheet open={open} onClose={onClose}>
      <p className="display sheet-title">{t("upsellTitle")}</p>
      <p className="sheet-body">{t("upsellSub")}</p>
      <div className="upsell">
        {UPSELL_IDS.map(findItem).map((item) => {
          const added = hasItem(item.id);
          return (
            <button key={item.id} className={`upsell-card ${added ? "on" : ""}`} onClick={() => !added && onAdd(item)}>
              <span className="upsell-photo"><Photo name={item.photo} width={300} /></span>
              <b>{name(item)}</b>
              <span className="price">{money(item.price)}</span>
              <span className={`add ${added ? "done" : ""}`}>{added ? <CheckIcon /> : <PlusIcon />}</span>
            </button>
          );
        })}
      </div>
      <button className="btn-ghost" onClick={onClose}>{UPSELL_IDS.some(hasItem) ? t("continue") : t("noThanks")}</button>
    </Sheet>
  );
}
