import { findItem } from "../data/menu";
import { useI18n } from "../hooks/useI18n";
import { linesSubtotal } from "../lib/pricing";
import { BagIcon, QrIcon, ReceiptIcon, RepeatIcon } from "./Icons";
import { OrderMini } from "./OrderProgress";

function PastOrder({ order, onReorder }) {
  const { t, money, name } = useI18n();
  const when = order.daysAgo === 0 ? t("today") : order.daysAgo === 1 ? t("yesterday") : t("daysAgo", { count: order.daysAgo });
  const total = order.total ?? linesSubtotal(order.lines);
  const summary = order.lines.map((line) => `${line.qty}× ${name(findItem(line.itemId))}`).join(", ");
  return (
    <div className="card past">
      <div className="row">
        <span className="mode-icon soft">{order.mode === "table" || order.mode?.type === "table" ? <QrIcon /> : <BagIcon />}</span>
        <span className="grow">
          <b>{when} · #{order.code}</b>
          <small>{summary}</small>
        </span>
        <span className="price">{money(total)}</span>
      </div>
      <button className="btn-outline" onClick={() => onReorder(order)}><RepeatIcon /> {t("reorder")}</button>
    </div>
  );
}

export function OrdersScreen({ active, history, onOpenOrder, onReorder }) {
  const { t } = useI18n();
  return (
    <div className="content">
      <h1 className="display page-title">{t("ordersTitle")}</h1>
      {active.length > 0 && <p className="k">{t("ordersCurrent")}</p>}
      {active.map((order) => <OrderMini key={order.id} order={order} onOpen={onOpenOrder} />)}
      <p className="k">{t("ordersPast")}</p>
      {history.length === 0 && <p className="empty"><ReceiptIcon /> {t("ordersNone")}</p>}
      {history.map((order) => <PastOrder key={order.id} order={order} onReorder={onReorder} />)}
    </div>
  );
}
