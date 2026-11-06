import { useEffect, useState } from "react";
import { ALLERGENS } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { CheckIcon } from "./Icons";
import { ALLERGEN_LABEL } from "./ProductSheet";
import { Sheet } from "./Sheet";

export function AllergenSheet({ open, value, onClose, onApply }) {
  const { t } = useI18n();
  const [selected, setSelected] = useState(value);
  useEffect(() => { if (open) setSelected(value); }, [open, value]);
  const toggle = (code) => setSelected((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  return (
    <Sheet open={open} onClose={onClose}>
      <p className="display sheet-title">{t("allergensTitle")}</p>
      <div className="allergen-grid">
        {ALLERGENS.map((code) => (
          <button key={code} className={selected.includes(code) ? "on" : ""} onClick={() => toggle(code)}>
            <span className="check">{selected.includes(code) && <CheckIcon />}</span>{t(ALLERGEN_LABEL(code))}
          </button>
        ))}
      </div>
      <div className="row">
        <button className="btn-ghost grow" onClick={() => onApply([])}>{t("clear")}</button>
        <button className="btn-primary grow" onClick={() => onApply(selected)}>{t("apply")}</button>
      </div>
    </Sheet>
  );
}
