import { useEffect, useState } from "react";
import { findItem } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { lineTotal } from "../lib/pricing";
import { CheckIcon } from "./Icons";
import { useLineDetails } from "./LineText";
import { Sheet } from "./Sheet";
import { Stepper } from "./Stepper";

const PROCESSING_MS = 1400;

// The table's running bill: every round sent from the phone, paid at the end (and split if needed).
export function BillSheet({ open, table, orders, onClose, onPaid }) {
  const { t, money, name } = useI18n();
  const details = useLineDetails();
  const [split, setSplit] = useState(1);
  const [state, setState] = useState("bill");

  useEffect(() => {
    if (open) {
      setState("bill");
      setSplit(1);
    }
  }, [open]);

  const total = orders.reduce((sum, order) => sum + order.total, 0);
  const rounds = [...orders].reverse();

  const pay = () => {
    setState("processing");
    setTimeout(() => setState("paid"), PROCESSING_MS);
  };

  return (
    <Sheet open={open} onClose={state === "processing" ? undefined : state === "paid" ? onPaid : onClose} tall>
      {state === "paid" ? (
        <div className="success">
          <div className="tick"><CheckIcon /></div>
          <p className="display sheet-title">{t("paidTitle")}</p>
          <p className="sheet-body">{t("paidSub")}</p>
          <button className="btn-primary" onClick={onPaid}>{t("done")}</button>
        </div>
      ) : (
        <>
          <div className="sheet-scroll">
            <p className="display sheet-title">{t("billTitle", { table })}</p>
            {rounds.length === 0 && <p className="sheet-body">{t("billEmpty")}</p>}
            {rounds.map((order, index) => (
              <div key={order.id} className="round">
                <p className="k">{t("round", { count: index + 1 })} · {order.placedAt}</p>
                {order.lines.map((line) => (
                  <div key={line.key} className="order-line">
                    <span className="qty">{line.qty}×</span>
                    <span className="grow"><b>{name(findItem(line.itemId))}</b>{details(line) && <small>{details(line)}</small>}</span>
                    <span>{money(lineTotal(line))}</span>
                  </div>
                ))}
                {order.fee > 0 && <div className="order-line muted"><span className="qty" /><span className="grow">{t("terraceFee", { count: order.lines.reduce((sum, line) => sum + line.qty, 0) })}</span><span>{money(order.fee)}</span></div>}
              </div>
            ))}
            {rounds.length > 0 && (
              <>
                <div className="totals"><div className="grand"><span>{t("total")}</span><span>{money(total)}</span></div></div>
                <div className="split row">
                  <span className="grow">{t("splitBill")}</span>
                  <Stepper value={split} onChange={setSplit} min={1} max={12} />
                </div>
                {split > 1 && <p className="split-each">{t("perPerson", { price: money(total / split) })}</p>}
              </>
            )}
          </div>
          {rounds.length > 0 && (
            <div className="sheet-foot column">
              <button className="btn-primary" onClick={pay} disabled={state === "processing"}>
                {state === "processing" ? <span className="spinner dark" /> : t("payBtn", { price: money(split > 1 ? total / split : total) })}
              </button>
              <p className="fine-print center">{t("paySimulated")}</p>
            </div>
          )}
        </>
      )}
    </Sheet>
  );
}
