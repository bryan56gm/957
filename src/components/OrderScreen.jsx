import { findItem } from "../data/menu";
import { VENUE } from "../data/venue";
import { useI18n } from "../hooks/useI18n";
import { lineTotal } from "../lib/pricing";
import { BackIcon, CheckIcon, FlameIcon, PinIcon, ReceiptIcon, RepeatIcon } from "./Icons";
import { useLineDetails } from "./LineText";
import { OrderSteps, orderSteps } from "./OrderProgress";

const RADIUS = 92;
const LENGTH = 2 * Math.PI * RADIUS;
const STATUS_TITLE = { received: "stepReceived", grill: "stepGrill", ready: "pushReady", served: "pushServed" };

function StatusRing({ order }) {
  const steps = orderSteps(order);
  const progress = (steps.indexOf(order.status) + 1) / steps.length;
  const finished = progress === 1;
  return (
    <div className={`ring ${finished ? "done" : ""} ${order.status}`}>
      <svg viewBox="0 0 220 220" aria-hidden="true">
        <circle cx="110" cy="110" r={RADIUS} className="track" />
        <circle cx="110" cy="110" r={RADIUS} className="fill" strokeDasharray={LENGTH} strokeDashoffset={LENGTH * (1 - progress)} transform="rotate(-90 110 110)" />
      </svg>
      <div className="ring-center">
        {finished ? <span className="ring-tick"><CheckIcon /></span> : order.status === "grill" ? <span className="ring-flame"><FlameIcon /></span> : null}
        <span className="ring-code display">#{order.code}</span>
      </div>
      {order.status === "grill" && <span className="smoke"><i /><i /><i /></span>}
    </div>
  );
}

export function OrderScreen({ order, onClose, onCollect, onAnotherRound, onSeeBill }) {
  const { t, money, name } = useI18n();
  const details = useLineDetails();
  if (!order) return null;
  const isTable = order.mode.type === "table";
  const finished = order.status === "ready" || order.status === "served";
  const title = t(STATUS_TITLE[order.status], { table: order.mode.table });

  return (
    <div className="overlay order-screen">
      <header className="overlay-head">
        <button className="icon-btn" onClick={onClose} aria-label="←"><BackIcon /></button>
        <span className="display">{t("orderTitle")}</span>
        <span className="icon-btn ghost" />
      </header>
      <div className="order-body">
        <StatusRing order={order} />
        <h1 className="display order-title" key={order.status}>{title}</h1>
        <p className="order-sub">
          {isTable
            ? t("tableHint", { table: order.mode.table })
            : finished ? t("pickupHint") : t("etaPickup", { time: order.readyAt })}
        </p>
        <OrderSteps order={order} />

        <div className="card order-lines">
          <div className="row between"><span className="k">{t("orderCode")} #{order.code}</span><span className="k">{isTable ? t("modeTable", { table: order.mode.table }) : order.mode.slot}</span></div>
          {order.lines.map((line) => (
            <div key={line.key} className="order-line">
              <span className="qty">{line.qty}×</span>
              <span className="grow"><b>{name(findItem(line.itemId))}</b>{details(line) && <small>{details(line)}</small>}</span>
              <span>{money(lineTotal(line))}</span>
            </div>
          ))}
          {order.fee > 0 && <div className="order-line muted"><span className="qty" /><span className="grow">{t("terraceFee", { count: order.lines.reduce((sum, line) => sum + line.qty, 0) })}</span><span>{money(order.fee)}</span></div>}
          <div className="order-line total"><span className="qty" /><span className="grow">{t("total")}</span><span>{money(order.total)}</span></div>
        </div>
      </div>
      <div className="overlay-foot">
        {isTable ? (
          <>
            <button className="btn-primary" onClick={onAnotherRound}><RepeatIcon /> {t("anotherRound")}</button>
            <button className="btn-ghost" onClick={onSeeBill}><ReceiptIcon /> {t("seeBill")}</button>
          </>
        ) : finished ? (
          <button className="btn-primary" onClick={() => onCollect(order.id)}><CheckIcon /> {t("collected")}</button>
        ) : (
          <a className="btn-ghost" href={VENUE.mapsUrl} target="_blank" rel="noreferrer"><PinIcon /> {t("directions")}</a>
        )}
      </div>
    </div>
  );
}
