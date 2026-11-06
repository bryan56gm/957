import { useI18n } from "../hooks/useI18n";
import { HomeIcon, MenuIcon, QrIcon, ReceiptIcon, UserIcon } from "./Icons";

const LEFT = [
  { id: "home", label: "navHome", Icon: HomeIcon },
  { id: "menu", label: "navMenu", Icon: MenuIcon }
];
const RIGHT = [
  { id: "orders", label: "navOrders", Icon: ReceiptIcon },
  { id: "profile", label: "navProfile", Icon: UserIcon }
];

// Five slots: the table QR sits raised in the centre (or the table's bill once seated).
export function BottomNav({ active, onNavigate, onTable, tableNumber, ordersBadge }) {
  const { t } = useI18n();
  const item = ({ id, label, Icon }) => (
    <button key={id} className={active === id ? "on" : ""} onClick={() => onNavigate(id)} aria-current={active === id ? "page" : undefined}>
      <span className="nav-ico"><Icon />{id === "orders" && ordersBadge > 0 && <i className="dot" />}</span>
      {t(label)}
    </button>
  );
  return (
    <nav className="nav">
      {LEFT.map(item)}
      <button className="nav-center" onClick={onTable}>
        <span className="nav-disc">{tableNumber ? <b>{tableNumber}</b> : <QrIcon />}</span>
        {t("navTable")}
      </button>
      {RIGHT.map(item)}
    </nav>
  );
}
