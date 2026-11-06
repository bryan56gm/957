import { useI18n } from "../hooks/useI18n";
import { CheckIcon, ChevronIcon, FlameIcon } from "./Icons";

export function orderSteps(order) {
  return order.mode.type === "table" ? ["received", "grill", "ready", "served"] : ["received", "grill", "ready"];
}

const STEP_LABEL = { received: "stepReceived", grill: "stepGrill", ready: "stepReady", served: "stepServed" };

// Horizontal step tracker (received → grill → ready [→ served]).
export function OrderSteps({ order }) {
  const { t } = useI18n();
  const steps = orderSteps(order);
  const current = steps.indexOf(order.status);
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step} className={index < current ? "done" : index === current ? "now" : ""}>
          <span className="steps-dot">{index < current || (index === current && index === steps.length - 1) ? <CheckIcon /> : index === current && step === "grill" ? <FlameIcon /> : null}</span>
          <span className="steps-label">{t(STEP_LABEL[step])}</span>
        </li>
      ))}
    </ol>
  );
}

// Compact card for the home screen and the orders list.
export function OrderMini({ order, onOpen }) {
  const { t } = useI18n();
  const finished = order.status === "ready" || order.status === "served";
  const where = order.mode.type === "table" ? t("modeTable", { table: order.mode.table }) : t("modeTakeaway");
  return (
    <button className={`order-mini ${finished ? "ready" : ""}`} onClick={() => onOpen(order)}>
      <span className="row">
        <span className="order-code">#{order.code}</span>
        <span className="grow">
          <b>{finished ? t(order.mode.type === "table" ? "stepServed" : "pushReady") : t(order.status === "grill" ? "stepGrill" : "stepReceived")}</b>
          <small>{where} · {order.mode.type === "takeaway" ? order.mode.slot : order.placedAt}</small>
        </span>
        <ChevronIcon />
      </span>
      <OrderSteps order={order} />
    </button>
  );
}
