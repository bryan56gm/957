import { useEffect, useMemo, useState } from "react";
import { BASES, DONENESS, EXTRAS } from "../data/pizzas";
import { useI18n } from "../hooks/useI18n";
import { unitPrice } from "../lib/pricing";
import { isLunchTime } from "../lib/clock";
import { CheckIcon, CloseIcon, MinusIcon } from "./Icons";
import { Badges } from "./MenuScreen";
import { Photo } from "./Photo";
import { Segmented } from "./Segmented";
import { Sheet } from "./Sheet";
import { Stepper } from "./Stepper";

const capital = (text) => text.charAt(0).toUpperCase() + text.slice(1);
export const EXTRA_LABEL = (id) => `ex${capital(id)}`;
export const INGREDIENT_LABEL = (id) => `ing${capital(id)}`;
export const ALLERGEN_LABEL = (id) => `al${capital(id)}`;

function toggle(list, id) {
  return list.includes(id) ? list.filter((value) => value !== id) : [...list, id];
}

export const BASE_LABEL = (id) => `base${capital(id)}`;

export function ProductSheet({ item, now, onClose, onAdd }) {
  const { t, money, name, desc } = useI18n();
  const [base, setBase] = useState("classic");
  const [doneness, setDoneness] = useState("medium");
  const [extras, setExtras] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setBase("classic");
    setDoneness("medium");
    setExtras([]);
    setRemoved([]);
    setNote("");
    setQty(1);
  }, [item]);

  const isPizza = item?.category === "pizzas";
  const line = useMemo(() => (item ? {
    itemId: item.id,
    ...(isPizza ? { base, extras, removed, note: note.trim() || undefined } : {}),
    ...(item.doneness ? { doneness, note: note.trim() || undefined } : {}),
    qty
  } : null), [item, isPizza, base, doneness, extras, removed, note, qty]);

  if (!item) return <Sheet open={false} onClose={onClose} tall />;

  const unavailable = item.soldOut || (item.lunchOnly && !isLunchTime(now));
  const baseOptions = BASES.map((option) => ({ id: option.id, label: t(BASE_LABEL(option.id)), sub: option.price ? `+${money(option.price)}` : t("baseIncluded") }));

  return (
    <Sheet open={Boolean(item)} onClose={onClose} tall className="product">
      <button className="sheet-close" onClick={onClose} aria-label="×"><CloseIcon /></button>
      <div className="sheet-scroll">
        {item.photo && (
          <div className="product-photo">
            <Photo name={item.photo} width={900} eager />
            <span className="product-shade" />
          </div>
        )}
        <div className="product-head">
          {item.num && <span className="item-num">Nº {item.num}</span>}
          <h2 className="display product-name">{name(item)}</h2>
          {item.desc && <p className="product-desc">{desc(item)}</p>}
          <Badges item={item} />
        </div>

        {unavailable ? (
          <div className="sold-box">
            <b>{t(item.soldOut ? "soldOut" : "lunchOnly")}</b>
            <span>{t(item.soldOut ? "soldOutMsg" : "lunchOnlyMsg")}</span>
          </div>
        ) : item.doneness ? (
          <>
            <div className="opt-group">
              <p className="opt-title">{t("doneness")}</p>
              <Segmented options={DONENESS.map((id) => ({ id, label: t(id) }))} value={doneness} onChange={setDoneness} />
            </div>
            <div className="opt-group">
              <p className="opt-title">{t("noteLabel")}</p>
              <input className="note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={t("notePlaceholder")} />
            </div>
          </>
        ) : isPizza && (
          <>
            <div className="opt-group">
              <p className="opt-title">{t("baseTitle")}</p>
              <Segmented options={baseOptions} value={base} onChange={setBase} />
              {base === "buckwheat" && <p className="fine-print">{t("buckwheatNote")}</p>}
            </div>
            <div className="opt-group">
              <p className="opt-title">{t("extrasTitle")}</p>
              <div className="extra-list">
                {EXTRAS.map((extra) => {
                  const on = extras.includes(extra.id);
                  return (
                    <button key={extra.id} className={`extra ${on ? "on" : ""}`} onClick={() => setExtras(toggle(extras, extra.id))}>
                      <span className="check">{on && <CheckIcon />}</span>
                      <span className="grow">{t(EXTRA_LABEL(extra.id))}</span>
                      <span className="extra-price">+{money(extra.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="opt-group">
              <p className="opt-title">{t("removeTitle")}</p>
              <div className="chips wrap">
                {item.remove.map((id) => (
                  <button key={id} className={removed.includes(id) ? "off" : ""} onClick={() => setRemoved(toggle(removed, id))}>
                    {removed.includes(id) && <MinusIcon />}{t(INGREDIENT_LABEL(id))}
                  </button>
                ))}
              </div>
            </div>
            <div className="opt-group">
              <p className="opt-title">{t("noteLabel")}</p>
              <input className="note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={t("notePlaceholder")} />
            </div>
          </>
        )}

        {item.allergens.length > 0 && (
          <div className="opt-group">
            <p className="opt-title">{t("allergensLabel")}</p>
            <div className="allergen-list">{item.allergens.map((code) => <span key={code}>{t(ALLERGEN_LABEL(code))}</span>)}</div>
          </div>
        )}
      </div>

      {!unavailable && (
        <div className="sheet-foot">
          <Stepper value={qty} onChange={setQty} min={1} />
          <button className="btn-primary grow" onClick={() => onAdd(line)}>{t("addToOrder", { price: money(unitPrice(line) * qty) })}</button>
        </div>
      )}
    </Sheet>
  );
}
