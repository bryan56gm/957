import { useEffect, useMemo, useState } from "react";
import { findItem } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { pickupSlots } from "../lib/clock";
import { lineTotal, terraceFee } from "../lib/pricing";
import { BagIcon, CardIcon, CheckIcon, CloseIcon, QrIcon } from "./Icons";
import { useLineDetails } from "./LineText";
import { Segmented } from "./Segmented";
import { Sheet } from "./Sheet";
import { Stepper } from "./Stepper";

const PROCESSING_MS = 1400;
const METHODS = [
  { id: "wallet", label: "payWallet", chip: "PAY" },
  { id: "card", label: "payCard", chip: "VISA" },
  { id: "bizum", label: "payBizum", chip: "BIZUM" }
];

function CartLines({ cart }) {
  const { money, name } = useI18n();
  const details = useLineDetails();
  return (
    <ul className="cart-lines">
      {cart.lines.map((line) => {
        const item = findItem(line.itemId);
        const text = details(line);
        return (
          <li key={line.key}>
            <span className="grow">
              <b>{name(item)}</b>
              {text && <small>{text}</small>}
            </span>
            <span className="cart-line-side">
              <span className="price">{money(lineTotal(line))}</span>
              <Stepper small value={line.qty} onChange={(qty) => cart.setQty(line.key, qty)} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function SlotPicker({ now, value, onChange }) {
  const { t } = useI18n();
  const slots = useMemo(() => pickupSlots(now), [now]);
  return (
    <div className="opt-group">
      <p className="opt-title">{t("pickupAt")}</p>
      <div className="slots">
        {slots.map((slot) => (
          <button key={slot.time} disabled={slot.full} className={slot.time === value ? "on" : ""} onClick={() => onChange(slot.time)}>
            {slot.time}
            {slot.full && <small>{t("slotFull")}</small>}
          </button>
        ))}
      </div>
      <p className="fine-print">{t("slotsHint")}</p>
    </div>
  );
}

// Review the order, choose takeaway time or table, then pay (simulated).
export function CartSheet({ open, step, onStep, onClose, cart, mode, onModeChange, onScanTable, now, onPlace }) {
  const { t, money } = useI18n();
  const [method, setMethod] = useState("wallet");
  const [processing, setProcessing] = useState(false);
  const firstFreeSlot = useMemo(() => pickupSlots(now).find((slot) => !slot.full)?.time, [now]);
  const kind = mode?.type === "table" ? "table" : "takeaway";
  const slot = mode?.type === "takeaway" ? mode.slot : firstFreeSlot;

  useEffect(() => {
    if (open && kind === "takeaway" && mode?.type !== "takeaway" && firstFreeSlot) onModeChange({ type: "takeaway", slot: firstFreeSlot });
  }, [open, kind, mode, firstFreeSlot, onModeChange]);

  const fee = kind === "table" ? terraceFee(cart.lines, mode.zone) : 0;
  const total = cart.subtotal + fee;

  const chooseKind = (next) => {
    if (next === "table") {
      if (mode?.type === "table") return;
      onScanTable();
    } else {
      onModeChange({ type: "takeaway", slot: firstFreeSlot });
    }
  };

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPlace({ ...mode, type: kind, slot: kind === "takeaway" ? slot : undefined });
    }, PROCESSING_MS);
  };

  return (
    <Sheet open={open} onClose={processing ? undefined : onClose} tall>
      <button className="sheet-close" onClick={onClose} aria-label="×" disabled={processing}><CloseIcon /></button>
      {cart.count === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon"><BagIcon /></span>
          <p className="display sheet-title">{t("cartEmpty")}</p>
          <p className="sheet-body">{t("cartEmptySub")}</p>
          <button className="btn-primary" onClick={() => onClose("menu")}>{t("browse")}</button>
        </div>
      ) : step === "pay" ? (
        <>
          <div className="sheet-scroll">
            <p className="display sheet-title">{t("payTitle")}</p>
            <div className="pay-summary">
              <span>{kind === "table" ? t("modeTable", { table: mode.table }) : t("modeTakeawaySub", { time: slot })}</span>
              <b>{money(total)}</b>
            </div>
            <div className="methods">
              {METHODS.map((option) => (
                <button key={option.id} className={`card-pay ${option.id === method ? "on" : ""}`} onClick={() => setMethod(option.id)} disabled={processing}>
                  <span className="chip">{option.chip}</span>
                  <span className="grow">{t(option.label)}</span>
                  <span className="radio">{option.id === method && <CheckIcon />}</span>
                </button>
              ))}
            </div>
            <p className="fine-print center"><CardIcon /> {t("paySimulated")}</p>
          </div>
          <div className="sheet-foot column">
            <button className="btn-primary" onClick={pay} disabled={processing}>
              {processing ? <span className="spinner dark" aria-label={t("processing")} /> : t("payBtn", { price: money(total) })}
            </button>
            <button className="btn-ghost" onClick={() => onStep("cart")} disabled={processing}>{t("back")}</button>
          </div>
        </>
      ) : (
        <>
          <div className="sheet-scroll">
            <p className="display sheet-title">{t("cartTitle")}</p>
            <CartLines cart={cart} />
            <div className="opt-group">
              <p className="opt-title">{t("howTitle")}</p>
              <Segmented
                options={[
                  { id: "takeaway", label: <><BagIcon /> {t("modeTakeaway")}</> },
                  { id: "table", label: <><QrIcon /> {mode?.type === "table" ? t("modeTable", { table: mode.table }) : t("optTable")}</> }
                ]}
                value={kind}
                onChange={chooseKind}
              />
            </div>
            {kind === "table" && <p className="fine-print">{t("tablePayLater")}</p>}
            {kind === "takeaway" && <SlotPicker now={now} value={slot} onChange={(time) => onModeChange({ type: "takeaway", slot: time })} />}
            <div className="totals">
              <div><span>{t("subtotal")}</span><span>{money(cart.subtotal)}</span></div>
              {fee > 0 && <div><span>{t("terraceFee", { count: cart.count })}</span><span>{money(fee)}</span></div>}
              <div className="grand"><span>{t("total")}</span><span>{money(total)}</span></div>
            </div>
          </div>
          <div className="sheet-foot">
            {kind === "table" ? (
              <button className="btn-primary grow" onClick={pay} disabled={processing}>
                {processing ? <span className="spinner dark" aria-label={t("processing")} /> : t("sendToKitchen", { price: money(total) })}
              </button>
            ) : (
              <button className="btn-primary grow" onClick={() => onStep("pay")}>{t("goPay", { price: money(total) })}</button>
            )}
          </div>
        </>
      )}
    </Sheet>
  );
}
