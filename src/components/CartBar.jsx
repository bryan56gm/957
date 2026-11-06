import { useI18n } from "../hooks/useI18n";
import { BagIcon } from "./Icons";

export function CartBar({ count, total, onOpen }) {
  const { t, money } = useI18n();
  return (
    <button className="cart-bar" onClick={onOpen}>
      <span className="cart-bar-count"><BagIcon /><b key={count}>{count}</b></span>
      <span className="grow">{t("viewOrder")}</span>
      <span className="cart-bar-total">{money(total)}</span>
    </button>
  );
}
